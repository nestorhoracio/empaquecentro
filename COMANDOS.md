# ⌨️ COMANDOS DE TERMINAL — Centro Empaque
> Flujo completo: local → GitHub → Netlify

---

## 1. PRIMERA VEZ — Iniciar el proyecto

```bash
# Clonar/mover los archivos a tu máquina y entrar a la carpeta
cd empaquecentro

# Instalar dependencias (solo la primera vez)
npm install

# Arrancar el servidor de desarrollo local
npm run dev
```

El sitio queda disponible en → **http://localhost:4321**

> Hot-reload activo: cada vez que guardás un archivo, el navegador se actualiza solo.

---

## 2. COMANDOS DIARIOS

```bash
# Iniciar el servidor local (cada vez que abrís el proyecto)
npm run dev

# Verificar que el build funciona antes de subir
npm run build

# Vista previa del build (simula cómo queda en Netlify)
npm run preview
```

> `build` genera la carpeta `dist/`. Si no da errores, está listo para deploy.

---

## 3. SETUP DE GIT (solo la primera vez)

```bash
# Inicializar el repositorio Git en el proyecto
git init

# Agregar todos los archivos al staging
git add .

# Primer commit
git commit -m "feat: estructura inicial del proyecto Centro Empaque"

# Nombrar la rama principal 'main'
git branch -M main
```

---

## 4. CONECTAR CON GITHUB

### En el navegador:
1. Ir a **github.com** → Iniciar sesión
2. Click en **"New repository"**
3. Nombre del repo: `empaquecentro`
4. Dejarlo en **Public** (Netlify lo lee gratis así)
5. **No** tildar "Add README" (ya tenemos archivos)
6. Click **"Create repository"**
7. GitHub te muestra la URL del repo, copiarla (ej: `https://github.com/tuusuario/empaquecentro.git`)

### De vuelta en la terminal:
```bash
# Conectar tu repositorio local con GitHub
git remote add origin https://github.com/TUUSUARIO/empaquecentro.git

# Subir el código por primera vez
git push -u origin main
```

---

## 5. CONECTAR NETLIFY CON GITHUB (deploy automático)

### En el navegador:
1. Ir a **netlify.com** → Iniciar sesión (o crear cuenta)
2. Click en **"Add new site"** → **"Import an existing project"**
3. Elegir **"Deploy with GitHub"**
4. Autorizar Netlify para acceder a tus repos de GitHub
5. Buscar y seleccionar **"empaquecentro"**
6. Configuración de build:
   - Build command: `npm run build`  ← ya está en `netlify.toml`, se autocompleta
   - Publish directory: `dist`       ← ídem
7. Click **"Deploy site"**

Netlify genera una URL tipo: `https://sparkly-dolphin-123.netlify.app`

> Cada vez que hagas `git push`, Netlify vuelve a deployar automáticamente. Sin hacer nada más.

---

## 6. FLUJO DE TRABAJO DIARIO

```bash
# 1. Hacer cambios en el código (editar archivos, agregar componentes, etc.)

# 2. Ver cómo queda en local
npm run dev   # → http://localhost:4321

# 3. Cuando estás conforme, agregar al staging
git add .

# 4. Commitear con un mensaje descriptivo
git commit -m "feat: agrego sección de kits al catálogo"

# 5. Subir a GitHub (Netlify deploy automático en ~1-2 min)
git push
```

---

## 7. MENSAJES DE COMMIT — Convención

```
feat: nueva funcionalidad
fix: corrección de un bug
style: cambio de estilos/CSS
content: actualización de textos o imágenes
data: cambio en productos.json
```

### Ejemplos:
```bash
git commit -m "feat: agrego componente AsesorIA"
git commit -m "content: actualizo textos del hero con los datos reales"
git commit -m "data: completo catálogo con los 20 productos"
git commit -m "fix: corrijo enlace de WhatsApp en el footer"
git commit -m "style: ajusto paleta de colores con el logo definitivo"
```

---

## 8. CAMBIAR LA URL DE NETLIFY POR UN DOMINIO PROPIO

Una vez que tienen el dominio (ej: `empaquecentro.uy`):

1. En Netlify → Site → **"Domain management"** → **"Add custom domain"**
2. Escribir el dominio
3. Netlify te da los DNS a configurar en el registrador del dominio
4. Actualizar en `astro.config.mjs`:
   ```js
   site: 'https://empaquecentro.uy'
   ```
5. Commitear y pushear:
   ```bash
   git add astro.config.mjs
   git commit -m "config: actualizo dominio en astro.config"
   git push
   ```

---

## 9. VARIABLES DE ENTORNO (para Fase 3 — IA)

Cuando integremos la API de Claude, el API key va en un archivo `.env`:

```bash
# Crear el archivo de variables (NO se sube a GitHub — está en .gitignore)
touch .env
```

Contenido del `.env`:
```
ANTHROPIC_API_KEY=sk-ant-xxxxxxxxx
```

En Netlify también hay que agregarlo:
→ Site → **"Environment variables"** → **"Add variable"**

---

## 10. COMANDOS ÚTILES EXTRA

```bash
# Ver el estado de los archivos modificados
git status

# Ver el historial de commits
git log --oneline

# Ver la URL del repositorio remoto conectado
git remote -v

# Si te equivocaste en el último commit (antes de pushear)
git commit --amend -m "mensaje corregido"

# Descartar cambios en un archivo específico (cuidado — no se puede deshacer)
git checkout -- src/components/Header.astro

# Ver en qué rama estás
git branch
```

---

## 🔑 DATOS PARA COMPLETAR ANTES DEL PRIMER `git push`

- [ ] Reemplazar `59899474094` con el número real de WhatsApp en:
  - `src/components/Header.astro`
  - `src/components/Footer.astro`
  - `src/components/WhatsAppButton.astro`
  - `src/components/ProductCard.astro`
  - `src/pages/index.astro`
  - `src/pages/catalogo.astro`
  - `src/pages/kits.astro`
  - `src/pages/contacto.astro`

- [ ] Agregar el logo real en `/public/logo.svg` y `/public/logo-white.svg`
- [ ] Subir las imágenes de productos en `/public/images/productos/`
- [ ] Completar dirección y horarios en `src/pages/contacto.astro`
- [ ] Actualizar `site` en `astro.config.mjs` con el dominio real cuando esté disponible

---

*Proyecto Centro Empaque — Mayo 2026*
