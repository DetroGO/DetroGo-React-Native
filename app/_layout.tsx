import { usePrefStore } from "@/store/usePrefStore";
import { useMaterial3Theme } from "@pchmn/expo-material3-theme";
import { MD3DarkTheme, MD3LightTheme } from "react-native-paper";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { amoledColors } from "@/constants/amoled";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { PaperProvider } from "react-native-paper";
import "react-native-reanimated";
import { useColorScheme } from "react-native";

export const unstable_settings = {
  anchor: "(tabs)",
};

// Inner component — remounts entirely when sourceColor changes
function ThemedApp() {
  const colorScheme = useColorScheme();
  const { themeMode, sourceColor } = usePrefStore();
  const { theme } = useMaterial3Theme({
    sourceColor: sourceColor === "system" ? undefined : sourceColor,
    fallbackSourceColor: "#E91E63",
  });

  const isDark =
    themeMode === "system" ? colorScheme === "dark" : themeMode !== "light";

  const paperTheme =
    themeMode === "amoled"
      ? { ...MD3DarkTheme, colors: { ...theme.dark, ...amoledColors } }
      : themeMode === "system"
        ? colorScheme === "dark"
          ? { ...MD3DarkTheme, colors: theme.dark }
          : { ...MD3LightTheme, colors: theme.light }
        : themeMode === "dark"
          ? { ...MD3DarkTheme, colors: theme.dark }
          : { ...MD3LightTheme, colors: theme.light };

  return (
    <PaperProvider theme={paperTheme}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="planner" options={{ headerShown: false }} />
          <Stack.Screen name="route" options={{ headerShown: false }} />
          <Stack.Screen name="listpage" options={{ headerShown: false }} />
          <Stack.Screen name="onboarding" options={{ headerShown: false }} />
        </Stack>
        <StatusBar style={isDark ? "light" : "dark"} />
      </GestureHandlerRootView>
    </PaperProvider>
  );
}

// Outer shell — only job is to key ThemedApp on sourceColor
export default function RootLayout() {
  const { sourceColor } = usePrefStore();
  return <ThemedApp key={sourceColor} />;
}
