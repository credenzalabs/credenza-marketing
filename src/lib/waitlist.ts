/**
 * Designer waitlist submission — posts directly to the Supabase
 * `designer_requests` table via the PostgREST anon endpoint.
 *
 * RLS on `designer_requests` permits anon INSERT only, so the anon key
 * in VITE_SUPABASE_ANON_KEY is safe to ship to the browser. No SDK
 * needed — a plain fetch() keeps the marketing bundle small.
 */

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

export interface DesignerWaitlistInput {
  name: string;
  firm: string;
  email: string;
}

export async function submitDesignerWaitlist(input: DesignerWaitlistInput): Promise<void> {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    throw new Error("Supabase env vars are not set.");
  }
  const res = await fetch(`${SUPABASE_URL}/rest/v1/designer_requests`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: SUPABASE_ANON_KEY,
      Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
      Prefer: "return=minimal",
    },
    body: JSON.stringify({
      name: input.name.trim(),
      firm: input.firm.trim(),
      email: input.email.trim().toLowerCase(),
    }),
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Waitlist submission failed (${res.status}): ${text}`);
  }
}
