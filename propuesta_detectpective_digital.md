# DETECTIVE DIGITAL: Mi Etiqueta Informativa

Propuesta de alfabetización mediática e informacional para el Hackathon UNESCO de Juventudes — 2026

---

## 1. Alineación con la convocatoria

| Elemento | Valor |
|---|---|
| **Tema** | Alfabetización Mediática e Informacional (MIL) + IA |
| **Tracks** | AI y MIL · MIL Education · Youth Engagement · Community Impact |
| **Categoría** | Aplicación/web + Juego digital (ecosistema integrado) |
| **Equipo** | 2–6 integrantes (18–30 años), con foco en equilibrio de género e inclusión |
| **Audiencia objetivo** | Juventudes de 13 a 30 años, segmentada por rango etario |
| **Valores UNESCO** | Paz, respeto a la diversidad, libertad de expresión, igualdad de género |

### Por qué se ajusta a los criterios de evaluación

- **Consistencia temática**: aborda directamente el tema del año —inteligencia artificial y MIL—, involucrando las **5 Leyes de la MIL** (acceso, evaluación, uso, creación y participación). Toma inspiración en el enfoque UNESCO **MIL CLICKS** (Critical, Creative, Linked, Intercultural, Citizenship, Sustainability) y en la **Guía de IA Generativa en Educación e Investigación (UNESCO, 2023)**.
- **Claridad de presentación**: estructura clara (problema → objetivo → solución → prototipo → sostenibilidad → impacto) y el anclaje visual de la etiqueta facilita explicar el proyecto en 3 minutos.
- **Innovación y creatividad**: dos símbolos culturales juveniles —el juego y la etiqueta nutricional— unidos por primera vez; foco en la detección de desinformación generada por IA; los jóvenes son co-creadores, no solo usuarios.
- **Factibilidad y sostenibilidad**: MVP ligero y de bajo costo (React + backend free-tier), curva de crecimiento basada en la comunidad (banco de casos + embajadores) sin depender de recursos infinitos.
- **Impacto e inclusión**: accesible (lectores de pantalla, modo sin conexión, multilingüe), con casos contextualizados a realidades locales de comunidades marginadas.

---

## 2. Problema (Problem Statement)

En la era digital, cualquier persona no solo consume, sino que **crea y difunde** información: imágenes, audios, videos — incluidos los generados por inteligencia artificial (deepfakes, voces sintéticas, imágenes fotorrealistas). Para las juventudes, la brecha crítica ya no es el acceso a la información, sino la **capacidad de evaluarla** y usarla.

Los programas tradicionales de alfabetización mediática tienen dos fallas:

1. **Estáticos y fuera de contexto**: guías y listas de "cómo detectar noticias falsas" que no se practican en el momento donde la desinformación circula (memes, cadenas, videos virales).
2. **Punitivos y aislados**: evalúan conocimiento, no hábitos; y rara vez miden cuánto ha mejorado el usuario a lo largo del tiempo.

Además, la mayoría de las propuestas **ignoran el contenido generado con IA** —el tipo de desinformación que más confunde a los jóvenes hoy— y no incorporan a los jóvenes como productores de soluciones, sino solo como receptores pasivos.

**Enunciado del problema**: los jóvenes confunden con frecuencia contenidos sintéticos (IA) con contenidos reales y depositan más confianza en la recomendación de la plataforma que en la fuente de origen. Faltan mecanismos que hagan del pensamiento crítico un **hábito medible, motivante y compartido**, no una obligación escolar.

---

## 3. Objetivos

### Objetivo general
Fortalecer en jóvenes de 13–30 años las competencias de pensamiento crítico, evaluación de fuentes y autorregulación informativa mediante una experiencia gamificada y colaborativa que genera un perfil personal de "dieta informativa" —la **etiqueta informativa**— para monitorear y mejorar hábitos con el tiempo.

