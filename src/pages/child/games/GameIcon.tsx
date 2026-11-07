import { Grid3x3, CircleDot, LayoutGrid, Layers, Target, Copy, Route, SpellCheck, Search, Anchor, Shapes, Globe2 } from 'lucide-react'

const ICONS: Record<string, typeof Grid3x3> = {
  sudoku: Grid3x3, puissance4: CircleDot, taquin: LayoutGrid, hanoi: Layers, compte: Target, memory: Copy,
  labyrinthe: Route, motmystere: SpellCheck, motsmeles: Search, bataille: Anchor, tangram: Shapes, carte: Globe2,
}
export function GameIcon({ id, size = 30 }: { id: string; size?: number }) {
  const I = ICONS[id] ?? Shapes
  return <I size={size} strokeWidth={2.2} />
}
