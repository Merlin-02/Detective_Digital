import { useMemo, useState } from 'react'
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'
import { useI18n } from '../i18n'
import { CASOS, CASOS_EQUIPO } from '../data/casos'
import { useGame } from '../stores/useGame'
import { useCasos } from '../stores/useCasos'
import { dificultadDesbloqueada, puntajeDe } from '../services/label'
import type { Caso, Rol, Veredicto } from '../types'
import { Card, CategoriaChip, DificultadChip, TipoChip, Chip } from '../components/ui'

const ESTATICOS = [...CASOS, ...CASOS_EQUIPO]

const VEREDICTOS: { key: Veredicto; labelKey: string }[] = [
  { key: 'real', labelKey: 'case.vd.real' },
  { key: 'manipulado', labelKey: 'case.vd.manipulado' },
  { key: 'falso', labelKey: 'case.vd.falso' },
  { key: 'ia', labelKey: 'case.vd.ia' },
]

const ROLES: Rol[] = ['analista_imagen', 'verificador_fuentes', 'rastreador_contexto', 'redactor_informe']

function Cabecera({ caso }: { caso: Caso }) {
  const { t } = useI18n()
  return (
    <div className="flex flex-wrap items-center gap-2">
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
  )
}

function MarcadorContenido({ caso }: { caso: Caso }) {
  const { t } = useI18n()
  return (
    <div className="rounded-2xl border border-slate-200 bg-gradient-to-br from-indigo-600 to-violet-700 p-6 text-white">
      <Cabecera caso={caso} />
      <h2 className="mt-3 text-2xl font-black leading-tight">{caso.titulo}</h2>
      <p className="mt-3 text-sm leading-relaxed text-indigo-100">{caso.escenario}</p>
      <p className="mt-4 text-xs uppercase tracking-widest text-indigo-200">
        {t(`profile.type.${caso.tipoContenido}`)} · {t('case.scenarioTitle')}
      </p>
    </div>
  )
}

function PistaItem({
  pista,
  consultada,
  onOpen,
}: {
  pista: Caso['pistas'][number]
  consultada: boolean
  onOpen: VoidFunction
}) {
  const { t } = useI18n()
  const [abierta, setAbierta] = useState(consultada)
  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-900">
      <button
        type="button"
        onClick={() => {
          setAbierta((v) => !v)
          onOpen()
        }}
        className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left"
      >
        <span className="inline-flex items-center gap-2 font-semibold">
          <span className="rounded bg-indigo-100 px-1.5 py-0.5 text-[10px] font-bold uppercase text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
            {t(`case.clue.${pista.tipo}`)}
          </span>
          {pista.titulo}
        </span>
        <span className="text-slate-400 dark:text-slate-500">{abierta ? '−' : '+'}</span>
      </button>
      {abierta && (
        <p className="border-t border-slate-200 px-4 py-3 text-sm text-slate-600 dark:border-slate-700 dark:text-slate-300">
          {pista.contenido}
        </p>
      )}
    </div>
  )
}

