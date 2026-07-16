# CLAUDE.md

Guía para trabajar en el código de **Centro Empaque** (web institucional + catálogo + asesor de empaques con IA "Empaquecito"). Este archivo se carga automáticamente en cada sesión.

## Stack técnico

- **Astro 4.15**, `output: 'hybrid'` + adaptador `@astrojs/netlify` (`astro.config.mjs`).
- **CSS puro con custom properties** — sin Tailwind ni frameworks de UI. Tokens en `src/styles/globals.css`.
- **Content Collections** (`astro:content`) para el catálogo — schema en `src/content/config.ts`, contenido en `src/content/productos/*.md`.
- **Decap CMS** (Git-based) en `public/admin/` — permite editar el catálogo sin tocar código ni necesitar cuenta externa.
- **API de Anthropic (Claude)** vía endpoint propio `src/pages/api/empaquecito.ts`, usa `import.meta.env.ANTHROPIC_API_KEY`.
- **Deploy**: GitHub → Netlify, autodeploy en cada `git push` a `main` (config en `netlify.toml`).
- Tipografía **Gontserrat** local en `.woff2` (`public/fonts/gontserrat/`) — sin dependencia de Google Fonts.

## Estructura general

```
src/pages/           index, catalogo, nosotros, contacto, kits + api/empaquecito.ts
src/components/      Header, Footer, ProductCard, WhatsAppButton,
                     AsesorIA          → chat de IA embebido en una página
                     EmpaquecitoBubble → chat flotante global (se monta vía Layout.astro)
src/layouts/         Layout.astro — tokens de marca + monta EmpaquecitoBubble en todas las páginas
src/content/         productos/ — 8 productos en Markdown
public/admin/        Decap CMS (config.yml + index.html)
public/fonts/        Gontserrat en woff2
```

## Convenciones y cosas que NO se deben tocar sin avisar

- **No crear `KitBuilder.astro`** — decisión tomada a propósito: la lógica de `/kits` vive en `kits.astro` + `window.Empaquecito.openWithContext()` dentro de `EmpaquecitoBubble.astro`.
- **No reintroducir Google Fonts** — Gontserrat está servida local en woff2 por performance y privacidad.
- **Reusar los design tokens** de `src/styles/globals.css` (`--color-primary`, `--color-secondary`, `--color-accent`, `--color-bg`, `--font-display`, etc.) — no hardcodear colores nuevos en componentes.
- **`WA_NUMBER` está hardcodeado por componente** (no hay config central). ⚠️ Estado actual **inconsistente**: `kits.astro`, `EmpaquecitoBubble.astro` y `AsesorIA.astro` tienen el número real (`59899474094`); `Header.astro`, `Footer.astro`, `WhatsAppButton.astro`, `ProductCard.astro`, `index.astro` y `contacto.astro` todavía tienen el placeholder viejo (`59898024132`). Avisar antes de tocar esto en bloque — no asumir que ya está unificado.
- **CMS elegido a propósito**: Decap CMS (Git-based, sin costo) — no migrar a otro CMS sin avisar.
- **`.env` nunca se commitea** (contiene `ANTHROPIC_API_KEY`, ya está en `.gitignore`).

## Comandos útiles

```bash
npm run dev       # http://localhost:4321, hot-reload
npm run build     # genera dist/ — correr antes de confiar en un deploy
npm run preview   # simula el build de producción localmente
```

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
