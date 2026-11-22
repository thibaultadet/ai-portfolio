import { createFileRoute } from "@tanstack/react-router";
import Chat from "#/components/Chat";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
	return (
		<main className="page-wrap px-4 py-12">
			<h1>Thibault Adet</h1>
			<Chat />
		</main>
	);
}
