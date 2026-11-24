import { type SubmitEvent, useEffect, useRef, useState } from "react";
import ChatBubble from "#/components/chat/ChatBubble";
import ChatComposer from "#/components/chat/ChatComposer";
import ChatNotice from "#/components/chat/ChatNotice";
import { type ChatMessage, streamChat } from "#/lib/api/chat-stream";

type UIMessage = ChatMessage & { id: string };

type Failure = { title: string; question: string };

const ChatPanel = () => {
	const [messages, setMessages] = useState<UIMessage[]>([]);
	const [input, setInput] = useState("");
	const [isStreaming, setIsStreaming] = useState(false);
	const [failure, setFailure] = useState<Failure | null>(null);
	const [secondsLeft, setSecondsLeft] = useState(0);
	const abortRef = useRef<AbortController | null>(null);
	const endRef = useRef<HTMLDivElement>(null);

	const isRateLimited = secondsLeft > 0;

	const send = async (content: string) => {
		if (!content || isStreaming || isRateLimited) return;

		const base = messages.filter((m) => m.content);
		const history: UIMessage[] = [
			...base,
			{ id: crypto.randomUUID(), role: "user", content },
		];
		setMessages([
			...history,
			{ id: crypto.randomUUID(), role: "assistant", content: "" },
		]);
		setInput("");
		setIsStreaming(true);
		setFailure(null);

		const rollback = () => {
			setMessages(base);
			setInput(content);
		};
		const fail = (title: string) => {
			rollback();
			setFailure({ title, question: content });
		};

		const controller = new AbortController();
		abortRef.current = controller;
		try {
			for await (const event of streamChat(
				history.map(({ role, content }) => ({ role, content })),
				controller.signal,
			)) {
				if (event.type === "text") {
					setMessages((prev) => {
						const last = prev[prev.length - 1];
						return [
							...prev.slice(0, -1),
							{ ...last, content: last.content + event.text },
						];
					});
				}
				if (event.type === "error") fail(event.message);
				if (event.type === "rate-limit") {
					rollback();
					setSecondsLeft(event.retryAfter);
				}
			}
		} catch (err) {
			if (!(err instanceof DOMException && err.name === "AbortError")) {
				fail("Connexion perdue");
			}
		} finally {
			setIsStreaming(false);
			abortRef.current = null;
		}
	};

	const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
		e.preventDefault();
		send(input.trim());
	};

	useEffect(() => {
		if (!secondsLeft) return;
		const timer = setTimeout(() => setSecondsLeft((s) => s - 1), 1000);
		return () => clearTimeout(timer);
	}, [secondsLeft]);

	useEffect(() => () => abortRef.current?.abort(), []);

	// biome-ignore lint/correctness/useExhaustiveDependencies: messages et les bandeaux déclenchent le scroll sans être lus.
	useEffect(() => {
		endRef.current?.scrollIntoView({ block: "end" });
	}, [messages, failure, isRateLimited]);

	const lastId = messages.at(-1)?.id;

	return (
		<div className="flex h-150 flex-col overflow-hidden rounded-lg border-2 border-input bg-surface shadow-offset">
			<div
				className="scrollbar-chat flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto px-5 pt-5 pb-3"
				aria-live="polite"
			>
				<div className="mt-auto" />
				{messages.map(({ id, role, content }) => (
					<ChatBubble
						key={id}
						role={role}
						content={content}
						isStreaming={isStreaming && id === lastId}
					/>
				))}
				{failure && (
					<ChatNotice
						variant="error"
						title={failure.title}
						onRetry={() => send(failure.question)}
					/>
				)}
				{isRateLimited && (
					<ChatNotice variant="rate-limit" secondsLeft={secondsLeft} />
				)}
				<div ref={endRef} />
			</div>
			<div className="px-5 pb-5">
				<ChatComposer
					input={input}
					onInputChange={setInput}
					onSubmit={handleSubmit}
					onStop={() => abortRef.current?.abort()}
					isStreaming={isStreaming}
					secondsLeft={secondsLeft}
				/>
			</div>
		</div>
	);
};

export default ChatPanel;
