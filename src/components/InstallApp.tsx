import { useEffect, useState } from 'react'
import { Download, Share, X } from 'lucide-react'

type BIP = Event & { prompt: () => Promise<void>; userChoice: Promise<{ outcome: string }> }
let deferred: BIP | null = null
if (typeof window !== 'undefined') window.addEventListener('beforeinstallprompt', e => { e.preventDefault(); deferred = e as BIP; window.dispatchEvent(new Event('edufun-installable')) })

const standalone = () => typeof window !== 'undefined' && (window.matchMedia('(display-mode: standalone)').matches || (navigator as any).standalone === true)
const ios = () => typeof navigator !== 'undefined' && /iphone|ipad|ipod/i.test(navigator.userAgent)
const KEY = 'edufun.install.hide'

/** Encart « Installer Shukudai » : bouton natif sur Android/ordinateur, mode d'emploi sur iPhone. */
export default function InstallApp() {
  const [can, setCan] = useState(!!deferred)
  const [hide, setHide] = useState(() => { try { return localStorage.getItem(KEY) === '1' } catch { return false } })
  useEffect(() => { const on = () => setCan(true); window.addEventListener('edufun-installable', on); return () => window.removeEventListener('edufun-installable', on) }, [])
  if (hide || standalone() || (!can && !ios())) return null
  const close = () => { setHide(true); try { localStorage.setItem(KEY, '1') } catch { /* ignoré */ } }
  return (
    <section className="card install">
      <img src={`${import.meta.env.BASE_URL}icon-192.png`} alt="" />
      <div className="grow">
        <b>Installez Shukudai sur votre téléphone</b>
        {can ? <p className="small muted">Une icône renard sur l’écran d’accueil, comme une vraie application.</p>
          : <p className="small muted">Sur iPhone : touchez <Share size={14} style={{ verticalAlign: '-2px' }} /> <b>Partager</b>, puis <b>« Sur l’écran d’accueil »</b>.</p>}
      </div>
      {can && <button className="btn sm" onClick={async () => { await deferred?.prompt(); const r = await deferred?.userChoice; deferred = null; setCan(false); if (r?.outcome === 'accepted') close() }}><Download size={16} /> Installer</button>}
      <button className="iconbtn" aria-label="Masquer" onClick={close}><X size={18} /></button>
    </section>
  )
}
