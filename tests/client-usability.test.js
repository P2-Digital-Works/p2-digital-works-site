import test from "node:test";
import assert from "node:assert/strict";
import { validateQuote } from "../public/validation.js";
import * as inquiry from "../public/inquiry.js";
const prospect = {
  name: "Alex Example",
  email: "alex@example.com",
  brief: "I want people to find my shop and ask about our products.",
  consent: true,
};
test("a prospect can ask for help without a business or project name", () => {
  const result = validateQuote(prospect);
  assert.deepEqual(result.errors, {});
  assert.equal(result.data.business, "");
});
test("optional business information still rejects overlong and non-text values", () => {
  for (const business of ["a".repeat(151), 123, {}])
    assert.ok(validateQuote({ ...prospect, business }).errors.business);
});
test("a draft without a business name has a readable subject and no undefined values", () => {
  const uri = new URL(
    inquiry.createInquiryEmail("hello@example.com", prospect),
  );
  assert.equal(
    uri.searchParams.get("subject"),
    "Project inquiry — Alex Example",
  );
  assert.doesNotMatch(uri.searchParams.get("body"), /undefined/);
});
test("the webmail copy and mail app contain the same complete Unicode inquiry", () => {
  assert.equal(typeof inquiry.createInquiryDraft, "function");
  const data = {
    ...prospect,
    business: "Café & Co",
    businessType: "Bakery",
    budget: "Not sure yet",
    service: "Help me decide",
    brief: "We sell bread.\nCan customers ask about orders & pickup?",
    contact: "Phone",
    phone: "+63 912 345 6789",
  };
  const draft = inquiry.createInquiryDraft("hello@example.com", data);
  const uri = new URL(draft.mailto);
  assert.equal(draft.recipient, "hello@example.com");
  assert.equal(uri.searchParams.get("subject"), draft.subject);
  assert.equal(uri.searchParams.get("body"), draft.body);
  assert.equal(
    draft.text,
    `To: hello@example.com\nSubject: ${draft.subject}\n\n${draft.body}`,
  );
  for (const value of Object.values(data).filter((v) => typeof v === "string"))
    assert.ok(draft.body.includes(value));
  assert.throws(() =>
    inquiry.createInquiryDraft("hello@example.com?bcc=other@example.com", data),
  );
});