function PanelFeedback({
  caso,
  correcto,
  labelNivel,
}: {
  caso: Caso
  correcto: boolean
  labelNivel: string
}) {
  const { t } = useI18n()
  return (
    <Card className={`mt-8 border-l-4 ${correcto ? 'border-l-emerald-500' : 'border-l-rose-500'} p-6`}>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h3
          className={`text-2xl font-black ${
            correcto ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'
          }`}
        >
          {correcto ? t('case.feedback.correct') : t('case.feedback.wrong')}
        </h3>
        <Chip className="border border-slate-300 bg-white text-slate-600 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-300">
          {t('case.seeCorrect')}: {labelNivel}
        </Chip>
      </div>
      <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
        {correcto ? t('case.feedback.correctHint') : t('case.feedback.wrongHint')}
      </p>

      <h4 className="mt-5 font-bold">{t('case.explanation')}</h4>
      <p className="mt-1 text-slate-600 dark:text-slate-300">{caso.explicacion}</p>

      <h4 className="mt-5 font-bold">{t('case.signals')}</h4>
      <ul className="mt-2 grid gap-2 sm:grid-cols-2">
        {caso.senales.map((s) => (
          <li key={s} className="flex items-start gap-2 rounded-lg bg-slate-50 px-3 py-2 text-sm dark:bg-slate-900">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="mt-0.5 shrink-0 text-indigo-500"
            >
              <path d="M5 12l4 4 10-10" />
            </svg>
            {s}
          </li>
        ))}
      </ul>

      <h4 className="mt-5 font-bold">{t('case.sourcesLabel')}</h4>
      <div className="mt-2 divide-y divide-slate-200 rounded-xl border border-slate-200 dark:divide-slate-700 dark:border-slate-700">
        {caso.fuentes.map((f) => (
          <div key={f.nombre} className="flex items-center justify-between gap-3 px-4 py-2.5 text-sm">
            <div className="min-w-0">
              <p className="truncate font-medium">{f.nombre}</p>
              <p className="truncate text-xs text-slate-400">{f.url}</p>
            </div>
            <Chip
              className={
                f.confiable
                  ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
                  : 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300'
              }
            >
              {f.confiable ? t('case.source.trusted') : t('case.source.untrusted')}
            </Chip>
          </div>
        ))}
      </div>

      {caso.origen && (
        <div className="mt-4 flex flex-wrap items-center gap-2 text-sm">
          <Chip className="border border-slate-300 bg-white text-slate-600 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-300">
            {t('case.verifiedBy')}: {caso.origen}
          </Chip>
          {caso.fuenteWeb && (
            <a
              href={caso.fuenteWeb}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-indigo-600 hover:underline dark:text-indigo-400"
            >
              {t('case.sourceOriginal')} ↗
            </a>
          )}
          {caso.fuenteArchivo && (
            <a
              href={caso.fuenteArchivo}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-slate-500 hover:underline dark:text-slate-400"
            >
              {t('case.archiveCopy')} ↗
            </a>
          )}
        </div>
      )}
    </Card>
  )
}

function Bloqueo({ caso }: { caso: Caso }) {
  const { t } = useI18n()
  return (
    <div className="mx-auto max-w-xl px-4 py-16 text-center">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-slate-200 text-slate-500 dark:bg-slate-800 dark:text-slate-400">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="4" y="10" width="16" height="10" rx="2" />
          <path d="M8 10V7a4 4 0 1 1 8 0v3" />
        </svg>
      </div>
      <h1 className="mt-4 text-3xl font-black">{t('case.locked')}</h1>
      <p className="mt-2 text-slate-600 dark:text-slate-300">{t('case.lockedHint')}</p>
      <p className="mt-2 text-sm text-slate-400">{caso.titulo}</p>
      <Chip className="mt-4 border border-slate-300 bg-white text-slate-600 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-300">
        {t('play.newCase')} {caso.dificultad}/4
      </Chip>
      <div className="mt-6">
        <Link to="/jugar" className="rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white">
          {t('case.back')}
        </Link>
      </div>
    </div>
  )
}

function BotonesAccion() {
  const { t } = useI18n()
  const navigate = useNavigate()
  return (
    <div className="mt-6 flex flex-wrap gap-3">
      <button
        type="button"
        onClick={() => navigate('/jugar')}
        className="rounded-xl border border-slate-300 bg-white px-5 py-2.5 font-semibold text-slate-700 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-200"
      >
        {t('case.next')}
      </button>
      <Link to="/perfil" className="rounded-xl bg-indigo-600 px-5 py-2.5 font-semibold text-white">
        {t('case.seeProfile')}
      </Link>
    </div>
  )
}

