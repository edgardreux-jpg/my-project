import { useCallback, useEffect, useMemo, useState } from 'react'
import { Link, Navigate, Outlet, useNavigate, useParams } from 'react-router-dom'
import { AlertCircle, ArrowDown, ArrowUp, BookOpenCheck, ChevronLeft, Clock, Copy, LogOut, Plus, School, Target, Trash2, UserMinus, Users } from 'lucide-react'
import { useStore } from '../../state/store'
import { Avatar, Logo, Modal } from '../../components/common'
import { Ico } from '../../components/Icon'
import { LEVELS, meta } from '../../lib/curriculum'
import { fmtMin, relDay } from '../../lib/dates'
import type { ClassRow } from '../../lib/cloud'
import { classWeakSpots, studentStats, teacherApi, type StudentStat } from '../../lib/teacher'

const GRADES = [...LEVELS.map(l => ({ id: l.id as string, title: l.title })), { id: 'multi', title: 'Plusieurs niveaux' }]
const gradeTitle = (g: string) => GRADES.find(x => x.id === g)?.title ?? g.toUpperCase()

function useApi() {
  const { account } = useStore()
  return useMemo(() => teacherApi(!account?.cloud), [account?.cloud])
}

export function TeacherShell() {
  const { account, logout, loading } = useStore()
  const nav = useNavigate()
  if (loading) return <div className="auth"><p className="muted">Chargement…</p></div>
  if (!account) return <Navigate to="/enseignant/connexion" replace />
  if (account.role !== 'teacher') return <Navigate to="/parent" replace />
  return (
    <div className="pshell">
      <header className="ptop"><div className="in">
        <Logo />
        <span className="pill gold">Espace enseignant</span>
        <div className="grow" />
        <button className="btn quiet sm" aria-label="Déconnexion" onClick={() => { logout(); nav('/') }}><LogOut size={16} /><span className="lbl"> Déconnexion</span></button>
      </div></header>
      <main className="pmain">
        {!account.cloud && <div className="note mb16" role="status">Démonstration : élèves fictifs, rien n’est enregistré. <Link to="/enseignant/inscription">Créer un vrai compte enseignant</Link></div>}
        <Outlet />
      </main>
    </div>
  )
}

function CodeBox({ code, big = false }: { code: string; big?: boolean }) {
  const [copied, setCopied] = useState(false)
  return (
    <button type="button" className={`classcode ${big ? 'big' : ''}`} aria-label={`Code de classe ${code.split('').join(' ')}, copier`}
      onClick={e => { e.preventDefault(); e.stopPropagation(); navigator.clipboard?.writeText(code).then(() => { setCopied(true); setTimeout(() => setCopied(false), 1600) }).catch(() => {}) }}>
      <span className="cc-code">{code}</span>
      <span className="cc-act"><Copy size={big ? 18 : 14} /> {copied ? 'Copié' : 'Copier'}</span>
    </button>
  )
}

