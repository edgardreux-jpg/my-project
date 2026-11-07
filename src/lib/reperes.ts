import type { Child, LevelId } from '../types'
import { LESSONS } from './curriculum'
import * as B from '../data/reperesBank'

/* Bilans « Repères » : sur le modèle des évaluations nationales de début d'année (DEPP).
   Mêmes compétences et mêmes formats d'exercices ; contenus originaux et générés. */

export type Vis =
  | { t: 'line'; from: number; step: number; ticks: number; at: number; labels: number[]; text?: Record<number, string> }
  | { t: 'blocks'; h: number; d: number; u: number }
  | { t: 'column'; a: number; b: number; op: '+' | '−' | '×' }
  | { t: 'frac'; n: number; d: number; shape: 'bar' | 'disc' | 'grid' }

export interface RQ {
  id: string
  comp: string
  kind: 'choice' | 'input' | 'speed'
  prompt: string
  /** Phrase support affichée à part (grammaire, vocabulaire) */
  sentence?: string
  say?: string            // lu à voix haute
  hideSay?: boolean       // dictée / oral : le texte entendu n'est pas affiché
  passage?: { title: string; text: string; oral?: boolean }
  options?: string[]
  optVis?: Vis[]
  emoji?: boolean         // réponses en images
  answer?: number | string
  vis?: Vis
  input?: 'num' | 'text'
  speed?: { items: { q: string; a: number }[]; seconds: number; target: number }
}
export interface Seq { id: string; title: string; subject: 'fr' | 'ma'; minutes: number; items: RQ[] }
export type Phase = 0 | 1 | 2
export const PHASES = [
  { name: 'Bilan de rentrée', short: 'Rentrée', need: 0, color: '#3A76CE' },
  { name: 'Bilan de mi-parcours', short: 'Mi-parcours', need: 0.4, color: '#D9A23A' },
  { name: 'Bilan de fin d’année', short: 'Fin d’année', need: 0.75, color: '#30A46C' },
] as const

export const COMPS: Record<string, { id: string; label: string; short: string; subject: 'fr' | 'ma'; tip: string }[]> = {
  ce1: [
    { id: 'texte', label: 'Comprendre un texte lu', short: 'Texte', subject: 'fr', tip: 'Lire ensemble de courts textes et se poser des questions : qui ? où ? pourquoi ? À quoi renvoie « il », « la » ?' },
    { id: 'phrases', label: 'Comprendre des phrases lues', short: 'Phrases', subject: 'fr', tip: 'Lire une phrase puis la dessiner ou la mimer : chaque mot compte (trois, rouge, le garçon…).' },
    { id: 'oral', label: 'Comprendre à l’oral', short: 'Oral', subject: 'fr', tip: 'Jeux de mots qui se ressemblent (bateau, gâteau, château) et histoires écoutées puis racontées.' },
    { id: 'ecrire', label: 'Écrire sous la dictée', short: 'Dictée', subject: 'fr', tip: 'Dicter chaque jour quelques syllabes et mots courants, en les épelant ensuite ensemble.' },
    { id: 'nombres', label: 'Lire et écrire les nombres', short: 'Nombres', subject: 'ma', tip: 'Dire et écrire des nombres : attention aux pièges comme 70, 80, 90 et aux zéros.' },
    { id: 'quantites', label: 'Dénombrer et se repérer', short: 'Quantités', subject: 'ma', tip: 'Compter par dizaines, faire des paquets de 10, placer des nombres sur une règle graduée.' },
    { id: 'calcul', label: 'Calcul mental', short: 'Calcul', subject: 'ma', tip: 'Quelques minutes par jour : compléments à 10, doubles, moitiés, petites additions et soustractions.' },
    { id: 'problemes', label: 'Résoudre des problèmes', short: 'Problèmes', subject: 'ma', tip: 'Raconter le problème avec ses mots, faire un dessin, puis choisir l’opération.' },
  ],
  ce2: [
    { id: 'texte', label: 'Comprendre un texte lu', short: 'Lecture', subject: 'fr', tip: 'Lire un texte puis en reformuler l’essentiel ; chercher dans le texte la phrase qui justifie la réponse.' },
    { id: 'oral', label: 'Comprendre à l’oral', short: 'Oral', subject: 'fr', tip: 'Écouter un documentaire ou une histoire, puis répondre à des questions sans revoir le texte.' },
    { id: 'ortho', label: 'Orthographe des mots', short: 'Orthographe', subject: 'fr', tip: 'Apprendre chaque semaine une courte liste de mots fréquents (toujours, beaucoup, maintenant…).' },
    { id: 'grammaire', label: 'Grammaire', short: 'Grammaire', subject: 'fr', tip: 'Chercher le verbe puis demander « qui est-ce qui ? » pour trouver le sujet ; accorder dans le groupe du nom.' },
    { id: 'conjugaison', label: 'Conjugaison', short: 'Conjugaison', subject: 'fr', tip: 'Associer les temps à des mots repères : hier, autrefois, aujourd’hui, demain.' },
    { id: 'vocab', label: 'Vocabulaire', short: 'Vocabulaire', subject: 'fr', tip: 'Jouer aux synonymes et aux familles de mots (dent, dentiste, dentifrice…).' },
    { id: 'nombres', label: 'Nombres jusqu’à 1 000', short: 'Nombres', subject: 'ma', tip: 'Décomposer en centaines, dizaines et unités ; placer des nombres sur une ligne graduée.' },
    { id: 'fractions', label: 'Fractions', short: 'Fractions', subject: 'ma', tip: 'Partager une pizza ou une tablette : un demi, un tiers, un quart, trois quarts.' },
    { id: 'calcul', label: 'Calcul posé et mental', short: 'Calcul', subject: 'ma', tip: 'Tables d’addition par cœur, puis additions et soustractions posées en alignant bien les chiffres.' },
    { id: 'problemes', label: 'Résoudre des problèmes', short: 'Problèmes', subject: 'ma', tip: 'Repérer ce qu’on cherche, les données utiles, et vérifier que la réponse est vraisemblable.' },
  ],
  cm1: [
    { id: 'texte', label: 'Comprendre un texte lu', short: 'Lecture', subject: 'fr', tip: 'Après une lecture, demander de justifier chaque réponse par une phrase du texte, et de dire ce que l’on comprend sans que ce soit écrit.' },
    { id: 'oral', label: 'Comprendre à l’oral', short: 'Oral', subject: 'fr', tip: 'Écouter un flash info, un documentaire ou un message, puis résumer en trois phrases ce qu’on a retenu.' },
    { id: 'ortho', label: 'Orthographe des mots', short: 'Orthographe', subject: 'fr', tip: 'Mémoriser les mots invariables fréquents (toujours, longtemps, beaucoup…) et les lettres muettes avec la famille du mot (blanc, blanche).' },
    { id: 'grammaire', label: 'Grammaire', short: 'Grammaire', subject: 'fr', tip: 'Repérer le verbe, puis son sujet, même placé après le verbe ; accorder tous les mots du groupe nominal.' },
    { id: 'conjugaison', label: 'Conjugaison', short: 'Conjugaison', subject: 'fr', tip: 'Réviser présent, imparfait, futur et passé composé des verbes fréquents (être, avoir, aller, faire, prendre).' },
    { id: 'vocab', label: 'Vocabulaire', short: 'Vocabulaire', subject: 'fr', tip: 'Chercher le sens d’un mot grâce à la phrase, puis vérifier dans le dictionnaire ; jouer aux familles de mots.' },
    { id: 'nombres', label: 'Grands nombres', short: 'Nombres', subject: 'ma', tip: 'Lire et écrire des nombres jusqu’au million : séparer les classes (milliers, unités) par un espace.' },
    { id: 'calcul', label: 'Calcul posé et mental', short: 'Calcul', subject: 'ma', tip: 'Tables de multiplication par cœur, puis multiplications posées en alignant bien les chiffres.' },
    { id: 'problemes', label: 'Résoudre des problèmes', short: 'Problèmes', subject: 'ma', tip: 'Souligner la question, repérer les données utiles, faire un schéma, puis vérifier si le résultat est vraisemblable.' },
  ],
  cm2: [
    { id: 'texte', label: 'Comprendre un texte lu', short: 'Lecture', subject: 'fr', tip: 'Varier les lectures (récits, documentaires, fiches) et repérer l’implicite : ce que ressent un personnage sans que ce soit dit.' },
    { id: 'oral', label: 'Comprendre à l’oral', short: 'Oral', subject: 'fr', tip: 'Écouter un court reportage, puis noter qui, quoi, où, quand, pourquoi.' },
    { id: 'ortho', label: 'Orthographe', short: 'Orthographe', subject: 'fr', tip: 'Apprendre les mots invariables du CM2 (malgré, pourtant, désormais…) et vérifier l’accord sujet-verbe en relisant.' },
    { id: 'grammaire', label: 'Grammaire', short: 'Grammaire', subject: 'fr', tip: 'Distinguer complément d’objet (on ne peut pas le déplacer) et complément circonstanciel (on peut le déplacer ou le supprimer).' },
    { id: 'conjugaison', label: 'Conjugaison', short: 'Conjugaison', subject: 'fr', tip: 'Dans un récit, l’imparfait décrit le décor, le passé simple raconte les actions ; réviser le plus-que-parfait.' },
    { id: 'vocab', label: 'Vocabulaire', short: 'Vocabulaire', subject: 'fr', tip: 'Enrichir le lexique en lisant beaucoup ; chercher des synonymes plus précis pour les mots trop vagues.' },
    { id: 'nombres', label: 'Grands nombres et décimaux', short: 'Nombres', subject: 'ma', tip: 'Lire les décimaux à voix haute (3,07 = trois unités et sept centièmes) ; comparer chiffre par chiffre.' },
    { id: 'fractions', label: 'Fractions', short: 'Fractions', subject: 'ma', tip: 'Représenter des fractions sur une bande ou une ligne graduée ; une fraction est plus grande que 1 si le numérateur dépasse le dénominateur.' },
    { id: 'calcul', label: 'Calcul posé et mental', short: 'Calcul', subject: 'ma', tip: 'Poser multiplications et divisions ; calcul mental quotidien (multiplier par 10, 100, moitiés, doubles).' },
    { id: 'problemes', label: 'Résoudre des problèmes', short: 'Problèmes', subject: 'ma', tip: 'Problèmes de proportionnalité : chercher la valeur pour 1, ou utiliser un tableau.' },
  ],
}
export const hasReperes = (lv: LevelId) => lv === 'ce1' || lv === 'ce2' || lv === 'cm1' || lv === 'cm2'

