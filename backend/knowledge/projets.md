# Réalisations par projet

Le détail de chaque projet, et la source des chiffres techniques. Aucun impact métier (utilisateurs, chiffre d'affaires, gains) n'est mesuré au-delà des chiffres de ce fichier et d'experiences.md.

## Beny (2025 à 2026)
Toute la partie technique. Environ 69 % des commits de 2026 ont été co-écrits avec Claude : le produit a été conçu et dirigé avec des agents IA. Thibault menait la réflexion produit et design, écrivait les spécifications, les agents codaient, puis il relisait et validait.
- Synchronisation bancaire Powens (connexions, soldes, transactions, jobs Sidekiq), puis une couche bancaire indépendante du fournisseur et l'intégration de Linxo, pour remplacer Powens progressivement.
- Bilan annuel / compte de gestion, avec génération PDF asynchrone.
- Rapport annuel (CRG) : checklist de pièces, relevés, export ZIP.
- Pipeline PDF Typst + qpdf, qui a remplacé Grover et son Chromium headless.
- Catégorisation des transactions par IA (Mistral), mise en production.
- OCR d'ordonnances par IA (Mistral).
- Monétisation : Stripe, offres Beny Lite et à 5 €, rappels.
- Beny Control : espace pour les contrôleurs et inspecteurs, avec son socle backend.
- Compléments et dossier papier : boucle entre contrôleur et tuteur, courrier.
- Facturation et rémunération des contrôleurs : barème, facture PDF, paiements.
- Refonte du design system et redesign B2C.
- Saisie manuelle : transactions, comptes, crédits, adresses.
- Onboarding guidé avec to-do.
- Agenda (rendez-vous et tâches) et gestion documentaire.
- Communauté Discourse (SSO) et emails Brevo.
- Acquisition : site Astro / Prismic, landings, suivi UTM et PostHog.
- Outillage qualité et agents : CLI interne, CI, Biome, observabilité.

### Software factory (état novembre 2026)
Pipeline d'agents Claude Code : une issue GitHub devenait une pull request relue par 7 agents reviewers. Le pipeline s'améliorait à partir des retouches humaines faites sur ses PR. Thibault gardait la réflexion produit, les spécifications et la relecture finale. Les tests RSpec et Vitest et la CI servaient de garde-fous.
Résultat : 432 PR mergées de septembre au 23 novembre 2026, contre 52 de juin à août (×8, Dependabot exclu), avec des PR plus petites (médiane 290 lignes contre 504).

## Embarq : API Rails / GraphQL (2020 à 2025)
- Notes de frais (auteur principal).
- Frais kilométriques : véhicules, barème URSSAF, Google Maps.
- Forfait de frais et export XML des paiements refacturables.
- Onboarding et offboarding des salariés, avec documents.
- Services salariés (Leeto, tickets restaurant, PERCO) : architecture.
- Simulateur de paie.
- Échéances et renouvellements de mission, historique des taux.
- Rappels de comptes-rendus d'activité, notifications, to-dos.
- Intégration Docusign et contrats docx (co-auteur).
- Intégrations HubSpot, Silae, Kenko.
- Refonte du modèle Contact en ClientUserable (70 fichiers).

## Embarq : application web (Next.js / React / MUI)
- Migration MUI v4→v5, design system et Next 12 (422 fichiers, 2022).
- Migration Next 13→15, React 18→19 et MUI 5→6 (359 fichiers, 2024).
- Parcours complet des notes de frais, frais kilométriques (Google Maps à la place de Mapbox), forfait de frais.
- Portail client.
- Simulateur de salaire.
- Offboarding, renouvellements de mission, contacts client.
- OCR des justificatifs.

## Embarq : application mobile (React Native, Expo, TypeScript, Apollo)
Premier auteur du code de l'application. Socle Apollo / Formik / profil, justificatifs, comptes-rendus d'activité, notes de frais kilométriques, rapports de frais, fichiers / PDF / caméra, authentification biométrique, montées de version React Native / Expo, Sentry.

## Embarq : site marketing (Next.js, MUI, Contentful)
Fondations du site, FAQ avec Algolia, simulateur de salaire, formulaires de contact avec suivi HubSpot / GTM / UTM, blog Contentful et SEO technique, ebooks et événements, landings partenaires et villes.

## Petits projets
- lambda-pdf-generator : Lambda Puppeteer HTML→PDF, déployée avec Terraform (2025).
- expense-ocr : Lambda Ruby d'extraction de dépenses avec Mistral (2025).
- beny-videos : vidéo réalisée en code avec Remotion, audio généré avec ElevenLabs (2026).

## ai-portfolio (novembre 2026, en cours)
Le portfolio sur lequel le visiteur se trouve, et tu en es l'agent IA : parles-en comme de « ce portfolio » et de toi-même (« je tourne sur… »).
- Front-end TanStack Start (React, TypeScript, Tailwind, shadcn/ui), déployé sur Vercel.
- Backend Python (FastAPI) qui relaie les messages vers l'API Claude d'Anthropic, en streaming.
- Il apprend Python en construisant ce portfolio : c'est son premier backend Python.
- Code : [ai-portfolio sur GitHub](https://github.com/thibaultadet/ai-portfolio)
