export default function handler(_req, res) {
  res.status(200).json({
    ok: true,
    hasSupabaseUrl: !!process.env.VITE_SUPABASE_URL,
    hasSupabaseAnonKey: !!process.env.VITE_SUPABASE_ANON_KEY,
  });
}
