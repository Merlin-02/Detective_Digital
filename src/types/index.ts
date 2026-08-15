export type Categoria =
  | 'politica'
  | 'salud'
  | 'entretenimiento'
  | 'ciencia'
  | 'ia'
  | 'deporte'
  | 'economia'

export type TipoContenido = 'noticia' | 'imagen' | 'audio' | 'video' | 'cadena'

export type TipoPista =
  | 'metadato'
  | 'contexto'
  | 'fuente'
  | 'edicion'
  | 'ia'
  | 'organigrama'

export type Dificultad = 1 | 2 | 3 | 4

export type Modo = 'individual' | 'equipo'

export type Segmento = '13-17' | '18-24' | '25-30' | '18-30' | '13-24'

export type Veredicto = 'real' | 'manipulado' | 'falso' | 'ia'

export type Rol =
  | 'analista_imagen'
  | 'verificador_fuentes'
  | 'rastreador_contexto'
  | 'redactor_informe'

export interface Pista {
  id: string
  tipo: TipoPista
  titulo: string
  contenido: string
  rol?: Rol
}

export interface FuenteAnalizada {
  nombre: string
  url: string
  confiable: boolean
}

/** Medio adjunto a un caso para inspección directa en el juego (imagen, audio o video). */
export interface MedioCaso {
  tipo: 'imagen' | 'audio' | 'video'
  src: string
  alt: string
  etiqueta?: string
  /** Marca el medio como demo sintética generada para el prototipo. */
  esDemo?: boolean
}

export interface ComunidadInfo {
  autor: string
  votos: number
  estado: 'pendiente' | 'validado' | 'rechazado'
  propuestoEn?: string
}

export interface Caso {
  id: string
  titulo: string
  escenario: string
  categoria: Categoria
  tipoContenido: TipoContenido
  dificultad: Dificultad
  modo: Modo
  segmento: Segmento // audiencia objetivo del caso
  pistas: Pista[]
  correcto: Veredicto
  explicacion: string
  senales: string[]
  fuentes: FuenteAnalizada[]
  esIA: boolean
  roles?: Rol[]
  creado: 'curatoria' | 'comunidad' | 'web'
  comunidad?: ComunidadInfo
  localizacion?: string
  /** Enlace a la verificación o publicación original (casos desde la web). */
  fuenteWeb?: string
  /** Copia de respaldo en Internet Archive. */
  fuenteArchivo?: string
  /** Nombre de la fuente/verificador que originó el caso. */
  origen?: string
  /** Fecha de publicación del caso en su fuente. */
  fechaWeb?: string
  /** Medios adjuntos (imagen, audio o video) para inspeccionar en el caso. */
  multimedia?: MedioCaso[]
}

/** Caso capturado por el worker desde feeds de verificación de datos. */
export interface CasoWeb {
  id: string
  titulo: string
  descripcion: string
  categoria: Categoria
  tipoContenido: TipoContenido
  dificultad: Dificultad
  url: string
  origen: string
  fecha: string
  veredSegun: 'real' | 'manipulado' | 'falso' | 'ia'
  esIA: boolean
  senales: string[]
}

export interface RespuestaCaso {
  casoId: string
  modo: Modo
  categoria: Categoria
  tipoContenido: TipoContenido
  dificultad: Dificultad
  segmento: Segmento
  correcto: boolean
  puntos: number
  pistasConsultadas: number
  totalPistas: number
  fecha: string
  equipo?: boolean
}

export interface NivelInvestigador {
  nombre: string
  indice: 0 | 1 | 2 | 3
  minimo: number
  descripcion?: string
}

export interface Etiqueta {
  precisionCritica: number
  diversidadFuentes: number
  balanceTematico: number
  consumoInformacional: number
  puntos: number
  casosResueltos: number
  nivel: NivelInvestigador
  porCategoria: Record<Categoria, number>
  porTipo: Record<TipoContenido, number>
  aciertosPorDificultad: Record<number, { aciertos: number; total: number }>
}

export interface Recomendacion {
  id: string
  titulo: string
  descripcion: string
  casoId?: string
  href?: string
  tono: 'bueno' | 'atencion' | 'critico'
}

export type DatoComunidad = {
  id: string
  autor: string
  titulo: string
  descripcion: string
  categoria: Categoria
  estado: 'pendiente' | 'validado' | 'rechazado'
  votos: number
  fecha: string
  tags: string[]
}

export type EstadoCuantia = 'pendiente' | 'validado' | 'rechazado'

/** Entidad de la comunidad educativa verificada (educador/a, laboratorio, colectivo). */
export interface ComunidadVerificada {
  id: string
  nombre: string
  descripcion: string
  tipo: 'educador' | 'laboratorio' | 'colectivo' | 'institucion'
  verificada: boolean
  miembros: number
  temas: Categoria[]
}

/** Curso o webinar que una comunidad verificada ofrece para enseñar MIL. */
export interface CursoComunitario {
  id: string
  comunidadId: string
  tipo: 'curso' | 'webinar'
  titulo: string
  descripcion: string
  categoria: Categoria
  duracion: string
  cuando: string
  enlace?: string
  estado: EstadoCuantia
  votos: number
  fecha: string
}

/** Material de estudio real compartido por la comunidad para aprender/enseñar. */
export interface MaterialEstudio {
  id: string
  autor: string
  titulo: string
  descripcion: string
  categoria: Categoria
  tipo: 'guia' | 'video' | 'articulo' | 'infografia' | 'coleccion'
  url: string
  estado: EstadoCuantia
  votos: number
  fecha: string
}