import { readFileSync } from "node:fs";
import { resolve } from "node:path";

import { describe, it, expect } from "vitest";

import { geoRegionValue, isRegulatedRegion, REGULATED_REGIONS } from "./geoRegion";

/**
 * The bug these tests exist for: middleware read `Geo.region` (the Vercel edge
 * location) instead of `Geo.countryRegion` (the visitor's subdivision), so the
 * cookie said "US-iad1" and every US visitor fell through the notice.
 */
describe("the regression", () => {
  const EDGE_REGIONS = ["iad1", "sfo1", "cle1", "dub1", "hnd1", "gru1"];

  it("never treats a Vercel edge location as a jurisdiction", () => {
    for (const edge of EDGE_REGIONS) {
      expect(isRegulatedRegion(`US-${edge}`)).toBe(false);
    }
  });

  it("ignores a Geo.region-shaped field entirely", () => {
    // A caller passing the wrong field gets "US", never "US-iad1" — the value
    // cannot be built out of the edge location even by mistake.
    const geo = { country: "US", region: "iad1" } as { country: string };
    expect(geoRegionValue(geo)).toBe("US");
  });

  it("builds the state value California is actually matched by", () => {
    expect(geoRegionValue({ country: "US", countryRegion: "CA" })).toBe("US-CA");
    expect(isRegulatedRegion("US-CA")).toBe(true);
  });
});

describe("US visitors", () => {
  const REGULATED_STATES = [
    "CA", "CO", "CT", "UT", "VA", "TX", "OR", "MT", "IA", "DE", "NH", "NJ", "TN",
  ];

  it.each(REGULATED_STATES)("notifies a visitor in US-%s", (state) => {
    const value = geoRegionValue({ country: "US", countryRegion: state });
    expect(value).toBe(`US-${state}`);
    expect(isRegulatedRegion(value)).toBe(true);
  });

  it.each(["FL", "NY", "WA", "IL"])("does not notify a visitor in US-%s", (state) => {
    expect(isRegulatedRegion(geoRegionValue({ country: "US", countryRegion: state }))).toBe(false);
  });

  it("does not confuse California the state with Canada the country", () => {
    // "CA" means Canada in the set; a Californian must arrive as "US-CA".
    expect(isRegulatedRegion("CA")).toBe(true);
    expect(geoRegionValue({ country: "US", countryRegion: "CA" })).not.toBe("CA");
  });
});

describe("non-US visitors", () => {
  it.each(["GB", "DE", "FR", "IE", "BR", "CA", "NO"])("notifies a visitor in %s", (country) => {
    const value = geoRegionValue({ country });
    expect(value).toBe(country);
    expect(isRegulatedRegion(value)).toBe(true);
  });

  it.each(["JP", "AU", "SG", "MX"])("does not notify a visitor in %s", (country) => {
    expect(isRegulatedRegion(geoRegionValue({ country }))).toBe(false);
  });

  it("ignores a subdivision outside the US", () => {
    // Only US subdivisions are in the set; a Bavarian is matched as "DE".
    expect(geoRegionValue({ country: "DE", countryRegion: "BY" })).toBe("DE");
  });
});

describe("unknown or partial locations", () => {
  it("falls back to UNKNOWN with no country", () => {
    expect(geoRegionValue({})).toBe("UNKNOWN");
    expect(isRegulatedRegion("UNKNOWN")).toBe(false);
  });

  it("falls back to UNKNOWN on an empty country", () => {
    expect(geoRegionValue({ country: "", countryRegion: "CA" })).toBe("UNKNOWN");
  });

  /**
   * DECISION, not an accident: a US visitor whose state cannot be resolved is
   * NOT shown the notice. This preserves the behaviour that shipped before the
   * fix. The safer-for-compliance alternative is to notify on doubt — flagged
   * in the PR rather than changed here.
   */
  it("does not notify a US visitor whose state is unresolved", () => {
    expect(geoRegionValue({ country: "US" })).toBe("US");
    expect(isRegulatedRegion("US")).toBe(false);
  });

  it("treats a missing or malformed cookie as not regulated", () => {
    expect(isRegulatedRegion(null)).toBe(false);
    expect(isRegulatedRegion(undefined)).toBe(false);
    expect(isRegulatedRegion("")).toBe(false);
    expect(isRegulatedRegion("us-ca")).toBe(false); // case-sensitive by design
  });
});

describe("the set itself", () => {
  /**
   * Google Consent Mode does its own regional gating, from the request IP, via
   * the `region:` array of the second `gtag('consent','default')` block in
   * index.html. That array decides what Google STORES; REGULATED_REGIONS
   * decides whether a human is TOLD. Drift between them is silent in both
   * directions — storage denied where no notice appears, or a notice where
   * storage was never gated — so the invariant is asserted against the real
   * file rather than a copy.
   */
  it("stays in step with the gtag regional default in index.html", () => {
    const html = readFileSync(resolve(__dirname, "../../index.html"), "utf8");
    const block = html.match(/region:\s*\[([\s\S]*?)\]/);
    expect(block, "regional consent default not found in index.html").not.toBeNull();

    const fromHtml = new Set(
      [...block![1].matchAll(/'([A-Z-]+)'/g)].map((m) => m[1]),
    );
    expect(fromHtml.size).toBeGreaterThan(40);
    expect([...fromHtml].sort()).toEqual([...REGULATED_REGIONS].sort());
  });
});
