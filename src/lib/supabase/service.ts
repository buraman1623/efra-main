import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/types/database";

/**
 * ⚠️ SERVER-ONLY. Never import this into a Client Component or expose
 * SUPABASE_SERVICE_ROLE_KEY as a NEXT_PUBLIC_ variable.
 *
 * This client uses the service role key, which bypasses Row Level
 * Security entirely. It exists for trusted server-side operations where
 * we've already validated the input ourselves (e.g. public contact/quote
 * form submissions) and need to write — and immediately read back — a
 * row that the anon key's RLS policies wouldn't allow an anonymous
 * visitor to read directly (contact_messages/quote_requests are
 * public-INSERT but admin-only SELECT).
 */
export function createServiceClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceKey) {
    throw new Error(
      "SUPABASE_SERVICE_ROLE_KEY (or NEXT_PUBLIC_SUPABASE_URL) is missing from environment variables."
    );
  }

  return createSupabaseClient<Database>(url, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