function CasoIndividual({ caso }: { caso: Caso }) {
  const { t } = useI18n()
  const { setCaso } = useGame()
  const [consultadas, setConsultadas] = useState<Set<string>>(new Set())
  const [veredicto, setVeredicto] = useState<Veredicto | null>(null)
  const [estado, setEstado] = useState<'jugando' | 'feedback'>('jugando')

  const marcarConsulta = (id: string) =>
    setConsultadas((prev) => {
      if (prev.has(id)) return prev
      const next = new Set(prev)
      next.add(id)
      return next
    })

  const votarVeredicto = (v: Veredicto) => {
    if (estado === 'feedback') return
    setVeredicto(v)
    const correcto = v === caso.correcto
    setCaso({
      casoId: caso.id,
      modo: 'individual',
      categoria: caso.categoria,
      tipoContenido: caso.tipoContenido,
      dificultad: caso.dificultad,
      segmento: caso.segmento,
      correcto,
      puntos: puntajeDe({ correcto, dificultad: caso.dificultad }),
      pistasConsultadas: consultadas.size,
      totalPistas: caso.pistas.length,
      fecha: new Date().toISOString(),
      equipo: false,
    })
    setEstado('feedback')
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <Link to="/jugar" className="text-sm text-indigo-600 dark:text-indigo-400">
        ← {t('case.back')}
      </Link>

      <div className="mt-4">
        <MarcadorContenido caso={caso} />
      </div>

      <div className="mt-8">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">{t('case.pistasTitle')}</h2>
          <Chip className="border border-indigo-200 bg-indigo-50 text-indigo-700 dark:border-indigo-900 dark:bg-indigo-950 dark:text-indigo-300">
            {consultadas.size}/{caso.pistas.length}
          </Chip>
        </div>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{t('case.pistasHint')}</p>
        <div className="mt-4 space-y-2">
          {caso.pistas.map((p) => (
            <PistaItem key={p.id} pista={p} consultada={consultadas.has(p.id)} onOpen={() => marcarConsulta(p.id)} />
          ))}
        </div>
      </div>

      {estado === 'jugando' && (
        <div className="mt-8">
          <h2 className="text-xl font-bold">{t('case.decisionTitle')}</h2>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{t('case.decisionHint')}</p>
          <div className="mt-4 grid gap-2 sm:grid-cols-2">
            {VEREDICTOS.map((v) => (
              <button
                key={v.key}
                type="button"
                onClick={() => votarVeredicto(v.key)}
                className="rounded-xl border border-slate-300 bg-white p-4 text-left font-semibold text-slate-700 hover:border-indigo-400 hover:bg-indigo-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-indigo-950"
              >
                {t(v.labelKey)}
              </button>
            ))}
          </div>
        </div>
      )}

      {estado === 'feedback' && veredicto && (
        <>
          <PanelFeedback
            caso={caso}
            correcto={veredicto === caso.correcto}
            labelNivel={t(`case.vd.${caso.correcto}`)}
          />
          <BotonesAccion />
        </>
      )}
    </div>
  )
}

