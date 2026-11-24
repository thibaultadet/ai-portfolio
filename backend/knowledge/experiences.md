# Expériences

## Beny, Marseille : Founding Engineer (mai 2025 à novembre 2026)
Beny était une application pour les aidants familiaux, en particulier les tuteurs et curateurs (mesures de protection juridique). Objectif : réduire leur charge administrative pour leur laisser plus de temps pour l'accompagnement humain.
- Cofondateur, en charge de toute la partie technique et de la vision technique.
- Architecture : backend Ruby on Rails, front-end Next.js (TypeScript, shadcn/ui, TanStack Query et Table).
- Produit : transformer des processus complexes de protection juridique en outils simples, accessibles et sécurisés, à partir des retours terrain des aidants.
- Deux produits lancés, B2C puis B2B. Environ 350 inscrits.
- Software factory d'agents Claude Code (détail et chiffres : projets.md, Software factory).
- Infrastructure souveraine sur Scalingo et OVH.
- Tests automatisés RSpec et Vitest.
- Beny s'est arrêté en novembre 2026 : les marchés étaient complexes, et réussir aurait demandé beaucoup de temps et d'argent.

## Embarq, Marseille: Lead Developer (mars 2023 à avril 2025)
Embarq est une société de portage salarial. L'application web et mobile est utilisée par environ 2000 utilisateurs (salariés portés et administrateurs internes).
- Lead dev : encadrement de 2 développeurs mid/junior et d'un designer, choix techniques, d'infrastructure et produit, code reviews.
- Réalisations : migration du front Next / React / MUI, forfait de frais, refonte du modèle Contact (détail : projets.md, Embarq).
- Stack : Ruby on Rails, GraphQL, PostgreSQL ; TypeScript, React, Next.js, Material-UI ; React Native et Expo.

## Embarq, Paris : Développeur Full Stack (septembre 2020 à février 2023)
- Conception de l'application web et mobile : les indépendants portés déclarent leurs comptes-rendus d'activité et notes de frais, les font signer électroniquement par leur client (Docusign), suivent leur dossier et récupèrent leurs bulletins de paie.
- Côté interne : les gestionnaires et commerciaux valident notes de frais et comptes-rendus, envoient les factures et suivent les contrats.
- Refonte du site internet en JAMstack (Next.js, CMS Contentful).
- Réalisations : frais kilométriques avec Google Maps, migration MUI v4→v5 et Next 12 (détail : projets.md, Embarq).

## Embarq : Développeur Web (mai à août 2020)
Conception d'un outil de gestion administrative (Rails, GraphQL, React, Next.js, API Docusign).

## Maison Jonquier, Ollioules : Responsable Logistique (septembre 2016 à octobre 2019)
Reprise d'une confiserie familiale.
- Logistique : gestion des stocks, processus d'emballage et d'expédition, mise en place de l'ERP Odoo.
- Création et maintenance du site e-commerce.
- Lancement d'une gamme de pâtes à tartiner (5 recettes, processus de fabrication, production).
- Packagings, communication, vente en boutique et sur salons.

## Airbus Helicopters : apprentissage (septembre 2012 à août 2016)
- Ingénieur logistique en apprentissage (2013 à 2016), Support Client, service Network : réponse aux besoins en pièces détachées des filiales et de clients militaires, amélioration des processus. Projet de fin d'études : informatisation des gammes de travail pour suivre les pièces en réparation.
- Agent d'ordonnancement en apprentissage (2012 à 2013) : ordres de fabrication, approvisionnement, programmation de la production ; optimisation de la gestion des optionnels pour les monomoteurs Écureuil.

## Formation
- Le Wagon, développeur web (2020).
- Université de Technologie de Belfort-Montbéliard, ingénieur logistique en apprentissage (2013 à 2016).
- IUT Aix-en-Provence, DUT Gestion Logistique et Transport (2011 à 2013).

## Compétences
- Ruby on Rails, GraphQL, PostgreSQL, Sidekiq.
- TypeScript, React, Next.js, shadcn/ui, TanStack (Query, Table), Material-UI, React Native, Expo.
- Contentful (JAMstack), Astro, Prismic.
- Intégrations : Docusign, Google Maps, Stripe, Powens, Linxo, HubSpot, Silae, Mistral (LLM), PostHog.
- Développement avec agents IA (Claude Code).
- Conception de produits SaaS, expérience utilisateur.
- Odoo (ERP), logistique.

## Fondamentaux
Les bases de conception derrière ses projets, avec leur preuve :
- Programmation orientée objet (Ruby) : héritage STI (agenda Beny : rendez-vous et tâches dans `ScheduledItem`, types d'utilisateurs), associations polymorphes (documents rattachés aux actifs ou à la personne protégée, soldes des actifs et des crédits), modules partagés (concerns `Signable` et `Remindable` chez Embarq), objets client dédiés (`Agents::Categorization`).
- Principes SOLID, appliqués au quotidien.
- Abstraction et design patterns : couche bancaire indépendante du fournisseur, qui a permis de remplacer Powens par Linxo sans toucher au produit.
- Domain-Driven Design : modéliser à partir du langage métier (portage salarial chez Embarq, protection juridique chez Beny).
- Modélisation de données relationnelle (PostgreSQL) et machines à états (AASM pour la génération du compte de gestion).
- Conception d'API GraphQL (Embarq).
- Traitements asynchrones : jobs Sidekiq, tâches planifiées, génération PDF en arrière-plan.
- Autorisations par politiques (Pundit).
- Tests automatisés (RSpec, Vitest) et TDD.
- Typage statique (TypeScript).
- Refactoring et migrations à grande échelle (migrations front : projets.md ; refonte du modèle Contact côté API).
- Code review : en lead dev chez Embarq, puis sur les PR des agents chez Beny.
