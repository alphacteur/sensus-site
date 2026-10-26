# Feuille de route SEO sur 12 mois — SENSUS

*Démarrage le 26/10/2026 (M1 = novembre 2026). Calendrier indicatif, à ajuster selon les résultats réels et le temps disponible de Théo. Effort : S (moins d'une demi-journée), M (1 à 2 jours), L (3 jours ou plus). État : ✅ fait · 🔄 en cours · ⏳ à faire · ⛔ bloqué · ❓ décision attendue.*

## Mois 1 : fondations

| # | Action | Priorité | Dépendance | Effort | KPI | État |
|---|---|---|---|---|---|---|
| 1.1 | Corrections techniques sûres (H1, title, meta, 404, sitemap, données structurées, icônes, repli sans JS) | P1 | — | S | Validation des balises, aucun écart visuel | ✅ branche `seo/fondations` |
| 1.2 | Mise en ligne de la branche `seo/fondations` | P1 | Validation de Quentin et Théo | S | Déploiement réussi, contrôle visuel | ✅ 26/10 (`ffcf6fc`) |
| 1.3 | Compléter les mentions légales (forme juridique, adresse du siège, SIRET) | P1 | Infos de Théo | S | Plus aucun crochet | ⛔ |
| 1.4 | Search Console « Domaine » (TXT DNS Squarespace) et envoi du sitemap | P1 | Accès Google de SENSUS | S | Propriété vérifiée, sitemap lu | ⛔ |
| 1.5 | Bing Webmaster Tools (import depuis Search Console) | P2 | 1.4 | S | Propriété vérifiée | ⏳ |
| 1.6 | Créer la fiche Google Business Profile (zone desservie, adresse masquée) | P1 | Adresse du siège, accès Google | M | Fiche vérifiée | ⛔ |
| 1.7 | Choisir l'outil d'audience (voir le plan de mesure §3), puis l'installer avec les événements | P2 | Décision et budget | M | `devis_envoye` mesuré | ❓ |
| 1.8 | Mesure PageSpeed Insights (mobile et ordinateur) de référence | P2 | 1.2 | S | LCP, CLS, INP de laboratoire consignés dans le tableau de bord | ⛔ quota de l'API sans clé épuisé : à lancer sur pagespeed.web.dev ou avec une clé d'API |
| 1.9 | Vérification manuelle des résultats Google depuis Aix et Marseille (navigation privée) | P2 | — | S | Captures datées | ⏳ |

## Mois 2–3 : pages commerciales

| # | Action | Priorité | Dépendance | Effort | KPI | État |
|---|---|---|---|---|---|---|
| 2.1 | Décision technique : HTML statique ou générateur (voir l'architecture §7) | P1 | — | S | Décision consignée | ✅ générateur sans dépendance `tools/build-pages.mjs` |
| 2.2 | Page `/renfort-agence-evenementielle/` | P1 | 2.1, contenu validé par Théo | M | Indexée, impressions sur « renfort agence événementielle » | 🔄 prête sur `seo/pages-vague-1`, validation attendue |
| 2.3 | Page `/organisation-seminaire-entreprise/` (angle Provence et Aix, méthode, FAQ) | P1 | 2.1 | M | Impressions sur les requêtes « séminaire » | 🔄 prête sur `seo/pages-vague-1`, validation attendue |
| 2.4 | Page `/organisation-soiree-entreprise/` | P2 | 2.1 | M | Impressions | ⏳ |
| 2.5 | Page `/mentions-legales/` | P2 | 1.3 | S | — | ⏳ |
| 2.6 | Maillage : liens « En savoir plus » depuis les onglets de missions et « Pour qui » | P1 | 2.2–2.4 | S | Clics internes | 🔄 fait pour les 2 pages (branche) |
| 2.7 | Sur-titres et `h2` descriptifs sur l'accueil (constat T16 de l'audit) | P2 | Validation éditoriale | S | — | ❓ |
| 2.8 | Inscriptions : offices de tourisme d'Aix et de Marseille, Bureau des Congrès, La Fabrique du Net, Evénementiel pour tous, Bing Places, Apple Business Connect, LinkedIn | P1 | 1.6 (NAP stabilisé) | M | Citations actives | ⏳ |
| 2.9 | Message « l'envoi peut prendre jusqu'à une minute » sur le formulaire | P2 | Validation | S | Taux d'échec et d'abandon | 🔄 fait sur la branche |

## Mois 4–6 : autorité et contenu

| # | Action | Priorité | Dépendance | Effort | KPI | État |
|---|---|---|---|---|---|---|
| 3.1 | Page `/realisations/` et 2 ou 3 cas réels (accord client, photos réelles) | P1 | Matière réelle | L | Pages vues des cas, contribution aux devis | ⏳ |
| 3.2 | Guide « Budget d'un séminaire d'entreprise » (brief prêt) | P1 | 2.3, fourchettes réelles de SENSUS | M | Impressions, clics vers le devis | ⏳ |
| 3.3 | Guide « Conducteur d'un événement » (avec modèle) | P2 | — | M | Idem | ⏳ |
| 3.4 | Routine d'avis GBP après chaque mission | P1 | 1.6 | S par mission | Avis par trimestre | ⏳ |
| 3.5 | Liens partenaires : lieux et prestataires réels (2 par trimestre visés) | P2 | Projets réalisés | M | Liens référents gagnés | ⏳ |
| 3.6 | Bloc « Qui est derrière SENSUS » (parcours de Théo) | P2 | Contenu de Théo | S | — | ❓ |
| 3.7 | Page `/coordination-evenementielle/` | P2 | 2.1 | M | Impressions | ⏳ |

## Mois 7–12 : croissance

| # | Action | Priorité | Dépendance | Effort | KPI | État |
|---|---|---|---|---|---|---|
| 4.1 | Revue Search Console : pages à fort taux d'impressions et faible CTR, puis réécriture des title et meta | P1 | 6 mois de données | S par mois | CTR | ⏳ |
| 4.2 | Décision sur la page Marseille (et la page Aix) selon les impressions réelles | P1 | 4.1 | M | — | ⏳ |
| 4.3 | Guides 4 à 7 (voir l'architecture §6), seulement si l'expertise est démontrable | P2 | — | M chacun | Impressions | ⏳ |
| 4.4 | Optimisation de la conversion : tests sur les CTA et le formulaire | P2 | Outil d'audience | M | Taux d'envoi du devis | ⏳ |
| 4.5 | Auto-hébergement des polices si les Core Web Vitals l'exigent | P3 | 1.8 | S | LCP | ⏳ |
| 4.6 | Bilan annuel et feuille de route de l'année 2 | P1 | — | M | — | ⏳ |

## Prochaines décisions (par ordre d'urgence)

1. **Valider et mettre en ligne** la branche `seo/fondations` (1.2).
2. **Fournir les mentions légales** (1.3) et donner **l'accès Google** pour Search Console et GBP (1.4, 1.6).
3. **Choisir l'outil d'audience** et son budget (1.7).
4. **Choisir la technique** pour les nouvelles pages (2.1) et valider les 2 premières pages : renfort d'agence et séminaire.
5. **Réunir de la matière réelle** : cas clients, photos, fourchettes de budget.
