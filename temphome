import {
  StyleSheet,
  View,
  ScrollView,
  Pressable,
  Image,
  RefreshControl,
  SafeAreaView,
  Animated,
} from "react-native";
import React from "react";
import * as Haptics from "expo-haptics";
import { useRef, useCallback } from "react";
import { useOnboardingStore } from "@/store/onboarding";
import { RecentTrip, SavedRoute } from "@/types/route";
import { useState } from "react";
import { useRecentTripsStore } from "@/store/recentTrips";
import { useBookmarksStore } from "@/store/savedRoutes";
import strings from "@/constants/strings";
import {
  Button,
  Text,
  Icon,
  IconButton,
  Card,
  FAB,
  Portal,
  Dialog,
} from "react-native-paper";
import { useAppTheme } from "@/hooks/useAppTheme";
import SearchBar from "@/components/ui/searchbar";
import { Svg, Path } from "react-native-svg";
import { router } from "expo-router";
import { CITIES, CityConfig } from "@/cities/index";

const RecentCard = ({
  index,
  item,
  total,
}: {
  index: number;
  item: RecentTrip;
  total: number;
}) => {
  const theme = useAppTheme();
  return (
    <Card
      mode="contained"
      style={{
        backgroundColor: theme.dark
          ? theme.colors.surfaceContainerLow
          : theme.colors.elevation.level2,
        marginBottom: 2.8,
        borderTopLeftRadius: index === 0 ? 24 : 6,
        borderTopRightRadius: index === 0 ? 24 : 6,
        borderBottomLeftRadius: index === total - 1 ? 24 : 6,
        borderBottomRightRadius: index === total - 1 ? 24 : 6,
      }}
      onPress={() =>
        router.push({
          pathname: "/route",
          params: { start: item.from, end: item.to },
        })
      }
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
            backgroundColor: theme.dark
              ? theme.colors.surfaceContainerHigh
              : theme.colors.elevation.level5,
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
          <Text variant="bodyMedium" style={{ color: theme.colors.onSurface }}>
            {item.from}
          </Text>
          <Text
            variant="labelSmall"
            style={{ color: theme.colors.onSurfaceVariant, marginTop: 1 }}
          >
            {item.to}
          </Text>
        </View>
      </Card.Content>
    </Card>
  );
};

const BookmarkCard = ({ item }: { item: SavedRoute }) => {
  const theme = useAppTheme();
  return (
    <Pressable
      onPress={() =>
        router.push({
          pathname: "/route",
          params: { start: item.from, end: item.to },
        })
      }
    >
      <Card
        mode="contained"
        style={{
          width: 220,
          padding: 4,
          backgroundColor: theme.colors.elevation.level1,
          borderRadius: 20,
          marginBottom: 4,
        }}
      >
        <Card.Content style={{ paddingTop: 16, paddingHorizontal: 16 }}>
          <Text
            variant="labelLarge"
            style={{ color: theme.colors.onSurfaceVariant, opacity: 0.7 }}
          >
            {item.from}
          </Text>
          <Text
            variant="titleMedium"
            style={{
              color: theme.colors.secondary,
              marginTop: 4,
              marginBottom: 12,
            }}
            numberOfLines={1}
          >
            {item.to}
          </Text>
          <View style={{ flexDirection: "row", gap: 10 }}>
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 4 }}
            >
              <Icon
                source="subway-variant"
                size={16}
                color={theme.colors.onSurfaceVariant}
              />
              <Text
                variant="labelMedium"
                style={{ color: theme.colors.onSurfaceVariant }}
              >
                {item.stops} stops
              </Text>
            </View>
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 4 }}
            >
              <Icon
                source="transit-transfer"
                size={16}
                color={theme.colors.onSurfaceVariant}
              />
              <Text
                variant="labelMedium"
                style={{ color: theme.colors.onSurfaceVariant }}
              >
                {item.transfers} transfer
              </Text>
            </View>
          </View>
        </Card.Content>
      </Card>
    </Pressable>
  );
};

