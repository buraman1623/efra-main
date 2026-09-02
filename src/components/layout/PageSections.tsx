"use client";

import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import type { BreadcrumbItem } from "@/types";
import { useLocale } from "@/lib/i18n/LocaleProvider";

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  const { t } = useLocale();
  return (
    <nav aria-label="Breadcrumb" className={cn("py-4", className)}>
      <ol className="flex flex-wrap items-center gap-2 text-xs font-medium text-brand-light/60">
        <li>
          <Link
            href="/"
            className="text-brand-light/60 transition-colors hover:text-brand-amber"
          >
            {t.breadcrumbs.home}
          </Link>
        </li>
        {items.map((item, index) => (
          <li key={`${item.label}-${index}`} className="flex items-center gap-2">
            <ChevronIcon />
            {item.href ? (
              <Link
                href={item.href}
                className="text-brand-light/60 transition-colors hover:text-brand-amber"
              >
                {item.label}
              </Link>
            ) : (
              <span className="font-semibold text-white" aria-current="page">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

function ChevronIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      aria-hidden="true"
      className="text-brand-light/60/40"
    >
      <path
        d="M4.5 2.5L7.5 6L4.5 9.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

interface PageHeroProps {
  title: string;
  subtitle?: string;
  eyebrow?: string;
  image: string;
  imageAlt?: string;
  children?: React.ReactNode;
  compact?: boolean;
}

export function PageHero({
  title,
  subtitle,
  eyebrow,
  image,
  imageAlt,
  children,
  compact = false,
}: PageHeroProps) {
  return (
    <section
      className={cn(
        "relative overflow-hidden bg-neutral-950 border-b border-glass-border",
        compact ? "min-h-[280px]" : "min-h-[400px] lg:min-h-[500px]"
      )}
    >
      {/* Background Image */}
      <Image
        src={image}
        alt={imageAlt ?? title}
        fill
        priority
        className="object-cover opacity-25"
        sizes="100vw"
      />

      {/* Radial and Linear Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-neutral-950/80 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent" />

      {/* Main Content */}
      <div className="container-brand relative z-10 flex h-full min-h-[inherit] flex-col justify-end pb-12 pt-28 lg:pb-16 lg:pt-32">
        {eyebrow && (
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-brand-amber">
            {eyebrow}
          </p>
        )}
        <h1 className="max-w-4xl font-heading text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-4 max-w-2xl text-base text-brand-light/60/90 sm:text-lg leading-relaxed">
            {subtitle}
          </p>
        )}
        {children && <div className="mt-8">{children}</div>}
      </div>
    </section>
  );
}

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      {eyebrow && (
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-brand-amber">
          {eyebrow}
        </p>
      )}
      <h2 className="font-heading text-2xl font-bold tracking-tight text-white sm:text-3xl lg:text-4xl">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-base text-brand-light/60 leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}