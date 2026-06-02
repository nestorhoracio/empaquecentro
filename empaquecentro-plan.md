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
- Publicaciones regulares + activaciones por fechas clave: Día de la Madre ("Tu postre para mamá — presentalos así"), Pascua, cumpleaños, hogar
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

Esta es la pieza que convierte una web bonita en una **herramienta de ventas activa**.

### 1. Empaquecito — Asesor de Empaques con IA (hero feature)

🐾 **Empaquecito** es el nombre del asesor. Coincide con la mascota real de la marca, que usaremos como logo/avatar del chat. Esto lo hace parte natural de la identidad, no un widget genérico.

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

**Por qué funciona:** Las clientas de empaques frecuentemente no saben qué necesitan. Tener una guía 24/7 que las orienta y las manda directamente a comprar es un diferenciador sin competencia en el mercado local.

### 2. Filtro inteligente de catálogo

En vez de un buscador tradicional, el catálogo responde a lenguaje natural:

- *"Algo para tortas de cumpleaños"* → muestra cajas para pastelería + papel tissue
- *"Bolsa económica para ropa"* → muestra opciones con precio/calidad balance

**Técnica:** Astro + JSON de productos + llamada ligera a la API para clasificar la consulta.

### 3. Generador de Kits de Empaque

Herramienta que arma automáticamente un *"kit recomendado"* para distintos perfiles de emprendedora:

- Kit Repostería
- Kit Boutique de Ropa
- Kit Cosméticos Artesanales
- Kit Regalería

Cada kit muestra los productos y botón de consulta a WhatsApp. Al hacer clic en "Consultar con Empaquecito", el chat se abre con contexto precargado del kit pero **sin asumir el rubro** — Empaquecito pregunta para confirmar.

---

## 🏗️ Arquitectura del Sitio

```
/                   → Landing hero + propuesta de valor + acceso al Asesor IA
/catalogo           → Grid de productos con filtro inteligente
/kits               → Generador de kits por tipo de negocio
/nosotros           → Historia, dueña, confianza
/contacto           → WhatsApp + formulario + ubicación
```

### Componentes Astro

- `Layout.astro` — con tokens de marca (colores, tipografía)
- `Header.astro` — navegación + CTA WhatsApp sticky
- `ProductCard.astro` — imagen, nombre, usos sugeridos, CTA
- `AsesorIA.astro` — widget de chat embebido (usado fuera de /kits)
- `EmpaquecitoBubble.astro` — chat flotante presente en todas las páginas vía Layout
- `WhatsAppButton.astro` — flotante con mensaje contextual

> ℹ️ `KitBuilder.astro` no fue implementado como componente independiente.  
> La página `/kits` usa tarjetas estáticas + botones que invocan `window.Empaquecito.openWithContext()`.

---

## 🎨 Sistema de Diseño (extraído del Instagram)

```css
/* Tokens de marca — basados en identidad visual real de Centro Empaque */
--color-primary: #1B4FD8;     /* Azul institucional (uniformes, logo, fachada) */
--color-secondary: #2ECC71;   /* Verde (fachada del local) */
--color-accent: #F4C430;      /* Amarillo (destacados en videos, festivo) */
--color-bg: #E0F2F1;           /* Verde agua (paredes del local) — provisional hasta tener paleta oficial */
--color-bg-soft: #C8E6E4;      /* Verde agua más oscuro para secciones alternadas */
--color-text: #1A1A2E;         /* Texto oscuro */
--color-text-muted: #6B7280;   /* Texto secundario */
--font-heading: 'Poppins', sans-serif;
--font-body: 'Inter', sans-serif;
```

✅ Paleta extraída de las capturas — confirmar con los archivos originales del logo

---

## 📋 Plan de Trabajo por Fases

### Fase 0 — Relevamiento (antes de comenzar)

- [ ] Reunión con la dueña: cuestionario base (Drive: "cuestionario para clientes")
- [ ] Capturar: paleta de colores, tipografía percibida, tono de comunicación
- [ ] Fotografiar o recibir imágenes de productos en alta calidad
- [ ] Confirmar catálogo completo: categorías, nombres, precios (si se publican)
- [ ] Acordar dominio y hosting

### Fase 1 — Base y Sistema de Diseño ✅ COMPLETADA

- [x] Proyecto Astro inicializado
- [x] Estructura de carpetas: `layouts/`, `components/`, `styles/`, `assets/images/`
- [x] `globals.css` con tokens de diseño de la marca
- [x] `Layout.astro` con data-brand
- [x] `Header.astro` + `Footer.astro`
- [x] Rutas base funcionando: `/`, `/catalogo`, `/nosotros`, `/contacto`
- [x] Deploy en Netlify funcionando desde día 1

### Fase 2 — Catálogo y Contenido ✅ COMPLETADA

