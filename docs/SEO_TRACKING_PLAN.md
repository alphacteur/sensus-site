# Plan de mesure — SENSUS

*Version du 26/10/2026. Rien n'est installé sur le site à ce jour : aucun traceur, aucun cookie. Toute installation qui dépose des cookies ou collecte des données personnelles passe par une validation, et doit respecter les règles de la CNIL (consentement).*

## 1. Objectif

Relier le SEO aux **demandes de devis**, pas seulement au trafic :
recherche → page d'entrée → lecture de l'offre → clic « Demander un devis » → formulaire envoyé (ou appel, ou e-mail).

## 2. Outils

| Outil | Rôle | Cookies | Coût | Statut |
|---|---|---|---|---|
| **Google Search Console** (propriété « Domaine ») | Indexation, requêtes, impressions, clics, CTR, positions, Core Web Vitals de terrain, liens | Aucun sur le site | Gratuit | **Bloqué** : vérification par enregistrement TXT DNS chez Squarespace, accès Google de SENSUS nécessaire |
| **Bing Webmaster Tools** | Idem pour Bing (et les moteurs qui utilisent son index) | Aucun | Gratuit | À faire après Search Console (import possible) |
| **Mesure d'audience** | Pages d'entrée, sources, conversions | Selon l'outil | Selon l'outil | **À valider**, voir §3 |
| **Google Business Profile Performance** | Actions locales | Aucun sur le site | Gratuit | Bloqué (fiche à créer) |

## 3. Choix de l'outil d'audience (décision attendue)

| Option | Consentement nécessaire (CNIL) | Avantages | Inconvénients |
|---|---|---|---|
| **A. Outil exempté de consentement** (Matomo configuré selon la recommandation CNIL, ou équivalent exempté) | **Non**, si la configuration exemptée est respectée | Pas de bandeau cookies, mesure de tous les visiteurs, design préservé | Hébergement payant, ou auto-hébergement impossible sur GitHub Pages |
| **B. Outil sans cookies** (Plausible ou équivalent) | Non, en général (à vérifier selon la configuration) | Léger (< 2 Ko), pas de bandeau, événements personnalisés | Abonnement payant |
| **C. GA4** | **Oui** : bandeau de consentement obligatoire | Gratuit, intégration Google | Bandeau qui casse le design premium, données partielles (refus), mise en conformité plus lourde |

**Recommandation : B ou A**, pour préserver le design sans bandeau. Il faut une validation de la dépense (abonnement) avant toute installation.

## 4. Événements à mesurer

| Événement | Déclencheur technique dans `index.html` | Données envoyées |
|---|---|---|
| `devis_cta_clic` | Clic sur un lien `href="#devis"` (en-tête, accueil, menu, barre mobile) | Emplacement du bouton |
| `devis_etape` | Passage à l'étape 2 ou 3 du formulaire (`show(n)`) | Numéro d'étape |
| `devis_envoye` | Envoi réussi (`ok === true` dans le gestionnaire `submit`) | Type d'événement, tranche de budget. **Jamais** le nom, l'e-mail, le téléphone ni le message. |
| `devis_echec` | Envoi échoué (affichage de l'alternative par mailto) | Aucune |
| `email_clic` | Clic sur un lien `mailto:` | Emplacement |
| `tel_clic` | Clic sur un lien `tel:` | Emplacement |
| `faq_ouverture` | Ouverture d'un `<details>` de la FAQ | Question (texte du `summary`) |

Mise en œuvre prévue : un petit module `track(nom, props)` qui ne fait rien tant qu'aucun outil n'est validé, appelé depuis les gestionnaires existants. Aucun changement visuel.

## 5. Attribution des demandes

- **Source de la demande** : la source de la visite (organique, direct, référent) est rattachée à l'événement `devis_envoye` par l'outil d'audience.
- **Côté commercial** : dans le suivi des demandes de Théo, une colonne « Comment nous avez-vous connus ? », remplie lors du premier appel (Google, recommandation, LinkedIn, annuaire…). C'est la seule mesure fiable pour les appels et les e-mails directs.
- Les rapports ne contiennent **jamais** de nom, d'e-mail ni de téléphone. Ils sont uniquement agrégés.

## 6. Rythme

- **Hebdomadaire**, les 3 premiers mois : couverture d'indexation dans Search Console, erreurs.
- **Mensuel** : tableau `SEO_DASHBOARD.md`, comparé au mois précédent et, au bout d'un an, au même mois de l'année précédente (saisonnalité forte : les séminaires au printemps et à l'automne, les soirées en décembre).
