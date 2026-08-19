import { Metadata } from "next";
import PrivacyPageClient from "./PrivacyPageClient";

export const metadata: Metadata = {
  title: "Privacy Policy | Efra Business Group",
  description: "Privacy policy and data handling guidelines for Efra Business Group.",
};

export default function PrivacyPage() {
  return <PrivacyPageClient />;
}
