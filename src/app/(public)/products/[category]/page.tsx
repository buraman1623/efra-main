import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProductsByCategorySlug } from "@/lib/data/catalog";
import CategoryPageClient from "./CategoryPageClient";

interface Props {
  params: Promise<{ category: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = await params;
  const result = await getProductsByCategorySlug(p.category);

  if (!result) return { title: "Category Not Found | Efra Business Group" };

  return {
    title: `${result.category.name_en} | Efra Business Group`,
    description:
      result.category.description_en ||
      `Browse ${result.category.name_en} machinery and industrial equipment.`,
  };
}

export default async function CategoryPage({ params }: Props) {
  const p = await params;
  const result = await getProductsByCategorySlug(p.category);

  if (!result) {
    notFound();
  }

  const { category, products, subcategories } = result;

  return (
    <CategoryPageClient
      category={category}
      products={products}
      subcategories={subcategories}
      categorySlug={p.category}
    />
  );
}
