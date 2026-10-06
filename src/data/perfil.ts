export interface Experiencia {
  puesto: string;
  empresa: string;
  periodo: string;
  resumen: string;
  /**
   * Opcionales: una ficha sin logros o sin tecnologías no las inventa. El
   * componente no pinta la lista si el campo falta o viene vacío, y así no
   * queda un hueco de margen donde no hay contenido.
   */
  logros?: string[];
  stack?: string[];
  /**
   * Nombres de las fotos del collage de este bloque. Solo el nombre: la
   * carpeta es `public/img/`. Si falta, no se pinta collage, y el bloque se
   * mantiene como un item normal de la trayectoria.
   */
  galeria?: string[];
  /**
   * Texto alternativo de cada foto, en el mismo orden que `galeria`.
   *
   * Opcional a propósito: si falta, la galería cae a una descripción genérica en
   * vez de quedarse sin texto, que es peor para quien usa lector de pantalla.
   */
  galeriaAlt?: string[];
  /**
   * Anclaje vertical de cada foto dentro de su casilla, en el mismo orden que
   * `galeria`. Cualquier valor válido de `object-position`, por ejemplo
   * `'center 20%'`: cuanto más bajo el número, más se ve la parte de arriba.
   *
   * Hace falta en las fotos verticales: con `object-fit: cover` la casilla
   * recorta el alto y un `center` a secas se come la cabeza. Si una foto no
   * lleva entrada, se queda en `center` (el valor por defecto de la CSS), así
   * que el arreglo puede ser de 1 a 7 entradas.
   */
  galeriaPos?: string[];
  /**
   * El detalle de este bloque (logros, stack y galería) se muestra en una
   * sección propia en vez de aquí, para no repetirlo dos veces. Guardar el id
   * de esa sección y no un `true` permite enlazarla desde la línea de tiempo.
   *
   * Los datos NO se mueven: siguen en este mismo objeto y los lee la sección
   * que los Detailed. Ver D28.
   */
  detalleEn?: 'robotica';
  /**
   * Una sola frase para la línea de tiempo, cuando `resumen` es demasiado largo
   * porque el desarrollo entero vive en otra sección. Opcional a propósito: si
   * falta, la línea se queda con fecha, puesto y empresa.
   */
  linea?: string;
}

/**
 * Un proyecto de la sección "Proyectos".
 *
 * IMPORTANTE: todos los campos menos `titulo` son opcionales a propósito.
 * Un dato que no se tiene no se inventa: se deja el campo fuera y la tarjeta
 * dibuja solo lo que hay. Ver D21 en plans/plan_midegs_completo.md.
 */
export interface Proyecto {
  /** Único campo obligatorio: es el nombre del proyecto. */
  titulo: string;
  /** Aparece en "Proyectos destacados", antes de la lista completa. */
  destacado?: boolean;
  /** Qué es, en una o dos frases. */
  descripcion?: string;
  /** El problema concreto que resuelve. */
  problema?: string;
  /** Tecnologías usadas. */
  stack?: string[];
  /** Qué hace, en concreto. Lista corta. */
  funcionalidades?: string[];
  /** Qué hiciste tú dentro del equipo. Importante en trabajos de equipo. */
  participacion?: string;
  /** En qué punto está: "En desarrollo", "Terminado", "En pausa"... */
  estado?: string;
  /** Ruta dentro de `public/`, por ejemplo `img/proyectos/finovatech.webp`. */
  imagen?: string;
  /** URL real del repositorio. Nunca un enlace al perfil. */
  repositorio?: string;
  /** URL de la demo publicada. */
  demo?: string;
}

/** Una pregunta y su respuesta, tal como se muestran en "Sobre mí". */
export interface Pregunta {
  pregunta: string;
  respuesta: string;
  /** Etiquetas opcionales que se muestran debajo de la respuesta. */
  intereses?: string[];
}

/** La sección "Sobre mí" completa. */
export interface SobreMi {
  eyebrow: string;
  titulo: string;
  subtitulo: string;
  items: Pregunta[];
  valor: { label: string; texto: string };
}

/** Una competencia o torneo en el que participaste. */
export interface Competencia {
  /** Temporada o nombre del torneo, por ejemplo "Cargo Connect". */
  titulo: string;
  /** Fase o programa, por ejemplo "Torneo regional y nacional". */
  evento?: string;
  /** Temporada o fecha, por ejemplo "2021 — 2022". */
  periodo: string;
  /** Puesto obtenido, por ejemplo "Campeones regionales y nacionales". */
  resultado?: string;
  /**
   * El mismo puesto, como número. 1 es primero.
   *
   * Existe aparte de `resultado` porque `resultado` es texto para la persona
   * que lee, y un contador no puede contar sobre "Campeones (1.er lugar)" ni
   * sobre "Segundo lugar": hay que interpretar la palabra. Con este campo el
   * podio y los primeros puestos se cuentan, no se estiman (D29).
   */
  puesto?: number;
  /** Ciudad y país donde se hizo, por ejemplo "Sydney, Australia". */
  lugar?: string;
}

export interface Tecnologia {
  nombre: string;
  /**
   * Qué es, para que la cifra de Estadísticas no mezcle peras con manzanas
   * (D41): 'tecnologia', 'herramienta' y 'base-de-datos' se cuentan en
   * `estadisticas.tecnologiasYHerramientas`; 'plataforma' e 'ia' solo viven
   * en la marquesina del Stack con su logo.
   */
  categoria: 'tecnologia' | 'base-de-datos' | 'herramienta' | 'plataforma' | 'ia';
  /** Slug de Simple Icons. Opcional: si falta, el nombre se muestra sin logo. */
  slug?: string;
  /**
   * Nombre del icono en Devicon, para las tecnologías que Simple Icons no
   * tiene (Java, PowerShell, VS Code). Solo entra en juego si no hay `slug`.
   */
  di?: string;
  /**
   * Ruta a un SVG guardado en `public/img/logos/`, para lo que no existe en
   * ninguna fuente (Windows, Copilot, ChatGPT, AntiGravity, Canva). Es la
   * última opción.
   */
  icono?: string;
}

export interface Contacto {
  /** Nombre de la plataforma, en el formato del sitio: "GitHub", no "github". */
  label: string;
  /** Lo que se lee en la tarjeta. No siempre es el `href`: LinkedIn muestra
   *  el nombre de la persona, no la URL larga. */
  valor: string;
  /** Enlace completo, listo para usar en un `href`. */
  href: string;
  /** Segunda línea de la tarjeta: qué encuentra el usuario al pulsar. */
  descripcion?: string;
  /**
   * Icono de la tarjeta.
   *
   * `Mail`, `Github` y `Linkedin` vienen de `lucide-astro`. `Whatsapp` es
   * aparte: Lucide retiró los iconos de marca, así que ese glifo es el que ya
   * usa el Hero en `.hero-social__icon--whatsapp`, reutilizado tal cual para
   * que el WhatsApp se vea igual en las dos secciones.
   *
   * Si es `undefined`, la tarjeta sale sin icono.
   */
  icono?: 'Mail' | 'Github' | 'Linkedin' | 'Whatsapp';
  /** Marca la tarjeta como vía principal: recibe borde y acento reforzado. */
  destacado?: boolean;
}

