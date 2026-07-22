import Image from "next/image";
import { Metadata } from "next";
import { company } from "@/lib/content/company";
import { images } from "@/lib/assets/images";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FadeIn, FadeUp } from "@/components/ui/MotionWrapper";

export const metadata: Metadata = {
  title: "Terms & Conditions | Efra Business Group",
  description: "Terms and conditions for using Efra Business Group's website and quote request services.",
};

export default function TermsPage() {
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
              alt="Efra Business Group Facility"
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
                Terms & <span className="bg-gradient-signal bg-clip-text text-transparent">Conditions</span>
              </h1>
            </FadeUp>

            <FadeUp delay={0.2}>
              <p className="text-body-md text-brand-light/60 max-w-xl mx-auto leading-relaxed">
                Last updated: July 2026
              </p>
            </FadeUp>
          </div>
        </section>

        {/* 3. Main Terms Content Section */}
        <section className="section-brand relative pb-20">
          <div className="container-brand max-w-4xl">
            <FadeIn delay={0.2}>
              <div className="glass-panel border border-glass-border rounded-brand-xl p-8 md:p-12 shadow-2xl space-y-8 text-brand-light/80 leading-relaxed">
                <div className="space-y-4 text-body-lg text-brand-light/90">
                  <p>
                    Welcome to {company.name}. These terms and conditions outline the rules and regulations for the use of {company.legalName}&apos;s Website, located at efrabusinessgroup.com.
                  </p>
                  <p className="text-body-sm text-brand-muted">
                    By accessing this website we assume you accept these terms and conditions. Do not continue to use {company.name} if you do not agree to take all of the terms and conditions stated on this page.
                  </p>
                </div>

                <hr className="border-glass-border" />

                <div className="space-y-4">
                  <h2 className="text-heading-md font-heading text-brand-light">
                    1. Intellectual Property Rights
                  </h2>
                  <p className="text-body-sm text-brand-muted">
                    Unless otherwise stated, {company.legalName} and/or its licensors own the intellectual property rights for all material on {company.name}. All intellectual property rights are reserved. You may access this from {company.name} for your own personal use subjected to restrictions set in these terms and conditions.
                  </p>
                  <p className="text-body-sm font-semibold text-brand-light mt-2">You must not:</p>
                  <ul className="list-disc list-inside space-y-2 text-body-sm text-brand-muted pl-2">
                    <li>Republish material from {company.name}</li>
                    <li>Sell, rent or sub-license material from {company.name}</li>
                    <li>Reproduce, duplicate or copy material from {company.name}</li>
                    <li>Redistribute content from {company.name}</li>
                  </ul>
                </div>

                <div className="space-y-4">
                  <h2 className="text-heading-md font-heading text-brand-light">
                    2. Machinery Information and Quotes
                  </h2>
                  <p className="text-body-sm text-brand-muted">
                    All product specifications, capacity dimensions, and operational capabilities provided on this website are for informational purposes only. While we endeavor to keep the information up to date and correct, we make no representations or warranties of any kind about the completeness, accuracy, reliability, or suitability with respect to the website or the information, products, or services.
                  </p>
                  <p className="text-body-sm text-brand-muted">
                    Quotes requested through this website do not constitute a binding contract until formal sales agreements are signed by authorized representatives of {company.legalName} and the client.
                  </p>
                </div>

                <div className="space-y-4">
                  <h2 className="text-heading-md font-heading text-brand-light">
                    3. User Comments and Forms
                  </h2>
                  <p className="text-body-sm text-brand-muted">
                    When submitting information via our Quote Request (RFQ) forms, Contact forms, or other interactive elements, you warrant that the information provided is accurate and that you are authorized to represent the company you claim to represent.
                  </p>
                </div>

                <div className="space-y-4">
                  <h2 className="text-heading-md font-heading text-brand-light">
                    4. Links to Other Websites
                  </h2>
                  <p className="text-body-sm text-brand-muted">
                    Our website may contain links to third-party web sites or services that are not owned or controlled by {company.legalName}. We have no control over, and assume no responsibility for, the content, privacy policies, or practices of any third party web sites or services.
                  </p>
                </div>

                <div className="space-y-4">
                  <h2 className="text-heading-md font-heading text-brand-light">
                    5. Governing Law
                  </h2>
                  <p className="text-body-sm text-brand-muted">
                    These Terms shall be governed and construed in accordance with the laws of Ethiopia, without regard to its conflict of law provisions.
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