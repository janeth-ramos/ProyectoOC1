import {
  convertToModelMessages,
  createUIMessageStreamResponse,
  streamText,
  toUIMessageStream,
  type UIMessage,
} from "ai";

export const maxDuration = 30;

const SISTEMA = `Eres un analista senior de riesgo minero que explica el análisis de Monte Carlo a una audiencia hispanohablante.
Responde siempre en español, con claridad, precisión y un tono profesional pero cercano.
Mantén las respuestas breves (2 a 4 párrafos como máximo), usa ejemplos concretos cuando ayuden y evita jerga innecesaria.
Puedes hablar de ley, tonelaje, recuperación, precio, costos, VPN, P10/P50/P90, percentiles, distribuciones, correlación y toma de decisiones.
Aclara cuando corresponda que los números de esta página son ilustrativos y que un proyecto real requiere datos y estudios técnicos.
No inventes datos de yacimientos concretos ni des recomendaciones de inversión.`;

export async function POST(req: Request) {
  // En Vercel la autenticación con AI Gateway es automática vía OIDC.
  // En local se requiere AI_GATEWAY_API_KEY.
  if (!process.env.AI_GATEWAY_API_KEY && process.env.VERCEL !== "1") {
    return Response.json(
      { error: "Falta AI_GATEWAY_API_KEY en el entorno local." },
      { status: 503 },
    );
  }

  const { messages }: { messages: UIMessage[] } = await req.json();
  const modelo = process.env.AI_GATEWAY_MODEL || "google/gemini-2.5-flash";

  const resultado = streamText({
    model: modelo,
    system: SISTEMA,
    messages: await convertToModelMessages(messages),
  });

  return createUIMessageStreamResponse({
    stream: toUIMessageStream({ stream: resultado.stream }),
  });
}
