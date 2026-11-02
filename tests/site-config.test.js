import test from "node:test";
import assert from "node:assert/strict";
import {
  getPublicConfig,
  publicConfigScript,
  applySiteSettings,
} from "../lib/site-config.js";
test("public configuration exposes contact email and capability, never delivery secrets", () => {
  const env = {
    CONTACT_EMAIL: "hello@example.com",
    QUOTE_WEBHOOK_URL: "https://private.example/secret",
    QUOTE_WEBHOOK_TOKEN: "private-token",
  };
  assert.deepEqual(getPublicConfig(env), {
    deliveryEnabled: true,
    contactEmail: "hello@example.com",
  });
  const script = publicConfigScript(env);
  assert.doesNotMatch(script, /private|token|secret/);
  assert.match(script, /hello@example.com/);
});
test("direct delivery cannot build a misleading email-only privacy page", () => {
  assert.throws(
    () =>
      applySiteSettings("<!-- delivery-privacy -->", {
        QUOTE_WEBHOOK_URL: "https://private.example",
      }),
    /INQUIRY_PRIVACY_NOTE/,
  );
  const html = applySiteSettings("<!-- delivery-privacy -->", {
    QUOTE_WEBHOOK_URL: "https://private.example",
    INQUIRY_PRIVACY_NOTE: "Our receiver <Example> stores inquiries.",
  });
  assert.match(html, /&lt;Example&gt;/);
  assert.doesNotMatch(html, /<Example>/);
});
test("public email rejects header/URL injection", () =>
  assert.throws(() =>
    getPublicConfig({ CONTACT_EMAIL: "bad@example.com?bcc=other@example.com" }),
  ));