/* ---------- Générateur pseudo-aléatoire stable par profil et par bilan ---------- */
function rng(seed: string) {
  let h = 2166136261
  for (let i = 0; i < seed.length; i++) h = Math.imul(h ^ seed.charCodeAt(i), 16777619)
  return () => { h += 0x6D2B79F5; let t = h; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296 }
}
type R = () => number
const ri = (r: R, a: number, b: number) => a + Math.floor(r() * (b - a + 1))
const pick = <T,>(r: R, a: readonly T[]) => a[Math.floor(r() * a.length)]
function shuffle<T>(r: R, a: T[]): T[] { const b = a.slice(); for (let i = b.length - 1; i > 0; i--) { const j = Math.floor(r() * (i + 1)); [b[i], b[j]] = [b[j], b[i]] } return b }
/* ---------- Nombres en lettres (pour la dictée de nombres) ---------- */
const U = ['zéro', 'un', 'deux', 'trois', 'quatre', 'cinq', 'six', 'sept', 'huit', 'neuf', 'dix', 'onze', 'douze', 'treize', 'quatorze', 'quinze', 'seize']
const T = ['', 'dix', 'vingt', 'trente', 'quarante', 'cinquante', 'soixante', 'soixante', 'quatre-vingt', 'quatre-vingt']
function upTo99(n: number): string {
  if (n <= 16) return U[n]
  if (n < 20) return `dix-${U[n - 10]}`
  const t = Math.floor(n / 10), u = n % 10
  if (t === 7 || t === 9) { const rest = 10 + u; return `${T[t]}${t === 7 && u === 1 ? ' et ' : '-'}${upTo99(rest)}` }
  if (u === 0) return t === 8 ? 'quatre-vingts' : T[t]
  if (u === 1 && t !== 8) return `${T[t]} et un`
  return `${T[t]}-${U[u]}`
}
export function inWords(n: number): string {
  if (n >= 1000000) {
    const m = Math.floor(n / 1000000), r = n % 1000000
    const ms = m === 1 ? 'un million' : `${inWords(m)} millions`
    return r ? `${ms} ${inWords(r)}` : ms
  }
  if (n < 100) return upTo99(n)
  if (n < 1000) { const c = Math.floor(n / 100), r = n % 100; const cs = c === 1 ? 'cent' : `${U[c]} cent${r === 0 ? 's' : ''}`; return r ? `${cs} ${upTo99(r)}` : cs }
  const m = Math.floor(n / 1000), r = n % 1000
  const ms = m === 1 ? 'mille' : `${inWords(m).replace(/(cent|vingt)s$/, '$1')} mille`
  return r ? `${ms} ${inWords(r)}` : ms
}

/* ---------- Problèmes (formats officiels : parties-tout, comparaison, deux étapes, multiplicatif) ---------- */
const NAMES: [string, string][] = [['Léa', 'Elle'], ['Tom', 'Il'], ['Inès', 'Elle'], ['Sami', 'Il'], ['Jade', 'Elle'], ['Hugo', 'Il'], ['Nina', 'Elle'], ['Adam', 'Il']]
function problem(r: R, level: LevelId, phase: number, kind: number): RQ {
  const [n, pr] = pick(r, NAMES)
  const big = level === 'ce2' ? (phase === 2 ? 300 : 120) : (phase === 0 ? 20 : phase === 1 ? 50 : 90)
  let text = '', ans = 0, d: number[] = []
  if (kind === 0) { const a = ri(r, 3, big / 2), b = ri(r, 2, big / 2); text = `${n} a ${a} billes. ${pr} en gagne ${b} à la récréation. Combien de billes a-t-${pr.toLowerCase()} maintenant ?`; ans = a + b; d = [Math.abs(a - b), a, b] }
  else if (kind === 1) { const tot = ri(r, 10, big), a = ri(r, 2, tot - 2); text = `Dans un bus, il y a ${tot} passagers. ${a} sont des enfants, les autres sont des adultes. Combien y a-t-il d’adultes ?`; ans = tot - a; d = [tot + a, tot, a] }
  else if (kind === 2) { const a = ri(r, 5, big), e = ri(r, 2, 15); text = `${n} a ${a} images. Son frère en a ${e} de plus. Combien d’images a son frère ?`; ans = a + e; d = [a - e, a, e] }
  else if (kind === 3) { const a = ri(r, 10, big), b = ri(r, 2, 9), c = ri(r, 2, Math.min(a, 15)); text = `Dans la boîte, il y a ${a} crayons. La maîtresse en ajoute ${b}, puis les élèves en prennent ${c}. Combien reste-t-il de crayons dans la boîte ?`; ans = a + b - c; d = [a + b + c, a - b - c, a + b] }
  else { const g = ri(r, 2, level === 'ce2' ? 9 : 5), k = ri(r, 2, level === 'ce2' ? 9 : 5); text = `Il y a ${g} tables. Sur chaque table, il y a ${k} verres. Combien y a-t-il de verres en tout ?`; ans = g * k; d = [g + k, g * k + k, g * k - g] }
  const opts = [...new Set([ans, ...d.filter(x => x > 0), ans + 10, ans - 1, ans + 1].filter(x => x > 0))].slice(0, 6)
  const options = shuffle(r, opts).map(String)
  return { id: `pb${kind}`, comp: 'problemes', kind: 'choice', prompt: text, say: text, options, answer: options.indexOf(String(ans)) }
}

