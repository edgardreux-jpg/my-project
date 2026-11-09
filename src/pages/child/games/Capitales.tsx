import { useMemo, useState } from 'react'
import { geoCentroid, geoMercator, geoPath } from 'd3-geo'
import { sfx } from '../../../lib/audio'
import { shuffle } from '../../../lib/games'
import { MH, MW, useWorld } from './worldMap'
import type { GameProps } from './types'
import type { LevelId } from '../../../types'

/** [nom world-atlas, pays avec article, « de … », capitale, en Europe ?] */
type C = [string, string, string, string, boolean]
const EU1: C[] = [
  ['France', 'la France', 'de la France', 'Paris', true], ['Spain', 'l’Espagne', 'de l’Espagne', 'Madrid', true], ['Italy', 'l’Italie', 'de l’Italie', 'Rome', true],
  ['Germany', 'l’Allemagne', 'de l’Allemagne', 'Berlin', true], ['United Kingdom', 'le Royaume-Uni', 'du Royaume-Uni', 'Londres', true], ['Belgium', 'la Belgique', 'de la Belgique', 'Bruxelles', true],
  ['Switzerland', 'la Suisse', 'de la Suisse', 'Berne', true], ['Portugal', 'le Portugal', 'du Portugal', 'Lisbonne', true],
]
const EU2: C[] = [
  ['Netherlands', 'les Pays-Bas', 'des Pays-Bas', 'Amsterdam', true], ['Greece', 'la Grèce', 'de la Grèce', 'Athènes', true], ['Ireland', 'l’Irlande', 'de l’Irlande', 'Dublin', true],
  ['Austria', 'l’Autriche', 'de l’Autriche', 'Vienne', true], ['Poland', 'la Pologne', 'de la Pologne', 'Varsovie', true], ['Denmark', 'le Danemark', 'du Danemark', 'Copenhague', true],
  ['Norway', 'la Norvège', 'de la Norvège', 'Oslo', true], ['Sweden', 'la Suède', 'de la Suède', 'Stockholm', true], ['Finland', 'la Finlande', 'de la Finlande', 'Helsinki', true],
  ['Hungary', 'la Hongrie', 'de la Hongrie', 'Budapest', true], ['Czechia', 'la Tchéquie', 'de la Tchéquie', 'Prague', true], ['Romania', 'la Roumanie', 'de la Roumanie', 'Bucarest', true],
  ['Croatia', 'la Croatie', 'de la Croatie', 'Zagreb', true],
]
const WORLD: C[] = [
  ['United States of America', 'les États-Unis', 'des États-Unis', 'Washington', false], ['Canada', 'le Canada', 'du Canada', 'Ottawa', false], ['Mexico', 'le Mexique', 'du Mexique', 'Mexico', false],
  ['Brazil', 'le Brésil', 'du Brésil', 'Brasilia', false], ['Argentina', 'l’Argentine', 'de l’Argentine', 'Buenos Aires', false], ['Peru', 'le Pérou', 'du Pérou', 'Lima', false],
  ['Chile', 'le Chili', 'du Chili', 'Santiago', false], ['China', 'la Chine', 'de la Chine', 'Pékin', false], ['Japan', 'le Japon', 'du Japon', 'Tokyo', false],
  ['India', 'l’Inde', 'de l’Inde', 'New Delhi', false], ['Russia', 'la Russie', 'de la Russie', 'Moscou', false], ['South Korea', 'la Corée du Sud', 'de la Corée du Sud', 'Séoul', false],
  ['Egypt', 'l’Égypte', 'de l’Égypte', 'Le Caire', false], ['Morocco', 'le Maroc', 'du Maroc', 'Rabat', false], ['Algeria', 'l’Algérie', 'de l’Algérie', 'Alger', false],
  ['Tunisia', 'la Tunisie', 'de la Tunisie', 'Tunis', false], ['Senegal', 'le Sénégal', 'du Sénégal', 'Dakar', false], ['Kenya', 'le Kenya', 'du Kenya', 'Nairobi', false],
  ['Australia', 'l’Australie', 'de l’Australie', 'Canberra', false], ['Turkey', 'la Turquie', 'de la Turquie', 'Ankara', false],
]
const FR6 = EU1.slice(0, 6)
/** [réserve de pays, questions dans les deux sens ?] selon la classe et la difficulté */
export function poolOf(lv: LevelId, d: number): [C[], boolean] {
  switch (`${lv}${d}`) {
    case 'ce10': return [FR6, false]
    case 'ce11': case 'ce20': return [EU1, false]
    case 'ce12': return [EU1, true]
    case 'ce21': case 'cm10': return [[...EU1, ...EU2], false]
    case 'ce22': case 'cm20': return [[...EU1, ...EU2], true]
    case 'cm11': return [[...EU2, ...WORLD], false]
    case 'cm12': return [[...EU2, ...WORLD], true]
    case 'cm21': return [WORLD, false]
    default: return [[...EU1, ...EU2, ...WORLD], true]
  }
}

