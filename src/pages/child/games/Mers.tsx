import { useState } from 'react'
import { sfx } from '../../../lib/audio'
import { shuffle } from '../../../lib/games'
import { oceanAt } from './geoData'
import { centerOnce, MH, MW, useProjection, useWorld, type View } from './worldMap'
import type { GameProps } from './types'

type Sea = { id: string; name: string; at: [number, number]; view: View }
const OCEANS = ['Atlantique', 'Pacifique', 'Indien', 'Arctique', 'Austral']
const SEAS: Sea[] = [
  { id: 'medw', name: 'la mer Méditerranée', at: [18, 35], view: 'world' },
  { id: 'cara', name: 'la mer des Caraïbes', at: [-75, 15], view: 'world' },
  { id: 'rouge', name: 'la mer Rouge', at: [38, 20], view: 'world' },
  { id: 'chine', name: 'la mer de Chine', at: [114, 13], view: 'world' },
  { id: 'manche', name: 'la Manche', at: [-2.5, 50], view: 'europe' },
  { id: 'nord', name: 'la mer du Nord', at: [3.5, 56], view: 'europe' },
  { id: 'balt', name: 'la mer Baltique', at: [19, 57.5], view: 'europe' },
  { id: 'noire', name: 'la mer Noire', at: [34, 43.3], view: 'europe' },
  { id: 'mede', name: 'la mer Méditerranée', at: [8, 39], view: 'europe' },
  { id: 'atle', name: 'l’océan Atlantique', at: [-13, 46], view: 'europe' },
]
type Q = { kind: 'ocean'; answer: string; view: 'world' } | { kind: 'sea'; answer: string; view: View }
const sea = (id: string): Q => { const s = SEAS.find(x => x.id === id)!; return { kind: 'sea', answer: id, view: s.view } }
const oce = (o: string): Q => ({ kind: 'ocean', answer: o, view: 'world' })

function build(tier: number): Q[] {
  if (tier === 0) return [...shuffle(OCEANS).map(oce), sea('medw')]
  if (tier === 1) return [...shuffle(OCEANS).map(oce), ...shuffle(['manche', 'nord', 'mede']).map(sea)]
  if (tier === 2) return [...shuffle(OCEANS).slice(0, 3).map(oce), ...shuffle(['manche', 'nord', 'mede', 'noire', 'balt', 'atle']).map(sea), sea('rouge')]
  return [...shuffle(OCEANS).slice(0, 3).map(oce), ...shuffle(['manche', 'nord', 'mede', 'noire', 'balt', 'atle']).map(sea), ...shuffle(['cara', 'rouge', 'chine']).slice(0, tier >= 4 ? 3 : 1).map(sea)].slice(0, 10)
}
const label = (q: Q) => q.kind === 'ocean' ? `Touche l’océan ${q.answer}` : `Touche ${SEAS.find(s => s.id === q.answer)!.name}`

