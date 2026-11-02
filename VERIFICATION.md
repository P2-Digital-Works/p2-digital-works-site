# Verification record

Verified in this workspace on 3 November 2026 (Asia/Manila). Runtime: Node 26.13.0. Declared compatibility: Node 22.9+; that older runtime was not installed for a separate run.

## Automated checks

- `npm test`: **15 passed, 0 failed**, including real local HTTP serving/security headers and rate-limit responses. Also covers shared validation, input bounds/types, conditional phone contact, consent, cross-origin rejection, malformed/oversized requests, absent delivery configuration, receiver success/failure, no-JavaScript privacy fallback, and shared serverless limiter behavior.
- Prettier check: all matched source files passed formatting.
- `npm run check`: JavaScript syntax checks passed. Hosting adapter syntax was checked separately.
- `npm run build`: passed with no external runtime dependencies. Result is `dist/` in honest download-preview mode.
- A separate build with illustrative `SITE_URL=https://p2.example` and a dummy receiver URL verified canonical/robots/sitemap output and the public delivery flag. Receiver URL was absent from public HTML. Then rebuilt with no configuration to restore preview mode.
- Key token contrasts calculated: white/teal 4.90:1; white/navy 15.50:1; white/muted 5.98:1; navy/amber 9.00:1.
- PNG alpha verified present. Sharing JPEG verified 1200×630.

## Browser checks

Real in-app Chromium browser, not inferred from source:

- Desktop 1280px: full page visually inspected and captured; supplied black mark rendered on white without checkerboard.
- Tablet 768px: document width matched viewport width.
- Mobile 390px and 320px: document width matched viewport width after correcting the smallest-width header, price, and About heading overflow.
- Mobile menu opens, closes on navigation, and exposes expanded state.
- Starter/Professional selection prefills the intended service/budget.
- Invalid form focuses the first invalid field and associates visible errors.
- Valid preview creates a downloadable text request and explicitly states that it has not been sent. Download completed using fictional test details.
- Changing package hides the old download and clears stale success feedback; new request preparation is required.
- Phone preference reveals the phone input and requires a valid phone number; Email works without phone.
- All three concept dialogs open with correct descriptions. Close button and Escape dismiss; focus returns to the triggering project button.
- Native service select opens and can be dismissed by keyboard.
- No console warnings or errors in the inspected flows.
- Reduced-motion and forced-colors behavior reviewed in CSS; not exercised using an OS setting change. No formal assistive-technology audit or production Core Web Vitals measurement is claimed.

Screenshots are supplied alongside the source folder as `p2-desktop.jpg`, `p2-mobile.jpg`, and `p2-full-page.jpg`.

## Review corrections

A separate code review caught and led to fixes for:
1. Native form fallback could expose personal details in a GET URL. Form now uses POST and submit starts disabled until the validated handler is installed; a regression test covers it.
2. Hosting adapters bypassed local request limits. Both now use the shared per-instance limiter. Durable platform limits are still a launch configuration requirement.
3. Programmatic package/concept prefills could leave a stale request download. Prefills now trigger the same invalidation flow as user input; browser check confirmed it.

## Static UI audit caveat

`premium-audit.json` preserves the strict skill audit output. It reports five `affordance.actionless-button` findings for the menu, three concept buttons, and dialog close button. Inspection of the scanner confirms it recognizes inline `onclick`/framework handlers, but not external `addEventListener` bindings. Those five controls are bound in `public/app.js` and were individually exercised in the browser. These are manually adjudicated false positives; the raw scanner does **not** report a clean pass. Native selects are explicitly recorded as owned by the OS in `premium-ui.json`; textarea sizing and global scrollbars are implemented in CSS.

## Remaining production configuration

- No hosted deployment or real inquiry receiver was configured or tested. Live sending needs the owner's HTTPS receiver and optional token, a rebuild, and a real end-to-end delivery check.
- Configure a platform/durable rate rule for `/api/quote` before enabling public delivery. The in-memory limiter is bounded and shared by code paths, but not across serverless instances.
- Confirm domain, public contact details, service prices/scope/terms, and receiver-specific privacy/retention arrangements. Preview indexing remains disabled until `SITE_URL` is set.
- Logo is a transparent raster derivative with originals retained; a mathematically faithful vector master requires the original vector or careful vector tracing.
