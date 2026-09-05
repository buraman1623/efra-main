"use client";

import Link from "next/link";
import Image from "next/image";
import { images, getCategoryImage } from "@/lib/assets/images";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ProductSearchBar } from "@/components/product/ProductSearchBar";
import {
  FadeUp,
  StaggerContainer,
  StaggerItem,
} from "@/components/ui/MotionWrapper";
import { useLocale, pickLocalized } from "@/lib/i18n/LocaleProvider";
import type { ProductCategory } from "@/types";

export default function ProductsPageClient({
  categories,
}: {
  categories: ProductCategory[];
}) {
  const { t, locale } = useLocale();
  // Only show top-level categories here — subcategories (Washing Machines,
  // Gold Crusher Machines, etc.) are shown one level down, grouped inside
  // each main category's own page.
  const mainCategories = categories.filter((c) => !c.parent_id);

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

        <section className="relative min-h-[35vh] flex items-center justify-center pt-36 sm:pt-40 md:pt-44 pb-12">
          <div className="absolute inset-0 z-0 overflow-hidden">
            <Image
              src={images.hero.products}
              alt="Efra Machinery & Equipment Catalog"
              fill
              className="object-cover opacity-75 scale-105"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/60 to-black" />
          </div>

          <div className="container-brand relative z-10 text-center">
            <FadeUp delay={0.1}>
              <h1 className="text-display-md md:text-display-lg font-heading text-brand-light mb-3 tracking-tight">
                {t.products.heroTitlePrefix} <span className="bg-gradient-signal bg-clip-text text-transparent">{t.products.heroTitleSuffix}</span>
              </h1>
            </FadeUp>

            <FadeUp delay={0.2}>
              <p className="text-body-lg text-brand-light/60 max-w-xl mx-auto leading-relaxed mb-8">
                {t.products.heroSubtitle}
              </p>
            </FadeUp>

            <FadeUp delay={0.3} className="max-w-xl mx-auto mb-10">
              <ProductSearchBar />
            </FadeUp>
          </div>
        </section>

        <section className="section-brand relative pb-20">
          <div className="container-brand">
            {mainCategories.length === 0 ? (
              <div className="py-16 text-center max-w-md mx-auto glass-panel border border-glass-border rounded-brand-xl p-8 shadow-2xl">
                <h3 className="text-heading-sm font-heading text-brand-light mb-2">
                  {t.products.noCategoriesTitle}
                </h3>
                <p className="text-body-sm text-brand-light/60 leading-relaxed">
                  {t.products.noCategoriesDesc}
                </p>
              </div>
            ) : (
              <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {mainCategories.map((category) => {
                  const name = pickLocalized(locale, category.name_en, category.name_am);
                  const description = pickLocalized(
                    locale,
                    category.description_en ?? t.products.defaultCategoryDesc,
                    category.description_am
                  );
                  return (
                    <StaggerItem key={category.id} className="group cursor-pointer">
                      <Link
                        href={`/products/${category.slug}`}
                        className="block h-full"
                      >
                        <div className="glass-panel border border-glass-border rounded-brand-xl overflow-hidden hover:border-brand-amber/40 transition-all duration-300 flex flex-col h-full shadow-xl hover:shadow-brand-amber/5">
                          <div className="relative h-64 w-full overflow-hidden bg-white/5">
                            <Image
                              src={
                                category.image_url ||
                                getCategoryImage(category.slug)
                              }
                              alt={name}
                              fill
                              className="object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80" />
                          </div>

                          <div className="p-6 flex flex-col flex-1 relative">
                            <h2 className="text-heading-sm font-heading text-brand-light mb-2 group-hover:text-brand-amber transition-colors">
                              {name}
                            </h2>
                            <p className="text-body-sm text-brand-light/60 mb-6 flex-1 leading-relaxed">
                              {description}
                            </p>
                            <div className="flex items-center gap-2 text-brand-amber font-semibold text-sm group-hover:translate-x-1 transition-transform">
                              <span>{t.common.viewProducts}</span>
                              <svg
                                className="w-4 h-4"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                                />
                              </svg>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </StaggerItem>
                  );
                })}
              </StaggerContainer>
            )}
          </div>
        </section>

        <Footer />
      </div>
    </div>
  );
}
