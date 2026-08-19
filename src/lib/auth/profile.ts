import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/types/database";

export async function syncUserProfile(
  supabase: SupabaseClient<Database>
): Promise<{ role: "user" | "admin" } | null> {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user?.email) return null;

  const meta = user.user_metadata ?? {};
  const fullName =
    (meta.full_name as string | undefined) ||
    (meta.name as string | undefined) ||
    null;
  const avatarUrl =
    (meta.avatar_url as string | undefined) ||
    (meta.picture as string | undefined) ||
    null;

  const { data } = await supabase
    .from("profiles")
    .upsert(
      {
        id: user.id,
        email: user.email,
        full_name: fullName,
        avatar_url: avatarUrl,
      },
      { onConflict: "id" }
    )
    .select("role")
    .single();

  return data ? { role: data.role } : null;
}
