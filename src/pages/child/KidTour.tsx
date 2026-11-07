import { useEffect, useLayoutEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'

const STEPS = [
  { sel: '.k-hero .k-btn3d', title: 'Ta leçon du jour', text: 'Appuie sur « Jouer » : je te prépare la bonne leçon au bon moment.' },
  { sel: '.k-tab.t-teal', title: 'Tes mondes', text: 'Chaque matière est un monde, avec un chemin d’aventure à suivre.' },
  { sel: '.k-tab.t-gold', title: 'Tes trésors', text: 'Chaque leçon rapporte des points : ouvre des coffres et gagne de nouveaux avatars !' },
]
const key = (id: string) => `edufun.tour.${id}`
const visible = (sel: string) => [...document.querySelectorAll<HTMLElement>(sel)].find(e => e.offsetParent !== null && e.getBoundingClientRect().width > 0)

/** Parcours de découverte : 3 bulles de Foxy à la toute première visite de l'enfant. */
export default function KidTour({ childId }: { childId: string }) {
  const { pathname } = useLocation()
  const [step, setStep] = useState(-1)
  const [box, setBox] = useState<DOMRect | null>(null)

  useEffect(() => {
    if (pathname !== '/enfant') return
    let done = false
    try { done = localStorage.getItem(key(childId)) === '1' } catch { /* ignoré */ }
    if (!done) { const t = setTimeout(() => setStep(0), 600); return () => clearTimeout(t) }
  }, [childId, pathname])

  useEffect(() => {
    if (step < 0) return
    const k = (e: KeyboardEvent) => { if (e.key === 'Escape') { try { localStorage.setItem(key(childId), '1') } catch { /* ignoré */ } setStep(-1) } }
    window.addEventListener('keydown', k); return () => window.removeEventListener('keydown', k)
  }, [step, childId])

  useEffect(() => {
    document.body.classList.toggle('touring', step >= 0)
    return () => document.body.classList.remove('touring')
  }, [step])

  useLayoutEffect(() => {
    if (step < 0) return
    const measure = () => { const el = visible(STEPS[step].sel); setBox(el ? el.getBoundingClientRect() : null) }
    const el = visible(STEPS[step].sel)
    if (el && !el.closest('.tabbar, .side')) el.scrollIntoView({ block: 'center' })
    requestAnimationFrame(() => requestAnimationFrame(measure))
    window.addEventListener('resize', measure); window.addEventListener('scroll', measure, true)
    return () => { window.removeEventListener('resize', measure); window.removeEventListener('scroll', measure, true) }
  }, [step])

  if (step < 0 || pathname !== '/enfant') return null
  const end = () => {
    try { localStorage.setItem(key(childId), '1') } catch { /* ignoré */ }
    window.dispatchEvent(new Event('edufun-guide-close')); window.scrollTo({ top: 0 })
    setStep(-1)
  }
  const s = STEPS[step]
  const pad = 8
  const vw = window.innerWidth, vh = window.innerHeight
  const below = box ? box.bottom + 190 < vh : true
  const bw = Math.min(320, vw - 24)
  const left = box ? Math.max(12, Math.min(vw - bw - 12, box.left + box.width / 2 - bw / 2)) : (vw - bw) / 2
  const top = box ? (below ? box.bottom + pad + 12 : Math.max(12, box.top - pad - 12 - 170)) : vh / 2 - 90
  return (
    <div className="tour" role="dialog" aria-modal="true" aria-label="Découverte de ton espace">
      {box ? <div className="tour-hole" style={{ left: box.left - pad, top: box.top - pad, width: box.width + pad * 2, height: box.height + pad * 2 }} /> : <div className="tour-dim" />}
      <div className="tour-bubble" style={{ left, top, width: bw }}>
        <div className="row" style={{ gap: 10 }}><img src={`${import.meta.env.BASE_URL}logo.png`} alt="" /><div><b>{s.title}</b><p>{s.text}</p></div></div>
        <div className="tour-nav">
          <span className="tour-dots">{STEPS.map((_, i) => <i key={i} className={i === step ? 'on' : ''} />)}</span>
          <button className="btn quiet sm" onClick={end}>Passer</button>
          <button className="btn sm" autoFocus onClick={() => step < STEPS.length - 1 ? setStep(step + 1) : end()}>{step < STEPS.length - 1 ? <>Suivant <ChevronRight size={16} /></> : 'C’est parti !'}</button>
        </div>
      </div>
    </div>
  )
}
