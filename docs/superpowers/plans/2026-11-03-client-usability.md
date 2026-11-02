# Client Usability Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox syntax for tracking.

**Goal:** Make the six-page site easier to understand and contact for technical and nontechnical prospects.
**Architecture:** Preserve static HTML/CSS/ES modules. Share inquiry draft serialization with mailto and copy/download output; preserve optional delivery API behavior.
**Tech Stack:** HTML, CSS, JavaScript ES modules, Node built-in test runner.
**Spec:** docs/superpowers/specs/2026-11-03-client-usability-design.md

## Global Constraints

Existing brand and service scope; no fabricated business facts, prices or delivery claims; no new dependencies, accounts, tracking or publication. Work in the attached checkout per host instructions; leave changes reviewable and uncommitted. User's “go” authorizes execution of the discussed direction without another handoff question.

## Review Focus

- Missing business name must work through validation and email subject creation.
- Unicode/multiline draft data must match across email, copy and backup.
- Editing a prepared draft must remove stale actions and content.
- Webmail/clipboard failure must leave a readable selectable draft.
- Optional phone validation must open its disclosure and focus the field.

### Task 1: Inquiry model and form

**Files:** public/validation.js, public/inquiry.js, public/app.js, public/index.html, tests/inquiry.test.js.
**Interfaces:** createInquiryDraft(recipient, data) -> {recipient, subject, body, text, mailto}; existing createInquiryEmail delegates to its mailto. Shared validation permits blank business but preserves limits and rejects malformed types.

- [x] Add behavior tests for missing business, business limits/type, fallback subject, and draft/email text agreement; run and confirm failure.
- [x] Implement model, form preview and copy/recovery/invalidation. Keep submit disabled until handler installed and preserve direct-delivery branch.
- [x] Run full tests, including optional receiver success/failure and privacy safety.

### Task 2: Plain-language journey and styling

**Files:** public/index.html, public/services/\*.html, public/privacy.html, public/styles.css.

- [x] Update shared navigation, hero, client-need service descriptions, process/FAQ and contact guidance; preserve factual meaning and available routes.
- [x] Use single-column form and preview, coherent focus/touch states, mobile layout and consistent sibling pages.
- [x] Inspect desktop/mobile together, exercise navigation and service pages; fix verified issues in one batch.

### Task 3: Verification, review and handoff

**Files:** DESIGN.md, PRODUCT.md, VERIFICATION.md, README.md, docs/client-usability-testing.md.

- [x] Update project records and add a realistic target-user testing protocol with observable tasks and metrics.
- [x] Run check, full test suite, build, strict static audit and one final Impeccable detector; distinguish real failures from parser limitations.
- [x] Request one fresh code review, address important findings, and confirm affected flows.
- [x] Save desktop/mobile screenshots, supply local preview and report the remaining delivery/user-testing limits. No deployment.

## Execution record

Ruling: use the attached checkout, with no worktree/branch creation or commits, per the host's instruction to prefer a suitable current checkout. Existing untracked audit report preserved. User's “go” is authorization to carry out the discussed approach without another planning approval.

Tasks 1–3 complete: shared inquiry model and UI, six-page plain-language refinement, browser verification, final formatting/check/build and 27 passing tests. Fresh reviewer found no actionable regressions. Static scan limitations and evidence are in VERIFICATION.md. No deployment, real email or target-user study was performed.
