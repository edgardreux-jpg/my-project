// EDUFUN : e-mails aux parents (bilan du dimanche, révision proposée par l'enseignant), envoyés via Brevo.
// Appelée par pg_cron (bilan) et par un déclencheur SQL (révision). Chaque envoi n'a lieu qu'une fois.
import { createClient } from 'npm:@supabase/supabase-js@2'

const SITE = 'https://edufun-app.vercel.app'
const sb = createClient(Deno.env.get('SUPABASE_URL')!, Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!, { auth: { persistSession: false } })
const BREVO = Deno.env.get('BREVO_API_KEY') ?? ''
const FROM = { email: Deno.env.get('SENDER_EMAIL') ?? 'edgard.reux@gmail.com', name: 'EDUFUN' }

const esc = (s: string) => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]!))
const kidWord = (g?: string) => g === 'f' ? 'votre fille' : g === 'm' ? 'votre fils' : 'votre enfant'
const fmtMin = (ms: number) => { const m = Math.round(ms / 60000); return m < 60 ? `${m} min` : `${Math.floor(m / 60)} h ${String(m % 60).padStart(2, '0')}` }
const dayStr = (d: Date) => d.toISOString().slice(0, 10)

async function send(to: string, subject: string, html: string) {
  if (!BREVO) throw new Error('BREVO_API_KEY manquante')
  const r = await fetch('https://api.brevo.com/v3/smtp/email', {
    method: 'POST', headers: { 'api-key': BREVO, 'content-type': 'application/json', accept: 'application/json' },
    body: JSON.stringify({ sender: FROM, to: [{ email: to }], subject, htmlContent: html }),
  })
  if (!r.ok) throw new Error(`Brevo ${r.status}: ${await r.text()}`)
}

function layout(title: string, body: string) {
  return `<!doctype html><html lang="fr"><body style="margin:0;background:#FFF8EF;font-family:Arial,Helvetica,sans-serif;color:#22324A">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr><td align="center" style="padding:24px 12px">
  <table role="presentation" width="100%" style="max-width:560px;background:#fff;border-radius:16px;border:1px solid #EFE6D8" cellpadding="0" cellspacing="0">
  <tr><td style="padding:22px 24px 6px"><img src="${SITE}/logo.png" width="40" height="40" alt="" style="vertical-align:middle"> <b style="font-size:20px;vertical-align:middle"><span style="color:#17766E">EDU</span><span style="color:#E07A4B">FUN</span></b></td></tr>
  <tr><td style="padding:6px 24px 4px"><h1 style="font-size:20px;margin:0">${title}</h1></td></tr>
  <tr><td style="padding:8px 24px 22px;font-size:15px;line-height:1.5">${body}
  <p style="margin:22px 0 0"><a href="${SITE}/#/parent" style="background:#17766E;color:#fff;text-decoration:none;padding:12px 20px;border-radius:10px;font-weight:bold;display:inline-block">Ouvrir mon espace parent</a></p></td></tr>
  <tr><td style="padding:14px 24px;border-top:1px solid #EFE6D8;font-size:12px;color:#6B7280">Vous recevez cet e-mail car vous avez un compte parent EDUFUN. Vous pouvez désactiver ces e-mails dans votre espace parent, rubrique « E-mails ».</td></tr>
  </table></td></tr></table></body></html>`
}

async function emailOf(userId: string) {
  const { data } = await sb.auth.admin.getUserById(userId)
  return data.user?.email ?? null
}

/* ---------- Révision proposée ---------- */
async function taskMail(id: string) {
  // On « réserve » la révision : un seul envoi, même si la fonction est appelée deux fois
  const { data: t } = await sb.from('pp_class_tasks').update({ mailed_at: new Date().toISOString() }).eq('id', id).is('mailed_at', null).select('*').maybeSingle()
  if (!t) return { skipped: 'déjà envoyée ou introuvable' }
  const { data: cls } = await sb.from('pp_classes').select('name, teacher_id').eq('id', t.class_id).single()
  const { data: tp } = await sb.from('pp_profiles').select('name').eq('user_id', cls!.teacher_id).maybeSingle()
  const teacher = tp?.name || 'L’enseignant de la classe'
  let q = sb.from('pp_class_members').select('child_id').eq('class_id', t.class_id)
  if (t.target?.length) q = q.in('child_id', t.target)
  const { data: mem } = await q
  const ids = (mem ?? []).map(m => m.child_id)
  if (!ids.length) return { sent: 0 }
  const { data: kids } = await sb.from('pp_children').select('id, parent_id, data').in('id', ids)
  const byParent = new Map<string, any[]>()
  for (const k of kids ?? []) { if (!byParent.has(k.parent_id)) byParent.set(k.parent_id, []); byParent.get(k.parent_id)!.push(k) }
  const { data: profs } = await sb.from('pp_profiles').select('user_id, mail_tasks').in('user_id', [...byParent.keys()])
  const optOut = new Set((profs ?? []).filter(p => p.mail_tasks === false).map(p => p.user_id))
  const due = t.due_date ? new Date(t.due_date + 'T12:00:00Z').toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', timeZone: 'Europe/Paris' }) : null
  let sent = 0
  for (const [pid, ks] of byParent) {
    if (optOut.has(pid)) continue
    const to = await emailOf(pid); if (!to) continue
    const names = ks.map(k => `${kidWord(k.data?.gender)} <b>${esc(k.data?.nickname ?? '')}</b>`).join(' et ')
    const title = t.title ? `« ${esc(t.title)} »` : 'une notion'
    const body = `<p><b>${esc(teacher)}</b> invite ${names} à réviser la notion suivante : <b>${title}</b>${t.subject ? ` (${esc(t.subject)})` : ''}.</p>
      ${due ? `<p>À faire pour <b>${esc(due)}</b>.</p>` : ''}
      ${t.message ? `<p style="background:#F7F2EA;border-radius:10px;padding:10px 14px;margin:12px 0">« ${esc(t.message)} »</p>` : ''}
      <p>La révision apparaît en tête de son espace EDUFUN : quelques minutes suffisent.</p>`
    try { await send(to, `${teacher} propose une révision à ${ks.map(k => k.data?.nickname).join(' et ')}`, layout('Une révision proposée par l’école', body)); sent++ } catch (e) { console.error(e) }
  }
  return { sent }
}

