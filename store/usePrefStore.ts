import { create } from "zustand";
import { persist } from "zustand/middleware";
import zustandStorage from "./storage";
import { LanguageCode, ThemeMode } from "@/types/route";

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
      setThemeMode: (mode: ThemeMode) => set({ themeMode: mode }),
      sourceColor: "system",
      setSourceColor: (color: string) => set({ sourceColor: color }),
      language: "en",
      setLanguage: (language: LanguageCode) => set({ language }),
      notificationsEnabled: false,
      setNotificationsEnabled: (enabled: boolean) =>
        set({ notificationsEnabled: enabled }),
      locationEnabled: false,
      setLocationEnabled: (enabled: boolean) =>
        set({ locationEnabled: enabled }),
      homeStation: null,
      setHomeStation: (station: string | null) => set({ homeStation: station }),
      workStation: null,
      setWorkStation: (station: string | null) => set({ workStation: station }),
    }),
    {
      name: "pref",
      storage: zustandStorage,
    },
  ),
);
