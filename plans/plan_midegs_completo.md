# PortafolioAstro — Plan único MIDEGS (fases 1 a 10)

Plan consolidado de las diez fases. **Fuente de verdad del estado del
proyecto.** Los planes detallados de las fases 1 a 4 ya escritos siguen en
`plans/historial/` como historial y no se eliminan.

- **Perfil:** Ligero (ver fase01, D6). Sitio personal estático, sin datos
  sensibles, sin usuarios, sin persistencia.
- **Fase actual:** **05 — Desarrollo e integración.**
- **Regla aplicada:** no se escribe código sin plan aprobado de la fase
  (este documento). Este archivo es también el plan de la Fase 5, que estaba
  referenciado en `fase04` pero nunca se creó.

---

## Estado por fase

| Fase | Nombre | Estado | Evidencia |
| --- | --- | --- | --- |
| 1 | Dirección estratégica y viabilidad | Cerrada | `plans/historial/fase01_direccion_viabilidad.md` |
| 2 | Descubrimiento y requisitos | Cerrada | `plans/historial/fase02_descubrimiento_requisitos.md` |
| 3 | Arquitectura y diseño | Cerrada | `plans/historial/fase03_arquitectura_diseno.md` |
| 4 | Planificación y preparación | Cerrada | Git en `main`, `origin` correcto, CI/CD, `base: '/JRafael1012'`, `dist/` generado |
| 5 | Desarrollo e integración | **En curso** | Cerrados P1, P2, P3, P5, P8, P9. Pendientes P4 (pospuesto), P6, P7 (parcial) |
| 6 | Verificación y validación | Pendiente | — |
| 7 | Liberación y despliegue | Pendiente | Primer deploy ya publicado en `/JRafael1012` |
| 8 | Operación y mantenimiento | Pendiente | — |
| 9 | Evaluación y mejora | Pendiente | — |
| 10 | Retiro o reemplazo | Pendiente | — |

---

## Fase 05 — Desarrollo e integración

### Objetivo

Sustituir el contenido de marcador por información real verificada y dejar el
sitio listo para publicar.

### Decisiones

- **D5 — Contenido:** todo el texto vive en `src/data/perfil.ts`. No se editan
  componentes para cambiar contenido. Excepción registrada: la frase del hero
  (`titular`) estaba escrita a mano en `Hero.astro`; se corrigió el 2026-10-02
  para que el dato de `perfil.ts` sea el que se ve.
- **D9 — Presentación (2026-10-02):** por petición del usuario se reescribieron
  `perfil.titular` («Desarrollador de software enfocado en soluciones reales.»)
  y `perfil.descripcion` (texto completo del usuario). Sigue pendiente
  revisar el hero renderizado: ambos textos son más largos que los anteriores.
- **D10 — Iconos de la cinta (2026-10-02):** la cinta resuelve el logo en tres
  pasos y se detiene en el primero que exista: Simple Icons (29, SVG teñido en
  ámbar), Devicon (3 a color: Java, PowerShell y VS Code) y `icono`, un SVG de
  `public/img/logos/` leído con `withBase()` (5: Windows, Copilot, ChatGPT,
  AntiGravity y Canva). Resultado: **37 de 37 con icono**. Verificación: las 32
  URLs remotas del `dist/index.html` responden 200 una a una, los 5 SVG locales
  están en `dist/img/logos/` y no queda ningún archivo huérfano en esa carpeta.
  Se descartaron los `-plain` de Devicon porque no son monocromos y varios
  salen en negro invisible sobre este fondo.
- **D11 — Iconos locales (2026-10-02):** Windows (skillicons.dev, licencia no
  verificada), Copilot (Wikimedia Commons, dominio público; se le añadió
  `fill="#ffba08"` porque venía negro), ChatGPT (Wikimedia Commons, dominio
  público; se cambió de `ChatGPT_logo.svg`, que era el icono de la app —un
  cuadrado verde azulado que desentonaba con la cinta— a `ChatGPT-Logo.svg`,
  el nudo pelado, y se le añadió `fill="#ffba08"`), AntiGravity y Canva
  (thesvg.org, MIT). Cada SVG lleva su fuente y
  licencia en un comentario interno. Canva no está en `cdn.simpleicons.org`
  aunque sí en el paquete npm: se usa el SVG local en vez de saltarse esa
  retirada.
- **D12 — Recorte del stack (2026-10-02):** por decisión del usuario se quitaron
  SQL, Word, Excel y "Programación por bloques" —este último sustituido por
  Scratch, que es la herramienta concreta que usa en robótica— y se añadieron
  Figma y Canva. Python ya estaba y se mantiene. La lista pasó de 38 a 37, sin
  huecos: todo lo que aparece tiene logo. Los SVG de Word y Excel se borraron
  por quedar sin uso.
- **D13 — Hero con carrusel y galería de credenciales (2026-10-02):** cambios de
  presentación hechos por el usuario y verificados antes de subirlos.
  - *Carrusel del hero*: tres fotos (`foto1.jpeg`, `foto2.jpeg`, `foto3.png`)
    que rotan cada 15 s, con `object-position` distinto por foto
    (`.photo--1/2/3`) para encuadrar cada una. Botón de pausa. Solo se activa
    si hay más de una foto y `prefers-reduced-motion` no está activo. La
    primera foto lleva `fetchpriority="high"` y `BaseLayout` la precarga.
    - **Actualizado 2026-10-03 (D19):** el botón de pausa se eliminó a
      petición del usuario y, con él, el avance automático. Ahora se
      renderizan las tres fotos pero **solo se ve la primera**, sin rotación.
      Las tres siguen en el HTML con sus `object-position` por si se
      reactiva.
  - *Galería de credenciales* en el bloque del SENA: dos "huecos" con icono
    SVG en línea que indican dónde irá cada foto
    (`public/img/diploma-tecnico.jpg` y `public/img/entrega-diploma.jpg`).
    Son marcadores, no imágenes: no generan 404. Rotan cada 5 s, con botón de
    pausa y flecha. Se añade el proyecto final del SENA, **Finovateh**.
  - *Línea de tiempo*: la línea de la trayectoria se rellena según el scroll
    mediante la variable CSS `--timeline-progress`, actualizada con
    `requestAnimationFrame` (no en cada evento de scroll).
  - El cartel "Disponible para trabajar" pasa a flotar sobre la foto, con
    entrada propia (`placard-enter`) en lugar de ir inclinado sobre el nombre.
  - **Pendiente**: `public/img/foto.jpg` (255 KB) quedó sin uso al pasar a
    `foto1.jpeg`. No se borra sin autorización del usuario, que es una
    fotografía original.
- **D14 — El chequeo de tipos estaba enmascarado en local (2026-10-02):**
  `astro check` falló en GitHub Actions en los cuatro primeros commits, desde
  `b07887e`, y por eso el sitio nunca se publicó. La causa real: `astro.config.mjs`
  usa `process.env` con `// @ts-check`, pero el proyecto **no declaraba
  `@types/node`**. En Windows el error no aparecía porque existe
  `C:\Users\User\node_modules\@types\node` (v24.0.10) **fuera del proyecto**, y
  TypeScript sube por las carpetas buscando `node_modules/@types`. En Ubuntu ese
  ancestro no existe, `process` queda sin tipar y el archivo falla.
  **Consecuencia: todos los «0 errores» locales previos eran falsos negativos.**
  Se declara `@types/node` como devDependency (lo que el proyecto usa de
  verdad) y se aísla el archivo culpable con una matriz de un `tsconfig` por
  archivo, porque `astro check` no acepta rutas para filtrar. Verificado: los
  13 archivos pasan en Ubuntu.
  **Lección para fases siguientes:** un build verde en esta máquina no prueba
  nada si depende de tipos heredados del entorno. La evidencia válida es CI.
- **D17 — "Sobre mí" se despliega hacia la derecha, no hacia abajo (2026-10-03):**
  el usuario pidió que, al abrir una pregunta, la respuesta apareciese **al
  lado** de esa pregunta y no debajo. Decisión suya entre tres opciones
  (lateral en dos columnas / entrada deslizada / estirado a ancho completo).
  Consecuencias técnicas, todas distintas de un acordeón normal:
  - `display: none` no transiciona, así que el estado **no puede vivir en
    `hidden`**. Se sustituye por `visibility`, que deja el panel fuera del
    tabulado y de los lectores de pantalla pero sí se puede animar. El atributo
    `hidden` permanece en el HTML para quien llegue sin JavaScript y lo quita
    el script al arrancar: es lo que hace `data-exp-css` en `main.js`.
  - El ancho se anima con `grid-template-columns: 0fr → 1.07fr`. Interpola
    porque ambas pistas son `<flex>`. **Sin esa transición el efecto no
    existe**: es el fallo que se corrigió tras las dos primeras ideation.
  - El alto se colapsa aparte, con su propio grid de una fila
    (`0fr → 1fr`) y un envoltorio intermedio, `.about-panel__inner`, que es
    quien lleva `overflow: hidden` y `min-height: 0`. Sin él el contenido
    seguiría marcando el alto y las seis filas quedarían altas siempre.
  - `:has()` hace falta para leer el estado desde el botón y no depender de
    una clase extra en el HTML.
  - Debajo de 700 px **no cabe de lado** y la respuesta vuelve a caer hacia
    abajo. El selector del estado abierto se repite dentro del `@media` a
    propósito: `.about-item:has(...)` tiene especificidad (0,2,0) y le ganaba
    a `.about-item` (0,1,0), así que el móvil heredaba las dos columnas.
