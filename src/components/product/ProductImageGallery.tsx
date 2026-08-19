"use client";

import { useState } from "react";
import Image from "next/image";
import DynamicModelViewer from "./DynamicModelViewer";
import { useLocale } from "@/lib/i18n/LocaleProvider";

type ViewMode =
  | { type: "image"; index: number }
  | { type: "3d" };

interface ProductImageGalleryProps {
  images: string[];
  alt: string;
  modelUrl?: string | null;
  fallbackModelType?: "crusher" | "tractor" | "ballMill" | "placeholder";
}

export function ProductImageGallery({
  images,
  alt,
  modelUrl,
  fallbackModelType = "placeholder",
}: ProductImageGalleryProps) {
  const has3d = Boolean(modelUrl?.trim());
  const [view, setView] = useState<ViewMode>({ type: "image", index: 0 });
  const { t } = useLocale();

  const activeImage =
    view.type === "image" ? images[view.index] ?? images[0] : images[0];

  return (
    <div className="flex gap-3 md:gap-4">
      {/* Thumbnails Sidebar */}
      <div className="flex shrink-0 flex-col gap-2 overflow-y-auto max-h-[min(70vh,640px)] pr-1">
        {images.map((url, index) => {
          const isActive = view.type === "image" && view.index === index;

          return (
            <button
              key={`${url}-${index}`}
              type="button"
              onClick={() => setView({ type: "image", index })}
              onMouseEnter={() => setView({ type: "image", index })}
              className={`relative h-14 w-14 shrink-0 overflow-hidden rounded-md border-2 bg-brand-surface/50 transition-colors md:h-16 md:w-16 ${
                isActive
                  ? "border-brand-primary"
                  : "border-[var(--color-border)] hover:border-brand-primary/50"
              }`}
              aria-label={t.products.viewImage
                .replace("{index}", String(index + 1))
                .replace("{total}", String(images.length))}
              aria-pressed={isActive}
            >
              <Image
                src={url}
                alt=""
                fill
                sizes="64px"
                className="object-cover"
              />
            </button>
          );
        })}

        <button
          type="button"
          disabled={!has3d}
          onClick={() => has3d && setView({ type: "3d" })}
          onMouseEnter={() => has3d && setView({ type: "3d" })}
          className={`flex h-14 w-14 shrink-0 flex-col items-center justify-center rounded-md border-2 text-center transition-colors md:h-16 md:w-16 ${
            view.type === "3d"
              ? "border-brand-primary bg-brand-primary/10"
              : has3d
              ? "border-[var(--color-border)] bg-brand-surface/50 hover:border-brand-primary/50"
              : "cursor-not-allowed border-[var(--color-border)] bg-brand-surface/30 opacity-50"
          }`}
          aria-label={has3d ? t.products.view3dModel : t.products.modelNotAvailable}
          aria-pressed={view.type === "3d"}
        >
          <svg
            className="h-5 w-5 text-[var(--color-text)]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M9 10a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z"
            />
          </svg>
          <span className="mt-0.5 text-[10px] font-semibold uppercase tracking-wide text-brand-muted">
            3D
          </span>
        </button>
      </div>

      {/* Main Viewport Container */}
      <div className="relative min-w-0 flex-1">
        {view.type === "3d" && has3d ? (
          <div className="aspect-square w-full overflow-hidden rounded-brand-lg border border-[var(--color-border)]">
            <DynamicModelViewer
              modelUrl={modelUrl}
              fallbackModelType={fallbackModelType}
            />
          </div>
        ) : (
          <div className="relative aspect-square w-full overflow-hidden rounded-brand-lg  bg-brand-surface/30">
            <Image
              src={activeImage}
              alt={alt}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-contain p-2 md:p-4"
              priority
            />
          </div>
        )}
      </div>
    </div>
  );
}