/* ---------- Construction d'un bilan ---------- */
export function buildBilan(child: Child, phase: Phase): Seq[] {
  const r = rng(`${child.id}:${child.grade}:${phase}`)
  if (child.grade === 'cm1' || child.grade === 'cm2') return buildCM(r, phase, child.grade)
  return child.grade === 'ce2' ? buildCE2(r, phase) : buildCE1(r, phase)
}

const textItems = (t: B.Text, comp: string, oral = false): RQ[] => t.qs.map((q, i) => ({
  id: `${t.title}-${i}`, comp, kind: 'choice', prompt: q.q, say: q.q, options: q.options, answer: q.answer,
  passage: { title: t.title, text: t.text, oral },
}))

function buildCE1(r: R, phase: number): Seq[] {
  const max = [100, 200, 1000][phase]
  // Français 1 : texte « documentaire », syllabes dictées, phrases lues, mots entendus
  const doc = B.CE1_DOC[phase % B.CE1_DOC.length]
  const syll = shuffle(r, B.CE1_SYLL.slice()).slice(0, 6)
  const phr = shuffle(r, B.CE1_PHRASES.slice()).slice(0, 5)
  const mots = shuffle(r, B.CE1_MOTS.slice()).slice(0, 6)
  const fr1: Seq = {
    id: 'fr1', title: 'Français 1', subject: 'fr', minutes: 8, items: [
      ...textItems(doc, 'texte'),
      ...syll.map((s, i): RQ => ({ id: `sy${i}`, comp: 'ecrire', kind: 'input', input: 'text', prompt: 'Écoute et écris la syllabe.', say: s, hideSay: true, answer: s })),
      ...phr.map((p, i): RQ => ({ id: `ph${i}`, comp: 'phrases', kind: 'choice', emoji: true, prompt: p.say, options: p.options, answer: p.answer })),
      ...mots.map((m, i): RQ => ({ id: `mo${i}`, comp: 'oral', kind: 'choice', emoji: true, prompt: 'Écoute le mot et touche la bonne image.', say: m.say, hideSay: true, options: m.options, answer: m.answer })),
    ],
  }
  // Mathématiques 1 : lire des nombres entendus, problèmes, dénombrer, calcul mental (addition)
  const lire = Array.from({ length: 5 }, (_, i): RQ => {
    const n = ri(r, 11, max - 1)
    const tens = Math.floor(n / 10) % 10, u = n % 10
    const traps = [n + 10, n - 10, Number(String(n).split('').reverse().join('')), tens * 10, n + 1, u * 10 + tens].filter(x => x > 0 && x !== n && x < max * 2)
    const options = shuffle(r, [...new Set([n, ...traps])].slice(0, 4)).map(String)
    return { id: `ln${i}`, comp: 'nombres', kind: 'choice', prompt: 'Écoute le nombre et touche-le.', say: inWords(n), hideSay: true, options, answer: options.indexOf(String(n)) }
  })
  const blocks = Array.from({ length: 3 }, (_, i): RQ => {
    const h = phase === 2 ? ri(r, 1, 4) : 0, d = ri(r, 1, phase === 0 ? 6 : 9), u = ri(r, 0, 9)
    return { id: `bl${i}`, comp: 'quantites', kind: 'input', input: 'num', prompt: 'Combien y a-t-il de petits cubes en tout ?', vis: { t: 'blocks', h, d, u }, answer: String(h * 100 + d * 10 + u) }
  })
  const add = Array.from({ length: 30 }, () => { const lim = [10, 20, 50][phase]; const a = ri(r, 1, lim), b = ri(r, 1, Math.max(2, lim - a)); return { q: `${a} + ${b}`, a: a + b } })
  const ma1: Seq = {
    id: 'ma1', title: 'Mathématiques 1', subject: 'ma', minutes: 7, items: [
      ...lire,
      problem(r, 'ce1', phase, 0), problem(r, 'ce1', phase, 1), problem(r, 'ce1', phase, 2),
      ...blocks,
      { id: 'sp-add', comp: 'calcul', kind: 'speed', prompt: 'Calcule le plus d’additions possible en 1 minute. Si un calcul te bloque, passe au suivant.', speed: { items: add, seconds: 60, target: 12 } },
    ],
  }
  // Français 2 : récit, mots dictés, phrases entendues
  const recit = B.CE1_RECIT[phase % B.CE1_RECIT.length]
  const dict = shuffle(r, B.CE1_MOTS_DICTES.slice()).slice(0, 6)
  const phrO = shuffle(r, B.CE1_PHRASES.filter(p => !phr.includes(p))).slice(0, 5)
  const fr2: Seq = {
    id: 'fr2', title: 'Français 2', subject: 'fr', minutes: 8, items: [
      ...textItems(recit, 'texte'),
      ...dict.map((w, i): RQ => ({ id: `dm${i}`, comp: 'ecrire', kind: 'input', input: 'text', prompt: 'Écoute et écris le mot.', say: w, hideSay: true, answer: w })),
      ...phrO.map((p, i): RQ => ({ id: `po${i}`, comp: 'oral', kind: 'choice', emoji: true, prompt: 'Écoute la phrase et touche la bonne image.', say: p.say, hideSay: true, options: p.options, answer: p.answer })),
    ],
  }
  // Mathématiques 2 : faits numériques (doubles, moitiés), problèmes, nombres dictés, ligne graduée, soustractions
  const facts = Array.from({ length: 30 }, () => { const k = ri(r, 0, 2); if (k === 0) { const a = ri(r, 1, 10); return { q: `double de ${a}`, a: 2 * a } } if (k === 1) { const a = 2 * ri(r, 1, 10); return { q: `moitié de ${a}`, a: a / 2 } } const a = ri(r, 1, 9); return { q: `${a} + ${10 - a}`, a: 10 } })
  const sub = Array.from({ length: 30 }, () => { const lim = [10, 20, 50][phase]; const a = ri(r, 3, lim), b = ri(r, 1, a - 1); return { q: `${a} − ${b}`, a: a - b } })
  const dictN = Array.from({ length: 4 }, (_, i): RQ => { const n = ri(r, 11, max - 1); return { id: `dn${i}`, comp: 'nombres', kind: 'input', input: 'num', prompt: 'Écoute le nombre et écris-le en chiffres.', say: inWords(n), hideSay: true, answer: String(n) } })
  const lines = Array.from({ length: 3 }, (_, i) => lineItem(r, max, `li${i}`, 'quantites', true))
  const ma2: Seq = {
    id: 'ma2', title: 'Mathématiques 2', subject: 'ma', minutes: 8, items: [
      { id: 'sp-fait', comp: 'calcul', kind: 'speed', prompt: 'Doubles, moitiés et compléments à 10 : réponds au plus de calculs possible en 1 minute.', speed: { items: facts, seconds: 60, target: 10 } },
      problem(r, 'ce1', phase, 3), problem(r, 'ce1', phase, 4),
      ...dictN, ...lines,
      { id: 'sp-sub', comp: 'calcul', kind: 'speed', prompt: 'Calcule le plus de soustractions possible en 1 minute.', speed: { items: sub, seconds: 60, target: 10 } },
    ],
  }
  return [fr1, ma1, fr2, ma2]
}

