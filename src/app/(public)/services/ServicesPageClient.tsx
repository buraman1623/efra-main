"use client";

import Image from "next/image";
import Link from "next/link";
import { company, services } from "@/lib/content/company";
import { getServiceImage, images } from "@/lib/assets/images";
import { FadeIn, FadeUp, StaggerContainer, StaggerItem } from "@/components/ui/MotionWrapper";
import { Button } from "@/components/ui/Button";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { useLocale } from "@/lib/i18n/LocaleProvider";

export default function ServicesPageClient() {
  const { t } = useLocale();

  return (
    <div className="relative bg-black text-brand-light min-h-screen">
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-32 w-[560px] h-[560px] rounded-full bg-brand-secondary/25 blur-[120px] animate-drift" />
        <div className="absolute top-1/4 -right-40 w-[480px] h-[480px] rounded-full bg-brand-amber/15 blur-[120px] animate-drift [animation-delay:4s]" />
        <div className="absolute bottom-0 left-1/3 w-[520px] h-[520px] rounded-full bg-brand-secondary/15 blur-[130px] animate-drift [animation-delay:8s]" />
        <div className="absolute inset-0 bg-noise opacity-5" />
      </div>

      <div className="relative z-10">
        <Header />

        <section className="relative overflow-hidden min-h-[40vh] flex items-center justify-center pt-36 sm:pt-40 md:pt-48 pb-16">
          <div className="absolute inset-0 z-0">
            <Image
              src={images.hero.about}
              alt="Efra Business Group Facility"
              fill
              className="object-cover opacity-40 scale-105"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-black" />
            <div className="absolute inset-0 shadow-[inset_0_0_160px_70px_rgba(0,0,0,0.6)]" />
          </div>
          
          <div className="container-brand relative z-10 flex flex-col items-center text-center">
            <FadeUp delay={0.1}>
              <h1 className="text-display-md md:text-display-xl text-brand-light font-heading mb-6 max-w-4xl leading-[1.05] tracking-tight">
                {t.services.heroTitlePrefix} <span className="bg-gradient-signal bg-clip-text text-transparent">{t.services.heroTitleSuffix}</span>
              </h1>
            </FadeUp>

            <FadeUp delay={0.2}>
              <p className="text-body-lg text-brand-light/60 max-w-2xl mx-auto leading-relaxed">
                {t.services.heroSubtitle.replace("{name}", company.name)}
              </p>
            </FadeUp>
          </div>
        </section>

        <section className="section-brand">
          <div className="container-brand">
            <StaggerContainer className="flex flex-col gap-16 md:gap-24">
              {services.map((service, index) => {
                const isEven = index % 2 === 0;
                const serviceImage = getServiceImage(service.slug);
                const translated = t.services.items[service.slug as keyof typeof t.services.items];
                const name = translated?.name ?? service.name;
                const description = translated?.description ?? service.description;

                return (
                  <StaggerItem
                    key={service.slug}
                    className={`flex flex-col ${
                      isEven ? "md:flex-row" : "md:flex-row-reverse"
                    } gap-8 md:gap-16 items-center`}
                  >
                    <div className="w-full md:w-1/2">
                      <div className="relative h-64 sm:h-80 md:h-[400px] w-full rounded-brand-xl overflow-hidden border border-glass-border shadow-2xl group">
                        <Image
                          src={serviceImage}
                          alt={name}
                          fill
                          className="object-cover transition-transform duration-slower group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80" />
                      </div>
                    </div>

                    <div className="w-full md:w-1/2 flex flex-col gap-4">
                      <div className="w-12 h-12 bg-gradient-signal rounded-brand-md flex items-center justify-center mb-2 shadow-lg text-white">
                        <svg
                          className="w-6 h-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.8}
                            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.8}
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                      </div>

                      <h2 className="text-heading-md font-heading text-brand-light tracking-tight">
                        {name}
                      </h2>

                      <p className="text-body-lg text-brand-muted leading-relaxed">
                        {description}
                      </p>

                      <ul className="flex flex-col gap-2.5 my-2">
                        {t.services.listFeatures.map((item, i) => (
                          <li key={i} className="flex items-center gap-3 text-body-sm text-brand-light/90">
                            <div className="w-5 h-5 rounded-full bg-brand-secondary/20 flex items-center justify-center shrink-0">
                              <svg
                                className="w-3.5 h-3.5 text-brand-amber"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2.5}
                                  d="M5 13l4 4L19 7"
                                />
                              </svg>
                            </div>
                            {item}
                          </li>
                        ))}
                      </ul>

                      <Button asChild variant="outline" size="sm" className="w-fit mt-2 rounded-full">
                        <Link href={`/services/${service.slug}`}>{t.services.viewServiceDetails}</Link>
                      </Button>
                    </div>
                  </StaggerItem>
                );
              })}
            </StaggerContainer>
          </div>
        </section>

        <section className="py-20 relative overflow-hidden mx-4 lg:mx-8 mb-12 rounded-brand-xl border border-glass-border">
          <div className="container-brand relative z-10 text-center">
            <FadeIn className="max-w-2xl mx-auto flex flex-col items-center">
              <h2 className="text-heading-lg font-heading text-brand-light mb-4">
                {t.services.ctaTitle}
              </h2>
              <p className="text-body-md text-brand-muted mb-8 max-w-lg leading-relaxed">
                {t.services.ctaSubtitle}
              </p>
              <Button asChild size="lg" variant="primary" className="rounded-full">
                <Link href="/contact">{t.services.contactSupportDesk}</Link>
              </Button>
            </FadeIn>
          </div>
        </section>

        <Footer />
      </div>
    </div>
  );
}
