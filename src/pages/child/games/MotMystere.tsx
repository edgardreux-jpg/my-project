import { useEffect, useState } from 'react'
import { Delete } from 'lucide-react'
import { sfx } from '../../../lib/audio'
import { pick } from '../../../lib/games'
import { MYSTERY } from './words'
import type { GameProps } from './types'

const ROWS = ['AZERTYUIOP', 'QSDFGHJKLM', 'WXCVBN']
type Mark = 'ok' | 'in' | 'no'

function grade(guess: string, word: string): Mark[] {
  const res: Mark[] = Array(word.length).fill('no'), left: Record<string, number> = {}
  for (let i = 0; i < word.length; i++) if (guess[i] === word[i]) res[i] = 'ok'; else left[word[i]] = (left[word[i]] ?? 0) + 1
  for (let i = 0; i < word.length; i++) if (res[i] !== 'ok' && left[guess[i]]) { res[i] = 'in'; left[guess[i]]-- }
  return res
}

export default function MotMystere({ level, sound, onWin, onLose }: GameProps) {
  const [[word, clue]] = useState(() => pick(MYSTERY[level]))
  const L = word.length
  const [rows, setRows] = useState<string[]>([])
  const [cur, setCur] = useState('')
  const [shake, setShake] = useState(false)
  const [over, setOver] = useState(false)
  const keys: Record<string, Mark> = {}
  rows.forEach(r => grade(r, word).forEach((m, i) => { const k = r[i]; if (keys[k] !== 'ok' && !(keys[k] === 'in' && m === 'no')) keys[k] = m }))

  const press = (k: string) => {
    if (over) return
    if (k === '⌫') { setCur(c => c.slice(0, -1)); return }
    if (k === '↵') {
      if (cur.length < L) { setShake(true); sfx('oops', sound); setTimeout(() => setShake(false), 400); return }
      const nr = [...rows, cur]; setRows(nr); setCur('')
      if (cur === word) { setOver(true); sfx('done', sound); setTimeout(() => onWin(nr.length, `Trouvé en ${nr.length} essai${nr.length > 1 ? 's' : ''} : ${word} !`), 900) }
      else if (nr.length >= 6) { setOver(true); sfx('oops', sound); setTimeout(() => onLose?.(`Le mot était ${word}. Tu l’auras la prochaine fois !`), 1100) }
      else sfx('tap', sound)
      return
    }
    if (cur.length < L) { setCur(c => c + k); sfx('tap', sound) }
  }
  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (e.key === 'Enter') press('↵'); else if (e.key === 'Backspace') press('⌫')
      else { const k = e.key.normalize('NFD').replace(/[̀-ͯ]/g, '').toUpperCase(); if (/^[A-Z]$/.test(k)) press(k) }
    }
    window.addEventListener('keydown', h); return () => window.removeEventListener('keydown', h)
  })

  return (
    <div className="g-motm">
      <div className="mw-clue"><small>Indice</small>{clue}<span className="tiny muted"> · {L} lettres</span></div>
      <div className="mw-grid" style={{ ['--L' as string]: L }}>
        {Array.from({ length: 6 }, (_, r) => {
          const g = rows[r], live = r === rows.length
          const marks = g ? grade(g, word) : null
          const txt = g ?? (live ? cur : '')
          return (
            <div key={r} className={`mw-row ${live && shake ? 'shake' : ''}`}>
              {Array.from({ length: L }, (_, i) => <span key={i} className={`mw-c ${marks ? marks[i] : txt[i] ? 'typed' : ''}`} style={marks ? { animationDelay: `${i * 0.12}s` } : undefined}>{txt[i] ?? ''}</span>)}
            </div>
          )
        })}
      </div>
      <div className="mw-legend tiny"><span><i className="ok" /> bien placée</span><span><i className="in" /> mal placée</span><span><i className="no" /> absente</span></div>
      <div className="kb" role="group" aria-label="Clavier">
        {ROWS.map((r, i) => (
          <div key={i} className="kb-r">
            {i === 2 && <button className="kb-k wide" onClick={() => press('↵')}>Valider</button>}
            {[...r].map(k => <button key={k} className={`kb-k ${keys[k] ?? ''}`} onClick={() => press(k)}>{k}</button>)}
            {i === 2 && <button className="kb-k wide" onClick={() => press('⌫')} aria-label="Effacer"><Delete size={18} /></button>}
          </div>
        ))}
      </div>
    </div>
  )
}