- **D18 — El ancho del texto de "Sobre mí" se mide en `rem`, no en `ch` (2026-10-03):**
  el usuario pidió ensanchar el texto "hacia la derecha más 5 cm", luego lo
  corrigió a **3 cm**. El límite real no era solo el reparto de columnas:
  `.about-panel__text` tenía `max-width: 46ch`, que cortaba el texto aunque la
  columna creciese. Se quita ese tope —ahora manda la columna, que es lo que se
  anima— y la lista pasa de `74ch` a `54rem`.
  **Por qué `rem`:** `ch` depende del ancho del glifo `0` en la fuente
  cargada, así que el mismo `74ch` mide entre 590 y 710 px según el navegador y
  no es una medida comparable. `rem` es un número fijo y ajustable.
  Resultado: fila de 864 px, columna de respuesta de ~447 px y **~398 px de
  texto útil (≈ 51 caracteres por línea)**. El texto pasó de unos 7,5 cm de
  ancho a unos 10,5 cm: +3 cm, como se pidió.
  Mandos: `max-width` de `.about-list` (**1 cm = 2,36 rem**) y el reparto
  `1fr / 1.07fr` de `.about-item`.
- **D19 — Se quita el botón "Pausar fotos" del hero (2026-10-03):** petición
  del usuario. Modifica **D13**, que lo documentaba como parte del carrusel.
  - Se borra el `data-photo-toggle` de `Hero.astro`.
  - **Anula también el avance automático**, y esto es lo importante: el
    bloque del carrusel en `main.js` está guardado por
    `if (photoToggle && fotos.length > 1 && !reduceMotion)`. Sin el botón la
    condición es falsa y las tres fotos dejan de rotar. Se queda visible solo
    la primera.
  - **Por qué se acepta sin discutirlo:** quitar el botón **conservando** la
    rotación habría dejado contenido en movimiento sin forma de detenerlo
    (WCAG 2.2.2). Al caer también la rotación, no hay regresión de
    accesibilidad. No hace falta compensar con nada.
  - Las tres fotos siguen renderizadas con sus `object-position` por foto, así
    que reactivarlas es cosa de restaurar el botón.
  - Quedan sin uso el bloque del carrusel en `public/js/main.js` y las reglas
    `.photo-toggle` del CSS. Se dejan por cambio mínimo (§22), no por
    descuido; son unos 35 líneas.
  - **No se toca** el botón "Pausar" de la marquesina de logos
    (`Stack.astro`): ese sí es el mecanismo de WCAG 2.2.2 para el texto en
    movimiento y no es el que se pidió quitar.
- **D20 — El cartel "Disponible para trabajar" se afina (2026-10-03):** ajuste
  de posición y tamaño por indicación del usuario, en dos pasos.
  - **Posición:** estaba en `top: -2.5cm` y se movió tres veces —1 cm abajo,
    0,7 cm arriba, 0,4 cm abajo— hasta quedar en **`top: -1.8cm`**, 0,7 cm por
    debajo de la posición original. Se pudo hacer exacto porque ese bloque ya
    usa unidades `cm`.
  - **Tamaño:** 2 px menos en las cuatro medidas del cartel, para que se lea
    más discreto sin cambiar su peso visual — texto `13px → 11px`, punto
    `10px → 9px`, `gap` `12px → 10px` y `padding` `12px/17px → 10px/15px` (más
    el `0.25cm` que ya tenía). Bajar solo el texto dejaba el punto y el hueco
    desproporcionados.
  - Se añadió al índice de clases del bloque 5, que no lo listaba.
- **D21 — Tarjetas de proyecto ricas y "Proyectos destacados" (2026-10-03):**
  ampliación de alcance pedida por el usuario. Por mucho que la estructura
  soporte 5–8 proyectos, **solo hay 2 confirmados**, así que no se rellena el
  resto con invenciones (R1, R3).
  - **Cada tarjeta muestra:** imagen o captura, nombre, descripción, problema
    que resuelve, tecnologías, funcionalidades, participación propia, GitHub,
    demo y estado. Todos los campos son **opcionales**: el componente dibuja
    solo lo que hay, con el patrón `{proyecto.enlace && ...}` que ya usaba.
    Un dato que falta **no se inventa ni se disimula**, simplemente no sale.
  - **Los 4 proyectos de relleno se borran.** Eran inventados —
    "Sistema de inventario y ventas", "API REST de gestión académica",
    "Robot de seguimiento de línea" y "Este portafolio" — y sus enlaces
    apuntaban al **perfil** de GitHub, no a repositorios, lo que además
    incumplía el criterio de aceptación nº 3. P5 dice priorizar eliminar
    sobre inventivear.
  - **Los 2 reales que entran**, con **solo el título**: *Sistema Integral de
    Gestión Vehicular* y *FinovaTech*. Todo lo demás está vacío a la espera
    de datos. Se marcan con `destacado: true`.
  - **"Proyectos destacados"** va dentro de `#proyectos`, antes de la lista
    completa, para no añadir otra entrada al `nav` ni otro `id`. Se leen
    grandes, en dos columnas. Como solo hay 2, **la lista se queda en 2 y el
    tercer destacado sigue vacante** — no se rellena con el mejor de los
    demás.
  - **Imágenes:** hueco preparado en `public/img/proyectos/`. Si el campo
    `imagen` está vacío se dibuja un marco con las iniciales, que parece
    deliberado en vez de roto, para que se note cuál falta sin montar un
    adorno encima.
  - **Enlaces:** los botones GitHub y demo se renderizan solo con URL real.
    Ahora no hay ninguno, así que la tarjeta se queda sin botones. Nada de
    apuntar al perfil de GitHub: es el error que se estaba corrigiendo.
  - **Son DOS secciones, no una.** El usuario lo aclaró: "son 2 secciones
    distintas". `Destacados.astro` (`#destacados`) lleva los 3 mejores en
    tarjetas anchas y va **antes**; `Proyectos.astro` (`#proyectos`) lleva la
    lista completa en `.card-grid` y **no filtra**: los destacados también
    aparecen ahí. Que un proyecto esté en las dos es lo normal. Entrada de nav
    para cada una; el nav lleva `flex-wrap: wrap`, así que el sexto enlace
    envuelve en vez de desbordar.
  - **Faltan 5 proyectos** para llegar a los 8 de la lista completa. No se
    inventan: la estructura ya los aguanta y salen solos al añadirlos.
- **D15 — Puerta de calidad restaurada (2026-10-02):** mientras se buscaba la
  causa, `astro check` estaba en `continue-on-error: true` para no seguir
  bloqueando el despliegue. Confirmado el arreglo, **vuelve a ser bloqueante**
  (fase 5, criterio 1). El workflow `diagnose.yml` era temporal y se borró.
- **D16 — Ampliación de alcance: sección "Sobre mí" (2026-10-03):** el usuario
  aporta el guion de dos secciones y pide que se adapten a lo ya construido.
  - *Hero (P8):* se completa lo que faltaba, sin rediseñar. Nombre corto
    (`perfil.nombreCorto` = «Rafael Arlant») en el `<h1>` en vez del nombre
    completo; línea de tecnologías principales
    (`perfil.tecnologiasClave`) bajo el titular, con puntos separadores; y los
    dos botones que faltaban, **GitHub** y **Contacto**, junto a los que ya
    había (Ver proyectos, Descargar CV). El párrafo largo
    (`perfil.descripcion`) **sale del hero** y pasa a "Sobre mí", que es donde
    responde «por qué»; el hero queda en frases cortas. No se toca el carrusel
    de fotos ni el cartel de disponibilidad.
  - *Sobre mí (P9):* sección **nueva**, que es lo que rompe el "no incluye"
    de esta fase. Va entre `Stack` y `Trayectoria`. Responde en cinco
    preguntas —quién soy, qué estudio, qué me interesa, qué problemas resuelvo
    y qué busco—, más las etiquetas de intereses y la propuesta de valor como
    bloque destacado. El contenido sale de datos que ya existían
    (`perfil.descripcion`, `experiencia`, `competencias`, `proyectos`): no se
    inventa nada. Reutiliza `.section`, `.card`, `.tag-list` y `.reveal` de la
    sección 3 del CSS, así que solo añade un bloque nuevo de estilos.
  - **Consecuencia para el plan:** el "no incluye" de esta fase (rediseño,
    nuevas secciones, cambios de paleta) se acota: **se acepta P8 y P9; siguen
    fuera el rediseño y los cambios de paleta.** Se anota aquí y no se borra el
    texto original del alcance, para que quede constancia de la ampliación.
- **D6 — CSS:** un único archivo, `src/styles/global.css`. Los `.astro` no
  llevan estilos dentro.
- **D7 — Imagen pendiente:** `public/cv.pdf` es un archivo binario. La IA lo
  deja preparado (enlace y texto ya existentes); el archivo lo aporta el
  usuario. No se inventa un PDF.
- **D8 — Divergencia con la Fase 1:** D5 de la fase 1 declara el sitio
  «bilingüe (es/en)» y la fase 1 incluye en alcance «páginas de contenido».
  La implementación actual es **una sola página, solo español**. Decisión
  pendiente del usuario: (a) mantener así y corregir la fase 1, o
  (b) ampliar a bilingüe/páginas, lo que abre fases 3, 4 y 5 de nuevo.
  **Bloqueante para cualquier ampliación de alcance.**

### Alcance

#### Incluye (P1–P7)

- **P1** `contacto[0].correo` → correo real (hoy `correo@ejemplo.com`). **Cerrado.**
- **P2** `contacto[2]` → URL real de LinkedIn (hoy perfil vacío). **Cerrado.**
- **P3** `experiencia` → fechas reales; el técnico sí es SENA, la universidad
  sigue como `Institución` hasta que se confirme su nombre. **Cerrado:** SENA
  2025 — 2026, Universidad Central 2027 — Actualidad, Fundación Biosbot
  Robótica (equipos Team Biosbot Colombia) 2020 — Actualidad.
