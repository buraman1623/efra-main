"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui";
import { useLocale } from "@/lib/i18n/LocaleProvider";
import type { Profile } from "@/types";

export function UserMenu() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const supabase = createClient();
  const { t } = useLocale();

  useEffect(() => {
    const loadProfile = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setProfile(null);
        setLoading(false);
        return;
      }

      const { data } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (data) {
        setProfile(data);
      } else {
        const meta = user.user_metadata ?? {};
        setProfile({
          id: user.id,
          email: user.email ?? "",
          full_name: meta.full_name || meta.name || null,
          avatar_url: meta.avatar_url || meta.picture || null,
          role: "user",
          created_at: user.created_at,
          updated_at: user.created_at,
        });
      }

      setLoading(false);
    };

    loadProfile();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(() => {
      loadProfile();
    });

    return () => subscription.unsubscribe();
  }, [supabase]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setProfile(null);
    setMenuOpen(false);
    window.location.href = "/";
  };

  if (loading) {
    return (
      <div className="h-10 w-10 animate-pulse rounded-full bg-white/10 border border-glass-border" />
    );
  }

  if (!profile) {
    return (
      <Button
        asChild
        className="bg-brand-amber hover:bg-brand-amber/90 text-black font-semibold text-xs px-5 py-2 transition-all"
      >
        <Link href="/login">{t.nav.login}</Link>
      </Button>
    );
  }

  const initials = (profile.full_name || profile.email)
    .charAt(0)
    .toUpperCase();

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setMenuOpen(!menuOpen)}
        className="flex items-center gap-2 rounded-full ring-offset-black focus:outline-none focus:ring-2 focus:ring-brand-amber focus:ring-offset-2 transition-transform active:scale-95"
        aria-label={t.nav.userMenu}
        aria-expanded={menuOpen}
      >
        {profile.avatar_url ? (
          <Image
            src={profile.avatar_url}
            alt={profile.full_name || "Profile"}
            width={40}
            height={40}
            className="h-10 w-10 rounded-full border-2 border-brand-amber/60 object-cover shadow-md transition-colors hover:border-brand-amber"
          />
        ) : (
          <div className="flex h-10 w-10 items-center justify-center rounded-full border border-brand-amber/40 bg-brand-amber/10 text-sm font-semibold text-brand-amber shadow-md hover:bg-brand-amber/20 transition-colors">
            {initials}
          </div>
        )}
      </button>

      {menuOpen && (
        <>
          {/* Backdrop overlay */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setMenuOpen(false)}
            aria-hidden="true"
          />

          {/* Menu dropdown */}
          <div className="absolute right-0 top-full mt-3 w-60 z-50 rounded-brand-xl border border-glass-border bg-neutral-950/90 backdrop-blur-xl p-2 shadow-2xl divide-y divide-white/10 animate-in fade-in zoom-in-95 duration-150">
            <div className="px-3 py-2.5">
              <p className="text-sm font-semibold text-white truncate">
                {profile.full_name || "User"}
              </p>
              <p className="text-xs  truncate font-mono mt-0.5">
                {profile.email}
              </p>
              {profile.role && profile.role !== "user" && (
                <span className="mt-2 inline-block rounded bg-brand-amber/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-brand-amber border border-brand-amber/20">
                  {profile.role}
                </span>
              )}
            </div>

            <div className="py-1">
              <Link
                href="/watchlist"
                className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-white/80 hover:text-white hover:bg-white/10 rounded-brand-md transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                <svg
                  className="h-4 w-4 "
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                  />
                </svg>
                {t.nav.myWatchlist}
              </Link>

              {profile.role === "admin" && (
                <Link
                  href="/admin"
                  className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-brand-amber/90 hover:text-brand-amber hover:bg-brand-amber/10 rounded-brand-md transition-colors"
                  onClick={() => setMenuOpen(false)}
                >
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                  {t.nav.adminPanel}
                </Link>
              )}
            </div>

            <div className="pt-1">
              <button
                type="button"
                onClick={handleSignOut}
                className="flex w-full items-center gap-2 px-3 py-2 text-xs font-medium text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-brand-md transition-colors text-left"
              >
                <svg
                  className="h-4 w-4 text-red-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
                {t.nav.signOut}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}