### Objetivos específicos
- Capacitar para identificar noticias, imágenes, audios y videos falsos o manipulados, **incluyendo contenido generado por IA** (deepfakes, voces clonadas, imágenes sintéticas).
- Promover el trabajo en equipo y la toma de decisiones colaborativa frente a casos de desinformación.
- Convertir el desempeño de cada partido en indicadores comprensibles (diversidad de fuentes, balance temático, precisión crítica, nivel de detective).
- Fomentar la **vacunación cognitiva (prebunking)**: exponer a los jóvenes a micro-manipulaciones en el juego *antes* de que las encuentren en la vida real.
- Favorecer la **metacognición y la autorregulación** sin registro manual pesado ni aproximación a la vigilancia.
- Posicionar a los jóvenes como **creadores de la plataforma** (banco de casos, embajadores, moderadores).
- Usar la **privacidad como pedagogía**: el diseño del sistema (qué se guarda, qué se comparte, qué se borra) es en sí mismo un espacio de aprendizaje MIL.

---

## 4. Audiencia objetivo

| Segmento | Edad | Contexto | Casos / intereses |
|---|---|---|---|
| Secundaria | 13–17 | Escuela, redes sociales, tendencias | Deporte, música, viral, salud |
| Universidad / inserción laboral | 18–24 | Estudios, vida laboral, política | Datos académicos, actualidad, emergencias |
| Jóvenes líderes / educadores | 25–30 | Organizaciones, docencia, ONG | Democracia, derechos, fact-checking local |

El diseño prioriza **lenguaje, dificultad y casos por rangos**, manteniendo un mismo motor de juego.

---

## 5. Solución

**Detective Digital** es un ecosistema de alfabetización mediática e informacional **pensado por y para jóvenes**, que une dos piezas que hoy existen por separado:

1. Un **juego de investigación** colaborativo (individual y en equipo) que entrena la detección de desinformación, manipulación digital y contenido generado con IA.
2. Una **etiqueta informativa personal y de equipo** —inspirada en el etiquetado nutricional— que traduce las decisiones del juego en un perfil visual de hábitos de consumo de información.

Estas dos piezas forman un **ciclo continuo de aprendizaje**:

```
  JUEGO ──▶ PRÁCTICA DEL PENSAMIENTO CRÍTICO ──▶ DATOS ──▶ ETIQUETA INFORMATIVA
     ▲                                                              │
     └──────── RECOMENDACIONES ◀── IDENTIFICAR ÁREAS DE MEJORA◀────┘
```

- Jugar → practicar el pensamiento crítico en casos reales → generar datos sobre cómo consumo y evalúo información → verlos reflejados en la propia etiqueta → identificar qué mejorar → volver a jugar con retos más específicos.

Este ciclo convierte el juego en un motor de **autorregulación y metacognición sostenida en el tiempo**, y transforma la etiqueta en el resultado natural (no manual) de una experiencia significativa.

---

## 6. Componentes de la solución

### 6.1 Módulo de juego: "Casos Detective"

- **Modo Individual (Detective Junior)**: el usuario recibe fuentes mixtas (noticias, imágenes, videos, audios) reales y falsas y las clasifica. Al finalizar recibe **retroalimentación pedagógica**: si acertó, refuerzo del criterio usado; si falló, un desglose de las señales de la manipulación (metadatos, contexto, fuente, edición, indicios de IA generativa).
- **Modo Equipo (Mystery Media)**: grupos de 2–5 asumen roles complementarios (Analista de imagen, Verificador de fuentes, Rastreador de contexto, Redactor del informe final) y producen un **dictamen grupal con evidencias**. Se genera también una **etiqueta de equipo** que refleja el desempeño colectivo y la distribución de roles.
- **Dificultad progresiva**: incorpora desinformación cada vez más sofisticada (deepfakes, imágenes AI, cadenas de reenvío, bots); el juego el juego con las habilidades reales del usuario.
- **Prebunking (vacunación preventiva)**: micro-retos rápidos previos a eventos reales (elecciones, salud pública, desastres) para "vacunar" contra la desinformación antes de enfrentarla.
- **Ciclo de difusión**: mecánicas que muestran cómo se propaga un contenido (virales, bots, reenvíos), evitando que el usuario se convierta en vector de difusión.

### 6.2 Módulo de perfil: "Mi Etiqueta Informativa"

Cada partida alimenta automáticamente un panel con lenguaje de etiqueta nutricional:

- **Diversidad de fuentes**: variedad de tipos de contenido y temáticas trabajadas.
- **Precisión crítica**: % de aciertos al distinguir información confiable de manipulada y su evolución en el tiempo.
- **Balance temático**: equilibrio entre tipos de casos (política, salud, entretenimiento, IA), alertando sesgos.
- **Nivel de detective**: progresión de "Aprendiz" a "Investigador Senior".
- **Consumo informacional**: variedad de fuentes de procedencia (no solo buen desempeño hacia dentro de la plataforma).
- **Etiqueta de equipo**: versión grupal en el modo Mystery Media.
- **Recomendaciones personalizadas (nudge)**: sugiere el próximo caso/modo y fija un objetivo accionable ("completa 3 casos de política para balancear tu etiqueta").