- **P4** `proyectos[].enlace.url` → URL de cada repositorio, no del perfil.
  **Pospuesto por decisión del usuario (2026-10-02):** se deja el enlace al
  perfil `github.com/JRafael1012` hasta que existan repositorios públicos.
  Pendiente para Fase 6 o para cuando haya repos.
  **Replanteado en D21 (2026-10-03):** el campo `enlace` desaparece y se
  separan `repositorio` y `demo`. Los botones ya no enlazan al perfil, así que
  la tarjeta **se queda sin botones** hasta que existan URLs reales. Sigue
   pendiente que el usuario proporcione los repositorios, pero ya no se muestra un
  engañoso. Los 4 proyectos inventados que apuntaban al perfil se borraron.
- **P5** `stack` → quitar tecnologías que no se manejen. Un logo es una
  afirmación. Comprobar cada slug en `https://cdn.simpleicons.org/<slug>/ffba08`.
  **Cerrado 2026-10-02:** el usuario confirma el listado de tecnologías y
  decide añadirlas todas. La cinta pasó de 25 a 38 entradas. Todos los `slug`
  se verificaron con HEAD uno a uno (26 con logo, 12 sin logo porque Simple
  Icons no los tiene: Java, SQL, Programación por bloques, VS Code, Word,
  Excel, Bash, PowerShell, ChatGPT, Windows, Copilot (Windows) y AntiGravity).
  Añadidos: TypeScript, Java, C, PHP, Node.js, Bash, PowerShell, ChatGPT,
  Android Studio, Linux, Kali Linux, Windows y Copilot (Windows). A `OpenCode`
  se le puso su logo tras verificarlo.
  **Reabierto y cerrado 2026-10-02 (ver D10, D11 y D12):** los huecos se
  cubrieron con Devicon y con SVG locales, de modo que las 37 tecnologías que
  quedaron tienen logo. El usuario quitó SQL, Word, Excel y Programación por
  bloques —este último sustituido por Scratch— y pidió Figma y Canva. Estado
  final: 37 entradas, 37 con logo, 0 huecos.
- **P6** `public/cv.pdf` → lo aporta el usuario (ver D7). **Abierto por
  decisión del usuario (2026-10-02):** se deja el enlace tal cual y se acepta
  el 404 hasta que entregue el PDF. `perfil.cv.href = 'cv.pdf'` apunta hoy a un
  archivo inexistente; revisar antes de publicar o antes de cerrar la Fase 7.
- **P7** Verificación de enlaces externos y del favicon. **Parcial 2026-10-02:**
  `github.com/JRafael1012` 200; `favicon.png`, `favicon-32.png` y
  `apple-touch-icon.png` presentes en `dist/`. LinkedIn devuelve 999 (bloqueo
  anti-bot a peticiones sin sesión), lo que no prueba que el enlace esté roto.

#### No incluye

- Backend, CMS, autenticación, analítica, blog, i18n (ver D8).
- Rediseño, nuevas secciones o cambios de paleta.
  **Excepción registrada en D16 (2026-10-03):** se acepta la sección "Sobre mí"
  y la ampliación del hero (P8, P9). El rediseño y los cambios de paleta
  siguen fuera de alcance.

### Criterios de aceptación

1. `npm run build` (que ejecuta `astro check && astro build`) termina con exit
   code 0, sin errores de tipos.
2. `dist/index.html` existe y contiene el correo real.
3. Ningún `correo@ejemplo.com`, ningún `AÑO — AÑO` sin confirmar y ningún
   enlace a perfil genérico en lugar de repositorio.
4. Cada slug de `stack` responde 200 en el CDN, o la tecnología se muestra sin
   logo.
5. Consola del navegador sin errores ni 404 de recursos.
6. `git status` limpio tras el commit.

### Riesgos

- **R1 — Datos que solo tiene el usuario.** Si falta un dato, se deja el
  marcador y se lista como pendiente. No se inventa información.
- **R2 — OneDrive.** La carpeta está bajo sincronización; puede generar
  `desktop.ini` o bloquear Git. Vigilar antes de commits grandes.
- **R3 — Afirmar sin tener.** Publicar una tecnología o proyecto no real
  aumenta el riesgo en una entrevista. P5 prioriza eliminar sobre inventivear.

### Evidencia (2026-10-03) — D21, secciones de proyectos

- **Build:** `npm run build` con **0 errores, 0 warnings y 0 hints**.
- **HTML generado** (`dist/index.html`):
  - Las dos secciones existen y van en orden: `#destacados` y después
    `#proyectos`, cada una con un único `id`.
  - 3 tarjetas anchas (`project-card--wide`) en destacados; 3 más en la
    rejilla de proyectos; 6 en total, porque la lista completa no filtra.
  - `nav` con las 6 entradas, incluida `Destacados` → `#destacados`.
  - **0 botones** de proyecto: sin `demo` ni `repositorio` no se dibuja
    ninguno, que es lo correcto.
  - **0 enlaces** a `https://github.com/JRafael1012` como repositorio. Los 2 que
    quedan son los del perfil en Header y Contacto, que sí es a lo que deben
    apuntar.
  - Sin clases huérfanas: 0 apariciones de `featured` (se renombraron a
    `destacados__grid`) y 0 de `projects__resto`.
- **CSS compilado** (`dist/_astro/index.BH-BXDCt.css`, 40.6 KB): presentes
  `.destacados__grid`, `.project-card--wide`, `.project-card__media`,
  `.project-card__slot`, `.project-card__btn`, `.project-card__btn-arrow` y las
  44 reglas de `@media (hover: hover)`. Intacto lo demás tras restaurar un
  corte accidental del archivo: `.site-footer` (25 reglas), `.contact-list`,
  `.contact-item`, `@keyframes about-slide-right`, `@keyframes about-wipe` y
  `grid-template-columns .5s`. `about-fade-up` sigue en 0, que es lo correcto.

### Evidencia (2026-10-03) — hueco reservado y prefijo de `imagen`

- El hueco de la captura **se queda reservado** por decisión del usuario: los
  proyectos se llenarán más adelante, así que no se sustituye el espacio por
  nada. Sin `imagen` sale el marco con la línea editorial; con `imagen` sale el
  `<img>`. Las dos ramas están en el HTML: 6 ranuras vacías y 0 `<img>`.
- **Bug encontrado y corregido.** `withBase()` (`src/paths.ts`) solo antepone el
  `base` a rutas que empiezan por `/`, así que `imagen: 'img/proyectos/x.webp'`
  se emitía como `src="img/..."`. En GitHub Pages eso resuelve a
  `usuario.github.io/img/...`, **sin** el `/PorfolioJR`: un 404. Justo el fallo
  que el README advertía para los logos.
  - **Cómo se detectó:** se puso `imagen: 'img/logo.png'` a propósito en un
    proyecto, se compiló y se leyó el HTML: `src="img/logo.png"`, sin prefijo.
  - **Arreglo:** `ProyectoCard.astro` normaliza con `imagenSrc`, añadiendo la
    barra inicial si falta, y usa esa variable tanto en el `<img>` como en la
    condición del marco vacío. Se aceptan las dos formas.
  - **Comprobado:** tras el arreglo el HTML emite
    `src="/PorfolioJR/img/logo.png"`. El dato de prueba se revirtió después y
    el build final vuelve a 6 huecos y 0 imágenes.
  - La nota sobre no pasar anclas ni URLs externas por `withBase()` sigue
    vigente; aquí el problema era una ruta interna sin barra inicial.

### Decisión D22 (2026-10-03) — contacto con los botones del header

El usuario pide explícitamente "usar los mismos botones del header de los contactos".
No se diseña un botón nuevo:

- `.nav-cv` (borde `#647087`, `padding: 17px 20px`, flecha con `.btn__arrow`)
  deja de ser exclusivo del header y lo reutiliza `Contacto.astro`. Cada medio
  de contacto es un `<a class="nav-cv contact-btn">` con la etiqueta mono
  encima y la flecha `↗` a la derecha.
- `.contact-btn` **no redefine la apariencia**, solo lo distribuye dentro de la
  fila: `justify-content: space-between` para separar valor y flecha, y un
  `min-width` para que las tres filas queden alineadas.
- Se añade `.nav-cv:hover`, que **no existía**: el botón de "Hoja de vida" era
  un enlace sin ninguna respuesta al pasar el ratón. Se hace con
  `translateY(-2px)` y borde `accent-2`, igual que `.btn:hover`, y lo
  declaran los dos sitios para que sigan siendo el mismo botón. No altera el
  estado en reposo, así que el header no cambia de aspecto.
- `overflow-wrap: anywhere` en el valor: el correo y la URL de LinkedIn son
  largos y en móvil se salían de la pantalla.
- La flecha solo en externos, igual que ya hace el componente con
  `target`/`rel`. El correo es `mailto:` y no abre pestaña.

### Decisión D23 (2026-10-03) — rediseño de CONTACTO · sustituye a D22

El usuario da una especificación cerrada para **rehacer solo la sección de
contacto**. D22 queda **superado**: los contactos ya no son botones `.nav-cv`
sino tarjetas. `.nav-cv` sigue siendo solo del header, y su `hover` se queda,
porque es una mejora independiente de D22.

- **Alcance estricto.** Solo `Contacto.astro`, el bloque 10 de CSS y los datos
  de `contacto`. No se toca ninguna otra sección, ni la paleta, ni los bloques
  1-9 ni el 11. `.nav-cv` del header no se modifica.
- **Iconos: `lucide-astro`, dependencia real.** Se instala en vez de usar el
  CDN de Simple Icons que usa la marquesina, porque el usuario pidió librería y
  no emojis. Menos peso en red y sin peticiones a terceros en runtime.
