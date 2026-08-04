// ============================================================
// GÉNÉRATEUR DE PAGES ARTICLES — SEO
// Lit articles.js et produit :
//   - articles/<id>.html  (une vraie page par article, indexable)
//   - sitemap.xml         (toutes les pages du site)
// Usage : node generate-articles.js
// À relancer après chaque ajout d'article dans articles.js.
// ============================================================
import { articles } from './articles.js';
import { writeFileSync, mkdirSync } from 'node:fs';

const SITE = 'https://lemany.ch';

const CAT_STYLE = {
  'Automatisation': { color: '#4318ff', bg: '#e9e4ff', band: 'repeating-linear-gradient(45deg,#e9e4ff 0 12px,#ddd5fb 12px 24px)' },
  'SaaS': { color: '#c2410c', bg: '#ffe4d6', band: 'repeating-linear-gradient(45deg,#ffe4d6 0 12px,#ffd8c4 12px 24px)' },
  'Product thinking': { color: '#141414', bg: '#e3f9d3', band: 'repeating-linear-gradient(45deg,#e3f9d3 0 12px,#d4f3be 12px 24px)' },
  'Process': { color: '#3a4d00', bg: '#eaffab', band: 'repeating-linear-gradient(45deg,#eaffab 0 12px,#ddf88f 12px 24px)' },
};

const MONTHS = { janvier: '01', février: '02', mars: '03', avril: '04', mai: '05', juin: '06',
  juillet: '07', août: '08', septembre: '09', octobre: '10', novembre: '11', décembre: '12' };

function isoDate(frDate) {
  // "2 juillet 2026" -> "2026-07-02"
  const m = frDate.trim().match(/^(\d{1,2})(?:er)?\s+(\S+)\s+(\d{4})$/);
  if (!m || !MONTHS[m[2].toLowerCase()]) return null;
  return `${m[3]}-${MONTHS[m[2].toLowerCase()]}-${String(m[1]).padStart(2, '0')}`;
}

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

