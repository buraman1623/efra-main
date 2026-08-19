"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavItem {
  label: string;
  href: string;
  icon: (props: { className?: string }) => React.ReactNode;
  badge?: number;
}

interface AdminSidebarProps {
  newQuotesCount?: number;
  newContactsCount?: number;
}

export function AdminSidebar({
  newQuotesCount = 0,
  newContactsCount = 0,
}: AdminSidebarProps) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  const navItems: NavItem[] = [
    {
      label: "Overview",
      href: "/admin",
      icon: (props) => (
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ),
    },
    {
      label: "Products",
      href: "/admin/products",
      icon: (props) => (
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
      ),
    },
    {
      label: "Quotes",
      href: "/admin/quotes",
      badge: newQuotesCount,
      icon: (props) => (
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
    },
    {
      label: "Contacts",
      href: "/admin/contacts",
      badge: newContactsCount,
      icon: (props) => (
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 002-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      label: "Users",
      href: "/admin/users",
      icon: (props) => (
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m6-1.13a4 4 0 10-4-4 4 4 0 004 4zm6 0a4 4 0 10-.2-7.98" />
        </svg>
      ),
    },
  ];

  return (
    <aside
      className={`fixed top-0 left-0 z-40 h-screen bg-black/80 border-r border-glass-border backdrop-blur-xl transition-all duration-300 flex flex-col ${
        collapsed ? "w-20" : "w-64"
      }`}
    >
      {/* Brand Header */}
      <div className="h-16 px-5 border-b border-glass-border flex items-center justify-between">
        {!collapsed && (
          <Link href="/admin" className="flex items-center gap-2.5 font-heading text-lg font-bold text-white tracking-wide">
            <span className="w-3 h-3 rounded-full bg-brand-amber animate-pulse shadow-[0_0_10px_rgba(251,191,36,0.5)]" />
            <span>Efra Business</span>
          </Link>
        )}
        <button
          type="button"
          onClick={() => setCollapsed(!collapsed)}
          className="p-1.5 rounded-lg text-brand-muted hover:text-white hover:bg-white/10 transition-colors mx-auto"
          aria-label="Toggle sidebar"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={collapsed ? "M13 5l7 7-7 7M5 5l7 7-7 7" : "M11 19l-7-7 7-7m8 14l-7-7 7-7"} />
          </svg>
        </button>
      </div>

      {/* Navigation Options */}
      <nav className="flex-1 px-3 py-6 space-y-1.5 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3.5 px-3.5 py-3 rounded-brand-md text-sm font-medium transition-all duration-200 group relative ${
                isActive
                  ? "bg-brand-amber/10 text-brand-amber border border-brand-amber/30 shadow-[0_0_15px_rgba(251,191,36,0.08)]"
                  : "text-brand-muted hover:text-white hover:bg-white/5"
              }`}
            >
              <item.icon
                className={`w-5 h-5 shrink-0 transition-colors ${
                  isActive ? "text-brand-amber" : "text-brand-muted group-hover:text-white"
                }`}
              />

              {!collapsed && <span className="truncate">{item.label}</span>}

              {item.badge !== undefined && item.badge > 0 && (
                <span
                  className={`ml-auto px-2 py-0.5 text-xs font-bold rounded-full ${
                    collapsed ? "absolute top-2 right-2" : ""
                  } ${
                    isActive
                      ? "bg-brand-amber text-black"
                      : "bg-white/10 text-brand-amber"
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer / Quick Site Link */}
      <div className="p-3 border-t border-glass-border">
        <Link
          href="/"
          className="flex items-center gap-3.5 px-3.5 py-3 rounded-brand-md text-sm font-medium text-brand-muted hover:text-white hover:bg-white/5 transition-colors"
        >
          <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
          {!collapsed && <span>Return to Main Site</span>}
        </Link>
      </div>
    </aside>
  );
}