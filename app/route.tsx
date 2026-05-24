import {
  StyleSheet,
  View,
  Pressable,
  Animated,
  Dimensions,
} from "react-native";
import stations from "@/cities/delhi/stationsdata.json";
import { useRecentTripsStore } from "@/store/recentTrips";
import * as Haptics from "expo-haptics";
import * as Location from "expo-location";
import { useBookmarksStore } from "@/store/savedRoutes";
import { ScrollView } from "react-native-gesture-handler";
import { LINE_DISPLAY_NAMES } from "@/cities/delhi/lineMeta";
import { Asset } from "expo-asset";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState, useRef, useCallback, useEffect } from "react";
import {
  Text,
  Button,
  Surface,
  Portal,
  Dialog,
  Icon,
  Card,
  IconButton,
} from "react-native-paper";
import { router } from "expo-router";

import { LinearGradient } from "expo-linear-gradient";
import { useAppTheme } from "@/hooks/useAppTheme";
import { WebView } from "react-native-webview";
import strings from "@/constants/strings";

import { calculateRoute } from "../utils/metroRouting";
import { useLocalSearchParams } from "expo-router";

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
          onPress={() => {
            onPrev();
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          }}
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
          onPress={() => {
            onNext();
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          }}
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

function NotificationCard({
  title,
  desc,
  desc2,
  data,
  icon,
  cardbg,
}: {
  title: string;
  desc: string;
  desc2: string;
  data: any;
  icon: string;
  cardbg: string;
}) {
  const theme = useAppTheme();

  return (
    <Card
      mode="elevated"
      style={{
        marginLeft: 16,
        marginRight: 16,
        marginTop: 5,
        borderRadius: 24,
        marginBottom: 10,
        backgroundColor: cardbg,
        padding: 10,
      }}
    >
      <Card.Content>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 15,
          }}
        >
          <View style={{ marginLeft: 3 }}>
            <Icon
              source={icon}
              size={34}
              color={theme.colors.onTertiaryContainer}
            />
          </View>

          <View style={{ flex: 1, flexDirection: "column", gap: 1 }}>
            <Text
              style={{
                fontWeight: "600",
                fontSize: 14,
                color: theme.colors.onTertiaryContainer,
              }}
            >
              {title}
            </Text>
            <Text
              style={{
                fontSize: 12,
                fontWeight: "400",
                color: theme.colors.onTertiaryContainer,
                opacity: 0.8,
              }}
            >
              {desc} {desc2}
            </Text>
          </View>

          <Pressable hitSlop={12} style={{ padding: 4 }}>
            <Icon
              source="close"
              size={20}
              color={theme.colors.onTertiaryContainer}
            />
          </Pressable>
        </View>
      </Card.Content>
    </Card>
  );
}

