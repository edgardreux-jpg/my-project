import { useEffect, useMemo, useRef, useState, type CSSProperties } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { BookOpen, Volume2, X } from 'lucide-react'
import { useStore } from '../../state/store'
import { DIAGNOSTICS, lessonById, meta, pathFor } from '../../lib/curriculum'
import { canCheck, expectedLabel, isCorrect } from '../../lib/exercise'
import { canSpeak, sfx, speak, stopSpeaking } from '../../lib/audio'
import { applySession, BADGES, CHESTS, levelOf } from '../../lib/progress'
import type { Exercise, Reward } from '../../types'
import ExerciseView, { sayText } from '../../components/ExerciseView'
import { Confetti, Modal } from '../../components/common'
import { Ico, Stars, avatarColor } from '../../components/Icon'

type Phase = 'intro' | 'play' | 'done'

// CE1 et CE2 : ton enjoué. CM1 et CM2 : ton plus posé, façon coach.
const PRAISE = ['Bien vu !', 'Exact !', 'Trop fort !', 'Bravo !', 'Parfait !', 'Super !', 'C’est ça !', 'Génial !']
const CHEER = ['À toi de jouer !', 'Prends ton temps.', 'Tu vas trouver !', 'Allez, on continue !', 'Lis bien la question.', 'Je suis avec toi !']
const PRAISE_SR = ['Bien joué.', 'Exact.', 'C’est juste.', 'Impeccable.', 'Bien raisonné.', 'Correct.', 'Solide.', 'Validé.']
const CHEER_SR = ['On enchaîne.', 'Lis attentivement.', 'Prends le temps de vérifier.', 'Tu gères.', 'Concentre-toi bien.', 'Garde le rythme.']
const FOX = `${import.meta.env.BASE_URL}logo.png`

/** Écran de victoire : les étoiles tombent une à une, les points montent, Foxy félicite. */
function Celebrate({ stars, sound, name, firstOk, total, xp, title, big }: { stars: number; sound: boolean; name: string; firstOk: number; total: number; xp: number; title: string; big: boolean }) {
  const [pts, setPts] = useState(0)
  const [lit, setLit] = useState(0)
  useEffect(() => {
    const timers: number[] = []
    for (let i = 1; i <= stars; i++) timers.push(window.setTimeout(() => { setLit(i); sfx('star', sound) }, 350 + i * 420))
    const t0 = performance.now() + 300, dur = 900 + stars * 300
    let raf = 0
    const tick = (t: number) => { const k = Math.min(1, Math.max(0, (t - t0) / dur)); setPts(Math.round(xp * (1 - Math.pow(1 - k, 3)))); if (k < 1) raf = requestAnimationFrame(tick) }
    raf = requestAnimationFrame(tick)
    timers.push(window.setTimeout(() => sfx('done', sound), 400 + stars * 420 + 200))
    return () => { timers.forEach(clearTimeout); cancelAnimationFrame(raf) }
  }, [stars, xp, sound])
  const say = stars === 3 ? (big ? `Waouh ${name}, tout juste du premier coup ou presque ! Tu es un as !` : `Remarquable, ${name}. Tu maîtrises cette notion.`)
    : stars === 2 ? (big ? `Super ${name} ! Encore un petit effort et c’est 3 étoiles !` : `Très bon travail, ${name}. Rejoue-la plus tard pour viser 3 étoiles.`)
    : stars === 1 ? (big ? `Bravo d’être allé jusqu’au bout, ${name} ! On la rejouera ensemble.` : `Leçon terminée, ${name}. Elle reviendra bientôt pour s’ancrer.`)
    : `Merci ${name} ! Je sais maintenant par où commencer.`
  return (
    <div className="cele">
      <div className="cele-fox"><img src={`${import.meta.env.BASE_URL}logo.png`} alt="" /><div className="cele-say" role="status">{say}</div></div>
      <h1 className="h-lg">{title}</h1>
      {stars > 0 && <div className="cele-stars" aria-label={`${stars} étoile${stars > 1 ? 's' : ''} sur 3`}>
        {[1, 2, 3].map(i => <span key={i} className={`cele-star ${i <= lit ? 'on' : ''} ${i > stars ? 'off' : ''}`}><svg viewBox="0 0 24 24" width="64" height="64"><path d="M12 2.5l2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17.4l-5.9 3.1 1.2-6.5L2.5 9.4l6.6-.9z" /></svg></span>)}
      </div>}
      <div className="cele-pts"><span>+{pts}</span> points</div>
      <p className="small muted" style={{ margin: 0 }}>{firstOk} réussite{firstOk > 1 ? 's' : ''} du premier coup sur {total}.</p>
    </div>
  )
}

