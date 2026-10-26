// Génère les pages de services à partir de src/pages/*.html, en reprenant
// le CSS, l'en-tête, le pied de page et les mentions légales de index.html.
// Usage : node tools/build-pages.mjs   (aucune dépendance)
import { readFileSync, writeFileSync, mkdirSync, readdirSync, statSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const SITE = "https://sensusagency.com";
const read = p => readFileSync(p, "utf8").replace(/\r\n/g, "\n");
const index = read(join(ROOT, "index.html"));

const pick = (re, what) => { const m = index.match(re); if (!m) throw new Error(`index.html : ${what} introuvable`); return m[1]; };
const css = pick(/\n<style>\n([\s\S]*?)\n<\/style>/, "bloc <style>");
const fonts = pick(/(<link rel="preconnect" href="https:\/\/fonts\.googleapis\.com">[\s\S]*?display=swap">)/, "polices");
const header = pick(/(<a class="skip"[\s\S]*?<\/header>)/, "en-tête");
const footer = pick(/(<footer[\s\S]*?<\/dialog>)/, "pied de page");
const steps = pick(/(<ol class="steps" id="steps">[\s\S]*?<\/ol>)/, "méthode");

// Les ancres de l'accueil deviennent des liens vers l'accueil ; le devis pré-sélectionne le type.
const relink = (html, devisUrl) => html
  .replace(/href="#accueil"/g, 'href="/"')
  .replace(/href="#devis"/g, `href="${devisUrl}"`)
  .replace(/href="#(?!contenu)([\w-]+)"/g, 'href="/#$1"');

const esc = s => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
const text = html => html.replace(/<[^>]+>/g, "").replace(/&nbsp;/g, " ").replace(/&amp;/g, "&").replace(/\s+/g, " ").trim();

const PAGE_CSS = `
.phero{padding-top:calc(80px + clamp(48px,7vw,104px));padding-bottom:calc(clamp(72px,9vw,128px) + clamp(28px,3.4vw,48px))}
.crumbs{font-size:13px;color:var(--mute-p);margin-bottom:clamp(28px,4vw,48px)}
.crumbs ol{list-style:none;margin:0;padding:0;display:flex;flex-wrap:wrap;gap:8px}
.crumbs li+li::before{content:"/";margin-right:8px;opacity:.5}
.crumbs a{text-decoration:none}.crumbs a:hover{text-decoration:underline}
.phero .title{max-width:16ch;margin-top:24px}
.phero .lead{font-size:clamp(18px,1.6vw,21px);max-width:60ch;margin-top:28px;color:#3C3D38}
.phero-cta{display:flex;flex-wrap:wrap;gap:16px 28px;align-items:center;margin-top:40px}
.cols{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:clamp(24px,4vw,64px)}
.cols p{font-size:17px}
.ink .cols p{color:var(--mute-i)}
.mpanel+.mpanel{margin-top:16px}
.seealso{display:flex;flex-wrap:wrap;gap:12px 28px;margin-top:40px}
@media (max-width:800px){.cols{grid-template-columns:1fr}}
`;

const PAGE_JS = `
(function(){
  const $ = (s, c=document) => c.querySelector(s);
  const $$ = (s, c=document) => Array.from(c.querySelectorAll(s));
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  $("#year").textContent = new Date().getFullYear();
  const top = $("#top"), mbar = $("#mbar"), readbar = $("#readbar");
  let lastY = scrollY;
  const onScroll = () => {
    const y = scrollY;
    top.classList.toggle("solid", y > 24);
    if (!document.body.classList.contains("menu-open")) top.classList.toggle("hide", y > lastY && y > 500);
    mbar.classList.toggle("hide", y < 600);
    const max = document.documentElement.scrollHeight - innerHeight;
    readbar.style.setProperty("--rp", max > 0 ? (y / max).toFixed(4) : 0);
    lastY = y;
  };
  addEventListener("scroll", onScroll, {passive:true}); onScroll();
  const burger = $("#burger");
  const setMenu = open => {
    document.body.classList.toggle("menu-open", open);
    burger.setAttribute("aria-expanded", open);
    burger.setAttribute("aria-label", open ? "Fermer le menu" : "Ouvrir le menu");
    document.documentElement.style.overflow = open ? "hidden" : "";
    if (open) top.classList.remove("hide");
  };
  burger.addEventListener("click", () => setMenu(!document.body.classList.contains("menu-open")));
  $$("#nav a").forEach(a => a.addEventListener("click", () => setMenu(false)));
  addEventListener("keydown", e => { if (e.key === "Escape") setMenu(false); });
  const rvs = $$(".rv"), stepEls = $$("#steps .step");
  if ("IntersectionObserver" in window && !reduce) {
    const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), {rootMargin:"0px 0px -6% 0px"});
    rvs.forEach(el => io.observe(el));
    const so = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { stepEls.forEach((s, i) => setTimeout(() => s.classList.add("on"), i * 180)); so.disconnect(); } }), {threshold:.3});
    if ($("#steps")) so.observe($("#steps"));
  } else { rvs.forEach(el => el.classList.add("in")); stepEls.forEach(s => s.classList.add("on")); }
  const dlg = $("#legal");
  $("#open-legal").addEventListener("click", () => dlg.showModal ? dlg.showModal() : dlg.setAttribute("open",""));
  $("[data-close]", dlg).addEventListener("click", () => dlg.close());
  dlg.addEventListener("click", e => { if (e.target === dlg) dlg.close(); });
})();
`;

const AREA = [
  { "@type": "City", "name": "Aix-en-Provence" },
  { "@type": "City", "name": "Marseille" },
  { "@type": "AdministrativeArea", "name": "Provence-Alpes-Côte d'Azur" },
  { "@type": "Country", "name": "France" }
];

function render(slug, meta, body) {
  const url = `${SITE}/${slug}/`;
  const devisUrl = `/?type=${encodeURIComponent(meta.devisType)}#devis`;
  const faqHtml = meta.faq.map((f, i) => `      <details class="rv"${i === 0 ? " open" : ""}><summary>${f.q}<i aria-hidden="true"></i></summary><p>${f.a}</p></details>`).join("\n");
  const jsonld = {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "WebPage", "@id": `${url}#page`, "url": url, "name": meta.title, "description": meta.description, "inLanguage": "fr-FR",
        "isPartOf": { "@id": `${SITE}/#site` }, "breadcrumb": { "@id": `${url}#ariane` }, "mainEntity": { "@id": `${url}#service` } },
      { "@type": "Service", "@id": `${url}#service`, "name": meta.serviceName, "serviceType": meta.serviceType, "description": meta.description, "url": url,
        "provider": { "@type": "ProfessionalService", "@id": `${SITE}/#agence`, "name": "SENSUS", "url": `${SITE}/` }, "areaServed": AREA },
      { "@type": "BreadcrumbList", "@id": `${url}#ariane`, "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Accueil", "item": `${SITE}/` },
        { "@type": "ListItem", "position": 2, "name": meta.crumb, "item": url } ] },
      { "@type": "FAQPage", "mainEntity": meta.faq.map(f => ({ "@type": "Question", "name": text(f.q), "acceptedAnswer": { "@type": "Answer", "text": text(f.a) } })) }
    ]
  };
  return `<!doctype html>
<html lang="fr">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${esc(meta.title)}</title>
<meta name="description" content="${esc(meta.description)}">
<meta name="robots" content="index, follow, max-image-preview:large">
<meta name="theme-color" content="#F3EEE3">
<link rel="canonical" href="${url}">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">

<meta property="og:type" content="website">
<meta property="og:locale" content="fr_FR">
<meta property="og:site_name" content="SENSUS">
<meta property="og:url" content="${url}">
<meta property="og:title" content="${esc(meta.title)}">
<meta property="og:description" content="${esc(meta.description)}">
<meta property="og:image" content="${SITE}/og-image.png">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="SENSUS, agence de production événementielle à Aix-en-Provence et Marseille">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(meta.title)}">
<meta name="twitter:description" content="${esc(meta.description)}">
<meta name="twitter:image" content="${SITE}/og-image.png">

<noscript><style>.rv{opacity:1;transform:none}</style></noscript>
${fonts}

<script type="application/ld+json">
${JSON.stringify(jsonld, null, 2)}
</script>

<style>
${css}
${PAGE_CSS}</style>
<script>document.documentElement.classList.add('js')</script>
</head>
<body>
${relink(header, devisUrl)}

<main id="contenu">
<section class="phero" aria-labelledby="t-page">
  <div class="wrap">
    <nav class="crumbs" aria-label="Fil d’Ariane"><ol><li><a href="/">Accueil</a></li><li aria-current="page">${meta.crumb}</li></ol></nav>
    <p class="kicker">${meta.kicker}</p>
    <h1 class="title" id="t-page">${meta.h1}</h1>
    <p class="lead">${meta.lead}</p>
    <div class="phero-cta">
      <a class="btn" href="${devisUrl}">${meta.cta} <span class="arr">→</span></a>
      <a class="tlink" href="tel:+33621864834">ou appeler le 06 21 86 48 34</a>
    </div>
  </div>
</section>

${body.trim()}

<section class="band sheet" aria-labelledby="t-methode">
  <div class="wrap">
    <div class="head">
      <p class="kicker rv">Méthode</p>
      <h2 class="title rv" id="t-methode">Un cadre clair <span class="serif">pour</span> avancer.</h2>
      <p class="mute rv d1">Cinq étapes, et de la visibilité à chacune d’elles.</p>
    </div>
    ${steps}
  </div>
</section>

<section class="band ink sheet" aria-labelledby="t-faq">
  <div class="wrap faq">
    <div>
      <p class="kicker mute rv">Questions fréquentes</p>
      <h2 class="title rv d1" id="t-faq" style="margin-top:24px">${meta.faqTitle}</h2>
      <p class="mute rv d2" style="margin-top:24px">Une autre question&nbsp;? Écrivez à <a href="mailto:theo@sensusagency.com">theo@sensusagency.com</a>.</p>
    </div>
    <div class="faq-list">
${faqHtml}
    </div>
  </div>
</section>
</main>

${relink(footer, devisUrl)}

<script>${PAGE_JS}</script>
</body>
</html>
`;
}

