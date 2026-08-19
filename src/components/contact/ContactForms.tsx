"use client";

import Link from "next/link";
import { ContactForm } from "./ContactForm";
import { QuoteForm } from "./QuoteForm";
import { cn } from "@/lib/utils";
import { useLocale } from "@/lib/i18n/LocaleProvider";

interface ContactFormsProps {
  isQuote: boolean;
  defaultProduct?: string;
}

export function ContactForms({ isQuote, defaultProduct }: ContactFormsProps) {
  const { t } = useLocale();
  return (
    <div className="rounded-brand-xl border border-glass-border bg-black/40 backdrop-blur-md p-6 sm:p-8 shadow-2xl">
      {/* Tab Switcher Bar */}
      <div className="mb-8 flex gap-3 border-b border-glass-border pb-1">
        <Link
          href="/contact"
          className={cn(
            "px-4 py-2.5 text-xs font-semibold uppercase tracking-wider transition-all rounded-t-brand-md border-b-2",
            !isQuote
              ? "border-brand-amber text-brand-amber bg-white/[0.03]"
              : "border-transparent text-brand-muted hover:text-white hover:bg-white/[0.01]"
          )}
        >
          {t.forms.sendAMessage}
        </Link>
        <Link
          href={
            defaultProduct
              ? `/contact?tab=quote&model=${encodeURIComponent(defaultProduct)}`
              : "/contact?tab=quote"
          }
          className={cn(
            "px-4 py-2.5 text-xs font-semibold uppercase tracking-wider transition-all rounded-t-brand-md border-b-2",
            isQuote
              ? "border-brand-amber text-brand-amber bg-white/[0.03]"
              : "border-transparent text-brand-muted hover:text-white hover:bg-white/[0.01]"
          )}
        >
          {t.forms.requestAQuote}
        </Link>
      </div>

      {/* Dynamic Form Rendering */}
      {isQuote ? (
        <QuoteForm defaultProduct={defaultProduct} />
      ) : (
        <ContactForm />
      )}
    </div>
  );
}