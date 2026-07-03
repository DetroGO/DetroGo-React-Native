import { useEffect, useRef, useCallback, useState } from "react";
import {
  StyleSheet,
  View,
  Pressable,
  Animated,
  Dimensions,
  ToastAndroid,
} from "react-native";

import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import lines from "@/cities/delhi/metrolines.json";

import {
  Text,
  Button,
  Portal,
  Dialog,
  Icon,
  Card,
  IconButton,
} from "react-native-paper";
import { WebView } from "react-native-webview";
import { router, useLocalSearchParams } from "expo-router";
import * as Haptics from "expo-haptics";
import { Asset } from "expo-asset";
import {
  LINE_DISPLAY_NAMES,
  LINE_COLORS,
  LINE_TERMINUS,
} from "@/cities/delhi/lineMeta";
import { RouteData } from "@/types/route";
import { strings } from "@/constants/strings";

// Hooks & Stores
import { useAppTheme } from "@/hooks/useAppTheme";
import { useRecentTripsStore } from "@/store/recentTrips";
import { useBookmarksStore } from "@/store/savedRoutes";
import { usePrefStore } from "@/store/usePrefStore";
import {
  startLiveNavigation,
  stopLiveNavigation,
  updateLiveNavigation,
} from "@/utils/detroLiveNotif";
import { calculateRoute } from "../utils/metroRouting";

// Notifications

type CalculatedRoute = RouteData & {
  stops: number;
  transferDetails: any[];
  error?: undefined;
};

const isCalculatedRoute = (value: any): value is CalculatedRoute =>
  !value?.error &&
  typeof value?.stops === "number" &&
  Array.isArray(value?.route) &&
  Array.isArray(value?.transferStations);

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
  descbold = false,
  desc2 = "",
  icon,
  cardfg,
  cardbg,
}: {
  title: string;
  desc: string;
  descbold?: boolean;
  desc2?: string;
  data: any;
  icon: string;
  cardfg: string;
  cardbg: string;
}) {
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
        <View style={{ flexDirection: "row", alignItems: "center", gap: 15 }}>
          <View style={{ marginLeft: 3 }}>
            <Icon source={icon} size={34} color={cardfg} />
          </View>
          <View style={{ flex: 1, flexDirection: "column", gap: 1 }}>
            <Text style={{ fontWeight: "600", fontSize: 14, color: cardfg }}>
              {title}
            </Text>
            <View style={{ flexDirection: "row", gap: 3 }}>
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: "400",

                  color: cardfg,
                  opacity: descbold ? 0.9 : 0.8,
                }}
              >
                {desc}
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: "400",
                  color: cardfg,
                  opacity: 0.8,
                }}
              >
                {desc2}
              </Text>
            </View>
          </View>
          <Pressable hitSlop={12} style={{ padding: 4 }}></Pressable>
        </View>
      </Card.Content>
    </Card>
  );
}

