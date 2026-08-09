import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import type {
  ComunidadVerificada,
  CursoComunitario,
  DatoComunidad,
  MaterialEstudio,
  EstadoCuantia,
} from '../types'

function diasAtras(dias: number) {
  const d = new Date()
  d.setDate(d.getDate() - dias)
  return d.toISOString().slice(0, 10)
}

const SEED: DatoComunidad[] = [
  {
    id: 'v01',
    autor: 'Aya·Dana',
    titulo: 'El meme del examen',
    descripcion:
      'Durante la semana de exámenes circuló un meme diciendo que "reprueban sin remedio" y con tips supuestamente de un profesor. Lo integró al banco el equipo curador.',
    categoria: 'entretenimiento',
    estado: 'validado',
    votos: 32,
    fecha: diasAtras(21),
    tags: ['memes', 'escuela'],
  },
  {
    id: 'v02',
    autor: 'Dete·Lab',
    titulo: 'El mapa de la campaña de salud del país',
    descripcion:
      'Mapa compartido durante una vacunación escolar, con fechas que no coinciden con el calendario oficial. Vive en la comunidad porque lo refirió una estudiante de secundaria.',
    categoria: 'salud',
    estado: 'validado',
    votos: 18,
    fecha: diasAtras(14),
    tags: ['salud', 'escuela'],
  },
  {
    id: 'v03',
    autor: 'Juli',
    titulo: 'La foto "filtrada" del evento musical',
    descripcion:
      'Una imagen del evento musical publicada como "filtración del interior" días antes de la fecha, en realidad de un festival anterior. A evaluar.',
    categoria: 'entretenimiento',
    estado: 'pendiente',
    votos: 9,
    fecha: diasAtras(7),
    tags: ['música', 'filtrado'],
  },
  {
    id: 'v04',
    autor: 'Kit',
    titulo: 'El audio falsificado del concejal',
    descripcion:
      'Audio de WhatsApp con una voz parecida a la del concejal prometiendo obras por dinero. Los verificadores lo marcan como probable clonación de voz.',
    categoria: 'politica',
    estado: 'pendiente',
    votos: 5,
    fecha: diasAtras(3),
    tags: ['audio', 'IA'],
  },
  {
    id: 'v05',
    autor: 'Mar·Cem',
    titulo: 'La imagen probable del deepfake deportivo',
    descripcion:
      'Una imagen súper realista de un atleta saltando encima de la fila de personas. Muy parecida a generación generativa: requiere revisión curatorial.',
    categoria: 'deporte',
    estado: 'rechazado',
    votos: 2,
    fecha: diasAtras(1),
    tags: ['imagen', 'IA'],
  },
]

const SEED_COMUNIDADES: ComunidadVerificada[] = [
  {
    id: 'c01',
    nombre: 'Red Juvenil de Alfabetización Mediática',
    descripcion:
      'Colectivo de jóvenes que facilitan talleres en escuelas rurales y urbanas sobre cómo verificar lo que circula en celulares y redes.',
    tipo: 'colectivo',
    verificada: true,
    miembros: 240,
    temas: ['politica', 'salud', 'entretenimiento'],
  },
  {
    id: 'c02',
    nombre: 'Dete·Lab',
    descripcion:
      'Laboratorio escolar de verificación de datos. Publica guías cortas y realiza webinars quincenales abiertos sobre IA y desinformación.',
    tipo: 'laboratorio',
    verificada: true,
    miembros: 86,
    temas: ['ia', 'ciencia', 'economia'],
  },
  {
    id: 'c03',
    nombre: 'Aula Verificada',
    descripcion:
      'Espacio de docentes que comparten secuencias didácticas y casos de aula para enseñar pensamiento crítico en cualquier materia.',
    tipo: 'educador',
    verificada: true,
    miembros: 152,
    temas: ['ciencia', 'politica', 'deporte'],
  },
  {
    id: 'c04',
    nombre: 'Medios con Criterio',
    descripcion:
      'Iniciativa de una organización local de periodistas. Propone sesiones de verificación en vivo y acompaña la curación de la comunidad.',
    tipo: 'institucion',
    verificada: false,
    miembros: 41,
    temas: ['politica', 'economia', 'ia'],
  },
]

