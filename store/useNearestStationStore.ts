// store/useNearestStationStore.ts
import { create } from "zustand";
import type { StationData } from "@/utils/nearestStation";

type NearestStationStore = {
  nearestStation: StationData | null;
  distanceKm: number | null;
  updatedAt: number | null;
  setNearestStation: (station: StationData, distanceKm: number) => void;
};

export const useNearestStationStore = create<NearestStationStore>((set) => ({
  nearestStation: null,
  distanceKm: null,
  updatedAt: null,
  setNearestStation: (station, distanceKm) =>
    set({ nearestStation: station, distanceKm, updatedAt: Date.now() }),
}));
