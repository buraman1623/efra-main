import { MetadataRoute } from "next";
import { seoDefaults, services } from "@/lib/content/company";

export default function sitemap(): MetadataRoute.Sitemap {
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

  // In a real application with a connected database, we would also fetch
  // product categories and products here to generate dynamic sitemap entries.
  // For Phase 2 (static frontend), we include the core routes.

  return [...routes, ...serviceRoutes];
}
