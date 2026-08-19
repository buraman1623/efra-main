"use client";

import Image from "next/image";
import { Loader } from "@/components/ui";
import { getProductImage } from "@/lib/assets/images";
import { useLocale } from "@/lib/i18n/LocaleProvider";

interface ProductModelViewerFallbackProps {
  modelNumber?: string;
  productName?: string;
  imageUrl?: string | null;
  message?: string;
}

export function ProductModelViewerFallback({
  modelNumber,
  productName,
  imageUrl,
  message,
}: ProductModelViewerFallbackProps) {
  const { t } = useLocale();
  const resolvedMessage = message ?? t.products.loadingPreview;
  const fallbackImage =
    imageUrl ?? (modelNumber ? getProductImage(modelNumber) : getProductImage("gcm-01"));

  return (
    <div className="relative flex aspect-[4/3] w-full items-center justify-center overflow-hidden rounded-brand-lg border border-brand-border/30 bg-brand-surface/20">
      <Image
        src={fallbackImage}
        alt={productName ?? "Product preview"}
        fill
        className="object-cover opacity-30 blur-sm scale-105"
        sizes="(max-width: 768px) 100vw, 50vw"
      />
      <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/80 via-brand-primary/60 to-brand-surface/40" />
      <div className="relative z-10 flex flex-col items-center gap-4 px-6 text-center">
        <Loader size="md" label={resolvedMessage} />
        {modelNumber && (
          <div>
            <p className="text-label uppercase tracking-widest text-brand-accent">
              {modelNumber}
            </p>
            {productName && (
              <p className="mt-1 text-body-sm text-brand-light/70">{productName}</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
