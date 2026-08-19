export const locales = ["en", "am"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

/**
 * Name of the cookie used to persist the visitor's language choice.
 * Read by both the server (via `next/headers`) and the client (via
 * `document.cookie`), so the correct language is known on first paint
 * and survives navigation and page refreshes.
 */
export const LOCALE_COOKIE = "efra_locale";

export function isLocale(value: string | undefined | null): value is Locale {
  return !!value && (locales as readonly string[]).includes(value);
}
