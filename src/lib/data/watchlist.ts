import { createClient } from "@/lib/supabase/server";
import { getCategories } from "@/lib/data/catalog";
import type { Product, WatchlistItem } from "@/types";

export interface WatchlistEntry extends WatchlistItem {
  product: Product;
  categorySlug: string;
}

export async function getUserWatchlist(
  userId: string
): Promise<WatchlistEntry[]> {
  const supabase = await createClient();

  const { data: items, error } = await supabase
    .from("watchlist_items")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error || !items?.length) return [];

  const productIds = items.map((item) => item.product_id);
  const { data: products } = await supabase
    .from("products")
    .select("*")
    .in("id", productIds)
    .eq("is_active", true);

  if (!products?.length) return [];

  const categories = await getCategories();

  return items
    .map((item) => {
      const product = products.find((p) => p.id === item.product_id);
      if (!product) return null;

      const category = categories.find((c) => c.id === product.category_id);
      if (!category) return null;

      return {
        ...item,
        product: {
          ...product,
          gallery_urls: Array.isArray(product.gallery_urls)
            ? product.gallery_urls
            : [],
          specs:
            product.specs &&
            typeof product.specs === "object" &&
            !Array.isArray(product.specs)
              ? product.specs
              : {},
        } as Product,
        categorySlug: category.slug,
      };
    })
    .filter((entry): entry is WatchlistEntry => entry !== null);
}
