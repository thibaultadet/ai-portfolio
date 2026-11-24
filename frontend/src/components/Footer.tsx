import { ArrowUpRight } from "lucide-react";

const CONTACT_EMAIL = "thibault.adet@gmail.com";

const LINKS = [
	{ label: "GitHub", href: "https://github.com/thibaultadet" },
	{ label: "LinkedIn", href: "https://www.linkedin.com/in/thibault-adet" },
];

export default function Footer() {
	return (
		<footer
			id="contact"
			className="page-wrap flex scroll-mt-24 flex-wrap items-center justify-between gap-6 border-t border-border pt-10 pb-14"
		>
			<div className="flex flex-col gap-1">
				<h2 id="contact-title" className="m-0 text-heading">
					On en parle ?
				</h2>
				<a href={`mailto:${CONTACT_EMAIL}`} className="text-body font-medium">
					{CONTACT_EMAIL}
				</a>
			</div>
			<div className="flex flex-wrap items-center gap-6 text-label">
				{LINKS.map(({ label, href }) => (
					<a key={label} href={href} className="inline-flex items-center gap-1">
						{label}
						<ArrowUpRight size={16} strokeWidth={1.5} aria-hidden="true" />
					</a>
				))}
				<span className="text-ink-muted">
					&copy; {new Date().getFullYear()} Thibault Adet
				</span>
			</div>
		</footer>
	);
}
