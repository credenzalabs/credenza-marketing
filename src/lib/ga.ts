/**
 * GA4 client_id reader for cross-domain stitching.
 *
 * The marketing site and trade app share `.usecredenza.com`, so the `_ga`
 * cookie set by gtag is visible on both. Reading the client_id at form
 * submit time and forwarding it to the server lets server-side Measurement
 * Protocol calls attribute vendor leads back to the original browser session.
 *
 * Returns null when the cookie isn't present (gtag hasn't fired yet, or the
 * visitor is on a domain without our tag) — callers should treat it as
 * optional and fall back gracefully.
 */
export function getGaClientId(): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(/(?:^|;\s*)_ga=([^;]*)/);
  if (!match) return null;
  // Cookie format: "GA1.{depth}.{part1}.{part2}" → client_id = "{part1}.{part2}"
  const parts = match[1].split(".");
  if (parts.length < 4) return null;
  return parts.slice(2).join(".");
}
