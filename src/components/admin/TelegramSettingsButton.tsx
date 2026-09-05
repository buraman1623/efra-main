"use client";

import { useState, useTransition } from "react";
import { updateTelegramSettings } from "@/lib/admin/actions";

interface TelegramSettingsButtonProps {
  userId: string;
  initialChatId: string | null;
  initialEnabled: boolean;
  displayName: string;
}

export function TelegramSettingsButton({
  userId,
  initialChatId,
  initialEnabled,
  displayName,
}: TelegramSettingsButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [chatId, setChatId] = useState(initialChatId ?? "");
  const [enabled, setEnabled] = useState(initialEnabled);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);
  const [isPending, startTransition] = useTransition();

  function handleOpen() {
    setChatId(initialChatId ?? "");
    setEnabled(initialEnabled);
    setError(null);
    setSaved(false);
    setIsOpen(true);
  }

  function handleSave() {
    setError(null);
    setSaved(false);

    startTransition(async () => {
      const result = await updateTelegramSettings(userId, {
        telegram_chat_id: chatId,
        telegram_notifications_enabled: enabled,
      });

      if (!result.success) {
        setError(result.error);
        return;
      }

      setSaved(true);
      setTimeout(() => setIsOpen(false), 900);
    });
  }

  const statusLabel = !initialChatId
    ? "Not set"
    : initialEnabled
      ? "Enabled"
      : "Disabled";

  const statusColor = !initialChatId
    ? "text-brand-muted"
    : initialEnabled
      ? "text-emerald-400"
      : "text-brand-muted";

  return (
    <>
      <button
        type="button"
        onClick={handleOpen}
        className="inline-flex items-center gap-1.5 rounded-full border border-glass-border bg-white/5 px-3 py-1.5 text-xs text-brand-muted hover:text-white hover:border-white/20 transition-colors"
        title="Telegram notification settings"
      >
        <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
          />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
        <span className={statusColor}>{statusLabel}</span>
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="w-full max-w-md rounded-brand-xl border border-glass-border bg-[#0a0a0a] p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-base font-semibold text-white mb-1">
              Telegram Notifications
            </h3>
            <p className="text-xs text-brand-muted mb-5 break-words whitespace-normal leading-relaxed">
              For {displayName}. They&apos;ll get a Telegram message for every new
              contact form message and quote request, sent from your bot.
            </p>

            <label className="block text-xs font-medium text-brand-muted mb-1.5">
              Telegram Chat ID
            </label>
            <input
              type="text"
              value={chatId}
              onChange={(e) => setChatId(e.target.value)}
              placeholder="e.g. 123456789"
              className="w-full rounded-brand-md border border-glass-border bg-white/5 px-3 py-2 text-sm text-white placeholder:text-brand-muted/50 focus:outline-none focus:border-brand-amber/60 font-mono"
            />
            <p className="mt-1.5 text-[11px] text-brand-muted break-words whitespace-normal leading-relaxed">
              Get this by messaging{" "}
              <span className="text-brand-light/80 ">@userinfobot</span> on
              Telegram. They must also have started a chat with your bot at
              least once — bots can&apos;t message someone first.
            </p>

            <div className="mt-4 flex items-center justify-between rounded-brand-md border border-glass-border bg-white/5 px-3 py-2.5">
              <span className="text-sm text-white">Notifications enabled</span>
              <button
                type="button"
                role="switch"
                aria-checked={enabled}
                onClick={() => setEnabled(!enabled)}
                className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full p-0.5 transition-colors ${
                  enabled ? "bg-brand-amber" : "bg-white/15"
                }`}
              >
                <span
                  className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition-transform ${
                    enabled ? "translate-x-5" : "translate-x-0.5"
                  }`}
                />
              </button>
            </div>

            {error && (
              <p className="mt-3 text-xs text-red-400">{error}</p>
            )}
            {saved && !error && (
              <p className="mt-3 text-xs text-emerald-400">Saved.</p>
            )}

            <div className="mt-5 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="px-3.5 py-1.5 rounded-brand-md text-xs text-brand-muted hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSave}
                disabled={isPending}
                className="px-4 py-1.5 rounded-brand-md bg-brand-amber text-black text-xs font-semibold hover:bg-brand-amber/90 transition-colors disabled:opacity-50"
              >
                {isPending ? "Saving…" : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