function CasoEquipo({ caso }: { caso: Caso }) {
  const { t } = useI18n()
  const { setCaso } = useGame()
  const [rol, setRol] = useState<Rol | null>(null)
  const [consultadas, setConsultadas] = useState<Set<string>>(new Set())
  const [otrasAbiertas, setOtrasAbiertas] = useState(false)
  const [veredicto, setVeredicto] = useState<Veredicto | null>(null)
  const [evidencias, setEvidencias] = useState<string[]>([])
  const [informe, setInforme] = useState('')
  const [estado, setEstado] = useState<'rol' | 'sesion' | 'feedback'>('rol')

  const marcarConsulta = (id: string) =>
    setConsultadas((prev) => {
      const next = new Set(prev)
      next.add(id)
      return next
    })

  const presentar = () => {
    if (!veredicto) return
    const correcto = veredicto === caso.correcto
    setCaso({
      casoId: caso.id,
      modo: 'equipo',
      categoria: caso.categoria,
      tipoContenido: caso.tipoContenido,
      dificultad: caso.dificultad,
      segmento: caso.segmento,
      correcto,
      puntos: puntajeDe({ correcto, dificultad: caso.dificultad }),
      pistasConsultadas: consultadas.size,
      totalPistas: caso.pistas.length,
      fecha: new Date().toISOString(),
      equipo: true,
    })
    setEstado('feedback')
  }

  const iniciarSesion = (r: Rol) => {
    setRol(r)
    setEstado('sesion')
  }

  const misPistas = rol ? caso.pistas.filter((p) => p.rol === rol) : []
  const otrasPistas = rol ? caso.pistas.filter((p) => p.rol !== rol) : []

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <Link to="/jugar" className="text-sm text-indigo-600 dark:text-indigo-400">
        ← {t('case.back')}
      </Link>

      <h1 className="mt-3 text-3xl font-black">{t('case.team.title')}</h1>
      <div className="mt-2">
        <Cabecera caso={caso} />
      </div>
      <div className="mt-4">
        <MarcadorContenido caso={caso} />
      </div>

      {estado === 'rol' && (
        <div className="mt-8">
          <h2 className="text-xl font-bold">{t('case.team.pickRole')}</h2>
          <div className="mt-4 grid gap-2 sm:grid-cols-2">
            {ROLES.map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => iniciarSesion(r)}
                className="rounded-xl border border-slate-300 bg-white p-4 text-left font-semibold text-slate-700 hover:border-indigo-400 hover:bg-indigo-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-indigo-950"
              >
                {t(`case.team.role.${r}`)}
              </button>
            ))}
          </div>
        </div>
      )}

      {estado !== 'rol' && rol && (
        <>
          <div className="mt-6 rounded-xl border border-indigo-200 bg-indigo-50 px-4 py-3 text-sm font-semibold text-indigo-800 dark:border-indigo-800 dark:bg-indigo-950 dark:text-indigo-200">
            {t('case.team.youAre')} <span className="font-black">{t(`case.team.role.${rol}`)}</span>
          </div>

          <div className="mt-6">
            <h2 className="text-lg font-bold">{t('case.team.consult')}</h2>
            <div className="mt-3 space-y-2">
              {misPistas.map((p) => (
                <PistaItem key={p.id} pista={p} consultada={consultadas.has(p.id)} onOpen={() => marcarConsulta(p.id)} />
              ))}
            </div>
          </div>

          <div className="mt-6">
            <button
              type="button"
              onClick={() => setOtrasAbiertas((v) => !v)}
              className="text-sm font-semibold text-indigo-600 dark:text-indigo-400"
            >
              {t('case.team.others')} ({otrasPistas.length}) {otrasAbiertas ? '−' : '+'}
            </button>
            {otrasAbiertas && (
              <div className="mt-3 space-y-2">
                {otrasPistas.map((p) => (
                  <PistaItem key={p.id} pista={p} consultada={consultadas.has(p.id)} onOpen={() => marcarConsulta(p.id)} />
                ))}
              </div>
            )}
          </div>

          <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-700 dark:bg-slate-900">
            <h2 className="text-xl font-bold">{t('case.team.dictTitle')}</h2>

            <div className="mt-4 grid gap-2 sm:grid-cols-2">
              {VEREDICTOS.map((v) => (
                <button
                  key={v.key}
                  type="button"
                  onClick={() => setVeredicto(v.key)}
                  className={`rounded-xl border p-4 text-left font-semibold transition-colors ${
                    veredicto === v.key
                      ? 'border-indigo-500 bg-indigo-600 text-white'
                      : 'border-slate-300 bg-white text-slate-700 hover:border-indigo-400 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200'
                  }`}
                >
                  {t(v.labelKey)}
                </button>
              ))}
            </div>

            <h3 className="mt-6 font-bold">{t('case.team.evidence')}</h3>
            <div className="mt-2 grid gap-2 sm:grid-cols-2">
              {caso.senales.map((s) => {
                const activa = evidencias.includes(s)
                return (
                  <label
                    key={s}
                    className={`flex items-start gap-2 rounded-lg border px-3 py-2 text-sm transition-colors ${
                      activa
                        ? 'border-indigo-400 bg-indigo-50 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-200'
                        : 'border-slate-300 bg-white text-slate-600 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-300'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={activa}
                      onChange={() =>
                        setEvidencias((prev) => (activa ? prev.filter((x) => x !== s) : [...prev, s]))
                      }
                      className="mt-1 h-4 w-4 accent-indigo-600"
                    />
                    {s}
                  </label>
                )
              })}
            </div>

            <h3 className="mt-6 font-bold">{t('case.team.report')}</h3>
            <textarea
              value={informe}
              onChange={(e) => setInforme(e.target.value)}
              rows={4}
              className="mt-2 w-full rounded-xl border border-slate-300 bg-white p-3 text-sm dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200"
              placeholder={t('case.team.placeholderReport')}
            />

            <button
              type="button"
              onClick={presentar}
              disabled={!veredicto}
              className={`mt-4 rounded-xl px-6 py-3 font-bold text-white transition-colors ${
                veredicto ? 'bg-indigo-600 hover:bg-indigo-500' : 'cursor-not-allowed bg-slate-400'
              }`}
            >
              {t('case.team.submit')}
            </button>
          </div>

          {estado === 'feedback' && (
            <>
              <PanelFeedback
                caso={caso}
                correcto={veredicto === caso.correcto}
                labelNivel={t(`case.vd.${caso.correcto}`)}
              />
              <BotonesAccion />
            </>
          )}
        </>
      )}
    </div>
  )
}

export function Caso() {
  const { id } = useParams()
  const casosWeb = useCasos((s) => s.web)
  const respuestas = useGame((s) => s.respuestas)
  const casos = useMemo(() => [...ESTATICOS, ...casosWeb], [casosWeb])
  const caso = casos.find((c) => c.id === id)

  if (!caso) return <Navigate to="/jugar" replace />
  if (caso.dificultad > dificultadDesbloqueada(respuestas)) return <Bloqueo caso={caso} />
  if (caso.modo === 'equipo') return <CasoEquipo caso={caso} />
  return <CasoIndividual caso={caso} />
}