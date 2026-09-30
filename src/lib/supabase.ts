import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL?.trim();
const supabaseAnonKey =
  import.meta.env.VITE_SUPABASE_ANON_KEY?.trim();

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    "Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY."
  );
}

if (!/^https:\/\/[a-z0-9-]+\.supabase\.co\/?$/.test(supabaseUrl)) {
  throw new Error(
    "VITE_SUPABASE_URL is invalid. Use only the project URL, for example https://project-ref.supabase.co"
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