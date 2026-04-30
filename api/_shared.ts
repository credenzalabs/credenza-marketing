export const SUPABASE_URL = process.env.VITE_SUPABASE_URL!;
export const SUPABASE_ANON_KEY = process.env.VITE_SUPABASE_ANON_KEY!;

const CORS_HEADERS = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'POST, OPTIONS',
  'access-control-allow-headers': 'authorization, content-type',
  'access-control-max-age': '86400',
};

export function preflight(request: Request): Response | null {
  if (request.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: CORS_HEADERS });
  }
  return null;
}

export function withCors(response: Response): Response {
  const headers = new Headers(response.headers);
  for (const [k, v] of Object.entries(CORS_HEADERS)) headers.set(k, v);
  return new Response(response.body, { status: response.status, headers });
}

export function json(status: number, body: unknown): Response {
  return withCors(new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json' },
  }));
}