- **Datos.** Cada contacto lleva `icono` (nombre de Lucide), `valor` (lo que se
  ve) y `descripcion`. LinkedIn deja de enseñar la URL cruda y muestra
  "Rafael Arlant"; GitHub pasa a `@JRafael1012`. Todo es texto del usuario.
- **Layout de dos columnas a partir de 1050 px:** columna de presentación
  (eyebrow, "Hablemos", subtítulo con CTA, tiempo de respuesta) y columna de
  las tres tarjetas horizontales. Se acaba el hueco vacío de la versión de dos
  columnas de etiqueta/valor. En móvil se apila a una.
- **Tarjeta = un solo `<a>`.** Icono, plataforma, valor, descripción y flecha
  viven dentro del enlace: una sola parada de tabulación y un objetivo táctil
  grande, en vez de un enlace de texto suelto.
- **Microinteracciones de 220 ms:** la tarjeta se desplaza 2 px y el borde pasa
  a `accent-2`, la flecha avanza 3 px y el icono cambia a `accent`. Todo dentro
  de `@media (hover: hover)` para que en táctil no quede estado pegado.
- **CTA:** "¿Tienes un proyecto, una oportunidad o simplemente quieres hablar
  de tecnología?" con "Envíame un mensaje →" en `mailto:` a la misma dirección.
- **Se añade** "Normalmente respondo en 24-48 horas", que el usuario dejó como
  opcional y aquí aporta: da una expectativa concreta en la columna de texto.

### Evidencia (2026-10-03) — D22, botones de contacto · **superada por D23 y D24**

> Se conserva como historial. Describe una versión que ya no está en el código:
> hoy no existen `.contact-btn`, `.contact-item` ni `.contact-label`. Lo que
> sobrevive de D22 es el `.nav-cv:hover` del header, que sigue en el bloque 4.

- **Build:** `npm run build` con **0 errores, 0 warnings y 0 hints**.
- **HTML generado** (`dist/index.html`): los 3 medios de contacto salen como
  `<a class="nav-cv contact-btn">`, o sea **el mismo botón del header**:
  - `<a class="nav-cv contact-btn" href="mailto:rafaelarlant1012@gmail.com">`
    sin `target`, que es lo correcto para `mailto:`.
  - GitHub y LinkedIn con `target="_blank"` y `rel="noopener noreferrer"`.
  - Cada uno con su `<span class="btn__arrow" aria-hidden="true">`. Las 6
    flechas del documento son U+2197 (`↗`): la del header, las 3 de contacto y
    las del hero.
- **CSS compilado** (`dist/_astro/index.CDQozixb.css`): presentes `.nav-cv:hover`
  (1), `.contact-btn` (2: la regla base y la de `max-width: 700px`) y
  `.contact-btn__value` (1). Sin tocar el resto: `.site-footer` sigue con sus 25
  reglas y `.project-card__slot` con 4, así que el bloque 11 y el 9 siguen
  enteros.
- **Dev server:** HTTP 200, con 4 elementos `class="nav-cv"`: 1 del header y 3
  de contacto.

### Decisión D24 (2026-10-03) — CONTACTO: marco, WhatsApp y fondo del Hero

El usuario amplía D23 con cuatro cosas: WhatsApp, que las variables quedaran
centralizadas, que el CTA llevara icono y dos textos, y que **el fondo fuera el
mismo que el del Hero**. Sigue sin salir de la sección de contacto.

- **El fondo es el del Hero, copiado.** `.contact` replica la retícula de 40 px
  (`--grid-line`) y los dos círculos que se asoman por abajo: el exterior con
  `color-mix(#f4f6fb 3.5%)` y el interior con `--ring`, igual que `.hero::before`
  y `.hero::after`. El contenido va por encima con `z-index`, como
  `.hero-inner`. Con esto la sección cierra el sitio con la misma textura en
  lugar de parecer un añadido.
- **El marco es la técnica de `.photo-frame`:** filete de 1 px en `--accent-2`
  y hueco asimétrico solo arriba y a la izquierda, como un corchete. De ahí el
  "cuadro" que pidió el usuario. En móvil el marco se apaga a una línea
  superior para no comerse ancho.
- **El indicador de disponibilidad es el `.hero-placard`:** mismo borde ámbar al
  38 %, fondo al 7 % y punto pulsante de 2.4 s. No se inventa un patrón nuevo.
- **WhatsApp entra como cuarta tarjeta.** Lucide retiró los iconos de marca, así
  que el glifo es el que el Hero ya usa en `.hero-social__icon--whatsapp`,
  reutilizado tal cual: se sigue usando el sistema de iconos del sitio.
- **El número no se inventa.** `datosContacto.whatsappNumber` toma el valor que
  ya estaba hardcodeado en las redes del Hero. Si falta, la tarjeta deja de ser
  enlace y se marca `aria-disabled`, para no prometer un `wa.me/` vacío.
- **Datos centralizados en `datosContacto`:** `email`, `githubUrl`,
  `githubUsername`, `linkedinUrl`, `whatsappNumber` y `whatsappMessage`. Las
  tarjetas, el `mailto:` del CTA y el enlace de WhatsApp se derivan de ahí, así
  que no queda ninguna URL repetida dentro de la sección. El mensaje de WhatsApp
  se codifica con `encodeURIComponent`, nunca a mano.
- **Radio de 4 px en las tarjetas.** Es lo único que se aleja del resto del
  sitio, que va de esquinas vivas. Queda aislado en `--contact-radius` para
  poder volver a 0 en un cambio.
- **Degradado solo con tokens del sitio:** de `--accent` a `--accent-2`, que ya
  son el amarillo y el naranja de la paleta. No entra ningún color nuevo.
- **"Hablemos" sube a `clamp(2.6rem, 5.4vw, 4.4rem)`,** por encima del
  `clamp(1.9rem, 4.5vw, 3rem)` de las demás secciones, para que la jerarquía sea
  clara sin comerse la columna.
- **Microinteracciones de 250 ms,** dentro del rango pedido, con glow muy tenue
  (`6px 22px -12px`), desplazamiento de 3 px y flecha 4 px.
- **`aria-labelledby="contact-title"`** apunta al H2. No se añade ningún H1: el
  único sigue estando en el Hero.

### Evidencia (2026-10-03) — D24

- **Build:** `npm run build` con **0 errores, 0 warnings y 0 hints**.
- **Rutas de todos los enlaces**, comprobadas en `dist/index.html`:
  - `mailto:rafaelarlant1012@gmail.com` — tarjeta de correo y CTA, sin `target`.
  - `https://github.com/JRafael1012` — con `target="_blank"` y
    `rel="noopener noreferrer"`.
  - `https://www.linkedin.com/in/rafael-arlant-cortes-b735412b3/` — igual.
  - `https://wa.me/573238176273?text=Hola%20Rafael%2C%20vi%20tu%20portafolio%20y%20me%20gustar%C3%ADa%20hablar%20contigo%20sobre%20un%20proyecto.`
    — el mensaje llega codificado: `í` es `%C3%AD` y la coma `%2C`.
- **WhatsApp mostrado como `+57 323 817 6273`,** que es como se lee, distinto de
  como se usa en la URL.
- **Iconos:** 9 SVG en la sección, todos dibujados con `stroke="currentColor"`
  y `stroke-width="1.7"`, el mismo trazo que `.hero-social__icon`. 3 de Lucide
  (`Mail`, `Github`, `Linkedin`), 4 flechas `ArrowRight` y el glifo de WhatsApp.
  Cero emojis.
- **Semántica:** 1 solo `<h1>` en toda la página, 8 `<h2>` legítimos, un
  `<h2 id="contact-title">` al que apunta el `aria-labelledby`, 0 `<div>`
  haciendo de botón y todas las tarjetas como `<a>` reales.
- **CSS compilado** (`dist/_astro/index.BbNP7Fsg.css`): presentes `.contact`,
  `.contact:before`, `.contact:after`, `.contact-frame`, `.contact-title`,
  `.contact-placard`, `.contact-motto`, `.contact-card--hero`,
  `.contact-card__glyph`, `.contact-cta` y `contact-pulse`. MinCSS reescribe
  `::before` a `:before`, por eso se buscan con un solo dos puntos.
- **Breakpoints:** la sección responde en `>=1050px`, `<=700px` y `<=420px`, y
  sus estados de hover y de `prefers-reduced-motion` están dentro de
  `@media (hover: hover)` y `@media (prefers-reduced-motion: reduce)`.
- **Nada ajeno tocado:** `.nav-cv` sigue apareciendo 1 vez en el HTML, solo el
  del header, y los bloques 1 a 11 del CSS siguen en su sitio.
- **Etiquetas de plataforma reducidas** tras petición del usuario: la etiqueta
  `.contact-card__platform` pasó de `11px` / `0.9px` de `letter-spacing` a
  **`10px` / `0.4px`**, para que «CORREO», «GITHUB», «LINKEDIN» y «WHATSAPP»
  entren más estrechas. Se volvió a compilar después del cambio: **0 errores,
  0 warnings, 0 hints**. No se tocó ninguna otra propiedad de la tarjeta.
- **Dependencia:** `lucide-astro@0.556.0` en `dependencies`. Las 2
  vulnerabilidades altas que reporta `npm audit` son de
  `astro@7.3.5 → http-cache-semantics@4.2.0`, **preexistentes y ajenas a esta
  dependencia**. El "fix" que ofrece npm es bajar a `astro@2.10.9`, un cambio
  rompiente, así que no se aplica.

### Evidencia (2026-10-03) — P8 y P9

- **Build:** `npm run build` (= `astro check && astro build`) termina con
  **0 errores, 0 warnings y 0 hints en 15 archivos**. Los 13 del 2026-10-02
  más `SobreMi.astro`.
