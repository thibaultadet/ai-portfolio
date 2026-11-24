import { api } from "#/lib/api/client";
import type { components } from "#/lib/api/schema.gen";

export type ChatMessage = components["schemas"]["ChatMessage"];

export type ChatEvent =
	| { type: "text"; text: string }
	| { type: "done" }
	| { type: "error"; message: string }
	| { type: "rate-limit"; retryAfter: number };

const DEFAULT_RETRY_AFTER = 60;

const parseRetryAfter = (header: string | null): number => {
	if (!header) return DEFAULT_RETRY_AFTER;
	const seconds = Number(header);
	if (Number.isFinite(seconds)) return Math.max(1, Math.ceil(seconds));
	const date = Date.parse(header);
	if (Number.isNaN(date)) return DEFAULT_RETRY_AFTER;
	return Math.max(1, Math.ceil((date - Date.now()) / 1000));
};

export async function* streamChat(
	messages: ChatMessage[],
	signal: AbortSignal,
): AsyncGenerator<ChatEvent> {
	const { data, response } = await api.POST("/api/chat", {
		body: { messages },
		parseAs: "stream",
		signal,
	});

	if (response.status === 429) {
		yield {
			type: "rate-limit",
			retryAfter: parseRetryAfter(response.headers.get("Retry-After")),
		};
		return;
	}

	if (!response.ok || !data) {
		yield {
			type: "error",
			message: "Erreur lors de la génération du texte",
		};
		return;
	}

	const reader = data.pipeThrough(new TextDecoderStream()).getReader();
	let buffer = "";

	while (true) {
		const { value, done } = await reader.read();
		if (done) break;
		buffer += value;
		const parts = buffer.split("\n\n");
		buffer = parts.pop() ?? "";

		for (const part of parts) {
			if (part.startsWith("data: ")) {
				yield JSON.parse(part.slice(6)) as ChatEvent;
			}
		}
	}
}
