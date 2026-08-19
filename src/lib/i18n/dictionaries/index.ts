import en, { type Dictionary } from "./en";
import am from "./am";
import type { Locale } from "../config";

export const dictionaries: Record<Locale, Dictionary> = { en, am };

export type { Dictionary };
