import React, { useEffect } from "react";
import * as Location from "expo-location";
import * as Haptics from "expo-haptics";
import { ToastAndroid } from "react-native";
import metroLines from "@/cities/delhi/metrolines.json";
import stations from "@/cities/delhi/stationsdata.json";
import { useAppTheme } from "@/hooks/useAppTheme";
import { usePrefStore } from "@/store/usePrefStore";
import {
  Text,
  Surface,
  Searchbar,
  Card,
  Icon,
  ProgressBar,
  Button,
  Portal,
  Dialog,
} from "react-native-paper";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";
import { strings } from "@/constants/strings";

import {
  StyleSheet,
  View,
  Pressable,
  SectionList,
  ActivityIndicator,
  BackHandler,
} from "react-native";
import { useState, useCallback, useMemo } from "react";
import { useRouter } from "expo-router";
import { useRef } from "react";
type TransitLines = Record<string, string[]>;
type DisplayValue = "flex" | "none";
type StationData = {
  stop_name: string;
  stop_lat: string;
  stop_lon: string;
};
type NearestStationResult = {
  nearestStation: StationData | null;
  minDistance: number;
};

const lines: TransitLines = metroLines as TransitLines;

// Original sections data
const initialSections = Object.entries(lines).map(([title, data]) => ({
  title,
  data,
}));

const haversine = (lat1: number, lon1: number, lat2: number, lon2: number) => {
  const toRad = (v: number) => (v * Math.PI) / 180;
  const R = 6371;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;

  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
};

