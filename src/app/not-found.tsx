"use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { FadeUp } from "@/components/ui/MotionWrapper";
import { useLocale } from "@/lib/i18n/LocaleProvider";

export default function NotFound() {
  const { t } = useLocale();
  return (
    <div className="relative min-h-screen bg-black text-brand-light font-sans selection:bg-brand-amber/30 selection:text-brand-light flex flex-col justify-between">
      {/* 1. Global Ambient Background Glow */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-32 w-[560px] h-[560px] rounded-full bg-brand-secondary/25 blur-[120px] animate-drift" />
        <div className="absolute top-1/3 -right-40 w-[480px] h-[480px] rounded-full bg-brand-amber/15 blur-[120px] animate-drift [animation-delay:4s]" />
        <div className="absolute bottom-10 left-1/4 w-[520px] h-[520px] rounded-full bg-brand-secondary/15 blur-[130px] animate-drift [animation-delay:8s]" />
        <div className="absolute inset-0 bg-noise opacity-5" />
      </div>

      {/* 2. Main 404 Content Area */}
      <main className="relative z-10 flex-1 flex items-center justify-center px-4 pt-32 pb-16 min-h-[calc(100vh-80px)]">
        <FadeUp delay={0.1} className="w-full max-w-lg text-center">
          <div className="glass-panel border border-glass-border rounded-brand-xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
            {/* Ambient accent glow */}
            <div className="absolute -top-12 -right-12 w-32 h-32 bg-brand-amber/10 rounded-full blur-2xl pointer-events-none" />

            <h1 className="font-heading text-display-2xl sm:text-[120px] font-bold bg-gradient-signal bg-clip-text text-transparent leading-none mb-2">
              404
            </h1>

            <h2 className="font-heading text-heading-lg text-brand-light mb-3">
              {t.notFound.title}
            </h2>

            <p className="text-body-sm text-brand-light/60 max-w-md mx-auto mb-8 leading-relaxed">
              {t.notFound.description}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                asChild
                variant="primary"
                className="w-full sm:w-auto bg-gradient-signal text-white font-semibold py-3 px-6 rounded-full shadow-lg shadow-brand-amber/10 hover:opacity-90 transition-opacity"
              >
                <Link href="/">{t.notFound.returnHome}</Link>
              </Button>

              <Button
                asChild
                variant="outline"
                className="w-full sm:w-auto border border-glass-border text-brand-light hover:bg-white/10 py-3 px-6 rounded-full transition-colors"
              >
                <Link href="/products">{t.notFound.viewMachinery}</Link>
              </Button>
            </div>
          </div>
        </FadeUp>
      </main>
    </div>
  );
}