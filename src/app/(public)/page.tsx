import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { FadeUp, StaggerContainer, StaggerItem, SlideInRight } from "@/components/ui/MotionWrapper";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { images } from "@/lib/assets/images";
import { company, services, uspPoints } from "@/lib/content/company";

export default function HomePage() {
  return (
    <div className="relative bg-black">
      {/* Single global ambient background — fixed behind all content, no per-section resets */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-32 w-[560px] h-[560px] rounded-full bg-brand-secondary/25 blur-[120px] animate-drift" />
        <div className="absolute top-1/4 -right-40 w-[480px] h-[480px] rounded-full bg-brand-amber/15 blur-[120px] animate-drift [animation-delay:4s]" />
        <div className="absolute bottom-0 left-1/3 w-[520px] h-[520px] rounded-full bg-brand-secondary/15 blur-[130px] animate-drift [animation-delay:8s]" />
        <div className="absolute inset-0 bg-noise opacity-5" />
      </div>

      <div className="relative z-10">
      <Header />
      {/* 1. Hero Section — centered, glass, pill shapes, photo as subtle backdrop */}

      <section className="relative overflow-hidden min-h-[100dvh] flex items-start md:items-center justify-center pt-28 sm:pt-32 md:pt-0 pb-16 md:pb-0">
        {/* background photography — visible but soft, darker toward the bottom for depth and separation before the next section */}
        <div className="absolute inset-0 z-0">
          <Image
            // src={images.hero.home}
            src={images.hero.home}
            alt="Heavy industrial machinery"
            fill
            className="object-cover opacity-[0.36] scale-105"
            priority
            unoptimized
          />  
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brand-primary/50 to-brand-primary" />
          <div className="absolute inset-0 shadow-[inset_0_0_160px_70px_rgba(0,0,0,0.55)]" />
        </div>

        <div className="container-brand relative z-10 flex flex-col items-center text-center">
          <FadeUp delay={0.1}>
            <span className="inline-flex items-center gap-2 py-2 px-5 rounded-full glass-panel text-label uppercase tracking-widest mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-amber animate-pulse-dot" />
              {company.industry}
            </span>
          </FadeUp>

          <FadeUp delay={0.2}>
            <h1 className="text-display-md md:text-display-xl text-brand-light font-heading mb-6 max-w-4xl leading-[1.05] tracking-tight">
              Powering <span className="bg-gradient-signal bg-clip-text text-transparent">Ethiopia&apos;s</span> Core Industries
            </h1>
          </FadeUp>

          <FadeUp delay={0.3}>
            <p className="text-body-lg text-brand-light/45 max-w-2xl mb-10 leading-relaxed">
              {company.mission}
            </p>
          </FadeUp>

          <FadeUp delay={0.4} className="flex flex-col sm:flex-row gap-4 mb-16">
            <Button asChild size="lg" variant="primary" className="w-full sm:w-auto rounded-full">
              <Link href="/products">Explore Machinery</Link>
            </Button>
            <Button asChild size="lg" variant="secondary" className="w-full sm:w-auto rounded-full glass-panel">
              <Link href="/contact?tab=quote">Request a Quote</Link>
            </Button>
          </FadeUp>

          <FadeUp delay={0.5} className="w-full max-w-2xl">
            <div className="glass-panel rounded-full flex divide-x divide-glass-border overflow-hidden">
              <div className="flex-1 py-5 px-4">
                <div className="text-heading-md font-heading bg-gradient-signal bg-clip-text text-transparent">10+</div>
                <div className="text-label text-brand-muted uppercase tracking-wider mt-1">Years Exp.</div>
              </div>
              <div className="flex-1 py-5 px-4">
                <div className="text-heading-md font-heading bg-gradient-signal bg-clip-text text-transparent">13+</div>
                <div className="text-label text-brand-muted uppercase tracking-wider mt-1">Machine Models</div>
              </div>
              <div className="flex-1 py-5 px-4">
                <div className="text-heading-md font-heading bg-gradient-signal bg-clip-text text-transparent">100%</div>
                <div className="text-label text-brand-muted uppercase tracking-wider mt-1">Nationwide</div>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* 2. Proof — bento image collage */}
      <section className="section-brand">
        <div className="container-brand">
          <FadeUp className="flex items-end justify-between flex-wrap gap-4 mb-10">
            <h2 className="text-heading-lg font-heading text-brand-light">Built on Real Operations</h2>
            <p className="text-body-sm text-brand-muted max-w-xs">From the field to the factory floor — equipment doing the actual work.</p>
          </FadeUp>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-[1.4fr_1fr] gap-5 md:h-[480px]">
            <StaggerItem className="relative rounded-brand-lg overflow-hidden aspect-[4/3] md:aspect-auto md:h-full group">
              <Image src={images.about.factory} alt="Processing and fabrication facility" fill className="object-cover transition-transform duration-slower group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-primary via-brand-primary/30 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 glass-panel py-3 px-4">
                <span className="text-label text-brand-amber uppercase tracking-widest block mb-0.5">Facility</span>
                <strong className="text-body-md font-heading text-brand-light">Processing &amp; Fabrication</strong>
              </div>
            </StaggerItem>

            <div className="grid grid-cols-1 md:grid-rows-2 gap-5 md:h-full">
              <StaggerItem className="relative rounded-brand-lg overflow-hidden aspect-[16/9] md:aspect-auto group">
                <Image src={images.categories.tractors} alt="Agricultural machinery in the field" fill className="object-cover transition-transform duration-slower group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-primary via-brand-primary/30 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 glass-panel py-3 px-4">
                  <span className="text-label text-brand-amber uppercase tracking-widest block mb-0.5">Field</span>
                  <strong className="text-body-md font-heading text-brand-light">Agricultural Deployment</strong>
                </div>
              </StaggerItem>
              <StaggerItem className="relative rounded-brand-lg overflow-hidden aspect-[16/9] md:aspect-auto group">
                <Image src={images.categories.ballMills} alt="Mineral processing plant" fill className="object-cover transition-transform duration-slower group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-primary via-brand-primary/30 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 glass-panel py-3 px-4">
                  <span className="text-label text-brand-amber uppercase tracking-widest block mb-0.5">Plant</span>
                  <strong className="text-body-md font-heading text-brand-light">Mineral Processing</strong>
                </div>
              </StaggerItem>
            </div>
          </StaggerContainer>
        </div>
      </section>

      {/* 4. Product Categories */}
      <section className="section-brand relative overflow-hidden">
        <div className="container-brand relative z-10">
          <FadeUp>
            <div className="text-center mb-16">
              <h2 className="text-heading-lg font-heading text-brand-light mb-4">Industrial Solutions</h2>
              <p className="text-body-lg text-brand-muted max-w-2xl mx-auto">
                Comprehensive heavy machinery engineered for peak performance in mining, agriculture, and specialized industrial sectors.
              </p>
            </div>
          </FadeUp>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Mining Equipment", image: images.categories.mining, slug: "mining-mineral-processing", index: 1, tag: "Mining" },
              { title: "Agricultural Machinery", image: images.categories.agriculture, slug: "agricultural-machinery", index: 2, tag: "Agriculture" },
              { title: "Industrial Machinery", image: images.categories.industrial, slug: "industrial-machinery", index: 3, tag: "Industrial" }
            ].map((cat) => (
              <StaggerItem key={cat.slug} className="group relative overflow-hidden rounded-brand-lg h-96 cursor-pointer hover:-translate-y-1.5 transition-transform duration-normal">
                <Link href={`/products/${cat.slug}`} className="block w-full h-full">
                  <Image
                    src={cat.image}
                    alt={cat.title}
                    fill
                    className="object-cover transition-transform duration-slower group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-primary via-brand-primary/40 to-transparent opacity-90" />
                  <div className="absolute bottom-4 left-4 right-4 glass-panel py-4 px-5">
                    <span className="text-label text-brand-amber uppercase tracking-widest block mb-1">
                      {String(cat.index).padStart(2, "0")} · {cat.tag}
                    </span>
                    <h3 className="text-heading-sm text-brand-light font-heading mb-2">{cat.title}</h3>
                    <div className="flex items-center gap-2 text-brand-light/80 opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="text-body-sm font-semibold">View Catalog</span>
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                    </div>
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* 5. USP Section */}
      <section className="section-brand text-brand-light relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-radial-accent opacity-20" />
        <div className="container-brand relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <SlideInRight className="flex flex-col gap-6">
              <h2 className="text-heading-lg font-heading text-white">Why Partner With Us?</h2>
              <p className="text-body-lg text-brand-muted">
                {company.vision}
              </p>
              <Button asChild variant="outline" className="w-fit mt-4 rounded-full">
                <Link href="/about">Learn Our Story</Link>
              </Button>
            </SlideInRight>
            
            <StaggerContainer className="grid sm:grid-cols-2 gap-6">
              {uspPoints.map((usp, i) => (
                <StaggerItem key={i} className="glass-panel rounded-brand-lg p-6 hover:border-brand-secondary/50 transition-colors">
                  <div className="w-12 h-12 bg-gradient-signal rounded-brand-md flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h4 className="text-heading-sm font-heading mb-2 text-brand-light">{usp.title}</h4>
                  <p className="text-body-sm text-brand-muted">{usp.description}</p>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </div>
      </section>

      {/* 6. Services Overview */}
      <section className="section-brand relative overflow-hidden">
        <div className="container-brand relative z-10">
          <FadeUp>
            <div className="text-center mb-16">
              <h2 className="text-heading-lg font-heading text-brand-light mb-4">Comprehensive Support</h2>
              <p className="text-body-lg text-brand-muted max-w-2xl mx-auto">
                Beyond machinery sales, we provide end-to-end technical support to ensure your operations never stop.
              </p>
            </div>
          </FadeUp>

          <StaggerContainer className="grid md:grid-cols-3 gap-6">
            {services.map((srv) => (
              <StaggerItem key={srv.slug} className="glass-panel rounded-brand-lg p-8 hover:border-brand-secondary/40 transition-colors group">
                <div className="w-14 h-14 bg-gradient-signal rounded-brand-md flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <span className="text-2xl">⚙️</span>
                </div>
                <h3 className="text-heading-sm font-heading text-brand-light mb-3">{srv.name}</h3>
                <p className="text-body-sm text-brand-muted mb-6">{srv.description}</p>
                <Link href={`/services/${srv.slug}`} className="inline-flex items-center gap-2 text-brand-amber font-semibold hover:text-brand-secondary transition-colors">
                  Learn more
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* 7. CTA Banner */}
        <section className="py-24 relative overflow-hidden mx-4 lg:mx-8 mb-12 rounded-brand-xl border border-glass-border">
          <Image
            src={images.hero.home}
            alt="CTA Equipment Background"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-black/90" />
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
        </section>
      <Footer />
      </div>
    </div>
  );
}