/**
 * CONTENIDO DEL SITIO — fuente única de verdad.
 *
 * Este archivo es la base editable del portafolio. La estructura, el diseño y
 * las secciones ya están listos; lo que cambia es solo el texto de aquí.
 *
 * ⚠ PENDIENTE ANTES DE PUBLICAR
 *   1. proyectos[].enlace.url → los repositorios reales.
 *   2. El PDF de la hoja de vida: colócalo en `public/cv.pdf`.
 *
 * YA RESUELTO: correo de contacto, URL de LinkedIn, fechas de SENA
 * (2025 — 2026), ingeniería (2027 — Actualidad) y robótica (2020 — Actualidad),
 * y nombre de la universidad (Universidad Central) y de la fundación de
 * robótica (Fundación Biosbot Robótica / Team Biosbot Colombia).
 */
export const perfil = {
  nombre: 'Jonatan Rafael Arlant Cortes',
  /** El nombre que va en el `<h1>` del hero: corto, como se presenta uno. */
  nombreCorto: 'Rafael Arlant',
  marca: 'Rafael.dev',
  rol: 'Estudiante de Ingeniería de Sistemas y Computación',
  subtitulo: 'Técnico en Desarrollo de Software',
  titular: 'Desarrollador de software enfocado en soluciones reales.',
  descripcion:
    'Hola, soy Rafael. Soy estudiante de Ingeniería de Sistemas y Computación y Técnico en Desarrollo de Software. Me apasiona aprender y construir cosas nuevas. Aprendo rápido, me adapto a nuevas tecnologías y utilizo la inteligencia artificial como herramienta para investigar, potenciar mis conocimientos y mejorar mi proceso de desarrollo. Me gusta enfrentar problemas reales y convertir ideas en soluciones funcionales.',
  ciudad: 'Bogotá, Colombia',
  areas: 'Frontend · Backend · SQL · Sistemas',
  coordenadas: ["04° 42' N", "04° 04' W"],
  fotoCaption: 'APRENDER HACIENDO',
  fotoAlt: 'Fotografía de Jonatan Rafael Arlant Cortes',
  badge: 'Software',
  /**
   * Tecnologías principales, en la línea de puntos bajo el titular del hero.
   * Es una lista corta y deliberada: lo primero que se lee, no el catálogo
   * entero. El catálogo completo con logos es `stack`.
   *
   * Ojo: aquí aparece SQL, que sí aparece en la formación del SENA
   * (`experiencia`) pero que el usuario quitó de la cinta de logos en D12.
   * Son dos listas distintas con distinta función: esta es una declaración de
   * CABECERA, la cinta es el inventario.
   */
  tecnologiasClave: [
    'HTML',
    'CSS',
    'JavaScript',
    'Python',
    'SQL',
    'PHP',
    'Java',
    'TypeScript',
  ],
  cv: {
    label: 'Hoja de vida',
    // Coloca el PDF en `public/cv.pdf` o cambia esta ruta.
    href: 'cv.pdf',
  },
  meta: {
    title: 'Rafael.dev — Portafolio',
    description:
      'Portafolio de Rafael Arlant Cortes: desarrollo de software, sistemas y experiencia técnica en Bogotá, Colombia.',
    themeColor: '#03071e',
  },
};

export const nav = [
  { label: 'Stack', href: '#stack' },
  { label: 'Sobre mí', href: '#sobre-mi' },
  { label: 'Trayectoria', href: '#trayectoria' },
  { label: 'Destacados', href: '#destacados' },
  { label: 'Proyectos', href: '#proyectos' },
  { label: 'Servicios', href: '#servicios' },
  { label: 'Certificados', href: '#certificaciones' },
  { label: 'Contacto', href: '#contacto' },
];

/**
 * Sección "Sobre mí". Cinco preguntas que se pliegan y se despliegan: quien
 * entra ve las preguntas y abre solo la que le interesa.
 *
 * REGLA DE ESTA SECCIÓN: no se inventa. Cada respuesta se apoya en datos que
 * ya están en este mismo archivo —`perfil.descripcion`, `experiencia`,
 * `competencias` y `proyectos`—, así que si cambia uno de ellos hay que
 * actualizarla también.
 */
export const sobreMi: SobreMi = {
  eyebrow: 'SOBRE MÍ',
  titulo: 'Quién soy',
  subtitulo: 'Seis preguntas, seis respuestas. Abre las que te interesen.',
  /**
   * ORDEN DE LAS PREGUNTAS: no es el que se le ocurrió primero, es un arco.
   * Identidad → lo que resuelvo (la capacidad, antes que el papel) → la base
   * técnica → lo que me atrae → qué quiero construir → qué busco. Quien solo
   * lea los títulos ya se queda con el resumen.
   */
  items: [
    {
      pregunta: '¿Quién soy?',
      /** El párrafo largo: aquí es donde de verdad se lee. */
      respuesta: perfil.descripcion,
    },
    {
      pregunta: '¿Qué problemas me gusta resolver?',
      respuesta:
        'Los que existen de verdad: inventarios y ventas, gestión académica y robots que deben seguir una línea de forma estable. Me gusta convertir ideas en soluciones funcionales.',
    },
    {
      pregunta: '¿Qué estudio?',
      respuesta:
        'Técnico en Desarrollo de Software en el SENA y carrera de Ingeniería de Sistemas y Computación en la Universidad Central, con foco en bases de datos, algoritmos y arquitectura de sistemas.',
    },
    {
      pregunta: '¿Qué me interesa?',
      respuesta:
        'Que la tecnología sirva para algo: software que una empresa necesita de verdad y proyectos que mejoran la vida de alguien concreto. La programación y la robótica son el oficio; esto es para qué lo uso.',
      /** Etiquetas de la respuesta anterior: nombran, no repiten. */
      intereses: [
        'Programación',
        'Robótica',
        'Automatización',
        'Inteligencia artificial',
        'Ciberseguridad',
        'Software empresarial',
        'Emprendimiento',
        'Impacto social',
        'Aprendizaje continuo',
      ],
    },
    {
      pregunta: '¿Qué quiero construir?',
      respuesta:
        'Empresas de software que resuelvan un problema concreto y le sirvan a más de una persona. Empiezo por lo que veo cerca: inventarios, gestión académica y formación.',
    },
    {
      pregunta: '¿Qué estoy buscando?',
      respuesta:
        'Un lugar donde aprender de quien ya lo hace, ya sea en un trabajo o en un proyecto propio, y la posibilidad de convertir eso en algo propio.',
    },
  ],
  /** La propuesta de valor: lo que aporto frente a un listado de tecnologías. */
  valor: {
    label: 'Mi propuesta de valor',
    texto:
      'Aprendo rápidamente nuevas tecnologías y utilizo herramientas de inteligencia artificial para investigar, prototipar y acelerar el desarrollo de soluciones.',
  },
};

/**
 * Formación y actividades. Solo información verificable: aquí no van
 * métricas inventadas ni empresas que nunca existieron.
 *
 * ⚠ PENDIENTE
 *   · Los logros describen el programa, ni resultados medidos.
 *   · Faltan las competencias y los torneos: están en `competencias`, más
 *     abajo. Con la lista vacía la sección sale con un aviso en vez de datos
 *     inventados.
 */
