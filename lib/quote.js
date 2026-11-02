import { validateQuote } from "../public/validation.js";
const MAX_BODY = 16384;
const response = (status, data) =>
  Response.json(data, {
    status,
    headers: {
      "Cache-Control": "no-store",
      "X-Content-Type-Options": "nosniff",
    },
  });
export async function handleQuote(request, env = {}, options = {}) {
  if (request.method !== "POST")
    return response(405, { error: "Use POST for a quote request." });
  const origin = request.headers.get("origin");
  let allowed;
  try {
    allowed = new URL(env.SITE_URL || request.url).origin;
  } catch {
    return response(503, { error: "Site configuration needs attention." });
  }
  if (origin && origin !== allowed)
    return response(403, {
      error: "Please send this request from the website.",
    });
  if (!request.headers.get("content-type")?.includes("application/json"))
    return response(415, { error: "A JSON request is required." });
  if (Number(request.headers.get("content-length")) > MAX_BODY)
    return response(413, { error: "The request is too large." });
  let input;
  try {
    const reader = request.body?.getReader();
    if (!reader) return response(400, { error: "The request is empty." });
    let size = 0;
    const chunks = [];
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > MAX_BODY) {
        await reader.cancel();
        return response(413, { error: "The request is too large." });
      }
      chunks.push(value);
    }
    const bytes = new Uint8Array(size);
    let offset = 0;
    for (const chunk of chunks) {
      bytes.set(chunk, offset);
      offset += chunk.byteLength;
    }
    input = JSON.parse(new TextDecoder().decode(bytes));
  } catch {
    return response(400, {
      error: "The request could not be read. Please try again.",
    });
  }
  if (input?.website)
    return response(400, { error: "This request could not be accepted." });
  const { data, errors } = validateQuote(input);
  if (Object.keys(errors).length)
    return response(422, {
      error: "Please check the highlighted fields.",
      errors,
    });
  if (!env.QUOTE_WEBHOOK_URL)
    return response(503, {
      code: "NOT_CONFIGURED",
      error:
        "Online delivery is not connected. Download your request instead; nothing has been sent.",
    });
  let destination;
  try {
    destination = new URL(env.QUOTE_WEBHOOK_URL);
    if (destination.protocol !== "https:") throw Error();
  } catch {
    return response(503, {
      error: "Online delivery needs attention. Please download your request.",
    });
  }
  try {
    const upstream = await (options.fetch || fetch)(destination, {
      method: "POST",
      redirect: "error",
      signal: AbortSignal.timeout(8000),
      headers: {
        "Content-Type": "application/json",
        ...(env.QUOTE_WEBHOOK_TOKEN
          ? { Authorization: `Bearer ${env.QUOTE_WEBHOOK_TOKEN}` }
          : {}),
      },
      body: JSON.stringify({
        ...data,
        source: "P2 Digital Works website",
        submittedAt: new Date().toISOString(),
      }),
    });
    if (!upstream.ok) throw Error("Delivery not acknowledged");
    return response(200, {
      delivered: true,
      message:
        "Your request has been accepted by the delivery service. Keep a copy for your records.",
    });
  } catch {
    return response(502, {
      error:
        "Delivery could not be confirmed. Your details are still here. Keep a copy before retrying, as the service may have received the first request.",
    });
  }
}
