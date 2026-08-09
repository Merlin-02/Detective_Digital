import { create } from 'zustand'
import type { Caso } from '../types'
import { cargarCasosWeb } from '../services/casosService'

interface CasosState {
  web: Caso[]
  estado: 'cargando' | 'listo' | 'sinweb'
  cargar: () => Promise<void>
}

export const useCasos = create<CasosState>()((set, get) => ({
  web: [],
  estado: 'sinweb',
  cargar: async () => {
    if (get().estado === 'cargando') return
    set({ estado: 'cargando' })
    try {
      const web = await cargarCasosWeb()
      set({ web, estado: web.length ? 'listo' : 'sinweb' })
    } catch {
      set({ estado: 'sinweb' })
    }
  },
}))