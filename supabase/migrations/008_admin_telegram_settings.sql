-- ============================================================
-- Efra Business Group — Per-Admin Telegram Notification Settings
-- Moves Telegram recipient configuration out of a single shared
-- TELEGRAM_ADMIN_CHAT_IDS env var and into the database, so adding or
-- removing an admin's notifications no longer requires a redeploy, and
-- each admin can opt in/out of notifications for themselves.
-- ============================================================

ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS telegram_chat_id TEXT,
  ADD COLUMN IF NOT EXISTS telegram_notifications_enabled BOOLEAN NOT NULL DEFAULT true;

COMMENT ON COLUMN public.profiles.telegram_chat_id IS
  'Telegram chat ID to notify on new contact messages / quote requests. Only meaningful for admins. The person must have started a chat with the bot first (Telegram requires this before a bot can message them).';

COMMENT ON COLUMN public.profiles.telegram_notifications_enabled IS
  'Per-admin opt-in/out for Telegram notifications. Defaults to true so a newly-promoted admin who has already set a chat_id starts receiving notifications immediately; has no effect if telegram_chat_id is null.';

-- No new RLS policies needed:
-- - A user updating their OWN row (including their own telegram settings)
--   is already covered by the existing "Users can update own profile" policy.
-- - An admin updating ANY row (e.g. setting a new admin's chat_id right
--   after promoting them) is already covered by "Admins can update all
--   profiles" from 006_admin_user_management.sql.
-- - The role-escalation guard trigger from 006 only fires on `role`
--   changes, so it doesn't interfere with editing telegram fields.
