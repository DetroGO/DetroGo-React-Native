import { View, StyleSheet } from "react-native";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { useIsFocused } from "@react-navigation/native";
import * as Location from "expo-location";
import { useMemo, useEffect } from "react";
import { findNearestStation } from "@/utils/nearestStation";
import { useNearestStationStore } from "@/store/useNearestStationStore";
import stations from "@/cities/delhi/stationsdata.json";
import ReanimatedLib,{ useAnimatedStyle, useSharedValue } from "react-native-reanimated";
import { useAppTheme } from "@/hooks/useAppTheme";
import { Pressable, Image, RefreshControl, useWindowDimensions, Animated } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import React from "react";
import * as Haptics from "expo-haptics";
import { useRef, useCallback } from "react";
import { useOnboardingStore } from "@/store/onboarding";
import { RecentTrip, SavedRoute } from "@/types/route";
import { useState } from "react";
import { useRecentTripsStore } from "@/store/recentTrips";
import { useBookmarksStore } from "@/store/savedRoutes";
import { strings } from "@/constants/strings";
import {
  Button,
  Text,
  Icon,
  IconButton,
  Card,
  FAB,
  Portal,
  Dialog,
  Divider
} from "react-native-paper";
import {
  Camera,
  GeoJSONSource,
  UserLocation,
  Layer,
  Map,
} from "@maplibre/maplibre-react-native";

import SearchBar from "@/components/ui/searchbar";
import { Svg, Path } from "react-native-svg";
import { router } from "expo-router";
import { CITIES, CityConfig } from "@/cities/index";
import { LINES } from "@/cities/delhi/shapes";
import { STATIONS } from "@/cities/delhi/stationshapes";
import { usePrefStore } from "@/store/usePrefStore";

const RecentCard = ({
  index,
  item,
  total,
}: {
  index: number;
  item: RecentTrip;
  total: number;
}) => {
  const theme = useAppTheme();
  return (
    <Card
      mode="contained"
      style={{
        backgroundColor: theme.dark
          ? theme.colors.surfaceContainerLow
          : theme.colors.elevation.level2,
        marginBottom: 2.8,
        borderTopLeftRadius: index === 0 ? 24 : 6,
        borderTopRightRadius: index === 0 ? 24 : 6,
        borderBottomLeftRadius: index === total - 1 ? 24 : 6,
        borderBottomRightRadius: index === total - 1 ? 24 : 6,
      }}
      onPress={() =>
        router.push({
          pathname: "/route",
          params: { start: item.from, end: item.to },
        })
      }
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
        <View
          style={{
            width: 50,
            height: 50,
            backgroundColor: theme.dark
              ? theme.colors.surfaceContainerHigh
              : theme.colors.elevation.level5,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 17,
          }}
        >
          <Icon
            source="source-commit"
            size={30}
            color={theme.colors.onSurfaceVariant}
          />
          {/*<Text variant="titleLarge" style={{ color: theme.colors.onSurface }}>
            {item.stops + 1}
          </Text>*/}
        </View>
        <View style={{ flex: 1 }}>
          <Text maxFontSizeMultiplier={1.2} numberOfLines={1} variant="bodyMedium" style={{ color: theme.colors.onSurface }}>
            {item.from}
          </Text>
          <Text
            maxFontSizeMultiplier={1.2}
            numberOfLines={1}
            variant="labelSmall"
            style={{ color: theme.colors.onSurfaceVariant, marginTop: 1 }}
          >
            {item.to}
          </Text>
        </View>
      </Card.Content>
    </Card>
  );
};

