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

export type UpdateTelegramSettingsResult =
  | { success: true }
  | { success: false; error: string };

function isValidChatId(value: string): boolean {
  // Telegram chat IDs are numeric (positive for users, negative for
  // groups/channels). Reject anything that clearly isn't one, so a typo
  // like a pasted username or phone number fails fast with a clear
  // message instead of silently never sending.
  return /^-?\d+$/.test(value.trim());
}

/**
 * Updates a user's Telegram chat ID and/or notification opt-in.
 * - A user can always edit their own row (e.g. John enabling/disabling
 *   notifications for himself, or setting his own chat ID).
 * - An admin can edit anyone's row (e.g. setting a brand-new admin's
 *   chat ID for them right after promoting them).
 * Anyone else is rejected.
 */
export async function updateTelegramSettings(
  targetUserId: string,
  settings: { telegram_chat_id: string | null; telegram_notifications_enabled: boolean }
): Promise<UpdateTelegramSettingsResult> {
  const supabase = await createClient();

  const {
    data: { user: actor },
  } = await supabase.auth.getUser();

  if (!actor) {
    return { success: false, error: "Not authenticated." };
  }

  const isSelf = actor.id === targetUserId;

  if (!isSelf) {
    const { data: actorProfile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", actor.id)
      .single();

    if (actorProfile?.role !== "admin") {
      return {
        success: false,
        error: "You can only edit your own notification settings.",
      };
    }
  }

  const trimmed = settings.telegram_chat_id?.trim() || null;

  if (trimmed && !isValidChatId(trimmed)) {
    return {
      success: false,
      error:
        "That doesn't look like a valid Telegram chat ID — it should be a number (e.g. 123456789), not a username. Get it from @userinfobot.",
    };
  }

  const { error } = await supabase
    .from("profiles")
    .update({
      telegram_chat_id: trimmed,
      telegram_notifications_enabled: settings.telegram_notifications_enabled,
    })
    .eq("id", targetUserId);

  if (error) {
    console.error("Failed to update Telegram settings:", error);
    return { success: false, error: "Failed to save. Please try again." };
  }

  revalidatePath("/admin/users");
  return { success: true };
}
