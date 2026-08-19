"use client";

import { LegalPageClient } from "@/components/legal/LegalPageClient";
import { useLocale } from "@/lib/i18n/LocaleProvider";

export default function CookiesPageClient() {
  const { t } = useLocale();
  return (
    <LegalPageClient
      titlePrefix={t.legal.cookies.titlePrefix}
      titleSuffix={t.legal.cookies.titleSuffix}
      intro={t.legal.cookies.intro}
      sections={t.legal.cookies.sections}
      heroAlt="Efra Business Group Technology"
    />
  );
}
