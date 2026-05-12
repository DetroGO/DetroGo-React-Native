import { create } from "zustand";
import { persist } from "zustand/middleware";
import zustandStorage from "./storage";
import { RecentTrip } from "@/types/route";

const MAX_RECENT = 10;

type RecentTripsStore = {
  recentTrips: RecentTrip[];
  addTrip: (trip: RecentTrip) => void;
  clearTrips: () => void;
};

export const useRecentTripsStore = create<RecentTripsStore>()(
  persist(
    (set) => ({
      recentTrips: [],
      addTrip: (trip) =>
        set((state) => ({
          recentTrips: [
            { ...trip, viewedAt: Date.now() },
            ...state.recentTrips
              .filter((t) => !(t.from === trip.from && t.to === trip.to))
              .slice(0, MAX_RECENT - 1),
          ],
        })),
      clearTrips: () => set({ recentTrips: [] }),
    }),
    {
      name: "recent-trips",
      storage: zustandStorage,
    },
  ),
);