/** Ligne graduée : une flèche montre une graduation ; choisir (6 propositions) ou écrire le nombre. */
function lineItem(r: R, max: number, id: string, comp: string, choice: boolean): RQ {
  const step = max <= 100 ? pick(r, [1, 2, 5]) : max <= 200 ? pick(r, [2, 5, 10]) : pick(r, [10, 50, 100])
  const ticks = 10
  const from = Math.floor(ri(r, 0, Math.max(0, max - step * ticks)) / step) * step
  let at = ri(r, 1, ticks - 1)
  const labels = [0, 5, 10].filter(k => k !== at)
  if (labels.includes(at)) at = at + 1
  const val = from + at * step
  const vis: Vis = { t: 'line', from, step, ticks, at, labels }
  if (!choice) return { id, comp, kind: 'input', input: 'num', prompt: 'Quel nombre la flèche montre-t-elle ?', vis, answer: String(val) }
  const opts = [...new Set([val, val + step, val - step, from + at, val + 1, val + 10].filter(x => x >= 0))].slice(0, 6)
  const options = shuffle(r, opts).map(String)
  return { id, comp, kind: 'choice', prompt: 'Quel nombre la flèche montre-t-elle ?', vis, options, answer: options.indexOf(String(val)) }
}

function buildCE2(r: R, phase: number): Seq[] {
  const max = [1000, 1000, 10000][phase]
  const lu = B.CE2_LUS[phase % B.CE2_LUS.length]
  const dict = shuffle(r, B.CE2_MOTS_DICTES.slice()).slice(0, 6)
  const fr1: Seq = {
    id: 'fr1', title: 'Français 1', subject: 'fr', minutes: 10, items: [
      ...textItems(lu, 'texte'),
      ...dict.map((w, i): RQ => ({ id: `dm${i}`, comp: 'ortho', kind: 'input', input: 'text', prompt: 'Écoute et écris le mot.', say: w, hideSay: true, answer: w })),
    ],
  }
  const nums = Array.from({ length: 4 }, (_, i): RQ => { const n = ri(r, 101, max - 1); return { id: `dn${i}`, comp: 'nombres', kind: 'input', input: 'num', prompt: 'Écoute le nombre et écris-le en chiffres.', say: inWords(n), hideSay: true, answer: String(n) } })
  const col = (op: '+' | '−', i: number): RQ => {
    const carry = phase > 0 || i % 2 === 1
    let a = ri(r, 100, phase === 2 ? 999 : 600), b = ri(r, 10, phase === 2 ? 499 : 300)
    if (op === '−') { if (b > a) [a, b] = [b, a]; if (!carry) { const ad = String(a).padStart(3, '0'), bd = String(b).padStart(3, '0'); b = Number(bd.split('').map((d, k) => Math.min(Number(d), Number(ad[k]))).join('')) } }
    else if (!carry) { const ad = String(a).padStart(3, '0'); b = Number(String(b).padStart(3, '0').split('').map((d, k) => Math.min(Number(d), 9 - Number(ad[k]))).join('')) }
    return { id: `col${op}${i}`, comp: 'calcul', kind: 'input', input: 'num', prompt: op === '+' ? 'Calcule cette addition posée.' : 'Calcule cette soustraction posée.', vis: { t: 'column', a, b, op }, answer: String(op === '+' ? a + b : a - b) }
  }
  const decomp = Array.from({ length: 3 }, (_, i): RQ => {
    let c = ri(r, 1, 9), d = ri(r, 0, 9), u = ri(r, 0, 9)
    while (new Set([c, d, u]).size < 3 || u === 0) { c = ri(r, 1, 9); d = ri(r, 0, 9); u = ri(r, 1, 9) }
    const n = c * 100 + d * 10 + u
    const parts = [[u, 'unités'], [c, 'centaines'], [d, 'dizaines']].filter(p => p[0] !== 0).sort(() => r() - 0.5)
    const txt = parts.map(([v, w]) => `${v} ${v === 1 ? String(w).replace(/s$/, '') : w}`).join(', ')
    const opts = [...new Set([n, u * 100 + d * 10 + c, c * 100 + u * 10 + d, d * 100 + c * 10 + u])].filter(x => x > 0)
    const options = shuffle(r, opts).map(String)
    return { id: `dc${i}`, comp: 'nombres', kind: 'choice', prompt: `Quel nombre est formé de : ${txt} ?`, say: `Quel nombre est formé de ${txt} ?`, options, answer: options.indexOf(String(n)) }
  })
  const fracW = shuffle(r, B.CE2_FRAC_MOTS.slice()).slice(0, 3).map(([w, f], i): RQ => {
    const [n, d] = f.split('/').map(Number)
    const opts = [...new Set([f, `${d}/${n}`, `${n}/${d + 1}`, `${n + 1}/${d}`])].slice(0, 4)
    const options = shuffle(r, opts)
    return { id: `fw${i}`, comp: 'fractions', kind: 'choice', prompt: `Comment écrit-on « ${w} » en chiffres ?`, say: `Comment écrit-on ${w} en chiffres ?`, options, answer: options.indexOf(f) }
  })
  const tables = Array.from({ length: 30 }, () => { if (r() < 0.5) { const a = ri(r, 2, 9), b = ri(r, 2, 9); return { q: `${a} + ${b}`, a: a + b } } const s = ri(r, 10, 18), b = ri(r, s - 9, 9); return { q: `${s} − ${b}`, a: s - b } })
  const ma1: Seq = {
    id: 'ma1', title: 'Mathématiques 1', subject: 'ma', minutes: 10, items: [
      ...nums, problem(r, 'ce2', phase, 1), problem(r, 'ce2', phase, 3),
      lineItem(r, max, 'li0', 'nombres', false), lineItem(r, max, 'li1', 'nombres', false),
      col('+', 0), col('+', 1), ...decomp, ...fracW,
      { id: 'sp-tab', comp: 'calcul', kind: 'speed', prompt: 'Tables d’addition dans les deux sens : réponds au plus de calculs possible en 1 minute.', speed: { items: tables, seconds: 60, target: 14 } },
    ],
  }
  const oral = B.CE2_ORAUX[phase % B.CE2_ORAUX.length]
  const pickN = <T,>(a: readonly T[], n: number) => shuffle(r, a.slice()).slice(0, n)
  const fr2: Seq = {
    id: 'fr2', title: 'Français 2', subject: 'fr', minutes: 9, items: [
      ...textItems(oral, 'oral', true),
      ...pickN(B.CE2_SUJET, 3).map((q, i): RQ => ({ id: `su${i}`, comp: 'grammaire', kind: 'choice', prompt: 'Quel est le sujet du verbe ?', sentence: q.q, options: q.options, answer: q.answer })),
      ...pickN(B.CE2_TEMPS, 4).map((q, i): RQ => ({ id: `te${i}`, comp: 'conjugaison', kind: 'choice', prompt: 'À quel temps est le verbe ?', sentence: q.q, options: q.options, answer: q.answer })),
      ...pickN(B.CE2_SYNO, 4).map((q, i): RQ => ({ id: `sn${i}`, comp: 'vocab', kind: 'choice', prompt: 'Quel mot veut dire la même chose que le mot en majuscules ?', sentence: q.q, options: q.options, answer: q.answer })),
    ],
  }
  const blocks = Array.from({ length: 2 }, (_, i): RQ => { const h = ri(r, 1, phase === 2 ? 9 : 5), d = ri(r, 0, 9), u = ri(r, 0, 9); return { id: `bl${i}`, comp: 'nombres', kind: 'input', input: 'num', prompt: 'Combien y a-t-il de petits cubes en tout ?', vis: { t: 'blocks', h, d, u }, answer: String(h * 100 + d * 10 + u) } })
  const fracFig = Array.from({ length: 3 }, (_, i): RQ => {
    const [n, d, word] = pick(r, [[1, 2, 'un demi'], [1, 3, 'un tiers'], [1, 4, 'un quart'], [3, 4, 'trois quarts'], [2, 3, 'deux tiers'], [3, 5, 'trois cinquièmes'], [2, 5, 'deux cinquièmes']] as const)
    const shape = pick(r, ['bar', 'disc', 'grid'] as const)
    const cand: [number, number][] = [[n, d], [d - n, d], [n, d + 1], [n + 1, d + 1], [n, d + 2], [n + 1, d + 2]]
    const uniq = cand.filter((c, k) => c[0] > 0 && c[0] < c[1] && cand.findIndex(x => x[0] === c[0] && x[1] === c[1]) === k).slice(0, 4)
    const opts = shuffle(r, uniq)
    return { id: `ff${i}`, comp: 'fractions', kind: 'choice', prompt: `Quelle figure montre ${word} en gris ?`, say: `Quelle figure montre ${word} en gris ?`, options: opts.map(([a, b]) => `${a}/${b}`), optVis: opts.map(([a, b]) => ({ t: 'frac', n: a, d: b, shape }) as Vis), answer: opts.findIndex(o => o[0] === n && o[1] === d) }
  })
  const mental = Array.from({ length: 30 }, () => { const k = ri(r, 0, 3); if (k === 0) { const a = ri(r, 2, 9) * 10, b = ri(r, 1, 9) * 10; return { q: `${a} + ${b}`, a: a + b } } if (k === 1) { const a = ri(r, 21, 99), b = ri(r, 2, 9); return { q: `${a} + ${b}`, a: a + b } } if (k === 2) { const a = ri(r, 2, 5), b = ri(r, 2, 10); return { q: `${a} × ${b}`, a: a * b } } const a = ri(r, 30, 99), b = ri(r, 2, 9); return { q: `${a} − ${b}`, a: a - b } })
  const ma2: Seq = {
    id: 'ma2', title: 'Mathématiques 2', subject: 'ma', minutes: 9, items: [
      ...blocks, problem(r, 'ce2', phase, 4), problem(r, 'ce2', phase, 2),
      lineItem(r, max, 'li2', 'nombres', false), col('−', 2), col('−', 3), ...fracFig,
      { id: 'sp-proc', comp: 'calcul', kind: 'speed', prompt: 'Calcul mental : réponds au plus de calculs possible en 1 minute.', speed: { items: mental, seconds: 60, target: 10 } },
    ],
  }
  const fr3: Seq = {
    id: 'fr3', title: 'Français 3', subject: 'fr', minutes: 9, items: [
      ...pickN(B.CE2_PHRASES, 3).map((p, i): RQ => ({ id: `po${i}`, comp: 'oral', kind: 'choice', emoji: true, prompt: 'Écoute la phrase et touche la bonne image.', say: p.say, hideSay: true, options: p.options, answer: p.answer })),
      ...pickN(B.CE2_TROUS, 3).map((q, i): RQ => ({ id: `tr${i}`, comp: 'texte', kind: 'choice', prompt: 'Choisis le mot qui donne du sens à la phrase.', sentence: q.q, options: q.options, answer: q.answer })),
      ...pickN(B.CE2_VERBE, 3).map((q, i): RQ => ({ id: `ve${i}`, comp: 'grammaire', kind: 'choice', prompt: 'Quel est le verbe conjugué ?', sentence: q.q, options: q.options, answer: q.answer })),
      ...pickN(B.CE2_ACCORD, 3).map((q, i): RQ => ({ id: `ac${i}`, comp: 'grammaire', kind: 'choice', prompt: 'Choisis le mot qui complète correctement le groupe de mots.', sentence: q.q, options: q.options, answer: q.answer })),
      ...pickN(B.CE2_CLASSES, 3).map((q, i): RQ => ({ id: `cl${i}`, comp: 'grammaire', kind: 'choice', prompt: 'Quelle est la nature du mot en majuscules ?', sentence: q.q, options: q.options, answer: q.answer })),
      ...pickN(B.CE2_TEMPS_DEMANDE, 3).map((q, i): RQ => ({ id: `td${i}`, comp: 'conjugaison', kind: 'choice', prompt: q.q, options: q.options, answer: q.answer })),
      ...pickN(B.CE2_FAMILLES, 3).map((q, i): RQ => ({ id: `fa${i}`, comp: 'vocab', kind: 'choice', prompt: 'Trouve l’intrus : le mot qui n’est pas de la même famille.', options: q.options, answer: q.answer })),
    ],
  }
  return [fr1, ma1, fr2, ma2, fr3]
}

