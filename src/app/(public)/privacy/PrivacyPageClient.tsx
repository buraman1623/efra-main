"use client";

import { LegalPageClient } from "@/components/legal/LegalPageClient";
import { useLocale } from "@/lib/i18n/LocaleProvider";

export default function PrivacyPageClient() {
  const { t } = useLocale();
  return (
    <LegalPageClient
      titlePrefix={t.legal.privacy.titlePrefix}
      titleSuffix={t.legal.privacy.titleSuffix}
      intro={t.legal.privacy.intro}
      sections={t.legal.privacy.sections}
      heroAlt="Efra Business Group Infrastructure"
    />
  );
}
