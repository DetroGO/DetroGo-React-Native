// amoled.ts contains the colors needed for amoled mode in the app.
import { MD3DarkTheme } from "react-native-paper";

export const amoledColors = {
  ...MD3DarkTheme.colors,
  background: "#000000",
  surface: "#000000",
  surfaceDim: "#000000",
  surfaceBright: "#1a1a1a",
  surfaceVariant: "#0a0a0a",
  surfaceContainerLowest: "#000000",
  surfaceContainerLow: "#0a0a0a",
  surfaceContainer: "#0d0d0d",
  surfaceContainerHigh: "#111111",
  surfaceContainerHighest: "#161616",
  elevation: {
    level0: "#000000",
    level1: "#0d0d0d",
    level2: "#111111",
    level3: "#141414",
    level4: "#161616",
    level5: "#1a1a1a",
  },
};
