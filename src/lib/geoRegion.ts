/**
 * Where "is this visitor in a regulated region?" is decided.
 *
 * Shared by `middleware.ts` (which writes the `geo-region` cookie at the edge)
 * and `CookieBanner.tsx` (which reads it). They were written apart and drifted:
 * the middleware wrote a value the banner could never match. Keeping the
 * producer and the consumer in one file is the point of this module.
 */

/**
 * Jurisdictions where we show an explicit consent notice.
 *
 * Mirrors the `region` array of the regional `gtag('consent','default')` block
 * in `index.html`. The two must stay in step: that block decides what Google
 * *stores*, this set decides whether a human is *told*. US entries are
 * ISO 3166-2 ("US-CA"); non-US entries are ISO 3166-1 country codes ("GB").
 */
export const REGULATED_REGIONS: ReadonlySet<string> = new Set([
  "US-CA", "US-CO", "US-CT", "US-UT", "US-VA", "US-TX", "US-OR",
  "US-MT", "US-IA", "US-DE", "US-NH", "US-NJ", "US-TN",
  "GB", "AT", "BE", "BG", "HR", "CY", "CZ", "DK", "EE", "FI", "FR",
  "DE", "GR", "HU", "IS", "IE", "IT", "LV", "LI", "LT", "LU", "MT",
  "NL", "NO", "PL", "PT", "RO", "SK", "SI", "ES", "SE",
  "BR", "CA",
]);

/** The fields of `@vercel/functions`' `Geo` that this module reads. */
export interface GeoInput {
  /** ISO 3166-1 country of the client IP, e.g. "US". */
  country?: string;
  /**
   * ISO 3166-2 subdivision of the client IP, e.g. "CA" for California.
   *
   * NOT `Geo.region` — that is the Vercel Edge Network location that served
   * the request ("iad1", "sfo1"), which is a fact about our infrastructure and
   * says nothing about the visitor. Reading it here is the bug this module
   * exists to prevent; see the regression test.
   */
  countryRegion?: string;
}

/** Value written to the `geo-region` cookie. "US-CA", "GB", or "UNKNOWN". */
export function geoRegionValue(geo: GeoInput): string {
  const country = geo.country ?? "";
  const countryRegion = geo.countryRegion ?? "";
  if (country === "US" && countryRegion) return `US-${countryRegion}`;
  return country || "UNKNOWN";
}

/** Whether a `geo-region` cookie value falls in a jurisdiction we notify. */
export function isRegulatedRegion(value: string | null | undefined): boolean {
  if (!value) return false;
  return REGULATED_REGIONS.has(value);
}
