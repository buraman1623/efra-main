"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useLocale, pickLocalized } from "@/lib/i18n/LocaleProvider";
import { getProductImage } from "@/lib/assets/images";
import type { ProductSearchResult } from "@/app/api/products/search/route";

/**
 * Debounced, bilingual (English + Amharic) product search with a live
 * suggestions dropdown. Matches against name_en, name_am, and
 * model_number via /api/products/search. Used on /products and every
 * /products/[category] page.
 */
export function ProductSearchBar({ className }: { className?: string }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<ProductSearchResult[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { t, locale } = useLocale();

  useEffect(() => {
    const trimmed = query.trim();
    if (trimmed.length < 2) {
      setResults([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    const handle = setTimeout(async () => {
      try {
        const res = await fetch(`/api/products/search?q=${encodeURIComponent(trimmed)}`);
        const data = await res.json();
        setResults(data.results ?? []);
      } catch {
        setResults([]);
      } finally {
        setIsLoading(false);
      }
    }, 250);

    return () => clearTimeout(handle);
  }, [query]);

  // Close the dropdown on outside click.
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  function goToProduct(result: ProductSearchResult) {
    setIsOpen(false);
    setQuery("");
    router.push(`/products/${result.category_slug}/${result.slug}`);
  }

  const showDropdown = isOpen && query.trim().length >= 2;

  return (
    <div ref={containerRef} className={`relative z-50 w-full ${className ?? ""}`}>
      <div className="relative">
        <svg
          className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-white/70 z-10"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-4.35-4.35M17 10.5A6.5 6.5 0 114 10.5a6.5 6.5 0 0113 0z"
          />
        </svg>
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          placeholder={t.products.searchPlaceholder}
          className="w-full rounded-full border border-glass-border bg-black/40 backdrop-blur-md py-3.5 pl-12 pr-4 text-sm text-brand-light placeholder:text-brand-muted/70 focus:outline-none focus:border-brand-amber/60 transition-colors"
          role="combobox"
          aria-expanded={showDropdown}
          aria-controls="product-search-results"
          aria-autocomplete="list"
        />
      </div>

      {showDropdown && (
        <div
          id="product-search-results"
          role="listbox"
          className="absolute left-0 top-full z-[100] mt-2 w-full rounded-brand-lg border border-glass-border bg-black/90 backdrop-blur-xl shadow-2xl overflow-hidden max-h-[70vh] overflow-y-auto"
        >
          {isLoading ? (
            <div className="px-4 py-4 text-sm text-brand-muted">{t.common.loading}…</div>
          ) : results.length === 0 ? (
            <div className="px-4 py-4 text-sm text-brand-muted">
              {t.products.searchNoResults}
            </div>
          ) : (
            results.map((result) => {
              const name = pickLocalized(locale, result.name_en, result.name_am);
              const subcategoryName = pickLocalized(
                locale,
                result.subcategory_name_en,
                result.subcategory_name_am
              );
              return (
                <button
                  key={result.id}
                  type="button"
                  role="option"
                  aria-selected="false"
                  onClick={() => goToProduct(result)}
                  className="flex w-full items-center gap-3 px-4 py-3 text-left hover:bg-white/5 transition-colors border-b border-glass-border/60 last:border-b-0"
                >
                  <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-brand-sm bg-white/5">
                    <Image
                      src={result.image_url || getProductImage(result.model_number)}
                      alt=""
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="min-w-0">
                    <div className="text-sm font-medium text-brand-light truncate">{name}</div>
                    <div className="text-xs text-brand-muted truncate">
                      {result.model_number} · {subcategoryName}
                    </div>
                  </div>
                </button>
              );
            })
          )}
        </div>
      )}
    </div>
  );
}
