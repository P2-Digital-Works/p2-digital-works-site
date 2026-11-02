# P2 Digital Works design context

## Authority and intent
Approved proposal: referenced chat 6ae88aaa-2620-83ec-8bfd-a8122b1223c4, website design recommendation. Current user authorizes implementation. Business website for prospective small-business buyers; primary task is preparing a qualified quote inquiry. English, Philippine peso indicative pricing. No company location, history, staff, contact details, results, registration, testimonials or customers are verified.

## Direction
Understated software studio. White canvas, large navy typography, teal actions, small amber accents. A precisely composed browser concept is the signature visual: it demonstrates the actual service. Featured work uses a navy section and believable interface previews, always labeled concept. No unrelated stock photography, fabricated metrics or decorative code.

## Tokens and runtime mapping
`public/styles.css :root` is the sole runtime token owner.
- --navy: #06263e; sampled approximately from colored upload.
- --teal: #087d86; sampled approximately, slightly darkened for white text contrast.
- --amber: #ffb900; sampled approximately; use navy text.
- --paper: #ffffff; --mist: #f2f6f6; --ink: #213b4b; --muted: #536672.
- Display: locally available Avenir Next with system sans fallback, strong negative tracking.
- Body: system sans for stable, fast rendering, 16px minimum main text.
- Content width 1200px, 24px mobile gutters, 8px spacing rhythm, 12–16px corners.

## Assets
Both JPEGs visually verified from the referenced chat. Black upload has embedded checkerboard. Preserve original sources in docs/assets; edited transparent raster is derived, never a claimed vector master. Do not substitute colored mark. Palette input and mark are identified by content, not attachment enumeration order.

## Behavior and accessibility
Six anchored sections; navigation is progressively enhanced. Mobile disclosure closes on selection/Escape and restores focus. Concept details use native dialog with focus restoration. Pricing selects prefill quote service/budget; maintenance remains optional. Native selects use OS popup deliberately. Form has shared client/server validation, inline associated errors, focus-first-invalid, pending/timeout/failure recovery, no persistent personal data, and no invented submission success. Preview mode downloads a request and explicitly says not sent. Delivery mode only succeeds after webhook acknowledges. No analytics or nonessential cookies. Reduced-motion, visible focus, 320px reflow, reserved image geometry, global operable scrollbar.

## Architecture choice
Dependency-free semantic HTML/CSS/ES modules plus Node 22+ server and portable serverless adapters. The earlier React recommendation is treated as optional: no client framework is needed for this marketing MVP. All content is crawlable without JavaScript. Deployable source is the requested deliverable; no public deployment is performed.
