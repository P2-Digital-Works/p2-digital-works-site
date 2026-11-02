import { cp, mkdir, readFile, writeFile, rm } from "node:fs/promises";
const root = new URL("../", import.meta.url),
  dist = new URL("dist/", root);
await rm(dist, { recursive: true, force: true });
await mkdir(dist, { recursive: true });
await cp(new URL("public/", root), dist, { recursive: true });
await writeFile(
  new URL("site-config.js", dist),
  `export const deliveryEnabled = ${Boolean(process.env.QUOTE_WEBHOOK_URL)};\n`,
);
let html = await readFile(new URL("index.html", dist), "utf8");
const site = process.env.SITE_URL;
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
    throw Error(
      "SITE_URL must be an HTTPS origin, e.g. https://your-domain.com",
    );
  const origin = url.origin;
  html = html
    .replace("noindex,nofollow", "index,follow")
    .replace(
      "</head>",
      `  <link rel="canonical" href="${origin}/">\n  <meta property="og:url" content="${origin}/">\n</head>`,
    )
    .replace(
      'content="/assets/social-card.jpg"',
      `content="${origin}/assets/social-card.jpg"`,
    );
  await writeFile(
    new URL("robots.txt", dist),
    `User-agent: *\nAllow: /\nSitemap: ${origin}/sitemap.xml\n`,
  );
  await writeFile(
    new URL("sitemap.xml", dist),
    `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>${origin}/</loc></url></urlset>\n`,
  );
} else
  await writeFile(new URL("robots.txt", dist), "User-agent: *\nDisallow: /\n");
await writeFile(new URL("index.html", dist), html);
console.log(
  `Build ready: dist/ · ${process.env.QUOTE_WEBHOOK_URL ? "online delivery" : "request download preview"} · ${site ? "production SEO" : "noindex until SITE_URL is configured"}`,
);
