import { useMemo, useState } from "react";
import { BottomNavigation } from "react-native-paper";
import { useAppTheme } from "@/hooks/useAppTheme";
import { useStrings } from "@/constants/strings";

import HomeScreen from "./index";
import SettingsScreen from "./settings";

const HomeRoute = () => <HomeScreen />;
const SettingsRoute = () => <SettingsScreen />;

export default function TabLayout() {
  const theme = useAppTheme();
  const strings = useStrings();
  const [index, setIndex] = useState(0);

  const routes = useMemo(
    () => [
      {
        key: "home",
        title: strings.navigation.home,
        focusedIcon: "home",
        unfocusedIcon: "home-outline",
      },

      {
        key: "settings",
        title: strings.navigation.settings,
        focusedIcon: "cog",
        unfocusedIcon: "cog-outline",
      },
    ],
    [strings],
  );

  const renderScene = BottomNavigation.SceneMap({
    home: HomeRoute,
    settings: SettingsRoute,
  });

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
      barStyle={{
        backgroundColor: theme.dark
          ? theme.colors.surfaceDim
          : theme.colors.surfaceBright,
        borderTopWidth: 1,
        borderTopColor: theme.colors.inverseOnSurface,
      }}
      theme={theme} // this is all you need — pulls everything from Material3 dynamic theme
    />
  );
}
