import Image from "next/image";
import { Metadata } from "next";
import { company } from "@/lib/content/company";
import { images } from "@/lib/assets/images";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ContactForms } from "@/components/contact/ContactForms";
import { FadeIn, FadeUp, SlideInRight } from "@/components/ui/MotionWrapper";

export const metadata: Metadata = {
  title: "Contact & Quote Request | Efra Business Group",
  description:
    "Get in touch with Efra Business Group for machinery quotes, technical support, and procurement inquiries.",
};

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ tab?: string; model?: string }>;
}) {
  const resolvedSearchParams = await searchParams;
  const isQuote = resolvedSearchParams.tab === "quote";
  const defaultProduct = resolvedSearchParams.model?.trim() || undefined;

  return (
    <div className="relative bg-black text-brand-light font-sans selection:bg-brand-amber/30 selection:text-brand-light">
      {/* 1. Global Ambient Background Glow */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-32 w-[560px] h-[560px] rounded-full bg-brand-secondary/25 blur-[120px] animate-drift" />
        <div className="absolute top-1/4 -right-40 w-[480px] h-[480px] rounded-full bg-brand-amber/15 blur-[120px] animate-drift [animation-delay:4s]" />
        <div className="absolute bottom-0 left-1/3 w-[520px] h-[520px] rounded-full bg-brand-secondary/15 blur-[130px] animate-drift [animation-delay:8s]" />
        <div className="absolute inset-0 bg-noise opacity-5" />
      </div>

      <div className="relative z-10">
        <Header />

        {/* 2. Hero Banner */}
        <section className="relative overflow-hidden min-h-[40vh] flex items-center justify-center pt-36 sm:pt-40 md:pt-48 pb-16">
          <div className="absolute inset-0 z-0">
            <Image
              src={images.hero.home}
              alt="Efra Business Group Infrastructure"
              fill
              className="object-cover opacity-30 scale-105"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-black" />
            <div className="absolute inset-0 shadow-[inset_0_0_160px_70px_rgba(0,0,0,0.6)]" />
          </div>

          <div className="container-brand relative z-10 text-center">
            <FadeUp delay={0.2}>
              <h1 className="text-display-md md:text-display-lg font-heading text-brand-light mb-4 tracking-tight">
                {isQuote ? "Request a " : "Contact "}
                <span className="bg-gradient-signal bg-clip-text text-transparent">
                  {isQuote ? "Quote" : "Our Team"}
                </span>
              </h1>
            </FadeUp>

            <FadeUp delay={0.3}>
              <p className="text-body-lg text-brand-light/60 max-w-2xl mx-auto leading-relaxed">
                Our engineering and sales teams are ready to assist with your operational requirements, machinery specs, and procurement queries.
              </p>
            </FadeUp>
          </div>
        </section>

        {/* 3. Main Contact & Form Grid Section */}
        <section className="section-brand relative pb-12">
          <div className="container-brand grid lg:grid-cols-12 gap-12 lg:gap-8">
            
            {/* Left Sidebar Info Cards (5 Cols) */}
            <div className="lg:col-span-5 flex flex-col gap-8">
              
              {/* Headquarters Details Card */}
              <SlideInRight
                delay={0.1}
                className="glass-panel border border-glass-border rounded-brand-lg p-8 hover:border-brand-secondary/40 transition-colors"
              >
                <h3 className="text-heading-sm font-heading text-brand-light mb-6 border-b border-glass-border pb-4">
                  Headquarters
                </h3>
                
                <div className="flex items-start gap-4 text-brand-muted mb-6">
                  <div className="w-10 h-10 bg-brand-secondary/20 rounded-full flex items-center justify-center shrink-0 text-brand-amber">
                    📍
                  </div>
                  <div>
                    <h4 className="font-semibold text-brand-light mb-1">Address</h4>
                    <p className="text-body-sm leading-relaxed">{company.headOffice}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 text-brand-muted mb-6">
                  <div className="w-10 h-10 bg-brand-secondary/20 rounded-full flex items-center justify-center shrink-0 text-brand-amber">
                    📞
                  </div>
                  <div>
                    <h4 className="font-semibold text-brand-light mb-1">Direct Lines</h4>
                    <a href={`tel:${company.phone}`} className="text-body-sm" target="_blank">{company.phone}</a>
                  </div>
                </div>

                <div className="flex items-start gap-4 text-brand-muted mb-6">
                  <div className="w-10 h-10 bg-brand-secondary/20 rounded-full flex items-center justify-center shrink-0 text-brand-amber">
                    📱
                  </div>
                  <div>
                    <h4 className="font-semibold text-brand-light mb-1">Whatsapp</h4>
                    <a href={`https://wa.me/${company.whatsapp}`} className="text-body-sm" target="_blank">{company.whatsapp}</a>
                  </div>
                </div>

                <div className="flex items-start gap-4 text-brand-muted">
                  <div className="w-10 h-10 bg-brand-secondary/20 rounded-full flex items-center justify-center shrink-0 text-brand-amber">
                    💬 
                  </div>
                  <div>
                    <h4 className="font-semibold text-brand-light mb-1">Email</h4>
                    <a href={`mailto:${company.email}`} className="text-body-sm" target="_blank">{company.email}</a>
                  </div>
                </div>
              </SlideInRight>

              {/* Operating Hours Card */}
              <SlideInRight
                delay={0.2}
                className="glass-panel border border-glass-border rounded-brand-lg p-8 hover:border-brand-secondary/40 transition-colors"
              >
                <h3 className="text-heading-sm font-heading text-brand-light mb-4 border-b border-glass-border pb-3">
                  Business Hours
                </h3>
                <ul className="flex flex-col gap-3 text-body-sm text-brand-muted">
                  <li className="flex justify-between">
                    <span>Monday - Friday</span>
                    <span className="font-medium text-brand-light">8:00 AM - 5:00 PM</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Saturday</span>
                    <span className="font-medium text-brand-light">9:00 AM - 1:00 PM</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Sunday</span>
                    <span className="font-medium text-brand-light">Closed</span>
                  </li>
                </ul>
              </SlideInRight>
            </div>

            {/* Right Form Card Section (7 Cols) */}
            <div className="lg:col-span-7">
              <FadeIn
                delay={0.3}
                className="glass-panel border border-glass-border rounded-brand-lg p-8 md:p-10"
              >
                <h2 className="text-heading-md font-heading text-brand-light mb-2">
                  {isQuote ? "Technical Requirements" : "Send a Message"}
                </h2>

                <ContactForms
                  isQuote={isQuote}
                  defaultProduct={defaultProduct}
                />
              </FadeIn>
            </div>

          </div>
        </section>

        {/* 4. Full-Width Bottom Interactive Google Map Section */}
        <section className="pb-16 sm:pb-24 relative z-10">
          <div className="container-brand">
            <FadeUp delay={0.2}>
              <div className="glass-panel border border-glass-border rounded-brand-lg overflow-hidden">
                <div className="px-8 pt-8 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-glass-border">
                  <div>
                    <h3 className="text-heading-sm font-heading text-brand-light">Find Us</h3>
                    <p className="mt-1 text-body-sm text-brand-muted">
                      Visit our Sheger City HQ & Assembly Facility.
                    </p>
                  </div>
                </div>
                <div className="relative w-full h-[360px] sm:h-[420px] bg-brand-primary/40">
                  <iframe
                    title="Efra Business Group location"
                    src="https://www.google.com/maps/embed?pb=!1m10!1m8!1m3!1d1970.237351344659!2d38.67741751779755!3d9.020387043069!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2set!4v1784214222701!5m2!1sen!2set"
                    className="absolute inset-0 h-full w-full border-0 opacity-80 hover:opacity-100 transition-all duration-medium"
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="strict-origin-when-cross-origin"
                  />
                </div>
              </div>
            </FadeUp>
          </div>
        </section>

        <Footer />
      </div>
    </div>
  );
}