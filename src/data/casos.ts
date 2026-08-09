import type { Caso } from '../types'

export const CASOS: Caso[] = [
  {
    id: 'c01',
    titulo: 'La cura milagrosa del jarabe de limón',
    fuenteWeb: 'https://chequeado.com/verificacionfb/es-falsa-la-cadena-que-indica-que-medicos-alemanes-encontraron-la-cura-contra-el-coronavirus/',
    fuenteArchivo: 'https://web.archive.org/web/2026/https://chequeado.com/verificacionfb/es-falsa-la-cadena-que-indica-que-medicos-alemanes-encontraron-la-cura-contra-el-coronavirus/',
    origen:
      'Chequeado: "Es falsa la cadena que indica que médicos alemanes encontraron la cura contra el coronavirus"',
    escenario:
      'Una cadena circuló por WhatsApp y TikTok asegurando que un "jarabe de limón con jengibre" elimina el virus de moda en 24 horas. Cada reenvío multiplica las vistas del video.',
    categoria: 'salud',
    tipoContenido: 'cadena',
    dificultad: 1,
    modo: 'individual',
    segmento: '13-17',
    pistas: [
      {
        id: 'c01p1',
        tipo: 'fuente',
        titulo: '¿De dónde sale?',
        contenido:
          'El mensaje cita una "investigación de universidades europeas" sin nombrar ninguna. El enlace dirige a una página con dominio registrado hace 2 meses y sin datos de contacto.',
      },
      {
        id: 'c01p2',
        tipo: 'metadato',
        titulo: 'Fecha de publicación',
        contenido:
          'El texto dice "urgente, reenvía ya" y repite la misma redacción de una cadena desmentida el año pasado, con solo el nombre de la enfermedad cambiado.',
      },
      {
        id: 'c01p3',
        tipo: 'edicion',
        titulo: 'El video del "experto"',
        contenido:
          'La supuesta prueba es un clip con música de fondo, logos genéricos añadidos y un locutor sin identificarse: no aparece un laboratorio ni una marca real.',
      },
      {
        id: 'c01p4',
        tipo: 'contexto',
        titulo: 'Qué dicen las agencias',
        contenido:
          'Las autoridades de salud ya advirtieron sobre "curas milagrosas" que se difunden por transferencia masiva en estas mismas plataformas.',
      },
    ],
    correcto: 'falso',
    explicacion:
      'Es una noticia fabricada que se "verifica a sí misma" por reenvío: fuente inventada, cita genérica y la misma fecha reutilizada de cadenas viejas.',
    senales: [
      'Fuente anónima o de dominio reciente',
      'Fecha reutilizada de cadenas antiguas',
      'Promesa de cura extremadamente rápida',
      'Presión constante para reenviar',
    ],
    fuentes: [
      { nombre: 'OMS', url: 'www.who.int', confiable: true },
      { nombre: 'Blog de salud natural sin autor', url: 'medicina-secreta.com', confiable: false },
    ],
    esIA: false,
    creado: 'curatoria',
  },
  {
    id: 'c02',
    titulo: 'El salto de seis metros del delantero',
    fuenteWeb: 'https://verifica.efe.com/una-imagen-pancarta-frase-fuera-petro-colombia-bolivia-montaje/',
    fuenteArchivo: 'https://web.archive.org/web/2026/https://verifica.efe.com/una-imagen-pancarta-frase-fuera-petro-colombia-bolivia-montaje/',
    origen:
      'EFE Verifica: "Una imagen de una pancarta con la frase «Fuera Petro» en un partido de Colombia y Bolivia es un montaje"',
    escenario:
      'Una imagen que "vuelve" cada semana muestra a un jugador de fútbol que parece saltar seis metros para cabecear. La publican hinchas del equipo rival para burlarse.',
    categoria: 'deporte',
    tipoContenido: 'imagen',
    dificultad: 2,
    modo: 'individual',
    segmento: '13-17',
    pistas: [
      {
        id: 'c02p1',
        tipo: 'ia',
        titulo: '¿IA o edición?',
        contenido:
          'Al ampliar la imagen, las sombras no coinciden: el jugador tiene luz desde la izquierda, pero la pelota y el pasto tienen luz desde la derecha.',
      },
      {
        id: 'c02p2',
        tipo: 'edicion',
        titulo: 'Bordes de recorte',
        contenido:
          'Los bordes de la camiseta se ven "pixeleados" en una franja vertical exacta: típico de copiar y pegar la figura sobre otra fotografía.',
      },
      {
        id: 'c02p3',
        tipo: 'contexto',
        titulo: 'La foto original',
        contenido:
          'Existe una fotografía del mismo partido tomada dos segundos antes por un fotógrafo de la agencia: el llamado salto real es apenas para impulsarse hacia el costado.',
      },
      {
        id: 'c02p4',
        tipo: 'fuente',
        titulo: 'Quién la difunde',
        contenido:
          'Las primeras cuentas que la comparten tienen menos de 100 seguidores, publican solo memes y llevan 48 horas de actividad.',
      },
    ],
    correcto: 'manipulado',
    explicacion:
      'La foto es auténtica en su base pero fue editada: se copió y reescaló la figura para crear un salto imposible. Es un montaje, no una foto nueva ni una IA.',
    senales: [
      'Sombra incoherente entre objetos',
      'Artefactos de recorte en los bordes',
      'Evidencia fotográfica del momento real',
      'Difusión desde perfiles recién creados',
    ],
    fuentes: [
      { nombre: 'Agencia fotográfica del partido', url: 'agencia-deporte.com', confiable: true },
      { nombre: 'Cuenta anónima de memes', url: 'memes-futbol-error', confiable: false },
    ],
    esIA: false,
    creado: 'curatoria',
  },
  {
    id: 'c03',
    titulo: 'El gesto del debate convertido en escándalo',
    fuenteWeb: 'https://maldita.es/malditobulo/20240911/pendientes-audio-kamala-harris-debate-trump/',
    fuenteArchivo: 'https://web.archive.org/web/2026/https://maldita.es/malditobulo/20240911/pendientes-audio-kamala-harris-debate-trump/',
    origen:
      'Maldita.es: "Kamala Harris y sus supuestos pendientes auriculares: por qué no hay pruebas de que lo sean"',
    escenario:
      'Un video del debate televisado muestra a una candidata tocándose la cara. La cuenta que lo publicó asegura que "es incapaz de responder sin nervios" y se hace viral.',
    tipoContenido: 'video',
    dificultad: 3,
    modo: 'individual',
    segmento: '18-24',
    categoria: 'politica',
    pistas: [
      {
        id: 'c03p1',
        tipo: 'contexto',
        titulo: 'La toma completa',
        contenido:
          'En la transmisión oficial se ve que la candidata se toca el flequillo una sola vez (por una ráfaga de viento) y sigue hablando. El video viral repite esa fracción en bucle.',
      },
      {
        id: 'c03p2',
        tipo: 'edicion',
        titulo: 'Rastro del montaje',
        contenido:
          'Al avanzar cuadro a cuadro hay un salto brusco entre el segundo 4 y el 5: dos planos unidos por un micro-corte, típico de un bucle.',
      },
      {
        id: 'c03p3',
        tipo: 'organigrama',
        titulo: 'Mapa de difusión',
        contenido:
          'La red detectó 40 cuentas automáticas publicando el clip en la misma hora, antes que ningún medio lo mencionara.',
      },
      {
        id: 'c03p4',
        tipo: 'fuente',
        titulo: 'La cuenta que lo subió',
        contenido:
          'La cuenta es de parodia (el nombre lo dice) aunque el video se republica sin la marca de parodia que acompaña normalmente sus publicaciones.',
      },
    ],
    correcto: 'manipulado',
    explicacion:
      'El gesto existió, pero el video lo amplifica con un bucle y una red de bots para fabricar nerviosismo. Es manipulación a partir de material real.',
    senales: [
      'Corte de bucle detectado',
      'Contexto ignorado (transmisión completa)',
      'Difusión con bots simultáneos',
      'Cuenta de parodia sin etiqueta visible',
    ],
    fuentes: [
      { nombre: 'Transmisión oficial del debate', url: 'tv-plaza.com', confiable: true },
      { nombre: 'Perfil de parodia', url: 'memes-politicos', confiable: false },
    ],
    esIA: false,
    creado: 'curatoria',
  },
  {
    id: 'c04',
    titulo: 'El estudio "revolucionario" de la universidad fantasma',
    fuenteWeb: 'https://chequeado.com/el-explicador/es-falso-que-un-estudio-cientifico-haya-demostrado-la-efectividad-del-dioxido-de-cloro-contra-la-covid-19/',
    fuenteArchivo: 'https://web.archive.org/web/2026/https://chequeado.com/el-explicador/es-falso-que-un-estudio-cientifico-haya-demostrado-la-efectividad-del-dioxido-de-cloro-contra-la-covid-19/',
    origen:
      'Chequeado: "Es falso que un estudio científico haya demostrado la efectividad del dióxido de cloro contra la COVID-19"',
    escenario:
      'Comparten en tu grupo un titular: "La energía infinita en un vaso de agua: estudio sorprendente". El enlace dice venir de una universidad internacional.',
    tipoContenido: 'noticia',
    dificultad: 3,
    modo: 'individual',
    segmento: '25-30',
    categoria: 'ciencia',
    pistas: [
      {
        id: 'c04p1',
        tipo: 'fuente',
        titulo: 'La "revista" que lo publicó',
        contenido:
          'La revista ofrece en su página servicios de publicación por pago sin revisión externa con el logo de universidades famosas que no la respaldan.',
      },
      {
        id: 'c04p2',
        tipo: 'metadato',
        titulo: 'Autoría',
        contenido:
          'Los tres autores no aparecen en buscadores académicos y su correo termina en un dominio comprado el mismo mes de la publicación.',
      },
      {
        id: 'c04p3',
        tipo: 'contexto',
        titulo: 'Los resultados',
        contenido:
          'El experimento usa muy pocas muestras y no reporta incertidumbres. Ningún laboratorio independiente pudo replicarlo.',
      },
      {
        id: 'c04p4',
        tipo: 'ia',
        titulo: '¿Texto generado?',
        contenido:
          'El estilo de redacción es genérico y ausente de datos verificables. Detección automática marca alto porcentaje de probabilidad de generación asistida por IA.',
      },
    ],
    correcto: 'falso',
    explicacion:
      'El estudio nunca existió de forma verificable: usa una revista depredadora, autoría inventada y resultados irrealistas. Las insignias "universidad" son falsas.',
    senales: [
      'Revista sin revisión por pares',
      'Autoría sin rastro académico',
      'Resultados imposibles de replicar',
      'Redacción probablemente generada',
    ],
    fuentes: [
      { nombre: 'Diario local de verificación', url: 'verifica.org', confiable: true },
      { nombre: 'Revista depredadora', url: 'publica-sin-revision.com', confiable: false },
    ],
    esIA: true,
    creado: 'curatoria',
  },
  {
    id: 'c05',
    titulo: 'El audio del médico despedido',
    fuenteWeb: 'https://chequeado.com/investigaciones/videos-falsos-con-ia-usan-la-identidad-de-cormillot-lopez-rosetti-y-otros-medicos-para-vender-tratamientos-sin-evidencia/',
    fuenteArchivo: 'https://web.archive.org/web/2026/https://chequeado.com/investigaciones/videos-falsos-con-ia-usan-la-identidad-de-cormillot-lopez-rosetti-y-otros-medicos-para-vender-tratamientos-sin-evidencia/',
    origen:
      'Chequeado: "Videos falsos con IA usan la identidad de Cormillot, López Rosetti y otros médicos para vender tratamientos sin evidencia"',
    escenario:
      'En grupos escolares rueda un audio donde "un neumólogo" recomienda un suplemento milagroso y dice tener 40 años de experiencia en un hospital conocido.',
    tipoContenido: 'audio',
    dificultad: 4,
    modo: 'individual',
    segmento: '18-30',
    categoria: 'ia',
    pistas: [
      {
        id: 'c05p1',
        tipo: 'ia',
        titulo: '¿Voz real o clonada?',
        contenido:
          'El análisis de espectro muestra pausas extremadamente regulares y respiración que no reproduce ningún humano. Suena parecido a un médico real que aparece en video de 2016.',
      },
      {
        id: 'c05p2',
        tipo: 'contexto',
        titulo: 'El hospital responde',
        contenido:
          'Este hospital lo desmintió en comunicados: "no existe ese profesional ni se difundió tal audio". El teléfono que da el audio no existe.',
      },
      {
        id: 'c05p3',
        tipo: 'fuente',
        titulo: 'Provience del audio',
        contenido:
          'El archivo surgió en un canal de bienestar con seguidores falsos (la mayoría sin fotos) y se replicó en WhatsApp sin conservar metadatos de autoría.',
      },
      {
        id: 'c05p4',
        tipo: 'metadato',
        titulo: 'Pistas técnicas',
        contenido:
          'La misma frase se repite con entonación casi idéntica en tres audios publicados con horas de diferencia: imposible en una grabación real.',
      },
    ],
    correcto: 'ia',
    explicacion:
      'Es un deepfake de audio: la voz de un médico real fue clonada para decirle palabras que nunca pronunció. La clonación de voz es una de las técnicas de desinformación de mayor crecimiento.',
    senales: [
      'Patrón de clonación de voz',
      'Desmentido del hospital',
      'Pausas artificialmente regulares',
      'Origen en canal de bienestar falsificado',
    ],
    fuentes: [
      { nombre: 'Hospital regional', url: 'hospital.region.org', confiable: true },
      { nombre: 'Canal de bienestar fraudulento', url: 'bienestar-milagros', confiable: false },
    ],
    esIA: true,
    creado: 'curatoria',
  },
  {
    id: 'c06',
    titulo: 'La foto del concierto explotó las redes',
    fuenteWeb: 'https://maldita.es/malditobulo/20241212/concierto-aitana-albacete-pedro-sanchez/',
    fuenteArchivo: 'https://web.archive.org/web/2026/https://maldita.es/malditobulo/20241212/concierto-aitana-albacete-pedro-sanchez/',
    origen:
      'Maldita.es: "No, en este vídeo de un concierto de Aitana el público no grita «Pedro Sánchez»: es un audio manipulado"',
    escenario:
      'Una imagen de una banda sobre el escenario a hora temprana muestra la plaza con poca gente. Los críticos dicen que "no llenaron". La banda replica que cayeron a la plaza miles.',
    tipoContenido: 'imagen',
    categoria: 'entretenimiento',
    dificultad: 2,
    modo: 'individual',
    segmento: '13-17',
    pistas: [
      {
        id: 'c06p1',
        tipo: 'contexto',
        titulo: 'El reloj de fondo',
        contenido:
          'En el fondo se ve un reloj digital del estadio: marca 17:59. El concierto abrió a las 17:00 y el acto principal comienza a las 18:30.',
      },
      {
        id: 'c06p2',
        tipo: 'edicion',
        titulo: 'La plaza media hora después',
        contenido:
          'Otros videos del mismo evento, de las 18:20, muestran la plaza llena. La foto inicial se tomó antes de que llegara la segunda ola de asistentes.',
      },
      {
        id: 'c06p3',
        tipo: 'metadato',
        titulo: 'Un detalle que se omite',
        contenido:
          'La imagen no contiene el archivo de tiempo de la cámara original; se comparte a través de una captura de pantalla que recorta la factura.',
      },
      {
        id: 'c06p4',
        tipo: 'fuente',
        titulo: 'Quién está detrás',
        contenido:
          'La cuenta que difunde la foto es una cuenta de fans del grupo rival, con publicaciones previas sobre la supuesta falta de público de la banda.',
      },
    ],
    correcto: 'manipulado',
    explicacion:
      'La foto es real, pero se presentó como si retratara el lleno final cuando fue tomada antes del inicio. Un contexto tuerto convierte una imagen auténtica en un dato engañoso.',
    senales: [
      'Contexto temporal eliminado',
      'Reloj del estadio visible',
      'Compartida por cuenta sesgada',
      'Se omite el resto de la imagen',
    ],
    fuentes: [
      { nombre: 'Organizadores del concierto', url: 'estadio-oficial.com', confiable: true },
      { nombre: 'Cuenta de afición rival', url: 'fans-rival', confiable: false },
    ],
    esIA: false,
    creado: 'comunidad',
    comunidad: { autor: 'Aya·Dana', votos: 32, estado: 'validado' },
  },
  {
    id: 'c07',
    titulo: 'El bono imposible del banco central',
    fuenteWeb: 'https://chequeado.com/el-explicador/cuidado-circulan-falsos-contenidos-de-bonos-alimentos-y-subsidios/',
    fuenteArchivo: 'https://web.archive.org/web/2026/https://chequeado.com/el-explicador/cuidado-circulan-falsos-contenidos-de-bonos-alimentos-y-subsidios/',
    origen:
      'Chequeado: "¡Cuidado! Circulan contenidos falsos de bonos, alimentos y subsidios"',
    escenario:
      'Una publicación dentro de un grupo de economía asegura que el banco central reparte un bono a toda persona que reenvíe el mensaje a 10 contactos. La gente empieza a compartir sus datos.',
    tipoContenido: 'cadena',
    categoria: 'economia',
    dificultad: 1,
    modo: 'individual',
    segmento: '25-30',
    pistas: [
      {
        id: 'c07p1',
        tipo: 'contexto',
        titulo: 'El banco responde',
        contenido:
          'La entidad publicó un comunicado: "jamás pedimos reenviar mensajes; no existe ningún sorteo por cadena. Verifiquen siempre el dominio."',
      },
      {
        id: 'c07p2',
        tipo: 'fuente',
        titulo: 'El dominio del formulario',
        contenido:
          'El enlace del "registro" apunta a un dominio que imita al del banco pero con un guion y letras de más: no es del dominio oficial.',
      },
      {
        id: 'c07p3',
        tipo: 'metadato',
        titulo: 'Qué pide en el formulario',
        contenido:
          'El formulario recoge nombre, documento y número de la cuenta. Es exactamente la información que una institución no pide para "regalar" un bono.',
      },
      {
        id: 'c07p4',
        tipo: 'organigrama',
        titulo: 'Expansión',
        contenido:
          'El mensaje apareció en 2 chats y se propagó a miles de chats en horas con respuestas automáticas replicando el mismo texto y pidiendo reenvío.',
      },
    ],
    correcto: 'falso',
    explicacion:
      'Es una estafa de suplantación: piden reenviar para obtener datos personales bancarios. Ningún banco premia el reenvío viral.',
    senales: [
      'Exigencia de reenviar el mensaje',
      'Dominio imitador con guion',
      'Solicitud de datos bancarios',
      'Expansión con cuentas automáticas',
    ],
    fuentes: [
      { nombre: 'Banco Central', url: 'bancocentral.gob', confiable: true },
      { nombre: 'Formulario fraudulento', url: 'bancocentral-bonus.com', confiable: false },
    ],
    esIA: false,
    creado: 'curatoria',
  },
  {
    id: 'c08',
    titulo: 'La campaña de vacunación escolar',
    fuenteWeb: 'https://www.who.int/es/news-room/fact-sheets/detail/immunization-coverage',
    fuenteArchivo: 'https://web.archive.org/web/2026/https://www.who.int/es/news-room/fact-sheets/detail/immunization-coverage',
    origen: 'OMS: "Cobertura de vacunación" (hoja informativa oficial)',
    escenario:
      'Un medio local publicó que el ministerio amplía el calendario de vacunas e incluye una nueva vacuna para adolescentes. Comparte en los grupos de la escuela con el cartel oficial.',
    categoria: 'salud',
    tipoContenido: 'noticia',
    dificultad: 1,
    modo: 'individual',
    segmento: '13-17',
    pistas: [
      {
        id: 'c08p1',
        tipo: 'fuente',
        titulo: 'La fuente directa',
        contenido:
          'La noticia cita el comunicado oficial y los horarios del centro de salud. Contiene número de teléfono real de seguimiento.',
      },
      {
        id: 'c08p2',
        tipo: 'metadato',
        titulo: 'Coherencia de fechas',
        contenido:
          'La fecha de publicación coincide con el calendario anual difundido y con la página web del ministerio.',
      },
      {
        id: 'c08p3',
        tipo: 'contexto',
        titulo: 'Cruce de información',
        contenido:
          'Dos medios independientes cubrieron la misma noticia el mismo día con igual fecha de inicio y sin contradicción.',
      },
      {
        id: 'c08p4',
        tipo: 'edicion',
        titulo: 'Cartel con detalles verificables',
        contenido:
          'El cartel incluye logos correctos, código del documento y un código QR que al escanearlo lleva al sitio oficial: coherencia total.',
      },
    ],
    correcto: 'real',
    explicacion:
      'Es información verdadera y verificada: fuente oficial, fecha consistente, cobertura múltiple y cartel con referencia cruzada.',
    senales: [
      'Fuente oficial identificable',
      'Fechas coincidentes',
      'Doble cobertura editorial',
      'Documento con identificador verificable',
    ],
    fuentes: [
      { nombre: 'Ministerio de Salud', url: 'ministeriosalud.gob', confiable: true },
      { nombre: 'Agencia A.', url: 'informa.regional', confiable: true },
    ],
    esIA: false,
    creado: 'curatoria',
  },
]

