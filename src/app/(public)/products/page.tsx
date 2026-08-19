import { Metadata } from "next";
import { getCategories } from "@/lib/data/catalog";
import ProductsPageClient from "./ProductsPageClient";

export const metadata: Metadata = {
  title: "Machinery & Equipment Catalog | Efra Business Group",
  description:
    "Browse our complete catalog of mining, agricultural, and industrial machinery.",
};

export default async function ProductsPage() {
  const categories = await getCategories();
  return <ProductsPageClient categories={categories} />;
}