const BookmarkCard = ({ item }: { item: SavedRoute }) => {
  const theme = useAppTheme();
  return (
    <Pressable
      onPress={() =>
        router.push({
          pathname: "/route",
          params: { start: item.from, end: item.to },
        })
      }
    >
      <Card
        mode="contained"
        style={{
          width: 220,
          padding: 4,
          backgroundColor: theme.colors.elevation.level1,
          borderRadius: 20,
          marginBottom: 12,
        }}
      >
        <Card.Content style={{ paddingTop: 16, paddingHorizontal: 16 }}>
          <Text
            maxFontSizeMultiplier={1.2}
            numberOfLines={1}

            variant="labelLarge"
            style={{ color: theme.colors.onSurfaceVariant, opacity: 0.7 }}
          >
            {item.from}
          </Text>
          <Text
            variant="titleMedium"
            style={{
              color: theme.colors.secondary,
              marginTop: 4,
              marginBottom: 12,
            }}
            maxFontSizeMultiplier={1.2}

            numberOfLines={1}
          >
            {item.to}
          </Text>
          <View style={{ flexDirection: "row", gap: 10 }}>
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 4 }}
            >
              <Icon
                source="subway-variant"
                size={16}
                color={theme.colors.onSurfaceVariant}
              />
              <Text
                maxFontSizeMultiplier={1}
                numberOfLines={1}
                ellipsizeMode="tail"
                variant="labelMedium"
                style={{ color: theme.colors.onSurfaceVariant }}
              >
                {item.stops} {strings.common.stops}
              </Text>
            </View>
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 4 }}
            >
              <Icon
                source="transit-transfer"
                size={16}
                color={theme.colors.onSurfaceVariant}
              />
              <Text
                variant="labelMedium"
                maxFontSizeMultiplier={1}
                numberOfLines={1}
                ellipsizeMode="tail"
                style={{ color: theme.colors.onSurfaceVariant }}
              >
                {item.transfers} {strings.common.transfers}
              </Text>
            </View>
          </View>
        </Card.Content>
      </Card>
    </Pressable>
  );
};

const SystemCards = ({ index, item }: { index: number; item: CityConfig }) => {
  const theme = useAppTheme();
  return (
    <Card
      mode="elevated"
      elevation={0}
      style={{
        marginBottom: 3,
        backgroundColor: item.selected
          ? theme.colors.secondaryContainer
          : theme.colors.elevation.level1,
        borderTopLeftRadius: index === 0 ? 24 : 6,
        borderTopRightRadius: index === 0 ? 24 : 6,
        borderBottomLeftRadius: index === CITIES.length - 1 ? 24 : 6,
        borderBottomRightRadius: index === CITIES.length - 1 ? 24 : 6,
      }}
      onPress={() => {
        item.selected = true;
      }}
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
        <View
          style={{
            width: 50,
            height: 50,
            backgroundColor: theme.colors.secondary,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 17,
          }}
        >
          <Image
            source={{
              uri: item.logo,
            }}
            style={{
              width: 30,
              height: 30,
              tintColor: theme.colors.primaryContainer,
            }}
          />
        </View>
        <View style={{ flex: 1 }}>
          <Text  maxFontSizeMultiplier={1.2}
          numberOfLines={1} variant="bodyMedium" style={{ color: theme.colors.onSurface }}>
            {item.name}
          </Text>
          <Text
            variant="labelSmall"
            maxFontSizeMultiplier={1.2}
            numberOfLines={1}
            style={{
              color: theme.colors.onSurfaceVariant,
              marginTop: 1,
            }}
          >
            {item.companies}
          </Text>
        </View>
        {/*<View
        style={{
          padding: 8,
          backgroundColor: theme.colors.secondaryContainer,
          borderRadius: 18,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Icon
          source="chevron-right"
          size={18}
          color={theme.colors.onSurfaceVariant}
        />
      </View>*/}
      </Card.Content>
    </Card>
  );
};

// Empty state component — define OUTSIDE your screen function
function useSpringPress() {
  const scale = useRef(new Animated.Value(1)).current;
  const onPressIn = useCallback(() => {
    Animated.spring(scale, {
      toValue: 0.88,
      useNativeDriver: true,
      tension: 300,
      friction: 20,
    }).start();
  }, [scale]);
  const onPressOut = useCallback(() => {
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
      tension: 300,
      friction: 15,
    }).start();
  }, [scale]);
  return { scale, onPressIn, onPressOut };
}

