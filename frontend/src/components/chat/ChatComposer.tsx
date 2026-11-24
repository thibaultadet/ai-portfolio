import { CircleAlert, Square } from "lucide-react";
import { type SubmitEvent, useId } from "react";
import { Button } from "#/components/ui/button";
import { Input } from "#/components/ui/input";
import { cn } from "#/lib/utils";

const MAX_LENGTH = 2000;

interface ChatComposerProps {
	input: string;
	onInputChange: (value: string) => void;
	onSubmit: (e: SubmitEvent<HTMLFormElement>) => void;
	onStop: () => void;
	isStreaming: boolean;
	secondsLeft: number;
}

const ChatComposer = ({
	input,
	onInputChange,
	onSubmit,
	onStop,
	isStreaming,
	secondsLeft,
}: ChatComposerProps) => {
	const isRateLimited = secondsLeft > 0;
	const inputId = useId();
	const errorId = useId();
	const length = input.length;
	const isTooLong = length > MAX_LENGTH;

	return (
		<form onSubmit={onSubmit} className="flex flex-col gap-2">
			<div className="flex items-center gap-2">
				<label htmlFor={inputId} className="sr-only">
					Votre question
				</label>
				<Input
					id={inputId}
					value={input}
					onChange={(e) => onInputChange(e.target.value)}
					disabled={isStreaming || isRateLimited}
					placeholder={
						isRateLimited
							? `Réessaie dans ${secondsLeft} s…`
							: "Posez une question sur son parcours…"
					}
					aria-invalid={isTooLong || undefined}
					aria-describedby={isTooLong ? errorId : undefined}
				/>
				{isStreaming ? (
					<Button type="button" size="lg" onClick={onStop} aria-label="Arrêter">
						<Square strokeWidth={1.5} />
					</Button>
				) : (
					<Button
						type="submit"
						size="lg"
						className="font-bold"
						disabled={isRateLimited || isTooLong}
					>
						Envoyer
					</Button>
				)}
			</div>
			<div className="flex items-center gap-2 text-label">
				{isTooLong && (
					<p id={errorId} className="flex items-center gap-2 text-danger">
						<CircleAlert className="size-4" strokeWidth={1.5} aria-hidden />
						Question trop longue, raccourcis-la.
					</p>
				)}
				<span
					className={cn(
						"ml-auto tabular-nums",
						isTooLong ? "text-danger" : "text-ink-muted",
					)}
				>
					{length} / {MAX_LENGTH}
				</span>
			</div>
		</form>
	);
};

export default ChatComposer;
