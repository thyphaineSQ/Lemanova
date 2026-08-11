# Handover — Routine de publication quotidienne du blog Lemany

Ce document sert de passation à une nouvelle session/compte Claude qui reprendrait
cette routine automatisée. Il résume l'objectif, le fonctionnement, les fichiers
impliqués et les pièges déjà rencontrés — pour éviter de refaire les mêmes erreurs.

**Dernière mise à jour** : 11 août 2026, après reconciliation de deux exécutions
concurrentes de la routine dans la même journée (voir « Historique » en bas).

## Objectif

Publier, une fois par jour, un nouvel article de blog sur `lemany.ch` (repo GitHub
`thyphaineSQ/Lemanova`), directement sur `main`, sans PR ni validation manuelle.

**Autorisation** : la propriétaire du site (Thyphaine) a explicitement autorisé
cette routine spécifique à pousser directement sur `main`. Ne pas étendre cette
autorisation à d'autres tâches sur ce repo.

## Déclenchement

Tâche planifiée (scheduled task) sur un compte Claude. Le prompt exact est
reproduit en annexe en bas de ce fichier.

## Fichiers clés

| Fichier | Rôle |
|---|---|
| `EDITORIAL.md` | Ligne éditoriale complète : ton, règles d'écriture, format d'un article, procédure de publication, sujets déjà traités, réservoir de sujets. **À lire intégralement avant chaque rédaction** — c'est la référence, ce présent fichier ne fait que la compléter côté opérationnel/pièges. |
| `articles.js` | Source unique de vérité : tableau JS `articles`. Le **premier élément devient l'article vedette** de `blog.html`. Tout le reste (pages, sitemap, liste de repli) est généré à partir de lui. |
| `article-template.html` | Gabarit HTML avec placeholders (`{{TITLE}}`, `{{PARAGRAPHS}}`, etc.). Pour changer la mise en page de **tous** les articles (nav, pied de page, styles), on édite ce fichier puis on relance le générateur. |
| `generate-articles.js` | Lit `articles.js` + `article-template.html`, écrit `article-<id>.html` pour chaque article, met à jour la liste de repli dans `blog.html` et les entrées `<url>` des articles dans `sitemap.xml`. **Idempotent** : relancé sans changement, il ne touche aucun fichier. Refuse de tourner si une catégorie/date/lien de service est invalide. |
| `article-<id>.html` | Pages générées, **à la racine du repo** (pas de sous-dossier `articles/`). Ne pas éditer à la main — écrasées au prochain `node generate-articles.js`. |
| `blog.html` | Page de listing. Charge `articles.js` en JS pour l'affichage dynamique + contient une liste statique de secours (`#articles-statiques` / balise `<ul>`) mise à jour par le générateur, au cas où le JS ne charge pas. |
| `sitemap.xml` | Bloc des URLs d'articles géré par le générateur ; les autres URLs (pages statiques du site) sont à maintenir à la main si de nouvelles pages sont créées. |

## Procédure (étapes)

1. `git checkout main && git pull origin main`
2. Lire `EDITORIAL.md` en entier (il contient déjà la liste des sujets traités
   et le réservoir de sujets à jour — s'y fier en priorité sur ce fichier-ci).
3. Lire `articles.js` pour confirmer les `id`/titres/dates les plus récents et
   choisir une catégorie différente de celle des derniers jours.
4. Rédiger un article en français respectant strictement `EDITORIAL.md` :
   - lecteur = dirigeant·e de PME romande non technique ;
   - commencer par la scène vécue, jamais par la solution ;
   - zéro jargon technique, chiffres concrets en CHF/heures (calculables par
     le lecteur : fréquence × durée × coût horaire — pas des résultats
     inventés attribués à de vrais clients) ;
   - `category` exactement l'une de `Automatisation` | `IA` | `SEO` | `SaaS`
     | `Product thinking` | `Process` (liste définie dans `CATEGORIES` en
     tête de `generate-articles.js` — vérifier là en cas de doute, c'est la
     source de vérité technique) ;
   - `id` en kebab-case, `date` au format français du jour, `minutes` 4–8,
     `excerpt` = problème + promesse, `content` = 4 à 6 paragraphes ;
   - `links` (optionnel) : deux pages de services pertinentes, ex.
     `['services-automatisation.html', 'services-crm.html']` — sinon le
     générateur prend les valeurs par défaut de la catégorie
     (`LIENS_PAR_DEFAUT` dans `generate-articles.js`). Les valeurs doivent
     exister dans l'objet `SERVICES` du même fichier, sinon le script lève
     une erreur.
5. Insérer le nouvel objet en **première position** du tableau `articles`
   dans `articles.js`. Attention à l'échappement des apostrophes.
6. Valider :
   `node -e "import('./articles.js').then(m => console.log(m.articles.length + ' articles OK'))"`
7. Régénérer : `node generate-articles.js`. Inclure dans le commit tous les
   fichiers modifiés qu'il rapporte (nouvelle page `article-<id>.html`,
   `blog.html`, `sitemap.xml` — souvent aussi quelques pages voisines dont les
   liens « précédent/suivant » se décalent).
