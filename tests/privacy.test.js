import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
test("form cannot leak personal details through default GET when JavaScript is unavailable", async () => {
  const html = await readFile(
    new URL("../public/index.html", import.meta.url),
    "utf8",
  );
  const form = html.match(/<form\b[^>]*id="quote-form"[^>]*>/)?.[0];
  assert.match(form, /method="post"/i);
  assert.match(form, /action="\/api\/quote"/);
  assert.match(
    html.match(/<button\b[^>]*id="submit-quote"[^>]*>/)?.[0],
    /\bdisabled\b/,
  );
});
