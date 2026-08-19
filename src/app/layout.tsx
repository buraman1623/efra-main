import type { Metadata } from "next";
import { cookies } from "next/headers";
import { Inter, Montserrat } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { seoDefaults } from "@/lib/content/company";
import { MotionProvider } from "@/components/ui/MotionProvider";
import { LocaleProvider } from "@/lib/i18n/LocaleProvider";
import { LOCALE_COOKIE, defaultLocale, isLocale } from "@/lib/i18n/config";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: seoDefaults.title,
    template: "%s | Efra Business Group",
  },
  description: seoDefaults.description,
  metadataBase: new URL(seoDefaults.siteUrl),
  icons: {
    icon: "/logo/favicon.ico",
    apple: "/logo/apple-touch-icon.png",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Efra Business Group",
    title: seoDefaults.title,
    description: seoDefaults.description,
  },
  twitter: {
    card: "summary_large_image",
    title: seoDefaults.title,
    description: seoDefaults.description,
  },
  robots: {
    index: true,
    follow: true,
  },
  formatDetection: {
    telephone: false,
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Resolve the visitor's language choice on the server so the correct
  // locale is known before first paint (no flash of English before
  // switching to Amharic) and survives a hard refresh. The Admin Panel
  // ignores this entirely and always renders in English.
  const cookieStore = await cookies();
  const cookieLocale = cookieStore.get(LOCALE_COOKIE)?.value;
  const initialLocale = isLocale(cookieLocale) ? cookieLocale : defaultLocale;

  return (
    <html
      lang={initialLocale}
      className={`${montserrat.variable} ${inter.variable}`}
    >
      <body className="min-h-screen antialiased">
        <LocaleProvider initialLocale={initialLocale}>
          <MotionProvider>{children}</MotionProvider>
        </LocaleProvider>
        <Analytics />
      </body>
    </html>
  );
}