export const CASOS_EQUIPO: Caso[] = [
  {
    id: 't01',
    titulo: 'La marcha que no fue violenta',
    fuenteWeb: 'https://maldita.es/desinfo/20260802/video-muestra-a-jovenes-en-ceuta-destruyendo-contenedores-de-basura-y-destrozando-calles/',
    fuenteArchivo: 'https://web.archive.org/web/2026/https://maldita.es/desinfo/20260802/video-muestra-a-jovenes-en-ceuta-destruyendo-contenedores-de-basura-y-destrozando-calles/',
    origen:
      'Maldita.es: "No, este vídeo no muestra a migrantes destrozando las calles de Ceuta: son imágenes grabadas en Francia"',
    escenario:
      'Mystery Media: tu equipo debe dictaminar un video de 47 segundos que muestra una marcha con imágenes incluidas de disturbios. La cuenta la etiqueta "AHORA".',
    categoria: 'politica',
    tipoContenido: 'video',
    dificultad: 3,
    modo: 'equipo',
    segmento: '18-30',
    roles: ['analista_imagen', 'verificador_fuentes', 'rastreador_contexto', 'redactor_informe'],
    pistas: [
      {
        id: 't01p1',
        rol: 'analista_imagen',
        tipo: 'edicion',
        titulo: '¿Editado el clip?',
        contenido:
          'El video tiene un corte brusco a los 23 segundos: las luces y el tamaño de la calle cambian de golpe. Hay montaje entre dos grabaciones.',
      },
      {
        id: 't01p2',
        rol: 'verificador_fuentes',
        tipo: 'fuente',
        titulo: 'La fuente de referencia',
        contenido:
          'El canal local transmitió la misma marcha sin disturbios, desde el minuto cero hasta el cierre. La versión viral agrega imágenes de otro evento.',
      },
      {
        id: 't01p3',
        rol: 'rastreador_contexto',
        tipo: 'contexto',
        titulo: 'Geolocalización y fecha',
        contenido:
          'La geolocalización del video coincide con la plaza central, pero el archivo se creó semanas antes de la fecha de la marcha actual: es material de un evento anterior.',
      },
      {
        id: 't01p4',
        rol: 'redactor_informe',
        tipo: 'organigrama',
        titulo: 'Persistencia de la difusión',
        contenido:
          'El clip despegó en 20 minutos con decenas de cuentas automáticas compartiendo desde distintos puntos geográficos falsos.',
      },
    ],
    correcto: 'manipulado',
    explicacion:
      'Une el inicio verídico de una marcha con un fragmento de un disturbio de otra fecha, cortado con edición. Es manipulación de material real mediante montaje y bots.',
    senales: [
      'Corte de edición en 23s.',
      'Discrepancia con la transmisión completa',
      'Fechas de geolocación no corresponden',
      'Difusión con bots',
    ],
    fuentes: [
      { nombre: 'Canal de TV regional', url: 'tv-regional.com', confiable: true },
      { nombre: 'Nuevo perfil sin identidad', url: 'marcha-ahora', confiable: false },
    ],
    esIA: false,
    creado: 'curatoria',
  },
  {
    id: 't02',
    titulo: 'El foco de luz apagado durante 14 días',
    fuenteWeb: 'https://verifica.efe.com/apagon-espana-bulos-desinformacion-origen-alcance/',
    fuenteArchivo: 'https://web.archive.org/web/2026/https://verifica.efe.com/apagon-espana-bulos-desinformacion-origen-alcance/',
    origen: 'EFE Verifica: "Apagón en España: bulos sobre el origen y alcance del corte eléctrico"',
    escenario:
      'En WhatsApp rueda un mapa que "confirma" un apagón total y general de la región por 14 días con cortes programados "reservados". El municipio no se ha expresado.',
    categoria: 'salud',
    tipoContenido: 'cadena',
    dificultad: 2,
    modo: 'equipo',
    segmento: '13-24',
    roles: ['analista_imagen', 'verificador_fuentes', 'rastreador_contexto', 'redactor_informe'],
    pistas: [
      {
        id: 't02p1',
        rol: 'rastreador_contexto',
        tipo: 'contexto',
        titulo: 'La fecha que se repite',
        contenido:
          'La cadena dice "empezar mañana" y aparece repetida 12 veces en el mismo grupo en los últimos 10 días. El "apagón de mañana" nunca ocurrió.',
      },
      {
        id: 't02p2',
        rol: 'verificador_fuentes',
        tipo: 'fuente',
        titulo: 'El mapa oficial real',
        contenido:
          'El municipio publicó el mapa real de cortes programados para obras, con zonas y días concretos que no coinciden con el viral.',
      },
      {
        id: 't02p3',
        rol: 'analista_imagen',
        tipo: 'metadato',
        titulo: 'El mapa retocado',
        contenido:
          'En la versión compartida, la tipografía del nombre "MAÑANA CRÍTICO" es distinta y falta la leyenda inferior del documento oficial.',
      },
      {
        id: 't02p4',
        rol: 'redactor_informe',
        tipo: 'organigrama',
        titulo: 'El gancho',
        contenido:
          'Termina con "COMENTE para que el aviso llegue rápido", el mecanismo perfecto para que quien no verifica convierta la cadena en foco.',
      },
    ],
    correcto: 'falso',
    explicacion:
      'El mapa es una edición de un documento oficial de cortes programados. No hay un apagón de 14 días: la cadena infla el alcance para asustar y pedir reenvío.',
    senales: [
      'Mapa retocado',
      'Comunicado oficial distinto',
      'Reciclaje de fechas',
      'Pide reenvío directo',
    ],
    fuentes: [
      { nombre: 'Municipio', url: 'municipio.gob', confiable: true },
      { nombre: 'Cadena de WhatsApp', url: 'bindo-mapa', confiable: false },
    ],
    esIA: false,
    creado: 'comunidad',
    comunidad: { autor: 'Dete·Lab', votos: 18, estado: 'validado' },
  },
  {
    id: 't03',
    titulo: 'El moderador de la campaña',
    fuenteWeb: 'https://verifica.efe.com/audio-registrador-nacional-manipular-elecciones-colombia/',
    fuenteArchivo: 'https://web.archive.org/web/2026/https://verifica.efe.com/audio-registrador-nacional-manipular-elecciones-colombia/',
    origen:
      'EFE Verifica: "El registrador nacional de Colombia no dijo que manipulará los resultados de las elecciones, es un audio generado con IA"',
    escenario:
      'Mystery Media: tu equipo investiga un audio donde un político parece "prometer boletos" de forma secreta. Un rival lo difunde como "espionaje". ¿Voz real o galo?',
    categoria: 'ia',
    tipoContenido: 'audio',
    dificultad: 4,
    modo: 'equipo',
    segmento: '18-30',
    roles: ['analista_imagen', 'verificador_fuentes', 'rastreador_contexto', 'redactor_informe'],
    pistas: [
      {
        id: 't03p1',
        rol: 'analista_imagen',
        tipo: 'ia',
        titulo: 'Análisis de sonido',
        contenido:
          'El patrón de pausas del audio es simétrico en mili-segundos (clásico de clonación); las respiraciones no aparecen en personas reales. Suena al discurso de un candidato de 2016.',
      },
      {
        id: 't03p2',
        rol: 'verificador_fuentes',
        tipo: 'fuente',
        titulo: 'El partido y la prensa',
        contenido:
          'El partido desmintió y el diario de verificación pública 2 audios similares en este año como clonados con software IA.',
      },
      {
        id: 't03p3',
        rol: 'rastreador_contexto',
        tipo: 'contexto',
        titulo: 'Pistas de la grabación',
        contenido:
          'El audio "menciona" una reunión pública transmitida por TV. La transcripción del evento (con subtítulos automáticos) no contiene esas frases.',
      },
      {
        id: 't03p4',
        rol: 'redactor_informe',
        tipo: 'organigrama',
        titulo: 'Timing y objetivo',
        contenido:
          'El audio circuló a pocos días de las elecciones y omitió la marca obligatoria de "contenido generado por IA" presente en la versión de origen.',
      },
    ],
    correcto: 'ia',
    explicacion:
      'Voz clonada con IA que imita a un candidato real, generada con su material histórico y difundida sin la marca "IA" obligatoria para el costo electoral.',
    senales: [
      'Patrón espectral de clonación',
      'Desmentido del partido y verificación',
      'Infla frases que no existen',
      'Omisión de la marca de IA',
    ],
    fuentes: [
      { nombre: 'Diario verificador', url: 'verificaciones.org', confiable: true },
      { nombre: 'Audio viral sin marca', url: 'audio-viral', confiable: false },
    ],
    esIA: true,
    creado: 'curatoria',
  },
]