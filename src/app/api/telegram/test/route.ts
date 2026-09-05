import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { sendTelegramMessageWithResults } from "@/lib/telegram/notify";

/**
 * Visit this route (while logged in as an admin) to test YOUR OWN
 * Telegram notification setup and see Telegram's actual response,
 * instead of guessing from silent server logs. Example:
 *
 *   https://yourdomain.com/api/telegram/test
 *
 * Tests the chat ID configured on your own profile (via the ⚙️ icon on
 * /admin/users), not a shared env var — every admin can use this to
 * verify their own setup independently. Restricted to admins so this
 * can't be used to spam anyone by randoms who find the URL.
 */
export async function GET() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Not authenticated." }, { status: 401 });
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("role, telegram_chat_id, telegram_notifications_enabled")
    .eq("id", user.id)
    .single();

  if (profile?.role !== "admin") {
    return NextResponse.json({ error: "Admins only." }, { status: 403 });
  }

  const envCheck = {
    TELEGRAM_BOT_TOKEN: process.env.TELEGRAM_BOT_TOKEN
      ? `set (${process.env.TELEGRAM_BOT_TOKEN.slice(0, 6)}...${process.env.TELEGRAM_BOT_TOKEN.slice(-4)})`
      : "MISSING",
  };

  if (!profile.telegram_chat_id) {
    return NextResponse.json({
      envCheck,
      configured: false,
      results: [],
      hint: "You haven't set a Telegram chat ID for your own account yet. Go to /admin/users, click the ⚙️ next to your own row, and enter it there.",
    });
  }

  if (!profile.telegram_notifications_enabled) {
    return NextResponse.json({
      envCheck,
      configured: false,
      results: [],
      hint: "Your Telegram chat ID is set, but notifications are currently disabled for your account. Re-enable them from the ⚙️ icon on /admin/users, then test again.",
    });
  }

  const { configured, results } = await sendTelegramMessageWithResults(
    `🧪 <b>Test notification</b>\n\nIf you're reading this in Telegram, your notification setup is wired up correctly.`,
    [profile.telegram_chat_id]
  );

  return NextResponse.json({
    envCheck,
    configured,
    results,
    hint: !configured
      ? "TELEGRAM_BOT_TOKEN is missing from your environment variables. Add it in Vercel → Project → Settings → Environment Variables, then redeploy."
      : results.some((r) => r.status === 403)
        ? "403 means the chat ID is right but the bot can't message you yet — open a DM with the bot in Telegram and send it any message (e.g. /start) first."
        : results.some((r) => r.status === 400)
          ? "400 usually means the chat ID is malformed or wrong — double check it against @userinfobot."
          : results.some((r) => r.status === 401)
            ? "401 means the bot token itself is wrong — re-copy it from @BotFather."
            : results.every((r) => r.ok)
              ? "Sent successfully — check your Telegram."
              : "See the `results` above for the exact Telegram error.",
  });
}
