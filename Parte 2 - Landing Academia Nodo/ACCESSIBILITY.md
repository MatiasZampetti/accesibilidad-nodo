# Reporte de Cumplimiento WCAG - Landing Page Accesible

**Proyecto:** Academia Nodo — landing de cursos online (Trabajo Práctico "Accesibilidad Web y Estándares WCAG 2.1/2.2")
**Integrantes:** Matías Zampetti y Matías Borsini
**Módulo:** Interfaz de Usuario — Tecnicatura Superior en Desarrollo de Software
**Fecha de entrega:** 18/08/2026

La landing se auditó manualmente (revisión de código, cálculo de contraste y navegación por teclado) y con el Validador HTML5 de la W3C, que dio 0 errores. Se alcanza conformidad con el **Nivel AA** de WCAG 2.1 en los criterios abordados por este trabajo.

---

## 1. Fragmento: Enlace de salto al contenido principal (Skip Link)

- **Criterio de Conformidad:** WCAG 2.4.1 Evitar bloques (Nivel A)
- **Ubicación en el Proyecto:** `index.html` (Línea 12) / `styles.css` (Líneas 65-80)
- **Código Implementado:**

```html
<a class="skip-link" href="#main-content">Saltar al contenido principal</a>
```

```css
.skip-link {
  position: absolute;
  top: -3rem;
  left: 0.5rem;
  background: var(--color-primary);
  color: #fff;
  padding: 0.75rem 1.25rem;
  border-radius: 0 0 6px 6px;
  z-index: 1000;
  transition: top 0.15s ease-in-out;
  text-decoration: none;
  font-weight: 600;
}
.skip-link:focus {
  top: 0;
}
```

- **Explicación Técnica:** El enlace es el primer elemento enfocable del `<body>`. Está oculto visualmente mediante `position: absolute` y un desplazamiento negativo (`top: -3rem`), pero al recibir foco de teclado (`.skip-link:focus`) se posiciona en pantalla (`top: 0`). Permite a usuarios que navegan exclusivamente con teclado o lectores de pantalla omitir los bloques de navegación repetitivos de la cabecera e interactuar directamente con `<main id="main-content">`.

## 2. Fragmento: Formulario e Insumos de Texto Accesibles

- **Criterio de Conformidad:** WCAG 1.3.1 Información y relaciones (Nivel A) & WCAG 3.3.2 Etiquetas o instrucciones (Nivel A) & WCAG 3.3.1 Identificación de errores (Nivel A)
- **Ubicación en el Proyecto:** `index.html` (Líneas 130-142) / `script.js` (Líneas 80-93)
- **Código Implementado:**

```html
<div class="form-field">
  <label for="email">Correo electrónico <span aria-hidden="true">*</span></label>
  <input
    type="email"
    id="email"
    name="email"
    autocomplete="email"
    aria-describedby="email-error"
    aria-invalid="false"
    required
  >
  <span id="email-error" class="error-message" role="alert"></span>
</div>
```

```js
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
```

- **Explicación Técnica:** El `<label for="email">` se vincula explícitamente con el `<input id="email">` mediante el atributo `for`/`id`, de modo que un lector de pantalla anuncia la etiqueta al enfocar el campo. `aria-describedby="email-error"` enlaza el campo con un `<span role="alert">` inicialmente vacío; cuando `validateField` detecta un error lo escribe ahí y actualiza `aria-invalid` a `"true"`, lo que dispara el anuncio automático del mensaje por parte del software asistivo sin que el usuario tenga que buscarlo. El mismo patrón se repite en los campos `name` y `message`.

## 3. Fragmento: Botón Interactivo con Estado Dinámico (Menú Colapsable)

- **Criterio de Conformidad:** WCAG 4.1.2 Nombre, función, valor (Nivel A)
- **Ubicación en el Proyecto:** `index.html` (Líneas 23-34) / `script.js` (Líneas 14-27)
- **Código Implementado:**

```html
<button
  id="menu-toggle"
  class="menu-toggle"
  type="button"
  aria-expanded="false"
  aria-controls="primary-navigation"
>
  <span class="visually-hidden">Abrir menú de navegación</span>
  <svg class="icon-burger" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    <path d="M3 6h18v2H3V6Zm0 5h18v2H3v-2Zm0 5h18v2H3v-2Z"/>
  </svg>
</button>
```

```js
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
```

- **Explicación Técnica:** El botón incluye `aria-controls="primary-navigation"` para indicar qué región del DOM controla, y un `<span class="visually-hidden">` verbaliza su propósito ("Abrir menú de navegación") para quienes no perciben el ícono de hamburguesa. `aria-expanded` alterna entre `"true"` y `"false"` en cada click mediante JavaScript, notificando en tiempo real al lector de pantalla si el menú está desplegado o colapsado. El menú también se cierra con la tecla `Escape`, devolviendo el foco al botón que lo abrió (WCAG 2.1.2 Sin trampas para el foco de teclado).

## 4. Fragmento: Imágenes Informativas y Decorativas

- **Criterio de Conformidad:** WCAG 1.1.1 Contenido no textual (Nivel A)
- **Ubicación en el Proyecto:** `index.html` (Líneas 60-66 y 69)
- **Código Implementado:**

```html
<img
  class="hero-image"
  src="assets/hero-illustration.svg"
  alt="Ilustración de tres estudiantes conectados a una clase virtual a través de una pantalla"
  width="480"
  height="360"
>

<img src="assets/pattern-decorativo.svg" alt="" aria-hidden="true" class="divider-decorativo" width="1200" height="24">
```