const SystemCards = ({ index, item }: { index: number; item: CityConfig }) => {
  const theme = useAppTheme();
  return (
    <Card
      mode="elevated"
      elevation={0}
      style={{
        marginBottom: 3,
        backgroundColor: item.selected
          ? theme.colors.secondaryContainer
          : theme.colors.elevation.level1,
        borderTopLeftRadius: index === 0 ? 24 : 6,
        borderTopRightRadius: index === 0 ? 24 : 6,
        borderBottomLeftRadius: index === CITIES.length - 1 ? 24 : 6,
        borderBottomRightRadius: index === CITIES.length - 1 ? 24 : 6,
      }}
      onPress={() => {
        item.selected = true;
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
            width: 50,
            height: 50,
            backgroundColor: theme.colors.secondary,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 17,
          }}
        >
          <Image
            source={{
              uri: item.logo,
            }}
            style={{
              width: 30,
              height: 30,
              tintColor: theme.colors.primaryContainer,
            }}
          />
        </View>
        <View style={{ flex: 1 }}>
          <Text variant="bodyMedium" style={{ color: theme.colors.onSurface }}>
            {item.name}
          </Text>
          <Text
            variant="labelSmall"
            style={{
              color: theme.colors.onSurfaceVariant,
              marginTop: 1,
            }}
          >
            {item.companies}
          </Text>
        </View>
        {/*<View
        style={{
          padding: 8,
          backgroundColor: theme.colors.secondaryContainer,
          borderRadius: 18,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Icon
          source="chevron-right"
          size={18}
          color={theme.colors.onSurfaceVariant}
        />
      </View>*/}
      </Card.Content>
    </Card>
  );
};

// Empty state component — define OUTSIDE your screen function
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

function StarburstBadge({
  color,
  size = 200,
  children,
}: {
  color: string;
  size?: number;
  children: React.ReactNode;
}) {
  // Official Material 3 10-point badge path
  const starburstPath =
    "M112.67 19.78C116.243 16.64 118.029 15.07 119.671 13.8C143.425 -4.6 176.575 -4.6 200.329 13.8C201.971 15.07 203.757 16.64 207.33 19.78C208.526 20.84 209.124 21.3601 209.724 21.8701C218.136 28.9201 228.171 33.7699 238.92 35.9599C239.688 36.1199 240.471 36.26 242.038 36.54C246.719 37.38 249.059 37.79 251.075 38.29C280.234 45.43 300.902 71.4099 301.364 101.49C301.396 103.57 301.283 105.95 301.057 110.71C300.982 112.31 300.944 113.1 300.925 113.89C300.665 124.88 303.143 135.76 308.136 145.55C308.493 146.25 308.872 146.95 309.63 148.36C311.894 152.55 313.026 154.64 313.897 156.53C326.503 183.83 319.127 216.23 295.949 235.34C294.347 236.67 292.42 238.06 288.566 240.85C287.276 241.79 286.63 242.25 286.007 242.73C277.27 249.38 270.326 258.11 265.803 268.12C265.48 268.84 265.169 269.57 264.547 271.04C262.69 275.43 261.761 277.62 260.832 279.48C247.393 306.38 217.526 320.8 188.162 314.56C186.132 314.12 183.842 313.48 179.262 312.2C177.728 311.78 176.962 311.56 176.203 311.37C165.569 308.67 154.431 308.67 143.797 311.37C143.038 311.56 142.272 311.78 140.738 312.2C136.158 313.48 133.868 314.12 131.838 314.56C102.474 320.8 72.6071 306.38 59.168 279.48C58.2388 277.62 57.3102 275.43 55.453 271.04C54.8311 269.57 54.5202 268.84 54.1975 268.12C49.6741 258.11 42.7297 249.38 33.993 242.73C33.3696 242.25 32.7244 241.79 31.434 240.85C27.5801 238.06 25.6532 236.67 24.0507 235.34C0.872993 216.23 -6.50347 183.83 6.10269 156.53C6.97419 154.64 8.10619 152.55 10.3703 148.36C11.1283 146.95 11.5074 146.25 11.8636 145.55C16.8568 135.76 19.3353 124.88 19.0745 113.89C19.0559 113.1 19.0182 112.31 18.9426 110.71C18.7168 105.95 18.6039 103.57 18.6359 101.49C19.0982 71.4099 39.7665 45.43 68.9252 38.29C70.9411 37.79 73.2814 37.38 77.9618 36.54C79.5289 36.26 80.3125 36.1199 81.0795 35.9599C91.829 33.7699 101.864 28.9201 110.276 21.8701C110.876 21.3601 111.474 20.84 112.67 19.78Z";
  return (
    <View
      style={{
        width: size,
        height: size,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* The viewBox "-14 0 128 128" strictly aligns with the mathematical extremes
        of the path above, ensuring it renders perfectly centered without being cut off.
      */}
      <Svg
        viewBox="-32 -30 380 380"
        width="110%"
        height="110%"
        style={{ position: "absolute" }}
      >
        <Path d={starburstPath} fill={color} />
      </Svg>

      {/* Inner Icon Container */}
      <View style={{ zIndex: 1 }}>{children}</View>
    </View>
  );
}

function ActionButton({
  onPress,
  label,
  color,
  hidden,
  size,
}: {
  onPress: () => void;
  label: string;
  color: string;
  hidden?: boolean;
  size?: string;
}) {
  const theme = useAppTheme();
  const scale = React.useRef(new Animated.Value(1)).current;
  const hasSeenTutorial = useOnboardingStore((state) => state.hasSeenTutorial);

  const handlePressIn = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    Animated.spring(scale, {
      toValue: 0.95,
      useNativeDriver: true,
      tension: 300,
      friction: 20,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
      tension: 300,
      friction: 20,
    }).start();
  };

  return (
    <Animated.View
      style={{
        display: hidden ? "none" : "flex",
        transform: [{ scale }],
        width: "100%",
      }}
    >
      <Pressable
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={onPress}
        style={({ pressed }) => [
          {
            height: size === "large" ? 64 : size === "small" ? 30 : 56, // Tall, luxurious button height
            borderRadius: 32, // Fully rounded pill shape
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: color,
            opacity: pressed ? 0.9 : 1,
          },
        ]}
      >
        <Text
          variant={
            size === "large"
              ? "titleMedium"
              : size === "small"
                ? "bodySmall"
                : "titleSmall"
          }
          style={{
            color:
              size === "large"
                ? theme.colors.onPrimaryContainer
                : size === "small"
                  ? theme.colors.secondary
                  : theme.colors.onPrimaryContainer,
            fontWeight: "600",
          }}
        >
          {label}
        </Text>
      </Pressable>
    </Animated.View>
  );
}