/* ---------- CM1 / CM2 ---------- */
/** Écriture française d'un nombre : espaces entre les classes, virgule décimale. */
export function fmtFr(n: number): string {
  const neg = n < 0, x = Math.abs(n)
  const [e, d] = String(Number(x.toFixed(3))).split('.')
  const ent = e.replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
  return (neg ? '−' : '') + ent + (d ? ',' + d : '')
}
const PRENOMS: [string, string][] = [['Lina', 'elle'], ['Malo', 'il'], ['Zoé', 'elle'], ['Ilyes', 'il'], ['Romane', 'elle'], ['Gabin', 'il'], ['Yasmine', 'elle'], ['Nathan', 'il']]
function cmProblem(r: R, lv: LevelId, phase: number, kind: number, id: string): RQ {
  const [n, pr] = pick(r, PRENOMS)
  const cm2 = lv === 'cm2'
  let text = '', ans = 0, d: number[] = [], unit = ''
  if (kind === 0) { // partage équitable (division)
    const g = ri(r, 3, cm2 ? 12 : 8), k = ri(r, 6, cm2 ? 45 : 25); const tot = g * k
    text = `Un fleuriste a ${tot} roses. Il fait des bouquets de ${g} roses. Combien de bouquets peut-il faire ?`; ans = k; d = [tot - g, tot + g, g * 2, k + g, k * 10]
  } else if (kind === 1) { // deux étapes, argent
    const p1 = ri(r, 3, 9), q = ri(r, 2, 5), p2 = ri(r, 4, 15), billet = q * p1 + p2 < 45 && r() < 0.5 ? 50 : 100
    text = `${n} achète ${q} livres à ${p1} € chacun et un jeu à ${p2} €. ${pr === 'il' ? 'Il' : 'Elle'} paie avec un billet de ${billet} €. Combien lui rend-on ?`
    ans = billet - (q * p1 + p2); d = [q * p1 + p2, billet - q * p1, billet - p1 - p2, billet - (q + p1 + p2), ans + 10]; unit = ' €'
  } else if (kind === 2) { // proportionnalité
    const a = ri(r, 2, 5), unitP = ri(r, 2, cm2 ? 9 : 6), pa = unitP * a
    const b = cm2 && r() < 0.5 ? a * ri(r, 2, 3) + a / a : a * ri(r, 2, 4)
    if (r() < 0.7) { text = `${a} cahiers coûtent ${pa} €. Combien coûtent ${b} cahiers ?`; ans = unitP * b; d = [pa + b, pa * b, pa + (b - a), unitP + b, ans + unitP]; unit = ' €' }
    else { const p = pick(r, [2, 4]), k = ri(r, 2, 4), o = pick(r, [3, 5, 6]); text = `Pour une recette, il faut ${o} œufs pour ${p} personnes. Combien d’œufs faut-il pour ${p * k} personnes ?`; ans = o * k; d = [o + p * k, o * k + 1, o + k, p * k, o * (k + 1)] }
  } else if (kind === 3) { // comparaison, grands nombres
    const a = ri(r, 1200, cm2 ? 98000 : 9800), e = ri(r, 150, cm2 ? 9000 : 900)
    text = `Le stade de la ville A peut accueillir ${fmtFr(a)} spectateurs. Celui de la ville B en accueille ${fmtFr(e)} de plus. Combien de spectateurs peut accueillir le stade B ?`
    ans = a + e; d = [a - e, a, e, a + e + 100, a + e - 10]
  } else if (kind === 4) { // géométrie : périmètre
    const L = ri(r, 8, 30), l = ri(r, 3, L - 1)
    text = `Un jardin rectangulaire mesure ${L} m de long et ${l} m de large. Quelle longueur de grillage faut-il pour en faire le tour ?`; ans = 2 * (L + l); d = [L + l, L * l, 2 * L + l, 4 * L, ans + 2]; unit = ' m'
  } else { // durée
    const h = ri(r, 8, 15), m = pick(r, [5, 10, 20, 25, 35, 40]), dur = pick(r, [45, 50, 75, 90, 100])
    const end = h * 60 + m + dur
    text = `Un film commence à ${h} h ${String(m).padStart(2, '0')} et dure ${dur} minutes. À quelle heure se termine-t-il ?`
    const f = (t: number) => `${Math.floor(t / 60)} h ${String(t % 60).padStart(2, '0')}`
    const opts = [...new Set([end, end + 40, end - 10, h * 60 + m + Math.floor(dur / 60) * 100 % 60, end + 60, h * 60 + dur].map(f))].slice(0, 6)
    const options = shuffle(r, opts)
    return { id, comp: 'problemes', kind: 'choice', prompt: text, say: text, options, answer: options.indexOf(f(end)) }
  }
  const opts = [...new Set([ans, ...d].filter(x => x > 0 && Number.isFinite(x)))].slice(0, 6)
  const options = shuffle(r, opts).map(x => fmtFr(x) + unit)
  return { id, comp: 'problemes', kind: 'choice', prompt: text, say: text, options, answer: options.indexOf(fmtFr(ans) + unit) }
}

