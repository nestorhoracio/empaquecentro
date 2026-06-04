# Centro Empaque · Plan de Proyecto Web con IA

Stack: Astro + CSS Custom Properties · Deploy: GitHub + Netlify  
Metodología: igual que 252 Plaza y proyectos anteriores  
Documento vivo — editar en cada sesión de trabajo

---

## 🏢 Perfil del Cliente

| Campo | Dato |
| :---- | :---- |
| **Marca** | Centro Empaque |
| **Handle IG** | @empaquecentro |
| **Categoría IG** | Producto/servicio — DISTRIBUIDORA |
| **Rubro** | Distribuidora de insumos para comercios — mayorista y minorista |
| **Público** | Comercios, emprendedores, reposteros, organizadores de eventos |
| **Canal principal actual** | Instagram (sin web propia detectada) |
| **Dueña** | A confirmar nombre en reunión inicial |
| **Ubicación** | Uruguay (confirmado por estilo de contenido y contexto regional) |
| **Seguidores** | 817 seguidores · 72 publicaciones |
| **Contacto en bio** | WhatsApp + Google Maps (local físico) |

### Lo que vemos en Instagram — Análisis real

**El negocio:**

- Distribuidora física con local bien establecido, estantería llena y amplio stock visible  
- Venta por mayor **y** menor — dos audiencias con necesidades distintas  
- Tienen servicio de delivery (foto con carrito/bicicleta de reparto)  
- Local con fachada propia, colores azul y verde institucionales

**El equipo:**

- Equipo joven y comprometido, todos uniformados con remera azul de Centro Empaque  
- Aparecen constantemente en los videos — son la cara de la marca  
- Celebran juntos cumpleaños, fechas especiales — cultura de equipo muy fuerte  
- Contenido protagonizado por personas reales = confianza y cercanía

**La comunicación:**

- Reels muy bien producidos y editados — calidad visual notable para una pyme  
- Publicaciones regulares + activaciones por fechas clave: Día de la Madre, Pascua, cumpleaños, hogar  
- Textos tipo "SE VE PERFECTO", "RENOVÁ TU HOGAR" — lenguaje aspiracional orientado al cliente final  
- Destacados en bio: **Ubicación, Contacto, Días y horarios** — organización correcta pero limitada

**Lo que falta (la oportunidad):**

- Sin web propia → dependen 100% del algoritmo de Instagram  
- No hay catálogo digital consultable sin seguir la cuenta  
- No hay sistema de cotización online para mayoristas  
- Sus videos excelentes no tienen donde "aterrizar" a un nuevo cliente

---

## 🎯 Objetivo del Proyecto

Crear una **web institucional + catálogo visual con IA integrada** en Astro, que le permita a Centro Empaque:

1. Existir fuera de Instagram (presencia propia, sin depender del algoritmo)  
2. Mostrar su catálogo de productos de forma profesional  
3. Captar leads vía WhatsApp con un sistema inteligente de consulta  
4. Diferenciarse de la competencia con un **asesor de empaques con IA** único en su nicho

---

## 🤖 La Propuesta de IA — La Ventaja Irresistible

### 1. Empaquecito — Asesor de Empaques con IA (hero feature)

🐾 **Empaquecito** es el nombre del asesor. Coincide con la mascota real de la marca, que usaremos como logo/avatar del chat.

Un chat embebido en la web construido sobre la API de Claude.  
El usuario responde 3-4 preguntas simples:

- ¿Qué tipo de producto vas a empacar? (comida, ropa, cosméticos, regalo…)  
- ¿Cuántas unidades aproximadas por semana?  
- ¿Qué presupuesto tenés por unidad?  
- ¿Necesitás personalización?

**El asesor devuelve:**

- Los 2-3 productos del catálogo que más le convienen  
- Por qué los recomienda  
- Botón directo a WhatsApp con el mensaje prellenado: *"Hola, Empaquecito me recomendó [producto X], ¿tienen disponibilidad?"*

### 2. Filtro inteligente de catálogo

En vez de un buscador tradicional, el catálogo responde a lenguaje natural:

- *"Algo para tortas de cumpleaños"* → muestra cajas para pastelería + papel tissue  
- *"Bolsa económica para ropa"* → muestra opciones con precio/calidad balance

### 3. Generador de Kits de Empaque

Herramienta que arma automáticamente un *"kit recomendado"* para distintos perfiles:

- Kit Repostería · Kit Boutique de Ropa · Kit Cosméticos Artesanales · Kit Regalería

---

## 🏗️ Arquitectura del Sitio

```
/             → Landing hero + propuesta de valor + acceso al Asesor IA
/catalogo     → Grid de productos con filtro inteligente
/kits         → Generador de kits por tipo de negocio
/nosotros     → Historia, dueña, confianza
/contacto     → WhatsApp + formulario + ubicación
```

### Componentes Astro

- `Layout.astro` — con tokens de marca (colores, tipografía)  
- `Header.astro` + `Footer.astro`  
- `ProductCard.astro` — imagen, nombre, usos sugeridos, CTA  
- `AsesorIA.astro` — widget de chat embebido  
- `EmpaquecitoBubble.astro` — chat flotante en todas las páginas vía Layout  
- `WhatsAppButton.astro` — flotante con mensaje contextual

ℹ️ `KitBuilder.astro` no fue implementado como componente independiente.  
La página `/kits` usa tarjetas estáticas + botones que invocan `window.Empaquecito.openWithContext()`.

---

## 🎨 Sistema de Diseño

```css
--color-primary:      #1648C8;   /* Azul institucional */
--color-primary-dark: #0F35A0;
--color-primary-soft: #EEF2FF;
--color-secondary:    #22C55E;   /* Verde fachada */
--color-accent:       #FACC15;   /* Amarillo CTAs */
--color-bg:           #E0F2F1;   /* Verde agua paredes */
--color-bg-soft:      #C8E6E4;
--color-bg-dark:      #0F172A;   /* Footer */
--font-display:       'Gontserrat', sans-serif;
--font-body:          'Gontserrat', sans-serif;
```

**Tipografía:** Gontserrat (Ospiro Enterprises · SIL OFL 1.1 · libre uso comercial)  
Implementada en local como `.woff2` en `public/fonts/gontserrat/` — sin dependencia de Google Fonts.

**Logo:** `logo.svg` (oval azul, fondo transparente) + `logo-white.svg` (oval relleno azul, texto blanco) — recreados vectorialmente desde los assets del CM.

---

## 📋 Plan de Trabajo por Fases

### Fase 0 — Relevamiento
- [ ] Reunión con la dueña: cuestionario base  
- [ ] Confirmar catálogo completo, precios, horarios, dirección  
- [ ] Acordar dominio y hosting  
- ✅ Assets de logo recibidos del CM e implementados

### Fase 1 — Base y Sistema de Diseño ✅ COMPLETADA
- [x] Proyecto Astro inicializado  
- [x] `globals.css` con tokens de diseño  
- [x] `Layout.astro` · `Header.astro` · `Footer.astro`  
- [x] Rutas base: `/`, `/catalogo`, `/nosotros`, `/contacto`  
- [x] Deploy en Netlify desde día 1  
- [x] **Tipografía Gontserrat local (woff2) — Google Fonts eliminado**  
- [x] **logo.svg + logo-white.svg implementados**

### Fase 2 — Catálogo y Contenido ✅ COMPLETADA
- [x] `ProductCard.astro`  
- [x] Content Collections en `src/content/productos/` — 8 productos en `.md`  
- [x] Página `/catalogo` con grid y filtros por categoría  
- [x] Decap CMS operativo en `/admin`

