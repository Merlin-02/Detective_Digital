import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { useI18n } from '../i18n'
import { useGame } from '../stores/useGame'
import { useCasos } from '../stores/useCasos'
import { CASOS } from '../data/casos'
import { calcularEtiqueta, generarRecomendaciones, NIVELES } from '../services/label'
import { Etiqueta } from '../components/Etiqueta'
import { Card, Chip, Progreso, Vacio, BarraLinea } from '../components/ui'
import type { Etiqueta as EtiquetaType } from '../types'
import {
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts'

export function Perfil() {
  const { t } = useI18n()
  const { respuestas, cargarEjemplo, reset } = useGame()
  const casosWeb = useCasos((s) => s.web)

  const etiqueta: EtiquetaType = useMemo(() => calcularEtiqueta(respuestas), [respuestas])
  const equipoRespuestas = useMemo(() => respuestas.filter((r) => r.modo === 'equipo'), [respuestas])
  const etiquetaEquipo: EtiquetaType | null = useMemo(
    () => (equipoRespuestas.length ? calcularEtiqueta(equipoRespuestas) : null),
    [equipoRespuestas],
  )
  const todosLosCasos = useMemo(() => [...CASOS, ...casosWeb], [casosWeb])
  const recomendaciones = useMemo(
    () => generarRecomendaciones(respuestas, etiqueta, todosLosCasos),
    [respuestas, etiqueta, todosLosCasos],
  )

  const radar = useMemo(
    () => [
      { eje: t('profile.precisionTitle'), valor: etiqueta.precisionCritica },
      { eje: t('profile.diversityTitle'), valor: etiqueta.diversidadFuentes },
      { eje: t('profile.balanceTitle'), valor: etiqueta.balanceTematico },
      { eje: t('profile.consumptionTitle'), valor: etiqueta.consumoInformacional },
    ],
    [etiqueta, t],
  )

  const evolucion = useMemo(() => {
    const ordenado = [...respuestas].sort((a, b) => a.fecha.localeCompare(b.fecha))
    let aciertos = 0
    return ordenado.map((r, i) => {
      if (r.correcto) aciertos += 1
      return {
        partida: i + 1,
        pct: Math.round((aciertos / (i + 1)) * 100),
      }
    })
  }, [respuestas])

  const siguienteNivel = NIVELES.find((n) => n.minimo > etiqueta.nivel.minimo)

  if (respuestas.length === 0) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-10">
        <h2 className="text-3xl font-black">{t('profile.title')}</h2>
        <p className="mt-3 text-slate-600 dark:text-slate-300">{t('profile.subtitle')}</p>
        <div className="mt-6">
          <Vacio
            titulo={t('profile.empty.title')}
            texto={t('profile.empty.desc')}
            action={
              <>
                <button
                  type="button"
                  onClick={cargarEjemplo}
                  className="rounded-xl bg-indigo-600 px-5 py-2.5 font-semibold text-white hover:bg-indigo-500"
                >
                  {t('profile.demo.cta')}
                </button>
                <Link
                  to="/jugar"
                  className="rounded-xl border border-slate-300 bg-white px-5 py-2.5 font-semibold text-slate-700 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-200"
                >
                  {t('home.ctaPlay')}
                </Link>
              </>
            }
          />
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black">{t('profile.title')}</h2>
          <p className="mt-2 max-w-2xl text-slate-600 dark:text-slate-300">{t('profile.subtitle')}</p>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={cargarEjemplo}
            className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm font-semibold text-slate-600 hover:bg-slate-100 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-300"
          >
            {t('profile.demo.cta')}
          </button>
          <button
            type="button"
            onClick={reset}
            className="rounded-lg border border-rose-300 bg-white px-3 py-1.5 text-sm font-semibold text-rose-600 hover:bg-rose-50 dark:border-rose-800 dark:bg-slate-900 dark:text-rose-400"
          >
            {t('profile.reset')}
          </button>
        </div>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <div className="space-y-4">
            <Etiqueta etiqueta={etiqueta} />
            {etiquetaEquipo && <Etiqueta etiqueta={etiquetaEquipo} equipo />}
            <Card className="p-4">
              <div className="flex items-center justify-between">
                <span className="font-bold">{t('profile.level')}</span>
                <Chip className="bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300">
                  {t(`profile.nivel_${etiqueta.nivel.indice}`)}
                </Chip>
              </div>
              <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
                {etiqueta.puntos} {t('app.points')} · {etiqueta.casosResueltos} {t('profile.casesResolved')}
              </p>
              {siguienteNivel && (
                <div className="mt-3">
                  <Progreso
                    valor={etiqueta.puntos - etiqueta.nivel.minimo}
                    max={siguienteNivel.minimo - etiqueta.nivel.minimo}
                  />
                  <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
                    {siguienteNivel.minimo - etiqueta.puntos} {t('app.points')} {t('profile.morePoints')}{' '}
                    {t(`profile.nivel_${siguienteNivel.indice}`)}
                  </p>
                </div>
              )}
            </Card>

            <Card className="p-4">
              <h3 className="font-bold">{t('profile.recommendationsTitle')}</h3>
              <ul className="mt-3 space-y-3">
                {recomendaciones.map((r) => (
                  <li key={r.id}>
                    <Link
                      to={r.casoId ? `/caso/${r.casoId}` : r.href ?? '/jugar'}
                      className="block rounded-xl border border-slate-200 p-3 text-sm hover:border-indigo-400 dark:border-slate-700"
                    >
                      <span className="font-semibold text-indigo-600 dark:text-indigo-400">{t(r.titulo)}</span>
                      <span className="mt-1 block text-slate-500 dark:text-slate-400">{t(r.descripcion)}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </div>

        <div className="space-y-6 lg:col-span-7">
          <Card className="p-5">
            <h2 className="font-bold">{t('profile.radarTitle')}</h2>
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={radar} cx="50%" cy="50%" outerRadius="78%">
                  <PolarGrid strokeDasharray="3 3" />
                  <PolarAngleAxis dataKey="eje" tick={{ fontSize: 12, fill: '#94a3b8' }} />
                  <PolarRadiusAxis domain={[0, 100]} tick={false} axisLine={false} />
                  <Radar dataKey="valor" stroke="#0077d4" fill="#0077d4" fillOpacity={0.45} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card className="p-5">
            <h2 className="font-bold">{t('profile.compared')}</h2>
            {evolucion.length > 1 ? (
              <div className="mt-4 h-56 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={evolucion} margin={{ top: 8, right: 16, left: -18, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="partida" tick={{ fontSize: 11 }} stroke="#94a3b8" />
                    <YAxis domain={[0, 100]} tick={{ fontSize: 11 }} stroke="#94a3b8" />
                    <Tooltip />
                    <Line type="monotone" dataKey="pct" name="%" stroke="#10b981" strokeWidth={2} dot={{ r: 3 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">{evolucion.length} {t('app.of')} 1</p>
            )}
          </Card>

          <Card className="p-5">
            <h2 className="font-bold">{t('profile.barsTitle')}</h2>
            <div className="mt-4 grid gap-6 sm:grid-cols-2">
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wide text-slate-500">{t('profile.byCategory')}</h3>
                <ul className="mt-2 space-y-2.5">
                  {Object.entries(etiqueta.porCategoria).map(([cat, valor]) => (
                    <li key={cat} className="flex items-center gap-2 text-sm">
                      <span className="w-24 shrink-0 truncate">{t(`profile.category.${cat}`)}</span>
                      <BarraLinea valor={Math.min(100, valor * 18)} color="bg-indigo-500" />
                      <span className="w-6 text-right tabular-nums">{valor}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wide text-slate-500">{t('profile.byType')}</h3>
                <ul className="mt-2 space-y-2.5">
                  {Object.entries(etiqueta.porTipo).map(([tipo, valor]) => (
                    <li key={tipo} className="flex items-center gap-2 text-sm">
                      <span className="w-24 shrink-0 truncate">{t(`profile.type.${tipo}`)}</span>
                      <BarraLinea valor={valor * 18} color="bg-violet-500" />
                      <span className="w-6 text-right tabular-nums">{valor}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Card>
        </div>
      </div>

      <p className="mt-8 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400">
        {t('profile.privacy')}
      </p>
    </div>
  )
}