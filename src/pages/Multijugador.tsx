import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useI18n } from '../i18n'
import { CASOS, CASOS_EQUIPO } from '../data/casos'
import { useGame } from '../stores/useGame'
import { useCasos } from '../stores/useCasos'
import { usePartida } from '../stores/usePartida'
import { dificultadDesbloqueada } from '../services/label'
import type { Caso, Veredicto } from '../types'
import { Card, Chip, CategoriaChip, DificultadChip, TipoChip } from '../components/ui'

const VEREDICTOS: Veredicto[] = ['real', 'manipulado', 'falso', 'ia']

function nombreJugador(sala: ReturnType<typeof usePartida.getState>['sala'], id: string | null): string {
  if (!sala || !id) return '?'
  return sala.jugadores.find((j) => j.id === id)?.nombre ?? '?'
}

export function Multijugador() {
  const { t } = useI18n()
  const respuestas = useGame((s) => s.respuestas)
  const casosWeb = useCasos((s) => s.web)
  const { estatus, yoId, sala, error, conectar, crearSala, unirseSala, empezar, enviarVoto, salir } = usePartida()

  const [nombre, setNombre] = useState('')
  const [codigo, setCodigo] = useState('')
  const [casoId, setCasoId] = useState('')
  const [errorCaso, setErrorCaso] = useState('')

  const casosDisponibles = useMemo(() => {
    const max = dificultadDesbloqueada(respuestas)
    const todos: Caso[] = [...CASOS, ...CASOS_EQUIPO, ...casosWeb]
    return todos
      .filter((c) => c.modo === 'individual' && c.dificultad <= max)
      .sort((a, b) => a.dificultad - b.dificultad)
  }, [respuestas, casosWeb])

  const todosCasos = useMemo(() => [...CASOS, ...CASOS_EQUIPO, ...casosWeb], [casosWeb])

  const caso = useMemo(
    () => todosCasos.find((c) => c.id === sala?.casoId),
    [todosCasos, sala],
  )

  if (!sala) {
    return (
      <div className="mx-auto max-w-5xl px-4 py-10">
        <h1 className="text-4xl font-black tracking-tight">{t('multi.title')}</h1>
        <p className="mt-2 max-w-2xl text-slate-600 dark:text-slate-300">{t('multi.subtitle')}</p>

        {estatus === 'error' && (
          <Card className="mt-6 border-l-4 border-l-rose-500 p-5">
            <p className="font-semibold text-rose-600 dark:text-rose-400">{t('multi.error.server')}</p>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{t('multi.error.hint')}</p>
            <button
              type="button"
              onClick={conectar}
              className="mt-3 rounded-xl bg-indigo-600 px-4 py-2 font-semibold text-white hover:bg-indigo-500"
            >
              {t('multi.retry')}
            </button>
          </Card>
        )}

        {error && !sala && estatus !== 'error' && (
          <p className="mt-4 rounded-xl border border-rose-200 bg-rose-50 px-4 py-2 text-sm text-rose-600 dark:border-rose-900 dark:bg-rose-950 dark:text-rose-400">
            {error}
          </p>
        )}

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <Card className="p-6">
            <h2 className="text-xl font-black">{t('multi.create.title')}</h2>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{t('multi.create.desc')}</p>
            <label className="mt-4 block text-sm font-semibold">{t('multi.name.label')}</label>
            <input
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              maxLength={20}
              placeholder={t('multi.name.placeholder')}
              className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100"
            />
            <label className="mt-3 block text-sm font-semibold">{t('multi.case.label')}</label>
            <select
              value={casoId}
              onChange={(e) => {
                setCasoId(e.target.value)
                setErrorCaso('')
              }}
              className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100"
            >
              <option value="">—</option>
              {casosDisponibles.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.titulo} · {c.dificultad}/4
                </option>
              ))}
            </select>
            {errorCaso && (
              <p className="mt-2 rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-600 dark:border-rose-900 dark:bg-rose-950 dark:text-rose-400">
                {errorCaso}
              </p>
            )}
            <button
              type="button"
              disabled={!nombre.trim() || !casoId}
              onClick={() => {
                const c = casosDisponibles.find((x) => x.id === casoId)
                if (!c) {
                  setErrorCaso(t('multi.error.badCase'))
                  return
                }
                setErrorCaso('')
                conectar()
                crearSala(nombre.trim(), c.id, c.dificultad)
              }}
              className="mt-4 w-full rounded-xl bg-indigo-600 px-4 py-2.5 font-bold text-white hover:bg-indigo-500 disabled:cursor-not-allowed disabled:bg-slate-300 dark:disabled:bg-slate-700"
            >
              {estatus === 'abriendo' ? t('multi.connecting') : t('multi.create.cta')}
            </button>
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-black">{t('multi.join.title')}</h2>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{t('multi.join.desc')}</p>
            <label className="mt-4 block text-sm font-semibold">{t('multi.name.label')}</label>
            <input
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              maxLength={20}
              placeholder={t('multi.name.placeholder')}
              className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100"
            />
            <label className="mt-3 block text-sm font-semibold">{t('multi.code.label')}</label>
            <input
              value={codigo}
              onChange={(e) => setCodigo(e.target.value.toUpperCase())}
              maxLength={6}
              placeholder={t('multi.code.placeholder')}
              className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 font-black tracking-[0.5em] dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100"
            />
            <button
              type="button"
              disabled={!nombre.trim() || codigo.trim().length < 6}
              onClick={() => {
                conectar()
                unirseSala(nombre.trim(), codigo.trim())
              }}
              className="mt-4 w-full rounded-xl bg-emerald-600 px-4 py-2.5 font-bold text-white hover:bg-emerald-500 disabled:cursor-not-allowed disabled:bg-slate-300 dark:disabled:bg-slate-700"
            >
              {estatus === 'abriendo' ? t('multi.connecting') : t('multi.join.cta')}
            </button>
          </Card>
        </div>
      </div>
    )
  }

  if (sala.fase === 'espera') {
    const soyHost = yoId === sala.hostId
    const conectados = sala.jugadores.filter((j) => j.conectado).length
    return (
      <div className="mx-auto max-w-3xl px-4 py-10">
        <h1 className="text-3xl font-black">{t('multi.lobby.title')}</h1>

        <Card className="mt-6 p-6 text-center">
          <p className="text-sm text-slate-500 dark:text-slate-400">{t('multi.lobby.shareCode')}</p>
          <p className="mt-2 text-5xl font-black tracking-[0.3em] text-indigo-600 dark:text-indigo-400">{sala.codigo}</p>
          <button
            type="button"
            onClick={() => navigator.clipboard?.writeText(sala.codigo)}
            className="mt-3 rounded-lg border border-slate-300 px-3 py-1.5 text-sm font-semibold text-slate-600 hover:bg-slate-100 dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-800"
          >
            {t('multi.lobby.copyCode')}
          </button>
        </Card>

        <Card className="mt-6 p-6">
          <div className="flex items-center justify-between">
            <h2 className="font-bold">{t('multi.players')} ({sala.jugadores.length})</h2>
            <Chip className="border border-slate-300 bg-slate-50 text-slate-600 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-300">
              {conectados}/{sala.jugadores.length} {t('multi.connected')}
            </Chip>
          </div>
          <ul className="mt-3 grid gap-2 sm:grid-cols-2">
            {sala.jugadores.map((j) => (
              <li
                key={j.id}
                className="flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-2 dark:border-slate-700"
              >
                <span className={`h-2.5 w-2.5 rounded-full ${j.conectado ? 'bg-emerald-500' : 'bg-slate-300'}`} />
                <span className="flex-1 truncate font-medium">
                  {j.nombre}
                  {j.id === sala.hostId && <span className="ml-1 text-xs text-indigo-500">· {t('multi.host')}</span>}
                  {j.id === yoId && <span className="ml-1 text-xs text-slate-400">· {t('multi.you')}</span>}
                </span>
              </li>
            ))}
          </ul>
        </Card>

        <div className="mt-6 flex flex-wrap gap-3">
          {!caso && (
            <p className="w-full rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-700 dark:border-amber-800 dark:bg-amber-950 dark:text-amber-300">
              {t('multi.case.missingDesc')} (id: {sala.casoId})
            </p>
          )}
          {soyHost ? (
            <button
              type="button"
              disabled={conectados < 2 || !caso}
              onClick={empezar}
              className="rounded-xl bg-indigo-600 px-6 py-3 font-bold text-white hover:bg-indigo-500 disabled:cursor-not-allowed disabled:bg-slate-300 dark:disabled:bg-slate-700"
            >
              {!caso ? t('multi.startBlocked') : conectados < 2 ? t('multi.startNeed') : t('multi.start')}
            </button>
          ) : (
            <p className="rounded-xl bg-slate-100 px-4 py-3 text-sm text-slate-500 dark:bg-slate-800 dark:text-slate-300">
              {t('multi.waitHost')}
            </p>
          )}
          <button
            type="button"
            onClick={() => salir()}
            className="rounded-xl border border-rose-300 bg-white px-4 py-2.5 font-semibold text-rose-600 hover:bg-rose-50 dark:border-rose-800 dark:bg-slate-900"
          >
            {t('multi.exit')}
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-3xl font-black">{t('multi.room')} · {sala.codigo}</h1>
        <Chip className="border border-indigo-200 bg-indigo-50 text-indigo-700 dark:border-indigo-900 dark:bg-indigo-950 dark:text-indigo-300">
          {sala.fase === 'turnos' ? t('multi.inTurn') : t('multi.finished')}
        </Chip>
      </div>

      {caso ? (
        <Card className="mt-4 p-5">
          <div className="flex flex-wrap items-center gap-2">
            <CategoriaChip categoria={caso.categoria} />
            <TipoChip tipo={caso.tipoContenido} />
            <DificultadChip dificultad={caso.dificultad} />
          </div>
          <h2 className="mt-3 text-xl font-black">{caso.titulo}</h2>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{caso.escenario}</p>

          {caso.fuentes.length > 0 && (
            <div className="mt-4">
              <h3 className="text-xs font-bold uppercase tracking-wide text-slate-400">{t('multi.sourcesTitle')}</h3>
              <div className="mt-1.5 flex flex-wrap gap-2">
                {caso.fuentes.map((f) => (
                  <Chip
                    key={f.nombre}
                    className={
                      f.confiable
                        ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
                        : 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300'
                    }
                  >
                    {f.nombre}
                  </Chip>
                ))}
              </div>
              {caso.fuenteWeb && (
                <a
                  href={caso.fuenteWeb}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-block text-sm font-semibold text-indigo-600 hover:underline dark:text-indigo-400"
                >
                  {t('case.sourceOriginal')} ↗
                </a>
              )}
            </div>
          )}
        </Card>
      ) : (
        <Card className="mt-6 border-l-4 border-l-amber-500 p-6">
          <p className="font-bold text-amber-700 dark:text-amber-300">{t('multi.case.missingTitle')}</p>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            {t('multi.case.missingDesc')} (id: {sala.casoId})
          </p>
          <button
            type="button"
            onClick={() => salir()}
            className="mt-4 rounded-xl border border-slate-300 bg-white px-4 py-2.5 font-semibold text-slate-700 hover:bg-slate-100 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-200"
          >
            {t('multi.exit')}
          </button>
        </Card>
      )}

      {sala.fase === 'turnos' && caso && (
        <>
          <div className="mt-6 rounded-xl border border-indigo-200 bg-indigo-50 px-4 py-3 text-sm font-semibold text-indigo-800 dark:border-indigo-800 dark:bg-indigo-950 dark:text-indigo-200">
            {yoId === sala.turno
              ? '🎯 ' + t('multi.yourTurn')
              : `${t('multi.turnOf')} ${nombreJugador(sala, sala.turno)}`}
          </div>

          <div className="mt-6">
            <h2 className="text-xl font-bold">{t('case.pistasTitle')}</h2>
            <div className="mt-3 space-y-2">
              {caso.pistas.map((p) => (
                <div key={p.id} className="rounded-xl border border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-900">
                  <div className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left">
                    <span className="inline-flex items-center gap-2 font-semibold">
                      <span className="rounded bg-indigo-100 px-1.5 py-0.5 text-[10px] font-bold uppercase text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
                        {t(`case.clue.${p.tipo}`)}
                      </span>
                      {p.titulo}
                    </span>
                  </div>
                  <p className="border-t border-slate-200 px-4 py-3 text-sm text-slate-600 dark:border-slate-700 dark:text-slate-300">
                    {p.contenido}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <TurnoVoto
            yoId={yoId}
            salaTurno={sala.turno}
            caso={caso}
            enviarVoto={enviarVoto}
            yaVote={sala.jugadores.find((j) => j.id === yoId)?.listo ?? false}
          />
        </>
      )}

      {sala.fase === 'fin' && sala.resultado && (
        <Dictamen resultado={sala.resultado} esHost={yoId === sala.hostId} empezar={empezar} salir={salir} />
      )}
    </div>
  )
}

function TurnoVoto({
  yoId,
  salaTurno,
  caso,
  enviarVoto,
  yaVote,
}: {
  yoId: string | null
  salaTurno: string | null
  caso: Caso
  enviarVoto: (d: { vered: string; evidencias: string[]; informe: string }) => void
  yaVote: boolean
}) {
  const { t } = useI18n()
  const esMiTurno = yoId !== null && salaTurno === yoId
  const [vered, setVered] = useState<Veredicto | null>(null)
  const [evidencias, setEvidencias] = useState<string[]>([])
  const [informe, setInforme] = useState('')

  if (!esMiTurno) {
    return (
      <p className="mt-6 rounded-xl bg-slate-100 px-4 py-3 text-sm text-slate-500 dark:bg-slate-800 dark:text-slate-300">
        {t('multi.waitText')}
      </p>
    )
  }
  if (yaVote) {
    return (
      <p className="mt-6 rounded-xl bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
        {t('multi.voted')}
      </p>
    )
  }

  return (
    <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-700 dark:bg-slate-900">
      <h2 className="text-xl font-bold">{t('multi.vote.title')}</h2>
      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{t('multi.vote.hint')}</p>

      <div className="mt-4 grid gap-2 sm:grid-cols-2">
        {VEREDICTOS.map((v) => (
          <button
            key={v}
            type="button"
            onClick={() => setVered(v)}
            className={`rounded-xl border p-4 text-left font-semibold transition-colors ${
              vered === v
                ? 'border-indigo-500 bg-indigo-600 text-white'
                : 'border-slate-300 bg-white text-slate-700 hover:border-indigo-400 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200'
            }`}
          >
            {t(`case.vd.${v}`)}
          </button>
        ))}
      </div>

      <h3 className="mt-6 font-bold">{t('multi.evidences')}</h3>
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
                onChange={() => setEvidencias((prev) => (activa ? prev.filter((x) => x !== s) : [...prev, s]))}
                className="mt-1 h-4 w-4 accent-indigo-600"
              />
              {s}
            </label>
          )
        })}
      </div>

      <h3 className="mt-6 font-bold">{t('multi.report')}</h3>
      <textarea
        value={informe}
        onChange={(e) => setInforme(e.target.value)}
        rows={4}
        maxLength={400}
        className="mt-2 w-full rounded-xl border border-slate-300 bg-white p-3 text-sm dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100"
        placeholder={t('multi.reportPlaceholder')}
      />

      <button
        type="button"
        disabled={!vered}
        onClick={() => vered && enviarVoto({ vered, evidencias, informe })}
        className={`mt-4 rounded-xl px-6 py-3 font-bold text-white transition-colors ${
          vered ? 'bg-indigo-600 hover:bg-indigo-500' : 'cursor-not-allowed bg-slate-400'
        }`}
      >
        {t('multi.submit')}
      </button>
    </div>
  )
}

