import { StyleSheet, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

import { SafeAreaView } from "react-native-safe-area-context";
import { useState, useRef } from "react";
import {
  Text,
  Button,
  Surface,
  Icon,
  Card,
  IconButton,
} from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";
import { useAppTheme } from "@/hooks/useAppTheme";
import { WebView } from "react-native-webview";

// 1. Import your local routing engine
import { calculateRoute } from "../utils/metroRouting";
import { useLocalSearchParams } from "expo-router";

export default function RoutePlanScreen() {
  const webviewRef = useRef(null);
  const theme = useAppTheme();

  // 2. Set up state for your logic
  const [isMapReady, setIsMapReady] = useState(false);
  const [currentStation, setCurrentStation] = useState("");

  const [routeData, setRouteData] = useState(null);

  const { start, end } = useLocalSearchParams<{ start: string; end: string }>();
  const [fromStation, setFromStation] = useState(start ?? "Preet Vihar");
  const [toStation, setToStation] = useState(end ?? "Mandi House");

  // 3. The Core Function: Triggered when user wants to find a route
  const handleFindRoute = (from = fromStation, to = toStation) => {
    const result = calculateRoute(from, to);
    if (result.error) {
      console.error(result.error);
      return;
    }
    setRouteData(result);
    if (isMapReady && webviewRef.current) {
      webviewRef.current.postMessage(JSON.stringify(result));
    }
  };

  // Fix: bridge handshake + auto-calculate on map ready
  const handleWebViewMessage = (event) => {
    const stationName = event.nativeEvent.data;

    // Update your React Native state!
    setCurrentStation(stationName);
    const message = event.nativeEvent.data;
    if (message === "READY") {
      setIsMapReady(true);
      const initialRoute = calculateRoute(fromStation, toStation);
      if (!initialRoute.error) {
        setRouteData(initialRoute);
        webviewRef.current?.postMessage(JSON.stringify(initialRoute));
      }
    }
  };

  const moveMapAhead = () => {
    // Note: Adding "true;" at the end prevents a known React Native WebView bug
    // where injecting scripts that return undefined can cause crashes.
    const run = `window.nextStation(); true;`;
    webviewRef.current?.injectJavaScript(run);
  };

  const moveMapBack = () => {
    const run = `window.prevStation(); true;`;
    webviewRef.current?.injectJavaScript(run);
  };

  const swapStations = () => {
    const newFrom = toStation;
    const newTo = fromStation;
    setFromStation(newFrom);
    setToStation(newTo);

    // Pass values directly instead of relying on state
    const result = calculateRoute(newFrom, newTo);
    if (!result.error) {
      setRouteData(result);
      if (isMapReady && webviewRef.current) {
        webviewRef.current.postMessage(JSON.stringify(result));
      }
    }
  };

  const StationCard = ({ index, item, data }) => {
    const theme = useAppTheme();
    return (
      <Card
        mode="contained"
        style={{
          backgroundColor: theme.colors.elevation.level1,
          marginBottom: 2.8,
          borderTopLeftRadius: index === 0 ? 24 : 6,
          borderTopRightRadius: index === 0 ? 24 : 6,
          borderBottomLeftRadius: index === routeData.stops.length - 1 ? 24 : 6,
          borderBottomRightRadius:
            index === routeData.stops.length - 1 ? 24 : 6,
        }}
        onPress={() => {}}
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
              backgroundColor: theme.colors.surfaceVariant,
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
          </View>
          <View style={{ flex: 1 }}>
            <Text
              variant="bodyMedium"
              style={{ color: theme.colors.onSurface }}
            >
              {item.station}
            </Text>
            <Text
              variant="labelSmall"
              style={{ color: theme.colors.onSurfaceVariant, marginTop: 1 }}
            >
              {item.line}
            </Text>
          </View>
        </Card.Content>
      </Card>
    );
  };

  return (
    <SafeAreaView
      style={{
        backgroundColor: theme.colors.background,
      }}
    >
      {/* --- BACKGROUND MAP --- */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled={true}
      >
        <View style={{ height: 390 }}>
          <WebView
            ref={webviewRef}
            source={require("../assets/routemap/index.html")}
            javaScriptEnabled={true}
            startInLoadingState={true}
            onMessage={handleWebViewMessage}
            style={{ backgroundColor: "transparent" }}
            originWhitelist={["*"]}
            allowFileAccess={true}
            scrollEnabled={false}
            overScrollMode="never"
            bounces={false}
          />
        </View>

        {/* --- FOREGROUND UI (Bottom Sheet style) --- */}
        <View
          style={{
            paddingTop: 20,
          }}
        >
          {/* Input Simulation */}
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              gap: 15,

              marginBottom: 16,
            }}
          >
            <IconButton
              style={{
                width: 80,
                height: 45,
                borderRadius: 28,
                backgroundColor: theme.colors.secondaryContainer,
              }}
              onPress={moveMapBack}
              mode="contained"
              icon="chevron-left"
            />
            <Text
              style={{
                width: 180,
                alignItems: "center",
                textAlign: "center",
              }}
              numberOfLines={1}
              variant="bodyLarge"
            >
              {currentStation}
            </Text>
            <IconButton
              style={{
                width: 80,
                height: 45,
                borderRadius: 28,
                backgroundColor: theme.colors.secondaryContainer,
              }}
              onPress={moveMapAhead}
              mode="contained"
              icon="chevron-right"
            />
          </View>

          {routeData ? (
            <Card
              mode="elevated"
              style={{
                marginLeft: 15,
                marginRight: 15,
                borderRadius: 24,
                padding: 30,
                paddingTop: 5,
              }}
            >
              <Card.Content>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 15,
                    marginBottom: 16,
                    paddingTop: 16,
                    paddingHorizontal: 16,
                    paddingBottom: 14,
                    marginVertical: -4, // add this
                  }}
                >
                  <Text
                    style={{ flex: 1, flexWrap: "wrap", textAlign: "left" }}
                    numberOfLines={2}
                    variant="titleSmall"
                  >
                    {fromStation}
                  </Text>
                  <IconButton
                    style={{
                      width: 80,
                      height: 45,
                      borderRadius: 28,
                      backgroundColor: theme.colors.secondaryContainer,
                    }}
                    mode="contained"
                    icon="swap-horizontal-hidden"
                    onPress={() => {
                      swapStations();
                    }}
                  />
                  <Text
                    style={{ flex: 1, flexWrap: "wrap", textAlign: "right" }}
                    numberOfLines={2}
                    variant="titleSmall"
                  >
                    {toStation}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "stretch",
                  }}
                >
                  <View
                    style={{
                      flex: 1,
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 8,
                    }}
                  >
                    <View
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "center",
                        marginBottom: 10,
                        gap: 8,
                      }}
                    >
                      <Icon source="subway-variant" size={28} />
                      <Text variant="titleLarge" numberOfLines={2}>
                        {routeData.stops}
                      </Text>
                    </View>

                    <Text variant="bodySmall">Stations</Text>
                  </View>

                  <View
                    style={{
                      flex: 1,
                      gap: 8,

                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <View
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "center",
                        marginBottom: 10,
                        gap: 8,
                      }}
                    >
                      <Icon source="transit-transfer" size={28} />
                      <Text variant="titleLarge">
                        {routeData.transferStations.length}
                      </Text>
                    </View>

                    <Text variant="bodySmall">Transfers</Text>
                  </View>
                </View>
              </Card.Content>
            </Card>
          ) : (
            <View style={{ marginTop: 24, margin: 15 }}>
              <Text variant="headlineSmall">No Route Found</Text>
            </View>
          )}
          {/* Display React Native UI based on the calculation */}
          {routeData && (
            <View style={{ marginTop: 24, margin: 15 }}>
              {routeData.route.map((step, index) => (
                <StationCard key={index} item={step} data={routeData.stops} />
              ))}
            </View>
          )}
        </View>
      </ScrollView>
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
