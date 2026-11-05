import type { LucideIcon } from 'lucide-react'
import {
  Award, Bike, Bird, BookOpen, Brain, Calculator, Cat, Check, Compass, Dog, Earth, Flame, Gift, HeartHandshake, Image as ImageIcon,
  Landmark, Languages, Lightbulb, Medal, Microscope, Music, Origami, Palette, Panda, PartyPopper, Play, Rabbit, Repeat, ShieldCheck,
  Sparkles, Sprout, Squirrel, Star, Sun, Target, ThumbsUp, Turtle, Type, Users,
} from 'lucide-react'

type Def = { I: LucideIcon; color?: string; fill?: boolean }

/**
 * Les données (profils, matières, badges) gardent un identifiant court hérité des emojis.
 * L'affichage passe toujours par ces icônes vectorielles, plus sobres et cohérentes.
 */
const MAP: Record<string, Def> = {
  // Avatars
  '🐰': { I: Rabbit, color: '#C2547A' }, '🐱': { I: Cat, color: '#C77F1F' }, '🐶': { I: Dog, color: '#9A6428' }, '🐦': { I: Bird, color: '#3A76CE' },
  '🦊': { I: Squirrel, color: '#D2582F' }, '🐼': { I: Panda, color: '#334155' }, '🦁': { I: Turtle, color: '#17766E' }, '🦄': { I: Origami, color: '#7C5AC7' },
  // Matières
  '📚': { I: BookOpen }, '🔢': { I: Calculator }, '🌍': { I: Earth }, '🔬': { I: Microscope }, '🏛️': { I: Landmark }, '🧭': { I: Compass },
  '🗣️': { I: Languages }, '🤝': { I: HeartHandshake }, '🎨': { I: Palette }, '🎵': { I: Music }, '👟': { I: Bike }, '🌱': { I: Sprout },
  // Jeu et récompenses
  '⭐': { I: Star, color: '#E8A317', fill: true }, '★': { I: Star, fill: true }, '🔥': { I: Flame, color: '#E2662B' }, '✨': { I: Sparkles, color: '#C99A10' },
  '🎁': { I: Gift, color: '#B2428A' }, '🖼️': { I: ImageIcon }, '🎉': { I: PartyPopper, color: '#B2428A' }, '🎯': { I: Target, color: '#D2582F' },
  '☀️': { I: Sun, color: '#E8A317' }, '🏅': { I: Medal, color: '#C99A10' }, '🧠': { I: Brain, color: '#7C5AC7' }, '💡': { I: Lightbulb, color: '#C99A10' },
  '🔁': { I: Repeat }, '🔤': { I: Type }, '🛡️': { I: ShieldCheck }, '👍': { I: ThumbsUp }, '👧': { I: Users }, '👨‍👩‍👧': { I: Users },
  '▶': { I: Play, fill: true }, '✓': { I: Check }, '🏆': { I: Award },
}

export const AVATAR_LABEL: Record<string, string> = {
  '🐰': 'Lapin', '🐱': 'Chat', '🐶': 'Chien', '🐦': 'Oiseau', '🦊': 'Écureuil', '🐼': 'Panda', '🦁': 'Tortue', '🦄': 'Oiseau de papier',
}

export function avatarColor(e: string): string { return MAP[e]?.color ?? '#17766E' }

export function Ico({ e, size = '1em', color, className, label }: { e: string; size?: number | string; color?: string; className?: string; label?: string }) {
  const d = MAP[e]
  if (!d) return <Sparkles size={size} aria-hidden="true" className={className} />
  const c = color ?? d.color ?? 'currentColor'
  return (
    <d.I size={size} color={c} fill={d.fill ? c : 'none'} strokeWidth={2.2} className={`ico ${className ?? ''}`}
      aria-hidden={label ? undefined : true} aria-label={label} role={label ? 'img' : undefined} />
  )
}

/** Rangée d'étoiles vectorielles (pleines ou vides). */
export function Stars({ n, of = 3, size = '1em' }: { n: number; of?: number; size?: number | string }) {
  return (
    <span className="starrow" role="img" aria-label={`${n} étoile${n > 1 ? 's' : ''} sur ${of}`}>
      {Array.from({ length: of }, (_, i) => (
        <Star key={i} size={size} strokeWidth={2.2} color={i < n ? '#E8A317' : '#CFC8B6'} fill={i < n ? '#E8A317' : 'none'} aria-hidden="true" />
      ))}
    </span>
  )
}
