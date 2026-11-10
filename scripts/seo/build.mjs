// Génère les pages statiques de référencement (niveaux, matières, jeux, enseignants),
// le sitemap.xml et le robots.txt dans public/. Lancé avant chaque build.
import { readFileSync, writeFileSync, mkdirSync, rmSync, existsSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '../..')
const pub = join(root, 'public')
const SITE = 'https://www.shukudai.fr'
const today = new Date().toISOString().slice(0, 10)

const programme = JSON.parse(readFileSync(join(root, 'src/data/programme.json'), 'utf8'))
const lessons = JSON.parse(readFileSync(join(root, 'src/data/lessons.json'), 'utf8'))
const sources = JSON.parse(readFileSync(join(root, 'src/data/sources.json'), 'utf8'))

const LV = {
  ce1: { name: 'CE1', ages: '7 ans', cycle: 'cycle 2' },
  ce2: { name: 'CE2', ages: '8 ans', cycle: 'cycle 2' },
  cm1: { name: 'CM1', ages: '9 ans', cycle: 'cycle 3' },
  cm2: { name: 'CM2', ages: '10 ans', cycle: 'cycle 3' },
}
const SUB = {
  fr: { slug: 'francais', name: 'Français', kw: 'lecture, orthographe, grammaire, conjugaison et vocabulaire' },
  ma: { slug: 'mathematiques', name: 'Mathématiques', kw: 'calcul, numération, problèmes, géométrie et mesures' },
  qlm: { slug: 'questionner-le-monde', name: 'Questionner le monde', kw: 'le vivant, la matière, l’espace et le temps' },
  st: { slug: 'sciences', name: 'Sciences et technologie', kw: 'le vivant, la matière, l’énergie et les objets techniques' },
  hi: { slug: 'histoire', name: 'Histoire', kw: 'les grandes périodes et les repères chronologiques' },
  ge: { slug: 'geographie', name: 'Géographie', kw: 'se repérer, habiter et lire des cartes' },
  en: { slug: 'anglais', name: 'Anglais', kw: 'vocabulaire, compréhension orale et premières phrases' },
  emc: { slug: 'enseignement-moral-et-civique', name: 'Enseignement moral et civique', kw: 'respect, règles, droits et entraide' },
  ap: { slug: 'arts-plastiques', name: 'Arts plastiques', kw: 'observer, créer et parler des œuvres' },
  mu: { slug: 'musique', name: 'Éducation musicale', kw: 'écouter, chanter et reconnaître les instruments' },
  eps: { slug: 'eps', name: 'Éducation physique et sportive', kw: 'bouger, coopérer et pratiquer en sécurité' },
  evar: { slug: 'education-a-la-vie-affective', name: 'Éducation à la vie affective et relationnelle', kw: 'se connaître et respecter chacun' },
}
const CORE = ['fr', 'ma', 'qlm', 'st', 'hi', 'ge', 'en']

const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
const urls = [{ loc: `${SITE}/`, pri: '1.0' }]