- **HTML generado** (`dist/index.html`), comprobado con búsqueda literal:
  `<h1 class="hero-name">Rafael Arlant</h1>` una vez; la línea de tecnologías
  con los 8 términos y sus separadores `·`; los cuatro botones del hero
  (proyectos, CV, GitHub, contacto) —**superado por D25**, que los deja en
  dos—; `id="sobre-mi"`; los seis botones con
  `data-exp-toggle`, el primero con `data-exp-open`; los seis paneles
  `panel-sobre-mi-0…5` con `hidden` en el HTML; y el enlace «Sobre mí» en
  `nav`.
- **CSS compilado** (`dist/_astro/index.Cb8KBCSn.css`, 37.7 KB): presentes
  `about-wipe` y `about-slide-right`, `inset(0 100% 0 0)`, la transición
  `grid-template-columns .5s` de `.about-item`, `1.05fr`,
  `.about-panel .tag:nth-child(8)` y el bloque `prefers-reduced-motion` que las
  desactiva. Sin restos de `about-fade-up`, que se sustituyó al pasar el
  despliegue a lateral.
- **Servidor de desarrollo:** `npm run dev` escucha en el puerto 4321
  (verificado con `Get-NetTCPConnection`) y responde **HTTP 200** en
  `http://localhost:4321/PorfolioJR`. Ojo: la ruta **no** lleva barra final;
  con `/` devuelve 404 porque `trailingSlash` está en `never`.
- **Sin JS nuevo para la sección:** `main.js` gana el trato de `data-exp-css`,
  que quita el `hidden` del panel una vez arrancado y deja que el estado lo
  lea el CSS por `aria-expanded`. Sin eso no había transición posible: con
  `display: none` no hay nada que animar. El `hidden` sigue en el HTML para
  quien llegue sin JavaScript. El acordeón se apoya en el bloque
  `[data-exp-toggle]` que ya existía, igual que "Ver experiencia".
- **Despliegue lateral — el fallo que lo rompía:** la primera versión animaba
  el alto (`grid-template-rows: 0fr → 1fr`) pero **no el ancho**, porque a
  `.about-item` le faltaba `transition: grid-template-columns`. La columna
  saltaba de `0fr` a `1.05fr` de golpe y por eso la respuesta aparecía entera
  de una vez en lugar de crecer hacia la derecha de la pregunta. Corregido:
  ahora `grid-template-columns` sí interpola, porque ambas pistas son
  `<flex>`. El texto y las etiquetas entran desde la derecha, el mismo
  sentido en que crece la caja.
- **Dos selectores que también estaban mal:**
  - El móvil heredaba las dos columnas, porque
    `.about-item:has(.about-toggle[aria-expanded='true'])` tiene más
    especificidad (0,2,0) que `.about-item` (0,1,0) dentro del `@media`.
    Repetido el selector del estado abierto en el bloque de 700 px.
  - `prefers-reduced-motion` nombraba `about-fade-up`, un keyframe que ya no
    existe, y se olvidaba de `.about-panel__text`.
- **Orden verificado en el HTML:** 01 ¿Quién soy? · 02 ¿Qué problemas me
  gusta resolver? · 03 ¿Qué estudio? · 04 ¿Qué me interesa? · 05 ¿Qué quiero
  construir? · 06 ¿Qué estoy buscando?
- **Ancho del texto, ajustado a 3 cm (ver D18):** el tope que de verdad
  limitaba el texto era `max-width: 46ch` en `.about-panel__text`, no el
  reparto de columnas. Quitado. `.about-list` pasa de `74ch` a `54rem` y el
  reparto de `1.05fr` a `1.07fr`. De ~7,5 cm de texto a ~10,5 cm.
- **Cartel "Disponible para trabajar" (Hero):** `.hero-placard` estaba en
  `top: -2.5cm` y se ha movido tres veces por indicación del usuario: 1 cm
  abajo, 0,7 cm arriba y 0,4 cm abajo. Queda en **`top: -1.8cm`**, 0,7 cm por
  debajo de la posición original. Aprovechado que ese bloque ya usa unidades
  `cm`, que es lo que hace el ajuste exacto. El cartel también se añadió al
  índice de clases del bloque 5, que no lo listaba.
- **Quitado el botón "Pausar fotos" del hero (petición del usuario, 2026-10-03):**
  borra el `data-photo-toggle` de `Hero.astro`, lo que **anula también el
  avance automático**: el bloque del carrusel en `main.js` está guardado por
  `if (photoToggle && ...)`, así que sin botón las tres fotos dejan de rotar
  solas y se queda solo la primera (`photo--1 is-active`). Ese efecto
  secundario evita el problema de accesibilidad que sí habría creado quitar
  el botón **sin** stopping: contenido en movimiento sin forma de detenerlo
  (WCAG 2.2.2). Verificado: 0 apariciones de `data-photo-toggle` y de
  "Pausar fotos" en el HTML, 3 imágenes y 1 `is-active`.
  - **Consecuencia a decidir:** quedan sin uso el bloque del carrusel en
    `public/js/main.js` y las reglas `.photo-toggle` del CSS. Se han dejado
    en su sitio por cambio mínimo. Si se confirman, se pueden borrar; si
    algún día vuelve el carrusel, siguen ahí.
  - Esto **cambia D13**, que documentaba "tres fotos que rotan cada 15 s…
    Botón de pausa". Actualizado abajo.
  - El botón "Pausar" de la marquesina de logos (`Stack.astro`) **no se
    toca**: ese sí es el mecanismo de WCAG 2.2.2 para el texto en
    movimiento, y no es el que pidió quitar.
- **Verificaciones de esta ampliación (2026-10-03, todas en verde):**
  - `npm run build` → **0 errores, 0 warnings, 0 hints** en 15 archivos.
  - CSS compilado: `grid-template-columns .5s`, `about-slide-right` ×3,
    `about-wipe`, `1.07fr`, `max-width:54rem`, `top:-1.8cm`.
    **Cero restos** de `about-fade-up`, `46ch`, `1.25fr`, `64rem` o `-2.5cm`.
  - `dist/index.html`: 6 `<li class="about-item">`, 6 `class="about-toggle"`,
    6 `class="about-panel"`, 6 `class="about-panel__inner"`, 1 `data-exp-open`
    y los 6 paneles con `hidden` en el HTML.
  - `http://localhost:4321/PorfolioJR` → **HTTP 200**.
  - Nota: los recuentos sobre el HTML del servidor de desarrollo salen
    inflados porque inyecta el CSS en la página. Hay que contar los atributos,
    no las cadenas de clase sueltas.
- **Un fallo de verificación que casi se cuela (2026-10-03):** al bajar el
  cartel a 11 px se editó la **primera** aparición de `font-size: 13px` del
  archivo, que era la de `.tag` —las etiquetas de todo el sitio—, no la de
  `.hero-placard-text`. El build salía verde y el `.tag` compilado confirmaba
  `13px` a simple vista, así que el error era invisible si no se miraba la
  regla concreta. Detectado al comprobar que el cartel seguía en 13 px en el
  bundle; revertido y aplicado en su sitio. **Lección, la misma de D14:** un
  build verde no dice que el cambio cayera donde debía. Al ajustar un valor
  que se repite en varios sitios hay que comprobar la regla exacta del CSS
  compilado, no el número en general. Aquí `font-size: 11px` salía 11 veces
  en el bundle, igual que si hubiera ido bien.
- **Pendiente de revisión visual:** el despliegue lateral, la cascada de las
  etiquetas y el comportamiento en móvil están comprobados en el código
  compilado, **no en un navegador**. Eso corresponde a la Fase 6, y es el
  motivo de que el usuario pidiera Ctrl+F5: sin recargar, se está viendo el
  CSS cacheado de la versión anterior.

### Decisión D25 (2026-10-05) — botones del header y del hero

El usuario pide quitar dos botones del hero y mejorar el diseño de los que
quedan, y hacer lo mismo en el header.

- **El hero pasa de cuatro botones a dos.** Se eliminan **GitHub** y **Contacto**.
  Los dos caminos siguen disponibles, así que no se pierde nada: GitHub está en
  la sección Contacto y en los botones redes bajo la foto; Contacto es una
  sección entera, `#contacto`, enlazada desde el nav. Con cuatro botones el hero
  competía consigo mismo y con dos la llamada principal pesa.
- **Se elimina el `const github` de `Hero.astro`.** Ya no se usa: el único
  `contacto.find(... 'GitHub')` que quedaba era el del botón retirado.
- **Barrido de relleno en `.btn` (secundario).** Un `::before` con
  `transform: scaleX(0)` → `scaleX(1)` y `transform-origin: left`, montado con
  `isolation: isolate` y `z-index: -1` para que no tape el texto. Barre en
  `--accent-2`.
- **El primario no barre: sube de color.** `.btn--primary:hover` pasa a
  `--accent-2` y gana `box-shadow: 0 8px 24px -10px var(--accent-2)`. Ya está
  lleno, así que barrerse no añadiría nada y le quitaría el ámbar de marca.
- **`.btn__label` separa el texto de la flecha.** Antes la flecha era un hermano
  suelto y desplazarla empujaba el texto; con el envoltorio la flecha se mueve
  4 px y el botón no cambia de ancho ni de alto.
- **Los hovers con barrido van dentro de `@media (hover: hover)`.** En táctil no
  hay hover real y el estado se quedaría pegado después de tocar, que es el
  mismo criterio que ya se usaba en `.project-card__btn`.
- **Los enlaces del nav llevan subrayado creciente.** `::after` con `scaleX`, en
  `--accent`, de 2 px, anclado con `position: relative` + `inset: auto 0 0` para
  que no desplace el texto.
