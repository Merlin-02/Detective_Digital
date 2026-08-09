import { useState } from 'react'
import { useI18n } from '../i18n'
import { useComunidad } from '../stores/useComunidad'
import { Card, Chip, CategoriaChip } from '../components/ui'
import type { Categoria, EstadoCuantia } from '../types'

const ESTADO_COLOR: Record<EstadoCuantia, string> = {
  pendiente: 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300',
  validado: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300',
  rechazado: 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300',
}

const CATEGORIAS: Categoria[] = ['politica', 'salud', 'entretenimiento', 'ciencia', 'ia', 'deporte', 'economia']
const TIPOS_MATERIAL = ['guia', 'video', 'articulo', 'infografia', 'coleccion'] as const
const TIPOS_CURSO = ['curso', 'webinar'] as const

type Pestaña = 'cursos' | 'material' | 'casos'

function ChipVoto({
  yaVotado,
  votos,
  onVotar,
  votosUnico,
  votosPl,
}: {
  yaVotado: boolean
  votos: number
  onVotar: () => void
  votosUnico: string
  votosPl: string
}) {
  const { t } = useI18n()
  return (
    <div className="flex items-center gap-2">
      <span className="tabular-nums font-semibold text-slate-600 dark:text-slate-300">
        {votos} {votos === 1 ? votosUnico : votosPl}
      </span>
      <button
        type="button"
        disabled={yaVotado}
        onClick={onVotar}
        className={`rounded-lg px-3 py-1 font-semibold transition-colors ${
          yaVotado
            ? 'cursor-default bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
            : 'bg-indigo-600 text-white hover:bg-indigo-500'
        }`}
      >
        {yaVotado ? t('community.voted') : t('community.vote')}
      </button>
    </div>
  )
}

function SelloVerificado() {
  const { t } = useI18n()
  return (
    <Chip className="bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300">
      <span aria-hidden="true">✓</span>
      {t('community.verifiedBadge')}
    </Chip>
  )
}

