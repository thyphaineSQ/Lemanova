#!/usr/bin/env node
// ============================================================
// GÉNÉRATEUR DE PAGES D'ARTICLES
//
//   node generate-articles.js
//
// Source unique de vérité : articles.js.
// Régénère, à partir de article-template.html :
//   • une page article-<id>.html par article
//   • la liste de repli « TOUS LES ARTICLES » dans blog.html
//   • les entrées <url> des articles dans sitemap.xml
//
// Le script est idempotent : relancé sans nouvel article, il ne
// produit aucune modification. Pour changer la mise en page d'un
// article (navigation, pied de page, styles), éditez
// article-template.html puis relancez ce script.
// ============================================================

import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { articles } from './articles.js';

const ROOT = dirname(fileURLToPath(import.meta.url));
const SITE = 'https://lemany.ch/';
const p = (f) => join(ROOT, f);

// Couleurs de la pastille de catégorie (texte / fond)
const CATEGORIES = {
  'Automatisation': { fg: '#4318ff', bg: '#e9e4ff' },
  'IA': { fg: '#0e7490', bg: '#d7f5fb' },
  'SEO': { fg: '#7c2d92', bg: '#f3e2fa' },
  'SaaS': { fg: '#c2410c', bg: '#ffe4d6' },
  'Product thinking': { fg: '#141414', bg: '#e3f9d3' },
  'Process': { fg: '#3a4d00', bg: '#eaffab' },
};

// Libellés des pages de services, pour les cartes « Sur ce sujet »
const SERVICES = {
  'services-sites-internet.html': 'Création de site internet',
  'services-refonte-site.html': 'Refonte de site web',
  'services-seo.html': 'Référencement SEO',
  'services-seo-local.html': 'SEO local',
  'services-automatisation-ia.html': 'Automatisation &amp; IA',
  'services-automatisation.html': 'Automatisation des processus',
  'services-logiciels-metier.html': 'Logiciels métier',
  'services-crm.html': 'CRM sur mesure',
  'services-reservation.html': 'Systèmes de réservation',
  'services-portails-clients.html': 'Portails clients',
  'services-mvp.html': 'MVP startup',
  'services-saas.html': 'Produits SaaS',
  'services-applications-web.html': 'Applications web',
  'services-maintenance.html': 'Maintenance &amp; évolution',
};

// Liens de secours si un article ne précise pas ses deux pages de services
const LIENS_PAR_DEFAUT = {
  'Automatisation': ['services-automatisation.html', 'services-logiciels-metier.html'],
  'IA': ['services-automatisation-ia.html', 'services-automatisation.html'],
  'SEO': ['services-seo.html', 'services-seo-local.html'],
  'SaaS': ['services-mvp.html', 'services-saas.html'],
  'Product thinking': ['services-mvp.html', 'services-applications-web.html'],
  'Process': ['services-automatisation.html', 'services-logiciels-metier.html'],
};

const MOIS = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin',
  'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'];

// « 23 avril 2026 » -> { ts, iso: '2026-04-23' }
function parseDateFr(str) {
  const m = String(str || '').trim().toLowerCase()
    .replace('aout', 'août').replace('fevrier', 'février').replace('decembre', 'décembre')
    .match(/^(\d{1,2})\s+(\S+)\s+(\d{4})$/);
  if (!m || !MOIS.includes(m[2])) throw new Error(`date illisible : « ${str} » (attendu : « 5 août 2026 »)`);
  const [j, mois, an] = [+m[1], MOIS.indexOf(m[2]), +m[3]];
  const d = new Date(Date.UTC(an, mois, j));
  return { ts: d.getTime(), iso: d.toISOString().slice(0, 10) };
}

const escapeHtml = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const countWords = (a) => a.content.join(' ').split(/\s+/).filter(Boolean).length;

