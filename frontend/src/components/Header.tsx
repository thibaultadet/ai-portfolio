import { Link } from "@tanstack/react-router";
import ThemeToggle from "#/components/ThemeToggle";

const NAV_LINKS = [
	{ hash: "parcours", label: "Parcours" },
	{ hash: "projets", label: "Projets" },
	{ hash: "stack", label: "Stack" },
	{ hash: "contact", label: "Contact" },
];

export default function Header() {
	return (
		<header className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg">
			<div className="page-wrap flex items-center justify-between gap-4 py-5">
				<Link
					to="/"
					className="text-body-lg font-black tracking-[-0.02em] text-ink no-underline hover:text-ink"
				>
					Thibault Adet
				</Link>
				<nav
					aria-label="Sections"
					className="hidden items-center gap-6 sm:flex"
				>
					{NAV_LINKS.map((link) => (
						<Link
							key={link.hash}
							to="/"
							hash={link.hash}
							className="text-label text-ink no-underline hover:text-sage"
						>
							{link.label}
						</Link>
					))}
				</nav>
				<ThemeToggle compact />
			</div>
		</header>
	);
}
