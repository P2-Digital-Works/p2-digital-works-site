import test from "node:test";
import assert from "node:assert/strict";
import { validateQuote } from "../public/validation.js";
import { createInquiryEmail } from "../public/inquiry.js";
const minimal = {
  name: "Alex Example",
  email: "alex@example.com",
  business: "Example project",
  brief: "A business website to explain our services and receive inquiries.",
  consent: true,
};
test("a useful inquiry does not require budget, service or timeline", () => {
  const { errors, data } = validateQuote(minimal);
  assert.deepEqual(errors, {});
  assert.equal(data.contact, "Email");
  assert.equal(data.budget, "");
});
test("optional budget accepts a short description without forcing package ranges", () => {
  assert.deepEqual(
    validateQuote({ ...minimal, budget: "Not decided yet" }).errors,
    {},
  );
  assert.ok(
    validateQuote({ ...minimal, budget: "a".repeat(101) }).errors.budget,
  );
});
test("email handoff uses confirmed recipient and safely encodes visitor text", () => {
  const uri = createInquiryEmail("paulrodolf.castor@g.msuiit.edu.ph", {
    ...minimal,
    business: "A & B #1",
    businessType: "Retail",
    brief: "A website\nwith services & inquiries?",
  });
  const u = new URL(uri);
  assert.equal(u.pathname, "paulrodolf.castor@g.msuiit.edu.ph");
  assert.match(u.searchParams.get("body"), /A & B #1/);
  assert.match(u.searchParams.get("body"), /services & inquiries\?/);
  assert.equal(u.searchParams.get("bcc"), null);
  assert.match(u.searchParams.get("body"), /Business type: Retail/);
});
test("email handoff rejects malformed destination instead of adding headers", () => {
  assert.throws(() =>
    createInquiryEmail("a@example.com?bcc=someone@example.com", minimal),
  );
});
