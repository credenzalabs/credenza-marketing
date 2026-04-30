import { SUPABASE_URL, SUPABASE_ANON_KEY, preflight, withCors, json } from './_shared';

export default async function handler(request: Request): Promise<Response> {
  const pre = preflight(request);
  if (pre) return pre;

  if (request.method !== 'POST') return json(405, { error: 'Method not allowed' });

  const auth = request.headers.get('authorization');
  if (!auth) return json(401, { error: 'Missing Authorization header' });

  const upstream = await fetch(`${SUPABASE_URL}/functions/v1/extension-api`, {
    method: 'POST',
    headers: {
      authorization: auth,
      apikey: SUPABASE_ANON_KEY,
      'content-type': 'application/json',
    },
    body: await request.text(),
  });

  return withCors(new Response(upstream.body, {
    status: upstream.status,
    headers: { 'content-type': upstream.headers.get('content-type') ?? 'application/json' },
  }));
}
