import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import type { RespuestaCaso, Categoria, TipoContenido, Dificultad, Modo } from '../types'
import { puntajeDe } from '../services/label'

interface GameState {
  respuestas: RespuestaCaso[]
  setCaso: (r: RespuestaCaso) => void
  cargarEjemplo: () => void
  reset: () => void
}

function hace(dias: number) {
  const d = new Date()
  d.setDate(d.getDate() - dias)
  return d.toISOString()
}

type EjemploItem = {
  caso: string
  categoria: Categoria
  tipoContenido: TipoContenido
  dificultad: Dificultad
  segmento: string
  modo: Modo
  correcto: boolean
  pistas: [number, number]
  dias: number
  equipo?: boolean
}

const EJEMPLO: EjemploItem[] = [
  { caso: 'c01', categoria: 'salud', tipoContenido: 'cadena', dificultad: 1, segmento: '13-17', modo: 'individual', correcto: true, pistas: [4, 4], dias: 12 },
  { caso: 'c02', categoria: 'deporte', tipoContenido: 'imagen', dificultad: 2, segmento: '13-17', modo: 'individual', correcto: false, pistas: [2, 4], dias: 10 },
  { caso: 'c03', categoria: 'politica', tipoContenido: 'video', dificultad: 3, segmento: '18-24', modo: 'individual', correcto: true, pistas: [4, 4], dias: 8 },
  { caso: 'c04', categoria: 'ciencia', tipoContenido: 'noticia', dificultad: 3, segmento: '25-30', modo: 'individual', correcto: true, pistas: [3, 4], dias: 6 },
  { caso: 'c05', categoria: 'ia', tipoContenido: 'audio', dificultad: 4, segmento: '18-30', modo: 'individual', correcto: true, pistas: [4, 4], dias: 5 },
  { caso: 'c06', categoria: 'entretenimiento', tipoContenido: 'imagen', dificultad: 1, segmento: '13-17', modo: 'individual', correcto: false, pistas: [2, 4], dias: 3 },
  { caso: 'c07', categoria: 'economia', tipoContenido: 'cadena', dificultad: 1, segmento: '25-30', modo: 'individual', correcto: true, pistas: [4, 4], dias: 2 },
  { caso: 'c08', categoria: 'salud', tipoContenido: 'noticia', dificultad: 1, segmento: '13-17', modo: 'individual', correcto: true, pistas: [4, 4], dias: 1 },
  { caso: 't01', categoria: 'politica', tipoContenido: 'video', dificultad: 3, segmento: '18-30', modo: 'equipo', correcto: true, pistas: [4, 4], dias: 4, equipo: true },
  { caso: 't03', categoria: 'ia', tipoContenido: 'audio', dificultad: 4, segmento: '18-30', modo: 'equipo', correcto: true, pistas: [4, 4], dias: 0, equipo: true },
]

function toRespuesta(item: EjemploItem): RespuestaCaso {
  return {
    casoId: item.caso,
    modo: item.modo,
    categoria: item.categoria,
    tipoContenido: item.tipoContenido,
    dificultad: item.dificultad,
    segmento: item.segmento as RespuestaCaso['segmento'],
    correcto: item.correcto,
    puntos: puntajeDe(item),
    pistasConsultadas: item.pistas[0],
    totalPistas: item.pistas[1],
    fecha: hace(item.dias),
    equipo: item.equipo,
  }
}

export const useGame = create<GameState>()(
  persist(
    (set) => ({
      respuestas: [],
      setCaso: (r) =>
        set((state) => ({ respuestas: [...state.respuestas, r] })),
      cargarEjemplo: () =>
        set({ respuestas: EJEMPLO.map(toRespuesta).sort((a, b) => a.fecha.localeCompare(b.fecha)) }),
      reset: () => set({ respuestas: [] }),
    }),
    {
      name: 'dd.respuestas',
      storage: createJSONStorage(() => localStorage),
    },
  ),
)