La etiqueta **no es un registro manual**: se genera de la interacción natural con el juego, eliminando la fricción para un público joven.

### 6.3 Privacidad como pedagogía (diferenciador ético)

- **Consentimiento y control**: el usuario decide qué datos se guardan, qué se comparten y cuáles se borran.
- **Personas menores de edad**: protección estricta (consentimiento de tutor), alineación con marcos locales e internacionales (GDPR/COPPA y equivalentes).
- **Aprendizaje**: el propio sistema expone su gestión de datos como caso de estudio MIL: "¿qué datos sobre ti vale la pena guardar? Tú decides".

### 6.4 Co-creación juvenil (rol protagónico)

- **Banco de casos abierto**: las y los jóvenes proponen y suben casos reales de su propio contexto (redes locales, memes, tendencias), con validación previa de un equipo curador.
- **Detectives Embajadores**: jóvenes destacados como mentores o moderadores para supervisar casos propuestos y conducir partidas en equipo.
- **Insignias compartibles**: logros y etiqueta se comparten como imágenes, para contagiar pares, respetando siempre la privacidad elegida.
- **Retroalimentación continua**: encuestas breves y sesiones de testeo con grupos juveniles para iterar casos, dificultad e interfaz.

### 6.5 Panel "Documento" para educadores (sin vigilancia)

- Dashboard agregado y **anónimo** de métricas de clase/grupo para acompañamiento pedagógico en escuelas y organizaciones.
- Fomenta la adopción institucional sin invadir la privacidad individual.

---

## 7. Prototipo (concepto detallado)

### MVP para una primera iteración
- Web PWA accesible desde móvil y escritorio; modo "lite" para conexiones bajas y sin conexión para el modo individual.
- Autenticación simple (correo o redes sociales).
- Motor central:
  - 2 casos colaborativos "Mystery Media" y 5 casos individuales con contenido generado por IA.
  - Generación en vivo de la etiqueta de creación informativa al finalizar cada caso.
- Panel de etiqueta individual con Recharts/D3 y recomendaciones por reglas base.

### Mapa de rutas mínimas
| Ruta | Acción |
|---|---|
| `/jugar` | Selección de modo individual o equipo |
| `/caso/:id` | Mecánica del caso con pistas y decisión |
| `/perfil` | Etiqueta informativa + historial |
| `/comunidad` | Propuesta de casos + votación de usuarios |
| `/dashboard` | Panel educador (agregado anónimo) |

### Modelo de progresión
| Nivel | Tema de retos | Desbloqueo |
|---|---|---|
| Aprendiz | Noticias falsas clásicas | Nuevos casos cada semana |
| Rastreador | Cadenas de reenvío, bots | Modo Serio |
| Investigador | Imágenes y videos editados | Invitar a Embajador |
| Investigador Senior | Deepfakes y audio IA | Dictamen grupal avanzado |

---

## 8. Alineación con UNESCO

1. **5 Leyes de la MIL**: la plataforma modela acceso, evaluación, uso, creación y participación; el perfil las refleja todas.
2. **MIL CLICKS**: pensamiento crítico (Critical) en cada caso; creatividad (Creative) en la creación de casos; contexto local (Linked); ciudadanía activa (Citizenship) y sostenibilidad (Sustainability).
3. **IA generativa (UNESCO, 2023)**: la IA se usa como recurso pedagógico controlado para generar variantes de casos y, a la vez, como objeto de aprendizaje (los casos quedan etiquetados como "IA" de forma transparente y con verificación humana).
4. **Juventudes empoderadas**: los y las jóvenes no son objeto de protección pasiva, sino que transforman su propia seguridad informacional.

---

## 9. Innovación y creatividad (resumen ejecutivo)

"Tomamos dos símbolos culturales de las juventudes —**el juego** y **la etiqueta nutricional**— para convertir la evaluación de información en algo que **se ve, se comparte y se mejora**, mientras el banco de casos crece con contenido propuesto por los propios jóvenes, en lugar de ser un museo estático de ejemplos."