function ActionButton({
  onPress,
  label,
  color,
  hidden,
  size,
}: {
  onPress: () => void;
  label: string;
  color: string;
  hidden?: boolean;
  size?: string;
}) {
  const theme = useAppTheme();
  const scale = React.useRef(new Animated.Value(1)).current;
  const hasSeenTutorial = useOnboardingStore((state) => state.hasSeenTutorial);

  const handlePressIn = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    Animated.spring(scale, {
      toValue: 0.95,
      useNativeDriver: true,
      tension: 300,
      friction: 20,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
      tension: 300,
      friction: 20,
    }).start();
  };

  return (
    <Animated.View
      style={{
        display: hidden ? "none" : "flex",
        transform: [{ scale }],
        width: "100%",
      }}
    >
      <Pressable
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={onPress}
        style={({ pressed }) => [
          {
            height:
              size === "large"
                ? 64
                : size === "small"
                  ? 30
                  : size === "medium"
                    ? 56
                    : 56, // Tall, luxurious button height
            borderRadius: 32, // Fully rounded pill shape
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: color,
            opacity: pressed ? 0.9 : 1,
          },
        ]}
      >
        <Text
          maxFontSizeMultiplier={1.2}
          numberOfLines={1}
          variant={
            size === "large"
              ? "titleMedium"
              : size === "small"
                ? "bodySmall"
                : "titleSmall"
          }
          style={{
            color:
              size === "large"
                ? theme.colors.onPrimaryContainer
                : size === "small"
                  ? theme.colors.secondary
                  : theme.colors.onPrimaryContainer,
            fontWeight: "600",
          }}
        >
          {label}
        </Text>
      </Pressable>
    </Animated.View>
  );
}

function EmptyRoutesState({
  theme,
  onTakeTour,
  onPlanTrip,
}: {
  theme: ReturnType<typeof useAppTheme>;
  onTakeTour: () => void;
  onPlanTrip: () => void;
}) {
  const tourSpring = useSpringPress();
  const planSpring = useSpringPress();
  const hasSeenTutorial = useOnboardingStore((state) => state.hasSeenTutorial);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

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
      } catch (error) {
        setErrorMsg(strings.common.locationPermissionDenied);
        setIsLoading(false);
      }
    })();
  }, []);

  return (
    <View style={styles.cont1}>
      <View style={styles.graphicContainer}></View>
      <View style={styles.cont2}>
        <View style={styles.versionContainer}>
          <Text
            maxFontSizeMultiplier={1.2}

            variant="displayMedium"
            style={{
              color: theme.colors.onSurfaceVariant,
              fontWeight: "semibold",

              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
            }}
          >
            {hasSeenTutorial ? strings.home.getStarted : strings.home.try}
          </Text>
        </View>
        <Text
          maxFontSizeMultiplier={1.2}

          variant="labelSmall"
          style={{
            color: theme.colors.outline,
            textAlign: "center",
            width: 260,
            marginTop: 10,
          }}
        >
          {hasSeenTutorial
            ? strings.home.getStartedDesc
            : strings.home.startbysearch}
        </Text>
      </View>

      {/* BOTTOM ACTION SECTION */}
      <View style={styles.footer}>
        <ActionButton
          label={strings.home.takeTour}
          color={theme.colors.primaryContainer}
          hidden={hasSeenTutorial}
          size="large"
          onPress={onTakeTour}
        />
        <ActionButton
          label={strings.home.openPlanner}
          color={hasSeenTutorial ? theme.colors.surfaceBright : "transparent"}
          size={hasSeenTutorial ? "large" : "small"}
          onPress={onPlanTrip}
        />
      </View>
    </View>
  );
}

const DELHI_CENTER: [number, number] = [77.2195, 28.6329];

