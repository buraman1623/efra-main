import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
// import { Button } from "@/components/ui/Button"; // Replaced with direct glass-styled Link below for aesthetic consistency
import { formatAdminDate } from "@/lib/admin/format";
import type { Product } from "@/types";

export default async function AdminProductsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // Fetch Products Data
  const { data, error } = await supabase
    .from("products")
    .select(
      `
        id,
        name_en,
        model_number,
        slug,
        image_url,
        is_active,
        is_featured,
        sort_order,
        updated_at,
        product_categories (
          name_en,
          slug
        )
      `
    )
    .order("sort_order", { ascending: true })
    .order("updated_at", { ascending: false });
    
  // Cast to Product[] for proper typing
  const products = (data as unknown as Product[]) || [];

  // Metrics calculation
  const totalProducts = products.length;
  const activeProducts = products.filter((p) => p.is_active).length;
  const featuredProducts = products.filter((p) => p.is_featured).length;

  return (
    <main className="max-w-7xl mx-auto space-y-8">
      {/* Page Header */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-brand-muted mb-2">
            <Link href="/admin" className="hover:text-brand-amber transition-colors">
              Overview
            </Link>
            <span>/</span>
            <span className="text-white">Products</span>
          </div>
          <h1 className="font-heading text-2xl md:text-3xl font-bold tracking-tight text-white">
            Product Catalog
          </h1>
          <p className="mt-1 text-sm text-brand-muted">
            Create, edit, and manage machinery catalog records and configurations.
          </p>
        </div>

        {/* Quick Summary Metrics & Primary Action */}
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-3 mr-2">
            <div className="px-4 py-2 rounded-brand-md bg-black/40 border border-glass-border backdrop-blur-md">
              <div className="text-xs text-brand-muted">Total</div>
              <div className="text-lg font-bold font-heading text-white">{totalProducts}</div>
            </div>
            <div className="px-4 py-2 rounded-brand-md bg-black/40 border border-glass-border backdrop-blur-md">
              <div className="text-xs text-green-400 font-medium">Active</div>
              <div className="text-lg font-bold font-heading text-white">{activeProducts}</div>
            </div>
            <div className="px-4 py-2 rounded-brand-md bg-black/40 border border-glass-border backdrop-blur-md">
              <div className="text-xs text-brand-amber font-medium">Featured</div>
              <div className="text-lg font-bold font-heading text-white">{featuredProducts}</div>
            </div>
          </div>

          <Link 
            href="/admin/products/new"
            className="px-5 py-2.5 rounded-brand-md bg-brand-amber hover:bg-brand-amber/90 text-black font-semibold text-sm transition-all shadow-[0_0_15px_rgba(251,191,36,0.2)] flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            <span>Add Product</span>
          </Link>
        </div>
      </header>

      {/* Database Error Banner */}
      {error && (
        <div className="rounded-brand-lg border border-red-500/30 bg-red-500/10 px-5 py-4 text-sm text-red-300 flex items-center gap-3">
          <svg className="w-5 h-5 shrink-0 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <span>
            Could not load products. Confirm your admin role and database access.
          </span>
        </div>
      )}

      {/* Main Table Card Container */}
      <section className="bg-black/40 border border-glass-border rounded-brand-xl overflow-hidden backdrop-blur-md shadow-2xl">
        <div className="px-6 py-4 border-b border-glass-border flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <div className="w-2.5 h-2.5 rounded-full bg-brand-amber" />
            <h2 className="text-base font-semibold text-white">Current Inventory</h2>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white/5 border-b border-glass-border">
                <th className="px-6 py-3.5 text-xs font-semibold text-brand-muted uppercase tracking-wider">
                  Product Details
                </th>
                <th className="px-6 py-3.5 text-xs font-semibold text-brand-muted uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3.5 text-xs font-semibold text-brand-muted uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3.5 text-xs font-semibold text-brand-muted uppercase tracking-wider">
                  Last Updated
                </th>
                <th className="px-6 py-3.5 text-xs font-semibold text-brand-muted uppercase tracking-wider text-right">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-glass-border text-sm">
              {products.map((product) => {
                const category = Array.isArray(product.product_categories)
                  ? product.product_categories[0]
                  : product.product_categories;

                return (
                  <tr
                    key={product.id}
                    className="hover:bg-white/5 transition-colors group"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="h-14 w-14 shrink-0 overflow-hidden rounded-brand-md border border-glass-border bg-black/40 shadow-inner flex items-center justify-center">
                          {product.image_url ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                              src={product.image_url}
                              alt={product.name_en}
                              className="h-full w-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                            />
                          ) : (
                            <svg className="w-5 h-5 text-brand-muted/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                          )}
                        </div>
                        <div>
                          <div className="text-sm font-medium text-white group-hover:text-brand-amber transition-colors">
                            {product.name_en}
                          </div>
                          <div className="text-xs text-brand-muted mt-1 flex items-center gap-2">
                            <span className="font-mono bg-white/5 px-1.5 py-0.5 rounded text-[10px]">
                              {product.model_number || "NO-MODEL"}
                            </span>
                            {product.is_featured && (
                              <span className="text-brand-amber flex items-center gap-1">
                                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                                Featured
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-brand-muted">
                      {category?.name_en || "—"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                          product.is_active
                            ? "bg-green-500/10 border-green-500/20 text-green-400"
                            : "bg-white/5 border-glass-border text-brand-muted"
                        }`}
                      >
                        {product.is_active ? "Active" : "Hidden"}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-xs text-brand-muted">
                      {formatAdminDate(product.updated_at)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right font-medium">
                      <Link
                        href={`/admin/products/${product.id}`}
                        className="px-3.5 py-1.5 rounded-brand-md bg-white/5 hover:bg-brand-amber/10 border border-glass-border hover:border-brand-amber/30 text-xs text-brand-amber transition-all inline-flex items-center gap-1.5"
                      >
                        <span>Edit</span>
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                        </svg>
                      </Link>
                    </td>
                  </tr>
                );
              })}

              {products.length === 0 && !error && (
                <tr>
                  <td
                    colSpan={5}
                    className="px-6 py-16 text-center"
                  >
                    <div className="flex flex-col items-center justify-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-white/5 border border-glass-border flex items-center justify-center">
                        <svg className="w-6 h-6 text-brand-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white">No products registered yet.</p>
                        <p className="text-xs text-brand-muted mt-1 mb-4">Start building your catalog to showcase your inventory.</p>
                        <Link
                          href="/admin/products/new"
                          className="text-xs font-semibold text-brand-amber hover:text-brand-amber/80 transition-colors flex items-center justify-center gap-1"
                        >
                          <span>Add your first product</span>
                          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                          </svg>
                        </Link>
                      </div>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}