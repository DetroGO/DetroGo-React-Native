import { MMKV } from "react-native-mmkv";
import { createJSONStorage as createZustandStorage } from "zustand/middleware";
import { Platform } from "react-native";

// MMKV requires a native build — falls back to a no-op in Expo Go
let mmkv: MMKV | null = null;
try {
  mmkv = new MMKV({ id: "detrogo-storage" });
} catch {
  mmkv = null;
}

export const storage = mmkv;

export const zustandStorage = createZustandStorage(() => ({
  setItem: (name, value) => {
    mmkv?.set(name, value);
  },
  getItem: (name) => {
    return mmkv?.getString(name) ?? null;
  },
  removeItem: (name) => {
    mmkv?.delete(name);
  },
}));

export default zustandStorage;
