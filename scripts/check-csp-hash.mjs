/**
 * Fail the build if an executable inline <script> is not covered by a hash in
 * vercel.json's script-src.
 *
 * WHY: the Consent Mode v2 bootstrap in index.html must run inline, in <head>,
 * before gtag.js — so it cannot be externalised without changing when consent
 * defaults apply. The CSP therefore allows it by sha256 hash instead of
 * 'unsafe-inline'.
 *
 * A hash pins exact bytes. Edit that script, or change VITE_GA_ID (which Vite
 * substitutes into it), and the hash no longer matches: the browser silently
 * refuses to run it, consent defaults never fire, and nothing visibly breaks.
 * That is the failure this guard exists to make loud.
 *
 * Only executable scripts are checked. <script type="application/ld+json"> is a
 * data block — the HTML spec says an unrecognised type is not executed, so
 * script-src does not gate it.
 */
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { join } from 'node:path';

const htmlFiles = [];
(function walk(dir) {
  for (const e of readdirSync(dir)) {
    const p = join(dir, e);
    if (statSync(p).isDirectory()) walk(p);
    else if (e === 'index.html' || e === '404.html') htmlFiles.push(p);
  }
})('dist');

const csp = JSON.parse(readFileSync('vercel.json', 'utf8'))
  .headers.flatMap((h) => h.headers)
  .find((h) => h.key === 'Content-Security-Policy')?.value ?? '';

const INLINE = /<script(?![^>]*\bsrc=)([^>]*)>([\s\S]*?)<\/script>/g;
const missing = [];
let checked = 0;

for (const file of htmlFiles) {
  const html = readFileSync(file, 'utf8');
  for (const [, attrs, body] of html.matchAll(INLINE)) {
    const type = /type="([^"]+)"/.exec(attrs)?.[1];
    if (type && type !== 'text/javascript' && type !== 'module') continue; // data block
    checked++;
    const hash = `sha256-${createHash('sha256').update(body, 'utf8').digest('base64')}`;
    if (!csp.includes(hash)) missing.push({ file, hash, head: body.trim().slice(0, 60) });
  }
}

if (missing.length) {
  console.error('\nCSP hash mismatch — these inline scripts would be BLOCKED:\n');
  for (const m of missing) console.error(`  ${m.file}\n    ${m.hash}\n    ${m.head}...\n`);
  console.error("Add the hash to script-src in vercel.json, or revert the script change.\n");
  process.exit(1);
}
console.log(`CSP hash check: ${checked} inline script(s) across ${htmlFiles.length} pages, all covered.`);
