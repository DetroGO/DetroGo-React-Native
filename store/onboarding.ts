import { create } from "zustand";
import { persist } from "zustand/middleware";
import zustandStorage from "./storage";

interface OnboardingState {
  hasSeenTutorial: boolean;
  setHasSeenTutorial: (value: boolean) => void;
}

export const useOnboardingStore = create<OnboardingState>()(
  persist(
    (set) => ({
      hasSeenTutorial: false,
      setHasSeenTutorial: (value) => set({ hasSeenTutorial: value }),
    }),
    {
      name: "onboarding",
      storage: zustandStorage,
    },
  ),
);
