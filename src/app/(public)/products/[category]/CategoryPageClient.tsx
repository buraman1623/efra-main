"use client";

import Image from "next/image";
import Link from "next/link";
import { ProductCard } from "@/components/product/ProductCard";
import { ProductSearchBar } from "@/components/product/ProductSearchBar";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { images, getCategoryImage } from "@/lib/assets/images";
import {
  FadeUp,
  StaggerContainer,
  StaggerItem,
} from "@/components/ui/MotionWrapper";
import { useLocale, pickLocalized } from "@/lib/i18n/LocaleProvider";
import type { Product, ProductCategory } from "@/types";

function slugToAnchor(slug: string) {
  return `subcat-${slug}`;
}

export default function CategoryPageClient({
  category,
  products,
  subcategories,
  categorySlug,
}: {
  category: ProductCategory;
  products: Product[];
  subcategories: ProductCategory[];
  categorySlug: string;
}) {
  const { t, locale } = useLocale();
  const name = pickLocalized(locale, category.name_en, category.name_am);
  const description = pickLocalized(
    locale,
    category.description_en ?? t.products.defaultProductsDesc,
    category.description_am
  );

  const sortedSubcategories = [...subcategories].sort(
    (a, b) => a.sort_order - b.sort_order
  );

  // Products grouped by their subcategory, in subcategory sort order.
  // Any product that (unusually) sits directly under the main category
  // rather than a subcategory falls back into a flat grid below.
  const groups = sortedSubcategories
    .map((sub) => ({
      subcategory: sub,
      items: products.filter((p) => p.category_id === sub.id),
    }))
    .filter((group) => group.items.length > 0);

  const groupedProductIds = new Set(
    groups.flatMap((g) => g.items.map((p) => p.id))
  );
  const ungroupedProducts = products.filter((p) => !groupedProductIds.has(p.id));

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

        <section className="relative z-30 min-h-[40vh] flex items-center justify-center pt-36 sm:pt-40 md:pt-44 pb-12">
          <div className="absolute inset-0 z-0 overflow-hidden">
            <Image
              src={category.image_url || getCategoryImage(category.slug) || images.hero.home}
              alt={name}
              fill
              className="object-cover opacity-75 scale-105"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/60 to-black" />
          </div>

          <div className="container-brand relative z-10 text-center">
            <div className="flex justify-center mb-4">
              <Breadcrumbs />
            </div>

            <FadeUp delay={0.1}>
              <h1 className="text-display-md md:text-display-lg font-heading text-brand-light mb-3 tracking-tight">
                {name}
              </h1>
            </FadeUp>

            <FadeUp delay={0.2}>
              <p className="text-body-lg text-brand-light/60 max-w-2xl mx-auto leading-relaxed mb-8">
                {description}
              </p>
            </FadeUp>

            <FadeUp delay={0.3} className="max-w-xl mx-auto">
              <ProductSearchBar />
            </FadeUp>
          </div>
        </section>

        {/* Jump-to-subcategory chip nav */}
        {groups.length > 1 && (
          <section className="border-y border-glass-border bg-black/30 backdrop-blur-sm sticky top-16 md:top-20 z-10">
            <div className="container-brand py-3 overflow-x-auto">
              <div className="flex items-center gap-2 w-max">
                {groups.map(({ subcategory }) => (
                  <a
                    key={subcategory.id}
                    href={`#${slugToAnchor(subcategory.slug)}`}
                    className="shrink-0 px-4 py-1.5 rounded-full border border-glass-border bg-white/5 text-xs font-medium text-brand-light/80 hover:text-brand-amber hover:border-brand-amber/50 transition-colors"
                  >
                    {pickLocalized(locale, subcategory.name_en, subcategory.name_am)}
                  </a>
                ))}
              </div>
            </div>
          </section>
        )}

        <section className="section-brand relative pb-20">
          <div className="container-brand space-y-20">
            {products.length === 0 ? (
              <div className="py-16 text-center max-w-md mx-auto glass-panel border border-glass-border rounded-brand-xl p-8 shadow-2xl">
                <h3 className="text-heading-sm font-heading text-brand-light mb-2">
                  {t.products.noProductsTitle}
                </h3>
                <p className="text-body-sm text-brand-light/60 leading-relaxed">
                  {t.products.noProductsDesc}
                </p>
              </div>
            ) : (
              <>
                {groups.map(({ subcategory, items }) => {
                  const subName = pickLocalized(locale, subcategory.name_en, subcategory.name_am);
                  const subDescription = pickLocalized(
                    locale,
                    subcategory.description_en ?? "",
                    subcategory.description_am
                  );
                  return (
                    <div key={subcategory.id} id={slugToAnchor(subcategory.slug)} className="scroll-mt-32">
                      <FadeUp className="mb-8 flex items-end justify-between flex-wrap gap-4">
                        <div>
                          <h2 className="text-heading-lg font-heading text-brand-light">{subName}</h2>
                          {subDescription && (
                            <p className="text-body-sm text-brand-muted mt-2 max-w-xl">
                              {subDescription}
                            </p>
                          )}
                        </div>
                        <Link
                          href={`/products/${categorySlug}#${slugToAnchor(subcategory.slug)}`}
                          className="text-xs font-semibold text-brand-muted"
                        >
                          {items.length} {items.length === 1 ? "model" : "models"}
                        </Link>
                      </FadeUp>

                      <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {items.map((product) => (
                          <StaggerItem key={product.id}>
                            <ProductCard product={product} categorySlug={categorySlug} />
                          </StaggerItem>
                        ))}
                      </StaggerContainer>
                    </div>
                  );
                })}

                {ungroupedProducts.length > 0 && (
                  <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {ungroupedProducts.map((product) => (
                      <StaggerItem key={product.id}>
                        <ProductCard product={product} categorySlug={categorySlug} />
                      </StaggerItem>
                    ))}
                  </StaggerContainer>
                )}
              </>
            )}
          </div>
        </section>

        <Footer />
      </div>
    </div>
  );
}
