import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import {
  capitalizeStatus,
  formatAdminDate,
  statusBadgeClass,
} from "@/lib/admin/format";

import type { QuoteRequest, ContactMessage } from "@/types";

export default async function AdminDashboardPage() {
  const supabase = await createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    redirect("/login");
  }

  // Parallel Aggregate Queries
  const [
    { count: productsCount },
    { count: quotesCount },
    { count: newQuotesCount },
    { count: contactsCount },
    { count: newContactsCount },
  ] = await Promise.all([
    supabase.from("products").select("*", { count: "exact", head: true }),
    supabase.from("quote_requests").select("*", { count: "exact", head: true }),
    supabase
      .from("quote_requests")
      .select("*", { count: "exact", head: true })
      .eq("status", "new"),
    supabase.from("contact_messages").select("*", { count: "exact", head: true }),
    supabase
      .from("contact_messages")
      .select("*", { count: "exact", head: true })
      .eq("status", "new"),
  ]);

  // Recent Activity Datasets
  const [quotesRes, contactsRes] = await Promise.all([
    supabase
      .from("quote_requests")
      .select("id, full_name, company, product_interest, status, created_at")
      .order("created_at", { ascending: false })
      .limit(5),
    supabase
      .from("contact_messages")
      .select("id, full_name, subject, status, created_at")
      .order("created_at", { ascending: false })
      .limit(5),
  ]);

  const recentQuotes = quotesRes.data as QuoteRequest[] | null;
  const recentContacts = contactsRes.data as ContactMessage[] | null;

  return (
    <main className="max-w-7xl mx-auto space-y-10">
      {/* Title Bar & Actions */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl md:text-3xl font-bold tracking-tight text-white">
            System Overview
          </h1>
          <p className="mt-1 text-sm text-brand-muted">
            Monitor real-time product catalogs, incoming quote demands, and support requests.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            asChild
            className="border-glass-border bg-white/5 hover:bg-white/10 text-white text-xs h-10 px-4 rounded-brand-md"
          >
            <Link href="/admin/products">Manage Catalog</Link>
          </Button>
          <Button
            variant="primary"
            asChild
            className="bg-brand-amber text-black hover:bg-brand-amber/90 text-xs font-semibold h-10 px-4 rounded-brand-md shadow-lg shadow-brand-amber/10"
          >
            <Link href="/admin/products/new">+ Add New Product</Link>
          </Button>
        </div>
      </header>

      {/* Analytical Metric Cards Grid */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <MetricCard
          label="Catalog Products"
          value={productsCount ?? 0}
          href="/admin/products"
          icon={
            <svg className="w-5 h-5 text-brand-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
          }
        />
        <MetricCard
          label="Total Quote Requests"
          value={quotesCount ?? 0}
          href="/admin/quotes"
          icon={
            <svg className="w-5 h-5 text-brand-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          }
        />
        <MetricCard
          label="New Quotes"
          value={newQuotesCount ?? 0}
          href="/admin/quotes"
          highlight
          sublabel="Pending action"
          icon={
            <svg className="w-5 h-5 text-brand-amber" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
        />
        <MetricCard
          label="Inbound Messages"
          value={newContactsCount ?? 0}
          href="/admin/contacts"
          highlight
          sublabel={`${contactsCount ?? 0} cumulative messages`}
          icon={
            <svg className="w-5 h-5 text-brand-amber" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 002-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          }
        />
      </section>

      {/* Recent Quotes Section */}
      <section className="bg-black/40 border border-glass-border rounded-brand-xl overflow-hidden backdrop-blur-md shadow-2xl">
        <div className="px-6 py-4 border-b border-glass-border flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-brand-amber" />
            <h2 className="text-base font-semibold text-white">
              Recent Quote Requests
            </h2>
          </div>
          <Link
            href="/admin/quotes"
            className="text-brand-amber hover:text-white transition-colors text-xs font-semibold flex items-center gap-1"
          >
            View All Quotes &rarr;
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white/5 border-b border-glass-border">
                <th className="px-6 py-3.5 text-xs font-semibold text-brand-muted uppercase tracking-wider">
                  Submission Date
                </th>
                <th className="px-6 py-3.5 text-xs font-semibold text-brand-muted uppercase tracking-wider">
                  Contact / Entity
                </th>
                <th className="px-6 py-3.5 text-xs font-semibold text-brand-muted uppercase tracking-wider">
                  Product Target
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
              {recentQuotes?.map((quote) => (
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
                  <td className="px-6 py-4 whitespace-nowrap text-brand-muted">
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
                      className="px-3 py-1 rounded-brand-md bg-white/5 hover:bg-brand-amber/10 border border-glass-border hover:border-brand-amber/30 text-xs text-brand-amber transition-all"
                    >
                      Inspect Request
                    </Link>
                  </td>
                </tr>
              ))}
              {(!recentQuotes || recentQuotes.length === 0) && (
                <tr>
                  <td
                    colSpan={5}
                    className="px-6 py-12 text-center text-brand-muted text-xs"
                  >
                    No quote requests registered yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* Recent Support Messages */}
      <section className="bg-black/40 border border-glass-border rounded-brand-xl overflow-hidden backdrop-blur-md shadow-2xl">
        <div className="px-6 py-4 border-b border-glass-border flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-blue-400" />
            <h2 className="text-base font-semibold text-white">
              Recent Contact Messages
            </h2>
          </div>
          <Link
            href="/admin/contacts"
            className="text-brand-amber hover:text-white transition-colors text-xs font-semibold flex items-center gap-1"
          >
            View All Messages &rarr;
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white/5 border-b border-glass-border">
                <th className="px-6 py-3.5 text-xs font-semibold text-brand-muted uppercase tracking-wider">
                  Received
                </th>
                <th className="px-6 py-3.5 text-xs font-semibold text-brand-muted uppercase tracking-wider">
                  Sender
                </th>
                <th className="px-6 py-3.5 text-xs font-semibold text-brand-muted uppercase tracking-wider">
                  Subject Line
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
              {recentContacts?.map((message) => (
                <tr
                  key={message.id}
                  className="hover:bg-white/5 transition-colors group"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-brand-muted text-xs">
                    {formatAdminDate(message.created_at)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap font-medium text-white group-hover:text-brand-amber transition-colors">
                    {message.full_name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-brand-muted max-w-xs truncate">
                    {message.subject}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusBadgeClass(
                        message.status
                      )}`}
                    >
                      {capitalizeStatus(message.status)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right font-medium">
                    <Link
                      href={`/admin/contacts/${message.id}`}
                      className="px-3 py-1 rounded-brand-md bg-white/5 hover:bg-brand-amber/10 border border-glass-border hover:border-brand-amber/30 text-xs text-brand-amber transition-all"
                    >
                      Read Message
                    </Link>
                  </td>
                </tr>
              ))}
              {(!recentContacts || recentContacts.length === 0) && (
                <tr>
                  <td
                    colSpan={5}
                    className="px-6 py-12 text-center text-brand-muted text-xs"
                  >
                    No contact messages found.
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

// Reusable Analytical Metric Card Component
function MetricCard({
  label,
  value,
  highlight = false,
  sublabel,
  href,
  icon,
}: {
  label: string;
  value: number;
  highlight?: boolean;
  sublabel?: string;
  href?: string;
  icon?: React.ReactNode;
}) {
  const content = (
    <div
      className={`bg-black/40 border rounded-brand-xl p-5 shadow-xl backdrop-blur-md relative overflow-hidden group transition-all duration-300 ${
        highlight
          ? "border-brand-amber/40 shadow-[0_0_20px_rgba(251,191,36,0.08)]"
          : "border-glass-border hover:border-white/20"
      }`}
    >
      <div
        className={`absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
          highlight ? "from-brand-amber/10" : "from-white/5"
        } to-transparent`}
      />
      <div className="flex items-center justify-between mb-3">
        <span
          className={`text-xs font-semibold uppercase tracking-wider ${
            highlight ? "text-brand-amber" : "text-brand-muted"
          }`}
        >
          {label}
        </span>
        {icon}
      </div>
      <p className="text-3xl font-bold font-heading text-white">{value}</p>
      {sublabel && (
        <p className="mt-1.5 text-xs text-brand-muted flex items-center gap-1">
          <span>{sublabel}</span>
        </p>
      )}
    </div>
  );

  if (href) {
    return <Link href={href}>{content}</Link>;
  }

  return content;
}