import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getCategories } from "@/lib/data/catalog";
import { images, getCategoryImage } from "@/lib/assets/images";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import {
  FadeUp,
  StaggerContainer,
  StaggerItem,
} from "@/components/ui/MotionWrapper";

export const metadata: Metadata = {
  title: "Machinery & Equipment Catalog | Efra Business Group",
  description:
    "Browse our complete catalog of mining, agricultural, and industrial machinery.",
};

export default async function ProductsPage() {
  const categories = await getCategories();

  return (
    <div className="relative min-h-screen bg-black text-brand-light font-sans selection:bg-brand-amber/30 selection:text-brand-light flex flex-col justify-between">
      {/* 1. Global Ambient Background Glow */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-32 w-[560px] h-[560px] rounded-full bg-brand-secondary/25 blur-[120px] animate-drift" />
        <div className="absolute top-1/4 -right-40 w-[480px] h-[480px] rounded-full bg-brand-amber/15 blur-[120px] animate-drift [animation-delay:4s]" />
        <div className="absolute bottom-0 left-1/3 w-[520px] h-[520px] rounded-full bg-brand-secondary/15 blur-[130px] animate-drift [animation-delay:8s]" />
        <div className="absolute inset-0 bg-noise opacity-5" />
      </div>

      <div className="relative z-10 flex-1">
        <Header />

        {/* 2. Hero Banner */}
        <section className="relative overflow-hidden min-h-[35vh] flex items-center justify-center pt-36 sm:pt-40 md:pt-44 pb-12">
          <div className="absolute inset-0 z-0">
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
                Machinery & <span className="bg-gradient-signal bg-clip-text text-transparent">Equipment</span>
              </h1>
            </FadeUp>

            <FadeUp delay={0.2}>
              <p className="text-body-lg text-brand-light/60 max-w-xl mx-auto leading-relaxed">
                Select a category below to explore our engineered heavy machinery and industrial solutions.
              </p>
            </FadeUp>
          </div>
        </section>

        {/* 3. Catalog Categories Section */}
        <section className="section-brand relative pb-20">
          <div className="container-brand">
            {categories.length === 0 ? (
              <div className="py-16 text-center max-w-md mx-auto glass-panel border border-glass-border rounded-brand-xl p-8 shadow-2xl">
                <h3 className="text-heading-sm font-heading text-brand-light mb-2">
                  No Categories Available
                </h3>
                <p className="text-body-sm text-brand-muted leading-relaxed">
                  Products and machinery categories will appear here once published in the administrative dashboard.
                </p>
              </div>
            ) : (
              <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {categories.map((category) => (
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
                            alt={category.name_en}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80" />
                        </div>

                        <div className="p-6 flex flex-col flex-1 relative">
                          <h2 className="text-heading-sm font-heading text-brand-light mb-2 group-hover:text-brand-amber transition-colors">
                            {category.name_en}
                          </h2>
                          <p className="text-body-sm text-brand-muted mb-6 flex-1 leading-relaxed">
                            {category.description_en ||
                              "Explore engineered heavy machinery in this category."}
                          </p>
                          <div className="flex items-center gap-2 text-brand-amber font-semibold text-sm group-hover:translate-x-1 transition-transform">
                            <span>View Products</span>
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
                ))}
              </StaggerContainer>
            )}
          </div>
        </section>

        <Footer />
      </div>
    </div>
  );
}