8. `git add -A` (ou fichiers ciblés), commit `Article du jour : <titre>`,
   `git push origin main` (retry avec backoff 2s/4s/8s/16s en cas d'échec
   réseau). **Avant de pousser, faire un `git fetch origin main` et vérifier
   qu'on n'est pas en retard** — voir « Collision entre deux exécutions »
   ci-dessous, déjà arrivé une fois.

## Pièges déjà rencontrés

### 1. Bug SEO critique : `noindex` propagé à tous les articles (corrigé le 11 août 2026)

`article-template.html` est à la fois (a) le gabarit source lu par
`generate-articles.js` pour produire chaque page, et (b) un fichier réellement
accessible publiquement à `/article-template.html`. Une session a ajouté
`<meta name="robots" content="noindex, nofollow">` dans ce fichier pour éviter
que Google n'indexe le gabarit brut (qui affiche ses `{{PLACEHOLDERS}}` tels
quels) — **sans réaliser que ce tag se propage alors dans les 23 vraies pages
d'articles** à la prochaine régénération, puisque le générateur fait une simple
substitution de chaînes sur ce même fichier.

**Correction appliquée** : `pageArticle()` dans `generate-articles.js` retire
maintenant ce bloc (commentaire + balise `noindex`) du template avant de faire
les substitutions, donc `article-template.html` reste `noindex` mais toutes les
pages générées restent indexables. **Vérifier après chaque
`node generate-articles.js`** qu'aucune page `article-*.html` ne contient
`noindex` (seul `article-template.html` doit l'avoir) :
```
grep -l noindex article-*.html   # ne doit renvoyer que article-template.html
```
Si un futur changement de `article-template.html` réintroduit ce genre de
balise « à ne pas propager », penser à l'exclure explicitement du même endroit
dans `pageArticle()`.

### 2. Collision entre deux exécutions de la routine le même jour

Le 11 août 2026, deux sessions ont tourné sur des prompts différents (l'une
avait un contexte périmé référençant une ancienne branche de config avec un
système `articles/<id>.html` en sous-dossier, entretemps abandonné sur `main`
au profit du système actuel `article-<id>.html` à la racine). Résultat : deux
séries de commits divergents poussées sur `main` à quelques minutes d'intervalle,
avec un conflit de push (`! [rejected] ... fetch first`) et une réconciliation
manuelle nécessaire (voir commit `b35f7f4`).

**Leçon** : toujours faire `git pull origin main` juste avant de commencer à
écrire (étape 1), et refaire un `git fetch origin main` juste avant le push
final au cas où une autre exécution aurait tourné entretemps. Si le push est
rejeté pour cause de divergence réelle (pas une erreur réseau), ne pas
retenter bêtement le même push : `git fetch`, inspecter
`git log --oneline main..origin/main`, puis `git merge origin/main` (en
résolvant un éventuel conflit sur `articles.js` en gardant les deux articles,
jamais en écrasant l'un par l'autre) avant de pousser.

### 3. Il n'existe plus de système `articles/<id>.html` en sous-dossier

Une itération antérieure de cette routine (documentée dans une version
précédente de ce fichier, désormais obsolète) avait introduit un système
parallèle avec un sous-dossier `articles/` et un `generate-articles.js`
différent, généré à partir d'une branche de configuration séparée. **Ce
système a été abandonné et retiré** au profit du système actuel décrit plus
haut (`article-<id>.html` à la racine, généré depuis `article-template.html`).
Si un sous-dossier `articles/` réapparaît dans le repo ou qu'un ancien prompt
de tâche planifiée y fait référence, c'est un signe que le prompt planifié est
périmé — le mettre à jour avec la procédure de ce fichier.

## Rappel réservoir de sujets

Voir la section « Réservoir de sujets » et « Sujets déjà traités » dans
`EDITORIAL.md` — elles sont tenues à jour à chaque publication et font foi
(plus fiables que ce fichier-ci pour cette partie, qui évolue vite).

---

## Annexe — prompt de la tâche planifiée

Le prompt ci-dessous est celui utilisé jusqu'ici. Il référence encore l'ancien
système `articles/` + branche de configuration (voir piège n°3 ci-dessus) — il
est recommandé de le mettre à jour pour pointer vers la procédure actuelle
(section « Procédure » de ce fichier) avant de le réutiliser tel quel.

```
Tu es chargé·e de publier l'article quotidien du blog Lemany (repo
thyphaineSQ/Lemanova, site statique publié sur lemany.ch). La propriétaire du
site a explicitement autorisé cette routine à publier directement sur la
branche `main`, sans pull request et sans validation manuelle.

Étapes :

1. Place-toi sur `main` et récupère la dernière version :
   `git checkout main && git pull origin main`.
2. Lis `EDITORIAL.md` (ligne éditoriale complète + réservoir de sujets) et
   `articles.js` (relève TOUS les ids et titres existants pour ne jamais
   répéter un sujet déjà traité, même sous un autre angle proche).
3. Écris UN nouvel article en français qui respecte strictement EDITORIAL.md.
   Rappel des règles clés (au cas où le fichier manquerait) : lecteur =
   dirigeant·e de PME romande non technique qui cherche une solution à un
   problème concret (site web, app, outil digital, automatisation) ;
   commencer par le problème vécu, jamais par la solution ; zéro jargon
   technique ; chiffres concrets en CHF et en heures (calculables par le
   lecteur, pas des résultats inventés attribués à des clients) ; empathie
   sans culpabilisation ; solution simple et progressive, Lemany en
   partenaire discret ; titre formulé comme la recherche Google ou la pensée
   du lecteur ; catégorie exactement parmi celles listées dans `CATEGORIES`
   au début de `generate-articles.js` (varier par rapport aux jours
   précédents) ; 4 à 6 paragraphes ; excerpt = problème + promesse en 1-2
   phrases ; date du jour au format français (ex. « 11 août 2026 ») ; minutes
   entre 4 et 8 ; id en kebab-case avec les mots-clés du problème.
4. Ajoute l'article en PREMIÈRE position du tableau `articles` dans
   `articles.js` (le premier devient l'article vedette). Attention à
   l'échappement des apostrophes dans les chaînes.
5. Vérifie que le fichier est valide : `node -e "import('./articles.js').then(m
   => console.log(m.articles.length + ' articles OK'))"`.
