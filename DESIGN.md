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
Required: name, email, business/project, description, and permission to respond. Service, timeframe, free-text budget and business type are optional, behind a disclosure. Phone is required only when phone contact is selected. Shared client/server validation has inline associated errors, live feedback, focus-first-invalid (opening the disclosure if necessary), and bounded input.

Default: Prepare inquiry → Open email draft → visitor reviews/sends from their own mail app. A confirmed email link and downloadable brief provide alternatives. Never claim preparation sends or delivers email. Changing inputs invalidates old drafts/downloads. No browser persistence or analytics.

Optional direct-delivery mode is configured server-side. Its public capability flag never includes credentials. Submission disables fields and duplicate submits, preserves data on errors, and acknowledges only receiver acceptance. Actual receiver privacy disclosure is required before a direct-delivery build. All routes share per-instance request limiting; public direct delivery also needs durable/platform abuse protection.

## Deployment
Static six-page output with optional Vercel/Netlify adapters. SITE_URL enables per-page canonical metadata, sitemap and indexing; unconfigured previews remain noindex. No host/domain is invented and no deployment has occurred. Source is independent of a CMS or client framework.

## Assets
Both user-supplied JPEGs and the background-removed master are retained in docs/assets. The website uses the same black mark resized to 240px width; no guessed SVG master. Social sharing artwork and favicon remain included.
