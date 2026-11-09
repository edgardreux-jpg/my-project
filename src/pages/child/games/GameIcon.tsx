import { X, Plus, Minus, Divide, Globe2, Landmark, Waves, Shapes } from 'lucide-react'

const ICONS: Record<string, typeof X> = {
  multiplication: X, addition: Plus, soustraction: Minus, division: Divide, geographie: Globe2, capitales: Landmark, mers: Waves,
}
export function GameIcon({ id, size = 30 }: { id: string; size?: number }) {
  const I = ICONS[id] ?? Shapes
  return <I size={size} strokeWidth={2.4} />
}