type Q = { c: C; reverse: boolean; options: string[]; answer: string }
export function build(lv: LevelId, d: number): Q[] {
  const [pool, both] = poolOf(lv, d)
  return shuffle(pool).slice(0, 10).map((c, k) => {
    const reverse = both && k % 2 === 1
    const others = shuffle(pool.filter(x => x !== c)).slice(0, 3)
    const answer = reverse ? cap(c[1]) : c[3]
    return { c, reverse, answer, options: shuffle([answer, ...others.map(o => reverse ? cap(o[1]) : o[3])]) }
  })
}
const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1)

/** Pays et capitales : la carte montre le pays, on choisit la bonne réponse. */
export default function Capitales({ level, diff, sound, onWin, onLose }: GameProps) {
  const [qs] = useState(() => build(level, diff))
  const N = qs.length
  const [i, setI] = useState(0)
  const [score, setScore] = useState(0)
  const [chosen, setChosen] = useState<string | null>(null)
  const q = qs[i]
  const world = useWorld()
  // Carte centrée sur le pays, avec ses voisins autour
  const pp = useMemo(() => {
    const f = world?.find((x: any) => x.properties.name === q.c[0])
    if (!f) return null
    const fit = geoMercator().fitExtent([[MW * 0.38, MH * 0.32], [MW * 0.62, MH * 0.68]], f)
    const proj = geoMercator().center(geoCentroid(f)).scale(Math.max(220, Math.min(1400, fit.scale()))).translate([MW / 2, MH / 2])
    return { path: geoPath(proj) }
  }, [world, q])

  const choose = (o: string) => {
    if (chosen) return
    setChosen(o)
    const good = o === q.answer
    sfx(good ? 'good' : 'oops', sound)
    const s = score + (good ? 1 : 0); setScore(s)
    setTimeout(() => {
      setChosen(null)
      if (i + 1 < N) { setI(i + 1); return }
      const m = `${s} bonne${s > 1 ? 's' : ''} réponse${s > 1 ? 's' : ''} sur ${N}`
      if (s >= Math.ceil(N * 0.6)) onWin(s, `Bravo ! ${m}.`); else onLose?.(`${m}. Rejoue pour les retenir !`)
    }, good ? 900 : 1700)
  }

  return (
    <div className="lg">
      <div className="g-stats"><span>Question {i + 1}/{N}</span><span>Score : {score}</span></div>
      <p className="lg-goal" aria-live="polite">{q.reverse ? <><b>{q.c[3]}</b> est la capitale de…</> : <>Quelle est la capitale <b>{q.c[2]}</b> ?</>}</p>
      <div className="lg-mini">
        {!pp ? <p className="muted center">Chargement de la carte…</p> : (
          <svg className="gmap lg-mapfit" viewBox={`0 0 ${MW} ${MH}`} role="img" aria-label={`Carte : ${q.c[1]} est en couleur`}>
            <rect width={MW} height={MH} className="gmap-sea" />
            {world!.map((f: any) => <path key={f.id ?? f.properties.name} d={pp.path(f) ?? ''} className={`gmap-c ${f.properties.name === q.c[0] ? 'lg-here' : ''}`} />)}
          </svg>
        )}
      </div>
      <div className="lg-opts">
        {q.options.map(o => {
          const cls = !chosen ? '' : o === q.answer ? 'good' : o === chosen ? 'bad' : 'dim'
          return <button key={o} type="button" className={`lg-opt txt ${cls}`} disabled={!!chosen} onClick={() => choose(o)}>{o}</button>
        })}
      </div>
    </div>
  )
}
