/**
 * usePageMeta — the per-route <head> for a client-rendered SPA.
 *
 * index.html ships one hardcoded <head> (title, description, canonical, og:*,
 * twitter:*). Without this hook, every route inherits the homepage's values —
 * so crawlers see `<link rel="canonical" href="https://usecredenza.com/">` on
 * /shopify, /for-designers, and the resale certificate guide, which tells them
 * those pages are duplicates of the homepage and must not be indexed or cited
 * on their own. The same applied to og:url/og:title/og:description, so every
 * shared link rendered as the homepage card.
 *
 * Every route calls this hook exactly once, at the top of the page component.
 * It writes in place over the tags already in index.html (creating any that are
 * missing) so scripts/prerender.mjs snapshots the correct values into each
 * route's static HTML.
 *
 * No cleanup on unmount by design: every route sets its own values on mount,
 * so restoring the previous route's head would just add an ordering hazard.
 * A new route MUST call this hook, or it inherits whatever the last one set.
 */

import { useEffect } from "react";

export const SITE_URL = "https://usecredenza.com";

const DEFAULT_OG_IMAGE = `${SITE_URL}/studio-dorion-og-square.jpg`;
const DEFAULT_OG_IMAGE_ALT =
  "Park Slope brownstone interior designed by Studio Dorion";

export type PageMeta = {
  /** The full <title>, used verbatim. */
  title: string;
  description: string;
  /** Route path ("/about"). Drives both canonical and og:url. */
  path: string;
  /** Absolute URL or root-relative path. Defaults to the site card. */
  image?: string;
  imageAlt?: string;
  /** Social-card overrides, when the SERP title is too long for a card. */
  ogTitle?: string;
  ogDescription?: string;
  /** Keep the page out of the index (utility routes, 404). */
  noindex?: boolean;
};

/** Route path -> absolute URL. The homepage keeps its trailing slash. */
export function absoluteUrl(path: string): string {
  if (/^https?:\/\//.test(path)) return path;
  return path === "/" ? `${SITE_URL}/` : `${SITE_URL}${path}`;
}

function setMeta(key: "name" | "property", value: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(
    `meta[${key}="${value}"]`,
  );
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(key, value);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function setCanonical(href: string) {
  let el = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", "canonical");
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

// Indexable pages state it explicitly rather than relying on the crawler
// default, and lift the two limits that otherwise cap how much of a page an
// answer engine may quote: max-snippet:-1 removes the text-length ceiling on
// snippets, max-image-preview:large allows a full-size image in rich results.
// Both are opt-in — without them Google applies conservative defaults.
const INDEX_DIRECTIVES =
  "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1";

function setRobots(noindex: boolean) {
  setMeta("name", "robots", noindex ? "noindex, follow" : INDEX_DIRECTIVES);
}

export function usePageMeta(meta: PageMeta) {
  const {
    title,
    description,
    path,
    image,
    imageAlt,
    ogTitle,
    ogDescription,
    noindex,
  } = meta;

  useEffect(() => {
    const url = absoluteUrl(path);
    const cardImage = image ? absoluteUrl(image) : DEFAULT_OG_IMAGE;
    const cardImageAlt = image ? (imageAlt ?? "") : DEFAULT_OG_IMAGE_ALT;
    // Social cards render og:site_name ("Credenza") beside the title, so the
    // " | Credenza" suffix is redundant there and eats the ~60-char budget
    // before truncation. Drop it for the card; the <title> keeps it for SERPs.
    const cardTitle = ogTitle ?? title.replace(/\s*\|\s*Credenza$/, "");
    const cardDescription = ogDescription ?? description;

    document.title = title;
    setMeta("name", "description", description);
    setCanonical(url);

    setMeta("property", "og:url", url);
    setMeta("property", "og:title", cardTitle);
    setMeta("property", "og:description", cardDescription);
    setMeta("property", "og:image", cardImage);
    if (cardImageAlt) setMeta("property", "og:image:alt", cardImageAlt);
    if (image) {
      // The static dimensions in index.html describe the default card only.
      document.head.querySelector('meta[property="og:image:width"]')?.remove();
      document.head.querySelector('meta[property="og:image:height"]')?.remove();
    }

    setMeta("name", "twitter:title", cardTitle);
    setMeta("name", "twitter:description", cardDescription);
    setMeta("name", "twitter:image", cardImage);

    setRobots(!!noindex);
  }, [
    title,
    description,
    path,
    image,
    imageAlt,
    ogTitle,
    ogDescription,
    noindex,
  ]);
}