1. **Integración juego + perfil**: el juego y la etiqueta actúan en un ciclo real (nadie lo ha propuesto al parejo).
2. **Ética de privacidad integrada**: se evita caer en la "vigilancia positiva".
3. **Tratamiento explícito de la confusión humano-IA**: el reto más urgente de la MIL digital hoy.

---

## 10. Factibilidad y sostenibilidad

### Fases
- **Fase piloto (validación)**: MVP web, 20 casos (incluyendo casos de IA), curaraduría manual mínima; prueba piloto con 3 grupos juveniles (escuela + centro comunitario).
- **Fase de comunidad**: activación de la co-creación (banco de casos + embajadores) y alianzas con organizaciones de verificación de datos regionales.
- **Escala**: modelo open-core (banco de casos públicos + API) y talleres en escuelas/organizaciones que financien el mantenimiento.

### Recursos
- **Frontend**: React (juego + etiqueta en una sola PWA).
- **Backend / base de datos**: Supabase o Firebase (realtime para multijugador).
- **Tiempo real**: WebSockets (directos o de la base de datos).
- **Visualización de datos**: Recharts / D3 para la etiqueta informativa.
- **Creación de contenido**: soporte asistido por IA para generar variantes de casos y demostraciones sintéticas, siempre con etiquetado "IA" y verificación humana (curaduría).

### Riesgos críticos y mitigación
| Riesgo | Mitigación |
|---|---|
| Curaduría saturada al crecer | Validación escalonada (embajadores) + triaje de prioridades |
| Contenido malintencionado en el banco | Validación previa + reporte y moderación de contenido peligroso; casos de privacidad |
| Fugas de datos personales de menores | Consentimiento y control, datos mínimos por defecto |
| Depender de la generación de IA | IA solo para variantes; material didáctico siempre validado por humanos |

---

## 11. Impacto e inclusión

- **Accesibilidad**: lectores de pantalla, buen contraste y navegación por teclado.
- **Modo sin conexión / datos bajos**: para comunidades con limitaciones de internet (sur global).
- **Multilingüe**: español, inglés, portugués y otros idiomas por fases.
- **Género**: dinámicas de equipo rotativas y neutrales; casos que reflejen experiencias de mujeres y minorías sexuales y de género.
- **Comunidades marginales**: casos contextualizados a la realidad local (redes, memes, idiomas, temas relevantes) propuestos por los propios miembros de la comunidad.
- **Efecto de pares**: insignias y retos compartibles para campañas en secundarias y universidades.

### Indicadores de éxito
1. Incremento del % de aciertos individuales y grupales según la dificultad.
2. Diversidad de fuentes y temáticas abordadas por el usuario con el tiempo.
3. Número de casos propuestos y validados en la comunidad juvenil.
4. Retención y recurrencia (partidas jugadas por semana/mes).
5. Encuestas pre/post de percepción de pensamiento crítico.
6. Proporción de usuarios que eligen la *fuente verificada* sobre la fuente recomendada por la plataforma.

---

## 12. Teoría del cambio (para el pitch)

- De un inicio → jóvenes se encuentran con desinformación e IA resgenerados.
- Atraviesan el **mecanismo**: juego → datos → etiqueta → recomendación (ciclo).
- A estos **resultados**:
  (a) reconocen indicadores de manipulación;
  (b) consumen con diversidad y balance;
  (c) crean casos y dictámenes;
  (d) llegan al liderazgo de pares (Embajadores);
  (e) su identidad "detectives" los hace menos susceptibles a la manipulación.

---

## 13. Entregables para la convocatoria

1. **Documento de propuesta** (este mismo archivo, con portada, historia del equipo y arquitectura de pantallas final; exportable a PDF/Word).
2. **Video pitch de 3 minutos**:
   - 0:00–0:40 — Problema: "¿Cuántas veces no supiste si un audio era real?" con casos de IA.
   - 0:40–1:40 — Solución: el ciclo juego → etiqueta, con 2–3 pantallas clave.
   - 1:40–2:30 — Demostración en vivo: la etiqueta evolucionando mientras se juegan 2 casos.
   - 2:30–3:00 — Impacto e inclusión: la comunidad co-crea los casos.

**Consideración**: la entrega puede ser en inglés; se recomienda traducir la propuesta completa para la documentación final.