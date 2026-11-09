import { useEffect, useMemo, useState } from 'react'
import { geoNaturalEarth1, geoMercator, geoPath, type GeoProjection } from 'd3-geo'
import { feature } from 'topojson-client'
import { sfx } from '../../../lib/audio'
import { shuffle } from '../../../lib/games'
import { CONTINENT_OF, CONTINENTS, EUROPE_Q, FR, WORLD_Q } from './geoData'
import type { GameProps } from './types'

type Q = { kind: 'continent' | 'ocean' | 'country'; answer: string; label: string }
const Wd = 960, Hd = 500

const BIG = ['France', 'United States of America', 'Brazil', 'Russia', 'China', 'Australia', 'India', 'Canada']
const EU_EASY = ['France', 'Spain', 'Italy', 'Germany', 'Belgium', 'Switzerland', 'United Kingdom', 'Portugal', 'Netherlands', 'Ireland']
const contQ = () => shuffle(CONTINENTS.filter(c => c !== 'Antarctique')).map(c => ({ kind: 'continent' as const, answer: c, label: `Touche l’${c}` }))
const countryQ = (pool: string[], n: number) => shuffle(pool).slice(0, n).map(c => ({ kind: 'country' as const, answer: c, label: `Où se trouve ${FR[c]} ?` }))

function questions(tier: number): Q[] {
  if (tier === 0) return contQ()
  if (tier === 1) return shuffle([...contQ(), ...countryQ(BIG, 4)])
  if (tier === 2) return countryQ(EU_EASY, 8)
  if (tier === 3) return countryQ(EUROPE_Q, 10)
  return countryQ(tier === 4 ? WORLD_Q.slice(0, 20) : WORLD_Q, 10)
}

export default function Geographie({ tier, sound, onWin, onLose }: GameProps) {
  const finish = (s: number) => { const m = `${s} bonne${s > 1 ? 's' : ''} réponse${s > 1 ? 's' : ''} du premier coup sur ${qs.length}.`; if (s >= Math.ceil(qs.length / 2)) onWin(s, `Bravo ! ${m}`); else onLose?.(`${m} Rejoue pour mieux retenir la carte !`) }
  const [world, setWorld] = useState<any[] | null>(null)
  const [qs] = useState(() => questions(tier))
  const [i, setI] = useState(0)
  const [score, setScore] = useState(0)
  const [miss, setMiss] = useState(false)
  const [flash, setFlash] = useState<{ name: string; ok: boolean } | null>(null)
  const [reveal, setReveal] = useState(false)
  const europe = tier === 2 || tier === 3

  useEffect(() => { import('world-atlas/countries-110m.json').then(t => setWorld((feature(t.default as any, (t.default as any).objects.countries) as any).features)) }, [])

  const proj: GeoProjection | null = useMemo(() => {
    if (!world) return null
    if (europe) return geoMercator().center([12, 53]).scale(620).translate([Wd / 2, Hd / 2])
    return geoNaturalEarth1().fitExtent([[6, 6], [Wd - 6, Hd - 6]], { type: 'Sphere' } as any)
  }, [world, europe])
  const path = proj ? geoPath(proj) : null
  const q = qs[i]

  const isRight = (name: string | null, ocean: string | null) =>
    q.kind === 'country' ? name === q.answer : q.kind === 'continent' ? !!name && (CONTINENT_OF[name] ?? []).includes(q.answer) : ocean === q.answer

  const answer = (name: string | null, ocean: string | null) => {
    if (reveal || i >= qs.length) return
    if (isRight(name, ocean)) {
      sfx('good', sound); setFlash({ name: name ?? ocean ?? '', ok: true })
      const s = score + (miss ? 0 : 1); setScore(s)
      setTimeout(() => { setFlash(null); setMiss(false); setReveal(false); if (i + 1 >= qs.length) finish(s); else setI(i + 1) }, 900)
    } else {
      sfx('oops', sound); setFlash({ name: name ?? ocean ?? '', ok: false })
      if (miss) { setReveal(true); setTimeout(() => { setReveal(false); setFlash(null); setMiss(false); if (i + 1 >= qs.length) finish(score); else setI(i + 1) }, 1800) }
      else { setMiss(true); setTimeout(() => setFlash(null), 700) }
    }
  }
  const onSea = () => answer(null, null)

  const hl = (name: string) => {
    if (reveal) return q.kind === 'country' ? name === q.answer : q.kind === 'continent' && (CONTINENT_OF[name] ?? []).includes(q.answer)
    return false
  }
  const contOf = (n: string) => (q.kind === 'continent' && flash?.ok === false && flash.name === n) || (q.kind === 'continent' && flash?.ok && (CONTINENT_OF[n] ?? []).includes(q.answer))

  return (
    <div className="g-map">
      <div className="g-stats"><span>Question {Math.min(i + 1, qs.length)}/{qs.length}</span><span>Score : {score}</span></div>
      <p className="gmap-q" role="status">{q?.label}{miss && !reveal ? <span className="tiny"> · essaie encore</span> : reveal ? <span className="tiny"> · la voici</span> : null}</p>
      {!path ? <p className="muted center">Chargement de la carte…</p> : (
        <div className="gmap-wrap" ref={el => { if (el && !el.dataset.c) { el.dataset.c = '1'; el.scrollLeft = (el.scrollWidth - el.clientWidth) / 2 } }}>
        <svg className={`gmap ${europe ? '' : 'gmap-world'}`} viewBox={`0 0 ${Wd} ${Hd}`} role="img" aria-label="Carte du monde">
          <rect width={Wd} height={Hd} className="gmap-sea" onClick={onSea} />
          {!europe && <path d={path({ type: 'Sphere' } as any) ?? ''} className="gmap-sphere" onClick={onSea} />}
          {world!.map((f: any) => {
            const n = f.properties.name
            const cls = ['gmap-c', flash && flash.name === n ? (flash.ok ? 'ok' : 'ko') : '', hl(n) ? 'reveal' : '', contOf(n) ? (flash?.ok ? 'ok' : 'ko') : ''].join(' ')
            return <path key={f.id ?? n} d={path(f) ?? ''} className={cls} onClick={e => { e.stopPropagation(); answer(n, null) }} />
          })}
        </svg>
        </div>
      )}
    </div>
  )
}
