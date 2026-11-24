import { createFileRoute } from "@tanstack/react-router";
import ChatPanel from "#/components/chat/ChatPanel";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
	return (
		<main className="page-wrap px-4 py-12">
			<ChatPanel />
		</main>
	);
}
