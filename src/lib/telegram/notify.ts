/**
 * Sends admin notifications to Telegram whenever a new contact message or
 * quote request comes in. See /docs or the setup notes shared with the
 * client for how to create the bot and obtain the chat ID(s).
 *
 * Required env vars:
 *   TELEGRAM_BOT_TOKEN     - token from @BotFather
 *   TELEGRAM_ADMIN_CHAT_IDS - comma-separated chat ID(s) to notify
 *
 * This is intentionally "fire and forget" from the caller's perspective:
 * a Telegram failure is logged but never blocks the contact/quote submission
 * from succeeding, since the database write is the source of truth and the
 * notification is a convenience on top of it.
 */

const TELEGRAM_API_BASE = "https://api.telegram.org";

function getConfig() {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatIdsRaw = process.env.TELEGRAM_ADMIN_CHAT_IDS;

  if (!token || !chatIdsRaw) {
    return null;
  }

  const chatIds = chatIdsRaw
    .split(",")
    .map((id) => id.trim())
    .filter(Boolean);

  if (chatIds.length === 0) return null;

  return { token, chatIds };
}

async function sendTelegramMessage(text: string): Promise<void> {
  await sendTelegramMessageWithResults(text);
}

export interface TelegramSendResult {
  chatId: string;
  ok: boolean;
  status?: number;
  body?: string;
  error?: string;
}

/**
 * Same as sendTelegramMessage, but returns a per-chat result instead of
 * only logging — used by the /api/telegram/test diagnostic route so you
 * can see exactly why a message did or didn't go through (bad token,
 * chat not started, wrong chat ID, etc.) instead of it disappearing into
 * server logs.
 */
export async function sendTelegramMessageWithResults(
  text: string
): Promise<{ configured: boolean; results: TelegramSendResult[] }> {
  const config = getConfig();

  if (!config) {
    console.warn(
      "[telegram] TELEGRAM_BOT_TOKEN / TELEGRAM_ADMIN_CHAT_IDS not set — skipping notification."
    );
    return { configured: false, results: [] };
  }

  const { token, chatIds } = config;
  const url = `${TELEGRAM_API_BASE}/bot${token}/sendMessage`;

  const results = await Promise.all(
    chatIds.map(async (chatId): Promise<TelegramSendResult> => {
      try {
        const res = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id: chatId,
            text,
            parse_mode: "HTML",
            disable_web_page_preview: true,
          }),
        });

        const body = await res.text();

        if (!res.ok) {
          console.error(
            `[telegram] sendMessage failed for chat ${chatId}: ${res.status} ${body}`
          );
        }

        return { chatId, ok: res.ok, status: res.status, body };
      } catch (err) {
        console.error(`[telegram] sendMessage threw for chat ${chatId}:`, err);
        return {
          chatId,
          ok: false,
          error: err instanceof Error ? err.message : String(err),
        };
      }
    })
  );

  return { configured: true, results };
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "";

export async function notifyNewContactMessage(message: {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}): Promise<void> {
  const link = SITE_URL ? `\n\n${SITE_URL}/admin/contacts/${message.id}` : "";

  const text =
    `📩 <b>New Contact Message</b>\n\n` +
    `<b>From:</b> ${escapeHtml(message.full_name)}\n` +
    `<b>Email:</b> ${escapeHtml(message.email)}\n` +
    `<b>Phone:</b> ${escapeHtml(message.phone)}\n` +
    `<b>Subject:</b> ${escapeHtml(message.subject)}\n\n` +
    `${escapeHtml(message.message)}` +
    link;

  await sendTelegramMessage(text);
}

export async function notifyNewQuoteRequest(request: {
  id: string;
  full_name: string;
  company: string | null;
  email: string;
  phone: string;
  whatsapp: string | null;
  product_interest: string | null;
  message: string | null;
}): Promise<void> {
  const link = SITE_URL ? `\n\n${SITE_URL}/admin/quotes/${request.id}` : "";

  const lines = [
    `💰 <b>New Quote Request</b>`,
    "",
    `<b>From:</b> ${escapeHtml(request.full_name)}`,
    request.company ? `<b>Company:</b> ${escapeHtml(request.company)}` : null,
    `<b>Email:</b> ${escapeHtml(request.email)}`,
    `<b>Phone:</b> ${escapeHtml(request.phone)}`,
    request.whatsapp ? `<b>WhatsApp:</b> ${escapeHtml(request.whatsapp)}` : null,
    request.product_interest
      ? `<b>Machinery:</b> ${escapeHtml(request.product_interest)}`
      : null,
    request.message ? `\n${escapeHtml(request.message)}` : null,
  ].filter((line): line is string => line !== null);

  await sendTelegramMessage(lines.join("\n") + link);
}
