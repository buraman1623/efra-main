import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { QuoteStatusForm } from "@/components/admin/QuoteStatusForm";
import type { QuoteRequest } from "@/types";
import {
  capitalizeStatus,
  formatAdminDateTime,
  statusBadgeClass,
} from "@/lib/admin/format";

export default async function AdminQuoteDetailPage({
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

  const { data, error } = await supabase
    .from("quote_requests")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  const quote = data as QuoteRequest | null;

  if (error || !quote) {
    notFound();
  }

  return (
    <main className="max-w-7xl mx-auto space-y-8">
      {/* Header & Navigation */}
      <header className="space-y-3">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-brand-muted">
          <Link href="/admin" className="hover:text-brand-amber transition-colors">
            Overview
          </Link>
          <span>/</span>
          <Link href="/admin/quotes" className="hover:text-brand-amber transition-colors">
            Quotes
          </Link>
          <span>/</span>
          <span className="text-white truncate max-w-[150px]">{quote.full_name}</span>
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="font-heading text-2xl md:text-3xl font-bold tracking-tight text-white">
                {quote.full_name}
              </h1>
              <span
                className={`inline-flex items-center px-3 py-0.5 rounded-full text-xs font-medium ${statusBadgeClass(
                  quote.status
                )}`}
              >
                {capitalizeStatus(quote.status)}
              </span>
            </div>
            <p className="mt-1 text-xs text-brand-muted">
              Submitted on <span className="text-white">{formatAdminDateTime(quote.created_at)}</span>
            </p>
          </div>

          <Link
            href="/admin/quotes"
            className="px-3.5 py-1.5 rounded-brand-md bg-white/5 hover:bg-white/10 border border-glass-border text-xs text-brand-muted hover:text-white transition-all w-fit flex items-center gap-1.5"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span>Back to Quotes</span>
          </Link>
        </div>
      </header>

      {/* Main Grid */}
      <div className="grid gap-8 lg:grid-cols-5 items-start">
        {/* Left Column: Client & Inquiry Details */}
        <section className="lg:col-span-3 space-y-6 rounded-brand-xl border border-glass-border bg-black/40 backdrop-blur-md p-6 shadow-2xl">
          <div className="flex items-center gap-2.5 border-b border-glass-border pb-4">
            <div className="w-2.5 h-2.5 rounded-full bg-brand-amber" />
            <h2 className="text-base font-semibold text-white">Request Details</h2>
          </div>

          <dl className="grid gap-6 sm:grid-cols-2">
            <Detail
              label="Email Address"
              value={quote.email}
              href={`mailto:${quote.email}`}
              icon={
                <svg className="w-4 h-4 text-brand-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 002-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              }
            />
            <Detail
              label="Phone Number"
              value={quote.phone || "—"}
              href={quote.phone ? `tel:${quote.phone}` : undefined}
              icon={
                <svg className="w-4 h-4 text-brand-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              }
            />
            <Detail label="Company / Entity" value={quote.company || "Individual Client"} />
            <Detail label="WhatsApp" value={quote.whatsapp || "—"} />
            <Detail
              label="Product / Machinery Interest"
              value={quote.product_interest || "General Specification"}
              className="sm:col-span-2"
            />
          </dl>

          <div className="pt-4 border-t border-glass-border">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-brand-muted mb-2">
              Inquiry Message
            </h3>
            <div className="p-4 rounded-brand-md bg-white/5 border border-glass-border">
              <p className="whitespace-pre-wrap text-sm text-white leading-relaxed">
                {quote.message || "No additional message details provided with this request."}
              </p>
            </div>
          </div>
        </section>

        {/* Right Column: Manage Lead Status */}
        <section className="lg:col-span-2 rounded-brand-xl border border-glass-border bg-black/40 backdrop-blur-md p-6 shadow-2xl space-y-6 sticky top-24">
          <div className="flex items-center gap-2.5 border-b border-glass-border pb-4">
            <div className="w-2.5 h-2.5 rounded-full bg-blue-400" />
            <h2 className="text-base font-semibold text-white">Lead Management</h2>
          </div>

          <QuoteStatusForm
            quoteId={quote.id}
            currentStatus={quote.status}
            currentNotes={quote.admin_notes}
          />
        </section>
      </div>
    </main>
  );
}

function Detail({
  label,
  value,
  href,
  className,
  icon,
}: {
  label: string;
  value: string;
  href?: string;
  className?: string;
  icon?: React.ReactNode;
}) {
  return (
    <div className={className}>
      <dt className="text-xs font-semibold uppercase tracking-wider text-brand-muted flex items-center gap-1.5 mb-1">
        {icon}
        <span>{label}</span>
      </dt>
      <dd className="text-sm font-medium text-white">
        {href ? (
          <a
            href={href}
            className="text-brand-amber hover:underline transition-colors flex items-center gap-1"
          >
            <span>{value}</span>
          </a>
        ) : (
          <span>{value}</span>
        )}
      </dd>
    </div>
  );
}