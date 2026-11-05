import { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Volume2, X } from 'lucide-react'
import { useStore } from '../../state/store'
import { DIAGNOSTICS, lessonById, meta } from '../../lib/curriculum'
import { canCheck, expectedLabel, isCorrect } from '../../lib/exercise'
import { canSpeak, sfx, speak, stopSpeaking } from '../../lib/audio'
import { applySession, BADGES, CHESTS, levelOf } from '../../lib/progress'
import type { Exercise, Reward } from '../../types'
import ExerciseView from '../../components/ExerciseView'
import { Confetti, Modal } from '../../components/common'

type Phase = 'intro' | 'play' | 'done'

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

  const [phase, setPhase] = useState<Phase>('intro')
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
  const [shake, setShake] = useState(false)
  const start = useRef(Date.now())
  const saved = useRef(false)

  const sound = child?.sound ?? true
  const total = exercises.length
  const cur = queue.length ? exercises[queue[0]] : null

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
      if (attempt === 0) setFirstOk(n => n + 1)
      setChecked({ ok: true, hintOnly: false })
    } else {
      sfx('oops', sound)
      setShake(true); setTimeout(() => setShake(false), 400)
      if (attempt === 0) {
        setMissed(x => [...x, cur.id])
        setChecked({ ok: false, hintOnly: !!cur.hint })
        if (!cur.hint) setChecked({ ok: false, hintOnly: false })
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
    setQueue(q); setChecked(null); setAnswer(undefined); setAttempt(0)
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
          <div className="grow"><b>Bravo !</b>{cur.explanation && <div className="small">{cur.explanation}</div>}</div>
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
        <button className="btn red" onClick={next} autoFocus>Continuer</button>
      </div></div>
    )
  }

  if (phase === 'intro') {
    const intro = diagnostic
      ? 'Ce petit parcours permet de voir où tu en es. Il n’y a pas de note, tu peux demander de l’aide à un adulte.'
      : lesson!.intro
    return (
      <div className="player">
        <div className="ptoolbar"><button className="iconbtn" aria-label="Quitter" onClick={() => nav(-1)}><X /></button></div>
        <div className="pbody center" style={{ paddingTop: 30 }}>
          <div style={{ fontSize: '3.4rem' }}>{diagnostic ? '🧭' : m.emoji}</div>
          <h1 className="h-lg" style={{ margin: '12px 0' }}>{diagnostic ? 'Faisons le point' : lesson!.title}</h1>
          <p className="lead" style={{ margin: '0 auto 8px' }}>{intro}</p>
          {canSpeak() && <button className="btn quiet sm mt8" onClick={() => speak(intro)}><Volume2 size={18} /> Écouter</button>}
          <p className="muted small mt16">{total} exercices · environ {Math.max(2, Math.round(total * 0.7))} minutes</p>
          <button className="btn lg mt16" onClick={() => { stopSpeaking(); sfx('tap', sound); start.current = Date.now(); setPhase('play') }}>C’est parti</button>
        </div>
      </div>
    )
  }

  if (phase === 'done' && reward) {
    const stars = reward.stars
    const lv = levelOf(child.xp)
    return (
      <div className="player">
        {stars === 3 && <Confetti />}
        <div className="reward">
          <h1 className="h-lg">{diagnostic ? 'Parcours terminé' : stars === 3 ? 'Excellent !' : stars === 2 ? 'Très bien !' : 'Bien joué, tu as terminé !'}</h1>
          {!diagnostic && <div className="stars mt16" aria-label={`${stars} étoiles sur 3`}>{[1, 2, 3].map(n => <span key={n} className={n <= stars ? 'on' : ''}>⭐</span>)}</div>}
          <p className="lead mt16" style={{ margin: '16px auto' }}>{reward.firstOk} réussites du premier coup sur {reward.total}.</p>
          <div className="wrap" style={{ justifyContent: 'center' }}>
            <span className="chip">✨ +{reward.xp} XP</span>
            <span className="chip">🔥 {reward.streak} jour{reward.streak > 1 ? 's' : ''}</span>
            <span className="chip">{lv.name}</span>
          </div>
          {reward.capped && <p className="small muted mt16">Tu as déjà gagné beaucoup d’XP aujourd’hui. C’est le bon moment pour une pause : tu peux continuer sans compter.</p>}
          {reward.freezeUsed && <p className="small muted mt8">Un gel de série t’a protégé pendant ton absence.</p>}
          {reward.levelUp && <div className="note mt16"><b>Nouveau niveau : {lv.name} !</b></div>}
          {reward.newBadges.map(b => { const d = BADGES.find(x => x.id === b)!; return <div key={b} className="note mt16">{d.emoji} Badge débloqué : <b>{d.title}</b></div> })}
          {reward.newChests.length > 0 && <div className="note mt16">🎁 Un coffre t’attend dans l’onglet Récompenses ({CHESTS.find(c => c.id === reward.newChests[0])?.title}).</div>}
          {lesson?.adult && (
            <div className="card mt16" style={{ textAlign: 'left' }}>
              <h3>👨‍👩‍👧 À faire avec un adulte</h3>
              <p className="small">{lesson.adult}</p>
            </div>
          )}
          <div className="col mt24">
            <button className="btn lg block" onClick={() => nav('/enfant')}>Continuer</button>
            {lesson && <button className="btn quiet block" onClick={() => nav(`/enfant/matiere/${lesson.subject}`)}>Retour au parcours</button>}
          </div>
        </div>
      </div>
    )
  }

  const pct = (done / total) * 100
  return (
    <div className="player">
      <div className="ptoolbar">
        <button className="iconbtn" aria-label="Quitter la leçon" onClick={() => setQuit(true)}><X /></button>
        <div className="bar" role="progressbar" aria-valuenow={Math.round(pct)} aria-valuemin={0} aria-valuemax={100}><i style={{ width: `${pct}%` }} /></div>
        <span className="tiny muted">{Math.min(done + 1, total)}/{total}</span>
      </div>
      <div className={`pbody ${shake ? 'shake' : ''}`}>
        {cur && (
          <ExerciseView key={`${cur.id}-${attempt}`} ex={cur} answer={answer} setAnswer={pick}
            locked={!!checked && (checked.ok || attempt > 0)} status={checked ? checked.ok : null}
            reveal={!!checked && !checked.ok && attempt > 0} onEnter={() => check()} />
        )}
      </div>
      {checked ? feedbackNode() : (
        <div className="fb"><div className="in">
          <span className="grow" />
          <button className="btn lg" disabled={!cur || !canCheck(cur, answer)} onClick={() => check()}>Vérifier</button>
        </div></div>
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
