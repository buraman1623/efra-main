import { Metadata } from "next";
import ContactPageClient from "./ContactPageClient";

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

  return <ContactPageClient isQuote={isQuote} defaultProduct={defaultProduct} />;
}
