import { Button } from "#/components/ui/button";

const CONTACT_EMAIL = "thibault.adet@gmail.com";

export default function Hero() {
	return (
		<section
			aria-labelledby="hero-title"
			className="page-wrap flex flex-col gap-5 pt-10 pb-8"
		>
			<span className="text-overline text-ink-muted uppercase">
				Développeur full stack · Ruby on Rails &amp; Next.js · Marseille
			</span>
			<h1
				id="hero-title"
				className="m-0 max-w-215 text-display-sm min-[480px]:text-display"
			>
				Je transforme des process administratifs lourds en{" "}
				<span className="box-decoration-clone rounded-[10px] bg-sage-tint px-2">
					produits simples
				</span>
				.
			</h1>
			<p className="m-0 max-w-160 text-body-lg text-ink-muted">
				6 ans de Rails et de Next.js. 5 ans chez Embarq, dont 2 comme lead dev,
				puis 18 mois à cofonder Beny et à le construire en tant que Founding
				Engineer.
			</p>
			<div className="flex flex-wrap items-center gap-2">
				<Button asChild className="h-11 px-5 text-label font-bold">
					<a href={`mailto:${CONTACT_EMAIL}`}>Me contacter</a>
				</Button>
				<span className="ml-2 inline-flex items-center gap-2 text-label text-ink-muted">
					<span className="size-2 rounded-full bg-sage" aria-hidden="true" />
					Disponible dès maintenant
				</span>
			</div>
		</section>
	);
}
