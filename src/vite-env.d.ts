/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_ACCESS_REQUEST_URL: string;
  readonly VITE_GA_ID: string;
  /** Supabase project URL — used for anon-POST waitlist submissions. */
  readonly VITE_SUPABASE_URL: string;
  /** Supabase anon key — used with VITE_SUPABASE_URL for public INSERTs. */
  readonly VITE_SUPABASE_ANON_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
