import { Square } from "lucide-react";
import { type SubmitEvent, useEffect, useRef, useState } from "react";

import { Button } from "#/components/ui/button";
import { type ChatMessage, streamChat } from "#/lib/api/chat-stream";

type UIMessage = ChatMessage & { id: string };

const Chat = () => {
	const [messages, setMessages] = useState<UIMessage[]>([]);
	const [input, setInput] = useState("");
	const [isStreaming, setIsStreaming] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const abortRef = useRef<AbortController | null>(null);

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

	return (
		<>
			{messages.map(({ id, role, content }) => (
				<div key={id} className={role === "user" ? "text-right" : "text-left"}>
					{content}
				</div>
			))}
			{error && <p>{error}</p>}
			<form onSubmit={send}>
				<input
					value={input}
					onChange={(e) => setInput(e.target.value)}
					disabled={isStreaming}
					placeholder="Pose une question…"
					aria-label="Message"
				/>
				{isStreaming ? (
					<Button
						type="button"
						onClick={() => abortRef.current?.abort()}
						aria-label="Arrêter"
					>
						<Square />
					</Button>
				) : (
					<Button type="submit">Envoyer</Button>
				)}
			</form>
		</>
	);
};

export default Chat;
