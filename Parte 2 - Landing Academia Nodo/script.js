/* =========================================================
   ACADEMIA NODO — Interacciones accesibles
   1. Menú de navegación colapsable (aria-expanded)
   2. Validación accesible del formulario de contacto
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- 1. Menú colapsable ---------- */

  const menuToggle = document.getElementById('menu-toggle');
  const primaryNav = document.getElementById('primary-navigation');

  function closeMenu() {
    primaryNav.classList.remove('is-open');
    menuToggle.setAttribute('aria-expanded', 'false');
  }

  function openMenu() {
    primaryNav.classList.add('is-open');
    menuToggle.setAttribute('aria-expanded', 'true');
  }

  menuToggle.addEventListener('click', () => {
    const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
    isOpen ? closeMenu() : openMenu();
  });

  // Escape cierra el menú y devuelve el foco al botón (WCAG 2.1.2)
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && menuToggle.getAttribute('aria-expanded') === 'true') {
      closeMenu();
      menuToggle.focus();
    }
  });

  // En mobile, elegir un enlace cierra el menú
  primaryNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      if (window.matchMedia('(max-width: 720px)').matches) closeMenu();
    });
  });

  /* ---------- 2. Validación del formulario ---------- */

  const form = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');

  const fields = {
    name: {
      input: document.getElementById('name'),
      error: document.getElementById('name-error'),
      validate(value) {
        if (value.trim() === '') return 'Ingresá tu nombre completo.';
        if (value.trim().length < 3) return 'El nombre debe tener al menos 3 caracteres.';
        return '';
      }
    },
    email: {
      input: document.getElementById('email'),
      error: document.getElementById('email-error'),
      validate(value) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (value.trim() === '') return 'Ingresá tu correo electrónico.';
        if (!emailPattern.test(value.trim())) return 'Ingresá un correo electrónico válido, por ejemplo: nombre@dominio.com.';
        return '';
      }
    },
    message: {
      input: document.getElementById('message'),
      error: document.getElementById('message-error'),
      validate(value) {
        if (value.trim() === '') return 'Escribí tu mensaje.';
        if (value.trim().length < 10) return 'El mensaje debe tener al menos 10 caracteres.';
        return '';
      }
    }
  };

  function validateField(fieldKey) {
    const field = fields[fieldKey];
    const errorText = field.validate(field.input.value);

    if (errorText) {
      field.input.setAttribute('aria-invalid', 'true');
      field.error.textContent = errorText;
      return false;
    }

    field.input.setAttribute('aria-invalid', 'false');
    field.error.textContent = '';
    return true;
  }

  Object.keys(fields).forEach((fieldKey) => {
    const { input } = fields[fieldKey];
    input.addEventListener('blur', () => validateField(fieldKey));
    input.addEventListener('input', () => {
      if (input.getAttribute('aria-invalid') === 'true') validateField(fieldKey);
    });
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const results = Object.keys(fields).map((fieldKey) => validateField(fieldKey));
    const allValid = results.every(Boolean);

    if (!allValid) {
      formStatus.textContent = 'Revisá los campos marcados en rojo antes de enviar el formulario.';
      formStatus.className = 'form-status error';
      const firstInvalidKey = Object.keys(fields).find(
        (key) => fields[key].input.getAttribute('aria-invalid') === 'true'
      );
      if (firstInvalidKey) fields[firstInvalidKey].input.focus();
      return;
    }

    // Envío simulado: el alcance del TP es la maquetación accesible
    formStatus.textContent = '¡Gracias! Tu mensaje fue enviado correctamente. Te responderemos a la brevedad.';
    formStatus.className = 'form-status success';
    form.reset();
    Object.keys(fields).forEach((key) => fields[key].input.setAttribute('aria-invalid', 'false'));
  });

});