export function TeacherHome() {
  const { account } = useStore()
  const api = useApi()
  const [classes, setClasses] = useState<ClassRow[] | null>(null)
  const [add, setAdd] = useState(false)
  const nav = useNavigate()
  const reload = useCallback(() => { api.list().then(setClasses) }, [api])
  useEffect(reload, [reload])

  return (
    <div className="col gap20">
      <div className="row wrap">
        <div className="grow" style={{ minWidth: 260 }}>
          <h1>Bonjour {account?.name}</h1>
          <p className="muted">Créez une classe, donnez son code aux familles, puis suivez la progression de vos élèves.</p>
        </div>
        <button className="btn" onClick={() => setAdd(true)}><Plus size={18} /> Créer une classe</button>
      </div>

      {classes === null ? <p className="muted">Chargement…</p> : classes.length === 0 ? (
        <div className="card center col gap12" style={{ padding: 32 }}>
          <School size={40} color="var(--teal)" style={{ margin: '0 auto' }} />
          <h2>Aucune classe pour le moment</h2>
          <p className="muted">Créez votre première classe : vous obtiendrez un code à 6 caractères à communiquer aux familles.</p>
          <button className="btn" style={{ alignSelf: 'center' }} onClick={() => setAdd(true)}><Plus size={18} /> Créer une classe</button>
        </div>
      ) : (
        <div className="grid2">
          {classes.map(c => (
            <Link key={c.id} to={`/enseignant/classe/${c.id}`} className="card classcard">
              <div className="row"><span className="cls-ic"><School size={22} /></span><div className="grow"><h3 style={{ margin: 0 }}>{c.name}</h3><div className="small muted">{gradeTitle(c.grade)}</div></div></div>
              <div className="row wrap gap8"><span className="small muted">Code de classe</span><CodeBox code={c.code} /></div>
              <span className="small" style={{ color: 'var(--teal-d)', fontWeight: 800 }}>Voir les élèves et les statistiques</span>
            </Link>
          ))}
        </div>
      )}

      <div className="card flat col gap8" style={{ background: 'var(--teal-s)', border: 0 }}>
        <b>Comment les élèves rejoignent la classe</b>
        <ol className="small" style={{ margin: 0, paddingLeft: 20, lineHeight: 1.6 }}>
          <li>Vous donnez le code de classe aux familles (cahier de liaison, ENT, réunion).</li>
          <li>Le parent l’entre dans son espace, sur la fiche de son enfant, rubrique « Classe ».</li>
          <li>L’élève apparaît aussitôt dans votre tableau. Le parent peut quitter la classe à tout moment.</li>
        </ol>
      </div>

      {add && <NewClass onClose={() => setAdd(false)} onCreate={async (n, g) => {
        const r = await api.create(n, g)
        if ('error' in r && r.error) return r.error
        setAdd(false); reload(); if (r.row) nav(`/enseignant/classe/${r.row.id}`)
        return null
      }} />}
    </div>
  )
}

function NewClass({ onClose, onCreate }: { onClose: () => void; onCreate: (name: string, grade: string) => Promise<string | null> }) {
  const [name, setName] = useState('')
  const [grade, setGrade] = useState('ce1')
  const [err, setErr] = useState('')
  const [busy, setBusy] = useState(false)
  return (
    <Modal label="Créer une classe" onClose={onClose}>
      <form className="col gap12" onSubmit={async e => {
        e.preventDefault()
        if (!name.trim()) { setErr('Donnez un nom à la classe.'); return }
        setBusy(true); const r = await onCreate(name.trim(), grade); setBusy(false); if (r) setErr(r)
      }}>
        <h2>Créer une classe</h2>
        <div className="field"><label htmlFor="cn">Nom de la classe</label><input id="cn" className="input" autoFocus maxLength={60} placeholder="CE1 B, école Jules Ferry" value={name} onChange={e => setName(e.target.value)} /></div>
        <div className="field"><label htmlFor="cg">Niveau</label>
          <select id="cg" className="input" value={grade} onChange={e => setGrade(e.target.value)}>{GRADES.map(g => <option key={g.id} value={g.id}>{g.title}</option>)}</select></div>
        {err && <div className="err" role="alert">{err}</div>}
        <button className="btn block" disabled={busy}>Créer et obtenir le code</button>
      </form>
    </Modal>
  )
}

function Trend({ now, before }: { now: number | null; before: number | null }) {
  if (now == null || before == null) return null
  const d = Math.round((now - before) * 100)
  if (!d) return <span className="tiny muted">stable</span>
  return <span className={`tiny trend ${d > 0 ? 'up' : 'down'}`}>{d > 0 ? <ArrowUp size={12} /> : <ArrowDown size={12} />}{Math.abs(d)} pt{Math.abs(d) > 1 ? 's' : ''}</span>
}

