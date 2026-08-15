import assert from "node:assert/strict";
import test from "node:test";

async function render(path = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}-${path}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(new URL(path, "http://localhost"), {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("renders the NotiVault marketing page", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>[^<]*NotiVault[^<]*<\/title>/i);
  assert.match(html, /Deleted from the chat/i);
  assert.match(html, /Still safe in your vault/i);
  assert.match(html, /notification must arrive and be captured before/i);
  assert.match(html, /not affiliated with or endorsed by WhatsApp or Meta/i);
  assert.match(html, /Voice note · 0:24/i);
  assert.match(html, /Privacy is the product/i);
  assert.match(html, /Bunny Blossom/i);
  assert.match(html, /href="\/privacy-policy"/i);
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton/i);
});

test("renders a complete, public-ready privacy policy", async () => {
  const response = await render("/privacy-policy");
  assert.equal(response.status, 200);

  const html = await response.text();
  assert.match(html, /Privacy Policy/i);
  assert.match(html, /com\.notivault\.app/i);
  assert.match(html, /Notification Access/i);
  assert.match(html, /Google Play Billing/i);
  assert.match(html, /Clear all saved history/i);
  assert.match(html, /Baisalya/i);
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton/i);
});
