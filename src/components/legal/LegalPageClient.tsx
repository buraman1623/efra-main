"use client";

import Image from "next/image";
import { images } from "@/lib/assets/images";
import { company } from "@/lib/content/company";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FadeIn, FadeUp } from "@/components/ui/MotionWrapper";
import { useLocale } from "@/lib/i18n/LocaleProvider";

interface LegalSection {
  heading: string;
  body: string;
  bodyExtra?: string;
  listIntro?: string;
  list?: string[];
}

function fill(text: string): string {
  return text
    .replace(/{name}/g, company.name)
    .replace(/{legalName}/g, company.legalName)
    .replace(/{headOffice}/g, company.headOffice)
    .replace(/{email}/g, company.email);
}

export function LegalPageClient({
  titlePrefix,
  titleSuffix,
  intro,
  introNote,
  sections,
  heroAlt,
}: {
  titlePrefix: string;
  titleSuffix: string;
  intro: string;
  introNote?: string;
  sections: LegalSection[];
  heroAlt: string;
}) {
  const { t } = useLocale();

  return (
    <div className="relative min-h-screen bg-black text-brand-light font-sans selection:bg-brand-amber/30 selection:text-brand-light flex flex-col justify-between">
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-32 w-[560px] h-[560px] rounded-full bg-brand-secondary/25 blur-[120px] animate-drift" />
        <div className="absolute top-1/4 -right-40 w-[480px] h-[480px] rounded-full bg-brand-amber/15 blur-[120px] animate-drift [animation-delay:4s]" />
        <div className="absolute bottom-0 left-1/3 w-[520px] h-[520px] rounded-full bg-brand-secondary/15 blur-[130px] animate-drift [animation-delay:8s]" />
        <div className="absolute inset-0 bg-noise opacity-5" />
      </div>

      <div className="relative z-10 flex-1">
        <Header />

        <section className="relative overflow-hidden min-h-[35vh] flex items-center justify-center pt-36 sm:pt-40 md:pt-44 pb-12">
          <div className="absolute inset-0 z-0">
            <Image
              src={images.hero.home}
              alt={heroAlt}
              fill
              className="object-cover opacity-25 scale-105"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black" />
            <div className="absolute inset-0 shadow-[inset_0_0_160px_70px_rgba(0,0,0,0.6)]" />
          </div>

          <div className="container-brand relative z-10 text-center">
            <FadeUp delay={0.1}>
              <h1 className="text-display-md md:text-display-lg font-heading text-brand-light mb-3 tracking-tight">
                {titlePrefix} <span className="bg-gradient-signal bg-clip-text text-transparent">{titleSuffix}</span>
              </h1>
            </FadeUp>

            <FadeUp delay={0.2}>
              <p className="text-body-md text-brand-light/60 max-w-xl mx-auto leading-relaxed">
                {t.legal.lastUpdated}
              </p>
            </FadeUp>
          </div>
        </section>

        <section className="section-brand relative pb-20">
          <div className="container-brand max-w-4xl">
            <FadeIn delay={0.2}>
              <div className="glass-panel border border-glass-border rounded-brand-xl p-8 md:p-12 shadow-2xl space-y-8 text-brand-light/80 leading-relaxed">
                <div className="space-y-4 text-body-lg text-brand-light/90">
                  <p>{fill(intro)}</p>
                  {introNote && (
                    <p className="text-body-sm text-brand-muted">{fill(introNote)}</p>
                  )}
                </div>

                <hr className="border-glass-border" />

                {sections.map((section, i) => (
                  <div key={i} className="space-y-4">
                    <h2 className="text-heading-md font-heading text-brand-light">
                      {section.heading}
                    </h2>
                    {section.body && (
                      <p className="text-body-sm text-brand-muted">{fill(section.body)}</p>
                    )}
                    {section.listIntro && (
                      <p className="text-body-sm font-semibold text-brand-light mt-2">
                        {section.listIntro}
                      </p>
                    )}
                    {section.list && (
                      <ul className="list-disc list-inside space-y-2 text-body-sm text-brand-muted pl-2">
                        {section.list.map((item, j) => (
                          <li key={j}>{fill(item)}</li>
                        ))}
                      </ul>
                    )}
                    {section.bodyExtra && (
                      <p className="text-body-sm text-brand-muted">{fill(section.bodyExtra)}</p>
                    )}
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </section>

        <Footer />
      </div>
    </div>
  );
}
