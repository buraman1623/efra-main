import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { FadeUp, StaggerContainer, StaggerItem, SlideInRight, FadeIn } from "@/components/ui/MotionWrapper";
import { images } from "@/lib/assets/images";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { company, uspPoints } from "@/lib/content/company";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | Efra Business Group",
  description: "Learn about Efra Business Group, Ethiopia's leading industrial and agricultural machinery supplier.",
};

export default function AboutPage() {
  return (
    <div className="relative bg-black text-brand-light">
      {/* Single global ambient background matching Home page */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-32 w-[560px] h-[560px] rounded-full bg-brand-secondary/25 blur-[120px] animate-drift" />
        <div className="absolute top-1/4 -right-40 w-[480px] h-[480px] rounded-full bg-brand-amber/15 blur-[120px] animate-drift [animation-delay:4s]" />
        <div className="absolute bottom-0 left-1/3 w-[520px] h-[520px] rounded-full bg-brand-secondary/15 blur-[130px] animate-drift [animation-delay:8s]" />
        <div className="absolute inset-0 bg-noise opacity-5" />
      </div>

      <div className="relative z-10">
        <Header />

        {/* 1. Hero — Header overlap fixed with clear top spacing */}
        <section className="relative overflow-hidden min-h-[45vh] flex items-center justify-center pt-36 sm:pt-40 md:pt-48 pb-20">
          <div className="absolute inset-0 z-0">
            <Image
              src={images.hero.about}
              alt="Efra Business Group Facility"
              fill
              className="object-cover opacity-40 scale-105"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/10 to-black" />
          </div>

          <div className="container-brand relative z-10 flex flex-col items-center text-center">
            {/* <FadeUp delay={0.1}>
              <span className="inline-flex items-center gap-2 py-2 px-5 rounded-full glass-panel text-label uppercase tracking-widest mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-amber animate-pulse-dot" />
                Our Heritage & Focus
              </span>
            </FadeUp> */}

            <FadeUp delay={0.2}>
              <h1 className="text-display-md md:text-display-xl text-brand-light font-heading mb-6 max-w-4xl leading-[1.05] tracking-tight">
                Empowering Ethiopian <span className="bg-gradient-signal bg-clip-text text-transparent">Industry</span>
              </h1>
            </FadeUp>

            <FadeUp delay={0.3}>
              <p className="text-body-lg text-brand-light/60 max-w-2xl mb-10 leading-relaxed">
                Established in {company.yearEstablished}, {company.legalName} has grown into a trusted partner for mining and agricultural enterprises across East Africa.
              </p>
            </FadeUp>
          </div>
        </section>

        {/* 2. Photo Grid Showcase — Heavy operations visual layout
        <section className="section-brand">
          <div className="container-brand">
            <FadeUp className="flex items-end justify-between flex-wrap gap-4 mb-10">
              <div>
                <span className="text-label text-brand-amber uppercase tracking-widest block mb-2">On The Field</span>
                <h2 className="text-heading-lg font-heading text-brand-light">Proven Infrastructure in Action</h2>
              </div>
              <p className="text-body-sm text-brand-muted max-w-xs">
                From assembly lines in Sheger City to heavy deployment in mining and farming operations.
              </p>
            </FadeUp>

            <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6 md:h-[420px]">
              <StaggerItem className="relative rounded-brand-lg overflow-hidden h-72 md:h-full group border border-glass-border">
                <Image
                  src={images.about.factory}
                  alt="Manufacturing Facility"
                  fill
                  className="object-cover transition-transform duration-slower group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-primary via-brand-primary/20 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 glass-panel py-3 px-4">
                  <span className="text-label text-brand-amber uppercase tracking-widest block mb-0.5">Facility</span>
                  <strong className="text-body-md font-heading text-brand-light">Local Assembly HQ</strong>
                </div>
              </StaggerItem>

              <StaggerItem className="relative rounded-brand-lg overflow-hidden h-72 md:h-full group border border-glass-border">
                <Image
                  src={images.categories.mining}
                  alt="Mining Equipment"
                  fill
                  className="object-cover transition-transform duration-slower group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-primary via-brand-primary/20 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 glass-panel py-3 px-4">
                  <span className="text-label text-brand-amber uppercase tracking-widest block mb-0.5">Mining</span>
                  <strong className="text-body-md font-heading text-brand-light">Mineral Extraction</strong>
                </div>
              </StaggerItem>

              <StaggerItem className="relative rounded-brand-lg overflow-hidden h-72 md:h-full group border border-glass-border">
                <Image
                  src={images.categories.tractors}
                  alt="Agricultural Machinery"
                  fill
                  className="object-cover transition-transform duration-slower group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-primary via-brand-primary/20 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 glass-panel py-3 px-4">
                  <span className="text-label text-brand-amber uppercase tracking-widest block mb-0.5">Agriculture</span>
                  <strong className="text-body-md font-heading text-brand-light">Heavy Farm Equipment</strong>
                </div>
              </StaggerItem>
            </StaggerContainer>
          </div>
        </section> */}

        {/* 3. Mission & Vision — Split Image Banner Cards */}
        <section className="section-brand relative">
          <div className="container-brand">
            <div className="grid md:grid-cols-2 gap-8">
              <SlideInRight delay={0.1} className="relative rounded-brand-lg overflow-hidden border border-glass-border group flex flex-col min-h-[680px]">
                {/* Image Container on top */}
                <div className="relative w-full h-72 md:h-80 overflow-hidden">
                  <Image
                    src={images.categories.ballMills}
                    alt="Our Mission Background"
                    fill
                    className="object-cover transition-transform duration-slower group-hover:scale-105"
                  />
                </div>

                {/* Content Section underneath */}
                <div className="p-8 md:p-12 flex-1 flex flex-col justify-center">
                  <div className="w-12 h-12 bg-gradient-signal rounded-brand-md flex items-center justify-center mb-6">
                    <span className="text-xl">🎯</span>
                  </div>
                  <h3 className="text-heading-md font-heading text-brand-light mb-3">Our Mission</h3>
                  <p className="text-body-md text-brand-light/65 leading-relaxed">
                    {company.mission}
                  </p>
                </div>
              </SlideInRight>

              <SlideInRight delay={0.2} className="relative rounded-brand-lg overflow-hidden border border-glass-border group flex flex-col min-h-[680px]">
                {/* Image Container on top */}
                <div className="relative w-full h-72 md:h-80 overflow-hidden">
                  <Image
                    src={images.categories.industrial}
                    alt="Our Vision Background"
                    fill
                    className="object-cover transition-transform duration-slower group-hover:scale-105"
                  />
                </div>

                {/* Content Section underneath */}
                <div className="p-8 md:p-12 flex-1 flex flex-col justify-center">
                  <div className="w-12 h-12 bg-gradient-signal rounded-brand-md flex items-center justify-center mb-6">
                    <span className="text-xl">👁️</span>
                  </div>
                  <h3 className="text-heading-md font-heading text-brand-light mb-3">Our Vision</h3>
                  <p className="text-body-md text-brand-light/65 leading-relaxed">
                    {company.vision}
                  </p>
                </div>
              </SlideInRight>
            </div>
          </div>
        </section>

        {/* 4. Core Values Grid with Graphic Visual Touches */}
        <section className="section-brand relative overflow-hidden">
          <div className="container-brand relative z-10">
            <FadeUp className="text-center mb-16">
              <span className="text-label text-brand-amber uppercase tracking-widest block mb-2">Operational Excellence</span>
              <h2 className="text-heading-lg font-heading text-brand-light mb-4">Our Core Values</h2>
              <p className="text-body-lg text-brand-muted max-w-2xl mx-auto">
                We operate on the principles of reliability, domestic empowerment, and engineering excellence.
              </p>
            </FadeUp>

            <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {uspPoints.map((usp, i) => (
                <StaggerItem key={i} className="glass-panel rounded-brand-lg p-6 hover:border-brand-secondary/50 transition-colors">
                  <div className="w-10 h-10 bg-gradient-signal rounded-brand-md flex items-center justify-center mb-4">
                    <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h4 className="text-heading-sm font-heading mb-2 text-brand-light">{usp.title}</h4>
                  <p className="text-body-sm text-brand-muted leading-relaxed">{usp.description}</p>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>

        {/* 5. Assembly Hub — Image Spotlight & Feature List */}
        <section className="section-brand relative overflow-hidden">
          <div className="container-brand relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <FadeIn className="relative h-[480px] rounded-brand-lg overflow-hidden group border border-glass-border">
                <Image 
                  src={images.about.team}
                  alt="Our manufacturing and assembly infrastructure"
                  fill
                  className="object-cover transition-transform duration-slower group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-primary via-brand-primary/20 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 glass-panel py-3 px-4">
                  <span className="text-label text-brand-amber uppercase tracking-widest block mb-0.5">Sheger City Assembly Hub</span>
                  <strong className="text-body-md font-heading text-brand-light">Domestic Technical Operations</strong>
                </div>
              </FadeIn>
              
              <SlideInRight className="flex flex-col gap-6">
                <div>
                  <span className="text-label text-brand-amber uppercase tracking-widest block mb-2">Local Assembly & Infrastructure</span>
                  <h2 className="text-heading-lg font-heading text-brand-light">Rapid Deployment & Spare Support</h2>
                </div>

                <p className="text-body-md text-brand-muted leading-relaxed">
                  At our Sheger City headquarters, we maintain extensive inventory and assembly capabilities. This allows us to rapidly deploy machinery and provide immediate spare parts support to operations anywhere in the country.
                </p>
                
                <ul className="flex flex-col gap-3">
                  {[
                    "On-site mechanical engineering team",
                    "Extensive spare parts warehouse",
                    "Direct factory partnerships in China",
                    "Nationwide logistics capabilities"
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-body-sm text-brand-light/90">
                      <div className="w-5 h-5 rounded-full bg-brand-secondary/20 flex items-center justify-center shrink-0">
                        <svg className="w-3.5 h-3.5 text-brand-amber" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      {item}
                    </li>
                  ))}
                </ul>
                
                <div className="pt-2">
                  <Button asChild size="lg" variant="primary" className="rounded-full">
                    <Link href="/contact">Visit Our Office</Link>
                  </Button>
                </div>
              </SlideInRight>
            </div>
          </div>
        </section>

        {/* 6. CTA Banner with Full Background Photo
        <section className="py-24 relative overflow-hidden mx-4 lg:mx-8 mb-12 rounded-brand-xl border border-glass-border">
          <Image
            src={images.hero.home}
            alt="CTA Equipment Background"
            fill
            className="object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-black/90" />
          <div className="container-brand relative z-10 text-center">
            <FadeUp className="max-w-3xl mx-auto flex flex-col items-center">
              <h2 className="text-heading-lg md:text-display-sm font-heading text-brand-light mb-4">
                Ready to Upgrade Your Operations?
              </h2>
              <p className="text-body-lg text-brand-muted mb-8 max-w-xl">
                Get in touch with our engineering team for detailed specifications, custom solutions, and immediate quotes.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                <Button asChild size="lg" variant="primary" className="w-full sm:w-auto rounded-full">
                  <Link href="/products">Explore Machinery</Link>
                </Button>
                <Button asChild size="lg" variant="secondary" className="w-full sm:w-auto rounded-full glass-panel">
                  <Link href="/contact">Contact Support</Link>
                </Button>
              </div>
            </FadeUp>
          </div>
        </section> */}

        <Footer />
      </div>
    </div>
  );
}