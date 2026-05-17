// src/data/cities/index.ts

export interface CityConfig {
  id: string;
  name: string;
  center: [number, number]; // map center
  bounds: [[number, number], [number, number]]; // for offline tiles
  gtfsVersion: string;
}

export const CITIES: Record<string, CityConfig> = {
  delhi: {
    id: "delhi",
    name: "Delhi NCR",
    center: [77.2195, 28.6329],
    bounds: [
      [76.8, 28.4],
      [77.6, 28.9],
    ],
    gtfsVersion: "2025-03",
  },
};
