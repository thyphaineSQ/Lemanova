# Handover — Routine de publication quotidienne du blog Lemany

Ce document sert de passation à une nouvelle session/compte Claude qui reprendrait
cette routine automatisée. Il résume l'objectif, le fonctionnement, les fichiers
impliqués et les pièges déjà rencontrés — pour éviter de refaire les mêmes erreurs.

## Objectif

Publier, une fois par jour, un nouvel article de blog sur `lemany.ch` (repo GitHub
`thyphaineSQ/Lemanova`), directement sur `main`, sans PR ni validation manuelle.

**Autorisation** : la propriétaire du site (Thyphaine) a explicitement autorisé
cette routine spécifique à pousser directement sur `main`. Ne pas étendre cette
autorisation à d'autres tâches sur ce repo.

## Déclenchement

Tâche planifiée (scheduled task) sur un compte Claude, avec le prompt complet
stocké dans la configuration du schedule. Le prompt exact utilisé jusqu'ici est
reproduit en annexe en bas de ce fichier — à copier tel quel dans la nouvelle
tâche planifiée.

## Fichiers clés

| Fichier | Rôle |
|---|---|
| `EDITORIAL.md` | Ligne éditoriale complète : ton, règles d'écriture, format d'un article, réservoir de sujets. **À lire intégralement avant chaque rédaction.** |
| `articles.js` | Source de vérité : tableau JS `articles`. Le **premier élément devient l'article vedette** de `blog.html`. |
| `generate-articles.js` | Génère `articles/<id>.html` (une page par article) et `sitemap.xml` à partir de `articles.js`. À relancer après chaque ajout. |
| `articles/*.html` | Pages générées (ne pas éditer à la main — seront écrasées au prochain `node generate-articles.js`). |
| `blog.html` | Page de listing du blog. Charge `articles.js` en JS et affiche la liste + l'article vedette. Contient aussi une liste statique de secours (`#articles-statiques`) pour le cas où le JS ne charge pas. |
| `sitemap.xml` | Généré par `generate-articles.js` — liste toutes les pages statiques + tous les articles. |

## Procédure (étapes)

1. `git checkout main && git pull origin main`
2. Vérifier que `generate-articles.js` et `EDITORIAL.md` existent sur `main`. S'ils
   manquent (branche de configuration pas encore fusionnée), voir la section
   **Fusion de la branche de configuration** ci-dessous.
3. Lire `EDITORIAL.md` en entier.
4. Lire `articles.js` et relever **tous** les `id` et titres existants — ne jamais
   retraiter un sujet déjà couvert, même sous un angle proche.
5. Rédiger un article en français respectant strictement `EDITORIAL.md` :
   - lecteur = dirigeant·e de PME romande non technique, cherchant une solution
     à un problème concret ;
   - commencer par la scène vécue, jamais par la solution ;
   - zéro jargon technique ;
   - chiffres concrets en CHF et en heures ;
   - empathie, pas de culpabilisation ;
   - solution simple et progressive, Lemany en partenaire discret ;
   - titre = la recherche Google / pensée du lecteur ;
   - `category` : **exactement** l'une de `Automatisation` | `SaaS` |
     `Product thinking` | `Process` (voir « Pièges » ci-dessous à propos des
     catégories `IA` / `SEO` héritées) ;
   - varier la catégorie par rapport aux jours précédents (regarder les 4-6
     derniers articles par date) ;
   - 4 à 6 paragraphes, structure : scène → coût chiffré → solution progressive →
     conseil actionnable ;
   - `excerpt` : problème + promesse en 1-2 phrases (sert de meta description) ;
   - `date` au format français du jour (ex. `11 août 2026`) ;
   - `minutes` entre 4 et 8 ;
   - `id` en kebab-case avec les mots-clés du problème.
6. Insérer le nouvel objet en **première position** du tableau `articles` dans
   `articles.js`. Attention à l'échappement des apostrophes (`\'`) dans les
   chaînes entre guillemets simples ; les chaînes de `content` sont entre
   guillemets doubles (style déjà en place dans le fichier).
