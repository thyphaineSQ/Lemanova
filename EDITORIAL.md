# Ligne éditoriale — Blog Lemany

Objectif : qu'une PME romande qui cherche une solution à son problème (site web, app, outil digital, automatisation) tombe sur un article Lemany et se dise **« c'est exactement mon problème — et ils ont la solution »**.

## Le lecteur

Dirigeant·e ou responsable d'une PME de Suisse romande (5–50 personnes). Pas technique, pas le temps. Il/elle ne cherche pas « développement d'application web sur mesure » — il/elle cherche « comment arrêter de tout refaire dans Excel », « relances clients oubliées », « prise de rendez-vous en ligne artisan ».

## Règles d'écriture

1. **Commencer par le problème, jamais par la solution.** Le premier paragraphe décrit la situation vécue, avec des détails concrets et reconnaissables (le fichier `final_v3_VRAI.xlsx`, le reporting du vendredi soir, la relance « à faire lundi »). Le lecteur doit se reconnaître dans les 3 premières lignes.
2. **Zéro jargon technique.** Pas de « stack », « API », « backend », « framework ». On parle de temps perdu, d'erreurs, de clients qui attendent, de trésorerie.
3. **Des chiffres parlants.** Heures perdues par semaine, CHF par an, jours de délai. Contexte suisse : coûts en CHF, exemples romands.
4. **Empathie sincère, pas de culpabilisation.** Excel n'est pas l'ennemi, l'équipe n'est pas fautive. Le message : « c'est normal d'en être là, et il existe une sortie simple ».
5. **La solution reste simple et progressive.** On montre le premier pas, pas le projet pharaonique. Lemany apparaît comme le partenaire qui rend ça facile — sans auto-promotion lourde (une mention de « nos clients » ou « nos projets » suffit, le CTA fait le reste).
6. **Titre = la recherche Google du lecteur.** Le titre reprend les mots du problème tels que le lecteur les taperait ou les penserait, pas les nôtres. Bon : « Votre site ne vous amène aucun client ? Voici pourquoi ». Mauvais : « Optimiser son acquisition digitale ».

## Format d'un article

- Fichier : un objet dans `articles.js` (le premier de la liste = article vedette).
- `id` : kebab-case, court, avec les mots-clés du problème.
- `category` : exactement l'une de `Automatisation` | `SaaS` | `Product thinking` | `Process`.
- `date` : format français (« 4 août 2026 »), `minutes` : 4–8.
- `excerpt` : 1–2 phrases, le problème + la promesse. C'est aussi la meta description Google.
- `content` : 4–6 paragraphes (chaînes de caractères). Structure : ① la scène vécue → ② le coût réel chiffré → ③ la sortie, simple et progressive → ④ le conseil actionnable ou le signal d'alarme.

Après chaque ajout : `node generate-articles.js` pour régénérer les pages `articles/*.html` et `sitemap.xml` (indispensable pour Google).

## Réservoir de sujets (pain points → à décliner)

- Relances et factures : facturation QR à la main, relances oubliées, délais d'encaissement.
- Excel débordé : fichiers partagés, doubles saisies, consolidation manuelle, formules cassées.
- Clients qui attendent : « où en est ma commande ? », devis trop lents, pas de suivi en ligne.
- Visibilité : site vitrine obsolète, invisible sur Google, pas de prise de rendez-vous en ligne, avis clients non exploités.
- Terrain et bureau : chantiers/ateliers qui remontent l'info par téléphone, rapports ressaisis le soir.
- Croissance : « on refuse des clients parce qu'on est débordés », onboarding des nouveaux qui prend des semaines, la personne irremplaçable qui détient tout.
- Outils qui ne se parlent pas : ressaisir la même donnée dans 3 logiciels, exports/imports permanents.
- Idées d'app : par où commencer, combien ça coûte vraiment, MVP, erreurs classiques.

Varier les catégories d'un jour à l'autre. Ne jamais refaire un sujet déjà traité (vérifier les `id` et titres existants dans `articles.js`).