function page({ path, title, desc, h1, lead, body, crumbs = [], jsonld = [] }) {
  const url = `${SITE}${path}`
  urls.push({ loc: url, pri: path.split('/').filter(Boolean).length === 1 ? '0.9' : '0.7' })
  const bc = [{ name: 'Accueil', url: `${SITE}/` }, ...crumbs]
  const ld = [{
    '@context': 'https://schema.org', '@type': 'BreadcrumbList',
    itemListElement: bc.map((c, i) => ({ '@type': 'ListItem', position: i + 1, name: c.name, item: c.url })),
  }, ...jsonld]
  const html = `<!doctype html>
<html lang="fr">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}" />
<link rel="canonical" href="${url}" />
<meta name="theme-color" content="#17766E" />
<meta property="og:type" content="website" />
<meta property="og:site_name" content="Shukudai" />
<meta property="og:locale" content="fr_FR" />
<meta property="og:title" content="${esc(title)}" />
<meta property="og:description" content="${esc(desc)}" />
<meta property="og:url" content="${url}" />
<meta property="og:image" content="${SITE}/og-image.png" />
<meta name="twitter:card" content="summary_large_image" />
<link rel="icon" href="/favicon.png" type="image/png" />
<link rel="stylesheet" href="/seo.css" />
${ld.map(o => `<script type="application/ld+json">${JSON.stringify(o)}</script>`).join('\n')}
</head>
<body>
<header class="top"><div class="in">
<a class="logo" href="/"><img src="/logo.png" alt="" width="36" height="36" /><span><b>Shuku</b><i>dai</i></span></a>
<nav aria-label="Niveaux">${Object.entries(LV).map(([id, l]) => `<a href="/${id}/">${l.name}</a>`).join('')}<a href="/jeux-educatifs/">Jeux</a></nav>
<a class="btn sm" href="/#/inscription">Créer un compte</a>
</div></header>
<main class="in">
<nav class="crumbs" aria-label="Fil d’Ariane">${bc.map((c, i) => i === bc.length - 1 ? `<span>${esc(c.name)}</span>` : `<a href="${c.url.replace(SITE, '')}">${esc(c.name)}</a>`).join(' › ')}</nav>
<h1>${esc(h1)}</h1>
<p class="lead">${lead}</p>
<p class="cta"><a class="btn" href="/#/inscription">Essayer avec mon enfant</a> <a class="btn ghost" href="/">Découvrir Shukudai</a></p>
${body}
<section class="box">
<h2>Comment fonctionne Shukudai ?</h2>
<ol>
<li><b>Le parent crée un compte</b> et ajoute un profil par enfant : un prénom, une classe et un avatar.</li>
<li><b>L’enfant apprend en jouant</b> : des leçons de 3 à 8 minutes, un indice avant la correction, des étoiles à gagner.</li>
<li><b>Le parent suit les progrès</b> chaque semaine : temps passé, réussite, notions acquises et à revoir. L’enseignant peut aussi suivre sa classe.</li>
</ol>
<p class="small">Sans publicité, sans achat intégré, utilisable sur ordinateur, tablette et téléphone.</p>
</section>
</main>
<footer><div class="in">
<p><b>Shukudai</b> : « devoirs à la maison » en japonais. Leçons, exercices et jeux éducatifs du CE1 au CM2, conformes aux programmes officiels.</p>
<p class="links">${Object.entries(LV).map(([id, l]) => `<a href="/${id}/">Exercices ${l.name}</a>`).join('')}<a href="/jeux-educatifs/">Jeux éducatifs</a><a href="/enseignants/">Enseignants</a><a href="/#/confidentialite">Confidentialité</a></p>
</div></footer>
</body>
</html>
`
  const dir = join(pub, path)
  mkdirSync(dir, { recursive: true })
  writeFileSync(join(dir, 'index.html'), html)
}

// Nettoyage des pages générées précédemment
for (const d of [...Object.keys(LV), 'jeux-educatifs', 'enseignants']) {
  const p = join(pub, d)
  if (existsSync(p)) rmSync(p, { recursive: true })
}

const lessonsBy = (lv, sid) => lessons.filter(l => l.level === lv && l.subject === sid)
const themeTitle = new Map()
for (const lv of programme) for (const s of lv.subjects) for (const d of s.domains) for (const t of d.themes) themeTitle.set(t.id, t.title)

