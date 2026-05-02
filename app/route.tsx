import { StyleSheet, View, Pressable, Animated } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

import { SafeAreaView } from "react-native-safe-area-context";
import { useState, useRef, useCallback } from "react";
import {
  Text,
  Button,
  Surface,
  Icon,
  Card,
  IconButton,
} from "react-native-paper";
import { router } from "expo-router";

import { LinearGradient } from "expo-linear-gradient";
import { useAppTheme } from "@/hooks/useAppTheme";
import { WebView } from "react-native-webview";

import { calculateRoute } from "../utils/metroRouting";
import { useLocalSearchParams } from "expo-router";
import { transparent } from "react-native-paper/lib/typescript/styles/themes/v2/colors";

// ─── M3 Expressive spring hook ─────────────────────────────────────────────
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

// ─── M3 Expressive Station Navigator ──────────────────────────────────────
function StationNavigator({
  currentStation,
  onPrev,
  onNext,
}: {
  currentStation: string;
  onPrev: () => void;
  onNext: () => void;
}) {
  const theme = useAppTheme();
  const prevSpring = useSpringPress();
  const nextSpring = useSpringPress();

  const prevRadius = prevSpring.scale.interpolate({
    inputRange: [0.88, 1],
    outputRange: [20, 50],
  });
  const nextRadius = nextSpring.scale.interpolate({
    inputRange: [0.88, 1],
    outputRange: [20, 50],
  });

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 15,
        paddingHorizontal: 12,
        marginBottom: 14,
      }}
    >
      {/* Prev */}
      <Animated.View
        style={{ flex: 1, transform: [{ scale: prevSpring.scale }] }}
      >
        <Pressable
          onPressIn={prevSpring.onPressIn}
          onPressOut={prevSpring.onPressOut}
          onPress={onPrev}
          android_ripple={{
            color: theme.colors.onSecondaryContainer + "33",
            borderless: false,
          }}
        >
          <Animated.View
            style={{
              height: 50,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: theme.colors.secondaryContainer,
              borderRadius: prevRadius,
            }}
          >
            <Icon
              source="chevron-left"
              size={26}
              color={theme.colors.onSecondaryContainer}
            />
          </Animated.View>
        </Pressable>
      </Animated.View>

      {/* Station label */}
      <Text
        style={{
          maxWidth: 200,
          flex: 1.4,
          alignItems: "center",
          textAlign: "center",
        }}
        numberOfLines={1}
        variant="bodyLarge"
      >
        {currentStation}
      </Text>

      {/* Next */}
      <Animated.View
        style={{ flex: 1, transform: [{ scale: nextSpring.scale }] }}
      >
        <Pressable
          onPressIn={nextSpring.onPressIn}
          onPressOut={nextSpring.onPressOut}
          onPress={onNext}
          android_ripple={{
            color: theme.colors.onSecondaryContainer + "33",
            borderless: false,
          }}
        >
          <Animated.View
            style={{
              height: 50,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: theme.colors.secondaryContainer,
              borderRadius: nextRadius,
            }}
          >
            <Icon
              source="chevron-right"
              size={26}
              color={theme.colors.onSecondaryContainer}
            />
          </Animated.View>
        </Pressable>
      </Animated.View>
    </View>
  );
}

export default function RoutePlanScreen() {
  const webviewRef = useRef(null);
  const theme = useAppTheme();

  const [isMapReady, setIsMapReady] = useState(false);
  const [currentStation, setCurrentStation] = useState("");
  const [routeData, setRouteData] = useState(null);

  const { start, end } = useLocalSearchParams<{ start: string; end: string }>();
  const [fromStation, setFromStation] = useState(start ?? "Preet Vihar");
  const [toStation, setToStation] = useState(end ?? "Mandi House");

  // Swap button spring
  const swapSpring = useSpringPress();
  const swapRadius = swapSpring.scale.interpolate({
    inputRange: [0.88, 1],
    outputRange: [14, 28],
  });

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

  const handleWebViewMessage = (event) => {
    const stationName = event.nativeEvent.data;
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
    const run = `window.nextStation(); true;`;
    webviewRef.current?.injectJavaScript(run);
    console.log(routeData.stops);
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
    console.log(index);
    return (
      <Card
        mode="contained"
        style={{
          backgroundColor: theme.colors.elevation.level1,
          marginBottom: 2.8,
          borderTopLeftRadius: index === 0 ? 24 : 6,
          borderTopRightRadius: index === 0 ? 24 : 6,
          borderBottomLeftRadius: index === routeData.stops ? 24 : 6,
          borderBottomRightRadius: index === routeData.stops ? 24 : 6,
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
        marginTop: -40,
        backgroundColor: theme.colors.background,
      }}
    >
      {/* --- BACKGROUND MAP --- */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled={true}
        style={{ padding: 0 }}
      >
        <View style={{ height: 400 }}>
          <View
            style={{
              position: "absolute",
              top: 35,
              left: 10,
              zIndex: 1000,
              alignItems: "center",
              display: "flex",
              flexDirection: "row",
            }}
          >
            <IconButton
              icon="arrow-left"
              mode="contained"
              containerColor="transparent"
              onPress={() => router.back()}
            />

            <View style={{ flex: 1, alignItems: "center" }}>
              <Text
                style={{ maxWidth: 400 }}
                numberOfLines={1}
                variant="bodyLarge"
              ></Text>
            </View>
            <IconButton
              icon="bookmark-outline"
              mode="contained"
              containerColor="transparent"
              style={{ marginRight: 20 }}
              onPress={() => router.back()}
            />
          </View>

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
          {/* M3 Expressive Station Navigator */}
          <StationNavigator
            currentStation={currentStation}
            onPrev={moveMapBack}
            onNext={moveMapAhead}
          />

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
                    marginVertical: -4,
                  }}
                >
                  <Text
                    style={{ flex: 1, flexWrap: "wrap", textAlign: "left" }}
                    numberOfLines={2}
                    variant="titleSmall"
                  >
                    {fromStation}
                  </Text>

                  {/* M3 Expressive swap button */}
                  <Animated.View
                    style={{ transform: [{ scale: swapSpring.scale }] }}
                  >
                    <Pressable
                      onPressIn={swapSpring.onPressIn}
                      onPressOut={swapSpring.onPressOut}
                      onPress={swapStations}
                      android_ripple={{
                        color: theme.colors.onSecondaryContainer + "33",
                        borderless: false,
                      }}
                    >
                      <Animated.View
                        style={{
                          width: 80,
                          height: 45,
                          alignItems: "center",
                          justifyContent: "center",
                          backgroundColor: theme.colors.secondaryContainer,
                          borderRadius: swapRadius,
                        }}
                      >
                        <Icon
                          source="swap-horizontal-hidden"
                          size={22}
                          color={theme.colors.onSecondaryContainer}
                        />
                      </Animated.View>
                    </Pressable>
                  </Animated.View>

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
                      <Icon
                        color={theme.colors.onSecondaryContainer}
                        source="subway-variant"
                        size={28}
                      />
                      <Text
                        variant="headlineMedium"
                        style={{
                          fontWeight: 700,
                          color: theme.colors.onSecondaryContainer,
                        }}
                        numberOfLines={2}
                      >
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
                      <Icon
                        source="transit-transfer"
                        color={theme.colors.onSecondaryContainer}
                        size={28}
                      />
                      <Text
                        variant="headlineMedium"
                        style={{
                          fontWeight: 700,
                          color: theme.colors.onSecondaryContainer,
                        }}
                      >
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
              {routeData.route.map((step: any, index: number) => (
                <StationCard index={index} item={step} data={routeData.stops} />
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
