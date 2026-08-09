import type { Caso, CasoWeb } from '../types'

/**
 * Convierte un caso capturado desde la web (feeds de verificadores) en un
 * caso de juego completo. Las pistas son sintéticas y pedagógicas: señalan
 * el origen, el veredicto del verificador y las señales detectadas.
 */
export function webACaso(w: CasoWeb): Caso {
  const vered = w.veredSegun
  const fecha = w.fecha ? new Date(w.fecha).toISOString().slice(0, 10) : ''
  const archivo = `https://web.archive.org/web/2026/${w.url}`

  return {
    id: w.id,
    titulo: w.titulo,
    escenario: w.descripcion,
    categoria: w.categoria,
    tipoContenido: w.tipoContenido,
    dificultad: w.dificultad,
    modo: 'individual',
    segmento: '18-30',
    pistas: [
      {
        id: `${w.id}-p1`,
        tipo: 'contexto',
        titulo: 'Contexto de publicacion',
        contenido: `Publicado originalmente por ${w.origen}${fecha ? ` el ${fecha}` : ''}. La verificacion cubre un contenido que circulo en redes o medios.`,
        rol: 'rastreador_contexto',
      },
      {
        id: `${w.id}-p2`,
        tipo: 'fuente',
        titulo: 'Evaluacion del verificador',
        contenido: `${w.origen} analizo este contenido y lo clasifico como "${vered}" tras contrastar fuentes primarias y publicaciones originales.`,
        rol: 'verificador_fuentes',
      },
      {
        id: `${w.id}-p3`,
        tipo: 'metadato',
        titulo: 'Señales detectadas',
        contenido: w.senales.join('. '),
        rol: 'analista_imagen',
      },
    ],
    correcto: vered,
    explicacion: `${w.origen} evaluo este contenido (${fecha}) y concluyo que es ${vered}. Señales: ${w.senales.join(', ')}.`,
    senales: w.senales,
    fuentes: [{ nombre: w.origen, url: w.url, confiable: true }],
    esIA: w.esIA,
    creado: 'web',
    fuenteWeb: w.url,
    fuenteArchivo: archivo,
    origen: w.origen,
    fechaWeb: w.fecha,
  }
}

/**
 * Descarga los casos capturados por el worker (public/casos_web.json).
 * Con cache-busting para que el navegador no sirva una copia vieja.
 */
export async function cargarCasosWeb(): Promise<Caso[]> {
  try {
    const res = await fetch(`casos_web.json?cb=${Date.now()}`, { cache: 'no-store' })
    if (!res.ok) return []
    const datos = (await res.json()) as CasoWeb[]
    if (!Array.isArray(datos)) return []
    return dedupCasos(datos.map(webACaso))
  } catch {
    return []
  }
}

function dedupCasos(casos: Caso[]): Caso[] {
  const vistos = new Set<string>()
  return casos.filter((c) => {
    if (vistos.has(c.id)) return false
    vistos.add(c.id)
    return true
  })
}