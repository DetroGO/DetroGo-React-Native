import { Material3Scheme } from "@pchmn/expo-material3-theme";
import { MD3Theme, useTheme } from "react-native-paper";
import { amoledColors } from "@/constants/amoled";

export const useAmoledTheme = (): MD3Theme & { colors: Material3Scheme } => {
  const theme = useTheme<MD3Theme>();

  return {
    ...theme,
    colors: {
      ...(theme.colors as Material3Scheme),
      ...amoledColors,
    },
  };
};
