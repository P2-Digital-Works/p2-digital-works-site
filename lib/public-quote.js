import { handleQuote } from "./quote.js";
// Per-instance defense only: serverless instances do not share this map.
// Configure a platform-level /api/quote rate rule before enabling public delivery.
const slots = new Map();
const WINDOW_MS = 15 * 60 * 1000;
const MAX_CLIENTS = 5000;
export async function handlePublicQuote(request, env = {}, options = {}) {
  if (request.method !== "POST") return handleQuote(request, env, options);
  const now = Date.now();
  for (const [key, slot] of slots) if (slot.until <= now) slots.delete(key);
  const key = options.clientIp || "unknown";
  let slot = slots.get(key);
  if (!slot) {
    if (slots.size >= MAX_CLIENTS) return limited();
    slot = { count: 0, until: now + WINDOW_MS };
    slots.set(key, slot);
  }
  if (++slot.count > 5) return limited();
  return handleQuote(request, env, options);
}
function limited() {
  return Response.json(
    { error: "Too many requests. Please try again in 15 minutes." },
    {
      status: 429,
      headers: {
        "Retry-After": "900",
        "Cache-Control": "no-store",
        "X-Content-Type-Options": "nosniff",
      },
    },
  );
}
