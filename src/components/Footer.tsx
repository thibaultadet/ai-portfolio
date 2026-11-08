import ThemeToggle from "@/components/ThemeToggle";

export default function Footer() {
	return (
		<footer className="mt-20 border-t border-(--line) px-4 py-10 text-sm text-muted-foreground">
			<div className="page-wrap flex flex-wrap items-center justify-between">
				&copy; {new Date().getFullYear()} <ThemeToggle />
			</div>
		</footer>
	);
}
