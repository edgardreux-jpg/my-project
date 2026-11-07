import type { LevelId } from '../../../types'

export interface GameProps {
  level: LevelId
  sound: boolean
  name: string
  /** Partie gagnée : score facultatif (coups, secondes…) et message de Foxy. */
  onWin: (score?: number, msg?: string) => void
  /** Partie perdue (Puissance 4, Mot mystère) : on encourage. */
  onLose?: (msg: string) => void
}
