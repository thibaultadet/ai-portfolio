import { cn } from "cn";
import { CircleAlert, Clock, RotateCcw } from "lucide-react";
import type { ReactNode } from "react";
import { Button } from "#/components/ui/button";

type ChatNoticeProps =
	| { variant: "error"; title: string; onRetry: () => void }
	| { variant: "rate-limit"; secondsLeft: number };

const VARIANTS = {
	error: {
		role: "alert",
		Icon: CircleAlert,
		frame: "border-2 border-danger",
		accent: "text-danger",
		titleColor: "text-danger",
		detailColor: "text-ink-muted",
	},
	"rate-limit": {
		role: "status",
		Icon: Clock,
		frame: "border border-border",
		accent: "text-ink-muted",
		titleColor: "text-ink",
		detailColor: "text-ink",
	},
} as const;

const ChatNotice = (props: ChatNoticeProps) => {
	const { role, Icon, frame, accent, titleColor, detailColor } =
		VARIANTS[props.variant];

	let title: string;
	let detail: ReactNode;
	if (props.variant === "error") {
		title = props.title;
		detail = "Réessaie, ta question est toujours dans le champ.";
	} else {
		title = "Trop de messages d’un coup";
		detail = (
			<>
				Réessaie dans <span className="tabular-nums">{props.secondsLeft}</span>{" "}
				s.
			</>
		);
	}

	return (
		<div
			role={role}
			className={cn(
				"flex items-center gap-3 rounded-md bg-surface-raised px-4 py-3",
				frame,
			)}
		>
			<Icon className={cn("size-5", accent)} strokeWidth={1.5} aria-hidden />
			<div className="flex flex-1 flex-col">
				<p className={cn("font-bold", titleColor)}>{title}</p>
				<p className={cn("text-label", detailColor)}>{detail}</p>
			</div>
			{props.variant === "error" && (
				<Button
					type="button"
					variant="secondary"
					onClick={props.onRetry}
					className="h-11"
				>
					<RotateCcw className="size-5" strokeWidth={1.5} aria-hidden />
					Réessayer
				</Button>
			)}
		</div>
	);
};

export default ChatNotice;
