import { MetadataRoute } from "next";
import { seoDefaults } from "@/lib/content/company";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: [
        "/",
        "/products/",
        "/services/",
        "/about",
        "/contact"
      ],
      disallow: [
        "/admin/",
        "/api/",
        "/config/",
        "/_next/",
        "/private/",
        "/*?search=",
        "/*?filter=",
        "/thank-you/"
      ],
    },
    sitemap: `${seoDefaults.siteUrl}/sitemap.xml`,
  };
}
