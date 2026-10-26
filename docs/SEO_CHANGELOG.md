# Journal des modifications SEO — SENSUS

## 2026-10-26 · Branche `seo/guide-conducteur` (non mise en ligne, validation attendue)

| Fichier | Modification | Motif |
|---|---|---|
| `src/pages/guide-conducteur-evenement.html` → `/guides/conducteur-evenement/` | Guide « Le conducteur d'événement : modèle et méthode » : rôle (différence avec le rétroplanning et le dossier de production), modèle de tableau (exemple de soirée de l'accueil, présenté comme illustratif), 6 étapes, 6 erreurs fréquentes, FAQ de 4 questions, liens vers les pages Soirée et Séminaire | Feuille de route 3.3. Premier contenu éditorial, adossé à un savoir-faire déjà montré sur l'accueil (le conducteur). |
| `tools/build-pages.mjs` | Gestion des articles : `path` (sous-dossier `/guides/`), `type: "article"` (JSON-LD `Article`, auteur et éditeur SENSUS), `method: false`, CTA sans type pré-rempli, CSS `.prose` et `.tbl` | Réutilisable pour les prochains guides |
| `src/pages/organisation-soiree-entreprise.html` | Lien vers le guide | Maillage |
| Pages générées, `sitemap.xml` | Régénérés (5 URL). Les pages existantes ne changent que par l'ajout du CSS commun. | — |

**À relire par Théo** : c'est du conseil de méthode, pas une affirmation sur SENSUS. Les colonnes « Responsable » et « Technique » de l'exemple sont illustratives.
**Tests (local)** : H1 unique, JSON-LD valide (`WebPage`, `Article`, `BreadcrumbList`, `FAQPage`), canonical `/guides/conducteur-evenement/`. Mobile 375 px sans débordement de page, le tableau défile dans son cadre. Console sans erreur.

## 2026-10-26 · IndexNow, non fait (validation requise)

Préparé : un fichier de clé `/<clé>.txt` à la racine, puis un envoi de la liste des URL à `api.indexnow.org`, pour que Bing (et Yandex, Seznam…) découvrent les pages sans compte. **Refusé par le système d'autorisation de l'agent**, parce que l'action poussait directement sur `main` (production) sans accord explicite. Rien n'a été créé. À faire sur accord.

## 2026-10-26 · Correctif : arrivée sur le formulaire de devis depuis les pages de services

**Constat (vérification en ligne de la page Soirée)** : un lien `/?type=…#devis` ouvert depuis une autre page arrivait en haut de l'accueil (`scrollY = 0`), au lieu du formulaire. Le défilement d'ancre `smooth` du navigateur était interrompu pendant le chargement. Les boutons devis des 3 pages de services étaient concernés.
**Correction** (`index.html`) : au `load`, si l'URL contient une ancre et que la cible n'est pas déjà en place, défilement immédiat (`behavior:"instant"`, en respectant le `scroll-padding-top` de 88 px).
**Tests (local)** : clic sur « Préparer votre soirée » → formulaire à 88 px du haut, « Soirée d'entreprise » coché. L'accueil sans ancre reste en haut. Console sans erreur.

## 2026-10-26 · Branche `seo/page-soiree`, mise en ligne le 26/10 (commit `13d9977`) : 200 en HTTPS, 301 vers l'URL avec barre oblique finale, JSON-LD et H1 conformes, 4 URL dans le sitemap, liens présents depuis l'accueil et les autres pages

| Fichier | Modification | Motif |
|---|---|---|
| `src/pages/organisation-soiree-entreprise.html` → `/organisation-soiree-entreprise/` | Page « Organisation de soirées d'entreprise à Aix et Marseille » : intention et cadrage, production et jour J, exemple de conducteur (celui de l'accueil, présenté comme un exemple), FAQ propre (5 questions), CTA avec « Soirée d'entreprise » pré-rempli | Feuille de route 2.4. Requête « organisation soirée entreprise Marseille » : résultats dominés par les plateformes de réservation de lieux, donc un angle « agence » à prendre. |
| `index.html` | Lien depuis la carte « Entreprises & marques » et dans le pied de page | Maillage |
| `src/pages/organisation-seminaire-entreprise.html` | Lien vers la page Soirée | Maillage entre services |
| Pages générées, `sitemap.xml` | Régénérés (4 URL) | — |

Contenu : uniquement des éléments déjà publiés sur l'accueil (missions, livrables, conducteur d'exemple, délai « quelques semaines si le lieu est disponible », FAQ technique et zone). Les étiquettes « Lieux, Traiteur, Technique » reprennent le conducteur d'exemple.

