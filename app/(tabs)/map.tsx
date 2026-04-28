import React from "react";

import { StyleSheet, View } from "react-native";
import WebView from "react-native-webview";

export default function App() {
  return (
    <View style={styles.container}>
      <WebView
        source={{ uri: "https://detroweb.vercel.app/map" }}
        style={styles.map}
      />
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
