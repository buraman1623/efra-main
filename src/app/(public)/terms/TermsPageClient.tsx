"use client";

import { LegalPageClient } from "@/components/legal/LegalPageClient";
import { useLocale } from "@/lib/i18n/LocaleProvider";

export default function TermsPageClient() {
  const { t } = useLocale();
  return (
    <LegalPageClient
      titlePrefix={t.legal.terms.titlePrefix}
      titleSuffix={t.legal.terms.titleSuffix}
      intro={t.legal.terms.intro}
      introNote={t.legal.terms.introNote}
      sections={t.legal.terms.sections}
      heroAlt="Efra Business Group Facility"
    />
  );
}
