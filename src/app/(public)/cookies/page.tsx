import { Metadata } from "next";
import CookiesPageClient from "./CookiesPageClient";

export const metadata: Metadata = {
  title: "Cookie Policy | Efra Business Group",
  description: "Learn how Efra Business Group uses cookies and tracking technologies.",
};

export default function CookiesPage() {
  return <CookiesPageClient />;
}
