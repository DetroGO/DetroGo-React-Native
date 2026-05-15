import { router } from "expo-router";
import { useEffect } from "react";
import * as Location from "expo-location";
import * as Haptics from "expo-haptics";
import { ToastAndroid } from "react-native";
import metroLines from "../constants/metrolines.json";
import stations from "../constants/stationsdata.json";
import { useAppTheme } from "@/hooks/useAppTheme";
import {
  Text,
  Surface,
  Searchbar,
  Card,
  Icon,
  ProgressBar,
  Button,
} from "react-native-paper";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  runOnJS,
} from "react-native-reanimated";
import strings from "@/constants/strings";

import {
  StyleSheet,
  View,
  SectionList,
  ActivityIndicator,
  BackHandler,
} from "react-native";
import { useState, useCallback } from "react";
import { useRouter } from "expo-router";
import { useRef } from "react";
type TransitLines = Record<string, string[]>;
const lines: TransitLines = metroLines as TransitLines;

// Original sections data
const initialSections = Object.entries(lines).map(([title, data]) => ({
  title,
  data,
}));

const haversine = (lat1, lon1, lat2, lon2) => {
  const toRad = (v) => (v * Math.PI) / 180;
  const R = 6371;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;

  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
};

const findNearestMetroStation = (userLat, userLon, stationList) => {
  let nearestStation = null;
  let minDistance = Infinity;

  stationList.forEach((station) => {
    const d = haversine(
      userLat,
      userLon,
      parseFloat(station.stop_lat),
      parseFloat(station.stop_lon),
    );
    if (d < minDistance) {
      minDistance = d;
      nearestStation = station;
    }
  });

  return { nearestStation, minDistance };
};

