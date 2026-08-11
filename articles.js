// ============================================================
// ARTICLES DU BLOG — pour ajouter un article, copiez un bloc
// {...} ci-dessous et remplissez les champs. Le premier de la
// liste devient l'article vedette. category doit être l'une de :
// "Automatisation" | "IA" | "SEO" | "SaaS" | "Product thinking" | "Process"
// image : URL d'une photo (ou null pour un motif coloré)
// ============================================================
export const articles = [
  {
    id: 'logiciels-qui-ne-se-parlent-pas',
    category: 'Automatisation',
    title: 'Pourquoi retapez-vous trois fois la même information client ?',
    date: '11 août 2026',
    minutes: 6,
    image: null,
    excerpt: 'Nom, adresse, numéro de TVA : la même information ressaisie dans le devis, la facturation puis le fichier de suivi. Ce geste invisible coûte cher — et se corrige sans tout changer.',
    content: [
      "Un nouveau client appelle mardi matin. Vous ouvrez votre logiciel de devis et tapez son nom, son adresse, son numéro de TVA. Le devis part, il est accepté. Vous ouvrez alors votre logiciel de facturation — Bexio, Winbiz, ou un simple classeur — et retapez le même nom, la même adresse. Puis vous ajoutez la ligne dans votre fichier de suivi Excel, pour le prochain rappel. Trois fois la même information, trois risques de faute de frappe, et personne dans l'équipe ne le remarque vraiment — c'est juste « comme ça qu'on fait ».",
      "Chaque ressaisie prend 3 à 5 minutes. Pour une PME qui traite 15 nouveaux dossiers par semaine, cela représente 2h30 à 4h par semaine rien que pour retaper des informations déjà connues — soit 120 à 190 heures par an. À 70 CHF de l'heure chargée, cela vaut entre 8 000 et 13 000 CHF par an, sans compter les erreurs : une adresse mal recopiée fait revenir une facture, un numéro de TVA mal reporté demande une correction comptable.",
      "Il ne s'agit pas de tout changer d'un coup. On commence par relier deux points précis — par exemple faire que le nom saisi dans le devis remplisse automatiquement la facture, ou que l'acceptation d'un devis crée toute seule la ligne dans le fichier de suivi. Ce sont des automatisations ciblées, souvent invisibles pour l'équipe au quotidien, qui branchent les outils déjà en place entre eux sans en changer aucun. C'est le genre de pont sur mesure que nous construisons, pièce par pièce.",
      "Le test à faire cette semaine : demandez à chaque personne de l'équipe combien de fois elle retape le nom d'un même client dans une journée. Si la réponse dépasse deux, vous avez trouvé votre premier chantier — souvent le moins cher à corriger de tous, et celui qui rend tous les autres plus faciles ensuite."
    ]
  },
  {
    id: 'combien-coute-site-internet-suisse',
    category: 'SEO',
    title: 'Combien coûte un site internet en Suisse en 2026 ?',
    date: '30 juillet 2026',
    minutes: 7,
    image: null,
    excerpt: 'Réponse directe : entre 4 000 et 12 000 CHF pour un site vitrine professionnel. Ce qui fait varier le prix, et ce qui doit vous alerter.',
    content: [
      "Réponse courte : en Suisse romande, un site vitrine professionnel coûte généralement entre 4 000 et 12 000 CHF. Un site e-commerce se situe plutôt entre 8 000 et 25 000 CHF, et une application web sur mesure démarre autour de 15 000 CHF. Ces fourchettes correspondent à un travail sérieux : design propre, textes travaillés, référencement de base et site rapide sur mobile.",
      "Ce qui fait varier le prix : le nombre de pages, la rédaction des contenus (fournis ou à créer), le niveau de design (thème adapté ou création complète), le travail SEO (structure, mots-clés, données structurées) et les fonctionnalités — formulaire simple, réservation en ligne, paiement, multilingue.",
      "Ce qui doit vous alerter : un devis à 800 CHF « tout compris » signifie un thème générique, aucun travail de fond sur vos textes ni votre référencement — le site existera, mais ne ramènera personne. À l'inverse, un devis flou facturé au temps passé peut doubler en cours de route. Exigez un prix fixe, un périmètre écrit et des exemples concrets.",
      "La vraie question n'est pas « combien coûte le site » mais « combien rapporte-t-il ». Un site à 8 000 CHF qui génère deux demandes de devis par semaine est infiniment moins cher qu'un site à 2 000 CHF que personne ne trouve. C'est le calcul que nous faisons avec vous — avant de parler chiffres."
    ]
  },
  {
    id: 'ia-pme-cas-concrets',
    category: 'IA',
    title: 'L\'IA peut-elle aider votre PME ? 7 cas concrets qui marchent déjà',
    date: '22 juillet 2026',
    minutes: 8,
    image: null,
    excerpt: 'Oubliez la science-fiction. Voici ce que l\'IA fait déjà, aujourd\'hui, dans des PME romandes ordinaires — et ce que ça leur rapporte.',
    content: [
      "Réponse courte : oui, si vous commencez par des tâches précises et répétitives. L'IA d'aujourd'hui excelle à lire, trier, résumer, extraire et rédiger. Une PME qui lui confie ces corvées récupère typiquement 5 à 15 heures par semaine.",
      "Les 7 cas qui fonctionnent : 1) répondre aux questions fréquentes des clients, 24h/24, dans votre ton ; 2) trier et résumer les e-mails entrants pour que chacun arrive traité en réunion ; 3) extraire les données de factures, bulletins de commande et PDF vers votre comptabilité ; 4) préparer des brouillons de devis à partir d'une demande client ; 5) rédiger les comptes rendus et rapports récurrents ; 6) surveiller et synthétiser les avis clients ; 7) traduire et adapter vos contenus français-allemand-anglais.",
      "Ce que l'IA ne doit pas faire seule : décider. Dans tous nos projets, l'IA propose et un humain valide ce qui est sensible — un devis part relu, une réponse inhabituelle est escaladée. C'est ce cadre qui rend l'IA fiable en entreprise.",
      "Par où commencer : choisissez UN processus qui vous agace chaque semaine, mesurable (nombre d'e-mails, temps passé), et faites un pilote de quelques semaines. Si le gain ne se voit pas, arrêtez. Dans notre expérience, il se voit — et c'est le deuxième processus qui suit."
    ]
  },
  {
    id: 'roi-automatisation-pme',
    category: 'Automatisation',
    title: 'Quel ROI attendre de l\'automatisation ? Le calcul honnête',
    date: '15 juillet 2026',
    minutes: 6,
    image: null,
    excerpt: 'Une heure par jour de tâches répétitives = plus de 10 000 CHF par an. Comment calculer votre propre retour sur investissement, sans enthousiasme suspect.',
    content: [
      "Réponse courte : une tâche d'une heure par jour automatisée représente environ 220 heures par an. À un coût complet de 60 à 90 CHF l'heure, c'est 13 000 à 20 000 CHF de temps de travail par an — pour une automatisation qui coûte souvent moins que cela, une seule fois.",
      "Le calcul à faire chez vous : listez pendant une semaine tout ce que votre équipe fait plus d'une fois (saisies, relances, rapports, transferts entre outils). Pour chaque tâche : fréquence × durée × coût horaire complet. Classez par montant. Le haut de la liste est votre plan d'automatisation, dans l'ordre.",
      "Les gains qu'on oublie de compter : les erreurs évitées (une facture oubliée coûte plus qu'une heure de saisie), la trésorerie (des relances ponctuelles raccourcissent les délais de paiement), et la disponibilité mentale — une équipe qui ne fait plus de copier-coller trouve le temps de s'occuper des clients.",
      "Le piège classique : automatiser un processus bancal. Si le processus est flou, l'automatisation produira du chaos plus vite. On clarifie d'abord, on automatise ensuite — c'est la partie de notre travail qui ne se voit pas mais qui fait la différence."
    ]
  },
  {
    id: 'faut-il-creer-une-app',
    category: 'Product thinking',
    title: 'Faut-il créer une application pour votre entreprise ? Le test en 5 questions',
    date: '8 juillet 2026',
    minutes: 6,
    image: null,
    excerpt: 'Parfois la réponse est non — et ça vaut la peine de le savoir avant de dépenser. Les 5 questions qui tranchent.',
    content: [
      "Réponse courte : créez une application si un processus précis vous coûte du temps ou des clients chaque semaine, et qu'aucun outil du marché ne colle à votre façon de travailler. Sinon, un outil existant bien configuré — ou un simple site avec réservation — suffit souvent.",
      "Les 5 questions : 1) Quel problème précis l'app résout-elle, pour qui ? Si la réponse tient en une phrase, bon signe. 2) Combien ce problème coûte-t-il par mois, en heures ou en francs ? 3) Un outil standard le résout-il à 80 % ? Si oui, commencez par là. 4) Qui utilisera l'app chaque jour — et a-t-il été consulté ? 5) Que se passe-t-il si vous ne faites rien pendant un an ?",
      "Les mauvaises raisons de créer une app : « tout le monde a une app », « ça fera moderne », « on verra bien à quoi elle servira ». Les bonnes : des heures de double saisie chiffrées, des clients perdus faute de réservation en ligne, un Excel partagé devenu ingérable à plusieurs.",
      "Notre position est simple : lors du premier échange, il nous arrive de déconseiller le développement. Un partenaire digital qui vous vend une app inutile ne sera plus là dans deux ans — nous, si."
    ]
  },
  {
    id: 'combien-temps-developpement',
    category: 'Process',
    title: 'Combien de temps pour développer un site ou une application ?',
    date: '1 juillet 2026',
    minutes: 5,
    image: null,
    excerpt: 'Un site vitrine : 4 semaines. Un logiciel métier : 4 à 8 semaines. Pourquoi ces délais — et pourquoi plus long n\'est pas plus sérieux.',
    content: [
      "Réponse courte : chez Lemany, un site vitrine est en ligne en 4 semaines environ. Un logiciel métier, un CRM ou un portail client demande 4 à 8 semaines pour une première version utilisée par vos équipes. Un MVP de startup : 4 semaines pour le parcours essentiel.",
      "Pourquoi si vite, alors que d'autres annoncent des mois ? Parce que le temps long des projets classiques part rarement en développement : il part en spécifications interminables, en allers-retours de validation et en réunions. Notre méthode remplace tout cela par une maquette dès la semaine 2 et une démo chaque vendredi : vous validez sur du concret.",
      "Ce qui allonge vraiment un projet : des contenus qui n'arrivent pas (textes, photos), des décideurs absents aux démos, et le périmètre qui gonfle en cours de route (« tant qu'on y est... »). Ce sont les trois points que nous verrouillons au cadrage.",
      "Méfiez-vous des deux extrêmes : « votre app en 48h » produit des prototypes jetables, et « comptez 9 mois » cache souvent une organisation qui facture au temps passé. Le bon rythme livre vite ET propre — c'est possible quand le périmètre est net."
    ]
  },
  {
    id: 'seo-local-suisse-romande',
    category: 'SEO',
    title: 'SEO local : comment être trouvé à Genève, Lausanne ou Nyon',
    date: '24 juin 2026',
    minutes: 7,
    image: null,
    excerpt: '46 % des recherches Google ont une intention locale. Le guide pratique pour qu\'un client qui cherche votre métier dans votre ville tombe sur vous.',
    content: [
      "Réponse courte : pour être visible localement, il faut trois choses — une fiche Google Business Profile complète et active, un site rapide qui mentionne clairement votre ville et vos prestations, et des avis clients réguliers auxquels vous répondez. La plupart de vos concurrents ne font correctement aucune des trois.",
      "La fiche Google d'abord : catégorie exacte, horaires à jour, photos récentes, prestations listées, et surtout des publications et réponses aux avis. Une fiche active pèse plus qu'un site parfait mais que Google croit à l'abandon. Vérifiez la cohérence nom-adresse-téléphone partout où votre entreprise apparaît.",
      "Le site ensuite : une page par prestation importante, la ville dans les titres quand c'est naturel (« Garage à Nyon », pas « garage nyon pas cher meilleur »), et les données structurées schema.org LocalBusiness — invisibles pour l'humain, décisives pour Google et pour les assistants IA qui recommandent des adresses.",
      "Les avis enfin : demandez-les au bon moment (juste après une prestation réussie), rendez la démarche facile avec un lien direct, et répondez à tous — y compris les négatifs, avec calme. Un profil 4,6 avec 80 avis récents bat un 5,0 avec 6 avis de 2022.",
      "Le SEO local est le levier le plus rentable pour un commerce ou un artisan : peu de concurrents le travaillent sérieusement, et chaque position gagnée se traduit directement en appels."
    ]
  },
  {
    id: 'chatbot-ia-support-client',
    category: 'IA',
    title: 'Un assistant IA pour répondre à vos clients : gadget ou levier ?',
    date: '17 juin 2026',
    minutes: 6,
    image: null,
    excerpt: '80 % des questions clients sont les mêmes 20 questions. Ce qu\'un assistant IA bien cadré change — et les erreurs qui le rendent insupportable.',
    content: [
      "Réponse courte : un assistant IA est rentable dès que vous recevez chaque semaine des dizaines de questions répétitives — horaires, tarifs, délais, disponibilités, suivi de commande. Il répond immédiatement, 24h/24, dans votre ton, et transmet à un humain dès que la question sort du cadre.",
      "Ce qui le rend bon : il est nourri de VOS informations (vos prestations, vos tarifs, vos conditions), il dit « je ne sais pas, je transmets » au lieu d'inventer, et chaque conversation est consultable pour l'améliorer. Ce qui le rend insupportable : un robot générique qui tourne en boucle et retient le client en otage avant de donner un humain.",
      "Le gain ne se limite pas au temps : un client qui obtient sa réponse à 21h30 réserve à 21h35. Sans réponse, il continue sa recherche — chez un concurrent. L'assistant transforme des questions en rendez-vous, pas seulement en tickets résolus.",
      "Notre recommandation : commencez par un périmètre étroit — les 20 questions les plus fréquentes et la prise de rendez-vous. Mesurez un mois : questions traitées, transferts humains, rendez-vous pris. Élargissez ensuite. Un pilote sérieux se monte en quelques semaines."
    ]
  },
  {
    id: 'refonte-site-7-signes',
    category: 'SEO',
    title: 'Refonte de site web : les 7 signes qu\'il est temps',
    date: '10 juin 2026',
    minutes: 5,
    image: null,
    excerpt: 'Votre site a-t-il dépassé sa date limite ? Les 7 symptômes objectifs — et pourquoi une refonte bien menée améliore votre référencement au lieu de le casser.',
    content: [
      "Les 7 signes : 1) il se charge en plus de 3 secondes sur mobile ; 2) il n'a apporté aucune demande client le trimestre dernier ; 3) vous n'osez pas le montrer en rendez-vous ; 4) le modifier demande d'appeler quelqu'un ; 5) il est illisible sur téléphone — là où la majorité de vos visiteurs le consultent ; 6) vos concurrents sont au-dessus de vous sur Google ; 7) les informations qu'il affiche sont périmées.",
      "Deux signes suffisent. Le site n'est pas une carte de visite qu'on imprime une fois : c'est votre commercial disponible 24h/24. Un commercial lent, dépassé et injoignable, vous l'auriez remplacé depuis longtemps.",
      "La crainte classique : « une refonte va casser mon référencement ». C'est l'inverse quand elle est bien menée : on inventorie les pages qui rankent, on conserve les contenus qui travaillent, on met en place les redirections 301, et la structure plus propre et plus rapide fait généralement progresser les positions dans les mois qui suivent.",
      "Bonne nouvelle côté budget : une refonte coûte comme un nouveau site (généralement 4 000 à 12 000 CHF en Suisse romande) mais part rarement de zéro — vos contenus, votre historique Google et vos photos sont un capital qu'on réutilise."
    ]
  },
  {
    id: 'crm-sur-mesure-ou-marche',
    category: 'Product thinking',
    title: 'CRM sur mesure ou abonnement du marché : comment trancher',
    date: '3 juin 2026',
    minutes: 6,
    image: null,
    excerpt: 'HubSpot, Salesforce, ou un outil construit pour vous ? Le comparatif honnête, avec les vrais coûts sur 3 ans.',
    content: [
      "Réponse courte : si votre processus de vente est standard et votre équipe petite, un CRM du marché bien configuré suffit — commencez par là. Le sur mesure devient pertinent quand votre métier a ses règles propres, que l'équipe grandit, ou que la facture par utilisateur commence à piquer.",
      "Le calcul sur 3 ans : un CRM du marché à 50-90 CHF par utilisateur et par mois coûte, pour 8 personnes, entre 14 000 et 26 000 CHF sur 3 ans — en payant pour des dizaines de fonctions inutilisées, et en adaptant votre façon de vendre à l'outil. Un CRM sur mesure coûte généralement 8 000 à 25 000 CHF une fois, épouse exactement votre processus, et n'a pas de compteur d'utilisateurs.",
      "Les cas où le sur mesure gagne nettement : un pipeline atypique (immobilier, chantiers, mandats), des données métier au cœur de la relation (biens, dossiers, machines), le besoin de connecter devis, facturation et relances au même endroit, ou une équipe qui refuse un énième outil compliqué.",
      "Le critère final n'est pas technologique : c'est l'adoption. Le meilleur CRM est celui que votre équipe remplit. Un outil simple, dans votre vocabulaire, avec trois écrans utiles, bat un mastodonte à 40 onglets que personne n'ouvre."
    ]
  },
  {
    id: 'reservation-en-ligne-sans-commission',
    category: 'Automatisation',
    title: 'Réservation en ligne : pourquoi payer une commission sur vos propres clients ?',
    date: '27 mai 2026',
    minutes: 5,
    image: null,
    excerpt: 'Les plateformes de réservation prennent leur part sur chaque client — y compris vos habitués. L\'alternative : la réservation sur votre propre site.',
    content: [
      "Le modèle des plateformes de réservation est habile : elles vous amènent des clients, puis prélèvent une commission sur tous les clients — y compris vos habitués qui seraient venus de toute façon, et qui prennent l'habitude de passer par la plateforme. Vous financez l'intermédiaire qui s'installe entre vous et votre clientèle.",
      "L'alternative : un module de réservation intégré à votre propre site. Réservation 24h/24, confirmations et rappels automatiques par e-mail ou SMS, gestion des créneaux et des capacités — et zéro commission, pour toujours. Le coût unique (généralement 2 500 à 8 000 CHF selon les intégrations) s'amortit souvent en moins d'un an de commissions évitées.",
      "L'autre enjeu, plus important que la commission : les données. Sur votre système, les coordonnées et l'historique de vos clients vous appartiennent. Vous pouvez les faire revenir — offre de saison, rappel d'entretien, relance des clients qui ne sont pas venus depuis 6 mois. Sur une plateforme, cet actif appartient à la plateforme.",
      "La stratégie raisonnable : gardez les plateformes comme canal d'acquisition pour les nouveaux clients si elles vous en apportent, et faites de votre site le canal principal — celui vers lequel pointent votre fiche Google, vos réseaux et vos rappels."
    ]
  },
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
