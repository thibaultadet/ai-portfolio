import { Square } from "lucide-react";
import type { SubmitEvent } from "react";
import { Button } from "#/components/ui/button";
import { Input } from "#/components/ui/input";

interface ChatComposerProps {
	input: string;
	onInputChange: (value: string) => void;
	onSubmit: (e: SubmitEvent<HTMLFormElement>) => void;
	onStop: () => void;
	isStreaming: boolean;
}

const ChatComposer = ({
	input,
	onInputChange,
	onSubmit,
	onStop,
	isStreaming,
}: ChatComposerProps) => {
	return (
		<form onSubmit={onSubmit} className="flex items-center gap-2">
			<Input
				value={input}
				onChange={(e) => onInputChange(e.target.value)}
				disabled={isStreaming}
				placeholder="Posez une question sur son parcours…"
				aria-label="Message"
				className="h-12"
			/>
			{isStreaming ? (
				<Button type="button" size="lg" onClick={onStop} aria-label="Arrêter">
					<Square />
				</Button>
			) : (
				<Button type="submit" size="lg" className="font-bold">
					Envoyer
				</Button>
			)}
		</form>
	);
};

export default ChatComposer;
