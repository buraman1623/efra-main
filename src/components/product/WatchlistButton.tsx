"use client";

import { useState, useEffect, useCallback } from "react";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/Button";
import { useLocale } from "@/lib/i18n/LocaleProvider";

interface WatchlistButtonProps {
  productId: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function WatchlistButton({
  productId,
  size = "lg",
  className,
}: WatchlistButtonProps) {
  const [isSaved, setIsSaved] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isToggling, setIsToggling] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const supabase = createClient();
  const { t } = useLocale();

  const checkWatchlistStatus = useCallback(async () => {
    setIsLoading(true);
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setIsSaved(false);
      setIsLoading(false);
      return;
    }

    const { data } = await supabase
      .from("watchlist_items")
      .select("id")
      .eq("user_id", user.id)
      .eq("product_id", productId)
      .maybeSingle();

    setIsSaved(!!data);
    setIsLoading(false);
  }, [productId, supabase]);

  useEffect(() => {
    checkWatchlistStatus();
  }, [checkWatchlistStatus]);

  const handleClick = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      router.push(`/login?next=${encodeURIComponent(pathname)}`);
      return;
    }

    setIsToggling(true);

    try {
      if (isSaved) {
        const { error } = await supabase
          .from("watchlist_items")
          .delete()
          .eq("user_id", user.id)
          .eq("product_id", productId);

        if (!error) setIsSaved(false);
      } else {
        const { error } = await supabase
          .from("watchlist_items")
          .insert({ user_id: user.id, product_id: productId });

        if (!error) setIsSaved(true);
      }
    } finally {
      setIsToggling(false);
    }
  };

  return (
    <Button
      variant="outline"
      size={size}
      className={`h-12 border border-brand-amber/40 bg-brand-amber/5 text-brand-amber hover:bg-brand-amber/10 transition-colors font-semibold text-sm rounded-full flex items-center justify-center gap-2 ${
        className ?? ""
      }`}
      onClick={handleClick}
      isLoading={isLoading || isToggling}
    >
      <svg
        className="w-4 h-4"
        fill={isSaved ? "currentColor" : "none"}
        viewBox="0 0 24 24"
        stroke="currentColor"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
        />
      </svg>
      {isSaved ? t.products.savedToWatchlist : t.products.saveToWatchlist}
    </Button>
  );
}