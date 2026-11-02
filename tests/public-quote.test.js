import test from "node:test";
import assert from "node:assert/strict";
import { handlePublicQuote } from "../lib/public-quote.js";
const valid = {
  name: "Alex Example",
  email: "alex@example.com",
  business: "Demo Business",
  businessType: "",
  service: "Business website",
  budget: "₱20,000–₱35,000",
  timeline: "1–2 months",
  contact: "Email",
  brief: "A useful business website with a contact form.",
  consent: true,
};
test("shared public handler limits delivery calls, including clients without Origin", async () => {
  let sent = 0;
  const options = {
    clientIp: "test-limited-client",
    fetch: async () => {
      sent++;
      return new Response(null, { status: 204 });
    },
  };
  const request = () =>
    new Request("https://p2.example/api/quote", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(valid),
    });
  for (let i = 0; i < 5; i++)
    assert.equal(
      (
        await handlePublicQuote(
          request(),
          { QUOTE_WEBHOOK_URL: "https://receiver.example" },
          options,
        )
      ).status,
      200,
    );
  const result = await handlePublicQuote(
    request(),
    { QUOTE_WEBHOOK_URL: "https://receiver.example" },
    options,
  );
  assert.equal(result.status, 429);
  assert.equal(sent, 5);
  assert.equal(result.headers.get("retry-after"), "900");
});
test("different clients have separate limits", async () => {
  const request = new Request("https://p2.example/api/quote", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(valid),
  });
  assert.equal(
    (await handlePublicQuote(request, {}, { clientIp: "another-test-client" }))
      .status,
    503,
  );
});
