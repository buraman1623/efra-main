import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { ProductForm } from "@/components/admin/ProductForm";
import { DeleteProductButton } from "@/components/admin/DeleteProductButton";
import type { Product } from "@/types";

export default async function AdminEditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const [{ data: row, error }, { data: categories }] = await Promise.all([
    supabase.from("products").select("*").eq("id", id).maybeSingle(),
    supabase
      .from("product_categories")
      .select("id, name_en, slug, parent_id")
      .eq("is_active", true)
      .order("sort_order"),
  ]);

  if (error || !row) {
    notFound();
  }

  // Cast the fetched row to Product and ensure gallery URLs are defined
  const product = row as Product;
  product.gallery_urls = product.gallery_urls ?? [];

  return (
    <main className="max-w-5xl mx-auto space-y-8">
      {/* Header & Breadcrumb Navigation */}
      <header className="space-y-3">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-brand-muted">
          <Link href="/admin" className="hover:text-brand-amber transition-colors">
            Overview
          </Link>
          <span>/</span>
          <Link href="/admin/products" className="hover:text-brand-amber transition-colors">
            Products
          </Link>
          <span>/</span>
          <span className="text-white truncate max-w-[150px]">{product.name_en}</span>
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="font-heading text-2xl md:text-3xl font-bold tracking-tight text-white">
                Edit Product
              </h1>
              <span
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                  product.is_active
                    ? "bg-green-500/10 border-green-500/20 text-green-400"
                    : "bg-white/5 border-glass-border text-brand-muted"
                }`}
              >
                {product.is_active ? "Active" : "Hidden"}
              </span>
            </div>
            <p className="mt-1 text-sm text-brand-muted font-medium">
              {product.name_en} {product.model_number ? `(${product.model_number})` : ""}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/admin/products"
              className="px-3.5 py-1.5 rounded-brand-md bg-white/5 hover:bg-white/10 border border-glass-border text-xs text-brand-muted hover:text-white transition-all flex items-center gap-1.5"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span>Back</span>
            </Link>

            <DeleteProductButton
              productId={product.id}
              productName={product.name_en}
              imageUrl={product.image_url}
              galleryUrls={product.gallery_urls}
            />
          </div>
        </div>
      </header>

      {/* Main Glass Form Container */}
      <section className="rounded-brand-xl border border-glass-border bg-black/40 backdrop-blur-md p-6 md:p-8 shadow-2xl space-y-6">
        <div className="flex items-center gap-2.5 border-b border-glass-border pb-4">
          <div className="w-2.5 h-2.5 rounded-full bg-brand-amber" />
          <h2 className="text-base font-semibold text-white">Modify Catalog Entry</h2>
        </div>

        <ProductForm categories={categories ?? []} product={product} />
      </section>
    </main>
  );
}