const SEED_CURSOS: CursoComunitario[] = [
  {
    id: 'k01',
    comunidadId: 'c01',
    tipo: 'webinar',
    titulo: 'El meme que no suma: detectar cadenas virales',
    descripcion:
      'Sesión en vivo de 45 minutos: por qué los memes y las cadenas son el canal favorito de la desinformación y cómo revisarlos antes de reenviar.',
    categoria: 'entretenimiento',
    duracion: '45 min',
    cuando: 'Jueves 20:00',
    enlace: 'https://ejemplo.org/meme-no-suma',
    estado: 'validado',
    votos: 23,
    fecha: diasAtras(10),
  },
  {
    id: 'k02',
    comunidadId: 'c02',
    tipo: 'curso',
    titulo: 'IA y desinformación: 4 sesiones para no caer',
    descripcion:
      'Mini curso semanal: cómo se fabrican deepfakes, voces clonadas e imágenes sintéticas, y qué señales delatan a la IA.',
    categoria: 'ia',
    duracion: '4 sesiones · 30 min',
    cuando: 'Semanal · jueves',
    enlace: 'https://ejemplo.org/curso-ia',
    estado: 'validado',
    votos: 31,
    fecha: diasAtras(24),
  },
  {
    id: 'k03',
    comunidadId: 'c03',
    tipo: 'webinar',
    titulo: 'Verificar con lápiz y papel en el aula',
    descripcion:
      'Para docentes: una metodología sin pantallas para practicar la evaluación crítica con fuentes impresas y relatos orales.',
    categoria: 'ciencia',
    duracion: '60 min',
    cuando: 'Sábado 11:00',
    estado: 'pendiente',
    votos: 8,
    fecha: diasAtras(4),
  },
  {
    id: 'k04',
    comunidadId: 'c02',
    tipo: 'curso',
    titulo: 'Datos y dinero: leer gráficos sin que te engañen',
    descripcion:
      'Curso de 3 encuentros sobre cómo se manipulan cifras y gráficos para sostener engaños económicos o políticos.',
    categoria: 'economia',
    duracion: '3 sesiones · 40 min',
    cuando: 'Martes y jueves',
    enlace: 'https://ejemplo.org/datos-y-dinero',
    estado: 'validado',
    votos: 14,
    fecha: diasAtras(15),
  },
]

// Material de estudio real: reutiliza artículos de verificación ya incorporados al banco de casos.
const SEED_MATERIALES: MaterialEstudio[] = [
  {
    id: 'm01',
    autor: 'Dete·Lab',
    titulo: 'Cómo se desmontó el bulo de la “cura” contra el coronavirus',
    descripcion:
      'Análisis de la falsa cadena sobre los médicos alemanes: señales de falso ídem y fuente original de la verificación (Chequeado).',
    categoria: 'salud',
    tipo: 'articulo',
    url: 'https://chequeado.com/verificacionfb/es-falsa-la-cadena-que-indica-que-medicos-alemanes-encontraron-la-cura-contra-el-coronavirus/',
    estado: 'validado',
    votos: 19,
    fecha: diasAtras(12),
  },
  {
    id: 'm02',
    autor: 'Red Juvenil de Alfabetización Mediática',
    titulo: 'Montaje de pancarta: el caso de la imagen fuera de contexto',
    descripcion:
      'Guía paso a paso para revisar una imagen fuera de contexto usando la verificación de EFE Verifica como caso de estudio.',
    categoria: 'politica',
    tipo: 'guia',
    url: 'https://verifica.efe.com/una-imagen-pancarta-frase-fuera-petro-colombia-bolivia-montaje/',
    estado: 'validado',
    votos: 12,
    fecha: diasAtras(9),
  },
  {
    id: 'm03',
    autor: 'Aula Verificada',
    titulo: 'Los pendientes que supuestamente escuchaba Kamala Harris',
    descripcion:
      'Material para el aula sobre audio y deepfake en eventos en vivo, basado en el desmentido de Maldita.es.',
    categoria: 'ia',
    tipo: 'coleccion',
    url: 'https://maldita.es/malditobulo/20240911/pendientes-audio-kamala-harris-debate-trump/',
    estado: 'pendiente',
    votos: 6,
    fecha: diasAtras(3),
  },
  {
    id: 'm04',
    autor: 'Medios con Criterio',
    titulo: 'Cobertura de vacunación: datos oficiales como antídoto',
    descripcion:
      'Ficha de la OMS que sirve para contrastar rumores sobre vacunas con la fuente internacional confiable.',
    categoria: 'salud',
    tipo: 'infografia',
    url: 'https://www.who.int/es/news-room/fact-sheets/detail/immunization-coverage',
    estado: 'validado',
    votos: 9,
    fecha: diasAtras(6),
  },
]