- [x] `ProductCard.astro` — componente reutilizable
- [x] Content Collections en `src/content/productos/` — 8 productos en `.md`
- [x] Página `/catalogo` con grid y filtros por categoría
- [x] Decap CMS operativo en `/admin`

### Fase 3 — IA y Funcionalidades Inteligentes ✅ COMPLETADA

- [x] `EmpaquecitoBubble.astro` — chat flotante en todas las páginas
- [x] `AsesorIA.astro` — chat embebido
- [x] Endpoint seguro `src/pages/api/empaquecito.ts`
- [x] `astro.config.mjs` — modo hybrid + adaptador Netlify
- [x] Prompt de Empaquecito calibrado con el catálogo real
- [x] Botón WhatsApp con mensaje prellenado ("Empaquecito me recomendó...")
- [x] Kits contextuales — botones invocan `window.Empaquecito.openWithContext()`
- [x] Escalada a humano — detecta frases clave y abre WhatsApp con historial resumido
- [x] Reset por inactividad — 5 minutos sin actividad reinicia el chat
- [x] `WA_NUMBER` unificado en cada componente (59899474094)
- [x] Bug del `catch` en `AsesorIA.astro` corregido (`data` fuera de scope)
- [ ] Avatar real de Empaquecito (mascota) en el chat — pendiente CM
- [ ] Test con usuarios reales una vez tengamos los assets

### Fase 4 — Pulido y Entrega

- [ ] Performance: score Lighthouse > 90
- [ ] Formulario de contacto o integración con WhatsApp Business API
- [ ] Capacitar a la dueña para actualizar el catálogo vía Decap CMS
- [ ] Documentación del proyecto en Drive (este .md)

### Fase 5 — Lanzamiento (después de aprobación de la cliente)

- [ ] SEO básico: meta tags, og:image, sitemap
- [ ] Configurar dominio propio
- [ ] Redirigir Netlify al dominio final
- [ ] Activar acceso CMS para la dueña (invitarla al panel)

---

## 💬 Argumentos para la Reunión con la Dueña

**Arrancar reconociendo lo que hacen bien:**

*"Sus videos están muy bien producidos — el equipo sale natural, el local se ve lleno y ordenado, y las campañas de fechas especiales son perfectas. Ya tienen el contenido. Lo que falta es el lugar donde ese contenido aterriza y convierte."*

**Por qué una web cambia el juego:**

- Sus Reels están funcionando — pero cuando alguien nuevo los ve y quiere saber precios, horarios o qué tienen, tiene que mandar un mensaje y esperar. La web responde eso sola, a las 3AM si hace falta
- Aparecen en Google Maps pero no en Google Search. Si alguien escribe "distribuidora empaques Uruguay" o "bolsas por mayor [ciudad]" → no aparecen. Con web, sí
- Sus 817 seguidores son los primeros visitantes garantizados el día del lanzamiento

**Por qué la IA no es un lujo sino una ventaja de ventas:**

- El cliente mayorista no quiere mandar un mensaje para saber precios. La web puede mostrar rangos de precio por cantidad o dejar que el asesor lo guíe
- Sus campañas de Día de la Madre, Pascua, Cumpleaños → la web puede tener secciones especiales que se activan por fecha, igual que lo hacen en Instagram pero con más detalle y sin depender del alcance orgánico

**El argumento emocional:**

*"Tienen un equipo que trabaja duro y un local hermoso. Eso merece vivir en algún lugar que no desaparezca cuando Instagram cambia el algoritmo."*

---

## 📦 Assets pendientes — Community Manager (cuñado)

Todo esto lo puede conseguir él sin necesitar una sesión de fotos nueva, ya lo tienen en los archivos de los Reels.

### Prioridad alta (para la demo)

- [ ] **Logo oficial** en SVG o PNG transparente — versión oscura y versión blanca
- [ ] **Foto del local** de frente o del interior con stock visible (hero de la home)
- [ ] **Foto del equipo** — la que usan en los Reels de presentación
- [ ] **Avatar de Empaquecito** — la mascota, recortada sin fondo, para el widget de IA

### Prioridad media (para completar catálogo)

- [ ] **Fotos de productos** — al menos 6-8 imágenes representativas, una por categoría
- [ ] **Paleta de colores oficial** — si tienen guía de marca o al menos el HEX del azul del logo
- [ ] **Horarios reales** del local
- [ ] **Dirección completa** y número de WhatsApp real

### Bonus (para diferenciar la demo)

- [ ] Un Reel corto para embeber en la sección "Como lo viste en Instagram"
- [ ] El nombre de la dueña para la sección Nosotros

---

## 💡 Ideas para capitalizar el contenido audiovisual

Tienen algo que muchas pymes no tienen: **contenido audiovisual de calidad**. La web debe capitalizar eso.

