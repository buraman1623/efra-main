import { Metadata } from "next";
import ServicesPageClient from "./ServicesPageClient";

export const metadata: Metadata = {
  title: "Heavy Equipment Services | Efra Business Group",
  description: "Comprehensive machinery support, from procurement to on-site commissioning and maintenance in Ethiopia.",
};

export default function ServicesPage() {
  return <ServicesPageClient />;
}
