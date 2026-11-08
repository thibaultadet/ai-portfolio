import { Link } from "@tanstack/react-router";
import ThemeToggle from "#/components/ThemeToggle";
import { Button } from "#/components/ui/button";

const NAV_LINKS = [
	{ path: "career", label: "Parcours" },
	{ path: "projects", label: "Projets" },
	{ path: "stack", label: "Stack" },
	{ path: "contact", label: "Contact" },
];

export default function Header() {
	return (
		<header className="sticky top-0 z-50 px-4 backdrop-blur-lg bg-background/80">
			<nav className="page-wrap flex items-center justify-between gap-3 py-3 sm:py-4">
				<Link to="/" className="font-black text-foreground no-underline">
					Thibault Adet
				</Link>
				<div className="hidden sm:flex items-center">
					{NAV_LINKS.map((link) => (
						<Button variant="link" key={link.path} asChild size="sm">
							<Link to="/" hash={link.path}>
								{link.label}
							</Link>
						</Button>
					))}
				</div>
				<ThemeToggle compact />
			</nav>
		</header>
	);
}
