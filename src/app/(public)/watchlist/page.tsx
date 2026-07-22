import { redirect } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { getUserWatchlist } from "@/lib/data/watchlist";
import { images } from "@/lib/assets/images";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ProductCard } from "@/components/product/ProductCard";
import { Button } from "@/components/ui/Button";
import { FadeIn, FadeUp } from "@/components/ui/MotionWrapper";

export const metadata: Metadata = {
  title: "My Watchlist | Efra Business Group",
  description: "View your saved machinery and equipment",
};

export default async function WatchlistPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth?next=/watchlist");
  }

  const watchlist = await getUserWatchlist(user.id);

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
              src={images.hero.home}
              alt="Efra Machinery Watchlist"
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
                My <span className="bg-gradient-signal bg-clip-text text-transparent">Watchlist</span>
              </h1>
            </FadeUp>

            <FadeUp delay={0.2}>
              <p className="text-body-lg text-brand-light/60 max-w-xl mx-auto leading-relaxed">
                Keep track of machinery and equipment saved to your profile for quick quotes and specs reference.
              </p>
            </FadeUp>
          </div>
        </section>

        {/* 3. Watchlist Grid or Empty State Section */}
        <section className="section-brand relative pb-20">
          <div className="container-brand">
            {watchlist.length === 0 ? (
              <FadeIn className="text-center py-12">
                <div className="max-w-md mx-auto glass-panel border border-glass-border rounded-brand-xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
                  <div className="w-16 h-16 mx-auto rounded-full bg-brand-amber/10 border border-brand-amber/20 flex items-center justify-center text-brand-amber mb-6">
                    <svg
                      className="w-8 h-8"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      />
                    </svg>
                  </div>

                  <h2 className="text-heading-md font-heading text-brand-light mb-3">
                    No Saved Machinery
                  </h2>
                  <p className="text-body-sm text-brand-muted mb-8 leading-relaxed">
                    You haven&apos;t saved any equipment to your watchlist yet. Explore our product line to save items for instant quote requests.
                  </p>

                  <Button
                    asChild
                    variant="primary"
                    className="w-full sm:w-auto bg-gradient-signal text-white font-semibold py-3 px-8 rounded-full shadow-lg shadow-brand-amber/10 hover:opacity-90 transition-opacity"
                  >
                    <Link href="/products">Browse Product Line</Link>
                  </Button>
                </div>
              </FadeIn>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {watchlist.map((entry, index) => (
                  <FadeIn key={entry.id} delay={index * 0.05}>
                    <ProductCard
                      product={entry.product}
                      categorySlug={entry.categorySlug}
                    />
                  </FadeIn>
                ))}
              </div>
            )}
          </div>
        </section>

        <Footer />
      </div>
    </div>
  );
}