import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useI18n, type Lang } from '../i18n'

const LINKS = [
  { to: '/', key: 'nav.home', end: true },
  { to: '/jugar', key: 'nav.play', end: true },
  { to: '/multijugador', key: 'nav.mult', end: true },
  { to: '/perfil', key: 'nav.profile', end: true },
  { to: '/comunidad', key: 'nav.community', end: true },
]

type Tema = 'light' | 'dark'

function IconoLupa() {
  return (
    <svg width="26" height="26" viewBox="0 0 64 64" aria-hidden="true">
      <rect width="64" height="64" rx="14" fill="currentColor" opacity="0.9" />
      <circle cx="26" cy="30" r="8.5" fill="none" stroke="#fff" strokeWidth="3" />
      <path d="M32 36l6 6" stroke="#fff" strokeWidth="5" strokeLinecap="round" />
      <rect x="40" y="18" width="10" height="16" rx="2" fill="#fbbf24" />
      <path d="M45 22 v6" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" />
      <circle cx="45" cy="30.4" r="1.3" fill="#fff" />
    </svg>
  )
}

function temaInicial(): Tema {
  const guardado = localStorage.getItem('mediamind-theme')
  if (guardado === 'light' || guardado === 'dark') return guardado
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export function Navbar() {
  const { t, lang, setLang } = useI18n()
  const [tema, setTema] = useState<Tema>(temaInicial)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', tema === 'dark')
    localStorage.setItem('mediamind-theme', tema)
  }, [tema])

  return (
    <header className="sticky top-0 z-40 border-b glass-border glass-soft">
      <a href="#contenido" className="sr-only focus:not-sr-only focus:absolute focus:left-2 focus:top-2 focus:z-50 focus:rounded focus:bg-indigo-300 focus:px-3 focus:py-1 focus:text-black">
        {t('nav.skipto')}
      </a>
      <nav aria-label={t('nav.nav')} className="mx-auto flex max-w-6xl items-center gap-2 px-4 py-3 sm:gap-4">
        <Link to="/" className="flex items-center gap-2 text-indigo-950 dark:text-indigo-300">
          <IconoLupa />
          <span className="hidden font-bold tracking-tight sm:block">{t('nav.logoName')}</span>
        </Link>

        <div className="flex flex-1 items-center gap-1 overflow-x-auto whitespace-nowrap md:justify-center md:gap-2">
          {LINKS.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.end}
              className={({ isActive }) =>
                `rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-indigo-300 text-black'
                    : 'text-slate-500 hover:bg-black/10 hover:text-indigo-600 dark:text-slate-300 dark:hover:bg-white/10 dark:hover:text-indigo-300'
                }`
              }
            >
              {t(l.key)}
            </NavLink>
          ))}
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            onClick={() => setTema(tema === 'dark' ? 'light' : 'dark')}
            aria-label={tema === 'dark' ? 'Activar tema claro' : 'Activar tema oscuro'}
            className="rounded-lg border glass-border glass px-2.5 py-1.5 text-slate-600 transition-colors hover:bg-black/10 dark:text-slate-300 dark:hover:bg-white/10"
          >
            {tema === 'dark' ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2m0 16v2M4.9 4.9l1.4 1.4m11.4 11.4l1.4 1.4M2 12h2m16 0h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" strokeLinecap="round" />
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" strokeLinejoin="round" />
              </svg>
            )}
          </button>
          <select
            aria-label="Idioma / Language"
            value={lang}
            onChange={(e) => setLang(e.target.value as Lang)}
            className="rounded-lg border glass-border glass px-2 py-1.5 text-sm text-slate-600 dark:text-slate-200"
          >
            <option value="es">ES</option>
            <option value="en">EN</option>
            <option value="pt">PT</option>
          </select>
        </div>
      </nav>
    </header>
  )
}