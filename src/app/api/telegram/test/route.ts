import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { sendTelegramMessageWithResults } from "@/lib/telegram/notify";

/**
 * Visit this route (while logged in as an admin) to test the Telegram bot
 * setup directly and see Telegram's actual response, instead of guessing
 * from silent server logs. Example:
 *
 *   https://yourdomain.com/api/telegram/test
 *
 * Restricted to admins so this can't be used to spam your bot/chat by
 * randoms who find the URL.
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
    .select("role")
    .eq("id", user.id)
    .single();

  if (profile?.role !== "admin") {
    return NextResponse.json({ error: "Admins only." }, { status: 403 });
  }

  const envCheck = {
    TELEGRAM_BOT_TOKEN: process.env.TELEGRAM_BOT_TOKEN
      ? `set (${process.env.TELEGRAM_BOT_TOKEN.slice(0, 6)}...${process.env.TELEGRAM_BOT_TOKEN.slice(-4)})`
      : "MISSING",
    TELEGRAM_ADMIN_CHAT_IDS: process.env.TELEGRAM_ADMIN_CHAT_IDS || "MISSING",
  };

  const { configured, results } = await sendTelegramMessageWithResults(
    `🧪 <b>Test notification</b>\n\nIf you're reading this in Telegram, the bot is wired up correctly.`
  );

  return NextResponse.json({
    envCheck,
    configured,
    results,
    hint: !configured
      ? "TELEGRAM_BOT_TOKEN or TELEGRAM_ADMIN_CHAT_IDS is missing from your environment variables. Add them in Vercel → Project → Settings → Environment Variables, then redeploy."
      : results.some((r) => r.status === 403)
        ? "403 means the chat ID is right but the bot can't message that person yet — they need to open a DM with the bot and send it any message (e.g. /start) first."
        : results.some((r) => r.status === 400)
          ? "400 usually means the chat ID is malformed or wrong — double check it against @userinfobot."
          : results.some((r) => r.status === 401)
            ? "401 means the bot token itself is wrong — re-copy it from @BotFather."
            : results.every((r) => r.ok)
              ? "All sends succeeded — if you still don't see it, check you're looking at the right Telegram account/chat."
              : "See the per-chat `results` above for the exact Telegram error.",
  });
}