export const experiencia: Experiencia[] = [
  {
    puesto: 'Técnico en Desarrollo de Software',
    empresa: 'SENA',
    periodo: '2025 — 2026',
    resumen:
      'Formación técnica en desarrollo de software: programación, bases de datos, redes y construcción de aplicaciones web.',
    logros: [
      'Bases sólidas en algorítmica, estructuras de datos y modelado de datos.',
      'Práctica del ciclo completo: del requerimiento al despliegue de una aplicación.',
    ],
    stack: ['JavaScript', 'Python', 'SQL', 'MySQL', 'HTML5', 'CSS3', 'Java'],
  },
  {
    puesto: 'Ingeniería de Sistemas y Computación',
    empresa: 'Universidad Central',
    periodo: '2027 — Actualidad',
    resumen:
      'Carrera de ingeniería en curso. Bases fuertes de matemáticas, algoritmos y arquitectura de sistemas.',
    logros: [
      'Cursando asignaturas de sistemas, bases de datos e ingeniería de software.',
      'Los proyectos de esta sección nacen de las asignaturas y del trabajo personal.',
    ],
    stack: ['Algoritmos', 'Estructuras de datos', 'Arquitectura de sistemas'],
  },
  {
    puesto: 'Robótica',
    empresa: 'Fundación Biosbot Robótica',
    periodo: '2020 — Actualidad',
    // El detalle de este bloque (resumen largo, logros, stack, galería y los
    // torneos) se renderiza en la sección "Robótica". Aquí, en la línea de
    // tiempo, queda solo la línea compacta. Ver D28.
    detalleEn: 'robotica',
    linea:
      '6 años creciendo entre proyectos, competencias y trabajo en equipo.',
    resumen:
      'Participé seis años en espacios de robótica y tecnología: FIRST LEGO League, WRO, Open BioBots y ferias de ciencia en colegios y universidades. En cada proyecto trabajé con mi equipo en programación, diseño, construcción, investigación y electrónica, aprendiendo a convertir ideas en prototipos que funcionan. Entre 2024 y 2026 fui líder del equipo, llevándome la organización, la coordinación y la preparación de competencias y presentaciones. Hoy, tras cumplir la edad máxima para competir, sigo en la robótica como mentor: acompaño a quienes empiezan y comparto lo que aprendí.',
    logros: [
      'Líder del equipo entre 2024 y 2026: organización, coordinación y preparación de competencias y presentaciones.',
      'Seis años compitiendo en FLL y WRO, y en ferias de ciencia en colegios y universidades.',
      'Como mentor, acompaño a nuevos participantes y transmito lo aprendido.',
    ],
    stack: [
      'Arduino',
      'C++',
      'Scratch',
      'Python',
      'Sensores',
      'Electrónica',
      'Diseño 3D',
      'Diseño 2D',
    ],
    galeria: [
      'documental.jpg',
      'foto competencia.jpg',
      'fotoig.jpg',
      'mexico 1.jpeg',
      'mexico 2.jpg',
      'wro.jpg',
      'wro1.jpg',
    ],
    /**
     * Texto alternativo, en el mismo orden que `galeria`.
     *
     * Lo consume la galería y por eso es un arreglo aparte y no un objeto: el
     * orden tiene que coincidir posición a posición con `galeria`.
     *
     * No se puede describir lo que muestra cada foto a simple vista, y un `alt`
     * inventado es peor que uno genérico: el lector de pantalla announces una
     * descripción que no es la real. Por eso de momento solo se dice qué es
     * (documental, competencia, México, WRO) y el detalle queda pendiente de
     * revisarlo con calma.
     *
     * PENDIENTE: describir el contenido real de cada una.
     */
    galeriaAlt: [
      'Fotograma del documental sobre robótica',
      'Fotografía de una competencia de robótica',
      'Fotografía compartida en Instagram',
      'Fotografía de la competencia en México',
      'Fotografía de la competencia en México',
      'Fotografía de la competencia de WRO',
      'Fotografía de la competencia de WRO',
    ],
    /**
     * Las tres verticales cortaban la cara con el anclaje centrado: con
     * `cover`, una foto de 720×1599 en una casilla cuadrada solo muestra
     * algo más de la mitad de su alto, y el centro de ese hueco caía en el
     * pecho. El anclaje sube la ventana para que entre la cabeza.
     *
     * Se ajusta mirando el sitio: si la cara queda cortada por arriba, baja
     * el número (más arriba); si sobra techo, súbelo. 0 = tope del archivo,
     * 100 = pie.
     */
    galeriaPos: [
      'center 16%', //  documental.jpg — 720×1599
      'center 50%', //  foto competencia.jpg — sin anclaje propio
      'center 50%', //  fotoig.jpg
      'center 50%', //  mexico 1.jpeg
      'center 50%', //  mexico 2.jpg
      'center 11%', //  wro.jpg — 900×1600
      'center 25%', //  wro1.jpg — 1200×1600
    ],
  },
  {
    /* Bachillerato. Va al final de la lista: por encima están la formación
       técnica y la universidad, que es lo que interesa a quien lee. El año es
       el de graduación, confirmado por el usuario. */
    puesto: 'Bachillerato (Grado 11)',
    empresa: 'IED Los Naranjos',
    periodo: '2026',
    resumen: 'Bachillerato completo en el IED Los Naranjos.',
  },
];

/**
 * Competencias y torneos, nacionales e internacionales.
 *
 * De más reciente a más antiguo. Lo que falta va anotado en cada entrada:
 *
 * Todos los regionales y nacionales fueron en Bogotá, salvo *Submerged*, que
 * fue en Cartagena. Cada torneo tiene puesto y ciudad.
 */
export const competencias: Competencia[] = [
  {
    titulo: 'WRO Future Innovator Senior',
    periodo: '2026',
    resultado: '1.er lugar',
    puesto: 1,
  },
  {
    titulo: 'Open International FIRST LEGO League',
    evento: 'Torneo internacional',
    periodo: 'Mayo 2026',
    resultado: '15.º lugar',
    puesto: 15,
    lugar: 'Guadalajara, México',
  },
  {
    titulo: 'Open BioBots',
    periodo: '2025',
    resultado: 'Segundo lugar',
    puesto: 2,
    lugar: 'Bogotá, Colombia',
  },
  {
    titulo: 'Unearthed',
    evento: 'Torneo regional y nacional',
    periodo: '2025 — 2026',
    resultado: 'Segundo lugar',
    puesto: 2,
    lugar: 'Bogotá, Colombia',
  },
  {
    titulo: 'Submerged',
    evento: 'Torneo regional y nacional',
    periodo: '2024 — 2025',
    resultado: 'Cuarto lugar',
    puesto: 4,
    lugar: 'Cartagena, Colombia',
  },
  {
    titulo: 'Masterpiece',
    evento: 'Torneo regional y nacional',
    periodo: '2023 — 2024',
    resultado: 'Tercer lugar',
    puesto: 3,
    lugar: 'Bogotá, Colombia',
  },
  {
    titulo: 'SuperPowered',
    evento: 'Torneo regional y nacional',
    periodo: '2022 — 2023',
    resultado: 'Segundo lugar',
    puesto: 2,
    lugar: 'Bogotá, Colombia',
  },
  {
    titulo: 'Cargo Connect',
    evento: 'Torneo regional y nacional',
    periodo: '2021 — 2022',
    resultado: 'Campeones (1.er lugar)',
    puesto: 1,
    lugar: 'Bogotá, Colombia',
  },
  {
    titulo: 'Asia Pacific Open Championship',
    periodo: '2024',
    resultado: '15.º lugar',
    puesto: 15,
    lugar: 'Sydney, Australia',
  },
];