### Fase 3 — IA y Funcionalidades Inteligentes ✅ COMPLETADA
- [x] `EmpaquecitoBubble.astro` — chat flotante en todas las páginas  
- [x] `AsesorIA.astro` — chat embebido  
- [x] Endpoint seguro `src/pages/api/empaquecito.ts`  
- [x] `astro.config.mjs` — modo hybrid + adaptador Netlify  
- [x] Prompt de Empaquecito calibrado con el catálogo real  
- [x] Botón WhatsApp con mensaje prellenado  
- [x] Kits contextuales — `window.Empaquecito.openWithContext()`  
- [x] Escalada a humano — detecta frases clave y abre WhatsApp con historial  
- [x] Reset por inactividad — 5 minutos  
- [x] `WA_NUMBER` unificado (59899474094)  
- [x] Bug del `catch` en `AsesorIA.astro` corregido  
- [ ] Avatar real de Empaquecito (mascota) — pendiente CM  
- [ ] Test con usuarios reales una vez tengamos los assets

### Fase 4 — Pulido y Entrega
- [ ] Reemplazar todas las imágenes placeholder con fotos reales (CM)  
- [ ] Performance: score Lighthouse > 90  
- [ ] Capacitar a la dueña para actualizar el catálogo vía Decap CMS  
- [ ] Formulario de contacto funcional  
- [ ] Documentación del proyecto en Drive

### Fase 5 — Lanzamiento
- [ ] SEO básico: meta tags, og:image, sitemap  
- [ ] Configurar dominio propio  
- [ ] Redirigir Netlify al dominio final  
- [ ] Activar acceso CMS para la dueña

---

## 📄 Propuesta Formal

- Documento Word preparado: `propuesta-centroempaque.docx` (Drive)  
- Pendiente: presentar a la dueña en reunión formal

---

## 💬 Argumentos para la Reunión con la Dueña

**Arrancar reconociendo lo que hacen bien:**

*"Sus videos están muy bien producidos — el equipo sale natural, el local se ve lleno y ordenado, y las campañas de fechas especiales son perfectas. Ya tienen el contenido. Lo que falta es el lugar donde ese contenido aterriza y convierte."*

**Por qué una web cambia el juego:**

- Sus Reels están funcionando — pero cuando alguien nuevo los ve y quiere saber precios o qué tienen, tiene que mandar un mensaje y esperar. La web responde eso sola, a las 3AM si hace falta  
- Aparecen en Google Maps pero no en Google Search → con web, sí  
- Sus 817 seguidores son los primeros visitantes garantizados el día del lanzamiento

**Por qué la IA es una ventaja de ventas:**

- El cliente mayorista no quiere mandar un mensaje para saber precios — el asesor lo guía  
- Las campañas estacionales pueden tener páginas de aterrizaje propias sin depender del alcance orgánico

**El argumento emocional:**

*"Tienen un equipo que trabaja duro y un local hermoso. Eso merece vivir en algún lugar que no desaparezca cuando Instagram cambia el algoritmo."*

---

## 📦 Assets pendientes — Community Manager

### Prioridad alta
- [x] **Logo oficial** — SVG recreados: `logo.svg` + `logo-white.svg` ✅  
- [ ] **Foto del local** de frente o interior con stock visible (hero de la home)  
- [ ] **Foto del equipo** — la que usan en los Reels de presentación  
- [ ] **Avatar de Empaquecito** — mascota recortada sin fondo para el widget de IA

### Prioridad media
- [ ] **Fotos de productos** — al menos 6-8 imágenes, una por categoría  
- [ ] **Horarios reales** del local  
- [ ] **Dirección completa**

### Bonus
- [ ] Un Reel corto para embeber en sección "Como lo viste en Instagram"  
- [ ] El nombre de la dueña para la sección Nosotros

---

## 📝 Notas de Trabajo

### Estado actual (03/06/2026)

- ✅ Proyecto Astro en producción → `https://centroempaque.netlify.app`
- ✅ Empaquecito funcionando en producción con API de Anthropic
- ✅ Bubble flotante de Empaquecito en todas las páginas (bottom left)
- ✅ **logo.svg + logo-white.svg — SVGs vectoriales propios, fondo transparente / azul sólido**
- ✅ **Gontserrat local como woff2 — @font-face en global.css — sin Google Fonts**
- ✅ 8 productos con imágenes placeholder
- ✅ WhatsApp real configurado (59899474094)
- ✅ Decap CMS operativo — panel `/admin` accesible
- ✅ Netlify Identity — flujo de invitación resuelto
- ✅ Kits contextuales operativos
- ✅ Escalada a humano + reset por inactividad
- ✅ Propuesta formal preparada (propuesta-centroempaque.docx en Drive)
- ⚠️ Reset de contraseña por email NO funciona en plan gratuito de Netlify (no bloqueante)
- ⏳ Fotos reales: local, equipo, productos, avatar Empaquecito
- ⏳ Reunión con la dueña — presentar propuesta
- ⏳ SEO básico + Lighthouse