/** Mers et océans : les océans se touchent sur la carte, les mers sont repérées par des points. */
export default function Mers({ tier, sound, onWin, onLose }: GameProps) {
  const [qs] = useState(() => { const b = build(tier); return [...b.filter(q => q.view === 'world'), ...b.filter(q => q.view === 'europe')] })
  const [i, setI] = useState(0)
  const [score, setScore] = useState(0)
  const [miss, setMiss] = useState(false)
  const [flash, setFlash] = useState<{ ok: boolean; text: string } | null>(null)
  const [reveal, setReveal] = useState(false)
  const q = qs[i]
  const world = useWorld()
  const pp = useProjection(world, q.view)
  const dots = q.kind === 'sea' ? SEAS.filter(s => s.view === q.view) : []
  const hint = (text: string) => { if (flash) return; setFlash({ ok: false, text }); setTimeout(() => setFlash(null), 1000) }

  const finish = (s: number) => {
    const m = `${s} bonne${s > 1 ? 's' : ''} réponse${s > 1 ? 's' : ''} du premier coup sur ${qs.length}`
    if (s >= Math.ceil(qs.length / 2)) onWin(s, `Bravo ! ${m}.`); else onLose?.(`${m}. Rejoue pour mieux les retenir !`)
  }
  const go = (s: number) => { setFlash(null); setMiss(false); setReveal(false); if (i + 1 >= qs.length) finish(s); else setI(i + 1) }
  const answer = (got: string | null, text: string) => {
    if (reveal || flash?.ok) return
    if (got === q.answer) { sfx('good', sound); setFlash({ ok: true, text }); const s = score + (miss ? 0 : 1); setScore(s); setTimeout(() => go(s), 900) }
    else {
      sfx('oops', sound); setFlash({ ok: false, text })
      if (miss) { setReveal(true); setTimeout(() => go(score), 1800) } else { setMiss(true); setTimeout(() => setFlash(null), 900) }
    }
  }
  const onWater = (e: React.MouseEvent<SVGElement>) => {
    if (!pp) return
    const svg = (e.currentTarget as SVGElement).ownerSVGElement ?? (e.currentTarget as SVGSVGElement); const r = svg.getBoundingClientRect()
    const p = pp.proj.invert!([((e.clientX - r.left) / r.width) * MW, ((e.clientY - r.top) / r.height) * MH])
    if (!p) return
    if (q.kind === 'ocean') { const o = oceanAt(p[0], p[1]); answer(o, `Océan ${o}`) }
    else hint('Touche un des points bleus.')
  }

  return (
    <div className="lg">
      <div className="g-stats"><span>Question {i + 1}/{qs.length}</span><span>Score : {score}</span></div>
      <p className="gmap-q" role="status">{label(q)}{miss && !reveal ? <span className="tiny"> · essaie encore</span> : reveal ? <span className="tiny"> · la voici</span> : null}</p>
      <div className="gmap-wrap" ref={centerOnce}>
        {!pp ? <p className="muted center">Chargement de la carte…</p> : (
          <svg className={`gmap ${q.view === 'world' ? 'gmap-world' : ''}`} viewBox={`0 0 ${MW} ${MH}`} role="img" aria-label="Carte des mers et océans">
            <rect width={MW} height={MH} className="gmap-sea" onClick={onWater} />
            {q.view === 'world' && <path d={pp.path({ type: 'Sphere' } as any) ?? ''} className="gmap-sphere" onClick={onWater} />}
            {world!.map((f: any) => <path key={f.id ?? f.properties.name} d={pp.path(f) ?? ''} className="gmap-c lg-land" onClick={() => q.kind === 'ocean' ? answer(null, 'C’est de la terre !') : hint('Touche un des points bleus.')} />)}
            {reveal && q.kind === 'ocean' && (() => { const c = { Atlantique: [-35, 15], Pacifique: [-145, 0], Indien: [75, -20], Arctique: [10, 78], Austral: [60, -63] }[q.answer]!; const [x, y] = pp.proj(c as [number, number])!; return <circle cx={x} cy={y} r={26} className="lg-dot reveal" /> })()}
            {dots.map(s => {
              const xy = pp.proj(s.at); if (!xy) return null
              const right = s.id === q.answer
              const cls = ['lg-dot', reveal && right ? 'reveal' : '', flash?.ok && right ? 'ok' : ''].join(' ')
              return <g key={s.id}><circle cx={xy[0]} cy={xy[1]} r={22} className="lg-dot-hit" onClick={e => { e.stopPropagation(); answer(s.id, s.name) }} /><circle cx={xy[0]} cy={xy[1]} r={q.view === 'world' ? 9 : 11} className={cls} pointerEvents="none" /></g>
            })}
          </svg>
        )}
      </div>
      <p className={`lg-help ${flash ? (flash.ok ? 'good' : 'bad') : ''}`}>{flash ? flash.text : q.kind === 'ocean' ? 'Touche l’eau, pas la terre.' : 'Touche le bon point bleu.'}</p>
    </div>
  )
}
