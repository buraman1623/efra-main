import { notFound } from "next/navigation";
import Link from "next/link";
import { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { SpecTable } from "@/components/product/SpecTable";
import { WatchlistButton } from "@/components/product/WatchlistButton";
import { ProductImageGallery } from "@/components/product/ProductImageGallery";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { FadeIn, SlideInRight } from "@/components/ui/MotionWrapper";
import { getProductBySlug } from "@/lib/data/catalog";
import { getProductGalleryImages } from "@/lib/product/images";

interface Props {
  params: Promise<{ category: string; slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = await params;
  const product = await getProductBySlug(p.category, p.slug);

  if (!product) return { title: "Product Not Found | Efra Business Group" };

  return {
    title: `${product.name_en} | Efra Business Group`,
    description: product.description_en || "",
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const p = await params;
  const product = await getProductBySlug(p.category, p.slug);

  if (!product) {
    notFound();
  }

  let modelType: "crusher" | "tractor" | "ballMill" | "placeholder" =
    "placeholder";
  if (p.slug.includes("crusher") || product.model_number.includes("GCM")) {
    modelType = "crusher";
  }
  if (p.slug.includes("tractor") || product.model_number.includes("TR")) {
    modelType = "tractor";
  }
  if (p.slug.includes("mill") || product.model_number.includes("BM")) {
    modelType = "ballMill";
  }

  const galleryImages = getProductGalleryImages(product);

  return (
    <div className="relative min-h-screen bg-black text-brand-light font-sans selection:bg-brand-amber/30 selection:text-brand-light flex flex-col justify-between">
      {/* 1. Ambient Background Glow */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-32 w-[560px] h-[560px] rounded-full bg-brand-secondary/20 blur-[120px] animate-drift" />
        <div className="absolute top-1/4 -right-40 w-[480px] h-[480px] rounded-full bg-brand-amber/15 blur-[120px] animate-drift [animation-delay:4s]" />
        <div className="absolute bottom-0 left-1/3 w-[520px] h-[520px] rounded-full bg-brand-secondary/15 blur-[130px] animate-drift [animation-delay:8s]" />
        <div className="absolute inset-0 bg-noise opacity-5" />
      </div>

      <div className="relative z-10 flex-1">
        <Header />

        {/* 2. Breadcrumb Header Bar */}
        <div className="pt-32 pb-6 border-b border-white/10 bg-black/40 backdrop-blur-md">
          <div className="container-brand">
            <Breadcrumbs />
          </div>
        </div>

        {/* 3. Main Product Section */}
        <section className="section-brand relative pb-20 pt-10">
          <div className="container-brand">
            <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-start">
              
              {/* Left Column: Interactive 3D / Image Gallery */}
              <FadeIn>
                <div className="glass-panel border border-black/10 rounded-2xl p-3 shadow-2xl overflow-hidden bg-white/5 backdrop-blur-xl">
                  <ProductImageGallery
                    images={galleryImages}
                    alt={product.name_en}
                    modelUrl={product.model_url}
                    fallbackModelType={modelType}
                  />
                </div>
              </FadeIn>

              {/* Right Column: Specs & Actions */}
              <SlideInRight className="flex flex-col gap-6">
                <div>
                  <span className="inline-block py-1 px-3.5 rounded-full bg-brand-amber/10 border border-brand-amber/30 text-brand-amber text-xs font-bold tracking-widest uppercase mb-3">
                    MODEL: {product.model_number}
                  </span>
                  <h1 className="text-display-xs md:text-display-sm font-heading text-white tracking-tight mb-2">
                    {product.name_en}
                  </h1>
                  <p className="text-body-md text-brand-light/60 leading-relaxed">
                    {product.description_en}
                  </p>
                </div>

                {/* Dark Glass Technical Specifications */}
                <div className="glass-panel border border-white/10 rounded-2xl p-6 shadow-2xl bg-white/[0.03] backdrop-blur-md">
                  <h3 className="text-heading-xs font-heading text-white mb-4 tracking-wide uppercase text-xs opacity-70">
                    Technical Specifications
                  </h3>
                  <SpecTable specs={product.specs} />
                </div>

                {/* Action Buttons (Strictly Aligned) */}
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
                      Request a Quote
                    </Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="w-full h-12 flex items-center justify-center border border-white/15 bg-white/5 text-white hover:bg-white/10 rounded-full transition-colors text-sm"
                  >
                    <Link href="/contact">Contact Sales</Link>
                  </Button>
                </div>

                {/* Feature Badges */}
                <div className="pt-4 border-t border-white/10 flex items-center gap-6 text-brand-light/60 text-xs font-medium">
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-brand-amber" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Genuine Warranty</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-brand-amber" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    <span>Fast Deployment</span>
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