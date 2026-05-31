// src/pages/api/empaquetito.ts
export const prerender = false;

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

export async function POST({ request }) {
  // 1. Verificar que la API key existe
  const apiKey = import.meta.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    console.error('[Empaquecito] ERROR: ANTHROPIC_API_KEY no encontrada en .env');
    return new Response(
      JSON.stringify({ error: 'API key no configurada' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }

  // 2. Parsear el body
  let messages;
  try {
    const body = await request.json();
    messages = body.messages;
  } catch (e) {
    console.error('[Empaquecito] ERROR al parsear body:', e);
    return new Response(
      JSON.stringify({ error: 'Body inválido' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }

  // 3. Llamar a la API de Anthropic
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
        messages,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('[Empaquecito] ERROR de Anthropic:', response.status, errorText);
      return new Response(
        JSON.stringify({ error: `Error Anthropic: ${response.status}` }),
        { status: 502, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const data = await response.json();
    console.log('[Empaquecito] Respuesta OK');
    return new Response(JSON.stringify(data), {
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (e) {
    console.error('[Empaquecito] ERROR fetch:', e);
    return new Response(
      JSON.stringify({ error: 'Error de red al contactar Anthropic' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
