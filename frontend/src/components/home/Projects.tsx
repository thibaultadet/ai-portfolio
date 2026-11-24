type Project = {
	period: string;
	title: string;
	description: string;
	stack: string;
};

const PROJECTS: Project[] = [
	{
		period: "2025 → 2026",
		title: "Beny",
		description:
			"Pour les tuteurs et curateurs familiaux : synchronisation bancaire, compte de gestion et rapport annuel générés en PDF, transactions catégorisées par IA. Deux produits lancés, B2C puis B2B, environ 350 inscrits.",
		stack: "Rails · Next.js · Stripe · Mistral",
	},
	{
		period: "2020 → 2025",
		title: "Notes de frais Embarq",
		description:
			"Le parcours complet, sur l'API, le web et le mobile. Frais kilométriques au barème URSSAF avec Google Maps, forfait de frais et export XML des paiements refacturables.",
		stack: "Rails · GraphQL · Next.js · React Native",
	},
	{
		period: "2024",
		title: "Migration du front Embarq",
		description:
			"Next 13 → 15, React 18 → 19 et MUI 5 → 6, sur 359 fichiers, dans une application en production utilisée par environ 2 000 personnes.",
		stack: "Next.js · React · MUI",
	},
];

export default function Projects() {
	return (
		<section
			id="projets"
			aria-labelledby="projets-title"
			className="page-wrap flex scroll-mt-24 flex-col gap-6 py-10"
		>
			<h2 id="projets-title" className="m-0 text-title">
				Projets
			</h2>
			<div className="flex flex-wrap gap-4">
				{PROJECTS.map(({ period, title, description, stack }) => (
					<article
						key={title}
						className="flex min-w-0 flex-[1_1_300px] flex-col gap-2 rounded-lg bg-role-project-bg p-5"
					>
						<span className="text-overline text-role-project-ink uppercase">
							Projet · {period}
						</span>
						<h3 className="m-0 text-heading">{title}</h3>
						<p className="m-0 text-body">{description}</p>
						<span className="text-label text-role-project-ink">{stack}</span>
					</article>
				))}
			</div>
		</section>
	);
}
