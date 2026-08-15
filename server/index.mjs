// MediaMind · Servidor de multijugador online (WebSocket).
// Salas por código, turnos y dictamen colectivo sincronizado.
//
// Uso:  node server/index.mjs            (puerto por defecto 8787)
//       PORT=9000 node server/index.mjs
//
// Protocolo (JSON):
//   cliente → servidor:
//     { tipo:'crear',   nombre, casoId, dificultad }
//     { tipo:'unirse',  nombre, codigo }
//     { tipo:'empezar' }                            (solo host)
//     { tipo:'voto',    vered, evidencias[], informe } (solo en su turno)
//     { tipo:'salir' }
//     { tipo:'ping' }
//   servidor → cliente:
//     { tipo:'bienvenido', yo, codigo, sala }
//     { tipo:'sala', sala }
//     { tipo:'turno', activoId }
//     { tipo:'fin', sala }   (incluye resultado)
//     { tipo:'error', mensaje }
//     { tipo:'pong' }

import { createServer } from 'node:http'
import { readFile, stat } from 'node:fs/promises'
import { dirname, join, normalize, extname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { WebSocketServer } from 'ws'

const __dirname = dirname(fileURLToPath(import.meta.url))
const DIST = join(__dirname, '..', 'dist')

// Sirve el build estático (dist/) con fallback a index.html (SPA).
const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.mp3': 'audio/mpeg',
  '.mp4': 'video/mp4',
  '.webm': 'video/webm',
  '.ico': 'image/x-icon',
  '.webmanifest': 'application/manifest+json',
  '.webp': 'image/webp',
  '.avif': 'image/avif',
  '.woff2': 'font/woff2',
  '.txt': 'text/plain; charset=utf-8',
}

async function servirEstatico(req, res) {
  const url = new URL(req.url, 'http://localhost')
  let ruta = decodeURIComponent(url.pathname)
  if (ruta === '/') ruta = '/index.html'
  const relativa = normalize(ruta).replace(/^([/\\])+/, '')
  const archivo = join(DIST, relativa)

  if (!archivo.startsWith(DIST)) {
    res.writeHead(403).end()
    return
  }

  try {
    const st = await stat(archivo)
    if (st.isFile()) {
      const tipo = MIME[extname(archivo).toLowerCase()] || 'application/octet-stream'
      const contenido = await readFile(archivo)
      if (url.pathname.includes('casos_web.json')) {
        res.setHeader('Cache-Control', 'no-store')
      }
      res.writeHead(200, { 'Content-Type': tipo })
      res.end(contenido)
      return
    }
  } catch {
    /* 404 → fallback SPA */
  }

  try {
    const idx = await readFile(join(DIST, 'index.html'))
    res.writeHead(200, { 'Content-Type': MIME['.html'] })
    res.end(idx)
  } catch {
    res.writeHead(404).end('Build no encontrado: ejecuta npm run build')
  }
}

const PUERTO = Number(process.env.PORT || 8787)
const MAX_JUGADORES = 8
const ALFABETO = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789'
const VEREDS = ['real', 'manipulado', 'falso', 'ia']

const salas = new Map()
let siguienteId = 1

function enviar(ws, obj) {
  if (ws && ws.readyState === 1) ws.send(JSON.stringify(obj))
}

function codigoSala() {
  let c
  do {
    c = Array.from({ length: 6 }, () => ALFABETO[Math.floor(Math.random() * ALFABETO.length)]).join('')
  } while (salas.has(c))
  return c
}

function nuevoId() {
  return `j${siguienteId++}`
}

function crearSala(ws, casoId, dificultad) {
  const codigo = codigoSala()
  const sala = {
    codigo,
    casoId,
    dificultad: Number.isFinite(dificultad) ? dificultad : 1,
    hostId: null,
    fase: 'espera', // espera | turnos | fin
    orden: [],
    turno: null,
    jugadores: new Map(),
    resultado: null,
    creadoEn: Date.now(),
    temporizador: null,
  }
  salas.set(codigo, sala)
  return sala
}

