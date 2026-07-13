import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

const templateRoot = new URL("../", import.meta.url);

async function render(path = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`http://localhost${path}`, {
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

test("server-renders the MachMemo site shell", async () => {
  const response = await render("/");
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /MachMemo - Machine memory for maintenance intelligence/i);
  assert.doesNotMatch(html, /Your site is taking shape|Codex is building/i);
  assert.doesNotMatch(html, /react-loading-skeleton|codex-preview/i);
});

test("finished site files do not reference starter preview artifacts", async () => {
  const [page, layout, site, css, packageJson] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/MachMemoSite.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
  ]);

  assert.match(page, /<MachMemoSite page="home" \/>/);
  assert.match(layout, /MachMemo - Machine memory/);
  assert.match(site, /Turn machine issues into maintenance intelligence/);
  assert.match(css, /--color-circuit:\s*#1f8a70/i);
  assert.doesNotMatch(packageJson, /site-creator-vinext-starter|react-loading-skeleton/);
  assert.doesNotMatch(
    `${page}\n${layout}\n${site}\n${css}`,
    /codex-preview|_sites-preview|SkeletonPreview|Starter Project/,
  );

  await assert.rejects(access(new URL("app/_sites-preview", templateRoot)));
});
