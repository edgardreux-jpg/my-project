import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Ticket, Clock, Lock, Trophy } from 'lucide-react'
import { useStore } from '../../../state/store'
import { FAMILIES, GAMES, gameAccess, gameFor, type Family } from '../../../lib/games'
import { GameIcon } from './GameIcon'

export default function Games() {
  const { child } = useStore()
  useEffect(() => { window.scrollTo(0, 0) }, [])
  if (!child) return null
  const acc = gameAccess(child)
  const g = child.games ?? {}
  const list = GAMES.filter(x => gameFor(x, child.grade))
  return (
    <div className="col gap20 k-page">
      <h1 className="k-hi">Ludothèque</h1>
      {acc.blocked === 'off' ? (
        <div className="lu-banner off"><Lock size={22} /><div><b>La ludothèque est fermée</b><div className="small">Un adulte l’a désactivée pour le moment.</div></div></div>
      ) : (
        <div className={`lu-banner ${acc.blocked ? 'wait' : ''}`}>
          <span className="lu-tk"><Ticket size={22} />{acc.mode === 'free' ? '∞' : acc.tickets}</span>
          <div className="grow">
            {acc.mode === 'free' ? <b>Parties illimitées aujourd’hui</b>
              : acc.blocked === 'tickets' ? <><b>Plus de partie pour l’instant</b><div className="small">Termine une leçon pour gagner une nouvelle partie.</div></>
              : <><b>{acc.tickets} partie{acc.tickets > 1 ? 's' : ''} disponible{acc.tickets > 1 ? 's' : ''}</b><div className="small">Chaque leçon terminée t’en fait gagner une de plus.</div></>}
            {acc.blocked === 'time' && <div className="small"><b>Le temps de jeu du jour est écoulé.</b> À demain !</div>}
          </div>
          {acc.minutesLeft != null && acc.blocked !== 'time' && <span className="lu-time"><Clock size={16} /> {acc.minutesLeft} min</span>}
          {acc.blocked === 'tickets' && <Link className="btn sm" to="/enfant">Faire une leçon</Link>}
        </div>
      )}
      {(Object.keys(FAMILIES) as Family[]).map(f => {
        const games = list.filter(x => x.family === f)
        if (!games.length) return null
        const F = FAMILIES[f]
        return (
          <section key={f} style={{ ['--fc' as string]: F.color, ['--fs' as string]: F.soft }}>
            <h3 className="k-h3 lu-fam"><i />{F.name}<small>{F.blurb}</small></h3>
            <div className="lu-grid">
              {games.map(x => {
                const best = g.best?.[x.id], wins = g.wins?.[x.id] ?? 0
                const off = acc.blocked === 'off'
                return (
                  <Link key={x.id} to={off ? '#' : `/enfant/jeux/${x.id}`} className={`lu-card ${off ? 'off' : ''}`} style={{ ['--gc' as string]: x.color }} aria-disabled={off} onClick={e => { if (off) e.preventDefault() }}>
                    <span className="lu-ic"><GameIcon id={x.id} /></span>
                    <b>{x.title}</b>
                    <small>{x.blurb}</small>
                    {(wins > 0 || best != null) && <span className="lu-best"><Trophy size={13} /> {best != null && x.unit ? `Record : ${x.unit === 's' ? `${Math.floor(best / 60)}:${String(best % 60).padStart(2, '0')}` : `${best} ${x.unit}`}` : `${wins} victoire${wins > 1 ? 's' : ''}`}</span>}
                  </Link>
                )
              })}
            </div>
          </section>
        )
      })}
    </div>
  )
}
