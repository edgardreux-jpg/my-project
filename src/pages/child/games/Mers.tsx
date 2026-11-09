import { useMemo, useState } from 'react'
import { geoMercator, geoNaturalEarth1, geoPath } from 'd3-geo'
import { Gem, Lightbulb } from 'lucide-react'
import { sfx } from '../../../lib/audio'
import { pick, shuffle } from '../../../lib/games'
import { oceanAt } from './geoData'
import { useCentered, useWorld } from './worldMap'
import type { GameProps } from './types'
import type { LevelId } from '../../../types'

type View = 'world' | 'europe' | 'france'
/** Taille de chaque carte : les cartes régionales sont plus hautes, donc plus grandes sur téléphone. */
const SIZE: Record<View, [number, number]> = { world: [960, 500], europe: [800, 680], france: [800, 680] }

type Item = { id: string; name: string; view: View; at?: [number, number]; ocean?: string; hint: string }
const ITEMS: Item[] = [
  { id: 'o-atl', name: 'l’océan Atlantique', view: 'world', ocean: 'Atlantique', hint: 'Il est entre l’Amérique d’un côté, l’Europe et l’Afrique de l’autre.' },
  { id: 'o-pac', name: 'l’océan Pacifique', view: 'world', ocean: 'Pacifique', hint: 'C’est le plus grand : entre l’Amérique et l’Asie.' },
  { id: 'o-ind', name: 'l’océan Indien', view: 'world', ocean: 'Indien', hint: 'Il est au sud de l’Asie, entre l’Afrique et l’Australie.' },
  { id: 'o-arc', name: 'l’océan Arctique', view: 'world', ocean: 'Arctique', hint: 'Tout en haut de la carte, autour du pôle Nord.' },
  { id: 'o-aus', name: 'l’océan Austral', view: 'world', ocean: 'Austral', hint: 'Tout en bas de la carte, autour de l’Antarctique.' },
  { id: 'w-med', name: 'la mer Méditerranée', view: 'world', at: [18, 35], hint: 'Entre l’Europe et l’Afrique.' },
  { id: 'w-car', name: 'la mer des Caraïbes', view: 'world', at: [-75, 15], hint: 'Entre l’Amérique du Nord et l’Amérique du Sud.' },
  { id: 'w-rou', name: 'la mer Rouge', view: 'world', at: [38, 20], hint: 'Une mer longue et étroite entre l’Afrique et l’Asie.' },
  { id: 'w-chi', name: 'la mer de Chine', view: 'world', at: [114, 13], hint: 'Au sud-est de l’Asie, près de la Chine.' },
  { id: 'f-man', name: 'la Manche', view: 'france', at: [-2.6, 49.9], hint: 'Entre la France et le Royaume-Uni.' },
  { id: 'f-nor', name: 'la mer du Nord', view: 'france', at: [3.2, 54.6], hint: 'Au nord de la France, à l’est du Royaume-Uni.' },
  { id: 'f-med', name: 'la mer Méditerranée', view: 'france', at: [5, 41.8], hint: 'Au sud de la France, là où se trouvent Marseille et Nice.' },
  { id: 'f-atl', name: 'l’océan Atlantique', view: 'france', at: [-6.5, 45.5], hint: 'À l’ouest de la France, là où se trouve Bordeaux.' },
  { id: 'e-nor', name: 'la mer du Nord', view: 'europe', at: [3.5, 56], hint: 'Entre le Royaume-Uni et la Norvège.' },
  { id: 'e-bal', name: 'la mer Baltique', view: 'europe', at: [19.5, 56.5], hint: 'Entre la Suède et la Pologne.' },
  { id: 'e-noi', name: 'la mer Noire', view: 'europe', at: [34, 43.3], hint: 'À l’est de l’Europe, au nord de la Turquie.' },
  { id: 'e-med', name: 'la mer Méditerranée', view: 'europe', at: [17, 35.5], hint: 'Au sud de l’Europe, au nord de l’Afrique.' },
  { id: 'e-atl', name: 'l’océan Atlantique', view: 'europe', at: [-14, 47], hint: 'À l’ouest de l’Europe.' },
]
const OCEAN_LABEL: Record<string, [number, number]> = { Atlantique: [-38, 22], Pacifique: [-140, 5], Indien: [78, -22], Arctique: [10, 80], Austral: [100, -56] }
const LANDS: Record<View, [string, [number, number]][]> = {
  world: [['Amérique du Nord', [-102, 46]], ['Amérique du Sud', [-60, -12]], ['Europe', [18, 53]], ['Afrique', [20, 4]], ['Asie', [92, 46]], ['Océanie', [134, -25]], ['Antarctique', [40, -80]]],
  europe: [['France', [2.5, 46.6]], ['Espagne', [-3.7, 40]], ['Royaume-Uni', [-1.8, 52.8]], ['Italie', [12.8, 42.6]], ['Allemagne', [10.2, 51]], ['Suède', [15.5, 62.5]], ['Pologne', [19.5, 52]], ['Turquie', [33, 39]], ['Afrique', [15, 30]]],
  france: [['France', [2.3, 46.8]], ['Espagne', [-3.5, 41]], ['Royaume-Uni', [-1.6, 52.6]], ['Italie', [11.5, 44.5]], ['Allemagne', [10, 51]]],
}