Tests (local) : un seul H1, JSON-LD valide (`WebPage`, `Service`, `BreadcrumbList`, `FAQPage`), canonical correcte. Mobile 375 px sans débordement, cartes sur 1 colonne. `?type=Soirée d'entreprise` coche le bon choix. 2 liens depuis l'accueil. Console sans erreur.

## 2026-10-26 · Branche `seo/pages-vague-1`, mise en ligne le 26/10 (commit `5792294` sur `main`)

**Vérification après déploiement** (build `built`) :
- Les deux pages répondent en 200 en HTTPS, sans contenu mixte. Une URL sans barre oblique finale est redirigée en 301 vers l'URL canonique.
- Title, canonical, H1 et JSON-LD (`Service`, `BreadcrumbList`, `FAQPage`) sont conformes. Pas de débordement horizontal. Console sans erreur.
- Le bouton devis de la page Séminaire mène à `/?type=Séminaire#devis`, avec « Séminaire » coché et défilement jusqu'au formulaire. `?type=Renfort agence` coche « Renfort agence ».
- L'accueil contient 4 liens vers les nouvelles pages. Le sitemap en ligne liste 3 URL.

### Fichiers

| Fichier | Modification | Motif |
|---|---|---|
| `tools/build-pages.mjs` | Générateur sans dépendance (`node tools/build-pages.mjs`). Il reprend **tel quel** le CSS, les polices, l'en-tête, la méthode, le pied de page et les mentions légales de `index.html`, puis produit `/<slug>/index.html` et `sitemap.xml`. | Option « générateur léger » de l'architecture (§7) : une seule source pour le style et les mentions légales, donc aucune divergence entre pages. |
| `src/pages/renfort-agence-evenementielle.html` → `/renfort-agence-evenementielle/` | Page « Renfort d'agence événementielle, en marque blanche » : quand faire appel, prise en charge, méthode de travail, livrables, FAQ propre (5 questions), CTA avec type de demande pré-rempli | Vague 1. Cible la requête la moins disputée de l'étude (aucune agence concurrente positionnée). |
| `src/pages/organisation-seminaire-entreprise.html` → `/organisation-seminaire-entreprise/` | Page « Organisation de séminaires d'entreprise en Provence » : cadrage, propositions, inscriptions, coordination, formules, FAQ propre | Vague 1. Angle « méthode d'agence » sur des résultats dominés par les lieux et les plateformes. |
| `index.html` | Liens vers les deux pages (panneau Séminaires, carte Agences, pied de page). Pré-sélection du type d'événement via `?type=…`. Message d'attente gris pendant l'envoi du formulaire. | Maillage, conversion (audit B5) |
| `sitemap.xml` | 3 URL (générées) | Indexation |
| `robots.txt` | `Disallow: /src/` et `/tools/` | Fichiers sources non destinés à l'exploration |

**Règle de contenu suivie** : chaque affirmation des nouvelles pages reprend une information déjà publiée sur l'accueil (missions, livrables, formules, FAQ, zone d'intervention, opérateur partenaire pour les voyages). Aucune référence, aucun chiffre, aucun lieu, aucun partenaire nommé n'est ajouté. Deux formulations sont nouvelles et à valider par Théo : « Absorber une période chargée sans recruter » et « Votre agence garde la relation client et la direction du projet ».

### Tests (serveur local, Chromium intégré)

- Les 2 pages : un seul H1, title et canonical propres, JSON-LD analysé sans erreur (`WebPage`, `Service`, `BreadcrumbList`, `FAQPage`). Tous les liens d'ancre pointent vers l'accueil (`/#…`), sauf l'évitement `#contenu`. Les CTA mènent à `/?type=…#devis`.
- Mobile 375 px : aucun élément ne dépasse de l'écran, cartes sur 1 colonne, H1 à 44 px. Ordinateur : rendu cohérent avec l'accueil.
- Accueil : `?type=Renfort%20agence` coche « Renfort agence », un type inconnu laisse « Séminaire ». Les 4 nouveaux liens sont présents. Canonical inchangée.
- Message d'attente testé avec `fetch` neutralisé (aucun envoi réel) : « L'envoi peut prendre jusqu'à une minute… », en gris.
- Console : aucune erreur JavaScript.

### Non vérifié
- Mesure PageSpeed ou Lighthouse : le quota de l'API sans clé est épuisé, et le téléchargement de Lighthouse en local a été refusé par le système d'autorisation de l'agent. À lancer sur pagespeed.web.dev.

