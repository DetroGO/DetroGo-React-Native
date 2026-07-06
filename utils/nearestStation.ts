// utils/nearestStation.ts
export type StationData = {
  stop_name: string;
  stop_lat: string;
  stop_lon: string;
};

export type NearestStationResult = {
  nearestStation: StationData | null;
  distanceKm: number;
};

function haversineDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number,
): number {
  const toRad = (v: number) => (v * Math.PI) / 180;
  const R = 6371;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

export function findNearestStation(
  lat: number,
  lon: number,
  stations: StationData[],
): NearestStationResult {
  let nearestStation: StationData | null = null;
  let minDistance = Infinity;

  for (const station of stations) {
    const d = haversineDistance(
      lat,
      lon,
      parseFloat(station.stop_lat),
      parseFloat(station.stop_lon),
    );
    if (d < minDistance) {
      minDistance = d;
      nearestStation = station;
    }
  }

  return { nearestStation, distanceKm: minDistance };
}