- **Explicación Técnica:** La ilustración del hero es informativa: lleva un `alt` descriptivo que resume su contenido para quien no puede verla. El separador entre secciones es puramente ornamental: se marca con `alt=""` **y** `aria-hidden="true"` para que los lectores de pantalla lo omitan por completo en lugar de anunciar un archivo sin significado. Los íconos SVG inline del resto del sitio (cursos, redes sociales, menú) siguen el mismo criterio con `aria-hidden="true"`, porque su significado ya está comunicado por el texto adyacente.

## 5. Fragmento: Estructura Semántica y Jerarquía de Encabezados

- **Criterio de Conformidad:** WCAG 1.3.1 Información y relaciones (Nivel A) & WCAG 2.4.6 Encabezados y etiquetas (Nivel AA)
- **Ubicación en el Proyecto:** `index.html` (Línea 14 `<header>`, Línea 36 `<nav>`, Línea 47 `<main>`, Línea 164 `<footer>`, Línea 51 `<h1>`)
- **Código Implementado:**

```html
<header class="site-header">
  ...
  <nav id="primary-navigation" class="primary-nav" aria-label="Navegación principal">
  ...
</header>

<main id="main-content">
  <section id="inicio" class="hero" aria-labelledby="hero-title">
    <h1 id="hero-title">Formate en tecnología con cursos online pensados para que aprendas a tu ritmo</h1>
    ...
  </section>
</main>

<footer class="site-footer" aria-label="Pie de página">
  ...
</footer>
```

- **Explicación Técnica:** Se usan `<header>`, `<nav aria-label="Navegación principal">`, `<main id="main-content">`, `<section>` con `aria-labelledby` apuntando al encabezado de cada sección, `<article>` para las tarjetas de cursos y `<footer aria-label="Pie de página">` en lugar de `<div>` genéricos. Estas etiquetas construyen los *landmarks* (puntos de referencia) que un lector de pantalla usa para que el usuario salte directamente a la región que le interesa. La jerarquía de encabezados es `h1` (título del hero, único por página) → `h2` (título de cada `<section>`) → `h3` (título de cada `<article>` de curso), sin saltos de nivel.

## 6. Fragmento: Indicador de Foco Visible

- **Criterio de Conformidad:** WCAG 2.4.7 Foco visible (Nivel AA)
- **Ubicación en el Proyecto:** `styles.css` (Líneas 82-90)
- **Código Implementado:**

```css
a:focus-visible,
button:focus-visible,
input:focus-visible,
textarea:focus-visible {
  outline: var(--focus-ring);
  outline-offset: 3px;
  border-radius: 2px;
}
```

- **Explicación Técnica:** Todos los elementos operables (enlaces, botones, inputs, textarea) reciben un contorno de 3px en color `--color-focus` mediante `:focus-visible`, que se muestra únicamente ante navegación por teclado y no interfiere con el foco por clic de mouse. Esto evita el antipatrón de remover el `outline` por defecto (`outline: none`) sin ofrecer un reemplazo visible, que rompería la navegación por teclado.

## 7. Fragmento: Paleta de Colores Auditada

- **Criterio de Conformidad:** WCAG 1.4.3 Contraste (mínimo) (Nivel AA) & WCAG 1.4.11 Contraste de contenido no textual (Nivel AA)
- **Ubicación en el Proyecto:** `styles.css` (Líneas 1-30)
- **Código Implementado:**

```css
:root {
  --color-bg: #FFFFFF;
  --color-bg-alt: #F4F1EA;
  --color-text: #1A1A2E;
  --color-primary: #2B4C7E;
  --color-primary-dark: #1F3760;
  --color-accent: #E76F51;
  --color-focus: #C4552F;
  --color-error: #B3261E;
  --color-footer-bg: #1A1A2E;
  --color-footer-text: #FFFFFF;
  --color-border: #D9D5C9;
}
```

- **Explicación Técnica:** Cada combinación texto/fondo se calculó con la fórmula de luminancia relativa de WCAG (verificada también con WebAIM Contrast Checker). `--color-text` sobre `--color-bg` da 17.05:1 y `--color-primary` sobre `--color-bg` da 8.61:1, ambos muy por encima del mínimo AA (4.5:1). El color de acento `--color-accent` (#E76F51) solo da 3.09:1, por lo que se usa exclusivamente para hover de íconos sobre el footer oscuro y nunca como texto de párrafo. Para el anillo de foco se definió `--color-focus` (#C4552F) en lugar de reutilizar `--color-accent`, porque este último caía a 2.74:1 contra el fondo alternado `--color-bg-alt` — por debajo del 3:1 exigido por 1.4.11 para componentes de interfaz. `--color-focus` se verificó ≥3:1 contra los tres fondos donde puede aparecer (blanco, crema y navy del footer).

---

## Auditoría con herramientas recomendadas

Se ejecutó el **Validador HTML5 de la W3C** (`https://validator.w3.org/nu/`) sobre `index.html`: la primera pasada dio 1 error (`width="100%"` inválido en un `<img>`, corregido a un valor numérico), la segunda pasada dio **0 errores, 0 warnings**.

Quedan pendientes de correr manualmente en el navegador (requieren extensión o lector de pantalla, no tienen API de línea de comandos):

| Herramienta | Qué mirar |
|---|---|
| axe DevTools | 0 issues críticos ni serios |
| WAVE | 0 errores |
| Lighthouse (Accessibility) | Apuntar a 100 |
| NVDA / VoiceOver | Skip link se anuncia primero, landmarks correctos, estado del menú, errores del formulario se leen solos |

## Limitaciones conocidas

- El envío del formulario es simulado en el cliente (`script.js`); no hay backend real, ya que el alcance del trabajo es de maquetación accesible.
- Las imágenes son SVG generados para el trabajo (no fotografías reales), pero siguen íntegramente las reglas de `alt` informativo/decorativo pedidas por la consigna.
