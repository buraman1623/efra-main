"use client";

import Image from "next/image";
import Link from "next/link";
import { images } from "@/lib/assets/images";
import { company } from "@/lib/content/company";
import { Button } from "@/components/ui/Button";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { FadeUp, SlideInRight, FadeIn } from "@/components/ui/MotionWrapper";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { useLocale } from "@/lib/i18n/LocaleProvider";

interface ServiceDetailClientProps {
  slug: string;
  serviceImage: string;
  fallbackName: string;
  fallbackDescription: string;
}

export default function ServiceDetailClient({
  slug,
  serviceImage,
  fallbackName,
  fallbackDescription,
}: ServiceDetailClientProps) {
  const { t } = useLocale();
  const translated = t.services.items[slug as keyof typeof t.services.items];
  const name = translated?.name ?? fallbackName;
  const description = translated?.description ?? fallbackDescription;

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

        <section className="relative overflow-hidden min-h-[35vh] flex items-center justify-center pt-36 sm:pt-40 md:pt-48 pb-12 border-b border-glass-border">
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

          <div className="container-brand relative z-10">
            <Breadcrumbs />
            <FadeUp>
              <h1 className="text-display-md md:text-display-lg font-heading text-brand-light mb-4 mt-6 tracking-tight">
                {name}
              </h1>
              <p className="text-body-lg text-brand-muted max-w-3xl leading-relaxed">
                {description}
              </p>
            </FadeUp>
          </div>
        </section>

        <section className="section-brand">
          <div className="container-brand grid lg:grid-cols-12 gap-12 lg:gap-8">
            
            <div className="lg:col-span-8 flex flex-col gap-10">
              <FadeIn>
                <div className="relative h-[300px] md:h-[450px] rounded-brand-xl overflow-hidden border border-glass-border shadow-2xl">
                  <Image
                    src={serviceImage}
                    alt={name}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              </FadeIn>
              
              <SlideInRight className="prose prose-invert max-w-none">
                <h2 className="text-heading-md font-heading text-brand-light mb-4">
                  {t.services.serviceDetails}
                </h2>
                <p className="text-body-md text-brand-muted mb-8 leading-relaxed">
                  {t.services.detailIntro
                    .replace("{name}", company.name)
                    .replace("{service}", name.toLowerCase())}
                </p>
                
                <h3 className="text-heading-sm font-heading text-brand-light mb-4 mt-8">
                  {t.services.keyBenefits}
                </h3>
                <div className="grid sm:grid-cols-2 gap-4 mt-4">
                  {t.services.benefits.map((benefit, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-3 glass-panel p-4 rounded-brand-md border border-glass-border shadow-brand-sm"
                    >
                      <div className="w-5 h-5 rounded-full bg-brand-secondary/20 flex items-center justify-center shrink-0 mt-0.5">
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
                      <span className="text-body-sm text-brand-light/90">{benefit}</span>
                    </div>
                  ))}
                </div>
              </SlideInRight>
            </div>
            
            <div className="lg:col-span-4 flex flex-col gap-6">
              <FadeUp
                delay={0.2}
                className="glass-panel border border-glass-border rounded-brand-lg p-6 md:p-8 shadow-2xl sticky top-32"
              >
                <h3 className="text-heading-sm font-heading text-brand-light mb-4 border-b border-glass-border pb-4">
                  {t.services.needThisService}
                </h3>
                <p className="text-body-sm text-brand-muted mb-6 leading-relaxed">
                  {t.services.sidebarBody}
                </p>
                
                <div className="flex flex-col gap-3">
                  <Button asChild variant="primary" className="w-full rounded-full">
                    <Link href="/contact">{t.services.contactSupport}</Link>
                  </Button>
                  
                  <div className="mt-4 pt-4 border-t border-glass-border flex flex-col gap-2">
                    <p className="text-label uppercase tracking-wider text-brand-muted">
                      {t.services.callUsDirectly}
                    </p>
                    <a
                      href={`tel:${company.phone}`}
                      className="text-heading-sm font-heading text-brand-amber hover:underline transition-all"
                    >
                      {company.phone}
                    </a>
                  </div>
                </div>
              </FadeUp>
            </div>
            
          </div>
        </section>

        <Footer />
      </div>
    </div>
  );
}
