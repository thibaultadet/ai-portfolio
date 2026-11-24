type CareerEntry = { period: string; title: string; description: string };

const CAREER: CareerEntry[] = [
	{
		period: "2025 → 2026",
		title: "Founding Engineer et cofondateur, Beny",
		description:
			"Une application pour les aidants familiaux, en particulier les tuteurs et curateurs, pour réduire leur charge administrative. J'ai pris en charge toute la partie technique, en construisant petit à petit une software factory d'agents IA : je menais la réflexion produit et les spécifications, les agents implémentaient, je relisais et je validais. L'amélioration continue de la factory est la clé dans ce process.",
	},
	{
		period: "2023 → 2025",
		title: "Lead developer, Embarq",
		description:
			"L'application web et mobile d'une société de portage salarial, utilisée par environ 2 000 personnes. J'encadrais 2 développeurs et un designer : choix techniques, infrastructure, produit, code reviews.",
	},
	{
		period: "2020 → 2023",
		title: "Développeur full stack, Embarq",
		description:
			"Comptes-rendus d'activité, notes de frais, signature Docusign, suivi des dossiers et bulletins de paie. Sur l'API Rails et GraphQL, le web Next.js et l'application React Native.",
	},
	{
		period: "2020",
		title: "Le Wagon, développeur web",
		description: "Ma reconversion, de la logistique au développement.",
	},
	{
		period: "2012 → 2019",
		title: "Logistique, Airbus Helicopters puis Maison Jonquier",
		description:
			"Ingénieur logistique en apprentissage chez Airbus Helicopters, puis responsable logistique d'une confiserie familiale : ERP Odoo, site e-commerce, une gamme de 5 pâtes à tartiner.",
	},
];

export default function Career() {
	return (
		<section
			id="parcours"
			aria-labelledby="parcours-title"
			className="page-wrap flex scroll-mt-24 flex-col gap-6 py-10"
		>
			<h2 id="parcours-title" className="m-0 text-title">
				Parcours
			</h2>
			<ol className="m-0 flex list-none flex-col border-t border-border p-0">
				{CAREER.map(({ period, title, description }) => (
					<li
						key={`${period}-${title}`}
						className="flex flex-wrap gap-x-6 gap-y-1 border-b border-border py-4"
					>
						<span className="flex-[0_0_160px] text-label leading-normal text-ink-muted tabular-nums">
							{period}
						</span>
						<div className="flex min-w-0 flex-[1_1_320px] flex-col gap-1">
							<h3 className="m-0 text-body-lg leading-[1.4] font-bold">
								{title}
							</h3>
							<p className="m-0 text-body text-ink-muted">{description}</p>
						</div>
					</li>
				))}
			</ol>
		</section>
	);
}
