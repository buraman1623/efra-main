import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { ProductForm } from "@/components/admin/ProductForm";

export default async function AdminNewProductPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: categories } = await supabase
    .from("product_categories")
    .select("id, name_en, slug, parent_id")
    .eq("is_active", true)
    .order("sort_order");

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
          <span className="text-white">New Product</span>
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="font-heading text-2xl md:text-3xl font-bold tracking-tight text-white">
              Add New Product
            </h1>
            <p className="mt-1 text-sm text-brand-muted">
              Create a new catalog item, set product specifications, and configure category settings.
            </p>
          </div>

          <Link
            href="/admin/products"
            className="px-3.5 py-1.5 rounded-brand-md bg-white/5 hover:bg-white/10 border border-glass-border text-xs text-brand-muted hover:text-white transition-all w-fit flex items-center gap-1.5"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span>Back to Products</span>
          </Link>
        </div>
      </header>

      {/* Main Glass Form Container */}
      <section className="rounded-brand-xl border border-glass-border bg-black/40 backdrop-blur-md p-6 md:p-8 shadow-2xl">
        <div className="flex items-center gap-2.5 border-b border-glass-border pb-4 mb-6">
          <div className="w-2.5 h-2.5 rounded-full bg-brand-amber" />
          <h2 className="text-base font-semibold text-white">Product Information</h2>
        </div>

        <ProductForm categories={categories ?? []} />
      </section>
    </main>
  );
}