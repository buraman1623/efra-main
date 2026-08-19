"use client";

import { useLocale } from "@/lib/i18n/LocaleProvider";
import { cn } from "@/lib/utils";

/**
 * Header language switcher.
 * Shows "አማ" while the site is in English (click → switch to Amharic)
 * and "EN" while the site is in Amharic (click → switch back to English).
 */
export function LanguageSwitcher({ className }: { className?: string }) {
  const { locale, toggleLocale } = useLocale();
  const nextLabel = locale === "en" ? "አማ" : "EN";
  const a11yLabel =
    locale === "en" ? "Switch to Amharic" : "Switch to English";

  return (
    <button
      type="button"
      onClick={toggleLocale}
      aria-label={a11yLabel}
      title={a11yLabel}
      className={cn(
        "inline-flex items-center justify-center rounded-full px-3 py-1.5 text-body-sm font-semibold tracking-wide text-brand-light/85 border border-glass-border hover:text-brand-amber hover:border-brand-amber/60 transition-colors",
        className
      )}
    >
      {nextLabel}
    </button>
  );
}
