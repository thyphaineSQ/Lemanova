#!/bin/sh
# Héberge React en local pour blog.html et contact.html (les deux seules pages
# qui utilisent encore le runtime dc). Tant que ce script n'a pas été lancé, ces
# deux pages dépendent d'unpkg.com : si le CDN est injoignable, elles retombent
# sur le contenu brut au bout de 5 s au lieu d'afficher le rendu React.
#
# À lancer une fois depuis la racine du dépôt, puis commiter vendor/ :
#   sh vendor-react.sh && git add vendor support.js && git commit
set -e

mkdir -p vendor
curl -fsSL -o vendor/react.production.min.js \
  https://unpkg.com/react@18.3.1/umd/react.production.min.js
curl -fsSL -o vendor/react-dom.production.min.js \
  https://unpkg.com/react-dom@18.3.1/umd/react-dom.production.min.js

# Bascule support.js du CDN vers les copies locales. Les hash SRI sont vidés :
# ils ne servent qu'au cross-origin, et une ressource same-origin n'en a pas besoin.
sed -i.bak \
  -e 's|https://unpkg.com/react@18.3.1/umd/react.production.min.js|./vendor/react.production.min.js|' \
  -e 's|https://unpkg.com/react-dom@18.3.1/umd/react-dom.production.min.js|./vendor/react-dom.production.min.js|' \
  -e 's|^  var REACT_SRI = .*|  var REACT_SRI = "";|' \
  -e 's|^  var REACT_DOM_SRI = .*|  var REACT_DOM_SRI = "";|' \
  support.js
rm -f support.js.bak

echo "OK — React hébergé en local, support.js basculé sur ./vendor/."
