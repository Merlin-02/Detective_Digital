import type { Categoria, Caso, Etiqueta, Recomendacion, RespuestaCaso, TipoContenido } from '../types'

export const CATEGORIAS: Categoria[] = [
  'politica',
  'salud',
  'entretenimiento',
  'ciencia',
  'ia',
  'deporte',
  'economia',
]

export const TIPOS: TipoContenido[] = ['noticia', 'imagen', 'audio', 'video', 'cadena']

export const NIVELES = [
  { nombre: 'nivel_0', indice: 0, minimo: 0 },
  { nombre: 'nivel_1', indice: 1, minimo: 200 },
  { nombre: 'nivel_2', indice: 2, minimo: 500 },
  { nombre: 'nivel_3', indice: 3, minimo: 900 },
] as const

export function dificultadDesbloqueada(respuestas: RespuestaCaso[]): number {
  const puntos = respuestas.reduce((acc, r) => acc + r.puntos, 0)
  if (puntos >= NIVELES[3].minimo) return 4
  if (puntos >= NIVELES[2].minimo) return 3
  if (puntos >= NIVELES[1].minimo) return 2
  return 1
}

export function puntajeDe(respuesta: Pick<RespuestaCaso, 'correcto' | 'dificultad'>): number {
  return respuesta.correcto ? 50 + respuesta.dificultad * 40 : 0
}

export function calcularEtiqueta(respuestas: RespuestaCaso[]): Etiqueta {
  const total = respuestas.length
  const aciertos = respuestas.filter((r) => r.correcto).length

  const precisionCritica = total ? Math.round((aciertos / total) * 100) : 0

  const tiposUsados = new Set(respuestas.map((r) => r.tipoContenido))
  const diversidadFuentes = total ? Math.round((tiposUsados.size / TIPOS.length) * 100) : 0

  const categoriasUsadas = new Set(respuestas.map((r) => r.categoria))
  const balanceTematico = total
    ? Math.round((categoriasUsadas.size / CATEGORIAS.length) * 100)
    : 0

  const pistasMedias =
    respuestas.reduce(
      (acc, r) => acc + (r.totalPistas ? r.pistasConsultadas / r.totalPistas : 1),
      0,
    ) /
    (total || 1)
  const consumoInformacional = total ? Math.round(pistasMedias * 100) : 0

  const puntos = respuestas.reduce((acc, r) => acc + r.puntos, 0)

  let nivel: Etiqueta['nivel'] = { nombre: 'nivel_0', indice: 0, minimo: 0 }
  for (const n of NIVELES) {
    if (puntos >= n.minimo) nivel = { nombre: n.nombre, indice: n.indice, minimo: n.minimo }
  }

  const porCategoria = {} as Record<Categoria, number>
  for (const c of CATEGORIAS) porCategoria[c] = 0
  for (const r of respuestas) porCategoria[r.categoria] += 1

  const porTipo = {} as Record<TipoContenido, number>
  for (const t of TIPOS) porTipo[t] = 0
  for (const r of respuestas) porTipo[r.tipoContenido] += 1

  const aciertosPorDificultad: Etiqueta['aciertosPorDificultad'] = { 1: { aciertos: 0, total: 0 }, 2: { aciertos: 0, total: 0 }, 3: { aciertos: 0, total: 0 }, 4: { aciertos: 0, total: 0 } }
  for (const r of respuestas) {
    aciertosPorDificultad[r.dificultad].total += 1
    if (r.correcto) aciertosPorDificultad[r.dificultad].aciertos += 1
  }

  return {
    precisionCritica,
    diversidadFuentes,
    balanceTematico,
    consumoInformacional,
    puntos,
    casosResueltos: total,
    nivel,
    porCategoria,
    porTipo,
    aciertosPorDificultad,
  }
}

export function generarRecomendaciones(
  respuestas: RespuestaCaso[],
  etiqueta: Etiqueta,
  casos: Caso[],
): Recomendacion[] {
  void respuestas
  const recs: Recomendacion[] = []
  if (etiqueta.casosResueltos === 0) return recs

  const faltantesCategoria = CATEGORIAS.filter((c) => etiqueta.porCategoria[c] === 0)
  const faltantesTipo = TIPOS.filter((t) => etiqueta.porTipo[t] === 0)

  const primerCaso = (cat?: Categoria, tipo?: TipoContenido): Caso | undefined =>
    casos.find((c) => c.modo === 'individual' && (!cat || c.categoria === cat) && (!tipo || c.tipoContenido === tipo))

  if (etiqueta.precisionCritica < 60) {
    recs.push({
      id: 'accuracy',
      titulo: 'profile.recommendation.accuracy',
      descripcion: 'profile.recommendation.accuracy.desc',
      casoId: primerCaso(undefined, undefined)?.id,
      href: '/jugar',
      tono: 'atencion',
    })
  }
  if (faltantesTipo.length > 0 && etiqueta.diversidadFuentes < 60) {
    const caso = primerCaso(undefined, faltantesTipo[0])
    recs.push({
      id: 'diversity',
      titulo: 'profile.recommendation.diversity',
      descripcion: 'profile.recommendation.diversity.desc',
      casoId: caso?.id,
      href: '/jugar',
      tono: 'atencion',
    })
  }
  if (faltantesCategoria.length > 0 && etiqueta.balanceTematico < 55) {
    const caso = primerCaso(faltantesCategoria[0], undefined)
    recs.push({
      id: 'balance',
      titulo: 'profile.recommendation.balance',
      descripcion: 'profile.recommendation.balance.desc',
      casoId: caso?.id,
      href: '/jugar',
      tono: 'atencion',
    })
  }
  if (etiqueta.consumoInformacional < 65) {
    recs.push({
      id: 'consumption',
      titulo: 'profile.recommendation.consumption',
      descripcion: 'profile.recommendation.consumption.desc',
      href: '/jugar',
      tono: 'bueno',
    })
  }
  if (etiqueta.casosResueltos > 0 && etiqueta.nivel.indice < 3) {
    recs.push({
      id: 'progress',
      titulo: 'profile.recommendation.progress',
      descripcion: 'profile.recommendation.progress.desc',
      href: '/jugar',
      tono: 'bueno',
    })
  }

  if (recs.length === 0) {
    recs.push({
      id: 'done',
      titulo: 'profile.recommendation.done',
      descripcion: 'profile.recommendation.done.desc',
      href: '/jugar',
      tono: 'bueno',
    })
  }

  return recs.slice(0, 3)
}