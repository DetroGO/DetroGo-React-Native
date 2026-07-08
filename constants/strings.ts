// strings.ts contains all user-facing app strings.
// English is the source language. Other locale files may be partial.
// Missing keys automatically fall back to English.

import { usePrefStore } from "@/store/usePrefStore";
import { DEFAULT_LANGUAGE, LanguageCode } from "@/types/route";

import en from "@/i18n/locales/en.json";
import hi from "@/i18n/locales/hi.json";

type DeepString<T> = {
  readonly [K in keyof T]: T[K] extends string ? string : DeepString<T[K]>;
};

export type Strings = DeepString<typeof en>;

type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends string ? string : DeepPartial<T[K]>;
};

type PartialStrings = DeepPartial<typeof en>;

const isPlainObject = (value: unknown): value is Record<string, unknown> =>
  !!value && typeof value === "object" && !Array.isArray(value);

function deepMerge<T extends Record<string, any>>(
  base: T,
  override?: DeepPartial<T>,
): T {
  if (!override) return base;

  const result: Record<string, any> = { ...base };

  for (const key of Object.keys(override) as Array<keyof T>) {
    const baseVal = base[key];
    const overrideVal = override[key];

    if (overrideVal === undefined) continue;

    if (isPlainObject(baseVal) && isPlainObject(overrideVal)) {
      result[key as string] = deepMerge(
        baseVal as Record<string, any>,
        overrideVal as Record<string, any>,
      );
    } else {
      result[key as string] = overrideVal;
    }
  }

  return result as T;
}

// Add new Crowdin-exported locale JSON files here when you enable them.
// Example later:
// import bn from "@/i18n/locales/bn.json";
// import gu from "@/i18n/locales/gu.json";
const localeFiles = {
  en,
  hi: hi as PartialStrings,

  // bn: bn as PartialStrings,
  // gu: gu as PartialStrings,
  // mr: mr as PartialStrings,
  // ta: ta as PartialStrings,
  // te: te as PartialStrings,
  // kn: kn as PartialStrings,
  // ml: ml as PartialStrings,
  // pa: pa as PartialStrings,
  // ur: ur as PartialStrings,
} satisfies Record<string, PartialStrings>;

const LANGUAGE_LABELS: Record<string, string> = {
  en: "English",
  hi: "Hindi",
  bn: "Bengali",
  gu: "Gujarati",
  mr: "Marathi",
  ta: "Tamil",
  te: "Telugu",
  kn: "Kannada",
  ml: "Malayalam",
  pa: "Punjabi",
  ur: "Urdu",
};

export const AVAILABLE_LOCALE_CODES = Object.keys(
  localeFiles,
) as LanguageCode[];

export const isSupportedLanguage = (
  language: string | null | undefined,
): language is LanguageCode =>
  !!language && Object.prototype.hasOwnProperty.call(localeFiles, language);

export const translations: Record<string, Strings> = Object.fromEntries(
  Object.entries(localeFiles).map(([code, locale]) => [
    code,
    deepMerge(en, locale),
  ]),
) as Record<string, Strings>;

export const LANGUAGE_OPTIONS: { label: string; value: LanguageCode }[] =
  AVAILABLE_LOCALE_CODES.map((code) => ({
    label: LANGUAGE_LABELS[code] ?? code.toUpperCase(),
    value: code,
  }));

export const getStrings = (
  language: LanguageCode | null | undefined = DEFAULT_LANGUAGE,
): Strings => {
  const safeLanguage = isSupportedLanguage(language)
    ? language
    : DEFAULT_LANGUAGE;

  return translations[safeLanguage] ?? translations[DEFAULT_LANGUAGE] ?? en;
};

export const useStrings = (): Strings => {
  const language = usePrefStore((state) => state.language);
  return getStrings(language);
};

function getNestedValue(source: any, path: PropertyKey[]) {
  return path.reduce((current, key) => current?.[key as any], source);
}

function createStringsProxy(path: PropertyKey[] = []): any {
  return new Proxy(
    {},
    {
      get(_target, prop) {
        if (typeof prop === "symbol") return undefined;

        const currentStrings = getStrings(usePrefStore.getState().language);
        const nextPath = [...path, prop];
        const value = getNestedValue(currentStrings, nextPath);

        if (isPlainObject(value)) {
          return createStringsProxy(nextPath);
        }

        return value;
      },
    },
  );
}

// For non-React usage.
// In JSX/components, prefer useStrings() so the UI re-renders on language change.
export const strings = createStringsProxy() as Strings;

export default en;