/** Ligne graduée de grands nombres ou de décimaux (étiquettes écrites à la française). */
function cmLine(r: R, id: string, mode: 'big' | 'dec'): RQ {
  const step = mode === 'big' ? pick(r, [100, 1000, 10000]) : pick(r, [0.1, 0.01])
  const ticks = 10
  const from = mode === 'big' ? ri(r, 1, 90) * step * 10 : ri(r, 0, 20) * step * 10
  let at = ri(r, 1, ticks - 1); if (at === 5) at = 6
  const val = Number((from + at * step).toFixed(3))
  const labels = [0, 5, 10]
  const text: Record<number, string> = {}; labels.forEach(k => { text[k] = fmtFr(from + k * step) })
  const vis: Vis = { t: 'line', from, step, ticks, at, labels, text }
  const opts = [...new Set([val, val + step, val - step, from + at, Number((val + step * 10).toFixed(3)), Number((from + at * step / 10).toFixed(3))].map(x => Number(x.toFixed(3))).filter(x => x >= 0))].slice(0, 6)
  const options = shuffle(r, opts).map(fmtFr)
  return { id, comp: 'nombres', kind: 'choice', prompt: 'Quel nombre la flèche montre-t-elle ?', vis, options, answer: options.indexOf(fmtFr(val)) }
}