const srcDir = join(ROOT, "src", "pages");
const built = [];
for (const file of readdirSync(srcDir).filter(f => f.endsWith(".html")).sort()) {
  const slug = file.replace(/\.html$/, "");
  const raw = read(join(srcDir, file));
  const m = raw.match(/^<!--META\n([\s\S]*?)\nMETA-->\n([\s\S]*)$/);
  if (!m) throw new Error(`${file} : bloc META manquant`);
  const meta = JSON.parse(m[1]);
  mkdirSync(join(ROOT, slug), { recursive: true });
  writeFileSync(join(ROOT, slug, "index.html"), render(slug, meta, m[2]));
  built.push({ loc: `${SITE}/${slug}/`, lastmod: meta.lastmod });
  console.log(`✓ /${slug}/`);
}

const homeLastmod = read(join(ROOT, "sitemap.xml")).match(/<loc>https:\/\/sensusagency\.com\/<\/loc><lastmod>([\d-]+)/)?.[1]
  ?? new Date(statSync(join(ROOT, "index.html")).mtime).toISOString().slice(0, 10);
const urls = [{ loc: `${SITE}/`, lastmod: homeLastmod }, ...built];
writeFileSync(join(ROOT, "sitemap.xml"), `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(u => `  <url><loc>${u.loc}</loc><lastmod>${u.lastmod}</lastmod></url>`).join("\n")}
</urlset>
`);
console.log(`✓ sitemap.xml (${urls.length} URL)`);
