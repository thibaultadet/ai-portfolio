import { Link } from "@tanstack/react-router";
import ThemeToggle from "#/components/ThemeToggle";

const NAV_LINKS = [
	{ path: "career", label: "Parcours" },
	{ path: "projects", label: "Projets" },
	{ path: "stack", label: "Stack" },
	{ path: "contact", label: "Contact" },
];

export default function Header() {
	return (
		<header className="sticky top-0 z-50 px-4 backdrop-blur-lg">
			<nav className="page-wrap flex items-center justify-between gap-3 py-3 sm:py-4">
				<Link to="/" className="font-black text-foreground no-underline">
					Thibault Adet
				</Link>
				<div className="flex items-center gap-6">
					{NAV_LINKS.map((link) => (
						<Link
							key={link.path}
							to="/"
							hash={link.path}
							className="text-sm font-medium text-foreground hover:text-primary"
						>
							{link.label}
						</Link>
					))}
				</div>
				<ThemeToggle compact />
			</nav>
		</header>
	);
}
