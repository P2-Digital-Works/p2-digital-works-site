# P2 Digital Works design context

## Authority
The approved website proposal in chat 6ae88aaa-2620-83ec-8bfd-a8122b1223c4 established the black P² mark and navy, teal, amber, white identity. The 3 November 2026 audit and the owner's “do it” approve the inquiry-led revision. The owner confirmed paulrodolf.castor@g.msuiit.edu.ph as the public inquiry email.

## Audience and primary task
Prospective business customers evaluating website development, custom web applications, integrations, and optional care. Visitors should understand the offer, see honestly labeled work, and discuss their project. English content. No public prices, package tiers, or forced subscription.

## Business truth
No founder identity, office, location/service geography, legal entity, registration, years of experience, clients, metrics, or testimonials are verified. About states the service offer and working approach. Concept projects are fictional design explorations, not paid engagements or working business systems.

## Visual system
Preserve the existing white/navy studio identity. Teal actions, restrained amber, generous spacing, consistent shared navigation. Replace equal icon cards with open service descriptions separated by rules. Eliminate redundant eyebrow labels. Existing concept website geometry remains illustrative and explicitly labeled.

`public/styles.css :root` owns color tokens: --navy #06263e, --teal #087d86, --amber #ffb900, --paper #ffffff, --mist #f2f6f6, --ink #213b4b, --muted #536672. Body uses the system sans stack; display preserves Avenir Next with sans fallback. Display tracking no tighter than -.035em in the revision. Real labels/help/errors/privacy are at least 14px, inputs 16px; decorative content inside mockups is separate. Narrow brand descriptors are omitted instead of shrunk. Some legacy component rules remain, with the official-site refinement block supplying the current styles.

## Pages
Home contains Services, Our Work, Approach, About, FAQs, and Contact. Four independent service detail pages explain fit, scope and boundaries. A dedicated Privacy page describes actual inquiry behavior. All use the same header/footer and stylesheet. Branding links lead home; detail-page “Back to top” stays on that page.

## Inquiry behavior
Required: name, email, description, and permission to respond. Business/project name, service, timeframe, free-text budget and business type are optional, behind a disclosure after the description. The form uses one column at all sizes. Phone is required only when phone contact is selected. Shared client/server validation has inline associated errors, live feedback, focus-first-invalid (opening the disclosure if necessary), and bounded input.

Default: Review email draft → visible read-only draft → Open email draft or Copy email draft → visitor reviews/sends from their mail app or webmail. Copy failure selects the draft and explains manual copying; a late clipboard result cannot restore invalidated draft UI. A confirmed email link and downloadable brief provide alternatives. Never claim preparation sends or delivers email. Changing inputs invalidates old drafts/downloads. No browser persistence or analytics.

Optional direct-delivery mode is configured server-side. Its public capability flag never includes credentials. Submission disables fields and duplicate submits, preserves data on errors, and acknowledges only receiver acceptance. Actual receiver privacy disclosure is required before a direct-delivery build. All routes share per-instance request limiting; public direct delivery also needs durable/platform abuse protection.

## Deployment
Static six-page output with optional Vercel/Netlify adapters. SITE_URL enables per-page canonical metadata, sitemap and indexing; unconfigured previews remain noindex. The live Netlify origin was observed at https://p2digitalworks.netlify.app in the audit; netlify.toml sets that production origin. Hosting ownership and deployed source provenance are not verified. This usability revision is local and has not been published. Source is independent of a CMS or client framework.

## Assets
Both user-supplied JPEGs and the background-removed master are retained in docs/assets. The website uses the same black mark resized to 240px width; no guessed SVG master. Social sharing artwork and favicon remain included.

## Client usability revision — 3 November 2026
The owner asked for a welcoming experience for technical and nontechnical clients, then authorized implementation with “go.” Preserve the existing visual identity and use plain language throughout. Navigation: Services, Our work, How it works, About, Contact us. Services lead with introducing a business online, making everyday work easier, selling products online, and caring for an existing website. Technical terms can be explained on detail pages. Contact us is the shared main action; Review email draft names preparation, never delivery. No forced service selection or budget. A new FAQ welcomes people who are unsure what they need.

W3C cognitive-accessibility guidance, NN/G heuristics, Baymard form-effort research and GOV.UK usability methods inform these choices. They are hypotheses for this audience, not proven conversion improvements. See docs/client-usability-testing.md for source links and target-user testing. No participant research or real email delivery is claimed.
