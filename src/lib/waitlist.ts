/**
 * Waitlist submissions — posts directly to Supabase PostgREST anon
 * endpoints for `designer_requests` and `vendor_access_requests`.
 *
 * RLS on both tables must permit anon INSERT only; the anon key in
 * VITE_SUPABASE_ANON_KEY is safe to ship to the browser. No SDK —
 * plain fetch() keeps the marketing bundle small.
 */

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
  await postAnon("vendor_access_requests", {
    name: input.name.trim(),
    company: input.company.trim(),
    email: input.email.trim().toLowerCase(),
  });
}
