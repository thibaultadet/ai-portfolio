import ChatPanel from "#/components/chat/ChatPanel";

export default function ChatSection() {
	return (
		<section
			aria-labelledby="chat-title"
			className="page-wrap flex flex-col gap-4 pt-4 pb-10"
		>
			<h2 id="chat-title" className="m-0 text-heading">
				Une question précise ? Le chat répond à partir de mon parcours.
			</h2>
			<div className="w-full max-w-200">
				<ChatPanel />
			</div>
		</section>
	);
}
