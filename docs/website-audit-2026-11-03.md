# P2 Digital Works website audit

Audited 3 November 2026, Asia/Manila. Scope: current repository and https://p2digitalworks.netlify.app/. Audit only; no website changes or deployment performed.

## Verdict

Implementation integrity: **pass with limitations**. The site has a coherent studio identity, clear services, a consistent inquiry journey and explicitly fictional concept work. It is usable as an early business brochure. No blocking defect was reproduced in the sampled flows. It is not yet persuasive evidence of an established delivery business, and inquiry receipt has not been tested.

“Official” describes the owner's authorized business presence; it is not a technical certification earned by adding a fixed number of pages. This audit verifies public availability, not account ownership or business registration.

## Technical health

These are bounded review scores, not Lighthouse results or WCAG certification.

| Dimension | Score | Evidence and limits |
| --- | --- | --- |
| Accessibility | 3/4 | Associated labels/errors, first-invalid focus, skip link, native dialog, Escape dismissal and focus restoration observed; full contrast/assistive-technology matrix not performed. |
| Performance | 3/4 | Dependency-free static implementation, small logo, no broken logo images observed; no field speed or Core Web Vitals measurement. |
| Responsive design | 3/4 | Homepage width matched viewport at 1280, 390 and 320px; mobile menu worked. Full zoom/device/browser coverage remains unverified. |
| Theming | 3/4 | Shared palette and consistent light presentation; legacy literal colors/overrides remain. A dark theme is not necessary for this site. |
| Implementation integrity | 3/4 | Honest concepts, privacy disclosure, service boundaries and email preparation; live/source records have drifted. |
| **Total** | **15/20** | **Good; business credibility and inquiry reliability deserve priority.** |

Verified findings: **0 P0, 0 confirmed P1, 5 P2, 2 P3**. The inbox receipt check is an unresolved launch condition, not a reproduced software failure.

## What works

- Live homepage returns HTTPS 200. CSP, HSTS, nosniff, referrer and permissions headers were present.
- All four live service routes and Privacy return 200; a deliberately nonexistent URL returns 404.
- Live homepage is indexable, has a canonical tag, and exposes working robots and six-entry sitemap files. Indexability does not prove Google has indexed or ranked it.
- Homepage offers clear service explanations, engagement boundaries, FAQs and a visible contact address.
- Portfolio content openly identifies fictional concepts and makes no measured client-results claims.
- Live concept dialog opens, Escape dismisses it, and focus returns to the opener. Mobile menu opens and closes on navigation.
- Live empty inquiry submission focuses Name and presents correction guidance. Local valid submission builds the correctly addressed, encoded email draft and downloadable backup, with wording that distinguishes preparation from sending.
- `npm run check`: passed. `npm test`: 23 passed, zero failed. Three HTTP tests initially failed because sandbox loopback binding was denied; the same unmodified suite passed with local-port permission.
- `npm run build`: passed, six pages. The default local build correctly stays staging/noindex without SITE_URL. Netlify production configuration sets the live origin.
- No warning/error console entries were captured during sampled live interactions.

## Findings, in practical priority order

### [P2] Inquiry completion depends on a visitor's email application

Location: public/app.js email preparation branch; public/inquiry.js; live /site-config.js (`deliveryEnabled = false`).

Impact: completing the form does not deliver a lead. Visitors must open a mail client and send the draft; browser-only email users can need extra steps. The UI explains this accurately, so this is conversion friction rather than false success.

Recommendation: before broad promotion, test the entire current route on phone and desktop through receipt in the monitored inbox and an actual reply. Consider direct website delivery when volume warrants it. Existing optional delivery code is not evidence of a configured production receiver. Enabling it also requires the real privacy disclosure, durable abuse protection, and success/failure receipt tests.

Suggested follow-up: `$impeccable harden` for delivery integration; `$impeccable clarify` for any revised handoff wording.

### [P2] About explains services but does not establish the operator

Location: public/index.html About section, approximately lines 454–485; live /#about.

Impact: an unfamiliar visitor cannot easily determine who will do the work, where services are offered, or who takes responsibility. The displayed academic-domain email is usable but gives a weaker business-identity signal than an address on a company-controlled domain. This is a credibility judgment, not a deliverability diagnosis.

Recommendation: add verified founder/operator identity, a concise relevant background, service area or remote-working policy and an accurate professional profile. Decide whether “we” accurately describes the operation. Prefer a company-controlled domain and matching mailbox for long-term branding, once ownership and ongoing access are arranged. Do not invent an office, team, credentials or registration.

Suggested follow-up: `$impeccable clarify` after the owner supplies facts.

### [P2] Work samples demonstrate visual direction, not completed delivery

Location: public/index.html Work section; public/app.js project descriptions; live /#work.

Impact: the examples help visitors assess taste but do not prove a working application, completed engagement or business outcome. This matters particularly for the custom application and integration offers.

