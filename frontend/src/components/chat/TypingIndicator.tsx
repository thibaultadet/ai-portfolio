const DOT =
	"size-2 rounded-full bg-sage animate-pulse motion-reduce:animate-none";

const TypingIndicator = () => {
	return (
		<output className="flex items-center gap-3">
			<span className="sr-only">Réponse en cours</span>
			<span className="flex gap-1.5" aria-hidden="true">
				<span className={DOT} />
				<span className={`${DOT} [animation-delay:150ms]`} />
				<span className={`${DOT} [animation-delay:300ms]`} />
			</span>
			<span className="text-label text-ink-muted" aria-hidden="true">
				Je demande à Thibault…
			</span>
		</output>
	);
};

export default TypingIndicator;
