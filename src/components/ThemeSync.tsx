import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useStore } from '../state/store'

/**
 * Charte selon l'espace : l'interface enfant mûrit avec le niveau (CE1 joueur, CM2 sobre),
 * les espaces parent et enseignant ont un style professionnel.
 */
export default function ThemeSync() {
  const { pathname } = useLocation()
  const { child, account } = useStore()
  const theme = pathname.startsWith('/enfant') && child ? child.grade
    : pathname.startsWith('/parent') || pathname.startsWith('/enseignant') ? 'pro'
    : 'ce1'
  useEffect(() => {
    document.documentElement.dataset.theme = theme
    const color = theme === 'cm2' ? '#1E3A5F' : theme === 'pro' ? '#F5F7FA' : theme === 'cm1' ? '#F4F6F8' : '#FFF9EF'
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', color)
  }, [theme, account?.id])
  return null
}
