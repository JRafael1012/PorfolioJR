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
     el mismo aunque se añadan más secciones plegables. `data-exp-open` permite
     indicar que un panel empiece abierto cuando el contenido lo requiera. */
  var expToggles = document.querySelectorAll('[data-exp-toggle]');

  expToggles.forEach(function (toggle) {
    var panel = document.getElementById(toggle.getAttribute('aria-controls'));
    var label = toggle.querySelector('[data-exp-toggle-label]');
    var cerrado = label ? label.textContent.trim() : '';

    if (!panel) return;

    /* `data-exp-css` deja que el CSS controle la visibilidad con
       `aria-expanded`, útil cuando el panel necesita una transición. El
       `hidden` inicial se retira una sola vez y después manda `visibility`,
       que también lo saca del tabulado y de los lectores de pantalla. */
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
            var imagen = layer.querySelector('.rob-collage__img');
            if (imagen) imagen.tabIndex = activo ? 0 : -1;
          });
          robActuales[casilla] = elegidos[casilla];
        });
      }, 5000);
    }
  }

  /* --- 7. Copiar correo o teléfono al portapapeles --- */
  var copyButtons = document.querySelectorAll('[data-copy-text]');
  var copyToast = document.querySelector('[data-copy-toast]');
  var copyToastMessage = copyToast && copyToast.querySelector('[data-copy-toast-message]');

  if (copyButtons.length && copyToast && copyToastMessage) {
    var copyToastTimer = 0;
    var copyToastHideTimer = 0;

    var showCopyToast = function (message, state) {
      window.clearTimeout(copyToastTimer);
      window.clearTimeout(copyToastHideTimer);
      copyToast.hidden = false;
      copyToast.dataset.state = state;
      copyToastMessage.textContent = message;
      copyToast.classList.remove('is-visible');
      window.requestAnimationFrame(function () {
        copyToast.classList.add('is-visible');
      });

      copyToastTimer = window.setTimeout(function () {
        copyToast.classList.remove('is-visible');
        copyToastHideTimer = window.setTimeout(function () {
          copyToast.hidden = true;
        }, 200);
      }, 2500);
    };

    copyButtons.forEach(function (button) {
      button.addEventListener('click', async function () {
        var value = button.getAttribute('data-copy-text');

        if (!value) {
          console.error('No hay un dato de contacto para copiar.');
          showCopyToast('No se pudo copiar este dato.', 'error');
          return;
        }

        try {
          await navigator.clipboard.writeText(value);
          showCopyToast('Copiado al portapapeles', 'success');
        } catch (error) {
          console.error('No se pudo copiar el dato al portapapeles.', error);
          showCopyToast('No se pudo copiar. Revisa los permisos del navegador.', 'error');
        }
      });
    });
  } else if (copyButtons.length) {
    console.error('Falta el contenedor de notificaciones para los botones de copia.');
  }

  /* --- 8. Lightbox accesible para la galería de robótica --- */
  var robLightbox = document.querySelector('[data-rob-lightbox]');

  if (robCollage && robLightbox) {
    document.body.appendChild(robLightbox);

    var lightboxImage = robLightbox.querySelector('[data-rob-lightbox-image]');
    var lightboxCaption = robLightbox.querySelector('[data-rob-lightbox-caption]');
    var lightboxClose = robLightbox.querySelector('[data-rob-lightbox-close]');

    if (lightboxImage && lightboxCaption && lightboxClose) {
      var closeRobLightbox = function () {
        if (robLightbox.open) robLightbox.close();
      };

      var openRobLightbox = function (image) {
        lightboxImage.src = image.currentSrc || image.src;
        lightboxImage.alt = image.alt;
        lightboxCaption.textContent = image.alt;
        robLightbox.showModal();
      };

      var imageFromEvent = function (event) {
        if (!(event.target instanceof Element)) return null;
        var image = event.target.closest('.rob-collage__img');
        if (!image || !robCollage.contains(image)) return null;
        if (!image.closest('.rob-collage__layer.is-active')) return null;
        return image;
      };

      robCollage.addEventListener('click', function (event) {
        var image = imageFromEvent(event);
        if (image) openRobLightbox(image);
      });

      robCollage.addEventListener('keydown', function (event) {
        if (event.key !== 'Enter' && event.key !== ' ') return;
        var image = imageFromEvent(event);
        if (!image) return;
        event.preventDefault();
        openRobLightbox(image);
      });

      lightboxClose.addEventListener('click', closeRobLightbox);
      robLightbox.addEventListener('click', function (event) {
        if (event.target === robLightbox) closeRobLightbox();
      });
    } else {
      console.error('Faltan elementos requeridos para el lightbox de Robótica.');
    }
  }

  /* --- 9. Progreso visual de la línea de trayectoria --- */
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

  var projectCarousel = document.querySelector('[data-project-carousel]');

  if (projectCarousel) {
    var carouselTrack = projectCarousel.querySelector('[data-carousel-track]');
    var carouselSlides = Array.prototype.slice.call(
      projectCarousel.querySelectorAll('[data-carousel-slide]')
    );
    var carouselPrev = projectCarousel.querySelector('[data-carousel-prev]');
    var carouselNext = projectCarousel.querySelector('[data-carousel-next]');
    var carouselCount = projectCarousel.querySelector('[data-carousel-count]');
    var carouselFrame = 0;
    var carouselIndex = 0;

    var centeredSlide = function () {
      if (!carouselTrack || !carouselSlides.length) return 0;
      var bounds = carouselTrack.getBoundingClientRect();
      var center = bounds.left + bounds.width / 2;
      var best = 0;
      var shortest = Infinity;

      carouselSlides.forEach(function (slide, i) {
        var rect = slide.getBoundingClientRect();
        var distance = Math.abs(rect.left + rect.width / 2 - center);
        if (distance < shortest) {
          shortest = distance;
          best = i;
        }
      });

      return best;
    };

    var paintCarousel = function () {
      carouselFrame = 0;
      if (!carouselTrack || !carouselSlides.length) return;

      var bounds = carouselTrack.getBoundingClientRect();
      var center = bounds.left + bounds.width / 2;
      var half = Math.max(bounds.width / 2, 1);
      var focused = document.activeElement;

      carouselSlides.forEach(function (slide) {
        var rect = slide.getBoundingClientRect();
        var distance = Math.abs(rect.left + rect.width / 2 - center) / half;
        var depth = Math.max(0, 1 - Math.min(distance, 1));
        if (slide.matches(':hover') || slide.contains(focused)) depth = 1;
        slide.style.setProperty('--depth', depth.toFixed(3));
        slide.dataset.depth = depth > 0.82 ? 'front' : depth > 0.4 ? 'mid' : 'back';
      });

      carouselIndex = centeredSlide();
      if (carouselCount) {
        carouselCount.textContent =
          String(carouselIndex + 1).padStart(2, '0') +
          ' / ' +
          String(carouselSlides.length).padStart(2, '0');
      }
      if (carouselPrev) carouselPrev.disabled = carouselIndex === 0;
      if (carouselNext) carouselNext.disabled = carouselIndex === carouselSlides.length - 1;
    };

    var requestCarouselPaint = function () {
      if (carouselFrame) return;
      carouselFrame = window.requestAnimationFrame(paintCarousel);
    };

    var goToSlide = function (index) {
      if (!carouselTrack || !carouselSlides.length) return;
      var target = Math.max(0, Math.min(carouselSlides.length - 1, index));
      var slide = carouselSlides[target];
      var bounds = carouselTrack.getBoundingClientRect();
      var rect = slide.getBoundingClientRect();
      var left =
        carouselTrack.scrollLeft +
        rect.left -
        bounds.left -
        (bounds.width - rect.width) / 2;
      carouselTrack.scrollTo({ left: left, behavior: reduceMotion ? 'auto' : 'smooth' });
      carouselIndex = target;
    };

    if (carouselTrack && carouselSlides.length) {
      carouselTrack.addEventListener('scroll', requestCarouselPaint, { passive: true });
      carouselTrack.addEventListener('pointerover', requestCarouselPaint);
      carouselTrack.addEventListener('pointerout', requestCarouselPaint);
      carouselTrack.addEventListener('focusin', requestCarouselPaint);
      carouselTrack.addEventListener('focusout', requestCarouselPaint);
      carouselTrack.addEventListener('keydown', function (event) {
        if (event.key === 'ArrowRight') {
          event.preventDefault();
          goToSlide(carouselIndex + 1);
        } else if (event.key === 'ArrowLeft') {
          event.preventDefault();
          goToSlide(carouselIndex - 1);
        } else if (event.key === 'Home') {
          event.preventDefault();
          goToSlide(0);
        } else if (event.key === 'End') {
          event.preventDefault();
          goToSlide(carouselSlides.length - 1);
        }
      });
      if (carouselPrev) {
        carouselPrev.addEventListener('click', function () {
          goToSlide(carouselIndex - 1);
        });
      }
      if (carouselNext) {
        carouselNext.addEventListener('click', function () {
          goToSlide(carouselIndex + 1);
        });
      }
      window.addEventListener('resize', requestCarouselPaint);
      requestCarouselPaint();
    }
  }

  document.querySelectorAll('[data-project-more-toggle]').forEach(function (button) {
    var more = button.closest('[data-project-more]');
    var inner = button.parentElement.querySelector('[data-project-more-inner]');
    if (!more || !inner) return;

    var label = button.querySelector('[data-project-more-label]');
    var icon = button.querySelector('[data-project-more-icon]');

    var setExpanded = function (expanded) {
      more.dataset.expanded = String(expanded);
      button.setAttribute('aria-expanded', String(expanded));
      inner.inert = !expanded;
      inner.setAttribute('aria-hidden', String(!expanded));
      if (label) label.textContent = expanded ? 'Ver menos' : 'Ver detalles';
      if (icon) icon.textContent = expanded ? '−' : '+';
    };

    setExpanded(false);
    button.addEventListener('click', function () {
      setExpanded(button.getAttribute('aria-expanded') !== 'true');
    });
  });

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
