import React from "react";
import { StyleSheet, View } from "react-native";
import { Map } from "@maplibre/maplibre-react-native";

export default function MapScreen() {
  return (
    <View style={styles.container}>
      {/* Use the components directly without the MapLibreGL. prefix */}
      <Map
        mapStyle="https://basemaps.cartocdn.com/gl/dark-matter-nolabels-gl-style/style.json"
        initialZoomLevel={10}
        initialCenterCoordinate={[77.209, 28.6139]}
        style={styles.map}
        logoEnabled={false}
      ></Map>
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
