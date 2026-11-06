import { useEffect, useMemo, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { useStore } from '../state/store'
import { hiddenOn, tipsFor } from '../lib/guide'

const SEEN = 'edufun.guide.seen'
const MUTE = 'edufun.guide.auto'
const read = (k: string) => { try { return localStorage.getItem(k) } catch { return null } }
const write = (k: string, v: string) => { try { localStorage.setItem(k, v) } catch { /* ignore */ } }

/** Foxy, le renard guide : un bouton flottant en bas à droite qui explique chaque page. */
export default function GuideBot() {
  const { pathname } = useLocation()
  const { account, mode } = useStore()
  const tips = useMemo(() => tipsFor(pathname, (account?.children.length ?? 0) > 0), [pathname, account?.children.length])
  const [open, setOpen] = useState(false)
  const [i, setI] = useState(0)
  const [auto, setAuto] = useState(read(MUTE) !== 'off')
  const kid = pathname.startsWith('/enfant') && mode === 'child'
  const key = pathname.replace(/\/[0-9a-f-]{8,}$/i, '/:id')

  // À la première visite d'une page, Foxy se présente tout seul
  useEffect(() => {
    setI(0)
    if (hiddenOn(pathname)) { setOpen(false); return }
    const seen = new Set((read(SEEN) ?? '').split('|').filter(Boolean))
    if (auto && !seen.has(key)) {
      seen.add(key); write(SEEN, [...seen].join('|'))
      const t = setTimeout(() => setOpen(true), 700)
      return () => clearTimeout(t)
    }
    setOpen(false)
  }, [key])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  if (hiddenOn(pathname)) return null
  const tip = tips[Math.min(i, tips.length - 1)]

  return (
    <div className={`guide ${kid ? 'kid' : ''}`}>
      {open && (
        <div className="guide-bubble" role="dialog" aria-label="Foxy, ton guide" aria-live="polite">
          <button className="guide-x" aria-label="Fermer" onClick={() => setOpen(false)}><X size={18} /></button>
          <b className="guide-t">{tip.title}</b>
          <p className="guide-p">{tip.text}</p>
          <div className="guide-nav">
            <span className="grow" />
            {tips.length > 1 && <>
              <button className="guide-ic" aria-label="Bulle précédente" disabled={i === 0} onClick={() => setI(i - 1)}><ChevronLeft size={18} /></button>
              <span className="guide-n">{i + 1}/{tips.length}</span>
              {i < tips.length - 1
                ? <button className="guide-next" onClick={() => setI(i + 1)}>{kid ? 'Et après ?' : 'Et ensuite ?'} <ChevronRight size={16} /></button>
                : <button className="guide-next" onClick={() => setOpen(false)}>{kid ? 'Compris !' : 'Merci'}</button>}
            </>}
            {tips.length === 1 && <button className="guide-next" onClick={() => setOpen(false)}>{kid ? 'Compris !' : 'Merci'}</button>}
          </div>
          <label className="guide-auto"><input type="checkbox" checked={auto} onChange={e => { setAuto(e.target.checked); write(MUTE, e.target.checked ? 'on' : 'off') }} /> {kid ? 'Foxy apparaît tout seul sur les nouvelles pages' : 'M’afficher automatiquement sur les nouvelles pages'}</label>
        </div>
      )}
      <button className={`guide-btn ${open ? 'on' : ''}`} aria-label={open ? 'Fermer l’aide de Foxy' : 'Ouvrir l’aide de Foxy'} aria-expanded={open}
        onClick={() => setOpen(o => !o)}>
        <img src={`${import.meta.env.BASE_URL}logo.png`} alt="" />
        {!open && <span className="guide-dot" aria-hidden="true">?</span>}
      </button>
    </div>
  )
}
