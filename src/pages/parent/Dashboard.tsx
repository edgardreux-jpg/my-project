import { useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Plus, Play, Flame, Clock, Target, BookOpenCheck, TrendingUp, AlertCircle, Info, ArrowUp, ArrowDown } from 'lucide-react'
import { useStore } from '../../state/store'
import { Avatar, BarChart, Empty, LineChart, Modal } from '../../components/common'
import { dayKey, addDays, fmtMin, fmtShort, diffDays, relDay } from '../../lib/dates'
import { liveStreak, levelOf, periodTotals, weakSpots, weeksSeries, mastersTotals } from '../../lib/progress'
import { BASE_AVATARS } from '../../lib/progress'
import { meta } from '../../lib/curriculum'
import type { Child, LevelId } from '../../types'

const COLORS = ['#17766E', '#F28D62', '#7751A8', '#3A76CE']

/** Écart de réussite avec la semaine précédente, en points, avec flèche et texte (jamais la couleur seule). */
function Trend({ now, before }: { now: number | null; before: number | null }) {
  if (now == null) return <span>pas encore de séance</span>
  if (before == null) return <span>première semaine</span>
  const d = Math.round((now - before) * 100)
  if (d === 0) return <span>stable vs sem. passée</span>
  return <span className={d > 0 ? 'up' : 'down'}>{d > 0 ? <ArrowUp size={13} /> : <ArrowDown size={13} />} {Math.abs(d)} pt{Math.abs(d) > 1 ? 's' : ''} vs sem. passée</span>
}

/** Mini-histogramme : semaines passées en gris, semaine en cours en accent. */
function MiniBars({ values, label }: { values: number[]; label: string }) {
  const max = Math.max(...values, 1), n = values.length, W = 100, H = 28, gap = 2, bw = (W - gap * (n - 1)) / n
  return (
    <svg className="mini" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" role="img" aria-label={label}>
      {values.map((v, i) => { const h = Math.max(v > 0 ? 3 : 1.5, (v / max) * H); return <rect key={i} x={i * (bw + gap)} y={H - h} width={bw} height={h} rx={1.5} className={i === n - 1 ? 'cur' : ''} /> })}
    </svg>
  )
}

/** Mini-courbe de réussite (0 à 100 %), point final en accent. */
function MiniLine({ values, label }: { values: (number | null)[]; label: string }) {
  const W = 100, H = 28, n = values.length
  const pts = values.map((v, i) => v == null ? null : [(i / (n - 1)) * W, H - 2 - v * (H - 4)] as const)
  const segs: string[] = []; let curSeg: string[] = []
  pts.forEach(p => { if (p) curSeg.push(`${p[0].toFixed(1)},${p[1].toFixed(1)}`); else if (curSeg.length) { segs.push(curSeg.join(' ')); curSeg = [] } })
  if (curSeg.length) segs.push(curSeg.join(' '))
  return (
    <svg className="mini line" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" role="img" aria-label={label}>
      <line x1="0" x2={W} y1={H - 2 - 0.5 * (H - 4)} y2={H - 2 - 0.5 * (H - 4)} className="mid" />
      {segs.map((sg, i) => sg.includes(' ') ? <polyline key={i} points={sg} /> : null)}
    </svg>
  )
}

