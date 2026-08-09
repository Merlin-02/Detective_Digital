// Worker de captura de casos para "MediaMind".
// Lee feeds RSS/Atom públicos de verificadores y normaliza cada entrada en un
// CasoWeb (con heurística pedagógica) y publica:
//   - public/casos_web.json   → consumido por la app frontend
//   - server/db/casos.db.json → base de datos local (historial + dedupe)
// Opcionalmente sincroniza con Supabase (REST) si hay variables de entorno.
//
// Uso:
//   node scripts/worker.mjs
//   node scripts/worker.mjs --max 12
//
// Nota ética y legal:
//   - Solo consume feeds RSS/Atom públicos (no scrapea páginas HTML).
//   - Cada ítem conserva su atribución, fecha y URL original.
//   - Se incluye una copia de respaldo en Internet Archive desde la app.
//   - Cualquier scraping adicional futuro deberá respetar robots.txt.

import { mkdirSync, readFileSync, writeFileSync, existsSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const RAIZ = join(__dirname, '..')
const USER_AGENT =
  'MediaMindWorker/1.0 (unicamente feeds RSS/Atom; finalidad pedagogica)'

const FUENTES = [
  {
    id: 'chequeado',
    nombre: 'Chequeado',
    rss: 'https://chequeado.com/feed/',
    base: 'https://chequeado.com/',
    porDefecto: 'politica',
  },
  {
    id: 'maldita',
    nombre: 'Maldita.es',
    rss: 'https://www.maldita.es/feed/',
    base: 'https://www.maldita.es/maldito-bulo/',
    porDefecto: 'politica',
  },
  {
    id: 'gnews-mil',
    nombre: 'Google News · Verificacion',
    rss: 'https://news.google.com/rss/search?q=%22es%20falso%22%20OR%20%22bulo%22%20inteligencia%20artificial&hl=es-419&gl=MX&ceid=MX:es-419',
    base: 'https://news.google.com/',
    porDefecto: 'ia',
  },
]

// ---- utilidades ---------------------------------------------------------

function arg(name, def) {
  const i = process.argv.findIndex((a) => a === `--${name}`)
  return i >= 0 ? process.argv[i + 1] : def
}

const MAX_POR_FUENTE = Number(arg('max', '8'))

function dormir(ms) {
  return new Promise((r) => setTimeout(r, ms))
}

function normalizar(s = '') {
  return s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()
}

function decodeHtml(s = '') {
  return s
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1')
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
}

function aTexto(s = '') {
  return decodeHtml(s).replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()
}

function valorTag(xml, tag) {
  const re = new RegExp(`<${tag}(?:[^>]*)>([\\s\\S]*?)</${tag}>`, 'i')
  const m = re.exec(xml)
  return m ? aTexto(m[1]) : ''
}

function valorLink(xml) {
  const href = /<link[^>]*href=["']([^"']+)["']/i.exec(xml)
  if (href) return href[1]
  const m = /<link[^>]*>([\s\S]*?)<\/link>/i.exec(xml)
  return m ? aTexto(m[1]) : ''
}

function numerar(string) {
  let h = 5381
  for (let i = 0; i < string.length; i++) h = ((h << 5) + h) ^ string.charCodeAt(i)
  return (h >>> 0).toString(36)
}

function fijaFecha(fecha) {
  const f = new Date(fecha)
  return Number.isNaN(f.getTime()) ? new Date().toISOString() : f.toISOString()
}

async function obtenerXml(url) {
  const controlador = new AbortController()
  const timer = setTimeout(() => controlador.abort(), 15000)
  try {
    const res = await fetch(url, {
      signal: controlador.signal,
      headers: { 'User-Agent': USER_AGENT, Accept: 'application/rss+xml, application/xml, text/xml' },
      redirect: 'follow',
    })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    return await res.text()
  } finally {
    clearTimeout(timer)
  }
}

function extraerItems(xml) {
  const items = []
  const reRss = /<item[\s>]([\s\S]*?)<\/item>/gi
  let m
  while ((m = reRss.exec(xml)) !== null) {
    const b = m[1]
    items.push({
      titulo: valorTag(b, 'title'),
      link: valorLink(b),
      fecha: valorTag(b, 'pubDate') || valorTag(b, 'date'),
      descripcion: valorTag(b, 'description'),
    })
  }
  const reAtom = /<entry[\s>]([\s\S]*?)<\/entry>/gi
  while ((m = reAtom.exec(xml)) !== null) {
    const b = m[1]
    items.push({
      titulo: valorTag(b, 'title'),
      link: valorLink(b),
      fecha: valorTag(b, 'updated') || valorTag(b, 'published'),
      descripcion: valorTag(b, 'summary') || valorTag(b, 'content'),
    })
  }
  return items.filter((i) => i.titulo && i.link)
}

// ---- heuristica pedagogica -------------------------------------------------

function clasificar(titulo, descripcion, fuente) {
  const t = normalizar(`${titulo} ${descripcion}`)

  let categoria = fuente.porDefecto
  if (/(salud|vacuna|vaccin|medico|medicina|medicamento|virus|covid|enfermed|farmacia|brote|pandemia)/.test(t)) categoria = 'salud'
  else if (/(decepft|de cop|clonaci|voz sintet|voz clonada|genera.{0,8}ia|chatgpt|gpt|chatbot)/.test(t)) categoria = 'ia'
  else if (/(eleccion|voto|votar|politic|gobierno|ministro|presiden|senador|diputado)/.test(t)) categoria = 'politica'
  else if (/(econom|dinero|bono|banco central|pension|inflad|cripto|salario)/.test(t)) categoria = 'economia'
  else if (/(ciencia|estudio|investigaci|astro|nasa|cientific)/.test(t)) categoria = 'ciencia'
  else if (/(deporte|futbol|futbol|atletismo|seleccion|equipo|olimp)/.test(t)) categoria = 'deporte'
  else if (/(musica|musica|cine|pelicula|celebridad|influencer|espectaculo|viral|redes sociales|memes)/.test(t)) categoria = 'entretenimiento'

  let tipoContenido = 'noticia'
  if (/(audio|voz|mensaje de voz)/.test(t)) tipoContenido = 'audio'
  else if (/(video|tiktok|youtube|reels|clip)/.test(t)) tipoContenido = 'video'
  else if (/(imagen|foto|fotos|retrato|meme|gif)/.test(t)) tipoContenido = 'imagen'
  else if (/(cadena|whatsapp|reenvio|reenviar|chats|reposted)/.test(t)) tipoContenido = 'cadena'

  let vered = 'falso'
  if (/(manipul|editado|montaje|recortad|fuera de contexto|descontext)/.test(t)) vered = 'manipulado'
  else if (/(deepfake|voz clonada|voz sintet|generado por ia|video.?ia|imagen.?ia|clonad)/.test(t)) vered = 'ia'
  else if (/^\s*(si|hay si|se confirma|confirman|noticias falsas|sí,)\b/.test(t) || /^(es verdad|es cierto|confirmado)/.test(t)) vered = 'real'
  else if (/(verdad(?:ero|eramente)?|cierto|autentico|comprobado|confirmado|oficial)/.test(t)) vered = 'real'
  else if (/(falso|falsa|desment|sin pruebas|no es cierto|enganoso|no tiene evidenci)/.test(t)) vered = 'falso'

  return { categoria, tipoContenido, vered }
}

function esVeredicto(titulo, descripcion) {
  const t = normalizar(`${titulo} ${descripcion}`)
  const positivo =
    /(no es |no, |es falso|son falsa|falso que|fin ca|bulo|desmenti|verifica|verificacion|comproba|manipul|montaje|recortad|fuera de contexto|descontextual|mentira|sin pruebas|no teng0 evidencia|baseo)/.test(t)
  const editorial =
    /(para verificar|como verificar|herramienta|taller|lanza|convocatoria|invitamos|formar|formac|comunidad|reconocid|agradec|conference|opinion|defensa|premiad|carta abierta|gana la|ciudadania informada)/.test(t)
  return positivo && !editorial
}

function senalesPara(vered, origen) {
  const base = `Evaluado por ${origen}`
  if (vered === 'real') return [base, 'Fuente primaria verificable', 'Coincide con el comunicado oficial', 'Fecha y autoria claras']
  if (vered === 'manipulado') return [base, 'Materia real pero alterada o fuera de contexto', 'Corte, bucle o edicion visible', 'La version original no coincide con la viral']
  if (vered === 'ia') return [base, 'Posible generacion automatica (IA)', 'Senales tecnicas de IA (voz, imagen, texto)', 'Se difunde sin marca de contenido IA']
  return [base, 'Afirmacion sin evidencia reproducible', 'Falta atribucion a una fuente primaria', 'Patron de reenvio/cadena para viralizar']
}

// ---- persistencia ----------------------------------------------------------

const DIR_DB = join(RAIZ, 'server', 'db')
const VISTOS = join(DIR_DB, 'vistos.txt')
const WEB_JSON = join(RAIZ, 'public', 'casos_web.json')
const DB_JSON = join(DIR_DB, 'casos.db.json')

function cargarVistos() {
  if (!existsSync(VISTOS)) return new Set()
  return new Set(readFileSync(VISTOS, 'utf8').split('\n').filter(Boolean))
}

async function syncSupabase(casos) {
  const url = process.env.SUPABASE_URL
  const key = process.env.SUPABASE_ANON_KEY || process.env.SUPABASE_SERVICE_KEY
  const tabla = process.env.SUPABASE_TABLE || 'casos_web'
  if (!url || !key) {
    console.log('  · Supabase no configurado (crear .env para activarlo)')
    return
  }
  const headers = { apikey: key, Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' }
  console.log(`  → sincronizando ${casos.length} casos a Supabase :: ${tabla}`)
  for (const c of casos) {
    const sel = `${url}/rest/v1/${tabla}?id=eq.${c.id}`
    const cuerpo = JSON.stringify({ ...c, updated_at: new Date().toISOString() })
    let check
    try {
      check = await fetch(sel, { headers })
    } catch {
      continue
    }
    if (check.ok && (await check.json()).length) {
      await fetch(sel, { method: 'PATCH', headers, body: cuerpo })
    } else {
      await fetch(`${url}/rest/v1/${tabla}`, {
        method: 'POST',
        headers: { ...headers, Prefer: 'resolution=ignore-duplicates' },
        body: cuerpo,
      })
    }
    await dormir(140)
  }
  console.log('  ok Supabase')
}

// ---- main --------------------------------------------------------------------

async function main() {
  const inicio = Date.now()
  if (existsSync(join(RAIZ, '.env'))) {
    for (const l of readFileSync(join(RAIZ, '.env'), 'utf8').split('\n')) {
      const m = /^([A-Za-z_]+)=(.*)$/.exec(l.trim())
      if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^["']|["']$/g, '')
    }
  }

  console.log('MediaMind · Worker de casos')
  console.log(`Fuentes: ${FUENTES.map((f) => f.nombre).join(', ')}\n`)

  const vistos = cargarVistos()
  const generados = []

  for (let i = 0; i < FUENTES.length; i++) {
    const fuente = FUENTES[i]
    try {
      console.log(`[${i + 1}/${FUENTES.length}] ${fuente.nombre}`)
      const xml = await obtenerXml(fuente.rss)
      const items = extraerItems(xml).slice(0, MAX_POR_FUENTE * 8)
      let descartados = 0
      if (items.length === 0) {
        console.log('    · sin entradas')
        continue
      }
      const antes = generados.length
      for (const item of items) {
        if (generados.length - antes >= MAX_POR_FUENTE) break
        if (!esVeredicto(item.titulo, item.descripcion)) {
          descartados++
          continue
        }
        const clave = numerar(`${fuente.id}|${item.titulo}|${item.link}`)
        if (vistos.has(clave)) continue
        vistos.add(clave)

        const { categoria, tipoContenido, vered } = clasificar(item.titulo, item.descripcion, fuente)
        const fecha = fijaFecha(item.fecha)
        const origen = fuente.nombre
        const id = `w-${numerar(clave).slice(0, 12)}`
        generados.push({
          id,
          titulo: item.titulo.slice(0, 140),
          descripcion: (item.descripcion || '').slice(0, 520) || 'Contenido sujeto a verificacion segun el medio de origen.',
          categoria,
          tipoContenido,
          dificultad: vered === 'manipulado' || vered === 'ia' ? 2 : 1,
          url: item.link,
          origen,
          fecha,
          veredSegun: vered,
          esIA: vered === 'ia',
          senales: senalesPara(vered, fuente.nombre),
        })
      }
      console.log(`    ${items.length} leidas · ${generados.length - antes} nuevas · ${descartados} editoriales`)
    } catch (err) {
      console.warn(`    | error: ${err.message}`)
    }
    if (i < FUENTES.length - 1) await dormir(2000)
  }

  mkdirSync(DIR_DB, { recursive: true })

  let previos = []
  if (existsSync(WEB_JSON)) {
    try {
      const p = JSON.parse(readFileSync(WEB_JSON, 'utf8'))
      if (Array.isArray(p)) previos = p
    } catch {
      previos = []
    }
  }
  const porId = new Map(previos.map((c) => [c.id, c]))
  for (const c of generados) porId.set(c.id, c)
  const todos = [...porId.values()]

  writeFileSync(WEB_JSON, JSON.stringify(todos, null, 2))
  writeFileSync(DB_JSON, JSON.stringify({ generado: new Date().toISOString(), total: todos.length, casos: todos }, null, 2))
  writeFileSync(VISTOS, [...vistos].join('\n'))

  console.log(`\n→ ${generados.length} nuevos · ${todos.length} casos en public/casos_web.json`)
  await syncSupabase(generados)
  console.log(`Listo en ${((Date.now() - inicio) / 1000).toFixed(1)}s`)
}

main().catch((e) => {
  console.error(e.message)
  process.exit(1)
})