function EmptyRoutesState({
  theme,
  onTakeTour,
  onPlanTrip,
}: {
  theme: ReturnType<typeof useAppTheme>;
  onTakeTour: () => void;
  onPlanTrip: () => void;
}) {
  const tourSpring = useSpringPress();
  const planSpring = useSpringPress();
  const hasSeenTutorial = useOnboardingStore((state) => state.hasSeenTutorial);

  const tourRadius = tourSpring.scale.interpolate({
    inputRange: [0.88, 1],
    outputRange: [16, 50],
  });
  const planRadius = planSpring.scale.interpolate({
    inputRange: [0.88, 1],
    outputRange: [16, 50],
  });

  const handleNext = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    // Navigate to your main app or next onboarding step
    router.replace("/map");
  };

  return (
    <View style={styles.trah}>
      <View style={styles.graphicContainer}></View>
      <View style={styles.puh}>
        <View style={styles.versionContainer}>
          <Text
            variant="displayMedium"
            style={{
              color: theme.colors.onSurfaceVariant,
              fontWeight: "semibold",

              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
            }}
          >
            {hasSeenTutorial ? "Get Started" : strings.home.try}
          </Text>
        </View>
        <Text
          variant="labelSmall"
          style={{
            color: theme.colors.outline,
            textAlign: "center",
            width: 260,
            marginTop: 10,
          }}
        >
          {hasSeenTutorial
            ? "Get Started by Planning a Trip by clicking the button below"
            : strings.home.startbysearch}
        </Text>
      </View>

      {/* BOTTOM ACTION SECTION */}
      <View style={styles.footer}>
        <ActionButton
          label="Take Tour"
          color={theme.colors.primaryContainer}
          hidden={hasSeenTutorial}
          size="large"
          onPress={onTakeTour}
        />
        <ActionButton
          label="Open Planner"
          color={
            hasSeenTutorial ? theme.colors.surfaceBright : theme.colors.surface
          }
          size={hasSeenTutorial ? "large" : "small"}
          onPress={onPlanTrip}
        />
      </View>
    </View>
  );
}