// Pages niveau et matière
for (const [lid, L] of Object.entries(LV)) {
  const level = programme.find(p => p.id === lid)
  const subs = level.subjects.filter(s => SUB[s.id] && lessonsBy(lid, s.id).length)
  const total = lessons.filter(l => l.level === lid).length

  const cards = subs.map(s => {
    const n = lessonsBy(lid, s.id).length
    const themes = s.domains.flatMap(d => d.themes).slice(0, 5).map(t => esc(t.title)).join(' · ')
    return `<a class="card" href="/${lid}/${SUB[s.id].slug}/"><h3>${SUB[s.id].name} ${L.name}</h3><p>${n} leçons : ${esc(SUB[s.id].kw)}.</p><p class="small">${themes}…</p></a>`
  }).join('\n')

  page({
    path: `/${lid}/`,
    title: `Exercices et leçons de ${L.name} en ligne | Shukudai`,
    desc: `Exercices de ${L.name} en ligne, conformes au programme officiel : ${total} leçons en français, maths, anglais et ${L.cycle === 'cycle 2' ? 'questionner le monde' : 'sciences, histoire, géographie'}. Suivi des progrès pour les parents.`,
    h1: `Exercices et leçons de ${L.name} en ligne`,
    lead: `${total} leçons interactives pour les élèves de ${L.name} (${L.ages}, ${L.cycle}), une pour chaque thème du programme officiel. L’enfant révise en quelques minutes par jour, reçoit un indice quand il se trompe, et ses parents suivent ses progrès.`,
    body: `<h2>Les matières de ${L.name}</h2>\n<div class="grid">${cards}</div>`,
    crumbs: [{ name: L.name, url: `${SITE}/${lid}/` }],
    jsonld: [{
      '@context': 'https://schema.org', '@type': 'Course', name: `Leçons et exercices de ${L.name}`,
      description: `${total} leçons interactives conformes au programme de ${L.name}.`, inLanguage: 'fr',
      educationalLevel: L.name, provider: { '@type': 'Organization', name: 'Shukudai', url: SITE },
      hasCourseInstance: { '@type': 'CourseInstance', courseMode: 'online', courseWorkload: 'PT5M' },
    }],
  })

  for (const s of subs) {
    const S = SUB[s.id]
    const ls = lessonsBy(lid, s.id)
    const byTheme = new Map(ls.map(l => [l.theme, l]))
    const disc = ls.filter(l => l.theme.endsWith('-decouverte'))
    const doms = s.domains.map(d => {
      const items = d.themes.map(t => {
        const l = byTheme.get(t.id)
        return `<li><h4>${esc(l ? l.title : t.title)}</h4>${l?.intro ? `<p>${esc(l.intro)}</p>` : ''}${l ? `<p class="small">${l.ex.length} exercices</p>` : ''}</li>`
      }).join('')
      return `<section><h3>${esc(d.title)}</h3><ul class="lessons">${items}</ul></section>`
    }).join('\n')
    const discHtml = disc.length ? `<section><h3>Pour commencer</h3><ul class="lessons">${disc.map(l => `<li><h4>${esc(l.title)}</h4><p>${esc(l.intro)}</p></li>`).join('')}</ul></section>` : ''
    const src = (s.sources || []).map(id => sources[id]).filter(Boolean)
    const others = subs.filter(o => o.id !== s.id).map(o => `<a href="/${lid}/${SUB[o.id].slug}/">${SUB[o.id].name}</a>`).join(' · ')
    const sameSub = Object.keys(LV).filter(o => o !== lid && lessonsBy(o, s.id).length).map(o => `<a href="/${o}/${S.slug}/">${S.name} ${LV[o].name}</a>`).join(' · ')
    const nEx = ls.reduce((n, l) => n + l.ex.length, 0)
    page({
      path: `/${lid}/${S.slug}/`,
      title: `${S.name} ${L.name} : leçons et exercices en ligne | Shukudai`,
      desc: `${ls.length} leçons et ${nEx} exercices de ${S.name.toLowerCase()} pour le ${L.name} : ${S.kw}. Conformes au programme officiel, avec indices et suivi parent.`,
      h1: `${S.name} ${L.name} : leçons et exercices`,
      lead: `${ls.length} leçons et ${nEx} exercices interactifs de ${S.name.toLowerCase()} pour le ${L.name} (${L.ages}) : ${esc(S.kw)}. Chaque leçon suit un thème du programme officiel et se termine par un bilan.`,
      body: `<h2>Le programme de ${S.name.toLowerCase()} en ${L.name}</h2>\n${discHtml}\n${doms}
${src.length ? `<p class="small">Sources : ${src.map(x => `<a href="${esc(x.url)}" rel="noopener">${esc(x.title)}</a>`).join(' · ')}</p>` : ''}
<section class="box"><h2>Aller plus loin</h2><p>Autres matières de ${L.name} : ${others}</p>${sameSub ? `<p>${S.name} dans les autres classes : ${sameSub}</p>` : ''}</section>`,
      crumbs: [{ name: L.name, url: `${SITE}/${lid}/` }, { name: S.name, url: `${SITE}/${lid}/${S.slug}/` }],
      jsonld: [{
        '@context': 'https://schema.org', '@type': 'Course', name: `${S.name} ${L.name}`,
        description: `${ls.length} leçons de ${S.name.toLowerCase()} conformes au programme de ${L.name}.`, inLanguage: 'fr',
        educationalLevel: L.name, about: S.name, provider: { '@type': 'Organization', name: 'Shukudai', url: SITE },
        hasCourseInstance: { '@type': 'CourseInstance', courseMode: 'online', courseWorkload: 'PT5M' },
      }],
    })
  }
}

