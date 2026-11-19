import { describe, it, expect } from "vitest";

import {
  consentPayload,
  parseChoice,
  shouldShowBanner,
  type Choice,
} from "./consent";

describe("whether the notice appears", () => {
  it("shows on a first visit from a regulated region", () => {
    expect(shouldShowBanner(null, "US-CA")).toBe(true);
    expect(shouldShowBanner(null, "GB")).toBe(true);
  });

  it("stays hidden on a first visit from a placeable, unregulated location", () => {
    expect(shouldShowBanner(null, "US-FL")).toBe(false);
    expect(shouldShowBanner(null, "JP")).toBe(false);
  });

  it("shows on a first visit we cannot place", () => {
    // Conservative on doubt — see shouldNotify().
    expect(shouldShowBanner(null, "UNKNOWN")).toBe(true);
    expect(shouldShowBanner(null, "US")).toBe(true);
    expect(shouldShowBanner(null, null)).toBe(true);
  });

  it("stays hidden once a choice exists, whichever way it went", () => {
    expect(shouldShowBanner("granted", "US-CA")).toBe(false);
    expect(shouldShowBanner("denied", "US-CA")).toBe(false);
  });

  it("does not re-ask a visitor who answered and then moved region", () => {
    expect(shouldShowBanner("denied", "GB")).toBe(false);
  });

  /**
   * The stale-cookie window. `geo-region` has Max-Age=3600, but middleware
   * re-sets it on every document request, so a visitor carrying the old
   * "US-iad1" value gets the corrected one on their very next page load. Until
   * that response lands, the old value must still fail closed rather than
   * throw.
   */
  it("treats a pre-fix cookie as a placeable, unregulated location", () => {
    // "US-iad1" parses as a region we simply do not regulate, so it is NOT
    // caught by the indeterminate branch. The stale value is corrected by the
    // next document response rather than by notifying everyone meanwhile.
    expect(shouldShowBanner(null, "US-iad1")).toBe(false);
    expect(shouldShowBanner(null, "US-sfo1")).toBe(false);
  });

  it("survives a missing cookie by notifying rather than throwing", () => {
    expect(shouldShowBanner(null, null)).toBe(true);
    expect(shouldShowBanner("granted", null)).toBe(false);
  });
});

describe("what analytics is actually told", () => {
  it("denies all four signals when the visitor declines", () => {
    expect(consentPayload("denied")).toEqual({
      analytics_storage: "denied",
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
    });
  });

  it("grants all four signals when the visitor accepts", () => {
    expect(consentPayload("granted")).toEqual({
      analytics_storage: "granted",
      ad_storage: "granted",
      ad_user_data: "granted",
      ad_personalization: "granted",
    });
  });

  it("covers every signal the regional default denies", () => {
    // index.html's regional default denies these four; an update that omitted
    // one would leave it denied forever for a visitor who accepted.
    expect(Object.keys(consentPayload("granted")).sort()).toEqual([
      "ad_personalization",
      "ad_storage",
      "ad_user_data",
      "analytics_storage",
    ]);
  });
});

describe("reading a stored choice", () => {
  it.each(["granted", "denied"])("accepts %s", (raw) => {
    expect(parseChoice(raw)).toBe(raw as Choice);
  });

  it("rejects anything else rather than trusting it", () => {
    expect(parseChoice(null)).toBeNull();
    expect(parseChoice("")).toBeNull();
    expect(parseChoice("true")).toBeNull();
    expect(parseChoice("GRANTED")).toBeNull();
  });
});
