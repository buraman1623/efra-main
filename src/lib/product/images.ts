import { getProductImage } from "@/lib/assets/images";
import type { Product } from "@/types";

type ProductImagesSource = Pick<
  Product,
  "image_url" | "gallery_urls" | "model_number"
>;

/** Main image first, then gallery — deduplicated. Falls back to placeholder. */
export function getProductGalleryImages(
  product: ProductImagesSource
): string[] {
  const images: string[] = [];

  if (product.image_url) {
    images.push(product.image_url);
  }

  for (const url of product.gallery_urls ?? []) {
    if (url && !images.includes(url)) {
      images.push(url);
    }
  }

  if (images.length === 0) {
    images.push(getProductImage(product.model_number));
  }

  return images;
}

/** Image shown on product cards and listing pages. */
export function getProductListingImage(product: ProductImagesSource): string {
  if (product.image_url) {
    return product.image_url;
  }

  const gallery = product.gallery_urls ?? [];
  if (gallery.length > 0) {
    return gallery[0];
  }

  return getProductImage(product.model_number);
}
