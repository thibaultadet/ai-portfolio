import { createFileRoute } from "@tanstack/react-router";
import Career from "#/components/home/Career";
import ChatSection from "#/components/home/ChatSection";
import Hero from "#/components/home/Hero";
import Projects from "#/components/home/Projects";
import Stack from "#/components/home/Stack";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
	return (
		<main>
			<Hero />
			<ChatSection />
			<Career />
			<Projects />
			<Stack />
		</main>
	);
}
