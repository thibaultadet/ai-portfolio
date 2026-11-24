import RoleCard from "#/components/home/RoleCard";

const STACK: { label: string; items: string[] }[] = [
	{
		label: "Back",
		items: ["Ruby on Rails", "GraphQL", "PostgreSQL", "Sidekiq"],
	},
	{
		label: "Front",
		items: ["Next.js", "React", "TypeScript", "shadcn/ui", "TanStack"],
	},
	{ label: "Mobile", items: ["React Native", "Expo"] },
	{
		label: "IA et qualité",
		items: ["Mistral", "Claude Code", "RSpec", "Vitest"],
	},
];

export default function Stack() {
	return (
		<section
			id="stack"
			aria-labelledby="stack-title"
			className="page-wrap flex scroll-mt-24 flex-col gap-6 py-10"
		>
			<h2 id="stack-title" className="m-0 text-title">
				Stack
			</h2>
			<ul className="m-0 flex list-none flex-wrap gap-2 p-0">
				{STACK.map(({ label, items }) => (
					<li key={label}>
						<RoleCard kind="stack" label={label} text={items.join(" · ")} />
					</li>
				))}
			</ul>
		</section>
	);
}
