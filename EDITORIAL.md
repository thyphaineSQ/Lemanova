# Ligne éditoriale — Blog Lemany

Objectif : qu'une PME romande qui cherche une solution à son problème (site web, app, outil digital, automatisation) tombe sur un article Lemany et se dise **« c'est exactement mon problème — et ils ont la solution »**.

## Le lecteur

Dirigeant·e ou responsable d'une PME de Suisse romande (5–50 personnes). Pas technique, pas le temps. Il/elle ne cherche pas « développement d'application web sur mesure » — il/elle cherche « comment arrêter de tout refaire dans Excel », « relances clients oubliées », « prise de rendez-vous en ligne artisan ».

## Règles d'écriture

1. **Commencer par le problème, jamais par la solution.** Le premier paragraphe décrit la situation vécue, avec des détails concrets et reconnaissables (le fichier `final_v3_VRAI.xlsx`, le reporting du vendredi soir, la relance « à faire lundi »). Le lecteur doit se reconnaître dans les 3 premières lignes.
2. **Zéro jargon technique.** Pas de « stack », « API », « backend », « framework ». On parle de temps perdu, d'erreurs, de clients qui attendent, de trésorerie.
3. **Des chiffres parlants.** Heures perdues par semaine, CHF par an, jours de délai. Contexte suisse : coûts en CHF, exemples romands. Les chiffres doivent être des calculs que le lecteur peut refaire (fréquence × durée × coût horaire), pas des résultats inventés attribués à des clients.
4. **Empathie sincère, pas de culpabilisation.** Excel n'est pas l'ennemi, l'équipe n'est pas fautive. Le message : « c'est normal d'en être là, et il existe une sortie simple ».
5. **La solution reste simple et progressive.** On montre le premier pas, pas le projet pharaonique. Lemany apparaît comme le partenaire qui rend ça facile — sans auto-promotion lourde (une mention de « nos clients » ou « nos projets » suffit, le CTA de la page fait le reste).
6. **Titre = la recherche Google du lecteur.** Le titre reprend les mots du problème tels que le lecteur les taperait ou les penserait, pas les nôtres. Bon : « Votre site ne vous amène aucun client ? Voici pourquoi ». Mauvais : « Optimiser son acquisition digitale ».

## Format d'un article

Un article = **un objet dans `articles.js`**. Tout le reste est généré.

| Champ | Obligatoire | Contenu |
| --- | --- | --- |
| `id` | oui | kebab-case, court, avec les mots-clés du problème. Donne l'URL `article-<id>.html`. |
| `category` | oui | exactement l'une de `Automatisation` \| `IA` \| `SEO` \| `SaaS` \| `Product thinking` \| `Process`. |
| `title` | oui | le titre affiché (H1, blog, liens entre articles). |
| `seoTitle` | non | balise `<title>` si elle doit différer du titre affiché (viser 50–60 caractères). Par défaut : `title`. |
| `date` | oui | format français, ex. `5 août 2026`. C'est elle qui ordonne le blog. |
| `minutes` | oui | temps de lecture, 4 à 8. |
| `image` | oui | `null` (motif coloré) ou une URL. |
| `excerpt` | oui | 1–2 phrases : le problème + la promesse. Sert aussi de meta description Google. |
| `links` | non | les 2 pages de services affichées en bas d'article, ex. `['services-automatisation.html', 'services-crm.html']`. Par défaut : les pages associées à la catégorie. |
| `content` | oui | 4 à 6 paragraphes (chaînes de caractères). Structure : ① la scène vécue → ② le coût réel chiffré → ③ la sortie, simple et progressive → ④ le conseil actionnable ou le signal d'alarme. |

Le nouvel article se place **en première position** du tableau `articles`.

## Publication

```sh
node -e "import('./articles.js').then(m => console.log(m.articles.length + ' articles OK'))"   # articles.js est valide
node generate-articles.js                                                                      # régénère tout
```

`generate-articles.js` lit `articles.js` et `article-template.html`, puis écrit :

- `article-<id>.html` pour chaque article (en-tête, données structurées, liens « précédent / suivant ») ;
- la liste de repli « TOUS LES ARTICLES » de `blog.html` (visible si le runtime ne charge pas `articles.js`) ;
- les entrées `<url>` des articles dans `sitemap.xml`.

Le script est idempotent : sans nouvel article, il ne produit aucune modification. Il refuse de tourner si une catégorie, une date ou un lien de service est invalide. Pour changer la mise en page de **tous** les articles (navigation, pied de page, styles), on modifie `article-template.html` et on relance le script.

## Sujets déjà traités

Ne jamais refaire un sujet déjà couvert, même sous un angle voisin — vérifier les `id` et les titres dans `articles.js` avant d'écrire :

prix d'un site internet · l'IA en PME (7 cas) · ROI de l'automatisation · faut-il créer une app · délais de développement · SEO local · assistant IA support client · refonte de site (7 signes) · CRM sur mesure ou du marché · réservation en ligne sans commission · les 5 tâches répétitives · MVP en 4 semaines · sortir d'Excel · idée d'app en une phrase · relances automatiques · consolidation du vendredi soir · portail client ou e-mails · outils qui ne se parlent pas · devis trop lents · avis Google · la personne qui sait tout · rapports de chantier ressaisis · onboarding des nouveaux · agents IA pour la comptabilité (Genève/Vaud) · agent IA pour répondre au téléphone et prendre les rendez-vous (Genève/Vaud).

## Réservoir de sujets (pain points → à décliner)

- Relances et factures : facturation QR à la main, acomptes oubliés, délais d'encaissement.
- Excel débordé : fichiers partagés, doubles saisies, formules cassées, versions concurrentes.
- Clients qui attendent : « où en est ma commande ? », suivi de livraison, service après-vente.
- Visibilité : site invisible sur mobile, lenteur, pages de services absentes, contenu jamais mis à jour.
- Terrain et bureau : planning des interventions, gestion du stock, matériel prêté jamais rendu.
- Croissance : refuser des clients faute de capacité, recrutement, absorption d'un pic saisonnier.
- Données : sauvegardes, accès qui restent ouverts après un départ, dépendance à un prestataire.
- Idées d'app : par où commencer, combien ça coûte vraiment, erreurs classiques, quand s'arrêter.

Varier les catégories d'un jour à l'autre.
