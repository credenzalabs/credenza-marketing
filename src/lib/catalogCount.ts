/**
 * Live catalog size — fetches the count of designer-visible vendors from
 * vendor_public on the Credenza Supabase project and caches at the module
 * level so multiple components share one network round-trip.
 *
 * Returns a string like "1,600+" (rounded down to the nearest 100 to keep
 * marketing copy stable as vendors come and go). Falls back to "1,700+"
 * if env vars are missing or the request fails.
 */

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

const FALLBACK_LABEL = '1,700+';

export function formatCatalogCount(n: number): string {
  if (!Number.isFinite(n) || n <= 0) return FALLBACK_LABEL;
  return `${(Math.floor(n / 100) * 100).toLocaleString('en-US')}+`;
}

let cached: Promise<number> | null = null;

export function loadCatalogCount(): Promise<number> {
  if (cached) return cached;
  cached = (async () => {
    if (!SUPABASE_URL || !SUPABASE_ANON_KEY) return 0;
    try {
      const res = await fetch(
        `${SUPABASE_URL}/rest/v1/vendor_public?select=count`,
        {
          headers: {
            apikey: SUPABASE_ANON_KEY,
            Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
            Prefer: 'count=exact',
            Range: '0-0',
          },
        },
      );
      const range = res.headers.get('content-range');
      if (!range) return 0;
      const total = parseInt(range.split('/')[1] ?? '0', 10);
      return Number.isFinite(total) ? total : 0;
    } catch {
      return 0;
    }
  })();
  return cached;
}
