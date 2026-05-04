import React from "react";
import { StyleSheet, View } from "react-native";
import WebView from "react-native-webview";
import { Map } from "@maplibre/maplibre-react-native";

export default function App() {
  return (
    <View style={styles.container}>
      <Map mapStyle="https://basemaps.cartocdn.com/gl/dark-matter-nolabels-gl-style/style.json" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
});
