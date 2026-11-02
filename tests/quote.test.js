import test from "node:test";
import assert from "node:assert/strict";
import { validateQuote } from "../public/validation.js";
import { handleQuote } from "../lib/quote.js";
const valid = {
  name: "Alex Rivera",
  email: "alex@example.com",
  business: "Sample shop",
  businessType: "Retail",
  service: "Business website",
  budget: "₱20,000–₱35,000",
  timeline: "1–2 months",
  contact: "Email",
  phone: "",
  brief: "We need a five-page business website with a contact form.",
  consent: true,
  website: "",
};
const request = (
  data = valid,
  origin = "https://p2.example",
  method = "POST",
) =>
  new Request("https://p2.example/api/quote", {
    method,
    headers: { origin, "content-type": "application/json" },
    body: method === "POST" ? JSON.stringify(data) : undefined,
  });
test("valid quote is accepted and trimmed without extra fields", () => {
  const r = validateQuote({
    ...valid,
    name: "  Alex Rivera ",
    unexpected: "discard",
  });
  assert.deepEqual(r.errors, {});
  assert.equal(r.data.name, "Alex Rivera");
  assert.equal(r.data.unexpected, undefined);
});
test("rejects missing, malformed, overlong and unconsented input", () => {
  const { errors } = validateQuote({
    ...valid,
    name: "",
    email: "wrong",
    brief: "a".repeat(5001),
    consent: false,
  });
  for (const key of ["name", "email", "brief", "consent"])
    assert.ok(errors[key]);
});
test("phone is required only for requested phone contact", () => {
  assert.ok(validateQuote({ ...valid, contact: "Phone" }).errors.phone);
  assert.deepEqual(
    validateQuote({ ...valid, contact: "Phone", phone: "+63 912 345 6789" })
      .errors,
    {},
  );
});
test("rejects null, array, wrong types and invalid selections", () => {
  for (const data of [
    null,
    [],
    { ...valid, name: 4 },
    { ...valid, service: "invented" },
    { ...valid, consent: "true" },
  ])
    assert.ok(Object.keys(validateQuote(data).errors).length);
});
test("missing delivery configuration returns explicit preview, never sent", async () => {
  const r = await handleQuote(request(), {});
  assert.equal(r.status, 503);
  assert.equal((await r.json()).code, "NOT_CONFIGURED");
});
test("valid quote sends normalized data only after upstream acknowledges", async () => {
  let body;
  const r = await handleQuote(
    request(),
    { QUOTE_WEBHOOK_URL: "https://receiver.example/quotes" },
    {
      fetch: async (url, init) => {
        body = JSON.parse(init.body);
        return new Response(null, { status: 204 });
      },
    },
  );
  assert.equal(r.status, 200);
  assert.equal((await r.json()).delivered, true);
  assert.equal(body.email, valid.email);
});
test("provider errors never claim delivery", async () => {
  const r = await handleQuote(
    request(),
    { QUOTE_WEBHOOK_URL: "https://receiver.example/quotes" },
    { fetch: async () => new Response("fail", { status: 500 }) },
  );
  assert.equal(r.status, 502);
  assert.equal((await r.json()).delivered, undefined);
});
test("network failure is recoverable", async () => {
  const r = await handleQuote(
    request(),
    { QUOTE_WEBHOOK_URL: "https://receiver.example/quotes" },
    {
      fetch: async () => {
        throw Error("offline");
      },
    },
  );
  assert.equal(r.status, 502);
});
test("rejects invalid, bot and cross-origin requests before delivery", async () => {
  assert.equal(
    (await handleQuote(request({ ...valid, email: "" }), {})).status,
    422,
  );
  assert.equal(
    (await handleQuote(request({ ...valid, website: "spam" }), {})).status,
    400,
  );
  assert.equal(
    (await handleQuote(request(valid, "https://evil.example"), {})).status,
    403,
  );
  assert.equal(
    (await handleQuote(request(valid, "https://p2.example", "GET"), {})).status,
    405,
  );
});
test("rejects malformed JSON and oversized body", async () => {
  const req = new Request("https://p2.example/api/quote", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: "{",
  });
  assert.equal((await handleQuote(req, {})).status, 400);
  assert.equal(
    (await handleQuote(request({ ...valid, brief: "a".repeat(17000) }), {}))
      .status,
    413,
  );
});
