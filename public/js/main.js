/**
 * Comportamiento del sitio. Sin dependencias.
 *
 * 1. Revela los bloques con `.reveal` al entrar en pantalla.
 * 2. Cuenta las cifras de `[data-count]` cuando entran en pantalla.
 * 3. Avanza fotos y collage, y dibuja la línea de la trayectoria.
 * 4. Despliega los paneles de competencias y torneos.
 * 5. Abre y cierra el menú móvil y salta a una sección compensando el header fijo.
 * 6. Encoge y oscurece el header al hacer scroll, y marca la sección activa.
 *
 * La pausa de las marquesinas ya no tiene botón (D43): la cinta de STACK corta
 * al pasar el puntero o al recibir foco. Las galerías de fotos siguen cambiando
 * para que sus imágenes sean visibles; con movimiento reducido, el cambio es
 * inmediato en vez de animarse.
 */
(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* Lo rellena el bloque de la línea de tiempo; sirve para recalcularla
     cuando la trayectoria se despliega y pasa a tener altura. */
  var refreshTimeline = null;

  /* --- 1. Revelado al hacer scroll --- */
  var targets = document.querySelectorAll('.reveal');

  if (!targets.length) {
    // nada que observar
  } else if (reduceMotion || !('IntersectionObserver' in window)) {
    targets.forEach(function (el) {
      el.classList.add('is-visible');
    });
  } else {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: '0px 0px -12% 0px', threshold: 0.12 }
    );

    targets.forEach(function (el) {
      observer.observe(el);
    });
  }

  /* --- 2. Cifras que cuentan solas ---
     Los `[data-count]` llevan el NÚMERO FINAL en el HTML, no un cero. Por eso
     esto es solo decoración: sin JS, sin scroll o con prefers-reduced-motion
     activado, el número correcto se ve siempre.

     `requestAnimationFrame` en vez de `setInterval` para que el número vaya
     atado al refresco de pantalla, y se corta en cuanto termina: un
     `setTimeout` suelto seguiría escribiendo en un nodo que ya no importa. */
  var contadores = document.querySelectorAll('[data-count]');

  function formatear(valor, sufijo) {
    return String(valor) + (sufijo || '');
  }

  function animarCifra(el) {
    var objetivo = Number(el.getAttribute('data-count'));
    if (!isFinite(objetivo) || objetivo <= 0) return;

    var sufijo = el.getAttribute('data-count-suffix') || '';
    var DURACION = 1100;

    /* `Math.pow(1 - progreso, 3)` es el "ease out": rápido al principio y
       frenando al final. Un contador lineal se nota como máquina, y este
       número es lo primero que ve el lector de esta sección. */
    var easeOutCubic = function (t) {
      return 1 - Math.pow(1 - t, 3);
    };

    var inicio = null;

    function paso(ahora) {
      if (inicio === null) inicio = ahora;

      var transcurrido = ahora - inicio;
      var progreso = Math.min(1, transcurrido / DURACION);

      el.textContent = formatear(
        Math.round(objetivo * easeOutCubic(progreso)),
        sufijo
      );

      if (progreso < 1) {
        requestAnimationFrame(paso);
      }
    }

    requestAnimationFrame(paso);
  }

  if (!contadores.length) {
    // no hay cifras en esta página
  } else if (reduceMotion || !('IntersectionObserver' in window)) {
    /* Sin animación: el HTML ya trae el valor final, no hay nada que hacer. */
  } else {
    var observerCifras = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          animarCifra(entry.target);
          observerCifras.unobserve(entry.target);
        });
      },
      /* rootMargin negativo por arriba: la cifra tiene que entrar de verdad en
         pantalla, no asomar por el borde. Con el 15% se dispara cuando ya se
         lee comfortablemente. */
      { rootMargin: '0px 0px -15% 0px', threshold: 0.15 }
    );

    contadores.forEach(function (el) {
      observerCifras.observe(el);
    });
  }

  /* --- 3. Cambio automático de fotografías del perfil --- */
  var photoFrame = document.querySelector('[data-photo-frame]');

  if (photoFrame) {
    var photos = Array.prototype.slice.call(photoFrame.querySelectorAll('.photo'));

    if (photos.length > 1) {
      var activePhoto = photos.findIndex(function (photo) {
        return photo.classList.contains('is-active');
      });
      if (activePhoto < 0) activePhoto = 0;

      window.setInterval(function () {
        photos[activePhoto].classList.remove('is-active');
        activePhoto = (activePhoto + 1) % photos.length;
        photos[activePhoto].classList.add('is-active');
      }, 15000);
    }
  }

  /* --- 4. Botón que despliega las competencias y torneos --- */
  /* Cada botón apunta a su panel con `aria-controls`, así que el bloque es
     el mismo aunque se añadan más secciones plegables. Con `data-exp-open`
     el panel empieza abierto, que es lo que necesita "Sobre mí" para que la
     primera respuesta se lea sin tocar nada. */
  var expToggles = document.querySelectorAll('[data-exp-toggle]');

  expToggles.forEach(function (toggle) {
    var panel = document.getElementById(toggle.getAttribute('aria-controls'));
    var label = toggle.querySelector('[data-exp-toggle-label]');
    var cerrado = label ? label.textContent.trim() : '';

    if (!panel) return;

    /* `data-exp-css`: el estado lo lleva el CSS leyendo `aria-expanded` en vez
       de `hidden`. Lo necesitan los paneles que se abren de lado, porque con
       `display: none` no hay nada que transicionar. El `hidden` del HTML se
       quita una sola vez —para quien llegue sin JavaScript— y a partir de ahí
       manda `visibility`, que sí saca el panel del tabulado y de los lectores
       de pantalla. El resto de paneles sigue igual que antes. */
    var usaCss = toggle.hasAttribute('data-exp-css');

    if (usaCss) {
      panel.hidden = false;
    }

    var setOpen = function (open) {
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');

      if (!usaCss) {
        panel.hidden = !open;
      }

      if (label) {
        label.textContent = open ? cerrado.replace(/^Ver/, 'Ocultar') : cerrado;
      }

      if (open && refreshTimeline) refreshTimeline();
    };

    toggle.addEventListener('click', function () {
      setOpen(toggle.getAttribute('aria-expanded') !== 'true');
    });

    setOpen(toggle.hasAttribute('data-exp-open'));
  });

  /* --- 5. Fotos del diploma y su entrega --- */
  /* Sin botones, como el collage: el avance es automático. La foto visible
     se marca con `is-active`, y `aria-hidden` evita que un lector de pantalla
     lea las dos fotos a la vez. */
  var credentialGallery = document.querySelector('[data-credential-gallery]');

  if (credentialGallery) {
    var credentialSlides = Array.prototype.slice.call(
      credentialGallery.querySelectorAll('[data-credential-slide]')
    );

    if (credentialSlides.length > 1) {
      window.setInterval(function () {
        var current = credentialSlides.findIndex(function (slide) {
          return slide.classList.contains('is-active');
        });

        if (current < 0) return;

        var next = (current + 1) % credentialSlides.length;
        credentialSlides[current].classList.remove('is-active');
        credentialSlides[current].setAttribute('aria-hidden', 'true');
        credentialSlides[next].classList.add('is-active');
        credentialSlides[next].setAttribute('aria-hidden', 'false');
      }, 5000);
    }
  }

  /* --- 6. Collage de fotos de robótica --- */
  /* Cuatro casillas enrejan el grupo de fotos: en cada turno cada casilla elige
     una foto aleatoria, nunca la que tiene ahora ni la que tienen las demás.
     Así no hay repetidos consecutivos ni dos fotos iguales juntas en pantalla.
     Cada casilla lleva dentro todas las capas y solo se ve la activa, para que
     el cambio sea un fundido y no un salto.

     Va solo, sin botones. Con movimiento reducido, el cambio es inmediato. */
  var robCollage = document.querySelector('[data-rob-collage]');

  if (robCollage) {
    var robTiles = Array.prototype.slice.call(
      robCollage.querySelectorAll('.rob-collage__tile')
    );
    var robLayersPorCasilla = robTiles.map(function (tile) {
      return Array.prototype.slice.call(tile.querySelectorAll('.rob-collage__layer'));
    });
    var robActuales = robLayersPorCasilla.map(function (layers) {
      var activo = -1;
      for (var i = 0; i < layers.length; i += 1) {
        if (layers[i].classList.contains('is-active')) {
          activo = i;
          break;
        }
      }
      return activo === -1 ? 0 : activo;
    });

    var robSrc = function (layer) {
      var img = layer.querySelector('img');
      return img ? img.currentSrc || img.src : '';
    };

    if (robLayersPorCasilla.length > 1 && robLayersPorCasilla.every(function (layers) {
      return layers.length > 1;
    })) {
      window.setInterval(function () {
        var actualesSrc = robActuales.map(function (indice, casilla) {
          return robSrc(robLayersPorCasilla[casilla][indice]);
        });
        var elegidos = [];
        var nuevosSrc = [];

        robTiles.forEach(function (_, casilla) {
          var layers = robLayersPorCasilla[casilla];
          var prohibidos = actualesSrc.filter(function (__, otra) {
            return otra !== casilla;
          }).concat(nuevosSrc, [actualesSrc[casilla]]);
          var vistos = {};
          var candidatos = [];

          layers.forEach(function (layer, indice) {
            var src = robSrc(layer);
            if (prohibidos.indexOf(src) !== -1 || vistos[src]) return;
            vistos[src] = true;
            candidatos.push(indice);
          });

          if (!candidatos.length) {
            candidatos = layers.map(function (_, indice) {
              return indice;
            }).filter(function (indice) {
              return indice !== robActuales[casilla];
            });
          }

          var elegido = candidatos.length
            ? candidatos[Math.floor(Math.random() * candidatos.length)]
            : robActuales[casilla];
          elegidos[casilla] = elegido;
          nuevosSrc[casilla] = robSrc(layers[elegido]);
        });

        robTiles.forEach(function (_, casilla) {
          robLayersPorCasilla[casilla].forEach(function (layer, indice) {
            var activo = indice === elegidos[casilla];
            layer.classList.toggle('is-active', activo);
            layer.setAttribute('aria-hidden', activo ? 'false' : 'true');
          });
          robActuales[casilla] = elegidos[casilla];
        });
      }, 5000);
    }
  }

  /* --- 7. Progreso visual de la línea de trayectoria --- */
  var timeline = document.querySelector('[data-timeline]');

  if (timeline && !reduceMotion) {
    var timelineFrame = 0;

    var updateTimelineProgress = function () {
      timelineFrame = 0;

      // Plegada no tiene altura: medirla daría una división por cero.
      if (!timeline.offsetHeight) return;

      var bounds = timeline.getBoundingClientRect();
      var marker = window.innerHeight * 0.58;
      var progress = (marker - bounds.top) / bounds.height;
      progress = Math.max(0, Math.min(1, progress));
      timeline.style.setProperty('--timeline-progress', String(progress));
    };

    var requestTimelineUpdate = function () {
      if (timelineFrame) return;
      timelineFrame = window.requestAnimationFrame(updateTimelineProgress);
    };

    refreshTimeline = requestTimelineUpdate;

    window.addEventListener('scroll', requestTimelineUpdate, { passive: true });
    window.addEventListener('resize', requestTimelineUpdate);
    requestTimelineUpdate();
  }

  var header = document.querySelector('.site-header');
  var navToggle = document.querySelector('[data-nav-toggle]');
  var navMenu = document.querySelector('[data-nav-menu]');

  var setMenu = function (abierto) {
    if (!header || !navToggle) return;
    header.classList.toggle('is-menu-open', abierto);
    navToggle.setAttribute('aria-expanded', String(abierto));
    navToggle.setAttribute('aria-label', abierto ? 'Cerrar menú' : 'Abrir menú');
  };

  if (header && navToggle && navMenu) {
    navToggle.addEventListener('click', function () {
      setMenu(!header.classList.contains('is-menu-open'));
    });

    navMenu.querySelectorAll('a[href^="#"]').forEach(function (link) {
      link.addEventListener('click', function () {
        setMenu(false);
      });
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') setMenu(false);
    });

    document.addEventListener('click', function (event) {
      if (!header.contains(event.target)) setMenu(false);
    });

    window.addEventListener('resize', function () {
      if (window.innerWidth > 1180) setMenu(false);
    });
  }

  /* --- 8. Compensación del header fijo al navegar por anclas --- */
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener('click', function (event) {
      var id = link.getAttribute('href');
      if (!id || id === '#') return;

      var target = document.querySelector(id);
      if (!target) return;

      event.preventDefault();
      target.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' });

      // Mantiene la URL sincronizada sin provocar un salto brusco.
      if (window.history.replaceState) {
        window.history.replaceState(null, '', id);
      }
    });
  });

  /* --- 9. Header al hacer scroll y sección activa del menú --- */
  /* Dos cosas que se calculan en el mismo pase de rAF para no pedirle al
     navegador dos veces el layout: el header se encoge y se vuelve opaco
     cuando hay desplazamiento (`.is-scrolled`), y el enlace del menú marca
     la sección que está leyendo el lector (`is-current` + `aria-current`).

     La "sección activa" es la última cuyo borde superior ya pasó el 35% de la
     altura de la ventana: al descolgar el 35% de un bloque, se asume que es
     el que se lee. Solo cuentan los enlaces internos (`a[href^="#"]`), así que
     GitHub y Hoja de vida (externos/archivo) nunca se marcan. */
  var navAnclas = [];
  document.querySelectorAll('.nav-links a[href^="#"]').forEach(function (link) {
    var objetivo = document.querySelector(link.getAttribute('href'));
    if (objetivo) navAnclas.push({ link: link, section: objetivo });
  });

  var headerFrame = 0;

  var updateHeaderState = function () {
    headerFrame = 0;

    var desplazado = window.scrollY > 8;
    if (header) header.classList.toggle('is-scrolled', desplazado);

    if (navAnclas.length) {
      var referencia = window.innerHeight * 0.35;
      var activo = null;

      for (var i = 0; i < navAnclas.length; i += 1) {
        if (navAnclas[i].section.getBoundingClientRect().top <= referencia) {
          activo = navAnclas[i];
        }
      }

      navAnclas.forEach(function (par) {
        var actual = par === activo;
        par.link.classList.toggle('is-current', actual);
        if (actual) {
          par.link.setAttribute('aria-current', 'true');
        } else {
          par.link.removeAttribute('aria-current');
        }
      });
    }
  };

  var requestHeaderState = function () {
    if (headerFrame) return;
    headerFrame = window.requestAnimationFrame(updateHeaderState);
  };

  window.addEventListener('scroll', requestHeaderState, { passive: true });
  window.addEventListener('resize', requestHeaderState);
  requestHeaderState();
})();