## 2026-10-26 · Branche `seo/fondations`, mise en ligne le 26/10 (commit `ffcf6fc` sur `main`)

**Vérification après déploiement** (build GitHub Pages `built`) : page d'accueil en 200 et HTTPS sans contenu mixte. Title, meta description et H1 conformes. JSON-LD lu sans erreur. Slogan animé (7 mots). Formulaire : passage à l'étape 2 fonctionnel. Console sans erreur. Une URL inexistante renvoie un 404 avec la page « Page introuvable · SENSUS ». `logo.png`, `apple-touch-icon.png`, `robots.txt` (avec `Disallow: /docs/`) et `sitemap.xml` (lastmod au 2026-10-26) répondent en 200.

### Fichiers modifiés et créés

| Fichier | Modification | Motif |
|---|---|---|
| `index.html` | Le petit titre devient le `<h1>` : « Agence de production événementielle · Aix-en-Provence & Marseille ». Le slogan « WE DON'T CREATE EVENTS, WE CREATE MOMENTS » passe en `<p class="hero-title">`, avec le même rendu. Les sélecteurs CSS `.hero h1` deviennent `.hero .hero-title`, le JS cible `.hero-title`, et la section pointe vers `aria-labelledby="t-accueil"`. | Le H1 ne contenait aucun terme de recherche (audit T1) |
| `index.html` | `<title>` « Agence événementielle Aix-en-Provence & Marseille · SENSUS » et meta description de 150 caractères | Audit T2 et T3 |
| `index.html` | `og:title` et `twitter:title` alignés, ajout de `og:image:alt`, `og:image:type` et `twitter:image:alt` | Audit T11 |
| `index.html` | `<noscript><style>.rv{opacity:1;transform:none}</style></noscript>` | Contenu invisible sans JS (audit T8) |
| `index.html` | JSON-LD : logo en `ImageObject` PNG 512, suppression du code postal non vérifié, ajout du service « Renfort d'agence et production en marque blanche », nœud `WebPage` | Audit T7, T9, T10 |
| `index.html` | `apple-touch-icon` pointe vers `apple-touch-icon.png` | Audit T6 |
| `404.html` | Nouvelle page 404 à l'identité SENSUS, `noindex`, liens vers l'accueil et le devis | Audit T4 |
| `apple-touch-icon.png`, `logo.png` | Générés à partir du dessin du favicon (180 × 180 et 512 × 512) | Audit T6 et T7 |
| `sitemap.xml` | `lastmod` au 2026-10-26, suppression de `changefreq` et `priority` (ignorés par Google) | Audit T5 |
| `robots.txt` | `Disallow: /docs/` | Ne pas faire explorer les documents internes publiés avec le site |
| `docs/*.md` | Audit, mots-clés, concurrents, architecture, local, mesure, feuille de route, tableau de bord, journal | Livrables |

### Tests réalisés (serveur local, navigateur Chromium intégré)

- **Rendu identique sur ordinateur (1440 × 900)** : slogan à la même position (x 72, y 207), même taille (705 × 219 px), même police (Archivo 76,32 px, graisse 800), mêmes 3 lignes. Le petit titre reste sur une ligne de 19 px.
- **Mobile (375 × 812)** : slogan identique (4 lignes, 44 px). Le petit titre, plus long, passe de 2 à 3 lignes, ce qui décale le slogan de 20 px vers le bas. « Aix-en-Provence » est protégé contre la coupure au trait d'union. Pas de défilement horizontal.
- **JSON-LD** analysé sans erreur : `ProfessionalService`, `WebSite`, `WebPage`, `FAQPage`.
- **Fonctionnement** : animation mot à mot du slogan (7 mots enveloppés), formulaire étapes 1 → 2 → 3 sans envoi, ouverture et fermeture du menu. Console sans erreur JavaScript.
- **404.html** : rendu vérifié à l'écran.
- `logo.png` et `apple-touch-icon.png` vérifiés visuellement.

### Risques

- Le H1 n'est plus le slogan. C'est un choix SEO : le slogan reste visuellement identique, mais les moteurs liront d'abord l'activité et la ville. À valider par Théo.
- Le décalage de 20 px sur mobile est un effet visuel mineur.
- Les documents `docs/` seront publiés à `sensusagency.com/docs/…` une fois fusionnés dans `main`. Ils sont exclus de l'exploration par `robots.txt`, mais restent accessibles publiquement, comme tout le dépôt, qui est public.