- **Sección "Inspiración"** → embed de sus Reels más vistos directamente en la web (Instagram oEmbed)
- **Campañas estacionales** → páginas de aterrizaje temporales: `/dia-de-la-madre`, `/pascua`, `/cumpleanos`
- **Feed de Instagram vivo** → la home puede mostrar sus últimas publicaciones con un widget
- **"Como lo viste en Instagram"** → sección que conecta los productos que aparecen en sus videos con las fichas del catálogo

### El diferencial de los uniformes y el equipo

Su marca tiene caras humanas reales. La sección "Nosotros" no puede ser un texto genérico — debe mostrar al equipo con las mismas personas que aparecen en los videos.

---

## 📝 Notas de Trabajo

### Estado actual (02/06/2026)

- ✅ Proyecto Astro en producción → `https://centroempaque.netlify.app`
- ✅ Empaquecito funcionando en producción con API de Anthropic
- ✅ Bubble flotante de Empaquecito en todas las páginas (bottom left)
- ✅ Logo SVG placeholder con identidad de Centro Empaque
- ✅ Fondo cálido (#EDE8DF) aplicado en todo el sitio
- ✅ 8 productos con imágenes placeholder y alt descriptivo
- ✅ WhatsApp real configurado (59899474094)
- ✅ Git Gateway activado y conectado al repo de GitHub
- ✅ Decap CMS operativo — panel `/admin` accesible y mostrando los 8 productos
- ✅ Netlify Identity — flujo de invitación resuelto definitivamente
- ✅ Kits contextuales — cada kit abre Empaquecito con mensaje precargado (sin asumir rubro)
- ✅ Escalada a humano — detecta frases y abre WhatsApp con historial resumido
- ✅ Reset por inactividad — 5 minutos sin actividad reinicia el chat
- ✅ Firma WhatsApp unificada: "Empaquecito me recomendó [producto]"
- ✅ Bug catch AsesorIA.astro corregido
- ✅ WA_NUMBER unificado en cada componente
- ⚠️ Reset de contraseña por email NO funciona en plan gratuito de Netlify (no bloqueante)
- ⏳ Assets reales del CM: logo, foto local, avatar Empaquecito, fotos productos
- ⏳ Activar acceso CMS para la dueña (invitarla — el flujo ya funciona)
- ⏳ SEO básico + Lighthouse

### Fix aplicado — Netlify Identity invite links (sesión 01/06/2026)

- Problema: el link de invitación llegaba al email apuntando a la raíz del sitio (`/#invite_token=...`), y la home ignoraba el token.
- Solución 1 — `src/layouts/Layout.astro`: script `is:inline` en el `<head>` que detecta `invite_token` o `recovery_token` en el hash y redirige a `/admin/index.html`.
- Solución 2 — `public/admin/index.html`: se agregó `netlify-identity-widget.js` en el `<head>`.

### Mejoras Empaquecito (sesión 02/06/2026)

- **Kits contextuales:** eliminado `<AsesorIA />` de `/kits`. Los botones de cada kit invocan `window.Empaquecito.openWithContext(msg)` — un solo chat, un solo historial.
- **Sin asumir rubro:** los `contextMsg` expresan interés en el kit y piden información, Empaquecito descubre el contexto preguntando.
- **Escalada a humano:** detecta palabras clave ("humano", "persona", "quiero hablar", etc.) → mensaje de transición → abre WhatsApp con los últimos 3 mensajes del usuario resumidos.
- **Reset por inactividad:** 5 minutos sin actividad → mensaje de despedida → limpia el chat → vuelve al saludo inicial.
- **Firma WA:** el mensaje siempre dice "Empaquecito me recomendó [producto]".
- **Bug corregido:** `data` fuera de scope en el `catch` de `AsesorIA.astro`.

### Pendientes para la reunión

- [ ] Nombre de la dueña
- [ ] Catálogo completo de productos con nombres exactos
- [ ] ¿Tienen precios públicos o solo por consulta?
- [ ] ¿Quieren distinguir la experiencia mayorista vs minorista en la web?
- [ ] Dominio: ¿ya tienen uno o hay que gestionarlo?
- [ ] ¿Tienen logo en alta resolución y archivos de marca?

### Decisiones técnicas tomadas

- CMS: Decap CMS (Git-based, zero-cost) — sin cuenta externa necesaria
- `WA_NUMBER` hardcodeado en cada componente que lo usa (no hay config centralizada en Astro sin SSR completo)
- `KitBuilder.astro` no implementado — la lógica vive en `kits.astro` + `EmpaquecitoBubble.astro`

---

*Documento creado: Mayo 2026 · Néstor + Claude*  
*Actualizado: 02/06/2026 — Kits contextuales, escalada a humano, reset inactividad, firma WA, bug fix catch. Pendiente: assets CM, SEO, Lighthouse.*  
*Próxima sesión: incorporar assets reales, SEO básico, Lighthouse*
