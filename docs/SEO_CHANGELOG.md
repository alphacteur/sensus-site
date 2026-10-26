# Journal des modifications SEO — SENSUS

## 2026-10-26 · Branche `seo/fondations` (non mise en ligne)

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