export default function HomeScreen() {
  const theme = useAppTheme();
  const isFocused = useIsFocused();

  const language = usePrefStore((state) => state.language);
  const bottomSheetRef = useRef<BottomSheet>(null);
  const animatedPosition = useSharedValue(0); // distance from top of screen to top of sheet
  const { height: screenHeight } = useWindowDimensions();
  const screenWidth = useWindowDimensions().width;
  const FAB_GAP = 95; // space between FAB and sheet top edge
  const lastKnownCoords = useRef<[number, number] | null>(null);
  const [snapPoints, setSnapPoints] = useState([70, 240, 420]);
  const hasSeenTutorial = useOnboardingStore((state) => state.hasSeenTutorial);
  const [visible, setVisible] = useState(false);
  const recentTrips = useRecentTripsStore((state) => state.recentTrips);
  const bookmarks = useBookmarksStore((state) => state.bookmarks);
  const showDialog = () => setVisible(true);
  const locationEnabled = usePrefStore((state) => state.locationEnabled);

  const hideDialog = () => setVisible(false);
  const [refreshing, setRefreshing] = React.useState(false);

  const cameraRef = useRef<any>(null);
  const hasFocusedUser = useRef(false);
  // const hasCentered = useRef(false);
  // const [initialCenter, setInitialCenter] =
  //   useState<[number, number]>(DELHI_CENTER);
  // const [initialZoom, setInitialZoom] = useState(10.5);

  const [tracking, setTracking] = useState<"default" | undefined>(undefined);
  const setNearestStation = useNearestStationStore(
    (state) => state.setNearestStation,
  );
  const nearestStation = useNearestStationStore((state) => state.nearestStation);
  const distanceKm = useNearestStationStore((state) => state.distanceKm);

  useEffect(() => {
    (async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();

        if (status !== "granted") return;

        const location = await Location.getCurrentPositionAsync();

        const result = findNearestStation(
          location.coords.latitude,
          location.coords.longitude,
          stations,
        );



        if (result.nearestStation) {
          setNearestStation(result.nearestStation, result.distanceKm);

        }

      } catch (error) {
        console.log("[nearestStation] FAILED:", error); // <-- was silently eaten before
      }
    })();
  }, []);

  useEffect(() => {
    if (locationEnabled) {
      if (nearestStation) {
        setSnapPoints([100, 320]);
      } else {
        setSnapPoints([70, 240, 420]);
      }
    }
    else {
      setSnapPoints([70, 240, 420]);
    }


  }, [nearestStation, locationEnabled]);

  const [popup, setPopup] = useState<string | null>(null);


  // Spring FAB
  const fabScale = useRef(new Animated.Value(1)).current;

  const fabRadius = fabScale.interpolate({
    inputRange: [0.88, 1],
    outputRange: [14, 28],
  });
  const fabAnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateY: animatedPosition.value > 190 ? animatedPosition.value - screenHeight + FAB_GAP : 0 },
    ],

  }));

  const onFabIn = () =>
    Animated.spring(fabScale, {
      toValue: 0.88,
      useNativeDriver: false,
      tension: 300,
      friction: 20,
    }).start();

  const onFabOut = () =>
    Animated.spring(fabScale, {
      toValue: 1,
      useNativeDriver: false,
      tension: 300,
      friction: 15,
    }).start();

  // Locate Me
  const locateMe = async () => {
    const { status } = await Location.getForegroundPermissionsAsync();
    if (status !== "granted") {
      // just fly to Delhi center, don't crash
      cameraRef.current?.flyTo({
        center: DELHI_CENTER,
        zoom: 11,
        duration: 1200,
      });
      return;
    }
    setTracking("default");
    const target = lastKnownCoords.current ?? DELHI_CENTER;
    cameraRef.current?.flyTo({ center: target, zoom: 15, duration: 1200 });
  };


  // Station popup
  const onStationPress = (e: any) => {
    const name = e?.features?.[0]?.properties?.name;

    if (name) {
      setPopup(name);

      setTimeout(() => {
        setPopup(null);
      }, 3000);
    }
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.searchWrapper}>
        <SearchBar
          onPress={() => router.push("/planner")}
          hint={strings.home.searchbar}
        />
      </View>
      {isFocused && (
        <Map
          style={styles.map}
          mapStyle={
            theme.dark
              ? "https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json"
              : "https://tiles.basemaps.cartocdn.com/gl/positron-gl-style/style.json"
          }
          logoEnabled={false}
          attributionEnabled={false}
          compassPosition={{ top: 420, right: 16 }}
          onRegionWillChange={() => {
            // Stop tracking when user manually moves map
            if (tracking) {
              setTracking(undefined);
            }
          }}
        >
          {/* User location */}
          <UserLocation
            visible={locationEnabled}
            minDisplacement={20}
            onUpdate={(location) => {
              const coords: [number, number] = [
                location.coords.longitude,
                location.coords.latitude,
              ];
              lastKnownCoords.current = coords;

              const result = findNearestStation(
                location.coords.latitude,
                location.coords.longitude,
                stations,
              );
              if (result.nearestStation) {
                setNearestStation(result.nearestStation, result.distanceKm);
              }

              if (!hasFocusedUser.current && cameraRef.current) {
                hasFocusedUser.current = true;
                cameraRef.current.flyTo({
                  center: coords,
                  zoom: 15,
                  duration: 1800,
                });
              }
            }}
          />
          {/* Camera */}
          <Camera
            ref={cameraRef}
            maxZoom={15}
            trackUserLocation={tracking}
            initialViewState={{
              center: DELHI_CENTER,
              zoom: 10.8,
            }}
          />

          {/* Metro lines */}
          <GeoJSONSource id="lines" data={LINES} onPress={onStationPress}>
            <Layer
              id="lines-layer"
              type="line"
              paint={{
                "line-color": ["get", "stroke"],
                "line-width": [
                  "interpolate",
                  ["linear"],
                  ["zoom"],
                  6,
                  3.5,
                  11,
                  2.5,
                  14,
                  4.5,
                ],
                "line-opacity": 0.95,
              }}
              layout={{
                "line-cap": "round",
                "line-join": "round",
              }}
            />
          </GeoJSONSource>

          {/* Stations */}
          <GeoJSONSource id="stations" data={STATIONS}>
            {/* Interchange */}
            <Layer
              id="interchange-layer"
              type="circle"
              filter={["==", ["get", "interchange"], 1]}
              paint={{
                "circle-radius": [
                  "interpolate",
                  ["linear"],
                  ["zoom"],
                  6,
                  3.5,
                  11,
                  5,
                  14,
                  8,
                ],
                "circle-color": "#ffffff",
                "circle-stroke-width": 1.5,
                "circle-stroke-color": "#555555",
              }}
            />

            {/* Regular */}
            <Layer
              id="regular-layer"
              type="circle"
              filter={["==", ["get", "interchange"], 0]}
              minZoomLevel={10}
              paint={{
                "circle-radius": [
                  "interpolate",
                  ["linear"],
                  ["zoom"],
                  8,
                  1.5,
                  11,
                  3,
                  14,
                  5,
                ],
                "circle-color": "#bbbbbb",
                "circle-opacity": 0.8,
              }}
            />

            {/* Station name labels - interchange stations */}
            <Layer
              id="interchange-labels"
              type="symbol"
              filter={["==", ["get", "interchange"], 1]}
              minZoomLevel={11}
              layout={{
                "text-field": ["get", "name"],
                "text-size": [
                  "interpolate",
                  ["linear"],
                  ["zoom"],
                  11,
                  10,
                  14,
                  13,
                ],
                "text-offset": [0, 1.4],
                "text-anchor": "top",
                "text-max-width": 8,
                "text-font": ["Noto Sans Regular"],
              }}
              paint={{
                "text-color": theme.dark ? "#ffffff" : "#111111",
                "text-halo-color": theme.dark ? "#000000" : "#ffffff",
                "text-halo-width": 1.5,
              }}
            />

            {/* Station name labels - regular stations, only at high zoom */}
            <Layer
              id="regular-labels"
              type="symbol"
              filter={["==", ["get", "interchange"], 0]}
              minZoomLevel={13}
              layout={{
                "text-field": ["get", "name"],
                "text-size": [
                  "interpolate",
                  ["linear"],
                  ["zoom"],
                  13,
                  9,
                  15,
                  12,
                ],
                "text-offset": [0, 1.2],
                "text-anchor": "top",
                "text-max-width": 8,
                "text-font": ["Noto Sans Regular"],
              }}
              paint={{
                "text-color": theme.dark ? "#cccccc" : "#333333",
                "text-halo-color": theme.dark ? "#000000" : "#ffffff",
                "text-halo-width": 1.5,
              }}
            />
          </GeoJSONSource>
        </Map>
      )}

      <View style={{ display:"contents", backgroundColor:"transparent" }}>
      <ReanimatedLib.View style={[styles.fab, fabAnimatedStyle]}>
        <Animated.View style={{ transform: [{ scale: fabScale }] }}>
          <Pressable onPressIn={onFabIn} onPressOut={onFabOut} onPress={locateMe}>
            <Animated.View
              style={[
                styles.fabInner,
                {
                  backgroundColor: theme.colors.secondaryContainer,
                  borderRadius: fabRadius,
                },
              ]}
            >
              <IconButton icon="crosshairs-gps" size={22} iconColor={theme.colors.onSecondaryContainer} />
            </Animated.View>
          </Pressable>
        </Animated.View>
      </ReanimatedLib.View>
        <BottomSheet
          ref={bottomSheetRef}
          index={1}

          snapPoints={snapPoints}
          animatedPosition={animatedPosition}
          style={{ zIndex: 10 }}
          backgroundStyle={{
            backgroundColor: theme.dark
              ? theme.colors.surfaceDim
              : theme.colors.surface,
          }}
          handleIndicatorStyle={{
            backgroundColor: theme.colors.outlineVariant,
            width: 40,
          }}
        >
          <BottomSheetScrollView contentContainerStyle={styles.content}>
            {bookmarks.length === 0 && recentTrips.length === 0 ? (
              <View style={{ flex: 1 }}>
                <EmptyRoutesState
                  theme={theme}
                  onTakeTour={() => {
                    Haptics.selectionAsync();
                    router.push("/onboarding");
                  }}
                  onPlanTrip={() => {
                    Haptics.selectionAsync();
                    router.push("/planner");
                  }}
                />
              </View>
            ) : (
              <View style={{ flex: 1 }}>
                <ScrollView
                  style={{
                    backgroundColor: theme.dark
                      ? theme.colors.surfaceDim
                      : theme.colors.surface,
                  }}
                  contentContainerStyle={styles.scroll}
                  showsVerticalScrollIndicator={false}
                  refreshControl={
                    <RefreshControl
                      refreshing={refreshing}
                      onRefresh={onRefresh}
                    />
                  }
                >
                  {/* Header */}

                  <View style={styles.header}>
                    <View
                      style={{
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <View
                        style={{ alignItems: "center", justifyContent: "center" }}
                      >
                        {/*<Button
                      icon="crosshairs-gps"
                      mode="outlined"
                      onPress={() => console.log("Pressed")}
                    >
                      Delhi
                    </Button>*/}
                      </View>
                    </View>
                  </View>

                  {/* Saved Routes */}




                    <View >
                      {nearestStation  && locationEnabled && (
                        <View style={{ marginBottom: 10, }}>
                          <Text maxFontSizeMultiplier={1.2} numberOfLines={1} style={{ fontSize: 10, marginBottom: 1, marginLeft:20, color: theme.colors.secondary }}>
                            {strings.planner.nearestStation}
                          </Text>

                          <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom:15, marginLeft: 20, marginRight:20, }}>
                            <Text  maxFontSizeMultiplier={1.2}
                            numberOfLines={1} style={{ fontSize: 20, fontWeight: "bold", color:theme.colors.onPrimaryContainer }}>
                              {nearestStation?.stop_name}
                            </Text>

                            {/*<Text style={{ fontSize: 20, fontWeight: "bold" }}>
                              10 min
                            </Text>*/}
                          </View>

                          {/*<Divider />*/}
                        </View>

                      )}


                    <View style={{ marginTop: 0, paddingTop: 0, gap: 10 }}>
                      <View
                        style={{
                          marginLeft: 20,
                          display: bookmarks.length > 0 ? "flex" : "none",

                          marginBottom: 0,
                          flexDirection: "row",
                          alignItems: "center",
                        }}
                      >
                        <View
                          style={{
                            flex: 1,
                            flexDirection: "row",
                            alignItems: "center",
                          }}
                        >
                          <Icon
                            source="bookmark-box-multiple"
                            size={24}
                            color={theme.colors.onSurfaceVariant}
                          />
                          <Text  maxFontSizeMultiplier={1.2}
                          numberOfLines={1} style={{ marginLeft: 6 }}>
                            {strings.home.savedRoutes}
                          </Text>
                        </View>
                        <Button
                          style={{
                            width: "auto",
                            marginRight: 12,
                          }}
                          onPress={() =>
                            router.push({
                              pathname: "/listpage",
                              params: { type: "saved" },
                            })
                          }
                        >
                            <Text
                              maxFontSizeMultiplier={1.2}
                              numberOfLines={1}
                            style={{
                              fontSize: 12,
                              color: theme.colors.secondary,
                            }}
                          >
                            {strings.common.viewall}
                          </Text>
                        </Button>
                      </View>
                      {bookmarks.length > 0 ? (
                        <ScrollView
                          horizontal
                          showsHorizontalScrollIndicator={false}
                          nestedScrollEnabled
                          contentContainerStyle={{
                            paddingHorizontal: 16,
                            gap: 10,
                          }}
                        >
                          {bookmarks.map((route, index) => (
                            <BookmarkCard key={route.id} item={route} />
                          ))}
                        </ScrollView>
                      ) : (
                        <View
                          style={{
                            display: "flex",
                            alignItems: "center",
                            padding: 15,

                            justifyContent: "center",
                            flex: 1,
                          }}
                        >
                          <View
                            style={{
                              flexDirection: "row",
                              alignItems: "center",
                              backgroundColor: theme.colors.surfaceContainerLow,
                              padding: 16,
                              margin: 2,
                              borderRadius: 24,
                            }}
                          >
                            <Icon
                              source="bookmark"
                              size={34}
                              color={theme.colors.outlineVariant}
                            />
                          </View>
                              <Text
                                maxFontSizeMultiplier={1.2}
                                numberOfLines={1}
                            variant="labelLarge"
                            style={{
                              marginLeft: 5,
                              marginTop: 8,
                              color: theme.colors.outlineVariant,
                            }}
                          >
                            {strings.home.noSavedRoutes}
                          </Text>
                              <Text
                                maxFontSizeMultiplier={1.2}

                            variant="labelSmall"
                            style={{
                              textAlign: "center",
                              marginTop: 2,
                              color: theme.colors.outlineVariant,
                              width: 250,
                            }}
                          >
                            {strings.home.noSavedRoutesdesc}
                          </Text>
                        </View>
                      )}
                    </View>

                    {/* Recent Trips */}
                    <View style={{ marginTop: 29, paddingHorizontal: 16 }}>
                      <View
                        style={{
                          marginLeft: 5,
                          marginBottom: 14,
                          flexDirection: "row",
                          alignItems: "center",
                        }}
                      >
                        <View
                          style={{
                            flex: 1,
                            flexDirection: "row",
                            alignItems: "center",
                          }}
                        >
                          <Icon
                            source="history"
                            size={24}
                            color={theme.colors.onSurfaceVariant}
                          />
                          <Text  maxFontSizeMultiplier={1.2}
                          numberOfLines={1} style={{ marginLeft: 5 }}>
                            {strings.home.recentTrips}
                          </Text>
                        </View>
                      </View>
                      {recentTrips.length > 0 ? (
                        recentTrips
                          .slice(0, 3)
                          .map((trip, index) => (
                            <RecentCard
                              total={recentTrips.slice(0, 3).length}
                              index={index}
                              item={trip}
                              key={trip.id}
                            />
                          ))
                      ) : (
                        <View
                          style={{
                            alignItems: "center",

                            justifyContent: "center",

                            marginTop: "-35%",
                            flexDirection: "column",
                            height: "100%",
                          }}
                        >
                          <View
                            style={{
                              flexDirection: "row",
                              alignItems: "center",
                              padding: 2,
                              margin: 3,
                              borderRadius: 24,
                            }}
                          >
                            <Icon
                              source="history"
                              size={38}
                              color={theme.colors.outlineVariant}
                            />
                          </View>
                              <Text
                                maxFontSizeMultiplier={1.2}
                                numberOfLines={1}
                            variant="labelLarge"
                            style={{
                              marginLeft: 5,
                              marginTop: 10,
                              color: theme.colors.outlineVariant,
                            }}
                          >
                            {strings.home.noRecentTrips}
                          </Text>
                        </View>
                      )}
                    </View>
                  </View>
                </ScrollView>
                <View
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {recentTrips.length > 3 ? (
                    <Button
                      style={{ width: "90%", padding: 5 }}
                      mode="outlined"
                      onPress={() =>
                        router.push({
                          pathname: "/listpage",
                          params: { type: "recent" },
                        })
                      }
                    >
                        <Text
                          maxFontSizeMultiplier={1.2}
                          numberOfLines={1}
                        style={{
                          fontSize: 16,
                          color: theme.colors.secondary,
                        }}
                      >
                        {strings.common.viewall}
                      </Text>
                    </Button>
                  ) : null}
                </View>
              </View>
            )}
            <Portal>
              <Dialog
                style={{ backgroundColor: theme.colors.surface }}
                visible={visible}
                onDismiss={hideDialog}
              >
                <Dialog.Title style={{ textAlign: "center" }}>
                  {strings.home.selectnet}
                </Dialog.Title>
                <Dialog.Content>
                  {CITIES.map((item, index) => (
                    <SystemCards key={item.id} index={index} item={item} />
                  ))}
                </Dialog.Content>
                <Dialog.Actions style={{ justifyContent: "center" }}>
                  <Button
                    style={{ width: "100%" }}
                    mode="contained-tonal"
                    onPress={hideDialog}
                  >
                    {strings.common.done}
                  </Button>
                </Dialog.Actions>
              </Dialog>
            </Portal>
          </BottomSheetScrollView>
        </BottomSheet>
      </View>


    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { paddingBottom: 40, zIndex: 10 },
  scroll: { paddingBottom: 40, flexGrow: 1 },
  header: { paddingHorizontal: 20, paddingTop: 0, paddingBottom: 8 },
  searchWrapper: {
    position: "absolute",
    top: 0, // Position at the top
    left: 0,
    right: 0,
    height: 70,
    // width: '100%', // Occupy full width
    paddingHorizontal: 20, // Add some horizontal padding
    paddingTop: 50, // Add padding for status bar area
    zIndex: 5, // Ensure it's above the map
  },
  bookmarkCard: { width: 220, borderRadius: 20, padding: 16 },
  bookmarkMeta: { flexDirection: "row", gap: 10 },
  metaChip: { flexDirection: "row", alignItems: "center", gap: 4 },

  cont1: {
    flex: 1,
    paddingHorizontal: 24,
  },
  cont2: {
    alignItems: "center",
  },
  versionContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 12,
    gap: 12,
  },
  versionBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12, // completely rounded pill shape
  },
  graphicContainer: {
    marginTop: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  footer: {
    paddingBottom: 0,
    marginTop: 40,
    alignItems: "center",
    gap: 20,
    width: "100%",
  },
  button: {
    height: 64, // Tall, luxurious button height
    borderRadius: 32, // Fully rounded pill shape
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  fab: {
    position: "absolute",
    bottom: 0,
    alignSelf: "flex-end", // or wherever you want it horizontally
    right: 2,
  },
  fabInner: {
    width: 52,
    height: 52,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
});
