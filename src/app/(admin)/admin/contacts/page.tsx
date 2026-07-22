import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { type ContactMessage } from "@/types";
import {
  capitalizeStatus,
  formatAdminDate,
  statusBadgeClass,
} from "@/lib/admin/format";

export default async function AdminContactsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data, error } = await supabase
    .from("contact_messages")
    .select("id, full_name, email, phone, subject, status, created_at")
    .order("created_at", { ascending: false });

  const messages = (data as ContactMessage[]) || [];

  // Metrics matching your DB enum: ('new', 'read', 'closed')
  const totalMessages = messages.length;
  const newMessages = messages.filter((m) => m.status === "new" || !m.status).length;
  const readMessages = messages.filter((m) => m.status === "read").length;
  const closedMessages = messages.filter((m) => m.status === "closed").length;

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
            <span className="text-white">Contacts</span>
          </div>
          <h1 className="font-heading text-2xl md:text-3xl font-bold tracking-tight text-white">
            Contact Messages
          </h1>
          <p className="mt-1 text-sm text-brand-muted">
            All inbound contact form submissions and inquiries from the platform.
          </p>
        </div>

        {/* Quick Summary Metrics */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="px-4 py-2 rounded-brand-md bg-black/40 border border-glass-border backdrop-blur-md">
            <div className="text-xs text-brand-muted">Total</div>
            <div className="text-lg font-bold font-heading text-white">{totalMessages}</div>
          </div>
          <div className="px-4 py-2 rounded-brand-md bg-black/40 border border-glass-border backdrop-blur-md">
            <div className="text-xs text-blue-400 font-medium">New</div>
            <div className="text-lg font-bold font-heading text-white">{newMessages}</div>
          </div>
          <div className="px-4 py-2 rounded-brand-md bg-black/40 border border-glass-border backdrop-blur-md">
            <div className="text-xs text-brand-amber font-medium">Read</div>
            <div className="text-lg font-bold font-heading text-white">{readMessages}</div>
          </div>
          <div className="px-4 py-2 rounded-brand-md bg-black/40 border border-glass-border backdrop-blur-md">
            <div className="text-xs text-green-400 font-medium">Closed</div>
            <div className="text-lg font-bold font-heading text-white">{closedMessages}</div>
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
            Could not load contact messages. Apply the migration in Supabase, then refresh.
          </span>
        </div>
      )}

      {/* Main Table Card Container */}
      <section className="bg-black/40 border border-glass-border rounded-brand-xl overflow-hidden backdrop-blur-md shadow-2xl">
        <div className="px-6 py-4 border-b border-glass-border flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <div className="w-2.5 h-2.5 rounded-full bg-brand-amber" />
            <h2 className="text-base font-semibold text-white">Inbound Inquiries</h2>
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
                  Sender
                </th>
                <th className="px-6 py-3.5 text-xs font-semibold text-brand-muted uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-3.5 text-xs font-semibold text-brand-muted uppercase tracking-wider">
                  Subject
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
              {messages.map((message) => (
                <tr
                  key={message.id}
                  className="hover:bg-white/5 transition-colors group"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-xs text-brand-muted">
                    {formatAdminDate(message.created_at)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white group-hover:text-brand-amber transition-colors">
                    {message.full_name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-white">{message.email}</div>
                    <div className="text-xs text-brand-muted font-mono mt-0.5">
                      {message.phone || "—"}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-brand-muted max-w-[220px] truncate">
                    {message.subject}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${statusBadgeClass(
                        message.status
                      )}`}
                    >
                      {capitalizeStatus(message.status)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right font-medium">
                    <Link
                      href={`/admin/contacts/${message.id}`}
                      className="px-3.5 py-1.5 rounded-brand-md bg-white/5 hover:bg-brand-amber/10 border border-glass-border hover:border-brand-amber/30 text-xs text-brand-amber transition-all inline-flex items-center gap-1.5"
                    >
                      <span>Review</span>
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </td>
                </tr>
              ))}

              {messages.length === 0 && !error && (
                <tr>
                  <td
                    colSpan={6}
                    className="px-6 py-16 text-center"
                  >
                    <div className="flex flex-col items-center justify-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-white/5 border border-glass-border flex items-center justify-center">
                        <svg className="w-6 h-6 text-brand-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white">No contact messages received yet.</p>
                        <p className="text-xs text-brand-muted mt-1">Inbound messages from the web contact form will appear here.</p>
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