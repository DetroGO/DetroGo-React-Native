import { create } from "zustand";
import { persist } from "zustand/middleware";
import zustandStorage from "./storage";
import { DEFAULT_LANGUAGE, LanguageCode, ThemeMode } from "@/types/route";

const normalizeLanguage = (
  language: LanguageCode | null | undefined,
): LanguageCode => {
  if (!language || typeof language !== "string") return DEFAULT_LANGUAGE;
  return language;
};

type PrefStore = {
  themeMode: ThemeMode;
  setThemeMode: (mode: ThemeMode) => void;

  sourceColor: string;
  setSourceColor: (color: string) => void;

  language: LanguageCode;
  setLanguage: (language: LanguageCode) => void;

  notificationsEnabled: boolean;
  setNotificationsEnabled: (enabled: boolean) => void;

  locationEnabled: boolean;
  setLocationEnabled: (enabled: boolean) => void;

  homeStation: string | null;
  setHomeStation: (station: string | null) => void;

  workStation: string | null;
  setWorkStation: (station: string | null) => void;
};

export const usePrefStore = create<PrefStore>()(
  persist(
    (set) => ({
      themeMode: "system",
      setThemeMode: (mode) => set({ themeMode: mode }),

      sourceColor: "system",
      setSourceColor: (color) => set({ sourceColor: color }),

      language: DEFAULT_LANGUAGE,
      setLanguage: (language) => set({ language: normalizeLanguage(language) }),

      notificationsEnabled: false,
      setNotificationsEnabled: (enabled) =>
        set({ notificationsEnabled: enabled }),

      locationEnabled: false,
      setLocationEnabled: (enabled) => set({ locationEnabled: enabled }),

      homeStation: null,
      setHomeStation: (station) => set({ homeStation: station }),

      workStation: null,
      setWorkStation: (station) => set({ workStation: station }),
    }),
    {
      name: "pref",
      storage: zustandStorage,

      migrate: (persistedState) => {
        const state = persistedState as Partial<PrefStore> | undefined;

        return {
          ...state,
          language: normalizeLanguage(state?.language),
        };
      },
    },
  ),
);
