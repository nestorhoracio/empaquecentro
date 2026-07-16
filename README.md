# Centro Empaque

Sitio web institucional + catálogo + asesor de empaques con IA para **Centro Empaque**, distribuidora de insumos para comercios (mayorista y minorista) en Uruguay.

Stack: [Astro](https://astro.build) + CSS Custom Properties · Deploy: GitHub + Netlify.

## Sobre el proyecto

Centro Empaque es una distribuidora física con local propio (venta por mayor y menor, delivery propio) cuyo único canal digital era Instagram (@empaquecentro). El objetivo de este sitio es darle presencia propia fuera del algoritmo de Instagram:

- Catálogo de productos navegable sin necesidad de seguir la cuenta
- Captación de leads por WhatsApp
- Un asesor con IA, **Empaquecito**, que diferencia al negocio de la competencia

### Empaquecito — asesor de empaques con IA

Chat embebido (construido sobre la API de Claude) que le hace unas preguntas simples al visitante (tipo de producto a empacar, volumen semanal, presupuesto, si necesita personalización) y devuelve los 2-3 productos del catálogo que más le convienen, con un botón directo a WhatsApp con el mensaje prellenado.

### Filtro inteligente de catálogo

El catálogo responde a lenguaje natural en vez de un buscador tradicional (ej. "algo para tortas de cumpleaños" → cajas de pastelería + papel tissue).

### Generador de kits

La página `/kits` arma kits recomendados por tipo de negocio (Repostería, Boutique de Ropa, Cosméticos Artesanales, Regalería) invocando a Empaquecito con contexto.

## Instalación y uso local

```bash
git clone <url-del-repo>
cd empaquecentro
npm install
npm run dev
```

El sitio queda disponible en `http://localhost:4321` con hot-reload.

Otros comandos:

```bash
npm run build     # genera dist/
npm run preview   # vista previa del build de producción
```

## Variables de entorno

El asesor Empaquecito necesita una API key de Anthropic. Crear un archivo `.env` en la raíz (no se sube a git, ya está en `.gitignore`):

```
ANTHROPIC_API_KEY=sk-ant-xxxxxxxxx
```

En Netlify: Site → **Environment variables** → **Add variable**.

## Deploy — Git, GitHub y Netlify desde cero

```bash
git init
git add .
git commit -m "feat: estructura inicial del proyecto Centro Empaque"
git branch -M main
```

1. En GitHub: crear un repositorio nuevo (público, sin "Add README"), copiar la URL.
2. Conectarlo y subir el código:
   ```bash
   git remote add origin https://github.com/TUUSUARIO/empaquecentro.git
   git push -u origin main
   ```
3. En Netlify: **Add new site** → **Import an existing project** → **Deploy with GitHub** → elegir el repo `empaquecentro`. El build command (`npm run build`) y el publish directory (`dist`) ya están definidos en `netlify.toml`.
4. Cada `git push` a `main` dispara un deploy automático en Netlify.

### Pasar a un dominio propio

1. En Netlify: Site → **Domain management** → **Add custom domain**.
2. Configurar los DNS que indique Netlify en el registrador del dominio.
3. Actualizar `site` en `astro.config.mjs` con el dominio final y hacer push.

---

Para el estado actual del proyecto, qué está pendiente y el historial de cambios, ver [ROADMAP.md](ROADMAP.md).
