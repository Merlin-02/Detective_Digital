# MediaMind · Mi Etiqueta Informativa

MVP para el **Hackathon UNESCO de Juventudes 2026** — alfabetización mediática e
informacional (MIL). Un juego de investigación con una "etiqueta informativa"
(estilo nutricional) que convierte el consumo de información en un hábito
medible, motivante y compartido, alineado con las 5 Leyes de la MIL y el enfoque
UNESCO MIL CLICKS.

## Características

- 🕵️ **Juego de investigación**: casos reales y sintéticos (deepfakes, voces
  clonadas, cadenas virales) clasificados como real / manipulado / falso / IA.
- 🍎 **Etiqueta informativa**: precisión crítica, diversidad de fuentes, balance
  temático y nivel de detective; se genera con cada decisión en el juego.
- 👥 **Modo equipo (Mystery Media)**: roles complementarios y dictamen grupal.
- 🌐 **Multijugador online**: salas por código, turnos y votación sincronizada.
- 🏘 **Comunidad educativa verificada**: cursos y webinars, material de estudio
  real y casos co-creados, con votación y validación.
- 🔒 **Privacidad como pedagogía**: los datos viven en `localStorage`, son
  borrables y el usuario decide qué se comparte.
- 🌍 **i18n**: ES / EN / PT.

## Marco pedagógico

**MediaMind está alineado con las 5 Leyes de la Alfabetización Mediática
e Informacional (MIL) de la UNESCO y con el enfoque UNESCO MIL CLICKS:**

1. **La información, la comunicación, las bibliotecas, los medios, la
   tecnología y el internet** son para el compromiso cívico crítico y el
   desarrollo sostenible: ningún medio es más relevante que otro.
2. **Toda persona es creadora de información/conocimiento** y tiene un mensaje:
   debe estar empoderada para acceder a nueva información y expresarse. La MIL
   conjuga alfabetización mediática e informacional.
3. **La información, el conocimiento y los mensajes no son neutrales**: siempre
   son producto de un proceso y están sujetos a influencias e intereses.
4. **Toda persona quiere conocer y comprender** nueva información, conocimiento
   y mensajes, así como comunicarse con otras personas; sus derechos nunca
   deben verse comprometidos.
5. **La MIL no se adquiere de una vez**: es un proceso vivo y dinámico que
   cubre acceso, evaluación y uso, junto con la creación y comunicación de
   contenidos en medios y tecnología.

En la práctica, el proyecto aplica estas leyes como:

- **Juego + práctica**: los hábitos de consumo de información se entrenan en el
  momento donde circula la desinformación (memes, cadenas, videos virales), no
  con guías estáticas (`Ley 5`).
- **Creación y participación**: el banco de casos crece con propuestas de la
  comunidad y comunidades educativas verificadas ofrecen cursos y material de
  estudio (`Leyes 2 y 4`).
- **Evaluación crítica**: cada caso entrena el contraste de fuentes y señales
  de manipulación (`Ley 3`).
- **Acceso y uso responsable**: la etiqueta informativa y la privacidad como
  pedagogía hacen visible el propio consumo sin datos individuales (`Ley 1`).

## Stack

- React 19 + TypeScript + Vite
- Tailwind CSS v4 (paleta de marca inspirada en UNESCO Blue `#0077D4`)
- React Router 7
- Zustand (estado + persistencia local, "mock backend")
- Recharts (radar y evolución de la precisión)
- Node + `ws` (servidor WebSocket del multijugador)

## Rutas

| Ruta            | Contenido                                                  |
| --------------- | ---------------------------------------------------------- |
| `/`             | Home con el ciclo juego → etiqueta → recomendaciones       |
| `/jugar`        | Selección de modo (individual / equipo) y casos            |
| `/caso/:id`     | Caso individual o Mystery Media (rol + dictamen)           |
| `/multijugador` | Salas online por código, turnos y dictamen colectivo       |
| `/perfil`       | Etiqueta informativa, radar y recomendaciones              |
| `/comunidad`    | Comunidad educativa verificada (cursos, material, casos)   |

## Desarrollo

Requisitos: Node 20+ (el proyecto se probó con Node 26).

```bash
npm install
npm run dev        # servidor de desarrollo (Vite)
npm run typecheck  # tsc
npm run lint       # oxlint
npm run build      # tsc + build de producción hacia dist/
```

Para el multijugador online en desarrollo (por separado):

```bash
npm run server                # arranca ws://localhost:8787
PORT=9000 npm run server      # puerto alternativo
```

## Banco de casos desde la web (feeds)

A la curaduría local se suma un **banco web** de casos reales capturados de
verificadores de datos:

```bash
npm run casos:web                # descarga feeds RSS/Atom y genera casos
npm run casos:web -- --max 12    # límite por fuente (por defecto 8)
```

Fuentes: Chequeado, EFE Verifica, Maldita.es y Google Noticias (búsqueda de
verificación). Redes de seguridad: solo se publica material que el feed marca
como veredicto de verificación y se deduplica por URL con `server/db/vistos.txt`
(historial). Salidas:

| Archivo                 | Descripción                                |
| ----------------------- | ------------------------------------------ |
| `public/casos_web.json` | Consumido por la app (con cache-busting)   |
| `server/db/casos.db.json` | Base local con historial y metadatos     |
| `server/db/vistos.txt`  | Deduplicación entre corridas               |

La app los mezcla en `/jugar` y `/perfil` marcados con la etiqueta "banco web".
Cada caso web lleva enlace a la **fuente original** y una **copia en Internet
Archive** (web.archive.org) para sobrevivir al borrado.

### Sync con Supabase (opcional)

Copia `.env.example` a `.env` y rellena las credenciales; el worker hará un
upsert (REST) de cada caso en tu tabla:

```sql
create table casos_web (
  id text primary key,
  titulo text, descripcion text, categoria text, tipoContenido text,
  dificultad smallint, url text, origen text, fecha text, veredSegun text,
  esIA boolean, senales jsonb,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
```

> Nota ética: el worker solo consume feeds públicos RSS/Atom, respeta los
> términos de los medios y conserva atribución, fecha y URL original.

## Despliegue (Railway) — un solo servicio

El proyecto se despliega como **un único servicio Node**: `server/index.mjs`
sirve el build estático (`dist/`) con fallback SPA y el WebSocket del
multijugador en el **mismo puerto** (`PORT` que asigna Railway).

1. Sube el repositorio a GitHub.
2. En Railway: **New Project → Deploy from GitHub** → escoge el repo
   (usa el `railway.toml` incluido: `npm run build` en build y `npm run start`
   para arrancar).
3. Sin pasos extra: el front deriva la URL `wss://` del propio dominio y, en
   localhost, usa `ws://localhost:8787`. Opcional: define `VITE_WS_URL` para
   apuntar el multijugador a otro host.

Local (todo-en-uno):

```bash
npm run build && npm run start
```