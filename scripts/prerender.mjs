/**
 * Static prerender for AEO / answer-engine crawlers.
 *
 * The marketing site is a client-rendered Vite SPA. Each page sets its
 * <head> (title, meta description, canonical, JSON-LD) inside a useEffect,
 * which only runs after JavaScript executes. Raw-HTML crawlers (ClaudeBot,
 * GPTBot, PerplexityBot, etc.) don't run that JS, so without this step they
 * see the homepage's generic <head> and an empty #root for every route.
 *
 * This postbuild step serves the freshly-built dist/, drives headless Chrome
 * through every known route, lets each page's effects run, and snapshots the
 * fully-rendered HTML to dist/<route>/index.html. The SPA bundle is left in
 * the snapshot, so real users still hydrate into the normal interactive app —
 * this is pure progressive enhancement for crawlers and first paint.
 *
 * Safety: prerendering can NEVER block a deploy. If Chrome fails to launch we
 * log and exit 0 (the SPA shell ships, i.e. today's behavior). Per-route
 * failures are logged and skipped, leaving that route to the SPA fallback.
 */
import { createServer } from "node:http";
import { readFile, writeFile, mkdir, stat } from "node:fs/promises";
import { join, extname, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const DIST = join(dirname(fileURLToPath(import.meta.url)), "..", "dist");

// Every static route in src/App.tsx except the "*" (NotFound) wildcard.
const ROUTES = [
  "/",
  "/for-designers",
  "/about",
  "/resources",
  "/resources/interior-designer-resale-certificate-guide",
  "/resale-certificate-management",
  "/automated-designer-verification",
  "/shopify",
  "/social-cards",
  "/privacy-policy",
  "/terms-of-use",
];

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".gif": "image/gif",
  ".ico": "image/x-icon",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".ttf": "font/ttf",
  ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml; charset=utf-8",
  ".webmanifest": "application/manifest+json",
};

async function exists(p) {
  try {
    const s = await stat(p);
    return s.isFile();
  } catch {
    return false;
  }
}

// Tiny static server with SPA fallback to index.html — mirrors how Vercel
// serves the built site (static files first, SPA fallback otherwise).
function startServer() {
  const server = createServer(async (req, res) => {
    try {
      const url = new URL(req.url, "http://127.0.0.1");
      let pathname = decodeURIComponent(url.pathname);
      let filePath = join(DIST, pathname);

      if (pathname.endsWith("/")) filePath = join(filePath, "index.html");
      if (!extname(filePath)) {
        const asIndex = join(filePath, "index.html");
        filePath = (await exists(asIndex)) ? asIndex : filePath;
      }

      if (!(await exists(filePath))) filePath = join(DIST, "index.html"); // SPA fallback

      const body = await readFile(filePath);
      res.writeHead(200, { "Content-Type": MIME[extname(filePath)] || "application/octet-stream" });
      res.end(body);
    } catch (err) {
      res.writeHead(500);
      res.end(String(err));
    }
  });
  return new Promise((resolve) => {
    server.listen(0, "127.0.0.1", () => resolve({ server, port: server.address().port }));
  });
}

function outPathFor(route) {
  if (route === "/") return join(DIST, "index.html");
  return join(DIST, route.replace(/^\//, ""), "index.html");
}

async function main() {
  let puppeteer;
  try {
    puppeteer = (await import("puppeteer")).default;
  } catch (err) {
    console.warn("[prerender] puppeteer not available, skipping prerender (SPA shell will ship):", err?.message);
    return; // exit 0 — never block a deploy
  }

  const { server, port } = await startServer();
  const base = `http://127.0.0.1:${port}`;

  let browser;
  try {
    browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-dev-shm-usage"],
    });
  } catch (err) {
    console.warn("[prerender] could not launch Chrome, skipping prerender (SPA shell will ship):", err?.message);
    server.close();
    return; // exit 0 — never block a deploy
  }

  let ok = 0;
  let failed = 0;
  for (const route of ROUTES) {
    const page = await browser.newPage();
    try {
      await page.goto(`${base}${route}`, { waitUntil: "networkidle0", timeout: 30000 });
      // Give per-page useEffect head injection a beat to run, then confirm a
      // non-empty title was set (every page sets one) before snapshotting.
      await page
        .waitForFunction("document.title && document.title.length > 0", { timeout: 5000 })
        .catch(() => {});
      await new Promise((r) => setTimeout(r, 300));

      const html = "<!DOCTYPE html>\n" + (await page.evaluate(() => document.documentElement.outerHTML));
      const out = outPathFor(route);
      await mkdir(dirname(out), { recursive: true });
      await writeFile(out, html, "utf8");
      ok++;
      console.log(`[prerender] ✓ ${route} -> ${out.replace(DIST, "dist")}`);
    } catch (err) {
      failed++;
      console.warn(`[prerender] ✗ ${route} skipped (SPA fallback): ${err?.message}`);
    } finally {
      await page.close().catch(() => {});
    }
  }

  await browser.close().catch(() => {});
  server.close();
  console.log(`[prerender] done — ${ok} prerendered, ${failed} skipped, ${ROUTES.length} total`);
}

main().catch((err) => {
  // Last-resort guard: a crash here must not fail the production build.
  console.warn("[prerender] unexpected error, shipping SPA shell:", err?.message);
  process.exit(0);
});
