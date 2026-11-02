import { handlePublicQuote } from "../../lib/public-quote.js";
export default function handler(request, context) {
  return handlePublicQuote(request, process.env, { clientIp: context.ip });
}
export const config = { path: "/api/quote" };
