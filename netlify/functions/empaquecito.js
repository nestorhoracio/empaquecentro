// netlify/functions/empaquecito.js
// Backend de Empaquecito (asesor de empaques con IA) — Netlify Functions v2.
// Mismo patrón de protección que barraca-hefesto: origen permitido, validación de forma y
// largo del historial, rate limit nativo de Netlify (ver `config` al final) y errores
// genéricos hacia afuera. Lo llaman AsesorIA.astro y EmpaquecitoBubble.astro.

const SYSTEM_PROMPT = `Sos Empaquecito, el asesor de empaques de Centro Empaque, una distribuidora uruguaya de insumos para comercios.
Tu personalidad: amigable, cercano, directo. Hablás en español rioplatense (vos, querés, tenés).
Tu objetivo: entender qué necesita el cliente y recomendarle el producto ideal del catálogo.

CATÁLOGO DISPONIBLE:
- Bolsa de polietileno transparente → para alimentos secos, ropa, accesorios. Hay por mayor.
- Bolsa kraft con manija → para boutique, panadería, regalos. Hay por mayor.
- Bolsa celofán con fuelle → para golosinas, café artesanal, especias. Hay por mayor.
- Caja para torta → para repostería, cumpleaños, eventos.
- Caja armable multiuso → para e-commerce, envíos, regalos corporativos. Hay por mayor.
- Papel tissue de colores → para regalería, boutique, cosméticos. Hay por mayor.
- Cinta decorativa → para regalos, eventos, decoración.
- Cotillón y artículos de fiesta → para cumpleaños, baby shower, eventos.

REGLAS:
1. Hacé máximo 2 preguntas antes de recomendar. No des vueltas.
2. Recomendá siempre 1 o 2 productos específicos del catálogo, no más.
3. Al final de tu recomendación SIEMPRE terminá con esta línea exacta: [WA:nombre del producto recomendado]
4. Tus respuestas son cortas, máximo 4 oraciones. Sin listas largas.
5. Si preguntan algo que no tiene que ver con empaques, redirigí amablemente.
6. No inventes productos que no están en el catálogo.`;

// Al conectar el dominio real, agregarlo acá (con y sin www). Hoy el sitio vive en
// centroempaque.netlify.app, que ya entra por la regla de *.netlify.app.
const ALLOWED_ORIGINS = [];
const MAX_MENSAJES = 20;
const MAX_CONTENT_LENGTH = 2000;

function esOrigenValido(origin) {
  if (ALLOWED_ORIGINS.includes(origin)) return true;
  if (origin.endsWith('.netlify.app')) return true; // deploy actual y previews de Netlify
  return origin.startsWith('http://localhost:') || origin.startsWith('http://127.0.0.1:'); // netlify dev
}

function origenPermitido(req) {
  const origin = req.headers.get('origin');
  if (origin) return esOrigenValido(origin);
  const referer = req.headers.get('referer');
  if (referer) {
    try {
      return esOrigenValido(new URL(referer).origin);
    } catch {
      return false;
    }
  }
  return true; // sin Origin ni Referer (ej. curl directo): lo frena el rate limit
}

function mensajesValidos(mensajes) {
  if (!Array.isArray(mensajes) || mensajes.length === 0) return null;
  const limpios = [];
  for (const m of mensajes) {
    if (!m || (m.role !== 'user' && m.role !== 'assistant') || typeof m.content !== 'string') {
      return null;
    }
    limpios.push({ role: m.role, content: m.content.slice(0, MAX_CONTENT_LENGTH) });
  }
  return limpios.slice(-MAX_MENSAJES);
}

const json = (data, status) =>
  new Response(JSON.stringify(data), { status, headers: { 'Content-Type': 'application/json' } });

export default async (req) => {
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  if (!origenPermitido(req)) {
    return json({ error: 'Origen no permitido' }, 403);
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    console.error('[Empaquecito] ERROR: falta ANTHROPIC_API_KEY');
    return json({ error: 'Error al procesar la consulta' }, 500);
  }

  let mensajes = null;
  try {
    mensajes = mensajesValidos((await req.json()).messages);
  } catch {
    // body que no es JSON: cae en el 400 de abajo
  }
  if (!mensajes) {
    return json({ error: 'Solicitud inválida' }, 400);
  }

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 300,
        system: SYSTEM_PROMPT,
        messages: mensajes,
      }),
    });

    if (!response.ok) {
      console.error('[Empaquecito] ERROR de Anthropic:', response.status, await response.text());
      return json({ error: 'Error al procesar la consulta' }, 502);
    }

    const data = await response.json();
    // El cliente solo usa `content`: no se reenvía el resto de la respuesta de Anthropic.
    return json({ content: data.content }, 200);
  } catch (error) {
    console.error('[Empaquecito] ERROR fetch:', error);
    return json({ error: 'Error al procesar la consulta' }, 500);
  }
};

export const config = {
  path: '/api/empaquecito',
  rateLimit: {
    windowLimit: 15,
    windowSize: 180, // segundos — 180 es el máximo que permite Netlify
    aggregateBy: ['ip', 'domain'],
  },
};
