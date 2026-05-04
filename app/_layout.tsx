import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { usePrefStore } from "@/store/usePrefStore";

import { useMaterial3Theme } from "@pchmn/expo-material3-theme";
import { MD3DarkTheme, MD3LightTheme } from "react-native-paper";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { PaperProvider, useTheme } from "react-native-paper";
import "react-native-reanimated";

import { useColorScheme } from "react-native";

export const unstable_settings = {
  anchor: "(tabs)",
};

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const { themeMode } = usePrefStore();
  const { theme } = useMaterial3Theme({
    fallbackSourceColor: "#E91E63",
  });

  const isDark =
    themeMode === "system" ? colorScheme === "dark" : themeMode === "dark";

  const paperTheme = isDark
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
        </Stack>
        <StatusBar style={isDark ? "light" : "dark"} />
      </GestureHandlerRootView>
    </PaperProvider>
  );
}