const it = (id: string) => ITEMS.find(x => x.id === id)!
const O3 = ['o-atl', 'o-pac', 'o-ind'], O5 = ['o-atl', 'o-pac', 'o-ind', 'o-arc', 'o-aus']
const F4 = ['f-man', 'f-nor', 'f-med', 'f-atl'], E5 = ['e-nor', 'e-bal', 'e-noi', 'e-med', 'e-atl'], W4 = ['w-med', 'w-car', 'w-rou', 'w-chi']
const some = (a: string[], n: number) => shuffle(a).slice(0, n)

export function build(lv: LevelId, d: number): Item[] {
  let ids: string[]
  switch (`${lv}${d}`) {
    case 'ce10': ids = [...O3, ...O3]; break
    case 'ce11': case 'ce20': ids = [...O5, pick(O3)]; break
    case 'ce12': ids = [...O5, 'w-med']; break
    case 'ce21': ids = [...O5, 'f-man', 'f-nor', 'f-med']; break
    case 'ce22': ids = [...some(O5, 3), ...F4]; break
    case 'cm10': ids = [...some(O5, 2), ...F4]; break
    case 'cm11': ids = [...some(O5, 2), 'f-man', ...E5]; break
    case 'cm12': ids = [...O5, ...E5]; break
    case 'cm20': ids = [...some(O5, 1), 'f-man', 'f-nor', ...E5]; break
    case 'cm21': ids = [...some(O5, 3), ...W4, 'e-noi', 'e-bal']; break
    default: ids = [...some(O5, 3), ...W4, ...some(['e-nor', 'e-bal', 'e-noi'], 3)]
  }
  // Questions regroupées par carte : le monde, puis l'Europe, puis la France
  const order: View[] = ['world', 'europe', 'france']
  return order.flatMap(v => shuffle(ids.map(it).filter(x => x.view === v)))
}

type Mode = 'name' | 'find'
/** Selon la classe et la difficulté : « Où est mon bateau ? » (on choisit un nom) ou « Emmène le bateau » (on touche la carte). */
function modeOf(lv: LevelId, d: number, k: number): [Mode, number] {
  switch (`${lv}${d}`) {
    case 'ce10': return ['name', 2]
    case 'ce11': case 'ce20': return ['name', 3]
    case 'ce12': case 'ce21': case 'cm10': return [k % 2 ? 'find' : 'name', 3]
    case 'ce22': case 'cm11': case 'cm20': return [k % 3 ? 'find' : 'name', 3]
    default: return ['find', 3]
  }
}
const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1)
const spot = (x: Item): [number, number] => x.at ?? OCEAN_LABEL[x.ocean!]

