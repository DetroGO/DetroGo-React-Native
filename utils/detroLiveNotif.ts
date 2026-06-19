import * as LiveUpdates from "expo-live-updates";
import * as Notifications from "expo-notifications";
import { Platform } from "react-native";

const STANDARD_CHANNEL_ID = "default";

type LiveNavigationId = number | string | undefined;

type ProgressPoint = { position: number; color: string };
type ProgressSegment = { length: number; color: string };

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const supportsLiveUpdates = () => {
  const version =
    typeof Platform.Version === "string"
      ? Number.parseInt(Platform.Version, 10)
      : Platform.Version;

  return Platform.OS === "android" && version >= 36;
};

export const startLiveNavigation = async (
  title: string,
  description: string,
  progress: number,
  points: ProgressPoint[],
  segments: ProgressSegment[],
): Promise<LiveNavigationId> => {
  if (supportsLiveUpdates()) {
    try {
      const id = LiveUpdates.startLiveUpdate({
        title,
        text: description,
        icon: {
          url: "notification_icon",
          isRemote: false,
        },
        shortCriticalText: "DetroGo",
        progress: {
          progress,
          points,
          segments,
        },
      });

      if (id !== undefined) return id;

      throw new Error("startLiveUpdate returned undefined");
    } catch (error) {
      console.warn("Live Update failed, using normal notification:", error);
    }
  }

  return scheduleStandardNotification(title, description);
};

const scheduleStandardNotification = async (
  title: string,
  description: string,
): Promise<string | undefined> => {
  const allowed = await ensureNotificationPermission();

  if (!allowed) {
    console.warn("Notification permission was not granted");
    return undefined;
  }

  return Notifications.scheduleNotificationAsync({
    content: {
      title,
      body: description,
      sticky: true,
    },
    trigger: null,
  });
};

export const ensureNotificationPermission = async (): Promise<boolean> => {
  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync(STANDARD_CHANNEL_ID, {
      name: "Navigation",
      importance: Notifications.AndroidImportance.DEFAULT,
      lockscreenVisibility: Notifications.AndroidNotificationVisibility.PUBLIC,
      showBadge: false,
    });
  }

  const permissions = await Notifications.getPermissionsAsync();

  if (!permissions.granted) {
    const requested = await Notifications.requestPermissionsAsync();
    return requested.granted;
  }

  return true;
};

export const updateLiveNavigation = async (
  id: LiveNavigationId,
  title: string,
  description: string,
  progress: number,
  points: ProgressPoint[],
  segments: ProgressSegment[],
) => {
  if (!id) return;

  if (typeof id === "number") {
    try {
      LiveUpdates.updateLiveUpdate(id, {
        title,
        text: description,
        shortCriticalText: "DetroGo",
        progress: {
          progress,
          points,
          segments,
        },
      });
    } catch (error) {
      console.warn("Live Update update failed:", error);
    }
  }
};

export const stopLiveNavigation = async (id: LiveNavigationId) => {
  if (!id) return;

  try {
    if (typeof id === "number") {
      LiveUpdates.stopLiveUpdate(id);
    } else {
      await Notifications.dismissNotificationAsync(id);
    }
  } catch (error) {
    console.warn("Failed to stop navigation notification:", error);
  }
};