- **`.nav-links a:not(.nav-cv)`.** El filtro es obligatorio, no cosmético:
  `.nav-cv` también es un `<a>` dentro de `.nav-links`. Sin `:not()` heredaría el
  subrayado y el `padding-block`, y este último le **ganaría por
  especificidad** al `padding` de `.nav-cv`, dejándole el botón a 6 px de alto.
  La regla de los 11 px en el corte de 700 px repite el mismo `:not()` por la
  misma razón: si no, la regla base, más específica, la ganaría y el texto del
  nav no bajaría de tamaño en móvil.
- **`.nav-cv` barre en `--accent` y pone el texto en `--ink-black`.** Mismo
  lenguaje que `.btn`, pero el botón del header es más pequeño y ahí el ámbar se
  lee mejor que el rojo como relleno.
- **La flecha de `.nav-cv` cambia de color en el hover.** `.btn__arrow` tiene
  color propio, así que el `color` del enlace no le llega: sin su propia regla
  se quedaría roja sobre el relleno ámbar.
- **`.hero-buttons` se limita a `max-width: 420px`** y sus hijos a
  `flex: 1 1 200px`, para que con dos botones ocupen una sola fila limpia en vez
  de quedar apretados o desiguales.
- **`.contact-cta__btn` hereda el hover nuevo** sin tocar su bloque: reutiliza
  `.btn--primary`, así que el CTA de Contacto cambia de ámbar a `--accent-2` al
  pasar por encima. Es coherente con el resto y no requería ninguna regla suya.
- **GitHub vuelve a estar en el hero, pero en la fila circular, no en los
  botones de texto.** El usuario lo pidió así tras quitarlo: los circulares de
  bajo la foto quedan **sin tocar** —no se cambia ni uno de los que ya estaban— y
  GitHub entra como sexto. El orden es WhatsApp, Instagram, LinkedIn, **GitHub**,
  Discord, Gmail: se coloca junto a LinkedIn, que es donde se agrupan las redes
  profesionales, y Gmail sigue al final por ser el contacto directo.
- **La URL sale de `contacto`, no se escribe otra vez.** GitHub se resuelve con
  `contacto.find(... 'GitHub')` igual que LinkedIn y Correo, así que
  `datosContacto.githubUrl` sigue siendo el único sitio donde se edita.
- **Icono propio `.hero-social__icon--github`.** `.hero-social__icon` es de
  trazo por defecto (`fill: none; stroke: currentColor`), y la marca de GitHub
  solo funciona rellena. El modificador copia el patrón que ya tenían
  `--linkedin` y `--discord`: `fill: currentColor; stroke: none`.
- **No hizo falta tocar el CSS de la fila.** `.hero-socials` va con
  `flex-wrap: nowrap` y botones de ancho fijo, así que la anchura la fija la
  suma: 6 × 2,7 rem + 5 × 0,7 rem = **315 px** en escritorio y 6 × 2,45 rem +
  5 × 0,55 rem = **279 px** en móvil. La columna de la foto más estrecha del
  diseño —justo por encima del corte de 1050 px— deja unos **425 px**, de modo
  que ni con seis hay desbordamiento.

### Evidencia (2026-10-05) — D25

- **Build:** `npm run build` con **0 errores, 0 warnings y 0 hints**.
- **`dist/index.html`:** `hero-buttons` contiene exactamente 2 `<a>`, con 2
  `btn__label` y 2 `btn__arrow`. Los `>GitHub<` y `>Contacto<` que quedan
  fuera del hero están en el nav y en la sección Contacto.
- **`hero-socials` en el HTML generado:** 6 `<a class="hero-social">` y 6
  `<svg class="hero-social__icon">`, en el orden WhatsApp, Instagram, LinkedIn,
  GitHub, Discord, Gmail. `href` comprobados uno a uno: `wa.me/573238176273`,
  `instagram.com/rafaelarlant1012/`,
  `linkedin.com/in/rafael-arlant-cortes-b735412b3/`,
  `github.com/JRafael1012`, `discord.com/users/724412152214978644` y
  `mailto:rafaelarlant1012@gmail.com`. **5** con
  `target="_blank" rel="noopener noreferrer"` y 1 `mailto:` sin ellos, que es lo
  correcto.
- **CSS compilado** (`dist/_astro/index.CQR963lb.css`, 48.1 KB): 5 reglas
  `.nav-links a:not(.nav-cv)`, 3 `.nav-cv:hover`, 2 `.btn--primary:hover`,
  **0** reglas `.nav-links a` sueltas, y `hero-social__icon--github` presente
  con `flex-wrap: nowrap` intacto en `.hero-socials`.
- **Los circulares que ya existían no se han tocado.** El diff no toca
  `.hero-social`, `.hero-socials` ni `.hero-social__mark`; solo se añaden el
  sexto botón y su modificador de icono.
- **Pendiente de revisión visual:** el barrido, el subrayado del nav y el
  resultado en móvil están comprobados en el código compilado, **no en un
  navegador**. Eso corresponde a la Fase 6.

### Decisión D26 (2026-10-05) — jerarquía visual de la sección Contacto

**Problema observado en el código (no requiere navegador):** las cuatro tarjetas
de `.contact-list` eran visualmente equivalentes en reposo. La de Correo —que
es la vía principal, la que la gente viene a copiar— solo se distinguía por el
color del borde a `color-mix(--accent 52%)`, un cambio que al 52% de opacidad no
se lee hasta pasar por encima. En reposo, la tarjeta principal y las tres
secundarias parecían la misma.

- **D26.1 — La tarjeta de Correo gana jerarquía en reposo, no solo en hover.**
  Gana un velo ámbar de fondo (`--accent` 9% → `--accent-2` 5%, degradado a
  100°), filete de acento y el valor de `1.05rem` a `1.18rem`. El salto de un
  cuerpo marca la jerarquía sin tocar la altura de la fila ni el tamaño de los
  iconos, así que las cuatro tarjetas siguen alineando.
- **D26.2 — Filete de acento que crece, en vez de relleno completo.** Se
  descartó portar aquí el barrido de `.btn` de D25: la tarjeta tiene tres
  líneas de texto y un relleno ámbar obligaría a voltear las tres a
  `--ink-black`, metiendo contraste nuevo en el bloque con más texto de la
  sección. El filete de 3 px que crece de abajo a arriba reutiliza el motivo que
  ya tenía `.eyebrow` (línea naranja a la izquierda) y `.photo-frame`
  (corchete): una línea naranja que marca el elemento, sin competir con la
  lectura.
- **D26.3 — El velo va en el `<a>`, no en el `<li>`.** El radio de `4px` está
  en `.contact-card__link`; un degradado en el `<li>` saldría por debajo con las
  esquinas rectas. `overflow: hidden` en el enlace recorta el filete contra ese
  mismo radio.
- **D26.4 — Móvil explícito.** La regla de `≤700px` baja `.contact-card__value`
  a `0.97rem`, pero `--hero` tiene más especificidad y se saltaba ese ajuste. Se
  añade `.contact-card--hero .contact-card__value { 1.02rem }` dentro del bloque
  móvil para que la jerarquía se mantenga **por decisión**, no por accidente: a
  `1.18rem` el correo de 28 caracteres se parte en dos líneas a 320 px.
- **D26.5 — `prefers-reduced-motion` cubre el filete.** Se anula su `transition`
  y se añade `::before` a la lista. El resto de la sección ya lo tenía.
- **D26.6 — Hoja muerta eliminada.** `--contact-borde` estaba declarada en
  `.contact-frame` sin usarse en ninguna regla. Se quita; la variable vive
  legitimately en `.contact-card`.

**Lo que NO se tocó, a propósito:** el texto de la sección. `.contact-motto`
("Conversemos sobre / ideas, código y el futuro") repite la idea que ya está en
`.contact-lead` ("¿Tienes una idea, proyecto u oportunidad?"). Es redundancia
de contenido, no de diseño, así que se deja para decisión del usuario.

### Evidencia (2026-10-05) — D26

- **Build:** `npm run build` con **0 errores, 0 warnings y 0 hints**.
- **Contraste calculado con las mezclas reales de `color-mix()`**, no con los
  hexadecimales de la paleta en bruto. Peor caso = extremo más claro del velo
  ámbar (`#28171a`):

  | elemento | token | ratio | AA |
  |---|---|---|---|
  | valor 1.18rem | `--white` | 15,82:1 | 4,5:1 |
  | descripción | `--muted` | 9,63:1 | 4,5:1 |
  | plataforma 10px | `--dim` | 7,02:1 | 4,5:1 |
  | icono de la tarjeta | `--accent` | 10,00:1 | 3:1 |

  Reposo de la tarjeta normal (`#13071c`): 18,07 / 11,00 / 8,02 / 5,58.
  Hover (`#20061a`): 10,72 / 7,82. Todos superan AA con holgura.
- **CSS compilado** (`dist/_astro/index.jVe3qkCY.css`, 48.8 KB): reglas presentes
  y **en el orden correcto** — `.contact-card--hero .contact-card__link` (velo)
  antes que `.contact-card--hero .contact-card__link:hover` (fondo de hover),
  emparejando especificidad y gainando la última. `--contact-borde` declarada
  exactamente 2 veces (`.contact-card` y `--hero`), 0 en `.contact-frame`.
- **DOM renderizado en vivo** (`chrome-headless-shell --dump-dom` sobre
  `localhost:4321`, 160 164 chars): 4 `<li class="contact-card">`, la primera con
  `contact-card--hero`, los 4 `href` correctos (`mailto:`, GitHub, LinkedIn,
  WhatsApp), 4 iconos y 4 flechas `go`. La tarjeta de Discord mantiene
  `contact-card--inactive`.
