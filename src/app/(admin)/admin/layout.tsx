import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { AdminSidebar } from "@/components/admin/AdminSidebar";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login?next=/admin");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (profile?.role !== "admin") {
    redirect("/");
  }

  // Fetch badges count for pending items
  const [{ count: newQuotesCount }, { count: newContactsCount }] =
    await Promise.all([
      supabase
        .from("quote_requests")
        .select("*", { count: "exact", head: true })
        .eq("status", "new"),
      supabase
        .from("contact_messages")
        .select("*", { count: "exact", head: true })
        .eq("status", "new"),
    ]);

  return (
    <div className="min-h-screen bg-black text-white flex">
      {/* Dynamic Collapsible Sidebar */}
      <AdminSidebar
        newQuotesCount={newQuotesCount ?? 0}
        newContactsCount={newContactsCount ?? 0}
      />

      {/* Main Content Viewport */}
      <div className="flex-1 pl-64 transition-all duration-300 min-h-screen flex flex-col">
        {/* Top Header Bar */}
        <header className="h-16 border-b border-glass-border bg-black/40 backdrop-blur-md sticky top-0 z-30 px-8 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-brand-muted">
            <span>Admin</span>
            <span>/</span>
            <span className="text-white">Dashboard</span>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3 px-3 py-1.5 rounded-full bg-white/5 border border-glass-border">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs text-brand-muted truncate max-w-[160px]">
                {user.email}
              </span>
            </div>
          </div>
        </header>

        {/* Page Main Content Container */}
        <div className="flex-1 p-8">{children}</div>
      </div>
    </div>
  );
}