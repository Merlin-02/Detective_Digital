import type { Caso, Veredicto } from '../types'
import { CASOS_EN } from '../i18n/casosEN'
import { CASOS_PT } from '../i18n/casosPT'

export type LangContenido = 'es' | 'en' | 'pt'

export interface TraduccionPista {
  titulo: string
  contenido: string
}

export interface TraduccionCaso {
  titulo?: string
  escenario?: string
  explicacion?: string
  origen?: string
  senales?: string[]
  fuentes?: string[]
  pistas?: Record<string, TraduccionPista>
}

const SENALES_TRAD: { id: string; en: string; pt: string }[] = [
  { id: 'Evaluado por Google News · Verificacion', en: 'Evaluated by Google News · Verification', pt: 'Evaluated by Google News · Verificação' },
  { id: 'Afirmacion sin evidencia reproducible', en: 'Claim without reproducible evidence', pt: 'Afirmação sem evidência reproduzível' },
  { id: 'Falta atribucion a una fuente primaria', en: 'Missing attribution to a primary source', pt: 'Falta de atribuição a uma fonte primária' },
  { id: 'Patron de reenvio/cadena para viralizar', en: 'Forwarding/chain pattern to go viral', pt: 'Padrão de reenvio/corrente para viralizar' },
  { id: 'Materia real pero alterada o fuera de contexto', en: 'Real material but altered or out of context', pt: 'Material real, porém alterado ou fora de contexto' },
  { id: 'Corte, bucle o edicion visible', en: 'Visible cut, loop or editing', pt: 'Corte, loop ou edição visível' },
  { id: 'La version original no coincide con la viral', en: 'The original version does not match the viral one', pt: 'A versão original não coincide com a viral' },
]

const VERED_TRAD: Record<Veredicto, { en: string; pt: string }> = {
  real: { en: 'real', pt: 'real' },
  manipulado: { en: 'manipulated', pt: 'manipulated' },
  falso: { en: 'false', pt: 'false' },
  ia: { en: 'AI-generated', pt: 'AI-generated' },
}

function traducirSenal(s: string, lang: LangContenido): string {
  const m = SENALES_TRAD.find((x) => x.id === s)
  if (!m) return s
  return lang === 'en' ? m.en : m.pt
}

function traducirWeb(caso: Caso, lang: LangContenido): Caso {
  const dict = lang === 'en' ? CASOS_EN : CASOS_PT
  const meta = dict[caso.id]
  const fecha = caso.fechaWeb ? caso.fechaWeb.slice(0, 10) : ''
  const origen =
    caso.origen === 'Google News · Verificacion'
      ? 'Google News · ' + (lang === 'en' ? 'Verification' : lang === 'pt' ? 'Verificação' : 'Verificacion')
      : caso.origen ?? ''
  const vered = VERED_TRAD[caso.correcto]?.[lang === 'en' ? 'en' : 'pt'] ?? caso.correcto
  const senales = (caso.senales ?? []).map((s) => traducirSenal(s, lang))

  const t1 = lang === 'en' ? 'Publication context' : 'Contexto de publicação'
  const t2 = lang === 'en' ? 'Verifier assessment' : 'Avaliação do verificador'
  const t3 = lang === 'en' ? 'Signals detected' : 'Sinais detectados'

  let c1: string
  let c2: string
  let exp: string
  if (lang === 'en') {
    c1 = `Originally published by ${origen}${fecha ? ` on ${fecha}` : ''}. The verification covers content that circulated on social media or in the media.`
    c2 = `${origen} analyzed this content and classified it as "${vered}" after cross-checking primary sources and original posts.`
    exp = `${origen} assessed this content (${fecha}) and concluded it is ${vered}. Signals: ${senales.join(', ')}.`
  } else {
    c1 = `Publicado originalmente por ${origen}${fecha ? ` em ${fecha}` : ''}. A verificação cobre um conteúdo que circulou nas redes ou na mídia.`
    c2 = `${origen} analisou este conteúdo e o classificou como "${vered}" após contrastar fontes primárias e publicações originais.`
    exp = `${origen} avaliou este conteúdo (${fecha}) e concluiu que é ${vered}. Sinais: ${senales.join(', ')}.`
  }

  const base = meta ?? {}
  return {
    ...caso,
    titulo: base.titulo ?? caso.titulo,
    escenario: base.escenario ?? caso.escenario,
    origen,
    senales,
    explicacion: exp,
    pistas: [
      {
        id: caso.pistas[0]?.id ?? `${caso.id}-p1`,
        tipo: 'contexto',
        titulo: t1,
        contenido: c1,
        rol: 'rastreador_contexto',
      },
      {
        id: caso.pistas[1]?.id ?? `${caso.id}-p2`,
        tipo: 'fuente',
        titulo: t2,
        contenido: c2,
        rol: 'verificador_fuentes',
      },
      {
        id: caso.pistas[2]?.id ?? `${caso.id}-p3`,
        tipo: 'metadato',
        titulo: t3,
        contenido: senales.join('. '),
        rol: 'analista_imagen',
      },
    ],
    fuentes: [{ nombre: origen, url: caso.fuenteWeb ?? '', confiable: true }],
  }
}

export function traducirCaso(caso: Caso, lang: LangContenido): Caso {
  if (lang === 'es') return caso

  if (caso.creado === 'web') return traducirWeb(caso, lang)

  const dict = lang === 'en' ? CASOS_EN : CASOS_PT
  const t = dict[caso.id]
  if (!t) return caso

  const pistas = caso.pistas.map((p) =>
    t.pistas?.[p.id] ? { ...p, ...t.pistas[p.id] } : p,
  )
  const fuentes = caso.fuentes.map((f, i) =>
    t.fuentes?.[i] ? { ...f, nombre: t.fuentes[i] } : f,
  )

  return {
    ...caso,
    titulo: t.titulo ?? caso.titulo,
    escenario: t.escenario ?? caso.escenario,
    explicacion: t.explicacion ?? caso.explicacion,
    origen: t.origen ?? caso.origen,
    senales: t.senales ?? caso.senales,
    pistas,
    fuentes,
  }
}