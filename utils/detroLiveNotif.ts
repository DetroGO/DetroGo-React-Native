import * as LiveUpdates from "expo-live-updates";
import * as Notifications from "expo-notifications";
import { Platform } from "react-native";

export const startLiveNavigation = async (
  title: string,
  description: string,
  progress: number,
  points: { position: number; color: string }[],
  segments: { length: number; color: string }[],
): Promise<number | string | undefined> => {
  if (Platform.OS === "android" && (Platform.Version as number) >= 36) {
    try {
      const id = LiveUpdates.startLiveUpdate({
        title,
        text: description,
        icon: {
          url: "", // name of a drawable in android/app/src/main/res/drawable/
          isRemote: false,
        },

        shortCriticalText: "DetroGo",
        progress: { progress, points, segments },
      });
      if (id === undefined)
        throw new Error("startLiveUpdate returned undefined");
      return id;
    } catch (e) {
      console.warn(
        "Live Update failed, falling back to standard notification:",
        e,
      );
      return await scheduleStandardNotif(title, description, progress);
    }
  } else {
    return await scheduleStandardNotif(title, description, progress);
  }
};

const scheduleStandardNotif = async (
  title: string,
  description: string,
  subtitle?: any,
): Promise<string> => {
  return await Notifications.scheduleNotificationAsync({
    content: {
      title,
      body: description,
      sticky: true,
      subtitle: subtitle ?? undefined,
    },
    trigger: null,
  });
};

export const updateLiveNavigation = async (
  id: number | string | undefined,
  title: string,
  description: string,
  progress: number,
  points: { position: number; color: string }[],
  segments: { length: number; color: string }[],
) => {
  if (!id) return;
  if (typeof id === "number") {
    try {
      LiveUpdates.updateLiveUpdate(id, {
        title,
        text: description,
        shortCriticalText: "DetroGo",
        progress: { progress, points, segments },
      });
    } catch (e) {
      console.warn("Live Update update failed:", e);
    }
  }
  // string id = standard notif, can't update in place, just leave it
};

export const stopLiveNavigation = (id: number | string | undefined) => {
  if (!id) return;
  if (typeof id === "number") {
    LiveUpdates.stopLiveUpdate(id);
  } else {
    Notifications.dismissNotificationAsync(id);
  }
};