Recommendation: retain the truthful concept labels. Add at least one inspectable working example with a clear problem, implemented behavior, your role and actual limitations. If no client work exists, a functional self-initiated demo is suitable when labeled honestly. Add real case studies and testimonials only with permission and evidence.

Suggested follow-up: `$impeccable shape` for an evidence-led work detail surface.

### [P2] Navigation and canonical URL formats differ

Location: scripts/build.mjs lines 48–53 and 69–71; deployed service and Privacy pages.

Evidence: live navigation uses /services/websites and /privacy, while canonical tags and sitemap entries use /services/websites.html and /privacy.html. All sampled clean routes work.

Impact: inconsistent URL preferences create avoidable crawl/maintenance ambiguity; this is not a claim that search visibility is broken.

Recommendation: choose one deployed URL convention and align navigation, redirects, canonicals and sitemap. Google's guidance recommends linking consistently to the preferred canonical URL: https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls.

Suggested follow-up: `$impeccable harden`.

### [P2] Deployment records no longer describe reality

Location: README.md, VERIFICATION.md, PRODUCT.md and DESIGN.md; compare netlify.toml lines 6–7 and current live site.

Evidence: records say no deployment occurred and no host was supplied; a live deployment exists. The live navigation uses clean URLs and a Netlify badge is injected; the local source differs in some wording/presentation. Exact deployed commit provenance was not established.

Impact: future changes may be tested against the wrong assumptions or shipped from an uncertain source revision.

Recommendation: record the authoritative deployment account, owner, source revision, build configuration, origin and recovery/redeployment procedure. Confirm a known repository revision reproduces the intended live site. Do not assume existing documentation proves account control.

Suggested follow-up: `$impeccable document` for design context; separately update deployment records.

### [P3] Hosting promotion appears in the public page

Location: live injected #nl-badge-frame (not present in repository HTML).

Impact: the “Powered by Netlify” widget introduces a competing website-builder promotion into the company's presence. Its appearance and visibility may vary; no primary CTA obstruction was established.

Recommendation: review the hosting account's supported branding options before a formal campaign. This is polish, not a functional launch blocker. No account setting was changed.

Suggested follow-up: `$impeccable polish` after the hosting decision.

### [P3] Shared CSS contains legacy overrides and literal component colors

Location: public/styles.css, including older concept-component rules and the final refinement block.

Impact: future edits are harder to predict when old declarations remain underneath newer overrides. Current visual inconsistency was not established from these matches alone.

Recommendation: consolidate when next modifying the affected components, preserving the established visual identity. Do not spend the first launch effort rewriting functioning CSS.

Suggested follow-up: `$impeccable polish`.

## Detector interpretation

The current Impeccable scan returned four stylistic observations: two accent borders and two dark-shadow observations. These are not functional defects or automatic grounds for redesign; concept artwork may intentionally use its own palette.

The strict premium scan reports ten actionless-button errors. Those correspond to six menu buttons, three concept buttons and the close button. External event bindings exist in navigation.js/app.js; representative menu, concept-open and dialog-dismiss actions worked in the browser. Treat these as scanner false positives, not ten broken controls. The raw scanner does not pass; its unfiltered results are available in /tmp/p2-premium-audit.json and /tmp/p2-audit-detector.json for this session.

## Before broader promotion

1. Confirm the owner controls the hosting account, recovery access, public address and inbox; the audit did not establish control.
2. Send and receive a real inquiry using the current journey on desktop and phone, then confirm a reply can reach the sender. No email was sent in this audit.
3. Supply truthful operator information and a response expectation that can actually be maintained.
4. Publish stronger working evidence as it becomes available; keep concepts honestly labeled.
5. Align canonical URLs and deployment records; choose the long-term domain before promoting widely.
6. Check actual mobile speed, keyboard/zoom usability and additional target browsers before a paid campaign. Establish a practical routine for inbox review, uptime checks and source recovery; no monitoring was created.

## What does not need to be added just to look official

A login system, dashboard, blog, chatbot, online payment flow, public pricing table and dark mode are not necessary for this inquiry-led business model. More features increase maintenance without necessarily helping a prospective customer decide.

Privacy content already exists. Business terms, personal-data practices and disclosures should reflect the actual operator, jurisdiction and commercial process; this review did not determine legal compliance. No generic legal text, registration number or retention promise should be invented.

Recommended sequence: address inquiry robustness with `$impeccable harden`, factual identity/content with `$impeccable clarify`, stronger work evidence with `$impeccable shape`, then finish with `$impeccable polish`. Re-audit the affected flows after changes; a higher aesthetic score is secondary to a lead actually reaching the business.

Project-context maintenance note: Impeccable identified PRODUCT.md as a legacy schema. Its `init` workflow can refresh the record if requested; that migration is not a launch blocker and was not performed.
