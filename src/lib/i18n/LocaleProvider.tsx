"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { LOCALE_COOKIE, type Locale } from "./config";
import { dictionaries, type Dictionary } from "./dictionaries";

const ONE_YEAR_SECONDS = 60 * 60 * 24 * 365;

interface LocaleContextValue {
  /** Active locale for the public site ("en" | "am"). */
  locale: Locale;
  /** Dictionary of translated strings for the active locale. */
  t: Dictionary;
  /** Explicitly set the active locale. */
  setLocale: (locale: Locale) => void;
  /** Flip between "en" and "am". Used by the header language switcher. */
  toggleLocale: () => void;
}

const LocaleContext = createContext<LocaleContextValue | null>(null);

/**
 * Provides the active locale + translated dictionary to the entire public
 * site. Mounted once in the root layout, seeded with the locale resolved
 * server-side from the `efra_locale` cookie so there is no flash of the
 * wrong language on first paint. Changing the locale updates React state
 * (instant re-render across the app, since navigation within the App
 * Router keeps this provider mounted) and rewrites the cookie so the
 * choice survives a full page refresh.
 *
 * The Admin Panel never reads from this context, so it always renders in
 * English regardless of what the public site's locale is set to.
 */
export function LocaleProvider({
  initialLocale,
  children,
}: {
  initialLocale: Locale;
  children: ReactNode;
}) {
  const [locale, setLocaleState] = useState<Locale>(initialLocale);

  // Keep the <html lang="..."> attribute (set server-side on first paint)
  // in sync whenever the user switches languages client-side.
  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    if (typeof document !== "undefined") {
      document.cookie = `${LOCALE_COOKIE}=${next}; path=/; max-age=${ONE_YEAR_SECONDS}; SameSite=Lax`;
    }
  }, []);

  const toggleLocale = useCallback(() => {
    setLocale(locale === "en" ? "am" : "en");
  }, [locale, setLocale]);

  return (
    <LocaleContext.Provider
      value={{ locale, t: dictionaries[locale], setLocale, toggleLocale }}
    >
      {children}
    </LocaleContext.Provider>
  );
}

/** Read the active locale + translated dictionary anywhere on the public site. */
export function useLocale() {
  const ctx = useContext(LocaleContext);
  if (!ctx) {
    throw new Error("useLocale() must be used within a <LocaleProvider>.");
  }
  return ctx;
}

/**
 * Convenience helper for picking a bilingual field off CMS/DB content
 * (e.g. `product.name_en` / `product.name_am`). Falls back to the English
 * value whenever an Amharic translation hasn't been entered yet, so the
 * Admin Panel isn't required to fill in every field before content is
 * safe to publish.
 */
export function pickLocalized(
  locale: Locale,
  en: string,
  am: string | null | undefined
): string {
  if (locale === "am" && am && am.trim().length > 0) return am;
  return en;
}
