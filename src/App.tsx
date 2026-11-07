import { HashRouter, Navigate, Route, Routes } from 'react-router-dom'
import { StoreProvider } from './state/store'
import Landing from './pages/Landing'
import Auth from './pages/Auth'
import Profiles from './pages/Profiles'
import Privacy from './pages/Privacy'
import ParentShell from './pages/parent/ParentShell'
import Dashboard from './pages/parent/Dashboard'
import ChildDetail from './pages/parent/ChildDetail'
import ChildShell from './pages/child/ChildShell'
import ChildHome from './pages/child/ChildHome'
import SubjectPath, { SubjectList } from './pages/child/SubjectPath'
import LessonPlayer from './pages/child/LessonPlayer'
import Games from './pages/child/games/Games'
import Reperes from './pages/child/reperes/Reperes'
import ReperesPlayer from './pages/child/reperes/ReperesPlayer'
import GamePage from './pages/child/games/GamePage'
import Rewards from './pages/child/Rewards'
import Me from './pages/child/Me'
import ThemeSync from './components/ThemeSync'
import RecoveryModal from './components/RecoveryModal'
import GuideBot from './components/GuideBot'
import { ClassSheet, ClassView, TeacherHome, TeacherShell } from './pages/teacher/Teacher'

export default function App() {
  return (
    <StoreProvider>
      <HashRouter>
        <ThemeSync />
        <RecoveryModal />
        <GuideBot />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/connexion" element={<Auth />} />
          <Route path="/inscription" element={<Auth signup />} />
          <Route path="/enseignant/connexion" element={<Auth teacher />} />
          <Route path="/enseignant/inscription" element={<Auth signup teacher />} />
          <Route path="/enseignant" element={<TeacherShell />}>
            <Route index element={<TeacherHome />} />
            <Route path="classe/:id" element={<ClassView />} />
            <Route path="classe/:id/fiche" element={<ClassSheet />} />
          </Route>
          <Route path="/profils" element={<Profiles />} />
          <Route path="/confidentialite" element={<Privacy />} />
          <Route path="/parent" element={<ParentShell />}>
            <Route index element={<Dashboard />} />
            <Route path="enfant/:id" element={<ChildDetail />} />
          </Route>
          <Route path="/enfant" element={<ChildShell />}>
            <Route index element={<ChildHome />} />
            <Route path="matieres" element={<SubjectList />} />
            <Route path="matiere/:sid" element={<SubjectPath />} />
            <Route path="recompenses" element={<Rewards />} />
            <Route path="moi" element={<Me />} />
            <Route path="jeux" element={<Games />} />
            <Route path="reperes" element={<Reperes />} />
          </Route>
          <Route path="/enfant/lecon/:id" element={<LessonPlayer />} />
          <Route path="/enfant/diagnostic" element={<LessonPlayer diagnostic />} />
          <Route path="/enfant/jeux/:gid" element={<GamePage />} />
          <Route path="/enfant/reperes/:phase/:seq" element={<ReperesPlayer />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </HashRouter>
    </StoreProvider>
  )
}
