export default async function handler(_request: Request): Promise<Response> {
  return new Response(
    JSON.stringify({
      ok: true,
      hasSupabaseUrl: !!process.env.VITE_SUPABASE_URL,
      hasSupabaseAnonKey: !!process.env.VITE_SUPABASE_ANON_KEY,
      runtime: typeof process !== 'undefined' ? 'node' : 'edge',
    }),
    { status: 200, headers: { 'content-type': 'application/json' } },
  );
}
