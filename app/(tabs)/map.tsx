import React, { useRef, useState } from "react";
import { Animated, Pressable, StyleSheet, View } from "react-native";

import { IconButton, Text } from "react-native-paper";
import {
  Camera,
  GeoJSONSource,
  UserLocation,
  Layer,
  Map,
} from "@maplibre/maplibre-react-native";
import { useAppTheme } from "@/hooks/useAppTheme";
import SearchBar from "@/components/ui/searchbar";
import { LINES } from "@/cities/delhi/shapes";
import { STATIONS } from "@/cities/delhi/stationshapes";

// ─── Lines GeoJSON ────────────────────────────────────────────────────────────
// All GeometryCollections pre-flattened → plain LineStrings.
// Each feature has a "stroke" property consumed by the Layer paint expression.

// ─── Stations GeoJSON ─────────────────────────────────────────────────────────
// interchange: 1 = interchange, 0 = regular (int avoids filter type issues)

// ─── Legend ───────────────────────────────────────────────────────────────────

const LEGEND = [
  { label: "Yellow", color: "#FFD700" },
  { label: "Blue", color: "#1E88E5" },
  { label: "Red", color: "#E53935" },
  { label: "Violet", color: "#9370DB" },
  { label: "Pink", color: "#F06292" },
  { label: "Magenta", color: "#E040FB" },
  { label: "Green", color: "#43A047" },
  { label: "Orange", color: "#FB8C00" },
  { label: "Aqua", color: "#26C6DA" },
  { label: "Rapid", color: "#015b97" },
];

const DELHI_CENTER: [number, number] = [77.2195, 28.6329];

export default function MapScreen() {
  const theme = useAppTheme();

  const cameraRef = useRef<any>(null);
  const hasFocusedUser = useRef(false);

  const [tracking, setTracking] = useState<"default" | undefined>(undefined);

  const [popup, setPopup] = useState<string | null>(null);

  // Spring FAB
  const fabScale = useRef(new Animated.Value(1)).current;

  const fabRadius = fabScale.interpolate({
    inputRange: [0.88, 1],
    outputRange: [14, 28],
  });

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
  const locateMe = () => {
    setTracking("default");

    cameraRef.current?.flyTo({
      center: DELHI_CENTER,
      zoom: 15,
      duration: 1200,
      easing: "fly",
    });
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

  return (
    <View style={styles.container}>
      {/* Search */}
      <View style={styles.searchBarContainer}>
        <SearchBar onPress={locateMe} hint="Search for a station" />
      </View>

      {/* Map */}
      <Map
        style={styles.map}
        mapStyle={
          theme.dark
            ? "https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json"
            : "https://tiles.openfreemap.org/styles/bright"
        }
        logoEnabled={false}
        attributionEnabled={false}
        compassPosition={{ top: 623, right: 18 }}
        onRegionWillChange={() => {
          // Stop tracking when user manually moves map
          if (tracking) {
            setTracking(undefined);
          }
        }}
      >
        {/* User location */}
        <UserLocation
          visible={true}
          onUpdate={(location) => {
            const coords: [number, number] = [
              location.coords.longitude,
              location.coords.latitude,
            ];

            // Focus user ONCE when GPS resolves
            if (!hasFocusedUser.current && cameraRef.current) {
              hasFocusedUser.current = true;

              cameraRef.current.flyTo({
                center: coords,
                zoom: 15,
                duration: 1800,
                easing: "fly",
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
              "text-size": ["interpolate", ["linear"], ["zoom"], 13, 9, 15, 12],
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

      {/* Popup */}
      {popup && (
        <View
          style={[
            styles.popup,
            {
              backgroundColor: theme.colors.elevation.level1,
            },
          ]}
        >
          <Text
            variant="bodyMedium"
            style={{
              color: theme.colors.onSurface,
            }}
          >
            {popup}
          </Text>
        </View>
      )}

      {/* FAB */}
      <View style={styles.fab}>
        <Animated.View
          style={{
            transform: [{ scale: fabScale }],
          }}
        >
          <Pressable
            onPressIn={onFabIn}
            onPressOut={onFabOut}
            onPress={locateMe}
          >
            <Animated.View
              style={[
                styles.fabInner,
                {
                  backgroundColor: theme.colors.secondaryContainer,
                  borderRadius: fabRadius,
                },
              ]}
            >
              <IconButton
                icon="crosshairs-gps"
                size={22}
                iconColor={theme.colors.onSecondaryContainer}
              />
            </Animated.View>
          </Pressable>
        </Animated.View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, position: "relative" },
  map: { flex: 1 },
  fab: {
    position: "absolute",
    bottom: 32,
    right: 16,
  },
  fabInner: {
    width: 52,
    height: 52,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  legendBtn: {
    position: "absolute",
    top: 52,
    right: 12,
    borderRadius: 12,
    elevation: 4,
  },
  searchBarContainer: {
    position: "absolute",
    top: 0, // Position at the top
    left: 0,
    right: 0,

    height: 70,
    // width: '100%', // Occupy full width
    paddingHorizontal: 20, // Add some horizontal padding
    paddingTop: 50, // Add padding for status bar area
    zIndex: 10, // Ensure it's above the map
  },
  legend: {
    position: "absolute",
    top: 100,
    right: 12,
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 10,
    elevation: 4,
    gap: 6,
  },
  legendRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  legendDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  popup: {
    position: "absolute",
    bottom: 100,
    alignSelf: "center",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    elevation: 6,
  },
});
