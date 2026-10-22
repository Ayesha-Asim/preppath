import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL?.trim();
const supabaseAnonKey =
  import.meta.env.VITE_SUPABASE_ANON_KEY?.trim();

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    "Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY."
  );
}

const isCloudSupabase =
  /^https:\/\/[a-z0-9-]+\.supabase\.co\/?$/.test(supabaseUrl);

const isLocalSupabase =
  /^http:\/\/(127\.0\.0\.1|localhost):54321\/?$/.test(supabaseUrl);

if (!isCloudSupabase && !isLocalSupabase) {
  throw new Error(
    "Invalid Supabase URL. Use a Supabase cloud URL or the local development URL."
  );
}


export const supabase = createClient(
  supabaseUrl.replace(/\/$/, ""),
  supabaseAnonKey,
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
      flowType: "pkce",
    },
  }
);