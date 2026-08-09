import { lazy, Suspense, useEffect } from 'react'
import { Routes, Route, useLocation, Navigate } from 'react-router-dom'
import { Navbar } from './components/Navbar'
import { Footer } from './components/Footer'
import { Home } from './pages/Home'
import { Jugar } from './pages/Jugar'
import { Caso } from './pages/Caso'
import { Multijugador } from './pages/Multijugador'
import { useCasos } from './stores/useCasos'

const Perfil = lazy(() => import('./pages/Perfil').then((m) => ({ default: m.Perfil })))
const Comunidad = lazy(() => import('./pages/Comunidad').then((m) => ({ default: m.Comunidad })))

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

export default function App() {
  useEffect(() => {
    void useCasos.getState().cargar()
  }, [])

  return (
    <div className="flex min-h-screen flex-col">
      <ScrollToTop />
      <Navbar />
      <main id="contenido" className="flex-1">
        <Suspense
          fallback={
            <div className="flex min-h-60 items-center justify-center text-slate-400">…</div>
          }
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/jugar" element={<Jugar />} />
            <Route path="/multijugador" element={<Multijugador />} />
            <Route path="/caso/:id" element={<Caso />} />
            <Route path="/perfil" element={<Perfil />} />
            <Route path="/comunidad" element={<Comunidad />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </div>
  )
}