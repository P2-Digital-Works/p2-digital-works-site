import { handlePublicQuote } from "../lib/public-quote.js";
export const config = { runtime: "edge" };
export default function handler(request) {
  // Vercel supplies the forwarded client address at its trusted proxy.
  const clientIp = request.headers.get("x-forwarded-for")?.split(",")[0].trim();
  return handlePublicQuote(request, process.env, { clientIp });
}