/** La sección "Robótica" completa. Ver D28 en plans/plan_midegs_completo.md. */
export interface Robotica {
  eyebrow: string;
  titulo: string;
  subtitulo: string;
  /**
   * Lo que sabe hacer, no lo que ha ganado. Los torneos van aparte, en
   * `competencias`, porque son otra cosa: evidencia de resultado, no de
   * conocimiento.
   */
  habilidades: string[];
  proyectos: Proyecto[];
  /**
   * Distribución geográfica verificada. Cada entrada es un país donde el
   * equipo competió representando a Colombia. Se contrasta con `competencias`:
   * Australia y México ya aparecen ahí con su ciudad; Brasil está declarado
   * aquí pero su torneo aún no tiene ficha (ver D29).
   */
  paises: string[];
  /**
   * El cambio de rol a lo largo de los años (D29).
   *
   * Es lo que da sentido a todo lo demás. Los eight torneos, el Zero Project y
   * el reconocimiento del Concejo no son una lista de premios sueltos: son lo
   * que pasó mientras pasó de participante a líder y luego a mentor. Sin esta
   * línea de tiempo, un visitante ve cifras sin ver la trayectoria.
   *
   * Se cuenta en tres pasos a propósito. Con más, la línea se parte y deja de
   * leerse; con menos, se pierde el cambio de rol, que es lo que importa.
   */
  hitosRol?: {
    periodo: string;
    rol: string;
    detalle?: string;
    /** Marca el paso en curso. Se dibuja como una etiqueta aparte. */
    actual?: boolean;
  }[];
  /**
   * La organización detrás de los números, si se quiere nombrarla.
   *
   * Va en su propio bloque y no mezclada con los logros de Rafael porque sus
   * credenciales (NASA Astro Camp, Zero Project) son de la fundación. Puestas
   * junto a un torneo, se leerían como de él.
   */
  fundacion?: {
    nombre: string;
    marca?: string;
    descripcion?: string;
    /**
     * Archivo del logo dentro de `public/img`.
     *
     * Solo el nombre, igual que `galeria`: el componente antepone `BASE_URL`.
     * Asi el dato no depende de la configuracion de publicacion, y cambiar el
     * `base` de Astro no rompe la referencia.
     *
     * `logo-fundacion.jpg` se hizo de `logot.jpg`, reducido a 320 px de ancho
     * (587 KB -> 36 KB). El original ya no esta en el repo: se borro tras
     * confirmar que la version comprimida es la que se usa. Si algun dia hace
     * falta mas resolucion, habra que volver a la foto original.
     *
     * El logo trae fondo blanco y el bloque va sobre fondo oscuro, asi que la
     * hoja lo pone sobre una pastilla clara en CSS. Quitarselo no era opcion:
     * al borrar el blanco de un JPEG el contorno queda con halo de compresion.
     */
    logo?: string;
    /** Texto alternativo del logo. Si el nombre ya aparece al lado, se describe. */
    logoAlt?: string;
    instagram?: string;
    instagramUrl?: string;
  };
  /**
   * Reconocimientos y visibilidad: cosas que no son un puesto en un torneo.
   *
   * Van separados de `competencias` a propósito. Un torneo tiene puesto y
   * ciudad; un reconocimiento tiene entidad que lo otorga y categoría. Meter
   * uno en el otro obligaría a inventar el campo que falta.
   *
   * Todos los campos menos `titulo` y `entidad` son opcionales: un dato que
   * no se tiene se deja fuera y la tarjeta dibuja solo lo que hay. Mismo
   * criterio que `Proyecto` (D21).
   */
  reconocimientos: Reconocimiento[];
  /** Apariciones en medios: televisión, entrevistas, documental. */
  medios: Reconocimiento[];
}

/** Un reconocimiento, una aparición en medios, o algo que indique una fecha. */
export interface Reconocimiento {
  /** Qué es: "Reconocimiento", "Documental", "Entrevista". */
  titulo: string;
  /**
   * Quién lo otorga o quién lo hizo: "Concejo de Bogotá", "FIRST LEGO League".
   *
   * Opcional a propósito. En el Zero Project Award el nombre del premio ya
   * dice quién lo otorga, y ponerlo otra vez en su propia línea solo repite
   * el mismo texto dos veces seguidas.
   */
  entidad?: string;
  /** Año o temporada, si se conoce. */
  periodo?: string;
  /** Categoría, motivo o de qué trataba, si se sabe. */
  detalle?: string;
  /** Enlace real. Nunca un enlace al perfil. */
  enlace?: string;
  /**
   * A QUIÉN SE OTORGÓ. Es el campo más importante de esta interfaz.
   *
   * Todo lo que hay en `reconocimientos` y en `medios` se recibió la fundación
   * o el equipo, no Rafael en persona. Sin esta marca, el sitio pondría un
   * premio ajeno en su currículum, que es el error que un visitante
   * comprueba en un minuto.
   *
   *   · 'fundacion' → a la Fundación Biosbot Robótica.
   *   · 'equipo'    → al equipo de la temporada.
   *   · 'personal'  → a Rafael. No hay ninguno todavía: no se inventa.
   */
  dirigidoA?: 'personal' | 'equipo' | 'fundacion';
}

/**
 * ═══════════════════════════════════════════════════════════════════════════
 *  SECCIÓN ROBÓTICA
 * ═══════════════════════════════════════════════════════════════════════════
 *
 * La sección existe para que el sitio no parezca solo un portafolio de páginas
 * web. Reúne lo que YA estaba disperso por el sitio, sin copiarlo:
 *
 *   · La trayectoria de Fundación Biosbot → se lee de `experiencia`, buscando
 *     la entrada con `detalleEn: 'robotica'`. Una sola fuente, no dos copias.
 *   · Los 8 torneos → se leen de `competencias`. No se duplican aquí.
 *   · La galería de fotos → se lee de la misma entrada de `experiencia`.
 *
 * Lo único propio de este bloque es el texto de cabecera, el guion de las
 * habilidades y RAF VESTIGIA, que antes vivía en `proyectos` con
 * `destacado: true` y salía en "Proyectos destacados". Si se dejara en los dos
 * sitios, el mismo nombre se renderizaría dos veces, así que se mueve en vez de
 * duplicarse (D28.3).
 *
 * TODO D28 — PENDIENTE DE CONFIRMAR POR EL USUARIO. Esto no se inventa:
 *   · Qué es RAF VESTIGIA (equipo, robot, año, liga) y cuál es su papel.
 *   · Qué proyectos FLL hay y en qué temporadas.
 *   · Qué hizo exactamente en cada torneo (chasis, intake, shooter, PID...).
 * Por eso `descripcion`, `participacion` y `stack` están fuera: la tarjeta
 * dibuja solo lo que hay, en vez de rellenarse.
 */
