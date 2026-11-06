import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { Flame, Star, Gift, Sprout, Leaf, Compass, Map as MapIcon, Gem, Crown, Lock, ChevronRight } from 'lucide-react'
import type { Child } from '../../types'
import { SUBJECT_META, lessonsOf } from '../../lib/curriculum'
import { levelOf, liveStreak, masteryOf, readyChests, totalStars } from '../../lib/progress'
import { Avatar } from '../../components/common'
import { Ico } from '../../components/Icon'

/** Coffre dessiné en vectoriel : fermé gris, prêt (doré, il brille) ou ouvert. */
export function ChestArt({ state, size = 84 }: { state: 'locked' | 'ready' | 'open'; size?: number }) {
  const wood = state === 'locked' ? '#C9CED6' : '#C77F1F', woodD = state === 'locked' ? '#AEB4BE' : '#955B10'
  const gold = state === 'locked' ? '#E3E6EA' : '#F5C65D', goldD = state === 'locked' ? '#C9CED6' : '#D9A23A'
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" aria-hidden="true" className={`chest-art ${state}`}>
      {state === 'ready' && <circle cx="50" cy="56" r="46" fill="url(#cglow)" />}
      <defs><radialGradient id="cglow"><stop offset="0" stopColor="#FFE9A8" /><stop offset="1" stopColor="#FFE9A8" stopOpacity="0" /></radialGradient></defs>
      {state === 'open' && <g><path d="M50 18 L54 36 L50 34 L46 36 Z" fill="#F5C65D" /><path d="M28 26 L40 40 L36 41 Z" fill="#F5C65D" opacity=".8" /><path d="M72 26 L60 40 L64 41 Z" fill="#F5C65D" opacity=".8" /></g>}
      <rect x="14" y="50" width="72" height="38" rx="8" fill={wood} />
      <rect x="14" y="50" width="72" height="8" fill={woodD} opacity=".5" />
      <rect x="22" y="50" width="8" height="38" fill={gold} /><rect x="70" y="50" width="8" height="38" fill={gold} />
      <g transform={state === 'open' ? 'rotate(-28 14 48)' : ''}>
        <path d="M14 50 V40 a16 16 0 0 1 16 -16 h40 a16 16 0 0 1 16 16 V50 Z" fill={wood} />
        <path d="M22 50 V30 h8 V50 Z M70 50 V30 h8 V50 Z" fill={gold} />
        <rect x="14" y="46" width="72" height="6" rx="2" fill={goldD} />
      </g>
      <rect x="42" y="52" width="16" height="18" rx="4" fill={gold} stroke={goldD} strokeWidth="2" />
      <circle cx="50" cy="60" r="2.6" fill={woodD} />
    </svg>
  )
}

/** Anneau de progression. */
export function Ring({ pct, size = 64, stroke = 8, color = '#fff', track = 'rgba(255,255,255,.3)', children }: { pct: number; size?: number; stroke?: number; color?: string; track?: string; children?: ReactNode }) {
  const r = (size - stroke) / 2, c = 2 * Math.PI * r
  return (
    <span className="k-ring" style={{ width: size, height: size }}>
      <svg width={size} height={size}><circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={track} strokeWidth={stroke} />
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color} strokeWidth={stroke} strokeLinecap="round" strokeDasharray={c} strokeDashoffset={c * (1 - Math.max(0, Math.min(1, pct)))} transform={`rotate(-90 ${size / 2} ${size / 2})`} /></svg>
      <span className="k-ring-in">{children}</span>
    </span>
  )
}

export const LEVEL_ICONS = [Sprout, Leaf, Compass, MapIcon, Gem, Crown]

/** Barre du haut : série, étoiles, niveau, coffres prêts. */
export function Hud({ child }: { child: Child }) {
  const streak = liveStreak(child), lv = levelOf(child.xp), chests = readyChests(child).length
  const LI = LEVEL_ICONS[lv.index] ?? Crown
  return (
    <div className="k-hud">
      <Link to="/enfant/moi" className="k-hud-me" aria-label="Mon profil"><Avatar emoji={child.avatar} frame={child.frame} size={44} /></Link>
      <span className={`k-chip fire ${streak > 0 ? 'lit' : ''}`} title="Jours de suite"><Flame size={20} strokeWidth={2.6} /> {streak}</span>
      <span className="k-chip star" title="Étoiles"><Star size={19} strokeWidth={2.6} /> {totalStars(child)}</span>
      <span className="k-chip lvl" title={`Niveau ${lv.name}`}><LI size={19} strokeWidth={2.4} /><span className="k-mini"><i style={{ width: `${lv.pct}%` }} /></span></span>
      <span className="grow" />
      {chests > 0 && <Link to="/enfant/recompenses" className="k-chip gift" aria-label={`${chests} coffre${chests > 1 ? 's' : ''} à ouvrir`}><Gift size={20} strokeWidth={2.6} /> {chests}</Link>}
    </div>
  )
}

/** Tuile de matière colorée, avec progression et étoiles. */
export function SubjectTile({ child, sid, next }: { child: Child; sid: string; next?: string | null }) {
  const m = SUBJECT_META[sid]
  const ls = lessonsOf(child.grade, sid)
  const done = ls.filter(l => masteryOf(child.lessons[l.id]) !== 'none').length
  const stars = ls.reduce((n, l) => n + (child.lessons[l.id]?.best ?? 0), 0)
  const soon = ls.length === 0
  const pct = ls.length ? done / ls.length : 0
  return (
    <Link to={soon ? '#' : `/enfant/matiere/${sid}`} className={`k-subj ${soon ? 'soon' : ''}`} style={{ ['--c' as string]: m.color, ['--cd' as string]: m.dark }} onClick={e => { if (soon) e.preventDefault() }} aria-disabled={soon}>
      <span className="k-subj-ic"><Ico e={m.emoji} color="#fff" size={30} /></span>
      {!soon && done === 0 && <span className="k-new">Nouveau</span>}
      {soon && <span className="k-new soon"><Lock size={12} /> Bientôt</span>}
      <b className="k-subj-name">{m.name}</b>
      {next ? <span className="k-subj-next"><ChevronRight size={14} /> {next}</span> : <span className="k-subj-blurb">{m.blurb}</span>}
      {!soon && <>
        <span className="k-subj-bar"><i style={{ width: `${Math.max(pct * 100, 3)}%` }} /></span>
        <span className="k-subj-meta"><span>{done} / {ls.length}</span><span><Star size={13} strokeWidth={2.8} /> {stars}</span></span>
      </>}
    </Link>
  )
}