interface CommunityState {
  casos: DatoComunidad[]
  votados: string[]
  comunidades: ComunidadVerificada[]
  cursos: CursoComunitario[]
  cursosVotados: string[]
  materiales: MaterialEstudio[]
  materialesVotados: string[]
  agregar: (d: Omit<DatoComunidad, 'id' | 'fecha' | 'votos' | 'estado'>) => void
  votar: (id: string) => void
  agregarCurso: (d: Omit<CursoComunitario, 'id' | 'fecha' | 'votos' | 'estado'>) => void
  votarCurso: (id: string) => void
  agregarMaterial: (d: Omit<MaterialEstudio, 'id' | 'fecha' | 'votos' | 'estado'>) => void
  votarMaterial: (id: string) => void
  reset: () => void
}

let n = 6
let kn = 5
let mn = 5

export const useComunidad = create<CommunityState>()(
  persist(
    (set) => ({
      casos: SEED,
      votados: [],
      comunidades: SEED_COMUNIDADES,
      cursos: SEED_CURSOS,
      cursosVotados: [],
      materiales: SEED_MATERIALES,
      materialesVotados: [],
      agregar: (d) =>
        set((state) => ({
          casos: [
            {
              ...d,
              id: `u${n++}`,
              fecha: diasAtras(0),
              votos: 0,
              estado: 'pendiente' as EstadoCuantia,
            },
            ...state.casos,
          ],
        })),
      votar: (id) =>
        set((state) => {
          if (state.votados.includes(id)) return state
          return {
            votados: [...state.votados, id],
            casos: state.casos.map((c) => (c.id === id ? { ...c, votos: c.votos + 1 } : c)),
          }
        }),
      agregarCurso: (d) =>
        set((state) => ({
          cursos: [
            {
              ...d,
              id: `k${kn++}`,
              fecha: diasAtras(0),
              votos: 0,
              estado: 'pendiente' as EstadoCuantia,
            },
            ...state.cursos,
          ],
        })),
      votarCurso: (id) =>
        set((state) => {
          if (state.cursosVotados.includes(id)) return state
          return {
            cursosVotados: [...state.cursosVotados, id],
            cursos: state.cursos.map((c) => (c.id === id ? { ...c, votos: c.votos + 1 } : c)),
          }
        }),
      agregarMaterial: (d) =>
        set((state) => ({
          materiales: [
            {
              ...d,
              id: `m${mn++}`,
              fecha: diasAtras(0),
              votos: 0,
              estado: 'pendiente' as EstadoCuantia,
            },
            ...state.materiales,
          ],
        })),
      votarMaterial: (id) =>
        set((state) => {
          if (state.materialesVotados.includes(id)) return state
          return {
            materialesVotados: [...state.materialesVotados, id],
            materiales: state.materiales.map((c) => (c.id === id ? { ...c, votos: c.votos + 1 } : c)),
          }
        }),
      reset: () =>
        set({ casos: SEED, votados: [], cursos: SEED_CURSOS, cursosVotados: [], materiales: SEED_MATERIALES, materialesVotados: [] }),
    }),
    {
      name: 'dd.comunidad',
      storage: createJSONStorage(() => localStorage),
      version: 2,
    },
  ),
)