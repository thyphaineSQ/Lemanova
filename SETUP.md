# Mise en service du chatbot Lemany

Le chatbot est prêt côté code : widget sur toutes les pages (`chatbot-widget.js`)
+ backend serverless (`api/chat.js`) qui appelle Claude (Anthropic), avec recherche
web, capture de leads par email (Resend) et escalade des questions sans réponse
vers Slack.

Il reste 3 choses à faire côté comptes/hébergement, que le code seul ne peut pas
faire à votre place.

## 1. Créer les comptes et récupérer les clés

- **Anthropic** — vous avez déjà une clé API (`ANTHROPIC_API_KEY`).
- **Resend** (envoi d'email des leads) — créez un compte sur resend.com,
  onglet *API Keys* → *Create API Key*. Sans domaine vérifié, les emails
  partiront depuis `onboarding@resend.dev` (fonctionne immédiatement, mais
  l'adresse d'expéditeur n'est pas personnalisée). Pour envoyer depuis
  `chatbot@lemany.ch`, ajoutez le domaine `lemany.ch` dans Resend et suivez
  ses instructions DNS (enregistrements TXT/MX à ajouter chez votre
  registrar) — étape optionnelle, à faire quand vous voulez.
- **Slack** (alerte quand le bot ne sait pas répondre) :
  1. Allez sur https://api.slack.com/apps → *Create New App* → *From scratch*.
  2. Donnez-lui un nom (ex. "Lemany Chatbot") et choisissez votre workspace.
  3. Dans le menu de gauche, *Incoming Webhooks* → activez le toggle.
  4. *Add New Webhook to Workspace* → choisissez le canal qui recevra les
     alertes (ex. `#leads-site`) → *Allow*.
  5. Copiez l'URL générée (`https://hooks.slack.com/services/...`) — c'est
     votre `SLACK_WEBHOOK_URL`.

## 2. Déployer sur Vercel

1. https://vercel.com → *Add New* → *Project* → importez le repo GitHub
   `thyphaineSQ/Lemanova` (branche `claude/website-chatbot-web-browse-lgwrwt`,
   ou `main` une fois la branche fusionnée).
2. Framework Preset : laissez *Other* — c'est un site statique avec un
   dossier `api/`, Vercel le détecte automatiquement.
3. Avant de déployer, ouvrez *Environment Variables* et ajoutez :

   | Nom | Valeur |
   |---|---|
   | `ANTHROPIC_API_KEY` | votre clé Anthropic |
   | `RESEND_API_KEY` | votre clé Resend |
   | `RESEND_FROM_EMAIL` | *(optionnel)* `Lemany Chatbot <chatbot@lemany.ch>` une fois le domaine vérifié — sinon laissez vide |
   | `LEAD_EMAIL_TO` | *(optionnel)* votre email — par défaut déjà `thyphaine.dierickx@gmail.com` |
   | `SLACK_WEBHOOK_URL` | l'URL du webhook créée à l'étape 1 |
   | `ALLOWED_ORIGIN` | `https://lemany.ch` |

4. *Deploy*. Vercel vous donne une URL temporaire (`*.vercel.app`) — utile
   pour tester avant de brancher le vrai domaine.

## 3. Pointer lemany.ch vers Vercel

Le site est actuellement sur GitHub Pages (fichier `CNAME`). Pour que le
chatbot fonctionne sur `lemany.ch`, le domaine doit pointer vers Vercel
(GitHub Pages ne peut pas exécuter `api/chat.js`) :

1. Dans le projet Vercel → *Settings* → *Domains* → ajoutez `lemany.ch`.
2. Vercel affiche les enregistrements DNS à créer (en général un
   enregistrement `A` vers `76.76.21.21` pour le domaine racine, ou un
   `CNAME` vers `cname.vercel-dns.com` pour un sous-domaine).
3. Allez chez votre registrar (là où `lemany.ch` est géré) et mettez à jour
   ces enregistrements.
4. Une fois la propagation DNS faite (quelques minutes à quelques heures),
   Vercel sert le site — GitHub Pages peut être désactivé.

> Si vous préférez garder GitHub Pages pour le site et n'utiliser Vercel que
> pour l'API, c'est possible mais demande un sous-domaine séparé (ex.
> `api.lemany.ch`) et d'adapter `API_URL` dans `chatbot-widget.js` — dites-le
> moi si vous préférez cette option plutôt que de tout migrer sur Vercel.

## 4. Tester

Une fois déployé, ouvrez le site, cliquez sur la bulle de chat en bas à
droite et essayez :

- Une question sur vos services ("Combien coûte un site internet ?").
- Une question nécessitant une recherche web récente.
- "Je m'appelle Jean, mon email est jean@exemple.ch, je veux être rappelé"
  → un email doit arriver à l'adresse configurée dans `LEAD_EMAIL_TO`.
- Une question hors sujet ou très spécifique → une alerte doit arriver sur
  le canal Slack configuré.

## Réglages ajustables

- **Modèle / coût** : `api/chat.js` utilise `claude-opus-5` avec un effort
  `"low"` (réponses rapides et économes, adaptées à un chat). Pour réduire
  encore les coûts, changez `MODEL` en `"claude-sonnet-5"` dans ce fichier.
- **Placement du widget** : actuellement sur toutes les pages. Pour le
  retirer d'une page précise, supprimez la ligne
  `<script src="/chatbot-widget.js" defer></script>` juste avant `</body>`
  dans le fichier concerné.
- **Garde-fous anti-abus** : le backend limite la taille des messages et la
  longueur de conversation, mais il n'y a pas de limite de débit (rate
  limiting) par visiteur. Si le trafic devient important, on pourra ajouter
  une protection dédiée (ex. Vercel Firewall / Upstash Ratelimit).
