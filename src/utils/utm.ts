/**
 * Credenza UTM attribution — appends `utm_source=credenza` (plus medium /
 * campaign) to outbound links so partners, photographers, designers, and
 * vendors can see Credenza-driven traffic in their own analytics.
 *
 * Mirrors the helper of the same name in the cert-tool repo — keep the two
 * in sync if either changes.
 */

const SKIP_HOST_PATTERNS: ReadonlyArray<RegExp> = [
  /\.gov$/i,
  /^gov$/i,
  /(^|\.)mtc\.gov$/i,
  /(^|\.)streamlinedsalestax\.org$/i,
  /(^|\.)sst\.org$/i,
  /(^|\.)usecredenza\.com$/i,
  /(^|\.)credenza\.dev$/i,
  /^localhost$/i,
];

function shouldSkip(hostname: string): boolean {
  return SKIP_HOST_PATTERNS.some((rx) => rx.test(hostname));
}

export type UtmMedium =
  | "marketing"        // top-level marketing pages
  | "marketing-hero"   // hero / landing sections
  | "photo-credit"     // image attribution links
  | "designer-credit"
  | "footer"
  | "blog";

export function withCredenzaUtm(
  url: string | null | undefined,
  medium: UtmMedium,
  campaign?: string
): string {
  if (!url) return "";
  const raw = url.trim();
  if (!raw) return "";
  const candidate = /^[a-z][a-z0-9+.-]*:\/\//i.test(raw) ? raw : `https://${raw}`;

  let parsed: URL;
  try {
    parsed = new URL(candidate);
  } catch {
    return url;
  }

  if (parsed.protocol !== "http:" && parsed.protocol !== "https:") return url;
  if (shouldSkip(parsed.hostname)) return url;

  if (!parsed.searchParams.has("utm_source")) parsed.searchParams.set("utm_source", "credenza");
  if (!parsed.searchParams.has("utm_medium")) parsed.searchParams.set("utm_medium", medium);
  if (campaign && !parsed.searchParams.has("utm_campaign")) {
    parsed.searchParams.set("utm_campaign", campaign);
  }

  return parsed.toString();
}
