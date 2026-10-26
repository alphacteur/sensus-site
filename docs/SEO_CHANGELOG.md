# Journal des modifications SEO — SENSUS

## 2026-10-26 · Branche `seo/pages-vague-1` (non mise en ligne, validation attendue)

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
