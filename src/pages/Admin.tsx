import { useCallback, useEffect, useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { ArrowLeft, LogOut, RefreshCw } from 'lucide-react'
import { useStore } from '../state/store'
import { Logo } from '../components/common'
import { AdminStats, isAdmin, loadAdminStats } from '../lib/admin'
import { SUBJECT_META } from '../lib/curriculum'

const n = (v: number | null | undefined) => (v ?? 0).toLocaleString('fr-FR')
const dur = (ms: number) => {
  const m = Math.round(ms / 60000)
  if (m < 60) return `${m} min`
  const h = Math.floor(m / 60)
  return `${h} h ${String(m % 60).padStart(2, '0')}`
}
const shortDate = (s: string) => new Date(s).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })

function Kpi({ v, l, sub }: { v: string; l: string; sub?: string }) {
  return (
    <div className="card adm-kpi">
      <div className="adm-v">{v}</div>
      <div className="adm-l">{l}</div>
      {sub && <div className="adm-sub">{sub}</div>}
    </div>
  )
}

function Bars({ data, label }: { data: { k: string; n: number; t: string }[]; label: string }) {
  const max = Math.max(1, ...data.map(d => d.n))
  return (
    <div className="adm-bars" role="img" aria-label={label}>
      {data.map(d => (
        <div key={d.k} className="adm-bar" title={`${d.t} : ${d.n}`}>
          <span className="adm-bar-n">{d.n > 0 ? d.n : ''}</span>
          <span className="adm-bar-f" style={{ height: `${(d.n / max) * 100}%` }} />
        </div>
      ))}
    </div>
  )
}

function Rows({ items }: { items: { k: string; label: string; n: number }[] }) {
  const max = Math.max(1, ...items.map(i => i.n))
  if (!items.length) return <p className="muted small">Aucune donnée pour l’instant.</p>
  return (
    <div className="col gap8">
      {items.map(i => (
        <div key={i.k} className="adm-row">
          <span className="adm-row-l">{i.label}</span>
          <span className="adm-row-t"><span style={{ width: `${(i.n / max) * 100}%` }} /></span>
          <span className="adm-row-n">{n(i.n)}</span>
        </div>
      ))}
    </div>
  )
}