export const robotica: Robotica = {
  eyebrow: 'ROBÓTICA',
  titulo: 'No todo lo que construyo vive en una pantalla.',
  subtitulo:
    '6 años entre robótica, código y competencias. 2 como líder de equipo. Hoy, mentor.',
  habilidades: [
    'Arduino',
    'Sensores',
    'Electrónica',
    'Programación de hardware',
    'Automatización',
    'Control de motores',
    'Resolución de problemas',
    'Construcción de prototipos',
    'Investigación',
    'Liderazgo de equipo',
    'Mentoría',
    'C++',
    'Python',
    'Scratch',
    'Diseño 3D',
    'Diseño 2D',
  ],
  proyectos: [
    {
      titulo: 'RAF VESTIGIA',
      // PENDIENTE: confirmar el título. Viene de la lista de candidatos que
      // escribió el usuario en el documento de contenido, no de los datos del
      // sitio. En `experiencia` la robótica aparece como "Robótica" en
      // Fundación Biosbot Robótica (Team Biosbot Colombia), con 6 fotos en
      // `robotica-N.jpg`. Si el nombre correcto es otro, cámbialo aquí.
    },
  ],
  // Australia y México ya están en `competencias` con su ciudad y su puesto.
  // Brasil no: falta saber qué torneo fue y en qué año (D29).
  paises: ['Australia', 'México', 'Brasil'],
  /**
   * Participante → Líder → Mentor.
   *
   * Las fechas y los tres roles son del usuario. Los detalles de cada paso se
   * escribieron a partir de lo que él ya había contado en el resumen (que fue
   * líder entre 2024 y 2026, y que hoy acompaña a nuevos participantes como
   * mentor tras cumplir la edad máxima), no inventados.
   */
  hitosRol: [
    {
      periodo: '2020',
      rol: 'Participante',
      detalle: 'Entro a los equipos de FLL como participante.',
    },
    {
      periodo: '2024',
      rol: 'Líder',
      detalle:
        'Asumí la organización y la coordinación del equipo, y la preparación de competencias y presentaciones.',
    },
    {
      periodo: '2026',
      rol: 'Mentor',
      detalle:
        'Tras cumplir la edad máxima para competir, sigo en la robótica acompañando a quienes empiezan.',
      actual: true,
    },
  ],
/**
   * TODO D29 — ATRIBUCIÓN. LEE ESTO ANTES DE PUBLICAR.
   *
   * Lo que el usuario declaró textualmente es esto:okaokótextualmente es esto:
   *
   *   · Zero Project Award 2024, categoría "tecnología innovadora y educación
   *     inclusiva". Lo recibió LA FUNDACIÓN.
   *   · Reconocimiento del Concejo de Bogotá del 1 de septiembre de 2026,
   *     Proposición 801 de la plenaria, a propuesta del Julián Espinoza
   *     Ortiz. También LA FUNDACIÓN.
   *   · Dos reconocimientos "de la ONU" en tecnología e inclusión.
   *   · Launcher de televisión, entrevistas, y un documental de FIRST LEGO
   *     League.
   *
   * ⚠ LO MÁS IMPORTANTE DE ESTE BLOQUE
   * Ninguno de estos premios es personal de Rafael. Todos son de la fundación
   * o del equipo. Por eso existe el campo `dirigidoA`: sin él, el sitio
   * diría "reconocimiento de Rafael" sobre un premio que se llevó la
   * fundación, y eso es exactamente el una afirmación que no se
   * sostiene cuando alguien lo busca. Se dice lo que pasó y quién lo recibió.
   *
   * CONFIRMADO POR EL USUARIO (2026-10-05). Lo que queda abierto:
   *   · Los reconocimientos "de la ONU" son UNO, y es el Zero Project Award
   *     2024 que ya está arriba. No se añade segunda tarjeta.
   *   · El Zero Project Award es totalmente un reconocimiento a la
   *     fundación, que es dueña del equipo. `dirigidoA: 'fundacion'` es
   *     correcto y no se toca.
*   · Rafael NO aparece en la entrega: el reconocimiento entero es de la
    *     fundación.
   *   · Los canales de TV fueron varios, pero el usuario no recuerda cuáles.
   *     Se conserva 'Varios canales' porque el hecho está confirmado; los
   *     nombres concretos no se inventan.
   *   · El documental de FLL saldrá en NETFLIX. El título aún no se sabe,
   *     así que la tarjeta no lo nombra.
   */
reconocimientos: [
    {
      titulo: 'Zero Project Award 2024',
      /* `entidad` no se pone: el nombre del premio ya dice quién lo otorga, y
         escribir "Zero Project Award" en las dos líneas repetía el mismo texto
         dos veces seguidas. Aquí no se rellena con "Zero Project" solo para
         llenar el hueco.

         Confirmado por el usuario: es un reconocimiento entero a la fundación,
         que es dueña del equipo. Rafael no aparece en la entrega. Por eso
         `dirigidoA` sigue siendo 'fundacion'. */
      periodo: '2024',
      detalle:
        'Galardío internacional en la categoría de tecnología innovadora y educación inclusiva, por un proyecto de inclusión social a través de la robótica.',
      dirigidoA: 'fundacion',
    },
    {
      titulo: 'Reconocimiento oficial a la Fundación Biosbot Robótica',
      entidad: 'Concejo de Bogotá',
      periodo: '1 de septiembre de 2026',
      detalle:
        'Proposición 801, aprobada por la plenaria del Concejo a propuesta del concejal Julián Espinoza Ortiz. Distingue la labor de la fundación en la inclusión y el desarrollo de niños y jóvenes con autismo a través de la robótica.',
      dirigidoA: 'fundacion',
    },
    // Los reconocimientos "de la ONU" son UNO, no dos: el Zero Project Award
    // 2024 de arriba. Confirmado por el usuario, así que no se añade una
    // segunda tarjeta. Ver la nota de atribución de arriba.
  ],
  /**
   * La organización detrás de los números. Va aparte porque sus credenciales
   * (NASA, Zero Project) son de la fundación, y mezcladas con los logros de
   * Rafael se leerían como de él.
   */
  fundacion: {
    nombre: 'Fundación Biosbot Robótica',
    marca: 'Team Biosbot Colombia',
    descripcion:
      'Socios oficiales autorizados de NASA ASTRO CAMP en Colombia. Compiten y preparan a niños y jóvenes en torneos nacionales e internacionales de robótica, entre ellos FIRST LEGO League.',
    logo: 'logo-fundacion.jpg',
    /** Texto alternativo del logo. Si el nombre ya aparece al lado, se describe. */
    logoAlt: 'Logotipo de la Fundación Biosbot Robótica',
    instagram: 'Team Biosbot',
    // PENDIENTE: el usuario dio el nombre de la cuenta, no la URL. Sin URL
    // no hay enlace; con una inventada, enlace roto.
    instagramUrl: undefined,
  },
  medios: [
    {
      titulo: 'Apariciones en televisión',
      entidad: 'Varios canales',
      // El usuario confirma que fueron varios canales, pero no recuerda
      // cuáles ni el año. Se conserva 'Varios canales': el hecho está
      // confirmado y los nombres no se inventan. Si en algún momento se
      // recuerdan, este es el sitio donde se desglosan.
    },
    {
      titulo: 'Entrevistas',
      entidad: 'Robótica y tecnología',
      // El usuario describe así las entrevistas: a canales, fundaciones y
      // organizaciones que apoyan la robótica en Colombia y en el mundo.
      // Sin fecha ni enlace porque no los tiene localizados.
    },
    {
      titulo: 'Participación en el documental',
      entidad: 'FIRST LEGO League · Netflix',
      // Saldrá en Netflix, pero aún no se conoce el título ni la fecha. Por
      // eso la tarjeta no nombra el documental ni enlaza a nada: se actualizará
      // cuando exista el enlace real.
    },
  ],
};

