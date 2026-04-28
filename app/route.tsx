import { StyleSheet, View, SafeAreaView } from "react-native";
import { useState, useRef } from "react";
import { useTheme, Text, Button, Surface } from "react-native-paper";
import { WebView } from "react-native-webview";

// 1. Import your local routing engine
import { calculateRoute } from "../utils/metroRouting";
import { useLocalSearchParams } from "expo-router";

export default function RoutePlanScreen() {
  const webviewRef = useRef(null);
  const theme = useTheme();

  // 2. Set up state for your logic
  const [isMapReady, setIsMapReady] = useState(false);
  const [routeData, setRouteData] = useState(null);

  const { start, end } = useLocalSearchParams();
  const [fromStation, setFromStation] = useState(start || "Preet Vihar");
  const [toStation, setToStation] = useState(end || "Mandi House");

  // 3. The Core Function: Triggered when user wants to find a route
  const handleFindRoute = () => {
    // Run the BFS algorithm locally! Instant and offline.
    const result = calculateRoute(fromStation, toStation);

    if (result.error) {
      console.error(result.error);
      return;
    }

    // Save it to state so React Native can render the journey cards
    setRouteData(result);

    // Send it to the WebView so Svelte can draw the SVG path
    if (isMapReady && webviewRef.current) {
      webviewRef.current.postMessage(JSON.stringify(result));
    }
  };

  // 4. Handle the Bridge handshake
  const handleWebViewMessage = (event) => {
    const message = event.nativeEvent.data;
    if (message === "READY") {
      setIsMapReady(true);

      // Auto-calculate the default route immediately!
      const initialRoute = calculateRoute(fromStation, toStation);
      if (!initialRoute.error) {
        setRouteData(initialRoute);
        webviewRef.current.postMessage(JSON.stringify(initialRoute));
      }
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      {/* --- BACKGROUND MAP --- */}
      <View style={{ flex: 1 }}>
        <WebView
          ref={webviewRef}
          source={require("../assets/routemap/index.html")}
          onMessage={handleWebViewMessage}
          style={{ flex: 1, backgroundColor: "transparent" }}
          // ADD THESE TWO PROPS:
          originWhitelist={["*"]}
          allowFileAccess={true}
        />
      </View>

      {/* --- FOREGROUND UI (Bottom Sheet style) --- */}
      <Surface
        style={[
          styles.bottomSheet,
          { backgroundColor: theme.colors.elevation.level2 },
        ]}
      >
        {/* Input Simulation */}
        <Text variant="titleMedium" style={{ marginBottom: 16 }}>
          {fromStation} → {toStation}
        </Text>

        <Button
          mode="contained"
          onPress={handleFindRoute}
          disabled={!isMapReady} // Prevent calculating before map loads
        >
          Calculate Route
        </Button>

        {/* Display React Native UI based on the calculation */}
        {routeData && (
          <View style={{ marginTop: 24 }}>
            <Text variant="headlineSmall">Journey Summary</Text>
            <Text variant="bodyLarge">Total Stops: {routeData.stops}</Text>
            <Text variant="bodyLarge">
              Interchanges: {routeData.transferStations.length}
            </Text>
          </View>
        )}
      </Surface>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  bottomSheet: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    padding: 24,
    minHeight: "40%",
  },
});
