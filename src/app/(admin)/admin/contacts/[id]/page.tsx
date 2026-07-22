import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { ContactStatusForm } from "@/components/admin/ContactStatusForm";
import {
  capitalizeStatus,
  formatAdminDateTime,
  statusBadgeClass,
} from "@/lib/admin/format";
import type { ContactMessage } from "@/types";

export default async function AdminContactDetailPage({
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
    .from("contact_messages")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  const message = data as ContactMessage | null;

  if (error || !message) {
    notFound();
  }

  return (
    <main className="max-w-7xl mx-auto space-y-8">
      {/* Header & Breadcrumb Navigation */}
      <header className="space-y-3">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-brand-muted">
          <Link href="/admin" className="hover:text-brand-amber transition-colors">
            Overview
          </Link>
          <span>/</span>
          <Link href="/admin/contacts" className="hover:text-brand-amber transition-colors">
            Contacts
          </Link>
          <span>/</span>
          <span className="text-white truncate max-w-[150px]">{message.full_name}</span>
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="font-heading text-2xl md:text-3xl font-bold tracking-tight text-white">
                {message.full_name}
              </h1>
              <span
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${statusBadgeClass(
                  message.status
                )}`}
              >
                {capitalizeStatus(message.status)}
              </span>
            </div>
            <p className="mt-1 text-xs text-brand-muted">
              Submitted on <span className="text-white font-mono">{formatAdminDateTime(message.created_at)}</span>
            </p>
          </div>

          <Link
            href="/admin/contacts"
            className="px-3.5 py-1.5 rounded-brand-md bg-white/5 hover:bg-white/10 border border-glass-border text-xs text-brand-muted hover:text-white transition-all w-fit flex items-center gap-1.5"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span>Back to Contacts</span>
          </Link>
        </div>
      </header>

      {/* Main Content Grid */}
      <div className="grid gap-8 lg:grid-cols-5 items-start">
        {/* Message Details Section */}
        <section className="lg:col-span-3 space-y-6 rounded-brand-xl border border-glass-border bg-black/40 backdrop-blur-md p-6 md:p-8 shadow-2xl">
          <div className="flex items-center gap-2.5 border-b border-glass-border pb-4">
            <div className="w-2.5 h-2.5 rounded-full bg-brand-amber" />
            <h2 className="text-base font-semibold text-white">Message Information</h2>
          </div>

          <dl className="grid gap-6 sm:grid-cols-2">
            <Detail
              label="Email Address"
              value={message.email}
              href={`mailto:${message.email}`}
            />
            <Detail
              label="Phone Number"
              value={message.phone || "—"}
              href={message.phone ? `tel:${message.phone}` : undefined}
            />
            <Detail
              label="Subject"
              value={message.subject}
              className="sm:col-span-2"
            />
          </dl>

          <div className="pt-4 border-t border-glass-border">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-brand-muted mb-3">
              Inquiry Body
            </h3>
            <div className="rounded-brand-md bg-white/5 border border-glass-border p-4 text-sm text-white/90 leading-relaxed whitespace-pre-wrap font-sans">
              {message.message}
            </div>
          </div>
        </section>

        {/* Action Panel / Status Management */}
        <section className="lg:col-span-2 rounded-brand-xl border border-glass-border bg-black/40 backdrop-blur-md p-6 md:p-8 shadow-2xl space-y-6">
          <div className="flex items-center gap-2.5 border-b border-glass-border pb-4">
            <div className="w-2.5 h-2.5 rounded-full bg-blue-400" />
            <h2 className="text-base font-semibold text-white">Management & Notes</h2>
          </div>

          <ContactStatusForm
            messageId={message.id}
            currentStatus={message.status}
            currentNotes={message.admin_notes}
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
}: {
  label: string;
  value: string;
  href?: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <dt className="text-xs font-semibold uppercase tracking-wider text-brand-muted">
        {label}
      </dt>
      <dd className="mt-1 text-sm text-white font-medium">
        {href ? (
          <a
            href={href}
            className="text-brand-amber hover:underline transition-all inline-flex items-center gap-1"
          >
            <span>{value}</span>
            <svg className="w-3 h-3 opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        ) : (
          value
        )}
      </dd>
    </div>
  );
}