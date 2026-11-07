import type { Child, GamesState, LevelId } from '../types'
import { dayKey } from './dates'

export type Family = 'logique' | 'nombres' | 'mots' | 'espace'
export interface GameDef {
  id: string
  family: Family
  title: string
  blurb: string
  color: string
  /** Niveau minimum (la carte du monde arrive en CE2). */
  from?: LevelId
  /** Meilleur score : plus petit = meilleur (coups, essais) */
  lowerIsBetter?: boolean
  unit?: string
}

export const FAMILIES: Record<Family, { name: string; color: string; soft: string; blurb: string }> = {
  logique: { name: 'Logique', color: '#6D4FD8', soft: '#EEEAFD', blurb: 'Réfléchir, anticiper' },
  nombres: { name: 'Nombres', color: '#17766E', soft: '#E3F4EE', blurb: 'Calculer en s’amusant' },
  mots: { name: 'Mots', color: '#D2582F', soft: '#FFEADF', blurb: 'Lire, épeler, chercher' },
  espace: { name: 'Espace et monde', color: '#2B7C99', soft: '#DEF0F6', blurb: 'Se repérer, construire' },
}

export const GAMES: GameDef[] = [
  { id: 'sudoku', family: 'logique', title: 'Sudoku', blurb: 'Chaque symbole une seule fois par ligne, colonne et bloc.', color: '#6D4FD8', lowerIsBetter: true, unit: 's' },
  { id: 'puissance4', family: 'logique', title: 'Puissance 4', blurb: 'Aligne 4 jetons avant Foxy.', color: '#C4232B' },
  { id: 'taquin', family: 'logique', title: 'Taquin', blurb: 'Remets les tuiles dans l’ordre.', color: '#8A5CF6', lowerIsBetter: true, unit: 'coups' },
  { id: 'hanoi', family: 'logique', title: 'Tours de Hanoï', blurb: 'Déplace la tour, jamais un grand disque sur un petit.', color: '#B2428A', lowerIsBetter: true, unit: 'coups' },
  { id: 'compte', family: 'nombres', title: 'Le compte est bon', blurb: 'Combine les nombres pour atteindre la cible.', color: '#17766E' },
  { id: 'memory', family: 'nombres', title: 'Memory des calculs', blurb: 'Retrouve chaque calcul et son résultat.', color: '#2C8FA6', lowerIsBetter: true, unit: 'coups' },
  { id: 'labyrinthe', family: 'nombres', title: 'Labyrinthe de calcul', blurb: 'Avance seulement sur les calculs justes.', color: '#4A8F3A', lowerIsBetter: true, unit: 'erreurs' },
  { id: 'motmystere', family: 'mots', title: 'Mot mystère', blurb: 'Trouve le mot caché en 6 essais.', color: '#D2582F', lowerIsBetter: true, unit: 'essais' },
  { id: 'motsmeles', family: 'mots', title: 'Mots mêlés', blurb: 'Retrouve les mots cachés dans la grille.', color: '#C77F1F', lowerIsBetter: true, unit: 's' },
  { id: 'bataille', family: 'espace', title: 'Bataille navale', blurb: 'Vise juste avec les coordonnées.', color: '#2B7C99', lowerIsBetter: true, unit: 'tirs' },
  { id: 'tangram', family: 'espace', title: 'Tangram', blurb: 'Reproduis la silhouette avec 7 pièces.', color: '#D9A23A' },
  { id: 'carte', family: 'espace', title: 'Carte du monde', blurb: 'Retrouve continents, océans et pays.', color: '#3A76CE', from: 'ce2', unit: 'pts' },
]

const ORDER: LevelId[] = ['ce1', 'ce2', 'cm1', 'cm2']
export const gameFor = (g: GameDef, lv: LevelId) => ORDER.indexOf(lv) >= ORDER.indexOf(g.from ?? 'ce1')

/** Parties offertes chaque jour en mode « après les leçons » ; chaque leçon terminée en ajoute une. */
export const FREE_PER_DAY = 3

export function gamesToday(c: Child): Required<Pick<GamesState, 'used' | 'ms'>> & GamesState {
  const g = c.games ?? {}
  const today = dayKey()
  return g.day === today ? { ...g, used: g.used ?? 0, ms: g.ms ?? 0 } : { ...g, day: today, used: 0, ms: 0 }
}

export interface GameAccess {
  mode: 'tickets' | 'free' | 'off'
  tickets: number          // parties restantes (Infinity en mode libre)
  earned: number           // leçons terminées aujourd'hui
  minutesLeft: number | null
  blocked: null | 'off' | 'tickets' | 'time'
}

export function gameAccess(c: Child): GameAccess {
  const g = gamesToday(c)
  const mode = g.mode ?? 'tickets'
  const today = dayKey()
  const earned = c.sessions.filter(s => s.day === today && s.kind === 'lesson').length
  const tickets = mode === 'free' ? Infinity : Math.max(0, FREE_PER_DAY + earned - g.used)
  const minutesLeft = g.maxMin ? Math.max(0, Math.ceil(g.maxMin - g.ms / 60000)) : null
  const blocked = mode === 'off' ? 'off' : minutesLeft === 0 ? 'time' : tickets <= 0 ? 'tickets' : null
  return { mode, tickets, earned, minutesLeft, blocked }
}

/** Lance une partie : décompte un ticket. */
export function spendTicket(c: Child) {
  const g = gamesToday(c)
  c.games = { ...g, used: g.used + 1 }
}

export function addPlayTime(c: Child, ms: number) {
  const g = gamesToday(c)
  c.games = { ...g, ms: g.ms + ms }
}

/** Enregistre une victoire et renvoie true si c'est un nouveau record. */
export function recordWin(c: Child, id: string, score?: number): boolean {
  const g = gamesToday(c)
  const def = GAMES.find(x => x.id === id)
  const wins = { ...(g.wins ?? {}), [id]: (g.wins?.[id] ?? 0) + 1 }
  const best = { ...(g.best ?? {}) }
  let rec = false
  if (score != null && def?.unit) {
    const old = best[id]
    if (old == null || (def.lowerIsBetter ? score < old : score > old)) { best[id] = score; rec = old != null }
  }
  c.games = { ...g, wins, best }
  return rec
}

/** Petits outils partagés par les jeux */
export const rnd = (n: number) => Math.floor(Math.random() * n)
export const pick = <T,>(a: readonly T[]) => a[rnd(a.length)]
export function shuffle<T>(a: T[]): T[] { const b = a.slice(); for (let i = b.length - 1; i > 0; i--) { const j = rnd(i + 1); [b[i], b[j]] = [b[j], b[i]] } return b }
export const fmtTime = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`