export function AddChildModal({ onClose }: { onClose: (id?: string) => void }) {
  const { addChild } = useStore()
  const [nick, setNick] = useState('')
  const [grade, setGrade] = useState<LevelId>('ce1')
  const [av, setAv] = useState(BASE_AVATARS[0])
  const [pin, setPin] = useState('')
  const [err, setErr] = useState('')
  const submit = () => { const r = addChild(nick, grade, av, pin); if (r.ok) onClose(r.id); else setErr(r.error) }
  return (
    <Modal label="Ajouter un enfant" onClose={() => onClose()}>
      <h2>Ajouter un enfant</h2>
      <form className="col mt16" onSubmit={e => { e.preventDefault(); submit() }}>
        <div className="field"><label htmlFor="nick">Prénom ou pseudo</label><input id="nick" className="input" value={nick} onChange={e => setNick(e.target.value)} maxLength={20} autoFocus /></div>
        <div className="field"><label>Classe</label>
          <div className="wrap gap8">{(['ce1', 'ce2', 'cm1', 'cm2'] as LevelId[]).map(g => <button type="button" key={g} className={`btn sm ${grade === g ? '' : 'ghost'}`} onClick={() => setGrade(g)}>{g.toUpperCase()}</button>)}</div>
        </div>
        <div className="field"><label>Avatar</label>
          <div className="wrap gap8">{BASE_AVATARS.map(a => <button type="button" key={a} className="iconbtn" style={{ width: 52, height: 52, fontSize: '1.8rem', border: a === av ? '3px solid var(--teal)' : '3px solid transparent' }} aria-label={`Avatar ${a}`} onClick={() => setAv(a)}>{a}</button>)}</div>
        </div>
        <div className="field"><label htmlFor="pin">Code secret à 4 chiffres</label><input id="pin" className="input" inputMode="numeric" maxLength={4} value={pin} onChange={e => setPin(e.target.value.replace(/\D/g, ''))} />
          <span className="tiny muted">Il sert à ouvrir le profil de l’enfant quand vous n’êtes pas connecté.</span></div>
        {err && <div className="err">{err}</div>}
        <button className="btn block" type="submit">Créer le profil</button>
      </form>
    </Modal>
  )
}

function insight(c: Child, today: string): { tone: 'green' | 'gold' | 'red' | 'teal'; text: string } {
  const last = c.streak.last
  if (!c.sessions.length) return { tone: 'teal', text: 'Pas encore de séance. Proposez-lui de commencer ensemble.' }
  if (last && diffDays(today, last) >= 4) return { tone: 'gold', text: `Pas d’activité depuis ${diffDays(today, last)} jours.` }
  const cur = periodTotals(c, addDays(today, -6), today), prev = periodTotals(c, addDays(today, -13), addDays(today, -7))
  if (cur.acc != null && prev.acc != null && cur.acc - prev.acc >= 0.05) return { tone: 'green', text: 'Les réussites au premier essai progressent cette semaine.' }
  const w = weakSpots(c)[0]
  if (w) return { tone: 'gold', text: `À consolider : ${w.title}.` }
  return { tone: 'green', text: 'Rythme régulier, continuez ainsi.' }
}