/**
 * Tecnologías y herramientas — las que realmente usa.
 *
 * DOS FUENTES DE ICONOS (verificadas una a una el 2026-10-02):
 *   1. `slug` → Simple Icons, teñido del color de acento:
 *      https://cdn.simpleicons.org/<slug>/ffba08
 *   2. `di`   → Devicon, solo para lo que Simple Icons no tiene:
 *      https://cdn.jsdelivr.net/gh/devicons/devicon/icons/<di>/<di>-original.svg
 *      Hoy: Java, PowerShell y VS Code. Estos tres salen a color; los otros
 *      29 salen en ámbar.
 *   3. `icono` → un SVG guardado en `public/img/logos/`, para lo que no está
 *      en ninguna de las dos fuentes. Se lee con `withBase()`, sin esto
 *      devolvería 404 en GitHub Pages.
 *
 * Si no hay `slug`, ni `di`, ni `icono`, el nombre se muestra sin logo. Así la
 * cinta nunca muestra un icono roto.
 *
 * ⚠ IMPORTANTE
 *   Un logo es una afirmación: quien lo ve da por hecho que la manejas.
 *   Quita lo que no sepas antes de publicar.
 *
 * ICONOS GUARDADOS EN EL PROYECTO (public/img/logos/), 2026-10-02:
 *   · Windows → skillicons.dev (licencia del origen no verificada).
 *   · Copilot → Wikimedia Commons, dominio público. Se le añadió
 *     fill="#ffba08" porque venía en negro y no se veía sobre este fondo.
 *   · ChatGPT → Wikimedia Commons (ChatGPT-Logo.svg), dominio público. Se le
 *     añadió fill="#ffba08": el primer archivo que se probó era el icono de
 *     la app, un cuadrado verde azulado que desentonaba con la cinta.
 *   · AntiGravity → thesvg.org, MIT. Conserva sus colores de marca.
 *   · Canva → thesvg.org, MIT. Conserva su degradado de marca.
 *   Cada archivo lleva su fuente y licencia anotadas dentro del propio SVG.
 *
 * ERRORES EVITADOS AL BUSCAR LOS SLUGS:
 *   · Node.js → 'nodejs' da 404; el correcto es 'nodedotjs'.
 *   · Bash → 'bash' da 404; el correcto es 'gnubash'.
 *   · CSS → 'css3' da 404; el correcto es 'css'.
 *   · En Devicon el archivo es '<nombre>-original.svg'. Ojo: los '-plain'
 *     NO son monocromos (JavaScript sale amarillo con cuadrado de fondo) y
 *     algunos salen en negro puro, invisible sobre este fondo oscuro.
 *   · ChatGPT: ni 'chatgpt' ni 'openai' existen en ninguna de las dos fuentes.
 *   · Canva sí está en el paquete npm de Simple Icons, pero NO en
 *     cdn.simpleicons.org (lo retiraron). Por eso va como icono local.
 *
 * QUITADAS POR DECISIÓN DEL USUARIO (2026-10-02): SQL, Word, Excel y
 * 'Programación por bloques'. En su lugar entra Scratch, que sí es la
 * herramienta concreta que usa en robótica. Python ya estaba en la lista.
 */
export const stack: Tecnologia[] = [
  // Lenguajes
  { nombre: 'HTML', categoria: 'tecnologia', slug: 'html5' },
  { nombre: 'CSS', categoria: 'tecnologia', slug: 'css' },
  { nombre: 'JavaScript', categoria: 'tecnologia', slug: 'javascript' },
  { nombre: 'TypeScript', categoria: 'tecnologia', slug: 'typescript' },
  { nombre: 'Python', categoria: 'tecnologia', slug: 'python' },
  { nombre: 'Java', categoria: 'tecnologia', di: 'java' },
  { nombre: 'C', categoria: 'tecnologia', slug: 'c' },
  { nombre: 'C++', categoria: 'tecnologia', slug: 'cplusplus' },
  { nombre: 'Dart', categoria: 'tecnologia', slug: 'dart' },
  { nombre: 'PHP', categoria: 'tecnologia', slug: 'php' },

  // Frameworks, motores y entornos
  { nombre: 'React', categoria: 'tecnologia', slug: 'react' },
  { nombre: 'Astro', categoria: 'tecnologia', slug: 'astro' },
  { nombre: 'Node.js', categoria: 'tecnologia', slug: 'nodedotjs' },
  { nombre: 'XAMPP', categoria: 'herramienta', slug: 'xampp' },
  { nombre: 'MySQL', categoria: 'base-de-datos', slug: 'mysql' },
  { nombre: 'SQLite', categoria: 'base-de-datos', slug: 'sqlite' },
  { nombre: 'Arduino', categoria: 'herramienta', slug: 'arduino' },
  { nombre: 'Android Studio', categoria: 'herramienta', slug: 'androidstudio' },
  { nombre: 'Scratch', categoria: 'plataforma', slug: 'scratch' },

  // Diseño
  { nombre: 'AutoCAD 2D y 3D', categoria: 'herramienta', slug: 'autocad' },
  { nombre: 'Figma', categoria: 'herramienta', slug: 'figma' },
  { nombre: 'Canva', categoria: 'plataforma', icono: 'img/logos/canva.svg' },

  // Control de versiones
  { nombre: 'Git', categoria: 'herramienta', slug: 'git' },
  { nombre: 'GitHub', categoria: 'plataforma', slug: 'github' },

  // Terminal
  { nombre: 'Bash', categoria: 'herramienta', slug: 'gnubash' },
  { nombre: 'PowerShell', categoria: 'herramienta', di: 'powershell' },

  // Sistemas operativos
  { nombre: 'Linux', categoria: 'plataforma', slug: 'linux' },
  { nombre: 'Kali Linux', categoria: 'plataforma', slug: 'kalilinux' },
  { nombre: 'Windows', categoria: 'plataforma', icono: 'img/logos/windows.svg' },

  // Herramientas
  { nombre: 'VS Code', categoria: 'herramienta', di: 'vscode' },
  { nombre: 'Notion', categoria: 'plataforma', slug: 'notion' },

  // Asistentes de IA
  { nombre: 'Claude Code', categoria: 'ia', slug: 'claude' },
  { nombre: 'ChatGPT', categoria: 'ia', icono: 'img/logos/chatgpt.svg' },
  { nombre: 'GitHub Copilot', categoria: 'ia', slug: 'githubcopilot' },
  { nombre: 'Copilot (Windows)', categoria: 'ia', icono: 'img/logos/copilot.svg' },
  { nombre: 'OpenCode', categoria: 'ia', slug: 'opencode' },
  { nombre: 'AntiGravity', categoria: 'ia', icono: 'img/logos/antigravity.svg' },
];

