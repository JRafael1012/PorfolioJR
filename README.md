# Rafael.dev — Portafolio

Portafolio personal de **Rafael Arlant Cortes**, estudiante de Ingeniería de
Sistemas y Computación y técnico en Desarrollo de Software.

Sitio estático de una sola página, en español, construido con
[Astro](https://astro.build) y desplegado en GitHub Pages.

**URL:** https://jrafael1012.github.io/PorfolioJR/

---

## Stack

| Pieza | Elección | Motivo |
| --- | --- | --- |
| Generador | Astro 7 | HTML por defecto, sin JavaScript en el cliente salvo el que se pide |
| Lenguaje | TypeScript | Contenido tipado y errores detectados antes de compilar |
| Estilos | CSS puro | Un solo archivo, sin framework ni dependencias |
| Tipografías | Inter + JetBrains Mono | Autoalojadas vía `@fontsource-variable`, sin peticiones a terceros |
| Comportamiento | JavaScript nativo | ~3 KB, sin librería |
| Iconos de interfaz | `lucide-astro` | Iconos SVG reales de Mail, GitHub, LinkedIn y flechas |
| Logos del stack | Simple Icons + Devicon + SVG locales | 29 en ámbar (Simple Icons), 3 a color (Devicon), 5 en `public/img/logos/` |
| Despliegue | GitHub Actions → Pages | Publica `dist/` en cada push a `main` |

---

## Estructura

```
PortafolioAstro/              Página única. Orden de las secciones:
public/                       Header → Hero → Stack → Sobre mí →
├── favicon.png              Trayectoria → Robótica → Destacados →
├── favicon-32.png           Proyectos → Servicios → Estadísticas →
├── apple-touch-icon.png     Certificaciones → Proceso → Idiomas →
├── robots.txt               Contacto → Footer
├── robots.txt               SEO: permite indexar y señala el sitemap
├── sitemap.xml              SEO: la única URL del sitio (D39)
├── img/
│   ├── logo.png             Logotipo (header y favicon)
│   ├── logo-fundacion.jpg   Logo de Fundación Biosbot, 36 KB
│   ├── foto1.jpeg           Foto 1 del hero (la que se precarga)
│   ├── foto2.jpeg           Foto 2 del hero
│   ├── foto3.png            Foto 3 del hero
│   ├── documental.jpg       ─┐
│   ├── foto competencia.jpg  │  Las 7 fotos de la galería de
│   ├── fotoig.jpg            │  Robótica, en el orden de `galeria`
│   ├── mexico 1.jpeg         │  en `src/data/perfil.ts`
│   ├── mexico 2.jpg          │
│   ├── wro.jpg               │
│   ├── wro1.jpg             ─┘
│   ├── logos/               SVG locales: canva, chatgpt, copilot,
│   │                        antigravity y windows. Cada uno lleva su
│   │                        fuente y licencia en un comentario interno
│   └── cv.pdf               ← PENDIENTE: colocar la hoja de vida
└── js/
    └── main.js              Revelado al hacer scroll, anclas, carrusel de
                             fotos del hero, galería de credenciales,
                             collage de robótica y paneles plegables (la
                             pausa de las marquesinas es por hover/foco, D43)
src/
├── components/              Un componente por sección (solo marcado, sin CSS)
│   ├── Header.astro         Navegación fija con subrayado que crece
│   ├── Hero.astro           Carrusel de 3 fotos, cartel de disponibilidad,
│   │                        línea de tecnologías clave, 2 botones y 6
│   │                        botones circulares de redes bajo la foto
│   ├── Stack.astro          Marquesina infinita de logos; pausa solo con
│   │                        hover o foco (botón eliminado, D43)
│   ├── SobreMi.astro        Seis preguntas plegables y propuesta de valor
│   ├── Trayectoria.astro    Timeline con línea que avanza al hacer scroll,
│   │                        galería del diploma del SENA (Finovateh) y
│   │                        panel de "Ver experiencia"
│   ├── Robotica.astro       D28: trayectoria de Fundación Biosbot, 5 cifras
│   │                        calculadas, 2 reconocimientos, 9 torneos en
│   │                        cinta horizontal, galería de 4 casillas con 7
│   │                        fotos, habilidades y RAF VESTIGIA
│   ├── Destacados.astro     Solo los proyectos con `destacado: true`,
│   │                        tarjetas anchas imagen + texto
│   ├── ProyectoCard.astro   Tarjeta compartida de las dos secciones
│   ├── Proyectos.astro      Todos los proyectos en la rejilla
│   ├── Servicios.astro      "Qué sé hacer": 6 tarjetas, rejilla sin huecos (D49)
│   ├── Estadisticas.astro   Cifras calculadas desde `perfil.ts`, nunca a mano (D38)
│   ├── Certificaciones.astro Certificados; aviso si `certificaciones` está vacío
│   ├── Proceso.astro         "Cómo trabajo": 7 pasos de desarrollo (D42)
│   ├── Idiomas.astro         Idiomas honestos (B1·IFEC) + escala CEFR (D48)
│   ├── Contacto.astro        Cuatro tarjetas de contacto + CTA de correo
│   └── Footer.astro
├── data/
│   └── perfil.ts            ← TODO el contenido del sitio
├── layouts/
│   └── BaseLayout.astro     <head>, SEO, fuentes y esqueleto
├── pages/
│   └── index.astro          La página única, y el orden de las secciones
├── styles/
│   └── global.css           ← TODO el CSS, en 18 bloques por orden de página
└── paths.ts                 Helper de rutas con `base`
plans/                       Planes MIDEGS de las fases 1–4
.github/workflows/
└── deploy.yml               Despliegue automático
astro.config.mjs
package.json
tsconfig.json
```

---

## Puesta en marcha

```bash
npm install
npm run dev      # http://localhost:4321/PorfolioJR
```

| Comando | Qué hace |
| --- | --- |
| `npm run dev` | Servidor con recarga automática |
| `npm run build` | Genera el sitio estático en `dist/` |
| `npm run preview` | Sirve `dist/` como lo hará producción |
| `npx astro check` | Revisa tipos y errores de Astro |

Requiere Node.js 22 o superior.

### `@types/node` no es opcional

`astro.config.mjs` lee `process.env.SITE` y `process.env.BASE`, y lleva
`// @ts-check`, así que necesita los tipos de Node. Por eso `@types/node` está
en `devDependencies`.

Esto no es puramente teórico: mientras faltaba, `astro check` **fallaba en GitHub
Actions y pasaba en local**. La causa era que en este equipo existe
`C:\Users\User\node_modules\@types\node` fuera del proyecto, y TypeScript sube
por las carpetas buscando `node_modules/@types`; en Linux ese ancestro no
existe. O sea: **un `npm run build` verde aquí puede mentir si depende de tipos
heredados del entorno.** La prueba válida es el workflow de GitHub.

No borres `@types/node` del `package.json` sin comprobar `npx astro check` en
Actions.

---

## Cómo editar el contenido

**Todo el texto del sitio está en `src/data/perfil.ts`.** No hace falta tocar
los componentes para cambiar textos.

| Qué cambiar | Dónde |
| --- | --- |
| Nombre, cargo, ciudad, descripción | `perfil` |
| Nombre corto del `<h1>` (por defecto «Rafael Arlant») | `perfil.nombreCorto` |
| Tecnologías de la línea del hero | `perfil.tecnologiasClave` |
| Enlaces del menú | `nav` |
| Título y descripción del SEO | `perfil.meta` |
| Ruta de la hoja de vida | `perfil.cv.href` |
| Preguntas y respuestas de «Sobre mí» | `sobreMi` |
| Formación y actividades | `experiencia` |
| Tecnologías del marquee | `stack` |
| Proyectos | `proyectos` |
| Servicios (qué sé hacer) | `servicios` |
| Cifras de Estadísticas | `estadisticas` (se calculan solas) |
| Certificados (curso, institución, año, PDF o enlace) | `certificaciones` |
| Correo, GitHub, LinkedIn, WhatsApp (datos editables) | `datosContacto` |
| Tarjetas de contacto (textos y orden) | `contacto` |

### Servicios y Estadísticas

**«Servicios» es la carta corta de "qué sé hacer" (D37).** El objetivo del sitio
es empleo o prácticas, no clientes, así que la sección no vende ni invita a
contratar: son seis tarjetas de una línea (web, software, bases de datos,
automatización, mantenimiento y ciberseguridad — añadida en D44). Los títulos
y descripciones se editan en
`perfil.ts` → `servicios`; el icono de cada una viene de `lucide-astro` y hay
que mapearlo en `Servicios.astro` antes de usarlo. El nav ya lleva
«Servicios», entre Proyectos y Certificados.

**La rejilla nunca deja huecos (D49).** Antes usaba `auto-fit` y, en escritorio,
con seis tarjetas quedaban celdas vacías en la última fila (el «espacio vacío»
que se veía). Ahora es fija: 3 columnas en escritorio (2 filas × 3 tarjetas,
== 6), 2 en tabletas y 1 en móvil, así las filas siempre salen completas. Debajo
de la rejilla hay una **banda honesta** con enlace a Contacto («Estoy disponible
para empleo y prácticas →»): es el objetivo declarado del sitio, no un CTA de
venta (D37 se mantiene), y aprovecha el bajo de la sección sin inventar datos.

**Las cifras de Estadísticas se calculan solas (D38).** `estadisticas` en
`perfil.ts` se deriva de los datos reales del sitio — proyectos +
`robotica.proyectos`, los años del subtítulo de robótica, los items del stack
con `categoria` de tecnología o herramienta y `certificaciones.length` — así
que **ningún número se escribe a mano y ninguno puede mentir**: si cambian los
datos, cambia la cifra. La regla es que solo se muestra lo justificable: no hay
"10+ proyectos" si hay 3. La marquesina del Stack muestra 37 items con logo;
en Estadísticas solo se cuentan las **24 tecnologías y herramientas**
(13 tecnologías de programación + 9 herramientas de desarrollo + 2 bases de
datos; quedan fuera las plataformas y los asistentes de IA). Estadísticas no
tiene entrada en el nav: es una franja corta pegada a Servicios.

**Proceso de trabajo (D42).** Entre Certificaciones y Contacto, una rejilla de
siete pasos —01 Entender → 07 Publicar— alimentada por `proceso` en
`perfil.ts`. Son descripciones del proceso, no logros. Sin entrada en el nav,
como Estadísticas. **Idiomas (D42/D48):** dos filas honestas —Español nativo,
Inglés **B1 (según IFEC), mejorando**— desde `idiomas`; no se sube el nivel sin
certificado. En ancho de escritorio las píldoras van a la izquierda y a su lado
una **escala CEFR A1→C2** marca la posición real (B1, con `aria-current`); solo
sitúa datos ciertos, sin objetivo ni percentil inventados. El hueco que dejaban
dos píldoras en sección ancha queda así aprovechado (D48). En «¿Qué me interesa?»
de Sobre mí se añadió el tag
**Ciberseguridad**, que ya se sostiene con Kali Linux y dos certificados del
SENA.

### Los botones del hero

Son **dos**: **Conoce mis proyectos** (baja a `#proyectos`) y **Descargar CV**.
Contacto se eliminó de aquí (D25) porque es una sección entera, `#contacto`,
enlazada desde el nav. Los dos comparten `.btn` del bloque 3. El primario va
relleno en `--accent`; el secundario solo con borde y con un **barrido de
relleno** en `--accent-2` que entra desde la izquierda al pasar por encima. El
barrido va dentro de `@media (hover: hover)` para que en táctil no quede un
estado pegado después de tocar. El primario no barre —ya está lleno—: sube a
`--accent-2` y gana una sombra. La flecha se separa del texto
(`btn__label` / `btn__arrow`) para que al desplazarse no empuje el texto ni
ensanche el botón.

### Los botones del header

Los enlaces de sección llevan un **subrayado de 2 px que crece desde la
izquierda** al pasar por encima, pintado con un `::after` para que no desplace
el texto. A la derecha hay **dos** botones con el mismo barrido de relleno que
`.btn`, pero en `--accent` con el texto en `--ink-black` (D22/D25/D40): **GitHub
↗** (sale de `datosContacto.githubUrl`, `target="_blank"`) y **Hoja de vida ↗**
(`.nav-cv`, al ser más pequeño se lee mejor el ámbar que el rojo). En móvil
(<700 px) los enlaces se envuelven en varias filas, sin ☰.

**El header tiene estado al hacer scroll (D45).** Vive en `main.js` (bloque 9),
un solo rAF por vuelta calcula dos cosas:

1. **Encogido y cristal** — con desplazamiento el header añade `.is-scrolled`:
   la barra pasa a una opacidad del 97% con `backdrop-filter: blur(10px)`
   (cristal cuando el contenido pasa por debajo, opaca a 86% en reposo; sin
   soporte de desenfoque se queda en `var(--bg-nav)` sólida), el alto del nav
   baja (84 → 72 px, 76 → 64 px en móvil), el logo encoge a 36 px y aparece
   una sombra suave. El micro-interacción del logo (giro y aumento al pasar el
   cursor) funciona siempre.
2. **Sección activa** — la última cuyo borde superior superó el 35% del alto
   de ventana marca su enlace con `.is-current` y `aria-current="true"`:
   texto en ámbar y subrayado puesto sin esperar al hover. Solo cuentan los
   enlaces internos (`a[href^="#"]`), así que GitHub y Hoja de vida nunca se
   marcan.

**Todo comparte la misma línea (D46/D47).** Marca y enlaces usan una altura de
fila de 44 px; los **botones** son **compactos** (34 px, 32 px en móvil) y se
centran en esa misma línea, así su centro queda a ras con el texto de la marca
("rafael.dev") y no hay desniveles entre texto, logo y botones. La altura de
`.nav-cv` sale de `min-height` (no de `padding`), de modo que aunque cambie el
texto o la fuente la fila no se desalinea. El header base bajó a 84 px para que
los botones no quedaran huérfanos dentro de una barra muy alta.

**El `:not(.nav-cv)` de `.nav-links a` no es cosmético.** El botón de «Hoja de
vida» también es un `<a>` dentro de `.nav-links`, así que sin el filtro heredaría
el subrayado y el `padding-block`, y este último le ganaría por especificidad al
`padding` de `.nav-cv`, dejándolo a 6 px de alto. La regla de los 11 px en el
corte de 700 px repite el mismo `:not()` por lo mismo.

### «Sobre mí»: seis preguntas que se despliegan hacia la derecha

Cada pregunta es un botón; al pulsarla su respuesta aparece **al lado**, y la
pregunta se encoge. La primera arranca abierta. No hay JavaScript propio de la
sección: usa el patrón `data-exp-toggle` + `aria-controls` que
`public/js/main.js` ya tenía para «Ver experiencia» en la trayectoria. Para
abrir otra de entrada por defecto, añade `data-exp-open` a su botón.

**Las dos diferencias con un acordeón normal**, por si hay que tocarlo:

1. Los botones de esta sección llevan **`data-exp-css`**. Es lo que permite
   que el despliegue se anime: `display: none` no transiciona, así que el
   estado no puede vivir en `hidden` sino en `visibility`, que sí se anima y
   aun así saca el panel del tabulado y de los lectores de pantalla. El
   atributo `hidden` sigue en el HTML para quien llegue sin JavaScript, y el
   script lo quita en cuanto arranca. **Los paneles que no lleven
   `data-exp-css` siguen funcionando igual que antes.**
2. Hay un envoltorio extra, `.about-panel__inner`, que es el que recorta el
   alto. Sin él el contenido seguiría marcando el alto y las seis filas
   quedarían altas siempre.

Dos mandos si quieres ajustar el ancho:

| Qué cambiar | Dónde | Efecto |
| --- | --- | --- |
| Ancho total de las filas | `max-width` de `.about-list` (en `rem`) | **1 cm ≈ 2,36 rem.** Ahora `54rem` |
| Reparto entre pregunta y respuesta | `1fr / 1.07fr` de `.about-item` | Más `fr` en la respuesta = más ancha |
| Tope del texto | **no hay**, que el ancho lo manda la columna | Si lo añades, el texto se corta |

Debajo de 700 px no cabe de lado y la respuesta vuelve a caer hacia abajo: solo
se anima el alto.

El orden de las preguntas es un arco y conviene mantenerlo: identidad → lo que
resuelvo → la base técnica → lo que me interesa → qué quiero construir → qué
busco. Quien solo lea los títulos ya se queda con el resumen.

El texto y las etiquetas de la respuesta entran desde la derecha, el mismo
sentido en que crece la columna. Las etiquetas de «¿Qué me interesa?» se abren
además como una cortina de izquierda a derecha y entran escalonada. Si el
sistema pide menos movimiento (`prefers-reduced-motion`), todo el despliegue
sale instantáneo.

### Botones de redes sociales del hero

Debajo de la foto de portada hay botones circulares con los logos de WhatsApp,
Instagram, LinkedIn, GitHub, Discord y Gmail. Los botones externos abren en una
pestaña nueva; Gmail abre el cliente de correo. El hero busca LinkedIn, GitHub y
Correo dentro de `contacto` por su `label` y toma su `href`, así que esos tres
enlaces salen de `datosContacto` y no hay ninguna URL repetida. Para cambiar
WhatsApp, Instagram o Discord (o reordenar los botones), edita la constante
`redes` de `src/components/Hero.astro`.

Los seis caben en una sola fila sin tocar CSS: `.hero-socials` va con
`flex-wrap: nowrap` y ancho fijo por botón, así que mide 315 px en escritorio
(6 × 2,7 rem + 5 × 0,7 rem) y 279 px en móvil (2,45 rem y 0,55 rem). La columna
de la foto más estrecha del diseño —justo por encima del corte de 1050 px— deja
unos 425 px, así que no hay riesgo de desbordamiento.

### ⚠ Antes de publicar, revisa esto

1. `stack` — **un logo es una afirmación.** Quita las tecnologías que no
   manejes: quien lo ve da por hecho que sí.
2. Coloca tu hoja de vida en `public/cv.pdf`.
3. `proyectos[].enlace.url` apunta al perfil de GitHub, no a repositorios. **RESUELTO en D21:** los cuatro proyectos inventados se borraron y ahora los enlaces van a repositorios reales.
4. **Sin confirmar, marcado con `TODO` en `perfil.ts`:** el torneo de Brasil
   (falta cuál y en qué año), los canales del documental, la URL de Instagram,
   el nombre de RAF VESTIGIA y un segundo correo. No se inventó ninguno.
5. **Las fotos de la galería ya están optimizadas** (D32): pesan **1,27 MB** en
   total, frente a 2,22 MB. Ojo a `foto competencia.jpg`: son 473×405 px, más
   pequeñas que la casilla donde sale. No se ve mal, pero si tienes el original
   en mayor resolución, cambiarlo es una mejora gratis.
6. **Certificados:** **13 tarjetas cargadas** desde los datos de los propios
   PDF (no escritos a mano): 11 de **SENA** (curso, ciudad y año leídos de la
   fecha de registro) y 2 de **Coursera** (UCI y Google). Queda **sin cargar**
   `certificado-jonatan-rafael-arlant-cortes.pdf`: es una imagen sin texto, y
   falta nombre, institución y año. El nav ya incluye «Certificados». Ver D36.

### Los botones de contacto

Contacto **ya no reutiliza `.nav-cv`** del header: es un diseño propio (D24). Los
botones de «Hoja de vida» del header y los de esta sección son independientes y
cambian por separado.

Los cuatro medios de contacto se generan desde el array `contacto` en
`src/data/perfil.ts`. Cada tarjeta es un `<a>` completo (`.contact-card`), con
plataforma, valor, descripción corta y flecha:

1. **Correo** — destacado (D26): lleva filete ámbar, un velo de fondo
   `--accent` 9% → `--accent-2` 5%, el icono con el degradado de la paleta y el
   valor un cuerpo mayor (`1.18rem`, `1.02rem` en ≤700 px). En reposo ya se ve
   cuál es la vía principal, sin depender del hover.
2. **GitHub** — valor desde `datosContacto.githubUrl`.
3. **LinkedIn** — valor desde `datosContacto.linkedinUrl`.
4. **WhatsApp** — número desde `datosContacto.whatsappNumber`; la tarjeta se
   oculta (`aria-disabled`) si el número está vacío.

Todas las tarjetas son enlaces enteros (`.contact-card__link` es el `<a>`), así
que hay **una sola parada de tabulación** por medio y el objetivo táctil es toda
la tarjeta. Al pasar por encima crece un filete de acento de 3 px a la izquierda,
de abajo a arriba: el mismo motivo que el antetítulo `.eyebrow` y que el
corchete de `.photo-frame`. Se eligió el filete y no el relleno de `.btn` de D25
porque la tarjeta tiene tres líneas de texto y llenarla de ámbar obligaría a
voltear las tres a `--ink-black`. El filete se recorta con `overflow: hidden`
contra el radio de 4 px del propio enlace.

La tarjeta marcada `--hero` lleva el velo en el `<a>` y no en el `<li>` a
propósito: el radio está en el enlace, y un degradado en el `<li>` saldría por
debajo con las esquinas rectas.

Los tres datos editables viven en el bloque `datosContacto` del mismo archivo:

- `email` — dirección y `mailto:` del botón principal.
- `githubUrl` / `githubUsername` — enlace y texto visible.
- `linkedinUrl` — enlace a tu perfil.
- `whatsappNumber` — solo el número, sin `+` ni espacios (ej. `573238176273`);
  el enlace `https://wa.me/...` y el texto `+57 323 817 6273` se calculan solos.

El mensaje de WhatsApp está en `datosContacto.whatsappMessage` y se codifica con
`encodeURIComponent`, así que los acentos y signos no rompen la URL.

El botón inferior (`¿Prefieres escribirme directamente?` → «Envíame un mensaje») y
la tarjeta de correo usan `correoUrl`, que es un `mailto:` y **no** abre pestaña.
GitHub, LinkedIn y WhatsApp abren en pestaña nueva con
`rel="noopener noreferrer"`.

Los valores largos llevan `overflow-wrap: anywhere` para no desbordarse en móvil.

### Dos secciones de proyectos, no una

`proyectos` alimenta **dos secciones independientes** del mismo array:

1. **`#destacados` — "Proyectos destacados"** (`Destacados.astro`). Los que
   llevan `destacado: true`, en tarjetas anchas de una columna: captura a la
   izquierda, texto a la derecha. Va **antes** en la página, para que quien
   entra vea primero lo mejor.
2. **`#proyectos` — "Todos los proyectos"** (`Proyectos.astro`). **Todos**,
   los destacados incluidos, en la rejilla de `.card-grid`. Aquí no se filtran.

Que un proyecto esté en las dos secciones es lo normal: la tarjeta destacada es
una llamada y la completa da el detalle. Ambas usan el mismo componente,
`src/components/ProyectoCard.astro`; la segunda lo llama sin `destacada`, y por
eso sale en la rejilla y no a ancho completo.

Hay una entrada de nav para cada una: **Destacados** y **Proyectos**. El nav
lleva `flex-wrap: wrap`, así que el sexto enlace envuelve en vez de desbordar.

**Todo menos el título está vacío a propósito.** Cada campo es opcional y la
tarjeta dibuja solo el que exista: `descripcion`, `problema`, `stack`,
`funcionalidades`, `participacion`, `estado`, `imagen`, `repositorio`, `demo`.
Un dato que no tienes **no se inventa ni se disimula**, simplemente no sale.

**El hueco de la imagen se reserva siempre**, tenga foto o no: `aspect-ratio`
fija la altura y el hueco vacío mide exactamente lo mismo que la captura, así
que la tarjeta no da saltos cuando la añadas. Lo decides así a propósito: los
proyectos se llenarán más adelante y el espacio se queda reservado mientras
tanto. Con la foto puesta:

```ts
imagen: 'img/proyectos/finovatech.webp'   // dentro de public/
```

Se acepta con o sin barra inicial (`'/img/...'` y `'img/...'`). **Importante:**
`withBase()` solo antepone el `base` de GitHub Pages a rutas que empiezan por
`/`, y sin él una ruta relativa devolvería 404 en `usuario.github.io`. Por eso
`ProyectoCard.astro` normaliza la ruta antes de usarla: si le pones la imagen
sin la barra inicial, funciona igual.

**Los botones solo salen con URL real.** Sin `demo` ni `repositorio`, la tarjeta
se queda sin botones; nunca se enlaza al perfil de GitHub para rellenar el hueco
(ver D21). Se llaman «Ver proyecto» (apunta a `demo`) y «GitHub» (apunta a
`repositorio`), y ambos abren en pestaña nueva con `rel="noopener noreferrer"`.

Los botones son propios, `.project-card__btn`, en vez de reutilizar `.btn`: los
del hero miden 56 px con 30 px de hueco y aquí van dos en paralelo y más
pequeños. El lenguaje visual es el mismo — primario con relleno `accent`,
secundario solo con borde — y el `min-height` es de 44 px, el objetivo táctil
mínimo. El elevamiento va dentro de `@media (hover: hover)` para que en táctil
no quede un estado pegado después de tocar.

**El tercer destacado es provisional.** Hay tres tarjetas marcadas, pero
«RAF VESTIGIA» salió de la lista de candidatos del documento de contenido, no de
los datos del sitio; en `experiencia` la robótica figura como «Robótica» en
Fundación Biosbot Robótica. Confirma el nombre o bórralo.

**Faltan proyectos.** El objetivo son 8 en la sección completa y 3 destacados, y
ahora mismo hay **3 confirmados**. La estructura ya aguanta los 8: se añaden al
array y aparecen solas, sin tocar los componentes.

### La sección Robótica

Es la sección que hace que el sitio no se lea como "un portafolio de páginas web"
(D28). Antes su contenido estaba repartido en tres sitios: la línea de tiempo, un
toggle escondido con los torneos y fotos que nunca se rellenaron.

`src/components/Robotica.astro` **no copia nada**: lee lo que ya había en
`perfil.ts`. La trayectoria de Fundación Biosbot se sigue viendo en la línea de
tiempo, pero ya solo como una línea; el detalle largo está aquí.

De arriba abajo:

1. **Cifras de cabecera** (D29) — torneos, podios, primeros puestos, países y
   años. **Ninguna está escrita a mano**: se cuentan desde `competencias` y
   `robotica`. Añadir un torneo sube el número solo, así que el rótulo no puede
   quedar diciendo una cosa y el dato otra. El podio cuenta sobre `puesto` (el
   número), no sobre `resultado` (el texto libre).
2. **Trayectoria de Fundación Biosbot**, leída de `experiencia` por su
   `detalleEn: 'robotica'`.
3. **Dos reconocimientos** en destacado.
4. **La cinta de 9 torneos** (ver más abajo, D30).
5. **La galería** de 4 casillas con 7 fotos (ver «Imágenes»).
6. **Medios**: tres tarjetas estáticas.
7. **Habilidades y RAF VESTIGIA** (D28.3: RAF VESTIGIA es de robótica, no un
   proyecto web, así que dejó de ser destacado).

El logo de la Fundación se optimizó en vez de quitarse: sigue siendo una
afirmación de que se estuvo ahí, pero ocupa 36 KB en lugar de 587 KB.

El botón «Ver experiencia» sigue ocultando lo largo, y **las cifras van fuera del
panel a propósito**: lo que dice esta sección hay que verlo sin pulsar nada.

### La marquesina de logos

Un logo se resuelve en este orden, y se para en el primero que exista:

1. `slug` → `https://cdn.simpleicons.org/<slug>/ffba08` (SVG teñido de ámbar).
2. `di` → Devicon, a color, para lo que Simple Icons no tiene.
3. `icono` → un SVG de `public/img/logos/`. Se lee con `withBase()`, sin eso
   devolvería 404 en GitHub Pages.

Si no hay ninguno de los tres, se muestra solo el nombre, con un hueco punteado
para no romper el ritmo de la fila. Hoy las 37 tecnologías tienen logo.

| Slug que da 404 | En su lugar |
| --- | --- |
| `css3` | usa `css` |
| `java` | usa `openjdk` |
| `vscode` / `visualstudiocode` | no existen; usa `di: 'vscode'` (Devicon) |
| `openai` | usa `anthropic` o `claude` |
| `canva` | está en el paquete npm de Simple Icons pero **no** en `cdn.simpleicons.org`; usa un SVG local |
| `chatgpt` / `openai` | no existen; usa el SVG local de Wikimedia Commons |
| `bash` | usa `gnubash` |
| `nodejs` | usa `nodedotjs` |

Para añadir una, comprueba que el slug responde antes de dar por hecho que
funciona:

```
https://cdn.simpleicons.org/<slug>/ffba08
```

---

## Cómo editar los estilos

**Todo el CSS está en `src/styles/global.css`** (~93 KB). Ningún componente
`.astro` lleva estilos dentro.

El archivo está dividido en **dieciséis bloques numerados** y comentados, y **el orden
de los bloques es el orden de la página** (D31). Cada bloque dice qué componente
`.astro` lo usa, y la cabecera del archivo lleva el índice y las reglas de
edición.

| Bloque | Contenido |
| --- | --- |
| 1 | Tokens: paleta, tipografías y medidas |
| 2 | Base: reset y utilidades |
| 3 | Componentes compartidos: secciones, tarjetas, botones, etiquetas, acordeón |
| 4 | Header |
| 5 | Hero |
| 6 | Stack: la marquesina infinita (cómo se mueve) |
| 7 | Sobre mí: preguntas plegables y propuesta de valor |
| 8 | Trayectoria |
| 9 | Robótica: torneos, galería, Fundación, habilidades, contadores |
| 10 | Proyectos y destacados: tarjetas de proyecto |
| 10B | Certificaciones: tarjetas de certificado (sección vacía hasta que haya datos) |
| 10C | Servicios: tarjetas de "qué sé hacer", modo reducido (D37) |
| 10D | Estadísticas: cuatro cifras justificables (D38) |
| 11 | Contacto: fondo del hero, rejilla, tarjetas de contacto y CTA |
| 12 | Footer |
| 13 | Ajustes transversales: los `@media` que cruzan secciones |

**Por qué hay un bloque de compartidos y uno de transversales.** Lo que usa más
de un componente va en el 3, no en la sección que lo usa primero: si estuviera en
dos sitios, cambiar uno y olvidar el otro daría dos estilos para lo mismo. Los
`@media` transversales van al final porque, dentro de un `@media`, gana la regla
que está más abajo.

**Regla práctica:** si añades una clase nueva, va en el bloque de la sección que
la usa; si la usan dos, va en el 3. Si añades una sección, va en su sitio en el
orden de la página.

### Cambiar los colores de todo el sitio

Edita la paleta de la sección 1. Los diez colores están en orden, de oscuro a
cálido. Para cambiar la marca global lo normal es ajustar los tres acentos:

```css
--accent:   var(--amber-flame);  /* títulos y cifras */
--accent-2: var(--cayenne-red);  /* enlaces y bordes */
--accent-3: var(--brick-ember);  /* palabra del titular */
```

### Breakpoints

Dos, y coinciden en casi todos los bloques: **1050 px** y **700 px**.

Excepción conocida, sin arreglar: el bloque 12 (Footer, `800px` y `520px`) usa
cortes propios. Se nota entre 700 y 800 px, donde el resto ya va en layout móvil y
ese bloque todavía va a dos columnas.

El bloque 11 (Contacto) sí usa los cortes globales, más un tercero a **420 px**
para móvil pequeño.

### Accesibilidad

- `:focus-visible` dibuja el contorno de foco. No lo elimines.
- `.skip-link` es el enlace «Saltar al contenido».
- `prefers-reduced-motion` desactiva animaciones. No lo quites.
- Las cajas `aspect-ratio` de la foto evitan saltos de maquetación.

---

## Imágenes

| Archivo | Uso | Tamaño real |
| --- | --- | --- |
| `public/img/logo.png` | Header y favicon | 992×1061 px |
| `public/img/logo-fundacion.jpg` | Logo de Fundación Biosbot, bloque 9 | 36 KB |
| `public/img/foto1.jpeg` | Foto 1 del hero (la precargada) | 960×1280 px, 177 KB |
| `public/img/foto2.jpeg` | Foto 2 del hero | 899×1599 px, 159 KB |
| `public/img/foto3.png` | Foto 3 del hero | 463×937 px, 634 KB |

Las fotos del hero están en `src/components/Hero.astro` (`const fotos`). El
carrusel rota cada 15 s y se apaga solo si el sistema pide menos movimiento
(`prefers-reduced-motion`). Cada foto tiene su propio encuadre en
`.photo--1`, `.photo--2` y `.photo--3` mediante `object-position`.

### La galería de Robótica ya tiene fotos

`src/components/Robotica.astro` monta una rejilla de 2×2 (**4 casillas**) y cada
casilla rota su propio grupo de capas cada **5 s**, sin bordes ni botones. Con
`prefers-reduced-motion` se quedan en la primera combinación y no arrancan.

Las 7 fotos van en `galeria` de `src/data/perfil.ts`, en este orden:

```
documental.jpg → foto competencia.jpg → fotoig.jpg → mexico 1.jpeg
→ mexico 2.jpg → wro.jpg → wro1.jpg
```

Se reparten entre las 4 casillas por el índice (`TILES = [0, 1, 2, 3]`), así que
**no importa cuántas haya**: se reparte el resto. Los textos alternativos van en
`galeriaAlt`, en el mismo orden. Si una foto no tiene descripción, **no se
inventa una**: el campo es opcional.

**Por qué las casillas son cuadradas (D34).** Eran `4/3`, y con
`object-fit: cover` eso recortaba el alto: `documental.jpg` (720×1599) solo
enseñaba un tercio de su imagen y se comía la cara. Con `1/1` cada foto
vertical muestra bastante más, y encima cada una puede anclarse arriba o
abajo con `galeriaPos`, un array opcional del mismo largo que `galeria`. La
CSS solo lee `var(--img-pos, center)`: sin valor, la foto se queda centrada,
así que basta con tocar la posición que quieras cambiar.

**Dónde tocar cada cosa** (está anotado en el bloque 9 del CSS):

| Qué cambiar | Dónde |
| --- | --- |
| Proporción de las casillas | `.rob-collage__tile` (`aspect-ratio`, **1/1** desde D34) |
| Subir o bajar el encuadre de UNA foto | `galeriaPos` en `perfil.ts` (`'center 16%'`: más bajo = más arriba) |
| Número de fotos por casilla | `TILES` en `Robotica.astro` |
| Cada foto | `galeria` y `galeriaAlt` en `perfil.ts` |
| Velocidad de rotación | el `5000` de `public/js/main.js` |
| Pasadas y tamaño | `@media` del bloque 9 |

La galería de credenciales (`src/components/Trayectoria.astro`) es otra cosa: sigue
usando **marcadores** con icono SVG donde irá
`public/img/diploma-tecnico.jpg` y `public/img/entrega-diploma.jpg`. Al añadir
esas fotos hay que cambiar el `<div class="credential-slot">` por un `<img>`. No
se rellenó con fotos de otra cosa para no sustituir contenido real por iconos.

### Una imagen sin usar

`public/img/foto.jpg` (249 KB) es la versión anterior de una foto del hero. No la
referencia ningún componente y sigue versionada en git, así que **no se borró**:
sacarla del repositorio es otra decisión y cambia lo que se publica.

### Los torneos y los medios de Robótica

Los **9 torneos** salen de `competencias` en `src/data/perfil.ts`, ordenados por
el año del `periodo` (no por el orden de escritura). Cada uno lleva `titulo` y
`periodo`; `evento`, `resultado` y `puesto` son opcionales y, si faltan, no se
pintan. Los que tienen puesto llevan además su ciudad.

Se muestran en una **cinta horizontal** (`D30`): dos copias del mismo grupo para
que el bucle no se note, 18 elementos en total, sin logos y sin botón de pausa. Se
para sola al pasar por encima o al llegar con el teclado, porque el `track` es
`tabindex="0"`. Si el sistema pide menos movimiento, no se mueve.

El motor es el mismo `.marquee` de Stack, no un segundo carrusel: el bloque 6
define *cómo* se mueve y el bloque 9 solo añade *cómo se ve* cada torneo
(`.marquee--torneos`, `.marquee__periodo`, `.marquee__titulo`,
`.marquee__detalle`).

Los **medios** (documental, redes) son tres tarjetas **estáticas** en rejilla. Se
movían antes, pero una cinta de tres elementos es ruido y obligaba a un botón que
ya no hace falta. Los enlaces abren en pestaña nueva y llevan texto solo para
lectores de pantalla, porque el icono de flecha no lo dice.

Para reemplazar una imagen, mantén el mismo nombre de archivo. Para cambiar el
marco de la foto, ajusta `aspect-ratio` en `.photo-frame`.

El favicon se genera recortando el logo a un cuadrado centrado:

```powershell
Add-Type -AssemblyName System.Drawing
# ver el bloque que genera favicon.png, apple-touch-icon.png y favicon-32.png
```

---

## Publicar y despliegue

```bash
git add -A
git commit -m "descripcion"
git push origin main
```

Ese push dispara `.github/workflows/deploy.yml`: instala, comprueba tipos,
compila y publica `dist/` en GitHub Pages.

### Si el push no publica: revisa esto

1. **Pages puede no estar habilitado.** Es el fallo más probable y no se
   arregla desde el código. En <https://github.com/JRafael1012/PorfolioJR/settings/pages>
   la fuente debe ser **GitHub Actions**. Se comprueba sin credenciales:
   `has_pages` en `https://api.github.com/repos/JRafael1012/PorfolioJR` debe
   ser `true`; si es `false`, el repositorio no tiene Pages activo y
   `deploy-pages` falla.
2. **La URL correcta lleva subcarpeta**: `https://jrafael1012.github.io/PorfolioJR/`.
   `https://jrafael1012.github.io/` da 404 aunque todo esté bien, porque el
   repositorio no es `JRafael1012.github.io`.
3. **Ver los errores** en la pestaña *Actions* del repositorio. Cada paso va
   separado (`sync`, `check`, `build`, artefacto, despliegue) para que se vea
   en cuál falla.

### La ruta base

El sitio no vive en la raíz del dominio sino en
`https://<usuario>.github.io/<repositorio>/`. Por eso `astro.config.mjs`
declara:

```js
base: '/PorfolioJR',
```

Y por eso existe `src/paths.ts`: la función `withBase()` antepone ese prefijo a
las rutas internas. **Si cambias el nombre del repositorio, actualiza también
`base`**, o las imágenes y el favicon devolverán 404.

Las anclas (`#proyectos`) y las URLs externas no llevan el prefijo.

---

## Decisiones de diseño

- **Tema oscuro único**, sin modo claro: la paleta cálida sobre fondo casi
  negro es la identidad del sitio.
- **CSS global único** en lugar de estilos con alcance por componente, para que
  la cascada sea predecible y todo el diseño se lea en un archivo.
- **JavaScript mínimo**: sin framework. Solo dos comportamientos, y ambos se
  desactivan si el usuario pidió menos movimiento.
- **Contenido tipado** en un solo archivo, separado de la presentación.
- **Cifras calculadas, nunca escritas**: las estadísticas se derivan de los
  datos de `perfil.ts`; si un número no se puede justificar, no se muestra
  (D38).

---

## Planes

`plans/` sigue el modelo MIDEGS.

- `plans/plan_midegs_completo.md` — fuente de verdad: decisiones (D1…D38) y las
  10 fases con sus criterios de aceptación.
- `plans/historial/` — los planes de las fases 1 a 4 tal como se escribieron
  entonces: dirección y viabilidad, requisitos, arquitectura y planificación.

Las decisiones no se duplican aquí: si algo ya está en el plan, el README lo
enlaza en vez de repetirlo.