type Q = Item & { mode: Mode; options: string[] }
export function game(lv: LevelId, d: number): Q[] {
  const items = build(lv, d)
  const round = new Set(items.map(x => x.id))
  return items.map((x, k) => {
    const [mode, n] = modeOf(lv, d, k)
    const same = ITEMS.filter(y => y.view === x.view && y.name !== x.name)
    const pref = shuffle(same.filter(y => round.has(y.id))), rest = shuffle(same.filter(y => !round.has(y.id)))
    const others = [...new Set([...pref, ...rest].map(y => y.name))].slice(0, n - 1)
    return { ...x, mode, options: shuffle([x.name, ...others]) }
  })
}

/** Le petit bateau (dessiné en SVG), qui flotte et navigue d'un point à l'autre. */
function Boat({ x, y, s }: { x: number; y: number; s: number }) {
  return (
    <g className="lg-boat" style={{ transform: `translate(${x}px, ${y}px)` }} pointerEvents="none">
      <g style={{ transform: `scale(${s})` }}>
        <g className="lg-bob">
          <ellipse cx="0" cy="16" rx="24" ry="4" className="lg-wake" />
          <path d="M-22 2 L22 2 L14 14 L-14 14 Z" fill="#C2532B" stroke="#7A2E14" strokeWidth="1.5" />
          <path d="M0 2 V-28" stroke="#5B3A1E" strokeWidth="2.5" />
          <path d="M2 -26 L20 0 L2 0 Z" fill="#fff" stroke="#D8CDB8" strokeWidth="1" />
          <path d="M-2 -20 L-15 0 L-2 0 Z" fill="#FFD66B" stroke="#E0B54A" strokeWidth="1" />
          <path d="M0 -28 L10 -25 L0 -22 Z" fill="#E5484D" />
        </g>
      </g>
    </g>
  )
}