/**
 * PROYECTOS — PENDIENTE de datos.
 *
 * Solo hay dos proyectos confirmados por el usuario: el título. Todo lo demás
 * está vacío a propósito (ver D21 en plans/plan_midegs_completo.md): la
 * tarjeta dibuja solo los campos que existen, así que **no se inventa nada**.
 * Los 4 proyectos de relleno que había antes se borraron porque eran
 * inventados y sus enlaces apuntaban al perfil de GitHub, no a repositorios.
 *
 * PARA TERMINAR CADA TARJETA, rellena lo que falte en este array:
 *   descripcion    qué es, en una o dos frases
 *   problema       el problema concreto que resuelve
 *   stack          ['HTML', 'CSS', 'JavaScript', 'PHP', 'MySQL']
 *   funcionalidades ['Registro de usuarios', 'Ingresos', ...]
 *   participacion  qué hiciste tú dentro del equipo
 *   estado         'En desarrollo' | 'Terminado' | 'En pausa' | ...
 *   imagen         'img/proyectos/finovatech.webp'  (déjalo en public/)
 *   repositorio    'https://github.com/JRafael1012/...'  URL REAL del repo
 *   demo           'https://...'                        URL REAL publicada
 *
 * `destacado: true` lo sube a la sección "Proyectos destacados". El usuario
 * pidió los 3 mejores; de momento solo hay 2 confirmados, y el tercero sigue
 * vacante en vez de rellenarse con lo que haya.
 */
export const proyectos: Proyecto[] = [
  {
    titulo: 'Sistema Integral de Gestión Vehicular',
    destacado: true,
  },
  {
    titulo: 'FinovaTech',
    destacado: true,
    // El proyecto final del SENA, según D13.
  },
  // RAF VESTIGIA se mudó a `robotica.proyectos` (D28.3): es un proyecto de
  // robótica y su sitio natural es la sección de Robótica. Si se dejara aquí
  // con `destacado: true`, el mismo nombre saldría en "Proyectos destacados"
  // y en "Robótica", duplicado.
];

/**
 * ═══════════════════════════════════════════════════════════════════════════
 *  DATOS CONFIGURABLES — CONTACTO
 * ═══════════════════════════════════════════════════════════════════════════
 *
 *  Este bloque es el ÚNICO sitio donde se tocan las coordenadas de contacto.
 *  Todo lo demás (las tarjetas, el CTA, el `mailto:`) se construye a partir de
 *  aquí, así que no hay URLs repetidas por el código.
 *
 *  · ¿Cambiaste tu número de WhatsApp?  → `whatsappNumber`, línea de abajo.
 *  · ¿Cambiaste tu LinkedIn?             → `linkedinUrl`, línea de abajo.
 *  · ¿Cambiaste tu correo?               → `email`, línea de abajo.
 *
 *  ── WhatsApp ──────────────────────────────────────────────────────────────
 *  `whatsappNumber` es SOLO el número, en formato internacional y SIN `+`,
 *  sin espacios, guiones ni paréntesis. Ejemplo: `573238176273`.
 *
 *  El número no se inventa: es el que ya usaba el Hero en sus redes. Si ya no
 *  es el tuyo, cámbialo aquí y se actualiza la tarjeta de Contacto. La tarjeta
 *  del Hero tiene su propia copia hardcodeada en `Hero.astro`, que no se toca
 *  aquí porque esa sección queda fuera de este trabajo.
 */
export const datosContacto = {
  email: 'rafaelarlant1012@gmail.com',
  githubUrl: 'https://github.com/JRafael1012',
  githubUsername: '@JRafael1012',
  linkedinUrl: 'https://www.linkedin.com/in/rafael-arlant-cortes-b735412b3/',
  whatsappNumber: '573238176273',
  /** Texto que WhatsApp abre ya escrito. Se codifica solo, no a mano. */
  whatsappMessage:
    'Hola Rafael, vi tu portafolio y me gustaría hablar contigo sobre un proyecto.',
} as const;

/** `true` si hay número de WhatsApp con el que construir el enlace. */
export const whatsappConfigurado = datosContacto.whatsappNumber.length > 0;

/**
 * Enlace de WhatsApp con el mensaje ya codificado, o `null` si falta el número.
 * Se construye con `encodeURIComponent` porque el mensaje lleva acentos y signos
 * de interrogación, que romperían la URL si se escribieran a mano.
 */
export const whatsappUrl = whatsappConfigurado
  ? `https://wa.me/${datosContacto.whatsappNumber}?text=${encodeURIComponent(
      datosContacto.whatsappMessage,
    )}`
  : null;

/** Enlace `mailto:` del correo, listo para el CTA. */
export const correoUrl = `mailto:${datosContacto.email}`;

/**
 * El número tal como se lee en la tarjeta, que es distinto de como se usa en
 * la URL: aquí sí lleva `+` y espacios, porque es para ojos humanos. Un número
 * colombiano (57 + 10 dígitos) sale como `+57 323 817 6273`; cualquier otro
 * formato cae en `+573...` sin inventar agrupamientos.
 */
export const whatsappDisplay = (() => {
  const n = datosContacto.whatsappNumber;
  if (!n) return 'Sin número configurado';
  if (/^57\d{10}$/.test(n)) {
    return `+57 ${n.slice(2, 5)} ${n.slice(5, 8)} ${n.slice(8)}`;
  }
  return `+${n}`;
})();

/**
 * PENDIENTE: hay un segundo correo, jonatanarlantcortes14@gmail.com, que
 * puede añadirse como entrada aparte si se quiere publicarlo también.
 */
export const contacto: Contacto[] = [
  {
    label: 'Correo',
    valor: datosContacto.email,
    href: correoUrl,
    descripcion: 'La forma más rápida de contactarme.',
    icono: 'Mail',
    destacado: true,
  },
  {
    label: 'GitHub',
    valor: datosContacto.githubUsername,
    href: datosContacto.githubUrl,
    descripcion: 'Mis proyectos y código.',
    icono: 'Github',
  },
  {
    label: 'LinkedIn',
    valor: 'Rafael Arlant',
    href: datosContacto.linkedinUrl,
    descripcion: 'Perfil profesional.',
    icono: 'Linkedin',
  },
  {
    label: 'WhatsApp',
    valor: whatsappDisplay,
    href: whatsappUrl ?? '#contacto',
    descripcion: 'Hablemos directamente.',
    icono: 'Whatsapp',
  },
];

/**
 * Certificaciones y cursos.
 *
 * La sección Certificaciones está siempre en la página: el usuario quiere el
 * hueco reservado y rellenarlo después. Con este array vacío se muestra un
 * aviso en lugar de tarjetas (src/components/Certificaciones.astro).
 *
 * PENDIENTE: queda sin cargar `certificado-jonatan-rafael-arlant-cortes.pdf`
 * (el PDF es una imagen sin texto); falta el nombre del curso, la institución
 * y el año. Los dos de Coursera ya están cargados con los datos leídos del
 * propio PDF, que es la fuente real.
 */
export interface Certificacion {
  /** Nombre del curso o de la certificación, tal como aparece en el diploma. */
  titulo: string;
  /** Quién la emite: institución, plataforma o empresa. */
  institucion: string;
  /** Año de obtención. Si falta, la tarjeta no pinta el año. */
  anio?: string;
  /**
   * Dónde se ve el certificado. Dos formatos y el componente los distingue:
   *   · `https://...` → enlace externo, se abre en pestaña nueva.
   *   · `certificados/archivo.pdf` → archivo dentro de `public/`, y la ruta
   *     se antepone con `withBase()` para que no dé 404 en GitHub Pages.
   * Si falta, la tarjeta sale sin botón.
   */
  url?: string;
}

