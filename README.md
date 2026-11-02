# P2 Digital Works — official website source

The inquiry-led revision implements the approved audit. There are no public package prices or monthly fee tiers. The site explains project-based development, written proposals, handover, and separately optional care.

Six crawlable pages: the company homepage, four service detail pages, and Privacy. Home contains Services, Our Work, Approach, About, FAQs, and Contact. The black P² logo, navy/teal/amber identity, and clearly labeled concept projects are retained.

## Run locally

Use Node.js **22.9+**. No dependency installation is required.

```sh
npm run dev
```

Open **http://localhost:3000**. Stop with Ctrl+C. Set a different `PORT` in `.env` if necessary (copy `.env.example` first).

## Current inquiry route

The owner confirmed **paulrodolf.castor@g.msuiit.edu.ph** as the public inquiry address. It is linked directly on the homepage and Privacy page.

The form asks for name, email, business/project, description, and permission to respond. Interested service, timeframe, budget context, business type, and phone preferences are optional. There are no preset price bands.

**Prepare inquiry** validates the entries, then presents **Open email draft**. That link prepares a message in the visitor's email app addressed to the confirmed email. The visitor reviews and sends it themselves. The website does not claim to have sent or delivered the email. A text download provides a recovery option if no email client is configured or the draft is too long for the client. No real inquiry was sent during verification.

This route works without an API key or email-delivery account. It depends on the visitor being able to use an email client or write directly to the displayed address.

## Optional direct delivery

The same-origin `/api/quote` endpoint can send inquiries through your own HTTPS receiver. To enable it, set these variables in **both build and function environments**, then rebuild/redeploy:

| Variable | Purpose |
| --- | --- |
| `CONTACT_EMAIL` | Public destination shown to visitors. Defaults to the owner-confirmed address. |
| `QUOTE_WEBHOOK_URL` | Private HTTPS receiver accepting JSON POST requests. |
| `QUOTE_WEBHOOK_TOKEN` | Optional server-only bearer token. |
| `INQUIRY_PRIVACY_NOTE` | Required for direct-delivery builds: explain the actual receiving service, relevant storage/retention arrangements, and privacy contact. Escaped and rendered on Privacy. |
| `SITE_URL` | Confirmed public HTTPS origin, with no path or query. |

A webhook is not necessarily a raw email-provider API. It must accept the documented inquiry JSON and route it to a monitored inbox or process. Fields: `name`, `email`, `business`, `businessType`, `brief`, `budget`, `service`, `timeline`, `contact`, `phone`, `consent`, `source`, `submittedAt`. No provider credentials or receiver have been supplied or invented.

When configured, the form action becomes **Send inquiry**. It only acknowledges acceptance after the receiver returns 2xx. That does not mean a person has read the inquiry. Network failures and uncertain delivery preserve entered details and explain the recovery path. No automatic retry occurs.

All local and serverless routes share validation, size limits, origin checking, a spam trap, timeout handling, and a bounded per-instance limit of five requests per client per 15 minutes. Serverless instances do not share memory: configure a platform-level/durable rate rule on `/api/quote` before enabling public direct delivery. The in-memory limit is a secondary defense.

## Build and deploy

```sh
npm run check
npm test
npm run build
```

`dist/` contains the static pages/assets. A confirmed `SITE_URL` enables canonical metadata for each page, an actual six-page sitemap, and production robots rules. Until then the output intentionally remains `noindex,nofollow` with robots disallow. No domain ownership or availability is implied.

- **Netlify:** import this folder as the project root. `netlify.toml` supplies the build, `dist` publish directory, and function adapter. Static-only drag/drop supports the email-app route; repository deployment also includes optional direct delivery.
- **Vercel:** import this folder as an Other framework project. `vercel.json` supplies the build and output directory; `api/quote.js` supplies the optional direct endpoint.
- **Other static hosting:** serve `dist`. The default email-app route does not require server code.

Use a hosting plan appropriate for business use. `server.mjs` is a loopback development server; the supplied production setup targets static hosting with optional platform functions.

No deployment has been made in this chat. After choosing the public host/domain, verify HTTPS, page routes, canonical URLs, robots/sitemap, and the intended inquiry route on the deployed site. Direct delivery needs a real receipt/failure test with the selected receiver.

## Business truth and content

- Only the public inquiry email has been confirmed beyond the supplied brand and service brief. No founder name, office, service geography, legal entity, registration, staff, experience statistics, clients, or testimonials have been invented.
- About describes the offered services and working approach. Add a verified founder/company story when supplied.
- Northline, Daily Bread, and Pulse are fictional concept explorations. Their dialogs state what is proposed and what is not a working client system. Do not relabel them as paid work or claim measured outcomes.
- Scope, project fees, payment terms, rights/licensing, schedule, and optional care arrangements belong in the written proposal. The site does not prescribe public amounts.
- Privacy describes the active email-app behavior. Enabling direct delivery requires the real receiver-specific disclosure. No legal certification or fixed retention promise is invented.

## Assets and maintenance

Both user-supplied JPEG originals remain under `docs/assets/`. The transparent black raster master is retained there too. The website uses a 240px-wide derivative, reduced from 276 KB to approximately 15 KB for header/footer use. The favicon and 1200×630 social JPEG are included. No guessed vector master has been substituted.

`DESIGN.md` records the current design and interaction decisions. `VERIFICATION.md` records checks and remaining limits. The earlier audit report is outside this source folder; this revision supersedes its pricing and preview recommendations.

Relevant implementation files:

- `public/index.html`, `public/services/*.html`, `public/privacy.html`: crawlable content.
- `public/styles.css`: shared visual system and responsive rules.
- `public/navigation.js`: shared navigation and current-year behavior.
- `public/app.js`, `public/inquiry.js`, `public/validation.js`: inquiry UI, encoded email drafts, shared validation.
- `lib/site-config.js`: public contact/capability configuration and privacy disclosure gate.
- `lib/quote.js`, `lib/public-quote.js`: optional delivery and request limits.
- `scripts/build.mjs`: six-page build and per-page SEO.

Provider API/configuration references used for the original adapters: [Netlify Functions](https://docs.netlify.com/build/functions/api/) and [Vercel Edge runtime](https://vercel.com/docs/functions/runtimes/edge). Provider deployment behavior has not been exercised with an account in this session.
