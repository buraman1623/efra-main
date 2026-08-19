import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getProductBySlug } from "@/lib/data/catalog";
import ProductDetailClient from "./ProductDetailClient";

interface Props {
  params: Promise<{ category: string; slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = await params;
  const product = await getProductBySlug(p.category, p.slug);

  if (!product) return { title: "Product Not Found | Efra Business Group" };

  return {
    title: `${product.name_en} | Efra Business Group`,
    description: product.description_en || "",
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const p = await params;
  const product = await getProductBySlug(p.category, p.slug);

  if (!product) {
    notFound();
  }

  return <ProductDetailClient product={product} slug={p.slug} />;
}