export function ClassView() {
  const { id = '' } = useParams()
  const api = useApi()
  const nav = useNavigate()
  const [cls, setCls] = useState<ClassRow | null | undefined>(undefined)
  const [stats, setStats] = useState<StudentStat[] | null>(null)
  const [err, setErr] = useState('')
  const [sort, setSort] = useState<'name' | 'acc' | 'time' | 'last'>('name')
  const [kick, setKick] = useState<StudentStat | null>(null)
  const [del, setDel] = useState(false)

  const reload = useCallback(async () => {
    const list = await api.list()
    setCls(list.find(c => c.id === id) ?? null)
    try { setStats(studentStats(await api.overview(id))) } catch (e) { setErr((e as Error).message) }
  }, [api, id])
  useEffect(() => { reload() }, [reload])

  if (cls === null) return <Navigate to="/enseignant" replace />
  if (!cls) return <p className="muted">Chargement…</p>

  const s = stats ?? []
  const active = s.filter(x => x.weekLessons > 0)
  const accs = s.filter(x => x.acc != null)
  const avgAcc = accs.length ? accs.reduce((a, x) => a + x.acc!, 0) / accs.length : null
  const avgMs = s.length ? s.reduce((a, x) => a + x.weekMs, 0) / s.length : 0
  const idle = s.filter(x => x.idleDays == null || x.idleDays >= 7)
  const weak = classWeakSpots(s)
  const sorted = [...s].sort((a, b) =>
    sort === 'acc' ? (a.acc ?? 2) - (b.acc ?? 2) : sort === 'time' ? a.weekMs - b.weekMs : sort === 'last' ? (b.idleDays ?? 999) - (a.idleDays ?? 999) : a.nickname.localeCompare(b.nickname, 'fr'))

  return (
    <div className="col gap20">
      <Link to="/enseignant" className="row small"><ChevronLeft size={18} /> Mes classes</Link>
      <div className="card row wrap gap16" style={{ alignItems: 'center' }}>
        <span className="cls-ic big"><School size={28} /></span>
        <div className="grow" style={{ minWidth: 200 }}>
          <h1 style={{ fontSize: '1.6rem', margin: 0 }}>{cls.name}</h1>
          <div className="small muted">{gradeTitle(cls.grade)} · {s.length} élève{s.length > 1 ? 's' : ''}</div>
        </div>
        <div className="col gap4" style={{ alignItems: 'flex-start' }}>
          <span className="tiny muted" style={{ fontWeight: 800 }}>CODE À DONNER AUX FAMILLES</span>
          <CodeBox code={cls.code} big />
        </div>
      </div>

      {err && <div className="err" role="alert">{err}</div>}

      {stats && s.length === 0 ? (
        <div className="card center col gap8" style={{ padding: 28 }}>
          <Users size={36} color="var(--teal)" style={{ margin: '0 auto' }} />
          <h2>Aucun élève pour l’instant</h2>
          <p className="muted">Communiquez le code <b>{cls.code}</b> aux familles. Chaque élève apparaîtra ici dès que son parent l’aura saisi.</p>
        </div>
      ) : stats && (
        <>
          <div className="kpis">
            <div className="tile-stat"><div className="ts-label"><Users size={14} /> Actifs</div><div className="ts-value">{active.length}<span className="ts-of"> / {s.length}</span></div><div className="ts-sub">élèves cette semaine</div></div>
            <div className="tile-stat"><div className="ts-label"><Clock size={14} /> Temps moyen</div><div className="ts-value">{fmtMin(avgMs)}</div><div className="ts-sub">par élève, 7 derniers jours</div></div>
            <div className="tile-stat"><div className="ts-label"><Target size={14} /> Réussite</div><div className="ts-value">{avgAcc == null ? '–' : `${Math.round(avgAcc * 100)} %`}</div><div className="ts-sub">au premier essai, moyenne</div></div>
            <div className="tile-stat"><div className="ts-label"><AlertCircle size={14} /> Inactifs</div><div className="ts-value">{idle.length}</div><div className="ts-sub">depuis 7 jours ou plus</div></div>
          </div>

          {weak.length > 0 && (
            <div className="card col gap8">
              <h2 style={{ fontSize: '1.15rem' }}>Notions à retravailler en classe</h2>
              <p className="small muted" style={{ margin: 0 }}>Moins de 75 % de réussite sur les dernières séances.</p>
              {weak.map(w => (
                <div key={w.title} className="weakrow">
                  <span style={{ color: meta(w.subject).color }}><Ico e={meta(w.subject).emoji} color="currentColor" size={20} /></span>
                  <div className="grow"><b>{w.title}</b><div className="tiny muted">{w.names.join(', ')}</div></div>
                  <span className="pill gold">{w.names.length} élève{w.names.length > 1 ? 's' : ''}</span>
                </div>
              ))}
            </div>
          )}

          <div className="card col gap12">
            <div className="row wrap gap8">
              <h2 className="grow" style={{ fontSize: '1.15rem' }}>Élèves</h2>
              <label className="small muted" htmlFor="srt">Trier par</label>
              <select id="srt" className="input" style={{ width: 'auto', minHeight: 40, padding: '6px 10px' }} value={sort} onChange={e => setSort(e.target.value as typeof sort)}>
                <option value="name">Prénom</option><option value="acc">Réussite (plus faible d’abord)</option><option value="time">Temps (plus faible d’abord)</option><option value="last">Inactivité</option>
              </select>
            </div>
            <div className="stu-head" aria-hidden="true"><span>Élève</span><span>Cette semaine</span><span>Réussite</span><span>Acquises</span><span>À consolider</span><span /></div>
            {sorted.map(x => (
              <div key={x.id} className={`stu ${x.idleDays == null || x.idleDays >= 7 ? 'idle' : ''}`}>
                <div className="stu-name"><Avatar emoji={x.avatar} size={36} /><div><b>{x.nickname}</b><div className="tiny muted">{x.grade.toUpperCase()} · {x.last ? relDay(x.last) : 'jamais connecté'}</div></div></div>
                <div><span className="lbl-m">Cette semaine</span><b>{fmtMin(x.weekMs)}</b> <span className="tiny muted">{x.weekLessons} leçon{x.weekLessons > 1 ? 's' : ''}</span></div>
                <div><span className="lbl-m">Réussite</span><b>{x.acc == null ? '–' : `${Math.round(x.acc * 100)} %`}</b> <Trend now={x.acc} before={x.prevAcc} /></div>
                <div><span className="lbl-m">Acquises</span><b>{x.acquired}</b><span className="tiny muted"> / {x.started}</span></div>
                <div className="small"><span className="lbl-m">À consolider</span>{x.weak.length ? x.weak.map(w => w.title).join(', ') : <span className="muted">Rien à signaler</span>}</div>
                <button className="iconbtn" aria-label={`Retirer ${x.nickname} de la classe`} title="Retirer de la classe" onClick={() => setKick(x)}><UserMinus size={18} /></button>
              </div>
            ))}
          </div>
        </>
      )}

      <div className="row" style={{ justifyContent: 'flex-end' }}>
        <button className="btn quiet sm" onClick={() => setDel(true)}><Trash2 size={16} /> Supprimer la classe</button>
      </div>
      <p className="tiny muted">Vous voyez le pseudo et la progression des élèves inscrits par leur famille, rien d’autre. Les familles peuvent quitter la classe à tout moment.</p>

      {kick && <Modal label="Retirer un élève" onClose={() => setKick(null)}>
        <h2>Retirer {kick.nickname} ?</h2>
        <p className="muted">L’élève ne sera plus suivi dans cette classe. Sa progression n’est pas effacée ; sa famille pourra rejoindre la classe à nouveau avec le code.</p>
        <div className="row gap8 mt16"><button className="btn ghost grow" onClick={() => setKick(null)}>Annuler</button><button className="btn grow" onClick={async () => { await api.removeMember(id, kick.id); setKick(null); reload() }}>Retirer</button></div>
      </Modal>}
      {del && <Modal label="Supprimer la classe" onClose={() => setDel(false)}>
        <h2>Supprimer « {cls.name} » ?</h2>
        <p className="muted">Le code ne fonctionnera plus et les élèves seront retirés de la classe. Leur progression reste chez leurs familles.</p>
        <div className="row gap8 mt16"><button className="btn ghost grow" onClick={() => setDel(false)}>Annuler</button><button className="btn grow" onClick={async () => { await api.remove(id); nav('/enseignant') }}>Supprimer</button></div>
      </Modal>}
    </div>
  )
}