function agregarJugador(sala, ws, nombre) {
  const jugador = {
    id: nuevoId(),
    nombre: String(nombre).slice(0, 20),
    ws,
    conectado: true,
    rol: null,
    voto: null,
  }
  sala.jugadores.set(jugador.id, jugador)
  if (!sala.hostId) sala.hostId = jugador.id
  return jugador
}

function publica(sala) {
  return {
    codigo: sala.codigo,
    casoId: sala.casoId,
    dificultad: sala.dificultad,
    fase: sala.fase,
    hostId: sala.hostId,
    turno: sala.turno,
    jugadores: [...sala.jugadores.values()].map((j) => ({
      id: j.id,
      nombre: j.nombre,
      conectado: j.conectado,
      rol: j.rol,
      listo: Boolean(j.voto),
    })),
    resultado: sala.resultado,
  }
}

function broadcast(sala) {
  const msg = JSON.stringify({ tipo: 'sala', sala: publica(sala) })
  for (const j of sala.jugadores.values()) {
    if (j.conectado) enviar(j.ws, JSON.parse(msg))
  }
}

function reasignarHost(sala) {
  if (sala.jugadores.get(sala.hostId)?.conectado) return
  const candidato = [...sala.jugadores.values()].find((j) => j.conectado)
  if (candidato) sala.hostId = candidato.id
}

function siguienteSinVoto(sala, desde) {
  const n = sala.orden.length
  for (let k = 1; k <= n; k++) {
    const id = sala.orden[(desde + k) % n]
    const j = sala.jugadores.get(id)
    if (j && j.conectado && !j.voto) return id
  }
  return null
}

function cerrarTurno(sala) {
  const siguiente = siguienteSinVoto(sala, sala.orden.indexOf(sala.turno))
  if (siguiente) {
    sala.turno = siguiente
    return
  }
  calcularFin(sala)
}

function calcularFin(sala) {
  const votos = [...sala.jugadores.values()]
    .map((j) => ({
      id: j.id,
      nombre: j.nombre,
      voto: j.voto,
    }))
    .filter((x) => x.voto)

  const conteo = { real: 0, manipulado: 0, falso: 0, ia: 0 }
  for (const v of votos) conteo[v.voto.vered] += 1

  let ganadores = Object.keys(conteo).filter((v) => conteo[v] === Math.max(...Object.values(conteo)))
  let vered = ganadores[0]
  if (ganadores.length > 1) {
    const host = sala.jugadores.get(sala.hostId)
    vered = host?.voto?.vered ?? ganadores[0]
  }

  const porJugador = [...sala.jugadores.values()].map((j) => {
    const acertado = Boolean(j.voto && j.voto.vered === vered)
    return {
      id: j.id,
      nombre: j.nombre,
      vered: j.voto?.vered ?? null,
      acertado,
      puntos: acertado ? 50 + sala.dificultad * 40 : 0,
    }
  })

  sala.resultado = { vered, conteo, porJugador }
  sala.fase = 'fin'
  sala.turno = null
  broadcast(sala)
}

const server = createServer((req, res) => {
  void servirEstatico(req, res)
})

const wss = new WebSocketServer({ server })
server.listen(PUERTO, () => {
  console.log(`MediaMind · multijugador en ws://localhost:${PUERTO} · estáticos en http://localhost:${PUERTO}`)
})

