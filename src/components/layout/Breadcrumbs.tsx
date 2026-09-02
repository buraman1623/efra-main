"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FadeIn } from "@/components/ui/MotionWrapper";
import { useLocale } from "@/lib/i18n/LocaleProvider";

export function Breadcrumbs() {
  const pathname = usePathname();
  const { t } = useLocale();

  if (pathname === "/") return null;

  const segments = pathname.split("/").filter(Boolean);

  const generatePath = (index: number) => {
    return "/" + segments.slice(0, index + 1).join("/");
  };

  const formatLabel = (segment: string) => {
    return segment
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  return (
    <FadeIn delay={0.1}>
      <nav aria-label="Breadcrumb" className="mb-6">
        <ol className="flex flex-wrap items-center gap-2 text-xs font-medium text-brand-light/60">
          <li>
            <Link
              href="/"
              className="text-brand-light/60 transition-colors hover:text-brand-amber"
            >
              {t.breadcrumbs.home}
            </Link>
          </li>

          {segments.map((segment, index) => {
            const isLast = index === segments.length - 1;
            const path = generatePath(index);
            const label = formatLabel(segment);

            return (
              <li key={path} className="flex items-center gap-2">
                <ChevronIcon />
                {isLast ? (
                  <span
                    className="font-semibold text-white"
                    aria-current="page"
                  >
                    {label}
                  </span>
                ) : (
                  <Link
                    href={path}
                    className="text-brand-light/60 transition-colors hover:text-brand-amber"
                  >
                    {label}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </FadeIn>
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
      className="text-brand-light/60"
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