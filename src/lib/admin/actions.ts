"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export type UpdateUserRoleResult =
  | { success: true }
  | { success: false; error: string };

/**
 * Promotes or demotes a user between "user" and "admin". Restricted to
 * admins by the `profiles_role_change_guard` DB trigger (see
 * supabase/migrations/006_admin_user_management.sql) as the source of
 * truth — the checks here are a friendlier first line of defense so the
 * admin gets a clear error message instead of a raw Postgres exception.
 */
export async function updateUserRole(
  targetUserId: string,
  newRole: "user" | "admin"
): Promise<UpdateUserRoleResult> {
  const supabase = await createClient();

  const {
    data: { user: actor },
  } = await supabase.auth.getUser();

  if (!actor) {
    return { success: false, error: "Not authenticated." };
  }

  const { data: actorProfile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", actor.id)
    .single();

  if (actorProfile?.role !== "admin") {
    return { success: false, error: "Only admins can change user roles." };
  }

  // Prevent an admin from demoting themselves, which could leave the
  // platform with zero admins and nobody able to undo it.
  if (actor.id === targetUserId && newRole !== "admin") {
    return {
      success: false,
      error: "You can't remove your own admin access.",
    };
  }

  const { error } = await supabase
    .from("profiles")
    .update({ role: newRole })
    .eq("id", targetUserId);

  if (error) {
    console.error("Failed to update user role:", error);
    return { success: false, error: "Failed to update role. Please try again." };
  }

  revalidatePath("/admin/users");
  return { success: true };
}
