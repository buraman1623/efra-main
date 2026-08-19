import type { Metadata } from "next";
import AboutPageClient from "./AboutPageClient";

export const metadata: Metadata = {
  title: "About Us | Efra Business Group",
  description: "Learn about Efra Business Group, Ethiopia's leading industrial and agricultural machinery supplier.",
};

export default function AboutPage() {
  return <AboutPageClient />;
}
