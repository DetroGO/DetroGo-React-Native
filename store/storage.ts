import { MMKV } from "react-native-mmkv";
import { StateStorage, createJSONStorage } from "zustand/middleware";

let mmkv: MMKV | null = null;
try {
  mmkv = new MMKV({ id: "detrogo-storage" });
} catch {
  mmkv = null;
}

export const storage = mmkv;

// ✅ Correct — pass the StateStorage object directly
const mmkvStorage: StateStorage = {
  setItem: (name, value) => {
    mmkv?.set(name, value);
  },
  getItem: (name) => {
    return mmkv?.getString(name) ?? null;
  },
  removeItem: (name) => {
    mmkv?.delete(name);
  },
};

export const zustandStorage = createJSONStorage(() => mmkvStorage);
export default zustandStorage;
