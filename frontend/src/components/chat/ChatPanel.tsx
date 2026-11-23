import { type SubmitEvent, useEffect, useRef, useState } from "react";
import ChatBubble from "#/components/chat/ChatBubble";
import ChatComposer from "#/components/chat/ChatComposer";
import { type ChatMessage, streamChat } from "#/lib/api/chat-stream";

type UIMessage = ChatMessage & { id: string };

const ChatPanel = () => {
	const [messages, setMessages] = useState<UIMessage[]>([]);
	const [input, setInput] = useState("");
	const [isStreaming, setIsStreaming] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const abortRef = useRef<AbortController | null>(null);
	const endRef = useRef<HTMLDivElement>(null);

	const send = async (e: SubmitEvent<HTMLFormElement>) => {
		e.preventDefault();
		const content = input.trim();
		if (!content || isStreaming) return;

		const history: UIMessage[] = [
			...messages.filter((m) => m.content),
			{ id: crypto.randomUUID(), role: "user", content },
		];
		setMessages([
			...history,
			{ id: crypto.randomUUID(), role: "assistant", content: "" },
		]);
		setInput("");
		setIsStreaming(true);
		setError(null);

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
				if (event.type === "error") {
					setError(event.message);
				}
			}
		} catch (err) {
			if (!(err instanceof DOMException && err.name === "AbortError")) {
				setError("Connexion perdue");
			}
		} finally {
			setIsStreaming(false);
			abortRef.current = null;
		}
	};

	useEffect(() => () => abortRef.current?.abort(), []);

	// biome-ignore lint/correctness/useExhaustiveDependencies: messages déclenche le scroll sans être lu.
	useEffect(() => {
		endRef.current?.scrollIntoView({ block: "end" });
	}, [messages]);

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
				{error && (
					<p role="alert" className="text-label text-danger">
						{error}
					</p>
				)}
				<div ref={endRef} />
			</div>
			<div className="px-5 pb-5">
				<ChatComposer
					input={input}
					onInputChange={setInput}
					onSubmit={send}
					onStop={() => abortRef.current?.abort()}
					isStreaming={isStreaming}
				/>
			</div>
		</div>
	);
};

export default ChatPanel;
