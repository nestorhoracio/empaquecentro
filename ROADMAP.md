# Roadmap — Centro Empaque

> Documento vivo — actualizar al final de cada sesión de trabajo.
> Última actualización: 2026-09-24

## Hecho

**Fase 1 — Base y Sistema de Diseño**
- Proyecto Astro inicializado, deploy en Netlify desde el día 1 (`https://centroempaque.netlify.app`)
- `globals.css` con design tokens, `Layout.astro` + `Header.astro` + `Footer.astro`
- Rutas base: `/`, `/catalogo`, `/nosotros`, `/contacto`
- Tipografía Gontserrat local (woff2) — Google Fonts eliminado
- `logo.svg` + `logo-white.svg` (SVGs vectoriales propios, recreados desde los assets del CM)

**Fase 2 — Catálogo y Contenido**
- `ProductCard.astro`
- Content Collections en `src/content/productos/` — 8 productos en `.md`
- Página `/catalogo` con grid y filtros por categoría
- Decap CMS operativo en `/admin`, Netlify Identity con flujo de invitación resuelto

**Fase 3 — IA y Funcionalidades Inteligentes**
- `EmpaquecitoBubble.astro` (chat flotante global) + `AsesorIA.astro` (chat embebido)
- Endpoint protegido `netlify/functions/empaquecito.js` (origen, validación, rate limit nativo), prompt calibrado con el catálogo real
- Botón de WhatsApp con mensaje prellenado
- Kits contextuales — `window.Empaquecito.openWithContext()`
- Escalada a humano (detecta frases clave, abre WhatsApp con historial resumido)
- Reset por inactividad (5 minutos)
- Bug del `catch` en `AsesorIA.astro` corregido

**Assets de marca**
- Logo SVG real implementado, `logo-white.svg` con esquinas redondeadas
- Fondo verde agua (`#E0F2F1`, paredes del local)

## En curso

- Avatar real de Empaquecito (mascota) — pendiente de que el CM entregue el asset
- Test con usuarios reales una vez estén los assets definitivos
- **Número de WhatsApp real del cliente**: hoy `src/data/sitio.js` tiene el placeholder `59898024132`. Se reemplaza esa única línea cuando el cliente apruebe y lo confirme.
- Conocido, no bloqueante: el reset de contraseña por email no funciona en el plan gratuito de Netlify Identity

## Próximo

1. **Fase 0 — Relevamiento** (bloqueante para catálogo real): reunión con la dueña — confirmar su nombre, catálogo completo con precios, si los precios son públicos o solo por consulta, si se distingue experiencia mayorista vs. minorista, y si ya tienen dominio propio o hay que gestionarlo
2. **Fase 4 — Pulido**: reemplazar imágenes placeholder por fotos reales (local, equipo, productos, avatar Empaquecito), performance (Lighthouse > 90), capacitar a la dueña en Decap CMS, formulario de contacto funcional
3. **Fase 5 — Lanzamiento**: SEO básico (meta tags, og:image, sitemap), configurar dominio propio, redirigir Netlify al dominio final, activar acceso CMS para la dueña
4. Presentar la propuesta formal (`propuesta-centroempaque.docx`, en Drive) a la dueña
5. Assets pendientes del Community Manager:
   - Prioridad alta: foto del local, foto del equipo, avatar de Empaquecito
   - Prioridad media: fotos de productos (6-8, una por categoría), horarios reales, dirección completa
   - Bonus: Reel corto para la home, nombre de la dueña para "Nosotros"

## Changelog

- **2026-09-24** — Endpoint de Empaquecito protegido: pasó de API route de Astro (`output: 'hybrid'` + `@astrojs/netlify`) a Netlify Function v2 con validación de origen, forma y largo del historial, errores genéricos y rate limit nativo; el sitio queda 100% estático. `WA_NUMBER` unificado en `src/data/sitio.js` (placeholder `59898024132`); se sacó el número personal de NH, que había quedado de las pruebas en `kits.astro`, `EmpaquecitoBubble.astro` y `AsesorIA.astro`. Verificado en producción el mismo día: chat respondiendo, origen ajeno bloqueado (403) y rate limit activo (429 después del umbral, con la demora de hasta 10 s que documenta Netlify).
- **2026-06-04** — Logo SVG real (paths vectoriales del original), `logo-white.svg` con esquinas redondeadas, fondo verde agua, SEO movido a Fase 5 (post-aprobación cliente + dominio)
- **2026-06-02** — Kits contextuales (se sacó `<AsesorIA />` de `/kits`), escalada a humano, reset por inactividad (5 min), bug del `catch` en `AsesorIA.astro` corregido
- **2026-06-01** — Fix de Netlify Identity: los links de invitación no respetaban el token; resuelto con redirect en `Layout.astro` + script del widget en `public/admin/index.html`
- **Mayo 2026** — Setup inicial (Astro + Netlify), sistema de diseño, catálogo vía Content Collections, Decap CMS, Empaquecito (chat con API de Anthropic) implementado, logo y tipografía Gontserrat definitivos, propuesta formal preparada

## Decisiones técnicas

- CMS: Decap CMS (Git-based, sin costo) — sin cuenta externa necesaria
- `KitBuilder.astro` no se implementó como componente — lógica en `kits.astro` + `EmpaquecitoBubble.astro`
- Tipografía servida en local (woff2) — sin dependencia externa, mejor performance y privacidad
- ~~`WA_NUMBER` hardcodeado por componente en vez de config central~~ — revertida el 2026-09-24 porque terminó con dos números distintos publicados a la vez: ahora vive solo en `src/data/sitio.js`
- **Asistente como Netlify Function v2, no API route de Astro** (2026-09-24) — el rate limit nativo de Netlify solo existe para Netlify Functions; de paso el sitio queda estático. Costo aceptado: `npm run dev` ya no sirve el chat, hace falta `netlify dev`
