# Architecture SEO cible — SENSUS

*Version du 26/10/2026. Proposition à valider : aucune nouvelle page n'est créée sans accord, ni sans contenu réel pour la remplir.*

## 1. Le problème

Le site tient sur **une seule URL** (`/`). Elle peut se classer sur la marque et sur une ou deux expressions larges (« agence événementielle Aix-en-Provence »). En revanche, elle ne peut pas répondre à la fois à des intentions distinctes :
- « organiser un séminaire d'entreprise en Provence » : un acheteur RH ou de direction, avec un budget, un lieu et un hébergement à trouver ;
- « renfort agence événementielle » : une agence qui cherche un sous-traitant en marque blanche ;
- « agence événementielle Marseille » : une recherche géographique locale.

Google choisit une page par intention. Sans page dédiée, SENSUS n'existe pas sur ces requêtes.

## 2. Principes

1. **Une URL = une intention distincte** et un contenu qui ne dit pas la même chose qu'ailleurs.
2. **Pas de pages géographiques en copier-coller.** Une page « Marseille » n'existe que si elle contient du spécifique : lieux, contraintes logistiques, réseau de prestataires, cas réels à Marseille.
3. **Pas de page creuse.** Une page de service sans cas, ni méthode, ni FAQ propre fait plus de mal que de bien (contenu jugé de faible qualité).
4. **Garder `/`** comme page pilier : marque, vision, toutes les offres, devis.
5. **Format d'URL** : minuscules, sans accents, avec barre oblique finale. Sur GitHub Pages, `/organisation-seminaire-entreprise/` correspond au fichier `organisation-seminaire-entreprise/index.html`.
6. **Aucune URL existante ne change** : il n'y en a qu'une, et elle reste. Il n'y a donc pas de redirection 301 à prévoir aujourd'hui.

## 3. Évaluation des URL candidates

| URL candidate | Intention | Distincte de `/` ? | Contenu réel disponible aujourd'hui ? | Décision |
|---|---|---|---|---|
| `/organisation-seminaire-entreprise/` | Transactionnelle : une entreprise prépare un séminaire (lieu, hébergement, programme, budget) | Oui, nettement | Partiel : la méthode et la FAQ sur les délais existent, il manque des cas | **Créer en priorité (vague 1)** |
| `/renfort-agence-evenementielle/` | B2B : une agence cherche de la sous-traitance ou de la marque blanche | Oui, la cible est différente des entreprises finales | Oui : l'offre « Renfort agence » est déjà décrite et c'est un vrai différenciant | **Créer en priorité (vague 1)** |
| `/organisation-soiree-entreprise/` | Transactionnelle : soirée annuelle, de fin d'année, de lancement | Oui | Partiel : l'exemple de conducteur de soirée existe | **Vague 1 ou 2**, selon la matière disponible |
| `/agence-evenementielle-marseille/` | Locale | Oui, mais risque de doublon avec Aix | Faible : rien de spécifique à Marseille aujourd'hui | **Vague 2**, seulement avec des lieux, des prestataires ou un cas réel à Marseille |
| `/agence-evenementielle-aix-en-provence/` | Locale | **Non** : l'accueil cible déjà Aix (title, H1, siège) | — | **Ne pas créer.** `/` porte Aix. Risque de cannibalisation. |
| `/production-evenementielle/` | Informationnelle et commerciale, plus large | Recouvre `/` à 80 % | — | **Ne pas créer** pour l'instant. `/` porte cette expression. |
| `/coordination-evenementielle/` | Prestation de coordination le jour J | Partiellement | Partiel | **Vague 2**, ou section approfondie de `/` |
| `/partenariats-sponsoring-evenementiel/` | Organisateurs qui cherchent des sponsors | Oui | Faible, aucun cas | **Vague 3**, sous forme de guide (« Comment trouver des sponsors pour un événement ») plutôt qu'une page de service |
| `/realisations/` | Réassurance, recherches de marque | Oui | **Aucun** cas publiable aujourd'hui | **Créer dès que 2 ou 3 cas réels** sont documentés et autorisés |
| `/contact/` | Navigationnelle | Non : le formulaire est déjà dans `/#devis` | — | **Ne pas créer** (doublon) |
| `/mentions-legales/` | Légale | Oui | Oui, une fois les crochets remplis | **Créer** (vague 1). Aujourd'hui c'est une boîte de dialogue. Une page dédiée, non prioritaire au crawl, est plus propre. |

