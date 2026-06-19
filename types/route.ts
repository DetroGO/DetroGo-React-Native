// ─── Shared types for routes and preferences ────────────────────────────────

export type MetroSystem =
  | "delhi"
  | "mumbai"
  | "bangalore"
  | "chennai"
  | "kolkata"
  | "hyderabad"
  | "pune"
  | "kochi";

export type ThemeMode = "system" | "light" | "dark" | "amoled";
export type LanguageCode = "en" | "hi";

/** A single station-stop inside a route */
export interface RouteStop {
  station: string;
  line: string;
}

/** Full route as returned by the journey planner */
export interface RouteData {
  route: RouteStop[];
  transferStations: string[];
}

/** A route the user explicitly bookmarked */
export interface SavedRoute {
  id: string; // uuid-style: `${from}__${to}__${Date.now()}`
  from: string;
  to: string;
  stops: number;
  transfers: number;
  savedAt: number; // epoch ms
  routeData: RouteData;
}

/** A route the user navigated — logged automatically */
export interface RecentTrip {
  id: string;
  from: string;
  to: string;
  stops: number;
  transfers: number;
  viewedAt: number; // epoch ms — updated on re-visit
  routeData: RouteData;
}
