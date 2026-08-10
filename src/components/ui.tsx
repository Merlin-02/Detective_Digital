import type { ReactNode } from 'react'
import type { Categoria, Dificultad, TipoContenido } from '../types'
import { useI18n } from '../i18n'

export function Card({
  children,
  className = '',
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div
      className={`rounded-3xl border glass-border glass shadow-[0_8px_32px_rgba(0,0,0,0.35)] transition-transform duration-300 hover:-translate-y-1 ${className}`}
    >
      {children}
    </div>
  )
}

export function Chip({
  children,
  className = '',
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium ${className}`}
    >
      {children}
    </span>
  )
}

const CAT_COLOR: Record<Categoria, string> = {
  politica: 'bg-rose-950 text-rose-300',
  salud: 'bg-emerald-950 text-emerald-300',
  entretenimiento: 'bg-amber-950 text-amber-400',
  ciencia: 'bg-sky-950 text-sky-300',
  ia: 'bg-fuchsia-950 text-fuchsia-300',
  deporte: 'bg-orange-950 text-orange-300',
  economia: 'bg-teal-950 text-teal-300',
}

export function CategoriaChip({ categoria }: { categoria: Categoria }) {
  const { t } = useI18n()
  return <Chip className={CAT_COLOR[categoria]}>{t(`profile.category.${categoria}`)}</Chip>
}

export function DificultadChip({ dificultad }: { dificultad: Dificultad }) {
  return (
    <Chip className="border border-slate-700 bg-slate-800 text-slate-300">
      {'★'.repeat(dificultad)}
      <span className="sr-only">dificultad {dificultad}/4</span>
    </Chip>
  )
}

export function TipoChip({ tipo }: { tipo: TipoContenido }) {
  const { t } = useI18n()
  return (
    <Chip className="border border-indigo-800 bg-indigo-950 text-indigo-300">
      {t(`profile.type.${tipo}`)}
    </Chip>
  )
}

export function Progreso({ valor, max = 100, className = '' }: { valor: number; max?: number; className?: string }) {
  const pct = Math.min(100, Math.round((valor / max) * 100))
  return (
    <div className={`h-2.5 w-full overflow-hidden rounded-full bg-slate-800 ${className}`} role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100}>
      <div className="h-full rounded-full bg-indigo-300 transition-all" style={{ width: `${pct}%` }} />
    </div>
  )
}

export function BarraLinea({ valor, color }: { valor: number; color: string }) {
  return (
    <div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-800" title={`${valor}`}>
      <div className={`h-full rounded-full ${color}`} style={{ width: `${Math.min(100, valor)}%` }} />
    </div>
  )
}

export function Vacio({ icono, titulo, texto, action }: { icono?: ReactNode; titulo: string; texto: string; action?: ReactNode }) {
  return (
    <Card className="border-dashed p-8 text-center">
      <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-indigo-950 text-indigo-300">
        {icono ?? (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="7" />
            <path d="M16 16l4 4" strokeLinecap="round" />
          </svg>
        )}
      </div>
      <h3 className="text-lg font-semibold text-slate-100">{titulo}</h3>
      <p className="mx-auto mt-1 max-w-md text-sm text-slate-400">{texto}</p>
      {action && <div className="mt-4 flex justify-center gap-2">{action}</div>}
    </Card>
  )
}