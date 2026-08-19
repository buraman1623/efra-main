"use client";

import Link from "next/link";
import Image from "next/image";
import { Product } from "@/types";
import { getProductListingImage } from "@/lib/product/images";
import { Button } from "@/components/ui/Button";
import { useLocale, pickLocalized } from "@/lib/i18n/LocaleProvider";

interface ProductCardProps {
  product: Product;
  categorySlug: string;
}

export function ProductCard({ product, categorySlug }: ProductCardProps) {
  const imageUrl = getProductListingImage(product);
  const { t, locale } = useLocale();
  const name = pickLocalized(locale, product.name_en, product.name_am);
  const description = pickLocalized(
    locale,
    product.description_en ?? "",
    product.description_am
  );

  return (
    <div className="card-brand overflow-hidden group flex flex-col h-full hover:border-brand-secondary/50 transition-colors">
      <div className="relative h-64 w-full bg-brand-surface/50 overflow-hidden">
        <Image
          src={imageUrl}
          alt={name}
          fill
          className="object-cover transition-transform duration-slow group-hover:scale-105"
        />
        {product.is_featured && (
          <div className="absolute top-4 right-4 bg-brand-accent text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-brand-sm">
            {t.products.featured}
          </div>
        )}
      </div>
      
      <div className="p-6 flex flex-col flex-1">
        <div className="text-label text-brand-secondary mb-2">{product.model_number}</div>
        <h3 className="text-heading-sm font-heading text-[var(--color-text)] mb-3 line-clamp-2">
          {name}
        </h3>
        
        <p className="text-body-sm text-brand-muted mb-6 line-clamp-3 flex-1">
          {description}
        </p>
        
        <div className="flex items-center gap-3 mt-auto">
          <Button asChild variant="primary" className="flex-1 text-sm h-10">
            <Link href={`/products/${categorySlug}/${product.slug}`}>{t.common.viewDetails}</Link>
          </Button>
          <Button asChild variant="outline" className="px-3 h-10" aria-label={t.products.requestAQuote}>
            <Link href={`/contact?tab=quote&model=${product.model_number}`}>
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
