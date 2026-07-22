import Image from "next/image";
import { Metadata } from "next";
import { company } from "@/lib/content/company";
import { images } from "@/lib/assets/images";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FadeIn, FadeUp } from "@/components/ui/MotionWrapper";

export const metadata: Metadata = {
  title: "Cookie Policy | Efra Business Group",
  description: "Learn how Efra Business Group uses cookies and tracking technologies.",
};

export default function CookiesPage() {
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
              alt="Efra Business Group Technology"
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
                Cookie <span className="bg-gradient-signal bg-clip-text text-transparent">Policy</span>
              </h1>
            </FadeUp>

            <FadeUp delay={0.2}>
              <p className="text-body-md text-brand-light/60 max-w-xl mx-auto leading-relaxed">
                Last updated: July 2026
              </p>
            </FadeUp>
          </div>
        </section>

        {/* 3. Main Cookie Policy Content Section */}
        <section className="section-brand relative pb-20">
          <div className="container-brand max-w-4xl">
            <FadeIn delay={0.2}>
              <div className="glass-panel border border-glass-border rounded-brand-xl p-8 md:p-12 shadow-2xl space-y-8 text-brand-light/80 leading-relaxed">
                <p className="text-body-lg text-brand-light/90">
                  This Cookie Policy explains how {company.name} (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) uses cookies and similar technologies to recognize you when you visit our website. It explains what these technologies are and why we use them, as well as your rights to control our use of them.
                </p>

                <hr className="border-glass-border" />

                <div className="space-y-4">
                  <h2 className="text-heading-md font-heading text-brand-light">
                    What are cookies?
                  </h2>
                  <p className="text-body-sm text-brand-muted">
                    Cookies are small data files that are placed on your computer or mobile device when you visit a website. Cookies are widely used by website owners in order to make their websites work, or to work more efficiently, as well as to provide reporting information.
                  </p>
                </div>

                <div className="space-y-4">
                  <h2 className="text-heading-md font-heading text-brand-light">
                    Why do we use cookies?
                  </h2>
                  <p className="text-body-sm text-brand-muted">
                    We use first-party and third-party cookies for several reasons. Some cookies are required for technical reasons in order for our website to operate, and we refer to these as &quot;essential&quot; or &quot;strictly necessary&quot; cookies. Other cookies also enable us to track and target the interests of our users to enhance the experience on our Online Properties.
                  </p>
                </div>

                <div className="space-y-4">
                  <h2 className="text-heading-md font-heading text-brand-light">
                    Types of cookies we use
                  </h2>
                  <ul className="list-disc list-inside space-y-2 text-body-sm text-brand-muted pl-2">
                    <li>
                      <strong className="text-brand-light">Essential website cookies:</strong> These cookies are strictly necessary to provide you with services available through our website and to use some of its features, such as access to secure areas and watchlist tracking.
                    </li>
                    <li>
                      <strong className="text-brand-light">Performance and functionality cookies:</strong> These cookies are used to enhance the performance and functionality of our website but are non-essential to their use. However, without these cookies, certain functionality may become unavailable.
                    </li>
                    <li>
                      <strong className="text-brand-light">Analytics and customization cookies:</strong> These cookies collect information that is used either in aggregate form to help us understand how our website is being used or how effective our marketing campaigns are, or to help us customize our website for you.
                    </li>
                  </ul>
                </div>

                <div className="space-y-4">
                  <h2 className="text-heading-md font-heading text-brand-light">
                    How can I control cookies?
                  </h2>
                  <p className="text-body-sm text-brand-muted">
                    You have the right to decide whether to accept or reject cookies. You can exercise your cookie rights by setting your preferences in your web browser or through browser-level consent settings.
                  </p>
                  <p className="text-body-sm text-brand-muted">
                    You can set or amend your web browser controls to accept or refuse cookies. If you choose to reject cookies, you may still use our website, though your access to some functionality and secure areas of our website may be restricted.
                  </p>
                </div>
              </div>
            </FadeIn>
          </div>
        </section>

        <Footer />
      </div>
    </div>
  );
}