function articlePage(a) {
  const s = CAT_STYLE[a.category] || CAT_STYLE['Automatisation'];
  const band = a.image ? `url(${a.image}) center/cover no-repeat` : s.band;
  const url = `${SITE}/articles/${a.id}.html`;
  const iso = isoDate(a.date);
  const jsonld = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: a.title,
    description: a.excerpt,
    ...(iso ? { datePublished: iso } : {}),
    inLanguage: 'fr-CH',
    mainEntityOfPage: url,
    author: { '@type': 'Organization', name: 'Lemany', url: SITE },
    publisher: { '@type': 'Organization', name: 'Lemany', url: SITE },
    ...(a.image ? { image: a.image } : {}),
  };
  return `<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="utf-8">
<title>${esc(a.title)} — Lemany</title>
<meta name="description" content="${esc(a.excerpt)}">
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="canonical" href="${url}">
<meta property="og:type" content="article">
<meta property="og:title" content="${esc(a.title)}">
<meta property="og:description" content="${esc(a.excerpt)}">
<meta property="og:url" content="${url}">
<meta property="og:locale" content="fr_CH">
<meta property="og:site_name" content="Lemany">
<link rel="icon" type="image/svg+xml" href="../uploads/lemany-icone.svg">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Archivo:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
<script type="application/ld+json">${JSON.stringify(jsonld)}</script>
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-M1EV1H4N9Q"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-M1EV1H4N9Q');
</script>
<script type="text/javascript">
    (function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", "xiw30z4v7m");
</script>
<style>
body{margin:0;background:#f2efe8;font-family:'Archivo',sans-serif}
a{color:inherit;text-decoration:none}a:hover{color:#c8ff2e}
@media (max-width:640px){.r-hide-sm{display:none!important}.r-stack{flex-direction:column!important;align-items:flex-start!important;gap:16px!important}.r-pad{padding-left:20px!important;padding-right:20px!important}}
</style>
</head>
<body>

<!-- HEADER -->
<div style="background:linear-gradient(160deg,#4318ff 0%,#3a0ce0 70%,#2b06a8 100%);position:relative;overflow:hidden">
  <div style="position:absolute;inset:0;background-image:radial-gradient(rgba(255,255,255,.14) 1px,transparent 1px);background-size:28px 28px"></div>
  <div class="r-pad" style="position:relative;display:flex;align-items:center;justify-content:space-between;padding:26px 56px;gap:16px">
    <a href="../index.html" style="display:flex;align-items:center;gap:9px;font:800 18px 'Archivo',sans-serif;color:#fff;letter-spacing:-.02em"><img src="../uploads/lemany-logo-blanc-outlined.svg" alt="lemany" style="height:30px;display:block"></a>
    <div class="r-hide-sm" style="display:flex;gap:30px;font:600 13px 'Archivo',sans-serif;color:rgba(255,255,255,.75)"><a href="../apps.html">Apps</a><a href="../sites.html">Sites</a><a href="../approche.html">Approche</a><a href="../blog.html" style="color:#c8ff2e">Blog</a></div>
    <a href="../contact.html" style="font:700 13px 'Archivo',sans-serif;color:#2b06a8;background:#c8ff2e;padding:12px 22px;border-radius:100px;white-space:nowrap">Planifier un échange</a>
  </div>
</div>

<!-- ARTICLE -->
<div style="background:#f2efe8;padding:40px 56px 80px" class="r-pad">
  <a href="../blog.html" style="display:inline-flex;align-items:center;gap:8px;font:700 13px 'Archivo',sans-serif;color:#4318ff;background:#fff;border:1px solid rgba(0,0,0,.08);border-radius:100px;padding:10px 20px">← Tous les articles</a>
  <article class="r-pad" style="max-width:780px;margin:28px auto 0;background:#fff;border-radius:20px;padding:56px;border:1px solid rgba(0,0,0,.06)">
    <div style="display:flex;gap:10px;align-items:center;flex-wrap:wrap"><span style="font:700 11px 'Archivo',sans-serif;color:${s.color};background:${s.bg};border-radius:100px;padding:5px 12px;letter-spacing:.06em">${esc(a.category.toUpperCase())}</span><span style="font:500 12px 'Archivo',sans-serif;color:#999">${esc(a.date)} · ${a.minutes} min de lecture</span></div>
    <h1 style="margin:20px 0 0;font:900 clamp(28px,4.5vw,42px)/1.12 'Archivo',sans-serif;color:#141414;letter-spacing:-.025em">${esc(a.title)}</h1>
    <div style="height:220px;border-radius:14px;background:${band};margin-top:28px"></div>
    <div style="margin-top:12px">
${a.content.map((p) => `      <p style="margin:22px 0 0;font:400 16.5px/1.75 'Archivo',sans-serif;color:#333;text-wrap:pretty">${esc(p)}</p>`).join('\n')}
    </div>
    <div class="r-stack" style="display:flex;justify-content:space-between;align-items:center;gap:20px;background:#141414;border-radius:14px;padding:24px 28px;margin-top:40px">
      <div style="font:800 18px/1.3 'Archivo',sans-serif;color:#fff">Ce sujet vous concerne&nbsp;?<br><span style="color:#c8ff2e">Parlons-en 30 minutes.</span></div>
      <a href="../contact.html" style="flex:none;font:700 14px 'Archivo',sans-serif;color:#2b06a8;background:#c8ff2e;padding:14px 26px;border-radius:100px">Planifier un échange</a>
    </div>
  </article>
</div>

<!-- FOOTER -->
<div style="background:#141414;padding:72px 56px 40px" class="r-pad">
  <div class="r-stack" style="display:flex;justify-content:space-between;align-items:center;gap:40px">
    <h2 style="margin:0;font:900 clamp(28px,4.5vw,40px)/1.05 'Archivo',sans-serif;color:#fff;letter-spacing:-.03em">Un sujet vous parle&nbsp;?<br><span style="color:#c8ff2e">Parlons du vôtre.</span></h2>
    <a href="../contact.html" style="flex:none;font:700 16px 'Archivo',sans-serif;color:#2b06a8;background:#c8ff2e;padding:18px 34px;border-radius:100px">Planifier un échange →</a>
  </div>
  <div class="r-stack" style="display:flex;justify-content:space-between;margin-top:64px;padding-top:24px;border-top:1px solid rgba(255,255,255,.12);font:500 12px 'Archivo',sans-serif;color:rgba(255,255,255,.45);flex-wrap:wrap;gap:12px">
    <span>Lemany · Suisse romande</span>
    <span style="display:flex;gap:18px;flex-wrap:wrap"><a href="../apps.html">Apps</a><a href="../sites.html">Sites</a><a href="../approche.html">Approche</a><a href="../blog.html">Blog</a><a href="../contact.html">Contact</a></span>
    <span>© 2026</span>
  </div>
</div>

</body>
</html>
`;
}

function sitemap() {
  const staticPages = ['', 'apps.html', 'sites.html', 'approche.html', 'blog.html', 'contact.html',
    'services-applications-web.html', 'services-automatisation.html', 'services-logiciels-metier.html',
    'services-maintenance.html', 'services-portails-clients.html', 'services-saas.html', 'services-sites-internet.html'];
  const urls = [
    ...staticPages.map((p) => `  <url><loc>${SITE}/${p}</loc></url>`),
    ...articles.map((a) => {
      const iso = isoDate(a.date);
      return `  <url><loc>${SITE}/articles/${a.id}.html</loc>${iso ? `<lastmod>${iso}</lastmod>` : ''}</url>`;
    }),
  ];
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>\n`;
}

mkdirSync('articles', { recursive: true });
for (const a of articles) {
  writeFileSync(`articles/${a.id}.html`, articlePage(a));
  console.log(`✓ articles/${a.id}.html`);
}
writeFileSync('sitemap.xml', sitemap());
console.log('✓ sitemap.xml');
console.log(`${articles.length} articles générés.`);