export function Comunidad() {
  const { t } = useI18n()
  const {
    casos,
    votados,
    agregar,
    votar,
    comunidades,
    cursos,
    cursosVotados,
    agregarCurso,
    votarCurso,
    materiales,
    materialesVotados,
    agregarMaterial,
    votarMaterial,
  } = useComunidad()

  const [pestaña, setPestaña] = useState<Pestaña>('cursos')
  const [abrir, setAbrir] = useState(false)

  const [titulo, setTitulo] = useState('')
  const [autor, setAutor] = useState('')
  const [descripcion, setDescripcion] = useState('')
  const [categoria, setCategoria] = useState<Categoria>('entretenimiento')
  const [tipo, setTipo] = useState<'curso' | 'webinar'>('webinar')
  const [tipoMaterial, setTipoMaterial] = useState<(typeof TIPOS_MATERIAL)[number]>('guia')
  const [duracion, setDuracion] = useState('')
  const [cuando, setCuando] = useState('')
  const [url, setUrl] = useState('')
  const [comunidadId, setComunidadId] = useState(comunidades[0]?.id ?? '')
  const [vista, setVista] = useState<'ver' | 'proponer'>('ver')

  const comunidadDe = (id: string) => comunidades.find((c) => c.id === id)

  const limpiar = () => {
    setTitulo('')
    setAutor('')
    setDescripcion('')
    setCategoria('entretenimiento')
    setDuracion('')
    setCuando('')
    setUrl('')
    setVista('ver')
    setAbrir(false)
  }

  const enviarCurso = (e: React.FormEvent) => {
    e.preventDefault()
    if (!titulo.trim() || !descripcion.trim() || !comunidadId) return
    agregarCurso({
      comunidadId,
      tipo,
      titulo: titulo.trim(),
      descripcion: descripcion.trim(),
      categoria,
      duracion: duracion.trim() || t('community.curso.formDuracionPh'),
      cuando: cuando.trim() || t('community.curso.formCuandoPh'),
    })
    limpiar()
  }

  const enviarMaterial = (e: React.FormEvent) => {
    e.preventDefault()
    if (!titulo.trim() || !descripcion.trim() || !url.trim()) return
    agregarMaterial({
      autor: autor.trim() || 'Detective anónimo',
      titulo: titulo.trim(),
      descripcion: descripcion.trim(),
      categoria,
      tipo: tipoMaterial,
      url: url.trim(),
    })
    limpiar()
  }

  const enviarCaso = (e: React.FormEvent) => {
    e.preventDefault()
    if (!titulo.trim() || !descripcion.trim()) return
    agregar({
      autor: autor.trim() || 'Detective anónimo',
      titulo: titulo.trim(),
      descripcion: descripcion.trim(),
      categoria,
      tags: [],
    })
    limpiar()
  }

  const PESTAÑAS: { id: Pestaña; label: string }[] = [
    { id: 'cursos', label: t('community.tab.cursos') },
    { id: 'material', label: t('community.tab.material') },
    { id: 'casos', label: t('community.tab.casos') },
  ]

  const nombreComunidad = (id: string) => comunidadDe(id)?.nombre ?? id

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-4xl font-black tracking-tight">{t('community.title')}</h1>
          <p className="mt-2 max-w-2xl text-slate-600 dark:text-slate-300">{t('community.subtitle')}</p>
        </div>
      </div>

      <div role="tablist" aria-label={t('community.tabsAria')} className="mt-6 flex flex-wrap gap-2">
        {PESTAÑAS.map((p) => (
          <button
            key={p.id}
            role="tab"
            aria-selected={pestaña === p.id}
            onClick={() => {
              setPestaña(p.id)
              setAbrir(false)
              setVista('ver')
            }}
            className={`rounded-lg px-4 py-2 text-sm font-semibold transition-colors ${
              pestaña === p.id
                ? 'bg-indigo-600 text-white'
                : 'border border-slate-300 text-slate-600 hover:bg-slate-100 dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-800'
            }`}
          >
            {p.label}
          </button>
        ))}
      </div>

      {pestaña === 'cursos' && (
        <section aria-label={t('community.tab.cursos')}>
          <div className="mt-6 flex flex-wrap items-end justify-between gap-3">
            <div>
              <h2 className="text-2xl font-black tracking-tight">{t('community.cursosTitle')}</h2>
              <p className="mt-1 max-w-2xl text-slate-600 dark:text-slate-300">{t('community.cursosSubtitle')}</p>
            </div>
            {vista === 'ver' && (
              <button
                type="button"
                onClick={() => setVista('proponer')}
                className="rounded-xl bg-indigo-600 px-5 py-2.5 font-semibold text-white hover:bg-indigo-500"
              >
                {t('community.curso.propose')}
              </button>
            )}
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {comunidades.map((c) => (
              <Card key={c.id} className="p-5">
                <div className="flex flex-wrap items-center gap-2">
                  {c.verificada ? (
                    <SelloVerificado />
                  ) : (
                    <Chip className="bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300">
                      {t('community.status.pendiente')}
                    </Chip>
                  )}
                  <Chip className="bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                    {t(`community.tipoEntidad.${c.tipo}`)}
                  </Chip>
                </div>
                <h3 className="mt-3 font-bold">{c.nombre}</h3>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{c.descripcion}</p>
                <p className="mt-3 text-xs text-slate-400 dark:text-slate-500">
                  {c.miembros} {t('community.members')} · {c.temas.map((tm) => t(`profile.category.${tm}`)).join(' · ')}
                </p>
              </Card>
            ))}
          </div>

          {vista === 'proponer' && (
            <Card className="mt-6 p-6">
              <h3 className="text-xl font-bold">{t('community.curso.formTitle')}</h3>
              <form onSubmit={enviarCurso} className="mt-4 grid gap-4 sm:grid-cols-2">
                <label className="block text-sm">
                  <span className="font-semibold">{t('community.curso.formComunidad')}</span>
                  <select
                    value={comunidadId}
                    onChange={(e) => setComunidadId(e.target.value)}
                    className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200"
                    required
                  >
                    {comunidades.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.nombre}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="block text-sm">
                  <span className="font-semibold">{t('community.curso.formTipo')}</span>
                  <select
                    value={tipo}
                    onChange={(e) => setTipo(e.target.value as (typeof TIPOS_CURSO)[number])}
                    className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200"
                  >
                    {TIPOS_CURSO.map((tp) => (
                      <option key={tp} value={tp}>
                        {t(`community.curso.tipo.${tp}`)}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="block text-sm sm:col-span-2">
                  <span className="font-semibold">{t('community.curso.formTitulo')}</span>
                  <input
                    value={titulo}
                    onChange={(e) => setTitulo(e.target.value)}
                    className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200"
                    required
                  />
                </label>
                <label className="block text-sm sm:col-span-2">
                  <span className="font-semibold">{t('community.curso.formDesc')}</span>
                  <textarea
                    value={descripcion}
                    onChange={(e) => setDescripcion(e.target.value)}
                    rows={3}
                    className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200"
                    required
                  />
                </label>
                <label className="block text-sm">
                  <span className="font-semibold">{t('community.curso.formCategoria')}</span>
                  <select
                    value={categoria}
                    onChange={(e) => setCategoria(e.target.value as Categoria)}
                    className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200"
                  >
                    {CATEGORIAS.map((c) => (
                      <option key={c} value={c}>
                        {t(`profile.category.${c}`)}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="block text-sm">
                  <span className="font-semibold">{t('community.curso.formDuracion')}</span>
                  <input
                    value={duracion}
                    onChange={(e) => setDuracion(e.target.value)}
                    className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200"
                  />
                </label>
                <label className="block text-sm">
                  <span className="font-semibold">{t('community.curso.formCuando')}</span>
                  <input
                    value={cuando}
                    onChange={(e) => setCuando(e.target.value)}
                    className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200"
                  />
                </label>
                <label className="block text-sm">
                  <span className="font-semibold">{t('community.curso.formEnlace')}</span>
                  <input
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="https://… (opcional)"
                    className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200"
                  />
                </label>
                <div className="flex items-end gap-2 sm:col-span-2">
                  <button type="submit" className="rounded-xl bg-indigo-600 px-5 py-2.5 font-semibold text-white hover:bg-indigo-500">
                    {t('community.submit')}
                  </button>
                  <button
                    type="button"
                    onClick={limpiar}
                    className="rounded-xl border border-slate-300 px-5 py-2.5 font-semibold text-slate-600 dark:border-slate-600 dark:text-slate-300"
                  >
                    {t('community.cancel')}
                  </button>
                </div>
              </form>
            </Card>
          )}

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {cursos.map((c) => (
              <Card key={c.id} className="flex flex-col p-5">
                <div className="flex flex-wrap items-center gap-1.5">
                  <Chip className="bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300">
                    {t(`community.curso.tipo.${c.tipo}`)}
                  </Chip>
                  <CategoriaChip categoria={c.categoria} />
                  <Chip className={ESTADO_COLOR[c.estado]}>{t(`community.status.${c.estado}`)}</Chip>
                </div>
                <h3 className="mt-3 font-bold leading-snug">{c.titulo}</h3>
                <p className="mt-2 flex-1 text-sm text-slate-500 dark:text-slate-400">{c.descripcion}</p>
                <p className="mt-3 text-xs text-slate-500 dark:text-slate-400">
                  {t('community.by')} {nombreComunidad(c.comunidadId)} · {c.duracion} · {c.cuando}
                </p>
                {c.enlace && (
                  <a
                    href={c.enlace}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-3 text-sm font-semibold text-indigo-600 hover:underline dark:text-indigo-300"
                  >
                    {t('community.curso.join')} →
                  </a>
                )}
                <div className="mt-4 flex items-center justify-between border-t border-slate-200 pt-3 text-xs text-slate-400 dark:border-slate-700">
                  <span>{c.fecha}</span>
                  <ChipVoto
                    yaVotado={cursosVotados.includes(c.id)}
                    votos={c.votos}
                    onVotar={() => votarCurso(c.id)}
                    votosUnico={t('community.votos_unico')}
                    votosPl={t('community.votos_pl')}
                  />
                </div>
              </Card>
            ))}
          </div>
          <p className="mt-6 text-sm text-slate-500 dark:text-slate-400">{t('community.approvedHint')}</p>
        </section>
      )}

      {pestaña === 'material' && (
        <section aria-label={t('community.tab.material')}>
          <div className="mt-6 flex flex-wrap items-end justify-between gap-3">
            <div>
              <h2 className="text-2xl font-black tracking-tight">{t('community.materialTitle')}</h2>
              <p className="mt-1 max-w-2xl text-slate-600 dark:text-slate-300">{t('community.materialSubtitle')}</p>
            </div>
            {vista === 'ver' && (
              <button
                type="button"
                onClick={() => setVista('proponer')}
                className="rounded-xl bg-indigo-600 px-5 py-2.5 font-semibold text-white hover:bg-indigo-500"
              >
                {t('community.material.propose')}
              </button>
            )}
          </div>

          {vista === 'proponer' && (
            <Card className="mt-6 p-6">
              <h3 className="text-xl font-bold">{t('community.material.formTitle')}</h3>
              <form onSubmit={enviarMaterial} className="mt-4 grid gap-4 sm:grid-cols-2">
                <label className="block text-sm">
                  <span className="font-semibold">{t('community.material.formAutor')}</span>
                  <input
                    value={autor}
                    onChange={(e) => setAutor(e.target.value)}
                    className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200"
                  />
                </label>
                <label className="block text-sm">
                  <span className="font-semibold">{t('community.material.formTipoMaterial')}</span>
                  <select
                    value={tipoMaterial}
                    onChange={(e) => setTipoMaterial(e.target.value as (typeof TIPOS_MATERIAL)[number])}
                    className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200"
                  >
                    {TIPOS_MATERIAL.map((tp) => (
                      <option key={tp} value={tp}>
                        {t(`community.material.tipo.${tp}`)}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="block text-sm sm:col-span-2">
                  <span className="font-semibold">{t('community.material.formTitulo')}</span>
                  <input
                    value={titulo}
                    onChange={(e) => setTitulo(e.target.value)}
                    className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200"
                    required
                  />
                </label>
                <label className="block text-sm sm:col-span-2">
                  <span className="font-semibold">{t('community.material.formDesc')}</span>
                  <textarea
                    value={descripcion}
                    onChange={(e) => setDescripcion(e.target.value)}
                    rows={3}
                    className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200"
                    required
                  />
                </label>
                <label className="block text-sm">
                  <span className="font-semibold">{t('community.material.formCategoria')}</span>
                  <select
                    value={categoria}
                    onChange={(e) => setCategoria(e.target.value as Categoria)}
                    className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200"
                  >
                    {CATEGORIAS.map((c) => (
                      <option key={c} value={c}>
                        {t(`profile.category.${c}`)}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="block text-sm">
                  <span className="font-semibold">{t('community.material.formUrl')}</span>
                  <input
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="https://…"
                    className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200"
                    required
                  />
                </label>
                <div className="flex items-end gap-2 sm:col-span-2">
                  <button type="submit" className="rounded-xl bg-indigo-600 px-5 py-2.5 font-semibold text-white hover:bg-indigo-500">
                    {t('community.submit')}
                  </button>
                  <button
                    type="button"
                    onClick={limpiar}
                    className="rounded-xl border border-slate-300 px-5 py-2.5 font-semibold text-slate-600 dark:border-slate-600 dark:text-slate-300"
                  >
                    {t('community.cancel')}
                  </button>
                </div>
              </form>
            </Card>
          )}

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {materiales.map((m) => (
              <Card key={m.id} className="flex flex-col p-5">
                <div className="flex flex-wrap items-center gap-1.5">
                  <Chip className="bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300">
                    {t(`community.material.tipo.${m.tipo}`)}
                  </Chip>
                  <CategoriaChip categoria={m.categoria} />
                  <Chip className={ESTADO_COLOR[m.estado]}>{t(`community.status.${m.estado}`)}</Chip>
                </div>
                <h3 className="mt-3 font-bold leading-snug">{m.titulo}</h3>
                <p className="mt-2 flex-1 text-sm text-slate-500 dark:text-slate-400">{m.descripcion}</p>
                <a
                  href={m.url}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-3 text-sm font-semibold text-indigo-600 hover:underline dark:text-indigo-300"
                >
                  {t('community.material.open')} →
                </a>
                <div className="mt-4 flex items-center justify-between border-t border-slate-200 pt-3 text-xs text-slate-400 dark:border-slate-700">
                  <span className="truncate pr-2">{m.autor} · {m.fecha}</span>
                  <ChipVoto
                    yaVotado={materialesVotados.includes(m.id)}
                    votos={m.votos}
                    onVotar={() => votarMaterial(m.id)}
                    votosUnico={t('community.votos_unico')}
                    votosPl={t('community.votos_pl')}
                  />
                </div>
              </Card>
            ))}
            {materiales.length === 0 && (
              <Card className="p-8 text-center text-slate-500 dark:text-slate-400">{t('community.empty')}</Card>
            )}
          </div>
        </section>
      )}

      {pestaña === 'casos' && (
        <section aria-label={t('community.tab.casos')}>
          <div className="mt-6 flex flex-wrap items-end justify-between gap-3">
            <div>
              <h2 className="text-2xl font-black tracking-tight">{t('community.tab.casos')}</h2>
              <p className="mt-1 max-w-2xl text-slate-600 dark:text-slate-300">{t('community.subtitle')}</p>
            </div>
            {vista === 'ver' && (
              <button
                type="button"
                onClick={() => {
                  setVista('proponer')
                  setAbrir(true)
                }}
                className="rounded-xl bg-indigo-600 px-5 py-2.5 font-semibold text-white hover:bg-indigo-500"
              >
                {t('community.propose')}
              </button>
            )}
          </div>

          {abrir && vista === 'proponer' && (
            <Card className="mt-6 p-6">
              <h3 className="text-xl font-bold">{t('community.formTitle')}</h3>
              <form onSubmit={enviarCaso} className="mt-4 grid gap-4 sm:grid-cols-2">
                <label className="block text-sm">
                  <span className="font-semibold">{t('community.formTitulo')}</span>
                  <input
                    value={titulo}
                    onChange={(e) => setTitulo(e.target.value)}
                    className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200"
                    required
                  />
                </label>
                <label className="block text-sm">
                  <span className="font-semibold">{t('community.formAutor')}</span>
                  <input
                    value={autor}
                    onChange={(e) => setAutor(e.target.value)}
                    className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200"
                  />
                </label>
                <label className="block text-sm sm:col-span-2">
                  <span className="font-semibold">{t('community.formDesc')}</span>
                  <textarea
                    value={descripcion}
                    onChange={(e) => setDescripcion(e.target.value)}
                    rows={3}
                    className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200"
                    required
                  />
                </label>
                <label className="block text-sm">
                  <span className="font-semibold">{t('community.formCategoria')}</span>
                  <select
                    value={categoria}
                    onChange={(e) => setCategoria(e.target.value as Categoria)}
                    className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200"
                  >
                    {CATEGORIAS.map((c) => (
                      <option key={c} value={c}>
                        {t(`profile.category.${c}`)}
                      </option>
                    ))}
                  </select>
                </label>
                <div className="flex items-end gap-2 sm:col-span-2">
                  <button type="submit" className="rounded-xl bg-indigo-600 px-5 py-2.5 font-semibold text-white hover:bg-indigo-500">
                    {t('community.submit')}
                  </button>
                  <button
                    type="button"
                    onClick={limpiar}
                    className="rounded-xl border border-slate-300 px-5 py-2.5 font-semibold text-slate-600 dark:border-slate-600 dark:text-slate-300"
                  >
                    {t('community.cancel')}
                  </button>
                </div>
              </form>
            </Card>
          )}

          <p className="mt-6 text-sm text-slate-500 dark:text-slate-400">{t('community.approvedHint')}</p>

          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {casos.map((c) => {
              const yaVotado = votados.includes(c.id)
              return (
                <Card key={c.id} className="flex flex-col p-5">
                  <div className="flex flex-wrap items-center gap-1.5">
                    <CategoriaChip categoria={c.categoria} />
                    <Chip className={ESTADO_COLOR[c.estado]}>{t(`community.status.${c.estado}`)}</Chip>
                  </div>
                  <h3 className="mt-3 font-bold leading-snug">{c.titulo}</h3>
                  <p className="mt-2 flex-1 text-sm text-slate-500 dark:text-slate-400">{c.descripcion}</p>
                  <div className="mt-4 flex items-center justify-between border-t border-slate-200 pt-3 text-xs text-slate-400 dark:border-slate-700">
                    <span>
                      {c.autor} · {c.fecha}
                    </span>
                    <ChipVoto
                      yaVotado={yaVotado}
                      votos={c.votos}
                      onVotar={() => votar(c.id)}
                      votosUnico={t('community.votos_unico')}
                      votosPl={t('community.votos_pl')}
                    />
                  </div>
                </Card>
              )
            })}
          </div>

          {casos.length === 0 && (
            <Card className="mt-6 p-8 text-center text-slate-500 dark:text-slate-400">{t('community.empty')}</Card>
          )}
        </section>
      )}
    </div>
  )
}