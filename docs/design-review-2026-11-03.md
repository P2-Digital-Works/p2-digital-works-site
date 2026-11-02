# Design hook review — 3 November 2026

Scope: triage the homepage hook findings against source and the live site at https://p2digitalworks.netlify.app/. This is a targeted review, not WCAG certification or a redesign.

## Result

No confirmed usability defect was established among the reported design findings. Preserve the existing visual composition. The raw detector returned 24 findings across 10 rules, including repeated instances and three shadow advisories.

| Finding | Evidence and decision |
| --- | --- |
| Low contrast | Contact caption uses #92aeba on the inherited navy #06263e, giving 6.63:1 contrast. The detector assumed white. Computed size is 14px. False positive. |
| Tiny / undersized functional text | The quoted miniature navigation and architecture label are noninteractive spans inside the hero's labeled `role="img"`; appointment artwork is `aria-hidden`. These are illustrative mockups, as DESIGN.md specifies. No visible site text outside artwork was below 11px in the 375px check. Preserve artwork. |
| Side borders | Appointment accents belong to decorative artwork. The old notice's 3px border is overridden; computed notice border is zero, with 14px text and 14px padding. False positive / illustration exception. |
| Wide / tight tracking | Reported instances are short uppercase labels or miniature concept typography. Real paragraph tracking is normal. Preserve established illustrative typography. |
| Cramped padding | Desktop process steps have 28px top padding; mobile steps have 50px left padding beside the timeline. About copy has 40px left padding on desktop, and its border is removed on mobile. Toolbar text is vertically centered in a 37px-high illustration. False positives. |
| Clipped overflow | Hero overflow contains tilted artwork, not a popup. Mobile navigation and the native project dialog sit outside that section. No clipped interactive layer observed. Preserve intentional clipping. |
| Dark glow | The reported #0c344a55 shadow has a 24px vertical offset and -30px spread beneath artwork in a white hero. It is not a zero-offset halo on a dark background. Preserve existing elevation. |
| Thin borders / wide shadows | These advisories describe the illustrated browser, its floating annotation, and the project dialog. Retain existing surface edges and offset elevation. |

## Verification

- Inspected live desktop at 1280×720 and mobile at 375×812, including screenshots and computed CSS.
- Mobile document width was 375px at a 375px viewport: no horizontal page overflow.
- Opened/closed mobile menu and opened Northline concept details.
- Escape closed the concept dialog and returned focus to its originating button.
- Checked source event listeners for navigation, concept buttons, and dialog dismissal. The premium static audit still reports ten actionless-button errors because it does not resolve these externally registered handlers; retain that raw evidence in premium-audit.json.
- Did not submit an inquiry, send mail, change the live deployment, or run a complete accessibility/performance audit.

## Detector configuration

Recorded evidence-backed exceptions in `.impeccable/config.json` through `impeccable hooks ignore-value`. The CLI does not extract individual values for these rules, so each exception is scoped to `public/index.html`; no global rule ignore or whole-file ignore was added. These rule exceptions cover that homepage, including future edits: reconsider them when changing its artwork, typography, backgrounds, spacing, or overlay structure. No product HTML/CSS was changed for this review.

The existing PRODUCT.md uses an older Impeccable schema. Modernizing it belongs to the separate `init` workflow and was left outside this review.
