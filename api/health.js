export default function handler(_request) {
  return new Response(
    JSON.stringify({
      ok: true,
      hasSupabaseUrl: !!process.env.VITE_SUPABASE_URL,
      hasSupabaseAnonKey: !!process.env.VITE_SUPABASE_ANON_KEY,
    }),
    { status: 200, headers: { 'content-type': 'application/json' } },
  );
}
