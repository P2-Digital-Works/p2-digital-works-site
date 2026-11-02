# P2 Digital Works website MVP

A complete, dependency-free website with Home, Services, Work, Pricing, About, and Contact sections. Includes a responsive navigation menu, three clearly labeled concept projects with detail dialogs, FAQs, package-to-form selections, shared client/server quote validation, and an honest request-download preview.

## Run locally

Install **Node.js 22.9 or newer** (Node 24 LTS recommended), open a terminal in this folder, then run:

```sh
npm run dev
```

Open **http://localhost:3000**. There is no dependency installation step. Stop the server with Ctrl+C. `npm start` runs the same local server. To change the port, copy `.env.example` to `.env` and edit `PORT`.

Do not open `public/index.html` directly: ES modules need an HTTP server.

## Quote form: two honest modes

**Default preview:** the form validates the details and creates a downloadable text brief. It explicitly says the request has **not been sent**. Personal details stay in page memory until download or navigation; nothing is written to browser storage. The download is a local file under the visitor's control.

**Connected delivery:** set these variables on your hosting platform:

| Variable | Use |
| --- | --- |
| `QUOTE_WEBHOOK_URL` | Your private HTTPS inquiry receiver, accepting JSON POST requests. |
| `QUOTE_WEBHOOK_TOKEN` | Optional bearer token for that receiver. Server-only; never exposed to the browser. |
| `SITE_URL` | Exact public HTTPS origin, e.g. `https://your-confirmed-domain.com`. No path or trailing query. |

Set the webhook in **both build and function environments**, then rebuild/redeploy. The build emits only a public capability flag, never the URL or token. The form changes to “Send quote request.” A successful delivery acknowledgment appears only after the receiver returns a 2xx status. That confirms acceptance by the service, not that someone has read an email. A timeout can leave delivery uncertain; the UI explains that before retrying.

The receiver gets JSON fields: `name`, `email`, `business`, `businessType`, `service`, `budget`, `timeline`, `contact`, `phone`, `brief`, `consent`, `source`, `submittedAt`. It must accept this schema; a generic email provider API may need an automation or adapter to translate it. No receiver or inbox has been invented or configured. Use a provider you control, confirm its privacy/retention arrangements, and complete the launch items below before enabling collection.

The endpoint includes origin checks, an empty-field spam trap, server validation, a 16 KB request cap, an 8-second upstream timeout, and **five requests per client per 15 minutes per running instance**. Local, Vercel, and Netlify routes share the limiter. Serverless instances do not share memory: configure a durable platform firewall/rate rule for `/api/quote` (and a suitable receiving-service limit) before public delivery. The included limiter is a secondary defense, not a globally durable quota. No automatic retry is performed, to reduce duplicate requests.

## Build and deploy

```sh
npm run check
npm test
npm run build
```

`dist/` is the generated static site. With no `SITE_URL`, previews intentionally use `noindex,nofollow` and robots disallow. Set a confirmed `SITE_URL` at build time to generate a canonical URL, Open Graph URL, production robots rules, and a one-page sitemap. Section anchors are not falsely listed as separate pages.

### Netlify

Import this folder/repository. The included `netlify.toml` sets the build to `npm run build`, publishes `dist`, and bundles `netlify/functions/quote.mjs` at `/api/quote`. Set Node 22.9+ or 24 and the environment variables in the appropriate build/function scopes. A drag-and-drop upload of `dist` alone supports download preview only; use a repository deployment to include the server function.

### Vercel

Import this folder/repository as an **Other** framework project. The included `vercel.json` builds with `npm run build`, serves `dist`, and the root `api/quote.js` supplies the quote endpoint. Configure the environment variables and redeploy. Use a hosting plan whose current terms allow your business use.

### Other hosting

Any static host can serve `dist` in download-preview mode. Connected delivery requires deploying a same-origin `/api/quote` handler as well. `server.mjs` is a loopback-only development server, not a hardened internet-facing production server. The supplied deployment paths are Netlify and Vercel.

Platform references checked during development:
- [Netlify function entrypoints and configuration](https://docs.netlify.com/build/functions/api/)
- [Netlify function setup](https://docs.netlify.com/build/functions/get-started/)
- [Vercel Edge runtime](https://vercel.com/docs/functions/runtimes/edge)

Provider deployment and live inbox delivery have not been exercised with a real hosting account or receiver.

## Content and launch items

This MVP deliberately separates proposed content from verified business facts.

- **Logo:** both supplied JPEGs were recovered and visually inspected. `docs/assets/original-palette-logo.jpeg` supplies the navy/teal/amber direction; `docs/assets/original-black-logo.jpeg` is the official black mark. `public/assets/p2-black.png` is the background-removed raster derivative. It preserves the visible mark and transparency; it is not a vector master. The original upload order returned by the chat reader differs from the order described in the request, so assets were identified visually.
- **Colors:** approximate samples: navy `#06263e`, teal `#087d86` (darkened for action contrast), amber `#ffb900`, white. All runtime tokens are in `public/styles.css`.
- **Portfolio:** fictional Northline Studio, Daily Bread Bakery, and Pulse Appointment Portal concepts. Interface illustrations are made with HTML/CSS. They are not working client systems, paid engagements, or evidence of business results. No testimonials or invented client counts.
- **Pricing:** draft ranges from the earlier proposal. One-time builds plus separately optional monthly care. Confirm final offers, deliverables, taxes, ownership/licensing, payment terms, hosting, and edit limits before publishing commercial offers.
- **About:** proposed positioning without invented history, team, certifications, customers, legal registration, or office address.
- **Contact:** no email, phone, address, social link, or domain was supplied or invented. Add confirmed details before launch if desired.
- **Privacy:** the inline notice describes this app’s actual behavior. Before enabling delivery, add business-specific contact details and receiving-service retention/deletion arrangements; obtain appropriate review for your actual practices. It is not a claim of legal certification.
- **SEO:** update site copy, confirmed public domain, and sharing asset as needed. `social-card.jpg` (1200 × 630) is included for sharing previews, with its editable SVG source alongside it. No fabricated LocalBusiness address or ratings are embedded.

## Accessibility and verification

Semantic landmarks, heading hierarchy, skip link, associated labels/errors, native selects, native dialog, visible focus, keyboard controls, reduced-motion handling, responsive layouts, and no external font/network dependency. The submit button starts disabled until validation is installed; the fallback form uses POST to avoid putting personal data in a URL when JavaScript fails.

See `VERIFICATION.md` for actual checks and limitations. These checks support the MVP; they do not claim formal WCAG certification or measured production Core Web Vitals.

## File map

- `public/index.html` — all crawlable page content and form markup.
- `public/styles.css` — shared visual tokens, layouts, mobile rules, interaction states.
- `public/app.js` — navigation, concept dialogs, package selection, quote/download UI.
- `public/validation.js` — shared field rules used by browser and server.
- `lib/quote.js` — request validation and acknowledged webhook delivery.
- `lib/public-quote.js` — shared per-instance request limiting.
- `server.mjs` — local development HTTP server and security headers.
- `api/quote.js`, `netlify/functions/quote.mjs` — hosting adapters.
- `scripts/build.mjs` — static build, public mode flag, production SEO configuration.
- `tests/` — validation, privacy fallback, delivery failure, limiting, and local HTTP checks.
- `DESIGN.md` — design choices and source of business assumptions.

No runtime dependencies, API keys, analytics, customer database, authentication system, or CMS are bundled. The site can be extended without changing its honest preview behavior.
