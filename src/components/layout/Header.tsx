"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { mainNavigation } from "@/lib/content/company";
import { UserMenu } from "@/components/auth/UserMenu";
import { cn } from "@/lib/utils";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Close mobile menu on path change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    <header className="fixed top-4 left-0 right-0 z-50 px-3 sm:px-4">
      <div
        className={cn(
          "container-brand flex items-center justify-between rounded-full glass-panel shadow-brand-md px-3 sm:px-5 py-2.5 sm:py-3"
        )}
      >
        <Link href="/" className="flex items-center gap-1.5 sm:gap-2 group min-w-0">
          <Image src="/logo/android-chrome-192x192.png" alt="Efra Business Group" width={32} height={32} className="rounded-brand-md group-hover:opacity-90 transition-opacity shrink-0 w-8 h-8 sm:w-10 sm:h-10" />
          <span className="font-heading font-bold text-[13px] sm:text-lg tracking-tight text-brand-light truncate">
            Efra Business Group
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8">
          {mainNavigation.map((item) => (
            <div key={item.href} className="relative group">
              <Link
                href={item.href}
                className={cn(
                  "text-body-sm font-semibold tracking-wide transition-colors hover:text-brand-amber py-2",
                  pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href))
                    ? "text-brand-amber"
                    : "text-brand-light/85"
                )}
              >
                {item.label}
              </Link>
              
              {/* Simple CSS Dropdown */}
              {item.children && (
                <div className="absolute top-full left-0 mt-2 w-56 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0">
                  <div className="glass-panel rounded-brand-md shadow-brand-lg py-2 flex flex-col gap-1">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="px-4 py-2 text-body-sm hover:text-brand-amber hover:bg-white/5 transition-colors text-brand-light/85"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-4">
          <UserMenu />
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="lg:hidden p-2 text-brand-light shrink-0"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-6 h-6"
          >
            {mobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="container-brand mt-2 glass-panel rounded-brand-lg shadow-brand-lg lg:hidden"
          >
            <div className="py-6 px-5 flex flex-col gap-4">
              {mainNavigation.map((item) => (
                <div key={item.href} className="flex flex-col gap-2">
                  <Link
                    href={item.href}
                    className="text-heading-sm font-semibold text-brand-light hover:text-brand-amber"
                  >
                    {item.label}
                  </Link>
                  {item.children && (
                    <div className="flex flex-col gap-2 pl-4 border-l-2 border-glass-border">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="text-body-md text-brand-muted hover:text-brand-amber"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <div className="mt-4 pt-4 border-t border-glass-border">
                <UserMenu />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