export const certificaciones: Certificacion[] = [
  {
    titulo: 'Apropiación de los conceptos en ciberseguridad',
    institucion: 'SENA',
    anio: '2026',
    url: 'certificados/apropiacion-conceptos-ciberseguridad.pdf',
  },
  {
    titulo: 'Trámites legales para la constitución de una empresa',
    institucion: 'SENA',
    anio: '2026',
    url: 'certificados/tramites-legales-constitucion-empresa.pdf',
  },
  {
    titulo: 'Desarrollo web con PHP',
    institucion: 'SENA',
    anio: '2026',
    url: 'certificados/desarrollo-web-php.pdf',
  },
  {
    titulo: 'Transformación de datos en modelos de inteligencia artificial',
    institucion: 'SENA',
    anio: '2025',
    url: 'certificados/transformacion-datos-modelos-ia.pdf',
  },
  {
    titulo: 'Aplicación de herramientas del procesador de texto Microsoft Word',
    institucion: 'SENA',
    anio: '2025',
    url: 'certificados/aplicacion-herramientas-microsoft-word.pdf',
  },
  {
    titulo: 'Cómo resolver problemas y tomar decisiones con eficacia',
    institucion: 'University of California, Irvine (Coursera)',
    anio: '2025',
    url: 'certificados/como-resolver-problemas-y-tomar-decisiones.pdf',
  },
  {
    titulo: 'Blockchain en criptomonedas',
    institucion: 'SENA',
    anio: '2025',
    url: 'certificados/blockchain-en-criptomonedas.pdf',
  },
  {
    titulo: 'Procesos de soporte técnico para el mantenimiento de equipos de cómputo',
    institucion: 'SENA',
    anio: '2025',
    url: 'certificados/procesos-soporte-tecnico-mantenimiento-equipos.pdf',
  },
  {
    titulo: 'Controles y seguridad informática',
    institucion: 'SENA',
    anio: '2025',
    url: 'certificados/controles-seguridad-informatica.pdf',
  },
  {
    titulo: 'AutoCAD 3D',
    institucion: 'SENA',
    anio: '2025',
    url: 'certificados/autocad-3d.pdf',
  },
  {
    titulo: 'Elaboración del presupuesto para el manejo de las finanzas personales',
    institucion: 'SENA',
    anio: '2025',
    url: 'certificados/elaboracion-presupuesto-finanzas-personales.pdf',
  },
  {
    titulo: 'AutoCAD 2D',
    institucion: 'SENA',
    anio: '2025',
    url: 'certificados/autocad-2d.pdf',
  },
  {
    titulo: 'Aspectos básicos: Datos, datos, en todas partes',
    institucion: 'Google (Coursera)',
    anio: '2025',
    url: 'certificados/datos-datos-en-todas-partes.pdf',
  },
  // Queda una ficha en `public/certificados/`
  // (certificado-jonatan-rafael-arlant-cortes.pdf) sin entrada: el PDF es una
  // imagen y no se puede leer el curso; falta el dato real. No se inventa.
];

/**
 * Servicios que ofrece, en modo reducido (D37).
 *
 * El objetivo principal del portafolio es conseguir empleo o prácticas, no
 * clientes, así que la sección es corta y se presenta como "qué sé hacer", no
 * como un catálogo de agencia. Las descripciones son las que propuso el
 * usuario en la guía de portafolio; los iconos son de `lucide-astro`.
 */
export interface Servicio {
  titulo: string;
  descripcion: string;
  /** Icono de `lucide-astro`. Solo existen los seis mapeados en
   *  `Servicios.astro`; no se añade uno nuevo sin mapearlo allí. */
  icono: 'Globe' | 'Code' | 'Database' | 'Workflow' | 'Wrench' | 'ShieldCheck';
}

export const servicios: Servicio[] = [
  {
    titulo: 'Desarrollo web',
    descripcion: 'Sitios modernos y responsivos.',
    icono: 'Globe',
  },
  {
    titulo: 'Desarrollo de software',
    descripcion: 'Aplicaciones y sistemas personalizados.',
    icono: 'Code',
  },
  {
    titulo: 'Bases de datos',
    descripcion: 'Diseño y gestión de bases de datos.',
    icono: 'Database',
  },
  {
    titulo: 'Automatización',
    descripcion: 'Automatización de tareas y procesos.',
    icono: 'Workflow',
  },
  {
    titulo: 'Mantenimiento',
    descripcion: 'Corrección y mejora de sistemas existentes.',
    icono: 'Wrench',
  },
  {
    titulo: 'Ciberseguridad',
    descripcion: 'Respaldo, actualizaciones, contraseñas y buenas prácticas.',
    icono: 'ShieldCheck',
  },
];

/**
 * Proceso de trabajo (guía 24). Siete pasos de cómo se desarrolla una
 * solución. Son descripciones del proceso, no logros: no se inventa nada.
 */
export interface PasoProceso {
  numero: string;
  titulo: string;
  detalle: string;
}

export const proceso: PasoProceso[] = [
  { numero: '01', titulo: 'Entender', detalle: 'Clarificar qué problema resuelve y qué debe hacer.' },
  { numero: '02', titulo: 'Investigar', detalle: 'Reunir lo que ya se sabe y las herramientas a usar.' },
  { numero: '03', titulo: 'Diseñar', detalle: 'Definir la estructura, los datos y las pantallas antes del código.' },
  { numero: '04', titulo: 'Desarrollar', detalle: 'Construir la solución por partes, con versiones controladas.' },
  { numero: '05', titulo: 'Probar', detalle: 'Verificar que cada función cumple lo que promete.' },
  { numero: '06', titulo: 'Mejorar', detalle: 'Corregir lo que falle y pulir la experiencia.' },
  { numero: '07', titulo: 'Publicar', detalle: 'Dejar la solución en funcionamiento y disponible.' },
];

/**
 * Idiomas (guía 27). Nivel honesto y con fuente: el B1 lo confirma el usuario
 * "según el IFEC". Si algún día hay un certificado a la mano, se actualiza.
 */
export const idiomas = [
  { idioma: 'Español', nivel: 'Nativo' },
  { idioma: 'Inglés', nivel: 'B1 · IFEC, mejorando' },
] as const;

/**
 * Cifras de la sección Estadísticas (D38).
 *
 * La regla: solo números desprendidos de los datos reales de este archivo, o
 * confirmados por el usuario. Nada de "10+ proyectos" redondeado hacia arriba:
 * si el dato no existe, no se muestra.
 *  · proyectos: `proyectos.length` (2) + `robotica.proyectos.length` (1) = 3.
 *  · añosRobotica: los 6 que ya afirma el subtítulo de `robotica`.
 *  · tecnologiasYHerramientas: los items del stack con `categoria`
 *    'tecnologia', 'herramienta' o 'base-de-datos' (D41). Quedan fuera las
 *    plataformas y los asistentes de IA: son 24 de los 37 que muestra
 *    la marquesina.
 *  · certificaciones: `certificaciones.length` = 13.
 */
export const estadisticas = {
  proyectos: proyectos.length + robotica.proyectos.length,
  añosRobotica: 6,
  tecnologiasYHerramientas: stack.filter(
    (t) =>
      t.categoria === 'tecnologia' ||
      t.categoria === 'herramienta' ||
      t.categoria === 'base-de-datos',
  ).length,
  certificaciones: certificaciones.length,
} as const;

export const años = String(new Date().getFullYear());
