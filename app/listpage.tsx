import React, { useRef, useCallback } from "react";
import { Animated, Pressable, View } from "react-native";
import { Text, Card, Icon, IconButton } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native-gesture-handler";
import { useAppTheme } from "@/hooks/useAppTheme";
import { useLocalSearchParams, router } from "expo-router";
import { useRecentTripsStore } from "@/store/recentTrips";
import { useBookmarksStore } from "@/store/savedRoutes";
import { RecentTrip, SavedRoute } from "@/types/route";
import { useStrings } from "@/constants/strings";

// ─── Spring hook ────────────────────────────────────────────────────────────
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

// ─── Mock data ───────────────────────────────────────────────────────────────

// ─── RouteCard ───────────────────────────────────────────────────────────────
function RouteCard({
  item,
  index,
  total,
  theme,
}: {
  item: RecentTrip | SavedRoute;
  index: number;
  total: number;
  theme: ReturnType<typeof useAppTheme>;
}) {
  const spring = useSpringPress();
  const radius = spring.scale.interpolate({
    inputRange: [0.88, 1],
    outputRange: [10, 17],
  });

  const isFirst = index === 0;
  const isLast = index === total - 1;

  return (
    <Animated.View
      style={{ transform: [{ scale: spring.scale }], marginBottom: 2.8 }}
    >
      <Pressable
        onPressIn={spring.onPressIn}
        onPressOut={spring.onPressOut}
        onPress={() =>
          router.push({
            pathname: "/route",
            params: { start: item.from, end: item.to },
          })
        }
        android_ripple={{
          color: theme.colors.onSurface + "18",
          borderless: false,
        }}
      >
        <Card
          mode="contained"
          style={{
            backgroundColor: theme.colors.elevation.level1,
            borderTopLeftRadius: isFirst ? 24 : 6,
            borderTopRightRadius: isFirst ? 24 : 6,
            borderBottomLeftRadius: isLast ? 24 : 6,
            borderBottomRightRadius: isLast ? 24 : 6,
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
            {/* Leading icon box */}
            <Animated.View
              style={{
                width: 50,
                height: 50,
                backgroundColor: theme.colors.surfaceVariant,
                alignItems: "center",
                justifyContent: "center",
                borderRadius: radius,
              }}
            >
              <Icon
                source="source-commit"
                size={30}
                color={theme.colors.onSurfaceVariant}
              />
            </Animated.View>

            {/* Text block */}
            <View style={{ flex: 1 }}>
              <Text
                variant="labelSmall"
                style={{ color: theme.colors.onSurfaceVariant }}
                numberOfLines={1}
              >
                {item.from}
              </Text>
              <Text
                variant="titleSmall"
                style={{
                  color: theme.colors.onSurface,
                  marginTop: 2,
                  marginBottom: 6,
                }}
                numberOfLines={1}
              >
                {item.to}
              </Text>
              <View style={{ flexDirection: "row", gap: 12 }}>
                <View
                  style={{ flexDirection: "row", alignItems: "center", gap: 4 }}
                >
                  <Icon
                    source="subway-variant"
                    size={14}
                    color={theme.colors.onSurfaceVariant}
                  />
                  <Text
                    variant="labelSmall"
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
                    size={14}
                    color={theme.colors.onSurfaceVariant}
                  />
                  <Text
                    variant="labelSmall"
                    style={{ color: theme.colors.onSurfaceVariant }}
                  >
                    {item.transfers} transfer{item.transfers !== 1 ? "s" : ""}
                  </Text>
                </View>
              </View>
            </View>

            {/* Trailing chevron */}
            <Icon
              source="chevron-right"
              size={20}
              color={theme.colors.onSurfaceVariant}
            />
          </Card.Content>
        </Card>
      </Pressable>
    </Animated.View>
  );
}

// ─── Screen ──────────────────────────────────────────────────────────────────
export default function ListPage() {
  const theme = useAppTheme();
  const strings = useStrings();
  const { type } = useLocalSearchParams<{ type: string }>();
  const isSaved = type === "saved";

  const recentTrips = useRecentTripsStore((state) => state.recentTrips);
  const bookmarks = useBookmarksStore((state) => state.bookmarks);

  const data = isSaved ? bookmarks : recentTrips;

  return (
    <SafeAreaView
      style={{
        flex: 1,
        marginTop: -40,
        backgroundColor: theme.colors.background,
      }}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled={true}
        style={{ padding: 0 }}
      >
        {/* ── Header ── */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingTop: 56,
            paddingBottom: 16,
            paddingHorizontal: 4,
          }}
        >
          <IconButton
            icon="arrow-left"
            size={24}
            mode="contained"
            containerColor="transparent"
            iconColor={theme.colors.onSurface}
            onPress={() => router.back()}
          />
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
            }}
          >
            <Icon
              source={isSaved ? "bookmark-multiple" : "history"}
              size={22}
              color={theme.colors.onSurface}
            />
            <Text
              variant="titleLarge"
              style={{ color: theme.colors.onSurface }}
            >
              {isSaved
                ? strings.listpage.savedRoutes
                : strings.listpage.recentRoutes}
            </Text>
          </View>
          {/* Right slot — keeps title centred */}
          <View style={{ width: 48 }} />
        </View>

        {/* ── List ── */}
        <View
          style={{ paddingHorizontal: 15, paddingTop: 8, paddingBottom: 32 }}
        >
          {data.length === 0 ? (
            <Text
              variant="bodyMedium"
              style={{
                color: theme.colors.onSurfaceVariant,
                textAlign: "center",
                marginTop: 40,
              }}
            >
              {isSaved
                ? strings.listpage.noSavedRoutes
                : strings.listpage.noRecentRoutes}
            </Text>
          ) : (
            data.map((item, index) => (
              <RouteCard
                key={item.id}
                item={item}
                index={index}
                total={data.length}
                theme={theme}
              />
            ))
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