### Arbitrage avec l'étude de mots-clés (`SEO_KEYWORD_RESEARCH.md`)

L'étude des résultats du 26/10 apporte trois éléments :
- **Renfort d'agence** : aucune agence concurrente identifiée ne présente cette offre, seuls des freelances (Malt) sortent. C'est la confirmation la plus nette d'une page à créer en vague 1 (`/renfort-agence-evenementielle/`), avec le vocabulaire « marque blanche », « production déléguée », « externaliser la production ».
- **Séminaire** : sur « organisation séminaire Provence » et « séminaire entreprise Aix », les résultats sont surtout des lieux et des plateformes de réservation. Une page d'agence qui explique la méthode (cadrage, rétroplanning, inscriptions, coordination) a donc un angle libre. La page `/organisation-seminaire-entreprise/` doit traiter la Provence et Aix dans son contenu, plutôt que de multiplier les URL.
- **Page Aix** : l'étude recommande une page dédiée (`/agence-evenementielle-aix-en-provence/`), car plusieurs concurrents en ont une. **Décision proposée : pas tout de suite.** Depuis le 26/10, l'accueil cible déjà « agence événementielle Aix-en-Provence » (title et H1), et créer une seconde page sur la même intention risque la cannibalisation. Critère de revue à M+3 : si Search Console montre que l'accueil ne gagne pas d'impressions sur les requêtes « Aix », on crée la page Aix et l'accueil se recentre sur la marque.
- **Annuaires et offices de tourisme** (La Fabrique du Net, Evénementiel pour tous, offices de tourisme d'Aix et de Marseille, Bureau des Congrès de Marseille) : ils dominent les requêtes locales. S'y inscrire est une action hors site prioritaire (voir `SEO_LOCAL_STRATEGY.md`).

## 4. Arborescence cible

```
/                                         Pilier : agence de production événementielle, Aix & Marseille
├── /organisation-seminaire-entreprise/   Vague 1
├── /organisation-soiree-entreprise/      Vague 1-2
├── /renfort-agence-evenementielle/       Vague 1
├── /coordination-evenementielle/         Vague 2
├── /agence-evenementielle-marseille/     Vague 2 (avec contenu local réel)
├── /realisations/                        Dès que des cas réels existent
│   └── /realisations/<cas>/
├── /guides/                              Vague 3 (contenus éditoriaux, voir §6)
│   └── /guides/<sujet>/
└── /mentions-legales/                    Vague 1
```

## 5. Maillage interne

- Depuis `/`, chaque carte de mission (onglets `#missions`) et chaque carte « Pour qui » renvoie vers la page de service correspondante (« En savoir plus → »).
- Chaque page de service renvoie vers `/#devis` (ou un formulaire pré-rempli avec le type d'événement), vers 1 ou 2 services complémentaires et, plus tard, vers les réalisations liées.
- La page Marseille renvoie vers les services, et les services y renvoient dans leur paragraphe « Où nous intervenons ».
- Pied de page : liste des pages de services, mentions légales.
- Ancres de lien descriptives (« organisation de séminaire d'entreprise ») plutôt que « cliquez ici ».

## 6. Stratégie éditoriale B2B (Phase 6)

Priorisation qualitative : intérêt client × intention × potentiel commercial × capacité de SENSUS à apporter une vraie expertise. Les volumes de recherche ne sont **pas mesurés** (il faudra Search Console, puis un outil de mots-clés).

| Priorité | Sujet | Requête principale (à valider) | Intention | Page de service liée | Pourquoi SENSUS est légitime |
|---|---|---|---|---|---|
| 1 | Budget d'un séminaire d'entreprise : les postes à prévoir | budget séminaire entreprise | Informationnelle à forte valeur commerciale | `/organisation-seminaire-entreprise/` | Production et pilotage du budget, cœur du métier |
| 2 | Rédiger le conducteur d'un événement (avec un modèle) | conducteur événementiel modèle | Informationnelle | `/coordination-evenementielle/` | Le site montre déjà un conducteur, c'est un savoir-faire concret |
| 3 | Externaliser la production d'un événement : quand et comment | production événementielle externalisée | Commerciale | `/renfort-agence-evenementielle/` | Offre de renfort et de marque blanche |
| 4 | Organiser une soirée d'entreprise : rétroplanning | organiser soirée entreprise | Informationnelle et commerciale | `/organisation-soiree-entreprise/` | Coordination terrain |
| 5 | Trouver des sponsors pour son événement | trouver sponsor événement | Informationnelle | (future page partenariats) | Offre de partenariats et d'activations |
| 6 | Choisir un lieu de séminaire en Provence | lieu séminaire Provence | Informationnelle locale | séminaire, Marseille | Seulement si SENSUS connaît réellement ces lieux. Ne pas lister des lieux non visités. |
| 7 | Agence événementielle ou producteur : quelle différence ? | différence agence événementielle producteur | Informationnelle | `/` | Positionnement de « production » |

### Gabarit de brief pour chaque contenu

À remplir avant rédaction :
- mot-clé principal, mots-clés secondaires, intention ;
- title (≤ 60 caractères) et meta description (≤ 155 caractères) ;
- plan H1/H2/H3 ;
- éléments **propres à SENSUS** : exemples vécus, chiffres réels, méthode. S'il n'y en a pas, on ne publie pas ;
- illustrations : photos réelles de terrain, schéma, modèle téléchargeable ;
- liens internes (au moins 1 page de service et `/#devis`) ;
- CTA adapté (par exemple « Faire chiffrer votre séminaire ») ;
- sources à vérifier (barèmes, réglementation, TVA).

### Exemple de brief prêt : « Budget d'un séminaire d'entreprise »

- **Title** : Budget d'un séminaire d'entreprise : les postes à prévoir · SENSUS
- **Meta** : Lieu, hébergement, transport, restauration, technique, animation : les postes d'un budget de séminaire et les erreurs à éviter, par une agence de production.
- **H1** : Budget d'un séminaire d'entreprise : les postes à prévoir
- **H2** : Les 7 postes d'un budget de séminaire · Ce qui fait varier le coût (saison, durée, lieu, nombre de participants) · Les coûts oubliés · Comment construire un budget réaliste · Externaliser le pilotage : ce que fait une agence de production · FAQ
- **À fournir par SENSUS** : fourchettes réellement observées sur ses projets (sinon pas de chiffres), erreurs fréquentes vécues sur le terrain.
- **Liens** : `/organisation-seminaire-entreprise/` et `/#devis`.
- **CTA** : « Faire chiffrer votre séminaire ».

## 7. Mise en œuvre technique (dès validation)

Le site actuel n'a ni gabarit ni build. Pour plusieurs pages, deux options :
- **A. HTML statique dupliqué** : rapide, mais l'en-tête, le pied de page et le CSS sont copiés dans chaque page, donc la maintenance devient risquée au-delà de 4 ou 5 pages.
- **B. Générateur statique léger (recommandé à partir de 3 pages)**, par exemple Eleventy ou Astro, construit par GitHub Actions et publié sur GitHub Pages : en-tête, pied, CSS et données structurées partagés, sitemap généré automatiquement.

Décision attendue : A ou B. Le choix n'a aucun effet sur les URL publiques.

## 8. Moteurs de réponse IA (Phase 7)

Ce qui est étayé : les moteurs IA (Google AI Overviews, Bing et Copilot, Perplexity, ChatGPT avec recherche) s'appuient sur les index de recherche classiques. Les leviers sont donc les mêmes que pour le SEO, avec une exigence de clarté accrue :
- **Définitions explicites** : chaque page de service ouvre par une phrase du type « SENSUS est une agence de production événementielle qui… », et non par une formule de marque seule. C'est déjà fait pour le H1 de l'accueil depuis le 26/10.
- **Réponses directes** : FAQ courtes et factuelles. L'accueil en a 5, chaque page de service aura les siennes.
- **Cohérence des informations publiques** : mêmes nom, prestations, zone et coordonnées sur le site, GBP, LinkedIn et les annuaires.
- **HTML sémantique et données structurées exactes** : en place.
- **Mentions externes authentiques** (presse locale, partenaires, annuaires) : c'est le principal levier de « notoriété » de l'entité.

Ce qui est volontairement écarté, faute de preuve sérieuse :
- **`llms.txt`** : aucun grand moteur ne déclare l'utiliser à ce jour. Pas d'ajout.
- Balises ou « prompts » cachés destinés aux IA : manipulateur et inefficace.
- Aucune garantie de citation par ChatGPT, Gemini, Perplexity ou AI Overviews ne peut être donnée.