/* ---------- Bilan du dimanche ---------- */
async function weeklyMail() {
  const now = new Date()
  const monday = new Date(now); monday.setUTCDate(now.getUTCDate() - ((now.getUTCDay() + 6) % 7))
  const week = dayStr(monday)
  const { error: dup } = await sb.from('pp_mail_log').insert({ kind: 'weekly', ref: week })
  if (dup) return { skipped: 'bilan déjà envoyé cette semaine' }
  const from = new Date(now); from.setUTCDate(now.getUTCDate() - 6)
  const prevFrom = new Date(now); prevFrom.setUTCDate(now.getUTCDate() - 13)
  const { data: profs } = await sb.from('pp_profiles').select('user_id, name, role, mail_weekly').neq('role', 'teacher')
  let sent = 0
  for (const p of profs ?? []) {
    if (p.mail_weekly === false) continue
    const { data: kids } = await sb.from('pp_children').select('id, data').eq('parent_id', p.user_id)
    if (!kids?.length) continue
    const { data: ses } = await sb.from('pp_sessions').select('child_id, day, data').eq('parent_id', p.user_id).gte('day', dayStr(prevFrom))
    const rows: string[] = []
    let any = false
    for (const k of kids) {
      const all = (ses ?? []).filter(s => s.child_id === k.id)
      const cur = all.filter(s => s.day >= dayStr(from)), prev = all.filter(s => s.day < dayStr(from))
      const ms = cur.reduce((a, s) => a + (s.data?.ms ?? 0), 0), pms = prev.reduce((a, s) => a + (s.data?.ms ?? 0), 0)
      const tot = cur.reduce((a, s) => a + (s.data?.total ?? 0), 0), ok = cur.reduce((a, s) => a + (s.data?.firstOk ?? 0), 0)
      const days = new Set(cur.map(s => s.day)).size
      const lessons = cur.filter(s => s.data?.kind !== 'diagnostic').length
      if (cur.length) any = true
      const trend = !cur.length ? '' : pms ? (ms >= pms ? '<span style="color:#1F6B44">en hausse</span>' : '<span style="color:#8A5B00">en baisse</span>') + ' par rapport à la semaine précédente' : ''
      rows.push(`<tr><td style="padding:12px 0;border-top:1px solid #EFE6D8"><b style="font-size:16px">${esc(k.data?.nickname ?? '')}</b> <span style="color:#6B7280">${esc(String(k.data?.grade ?? '').toUpperCase())}</span><br>
        ${cur.length ? `${fmtMin(ms)} d’apprentissage sur ${days} jour${days > 1 ? 's' : ''} · ${lessons} leçon${lessons > 1 ? 's' : ''} · ${tot ? Math.round(ok / tot * 100) : 0} % de réussite au premier essai${trend ? `<br><span style="font-size:13px;color:#6B7280">Temps ${trend}.</span>` : ''}`
          : '<span style="color:#6B7280">Pas de leçon cette semaine. Une petite séance de 5 minutes suffit pour reprendre le rythme.</span>'}</td></tr>`)
    }
    const to = await emailOf(p.user_id); if (!to) continue
    const body = `<p>Bonjour${p.name ? ' ' + esc(p.name) : ''},</p><p>Voici la semaine de vos enfants sur EDUFUN :</p>
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0">${rows.join('')}</table>
      <p style="margin-top:14px">${any ? 'Bravo à eux ! Le détail (notions à consolider, progression par matière) vous attend dans votre espace.' : 'Une nouvelle semaine commence : c’est le bon moment pour une première leçon ensemble.'}</p>`
    try { await send(to, 'La semaine de vos enfants sur EDUFUN', layout('Le bilan de la semaine', body)); sent++ } catch (e) { console.error(e) }
  }
  return { sent }
}

Deno.serve(async req => {
  if (req.method !== 'POST') return new Response('Méthode non autorisée', { status: 405 })
  try {
    if (!BREVO) return Response.json({ error: 'BREVO_API_KEY manquante : rien n’a été envoyé' }, { status: 503 })
    const b = await req.json().catch(() => ({}))
    let out
    if (b.kind === 'task' && typeof b.id === 'string' && /^[0-9a-f-]{36}$/i.test(b.id)) out = await taskMail(b.id)
    else if (b.kind === 'weekly') out = await weeklyMail()
    else return new Response('Requête invalide', { status: 400 })
    return Response.json(out)
  } catch (e) {
    console.error(e)
    return Response.json({ error: String((e as Error).message) }, { status: 500 })
  }
})
