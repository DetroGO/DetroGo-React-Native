import { useState } from "react";
import { BottomNavigation } from "react-native-paper";
import { useAppTheme } from "@/hooks/useAppTheme";

import HomeScreen from "./index";

import MapScreen from "./map";

const HomeRoute = () => <HomeScreen />;
const MapRoute = () => <MapScreen />;

export default function TabLayout() {
  const theme = useAppTheme();
  const [index, setIndex] = useState(0);

  const [routes] = useState([
    {
      key: "home",
      title: "Home",
      focusedIcon: "home",
      unfocusedIcon: "home-outline",
    },
    {
      key: "map",
      title: "Map",
      focusedIcon: "map",
      unfocusedIcon: "map-outline",
    },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    home: HomeRoute,
    map: MapRoute,
  });

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
      barStyle={{ backgroundColor: theme.colors.surface }}
      theme={theme} // this is all you need — pulls everything from Material3 dynamic theme
    />
  );
}
