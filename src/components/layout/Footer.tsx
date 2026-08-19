"use client";

import Link from "next/link";
import Image from "next/image";
import { company } from "@/lib/content/company";
import { useLocale } from "@/lib/i18n/LocaleProvider";

export function Footer() {
  const currentYear = new Date().getFullYear();
  const { t } = useLocale();

  const footerNavigation = {
    products: [
      { label: t.footer.goldWashingSystems, href: "/products/gold-washing-systems" },
      { label: t.footer.industrialCrushers, href: "/products/industrial-crushers" },
      { label: t.footer.ballMills, href: "/products/fine-grinding-mills" },
      { label: t.footer.tractorsTillage, href: "/products/tractors-primary-tillage" },
    ],
    services: [
      { label: t.footer.maintenanceRepairs, href: "/services/technical-maintenance-repairs" },
      { label: t.footer.installation, href: "/services/installation-commissioning" },
      { label: t.footer.procurementSales, href: "/services/equipment-procurement-sales" },
    ],
    company: [
      { label: t.footer.aboutUs, href: "/about" },
      { label: t.footer.contact, href: "/contact" },
      { label: t.footer.requestQuote, href: "/contact?tab=quote" },
      { label: t.footer.faq, href: "/faq" },
    ],
    legal: [
      { label: t.footer.privacyPolicy, href: "/privacy" },
      { label: t.footer.termsConditions, href: "/terms" },
      { label: t.footer.cookiePolicy, href: "/cookies" },
      { label: t.footer.sitemap, href: "/sitemap" },
    ],
  };

  return (
    <footer className="text-brand-light relative overflow-hidden pt-16 lg:pt-24 pb-8">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-signal" />
      
      <div className="container-brand relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">
          
          {/* Company Info */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <Link href="/" className="flex items-center gap-2">
              <Image src="/logo/android-chrome-192x192.png" alt="Efra Business Group" width={40} height={40} className="rounded-brand-md" />
              <span className="font-heading font-bold text-xl tracking-tight text-white">
                Efra Business Group
              </span>
            </Link>
            <p className="text-brand-muted text-body-sm leading-relaxed max-w-sm">
              {t.footer.tagline}
            </p>
            <div className="flex flex-col gap-2 text-body-sm text-brand-muted mt-2">
              <p className="flex items-start gap-2">
                <span className="text-brand-amber mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4"><path fillRule="evenodd" d="M9.69 18.933l.003.001C9.89 19.02 10 19 10 19s.11.02.308-.066l.002-.001.006-.003.018-.008a5.741 5.741 0 00.281-.14c.186-.096.446-.24.757-.433.62-.384 1.445-.966 2.274-1.765C15.302 14.988 17 12.493 17 9A7 7 0 103 9c0 3.492 1.698 5.988 3.355 7.584a13.731 13.731 0 002.273 1.765 11.842 11.842 0 00.976.544l.062.029.018.008.006.003zM10 11.25a2.25 2.25 0 100-4.5 2.25 2.25 0 000 4.5z" clipRule="evenodd" /></svg>
                </span>
                {company.headOffice}
              </p>
              <p className="flex items-center gap-2">
                <span className="text-brand-amber">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4"><path fillRule="evenodd" d="M2 3.5A1.5 1.5 0 013.5 2h1.148a1.5 1.5 0 011.465 1.175l.716 3.223a1.5 1.5 0 01-1.052 1.767l-.933.267c-.41.117-.643.555-.48.95a11.542 11.542 0 006.254 6.254c.395.163.833-.07.95-.48l.267-.933a1.5 1.5 0 011.767-1.052l3.223.716A1.5 1.5 0 0118 15.352V16.5a1.5 1.5 0 01-1.5 1.5H15c-1.149 0-2.263-.15-3.326-.43A13.022 13.022 0 012.43 8.326 13.019 13.019 0 012 5V3.5z" clipRule="evenodd" /></svg>
                </span>
                <a href={`tel:${company.phone}`} className="text-body-sm" target="_blank">{company.phone}</a>
              </p>
              <p className="flex items-center gap-2">
                <span className="text-brand-amber">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill="currentColor" className="w-4 h-4">
                    <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/>
                  </svg>
                </span>
                <a href={`https://wa.me/${company.whatsapp}`} className="text-body-sm" target="_blank">{company.whatsapp}</a>
              </p>
              <p className="flex items-center gap-2">
                <span className="text-brand-amber">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4"><path d="M3 4a2 2 0 00-2 2v8a2 2 0 002 2h14a2 2 0 002-2V6a2 2 0 00-2-2H3zm1.5 2h11a.5.5 0 01.4.2L10 11.5 4.1 8.2a.5.5 0 01.4-.2z" /></svg>
                </span>
                <a href={`mailto:${company.email}`} className="text-body-sm" target="_blank">{company.email}</a>
              </p>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="lg:col-span-2 lg:col-start-6">
            <h3 className="text-white font-heading font-semibold mb-4 uppercase tracking-wider text-sm">{t.footer.machineryHeading}</h3>
            <ul className="flex flex-col gap-3">
              {footerNavigation.products.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-brand-muted hover:text-brand-amber transition-colors text-body-sm">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h3 className="text-white font-heading font-semibold mb-4 uppercase tracking-wider text-sm">{t.footer.servicesHeading}</h3>
            <ul className="flex flex-col gap-3">
              {footerNavigation.services.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-brand-muted hover:text-brand-amber transition-colors text-body-sm">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h3 className="text-white font-heading font-semibold mb-4 uppercase tracking-wider text-sm">{t.footer.companyHeading}</h3>
            <ul className="flex flex-col gap-3">
              {footerNavigation.company.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-brand-muted hover:text-brand-amber transition-colors text-body-sm">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-brand-border/30 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-brand-muted text-xs">
            © {currentYear} {company.legalName}. {t.footer.allRightsReserved}
          </p>
          <div className="flex items-center gap-6">
            {footerNavigation.legal.map((item) => (
              <Link key={item.href} href={item.href} className="text-brand-muted hover:text-brand-amber transition-colors text-xs">
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
