import { api } from "#/lib/api/client";
import type { components } from "#/lib/api/schema.gen";

export type ChatMessage = components["schemas"]["ChatMessage"];

export type ChatEvent =
	| { type: "text"; text: string }
	| { type: "done" }
	| { type: "error"; message: string };

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
			type: "error",
			message: "Trop de messages, réessaie dans une minute",
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
