# Verification — client usability refinement

3 November 2026, Asia/Manila. Local source revision; no publication or real inquiry sending.

## Current checks

- `npm run check`, `npm test` (27 passed, zero failed), `npm run build` (six pages), source Prettier check and `git diff --check` passed after the final code edits.
- Three new behavior assertions were observed failing before implementation: optional business name, a useful subject when it is absent, and shared email/webmail draft serialization. The existing optional-field type/length guard continued to pass. New model coverage includes Unicode and multiline data and unsafe recipients.
- Desktop 1280px and mobile 390/320px: no horizontal homepage overflow in measured states; form uses a single column. Hero, inquiry and representative commerce service page were visually inspected.
- Empty form focused Name; a minimal inquiry with no business/service/budget prepared a visible complete draft addressed to the confirmed contact. Preparing it did not send anything.
- Copy action reported success in the browser. A separate local QA server changed only the served in-memory clipboard call to throw; fallback focused the read-only draft and selected all 231 characters. A permissions-policy-only attempt did not trigger failure in this browser, so it is not claimed as a denied-permission test. No fault injection was saved in production source.
- Editing a prepared inquiry cleared the preview text, hid old email/download actions, and restored Review email draft. Optional Phone selection required a phone number, kept the disclosure open, and focused Phone on invalid submission.
- Mobile navigation closed after a section choice; native concept dialog opened, Escape closed it and restored opener focus. Commerce detail route and Contact us path were checked. Read-only draft computed `resize: vertical`.
- No warning/error console entries captured in the normal preview's sampled flows. No external mail application was launched and no email receipt or reply was verified.
- A fresh source reviewer reported no actionable regressions. Its independent run passed 24 tests; three HTTP tests were sandbox-blocked. The primary agent's final permitted run passed all 27.

## Static tools

`docs/verification/client-usability-static-audit.json` retains the strict scan: 12 raw errors. Eleven actionless-button observations correspond to six externally bound menu buttons, three concept buttons, dialog close and Copy email draft. Their handlers exist; representative menu/concept/close/copy actions worked. The twelfth says textarea resize is missing; the shared CSS and browser computed style confirm vertical resizing. These parser limitations are documented, not treated as broken controls or concealed behind a passing scanner claim.

The one final Impeccable scan is retained in `docs/verification/client-usability-detector.json`: seven stylistic observations concern legacy/component accent borders and shared dark shadows. They are inherited styling observations; no task-blocking defect was established from them.

## Limits and handoff

No target-user research, conversion measurement, full assistive-technology/200%-zoom matrix, multi-browser certification, hosted deployment verification of this revision, direct-provider delivery or legal certification is claimed. Existing backend delivery success/failure tests still pass; default public delivery remains user-controlled email. `docs/client-usability-testing.md` defines a qualitative round with technical and nontechnical prospects.

Screenshots: `docs/screenshots/client-usability-desktop.png`, `client-usability-mobile.png`, and `client-usability-mobile-form.png`. The live Netlify site observed in the audit is separate from this local revision. Historical deployment statements below describe the earlier work and are superseded by the current audit and README.

---

# Verification — official website revision

3 November 2026 (Asia/Manila). Node 26.13.0 used for checks; declared compatibility is Node 22.9+. No separate older-runtime test or hosted deployment is claimed.

## Confirmed changes

- Public package names, price ranges, care fee tiers, Pricing links and package-budget prefills removed.
- Scoped project fees and separately optional care explained without amounts.
- Six crawlable pages: Home, four service detail pages, Privacy.
- Confirmed public email paulrodolf.castor@g.msuiit.edu.ph; no invented founder, office, geography, domain, clients or history.
- Required intake reduced to name, email, business/project, description and permission to respond. Scoping fields optional; budget free text.
- Explicit email-draft preparation and user-controlled send step. Actual delivery never claimed for preparation.
- Functional form/privacy/error text raised to 14px, inputs 16px; tiny brand descriptors removed. Concept disclosures made readable.
- Header/footer logo resized to 240px width, 15,506 bytes versus original transparent master 276,357 bytes (approximately 94% fewer bytes). Master and both original user JPEGs retained.

