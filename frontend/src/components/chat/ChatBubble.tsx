import { Streamdown } from "streamdown";
import TypingIndicator from "#/components/chat/TypingIndicator";
import type { ChatMessage } from "#/lib/api/chat-stream";

interface ChatBubbleProps extends ChatMessage {
	isStreaming?: boolean;
}

const ChatBubble = ({ role, content, isStreaming }: ChatBubbleProps) => {
	if (role === "user") {
		return (
			<div className="ml-auto w-fit max-w-[75%] rounded-bubble rounded-br-sm bg-sage px-4 py-3 text-on-sage">
				{content}
			</div>
		);
	}

	if (!content && !isStreaming) return null;

	return (
		<div className="w-fit max-w-[88%] rounded-bubble rounded-bl-sm border border-border bg-surface-raised px-4 py-3 text-ink">
			{content ? (
				<Streamdown isAnimating={isStreaming}>{content}</Streamdown>
			) : (
				<TypingIndicator />
			)}
		</div>
	);
};

export default ChatBubble;
