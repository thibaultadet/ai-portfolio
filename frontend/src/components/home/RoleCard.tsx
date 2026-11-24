import { cn } from "#/lib/utils";

const ROLE_STYLES = {
	project: { bg: "bg-role-project-bg", ink: "text-role-project-ink" },
	stack: { bg: "bg-role-stack-bg", ink: "text-role-stack-ink" },
	contact: { bg: "bg-role-cv-bg", ink: "text-role-cv-ink" },
} as const;

export type RoleKind = keyof typeof ROLE_STYLES;

interface RoleCardProps {
	kind: RoleKind;
	label: string;
	text: string;
	href?: string;
	className?: string;
}

const RoleCard = ({ kind, label, text, href, className }: RoleCardProps) => {
	const { bg, ink } = ROLE_STYLES[kind];
	const classes = cn(
		"flex flex-col gap-1 rounded-md px-4 py-3 text-ink no-underline",
		bg,
		className,
	);
	const content = (
		<>
			<span className={cn("text-overline uppercase", ink)}>{label}</span>
			<span className="text-label">{text}</span>
		</>
	);

	if (href) {
		return (
			<a href={href} className={cn(classes, "hover:text-ink")}>
				{content}
			</a>
		);
	}
	return <div className={classes}>{content}</div>;
};

export default RoleCard;
