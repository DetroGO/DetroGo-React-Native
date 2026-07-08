// strings.ts contains the strings used in the app.
// these are the strings that are displayed to the user. depending upon the language they select, the strings will be displayed.
// you can help us translate by adding a partial locale object below (see `hi` for an example) —
// you only need to include the keys you're actually translating; anything you omit falls back to English.

import { usePrefStore } from "@/store/usePrefStore";
import { LanguageCode } from "@/types/route";
import en from "@/i18n/locales/en.json";
import hi from "@/i18n/locales/hi.json";

// Full shape every locale resolves to (after merging with `en`).
type DeepString<T> = {
  readonly [K in keyof T]: T[K] extends string ? string : DeepString<T[K]>;
};
export type Strings = DeepString<typeof en>;

// Shape a locale FILE is allowed to provide: any subset, at any depth.
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends string ? string : DeepPartial<T[K]>;
};
type PartialStrings = DeepPartial<typeof en>;

function deepMerge<T extends Record<string, any>>(
  base: T,
  override: DeepPartial<T> | undefined,
): T {
  if (!override) return base;
  const result: any = { ...base };
  for (const key in override) {
    const overrideVal = override[key];
    const baseVal = base[key];
    if (
      overrideVal &&
      typeof overrideVal === "object" &&
      baseVal &&
      typeof baseVal === "object"
    ) {
      result[key] = deepMerge(baseVal, overrideVal as any);
    } else if (overrideVal !== undefined) {
      result[key] = overrideVal;
    }
  }
  return result;
}

// ---- Locale overrides ----
// `hi` here is a COMPLETE translation, so it's typed directly as `Strings`
// (not merged with `en`). If you ever want to trim it back down to only the
// keys that differ from English, switch it to `PartialStrings` and wrap it
// in `deepMerge(en, hiPartial)` like before — the helper is still here.

export const translations: Record<LanguageCode, Strings> = {
  en,
  hi,
};

export const LANGUAGE_OPTIONS: { label: string; value: LanguageCode }[] = [
  { label: "English", value: "en" },
  { label: "Hindi", value: "hi" },
];

export const getStrings = (language: LanguageCode = "en"): Strings =>
  translations[language] ?? en;

// For use INSIDE React components (JSX render) — subscribes to the store
// and triggers a re-render when language changes.
export const useStrings = () => {
  const language = usePrefStore((state) => state.language);
  return getStrings(language);
};

// For use EVERYWHERE ELSE — top-level helpers, formatters, non-component
// files, event handlers, functions nested inside a component, etc.
// This is NOT a hook, so it can be imported and used exactly like the old
// static `strings` object (`strings.home.searchbar`) — but unlike a static
// import, every property access re-reads the CURRENT language from the
// store at call time, so it never goes stale.
// Caveat: reading this inside JSX does not by itself trigger a re-render
// when language changes (property access can't do that — only a hook
// subscription can). See note below on how the app-wide re-render happens.
export const strings: Strings = new Proxy({} as Strings, {
  get(_target, prop) {
    const current = getStrings(usePrefStore.getState().language);
    return (current as any)[prop];
  },
}) as Strings;

export default en;
