import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useI18n } from '../i18n'
import { CASOS, CASOS_EQUIPO } from '../data/casos'
import { useGame } from '../stores/useGame'
import { useCasos } from '../stores/useCasos'
import { dificultadDesbloqueada } from '../services/label'
import type { Categoria, Caso } from '../types'
import { Card, CategoriaChip, DificultadChip, TipoChip, Progreso, Chip } from '../components/ui'

function CasoCard({ caso, desbloqueado }: { caso: Caso; desbloqueado: boolean }) {
  const { t } = useI18n()
  return (
    <Link
      to={desbloqueado ? `/caso/${caso.id}` : '#caso-bloqueado'}
      aria-disabled={!desbloqueado}
      onClick={(e) => {
        if (!desbloqueado) e.preventDefault()
      }}
      className={`group relative flex flex-col rounded-2xl border p-5 transition-all ${
        desbloqueado
          ? 'border-slate-200 bg-white hover:-translate-y-0.5 hover:border-indigo-400 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900'
          : 'cursor-not-allowed border-dashed border-slate-300 bg-slate-50 opacity-70 dark:border-slate-700 dark:bg-slate-900/60'
      }`}
    >
      <div className="flex flex-wrap items-center gap-1.5">
        <CategoriaChip categoria={caso.categoria} />
        <TipoChip tipo={caso.tipoContenido} />
        <DificultadChip dificultad={caso.dificultad} />
        {caso.creado === 'web' && (
          <Chip className="border border-indigo-200 bg-indigo-50 text-indigo-700 dark:border-indigo-900 dark:bg-indigo-950 dark:text-indigo-300">
            {t('case.webBadge')}
          </Chip>
        )}
        {caso.creado === 'comunidad' && (
          <Chip className="border border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-900 dark:bg-amber-950 dark:text-amber-300">
            {t('case.communityBadge')}
          </Chip>
        )}
      </div>
      <h3 className="mt-3 text-base font-bold leading-snug text-slate-800 dark:text-slate-100">{caso.titulo}</h3>
      <p className="mt-1 line-clamp-3 flex-1 text-sm text-slate-500 dark:text-slate-400">{caso.escenario}</p>
      <div className="mt-4">
        {desbloqueado ? (
          <span className="rounded-lg bg-indigo-50 px-3 py-1.5 text-sm font-semibold text-indigo-700 group-hover:bg-indigo-600 group-hover:text-white">
            {t('app.check')}
          </span>
        ) : (
          <span className="inline-flex items-center gap-1 rounded-lg bg-slate-200 px-3 py-1.5 text-sm font-semibold text-slate-500 dark:bg-slate-800 dark:text-slate-400">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="4" y="10" width="16" height="10" rx="2" />
              <path d="M8 10V7a4 4 0 1 1 8 0v3" />
            </svg>
            {t('case.locked')}
          </span>
        )}
      </div>
    </Link>
  )
}

function ModoLista({
  titulo,
  desc,
  casos,
  dificultadMax,
}: {
  titulo: string
  desc: string
  casos: Caso[]
  dificultadMax: number
}) {
  return (
    <section className="mt-12">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black tracking-tight">{titulo}</h2>
          <p className="mt-1 max-w-2xl text-slate-600 dark:text-slate-300">{desc}</p>
        </div>
      </div>
      <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {casos.map((c) => (
          <CasoCard key={c.id} caso={c} desbloqueado={c.dificultad <= dificultadMax} />
        ))}
      </div>
    </section>
  )
}

export function Jugar() {
  const { t } = useI18n()
  const respuestas = useGame((s) => s.respuestas)
  const casosWeb = useCasos((s) => s.web)
  const dificultadMax = dificultadDesbloqueada(respuestas)
  const [filtro, setFiltro] = useState<Categoria | 'all'>('all')

  const aciertos = useMemo(() => respuestas.filter((r) => r.correcto).length, [respuestas])
  const precision = respuestas.length ? Math.round((aciertos / respuestas.length) * 100) : 0

  const todosIndividuales = useMemo(() => [...CASOS, ...casosWeb], [casosWeb])
  const individuales = filtro === 'all' ? todosIndividuales : todosIndividuales.filter((c) => c.categoria === filtro)
  const equipo = filtro === 'all' ? CASOS_EQUIPO : CASOS_EQUIPO.filter((c) => c.categoria === filtro)

  const categorias: (Categoria | 'all')[] = ['all', 'politica', 'salud', 'entretenimiento', 'ciencia', 'ia', 'deporte', 'economia']

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-4xl font-black tracking-tight">{t('play.title')}</h1>
          <p className="mt-2 max-w-2xl text-slate-600 dark:text-slate-300">{t('play.subtitle')}</p>
        </div>
        <Card className="flex items-center gap-6 px-5 py-3">
          <div className="text-center">
            <p className="text-2xl font-black tabular-nums">{respuestas.length}</p>
            <p className="text-xs text-slate-500">{t('profile.casesResolved')}</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-black tabular-nums">{precision}%</p>
            <p className="text-xs text-slate-500">{t('play.averageAccuracy')}</p>
          </div>
        </Card>
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-2">
        <span className="text-sm font-semibold text-slate-500 dark:text-slate-400">{t('play.filter')}</span>
        {categorias.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setFiltro(c)}
            className={`rounded-full px-3 py-1 text-sm font-medium transition-colors ${
              filtro === c
                ? 'bg-indigo-600 text-white'
                : 'border border-slate-300 bg-white text-slate-600 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300'
            }`}
          >
            {c === 'all' ? t('play.all') : t(`profile.category.${c}`)}
          </button>
        ))}
      </div>

      <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">{t('play.tip')}</p>
      {casosWeb.length > 0 && (
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{t('play.webNote')}</p>
      )}

      <ModoLista
        titulo={t('play.mode.soloTitle')}
        desc={t('play.mode.soloDesc')}
        casos={individuales}
        dificultadMax={dificultadMax}
      />

      <ModoLista
        titulo={t('play.mode.teamTitle')}
        desc={t('play.mode.teamDesc')}
        casos={equipo}
        dificultadMax={dificultadMax}
      />

      {dificultadMax < 4 && (
        <Card className="mt-10 p-4">
          <div className="flex flex-wrap items-center gap-4">
            <div className="min-w-40 flex-1">
              <p className="text-sm font-semibold">
                {t('profile.level')}:{' '}
                <span className="text-indigo-600 dark:text-indigo-400">{t(`profile.nivel_${dificultadMax - 1}`)}</span>
              </p>
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{t('case.lockedHint')}</p>
            </div>
            <Progreso valor={dificultadMax} max={4} className="max-w-xs" />
          </div>
        </Card>
      )}
    </div>
  )
}