## Automated verification

`npm test`: **23 tests passed, zero failures** in the revision, including optional-field validation, safe recipient and message encoding, all collected email fields, privacy fallback, delivery success/failure behavior, shared rate limiting, public config secrecy, disclosure gating/escaping, local HTTP serving, and the five supporting page routes.

`npm run check`: passed. Prettier check passed for HTML/CSS/JS source, shared libraries, build, server, and tests. The final formatting/build verification is performed before archive creation.

Default six-page build passed. A production build using the illustrative origin `https://p2.example` verified six sitemap entries, per-page canonical metadata, indexable production output, no public peso ranges or pricing anchors, and the owner-confirmed email. Then rebuilt without SITE_URL to restore safe staging indexing behavior. The illustrative domain is not a claimed P2 domain.

A separate code review identified that Business type was omitted from the prepared email. A regression assertion failed first, the field was added, and the assertion passed. No other Important/Critical findings were reported by that review. Public contact/capability flags, disclosure escaping, and six-page config were also reviewed.

## Browser verification

Real in-app Chromium browser:

- Desktop 1280px: full page inspected, no horizontal overflow, no public peso amounts. Inquiry/service/engagement hierarchy and company copy checked.
- Mobile 390px and 320px: page width matched viewport; real form labels measured 14px. Shared service and Privacy pages fit 320px.
- Mobile menu opened and closed on section selection.
- Empty form focused name and displayed correction feedback.
- Valid minimal inquiry prepared the correctly encoded mailto link for the owner-confirmed address, with an honest “open draft, then send” status and downloadable backup.
- No email app was launched and no real email was sent during verification. Mail-client delivery remains controlled by the visitor; a preconfigured mail app or direct email channel is necessary.
- Editing a prepared inquiry hid the old email draft and download. Optional phone contact exposed a required phone input, focused it on error, and kept the optional disclosure open.
- Service-page content and Privacy contact link checked independently; no captured browser console errors/warnings in tested flows.
- Existing concept boundaries remain explicit. Portfolio items are design studies, not working client systems.

Screenshots accompany the source archive as p2-official-desktop.jpg, p2-official-mobile.jpg, and p2-official-full-page.jpg.

## Detector and static audit interpretation

Impeccable detector was run once on the completed changed UI: 31 raw observations across home, shared CSS, inquiry UI, Privacy and representative service page. These are not 31 independently verified bugs. The raw output is retained in the chat workspace's work/ folder.

Remaining observations predominantly concern decorative mockup microtext/illustration clipping, intentional letterspaced labels inside mockups, legacy CSS rules overridden by the refinement, and stylistic shadow/border preferences. The contrast warning again assumes white behind the navy-section caption; computed background is navy. The contact display tracking was corrected to -.03em after review. Real form instructions, labels, errors and privacy link were checked separately from illustrative mockup text.

The strict premium static audit is retained as premium-audit.json. It reports ten actionless-button findings: six shared page menu buttons, three concept buttons and the dialog close button. Its parser recognizes inline handlers, not the external addEventListener bindings in navigation.js/app.js. These bindings were reviewed; representative navigation and inquiry flows were exercised. This raw scanner does not report a clean pass, and its warnings have not been concealed.

## Remaining deployment facts

No public domain or host was supplied, so no public deployment or production field-performance measurement was performed. Source builds remain staging/noindex until SITE_URL is set. Confirm the live origin and HTTPS, page routes, robots/canonical/sitemap, and email-app flow after deployment.

For direct website sending, the owner must configure an HTTPS inquiry receiver, any secret token, actual receiver-specific privacy disclosure, and durable/platform abuse protection; then test real receipt and failure recovery. The current email-app route works without those credentials and is described accurately in the UI.

No formal WCAG certification, full assistive-technology/200%-zoom matrix, multi-browser certification, or legal compliance claim is made. Reduced-motion and forced-color styles are present; no OS setting changes were made during this run.
