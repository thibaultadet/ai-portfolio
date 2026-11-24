export type SuggestionKind = "project" | "stack" | "cv";

const DOT = {
	project: "bg-role-project",
	stack: "bg-role-stack",
	cv: "bg-role-cv",
} as const;

interface SuggestionChipProps {
	label: string;
	kind: SuggestionKind;
	onClick: () => void;
	disabled?: boolean;
}

const SuggestionChip = ({
	label,
	kind,
	onClick,
	disabled,
}: SuggestionChipProps) => {
	return (
		<button
			type="button"
			onClick={onClick}
			disabled={disabled}
			className="inline-flex min-h-10 cursor-pointer items-center gap-2 rounded-full border border-border bg-surface-raised px-4 text-label text-ink hover:border-input disabled:pointer-events-none disabled:opacity-50"
		>
			<span
				className={`size-2.5 rounded-full ${DOT[kind]}`}
				aria-hidden="true"
			/>
			{label}
		</button>
	);
};

export default SuggestionChip;
