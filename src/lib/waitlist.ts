/**
 * Waitlist submissions.
 *
 * Designer waitlist still posts directly to the `designer_requests` PostgREST
 * anon endpoint — designer attribution + GA stitching happen later, on first
 * authenticated trade-app session via signup_attribution.
 *
 * Vendor waitlist goes through the `vendor-request-access` Edge Function so it
 * can run the qualification pipeline (catalog match + AI domain review) and
 * forward the GA4 client_id for cross-domain Measurement Protocol stitching.
 * Direct PostgREST insert on vendor_access_requests would bypass all of that.
 *
 * The anon key in VITE_SUPABASE_ANON_KEY is safe to ship to the browser; RLS
 * on designer_requests permits anon INSERT only.
 */

import { getGaClientId } from "./ga";
import { ACCESS_REQUEST_URL } from "./constants";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

export interface DesignerWaitlistInput {
  name: string;
  firm: string;
  email: string;
}

export interface VendorWaitlistInput {
  name: string;
  company: string;
  email: string;
  /** Where the form lives — surfaced as event property for funnel slicing. */
  source?: string;
}

async function postAnon(table: string, row: Record<string, string>): Promise<void> {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    throw new Error("Supabase env vars are not set.");
  }
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: SUPABASE_ANON_KEY,
      Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
      Prefer: "return=minimal",
    },
    body: JSON.stringify(row),
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Waitlist submission failed (${res.status}): ${text}`);
  }
}

export async function submitDesignerWaitlist(input: DesignerWaitlistInput): Promise<void> {
  await postAnon("designer_requests", {
    name: input.name.trim(),
    firm: input.firm.trim(),
    email: input.email.trim().toLowerCase(),
  });
}

export async function submitVendorWaitlist(input: VendorWaitlistInput): Promise<void> {
  if (!ACCESS_REQUEST_URL) {
    throw new Error("ACCESS_REQUEST_URL env var is not set.");
  }
  const res = await fetch(ACCESS_REQUEST_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // The Edge Function is deployed --no-verify-jwt; an apikey header is
      // still required by Supabase's API gateway, even for public endpoints.
      apikey: SUPABASE_ANON_KEY ?? "",
    },
    body: JSON.stringify({
      name: input.name.trim(),
      company: input.company.trim(),
      email: input.email.trim().toLowerCase(),
      source: input.source ?? "marketing_site",
      ga_client_id: getGaClientId(),
    }),
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Waitlist submission failed (${res.status}): ${text}`);
  }
}
