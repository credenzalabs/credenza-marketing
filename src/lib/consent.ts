/**
 * Consent decisions, separated from the banner that renders them so both the
 * "should this be shown?" rule and the "what do we tell Google?" payload can
 * be tested without mounting React.
 */

export type Choice = "granted" | "denied";

export const CONSENT_STORAGE_KEY = "credenza.cookie-consent";

import { shouldNotify } from "./geoRegion";

/**
 * Show the notice to a visitor who has not already answered and is either in a
 * regulated region or somewhere we could not determine. A stored choice always
 * wins — including over a region change — so someone who has answered is never
 * asked twice.
 */
export function shouldShowBanner(
  savedChoice: Choice | null,
  geoRegion: string | null,
): boolean {
  if (savedChoice) return false;
  return shouldNotify(geoRegion);
}

/** The four Google Consent Mode signals a choice maps to. */
export function consentPayload(choice: Choice) {
  return {
    analytics_storage: choice,
    ad_storage: choice,
    ad_user_data: choice,
    ad_personalization: choice,
  } as const;
}

/** Parse a stored value, tolerating anything a browser or a human put there. */
export function parseChoice(raw: string | null): Choice | null {
  return raw === "granted" || raw === "denied" ? raw : null;
}
