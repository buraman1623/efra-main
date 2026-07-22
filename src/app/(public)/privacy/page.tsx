import Image from "next/image";
import { Metadata } from "next";
import { company } from "@/lib/content/company";
import { images } from "@/lib/assets/images";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FadeIn, FadeUp } from "@/components/ui/MotionWrapper";

export const metadata: Metadata = {
  title: "Privacy Policy | Efra Business Group",
  description: "Privacy policy and data handling guidelines for Efra Business Group.",
};

export default function PrivacyPage() {
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
              alt="Efra Business Group Infrastructure"
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
                Privacy <span className="bg-gradient-signal bg-clip-text text-transparent">Policy</span>
              </h1>
            </FadeUp>

            <FadeUp delay={0.2}>
              <p className="text-body-md text-brand-light/60 max-w-xl mx-auto leading-relaxed">
                Last updated: July 2026
              </p>
            </FadeUp>
          </div>
        </section>

        {/* 3. Main Privacy Policy Content Section */}
        <section className="section-brand relative pb-20">
          <div className="container-brand max-w-4xl">
            <FadeIn delay={0.2}>
              <div className="glass-panel border border-glass-border rounded-brand-xl p-8 md:p-12 shadow-2xl space-y-8 text-brand-light/80 leading-relaxed">
                <p className="text-body-lg text-brand-light/90">
                  At {company.legalName} (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;), we respect your privacy and are committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website (regardless of where you visit it from) and tell you about your privacy rights.
                </p>

                <hr className="border-glass-border" />

                <div className="space-y-4">
                  <h2 className="text-heading-md font-heading text-brand-light">
                    1. Important Information and Who We Are
                  </h2>
                  <p className="text-body-sm text-brand-muted">
                    {company.legalName} is the controller and responsible for your personal data. We are registered in Ethiopia and our head office is located at {company.headOffice}.
                  </p>
                </div>

                <div className="space-y-4">
                  <h2 className="text-heading-md font-heading text-brand-light">
                    2. The Data We Collect About You
                  </h2>
                  <p className="text-body-sm text-brand-muted">
                    We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-body-sm text-brand-muted pl-2">
                    <li><strong className="text-brand-light">Identity Data</strong> includes first name, last name, username or similar identifier, title.</li>
                    <li><strong className="text-brand-light">Contact Data</strong> includes email address and telephone/WhatsApp numbers.</li>
                    <li><strong className="text-brand-light">Technical Data</strong> includes internet protocol (IP) address, your login data, browser type and version, time zone setting and location, browser plug-in types and versions, operating system and platform, and other technology on the devices you use to access this website.</li>
                    <li><strong className="text-brand-light">Usage Data</strong> includes information about how you use our website, products and services.</li>
                  </ul>
                </div>

                <div className="space-y-4">
                  <h2 className="text-heading-md font-heading text-brand-light">
                    3. How Is Your Personal Data Collected?
                  </h2>
                  <p className="text-body-sm text-brand-muted">
                    We use different methods to collect data from and about you including through:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-body-sm text-brand-muted pl-2">
                    <li><strong className="text-brand-light">Direct interactions.</strong> You may give us your Identity and Contact by filling in forms or by corresponding with us by post, phone, email or otherwise.</li>
                    <li><strong className="text-brand-light">Automated technologies or interactions.</strong> As you interact with our website, we will automatically collect Technical Data about your equipment, browsing actions and patterns.</li>
                  </ul>
                </div>

                <div className="space-y-4">
                  <h2 className="text-heading-md font-heading text-brand-light">
                    4. How We Use Your Personal Data
                  </h2>
                  <p className="text-body-sm text-brand-muted">
                    We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-body-sm text-brand-muted pl-2">
                    <li>Where we need to perform the contract we are about to enter into or have entered into with you (such as processing a quote request).</li>
                    <li>Where it is necessary for our legitimate interests and your interests and fundamental rights do not override those interests.</li>
                    <li>Where we need to comply with a legal obligation.</li>
                  </ul>
                </div>

                <div className="space-y-4">
                  <h2 className="text-heading-md font-heading text-brand-light">
                    5. Data Security
                  </h2>
                  <p className="text-body-sm text-brand-muted">
                    We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorized way, altered or disclosed. In addition, we limit access to your personal data to those employees, agents, contractors and other third parties who have a business need to know.
                  </p>
                </div>

                <div className="space-y-4">
                  <h2 className="text-heading-md font-heading text-brand-light">
                    6. Contact Us
                  </h2>
                  <p className="text-body-sm text-brand-muted">
                    If you have any questions about this privacy policy or our privacy practices, please contact us at <a href={`mailto:${company.email}`} className="text-brand-amber underline hover:text-brand-light transition-colors">{company.email}</a>.
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