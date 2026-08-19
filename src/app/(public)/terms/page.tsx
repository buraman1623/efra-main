import { Metadata } from "next";
import TermsPageClient from "./TermsPageClient";

export const metadata: Metadata = {
  title: "Terms & Conditions | Efra Business Group",
  description: "Terms and conditions for using Efra Business Group's website and quote request services.",
};

export default function TermsPage() {
  return <TermsPageClient />;
}