function buildCM(r: R, phase: number, lv: 'cm1' | 'cm2'): Seq[] {
  const cm2 = lv === 'cm2'
  const pickN = <T,>(a: readonly T[], n: number) => shuffle(r, a.slice()).slice(0, n)
  const mcq = (bank: readonly B.MCQ[], n: number, pre: string, comp: string, prompt: string, asSentence = true): RQ[] =>
    pickN(bank, n).map((q, i) => asSentence
      ? { id: `${pre}${i}`, comp, kind: 'choice', prompt, sentence: q.q, options: q.options, answer: q.answer }
      : { id: `${pre}${i}`, comp, kind: 'choice', prompt: q.q || prompt, options: q.options, answer: q.answer })
  const dict = (bank: readonly string[], n: number): RQ[] => pickN(bank, n).map((w, i) => ({ id: `dm${i}`, comp: 'ortho', kind: 'input', input: 'text', prompt: 'Écoute et écris le mot.', say: w, hideSay: true, answer: w }))
  const maxN = cm2 ? [999999, 9999999, 999999999][phase] : [9999, 99999, 999999][phase]
  const dictN = (n: number): RQ[] => Array.from({ length: n }, (_, i) => {
    let v = ri(r, Math.floor(maxN / 20), maxN)
    if (r() < 0.5) v = Math.floor(v / 100) * 100 + ri(r, 0, 9) // un zéro intercalé, piège classique
    return { id: `dn${i}`, comp: 'nombres', kind: 'input', input: 'num', prompt: 'Écoute le nombre et écris-le en chiffres.', say: inWords(v), hideSay: true, answer: String(v) }
  })
  const decomp = (n: number): RQ[] => Array.from({ length: n }, (_, i) => {
    const parts: [number, string, number][] = [[ri(r, 1, 9), 'dizaines de mille', 10000], [ri(r, 1, 9), 'centaines', 100], [ri(r, 1, 9), 'unités', 1]]
    if (cm2) parts.unshift([ri(r, 1, 9), 'centaines de mille', 100000])
    const v = parts.reduce((a, [k, , m]) => a + k * m, 0)
    const txt = shuffle(r, parts).map(([k, w]) => `${k} ${w}`).join(', ')
    const alt = [v, v + parts[parts.length - 2][0] * 900, Number(String(v).replace(/0/g, '')), v * 10, Math.floor(v / 10)]
    const options = shuffle(r, [...new Set(alt)].slice(0, 4)).map(fmtFr)
    return { id: `dc${i}`, comp: 'nombres', kind: 'choice', prompt: `Quel nombre est formé de : ${txt} ?`, say: `Quel nombre est formé de ${txt} ?`, options, answer: options.indexOf(fmtFr(v)) }
  })
  const col = (op: '+' | '−' | '×', i: number): RQ => {
    let a: number, b: number
    if (op === '×') { a = ri(r, cm2 ? 120 : 23, cm2 ? 879 : 489); b = phase === 0 && !cm2 ? ri(r, 3, 9) : ri(r, 12, cm2 ? 68 : 39) }
    else { a = ri(r, 1200, 9800); b = ri(r, 150, 4800); if (op === '−' && b > a) [a, b] = [b, a] }
    const res = op === '+' ? a + b : op === '−' ? a - b : a * b
    return { id: `col${i}`, comp: 'calcul', kind: 'input', input: 'num', prompt: op === '×' ? 'Calcule cette multiplication posée.' : op === '+' ? 'Calcule cette addition posée.' : 'Calcule cette soustraction posée.', vis: { t: 'column', a, b, op }, answer: String(res) }
  }
  const div = (i: number): RQ => { const b = ri(r, 3, 9), q = ri(r, cm2 ? 24 : 12, cm2 ? 240 : 99); return { id: `dv${i}`, comp: 'calcul', kind: 'input', input: 'num', prompt: `Calcule le quotient : ${fmtFr(q * b)} ÷ ${b}`, answer: String(q) } }
  const tables = Array.from({ length: 30 }, () => { const a = ri(r, 2, 9), b = ri(r, 2, 10); return { q: `${a} × ${b}`, a: a * b } })
  const mental = Array.from({ length: 30 }, () => {
    const k = ri(r, 0, 4)
    if (k === 0) { const a = ri(r, 2, 99), m = pick(r, [10, 100]); return { q: `${a} × ${m}`, a: a * m } }
    if (k === 1) { const a = ri(r, 11, 49); return { q: `double de ${a}`, a: 2 * a } }
    if (k === 2) { const a = 2 * ri(r, 11, 60); return { q: `moitié de ${a}`, a: a / 2 } }
    if (k === 3) { const a = ri(r, 2, 9) * 10, b = ri(r, 2, 9); return { q: `${a} × ${b}`, a: a * b } }
    const a = ri(r, 120, 990), b = ri(r, 11, 99); return { q: `${a} − ${b}`, a: a - b }
  })
  const lu = (cm2 ? B.CM2_LUS : B.CM1_LUS)[phase % 3]
  const oral = (cm2 ? B.CM2_ORAUX : B.CM1_ORAUX)[phase % 3]
  const fr2: Seq = {
    id: 'fr2', title: 'Français 2', subject: 'fr', minutes: 10, items: [
      ...textItems(oral, 'oral', true),
      ...(cm2 ? mcq(B.CM2_COMPLEMENT, 4, 'co', 'grammaire', '', false) : mcq(B.CM1_ACCORD, 4, 'ac', 'ortho', 'Choisis le mot qui complète correctement le groupe de mots.')),
      ...mcq(cm2 ? B.CM2_TEMPS : B.CM1_TEMPS, 3, 'te', 'conjugaison', 'À quel temps est le verbe ?'),
      ...mcq(cm2 ? B.CM2_TEMPS_PROD : B.CM1_TEMPS_PROD, 3, 'tp', 'conjugaison', 'Choisis la forme correcte du verbe.'),
    ],
  }
  const fr3: Seq = {
    id: 'fr3', title: 'Français 3', subject: 'fr', minutes: 8, items: [
      ...mcq(cm2 ? B.CM2_CLASSES : B.CM1_CLASSES, 3, 'cl', 'grammaire', 'Quelle est la nature du mot en majuscules ?'),
      ...mcq(cm2 ? B.CM2_SYNO : B.CM1_SYNO, 4, 'sn', 'vocab', 'Quel mot ou groupe de mots a le même sens que le mot en majuscules, dans cette phrase ?'),
      ...mcq(cm2 ? B.CM2_FAMILLES : B.CM1_FAMILLES, 3, 'fa', 'vocab', 'Trouve l’intrus : le mot qui n’est pas de la même famille.', false),
      ...(cm2 ? mcq(B.CM1_ACCORD, 3, 'ac', 'ortho', 'Choisis le mot qui complète correctement le groupe de mots.') : mcq(B.CM1_SUJET, 2, 'su2', 'grammaire', 'Quel est le sujet du verbe ?')),
    ],
  }
  if (!cm2) {
    const fr1: Seq = {
      id: 'fr1', title: 'Français 1', subject: 'fr', minutes: 10, items: [
        ...textItems(lu, 'texte'), ...dict(B.CM1_MOTS_DICTES, 6),
        ...mcq(B.CM1_SUJET, 3, 'su', 'grammaire', 'Quel est le sujet du verbe ?'),
        ...mcq(B.CM1_VERBE, 3, 've', 'grammaire', 'Quel est le verbe conjugué ?'),
      ],
    }
    const ma1: Seq = {
      id: 'ma1', title: 'Mathématiques 1', subject: 'ma', minutes: 10, items: [
        ...dictN(4), ...decomp(2), cmLine(r, 'li0', 'big'), cmLine(r, 'li1', 'big'),
        cmProblem(r, lv, phase, 3, 'pb3'), cmProblem(r, lv, phase, 1, 'pb1'),
        col('+', 0), col('−', 1),
      ],
    }
    const ma2: Seq = {
      id: 'ma2', title: 'Mathématiques 2', subject: 'ma', minutes: 9, items: [
        { id: 'sp-tab', comp: 'calcul', kind: 'speed', prompt: 'Tables de multiplication : réponds au plus de calculs possible en 1 minute.', speed: { items: tables, seconds: 60, target: 16 } },
        col('×', 2), col('×', 3), div(0),
        cmProblem(r, lv, phase, 0, 'pb0'), cmProblem(r, lv, phase, 2, 'pb2'), cmProblem(r, lv, phase, 5, 'pb5'),
        { id: 'sp-men', comp: 'calcul', kind: 'speed', prompt: 'Calcul mental : réponds au plus de calculs possible en 1 minute.', speed: { items: mental, seconds: 60, target: 10 } },
      ],
    }
    return [fr1, ma1, fr2, ma2, fr3]
  }
  // ----- CM2 -----
  const decDits = pickN(B.CM2_DECIMAUX_DITS, 3).map(([w, v], i): RQ => {
    const x = Number(v.replace(',', '.'))
    const opts = [...new Set([x, x * 10, x / 10, x + 1, Number(v.replace(',', '').replace(/^0+/, '') || '0')].map(y => Number(y.toFixed(3))))].slice(0, 4)
    const options = shuffle(r, opts).map(fmtFr)
    return { id: `dd${i}`, comp: 'nombres', kind: 'choice', prompt: 'Écoute et touche le nombre entendu.', say: w, hideSay: true, options, answer: options.indexOf(fmtFr(x)) }
  })
  const cmpDec = Array.from({ length: 2 }, (_, i): RQ => {
    const e = ri(r, 1, 20), a = ri(r, 1, 9)
    const vals = [e + a / 10, e + (a - 1) / 10 + ri(r, 1, 9) / 100 + 0.009 * (r() < 0.5 ? 1 : 0), e + ri(r, 0, a - 1) / 10 + ri(r, 10, 99) / 1000, e - 1 + 0.9 + ri(r, 1, 9) / 100]
      .map(x => Number(x.toFixed(3)))
    const uniq = [...new Set(vals)]; const max = Math.max(...uniq)
    const options = shuffle(r, uniq).map(fmtFr)
    return { id: `cd${i}`, comp: 'nombres', kind: 'choice', prompt: 'Quel est le plus grand nombre ?', options, answer: options.indexOf(fmtFr(max)) }
  })
  const fracFig = Array.from({ length: 2 }, (_, i): RQ => {
    const [n, dd, word] = pick(r, [[3, 4, 'trois quarts'], [2, 3, 'deux tiers'], [3, 5, 'trois cinquièmes'], [5, 8, 'cinq huitièmes'], [7, 10, 'sept dixièmes'], [5, 6, 'cinq sixièmes']] as const)
    const shape = dd % 2 === 0 ? pick(r, ['bar', 'grid'] as const) : 'bar'
    const cand: [number, number][] = [[n, dd], [dd - n, dd], [n, dd + 2], [n + 1, dd], [n - 1, dd]]
    const uniq = cand.filter((c, k) => c[0] > 0 && c[0] < c[1] && cand.findIndex(x => x[0] === c[0] && x[1] === c[1]) === k).slice(0, 4)
    const opts = shuffle(r, uniq)
    return { id: `ff${i}`, comp: 'fractions', kind: 'choice', prompt: `Quelle figure montre ${word} en gris ?`, say: `Quelle figure montre ${word} en gris ?`, options: opts.map(([a, b]) => `${a}/${b}`), optVis: opts.map(([a, b]) => ({ t: 'frac', n: a, d: b, shape: b % 2 === 0 ? shape : 'bar' }) as Vis), answer: opts.findIndex(o => o[0] === n && o[1] === dd) }
  })
  const fracOne = Array.from({ length: 2 }, (_, i): RQ => {
    const d = ri(r, 3, 9), k = ri(r, 0, 2), n = k === 0 ? ri(r, 1, d - 1) : k === 1 ? d : ri(r, d + 1, 2 * d)
    const options = ['plus petite que 1', 'égale à 1', 'plus grande que 1']
    return { id: `f1${i}`, comp: 'fractions', kind: 'choice', prompt: `La fraction ${n}/${d} est…`, options, answer: k }
  })
  const fracLine = Array.from({ length: 2 }, (_, i): RQ => {
    const d = pick(r, [3, 4, 5]); const ticks = 2 * d
    let at = ri(r, 1, ticks - 1); if (at === d) at += 1
    const text: Record<number, string> = { 0: '0', [d]: '1', [ticks]: '2' }
    const vis: Vis = { t: 'line', from: 0, step: 1, ticks, at, labels: [0, d, ticks], text }
    const cand = [`${at}/${d}`, `${at}/${ticks}`, `${d}/${at}`, `${at + 1}/${d}`, `1/${d}`, `${at}/${d + 1}`]
    const options = shuffle(r, [...new Set(cand)].slice(0, 4))
    return { id: `fl${i}`, comp: 'fractions', kind: 'choice', prompt: 'Quelle fraction la flèche montre-t-elle ?', vis, options, answer: options.indexOf(`${at}/${d}`) }
  })
  const fr1: Seq = {
    id: 'fr1', title: 'Français 1', subject: 'fr', minutes: 10, items: [
      ...textItems(lu, 'texte'), ...dict(B.CM2_MOTS_DICTES, 6),
      ...mcq(B.CM2_ACCORD_SV, 4, 'sv', 'ortho', 'Choisis la forme du verbe qui convient.'),
    ],
  }
  const ma1: Seq = {
    id: 'ma1', title: 'Mathématiques 1', subject: 'ma', minutes: 10, items: [
      ...dictN(3), ...decDits, ...cmpDec, cmLine(r, 'li0', 'dec'), cmLine(r, 'li1', 'big'),
      cmProblem(r, lv, phase, 2, 'pb2'), cmProblem(r, lv, phase, 1, 'pb1'),
    ],
  }
  const ma2: Seq = {
    id: 'ma2', title: 'Mathématiques 2', subject: 'ma', minutes: 10, items: [
      ...fracFig, ...fracOne, ...fracLine, col('×', 0), div(0), div(1),
      cmProblem(r, lv, phase, 4, 'pb4'), cmProblem(r, lv, phase, 0, 'pb0'),
      { id: 'sp-men', comp: 'calcul', kind: 'speed', prompt: 'Calcul mental : réponds au plus de calculs possible en 1 minute.', speed: { items: mental, seconds: 60, target: 12 } },
    ],
  }
  return [fr1, ma1, fr2, ma2, fr3]
}