export default function LessonPlayer({ diagnostic = false }: { diagnostic?: boolean }) {
  const { id } = useParams()
  return <Player key={`${diagnostic}-${id}`} diagnostic={diagnostic} />
}

function Player({ diagnostic }: { diagnostic: boolean }) {
  const { id } = useParams()
  const nav = useNavigate()
  const { child, mutateChild } = useStore()
  const lesson = diagnostic ? null : lessonById.get(id ?? '') ?? null
  const exercises: Exercise[] = useMemo(
    () => (diagnostic ? DIAGNOSTICS[child?.grade ?? 'ce1'] ?? [] : lesson?.ex ?? []),
    [diagnostic, lesson, child?.grade],
  )
  const m = meta(lesson?.subject ?? 'ma')

  // Une leçon déjà faite démarre directement (pas d'écran d'intro à chaque fois)
  const [phase, setPhase] = useState<Phase>(() => (!diagnostic && lesson && (child?.lessons[lesson.id]?.done ?? 0) > 0 ? 'play' : 'intro'))
  const [eliminated, setEliminated] = useState<string[]>([])
  const [tip, setTip] = useState<string | null>(null)
  const [queue, setQueue] = useState<number[]>(() => exercises.map((_, i) => i))
  const [attempt, setAttempt] = useState(0)
  const [answer, setAnswer] = useState<any>(undefined)
  const [checked, setChecked] = useState<null | { ok: boolean; hintOnly: boolean }>(null)
  const [firstOk, setFirstOk] = useState(0)
  const [missed, setMissed] = useState<string[]>([])
  const [requeued, setRequeued] = useState<number[]>([])
  const [done, setDone] = useState(0)
  const [reward, setReward] = useState<Reward | null>(null)
  const [quit, setQuit] = useState(false)
  const [review, setReview] = useState(false)
  const [handled, setHandled] = useState(0)
  const [shake, setShake] = useState(false)
  // Ambiance de jeu : série de réussites du premier coup, étoiles gagnées pendant la leçon
  const [combo, setCombo] = useState(0)
  const [gems, setGems] = useState(0)
  const [hop, setHop] = useState(0)
  const start = useRef(Date.now())
  const saved = useRef(false)

  const sound = child?.sound ?? true
  const total = exercises.length
  const cur = queue.length ? exercises[queue[0]] : null

  useEffect(() => () => stopSpeaking(), [])

  // Le dernier rendu expose ses actions aux effets ci-dessous (clavier, passage automatique)
  const api = useRef<{ next?: () => void; check?: () => void; retry?: () => void; pick?: (a: any) => void; typed?: (buf: string, now?: boolean) => boolean | undefined; delay?: number }>({})

  // Bonne réponse : passage automatique à la suite, le temps de lire l'explication
  useEffect(() => {
    if (!checked?.ok || child?.autoNext === false) return
    const t = setTimeout(() => api.current.next?.(), api.current.delay ?? 1600)
    return () => clearTimeout(t)
  }, [checked, child?.autoNext])

  // Clavier : Entrée valide ou continue, 1 à 9 choisissent une réponse de QCM
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement | null
      if (t && ['INPUT', 'TEXTAREA', 'BUTTON', 'SELECT'].includes(t.tagName)) return
      if (e.metaKey || e.ctrlKey || e.altKey) return
      const a = api.current
      if (e.key === 'Enter') { e.preventDefault(); a.check?.(); a.next?.() ; return }
      if (/^[0-9,.\-]$/.test(e.key)) {
        // QCM de nombres : on tape le nombre lui-même ; sinon 1 à 9 choisissent par position
        buf.current += e.key
        clearTimeout(bufT.current)
        const r = a.typed?.(buf.current)
        if (r === undefined && /^[1-9]$/.test(e.key) && buf.current.length === 1) a.pick?.(Number(e.key) - 1)
        const snap = buf.current
        bufT.current = window.setTimeout(() => { if (r === false) apiRef.current.typed?.(snap, true); buf.current = '' }, 700)
      }
    }
    const buf = { current: '' }, bufT = { current: 0 }
    const apiRef = api
    window.addEventListener('keydown', onKey)
    return () => { window.removeEventListener('keydown', onKey); clearTimeout(bufT.current) }
  }, [])

  // Lecture automatique de la consigne (activée par défaut en CE1)
  const curEx = phase === 'play' ? exercises[queue[0]] : undefined
  const readAloud = child ? (child.readAloud ?? child.grade === 'ce1') : false
  useEffect(() => {
    if (!curEx || !readAloud || !canSpeak() || curEx.type === 'dictation') return
    const t = setTimeout(() => speak(sayText(curEx)), 250)
    return () => clearTimeout(t)
  }, [curEx?.id, readAloud, phase])
  useEffect(() => () => stopSpeaking(), [])

  if (!child || (!diagnostic && !lesson) || total === 0) {
    return (
      <div className="reward"><h2>Cette leçon n’est pas disponible.</h2>
        <button className="btn mt16" onClick={() => nav('/enfant')}>Retour</button></div>
    )
  }

  const check = (given: any = answer) => {
    if (!cur || checked || !canCheck(cur, given)) return
    const ok = isCorrect(cur, given)
    if (ok) {
      sfx('good', sound)
      setGems(g => g + 1); setHop(h => h + 1)
      if (attempt === 0) {
        setFirstOk(n => n + 1)
        const c = combo + 1
        setCombo(c)
        if (c === 3 || c === 5 || c === 8) setTimeout(() => sfx('star', sound), 260)
      }
      setChecked({ ok: true, hintOnly: false })
    } else {
      sfx('oops', sound)
      setCombo(0)
      setShake(true); setTimeout(() => setShake(false), 400)
      if (attempt === 0) {
        // Premier essai raté : indice en bandeau et on corrige directement, sans bouton « Réessayer »
        setMissed(x => [...x, cur.id])
        setTip(cur.hint || 'Regarde bien et essaie encore.')
        setAttempt(1)
        if (cur.type === 'qcm') { setEliminated([given]); setAnswer(undefined) }
      } else {
        setChecked({ ok: false, hintOnly: false })
      }
    }
  }

  // QCM : la réponse est vérifiée dès qu'on la coche, sans bouton « Vérifier »
  const pick = (a: any) => {
    setAnswer(a)
    if (cur && cur.type === 'qcm' && !checked) check(a)
  }

  const retry = () => { setChecked(null); setAnswer(undefined); setAttempt(1) }

  const next = () => {
    if (!cur || !checked) return
    sfx('tap', sound)
    const idx = queue[0]
    let q = queue.slice(1)
    const wasOk = checked.ok
    if (!wasOk && !requeued.includes(idx)) { q = [...q, idx]; setRequeued(r => [...r, idx]) }
    else setDone(d => d + 1)
    setHandled(h => h + 1)
    setQueue(q); setChecked(null); setAnswer(undefined); setAttempt(0); setEliminated([]); setTip(null)
    if (q.length === 0) finish()
  }

  const finish = () => {
    if (saved.current) return
    saved.current = true
    const fo = firstOk + (checked?.ok && attempt === 0 ? 0 : 0)
    let r: Reward | null = null
    mutateChild(child.id, c => {
      r = applySession(c, { lesson, kind: diagnostic ? 'diagnostic' : 'lesson', ms: Date.now() - start.current, total, firstOk: fo, missed })
    })
    setReward(r)
    setPhase('done')
    sfx(r && (r as Reward).stars >= 1 ? 'done' : 'good', sound)
  }

  const feedbackNode = () => {
    if (!checked || !cur) return null
    if (checked.ok) {
      return (
        <div className="fb ok" role="status"><div className="in">
          <div className="grow"><b>{(sr ? PRAISE_SR : PRAISE)[(handled + gems) % PRAISE.length]}</b>{cur.explanation && <div className="small">{cur.explanation}</div>}</div>
          <button className="btn" onClick={next} autoFocus>Continuer</button>
        </div></div>
      )
    }
    if (attempt === 0) {
      return (
        <div className="fb hint" role="status"><div className="in">
          <div className="grow"><b>Pas tout à fait, essaie encore.</b>{cur.hint && <div className="small">Indice : {cur.hint}</div>}</div>
          <button className="btn gold" onClick={retry} autoFocus>Réessayer</button>
        </div></div>
      )
    }
    const exp = expectedLabel(cur)
    return (
      <div className="fb ko" role="status"><div className="in">
        <div className="grow">
          <b>On regarde ensemble.</b>
          {exp && <div className="small">Bonne réponse : {exp}</div>}
          {cur.explanation && <div className="small">{cur.explanation}</div>}
          <div className="tiny">Cet exercice reviendra tout à l’heure.</div>
        </div>
        <button className="btn" onClick={next} autoFocus>Continuer</button>
      </div></div>
    )
  }

  const tint = (diagnostic
    ? { '--sc': '#17766E', '--sd': '#0D514C', '--ss': '#E3F4EE' }
    : { '--sc': m.color, '--sd': m.dark, '--ss': m.soft }) as CSSProperties

  if (phase === 'intro') {
    const intro = diagnostic
      ? 'Ce petit parcours permet de voir où tu en es. Il n’y a pas de note, tu peux demander de l’aide à un adulte.'
      : lesson!.intro
    return (
      <div className="player play" style={tint}>
        <div className="ptoolbar"><button className="iconbtn" aria-label="Quitter" onClick={() => nav(-1)}><X /></button></div>
        <div className="pbody center" style={{ paddingTop: 30 }}>
          <div style={{ fontSize: '3.4rem', color: diagnostic ? 'var(--teal)' : m.color }}><Ico e={diagnostic ? '🧭' : m.emoji} color="currentColor" /></div>
          <h1 className="h-lg" style={{ margin: '12px 0' }}>{diagnostic ? 'Faisons le point' : lesson!.title}</h1>
          <p className="lead" style={{ margin: '0 auto 8px' }}>{intro}</p>
          {canSpeak() && <button className="btn quiet sm mt8" onClick={() => speak(intro)}><Volume2 size={18} /> Écouter</button>}
          <p className="muted small mt16">{total} exercices · environ {Math.max(2, Math.round(total * 0.7))} minutes</p>
          <button className="btn lg mt16" autoFocus onClick={() => { stopSpeaking(); sfx('tap', sound); start.current = Date.now(); setPhase('play') }}>C’est parti</button>
        </div>
      </div>
    )
  }

  if (phase === 'done' && reward) {
    const stars = reward.stars
    const lv = levelOf(child.xp)
    const nextLesson = (() => {
      if (!lesson) return null
      const items = pathFor(child.grade, lesson.subject).flatMap(g => g.items).filter(i => i.lesson)
      const i = items.findIndex(x => x.lesson!.id === lesson.id)
      return i >= 0 ? items[i + 1]?.lesson ?? null : null
    })()
    return (
      <div className="player">
        {stars === 3 && <Confetti />}
        <div className="reward">
          <Celebrate stars={diagnostic ? 0 : stars} sound={sound} name={child.nickname} firstOk={reward.firstOk} total={reward.total} xp={reward.xp} big={child.grade === 'ce1' || child.grade === 'ce2'}
            title={diagnostic ? 'Parcours terminé' : stars === 3 ? 'Excellent !' : stars === 2 ? 'Très bien !' : 'Bien joué, tu as terminé !'} />
          <div className="wrap mt16" style={{ justifyContent: 'center' }}>
            <span className="chip"><Ico e="🔥" /> {reward.streak} jour{reward.streak > 1 ? 's' : ''}</span>
            <span className="chip">{lv.name}</span>
          </div>
          {reward.capped && <p className="small muted mt16">Tu as déjà gagné beaucoup de points aujourd’hui. C’est le bon moment pour une pause : tu peux continuer sans compter.</p>}
          {reward.freezeUsed && <p className="small muted mt8">Un joker de série t’a protégé pendant ton absence.</p>}
          {reward.levelUp && <div className="note mt16"><b>Nouveau niveau : {lv.name} !</b></div>}
          {reward.newBadges.map(b => { const d = BADGES.find(x => x.id === b)!; return <div key={b} className="note mt16 row gap8"><Ico e={d.emoji} size={22} /> Badge débloqué : <b>{d.title}</b></div> })}
          {reward.newChests.length > 0 && <div className="note mt16 row gap8"><Ico e="🎁" size={22} /> Un coffre t’attend dans l’onglet Trésors ({CHESTS.find(c => c.id === reward.newChests[0])?.title}).</div>}
          {lesson?.adult && (
            <div className="card mt16" style={{ textAlign: 'left' }}>
              <h3 className="row gap8"><Ico e="👨‍👩‍👧" /> À faire avec un adulte</h3>
              <p className="small">{lesson.adult}</p>
            </div>
          )}
          <div className="col mt24">
            {nextLesson
              ? <button className="btn lg block" autoFocus onClick={() => nav(`/enfant/lecon/${nextLesson.id}`)}>Leçon suivante</button>
              : <button className="btn lg block" autoFocus onClick={() => nav('/enfant')}>Continuer</button>}
            {nextLesson && <button className="btn quiet block" onClick={() => nav('/enfant')}>Accueil</button>}
            {lesson && <button className="btn quiet block" onClick={() => nav(`/enfant/matiere/${lesson.subject}`)}>Retour au parcours</button>}
          </div>
        </div>
      </div>
    )
  }

  api.current = {
    next: () => { if (phase === 'play' && checked) { if (!checked.ok && attempt === 0 && cur?.type !== 'qcm') retry(); else next() } },
    check: () => { if (phase === 'play' && !checked) check() },
    pick: (n: number) => {
      if (phase !== 'play' || checked || !cur || cur.type !== 'qcm') return
      const c = cur.choices?.[n]
      if (c && !eliminated.includes(c.id)) pick(c.id)
    },
    typed: (buf: string, now?: boolean) => {
      if (phase !== 'play' || checked || !cur || cur.type !== 'qcm' || !cur.choices) return undefined
      const norm = (x: string) => x.replace(/[\s\u00a0\u202f]/g, '').replace(',', '.')
      const nums = cur.choices.map(c => norm(c.label))
      if (!nums.every(x => /^-?\d+(\.\d+)?$/.test(x))) return undefined
      const b = norm(buf)
      const idx = nums.findIndex((x, i) => x === b && !eliminated.includes(cur.choices![i].id))
      if (idx < 0) return true
      const longer = nums.some(x => x !== b && x.startsWith(b))
      if (longer && !now) return false
      pick(cur.choices[idx].id)
      return true
    },
    delay: Math.min(3800, 1200 + (cur?.explanation?.length ?? 0) * 28),
  }

  const pct = Math.min(100, (handled / (total + requeued.length)) * 100)
  const left = queue.length
  const qNum = Math.min(handled + 1, total + requeued.length)
  const sr = child.grade === 'cm1' || child.grade === 'cm2'
  const nSeg = total + requeued.length
  const foxSay = sr
    ? (checked?.ok ? (combo >= 3 ? `Série de ${combo}. Continue !` : left <= 1 ? 'Dernière question validée.' : 'Bien joué, on continue.')
      : checked ? 'Regarde la correction, elle reviendra.'
      : tip ? 'Presque. Relis l’indice et retente.'
      : handled === 0 ? `C’est parti, ${child.nickname}.`
      : left <= 3 ? `Encore ${left} question${left > 1 ? 's' : ''}.`
      : CHEER_SR[handled % CHEER_SR.length])
    : (checked?.ok ? (combo >= 3 ? `${combo} d’affilée ! Tu es en feu !` : left <= 1 ? 'Et voilà la dernière !' : 'Continue comme ça !')
      : checked ? 'Pas grave, on regarde ensemble.'
      : tip ? 'On réessaie ensemble, regarde l’indice.'
      : handled === 0 ? `À toi de jouer, ${child.nickname} !`
      : left <= 3 ? `Plus que ${left} !`
      : CHEER[handled % CHEER.length])
  const mood = checked?.ok ? 'happy' : checked || tip ? 'soft' : ''
  return (
    <div className={`player play lv-${child.grade} ${sr ? 'grand' : 'petit'}`} style={tint}>
      <div className="ptoolbar">
        <button className="iconbtn" aria-label="Quitter la leçon" onClick={() => setQuit(true)}><X /></button>
        {sr
          ? <div className="pseg" role="progressbar" aria-label={`Question ${qNum} sur ${nSeg}`} aria-valuenow={Math.round(pct)} aria-valuemin={0} aria-valuemax={100}>
              {Array.from({ length: nSeg }, (_, i) => <i key={i} className={i < handled ? 'on' : i === handled ? 'cur' : ''} />)}
            </div>
          : <div className={`bar pbar ${pct >= 50 ? 'half' : ''}`} role="progressbar" aria-label={`Question ${qNum} sur ${nSeg}`} aria-valuenow={Math.round(pct)} aria-valuemin={0} aria-valuemax={100}><i style={{ width: `${Math.max(pct, 4)}%` }} /><b className="pmile" aria-hidden="true" /></div>}
        {combo >= 3 && <span key={`c${combo}`} className={`combo ${combo >= 5 ? 'hot' : ''}`} title={`${combo} réussites d’affilée`}><Ico e="🔥" size={combo >= 5 ? 22 : 18} />{sr ? `×${combo}` : combo}</span>}
        <span className="gems" title="Bonnes réponses dans cette leçon" aria-label={`${gems} bonne${gems > 1 ? 's' : ''} réponse${gems > 1 ? 's' : ''}`}>
          <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path d="M12 2.5l2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17.4l-5.9 3.1 1.2-6.5L2.5 9.4l6.6-.9z" /></svg>
          <span key={`g${gems}`} className="gems-n">{gems}</span>
          {hop > 0 && checked?.ok && <span key={`h${hop}`} className="gems-fly" aria-hidden="true">+1</span>}
        </span>
        {!diagnostic && lesson && <button className="iconbtn" aria-label="Revoir la leçon" title="Revoir la leçon" onClick={() => { stopSpeaking(); setReview(true) }}><BookOpen /></button>}
      </div>
      <div className={`pbody ${shake ? 'shake' : ''}`}>
        <div className="pstage">
          <div className={`pfox ${mood}`} key={`f${hop}-${mood}`}>
            <img src={FOX} alt="" />
            <div className="pfox-say" aria-live="polite">{foxSay}</div>
          </div>
          <div className="qchip"><Ico e={diagnostic ? '🧭' : m.emoji} size={16} /> {sr ? `Question ${qNum} / ${nSeg}` : `Question ${qNum}`}{left <= 3 && left > 0 && !checked ? <em>{left === 1 ? 'dernière !' : `plus que ${left}`}</em> : null}</div>
          {cur && (
            <ExerciseView key={`${cur.id}-${attempt}`} ex={cur} answer={answer} setAnswer={pick} eliminated={eliminated}
              locked={!!checked && (checked.ok || attempt > 0)} status={checked ? checked.ok : null}
              reveal={!!checked && !checked.ok && attempt > 0} onEnter={() => check()} />
          )}
        </div>
      </div>
      {tip && !checked && cur?.type === 'qcm' && <div className="note" role="status" style={{ margin: '0 auto', maxWidth: 560 }}><b>Pas tout à fait, essaie encore.</b> <span className="small">Indice : {tip}</span></div>}
      {checked ? feedbackNode() : cur?.type === 'qcm' ? null : (
        <div className={`fb ${tip ? 'hint' : ''}`}><div className="in">
          {tip ? <div className="grow" role="status"><b>Pas tout à fait, essaie encore.</b><div className="small">Indice : {tip}</div></div> : <span className="grow" />}
          <button className="btn lg" disabled={!cur || !canCheck(cur, answer)} onClick={() => check()}>Vérifier</button>
        </div></div>
      )}
      {review && lesson && (
        <Modal label="Revoir la leçon" onClose={() => { stopSpeaking(); setReview(false) }}>
          <h2>{lesson.title}</h2>
          <p className="lead mt8">{lesson.intro}</p>
          <div className="col mt16">
            {canSpeak() && <button className="btn quiet block" onClick={() => speak(lesson.intro)}><Volume2 size={18} /> Écouter</button>}
            <button className="btn block" autoFocus onClick={() => { stopSpeaking(); setReview(false) }}>Retour à l’exercice</button>
          </div>
        </Modal>
      )}
      {quit && (
        <Modal label="Quitter la leçon" onClose={() => setQuit(false)}>
          <h2>Quitter la leçon ?</h2>
          <p className="muted mt8">Ta progression dans cette leçon ne sera pas gardée.</p>
          <div className="col mt16">
            <button className="btn block" onClick={() => setQuit(false)}>Continuer la leçon</button>
            <button className="btn quiet block" onClick={() => nav(-1)}>Quitter</button>
          </div>
        </Modal>
      )}
    </div>
  )
}
