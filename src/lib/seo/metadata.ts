import type { Metadata } from "next";
import { seoDefaults } from "@/lib/content/company";
import { images } from "@/lib/assets/images";

const siteUrl = seoDefaults.siteUrl;

export function buildMetadata({
  title,
  description,
  path = "",
  image,
  noIndex = false,
}: {
  title: string;
  description: string;
  path?: string;
  image?: string;
  noIndex?: boolean;
}): Metadata {
  const url = `${siteUrl}${path}`;
  const ogImage = image ?? images.placeholders.ogDefault;

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: "Efra Business Group",
      type: "website",
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
    robots: noIndex
      ? { index: false, follow: true }
      : { index: true, follow: true },
  };
}

export function productMetadata({
  name,
  modelNumber,
  description,
  categorySlug,
  slug,
  image,
}: {
  name: string;
  modelNumber: string;
  description: string;
  categorySlug: string;
  slug: string;
  image?: string | null;
}): Metadata {
  const title = `${name} (${modelNumber}) Specification`;
  const metaDescription = `Get full technical specs, capacity sizes, and operational dimensions for the Efra ${name} (${modelNumber}). Contact our Sheger City team for a direct B2B quote.`;

  return buildMetadata({
    title,
    description: description || metaDescription,
    path: `/products/${categorySlug}/${slug}`,
    image: image ?? undefined,
  });
}

export function categoryMetadata({
  name,
  description,
  slug,
  image,
}: {
  name: string;
  description: string;
  slug: string;
  image?: string | null;
}): Metadata {
  return buildMetadata({
    title: `Premium ${name} in Ethiopia`,
    description:
      description ||
      `Browse high-durability ${name} tailored for Ethiopian operations. Featuring competitive pricing, full warranty, and immediate spare parts inventory.`,
    path: `/products/${slug}`,
    image: image ?? undefined,
  });
}
