import test from "node:test";
import assert from "node:assert/strict";
import { createApp } from "../server.mjs";
async function withServer(run) {
  const server = createApp({});
  await new Promise((ok, no) => {
    server.once("error", no);
    server.listen(0, "127.0.0.1", ok);
  });
  try {
    await run(`http://127.0.0.1:${server.address().port}`);
  } finally {
    await new Promise((ok) => server.close(ok));
  }
}
test("HTTP serves app, logo, modules and security headers", () =>
  withServer(async (base) => {
    for (const path of [
      "/",
      "/styles.css",
      "/app.js",
      "/assets/p2-black.png",
    ]) {
      const r = await fetch(base + path);
      assert.equal(r.status, 200);
      assert.equal(r.headers.get("x-content-type-options"), "nosniff");
    }
    assert.match(await (await fetch(base + "/")).text(), /P2 Digital Works/);
    assert.match(await (await fetch(base + "/site-config.js")).text(), /false/);
    assert.equal((await fetch(base + "/.env")).status, 404);
    assert.equal((await fetch(base + "/missing")).status, 404);
  }));
test("HTTP endpoint rejects invalid requests and rate limits repeats", () =>
  withServer(async (base) => {
    const post = () =>
      fetch(base + "/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json", Origin: base },
        body: "{}",
      });
    assert.equal((await post()).status, 422);
    for (let i = 0; i < 4; i++) await post();
    const limited = await post();
    assert.equal(limited.status, 429);
    assert.equal(limited.headers.get("retry-after"), "900");
  }));
