/* oxlint-disable react/only-export-components */
import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { es } from './es'
import { en } from './en'
import { pt } from './pt'

export type Lang = 'es' | 'en' | 'pt'

const dicts: Record<Lang, Record<string, string>> = { es, en, pt }

interface I18nValue {
  lang: Lang
  setLang: (l: Lang) => void
  t: (key: string, vars?: Record<string, string | number>) => string
}

const I18nContext = createContext<I18nValue>({
  lang: 'es',
  setLang: () => {},
  t: (k) => k,
})

function interpolate(text: string, vars?: Record<string, string | number>) {
  if (!vars) return text
  return text.replace(/\{(\w+)\}/g, (_, k) => String(vars[k] ?? `{${k}}`))
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => {
    try {
      const saved = localStorage.getItem('dd.lang')
      return saved === 'en' || saved === 'pt' ? saved : 'es'
    } catch {
      return 'es'
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem('dd.lang', lang)
    } catch {
      /* noop */
    }
    document.documentElement.lang = lang
  }, [lang])

  const setLang = (l: Lang) => setLangState(l)

  const t = (key: string, vars?: Record<string, string | number>) =>
    interpolate(dicts[lang][key] ?? dicts.es[key] ?? key, vars)

  return (
    <I18nContext.Provider value={{ lang, setLang, t }}>{children}</I18nContext.Provider>
  )
}

export function useI18n() {
  return useContext(I18nContext)
}