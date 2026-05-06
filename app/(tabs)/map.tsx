import React from "react";
import { StyleSheet, View } from "react-native";
// Use named imports for MapLibre components
import {
  MapView,
  Camera,
  ShapeSource,
  LineLayer,
} from "@maplibre/maplibre-react-native";
import delhiMetro from "@/constants/delhiMetro.json";

export default function MapScreen() {
  return (
    <View style={styles.container}>
      {/* Use the components directly without the MapLibreGL. prefix */}
      <MapView style={styles.map} logoEnabled={false}>
        <Camera
          defaultSettings={{
            centerCoordinate: [77.209, 28.6139],
            zoomLevel: 10,
          }}
        />

        <ShapeSource id="metro-lines-source" shape={delhiMetro}>
          <LineLayer
            id="metro-lines-layer"
            paint={{
              lineColor: ["get", "stroke"],
              lineWidth: 4,
              lineOpacity: 1,
            }}
            layout={{
              lineJoin: "round",
              lineCap: "round",
            }}
          />
        </ShapeSource>
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
});