// Jeux éducatifs
const GAMES = [
  ['Course aux tables', 'Tables de multiplication', 'Le plus de multiplications justes en une minute. Idéal pour apprendre et réviser les tables de multiplication.'],
  ['Bulles d’addition', 'Calcul mental : addition', 'Relier deux bulles dont la somme fait le nombre cible, pour gagner en rapidité en calcul mental.'],
  ['Fusée des soustractions', 'Soustraction', 'Douze soustractions et trois vies pour faire décoller la fusée.'],
  ['Memory du partage', 'Division', 'Un memory pour associer chaque division à son résultat et comprendre le partage.'],
  ['Continents et pays', 'Géographie du monde', 'Retrouver les continents et les pays sur la carte du monde.'],
  ['Pays et capitales', 'Capitales du monde', 'Quelle est la capitale de ce pays ? De l’Europe au monde entier, selon la classe.'],
  ['Mers et océans', 'Océans et mers', 'Une aventure en bateau pour situer les océans et les mers, avec trésors et indices.'],
]
page({
  path: '/jeux-educatifs/',
  title: 'Jeux éducatifs en ligne du CE1 au CM2 : tables, calcul, capitales | Shukudai',
  desc: 'Jeux éducatifs pour enfants du CE1 au CM2 : tables de multiplication, calcul mental, division, pays et capitales, mers et océans. Trois niveaux de difficulté par classe.',
  h1: 'Jeux éducatifs du CE1 au CM2',
  lead: 'Sept jeux pour réviser en s’amusant, adaptés à chaque classe du CE1 au CM2 avec trois niveaux de difficulté : facile, moyen et difficile.',
  body: `<div class="grid">${GAMES.map(([t, k, d]) => `<div class="card"><h3>${esc(t)}</h3><p class="tag">${esc(k)}</p><p>${esc(d)}</p></div>`).join('')}</div>`,
  crumbs: [{ name: 'Jeux éducatifs', url: `${SITE}/jeux-educatifs/` }],
  jsonld: [{
    '@context': 'https://schema.org', '@type': 'ItemList', name: 'Jeux éducatifs Shukudai',
    itemListElement: GAMES.map(([t, k, d], i) => ({ '@type': 'ListItem', position: i + 1, item: { '@type': 'Game', name: t, description: d, genre: k, audience: { '@type': 'EducationalAudience', educationalRole: 'student' } } })),
  }],
})

// Enseignants
page({
  path: '/enseignants/',
  title: 'Outil de suivi de classe pour enseignants du CE1 au CM2 | Shukudai',
  desc: 'Enseignants de primaire : créez votre classe, suivez les progrès de vos élèves du CE1 au CM2, repérez les notions à retravailler et proposez des révisions.',
  h1: 'Suivez les progrès de votre classe',
  lead: 'Shukudai aide les enseignants du CE1 au CM2 à prolonger le travail de la classe à la maison, avec l’accord des familles.',
  body: `<div class="grid">
<div class="card"><h3>Un code de classe</h3><p>Créez une classe et obtenez un code et un message prêt à envoyer aux familles. Les parents l’ajoutent sur la fiche de leur enfant.</p></div>
<div class="card"><h3>Une vue d’ensemble</h3><p>Qui avance, qui décroche, le temps passé et la réussite par élève, et les notions à retravailler ensemble en classe.</p></div>
<div class="card"><h3>Des révisions ciblées</h3><p>Proposez une leçon à toute la classe ou à quelques élèves, avec une date. Elle apparaît en tête de leur espace.</p></div>
<div class="card"><h3>Respect des données</h3><p>Vous voyez le pseudo, le niveau et la progression, rien d’autre. Les familles peuvent quitter la classe à tout moment.</p></div>
</div>
<p class="cta"><a class="btn" href="/#/enseignant/inscription">Créer un compte enseignant</a> <a class="btn ghost" href="/#/enseignant/connexion">Connexion enseignant</a></p>`,
  crumbs: [{ name: 'Enseignants', url: `${SITE}/enseignants/` }],
})

writeFileSync(join(pub, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(u => `  <url><loc>${u.loc}</loc><lastmod>${today}</lastmod><priority>${u.pri}</priority></url>`).join('\n')}
</urlset>
`)
writeFileSync(join(pub, 'robots.txt'), `User-agent: *
Allow: /

Sitemap: ${SITE}/sitemap.xml
`)
console.log(`SEO : ${urls.length} URL générées`)
