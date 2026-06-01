import {
  startLiveUpdate,
  updateLiveUpdate,
  stopLiveUpdate,
} from "react-native-android-live-updates";

// ~2 min per stop for Delhi Metro (rough average)
const MINS_PER_STOP = 2;

let notificationId: number | undefined;

interface LiveUpdateState {
  title: string;
  text: string;
  subText: string;
  shortCriticalText: string;
  showTime: boolean;
  time?: number;
  progress?: {
    max: number;
    progress: number;
    indeterminate: boolean;
  };
}

// Helper: Calculate arrival time exactly once to prevent millisecond drift
function getArrivalEstimates(stopsRemaining: number) {
  const arrivalMs = Date.now() + stopsRemaining * MINS_PER_STOP * 60 * 1000;
  const d = new Date(arrivalMs);

  const h = d.getHours();
  const m = d.getMinutes().toString().padStart(2, "0");
  const ampm = h >= 12 ? "pm" : "am";
  const hour = h % 12 || 12;

  return {
    timestamp: arrivalMs,
    formattedTime: `${hour}:${m} ${ampm}`,
  };
}

// Helper: Calculate a safe 0-100 integer for Android progress bars
function getProgressPercentage(
  stopsRemaining: number,
  totalStops: number,
): number {
  if (totalStops <= 0) return 100; // Safety check
  const stopsCompleted = totalStops - stopsRemaining;
  // Math.round ensures an integer; Math.max/min guarantees it stays between 0 and 100
  return Math.max(
    0,
    Math.min(100, Math.round((stopsCompleted / totalStops) * 100)),
  );
}

// Helper: Manage the notification lifecycle
function applyUpdate(state: LiveUpdateState) {
  if (notificationId === undefined) {
    notificationId = startLiveUpdate(state) ?? undefined;
  } else {
    updateLiveUpdate(notificationId, state);
  }
}

export function showRouteNotification(
  stopsRemaining: number,
  currentStation: string,
  destination: string,
  totalStops: number,
) {
  const { timestamp, formattedTime } = getArrivalEstimates(stopsRemaining);
  const progressPercentage = getProgressPercentage(stopsRemaining, totalStops);

  applyUpdate({
    title: destination,
    text: `${stopsRemaining} stop${stopsRemaining !== 1 ? "s" : ""} · ${currentStation}`,
    subText: `Arrive by ${formattedTime}`,
    shortCriticalText: `${stopsRemaining} left`,
    showTime: false,
    time: timestamp,
    progress: {
      max: 100, // Always 100
      progress: progressPercentage, // Calculated percentage
      indeterminate: false,
    },
  });
}

export function showTransferNotification(
  transferStation: string,
  destination: string,
  stopsRemaining: number,
  totalStops: number,
) {
  const { timestamp, formattedTime } = getArrivalEstimates(stopsRemaining);
  const progressPercentage = getProgressPercentage(stopsRemaining, totalStops);

  applyUpdate({
    title: destination,
    text: `Change trains at ${transferStation}`,
    subText: `Arrive by ${formattedTime}`,
    shortCriticalText: "Transfer",
    showTime: false,
    time: timestamp,
    progress: {
      max: 100, // Always 100
      progress: progressPercentage, // Calculated percentage
      indeterminate: false,
    },
  });
}

export function showDestinationNotification(station: string) {
  if (notificationId === undefined) return;

  applyUpdate({
    title: "You have arrived",
    text: `Welcome to ${station}`,
    subText: "Have a nice day!",
    shortCriticalText: "Arrived",
    showTime: false,
    progress: {
      max: 100,
      progress: 100,
      indeterminate: false,
    },
  });

  // Clear the notification after 5 seconds
  setTimeout(() => clearRouteNotification(), 5000);
}

export function clearRouteNotification() {
  if (notificationId === undefined) return;
  stopLiveUpdate(notificationId);
  notificationId = undefined;
}
