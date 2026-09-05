import { MetadataRoute } from "next";
import { seoDefaults, services } from "@/lib/content/company";
import { getCategories, getAllProductPaths } from "@/lib/data/catalog";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = seoDefaults.siteUrl;

  const routes = [
    "",
    "/about",
    "/contact",
    "/products",
    "/services",
    "/faq",
    "/privacy",
    "/terms",
    "/cookies",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: route === "" || route === "/products" ? "daily" as const : "weekly" as const,
    priority: route === "" ? 1.0 : 0.8,
  }));

  const serviceRoutes = services.map((service) => ({
    url: `${baseUrl}/services/${service.slug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  // Main product categories (Mining, Agricultural, Industrial) — each of
  // these pages also lists every subcategory inline, so subcategories
  // don't need their own sitemap entries.
  const categories = await getCategories();
  const categoryRoutes = categories
    .filter((c) => !c.parent_id)
    .map((category) => ({
      url: `${baseUrl}/products/${category.slug}`,
      lastModified: new Date().toISOString(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }));

  // Every individual product detail page.
  const productPaths = await getAllProductPaths();
  const productRoutes = productPaths.map(({ category, slug }) => ({
    url: `${baseUrl}/products/${category}/${slug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  return [...routes, ...serviceRoutes, ...categoryRoutes, ...productRoutes];
}
