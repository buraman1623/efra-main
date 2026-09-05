import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { formatAdminDate } from "@/lib/admin/format";
import { UserRoleControl } from "@/components/admin/UserRoleControl";
import { TelegramSettingsButton } from "@/components/admin/TelegramSettingsButton";

interface ProfileRow {
  id: string;
  email: string;
  full_name: string | null;
  role: "user" | "admin";
  avatar_url: string | null;
  telegram_chat_id: string | null;
  telegram_notifications_enabled: boolean;
  created_at: string;
}

export default async function AdminUsersPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data, error } = await supabase
    .from("profiles")
    .select(
      "id, email, full_name, role, avatar_url, telegram_chat_id, telegram_notifications_enabled, created_at"
    )
    .order("created_at", { ascending: false });

  const users = (data as ProfileRow[]) || [];
  const totalUsers = users.length;
  const adminCount = users.filter((u) => u.role === "admin").length;

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
            <span className="text-white">Users</span>
          </div>
          <h1 className="font-heading text-2xl md:text-3xl font-bold tracking-tight text-white">
            User Management
          </h1>
          <p className="mt-1 text-sm text-brand-muted">
            Everyone who has signed in to the site. Grant or remove admin
            access, and configure each admin&apos;s Telegram notifications,
            here — all other fields are read-only.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="px-4 py-2 rounded-brand-md bg-black/40 border border-glass-border backdrop-blur-md">
            <div className="text-xs text-brand-muted">Total Users</div>
            <div className="text-lg font-bold font-heading text-white">{totalUsers}</div>
          </div>
          <div className="px-4 py-2 rounded-brand-md bg-black/40 border border-glass-border backdrop-blur-md">
            <div className="text-xs text-brand-amber font-medium">Admins</div>
            <div className="text-lg font-bold font-heading text-white">{adminCount}</div>
          </div>
        </div>
      </header>

      {error && (
        <div className="rounded-brand-lg border border-red-500/30 bg-red-500/10 px-5 py-4 text-sm text-red-300 flex items-center gap-3">
          <svg className="w-5 h-5 shrink-0 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <span>Could not load users. Apply the latest migration in Supabase, then refresh.</span>
        </div>
      )}

      <section className="bg-black/40 border border-glass-border rounded-brand-xl overflow-hidden backdrop-blur-md shadow-2xl">
        <div className="px-6 py-4 border-b border-glass-border flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <div className="w-2.5 h-2.5 rounded-full bg-brand-amber" />
            <h2 className="text-base font-semibold text-white">Registered Users</h2>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white/5 border-b border-glass-border">
                <th className="px-6 py-3.5 text-xs font-semibold text-brand-muted uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3.5 text-xs font-semibold text-brand-muted uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3.5 text-xs font-semibold text-brand-muted uppercase tracking-wider">
                  Joined
                </th>
                <th className="px-6 py-3.5 text-xs font-semibold text-brand-muted uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-3.5 text-xs font-semibold text-brand-muted uppercase tracking-wider">
                  Notifications
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-glass-border text-sm">
              {users.map((profile) => (
                <tr key={profile.id} className="hover:bg-white/5 transition-colors group">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      {profile.avatar_url ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={profile.avatar_url}
                          alt=""
                          className="h-8 w-8 rounded-full object-cover border border-glass-border"
                        />
                      ) : (
                        <div className="h-8 w-8 rounded-full bg-brand-amber/10 border border-brand-amber/20 flex items-center justify-center text-xs font-semibold text-brand-amber">
                          {(profile.full_name || profile.email).charAt(0).toUpperCase()}
                        </div>
                      )}
                      <span className="text-sm font-medium text-white group-hover:text-brand-amber transition-colors">
                        {profile.full_name || "—"}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-brand-muted font-mono">
                    {profile.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-xs text-brand-muted">
                    {formatAdminDate(profile.created_at)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <UserRoleControl
                      userId={profile.id}
                      currentRole={profile.role}
                      isSelf={profile.id === user.id}
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <TelegramSettingsButton
                      userId={profile.id}
                      initialChatId={profile.telegram_chat_id}
                      initialEnabled={profile.telegram_notifications_enabled}
                      displayName={
                        profile.id === user.id
                          ? "you"
                          : profile.full_name || profile.email
                      }
                    />
                  </td>
                </tr>
              ))}

              {users.length === 0 && !error && (
                <tr>
                  <td colSpan={5} className="px-6 py-16 text-center">
                    <div className="flex flex-col items-center justify-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-white/5 border border-glass-border flex items-center justify-center">
                        <svg className="w-6 h-6 text-brand-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m6-1.13a4 4 0 10-4-4 4 4 0 004 4zm6 0a4 4 0 10-.2-7.98" />
                        </svg>
                      </div>
                      <p className="text-sm font-medium text-white">No registered users yet.</p>
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
