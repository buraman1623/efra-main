import { NextResponse } from "next/server";
import { getCategories, getProducts } from "@/lib/data/catalog";
import type { ProductCategory } from "@/types";

export interface ProductSearchResult {
  id: string;
  slug: string;
  model_number: string;
  name_en: string;
  name_am: string | null;
  category_slug: string;
  subcategory_name_en: string;
  subcategory_name_am: string | null;
  image_url: string | null;
}

function topCategorySlug(
  categoryId: string,
  categories: ProductCategory[]
): string | null {
  let current = categories.find((c) => c.id === categoryId);
  // Walk up the parent chain (subcategory -> main category).
  while (current?.parent_id) {
    current = categories.find((c) => c.id === current!.parent_id);
  }
  return current?.slug ?? null;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = (searchParams.get("q") || "").trim().toLowerCase();

  if (q.length < 2) {
    return NextResponse.json({ results: [] });
  }

  const [categories, products] = await Promise.all([
    getCategories(),
    getProducts(),
  ]);

  const results: ProductSearchResult[] = products
    .filter((p) => {
      const haystack = `${p.name_en} ${p.name_am ?? ""} ${p.model_number}`.toLowerCase();
      return haystack.includes(q);
    })
    .slice(0, 8)
    .map((p) => {
      const category_slug = topCategorySlug(p.category_id, categories);
      const subcategory = categories.find((c) => c.id === p.category_id);

      if (!category_slug || !subcategory) return null;

      return {
        id: p.id,
        slug: p.slug,
        model_number: p.model_number,
        name_en: p.name_en,
        name_am: p.name_am,
        category_slug,
        subcategory_name_en: subcategory.name_en,
        subcategory_name_am: subcategory.name_am,
        image_url: p.image_url,
      };
    })
    .filter((r): r is ProductSearchResult => r !== null);

  return NextResponse.json({ results });
}
