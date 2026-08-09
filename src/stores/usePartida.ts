import { create } from 'zustand'

export interface JugadorPub {
  id: string
  nombre: string
  conectado: boolean
  rol: string | null
  listo: boolean
}

export interface ResultadoFin {
  vered: 'real' | 'manipulado' | 'falso' | 'ia'
  conteo: Record<string, number>
  porJugador: { id: string; nombre: string; vered: string | null; acertado: boolean; puntos: number }[]
}

export interface SalaPub {
  codigo: string
  casoId: string
  dificultad: number
  fase: 'espera' | 'turnos' | 'fin'
  hostId: string
  turno: string | null
  jugadores: JugadorPub[]
  resultado: ResultadoFin | null
}

type Msg =
  | { tipo: 'bienvenido'; yo: string; codigo: string; sala: SalaPub }
  | { tipo: 'sala'; sala: SalaPub }
  | { tipo: 'turno'; activoId: string }
  | { tipo: 'fin'; sala: SalaPub }
  | { tipo: 'error'; mensaje: string }
  | { tipo: 'pong' }

interface PartidaState {
  estatus: 'desconectado' | 'abriendo' | 'conectado' | 'error'
  yoId: string | null
  codigo: string | null
  sala: SalaPub | null
  error: string | null
  conectar: () => void
  crearSala: (nombre: string, casoId: string, dificultad: number) => void
  unirseSala: (nombre: string, codigo: string) => void
  empezar: () => void
  enviarVoto: (datos: { vered: string; evidencias: string[]; informe: string }) => void
  salir: (cerrar?: boolean) => void
  reiniciar: () => void
}

let ws: WebSocket | null = null
let conectoUnaVez = false
let cola: unknown[] = []

function urlWs(): string {
  const configurada = import.meta.env.VITE_WS_URL as string | undefined
  if (configurada) return configurada
  const host = window.location.host
  if (host.startsWith('localhost') || host.startsWith('127.0.0.1')) {
    return 'ws://localhost:8787'
  }
  const proto = window.location.protocol === 'https:' ? 'wss:' : 'ws:'
  return `${proto}//${host}`
}

function enviarDirecto(obj: Record<string, unknown>): void {
  if (ws && ws.readyState === WebSocket.OPEN) ws.send(JSON.stringify(obj))
}

function mensaje(obj: Record<string, unknown>): void {
  if (ws && ws.readyState === WebSocket.OPEN) {
    enviarDirecto(obj)
  } else {
    cola.push(obj)
  }
}

export const usePartida = create<PartidaState>()((set, get) => {
  const aplicar = (data: Msg) => {
    switch (data.tipo) {
      case 'bienvenido':
        set({ yoId: data.yo, codigo: data.codigo, sala: data.sala, error: null })
        break
      case 'sala':
        set({ sala: data.sala })
        break
      case 'turno':
        if (get().sala) set({ sala: { ...get().sala!, turno: data.activoId } })
        break
      case 'fin':
        set({ sala: data.sala })
        break
      case 'error':
        set({ error: data.mensaje })
        break
      case 'pong':
        break
    }
  }

  return {
    estatus: 'desconectado',
    yoId: null,
    codigo: null,
    sala: null,
    error: null,

    conectar: () => {
      if (get().estatus === 'conectado' || get().estatus === 'abriendo') return
      set({ estatus: 'abriendo', error: null })
      try {
        ws = new WebSocket(urlWs())
      } catch {
        set({ estatus: 'error', error: 'multi.error.server' })
        return
      }

      ws.onopen = () => {
        conectoUnaVez = true
        set({ estatus: 'conectado', error: null })
        const pendientes = cola
        cola = []
        for (const o of pendientes) enviarDirecto(o as Record<string, unknown>)
      }
      ws.onmessage = (ev) => {
        try {
          aplicar(JSON.parse(ev.data as string) as Msg)
        } catch {
          /* ignora tramas corruptas */
        }
      }
      ws.onclose = () => {
        ws = null
        cola = []
        set({ estatus: 'desconectado' })
      }
      ws.onerror = () => {
        cola = []
        set({ estatus: 'error', error: conectoUnaVez ? null : 'multi.error.server' })
      }
    },

    crearSala: (nombre, casoId, dificultad) => {
      if (get().estatus !== 'conectado') get().conectar()
      mensaje({ tipo: 'crear', nombre, casoId, dificultad })
    },

    unirseSala: (nombre, codigo) => {
      if (get().estatus !== 'conectado') get().conectar()
      mensaje({ tipo: 'unirse', nombre, codigo })
    },

    empezar: () => mensaje({ tipo: 'empezar' }),
    enviarVoto: (datos) => mensaje({ tipo: 'voto', ...datos }),
    salir: (cerrar = true) => {
      try {
        mensaje({ tipo: 'salir' })
      } finally {
        if (cerrar && ws) ws.close()
      }
      set({ yoId: null, codigo: null, sala: null, error: null })
    },

    reiniciar: () => {
      set({ yoId: null, codigo: null, sala: null, error: null, estatus: 'desconectado' })
      if (ws) {
        ws.close()
        ws = null
      }
    },
  }
})