/** Mers et océans : une aventure en bateau. */
export default function Mers({ level, diff, sound, onWin, onLose }: GameProps) {
  const [qs] = useState(() => game(level, diff))
  const [i, setI] = useState(0)
  const [score, setScore] = useState(0)
  const [tries, setTries] = useState(0)
  const [hint, setHint] = useState(false)
  const [flash, setFlash] = useState<{ ok: boolean; text: string } | null>(null)
  const [reveal, setReveal] = useState(false)
  const [found, setFound] = useState<string[]>([])
  const [picked, setPicked] = useState<string[]>([])
  const q = qs[i]
  const world = useWorld()
  const [W, H] = SIZE[q.view]
  const fit = q.view !== 'world' || q.mode === 'name'

  const pp = useMemo(() => {
    if (!world) return null
    const proj = q.view === 'world' ? geoNaturalEarth1().fitExtent([[6, 6], [W - 6, H - 6]], { type: 'Sphere' } as any)
      : q.view === 'europe' ? geoMercator().center([12, 50]).scale(640).translate([W / 2, H / 2])
      : geoMercator().center([2, 48]).scale(1500).translate([W / 2, H / 2])
    return { proj, path: geoPath(proj) }
  }, [world, q.view, W, H])
  const mapRef = useCentered(!!pp, q.view + q.mode)
  // Position du bateau : sur la réponse (« Où est mon bateau ? ») ou là où l'enfant l'envoie
  const [boatAt, setBoatAt] = useState<[number, number] | null>(null)
  const home: [number, number] = q.view === 'world' ? [-30, 0] : q.view === 'europe' ? [-8, 52] : [-6, 48.5]
  const boat = q.mode === 'name' ? spot(q) : boatAt ?? home
  const bxy = pp?.proj(boat)
  const boatScale = q.view === 'world' ? (fit ? 1.9 : 1.4) : 1.6

  const dots = q.mode === 'find' && !q.ocean ? ITEMS.filter(x => x.view === q.view && x.at) : []
  const finish = (s: number) => {
    const m = `${s} trésor${s > 1 ? 's' : ''} récolté${s > 1 ? 's' : ''} sur ${qs.length}`
    if (s >= Math.ceil(qs.length / 2)) onWin(s, `Bravo moussaillon ! ${m}.`); else onLose?.(`${m}. Rejoue avec les indices, le bateau t’attend !`)
  }
  const next = (s: number) => {
    setFlash(null); setTries(0); setHint(false); setReveal(false); setPicked([])
    if (i + 1 >= qs.length) finish(s)
    else { if (qs[i + 1].view !== q.view) setBoatAt(null); setI(i + 1) }
  }
  const good = () => {
    sfx('good', sound)
    const s = score + (tries === 0 ? 1 : 0); setScore(s)
    setFound(f => [...f, q.id]); setFlash({ ok: true, text: tries === 0 ? `Oui, c’est ${q.name} ! Un trésor pour toi.` : `Oui, c’est ${q.name} !` })
    setTimeout(() => next(s), 1500)
  }
  const bad = (text: string) => {
    sfx('oops', sound)
    const t = tries + 1; setTries(t); setHint(true)
    if (t >= 2) { setReveal(true); setFlash({ ok: false, text: `${text} La bonne réponse est en orange.` }); setTimeout(() => { setFound(f => [...f, q.id]); next(score) }, 2400) }
    else setFlash({ ok: false, text: `${text} Lis l’indice et réessaie.` })
  }
  const busy = reveal || !!flash?.ok
  const nudge = (text: string) => { if (busy) return; setFlash({ ok: false, text }) }

  const choose = (name: string) => {
    if (busy || picked.includes(name)) return
    setPicked(p => [...p, name])
    if (name === q.name) good(); else bad('Ce n’est pas ça.')
  }
  const onWater = (e: React.MouseEvent<SVGElement>) => {
    if (!pp || busy || q.mode === 'name') return
    if (!q.ocean) { nudge('Touche un des points bleus.'); return }
    const svg = (e.currentTarget as SVGElement).ownerSVGElement ?? (e.currentTarget as SVGSVGElement); const r = svg.getBoundingClientRect()
    const p = pp.proj.invert!([((e.clientX - r.left) / r.width) * W, ((e.clientY - r.top) / r.height) * H])
    if (!p) return
    setBoatAt([p[0], p[1]])
    const o = oceanAt(p[0], p[1])
    if (o === q.ocean) good(); else bad(o ? `Ton bateau est dans l’océan ${o}.` : 'Pas tout à fait.')
  }
  const onLand = () => { if (busy || q.mode === 'name') return; if (q.ocean) nudge('Un bateau ne va pas sur la terre ! Touche l’eau.'); else nudge('Touche un des points bleus.') }
  const onDot = (x: Item) => { if (busy) return; setBoatAt(x.at!); if (x.id === q.id) good(); else bad(`Ton bateau est sur ${x.name}.`) }

  const label = (xy: [number, number] | null | undefined, text: string, cls: string, k: string) => xy && (
    <text key={k} x={xy[0]} y={xy[1]} className={cls} textAnchor="middle" dominantBaseline="middle" pointerEvents="none">{text}</text>
  )
  const shownNames = ITEMS.filter(x => x.view === q.view && found.includes(x.id) && x.id !== q.id && x.at)

  return (
    <div className="lg">
      <div className="g-stats">
        <span>Étape {i + 1}/{qs.length}</span>
        <span className="lg-gems" aria-label={`${score} trésor${score > 1 ? 's' : ''}`}><Gem size={18} /> {score}</span>
      </div>
      <p className="gmap-q" role="status">{q.mode === 'name' ? 'Où est mon bateau ?' : `Emmène le bateau jusqu’à ${q.name}`}</p>
      <div className={`gmap-wrap lg-sea-${q.view} ${fit ? 'lg-sea-fit' : ''}`} ref={mapRef} key={q.view + (fit ? 'f' : '')}>
        {!pp ? <p className="muted center">Chargement de la carte…</p> : (
          <svg className={`gmap ${fit ? 'lg-mapfit' : 'gmap-world'}`} viewBox={`0 0 ${W} ${H}`} role="img" aria-label={q.view === 'world' ? 'Carte du monde' : q.view === 'europe' ? 'Carte de l’Europe' : 'Carte de la France et de ses mers'}>
            <rect width={W} height={H} className="gmap-sea" onClick={onWater} />
            {q.view === 'world' && <path d={pp.path({ type: 'Sphere' } as any) ?? ''} className="gmap-sphere" onClick={onWater} />}
            {world!.map((f: any) => <path key={f.id ?? f.properties.name} d={pp.path(f) ?? ''} className={`gmap-c lg-land ${q.view !== 'world' && f.properties.name === 'France' ? 'lg-fr' : ''}`} onClick={onLand} />)}
            {LANDS[q.view].map(([n, at]) => label(pp.proj(at), n, `lg-lbl lg-lbl-${q.view}`, n))}
            {q.view === 'world' && found.filter(id => it(id).ocean && id !== q.id).map(id => label(pp.proj(OCEAN_LABEL[it(id).ocean!]), `Océan ${it(id).ocean}`, 'lg-lbl sea', id))}
            {reveal && q.mode === 'find' && (() => { const xy = pp.proj(spot(q))!; return <circle cx={xy[0]} cy={xy[1]} r={q.ocean ? 40 : 22} className="lg-dot reveal" pointerEvents="none" /> })()}
            {dots.map(x => {
              const xy = pp.proj(x.at!); if (!xy) return null
              const isQ = x.id === q.id
              const cls = ['lg-dot', reveal && isQ ? 'reveal' : '', found.includes(x.id) && !isQ ? 'done' : ''].join(' ')
              return <g key={x.id}><circle cx={xy[0]} cy={xy[1]} r={40} className="lg-dot-hit" onClick={e => { e.stopPropagation(); onDot(x) }} /><circle cx={xy[0]} cy={xy[1]} r={q.view === 'world' ? 12 : 16} className={cls} pointerEvents="none" /></g>
            })}
            {shownNames.map(x => label(pp.proj([x.at![0], x.at![1] - (q.view === 'france' ? 0.9 : q.view === 'europe' ? 1.8 : 6)]), x.name.replace(/^(la |l’)/, ''), 'lg-lbl sea', 'n' + x.id))}
            {q.mode === 'name' && bxy && <circle cx={bxy[0]} cy={bxy[1]} r={q.view === 'world' ? 46 : 40} className="lg-ring" pointerEvents="none" />}
            {bxy && <Boat x={bxy[0]} y={bxy[1]} s={boatScale} />}
          </svg>
        )}
      </div>
      {q.mode === 'name' && (
        <div className={`lg-opts ${q.options.length === 2 ? '' : 'lg-opts3'}`}>
          {q.options.map(o => {
            const cls = o === q.name && (flash?.ok || reveal) ? 'good' : picked.includes(o) ? 'bad' : busy ? 'dim' : ''
            return <button key={o} type="button" className={`lg-opt txt ${cls}`} disabled={busy || picked.includes(o)} onClick={() => choose(o)}>{cap(o)}</button>
          })}
        </div>
      )}
      <div className="lg-hintrow">
        {hint ? <p className="lg-hint"><Lightbulb size={18} /> {q.hint}</p>
          : <button type="button" className="btn quiet sm" onClick={() => setHint(true)}><Lightbulb size={16} /> Indice</button>}
      </div>
      <p className={`lg-help ${flash ? (flash.ok ? 'good' : 'bad') : ''}`} aria-live="polite">{flash ? flash.text : q.mode === 'name' ? 'Regarde où flotte le bateau et choisis le bon nom.' : q.ocean ? 'Touche l’eau : ton bateau ira où tu touches.' : 'Touche le bon point bleu.'}</p>
    </div>
  )
}
