"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { deleteStorageObjectsByUrls } from "@/lib/supabase/storage";
import { Button } from "@/components/ui";

interface DeleteProductButtonProps {
  productId: string;
  productName: string;
  imageUrl?: string | null;
  galleryUrls?: string[];
}

export function DeleteProductButton({
  productId,
  productName,
  imageUrl,
  galleryUrls = [],
}: DeleteProductButtonProps) {
  const router = useRouter();
  const [confirming, setConfirming] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleDelete() {
    setLoading(true);
    setError(null);
    const supabase = createClient();

    const { error: deleteError } = await supabase
      .from("products")
      .delete()
      .eq("id", productId);

    if (deleteError) {
      setError(deleteError.message || "Could not delete product.");
      setLoading(false);
      return;
    }

    await deleteStorageObjectsByUrls([imageUrl, ...galleryUrls]);
    router.push("/admin/products");
    router.refresh();
  }

  if (!confirming) {
    return (
      <Button
        type="button"
        variant="danger"
        size="sm"
        onClick={() => setConfirming(true)}
        className="bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 transition-all text-xs font-semibold"
      >
        Delete Product
      </Button>
    );
  }

  return (
    <div className="flex flex-col items-end gap-3 rounded-brand-md border border-red-500/20 bg-red-950/20 p-3.5 backdrop-blur-sm transition-all">
      <p className="max-w-xs text-right text-xs text-brand-muted leading-relaxed">
        Are you sure you want to delete{" "}
        <span className="font-semibold text-white">{productName}</span>? This action cannot be undone.
      </p>

      <div className="flex items-center gap-2">
        <Button
          type="button"
          variant="outline"
          size="sm"
          disabled={loading}
          onClick={() => setConfirming(false)}
          className="border-glass-border bg-white/5 hover:bg-white/10 text-brand-muted hover:text-white text-xs"
        >
          Cancel
        </Button>
        <Button
          type="button"
          variant="danger"
          size="sm"
          isLoading={loading}
          onClick={handleDelete}
          className="bg-red-600 hover:bg-red-500 text-white text-xs font-semibold shadow-lg shadow-red-950/50"
        >
          Confirm Delete
        </Button>
      </div>

      {error && (
        <p className="text-xs text-red-400 font-medium" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}