function Dictamen({
  resultado,
  esHost,
  empezar,
  salir,
}: {
  resultado: NonNullable<ReturnType<typeof usePartida.getState>['sala']>['resultado']
  esHost: boolean
  empezar: () => void
  salir: () => void
}) {
  const { t } = useI18n()
  if (!resultado) return null
  return (
    <>
      <Card className="mt-6 p-6">
        <p className="text-sm text-slate-500 dark:text-slate-400">{t('multi.resultTitle')}</p>
        <p className="mt-2 text-2xl font-black text-indigo-600 dark:text-indigo-400">
          {t(`case.vd.${resultado.vered}`)}
        </p>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200 text-left text-xs uppercase tracking-wide text-slate-400">
                <th className="py-1.5 pr-3">{t('multi.table.player')}</th>
                <th className="py-1.5 pr-3">{t('multi.table.vote')}</th>
                <th className="py-1.5 pr-3">{t('multi.table.result')}</th>
                <th className="py-1.5 text-right">{t('multi.table.points')}</th>
              </tr>
            </thead>
            <tbody>
              {resultado.porJugador.map((j) => (
                <tr key={j.id} className="border-b border-slate-100 dark:border-slate-800">
                  <td className="py-2 pr-3 font-medium">{j.nombre}</td>
                  <td className="py-2 pr-3">{j.vered ? t(`case.vd.${j.vered}`) : '—'}</td>
                  <td className="py-2 pr-3">
                    {j.acertado ? (
                      <span className="font-semibold text-emerald-600 dark:text-emerald-400">{t('multi.ok')}</span>
                    ) : (
                      <span className="font-semibold text-rose-500">{t('multi.no')}</span>
                    )}
                  </td>
                  <td className="py-2 text-right tabular-nums">+{j.puntos}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <div className="mt-6 flex flex-wrap gap-3">
        {esHost && (
          <button
            type="button"
            onClick={empezar}
            className="rounded-xl bg-indigo-600 px-6 py-3 font-bold text-white hover:bg-indigo-500"
          >
            {t('multi.restart')}
          </button>
        )}
        <button
          type="button"
          onClick={() => salir()}
          className="rounded-xl border border-rose-300 bg-white px-4 py-2.5 font-semibold text-rose-600 hover:bg-rose-50 dark:border-rose-800 dark:bg-slate-900"
        >
          {t('multi.exit')}
        </button>
        <Link to="/jugar" className="rounded-xl border border-slate-300 bg-white px-4 py-2.5 font-semibold text-slate-700 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-200">
          {t('case.next')}
        </Link>
      </div>
    </>
  )
}