# CLAUDE.md

Guía para trabajar en el código de **Centro Empaque** (web institucional + catálogo + asesor de empaques con IA "Empaquecito"). Este archivo se carga automáticamente en cada sesión.

## Stack técnico

- **Astro 4.15**, salida **100% estática** (sin adaptador ni `output: 'hybrid'` desde 2026-09-24).
- **CSS puro con custom properties** — sin Tailwind ni frameworks de UI. Tokens en `src/styles/globals.css`.
- **Content Collections** (`astro:content`) para el catálogo — schema en `src/content/config.ts`, contenido en `src/content/productos/*.md`.
- **Decap CMS** (Git-based) en `public/admin/` — permite editar el catálogo sin tocar código ni necesitar cuenta externa.
- **API de Anthropic (Claude)** vía Netlify Function v2 propia `netlify/functions/empaquecito.js` (ruta pública `/api/empaquecito`, `fetch` directo sin SDK), usa `process.env.ANTHROPIC_API_KEY`.
- **Deploy**: GitHub → Netlify, autodeploy en cada `git push` a `main` (config en `netlify.toml`).
- Tipografía **Gontserrat** local en `.woff2` (`public/fonts/gontserrat/`) — sin dependencia de Google Fonts.

## Estructura general

```
src/pages/           index, catalogo, nosotros, contacto, kits
src/components/      Header, Footer, ProductCard, WhatsAppButton,
                     AsesorIA          → chat de IA embebido en una página
                     EmpaquecitoBubble → chat flotante global (se monta vía Layout.astro)
src/layouts/         Layout.astro — tokens de marca + monta EmpaquecitoBubble en todas las páginas
src/data/sitio.js    datos del negocio (hoy: WA_NUMBER) — única fuente de verdad
src/content/         productos/ — 8 productos en Markdown
netlify/functions/   empaquecito.js — backend del asistente (Netlify Function v2)
public/admin/        Decap CMS (config.yml + index.html)
public/fonts/        Gontserrat en woff2
```

## Convenciones y cosas que NO se deben tocar sin avisar

- **No crear `KitBuilder.astro`** — decisión tomada a propósito: la lógica de `/kits` vive en `kits.astro` + `window.Empaquecito.openWithContext()` dentro de `EmpaquecitoBubble.astro`.
- **No reintroducir Google Fonts** — Gontserrat está servida local en woff2 por performance y privacidad.
- **Reusar los design tokens** de `src/styles/globals.css` (`--color-primary`, `--color-secondary`, `--color-accent`, `--color-bg`, `--font-display`, etc.) — no hardcodear colores nuevos en componentes.
- **`WA_NUMBER` vive solo en `src/data/sitio.js`** (unificado 2026-09-24) — todos los componentes y páginas lo importan de ahí; no volver a escribirlo suelto en ningún archivo. El valor actual (`59898024132`) es un **placeholder**: el cliente todavía no aprobó el proyecto ni confirmó su número. Cuando lo confirme, se cambia esa única línea. **`59899474094` es el número personal de NH** (quedó de las pruebas) — no usarlo en este proyecto.
- **Protección de `/api/empaquecito`** (2026-09-24): `netlify/functions/empaquecito.js` valida `Origin`/`Referer` (dominio real + `*.netlify.app` + localhost; al conectar el dominio real hay que sumarlo a `ALLOWED_ORIGINS`), valida forma y largo del historial (últimos 20 mensajes, 2000 caracteres cada uno), devuelve errores genéricos y solo reenvía `content` al cliente. El rate limit es el nativo de Netlify (`config.rateLimit`: 15 consultas cada 180 s por IP) — no sacar ninguno de estos chequeos sin un reemplazo: la API key es de NH y el endpoint es público.
- **CMS elegido a propósito**: Decap CMS (Git-based, sin costo) — no migrar a otro CMS sin avisar.
- **`.env` nunca se commitea** (contiene `ANTHROPIC_API_KEY`, ya está en `.gitignore`).

## Comandos útiles

```bash
npm run dev       # http://localhost:4321, hot-reload — NO sirve la Netlify Function (el chat da error)
npm run build     # genera dist/ — correr antes de confiar en un deploy
npm run preview   # simula el build de producción localmente
npx netlify dev   # sitio + /api/empaquecito en local (lee ANTHROPIC_API_KEY de .env)
```

El rate limit nativo de Netlify no corre con `netlify dev`: solo se puede confirmar después de un deploy real.

Flujo diario: `git add` → `git commit` → `git push` (Netlify redeploya solo).

Convención de mensajes de commit:
```
feat: nueva funcionalidad
fix: corrección de un bug
style: cambio de estilos/CSS
content: actualización de textos o imágenes
data: cambio en el catálogo de productos
```

---

Ver [ROADMAP.md](ROADMAP.md) para estado actual y próximos pasos antes de empezar cualquier tarea nueva.