7. Valider : `node -e "import('./articles.js').then(m => console.log(m.articles.length + ' articles OK'))"`
8. Régénérer : `node generate-articles.js` (recrée `articles/*.html` et
   `sitemap.xml` pour **tous** les articles, pas seulement le nouveau).
9. `git add` les fichiers modifiés/générés, commit `Article du jour : <titre>`,
   puis `git push origin main` (retry avec backoff 2s/4s/8s/16s en cas d'échec
   réseau). Pas de PR, pas de push sur une autre branche.

## Fusion de la branche de configuration (si nécessaire)

La branche `claude/daily-routing-article-strategy-nketae` contient la config SEO
initiale (`EDITORIAL.md`, `generate-articles.js`, premiers articles au nouveau
format). Si elle n'est pas encore fusionnée dans `main` :

```
git fetch origin claude/daily-routing-article-strategy-nketae
git merge origin/claude/daily-routing-article-strategy-nketae --no-edit
```

**Cette fusion a déjà eu lieu le 11 août 2026** (commit `53878f4`). Elle a généré
des conflits car `main` avait continué d'évoluer en parallèle (nouveaux articles,
nouvelles pages services/secteurs). En cas de nouveau conflit similaire (ex. si
quelqu'un retravaille cette branche de config) :

- **`articles.js`** : ne jamais choisir un seul côté — les deux branches ajoutent
  souvent des articles différents au même endroit (tête de tableau). Il faut
  **garder les deux objets**, en fermant proprement chaque bloc (`]`, `},`)
  avant d'ouvrir le suivant.
- **`sitemap.xml`** : sera de toute façon régénéré par `node generate-articles.js`
  après résolution — un `git checkout --theirs sitemap.xml` suffit en attendant.
- **`blog.html`** : voir « Pièges » ci-dessous, en particulier la double
  assignation de `url` dans la fonction `view()`.

## Pièges déjà rencontrés (11 août 2026)

1. **Deux systèmes de pages d'articles coexistent.** `main` avait déjà 17 pages
   `article-<id>.html` **à la racine** (générées manuellement/autrement, avant
   l'introduction de `generate-articles.js`). La branche de config introduit un
   **second système** : `articles/<id>.html` dans un sous-dossier, généré par
   script. Après la fusion, j'ai tranché pour **`articles/<id>.html` comme
   format canonique désormais** (c'est ce que `generate-articles.js` maintient
   et ce vers quoi `blog.html` pointe). Les anciennes pages `article-<id>.html`
   à la racine restent sur le disque (non supprimées, pour ne rien casser) mais
   ne sont plus liées ni dans le sitemap. **Ne pas recréer de pages à la
   racine** pour les nouveaux articles — le système `articles/` suffit.

2. **`generate-articles.js` écrasait le sitemap avec une liste de pages
   statiques obsolète** (`apps.html`, `sites.html`, 7 pages `services-*`
   seulement) — ce qui aurait fait disparaître ~28 URLs réelles (pages
   `secteurs-*`, `services-*` manquantes, `index.html`, `contact.html`...) du
   sitemap à chaque régénération. **Corrigé** : la liste `staticPages` dans
   `generate-articles.js` contient maintenant les 30 pages statiques réelles du
   site. Si de nouvelles pages statiques sont ajoutées au site (nouveau
   `services-*.html` ou `secteurs-*.html`), penser à les ajouter aussi dans
   `staticPages`.

3. **`blog.html` : double assignation de la clé `url`** dans la fonction
   `view()` du composant (héritage d'un ancien état du fichier). Ce bug a été
   corrigé pendant la fusion — `url` pointe maintenant uniquement vers
   `articles/<id>.html`. Si un futur merge réintroduit ce genre de doublon,
   supprimer la ligne en trop.

4. **Catégories historiques `IA` et `SEO`** existent encore sur d'anciens
   articles (rédigés avant `EDITORIAL.md`), mais **ne doivent plus être
   utilisées** pour les nouveaux articles — seules `Automatisation`, `SaaS`,
   `Product thinking`, `Process` sont valides désormais. Le composant
   `catStyle()` dans `blog.html` a un style pour `IA`/`SEO` uniquement pour ne
   pas casser l'affichage des anciens articles ; ne pas s'en servir comme
   justification pour réutiliser ces catégories.

5. **Contenu dupliqué** : les 17 anciens articles existent maintenant à la fois
   sur `article-<id>.html` (racine, avec balise canonique auto-référencée) et
   sur `articles/<id>.html` (nouveau, idem). C'est un point de dette technique
   non résolu — une vraie migration propre nécessiterait des redirections, hors
   du périmètre d'une tâche de publication quotidienne. À signaler à la
   propriétaire si elle veut trancher (supprimer les anciennes pages,
   ajouter des redirections, ou les laisser s'effacer naturellement de l'index
   Google faute de liens/sitemap).

## Rappel réservoir de sujets (EDITORIAL.md)

Angles pas encore traités au 11 août 2026 : « terrain et bureau » (chantiers /
ateliers qui remontent l'info par téléphone, rapports ressaisis le soir),
« croissance » (refuser des clients faute de capacité, onboarding trop long,
personne irremplaçable qui détient tout). Vérifier `articles.js` à jour avant
de piocher dedans, la liste évolue chaque jour.

---

## Annexe — prompt exact de la tâche planifiée

```
Tu es chargé·e de publier l'article quotidien du blog Lemany (repo
thyphaineSQ/Lemanova, site statique publié sur lemany.ch). La propriétaire du
site a explicitement autorisé cette routine à publier directement sur la
branche `main`, sans pull request et sans validation manuelle.

Étapes :

1. Place-toi sur `main` et récupère la dernière version :
   `git checkout main && git pull origin main`.
2. Si `generate-articles.js` ou `EDITORIAL.md` n'existent pas encore sur main,
   fusionne d'abord la branche de configuration :
   `git fetch origin claude/daily-routing-article-strategy-nketae && git merge
   origin/claude/daily-routing-article-strategy-nketae` (elle contient la
   configuration SEO initiale approuvée par la propriétaire). Si elle est déjà
   fusionnée ou n'existe plus, continue simplement.
3. Lis `EDITORIAL.md` (ligne éditoriale complète + réservoir de sujets) et
   `articles.js` (relève TOUS les ids et titres existants pour ne jamais
   répéter un sujet déjà traité, même sous un autre angle proche).
4. Écris UN nouvel article en français qui respecte strictement EDITORIAL.md.
   Rappel des règles clés (au cas où le fichier manquerait) : lecteur =
   dirigeant·e de PME romande non technique qui cherche une solution à un
   problème concret (site web, app, outil digital, automatisation) ;
   commencer par le problème vécu, jamais par la solution ; zéro jargon
   technique ; chiffres concrets en CHF et en heures ; empathie sans
   culpabilisation ; solution simple et progressive, Lemany en partenaire
   discret (le CTA de la page fait le travail) ; titre formulé comme la
   recherche Google ou la pensée du lecteur ; catégorie exactement parmi
   « Automatisation », « SaaS », « Product thinking », « Process » (varier
   par rapport aux jours précédents) ; 4 à 6 paragraphes ; excerpt = problème
   + promesse en 1-2 phrases ; date du jour au format français (ex. « 5 août
   2026 ») ; minutes entre 4 et 8 ; id en kebab-case avec les mots-clés du
   problème.
5. Ajoute l'article en PREMIÈRE position du tableau `articles` dans
   `articles.js` (le premier devient l'article vedette). Attention à
   l'échappement des apostrophes dans les chaînes.
6. Vérifie que le fichier est valide : `node -e "import('./articles.js').then(m
   => console.log(m.articles.length + ' articles OK'))"`.
7. Si `generate-articles.js` existe, exécute `node generate-articles.js` pour
   régénérer les pages `articles/*.html` et `sitemap.xml`, et inclus ces
   fichiers générés dans le commit.
8. Commit avec un message clair du type « Article du jour : <titre> » puis
   `git push origin main`. En cas d'échec réseau, retente jusqu'à 4 fois avec
   attente croissante (2s, 4s, 8s, 16s). Ne crée PAS de pull request. Ne
   pousse sur aucune autre branche.

Termine en résumant en une phrase le titre publié et l'angle choisi.
```