export default function RoutePlanScreen() {
  const [htmlUri, setHtmlUri] = useState<string | null>(null);
  const webviewRef = useRef(null);
  const [visibleInfo, setVisibleInfo] = useState(false);
  const { addTrip } = useRecentTripsStore();
  const { addBookmark, removeBookmark, isBookmarked } = useBookmarksStore();
  const theme = useAppTheme();
  const isDark = theme.dark;
  const [isMapReady, setIsMapReady] = useState(false);
  const [isTransferahead, Transferahead] = useState(false);
  const [TransferStation, setTransferStation] = useState();
  const [currentStation, setCurrentStation] = useState("");
  const [routeData, setRouteData] = useState(null);
  const screenWidth = Dimensions.get("window").width;
  const { start, end } = useLocalSearchParams<{ start: string; end: string }>();
  const [fromStation, setFromStation] = useState(start);
  const [toStation, setToStation] = useState(end);

  // Swap button spring
  const swapSpring = useSpringPress();
  const swapRadius = swapSpring.scale.interpolate({
    inputRange: [0.88, 1],
    outputRange: [14, 28],
  });

  useEffect(() => {
    Asset.fromModule(require("../assets/routemap/index.html"))
      .downloadAsync()
      .then((asset) => setHtmlUri(asset.localUri));
  }, []);

  useEffect(() => {
    if (!routeData?.transferDetails || !currentStation) return;

    // Find current position in route
    const currentIndex = routeData.route.findIndex(
      (s) => s.station === currentStation,
    );
    if (currentIndex === -1) return;

    const nextStation = routeData.route[currentIndex + 2];
    if (!nextStation) return;

    const upcomingTransfer = routeData.transferDetails.find(
      (t) => t.station === nextStation.station,
    );

    if (upcomingTransfer) {
      Transferahead(true);
      setTransferStation(upcomingTransfer);
      // show banner, haptic, NotificationCard update, etc.
    }
  }, [currentStation]);

  useEffect(() => {
    if (isMapReady && routeData) {
      const payload = {
        type: "SYNC_STATE",
        payload: {
          route: routeData,
          theme: theme.dark ? "dark" : "light",
        },
      };

      // Convert to string and inject
      const jsonString = JSON.stringify(payload);
      const run = `window.updateScene(${jsonString}); true;`;
      webviewRef.current?.injectJavaScript(run);
    }
  }, [theme.dark, isMapReady, routeData]);

  const handleBookmark = () => {
    if (isBookmarked(fromStation, toStation)) {
      const bookmark = bookmarks.find(
        (b) => b.from === fromStation && b.to === toStation,
      );
      if (bookmark) removeBookmark(bookmark.id);
    } else {
      if (!routeData) return;
      addBookmark({
        id: `${fromStation}__${toStation}__${Date.now()}`,
        from: fromStation,
        to: toStation,
        stops: routeData.stops,
        transfers: routeData.transferStations.length,
        savedAt: Date.now(),
        routeData: routeData,
      });
    }
  };

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
    const message = event.nativeEvent.data;
    if (message === "READY") {
      setIsMapReady(true);
      const initialRoute = calculateRoute(fromStation, toStation);
      if (!initialRoute.error) {
        setRouteData(initialRoute);
        webviewRef.current?.postMessage(JSON.stringify(initialRoute));
        addTrip({
          id: `${fromStation}__${toStation}__${Date.now()}`,
          from: fromStation,
          to: toStation,
          stops: initialRoute.stops,
          transfers: initialRoute.transferStations.length,
          viewedAt: Date.now(),
          routeData: initialRoute,
        });
      }
    } else {
      setCurrentStation(message);
    }
  };

  const moveMapAhead = () => {
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

    // We check if the station name exists in the transferStations array.
    // (This handles whether transferStations is an array of strings or objects)
    const isTransfer = data.transferStations.some(
      (transfer) =>
        transfer === item.station || transfer.station === item.station,
    );

    const nextStation = data.route[index + 1];

    // 3. Determine if we are changing lines at this exact step
    let switchingToLine = null;
    if (isTransfer && nextStation && nextStation.line !== item.line) {
      switchingToLine = nextStation.line;
    }
    const lineLabel = LINE_DISPLAY_NAMES[switchingToLine] ?? switchingToLine;
    return (
      <Card
        mode="contained"
        onLongPress={() => setVisibleInfo(true)}
        style={{
          backgroundColor: isTransfer
            ? theme.dark
              ? theme.colors.elevation.level4
              : theme.colors.elevation.level3
            : theme.colors.elevation.level1,
          marginBottom: 2.8,
          borderTopLeftRadius: index === 0 ? 24 : 6,
          borderTopRightRadius: index === 0 ? 24 : 6,
          borderBottomLeftRadius: index === data.stops ? 24 : 6,
          borderBottomRightRadius: index === data.stops ? 24 : 6,
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
              width: 57,
              height: 57,
              backgroundColor: isTransfer
                ? theme.dark
                  ? theme.colors.elevation.level4
                  : theme.colors.elevation.level3
                : theme.colors.surfaceVariant,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: isTransfer ? 80 : 20,
            }}
          >
            <Icon
              source={isTransfer ? "transit-transfer" : "source-commit"}
              size={33}
              color={theme.colors.onSurfaceVariant}
            />
          </View>
          <View style={{ flex: 1 }}>
            <Text variant="bodyLarge" style={{ color: theme.colors.onSurface }}>
              {item.station}
            </Text>
            <Text
              variant="labelSmall"
              style={{ color: theme.colors.onSurfaceVariant, marginTop: 1 }}
            >
              {isTransfer ? "Change to " + lineLabel : item.line}
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
      >
        <View
          style={{
            height: 440,
            width: screenWidth + 2,
            marginLeft: -1,
          }}
        >
          <View
            style={{
              position: "absolute",
              top: 38,
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
              {/*<Text
                style={{ maxWidth: 400 }}
                numberOfLines={1}
                variant="bodyLarge"
              ></Text>*/}
            </View>
            <IconButton
              icon="bookmark-outline"
              mode="contained"
              containerColor="transparent"
              style={{ marginRight: 20 }}
              onPress={() => handleBookmark(fromStation, toStation)}
            />
          </View>

          {htmlUri && (
            <WebView
              ref={webviewRef}
              source={{ uri: htmlUri }}
              javaScriptEnabled={true}
              startInLoadingState={true}
              onMessage={handleWebViewMessage}
              style={{ backgroundColor: "transparent" }}
              originWhitelist={["*"]}
              allowFileAccess={true}
              scrollEnabled={false}
              overScrollMode="never"
              bounces={false}
              s
            />
          )}
        </View>

        {isTransferahead && (
          <NotificationCard
            title="Transfer Station Incoming"
            icon="transit-transfer"
            desc={`${TransferStation.station} for ${TransferStation.toLine} `}
            data={routeData}
            cardbg={theme.colors.tertiaryContainer}
          />
        )}

        {/* --- FOREGROUND UI (Bottom Sheet style) --- */}
        {routeData && (
          <View
            style={{
              paddingTop: 20,
            }}
          >
            {/* M3 Expressive Station Navigator */}
            <StationNavigator
              currentStation={currentStation}
              onPrev={() => moveMapBack()}
              onNext={() => moveMapAhead()}
            />

            {/* notification here  */}

            {routeData ? (
              <Card
                mode="elevated"
                style={{
                  marginLeft: 16,
                  marginRight: 16,
                  marginTop: 5,
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
                      marginBottom: 18,
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
                        onPress={() => {
                          swapStations();
                          Haptics.impactAsync(
                            Haptics.ImpactFeedbackStyle.Light,
                          );
                        }}
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
                          marginBottom: 18,
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

                      <Text variant="bodySmall">{strings.common.stations}</Text>
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
                          marginBottom: 18,
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

                      <Text variant="bodySmall">
                        {strings.common.transfers}
                      </Text>
                    </View>
                  </View>
                </Card.Content>
              </Card>
            ) : (
              <View style={{ flex: 1, marginTop: 24, margin: 15 }}>
                <Text variant="headlineSmall">
                  {strings.route.noRouteFound}
                </Text>
              </View>
            )}

            {routeData && (
              <View style={{ marginTop: 20, margin: 15 }}>
                <Text
                  style={{ marginBottom: 18, marginLeft: 8 }}
                  variant="labelMedium"
                >
                  Stations List
                </Text>
                {routeData.route.map((step: any, index: number) => (
                  <StationCard index={index} item={step} data={routeData} />
                ))}
              </View>
            )}
          </View>
        )}
      </ScrollView>
      <Portal>
        <Dialog
          style={{ backgroundColor: theme.colors.surface, borderRadius: 28 }}
          visible={visibleInfo}
          onDismiss={() => setVisibleInfo(false)}
        >
          <Dialog.Title
            style={{
              marginBottom: 4,
              marginTop: 40,
              textAlign: "center",
              fontSize: 24,
            }}
          >
            <Text variant="titleMedium">{}</Text>
          </Dialog.Title>
          <Dialog.Content>
            <Text
              variant="bodyMedium"
              style={{
                color: theme.colors.onSurfaceVariant,
                textAlign: "center",
              }}
            >
              {strings.common.version}: Preview
            </Text>
            <Text
              variant="bodySmall"
              style={{
                color: theme.colors.outline,
                textAlign: "center",
                marginTop: 16,
              }}
            >
              This is a preview build of DetroGo. Its may contain bugs and
              incomplete features. and is only intended for alpha testers
            </Text>
            <Text
              variant="bodySmall"
              style={{
                color: theme.colors.outline,
                textAlign: "center",
                marginTop: 8,
              }}
            >
              Thank you for testing DetroGo!
            </Text>
            <Text
              variant="bodySmall"
              style={{
                color: theme.colors.outline,
                textAlign: "center",
                marginTop: 8,
              }}
            >
              Open Source · GNU GPL v3.0
            </Text>

            <Text
              variant="bodySmall"
              style={{
                color: theme.colors.secondary,
                textAlign: "center",
                marginTop: 18,
              }}
            >
              Report Bugs & Feedback on
            </Text>
            <Text
              variant="bodySmall"
              style={{
                color: theme.colors.primary,
                textAlign: "center",
                marginTop: 8,
              }}
            >
              Discord | GitHub
            </Text>
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
              onPress={() => setVisibleInfo(false)}
            >
              {strings.common?.done ?? "Close"}
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
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