export default function Dashboard() {
  const { account, enterChild } = useStore()
  const nav = useNavigate()
  const [add, setAdd] = useState(false)
  const today = dayKey()
  const kids = account?.children ?? []

  const family = useMemo(() => {
    const per = kids.map(k => weeksSeries(k, 8, today))
    const labels = (per[0] ?? weeksSeries({ sessions: [] } as unknown as Child, 8, today)).map(w => fmtShort(w.start))
    const minutes = labels.map((_, i) => per.reduce((a, p) => a + p[i].ms, 0) / 60000)
    return { per, labels, minutes }
  }, [kids, today])

  if (!account) return null
  const openChild = async (id: string) => { await enterChild(id); nav('/enfant') }

  return (
    <div className="col gap20">
      <div className="row wrap">
        <div className="grow" style={{ minWidth: 260 }}>
          <h1>Bonjour {account.name}</h1>
          <p className="muted">Voici où en sont vos enfants. Les chiffres se calculent sur les séances terminées.</p>
        </div>
        <button className="btn" onClick={() => setAdd(true)}><Plus size={18} /> Ajouter un enfant</button>
      </div>

      {kids.length === 0 ? (
        <div className="card"><Empty emoji="👧" title="Ajoutez votre premier enfant">Créez un profil avec un prénom, une classe et un code à 4 chiffres. Le suivi apparaît dès la première leçon.</Empty>
          <div className="center"><button className="btn" onClick={() => setAdd(true)}>Créer un profil</button></div></div>
      ) : (
        <>
          <div className="kids">
            {kids.map((k, i) => {
              const w = family.per[i]
              const cur = w[w.length - 1], prev = w[w.length - 2]
              const ins = insight(k, today)
              const t = mastersTotals(k)
              return (
                <div key={k.id} className="card kid" onClick={() => nav(`/parent/enfant/${k.id}`)} role="link" tabIndex={0} aria-label={`Voir le suivi de ${k.nickname}`} onKeyDown={e => { if (e.key === 'Enter') nav(`/parent/enfant/${k.id}`) }}>
                  <div className="kid-head">
                    <Avatar emoji={k.avatar} frame={k.frame} size={52} />
                    <div className="grow">
                      <h3 className="kid-name">{k.nickname}</h3>
                      <div className="small muted">{k.grade.toUpperCase()} · {levelOf(k.xp).name}</div>
                    </div>
                    <span className="kid-streak" title="Jours d’affilée avec au moins une leçon"><Flame size={16} /> {liveStreak(k)} j</span>
                  </div>

                  <div className="kid-tiles">
                    <div className="tile-stat">
                      <div className="ts-label"><Clock size={14} /> Temps</div>
                      <div className="ts-value">{fmtMin(cur.ms)}</div>
                      <div className="ts-sub">{cur.lessons} leçon{cur.lessons > 1 ? 's' : ''} cette semaine</div>
                      <MiniBars values={w.map(x => x.ms / 60000)} label={`Minutes par semaine, 8 dernières semaines, pour ${k.nickname}`} />
                    </div>
                    <div className="tile-stat">
                      <div className="ts-label"><Target size={14} /> Réussite</div>
                      <div className="ts-value">{cur.acc == null ? '–' : `${Math.round(cur.acc * 100)} %`}</div>
                      <div className="ts-sub"><Trend now={cur.acc} before={prev.acc} /></div>
                      <MiniLine values={w.map(x => x.acc)} label={`Réussite au premier essai, 8 dernières semaines, pour ${k.nickname}`} />
                    </div>
                    <div className="tile-stat">
                      <div className="ts-label"><BookOpenCheck size={14} /> Acquises</div>
                      <div className="ts-value">{t.acquired}<span className="ts-of"> / {t.started}</span></div>
                      <div className="ts-sub">leçons commencées</div>
                      <div className="meter" role="img" aria-label={`${t.acquired} leçons acquises sur ${t.started} commencées`}><i style={{ width: `${t.started ? (t.acquired / t.started) * 100 : 0}%` }} /></div>
                    </div>
                  </div>

                  <div className={`kid-insight ${ins.tone}`}>{ins.tone === 'green' ? <TrendingUp size={18} /> : ins.tone === 'gold' ? <AlertCircle size={18} /> : <Info size={18} />}<span>{ins.text}</span></div>

                  <div className="kid-foot" onClick={e => e.stopPropagation()}>
                    <span className="tiny muted grow">{k.streak.last ? `Dernière séance ${relDay(k.streak.last, today)}` : 'Aucune séance'}</span>
                    <Link className="btn ghost sm" to={`/parent/enfant/${k.id}`}>Détails</Link>
                    <button className="btn sm" onClick={() => openChild(k.id)}><Play size={16} /> Son espace</button>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="grid2">
            <section className="card">
              <h3>Temps d’apprentissage de la famille</h3>
              <BarChart labels={family.labels} values={family.minutes} unit="min" />
              <p className="tiny muted mt8">Minutes par semaine sur 8 semaines. La dernière barre est la semaine en cours.</p>
            </section>
            <section className="card">
              <h3>Évolution de la réussite au premier essai</h3>
              <LineChart labels={family.labels} series={kids.map((k, i) => ({ name: k.nickname, color: COLORS[i % 4], values: family.per[i].map(w => w.acc) }))} />
              <div className="legend mt8">{kids.map((k, i) => <span key={k.id}><i style={{ background: COLORS[i % 4] }} />{k.nickname}</span>)}</div>
            </section>
          </div>

          <section className="card">
            <h3>À retenir</h3>
            {kids.map(k => {
              const ws = weakSpots(k).slice(0, 2)
              return (
                <div key={k.id} className="weak">
                  <Avatar emoji={k.avatar} frame={k.frame} size={36} />
                  <div className="grow"><b>{k.nickname}</b>
                    <div className="small muted">{ws.length ? `À consolider : ${ws.map(w => `${w.title} (${meta(w.subject).name})`).join(', ')}` : 'Aucune notion en difficulté repérée pour le moment.'}</div></div>
                  <Link className="btn ghost sm" to={`/parent/enfant/${k.id}?tab=progression`}>Voir</Link>
                </div>
              )
            })}
          </section>
        </>
      )}
      <p className="tiny muted">EDUFUN suit la progression de l’enfant dans les leçons. Il ne s’agit ni d’une évaluation officielle ni d’une note scolaire.</p>
      {add && <AddChildModal onClose={() => setAdd(false)} />}
    </div>
  )
}
