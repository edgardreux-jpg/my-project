import { Link } from 'react-router-dom'
import { Check, Lock, Play, Target } from 'lucide-react'
import { useStore } from '../../../state/store'
import { COMPS, compScores, hasReperes, MASTERY, masteryOf, PHASES, phaseStarted, phaseState, programProgress, reperesOf, seqIds, buildBilan, type Phase } from '../../../lib/reperes'
import { Radar } from '../../../components/Radar'
import type { Child } from '../../../types'

/** Toile et détail par compétence : partagés entre l'enfant et le parent. */
export function ReperesWeb({ child, adult = false }: { child: Child; adult?: boolean }) {
  const comps = COMPS[child.grade] ?? []
  const done = ([0, 1, 2] as Phase[]).filter(p => Object.keys(reperesOf(child)[p] ?? {}).length > 0)
  if (!done.length) return null
  const last = done[done.length - 1]
  const scores = compScores(child, last)
  const series = done.map(p => ({ label: PHASES[p].short, color: PHASES[p].color, values: comps.map(c => compScores(child, p)[c.id]) }))
  return (
    <div className="rw">
      <div className="rw-chart">
        <Radar axes={comps.map(c => c.short)} series={series} />
        {series.length > 1 && <div className="rw-legend">{series.map(s => <span key={s.label}><i style={{ background: s.color }} />{s.label}</span>)}</div>}
      </div>
      <ul className="rw-list">
        {comps.map(c => {
          const v = scores[c.id]
          const m = v == null ? null : masteryOf(v)
          return (
            <li key={c.id} className={m ?? 'none'}>
              <div className="grow"><b>{c.label}</b>{adult && m && m !== 'ok' && <small>{c.tip}</small>}</div>
              {v == null ? <span className="rw-tag">À venir</span> : <span className={`rw-tag ${m}`}>{adult ? `${MASTERY[m!]} · ${v} %` : m === 'ok' ? 'Bien acquis' : m === 'mid' ? 'Presque' : 'À entraîner'}</span>}
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default function Reperes() {
  const { child } = useStore()
  if (!child) return null
  if (!hasReperes(child.grade)) return <div className="k-page"><h1 className="k-hi">Mon bilan</h1><p className="muted">Les bilans sont disponibles du CE1 au CM2.</p></div>
  const prog = Math.round(programProgress(child) * 100)
  const cur = (([0, 1, 2] as Phase[]).find(p => phaseState(child, p) === 'open') ?? null)
  const seqs = cur != null ? buildBilan(child, cur) : []
  const res = cur != null ? reperesOf(child)[cur] ?? {} : {}
  return (
    <div className="col gap20 k-page">
      <h1 className="k-hi">Mon bilan Repères</h1>
      <section className="rb-hero">
        <Target size={28} />
        <div><b>Comme les évaluations nationales</b><p>En {child.grade.toUpperCase()}, tous les élèves passent des évaluations « Repères ». Ici, tu t’entraînes avec le même genre d’exercices, et ta toile montre ce que tu sais déjà bien faire.</p></div>
      </section>

      <div className="rb-phases">
        {([0, 1, 2] as Phase[]).map(p => {
          const st = phaseState(child, p)
          return (
            <div key={p} className={`rb-ph ${st} ${cur === p ? 'cur' : ''}`} style={{ ['--pc' as string]: PHASES[p].color }}>
              <span className="rb-ic">{st === 'done' ? <Check size={18} strokeWidth={3} /> : st === 'locked' ? <Lock size={16} /> : p + 1}</span>
              <b>{PHASES[p].short}</b>
              <small>{st === 'done' ? 'Terminé' : st === 'open' ? (phaseStarted(child, p) ? 'En cours' : 'Disponible') : p > 0 && PHASES[p].need > 0 ? `À ${Math.round(PHASES[p].need * 100)} % du programme` : 'Bientôt'}</small>
            </div>
          )
        })}
      </div>
      <div className="rb-progress"><span>Ton avancement dans le programme de l’année</span><div className="k-xpbar"><i style={{ width: `${Math.max(3, prog)}%` }} /></div><b>{prog} %</b></div>

      {cur != null && (
        <section className="card">
          <h3>{PHASES[cur].name}</h3>
          <p className="small muted mb8">Fais les séquences dans l’ordre que tu veux, une à la fois. Prévois un moment calme, sans aide.</p>
          <div className="rb-seqs">
            {seqs.map((s, i) => {
              const d = res[s.id]
              return (
                <Link key={s.id} to={d ? '#' : `/enfant/reperes/${cur}/${s.id}`} className={`rb-seq ${s.subject} ${d ? 'done' : ''}`} onClick={e => { if (d) e.preventDefault() }} aria-disabled={!!d}>
                  <span className="rb-n">{d ? <Check size={18} strokeWidth={3} /> : i + 1}</span>
                  <span className="grow"><b>{s.title}</b><small>{s.items.length} questions · {s.minutes} min</small></span>
                  {!d && <Play size={18} />}
                </Link>
              )
            })}
          </div>
        </section>
      )}
      {cur == null && phaseState(child, 2) !== 'done' && <p className="small muted center">Le prochain bilan s’ouvrira quand tu auras avancé dans ton programme. Continue tes leçons !</p>}

      <section className="card">
        <h3>Ma toile de compétences</h3>
        {Object.keys(reperesOf(child)).length ? <ReperesWeb child={child} /> : <p className="small muted">Ta toile apparaîtra ici dès ta première séquence terminée.</p>}
      </section>
      <p className="tiny muted center">Entraînement inspiré des évaluations nationales Repères. Ce n’est pas l’évaluation officielle, qui se passe en classe.</p>
      {seqIds(child.grade).length === 0 && null}
    </div>
  )
}
