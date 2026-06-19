import { createMMKV, type MMKV } from "react-native-mmkv";
import { StateStorage, createJSONStorage } from "zustand/middleware";

let mmkv: MMKV | null = null;
try {
  mmkv = createMMKV({ id: "detrogo-storage" });
} catch {
  mmkv = null;
}

export const storage = mmkv;

const fallbackStorage = new Map<string, string>();

const mmkvStorage: StateStorage = {
  setItem: (name, value) => {
    if (mmkv) {
      mmkv.set(name, value);
      return;
    }

    fallbackStorage.set(name, value);
  },
  getItem: (name) => {
    return mmkv?.getString(name) ?? fallbackStorage.get(name) ?? null;
  },
  removeItem: (name) => {
    if (mmkv) {
      mmkv.remove(name);
      return;
    }

    fallbackStorage.delete(name);
  },
};

export const zustandStorage = createJSONStorage(() => mmkvStorage);
export default zustandStorage;