- **Límite de esta revisión, dicho con claridad:** la auditoría fue de **código y
  números**, no visual. El modelo de esta sesión **no acepta imágenes**, así que
  no se pudieron ver las capturas de Contacto ni hacer la comparación
  antes/después. La captura existe en
  `%LOCALAPPDATA%\Temp\opencode\dr\contacto-desktop-1440.png` para revisarla a
  ojo. Corresponde a la Fase 6.

### Decisión D27 (2026-10-05) — se retira el marco de Contacto

**Petición del usuario:** «quita el cuadrado naranja que encierra todo lo de
contacto». Era `.contact-frame { border: 1px solid var(--accent-2) }`, el
rectángulo que rodeaba la sección entera.

- **D27.1 — Se va el filete en los tres puntos donde estaba.** No basta con
  borrar el de escritorio: el bloque de `≤700px` lo reducía a una sola línea
  superior (`border: 0` + `border-top`) y el de `≤420px` solo ajustaba el
  `padding-inline`. Los tres se han ido. Queda **una** regla `.contact-frame` en
  el CSS compilado, la de la base.
- **D27.2 — El `padding` asimétrico tenía que irse con el borde.** Era
  `clamp(1.5rem, 3vw, 2.75rem) 0 0 clamp(...)`: hueco solo arriba y a la
  izquierda, pensado para quedar pegado dentro del filete, copiando el truco de
  `.photo-frame`. Sin borde, ese hueco descentraba el contenido hacia abajo y
  hacia la derecha y lo dejaba descuadrado respecto al `.container`, mientras el
  resto de secciones alinean en su gutter. Quitar solo el borde habría
  introducido un descuadre.
- **D27.3 — El separador entre secciones no se pierde.** Lo aporta
  `.section { border-top: 1px solid var(--line-soft) }`, así que en móvil la
  línea superior ámbar era redundante.
- **D27.4 — `.contact-frame` no se borra del marcado.** Sigue haciendo falta:
  define `--contact-radius`, que heredan las tarjetas, y `position: relative`.
  Solo deja de pintar. Borrar el `<div>` habría sido un cambio de estructura sin
  ganancia.

**Lo que NO cambia:** el filete ámbar de la tarjeta de Correo (D26) y el resto de
acentos de la sección siguen intactos. Lo que se pidió quitar era el rectángulo
exterior.

### Evidencia (2026-10-05) — D27

- **Build:** `npm run build` con **0 errores, 0 warnings y 0 hints**.
- **CSS compilado** (`dist/_astro/index.BU1eXwAn.css`, 48.7 KB): `.contact-frame`
  compila a exactamente `contact-frame{--contact-radius:4px;position:relative}`.
  Cero `border`, cero `padding`, y **1 sola** regla `.contact-frame` (antes 3).
- **DOM renderizado en vivo:** `<div class="contact-frame">` →
  `<div class="contact-grid">` → `<ul class="contact-list">` con 4
  `<li class="contact-card">`, la primera con `contact-card--hero`. Marcado
  íntegro.
- **Pendiente de revisión visual:** sigue sin poder verse en un navegador desde
  esta sesión (el modelo no acepta imágenes). El cambio es de una sola propiedad
  visible, pero corresponde a la Fase 6.

### Abierto en esta ampliación

- **A1 — Sin causa social nombrada.** El usuario quiere proyectos con impacto
  social pero no ha dicho cuál. Por eso "impacto social" aparece como
  interés y la respuesta dice **para qué** se usa la tecnología, sin inventar
  una causa. Cuando haya una real, se añade.