6. Exécute `node generate-articles.js` pour régénérer les pages
   `article-*.html`, la liste de repli de `blog.html` et `sitemap.xml`, et
   inclus tous les fichiers modifiés dans le commit.
7. Avant de pousser, `git fetch origin main` pour vérifier qu'aucune autre
   exécution n'a poussé entretemps ; si oui, fusionne proprement (garder les
   deux articles en cas de conflit sur `articles.js`) avant de continuer.
8. Commit avec un message clair du type « Article du jour : <titre> » puis
   `git push origin main`. En cas d'échec réseau, retente jusqu'à 4 fois avec
   attente croissante (2s, 4s, 8s, 16s). Ne crée PAS de pull request. Ne
   pousse sur aucune autre branche.

Termine en résumant en une phrase le titre publié et l'angle choisi.
```

## Historique de ce fichier

- **11 août 2026, matin** : première version, écrite après une fusion qui a
  introduit par erreur un système `articles/<id>.html` en sous-dossier en
  parallèle du système existant à la racine.
- **11 août 2026, après-midi** : réécriture complète après qu'une autre
  session a réconcilié les deux exécutions concurrentes de la journée et
  confirmé le système `article-<id>.html` à la racine comme le seul valide.
  Correction au passage d'un bug `noindex` qui aurait déindexé tout le blog.
