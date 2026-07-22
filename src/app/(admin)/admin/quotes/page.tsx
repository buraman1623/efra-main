import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import type { QuoteRequest } from "@/types";
import {
  capitalizeStatus,
  formatAdminDate,
  statusBadgeClass,
} from "@/lib/admin/format";

export default async function AdminQuotesPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // Fetch Quotes Data
  const { data, error } = await supabase
    .from("quote_requests")
    .select(
      "id, full_name, company, email, phone, product_interest, status, created_at"
    )
    .order("created_at", { ascending: false });

  const quotes = (data as QuoteRequest[]) || [];

  // Metrics calculation
  const totalQuotes = quotes.length;
  const newQuotes = quotes.filter((q) => q.status === "new").length;
  const pendingQuotes = quotes.filter(
    (q) => (q.status as string) === "in_review" || (q.status as string) === "pending"
  ).length;

  return (
    <main className="max-w-7xl mx-auto space-y-8">
      {/* Page Header */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-brand-muted mb-2">
            <Link href="/admin" className="hover:text-brand-amber transition-colors">
              Overview
            </Link>
            <span>/</span>
            <span className="text-white">Quotes</span>
          </div>
          <h1 className="font-heading text-2xl md:text-3xl font-bold tracking-tight text-white">
            Quote Requests
          </h1>
          <p className="mt-1 text-sm text-brand-muted">
            Manage, review, and follow up on inbound client quote submissions.
          </p>
        </div>

        {/* Quick Summary Metrics */}
        <div className="flex items-center gap-3">
          <div className="px-4 py-2 rounded-brand-md bg-black/40 border border-glass-border backdrop-blur-md">
            <div className="text-xs text-brand-muted">Total</div>
            <div className="text-lg font-bold font-heading text-white">{totalQuotes}</div>
          </div>
          <div className="px-4 py-2 rounded-brand-md bg-black/40 border border-brand-amber/40 shadow-[0_0_15px_rgba(251,191,36,0.1)] backdrop-blur-md">
            <div className="text-xs text-brand-amber font-medium">New</div>
            <div className="text-lg font-bold font-heading text-white">{newQuotes}</div>
          </div>
          <div className="px-4 py-2 rounded-brand-md bg-black/40 border border-glass-border backdrop-blur-md">
            <div className="text-xs text-brand-muted">Pending</div>
            <div className="text-lg font-bold font-heading text-white">{pendingQuotes}</div>
          </div>
        </div>
      </header>

      {/* Database Error Banner */}
      {error && (
        <div className="rounded-brand-lg border border-red-500/30 bg-red-500/10 px-5 py-4 text-sm text-red-300 flex items-center gap-3">
          <svg className="w-5 h-5 shrink-0 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <span>
            Could not load quote requests. Please verify database permissions and migrations.
          </span>
        </div>
      )}

      {/* Main Table Card Container */}
      <section className="bg-black/40 border border-glass-border rounded-brand-xl overflow-hidden backdrop-blur-md shadow-2xl">
        <div className="px-6 py-4 border-b border-glass-border flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <div className="w-2.5 h-2.5 rounded-full bg-brand-amber" />
            <h2 className="text-base font-semibold text-white">All Submissions</h2>
          </div>

          <div className="text-xs text-brand-muted">
            Showing <span className="text-white font-medium">{quotes.length}</span> entries
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white/5 border-b border-glass-border">
                <th className="px-6 py-3.5 text-xs font-semibold text-brand-muted uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3.5 text-xs font-semibold text-brand-muted uppercase tracking-wider">
                  Client / Entity
                </th>
                <th className="px-6 py-3.5 text-xs font-semibold text-brand-muted uppercase tracking-wider">
                  Contact Information
                </th>
                <th className="px-6 py-3.5 text-xs font-semibold text-brand-muted uppercase tracking-wider">
                  Product Interest
                </th>
                <th className="px-6 py-3.5 text-xs font-semibold text-brand-muted uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3.5 text-xs font-semibold text-brand-muted uppercase tracking-wider text-right">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-glass-border text-sm">
              {quotes.map((quote) => (
                <tr
                  key={quote.id}
                  className="hover:bg-white/5 transition-colors group"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-brand-muted text-xs">
                    {formatAdminDate(quote.created_at)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-white group-hover:text-brand-amber transition-colors">
                      {quote.full_name}
                    </div>
                    <div className="text-xs text-brand-muted">
                      {quote.company || "Individual Client"}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-white font-mono text-xs">{quote.email}</div>
                    {quote.phone && (
                      <div className="text-xs text-brand-muted mt-0.5">{quote.phone}</div>
                    )}
                  </td>
                  <td className="px-6 py-4 text-brand-muted max-w-[200px] truncate">
                    {quote.product_interest || "General Specification"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusBadgeClass(
                        quote.status
                      )}`}
                    >
                      {capitalizeStatus(quote.status)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right font-medium">
                    <Link
                      href={`/admin/quotes/${quote.id}`}
                      className="px-3.5 py-1.5 rounded-brand-md bg-white/5 hover:bg-brand-amber/10 border border-glass-border hover:border-brand-amber/30 text-xs text-brand-amber transition-all inline-flex items-center gap-1.5"
                    >
                      <span>Inspect</span>
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </td>
                </tr>
              ))}

              {quotes.length === 0 && !error && (
                <tr>
                  <td
                    colSpan={6}
                    className="px-6 py-16 text-center text-brand-muted"
                  >
                    <div className="flex flex-col items-center justify-center gap-2">
                      <svg className="w-8 h-8 text-brand-muted/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      <p className="text-sm font-medium">No quote requests registered yet.</p>
                      <p className="text-xs text-brand-muted">New submissions from your contact funnel will appear here.</p>
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