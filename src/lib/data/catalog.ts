import { createClient } from "@/lib/supabase/server";
import { staticCategories, staticProducts } from "@/lib/content/catalog";
import type { Product, ProductCategory, ProductSpecs, ProductWithCategory } from "@/types";

function normalizeProduct(row: Record<string, unknown>): Product {
  return {
    ...(row as unknown as Product),
    gallery_urls: Array.isArray(row.gallery_urls) ? (row.gallery_urls as string[]) : [],
    specs:
      row.specs &&
      typeof row.specs === "object" &&
      !Array.isArray(row.specs)
        ? (row.specs as ProductSpecs)
        : {},
  };
}

function attachCategory(
  product: Product,
  categories: ProductCategory[]
): ProductWithCategory | null {
  const category = categories.find((c) => c.id === product.category_id);
  if (!category) return null;
  return { ...product, category };
}

export async function getCategories(): Promise<ProductCategory[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("product_categories")
      .select("*")
      .eq("is_active", true)
      .order("sort_order");

    if (!error && data?.length) {
      return data as ProductCategory[];
    }
  } catch {
    // Supabase unavailable — use static catalog
  }

  return staticCategories as ProductCategory[];
}

export async function getProducts(): Promise<Product[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("is_active", true)
      .order("sort_order");

    if (!error && data?.length) {
      return data.map((row) => normalizeProduct(row as Record<string, unknown>));
    }
  } catch {
    // Supabase unavailable — use static catalog
  }

  return staticProducts as Product[];
}

export async function getFeaturedProducts(): Promise<ProductWithCategory[]> {
  const [categories, products] = await Promise.all([
    getCategories(),
    getProducts(),
  ]);

  return products
    .filter((p) => p.is_featured)
    .map((p) => attachCategory(p, categories))
    .filter((p): p is ProductWithCategory => p !== null);
}

export async function getCategoryBySlug(
  slug: string
): Promise<ProductCategory | null> {
  const categories = await getCategories();
  return categories.find((c) => c.slug === slug) ?? null;
}

export async function getProductsByCategorySlug(
  categorySlug: string
): Promise<{ category: ProductCategory; products: Product[]; subcategories: ProductCategory[] } | null> {
  const categories = await getCategories();
  const category = categories.find((c) => c.slug === categorySlug);
  if (!category) return null;

  const subcategories = categories.filter((c) => c.parent_id === category.id);
  const categoryIds =
    subcategories.length > 0
      ? subcategories.map((c) => c.id)
      : [category.id];

  const products = (await getProducts()).filter((p) =>
    categoryIds.includes(p.category_id)
  );

  return { category, products, subcategories };
}

export async function getProductBySlug(
  categorySlug: string,
  productSlug: string
): Promise<ProductWithCategory | null> {
  const categories = await getCategories();
  const category = categories.find((c) => c.slug === categorySlug);
  if (!category) return null;

  const subcategories = categories.filter((c) => c.parent_id === category.id);
  const allowedCategoryIds = new Set([
    category.id,
    ...subcategories.map((c) => c.id),
  ]);

  const products = await getProducts();
  const product = products.find(
    (p) => p.slug === productSlug && allowedCategoryIds.has(p.category_id)
  );

  if (!product) return null;

  // Prefer the product's actual category for accurate breadcrumbs/context
  const productCategory =
    categories.find((c) => c.id === product.category_id) ?? category;

  return attachCategory(product, [productCategory, ...categories]);
}

export async function getAllProductPaths(): Promise<
  { category: string; slug: string }[]
> {
  const [categories, products] = await Promise.all([
    getCategories(),
    getProducts(),
  ]);

  return products
    .map((product) => {
      const category = categories.find((c) => c.id === product.category_id);
      if (!category) return null;
      return { category: category.slug, slug: product.slug };
    })
    .filter((p): p is { category: string; slug: string } => p !== null);
}

export async function getAllCategorySlugs(): Promise<string[]> {
  const categories = await getCategories();
  return categories.map((c) => c.slug);
}
