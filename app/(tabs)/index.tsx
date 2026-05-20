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

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 32,
        marginTop: 40,
        gap: 4,
      }}
    >
      {/* Icon */}
      <View
        style={{
          width: 76,
          height: 76,
          backgroundColor: theme.colors.secondaryContainer,
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 20,
          marginBottom: 22,
        }}
      >
        <Image
          source={require("../../assets/images/detrologowhite.png")}
          style={{
            width: 70,
            height: 70,
            transform: [{ rotate: "2deg" }],

            marginLeft: 0,

            tintColor: theme.colors.onSecondaryContainer,
          }}
        />
      </View>

      {/* Headline */}
      <Text
        variant="titleLarge"
        style={{ color: theme.colors.onSurface, textAlign: "center" }}
      >
        {strings.home.try}
      </Text>

      {/* Subtitle */}
      <Text
        variant="bodySmall"
        style={{
          textAlign: "center",
          color: theme.colors.onSurfaceVariant,
          lineHeight: 20,
          width: 280,
          marginTop: 6,
          marginBottom: 28,
        }}
      >
        {hasSeenTutorial
          ? strings.common.seenTutorial
          : strings.home.startbysearch}
      </Text>

      {/* Buttons row */}
      <View style={{ flexDirection: "column", gap: 12 }}>
        {/* Take the Tour — secondary tonal */}
        <Animated.View style={{ transform: [{ scale: tourSpring.scale }] }}>
          <Pressable
            onPressIn={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft);
              tourSpring.onPressIn();
            }}
            onPressOut={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Rigid);
              tourSpring.onPressOut();
            }}
            onPress={onTakeTour}
            android_ripple={{
              color: theme.colors.onSurfaceVariant + "22",
              borderless: false,
            }}
          >
            <Animated.View
              style={{
                display: hasSeenTutorial ? "none" : "flex",
                height: 52,
                paddingHorizontal: 100,
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "row",
                gap: 8,
                backgroundColor: theme.colors.primaryContainer,
                borderRadius: tourRadius,
              }}
            >
              <Icon
                source="compass-outline"
                size={18}
                color={theme.colors.onPrimaryContainer}
              />
              <Text
                variant="labelLarge"
                style={{ color: theme.colors.onPrimaryContainer }}
              >
                {strings.common.takeTour}
              </Text>
            </Animated.View>
          </Pressable>
        </Animated.View>

        {/* Plan a Trip — primary tonal */}
        <Animated.View style={{ transform: [{ scale: planSpring.scale }] }}>
          <Pressable
            onPressIn={planSpring.onPressIn}
            onPressOut={planSpring.onPressOut}
            onPress={onPlanTrip}
            android_ripple={{
              color: theme.colors.onSecondaryContainer + "33",
              borderless: false,
            }}
          >
            <Animated.View
              style={{
                height: hasSeenTutorial ? 50 : 25,
                paddingHorizontal: hasSeenTutorial ? 100 : 0,
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "row",
                gap: 0,
                backgroundColor: hasSeenTutorial
                  ? theme.colors.primaryContainer
                  : "transparent",
                borderRadius: planRadius,
              }}
            >
              {/*<Icon source="calendar" size={18} color={theme.colors.onSurfaceVariant} />*/}
              <Text
                variant="labelMedium"
                style={{
                  color: hasSeenTutorial
                    ? theme.colors.onPrimaryContainer
                    : theme.colors.secondary,
                }}
              >
                {strings.common.planTrip}
              </Text>
            </Animated.View>
          </Pressable>
        </Animated.View>
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
});
