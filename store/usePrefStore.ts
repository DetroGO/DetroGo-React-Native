import { create } from "zustand";
import { persist } from "zustand/middleware";
import zustandStorage from "./storage";
import { ThemeMode } from "@/types/route";

type PrefStore = {
  themeMode: ThemeMode;
  setThemeMode: (mode: ThemeMode) => void;
  sourceColor: string;
  setSourceColor: (color: string) => void;
};

export const usePrefStore = create<PrefStore>()(
  persist(
    (set) => ({
      themeMode: "system",
      setThemeMode: (mode: ThemeMode) => set({ themeMode: mode }),
      sourceColor: "system",
      setSourceColor: (color: string) => set({ sourceColor: color }),
    }),
    {
      name: "pref",
      storage: zustandStorage,
    },
  ),
);
