# Audit SEO — sensusagency.com

*Audit du 26/10/2026, branche `seo/fondations`. Toutes les mesures ci-dessous ont été faites ce jour-là, sur le site en ligne ou sur le dépôt `alphacteur/sensus-site`. Aucune donnée de trafic, de position ni de score Lighthouse n'est inventée : quand une mesure demande un outil absent, c'est indiqué.*

## 1. Le projet en bref

| Élément | Constat | Vérification |
|---|---|---|
| Technologie | Site statique en **un seul fichier** `index.html` (HTML, CSS et JS en ligne, environ 88 Ko). Aucun framework, aucune étape de build. | Lecture du dépôt |
| Fichiers SEO | `robots.txt`, `sitemap.xml`, `CNAME`, `favicon.svg`, `og-image.png` (1200 × 630), `.nojekyll` | `ls` du dépôt |
| Routes | Une seule URL indexable : `/`. Les sections sont des ancres (`#missions`, `#pour-qui`, `#formules`, `#devis`, `#faq`). | Lecture du HTML |
| Rendu | Tout le texte est dans le HTML servi, rien n'est injecté uniquement par JavaScript. Le JS ajoute seulement les animations (titre mot à mot, apparition `.rv`), le menu, les onglets et le formulaire. | Comparaison du HTML brut et du DOM rendu |
| Hébergement | GitHub Pages (déploiement depuis `main`, racine), domaine `sensusagency.com`, certificat Let's Encrypt valable jusqu'au 21/01/2027 | API GitHub Pages, `curl`, lecture du certificat |
| Formulaire | FormSubmit (AJAX vers `theo@sensusagency.com`), activé et testé le 23/10 | Deux envois de test, le second reçu par Théo |
| Ressources externes | Google Fonts : Archivo (variable, 90 Ko), Instrument Sans (30 Ko), Instrument Serif (2 × ~22 Ko) en `display=swap`. Aucune image dans la page, aucun traceur. | Téléchargement des fichiers de police |

## 2. Constats vérifiés