export default function Admin() {
  const { account, mode, loading, logout } = useStore()
  const nav = useNavigate()
  const [s, setS] = useState<AdminStats | null>(null)
  const [err, setErr] = useState('')
  const [busy, setBusy] = useState(false)
  const [at, setAt] = useState<Date | null>(null)

  const load = useCallback(async () => {
    setBusy(true); setErr('')
    const r = await loadAdminStats()
    if (r.data) { setS(r.data); setAt(new Date()) } else setErr(r.error ?? 'Erreur.')
    setBusy(false)
  }, [])
  const ok = isAdmin(account)
  useEffect(() => { if (ok) load() }, [ok, load])

  if (loading) return <div className="auth"><p className="muted">Chargement…</p></div>
  if (!ok) return <Navigate to="/" replace />
  if (account!.role !== 'teacher' && mode !== 'parent') return <Navigate to="/profils" replace />

  const back = account!.role === 'teacher' ? '/enseignant' : '/parent'
  const grades = ['ce1', 'ce2', 'cm1', 'cm2']
  const byGrade = s ? [...grades, ...Object.keys(s.byGrade).filter(g => !grades.includes(g))]
    .map(g => ({ k: g, label: g.toUpperCase(), n: s.byGrade[g] ?? 0 })) : []
  const bySubject = s ? Object.entries(s.bySubject).sort((a, b) => b[1] - a[1])
    .map(([k, v]) => ({ k, label: SUBJECT_META[k]?.name ?? (k === 'game' ? 'Jeux' : k), n: v })) : []

  return (
    <div className="pshell">
      <header className="ptop"><div className="in">
        <Logo />
        <span className="pill violet">Tableau de bord</span>
        <div className="grow" />
        <Link className="btn ghost sm" to={back} aria-label="Retour à mon espace"><ArrowLeft size={16} aria-hidden="true" /><span className="lbl"> Mon espace</span></Link>
        <button className="btn quiet sm" aria-label="Déconnexion" onClick={() => { logout(); nav('/') }}><LogOut size={16} /><span className="lbl"> Déconnexion</span></button>
      </div></header>
      <main className="pmain">
        <div className="row adm-head">
          <div className="grow">
            <h1>Tableau de bord</h1>
            <p className="muted small">{at ? `Mis à jour à ${at.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}` : 'Vue d’ensemble de Shukudai'}</p>
          </div>
          <button className="btn ghost sm" onClick={load} disabled={busy}><RefreshCw size={16} aria-hidden="true" className={busy ? 'adm-spin' : ''} /> Actualiser</button>
        </div>

        {err && <div className="err mt16" role="alert">{err}</div>}
        {!s && !err && <p className="muted mt24">Chargement des statistiques…</p>}

        {s && <>
          <h2 className="adm-h2">Comptes</h2>
          <div className="adm-grid">
            <Kpi v={n(s.accounts)} l="Comptes créés" sub={`+${n(s.accounts7)} cette semaine, +${n(s.accounts30)} sur 30 jours`} />
            <Kpi v={n(s.parents)} l="Parents" />
            <Kpi v={n(s.teachers)} l="Enseignants" />
            <Kpi v={n(s.login7)} l="Connectés sur 7 jours" sub={`${n(s.confirmed)} e-mails confirmés`} />
          </div>

          <h2 className="adm-h2">Élèves et classes</h2>
          <div className="adm-grid">
            <Kpi v={n(s.children)} l="Élèves (profils enfants)" sub={s.parents ? `${(s.children / Math.max(1, s.parents)).toLocaleString('fr-FR', { maximumFractionDigits: 1 })} par parent en moyenne` : undefined} />
            <Kpi v={n(s.active7)} l="Élèves actifs sur 7 jours" sub={`${n(s.active30)} sur 30 jours`} />
            <Kpi v={n(s.classes)} l="Classes créées" sub={`${n(s.classMembers)} élèves inscrits en classe`} />
            <Kpi v={n(s.tasks)} l="Devoirs donnés" />
          </div>

          <h2 className="adm-h2">Apprentissage</h2>
          <div className="adm-grid">
            <Kpi v={n(s.sessions)} l="Séances terminées" sub={`${n(s.sessions7)} sur 7 jours, ${n(s.sessions30)} sur 30 jours`} />
            <Kpi v={dur(s.totalMs)} l="Temps d’apprentissage total" sub={s.sessions ? `${dur(s.totalMs / s.sessions)} par séance en moyenne` : undefined} />
            <Kpi v={s.success == null ? '–' : `${s.success} %`} l="Réussite du premier coup" />
            <Kpi v={n(s.mailsSent)} l="E-mails envoyés" sub={`${n(s.mailWeekly)} abonnés au bilan, ${n(s.mailTasks)} aux devoirs`} />
          </div>

          <div className="adm-two mt24">
            <section className="card">
              <h3>Séances par jour (30 derniers jours)</h3>
              <Bars label="Séances par jour" data={s.sessionsDaily.map(d => ({ k: d.d, n: d.n, t: shortDate(d.d) }))} />
              <div className="adm-axis"><span>{shortDate(s.sessionsDaily[0]?.d)}</span><span>Aujourd’hui</span></div>
            </section>
            <section className="card">
              <h3>Inscriptions par semaine</h3>
              <Bars label="Inscriptions par semaine" data={s.signupsWeekly.map(d => ({ k: d.w, n: d.n, t: `Semaine du ${shortDate(d.w)}` }))} />
              <div className="adm-axis"><span>{shortDate(s.signupsWeekly[0]?.w)}</span><span>Cette semaine</span></div>
            </section>
            <section className="card">
              <h3>Élèves par classe</h3>
              <Rows items={byGrade} />
            </section>
            <section className="card">
              <h3>Séances par matière</h3>
              <Rows items={bySubject} />
            </section>
          </div>

          <section className="card mt24">
            <h3>Dernières inscriptions</h3>
            {s.recent.length === 0 ? <p className="muted small">Aucune inscription.</p> : (
              <div className="adm-table" role="table">
                <div className="adm-tr adm-th" role="row"><span role="columnheader">Date</span><span role="columnheader">Type</span><span role="columnheader">Enfants</span><span role="columnheader">Messagerie</span></div>
                {s.recent.map((r, i) => (
                  <div className="adm-tr" role="row" key={i}>
                    <span role="cell">{new Date(r.at).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                    <span role="cell">{r.role === 'teacher' ? 'Enseignant' : 'Parent'}</span>
                    <span role="cell">{r.kids}</span>
                    <span role="cell" className="muted">@{r.domain}</span>
                  </div>
                ))}
              </div>
            )}
          </section>
        </>}
      </main>
    </div>
  )
}
