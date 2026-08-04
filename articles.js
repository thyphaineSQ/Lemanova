// ============================================================
// ARTICLES DU BLOG — pour ajouter un article, copiez un bloc
// {...} ci-dessous et remplissez les champs. Le premier de la
// liste devient l'article vedette. category doit être l'une de :
// "Automatisation" | "SaaS" | "Product thinking" | "Process"
// image : URL d'une photo (ou null pour un motif coloré)
// ============================================================
export const articles = [
  {
    id: 'site-internet-sans-clients',
    category: 'Product thinking',
    title: 'Votre site est joli. Pourquoi n\'amène-t-il aucun client ?',
    date: '4 août 2026',
    minutes: 6,
    image: null,
    excerpt: 'Un site vitrine qui ne génère ni appel ni demande de devis n\'est pas une fatalité. Les 3 raisons les plus fréquentes — et la plus ignorée.',
    content: [
      "Vous avez un site. Il est propre, les photos sont belles, les horaires sont à jour. Et pourtant : les nouveaux clients arrivent toujours par le bouche-à-oreille, jamais par le site. Quand on demande « il vous rapporte quoi, votre site ? », la réponse honnête est souvent : on ne sait pas. Probablement rien.",
      "Première raison, la plus fréquente : personne ne le trouve. Votre site parle de vous (« Bienvenue chez Dupont SA, entreprise familiale depuis 1987 ») alors que vos futurs clients cherchent leur problème (« fuite d\'eau urgence Lausanne », « remplacer fenêtres prix »). Google ne fait pas le lien — donc il ne vous montre pas.",
      "Deuxième raison : on vous trouve, mais on ne peut rien faire. Pas de prise de rendez-vous, pas de demande de devis en deux clics, juste un numéro de téléphone — que votre visiteur consulte à 22h, quand vous ne répondez pas. Il note « rappeler demain », et demain il a trouvé quelqu\'un d\'autre.",
      "Troisième raison, la plus ignorée : le site vit tout seul. Personne ne regarde combien de personnes le visitent, d\'où elles viennent, sur quelle page elles abandonnent. Sans ces chiffres, impossible de savoir si le problème est d\'être trouvé, de convaincre ou de conclure — alors on ne corrige rien.",
      "La bonne nouvelle : aucun de ces trois problèmes ne demande de refaire le site de zéro. Une page pensée autour des recherches réelles de vos clients, un moyen d\'agir en deux clics, et des mesures simples pour voir ce qui se passe — c\'est souvent l\'affaire de quelques semaines. Le test à faire ce soir : tapez sur Google ce qu\'un client taperait pour résoudre son problème (pas le nom de votre entreprise). Si vous n\'apparaissez pas sur la première page, vous savez par où commencer."
    ]
  },
  {
    id: 'taches-repetitives-pme',
    category: 'Automatisation',
    title: 'Les 5 tâches que votre PME refait chaque semaine (et comment les supprimer)',
    date: '2 juillet 2026',
    minutes: 8,
    image: null,
    excerpt: 'Facturation, relances, consolidation Excel : le vrai coût des tâches répétitives, chiffré sur des cas romands — et par où commencer.',
    content: [
      "Chaque semaine, la même scène : la facture recopiée depuis le devis, la relance client notée « à faire lundi », le tableau Excel consolidé le vendredi soir. Individuellement, ces tâches semblent anodines. Mises bout à bout, elles représentent souvent 8 à 15 heures par semaine dans une PME de 10 à 30 personnes.",
      "Le calcul est simple : 10 heures hebdomadaires à un coût complet de 80 CHF/heure, c'est plus de 40 000 CHF par an — pour du travail qu'une machine fait mieux, sans oubli et sans vendredi soir.",
      "Par où commencer ? Par la tâche la plus fréquente, pas la plus complexe. Une relance automatique à J+15 se met en place en quelques jours et produit un effet immédiat sur la trésorerie. La consolidation des chiffres vient ensuite : un tableau de bord alimenté en continu remplace le rituel du vendredi.",
      "Notre conseil : listez pendant une semaine tout ce que votre équipe fait plus d'une fois. Cette liste vaut de l'or — c'est le cahier des charges de votre première automatisation."
    ]
  },
  {
    id: 'mvp-4-semaines',
    category: 'SaaS',
    title: 'MVP en 4 semaines : ce qu\'on garde, ce qu\'on coupe',
    date: '18 juin 2026',
    minutes: 6,
    image: null,
    excerpt: 'Un MVP n\'est pas un produit au rabais : c\'est un produit qui répond à une seule question. Voici comment on tranche.',
    content: [
      "La plupart des projets SaaS échouent avant d'exister : trop de fonctionnalités prévues, trop de temps avant la première mise en ligne, plus de budget pour itérer. Un MVP en 4 semaines force les bonnes décisions.",
      "Ce qu'on garde : le parcours qui crée de la valeur (celui pour lequel un client paierait), l'authentification, et un moyen de mesurer l'usage. Ce qu'on coupe : les rôles et permissions complexes, les préférences, les exports, tout ce qui commence par « il faudrait aussi ».",
      "La règle qu'on applique : si une fonctionnalité ne change pas la réponse à « est-ce que quelqu'un paiera pour ça ? », elle attend la V2. C'est inconfortable — et c'est exactement pour ça que ça marche."
    ]
  },
  {
    id: 'sortir-excel-methode-douce',
    category: 'Process',
    title: 'Sortir d\'Excel sans tout casser : la méthode douce',
    date: '4 juin 2026',
    minutes: 7,
    image: null,
    excerpt: 'Excel n\'est pas l\'ennemi — c\'est le symptôme. Comment migrer progressivement sans bloquer l\'équipe.',
    content: [
      "Excel est probablement le meilleur outil de gestion jamais créé — jusqu'au jour où trois personnes travaillent sur le même fichier, où « final_v3 » côtoie « final_v3_VRAI », et où une formule cassée passe inaperçue pendant deux mois.",
      "L'erreur classique : vouloir tout remplacer d'un coup. L'équipe perd ses repères, résiste, et retourne à Excel en douce. La méthode douce : on remplace un seul usage à la fois, en commençant par celui qui fait le plus mal — souvent la saisie partagée.",
      "Concrètement : l'application reprend d'abord la structure de vos fichiers actuels, colonne par colonne. L'équipe retrouve ses habitudes, mais avec des données fiables, un historique et des droits d'accès. Les automatisations arrivent ensuite, une fois la confiance installée.",
      "Dans nos projets, la bascule complète prend 4 à 8 semaines — et personne ne regrette le fichier partagé."
    ]
  },
  {
    id: 'idee-app-une-phrase',
    category: 'Product thinking',
    title: 'Votre idée d\'app tient-elle en une phrase ?',
    date: '21 mai 2026',
    minutes: 5,
    image: null,
    excerpt: 'Le test le plus simple pour savoir si un projet digital est prêt à démarrer — ou s\'il a besoin d\'un cadrage.',
    content: [
      "« On aimerait une app pour mieux gérer les commandes. » Cette phrase paraît claire — elle ne l'est pas. Mieux gérer pour qui ? Quelles commandes ? Qu'est-ce qui coince aujourd'hui ?",
      "Le test qu'on fait passer à chaque projet : compléter « [Qui] utilise l'app pour [faire quoi] au lieu de [la situation actuelle] ». Si la phrase se complète en 30 secondes, le projet est mûr. Sinon, il manque un cadrage — et c'est une excellente nouvelle de le découvrir avant de développer.",
      "Exemple réel : « Les chefs d'atelier saisissent l'avancement sur tablette au lieu de le dicter au bureau le soir. » Une phrase, un utilisateur, un gain mesurable. Le projet s'est cadré en une réunion."
    ]
  },
  {
    id: 'relances-automatiques-encaissements',
    category: 'Automatisation',
    title: 'Relances clients automatiques : +18% d\'encaissements à J+30',
    date: '7 mai 2026',
    minutes: 6,
    image: null,
    excerpt: 'Personne n\'aime relancer. Résultat : personne ne relance. Ce qui change quand la machine s\'en charge.',
    content: [
      "La relance client est la tâche la plus rentable et la plus détestée d'une PME. Elle arrive toujours après le reste — c'est-à-dire souvent jamais. Les chiffres de nos clients avant automatisation : première relance envoyée en moyenne 24 jours après l'échéance.",
      "Une séquence automatique change tout : rappel courtois à J+5, relance ferme à J+15, alerte interne à J+30 pour un appel humain. Le ton reste le vôtre — les messages sont écrits une fois, avec vous.",
      "Résultat mesuré sur 6 mois chez un client romand : +18% d'encaissements à 30 jours, et surtout zéro relance oubliée. Le plus surprenant : aucune réaction négative des clients. Une relance polie et ponctuelle est perçue comme du professionnalisme."
    ]
  },
  {
    id: 'vendredi-soir-consolidation',
    category: 'Process',
    title: 'Le vendredi soir de trop : consolider ses chiffres à la main',
    date: '23 avril 2026',
    minutes: 4,
    image: null,
    excerpt: 'Si votre reporting hebdomadaire demande plus de 15 minutes, ce n\'est pas un reporting — c\'est un deuxième métier.',
    content: [
      "Le rituel est connu : exporter trois fichiers, copier-coller dans le tableau maître, vérifier que les totaux tombent juste, refaire parce qu'ils ne tombent pas juste. Une à trois heures, chaque semaine, souvent le vendredi en fin de journée.",
      "Un tableau de bord connecté à vos sources fait ce travail en continu. La vraie différence n'est pas le temps gagné — c'est que les chiffres du mardi matin sont aussi fiables que ceux du vendredi soir. Les décisions ne s'attendent plus.",
      "Le signal d'alarme : si quelqu'un dans votre équipe est « la seule personne qui sait faire le reporting », vous n'avez pas un processus, vous avez un risque."
    ]
  },
  {
    id: 'portail-client-ou-emails',
    category: 'Product thinking',
    title: 'Portail client ou emails ? Le calcul est vite fait',
    date: '9 avril 2026',
    minutes: 5,
    image: null,
    excerpt: '« Où en est ma commande ? » — si cette question arrive plus de 5 fois par semaine, la réponse est un portail.',
    content: [
      "Chaque « où en est ma commande ? » coûte deux fois : le temps de chercher la réponse, et l'interruption de la personne qui la cherche. À 10 demandes par semaine et 15 minutes par demande, c'est plus de 100 heures par an.",
      "Un portail client n'a pas besoin d'être ambitieux : une page, l'état des commandes en cours, les documents à télécharger. C'est tout. Les clients préfèrent consulter que demander — et vos équipes préfèrent travailler que répondre.",
      "Bonus inattendu constaté chez nos clients : le portail devient un argument commercial. « Vous suivrez tout en ligne » rassure plus qu'une promesse de réactivité."
    ]
  }
];
