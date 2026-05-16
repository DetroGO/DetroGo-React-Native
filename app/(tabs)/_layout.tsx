import { useState } from "react";
import { BottomNavigation } from "react-native-paper";
import { useAppTheme } from "@/hooks/useAppTheme";
import strings from "@/constants/strings";

import HomeScreen from "./index";
import SettingsScreen from "./settings";
import MapScreen from "./map";

const HomeRoute = () => <HomeScreen />;
const MapRoute = () => <MapScreen />;
const SettingsRoute = () => <SettingsScreen />;

export default function TabLayout() {
  const theme = useAppTheme();
  const [index, setIndex] = useState(0);

  const [routes] = useState([
    {
      key: "home",
      title: strings.navigation.home,
      focusedIcon: "home",
      unfocusedIcon: "home-outline",
    },
    {
      key: "map",
      title: strings.navigation.map,
      focusedIcon: "map",
      unfocusedIcon: "map-outline",
    },
    {
      key: "settings",
      title: strings.navigation.settings,
      focusedIcon: "cog",
      unfocusedIcon: "cog-outline",
    },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    home: HomeRoute,
    map: MapRoute,
    settings: SettingsRoute,
  });

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
      barStyle={{
        backgroundColor: theme.colors.surface,
        borderTopWidth: 1,
        borderTopColor: theme.colors.inverseOnSurface,
      }}
      theme={theme} // this is all you need — pulls everything from Material3 dynamic theme
    />
  );
}
