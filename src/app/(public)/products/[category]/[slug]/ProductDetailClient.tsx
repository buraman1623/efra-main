"use client";

import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { SpecTable } from "@/components/product/SpecTable";
import { WatchlistButton } from "@/components/product/WatchlistButton";
import { ProductImageGallery } from "@/components/product/ProductImageGallery";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { FadeIn, SlideInRight } from "@/components/ui/MotionWrapper";
import { getProductGalleryImages } from "@/lib/product/images";
import { useLocale, pickLocalized } from "@/lib/i18n/LocaleProvider";
import type { Product } from "@/types";

export default function ProductDetailClient({
  product,
  slug,
}: {
  product: Product;
  slug: string;
}) {
  const { t, locale } = useLocale();

  let modelType: "crusher" | "tractor" | "ballMill" | "placeholder" =
    "placeholder";
  if (slug.includes("crusher") || product.model_number.includes("GCM")) {
    modelType = "crusher";
  }
  if (slug.includes("tractor") || product.model_number.includes("TR")) {
    modelType = "tractor";
  }
  if (slug.includes("mill") || product.model_number.includes("BM")) {
    modelType = "ballMill";
  }

  const galleryImages = getProductGalleryImages(product);
  const name = pickLocalized(locale, product.name_en, product.name_am);
  const description = pickLocalized(
    locale,
    product.description_en ?? "",
    product.description_am
  );

  return (
    <div className="relative min-h-screen bg-black text-brand-light font-sans selection:bg-brand-amber/30 selection:text-brand-light flex flex-col justify-between">
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-32 w-[560px] h-[560px] rounded-full bg-brand-secondary/20 blur-[120px] animate-drift" />
        <div className="absolute top-1/4 -right-40 w-[480px] h-[480px] rounded-full bg-brand-amber/15 blur-[120px] animate-drift [animation-delay:4s]" />
        <div className="absolute bottom-0 left-1/3 w-[520px] h-[520px] rounded-full bg-brand-secondary/15 blur-[130px] animate-drift [animation-delay:8s]" />
        <div className="absolute inset-0 bg-noise opacity-5" />
      </div>

      <div className="relative z-10 flex-1">
        <Header />

        <div className="pt-32 pb-6 border-b border-white/10 bg-black/40 backdrop-blur-md">
          <div className="container-brand">
            <Breadcrumbs />
          </div>
        </div>

        <section className="section-brand relative pb-20 pt-10">
          <div className="container-brand">
            <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-start">
              
              <FadeIn>
                <div className="glass-panel border border-black/10 rounded-2xl p-3 shadow-2xl overflow-hidden bg-white/5 backdrop-blur-xl">
                  <ProductImageGallery
                    images={galleryImages}
                    alt={name}
                    modelUrl={product.model_url}
                    fallbackModelType={modelType}
                  />
                </div>
              </FadeIn>

              <SlideInRight className="flex flex-col gap-6">
                <div>
                  <span className="inline-block py-1 px-3.5 rounded-full bg-brand-amber/10 border border-brand-amber/30 text-brand-amber text-xs font-bold tracking-widest uppercase mb-3">
                    {t.products.model}: {product.model_number}
                  </span>
                  <h1 className="text-display-xs md:text-display-sm font-heading text-white tracking-tight mb-2">
                    {name}
                  </h1>
                  <p className="text-body-md text-brand-light/60 leading-relaxed">
                    {description}
                  </p>
                </div>

                <div className="glass-panel border border-white/10 rounded-2xl p-6 shadow-2xl bg-white/[0.03] backdrop-blur-md">
                  <h3 className="text-heading-xs font-heading text-white mb-4 tracking-wide uppercase text-xs opacity-70">
                    {t.products.technicalSpecifications}
                  </h3>
                  <SpecTable specs={product.specs} />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-center">
                  <WatchlistButton
                    productId={product.id}
                    className="w-full h-12 flex items-center justify-center rounded-full border border-brand-amber/40 bg-brand-amber/5 text-brand-amber hover:bg-brand-amber/10 transition-colors font-medium text-sm"
                  />
                  <Button
                    asChild
                    size="lg"
                    className="w-full h-12 flex items-center justify-center bg-gradient-signal text-white font-semibold rounded-full shadow-lg shadow-brand-amber/20 hover:opacity-90 transition-opacity text-sm"
                  >
                    <Link href={`/contact?tab=quote&model=${product.model_number}`}>
                      {t.products.requestAQuote}
                    </Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="w-full h-12 flex items-center justify-center border border-white/15 bg-white/5 text-white hover:bg-white/10 rounded-full transition-colors text-sm"
                  >
                    <Link href="/contact">{t.products.contactSales}</Link>
                  </Button>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center gap-6 text-brand-light/60 text-xs font-medium">
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-brand-amber" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{t.products.genuineWarranty}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-brand-amber" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    <span>{t.products.fastDeployment}</span>
                  </div>
                </div>
              </SlideInRight>

            </div>
          </div>
        </section>

        <Footer />
      </div>
    </div>
  );
}
