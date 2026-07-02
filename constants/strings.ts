// strings.ts contains the strings used in the app.
// these are the strings that are displayed to the user. depending upon the language they select, the strings will be displayed.
// you can help us translate by adding a partial locale object below (see `hi` for an example) —
// you only need to include the keys you're actually translating; anything you omit falls back to English.

import { usePrefStore } from "@/store/usePrefStore";
import { LanguageCode } from "@/types/route";

const en = {
  home: {
    searchbar: "Search Route",
    recentTrips: "Recent Trips",
    takeTour: "Take Tour",
    openPlanner: "Open Planner",
    getStarted: "Get Started",
    getStartedDesc:
      "Get Started by Planning a Trip by clicking the button below",
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
    easteregg: "Drink Some Water Fam You've Reached The End",
  },
  route: {
    noRouteFound: "No Route Found",
    destinationReached: "Destination Reached",
    stopsRemaining: "stops remaining",
    transferHere: "Transfer Here",
    transferAhead: "Transfer Ahead",
    stationsList: "Stations List",
    changeTo: `Change to {switchingToLine}`,
    towards: "Towards {towards}",
  },
  cities: {
    delhi: "Delhi",
    bangalore: "Bengaluru",
    mumbai: "Mumbai",
    chennai: "Chennai",
  },
  settings: {
    settings: "Settings",
    location: "Location",
    reportBug: "Report Bug",
    githubIssues: "Github Issues",
    sourceCode: "Source Code",
    github: "Github",
    license: "License",
    licenseDesc: "GNU GPL v3.0",
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
    item: "Item",
    items: "Items",
    delete: "Delete",
    selected: "Selected",
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
    stops: "Stops",
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

// Full shape every locale resolves to (after merging with `en`).
type DeepString<T> = {
  readonly [K in keyof T]: T[K] extends string ? string : DeepString<T[K]>;
};
export type Strings = DeepString<typeof en>;

// Shape a locale FILE is allowed to provide: any subset, at any depth.
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends string ? string : DeepPartial<T[K]>;
};
type PartialStrings = DeepPartial<typeof en>;

function deepMerge<T extends Record<string, any>>(
  base: T,
  override: DeepPartial<T> | undefined,
): T {
  if (!override) return base;
  const result: any = { ...base };
  for (const key in override) {
    const overrideVal = override[key];
    const baseVal = base[key];
    if (
      overrideVal &&
      typeof overrideVal === "object" &&
      baseVal &&
      typeof baseVal === "object"
    ) {
      result[key] = deepMerge(baseVal, overrideVal as any);
    } else if (overrideVal !== undefined) {
      result[key] = overrideVal;
    }
  }
  return result;
}

// ---- Locale overrides ----
// `hi` here is a COMPLETE translation, so it's typed directly as `Strings`
// (not merged with `en`). If you ever want to trim it back down to only the
// keys that differ from English, switch it to `PartialStrings` and wrap it
// in `deepMerge(en, hiPartial)` like before — the helper is still here.
const hi: Strings = {
  home: {
    getStarted: "शुरू करें",
    getStartedDesc:
      "अपने पहले सफर के लिए यात्रा योजना बनाएं और बटन को क्लिक करें",
    searchbar: "रूट खोजें",
    openPlanner: "प्लानर-खोलें",
    takeTour: "टूर-लें",
    recentTrips: "हाल के सफर",
    noRecentTrips: "अभी तक कोई हाल के सफर नहीं हैं",
    savedRoutes: "सेव किए गए सफ़र",
    noSavedRoutes: "आपने अभी तक कोई सफ़र सेव नहीं किया है।",
    noSavedRoutesdesc: "यात्रा खोजें और त्वरित पहुँच के लिए यहाँ सहेजें",
    selectnet: "एक मेट्रो सिस्टम चुनें",
    startbysearch:
      "नमस्ते! क्या आप इस ऐप के लिए नए हैं? शुरू करने का तरीका सीखने के लिए नीचे क्लिक करें।",
    try: "आइए आपका पहला सफर प्लान करें",
    readyTitle: "क्या आप अपने पहले सफर के लिए तैयार हैं?",
    startBySearchSubtitle:
      "रूट खोजें, सफर प्लान करें, और आसानी से नेविगेट करें। हम आपको दिखाएंगे कैसे।",
    seenTutorialSubtitle:
      "आप पूरी तरह तैयार हैं! हमें बताएं कि आप कहाँ जाना चाहते हैं, और हम बाकी का ध्यान रखेंगे।",
  },
  navigation: {
    home: "मुख्य",
    map: "नक्शा",
    settings: "सेटिंग्स",
  },
  listpage: {
    title: "सूची पृष्ठ",
    savedRoutes: "सेव किए गए सफ़र",
    noSavedRoutes: "अभी तक कोई सेव किए गए सफ़र नहीं हैं",
    recentRoutes: "हाल के सफर",
    noRecentRoutes: "अभी तक कोई हाल के सफर नहीं हैं",
  },
  planner: {
    placeholder: "लाइन या स्टेशन खोजें",
    noResults: "कोई स्टेशन नहीं मिला",
    nearestStation: "निकटतम स्टेशन",
    startStation: "प्रारंभिक स्टेशन चुनें",
    finalStation: "गंतव्य स्टेशन चुनें",
    easteregg: "थोड़ा पानी पी लो मित्र, तुम आखिर तक पहुँच गए हो।",
  },
  route: {
    noRouteFound: "कोई रूट नहीं मिला",
    destinationReached: "गंतव्य पर पहुँच गए",
    stopsRemaining: "स्टॉप बाकी हैं",
    transferHere: "यहाँ बदलें",
    transferAhead: "आगे बदलें",
    stationsList: "स्टेशनों की सूची",
    changeTo: `{switchingToLine} पर बदलें`,
    towards: "{towards} की तरफ",
  },
  cities: {
    delhi: "दिल्ली",
    bangalore: "बेंगलुरु",
    mumbai: "मुंबई",
    chennai: "चेन्नई",
  },
  settings: {
    settings: "सेटिंग्स",
    location: "लोकेशन",

    reportBug: "बग रिपोर्ट",
    githubIssues: "Github Issues",
    sourceCode: "सोर्स कोड",
    github: "Github",
    license: "लाइसेंस",
    licenseDesc: "GNU GPL v3.0",
    theme: "थीम",
    aboutdesc: "भारतीय ट्रांजिट के लिए ट्रांजिट यूटिलिटी ऐप",
    colorScheme: "रंग योजना",
    general: "सामान्य",
    travelPreferences: "यात्रा प्राथमिकताएं",
    about: "के बारे में",
    language: "भाषा",
    notifications: "सूचनाएं",
    homeStation: "होम स्टेशन",
    workStation: "वर्क स्टेशन",
    chooseLanguage: "भाषा चुनें",
    chooseHomeStation: "होम स्टेशन चुनें",
    chooseWorkStation: "वर्क स्टेशन चुनें",
    notSet: "सेट नहीं है",
    on: "चालू",
    off: "बंद",
    permissionDenied: "अनुमति अस्वीकार कर दी गई",
  },
  common: {
    delete: "हटाएं",
    item: "आइटम",
    items: "आइटम्स",
    selected: "चुना हुआ",
    back: "पीछे",
    cancel: "रद्द करें",
    systemDefault: "सिस्टम डिफॉल्ट",
    confirm: "पुष्टि करें",
    colorsAmoled: "एमोलेड मोड द्वारा प्रबंधित",
    dynamicColors: "डायनेमिक कलर्स",
    loading: "लोड हो रहा है…",
    done: "पूर्ण",
    error: "कुछ गलत हो गया",
    home: "मुख्य",
    amoled: "एमोलेड",
    work: "काम",
    getstarted: "शुरू करें",
    viewall: "सभी देखें",
    go: "जाइए",
    locationPermission: "स्थान अनुमति आवश्यक है",
    locationPermissionDenied: "स्थान पहुंच अस्वीकार कर दी गई",
    stations: "स्टेशन",
    route: "रूट",
    transfers: "ट्रांसफर",
    stops: "स्टॉप",
    takeTour: "निर्देशित दौरा करें",
    planTrip: "प्लानर खोलें",
    startTour: "देखें यह कैसे काम करता है",
    skipAndPlan: "छोड़ें और मेरा सफर प्लान करें",
    skip: "छोड़ें",
    version: "संस्करण",
    seenTutorial:
      "शुरू करने के लिए अपना पहला रूट खोजें। यदि आपने ट्यूटोरियल नहीं देखा है, तो आप सेटिंग्स के माध्यम से निर्देशित दौरा कर सकते हैं",
  },
};

export const translations: Record<LanguageCode, Strings> = {
  en,
  hi,
};

export const LANGUAGE_OPTIONS: { label: string; value: LanguageCode }[] = [
  { label: "English", value: "en" },
  { label: "Hindi", value: "hi" },
];

export const getStrings = (language: LanguageCode = "en"): Strings =>
  translations[language] ?? en;

// For use INSIDE React components (JSX render) — subscribes to the store
// and triggers a re-render when language changes.
export const useStrings = () => {
  const language = usePrefStore((state) => state.language);
  return getStrings(language);
};

// For use EVERYWHERE ELSE — top-level helpers, formatters, non-component
// files, event handlers, functions nested inside a component, etc.
// This is NOT a hook, so it can be imported and used exactly like the old
// static `strings` object (`strings.home.searchbar`) — but unlike a static
// import, every property access re-reads the CURRENT language from the
// store at call time, so it never goes stale.
// Caveat: reading this inside JSX does not by itself trigger a re-render
// when language changes (property access can't do that — only a hook
// subscription can). See note below on how the app-wide re-render happens.
export const strings: Strings = new Proxy({} as Strings, {
  get(_target, prop) {
    const current = getStrings(usePrefStore.getState().language);
    return (current as any)[prop];
  },
}) as Strings;

export default en;
