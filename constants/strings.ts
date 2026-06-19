import { usePrefStore } from "@/store/usePrefStore";
import { LanguageCode } from "@/types/route";

const en = {
  home: {
    searchbar: "Search Route",
    recentTrips: "Recent Trips",
    noRecentTrips: "No Recent Trips Yet",
    savedRoutes: "Saved Routes",
    noSavedRoutes: "No Saved Routes Yet",
    noSavedRoutesdesc: "Search for a journey and save it here for quick access",
    selectnet: "Select a Metro System",
    startbysearch:
      "Hey there! New to the app? Click below to learn how to get started.",
    try: "Let's Plan Your First Ride",
    readyTitle: "Ready for Your First Ride?",
    startBySearchSubtitle:
      "Find routes, plan trips, and navigate with ease. We'll show you how.",
    seenTutorialSubtitle:
      "You're all set! Tell us where you want to go, and we'll handle the rest.",
  },
  navigation: {
    home: "Home",
    map: "Map",
    settings: "Settings",
  },
  listpage: {
    title: "List Page",
    savedRoutes: "Saved Routes",
    noSavedRoutes: "No Saved Routes Yet",
    recentRoutes: "Recent Routes",
    noRecentRoutes: "No Recent Routes Yet",
  },
  planner: {
    placeholder: "Search line or station",
    noResults: "No stations found",
    nearestStation: "Nearest Station",
    startStation: "Select Starting Station",
    finalStation: "Select Destination Station",
  },
  route: {
    noRouteFound: "No Route Found",
  },
  cities: {
    delhi: "Delhi",
    bangalore: "Bengaluru",
    mumbai: "Mumbai",
    chennai: "Chennai",
  },
  settings: {
    settings: "Settings",
    theme: "Theme",
    aboutdesc: "Transit utility app for Indian Transit",
    colorScheme: "Color Scheme",
    general: "General",
    travelPreferences: "Travel Preferences",
    about: "About",
    language: "Language",
    notifications: "Notifications",
    homeStation: "Home Station",
    workStation: "Work Station",
    chooseLanguage: "Choose Language",
    chooseHomeStation: "Choose Home Station",
    chooseWorkStation: "Choose Work Station",
    notSet: "Not set",
    on: "On",
    off: "Off",
    permissionDenied: "Permission denied",
  },
  common: {
    back: "Back",
    cancel: "Cancel",
    systemDefault: "System Default",
    confirm: "Confirm",
    colorsAmoled: "Managed by Amoled Mode",
    dynamicColors: "Dynamic Colors",
    loading: "Loading…",
    done: "Done",
    error: "Something went wrong",
    home: "Home",
    amoled: "Amoled",
    work: "Work",
    getstarted: "Get Started",
    viewall: "View All",
    go: "GO",
    locationPermission: "Location Permission Required",
    locationPermissionDenied: "Location access was denied",
    stations: "Stations",
    route: "Route",
    transfers: "Transfers",
    takeTour: "Take the Tour",
    planTrip: "Open Planner",
    startTour: "See How It Works",

    skipAndPlan: "Skip & Plan My Trip",
    skip: "Skip",
    version: "Version",
    seenTutorial:
      "Get Started By Searching your First Route if you've not seen the tutorial you can take the tour through the settings",
  },
} as const;

type DeepString<T> = {
  readonly [K in keyof T]: T[K] extends string ? string : DeepString<T[K]>;
};

export type Strings = DeepString<typeof en>;

const hi: Strings = {
  ...en,
  home: {
    ...en.home,
    searchbar: "Route khojein",
    recentTrips: "Recent Trips",
    noRecentTrips: "Abhi koi recent trip nahi",
    savedRoutes: "Saved Routes",
    noSavedRoutes: "Abhi koi saved route nahi",
    noSavedRoutesdesc:
      "Journey search karke yahan save karein, quick access ke liye",
    selectnet: "Metro System chunein",
    try: "Apni pehli ride plan karein",
    startbysearch:
      "Naye hain? Shuru karne ka tarika dekhne ke liye neeche tap karein.",
    readyTitle: "Pehli ride ke liye ready?",
    startBySearchSubtitle:
      "Routes khojein, trips plan karein, aur aasani se navigate karein.",
    seenTutorialSubtitle:
      "Sab set hai! Batayein kahan jaana hai, hum route bana denge.",
  },
  navigation: {
    home: "Home",
    map: "Map",
    settings: "Settings",
  },
  listpage: {
    title: "List Page",
    savedRoutes: "Saved Routes",
    noSavedRoutes: "Abhi koi saved route nahi",
    recentRoutes: "Recent Routes",
    noRecentRoutes: "Abhi koi recent route nahi",
  },
  planner: {
    ...en.planner,
    placeholder: "Line ya station khojein",
    noResults: "Koi station nahi mila",
    nearestStation: "Sabse paas ka station",
    startStation: "Starting station chunein",
    finalStation: "Destination station chunein",
  },
  route: {
    noRouteFound: "Route nahi mila",
  },
  settings: {
    ...en.settings,
    settings: "Settings",
    theme: "Theme",
    aboutdesc: "Indian transit ke liye transit utility app",
    colorScheme: "Color Scheme",
    general: "General",
    travelPreferences: "Travel Preferences",
    about: "About",
    language: "Language",
    notifications: "Notifications",
    homeStation: "Home Station",
    workStation: "Work Station",
    chooseLanguage: "Language chunein",
    chooseHomeStation: "Home Station chunein",
    chooseWorkStation: "Work Station chunein",
    notSet: "Not set",
    on: "On",
    off: "Off",
    permissionDenied: "Permission nahi mili",
  },
  common: {
    ...en.common,
    back: "Back",
    cancel: "Cancel",
    systemDefault: "System Default",
    confirm: "Confirm",
    colorsAmoled: "Amoled Mode se managed",
    dynamicColors: "Dynamic Colors",
    loading: "Loading...",
    done: "Done",
    error: "Kuch galat ho gaya",
    home: "Home",
    amoled: "Amoled",
    work: "Work",
    getstarted: "Get Started",
    viewall: "View All",
    go: "GO",
    locationPermission: "Location Permission Required",
    locationPermissionDenied: "Location access denied",
    stations: "Stations",
    route: "Route",
    transfers: "Transfers",
    takeTour: "Tour dekhein",
    planTrip: "Planner kholein",
    startTour: "Kaise kaam karta hai",
    skipAndPlan: "Skip karke trip plan karein",
    skip: "Skip",
    version: "Version",
  },
};

export const translations: Record<LanguageCode, Strings> = {
  en,
  hi,
};

export const LANGUAGE_OPTIONS: { label: string; value: LanguageCode }[] = [
  { label: "English", value: "en" },
  // { label: "Hindi", value: "hi" },
];

export const getStrings = (language: LanguageCode = "en"): Strings =>
  translations[language] ?? en;

export const useStrings = () => {
  const language = usePrefStore((state) => state.language);
  return getStrings(language);
};

export default en;
