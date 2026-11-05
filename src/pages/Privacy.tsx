import { Link } from 'react-router-dom'
import { Logo } from '../components/common'
import { SOURCES } from '../lib/curriculum'

export default function Privacy() {
  return (
    <div>
      <header className="top"><div className="in"><Logo /><div className="grow" /><Link className="btn ghost sm" to="/">Retour</Link></div></header>
      <main className="section"><div className="in col gap20" style={{ maxWidth: 760 }}>
        <h1 className="h-lg">Confidentialité et programmes</h1>
        <div className="card col"><h3>Les données de vos enfants</h3>
          <p>Pépite ne demande qu’un prénom ou un pseudo, une classe et un code secret. Pas de nom de famille, pas de photo, pas de publicité, pas de suivi à des fins commerciales.</p>
          <p>Dans cette version, toutes les données (compte, profils, progression) sont enregistrées dans le navigateur de cet appareil. Elles ne sont envoyées nulle part. Vous pouvez exporter ou supprimer le profil d’un enfant depuis l’espace parent.</p>
          <p>Le mot de passe parent est transformé par une empreinte (SHA-256 salée) avant d’être enregistré sur l’appareil. Un hébergement avec synchronisation entre appareils est prévu : il fera l’objet d’une information claire avant toute activation.</p></div>
        <div className="card col"><h3>Un usage sain</h3>
          <p>L’XP quotidien est plafonné, un rappel de pause est proposé, et aucune notification ne pousse l’enfant à revenir. Les séries disposent de gels pour ne pas pénaliser une absence.</p></div>
        <div className="card col"><h3>Programmes officiels</h3>
          <p>Les leçons s’appuient sur les programmes de l’école élémentaire publiés par l’Éducation nationale. Pépite est un complément ludique et ne remplace pas l’enseignement de l’école ni une évaluation officielle.</p>
          <ul>{Object.values(SOURCES).map(s => <li key={s.url}><a href={s.url} target="_blank" rel="noreferrer">{s.title}</a></li>)}</ul></div>
      </div></main>
    </div>
  )
}
