const SUPABASE_URL = process.env.VITE_SUPABASE_URL!;
const SUPABASE_ANON_KEY = process.env.VITE_SUPABASE_ANON_KEY!;

const CORS = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'POST, OPTIONS',
  'access-control-allow-headers': 'authorization, content-type',
  'access-control-max-age': '86400',
};

export default async function handler(request: Request): Promise<Response> {
  if (request.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: CORS });
  }
  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { ...CORS, 'content-type': 'application/json' },
    });
  }

  const auth = request.headers.get('authorization');
  if (!auth) {
    return new Response(JSON.stringify({ error: 'Missing Authorization header' }), {
      status: 401,
      headers: { ...CORS, 'content-type': 'application/json' },
    });
  }

  const upstream = await fetch(`${SUPABASE_URL}/functions/v1/extension-api`, {
    method: 'POST',
    headers: {
      authorization: auth,
      apikey: SUPABASE_ANON_KEY,
      'content-type': 'application/json',
    },
    body: await request.text(),
  });

  return new Response(upstream.body, {
    status: upstream.status,
    headers: {
      ...CORS,
      'content-type': upstream.headers.get('content-type') ?? 'application/json',
    },
  });
}
