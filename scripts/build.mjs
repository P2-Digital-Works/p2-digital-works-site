import { cp, mkdir, readFile, writeFile, rm, readdir } from "node:fs/promises";
import { publicConfigScript, applySiteSettings } from "../lib/site-config.js";
const root = new URL("../", import.meta.url),
  dist = new URL("dist/", root);
await rm(dist, { recursive: true, force: true });
await mkdir(dist, { recursive: true });
await cp(new URL("public/", root), dist, { recursive: true });
await writeFile(
  new URL("site-config.js", dist),
  publicConfigScript(process.env),
);
const site = process.env.SITE_URL;
let origin;
if (site) {
  const url = new URL(site);
  if (
    url.protocol !== "https:" ||
    url.pathname !== "/" ||
    url.search ||
    url.hash ||
    url.username ||
    url.password
  )
    throw Error("SITE_URL must be an HTTPS origin.");
  origin = url.origin;
}
async function pages(dir, prefix = "") {
  const found = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    if (entry.isDirectory())
      found.push(
        ...(await pages(
          new URL(entry.name + "/", dir),
          prefix + entry.name + "/",
        )),
      );
    else if (entry.name.endsWith(".html")) found.push(prefix + entry.name);
  }
  return found;
}
const files = await pages(dist);
for (const file of files) {
  let html = applySiteSettings(
    await readFile(new URL(file, dist), "utf8"),
    process.env,
  );
  if (origin) {
    const url = origin + (file === "index.html" ? "/" : "/" + file);
    html = html
      .replace("noindex,nofollow", "index,follow")
      .replace(
        "</head>",
        `<link rel="canonical" href="${url}"><meta property="og:url" content="${url}"></head>`,
      )
      .replaceAll(
        'content="/assets/social-card.jpg"',
        `content="${origin}/assets/social-card.jpg"`,
      );
  }
  await writeFile(new URL(file, dist), html);
}
await writeFile(
  new URL("robots.txt", dist),
  origin
    ? `User-agent: *\nAllow: /\nSitemap: ${origin}/sitemap.xml\n`
    : "User-agent: *\nDisallow: /\n",
);
if (origin)
  await writeFile(
    new URL("sitemap.xml", dist),
    `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${files.map((file) => `<url><loc>${origin}${file === "index.html" ? "/" : "/" + file}</loc></url>`).join("")}</urlset>`,
  );
console.log(
  `Built ${files.length} pages. Inquiry route: ${process.env.QUOTE_WEBHOOK_URL ? "direct delivery" : "review and send in email app"}. SEO: ${origin ? "production" : "staging until SITE_URL is set"}.`,
);