wss.on('connection', (ws) => {
  let sala = null
  let idJugador = null
  let nombre = ''

  const rechazar = (mensaje) => enviar(ws, { tipo: 'error', mensaje })

  ws.on('message', (data) => {
    let msg
    try {
      msg = JSON.parse(data.toString())
    } catch {
      return
    }
    const tipo = msg?.tipo

    if (tipo === 'crear') {
      nombre = String(msg.nombre || '').trim().slice(0, 20)
      const casoId = String(msg.casoId || '').slice(0, 24)
      if (!nombre) return rechazar('Nombre requerido')
      if (!casoId) return rechazar('No se seleccionó ningún caso')
      sala = crearSala(ws, casoId, msg.dificultad)
      const j = agregarJugador(sala, ws, nombre)
      idJugador = j.id
      sala.orden = [...sala.jugadores.keys()]
      enviar(ws, { tipo: 'bienvenido', yo: idJugador, codigo: sala.codigo, sala: publica(sala) })
      return
    }

    if (tipo === 'unirse') {
      nombre = String(msg.nombre || '').trim().slice(0, 20)
      const codigo = String(msg.codigo || '').toUpperCase().trim()
      if (!nombre) return rechazar('Nombre requerido')
      sala = salas.get(codigo)
      if (!sala) return rechazar('La sala no existe')
      if (sala.jugadores.size >= MAX_JUGADORES) return rechazar('La sala está completa')
      if (sala.fase !== 'espera') return rechazar('La partida ya comenzó')

      const existente = [...sala.jugadores.values()].find((j) => j.nombre === nombre)
      if (existente && !existente.conectado) {
        existente.ws = ws
        existente.conectado = true
        idJugador = existente.id
      } else {
        const j = agregarJugador(sala, ws, nombre)
        idJugador = j.id
        sala.orden = [...sala.jugadores.keys()]
      }
      enviar(ws, { tipo: 'bienvenido', yo: idJugador, codigo: sala.codigo, sala: publica(sala) })
      broadcast(sala)
      return
    }

    if (tipo === 'empezar') {
      if (!sala || !idJugador) return rechazar('Sin sala')
      if (sala.hostId !== idJugador) return rechazar('Solo el anfitrión puede empezar')
      if (sala.fase === 'turnos') return rechazar('La partida ya está en curso')
      const conectados = [...sala.jugadores.values()].filter((j) => j.conectado)
      if (conectados.length < 2) return rechazar('Se necesitan al menos 2 jugadores')
      for (const j of sala.jugadores.values()) {
        j.voto = null
        j.rol = null
      }
      sala.resultado = null
      sala.fase = 'turnos'
      sala.orden = [...sala.jugadores.keys()]
      sala.turno = sala.orden[0]
      broadcast(sala)
      return
    }

    if (tipo === 'voto') {
      if (!sala || !idJugador || sala.fase !== 'turnos') return rechazar('No puedes votar ahora')
      if (sala.turno !== idJugador) return rechazar('Espera tu turno')
      const vered = msg.vered
      if (!VEREDS.includes(vered)) return rechazar('Veredicto inválido')
      const evidencias = Array.isArray(msg.evidencias) ? msg.evidencias.slice(0, 12).map(String) : []
      const informe = String(msg.informe || '').slice(0, 400)
      sala.jugadores.get(idJugador).voto = { vered, evidencias, informe }
      cerrarTurno(sala)
      broadcast(sala)
      return
    }

    if (tipo === 'salir') {
      if (sala && idJugador) {
        sala.jugadores.delete(idJugador)
        sala.orden = sala.orden.filter((x) => x !== idJugador)
        if (sala.hostId === idJugador) reasignarHost(sala)
        if (sala.jugadores.size === 0) {
          salas.delete(sala.codigo)
        } else {
          broadcast(sala)
        }
      }
      ws.close()
      return
    }

    if (tipo === 'ping') {
      enviar(ws, { tipo: 'pong' })
    }
  })

  ws.on('close', () => {
    if (!sala || !idJugador) return
    const j = sala.jugadores.get(idJugador)
    if (!j) return
    j.conectado = false
    j.ws = null
    reasignarHost(sala)

    if (sala.fase === 'turnos' && sala.turno === idJugador) {
      cerrarTurno(sala)
    }

    const restantes = [...sala.jugadores.values()].filter((p) => p.conectado).length
    if (restantes === 0) {
      clearTimeout(sala.temporizador)
      sala.temporizador = setTimeout(() => {
        if (salas.get(sala.codigo) === sala) salas.delete(sala.codigo)
      }, 60000)
    } else {
      broadcast(sala)
    }
  })
})

process.on('SIGINT', () => {
  for (const s of salas.values()) {
    for (const j of s.jugadores.values()) if (j.conectado) j.ws.close()
  }
  wss.close(() => {
    server.close(() => process.exit(0))
  })
})