Gravité : **Critique** (bloque l'indexation ou la conversion), **Haute**, **Moyenne**, **Basse**. Priorité : P1 (à faire tout de suite) à P3 (plus tard).

### A. SEO technique

| # | Constat | Méthode | Gravité | Impact SEO estimé | Correction | Priorité | Fichiers | État |
|---|---|---|---|---|---|---|---|---|
| T1 | **Le H1 ne contient aucun mot-clé.** Le seul `<h1>` était le slogan anglais « WE DON'T CREATE EVENTS, WE CREATE MOMENTS ». Rien sur l'agence, l'événementiel, Aix ou Marseille. | Extraction des titres | Haute | Le H1 est un des signaux de pertinence les plus lisibles pour Google et les moteurs IA. | Le petit titre au-dessus devient le `<h1>` (« Agence de production événementielle · Aix-en-Provence & Marseille »). Le slogan reste un `<p class="hero-title">` avec exactement le même rendu. | P1 | `index.html` | **Corrigé** |
| T2 | La balise `<title>` ne contenait pas l'expression « agence événementielle » | Lecture du `<head>` | Haute | Le title est le premier facteur de pertinence et de clic dans la page de résultats. | « Agence événementielle Aix-en-Provence & Marseille · SENSUS » (57 caractères) | P1 | `index.html` | **Corrigé** |
| T3 | La meta description ne citait pas le renfort d'agence, et « Devis sous 48 h » ne correspond pas exactement au texte de la page (« première proposition sous 48 h ouvrées »). | Lecture | Moyenne | CTR | Description réécrite (150 caractères, prestations clés, « Réponse sous 48 h ») | P1 | `index.html` | **Corrigé** |
| T4 | Pas de page 404 personnalisée : GitHub Pages servait sa page générique. | `curl https://sensusagency.com/nope-404` → 404 GitHub | Moyenne | Expérience perdue sur les liens cassés, aucun retour vers le devis | `404.html` à l'identité SENSUS, `noindex`, liens vers l'accueil et le devis | P2 | `404.html` | **Corrigé** |
| T5 | `sitemap.xml` : `lastmod` au 21/10 alors que la page a changé le 26/10. `changefreq` et `priority` sont ignorés par Google. | Lecture | Basse | Fraîcheur du crawl | `lastmod` au 26/10, champs inutiles retirés | P2 | `sitemap.xml` | **Corrigé** |
| T6 | `apple-touch-icon` pointait vers `og-image.png` (1200 × 630, format paysage) | Lecture et dimensions de l'image | Basse | Icône déformée sur iOS et pour certains agrégateurs | `apple-touch-icon.png` 180 × 180 généré d'après le favicon | P3 | `apple-touch-icon.png`, `index.html` | **Corrigé** |
| T7 | Le `logo` des données structurées était un SVG (`favicon.svg`). Google recommande une image matricielle d'au moins 112 × 112. | Lecture du JSON-LD | Moyenne | Éligibilité du logo dans le panneau de marque | `logo.png` 512 × 512 et `ImageObject` | P2 | `logo.png`, `index.html` | **Corrigé** |
| T8 | Les sections `.rv` sont à `opacity:0` jusqu'à l'exécution du JS, sans `<noscript>` : sans JavaScript, la majorité du contenu est invisible. | Lecture du CSS et du JS | Moyenne | Google exécute le JS, mais d'autres robots (aperçus de liens, certains moteurs IA) non. | `<noscript><style>.rv{opacity:1;transform:none}</style></noscript>` | P1 | `index.html` | **Corrigé** |
| T9 | Les données structurées affirmaient un code postal (13100) qu'aucune information publique vérifiée ne confirme : l'adresse des mentions légales est encore « [Adresse du siège] ». | Comparaison du JSON-LD et des mentions légales | Moyenne | Incohérence NAP (nom, adresse, téléphone), risque de confiance | `postalCode` retiré. Ville et région conservées (affichées sur le site). | P1 | `index.html` | **Corrigé**, à compléter (voir B1) |
| T10 | Le catalogue de services du JSON-LD ne citait que 5 prestations sur 6 (il manquait le renfort d'agence et la marque blanche) | Comparaison avec le texte | Basse | Cohérence | Service ajouté, plus un nœud `WebPage` relié au site et à l'organisation | P2 | `index.html` | **Corrigé** |
| T11 | `og:image:alt` et `twitter:image:alt` absents, et `og:title` différent du positionnement | Lecture | Basse | Accessibilité des aperçus de partage | Ajout des balises alt, titres OG et Twitter alignés | P3 | `index.html` | **Corrigé** |
| T12 | `https://sensusagency.com/index.html` répond 200 (doublon de `/`) | `curl` | Basse | Faible : la canonical absolue vers `/` neutralise le doublon | Rien à faire, la canonical suffit | — | — | Vérifié |
| T13 | HTTP → HTTPS et www → apex : redirections 301 correctes | `curl` sur les 4 variantes | — | — | — | — | — | Vérifié, conforme |
| T14 | `robots.txt` autorise tout et déclare le sitemap. `meta robots` en `index, follow, max-image-preview:large`. | Lecture et `curl` | — | — | Ajout de `Disallow: /docs/` pour que ces documents internes ne soient pas explorés | — | `robots.txt` | **Corrigé** |
| T15 | Langue : `<html lang="fr">`. Le slogan anglais est balisé `lang="en"`. | Lecture | — | — | — | — | — | Conforme |
| T16 | Hiérarchie : les titres de pied de page sont des `h4` sans `h3` parent. Les `h2` de section sont des formules de marque (« De l'idée au terrain. ») sans terme de recherche. | Extraction des titres | Basse / Moyenne | Signal sémantique faible par section | Ajouter des sur-titres descriptifs (kickers) ou reformuler les `h2` : c'est un choix éditorial | P2 | `index.html` | **À valider** |
| T17 | Architecture en page unique : une seule URL pour toutes les intentions (Aix, Marseille, séminaire, soirée, renfort d'agence…) | Lecture | **Haute** | C'est le principal plafond de visibilité : une seule page ne peut pas se classer sur des intentions distinctes. | Voir `SEO_SITE_ARCHITECTURE.md` | P1 | nouvelles pages | **À valider** |
| T18 | Aucune vérification Search Console ni Bing Webmaster | Absence de balise et de fichier de vérification. L'accès aux comptes n'a pas été vérifié. | Haute | Aucune donnée d'indexation ni de requêtes | Créer la propriété « Domaine » dans Search Console (vérification par TXT DNS chez Squarespace) | P1 | DNS | **Bloqué** (accès Google) |

### B. Contenu, crédibilité, conversion

| # | Constat | Gravité | Correction recommandée | Priorité | État |
|---|---|---|---|---|---|
| B1 | **Les mentions légales contiennent encore des crochets** : « [Forme juridique, ex. EI / SASU] · [Adresse du siège] · SIRET [numéro] ». C'est une obligation légale (LCEN) et un signal de confiance très visible. | **Critique** | Fournir la forme juridique, l'adresse et le SIRET | P1 | **Bloqué** (infos manquantes) |
| B2 | Aucune preuve : ni référence client, ni réalisation, ni photo réelle, ni avis. La page est bien écrite mais n'apporte aucune démonstration d'expertise. | Haute | Constituer 2 ou 3 cas réels documentés (avec accord des clients), des photos de terrain et des avis Google authentiques. Rien ne sera inventé. | P1 | **À faire** (contenus à fournir) |
| B3 | Le fondateur est nommé (Théo Voyer) mais sans parcours : expérience, projets passés, réseau. | Moyenne | Un court bloc « Qui est derrière SENSUS », avec un lien vers son LinkedIn s'il existe | P2 | **À valider** |
| B4 | Les appels à l'action sont clairs et récurrents (« Demander un devis », formulaire en 3 étapes, téléphone et e-mail visibles). | — | Conserver | — | Conforme |
| B5 | L'envoi du formulaire via FormSubmit prend entre 24 et 47 s (mesures du 23/10) pendant lesquelles le visiteur ne voit que « Envoi en cours… » | Moyenne | Afficher « Envoi en cours, cela peut prendre jusqu'à une minute », ou changer de service d'envoi | P2 | **À valider** |
| B6 | Les offres « Mission ponctuelle / Pilotage / Renfort agence » sont claires, sans prix (« sur devis ») | — | Conserver. Ne pas afficher de prix sans décision. | — | Conforme |

### C. Performance

| # | Constat | Méthode | Gravité | Recommandation | État |
|---|---|---|---|---|---|
| P1 | HTML de 88 Ko, **24 Ko compressé** (gzip actif), temps avant le premier octet d'environ 0,2 s depuis la France | `curl` | — | — | Conforme |
| P2 | Aucune image dans la page : l'élément LCP (le plus grand affiché) est probablement le titre-slogan, animé mot par mot (`translateY` puis apparition sur 1,1 s avec des délais). L'effet de l'animation sur le LCP n'est **pas mesuré**. | Lecture du CSS | Moyenne | Mesurer avec PageSpeed Insights ou les données CrUX une fois le site indexé. Si le LCP est pénalisé, raccourcir le délai de l'animation. | **Non vérifié** |
| P3 | Polices : 4 fichiers depuis Google Fonts (environ 170 Ko au total pour l'alphabet latin), 2 connexions tierces, `preconnect` en place | Téléchargement | Basse | Auto-héberger les polices supprimerait 2 connexions tierces. Restreindre les axes d'Archivo ne réduit pas le fichier (testé). | **À faire** (P3) |
| P4 | Cache imposé par GitHub Pages : `max-age=600`, impossible à configurer | En-têtes HTTP | Basse | Accepter, ou passer derrière un CDN (Cloudflare) | Limite d'hébergement |
| P5 | Pas d'en-tête HSTS (GitHub Pages ne permet pas de le configurer) | En-têtes HTTP | Basse | Sans effet SEO direct | Limite d'hébergement |
| P6 | Le CSS et le JS en ligne ne bloquent pas de requête externe. Le JS est en fin de page. | Lecture | — | — | Conforme |
| P7 | Core Web Vitals réels (LCP, INP, CLS) | — | — | Pas de données CrUX tant que le site n'a pas de trafic. PageSpeed Insights n'a pas été lancé dans cet audit. | **Non vérifié** |

## 3. Non vérifiable avec les outils disponibles

- **Indexation réelle** (pages indexées, couverture, requêtes, impressions, clics) : il faut Google Search Console.
- **Positions Google** : elles varient selon la localisation et l'historique. Il faut Search Console ou un outil de suivi de positions.
- **Core Web Vitals de terrain** : il faut CrUX ou PageSpeed Insights, et un trafic suffisant.
- **Backlinks** : il faut Search Console (rubrique Liens) ou Ahrefs, Semrush, Majestic.
- **Fiche Google Business Profile** : son existence et son état n'ont pas été vérifiés (accès au compte requis).
- **Bing** : il faut Bing Webmaster Tools.

## 4. Synthèse

Les fondations techniques sont saines : HTTPS, redirections, rendu sans dépendre du JS, données structurées, poids léger. Les freins principaux ne sont pas techniques :
1. **Une seule page** pour toutes les intentions de recherche (T17).
2. **Aucune preuve** visible : références, réalisations, avis (B2).
3. **Mentions légales incomplètes** (B1).
4. **Aucun outil de mesure** connecté (T18).

Les corrections techniques sûres sont faites sur la branche `seo/fondations`. Le détail figure dans `SEO_CHANGELOG.md`.
