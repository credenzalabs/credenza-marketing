/**
 * Week in Design newsletter signups.
 *
 * Posts to a Loops custom-form endpoint (https://loops.so/docs/forms/custom-form).
 * Unlike the waitlist forms in lib/waitlist.ts, this one needs no key and no
 * server hop: Loops' newsletter-form endpoint is public, accepts
 * form-urlencoded POSTs straight from the browser, and answers with JSON.
 *
 * Two Loops-side behaviors shape what we send:
 *   - `userGroup` is the only field Loops will update on a contact that already
 *     exists, so the designer/vendor split rides there rather than in a custom
 *     property. Everything else is set once, at first signup.
 *   - Submissions are IP rate-limited. A 429 is a normal outcome, not a bug, so
 *     it gets its own flag and its own message in the form.
 */

import { LOOPS_FORM_URL } from "./constants";

export interface NewsletterInput {
  email: string;
  firstName?: string;
  /** "Designer" | "Vendor" — drives segmentation inside Loops. */
  userGroup?: string;
  /** Which form on the site this came from, for funnel slicing in Loops. */
  source?: string;
}

export class NewsletterError extends Error {
  readonly rateLimited: boolean;
  constructor(message: string, rateLimited = false) {
    super(message);
    this.name = "NewsletterError";
    this.rateLimited = rateLimited;
  }
}

export async function subscribeToNewsletter(input: NewsletterInput): Promise<void> {
  const body = new URLSearchParams({ email: input.email.trim().toLowerCase() });
  if (input.firstName?.trim()) body.set("firstName", input.firstName.trim());
  if (input.userGroup) body.set("userGroup", input.userGroup);
  body.set("source", input.source ?? "usecredenza.com");

  let res: Response;
  try {
    res = await fetch(LOOPS_FORM_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: body.toString(),
    });
  } catch {
    throw new NewsletterError("We couldn't reach the server. Check your connection and try again.");
  }

  if (res.status === 429) {
    throw new NewsletterError("Too many signups from this network just now. Try again in a minute.", true);
  }

  const data = (await res.json().catch(() => null)) as
    | { success?: boolean; message?: string }
    | null;

  if (!res.ok || !data?.success) {
    throw new NewsletterError(data?.message || "Something went wrong. Please try again.");
  }
}
