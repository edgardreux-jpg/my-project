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
          <p>EDUFUN ne demande qu’un prénom ou un pseudo, une classe et un code secret. Pas de nom de famille, pas de photo, pas de publicité, pas de suivi à des fins commerciales.</p>
          <p>Le compte, les profils et la progression sont enregistrés sur un serveur sécurisé (Supabase), pour être retrouvés sur tous vos appareils. Seul le compte parent y a accès, ainsi que l’enseignant d’une classe que le parent a rejointe. Vous pouvez exporter ou supprimer le profil d’un enfant depuis l’espace parent. La démonstration, elle, reste dans le navigateur de l’appareil.</p>
          <p>Le mot de passe est géré par le service de connexion et n’est jamais stocké en clair. Le code parent à 4 chiffres est enregistré sous forme d’empreinte (SHA-256 salée).</p></div>
        <div className="card col"><h3>Classes et enseignants</h3>
          <p>Un enfant n’est rattaché à une classe que si son parent saisit le code donné par l’enseignant. L’enseignant voit alors le pseudo, le niveau et la progression de l’enfant (temps passé, réussite, leçons, notions à consolider), jamais son code secret ni les données des autres enfants de la famille. Le parent peut quitter la classe à tout moment depuis la fiche de l’enfant ; l’enseignant peut aussi retirer un élève ou supprimer la classe.</p></div>
        <div className="card col"><h3>Un usage sain</h3>
          <p>Les points gagnés par jour sont plafonnés, un rappel de pause est proposé, et aucune notification ne pousse l’enfant à revenir. Les séries disposent de gels pour ne pas pénaliser une absence.</p></div>
        <div className="card col"><h3>Programmes officiels</h3>
          <p>Les leçons s’appuient sur les programmes de l’école élémentaire publiés par l’Éducation nationale. EDUFUN est un complément ludique et ne remplace pas l’enseignement de l’école ni une évaluation officielle.</p>
          <ul>{Object.values(SOURCES).map(s => <li key={s.url}><a href={s.url} target="_blank" rel="noreferrer">{s.title}</a></li>)}</ul></div>
      </div></main>
    </div>
  )
}