### Fix aplicado — Netlify Identity invite links (sesión 01/06/2026)

- Problema: link de invitación apuntaba a la raíz del sitio ignorando el token.  
- Solución 1 — `Layout.astro`: script `is:inline` en `<head>` que detecta `invite_token` o `recovery_token` y redirige a `/admin/index.html`.  
- Solución 2 — `public/admin/index.html`: se agregó `netlify-identity-widget.js` en el `<head>`.

### Mejoras Empaquecito (sesión 02/06/2026)

- Kits contextuales: eliminado `<AsesorIA />` de `/kits`. Los botones invocan `window.Empaquecito.openWithContext(msg)`.
- Sin asumir rubro: los `contextMsg` expresan interés, Empaquecito pregunta para confirmar.
- Escalada a humano: detecta palabras clave → abre WhatsApp con los últimos 3 mensajes resumidos.
- Reset por inactividad: 5 minutos → mensaje de despedida → limpia el chat.
- Bug corregido: `data` fuera de scope en el `catch` de `AsesorIA.astro`.

### Assets de marca (sesión 04/06/2026)

- Logo SVG real recibido (paths vectoriales del logo original, 1080x1080pt).
- `logo.svg`: fill cambiado a `#1648C8` (azul institucional del sistema de diseño).
- `logo-white.svg`: fondo azul `#1648C8` con esquinas redondeadas (`rx=110`), paths en blanco.
- Header: logo agrandado a 56px de alto.
- Fondo del sitio actualizado a verde agua `#E0F2F1` (paredes del local).
- SEO movido a Fase 5 (post-aprobación cliente + dominio propio).

### Assets de marca (sesión 03/06/2026)

- Logo recibido del CM: oval azul "CENTRO EMPAQUE / DISTRIBUIDORA" sobre fondo blanco.
- `logo.svg` recreado en SVG puro: oval + texto en azul `#3D3DAF`, fondo transparente.
- `logo-white.svg`: oval relleno azul sólido, texto y borde blancos.
- Tipografía identificada: **Gontserrat** (no Montserrat) — derivada de Montserrat con G mayúscula con barra horizontal. Licencia SIL OFL 1.1, libre uso comercial.
- Fuentes descargadas manualmente, convertidas a woff2 vía CloudConvert, implementadas en `public/fonts/gontserrat/`.
- `global.css` actualizado: `@import` de Google Fonts eliminado, `@font-face` locales, `--font-display` y `--font-body` apuntan a `'Gontserrat'`.

### Pendientes para la reunión con la dueña

- [ ] Nombre de la dueña  
- [ ] Catálogo completo con nombres exactos  
- [ ] ¿Precios públicos o solo por consulta?  
- [ ] ¿Distinguir experiencia mayorista vs minorista?  
- [ ] Dominio: ¿ya tienen uno o hay que gestionarlo?

### Decisiones técnicas tomadas

- CMS: Decap CMS (Git-based, zero-cost) — sin cuenta externa necesaria  
- `WA_NUMBER` hardcodeado en cada componente  
- `KitBuilder.astro` no implementado — lógica en `kits.astro` + `EmpaquecitoBubble.astro`
- Tipografía en local (woff2) — sin dependencia externa, mejor performance y privacidad

---

*Documento creado: Mayo 2026 · Néstor + Claude*  
*Actualizado: 03/06/2026 — Logo SVGs, Gontserrat local woff2, Google Fonts eliminado. Propuesta formal preparada. Pendiente: fotos reales CM, reunión dueña, SEO, Lighthouse.*
