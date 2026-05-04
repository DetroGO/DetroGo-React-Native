import { create } from "zustand"; // named import, not default
import { persist } from "zustand/middleware";
import zustandStorage from "./storage";
import { ThemeMode } from "@/types/route";

type PrefStore = {
  themeMode: ThemeMode;
  setThemeMode: (mode: ThemeMode) => void;
};

export const usePrefStore = create<PrefStore>()(
  // note the extra ()
  persist(
    (set) => ({
      themeMode: "system",
      setThemeMode: (mode: ThemeMode) => set({ themeMode: mode }),
    }),
    {
      name: "pref",
      storage: zustandStorage,
    },
  ),
);
