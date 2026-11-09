import type { LevelId } from '../../../types'

export interface GameProps {
  level: LevelId
  /** Palier de difficulté 0 à 5 (niveau scolaire + difficulté choisie) */
  tier: number
  /** Difficulté choisie : 0 facile, 1 moyen, 2 difficile */
  diff: 0 | 1 | 2
  sound: boolean
  name: string
  /** Partie gagnée : score facultatif (coups, secondes…) et message de Foxy. */
  onWin: (score?: number, msg?: string) => void
  /** Partie perdue (objectif non atteint) : on encourage. */
  onLose?: (msg: string) => void
}