function valider(a) {
  for (const champ of ['id', 'category', 'title', 'date', 'excerpt', 'content']) {
    if (!a[champ]) throw new Error(`article « ${a.id || '?'} » : champ ${champ} manquant`);
  }
  if (!/^[a-z0-9-]+$/.test(a.id)) throw new Error(`id invalide : ${a.id} (kebab-case attendu)`);
  if (!CATEGORIES[a.category]) {
    throw new Error(`catégorie inconnue : « ${a.category} » (${Object.keys(CATEGORIES).join(' | ')})`);
  }
  if (!Array.isArray(a.content) || a.content.length < 3) {
    throw new Error(`article « ${a.id} » : content doit contenir au moins 3 paragraphes`);
  }
  for (const l of a.links || []) {
    if (!SERVICES[l]) throw new Error(`article « ${a.id} » : lien de service inconnu « ${l} »`);
  }
}

function pageArticle(a, precedent, suivant, template) {
  const cat = CATEGORIES[a.category];
  const url = `${SITE}article-${a.id}.html`;
  const { iso } = parseDateFr(a.date);
  const titre = escapeHtml(a.title);
  const excerpt = escapeHtml(a.excerpt);

  const jsonldArticle = JSON.stringify({
    '@context': 'https://schema.org', '@type': 'BlogPosting',
    headline: a.title, description: a.excerpt, datePublished: iso,
    author: { '@type': 'Organization', name: 'Lemany', url: SITE },
    publisher: { '@type': 'Organization', name: 'Lemany', url: SITE },
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    articleSection: a.category, inLanguage: 'fr-CH', wordCount: countWords(a),
  });

  const jsonldFilAriane = JSON.stringify({
    '@context': 'https://schema.org', '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Accueil', item: `${SITE}index.html` },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE}blog.html` },
      { '@type': 'ListItem', position: 3, name: a.title, item: url },
    ],
  });

  const paragraphes = a.content.map((t) =>
    `      <p style="margin:26px 0 0;font:400 16.5px/1.78 'Archivo',sans-serif;color:#333;text-wrap:pretty">${escapeHtml(t)}</p>`
  ).join('\n');

  const cartes = (a.links && a.links.length === 2 ? a.links : LIENS_PAR_DEFAUT[a.category]).map((href) =>
    `    <a href="${href}" style="display:flex;align-items:center;justify-content:space-between;gap:12px;background:#fff;border:1px solid #ddd6f5;border-radius:12px;padding:16px 18px;font:700 14px 'Archivo',sans-serif;color:#141414">${SERVICES[href]}<span style="color:#4318ff">&rarr;</span></a>`
  ).join('\n');

  const carteVoisine = (voisin, libelle) => voisin
    ? `    <a href="article-${voisin.id}.html" style="display:flex;flex-direction:column;gap:6px;background:#fff;border:1px solid #ddd6f5;border-radius:12px;padding:16px 18px;max-width:340px"><span style="font:700 11px 'Archivo',sans-serif;color:#4318ff;letter-spacing:.08em">${libelle}</span><span style="font:700 14px/1.35 'Archivo',sans-serif;color:#141414">${escapeHtml(voisin.title)}</span></a>`
    : '    <span></span>';

  const remplacements = {
    '{{TITLE_TAG}}': a.seoTitle || titre,
    '{{DESCRIPTION}}': excerpt,
    '{{URL}}': url,
    '{{JSONLD_ARTICLE}}': jsonldArticle,
    '{{JSONLD_BREADCRUMB}}': jsonldFilAriane,
    '{{CATEGORY}}': a.category,
    '{{CATEGORY_UPPER}}': a.category.toUpperCase(),
    '{{CAT_FG}}': cat.fg,
    '{{CAT_BG}}': cat.bg,
    '{{DATE_FR}}': a.date,
    '{{MINUTES}}': String(a.minutes || 5),
    '{{TITLE}}': titre,
    '{{EXCERPT}}': excerpt,
    '{{PARAGRAPHS}}': paragraphes,
    '{{LINK_CARDS}}': cartes,
    '{{PREV_NEXT}}': [
      carteVoisine(precedent, 'ARTICLE PR&Eacute;C&Eacute;DENT'),
      carteVoisine(suivant, 'ARTICLE SUIVANT'),
    ].join('\n'),
  };

  // article-template.html est lui-même accessible publiquement et porte donc un
  // noindex — mais les vraies pages générées à partir de lui doivent être indexées.
  let html = template.replace(
    /\s*<!-- Gabarit de génération, pas une page du site : ne doit pas être indexé\. -->\n<meta name="robots" content="noindex, nofollow">\n/,
    '\n'
  );
  for (const [cle, valeur] of Object.entries(remplacements)) html = html.split(cle).join(valeur);
  const restant = html.match(/\{\{[A-Z_]+\}\}/);
  if (restant) throw new Error(`placeholder non remplacé : ${restant[0]}`);
  return html;
}

// Liste de repli de blog.html (affichée si le runtime ne charge pas articles.js)
function majBlog(tries) {
  const fichier = p('blog.html');
  const avant = readFileSync(fichier, 'utf8');
  const items = tries.map((a) =>
    `      <li style="margin:0 0 10px"><a href="article-${a.id}.html" style="font:600 15px 'Archivo',sans-serif;color:#4318ff">${escapeHtml(a.title)}</a> <span style="font:500 13px 'Archivo',sans-serif;color:#777">— ${a.category}, ${a.date}</span></li>`
  ).join('\n');
  const bloc = /(<ul style="list-style:none;padding:0;margin:0;max-width:860px">\n)[\s\S]*?(\n {4}<\/ul>)/;
  if (!bloc.test(avant)) throw new Error('liste statique introuvable dans blog.html');
  const apres = avant.replace(bloc, (_, ouverture, fermeture) => ouverture + items + fermeture);
  if (apres !== avant) writeFileSync(fichier, apres);
  return apres !== avant;
}

// Entrées <url> des articles dans sitemap.xml (bloc contigu, ordre alphabétique)
function majSitemap(tries) {
  const fichier = p('sitemap.xml');
  const avant = readFileSync(fichier, 'utf8');
  const lastmods = new Map(
    [...avant.matchAll(/<loc>(\S*article-[a-z0-9-]+\.html)<\/loc><lastmod>(\d{4}-\d{2}-\d{2})<\/lastmod>/g)]
      .map((m) => [m[1], m[2]])
  );

  const lignes = [...tries]
    .sort((a, b) => a.id.localeCompare(b.id))
    .map((a) => {
      const loc = `${SITE}article-${a.id}.html`;
      const lastmod = lastmods.get(loc) || parseDateFr(a.date).iso;
      return `  <url><loc>${loc}</loc><lastmod>${lastmod}</lastmod><priority>0.6</priority></url>`;
    })
    .join('\n');

  const bloc = /( *<url><loc>\S*article-[a-z0-9-]+\.html<\/loc>.*<\/url>\n)+/;
  if (!bloc.test(avant)) throw new Error('bloc des articles introuvable dans sitemap.xml');
  const apres = avant.replace(bloc, lignes + '\n');
  if (apres !== avant) writeFileSync(fichier, apres);
  return apres !== avant;
}

function main() {
  const template = readFileSync(p('article-template.html'), 'utf8');

  const vus = new Set();
  for (const a of articles) {
    valider(a);
    if (vus.has(a.id)) throw new Error(`id en double : ${a.id}`);
    vus.add(a.id);
  }

  // Du plus récent au plus ancien : c'est cet ordre que suivent le blog,
  // la liste de repli et les liens « précédent / suivant ».
  const tries = [...articles].sort((a, b) => parseDateFr(b.date).ts - parseDateFr(a.date).ts);

  let ecrits = 0;
  tries.forEach((a, i) => {
    const html = pageArticle(a, tries[i - 1], tries[i + 1], template);
    const fichier = p(`article-${a.id}.html`);
    let actuel = null;
    try { actuel = readFileSync(fichier, 'utf8'); } catch { /* nouvelle page */ }
    if (actuel !== html) { writeFileSync(fichier, html); ecrits++; }
  });

  const blogModifie = majBlog(tries);
  const sitemapModifie = majSitemap(tries);

  console.log(`${tries.length} articles — ${ecrits} page(s) écrite(s)` +
    `, blog.html ${blogModifie ? 'mis à jour' : 'inchangé'}` +
    `, sitemap.xml ${sitemapModifie ? 'mis à jour' : 'inchangé'}`);
}

main();