export default function HomeScreen() {
  const hasSeenTutorial = useOnboardingStore((state) => state.hasSeenTutorial);
  const theme = useAppTheme();
  const [visible, setVisible] = useState(false);
  const recentTrips = useRecentTripsStore((state) => state.recentTrips);
  const bookmarks = useBookmarksStore((state) => state.bookmarks);
  const showDialog = () => setVisible(true);

  const hideDialog = () => setVisible(false);
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {bookmarks.length === 0 && recentTrips.length === 0 ? (
        <View style={{ flex: 1 }}>
          <EmptyRoutesState
            theme={theme}
            onTakeTour={() => {
              Haptics.selectionAsync();
              router.push("/onboarding");
            }}
            onPlanTrip={() => {
              Haptics.selectionAsync();
              router.push("/planner");
            }}
          />
        </View>
      ) : (
        <View style={{ flex: 1 }}>
          <ScrollView
            style={{
              backgroundColor: theme.dark
                ? theme.colors.surfaceDim
                : theme.colors.surface,
            }}
            contentContainerStyle={styles.scroll}
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          >
            {/* Header */}

            <View style={styles.header}>
              <View
                style={{
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <View>
                  {/*<Image
                    source={require("../../assets/images/detrologo.png")}
                    style={{
                      width: 180,
                      height: 120,
                      marginRight: 8,

                      marginLeft: 0,
                      tintColor: theme.colors.primary,
                    }}
                  />*/}
                  {/*<Text
                  variant="titleSmall"
                  style={{ color: theme.colors.onBackground }}
                >
                  Good Morning,
                </Text>
                <Text
                  variant="headlineSmall"
                  style={{ color: theme.colors.onBackground }}
                >
                  Where to?
                </Text>*/}
                </View>
                <View
                  style={{ alignItems: "center", justifyContent: "center" }}
                >
                  {/*<Button
                  icon="crosshairs-gps"
                  mode="outlined"
                  onPress={() => console.log("Pressed")}
                >
                  Delhi
                </Button>*/}
                  );
                </View>
              </View>
            </View>

            {/* Search */}

            <View style={styles.searchWrapper}>
              <SearchBar
                onPress={() => router.push("/planner")}
                hint={strings.home.searchbar}
              />
            </View>

            {/* Bookmarks */}

            <View>
              <View style={{ marginTop: 10, paddingTop: 15, gap: 10 }}>
                <View
                  style={{
                    marginLeft: 20,
                    display: bookmarks.length > 0 ? "flex" : "none",

                    marginBottom: 10,
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <View
                    style={{
                      flex: 1,
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <Icon
                      source="bookmark-box-multiple"
                      size={24}
                      color={theme.colors.onSurfaceVariant}
                    />
                    <Text style={{ marginLeft: 6 }}>
                      {strings.home.savedRoutes}
                    </Text>
                  </View>
                  <Button
                    style={{
                      width: "auto",
                      marginRight: 12,
                    }}
                    onPress={() =>
                      router.push({
                        pathname: "/listpage",
                        params: { type: "saved" },
                      })
                    }
                  >
                    <Text
                      style={{ fontSize: 12, color: theme.colors.secondary }}
                    >
                      {strings.common.viewall}
                    </Text>
                  </Button>
                </View>
                {bookmarks.length > 0 ? (
                  <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ paddingHorizontal: 16, gap: 10 }}
                  >
                    {bookmarks.map((route, index) => (
                      <BookmarkCard key={route.id} item={route} />
                    ))}
                  </ScrollView>
                ) : (
                  <View
                    style={{
                      display: "flex",
                      alignItems: "center",
                      padding: 15,

                      justifyContent: "center",
                      flex: 1,
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        backgroundColor: theme.colors.surfaceContainerLow,
                        padding: 16,
                        margin: 2,
                        borderRadius: 24,
                      }}
                    >
                      <Icon
                        source="bookmark"
                        size={34}
                        color={theme.colors.outlineVariant}
                      />
                    </View>
                    <Text
                      variant="labelLarge"
                      style={{
                        marginLeft: 5,
                        marginTop: 8,
                        color: theme.colors.outlineVariant,
                      }}
                    >
                      {strings.home.noSavedRoutes}
                    </Text>
                    <Text
                      variant="labelSmall"
                      style={{
                        textAlign: "center",
                        marginTop: 2,
                        color: theme.colors.outlineVariant,
                        width: 250,
                      }}
                    >
                      {strings.home.noSavedRoutesdesc}
                    </Text>
                  </View>
                )}
              </View>

              {/* Recent Trips */}
              <View style={{ marginTop: 24, paddingHorizontal: 16 }}>
                <View
                  style={{
                    marginLeft: 5,
                    marginBottom: 10,
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <View
                    style={{
                      flex: 1,
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <Icon
                      source="history"
                      size={24}
                      color={theme.colors.onSurfaceVariant}
                    />
                    <Text style={{ marginLeft: 5 }}>
                      {strings.home.recentTrips}
                    </Text>
                  </View>
                  <Button
                    style={{ width: "auto", marginRight: 0 }}
                    onPress={() =>
                      router.push({
                        pathname: "/listpage",
                        params: { type: "recent" },
                      })
                    }
                  >
                    <Text
                      style={{ fontSize: 12, color: theme.colors.secondary }}
                    >
                      {strings.common.viewall}
                    </Text>
                  </Button>
                </View>
                {recentTrips.length > 0 ? (
                  recentTrips.map((trip, index) => (
                    <RecentCard
                      total={recentTrips.length}
                      index={index}
                      item={trip}
                      key={trip.id}
                    />
                  ))
                ) : (
                  <View
                    style={{
                      alignItems: "center",

                      justifyContent: "center",

                      marginTop: "-35%",
                      flexDirection: "column",
                      height: "100%",
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        padding: 2,
                        margin: 3,
                        borderRadius: 24,
                      }}
                    >
                      <Icon
                        source="history"
                        size={38}
                        color={theme.colors.outlineVariant}
                      />
                    </View>
                    <Text
                      variant="labelLarge"
                      style={{
                        marginLeft: 5,
                        marginTop: 10,
                        color: theme.colors.outlineVariant,
                      }}
                    >
                      {strings.home.noRecentTrips}
                    </Text>
                  </View>
                )}
              </View>
            </View>
          </ScrollView>

          <FAB
            icon="crosshairs-gps"
            style={{
              position: "absolute",
              alignContent: "center",
              justifyContent: "center",
              margin: 16,
              right: 0,

              bottom: 0,
            }}
            label="Delhi"
            variant="secondary"
            onPress={showDialog}
          />
        </View>
      )}
      <Portal>
        <Dialog
          style={{ backgroundColor: theme.colors.surface }}
          visible={visible}
          onDismiss={hideDialog}
        >
          <Dialog.Title style={{ textAlign: "center" }}>
            {strings.home.selectnet}
          </Dialog.Title>
          <Dialog.Content>
            {CITIES.map((item, index) => (
              <SystemCards index={index} item={item} />
            ))}
          </Dialog.Content>
          <Dialog.Actions style={{ justifyContent: "center" }}>
            <Button
              style={{ width: "100%" }}
              mode="contained-tonal"
              onPress={hideDialog}
            >
              {strings.common.done}
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  scroll: { paddingBottom: 40, flexGrow: 1 },
  header: { paddingHorizontal: 20, paddingTop: 45, paddingBottom: 8 },
  searchWrapper: { paddingHorizontal: 16, paddingVertical: 12 },
  bookmarkCard: { width: 220, borderRadius: 20, padding: 16 },
  bookmarkMeta: { flexDirection: "row", gap: 10 },
  metaChip: { flexDirection: "row", alignItems: "center", gap: 4 },
  fab: {
    position: "absolute",
    alignContent: "center",
    justifyContent: "center",
    margin: 16,
    right: 0,
    bottom: 0,
  },
  trah: {
    flex: 1,
    paddingHorizontal: 24,
  },
  puh: {
    marginTop: "50%",
    alignItems: "center",
  },
  versionContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 12,
    gap: 12,
  },
  versionBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12, // completely rounded pill shape
  },
  graphicContainer: {
    marginTop: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  footer: {
    paddingBottom: 50,
    marginTop: 40,
    alignItems: "center",
    gap: 20,
    width: "100%",
  },
  button: {
    height: 64, // Tall, luxurious button height
    borderRadius: 32, // Fully rounded pill shape
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
});
