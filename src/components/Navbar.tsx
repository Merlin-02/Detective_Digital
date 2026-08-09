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

export function Navbar() {
  const { t, lang, setLang } = useI18n()
  const [dark, setDark] = useState(false)

  useEffect(() => {
    const el = document.documentElement
    const saved = localStorage.getItem('dd.theme')
    const preferred = window.matchMedia('(prefers-color-scheme: dark)').matches
    const initial = saved ? saved === 'dark' : preferred
    setDark(initial)
    el.classList.toggle('dark', initial)
  }, [])

  const toggleTheme = () => {
    const next = !dark
    setDark(next)
    document.documentElement.classList.toggle('dark', next)
    localStorage.setItem('dd.theme', next ? 'dark' : 'light')
  }

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/80 backdrop-blur dark:border-slate-800 dark:bg-slate-950/80">
      <a href="#contenido" className="sr-only focus:not-sr-only focus:absolute focus:left-2 focus:top-2 focus:z-50 focus:rounded focus:bg-indigo-600 focus:px-3 focus:py-1 focus:text-white">
        {t('nav.skipto')}
      </a>
      <nav aria-label={t('nav.nav')} className="mx-auto flex max-w-6xl items-center gap-2 px-4 py-3 sm:gap-4">
        <Link to="/" className="flex items-center gap-2 text-slate-900 dark:text-white">
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
                    ? 'bg-indigo-600 text-white'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white'
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
            onClick={toggleTheme}
            aria-label={dark ? 'Modo claro' : 'Modo oscuro'}
            className="rounded-lg border border-slate-300 p-2 text-slate-600 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
          >
            {dark ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="5" />
                <path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M19.1 4.9l-1.4 1.4M6.3 17.7l-1.4 1.4" strokeLinecap="round" />
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" strokeLinejoin="round" />
              </svg>
            )}
          </button>

          <select
            aria-label="Idioma / Language"
            value={lang}
            onChange={(e) => setLang(e.target.value as Lang)}
            className="rounded-lg border border-slate-300 bg-white px-2 py-1.5 text-sm text-slate-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
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