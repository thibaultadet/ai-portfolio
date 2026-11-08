import { Link } from "@tanstack/react-router";

export default function Header() {
	return (
		<header className="sticky top-0 z-50 border-b border-(--line) bg-background/80 px-4 backdrop-blur-lg">
			<nav className="page-wrap flex items-center gap-3 py-3 sm:py-4">
				<Link to="/" className="font-semibold text-foreground no-underline">
					Thibault Adet
				</Link>
			</nav>
		</header>
	);
}
