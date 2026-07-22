"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { FadeUp, StaggerContainer, StaggerItem } from "@/components/ui/MotionWrapper";
import { company } from "@/lib/content/company";
import { images } from "@/lib/assets/images";

const faqs = [
  {
    question: "Do you provide on-site installation for the machinery?",
    answer: `Yes. ${company.name} provides comprehensive on-site installation and commissioning services across Ethiopia. Our certified engineering team will ensure your equipment is set up correctly and running at peak performance from day one.`
  },
  {
    question: "What is your warranty policy?",
    answer: "We offer extended warranties on all our industrial and agricultural machinery. The specific warranty period depends on the equipment model and category. Please contact our sales team for exact warranty details on specific machinery."
  },
  {
    question: "Do you supply spare parts?",
    answer: "Absolutely. A core part of our mission is reducing downtime for our clients. We maintain an extensive inventory of genuine spare parts at our Sheger City headquarters, ready for immediate dispatch nationwide."
  },
  {
    question: "Can I request a customized machinery solution?",
    answer: "Yes, we specialize in solution-driven engineering. If your operation has specific requirements, our engineering team can work with our manufacturing partners to source or assemble custom equipment tailored to your needs."
  },
  {
    question: "How do I request a quote?",
    answer: "You can request a quote by clicking the 'Request a Quote' button in the navigation menu, filling out the form on our Contact page, or directly calling our sales desk. Please provide as much detail as possible about your intended operations so we can offer the most accurate pricing."
  }
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

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
              alt="Efra Machinery FAQ"
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
                Frequently Asked <span className="bg-gradient-signal bg-clip-text text-transparent">Questions</span>
              </h1>
            </FadeUp>

            <FadeUp delay={0.2}>
              <p className="text-body-lg text-brand-light/60 max-w-xl mx-auto leading-relaxed">
                Find answers to common questions about our machinery line, support services, and procurement processes.
              </p>
            </FadeUp>
          </div>
        </section>

        {/* 3. FAQ Accordion Section */}
        <section className="section-brand relative pb-20">
          <div className="container-brand max-w-3xl">
            <StaggerContainer className="flex flex-col gap-4">
              {faqs.map((faq, index) => (
                <StaggerItem
                  key={index}
                  className="glass-panel border border-glass-border rounded-brand-xl overflow-hidden shadow-xl transition-colors duration-200"
                >
                  <button
                    className="w-full text-left px-6 py-5 flex items-center justify-between focus-ring hover:bg-white/5 transition-colors"
                    onClick={() => setOpenIndex(openIndex === index ? null : index)}
                    aria-expanded={openIndex === index}
                  >
                    <span className="text-heading-sm font-heading text-brand-light pr-6">
                      {faq.question}
                    </span>
                    <span
                      className={`text-brand-amber transform transition-transform duration-300 shrink-0 ${
                        openIndex === index ? "rotate-180" : ""
                      }`}
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </span>
                  </button>

                  <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      openIndex === index
                        ? "max-h-96 opacity-100"
                        : "max-h-0 opacity-0"
                    }`}
                  >
                    <div className="p-6 pt-2 text-body-md text-brand-muted border-t border-glass-border leading-relaxed">
                      {faq.answer}
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>

            {/* Bottom Contact CTA Box */}
            <FadeUp delay={0.3} className="mt-12 text-center">
              <div className="glass-panel border border-glass-border rounded-brand-xl p-8 shadow-xl">
                <h3 className="font-heading text-heading-md text-brand-light mb-2">
                  Have more questions?
                </h3>
                <p className="text-body-sm text-brand-muted mb-6">
                  Can&apos;t find the answer you&apos;re looking for? Reach out directly to our engineering desk.
                </p>
                <Button
                  asChild
                  variant="primary"
                  className="bg-gradient-signal text-white font-semibold py-3 px-8 rounded-full shadow-lg shadow-brand-amber/10 hover:opacity-90 transition-opacity"
                >
                  <Link href="/contact">Contact Our Team</Link>
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