- **A2 — `perfil.titular` sigue sin usarse.** El titular del hero está escrito
  a mano en `Hero.astro` ("Desarrollador de software enfocado en soluciones
  reales."), igual que el `titular` de D5. No se tocó porque D9 lo aprobó así
  y unificarlo cambiaría el `<span>` del acento. Es una excepción viva a D5.
- **A3 — Breakpoints 10 y 11.** `Contacto` usa `780px` y `Footer` `800px` y
  `520px`, contra la norma de `1050`/`700`. No se ha corregido porque no
  estaba en el alcance pedido; queda anotado en el `README.md`.

---

### Decisión D28 (2026-10-05) — la Robótica pasa a ser una sección propia

El sitio tenía la robótica repartida en tres sitios: la línea de tiempo de
`Trayectoria`, un toggle escondido con los torneos, y los marcadores de fotos
que nunca se rellenaron. Eso lo leía como "unStage más de un portafolio web".

- **D28.1 — `Robotica.astro` no copia nada.** Reúne lo que ya existía leyendo
  `perfil.ts`: la trayectoria de Fundación Biosbot por `detalleEn: 'robotica'`,
  los torneos de `competencias` y la galería. La línea de tiempo la sigue
  mostrando, pero ya solo como una línea.
- **D28.2 — La galería pasa de marcadores a fotos reales.** `TILES = [0,1,2,3]`
  sobre las 7 fotos de `galeria`. Cada casilla rota sus capas sola cada 5 s. Se
  fueron los `<div class="rob-slot">` y sus reglas, que ya no pintaban nada.
- **D28.3 — El logo de la Fundación se optimiza, no se borra.** Sigue siendo una
  afirmación de que se estuvo ahí. `logo-fundacion.jpg` son 36 KB frente a los
  587 KB del original `logot.jpg`, que queda como fuente sin usar.
- **D28.4 — Los alt de las fotos son datos, no texto de la plantilla.**
  `galeriaAlt?` es opcional y va en el mismo orden que `galeria`: si una foto no
  tiene descripción, no se inventa una.
- **D28.5 — RAF VESTIGIA deja de ser un destacado de la web.** Es un proyecto de
  robótica, así que se mudó a `robotica.proyectos`.follow-up en
  `experiencia` y a la galería.
- **D28.6 — Se conservan los dos huecos de credenciales.** El diploma sí se ve;
  los marcadores de diplomas que nunca llegaron se mantienen porque no hay foto
  con la que rellenarlos y no se sustituye contenido real por iconos.

### Decisión D29 (2026-10-05) — las cifras se calculan, no se escriben

- **D29.1 — Ninguna cifra de cabecera está escrita a mano.** Torneos, podios,
  primeros puestos, países y años se cuentan desde `competencias` y
  `robotica`. Añadir un torneo sube el número solo; no puede quedar el rótulo
  diciendo una cosa y el dato otra.
- **D29.2 — El podio cuenta sobre `puesto`, no sobre `resultado`.** "Campeones
  (1.er lugar)" y "Segundo lugar" son el mismo campo con distinta forma de
  escribirlo. Parsear el texto daría números distintos según cómo se escribiera
  cada resultado.
- **D29.3 — Las cifras van fuera del panel.** La sección existe para decir "esto
  no es solo web" y eso tiene que verse sin pulsar nada. El botón sigue
  ocultando lo largo: trayectoria, torneos, habilidades y galería.
- **D29.4 — Los pocos primero, el resto segundos.** Hay 3 de 9 con `puesto`, así
  que la lista se parte en dos y cada campo es condicional: si no hay
  `resultado` o no hay `lugar`, esa línea no sale.

### Decisión D30 (2026-10-05) — torneos en cinta, medios como tarjetas quietas

- **D30.1 — Los torneos son una cinta horizontal, no una lista.** 9 torneos × 2
  copias = 18 elementos. Es el mismo patrón `.marquee` del Stack, así que el
  motor de `public/js/main.js` es el que ya existía: no se escribió un segundo
  carrusel.
- **D30.2 — Reutiliza la cinta, no la duplica.** El bloque 6 (Stack) define
  *cómo* se mueve; el bloque 9 (Robótica) solo añade *cómo se ve* cada torneo
  con `.marquee--torneos` y `.marquee__periodo / __titulo / __detalle`.
- **D30.3 — Sin logos ni botón en los torneos.** Un recuadro punteado sugería un
  logo que no existe. Se anula con
  `.marquee--torneos .marquee__item:not(:has(.marquee__logo))::before`, porque
  la regla base del hueco gana en especificidad. El botón de pausa también se
  quitó: en esta cinta no lo hay.
- **D30.4 — La cinta es accesible sin botón.** El `track` es `role="group"` con
  `aria-label` y `tabindex="0"`, y se para con `:hover` y `:focus-within`, así
  que basta con llegar con el teclado. La segunda copia es `aria-hidden`.
- **D30.5 — Los medios dejan de moverse.** Tres tarjetas estáticas en rejilla.
  Una cinta de tres elementos que se desplazan es ruido, no información, y
  obligaba a un botón que ya no hacía falta.
- **D30.6 — El botón de pausa se queda solo en Stack.** Es el único sitio donde
  37 logos en movimiento necesitan un freno. `data-marquee-toggle` se empareja
  con `data-marquee` por clave, así que añadir otra cinta con botón no obliga a
  tocar `main.js`.
- **D30.7 — Enlaces de medios con salida anunciada.** Cada tarjeta abre en
  pestaña nueva y lleva texto solo para lectores de pantalla ("se abre en una
  pestaña nueva"), porque el icono de flecha no lo dice.

### Decisión D31 (2026-10-05) — `global.css` en el orden de la página

El CSS estaba en once bloques que no seguían el orden de la página, y lo de
Robótica estaba en el bloque de Trayectoria. Se reorganizó sin cambiar ni una
sola regla.

- **D31.1 — Los bloques siguen el orden de `index.astro`.** Trece bloques:
  tokens, base, compartidos, y luego uno por sección en el orden en que se ven.
  Header, Hero, Stack, Sobre mí, Trayectoria, Robótica, Proyectos y Destacados,
  Contacto, Footer.
- **D31.2 — Destacados y Proyectos en un bloque.** Los tres pintan las mismas
  tarjetas (`ProyectoCard.astro`), así que separarlos obligaría a partir reglas
  que hoy sirven a los tres.
- **D31.3 — Lo compartido va en el bloque 3, no en quien lo usa primero.** Botones,
  etiquetas, `.container`, el acordeón `.exp-toggle` (que usan Trayectoria y
  Robótica) y las tarjetas. Si estuviera en dos sitios, cambiar una y olvidar la
  otra daría dos estilos para lo mismo.
- **D31.4 — Los `@media` transversales van al final.** Dentro de un `@media`
  gana la regla más abajo: subirlos al principio haría que los bloques
  siguientes los sobrescribieran.
- **D31.5 — Cada bloque dice qué `.astro` lo usa.** Para no tener que buscar de
  dónde viene una clase.
- **D31.6 — Se documentó cómo editar cada cosa.** La galería y el hero tienen su
  mapa de ajustes (qué archivo, qué clase, qué intervalo), y se borraron las
  reglas muertas `.rob-slot*`.
- **D31.7 — Ninguna regla se perdió.** Reordenar no es reescribir: se comprobó
  que el conjunto de selectores es idéntico antes y después.

### Evidencia (2026-10-05) — D28 a D31

- **Build:** `npm run build` con **0 errores y 0 warnings**; queda **1 hint**
  preexistente y ajeno a este trabajo (`TS6133` en `Trayectoria.astro:17`, la
  variable `indice` sin usar).
- **Reordenación (D31):** 482 selectores antes y 482 después, **0 perdidos y 0
  nuevos**; llaves balanceadas 533/533 en ambos. Los únicos tres `@media` de más
  son las menciones a `@media` en los textos de documentación nuevos.
- **CSS:** `src/styles/global.css` pasa de 104,9 KB / 4251 líneas a 92,6 KB /
  4090 líneas. El CSS compilado de `dist/_astro/` mide 56,1 KB.
- **Torneos (D30):** el HTML generado tiene **18** elementos de cinta
  (9 × 2), **0 `<img>`**, un solo `data-marquee="torneos"` y **ningún**
  `data-marquee-toggle="torneos"`. Sí queda el de `stack`.
- **Medios (D30):** **3** tarjetas `.rob-medio`, sin `data-marquee` y sin
  botón.
- **Galería (D28):** 4 casillas sobre 7 fotos, sin una sola regla `.rob-slot*`
  en el CSS compilado.
- **Pendiente de revisión visual:** sigue sin poder verse en un navegador desde
  esta sesión. Corresponde a la Fase 6 y depende de que el usuario mire
  `http://localhost:4321/PorfolioJR` y la versión publicada.

### Abierto en D28–D31

- **A4 — Seis imágenes en `public/img/` sin usar.** `logot.jpg` (587 KB, el
  original del logo de la Fundación), `foto.jpg` (249 KB), `logo.jpg`,
  `logo jr.png`, `Logo_Biosbot-01.avif` y `robotica-1.jpg`. No están
  referenciadas por ningún componente: solo aparecen citadas en comentarios. **No
  se han borrado** porque `logot.jpg` es el original del logo y OneDrive ya ha
  revertido archivos eliminados antes. Todas están sin rastrear en git, así que
  no se publican.
- **A5 — Sin confirmar:** el torneo de Brasil (falta cuál y en qué año), los
  canales del documental, la URL de Instagram, el nombre de RAF VESTIGIA,
  `public/cv.pdf` y el segundo correo. Marcados con `TODO` en `perfil.ts` y sin
  inventar el dato.
- **A6 — RESUELTO en D32.** Las dos fotos grandes ya están optimizadas: la
  galería pasó de 2,22 MB a 1,27 MB. Queda una limitación de origen, no de
  compresión: `foto competencia.jpg` es de 473×405 px, más pequeña que la
  casilla donde se muestra. Solo se arregla con un original de mayor
  resolución.
- **A7 — El CSS tiene cuatro clases muertas.** `.comp-list`, `.comp-item`,
  `.comp-item__periodo`, `.comp-item__body`, `.rec-item` y `.rec-item__link`
  quedaron sin usar al convertir la lista de competencias y el bloque de
  reconocimientos. **No se han borrado**: la limpieza va después de la
  reorganización, para no mezclar dos cambios en el mismo commit.

### Decisión D32 (2026-10-05) — las fotos de la galería, comprimidas

A6 era el único peso muerto que quedaba de D28. Dos de las siete fotos estaban
mal guardadas; las otras cinco ya estaban bien y **no se tocaron**.

- **D32.1 — Solo se re-codifican las dos que sobraban.** `mexico 1.jpeg` pesaba
  803 KB a 1264×842, y `foto competencia.png` 399 KB siendo de 473×405. Las
  otras cinco se probaron a calidad 85 y **empeoraban** entre un 10 % y un 27 %:
  ya estaban comprimidas. Rehacerlas era gastar calidad visual para nada.
- **D32.2 — El PNG sin alfa se convirtió a JPG.** Se comprobó pixel a pixel antes
  de convertir: los 191.565 píxeles tienen alfa 255, o sea que el canal alfa no se
  usaba. Convertirlo a JPG no puede rellenar nada de negro. 399 KB → 60 KB.
- **D32.3 — Sin cambiar ni un píxel de dimensión.** Re-codificar, no redimensionar:
  las dos ya estaban por debajo del techo de 1600 px, así que no se toca el
  encuadre ni el `object-fit`. Es un cambio de bytes, no de imagen.
- **D32.4 — El original queda en git.** Los dos archivos estaban versionados, así
  que `git checkout` los devuelve sin pérdida.
- **D32.5 — Lo que no se arregla se dice.** `foto competencia.jpg` sigue siendo de
  473×405, más pequeña que la casilla donde sale. Comprimir más no lo mejora: hace
  falta un original de mayor resolución.

### Evidencia (2026-10-05) — D32

| Archivo | Antes | Después | Ahorro |
| --- | --- | --- | --- |
| `mexico 1.jpeg` | 803 KB | 192 KB | 76 % |
| `foto competencia.png` → `.jpg` | 399 KB | 60 KB | 85 % |

- **Galería completa:** 2.221 KB → **1.272 KB** (−43 %).
- **Dimensiones intactas:** 1264×842 y 473×405, antes y después.
- **Build:** `npm run build` con 0 errores y 0 warnings (el mismo hint
  preexistente de `Trayectoria.astro:17`).
- **Alfa verificado:** 0 píxeles no opacos de 191.565, alfa mínimo 255.

---

## Fase 06 — Verificación y validación

Objetivo: evidencia de que el sitio funciona, no de que compila.

- `npm run build` con exit code 0 (evidencia: salida del comando).
- `npm run preview` y recorrido de las cinco secciones.
- Comprobación de teclado: `:focus-visible`, enlace «Saltar al contenido».
- Comprobación con `prefers-reduced-motion` activado.
- Revisión del Lighthouse básico: peso de página y accesibilidad.

Cierre: la fase no se cierra sin evidencia registrada aquí.

---

## Fase 07 — Liberación y despliegue

- Push a `main` → `.github/workflows/deploy.yml` publica `dist/`.
- Verificar en `https://jrafael1012.github.io/JRafael1012/`.
- Confirmar que *Settings → Pages* usa la fuente **GitHub Actions**.
- Si cambia el nombre del repositorio, actualizar `base` en
  `astro.config.mjs` (ver `README.md`).

### Evidencia (2026-10-02)

- **Build en Ubuntu:** correcto. `astro sync`, `astro check` y `astro build`
  pasan; los 13 archivos dan 0 errores, 0 warnings y 0 hints. Causa del fallo
  previo en D14.
- **Paso `deploy`:** sigue fallando por una causa externa al código:
  `has_pages` es `false`, el repositorio no tiene GitHub Pages habilitado. Se
  activa en *Settings → Pages* → fuente **GitHub Actions**, que requiere la
  cuenta del usuario. **Fase 07 abierta por ese motivo.**
- Los pasos del workflow van separados (`Entorno`, `Instalar dependencias`,
  `Sincronizar tipos`, `Comprobar tipos`, `Construir el sitio`, `Subir
  artefacto`, `Desplegar`) para localizar el fallo sin depender del log.

---

## Fase 08 — Operación y mantenimiento

- Revisar el sitio tras cada push (favicon, `cv.pdf`, enlaces externos).
- Los logos del marquee dependen de un CDN externo: si Simple Icons cambia un
  slug, aparece un hueco. Revisar si desaparece un logo.
- No hay servicios que mantener: no hay base de datos ni procesos abiertos.

---

## Fase 09 — Evaluación y mejora

- Métrica: contactos reales (cv descargado, correos, clics a repos).
- Retroalimentación real de entrevistas: qué preguntan y qué falta en el sitio.
- Solo entonces se evalúa D8 (bilingüe / páginas de contenido).

---

## Fase 10 — Retiro o reemplazo

- Sustituir cuando: GitHub Pages quede insuficiente, el dominio cambie o
  Astro 7 deje de recibir mantenimiento.
- Procedimiento: exportar el contenido de `perfil.ts`, conservar el
  `dist/` publicado y crear el nuevo proyecto. El contenido es lo único
 >data; los componentes son sustituibles.

---

## Trazabilidad

```text
Necesidad (D2 fase 1: conseguir empleo)
  → Requisito (comunicar experiencia, skills y casos de forma escaneable)
  → Diseño (fase 3, arquitectura de una página)
  → Código (src/components, src/data/perfil.ts, src/styles/global.css)
  → Prueba (fase 6: build + preview + recorrido)
  → Versión (commit en main)
  → Despliegue (GitHub Actions → /JRafael1012)
```

Cada pendiente P1–P7 corresponde a una línea concreta de `perfil.ts` o a un
archivo de `public/`. Si un cambio no se puede señalar con un P#, es alcance
nuevo y debe agregarse aquí antes de implementarse.
