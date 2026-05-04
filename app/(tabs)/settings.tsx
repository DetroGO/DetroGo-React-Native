import { View } from "react-native";
import { Text, Switch } from "react-native-paper";
import { usePrefStore } from "@/store/usePrefStore";
import { useAppTheme } from "@/hooks/useAppTheme";

export default function Settings() {
  const { themeMode, setThemeMode } = usePrefStore();
  const theme = useAppTheme();

  return (
    <View
      style={{
        flex: 1,
        paddingTop: 50,
        paddingLeft: 20,
        backgroundColor: theme.colors.surfaceDim,
      }}
    >
      <View
        style={{ marginBottom: 20, backgroundColor: theme.colors.surfaceDim }}
      >
        <Text variant="titleLarge">Settings</Text>
      </View>
      <Text>Appearance</Text>
    </View>
  );
}