export default function RoutePlanScreen() {
  const { start, end } = useLocalSearchParams<{ start: string; end: string }>();
  const theme = useAppTheme();
  const { addTrip } = useRecentTripsStore();
  const { addBookmark, removeBookmark, isBookmarked, bookmarks } =
    useBookmarksStore();
  const notificationsEnabled = usePrefStore(
    (state) => state.notificationsEnabled,
  );
  const locationEnabled = usePrefStore(
    (state) => state.locationEnabled,
  );
  
  const screenWidth = Dimensions.get("window").width;
  const [liveNavId, setLiveNavId] = useState<number | string | undefined>(
    undefined,
  );

  const liveNavStartedRef = useRef(false);
  const [htmlUri, setHtmlUri] = useState<string | null>(null);
  const webviewRef = useRef<WebView>(null);
  const currentStationIndexRef = useRef<number>(0);
  const swapSpring = useSpringPress();

  // Strongly Typed State
  const [stationDialog, setStationDialog] = useState<{
    item: any;
    index: number;
    isTransfer: boolean;
    switchingToLine: string | null;
    terminus: string | null;
  } | null>(null);
  const [isMapReady, setIsMapReady] = useState<boolean>(false);
  const [isTransferahead, Transferahead] = useState<boolean>(false);
  const [TransferStation, setTransferStation] = useState<any>(undefined);
  const [isTransferStation, setIsTransferStation] = useState<any>(undefined);
  const [currentStation, setCurrentStation] = useState<string>("");
  const [currentStationIndex, setCurrentStationIndex] = useState<number>(0);
  const [totalStops, setTotalStops] = useState<number>(0);
  const [routeData, setRouteData] = useState<any>(null);
  const [fromStation, setFromStation] = useState<string>(start || "");
  const [toStation, setToStation] = useState<string>(end || "");
  const isTransferaheadRef = useRef(false);
  const TransferStationRef = useRef<any>(undefined);
  const isTransferStationRef = useRef<any>(undefined);

  useEffect(() => {
    isTransferaheadRef.current = isTransferahead;
  }, [isTransferahead]);
  useEffect(() => {
    TransferStationRef.current = TransferStation;
  }, [TransferStation]);
  useEffect(() => {
    isTransferStationRef.current = isTransferStation;
  }, [isTransferStation]);

  useEffect(() => {
    if (notificationsEnabled || liveNavId === undefined) return;

    stopLiveNavigation(liveNavId);
    setLiveNavId(undefined);
    liveNavStartedRef.current = false;
  }, [liveNavId, notificationsEnabled]);

  useEffect(() => {
    if (!notificationsEnabled || !routeData || totalStops === 0) return;
    if (liveNavStartedRef.current) return;

    const firstStation = routeData.route?.[0]?.station;
    if (!firstStation) return;

    let startedId: number | string | undefined;

    liveNavStartedRef.current = true;

    const startNotification = async () => {
      startedId = await startLiveNavigation(
        firstStation,
        `${totalStops} stops · ${toStation}`,
        0,
        getTransferPoints(),
        [],
      );

      setLiveNavId(startedId);
      setCurrentStation(firstStation);
      setCurrentStationIndex(0);
      currentStationIndexRef.current = 0;
    };

    startNotification();

    return () => {
      if (startedId !== undefined) {
        stopLiveNavigation(startedId);
      }
    };
  }, [notificationsEnabled, routeData, totalStops, toStation]);

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

    const currentIndex = routeData.route.findIndex(
      (s: any) => s.station === currentStation,
    );
    if (currentIndex === -1) return;
    setCurrentStationIndex(currentIndex);

    const transferAhead = isTransferaheadRef.current;
    const transferStation = TransferStationRef.current;

    if (transferAhead && transferStation) {
      const transferIndex = routeData.route.findIndex(
        (s: any) => s.station === transferStation.station,
      );

      if (currentIndex === transferIndex) {
        setIsTransferStation(true);
        return;
      }

      if (currentIndex > transferIndex) {
        Transferahead(false);
        setTransferStation(undefined);
        setIsTransferStation(false);
        return;
      }

      if (currentIndex < transferIndex) {
        setIsTransferStation(false);
        if (currentIndex === transferIndex - 1) {
          // Still one stop before, keep "Transfer Ahead"
          return;
        }
        // Further back, fall through to lookahead
        Transferahead(false);
        setTransferStation(undefined);
      }
    }

    // Check if current station itself is a transfer (arrived via backwards nav)
    const currentIsTransfer = routeData.transferDetails.find(
      (t: any) => t.station === currentStation,
    );
    if (currentIsTransfer) {
      setIsTransferStation(true);
      setTransferStation(currentIsTransfer);
      Transferahead(false);
      return;
    }

    // Lookahead: check if next station is a transfer
    const nextStation = routeData.route[currentIndex + 1];
    if (!nextStation) {
      Transferahead(false);
      setTransferStation(undefined);
      setIsTransferStation(false);
      return;
    }

    const upcomingTransfer = routeData.transferDetails.find(
      (t: any) => t.station === nextStation.station,
    );

    if (upcomingTransfer) {
      Transferahead(true);
      setTransferStation(upcomingTransfer);
      setIsTransferStation(false);
    } else {
      Transferahead(false);
      setTransferStation(undefined);
      setIsTransferStation(false);
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
      const jsonString = JSON.stringify(payload);
      const run = `window.updateScene(${jsonString}); true;`;
      webviewRef.current?.injectJavaScript(run);
    }
  }, [theme.dark, isMapReady, routeData]);

  const getTransferPoints = () => {
    if (!routeData?.transferDetails) return [];
    return routeData.transferDetails.map((t: any) => {
      const idx = routeData.route.findIndex(
        (s: any) => s.station === t.station,
      );
      const color =
        LINE_COLORS[t.toLine as keyof typeof LINE_COLORS] ??
        theme.colors.secondary;
      return {
        position: Math.round((idx / totalStops) * 100),
        color,
      };
    });
  };

  useEffect(() => {
    if (
      !notificationsEnabled ||
      liveNavId === undefined ||
      !routeData ||
      totalStops === 0
    )
      return;
    if (!currentStation) return;

    const progress = Math.round((currentStationIndex / totalStops) * 100);

    updateLiveNavigation(
      liveNavId,
      currentStation,
      `${totalStops - currentStationIndex} stops · ${toStation}`,
      progress,
      getTransferPoints(),
      [],
    );
  }, [
    liveNavId,
    notificationsEnabled,
    currentStation,
    currentStationIndex,
    routeData,
    totalStops,
    toStation,
  ]);

  const handleBookmark = () => {
    if (isBookmarked(fromStation, toStation)) {
      const bookmark = bookmarks.find(
        (b) => b.from === fromStation && b.to === toStation,
      );
      if (bookmark) removeBookmark(bookmark.id);
      ToastAndroid.show("Bookmark removed", ToastAndroid.SHORT);
    } else {
      if (!routeData) return;
      addBookmark({
        id: `${fromStation}__${toStation}__${Date.now()}`,
        from: fromStation,
        to: toStation,
        stops: routeData.stops + 1,
        transfers: routeData.transferStations.length,
        savedAt: Date.now(),
        routeData: routeData,
      });
      ToastAndroid.show("Bookmark added", ToastAndroid.SHORT);
    }
  };

  const handleWebViewMessage = (event: any) => {
    const message = event.nativeEvent.data;
    if (message === "READY") {
      setIsMapReady(true);
      const initialRoute = calculateRoute(fromStation, toStation);
      if (isCalculatedRoute(initialRoute)) {
        setRouteData(initialRoute);
        setTotalStops(initialRoute.stops);
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
      if (routeData) {
        const idx = routeData.route.findIndex(
          (s: any) => s.station === message,
        );
        if (idx !== -1) {
          setCurrentStationIndex(idx);
          currentStationIndexRef.current = idx;
        }
      }
    }
  };

  const moveMapAhead = () => {
    webviewRef.current?.injectJavaScript(`window.nextStation(); true;`);
  };

  const moveMapBack = () => {
    webviewRef.current?.injectJavaScript(`window.prevStation(); true;`);
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

  function getDirectionalTerminus(line: string, routeSegment: any[]): string {
    const terminus = LINE_TERMINUS[line as keyof typeof LINE_TERMINUS];
    if (!terminus) return line;

    // Find first and last station on this line in the route segment
    const stationsOnLine = routeSegment.filter((s: any) => s.line === line);
    if (stationsOnLine.length === 0) return terminus[1];

    const firstOnLine = stationsOnLine[0].station;
    const lastOnLine = stationsOnLine[stationsOnLine.length - 1].station;

    // Get the actual terminus stations for this line
    const [startTerminus, endTerminus] = terminus;

    // Find positions in the full line data to determine direction
    const lineData = lines[line as keyof typeof lines] as string[] | undefined;
    if (!lineData) return endTerminus;

    const firstIdx = lineData.indexOf(firstOnLine);
    const lastIdx = lineData.indexOf(lastOnLine);

    // If travelling in increasing index direction → towards end terminus
    // If travelling in decreasing index direction → towards start terminus
    return firstIdx <= lastIdx ? endTerminus : startTerminus;
  }

  const StationCard = ({
    index,
    item,
    data,
  }: {
    index: number;
    item: any;
    data: any;
  }) => {
    const isTransfer = data.transferStations.some(
      (transfer: any) =>
        transfer === item.station || transfer.station === item.station,
    );
    const nextStation = data.route[index + 1];
    let switchingToLine = null;
    if (isTransfer && nextStation && nextStation.line !== item.line) {
      switchingToLine = nextStation.line;
    }
    const lineLabel =
      LINE_DISPLAY_NAMES[switchingToLine as keyof typeof LINE_DISPLAY_NAMES] ??
      `${switchingToLine}`;
    const terminus = `${strings.route.towards.replace("{towards}", getDirectionalTerminus(switchingToLine, data.route))}`;

    return (
      <Card
        mode="contained"
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
            {isTransfer ? (
              <Icon
                source={"transit-transfer"}
                size={33}
                color={theme.colors.onSurfaceVariant}
              />
            ) : (
              <Text
                variant="titleLarge"
                style={{
                  color: theme.colors.onSurface,
                  textAlign: "center",
                  fontWeight: "600",
                }}
              >
                {index + 1}
              </Text>
            )}
          </View>
          <View style={{ flex: 1 }}>
            <Text variant="bodyLarge" style={{ color: theme.colors.onSurface }}>
              {item.station}
            </Text>
            <Text
              variant="labelSmall"
              style={{ color: theme.colors.onSurfaceVariant, marginTop: 1 }}
            >
              {isTransfer
                ? strings.route.changeTo.replace(
                    "{switchingToLine}",
                    switchingToLine,
                  )
                : item.line}
            </Text>
            <Text
              variant="labelSmall"
              style={{
                display:
                  isTransfer && lineLabel && lineLabel !== "Pink line loop"
                    ? "flex"
                    : "none",
                color: theme.colors.onSurfaceVariant,
                marginTop: 2,
              }}
            >
              {isTransfer && lineLabel ? terminus : null}
            </Text>
          </View>
        </Card.Content>
      </Card>
    );
  };

  const isDestination = currentStationIndex === totalStops;
  const stopsLeft = totalStops - currentStationIndex;

  return (
    <SafeAreaView
      style={{
        marginTop: -40,
        backgroundColor: theme.colors.background,
        flex: 1,
      }}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled={true}
      >
        <View style={{ height: 440, width: screenWidth + 2, marginLeft: -1 }}>
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
            <View style={{ flex: 1, alignItems: "center" }}></View>
            <IconButton
              icon={
                isBookmarked(fromStation, toStation)
                  ? "bookmark"
                  : "bookmark-outline"
              }
              mode="contained"
              containerColor="transparent"
              style={{ marginRight: 20 }}
              onPress={() => handleBookmark()}
            />
          </View>

          {htmlUri && (
            <View
              style={{ position: "relative", flex: 1 }}
              renderToHardwareTextureAndroid={true}
            >
              <WebView
                ref={webviewRef}
                source={{ uri: htmlUri }}
                javaScriptEnabled={true}
                startInLoadingState={true}
                onMessage={handleWebViewMessage}
                style={{ flex: 1, backgroundColor: "transparent" }}
                originWhitelist={["*"]}
                allowFileAccess={true}
                scrollEnabled={false}
                overScrollMode="never"
                setDisplayZoomControls={false}
                setBuiltInZoomControls={false}
                bounces={false}
              />
              <View
                style={[
                  StyleSheet.absoluteFillObject,
                  { elevation: 10, zIndex: 10 },
                ]}
                pointerEvents="auto"
              />
            </View>
          )}
        </View>

        {isTransferahead && TransferStation && !isTransferStation ? (
          <NotificationCard
            title={strings.route.transferAhead}
            icon="directions-fork"
            desc={TransferStation.station}
            descbold={true}
            desc2={`for ${TransferStation.toLine}`}
            data={routeData}
            cardfg={theme.colors.secondary}
            cardbg={theme.colors.onPrimary}
          />
        ) : isTransferStation && TransferStation ? (
          <NotificationCard
            title={strings.route.transferHere}
            icon="transit-transfer"
            desc={TransferStation.station}
            descbold={true}
            desc2={`for ${TransferStation.toLine}`}
            data={routeData}
            cardfg={theme.colors.tertiary}
            cardbg={
              theme.dark
                ? theme.colors.onTertiary
                : theme.colors.tertiaryContainer
            }
          />
        ) : (
          <NotificationCard
            title={
              isDestination
                ? strings.route.destinationReached
                : `${stopsLeft} ${strings.route.stopsRemaining}`
            }
            desc={toStation}
            icon={isDestination ? "flag-checkered" : "map-marker-radius"}
            data={routeData}
            cardfg={
              currentStationIndex === totalStops
                ? theme.colors.tertiary
                : theme.colors.onSecondaryContainer
            }
            cardbg={
              currentStationIndex === totalStops
                ? theme.colors.onTertiary
                : theme.colors.onSecondary
            }
          />
        )}
        {/*<Button
          mode="elevated"
          style={{ marginLeft: 20, marginRight: 20 }}
          onPress={}
        >
          <Text>Start Live Navigation</Text>
        </Button>*/}

        {/*{liveNavId !== undefined && (
          <Button
            style={{ marginLeft: 20, marginRight: 20, marginTop: 10 }}
            mode="elevated"
            onPress={() => {
              stopLiveNavigation(liveNavId);
              setLiveNavId(undefined);
            }}
          >
            <Text>Stop Navigation</Text>
          </Button>
        )}*/}

        {routeData && (
          <View style={{ paddingTop: 20 }}>
            <StationNavigator
              currentStation={currentStation}
              onPrev={() => moveMapBack()}
              onNext={() => moveMapAhead()}
            />

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

                  <Animated.View
                    style={{ transform: [{ scale: swapSpring.scale }] }}
                  >
                    <Pressable
                      onPressIn={swapSpring.onPressIn}
                      onPressOut={swapSpring.onPressOut}
                      onPress={() => {
                        swapStations();
                        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
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

                <View style={{ flexDirection: "row", alignItems: "stretch" }}>
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
                          fontWeight: "700",
                          color: theme.colors.onSecondaryContainer,
                        }}
                        numberOfLines={2}
                      >
                        {routeData.stops + 1}
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
                          fontWeight: "700",
                          color: theme.colors.onSecondaryContainer,
                        }}
                      >
                        {routeData.transferStations.length}
                      </Text>
                    </View>
                    <Text variant="bodySmall">{strings.common.transfers}</Text>
                  </View>
                </View>
              </Card.Content>
            </Card>

            <View style={{ marginTop: 20, margin: 15 }}>
              <Text
                style={{ marginBottom: 18, marginLeft: 8 }}
                variant="labelMedium"
              >
                {strings.route.stationsList}
              </Text>
              {routeData.route.map((step: any, index: number) => (
                <StationCard
                  key={`station-${index}-${step.station}`}
                  index={index}
                  item={step}
                  data={routeData}
                />
              ))}
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