/* ---------- Correction ---------- */
const norm = (s: string) => s.trim().toLowerCase().replace(/(\d)\.(\d)/g, '$1,$2').replace(/[’']/g, '\'').replace(/\s+/g, ' ').replace(/^(le |la |les |l')/, '')
/** Score d'une réponse entre 0 et 1. */
export function scoreItem(q: RQ, given: any): number {
  if (q.kind === 'choice') return given === q.answer ? 1 : 0
  if (q.kind === 'input') return norm(String(given ?? '')).replace(/\s/g, '') === norm(String(q.answer)).replace(/\s/g, '') ? 1 : 0
  const ok = Number(given ?? 0)
  return Math.min(1, ok / (q.speed!.target))
}

/* ---------- Stockage dans le profil ---------- */
export type CompScore = Record<string, [number, number]>   // compétence → [points, max]
export interface SeqResult { s: CompScore; at: string; ms: number }
export type ReperesState = Partial<Record<Phase, Record<string, SeqResult>>>

export function saveSeq(c: Child, phase: Phase, seqId: string, res: SeqResult) {
  const st: ReperesState = (c as any).reperes ?? {}
  st[phase] = { ...(st[phase] ?? {}), [seqId]: res }
  ;(c as any).reperes = st
}
export const reperesOf = (c: Child): ReperesState => ((c as any).reperes ?? {}) as ReperesState

export function seqIds(lv: LevelId) { return lv === 'ce1' ? ['fr1', 'ma1', 'fr2', 'ma2'] : ['fr1', 'ma1', 'fr2', 'ma2', 'fr3'] }
export const phaseDone = (c: Child, p: Phase) => seqIds(c.grade).every(id => reperesOf(c)[p]?.[id])
export const phaseStarted = (c: Child, p: Phase) => seqIds(c.grade).some(id => reperesOf(c)[p]?.[id])

/** Avancement dans le programme de l'année (part des leçons faites). */
export function programProgress(c: Child): number {
  const all = LESSONS.filter(l => l.level === c.grade)
  const done = all.filter(l => (c.lessons[l.id]?.done ?? 0) > 0).length
  return all.length ? done / all.length : 0
}
export function phaseState(c: Child, p: Phase): 'done' | 'open' | 'locked' {
  if (phaseDone(c, p)) return 'done'
  if (p === 0) return 'open'
  if (!phaseDone(c, (p - 1) as Phase)) return 'locked'
  return programProgress(c) >= PHASES[p].need ? 'open' : 'locked'
}

/** Pourcentage par compétence pour un bilan (null si pas encore évaluée). */
export function compScores(c: Child, p: Phase): Record<string, number | null> {
  const out: Record<string, number | null> = {}
  const acc: CompScore = {}
  Object.values(reperesOf(c)[p] ?? {}).forEach(r => Object.entries(r.s).forEach(([k, [a, b]]) => { acc[k] = [(acc[k]?.[0] ?? 0) + a, (acc[k]?.[1] ?? 0) + b] }))
  for (const comp of COMPS[c.grade] ?? []) out[comp.id] = acc[comp.id] && acc[comp.id][1] > 0 ? Math.round((acc[comp.id][0] / acc[comp.id][1]) * 100) : null
  return out
}
/** Niveau de maîtrise, comme les restitutions officielles : à renforcer / fragile / satisfaisant. */
export const masteryOf = (v: number) => (v >= 75 ? 'ok' : v >= 50 ? 'mid' : 'low')
export const MASTERY = { ok: 'Satisfaisant', mid: 'Fragile', low: 'À renforcer' } as const

/** Résultats fictifs d'un bilan de rentrée, pour les comptes de démonstration. */
export function demoReperes(c: Child, seed: number, level = 0.7) {
  const r = rng(`demo${seed}`)
  const comps = COMPS[c.grade] ?? []
  const ids = seqIds(c.grade)
  ids.forEach((sid, k) => {
    const subj = sid.startsWith('fr') ? 'fr' : 'ma'
    const s: CompScore = {}
    comps.filter(x => x.subject === subj).forEach(x => { const max = 6; s[x.id] = [Math.max(0, Math.min(max, Math.round(max * (level + (r() - 0.5) * 0.8)))), max] })
    saveSeq(c, 0, sid, { s, at: new Date(Date.now() - (20 - k) * 86400000).toISOString(), ms: 480000 })
  })
}