const findNearestMetroStation = (
  userLat: number,
  userLon: number,
  stationList: StationData[],
): NearestStationResult => {
  let nearestStation: StationData | null = null;
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

// ---- Memoized row for SectionList ----
// Defined OUTSIDE the screen component so its identity never changes.
// React.memo means this only re-renders if its own props actually change —
// not just because the parent (ModalScreen) re-rendered on every keystroke.
const StationRow = React.memo(function StationRow({
  item,
  isFirst,
  isLast,
  theme,
  onPress,
}: {
  item: string;
  isFirst: boolean;
  isLast: boolean;
  theme: ReturnType<typeof useAppTheme>;
  onPress: (item: string) => void;
}) {
  return (
    <Card
      mode="contained"
      style={{
        marginBottom: 3,
        padding: 10,
        backgroundColor: theme.colors.surfaceContainerHigh,
        borderTopLeftRadius: isFirst ? 28 : 6,
        borderTopRightRadius: isFirst ? 28 : 6,
        borderBottomLeftRadius: isLast ? 28 : 6,
        borderBottomRightRadius: isLast ? 28 : 6,
      }}
      onPress={() => onPress(item)}
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
          <Text variant="bodyMedium" style={{ color: theme.colors.onSurface }}>
            {item}
          </Text>
        </View>
      </Card.Content>
    </Card>
  );
});

const SectionHeader = React.memo(function SectionHeader({
  title,
}: {
  title: string;
}) {
  return (
    <View style={{ marginBottom: 5 }}>
      <Text style={{ margin: 10 }} variant="titleMedium">
        {title}
      </Text>
    </View>
  );
});

export default function ModalScreen() {
  const theme = useAppTheme();
  const { homeStation, setHomeStation, workStation, setWorkStation } =
    usePrefStore();
  const locationEnabled = usePrefStore((state) => state.locationEnabled);

  const scale = useSharedValue(1);
  const scale2 = useSharedValue(1);
  const animStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));
  const animStyle2 = useAnimatedStyle(() => ({
    transform: [{ scale: scale2.value }],
  }));
  const [searchPhrase, setPhrase] = useState("");
  const [searchv, setSearchv] = useState<DisplayValue>("flex");
  const [plannerv, setPlannerv] = useState<DisplayValue>("none");
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
  const [location, setLocation] = useState<{ lat: number; lon: number } | null>(
    null,
  );
  const [nearest, setNearest] = useState<NearestStationResult | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [presetPickerTarget, setPresetPickerTarget] = useState<
    "home" | "work" | null
  >(null);
  const [presetSearchPhrase, setPresetSearchPhrase] = useState("");

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

  const handleStationSelect = useCallback(
    (item: string) => {
      if (editingMode === "start") {
        Haptics.selectionAsync();
        setStartStation(item);
        setStartsel(true);
        setEditingMode(null);
        setSearchv("none");
        setPlannerv("flex");
      } else if (editingMode === "final") {
        Haptics.selectionAsync();
        setFinalStation(item);
        setFinalsel(true);
        setEditingMode(null);
        setSearchv("none");
        setPlannerv("flex");
      } else {
        ToastAndroid.show(
          "First pick a endpoint to change",
          ToastAndroid.SHORT,
        );
      }
    },
    [editingMode],
  );

  const presetSections = useMemo(() => {
    const query = presetSearchPhrase.trim().toLowerCase();
    if (!query) return initialSections;

    return initialSections
      .map((section) => ({
        ...section,
        data: section.data.filter((station) =>
          station.toLowerCase().includes(query),
        ),
      }))
      .filter((section) => section.data.length > 0);
  }, [presetSearchPhrase]);

  const handlePresetStationSelect = (
    target: "home" | "work",
    station: string | null,
  ) => {
    if (!station) {
      setPresetSearchPhrase("");
      setPresetPickerTarget(target);
      return;
    }

    handleStationSelect(station);
  };

  const handlePresetStationSave = (station: string) => {
    if (presetPickerTarget === "home") {
      setHomeStation(station);
    } else if (presetPickerTarget === "work") {
      setWorkStation(station);
    }

    setPresetPickerTarget(null);
    setPresetSearchPhrase("");
    handleStationSelect(station);
  };

  const startStationsel = () => {
    Haptics.selectionAsync();
    setEditingMode("start");
    setPlannerv("none");
    setSearchv("flex");
    setPhrase("");
    setFilteredSections(initialSections);
  };

  const finalStationsel = () => {
    Haptics.selectionAsync();
    setEditingMode("final");
    setPlannerv("none");
    setSearchv("flex");
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
      setPlannerv("flex");
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
          setErrorMsg(strings.common.locationPermissionDenied);
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
        const message =
          error instanceof Error
            ? `${strings.common.error}: ${error.message}`
            : strings.common.error;
        setErrorMsg(message);
        ToastAndroid.show(message, ToastAndroid.SHORT);
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
        setSearchv("flex");
        setPhrase("");
        setFilteredSections(initialSections);
      }, 50);
    }
  }, [startsel]);

  // ---- Stabilized list callbacks ----
  // useCallback keeps these function references stable across re-renders
  // (e.g. every keystroke in the search bar), so SectionList/VirtualizedList
  // doesn't treat every render as "everything changed."
  const renderItem = useCallback(
    ({
      item,
      index,
      section,
    }: {
      item: string;
      index: number;
      section: { data: string[] };
    }) => (
      <StationRow
        item={item}
        isFirst={index === 0}
        isLast={index === section.data.length - 1}
        theme={theme}
        onPress={handleStationSelect}
      />
    ),
    [theme, handleStationSelect],
  );

  const renderSectionHeader = useCallback(
    ({ section }: { section: { title: string } }) => (
      <SectionHeader title={section.title} />
    ),
    [],
  );

  const keyExtractor = useCallback(
    (item: string, idx: number) => item + idx,
    [],
  );

  // ---- Memoized list header ----
  // This block only needs to change when these specific things change —
  // not on every keystroke, which was happening before since it lived
  // inline in the SectionList JSX and got rebuilt on every render.
  const listHeader = useMemo(
    () => (
      <View>
        <View>
          {!locationEnabled ? (
            <Card
              style={{
                backgroundColor: theme.colors.errorContainer,
                flex: 1,
                marginTop: 12,
                paddingLeft: 5,
                borderRadius: 18,
              }}
              mode="contained"
              onPress={() => router.push("/settings" as any)}
            >
              <Card.Content
                style={{
                  flexDirection: "row",
                  gap: 15,
                  alignItems: "center",
                }}
              >
                <Icon
                  color={theme.colors.onErrorContainer}
                  source="crosshairs-off"
                  size={26}
                />
                <View style={{ flex: 1 }}>
                  <Text
                    variant="labelSmall"
                    style={{ color: theme.colors.onErrorContainer }}
                  >
                    {strings.planner.nearestStation}
                  </Text>
                  <Text
                    variant="titleMedium"
                    style={{ color: theme.colors.onErrorContainer }}
                  >
                    {strings.common.locationPermissionDenied}
                  </Text>
                </View>
                <Icon
                  color={theme.colors.onErrorContainer}
                  source="chevron-right"
                  size={20}
                />
              </Card.Content>
            </Card>
          ) : editingMode === "start" ? (
            <Card
              style={{
                backgroundColor: theme.colors.primaryContainer,
                flex: 1,
                marginTop: 12,
                paddingLeft: 5,
                borderRadius: 18,
              }}
              mode="contained"
              onPress={() => {
                if (!isLoading && nearest?.nearestStation) {
                  handleStationSelect(nearest.nearestStation.stop_name);
                }
              }}
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
                    {strings.planner.nearestStation}
                  </Text>
                  {isLoading ? (
                    <Text
                      variant="titleMedium"
                      style={{
                        color: theme.dark
                          ? theme.colors.onPrimaryContainer
                          : theme.colors.primary,
                      }}
                    >
                      {strings.common.searching}
                    </Text>
                  ) : (
                    <Text
                      variant="titleMedium"
                      style={{
                        color: theme.dark
                          ? theme.colors.onPrimaryContainer
                          : theme.colors.primary,
                      }}
                    >
                      {nearest?.nearestStation?.stop_name ??
                        strings.planner.noResults}
                    </Text>
                  )}
                </View>
              </Card.Content>
            </Card>
          ) : null}
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
            onPress={() => handlePresetStationSelect("home", homeStation)}
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
            onPress={() => handlePresetStationSelect("work", workStation)}
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
    ),
    [
      editingMode,
      nearest,
      isLoading,
      homeStation,
      workStation,
      theme,
      handleStationSelect,
    ],
  );

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
          sections={filteredSections}
          keyExtractor={keyExtractor}
          ListHeaderComponent={listHeader}
          renderSectionHeader={renderSectionHeader}
          renderItem={renderItem}
          initialNumToRender={10}
          removeClippedSubviews={true}
          maxToRenderPerBatch={12}
          windowSize={10}
          updateCellsBatchingPeriod={50}
        />
      </View>
      <Portal>
        <Dialog
          style={{ backgroundColor: theme.colors.surface, borderRadius: 28 }}
          visible={presetPickerTarget !== null}
          onDismiss={() => {
            setPresetPickerTarget(null);
            setPresetSearchPhrase("");
          }}
        >
          <Dialog.Title
            style={{ marginTop: 28, textAlign: "center", fontSize: 22 }}
          >
            {presetPickerTarget === "home"
              ? "Set Home Station"
              : "Set Work Station"}
          </Dialog.Title>
          <Dialog.Content>
            <Searchbar
              value={presetSearchPhrase}
              onChangeText={setPresetSearchPhrase}
              mode="bar"
              placeholder="Search station"
              style={{
                marginBottom: 12,
                backgroundColor: theme.colors.elevation.level1,
              }}
            />
            <SectionList
              sections={presetSections}
              keyExtractor={(item, index) => `${item}-${index}`}
              style={{ maxHeight: 360 }}
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={false}
              renderSectionHeader={({ section }) => (
                <Text
                  variant="labelSmall"
                  style={{
                    color: theme.colors.onSurfaceVariant,
                    marginTop: 10,
                    marginBottom: 6,
                  }}
                >
                  {section.title}
                </Text>
              )}
              renderItem={({ item, index, section }) => {
                const selected =
                  presetPickerTarget === "home"
                    ? homeStation === item
                    : workStation === item;

                return (
                  <Pressable onPress={() => handlePresetStationSave(item)}>
                    <View
                      style={{
                        backgroundColor: selected
                          ? theme.colors.secondaryContainer
                          : theme.colors.elevation.level1,
                        paddingHorizontal: 18,
                        paddingVertical: 18,
                        borderTopLeftRadius: index === 0 ? 22 : 6,
                        borderTopRightRadius: index === 0 ? 22 : 6,
                        borderBottomLeftRadius:
                          index === section.data.length - 1 ? 22 : 6,
                        borderBottomRightRadius:
                          index === section.data.length - 1 ? 22 : 6,
                        marginBottom: 3,
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 12,
                      }}
                    >
                      <Text
                        variant="bodyMedium"
                        style={{
                          flex: 1,
                          color: selected
                            ? theme.colors.onSecondaryContainer
                            : theme.colors.onSurface,
                        }}
                      >
                        {item}
                      </Text>
                      {selected && (
                        <Icon
                          source="check-circle"
                          size={20}
                          color={theme.colors.onSecondaryContainer}
                        />
                      )}
                    </View>
                  </Pressable>
                );
              }}
            />
          </Dialog.Content>
          <Dialog.Actions
            style={{
              justifyContent: "center",
              paddingBottom: 16,
              paddingHorizontal: 24,
            }}
          >
            <Button
              style={{ width: "100%" }}
              mode="contained-tonal"
              onPress={() => {
                setPresetPickerTarget(null);
                setPresetSearchPhrase("");
              }}
            >
              {strings.common.cancel}
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </Surface>
  );
}
