import { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Plus, Play, Flame, Clock, Target, BookOpenCheck, TrendingUp, AlertCircle, Info, ArrowUp, ArrowDown, CalendarCheck, RotateCcw, School, Check, ChevronDown, Mail } from 'lucide-react'
import { useStore } from '../../state/store'
import { Avatar, BarChart, Empty, LineChart, Modal, Switch } from '../../components/common'
import { getMailPrefs, setMailPrefs } from '../../lib/cloud'
import { dayKey, addDays, fmtMin, fmtShort, diffDays, relDay, dueLabel } from '../../lib/dates'
import { liveStreak, levelOf, periodTotals, weakSpots, weeksSeries, mastersTotals } from '../../lib/progress'
import { BASE_AVATARS, uid, yourKid } from '../../lib/progress'
import { lessonById, meta } from '../../lib/curriculum'
import { taskDone, useTeacherTasks } from '../../lib/tasks'
import InstallApp from '../../components/InstallApp'
import type { Child, LevelId } from '../../types'
import { avatarLabel, avatarSrc } from '../../lib/avatars'

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
  const [gender, setGender] = useState<'' | 'f' | 'm'>('')
  const [err, setErr] = useState('')
  const { mutateChild } = useStore()
  const submit = () => { const r = addChild(nick, grade, av, ''); if (r.ok) { if (gender && r.id) mutateChild(r.id, c => { c.gender = gender }); onClose(r.id) } else setErr(r.error) }
  return (
    <Modal label="Ajouter un enfant" onClose={() => onClose()}>
      <h2>Ajouter un enfant</h2>
      <form className="col mt16" onSubmit={e => { e.preventDefault(); submit() }}>
        <div className="field"><label htmlFor="nick">Prénom ou pseudo</label><input id="nick" className="input" value={nick} onChange={e => setNick(e.target.value)} maxLength={20} autoFocus /></div>
        <div className="field"><label>Classe</label>
          <div className="wrap gap8">{(['ce1', 'ce2', 'cm1', 'cm2'] as LevelId[]).map(g => <button type="button" key={g} className={`btn sm ${grade === g ? '' : 'ghost'}`} onClick={() => setGrade(g)}>{g.toUpperCase()}</button>)}</div>
        </div>
        <div className="field"><label>C’est… <span className="muted" style={{ fontWeight: 600 }}>(facultatif)</span></label>
          <div className="wrap gap8">{([['f', 'Une fille'], ['m', 'Un garçon'], ['', 'Je préfère ne pas préciser']] as const).map(([g, l]) => <button type="button" key={g} className={`btn sm ${gender === g ? '' : 'ghost'}`} aria-pressed={gender === g} onClick={() => setGender(g)}>{l}</button>)}</div>
          <span className="tiny muted">Seulement pour écrire « votre fille » ou « votre fils » dans les messages.</span>
        </div>
        <div className="field"><label>Avatar</label>
          <div className="wrap gap8">{BASE_AVATARS.map(a => <button type="button" key={a} className={`avpick ${a === av ? 'on' : ''}`} aria-label={`Avatar ${avatarLabel(a)}`} aria-pressed={a === av} onClick={() => setAv(a)}><img src={avatarSrc(a)} alt="" /><span>{avatarLabel(a)}</span></button>)}</div>
        </div>
        <p className="tiny muted" style={{ margin: 0 }}>L’enfant entrera dans son espace en touchant son avatar. Votre code parent protège l’espace parent.</p>
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

/** Préférences d'e-mails (compte réel uniquement). */
function MailPrefs({ userId }: { userId: string }) {
  const [p, setP] = useState<{ weekly: boolean; tasks: boolean } | null>(null)
  useEffect(() => { getMailPrefs(userId).then(setP).catch(() => {}) }, [userId])
  if (!p) return null
  const up = (n: typeof p) => { setP(n); setMailPrefs(userId, n) }
  return (
    <section className="card">
      <h3 className="row gap8"><Mail size={19} /> E-mails</h3>
      <div className="toggle"><div><b>Bilan du dimanche</b><div className="tiny muted">Chaque dimanche soir, la semaine de vos enfants en un coup d’œil</div></div><Switch label="Bilan du dimanche" on={p.weekly} onChange={v => up({ ...p, weekly: v })} /></div>
      <div className="toggle"><div><b>Révisions proposées par l’école</b><div className="tiny muted">Quand l’enseignant propose une notion à réviser</div></div><Switch label="Révisions proposées par l’école" on={p.tasks} onChange={v => up({ ...p, tasks: v })} /></div>
    </section>
  )
}

/** Bandeau « cette semaine en famille ». */
function FamilyWeek({ kids, today }: { kids: Child[]; today: string }) {
  const from = addDays(today, -6)
  const tot = kids.map(k => periodTotals(k, from, today))
  const ms = tot.reduce((a, t) => a + t.ms, 0), lessons = tot.reduce((a, t) => a + t.lessons, 0)
  const accs = tot.filter(t => t.acc != null).map(t => t.acc as number)
  const acc = accs.length ? accs.reduce((a, b) => a + b, 0) / accs.length : null
  const active = tot.filter(t => t.days > 0).length
  const items = [
    { ic: <Clock size={18} />, l: 'Temps d’apprentissage', v: fmtMin(ms) },
    { ic: <BookOpenCheck size={18} />, l: 'Leçons terminées', v: String(lessons) },
    { ic: <Target size={18} />, l: 'Réussite au 1er essai', v: acc == null ? '–' : `${Math.round(acc * 100)} %` },
    { ic: <CalendarCheck size={18} />, l: 'Enfants actifs', v: `${active} / ${kids.length}` },
  ]
  return (
    <section className="p-week" aria-label="Cette semaine en famille">
      <span className="p-week-t">7 derniers jours</span>
      {items.map(i => <div key={i.l} className="p-wk"><span className="p-ic">{i.ic}</span><div><b>{i.v}</b><small>{i.l}</small></div></div>)}
    </section>
  )
}

/** Invitations à réviser envoyées par l'enseignant. */
export function SchoolNotes({ kids, only }: { kids: Child[]; only?: string }) {
  const tasks = useTeacherTasks().filter(t => !only || t.childId === only)
  const rows = tasks.map(t => ({ t, k: kids.find(k => k.id === t.childId)! })).filter(r => r.k)
    .map(r => ({ ...r, done: taskDone(r.k, r.t) })).filter(r => !r.done || Date.now() - new Date(r.t.at).getTime() < 7 * 864e5)
  if (!rows.length) return null
  return (
    <section className="card p-school">
      <h3><School size={19} /> Messages de l’école</h3>
      {rows.map(({ t, k, done }) => { const l = lessonById.get(t.lessonId)!; return (
        <div key={t.id} className="p-sug">
          <span className={`p-ic ${done ? '' : 'gold'}`}>{done ? <Check size={18} /> : <School size={18} />}</span>
          <div className="grow small">
            {done ? <><b>{k.nickname}</b> a fait la révision demandée par {t.teacher} : « {l.title} ».</>
              : <><b>{t.teacher}</b> invite {yourKid(k)} <b>{k.nickname}</b> à réviser la notion suivante : <b>« {l.title} »</b> ({meta(l.subject).name}).</>}
            <div className="tiny muted">{t.className} · {relDay(t.at.slice(0, 10), dayKey())}{t.due && !done ? <> · <b>à faire pour {dueLabel(t.due)}</b></> : null}{t.message ? ` · « ${t.message} »` : ''}</div>
          </div>
          {done ? <span className="pill green">Faite</span> : <span className="pill gold">À faire</span>}
        </div>) })}
    </section>
  )
}

/** Suggestions concrètes, une ligne par action utile. */
function Suggestions({ kids, today }: { kids: Child[]; today: string }) {
  const { mutateChild } = useStore()
  const [done, setDone] = useState<string[]>([])
  const rows: { key: string; kid: Child; icon: JSX.Element; tone: string; text: JSX.Element; action?: JSX.Element }[] = []
  kids.forEach(k => {
    const last = k.streak.last, idle = last ? diffDays(today, last) : null
    if (!k.sessions.length) rows.push({ key: k.id + 'start', kid: k, icon: <Play size={18} />, tone: 'teal', text: <><b>{k.nickname}</b> n’a pas encore commencé. Une première leçon ensemble ?</> })
    else if (idle != null && idle >= 3) rows.push({ key: k.id + 'idle', kid: k, icon: <CalendarCheck size={18} />, tone: 'gold', text: <><b>{k.nickname}</b> n’a pas appris depuis {idle} jours. Cinq minutes suffisent pour reprendre.</> })
    const w = weakSpots(k)[0]
    const assigned = w && k.assignments.some(a => a.lessonId === w.lessonId && !a.doneAt)
    if (w) rows.push({ key: k.id + 'weak', kid: k, icon: <RotateCcw size={18} />, tone: 'gold', text: <><b>{k.nickname}</b> peut consolider « {w.title} » ({meta(w.subject).name}, {Math.round(w.acc * 100)} % de réussite).</>,
      action: assigned || done.includes(k.id + 'weak') ? <span className="pill green">Proposée</span> : <button className="btn ghost sm" onClick={() => { mutateChild(k.id, c => { c.assignments.push({ id: uid(), lessonId: w.lessonId, at: new Date().toISOString() }) }); setDone(d => [...d, k.id + 'weak']) }}>Proposer la leçon</button> })
    const st = liveStreak(k)
    if (st >= 3) rows.push({ key: k.id + 'streak', kid: k, icon: <Flame size={18} />, tone: 'coral', text: <><b>{k.nickname}</b> a appris {st} jours de suite. Un mot d’encouragement fait toujours plaisir.</> })
  })
  return (
    <section className="card">
      <h3>Suggestions</h3>
      {rows.length === 0 ? <p className="small muted">Rien à signaler pour le moment.</p> : rows.map(r => (
        <div key={r.key} className="p-sug">
          <span className={`p-ic ${r.tone}`}>{r.icon}</span>
          <div className="grow small">{r.text}</div>
          {r.action ?? <Link className="btn quiet sm" to={`/parent/enfant/${r.kid.id}`}>Voir</Link>}
        </div>
      ))}
    </section>
  )
}

export default function Dashboard() {
  const { account, enterChild } = useStore()
  const nav = useNavigate()
  const [add, setAdd] = useState(false)
  const today = dayKey()
  const kids = account?.children ?? []
  const [openKids, setOpenKids] = useState<string[]>(() => kids.slice(0, 1).map(k => k.id))

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
      <div className="row wrap p-head">
        <div className="grow" style={{ minWidth: 260 }}>
          <div className="p-date">{new Date().toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })}</div>
          <h1>Bonjour {account.name}</h1>
          <p className="muted">Voici où en sont vos enfants cette semaine.</p>
        </div>
        <button className="btn" onClick={() => setAdd(true)}><Plus size={18} /> Ajouter un enfant</button>
      </div>
      {kids.length > 0 && <FamilyWeek kids={kids} today={today} />}
      {kids.length > 0 && <SchoolNotes kids={kids} />}
      <InstallApp />

      {kids.length === 0 ? (
        <div className="card"><Empty emoji="👧" title="Ajoutez votre premier enfant">Créez un profil avec un prénom, une classe et un avatar. Le suivi apparaît dès la première leçon.</Empty>
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
                <div key={k.id} className={`card kid ${openKids.includes(k.id) ? 'open' : ''}`} onClick={() => nav(`/parent/enfant/${k.id}`)} role="link" tabIndex={0} onKeyDown={e => { if (e.key === 'Enter') nav(`/parent/enfant/${k.id}`) }}>
                  <div className="kid-head">
                    <Avatar emoji={k.avatar} frame={k.frame} size={52} />
                    <div className="grow">
                      <h3 className="kid-name">{k.nickname}</h3>
                      <div className="small muted">{k.grade.toUpperCase()} · {levelOf(k.xp).name}</div>
                      <div className="p-lvl" title={`Progression vers le niveau suivant`}><i style={{ width: `${levelOf(k.xp).pct}%` }} /></div>
                    </div>
                    <span className="kid-streak" title="Jours d’affilée avec au moins une leçon"><Flame size={16} /> {liveStreak(k)} j</span>
                    <button className="kid-toggle" aria-expanded={openKids.includes(k.id)} aria-label={`${openKids.includes(k.id) ? 'Replier' : 'Déplier'} la carte de ${k.nickname}`}
                      onClick={e => { e.stopPropagation(); setOpenKids(v => v.includes(k.id) ? v.filter(x => x !== k.id) : [...v, k.id]) }}><ChevronDown size={20} /></button>
                  </div>
                  <div className="kid-sum"><span><Clock size={14} /> {fmtMin(cur.ms)}</span><span><Target size={14} /> {cur.acc == null ? '–' : `${Math.round(cur.acc * 100)} %`}</span><span className={`kid-sum-ins ${ins.tone}`}>{ins.text}</span></div>
                  <div className="kid-more">

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
                </div>
              )
            })}
          </div>

          <div className="grid2 p-charts" tabIndex={0} role="region" aria-label="Graphiques de la famille">
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

          <Suggestions kids={kids} today={today} />
        </>
      )}
      {account.cloud && <MailPrefs userId={account.id} />}
      <p className="tiny muted">Shukudai suit la progression de l’enfant dans les leçons. Il ne s’agit ni d’une évaluation officielle ni d’une note scolaire.</p>
      {add && <AddChildModal onClose={() => setAdd(false)} />}
    </div>
  )
}