export default function ModalScreen() {
  const theme = useAppTheme();
  const scale = useSharedValue(1);
  const scale2 = useSharedValue(1);
  const workstation = "Knowledge Park";
  const homestation = "Vaishali";
  const animStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));
  const animStyle2 = useAnimatedStyle(() => ({
    transform: [{ scale: scale2.value }],
  }));
  const [searchPhrase, setPhrase] = useState("");
  const [searchv, setSearchv] = useState("block");
  const [plannerv, setPlannerv] = useState("none");
  const [finalStation, setFinalStation] = useState("");
  const [startStation, setStartStation] = useState("");
  const [finalsel, setFinalsel] = useState(false);
  const [startsel, setStartsel] = useState(false);
  const [editingMode, setEditingMode] = useState<"start" | "final" | null>(
    "start",
  );
  // State to hold the filtered sections
  const [filteredSections, setFilteredSections] = useState(initialSections);
  const router = useRouter();
  const buttonRef = useRef(null);
  const scale3 = useSharedValue(0);
  const [origin, setOrigin] = useState({ x: 0, y: 0 });
  const [location, setLocation] = useState(null);
  const [nearest, setNearest] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const animatedCircle = useAnimatedStyle(() => ({
    transform: [{ scale: scale3.value }],
    opacity: scale3.value > 0 ? 1 : 0,
  }));

  const handleGo = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    if (startStation !== finalStation) {
      router.push({
        pathname: "/route",
        params: { start: startStation, end: finalStation },
      });
    } else {
      ToastAndroid.show(
        "Start Station and Final Station cannot be the same",
        ToastAndroid.SHORT,
      );
    }
  };

  const handleStationSelect = (item: string) => {
    if (editingMode === "start") {
      Haptics.selectionAsync();
      setStartStation(item);
      setStartsel(true);
      setEditingMode(null);
      setSearchv("none");
      setPlannerv("block");
    } else if (editingMode === "final") {
      Haptics.selectionAsync();
      setFinalStation(item);
      setFinalsel(true);
      setEditingMode(null);
      setSearchv("none");
      setPlannerv("block");
    } else {
      ToastAndroid.show("First pick a endpoint to change", ToastAndroid.SHORT);
    }
  };

  const showPlan = (item: string) => {
    setFinalStation(item);
    setFinalsel(true);
    setSearchv("none");
    setPlannerv("block");
  };

  const startStationsel = () => {
    Haptics.selectionAsync();
    setEditingMode("start");
    setPlannerv("none");
    setSearchv("block");
    setPhrase("");
    setFilteredSections(initialSections);
  };

  const finalStationsel = () => {
    Haptics.selectionAsync();
    setEditingMode("final");
    setPlannerv("none");
    setSearchv("block");
    setPhrase("");
    setFilteredSections(initialSections);
  };
  const searchData = (text: string) => {
    setPhrase(text); // Update search phrase state

    if (!text) {
      // If search text is empty, show all sections
      setFilteredSections(initialSections);
      return;
    }

    const lowerCaseText = text.toLowerCase();

    // Filter sections
    const filtered = initialSections
      .map((section) => {
        // Filter items within each section
        const filteredItems = section.data.filter((item) =>
          item.toLowerCase().includes(lowerCaseText),
        );
        // Return the section only if it has matching items
        return filteredItems.length > 0
          ? { ...section, data: filteredItems }
          : null;
      })
      .filter((section) => section !== null); // Remove sections that became empty

    setFilteredSections(filtered as typeof initialSections); // Update the state with filtered sections
  };

  const cancelSearch = useCallback(() => {
    // Only cancel if we have something to go back to
    if (startsel || finalsel) {
      setSearchv("none");
      setPlannerv("block");
      setEditingMode(null);
      setPhrase("");
      setFilteredSections(initialSections);
      return true; // consume the back press
    }
    return false; // let system handle it (exit/back)
  }, [startsel, finalsel]);

  useEffect(() => {
    // Only intercept the back button if we are in an active editing/search mode
    if (editingMode !== null) {
      const subscription = BackHandler.addEventListener(
        "hardwareBackPress",
        cancelSearch,
      );

      // Cleanup the listener when the mode changes or component unmounts
      return () => subscription.remove();
    }
    // If editingMode is null, we do nothing.
    // Expo Router will naturally handle the back press and close the Modal.
  }, [editingMode, cancelSearch]); // Make sure editingMode is in the dependency array

  useEffect(() => {
    (async () => {
      try {
        // Request permission from the user
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          setErrorMsg(strings.common.locationpermissiondenied);
          setIsLoading(false);
          return;
        }

        // Fetch current position
        let currentPosition = await Location.getCurrentPositionAsync({});
        const lat = currentPosition.coords.latitude;
        const lon = currentPosition.coords.longitude;
        setLocation({ lat, lon });

        // Run your custom logic
        const result = findNearestMetroStation(lat, lon, stations);
        setNearest(result);

        // Auto-fill start station if we found one
        if (result.nearestStation) {
          setStartStation(result.nearestStation.stop_name);
        }
      } catch (error) {
        setErrorMsg(strings.common.error + error.message);
        ToastAndroid.show(errorMsg, ToastAndroid.SHORT);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  useEffect(() => {
    if (startsel && !finalsel) {
      setEditingMode(null); // clear first
      setTimeout(() => {
        setEditingMode("final");
        setPlannerv("none");
        setSearchv("block");
        setPhrase("");
        setFilteredSections(initialSections);
      }, 50);
    }
  }, [startsel]);

  return (
    <Surface
      style={{
        flex: 1,
        paddingTop: 0,

        paddingHorizontal: 0,
        backgroundColor: theme.dark
          ? theme.colors.surfaceDim
          : theme.colors.surface,
      }}
    >
      <View
        style={{
          backgroundColor: theme.dark
            ? theme.colors.elevation.level3
            : theme.colors.elevation.level3,
          padding: 0,
          paddingTop: 56,
        }}
      >
        <View style={{ padding: 15, display: plannerv }}>
          <Animated.View style={animStyle}>
            <Card
              style={{
                backgroundColor: theme.colors.elevation.level1,
                marginBottom: 5,
                borderRadius: 18,
                borderColor:
                  editingMode === "start"
                    ? theme.colors.primary
                    : theme.colors.elevation.level1,
                borderWidth: editingMode === "start" ? 1 : 0,
              }}
              mode="contained"
              onPress={() => startStationsel()}
              onPressIn={() => {
                scale.value = withSpring(0.97);
              }}
              onPressOut={() => {
                scale.value = withSpring(1);
              }}
            >
              <Card.Content
                style={{
                  flexDirection: "row",

                  gap: 10,
                }}
              >
                <Icon
                  source={editingMode === "start" ? "crosshairs-gps" : "home"}
                  size={24}
                />
                <Text variant="titleMedium">
                  {startsel ? startStation : strings.planner.startStation}
                </Text>
              </Card.Content>
            </Card>
          </Animated.View>
          <Animated.View style={animStyle2}>
            <Card
              style={{
                backgroundColor: theme.colors.elevation.level1,
                marginBottom: 15,
                borderRadius: 18,
                borderColor:
                  editingMode === "final"
                    ? theme.colors.primary
                    : theme.colors.elevation.level1,
                borderWidth: editingMode === "final" ? 1 : 0,
              }}
              mode="contained"
              onPressIn={() => {
                scale2.value = withSpring(0.97);
              }}
              onPressOut={() => {
                scale2.value = withSpring(1);
              }}
              onPress={() => finalStationsel()}
            >
              <Card.Content
                style={{
                  flexDirection: "row",

                  gap: 10,
                }}
              >
                <Icon source="flag" size={24} />
                <Text variant="titleMedium">{finalStation}</Text>
              </Card.Content>
            </Card>
          </Animated.View>
          <Animated.View
            style={[
              {
                position: "absolute",
                width: 20,
                height: 20,
                borderRadius: 10,
                backgroundColor: theme.colors.primary,
                left: origin.x - 10,
                top: origin.y - 10,
                zIndex: 99,
              },
              animatedCircle,
            ]}
          />

          <Button ref={buttonRef} mode="contained" onPress={() => handleGo()}>
            {strings.common.go}
          </Button>
        </View>

        {/* Search Bar */}

        <Searchbar
          style={{
            backgroundColor: theme.dark
              ? theme.colors.elevation.level3
              : theme.colors.elevation.level3,
            color: theme.colors.onSecondaryContainer,
            fontSize: 25,
            display: searchv,
          }}
          mode="view"
          icon={editingMode === "start" ? "home" : "flag"}
          showDivider={true}
          // Call searchData when text changes
          onChangeText={searchData}
          placeholder={
            editingMode === "start"
              ? strings.planner.startStation
              : editingMode === "final"
                ? strings.planner.finalStation
                : strings.planner.placeholder
          }
          // Set the value of the searchbar to the current searchPhrase
          value={searchPhrase}
        />
      </View>

      <View style={{ flex: 1, padding: 10 }}>
        <SectionList
          showsVerticalScrollIndicator={false}
          // Use filteredSections for rendering
          sections={filteredSections}
          keyExtractor={(item, idx) => item + idx}
          ListHeaderComponent={
            <View>
              <View>
                {editingMode === "start" && nearest && (
                  <Card
                    style={{
                      backgroundColor: theme.dark
                        ? theme.colors.primaryContainer
                        : theme.colors.primaryContainer,
                      flex: 1,
                      marginTop: 12,
                      paddingLeft: 5,
                      borderRadius: 18,
                    }}
                    mode="contained"
                    onPress={() =>
                      !isLoading &&
                      handleStationSelect(nearest.nearestStation.stop_name)
                    }
                  >
                    <Card.Content
                      style={{
                        flexDirection: "row",
                        gap: 15,
                        alignItems: "center",
                      }}
                    >
                      {isLoading ? (
                        <ActivityIndicator
                          color={theme.colors.onPrimaryContainer}
                          size={26}
                        />
                      ) : (
                        <Icon
                          color={
                            theme.dark
                              ? theme.colors.onPrimaryContainer
                              : theme.colors.primary
                          }
                          source="crosshairs-gps"
                          size={26}
                        />
                      )}

                      <View style={{ flex: 1 }}>
                        <Text
                          variant="labelSmall"
                          style={{
                            color: theme.dark
                              ? theme.colors.onPrimaryContainer
                              : theme.colors.primary,
                          }}
                        >
                          {isLoading
                            ? strings.common.loading
                            : strings.planner.nearestStation}
                        </Text>

                        {isLoading ? (
                          <ProgressBar
                            indeterminate
                            color={theme.colors.onPrimaryContainer}
                            style={{
                              marginTop: 6,
                              borderRadius: 4,
                              backgroundColor: theme.colors.tertiary,
                              opacity: 0.4,
                            }}
                          />
                        ) : (
                          <Text
                            variant="titleMedium"
                            style={{
                              color: theme.dark
                                ? theme.colors.onPrimaryContainer
                                : theme.colors.primary,
                            }}
                          >
                            {nearest.nearestStation.stop_name}
                          </Text>
                        )}
                      </View>
                    </Card.Content>
                  </Card>
                )}
              </View>

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 4,
                  marginBottom: 10,
                  marginTop: 10,
                }}
              >
                <Card
                  style={{
                    backgroundColor: theme.dark
                      ? theme.colors.primaryContainer
                      : theme.colors.secondaryContainer,
                    flex: 1,
                    alignItems: "center",
                    borderTopLeftRadius: 18,
                    borderTopRightRadius: 6,
                    borderBottomLeftRadius: 18,
                    borderBottomRightRadius: 6,
                  }}
                  mode="contained"
                  onPress={() => handleStationSelect(homestation)}
                >
                  <Card.Content
                    style={{
                      flexDirection: "row",

                      gap: 10,
                    }}
                  >
                    <Icon
                      color={
                        theme.dark
                          ? theme.colors.onPrimaryContainer
                          : theme.colors.primary
                      }
                      source="home"
                      size={24}
                    />
                    <Text
                      style={{
                        color: theme.dark
                          ? theme.colors.onPrimaryContainer
                          : theme.colors.primary,
                      }}
                      variant="titleMedium"
                    >
                      {strings.common.home}
                    </Text>
                  </Card.Content>
                </Card>
                <Card
                  style={{
                    backgroundColor: theme.dark
                      ? theme.colors.primaryContainer
                      : theme.colors.secondaryContainer,
                    flex: 1,
                    alignItems: "center",
                    borderTopLeftRadius: 6,
                    borderTopRightRadius: 18,
                    borderBottomLeftRadius: 6,
                    borderBottomRightRadius: 18,
                  }}
                  mode="contained"
                  onPress={() => handleStationSelect(workstation)}
                >
                  <Card.Content
                    style={{
                      flexDirection: "row",

                      gap: 10,
                    }}
                  >
                    <Icon
                      color={
                        theme.dark
                          ? theme.colors.onPrimaryContainer
                          : theme.colors.primary
                      }
                      source="briefcase-variant"
                      size={24}
                    />
                    <Text
                      style={{
                        color: theme.dark
                          ? theme.colors.onPrimaryContainer
                          : theme.colors.primary,
                      }}
                      variant="titleMedium"
                    >
                      {strings.common.work}
                    </Text>
                  </Card.Content>
                </Card>
              </View>
            </View>
          }
          renderSectionHeader={({ section }) => (
            <View
              style={{
                marginBottom: 5,
              }}
            >
              <Text style={{ margin: 10 }} variant="titleMedium">
                {section.title}
              </Text>
            </View>
          )}
          renderItem={({ item, index, section }) => (
            <Card
              mode="contained"
              style={{
                marginBottom: 3,
                padding: 10,
                backgroundColor: theme.colors.surfaceContainerHigh,
                borderTopLeftRadius: index === 0 ? 28 : 6,
                borderTopRightRadius: index === 0 ? 28 : 6,
                borderBottomLeftRadius:
                  index === section.data.length - 1 ? 28 : 6,
                borderBottomRightRadius:
                  index === section.data.length - 1 ? 28 : 6,
              }}
              onPress={() => handleStationSelect(item)}
            >
              <Card.Content
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 14,
                  paddingHorizontal: 14,
                  paddingVertical: 12,
                }}
              >
                <View style={{ flex: 1 }}>
                  <Text
                    variant="bodyMedium"
                    style={{ color: theme.colors.onSurface }}
                  >
                    {item}
                  </Text>
                </View>
              </Card.Content>
            </Card>
          )}
          initialNumToRender={10}
        />
      </View>
    </Surface>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
});
