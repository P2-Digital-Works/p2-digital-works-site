import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { resolve, extname, sep } from "node:path";
import { Readable } from "node:stream";
import { handlePublicQuote } from "./lib/public-quote.js";

const root = fileURLToPath(new URL("./public", import.meta.url));
const types = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml",
};
export const securityHeaders = {
  "X-Content-Type-Options": "nosniff",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Content-Security-Policy":
    "default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self' data:; connect-src 'self'; object-src 'none'; base-uri 'self'; frame-ancestors 'none'; form-action 'self'",
  "Permissions-Policy": "camera=(), microphone=(), geolocation=()",
};
export function createApp(env = process.env) {
  return createServer(async (req, res) => {
    Object.entries(securityHeaders).forEach(([key, value]) =>
      res.setHeader(key, value),
    );
    try {
      const url = new URL(req.url, "http://localhost");
      if (url.pathname === "/api/quote") {
        const base =
          env.SITE_URL || `http://${req.headers.host || "localhost"}`;
        const request = new Request(new URL("/api/quote", base), {
          method: req.method,
          headers: req.headers,
          ...(!["GET", "HEAD"].includes(req.method)
            ? { body: Readable.toWeb(req), duplex: "half" }
            : {}),
        });
        const result = await handlePublicQuote(request, env, {
          clientIp: req.socket.remoteAddress,
        });
        res.writeHead(result.status, Object.fromEntries(result.headers));
        res.end(await result.text());
        return;
      }
      if (!["GET", "HEAD"].includes(req.method)) {
        res.writeHead(405);
        res.end("Method not allowed");
        return;
      }
      if (url.pathname === "/site-config.js") {
        res.writeHead(200, {
          "Content-Type": types[".js"],
          "Cache-Control": "no-store",
        });
        res.end(
          req.method === "HEAD"
            ? ""
            : `export const deliveryEnabled = ${Boolean(env.QUOTE_WEBHOOK_URL)};`,
        );
        return;
      }
      const path = resolve(
        root,
        "." +
          decodeURIComponent(
            url.pathname === "/" ? "/index.html" : url.pathname,
          ),
      );
      if (!path.startsWith(root + sep)) {
        res.writeHead(403);
        res.end("Forbidden");
        return;
      }
      if (!(await stat(path)).isFile()) throw Error("Not found");
      const content = await readFile(path);
      res.writeHead(200, {
        "Content-Type": types[extname(path)] || "application/octet-stream",
        "Cache-Control": "no-cache",
      });
      res.end(req.method === "HEAD" ? "" : content);
    } catch {
      if (!res.headersSent)
        res.writeHead(404, { "Content-Type": "text/plain" });
      res.end("Page not found. Return to the home page.");
    }
  });
}
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const port = Number(process.env.PORT || 3000);
  createApp().listen(port, "127.0.0.1", () =>
    console.log(`P2 Digital Works: http://127.0.0.1:${port}`),
  );
}
