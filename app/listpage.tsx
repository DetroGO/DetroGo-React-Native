import React, { useRef, useCallback, useState } from "react";
import { Animated, Pressable, View, BackHandler } from "react-native";
import { Text, Card, Icon, IconButton, Button } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native-gesture-handler";
import { useAppTheme } from "@/hooks/useAppTheme";
import { useLocalSearchParams, router } from "expo-router";
import { useRecentTripsStore } from "@/store/recentTrips";
import { useBookmarksStore } from "@/store/savedRoutes";
import { RecentTrip, SavedRoute } from "@/types/route";
import { strings } from "@/constants/strings";
import * as Haptics from "expo-haptics";
import { useFocusEffect } from "@react-navigation/native";

function useSpringPress() {
  const scale = useRef(new Animated.Value(1)).current;
  const onPressIn = useCallback(() => {
    Animated.spring(scale, {
      toValue: 0.96,
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

function RouteCard({
  item,
  index,
  total,
  theme,
  selectMode,
  selected,
  onPress,
  onLongPress,
}: {
  item: RecentTrip | SavedRoute;
  index: number;
  total: number;
  theme: ReturnType<typeof useAppTheme>;
  selectMode: boolean;
  selected: boolean;
  onPress: () => void;
  onLongPress: () => void;
}) {
  const spring = useSpringPress();
  const isFirst = index === 0;
  const isLast = index === total - 1;

  return (
    <Animated.View
      style={{
        transform: [{ scale: spring.scale }],
        marginBottom: 2.8,
        opacity: selectMode && !selected ? 0.5 : 1,
      }}
    >
      <Pressable
        onPressIn={spring.onPressIn}
        onPressOut={spring.onPressOut}
        onPress={onPress}
        onLongPress={onLongPress}
        delayLongPress={350}
        android_ripple={{
          color: theme.colors.onSurface + "18",
          borderless: false,
        }}
      >
        <Card
          mode="contained"
          style={{
            backgroundColor: selected
              ? theme.colors.secondaryContainer
              : theme.colors.elevation.level1,
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
            {/* Leading: checkbox in select mode, icon otherwise */}
            <View
              style={{
                width: 50,
                height: 50,
                backgroundColor: selected
                  ? theme.colors.secondary
                  : theme.colors.surfaceVariant,
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 17,
              }}
            >
              <Icon
                source={selectMode ? (selected ? "check" : "minus") : "drag"}
                size={28}
                color={
                  selected
                    ? theme.colors.onSecondary
                    : theme.colors.onSurfaceVariant
                }
              />
            </View>

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
                  color: selected
                    ? theme.colors.onSecondaryContainer
                    : theme.colors.onSurface,
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
                    {item.stops} {strings.common.stops}
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
                    {item.transfers} {strings.common.transfers}
                    {item.transfers !== 1 ? "s" : ""}
                  </Text>
                </View>
              </View>
            </View>

            {/* Trailing */}
            {!selectMode && (
              <Icon
                source="chevron-right"
                size={20}
                color={theme.colors.onSurfaceVariant}
              />
            )}
          </Card.Content>
        </Card>
      </Pressable>
    </Animated.View>
  );
}

export default function ListPage() {
  const theme = useAppTheme();
  const { type } = useLocalSearchParams<{ type: string }>();
  const isSaved = type === "saved";

  const recentTrips = useRecentTripsStore((state) => state.recentTrips);
  const removeRecentTrip = useRecentTripsStore((state) => state.clearTrips);
  const bookmarks = useBookmarksStore((state) => state.bookmarks);
  const removeBookmark = useBookmarksStore((state) => state.removeBookmark);

  const data = isSaved ? bookmarks : recentTrips;

  const [selectMode, setSelectMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  // Exit select mode on back press
  useFocusEffect(
    useCallback(() => {
      const sub = BackHandler.addEventListener("hardwareBackPress", () => {
        if (selectMode) {
          exitSelectMode();
          return true;
        }
        return false;
      });
      return () => sub.remove();
    }, [selectMode]),
  );

  const enterSelectMode = (id: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setSelectMode(true);
    setSelectedIds(new Set([id]));
  };

  const exitSelectMode = () => {
    setSelectMode(false);
    setSelectedIds(new Set());
  };

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
        if (next.size === 0) {
          setSelectMode(false);
        }
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const selectAll = () => {
    if (allSelected) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(data.map((i) => i.id)));
    }
  };

  const deleteSelected = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
    selectedIds.forEach((id) => {
      if (isSaved) removeBookmark(id);
      else removeRecentTrip(id);
    });
    exitSelectMode();
  };

  const allSelected = selectedIds.size === data.length;

  return (
    <SafeAreaView
      style={{
        flex: 1,
        marginTop: -40,
        backgroundColor: theme.colors.background,
      }}
    >
      {/* ── Header ── */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingTop: 56,
          paddingBottom: 8,
          paddingHorizontal: 4,
        }}
      >
        {selectMode ? (
          <>
            <IconButton
              icon="close"
              size={24}
              mode="contained"
              containerColor="transparent"
              iconColor={theme.colors.onSurface}
              onPress={exitSelectMode}
            />
            <View style={{ flex: 1, paddingLeft: 4 }}>
              <Text
                variant="titleLarge"
                style={{ color: theme.colors.onSurface }}
              >
                {selectedIds.size} {strings.common.selected}
              </Text>
            </View>
            <Button
              onPress={selectAll}
              textColor={theme.colors.secondary}
              style={{ marginRight: 4 }}
              icon={allSelected ? "select-off" : "select-all"}
            ></Button>
          </>
        ) : (
          <>
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
            <View style={{ width: 48 }} />
          </>
        )}
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled={true}
        style={{ flex: 1 }}
      >
        {/* ── Count label ── */}
        {data.length > 0 && !selectMode && (
          <Text
            variant="labelSmall"
            style={{
              color: theme.colors.onSurfaceVariant,
              paddingHorizontal: 20,
              paddingBottom: 10,
              marginTop: 4,
            }}
          >
            {data.length}{" "}
            {isSaved ? strings.listpage.savedRoutes : strings.home.recentTrips}
            {data.length !== 1 ? "s" : ""}
          </Text>
        )}

        {/* ── List ── */}
        <View
          style={{ paddingHorizontal: 15, paddingTop: 4, paddingBottom: 120 }}
        >
          {data.length === 0 ? (
            <View style={{ alignItems: "center", marginTop: 60, gap: 12 }}>
              <Icon
                source={isSaved ? "bookmark-off-outline" : "history"}
                size={48}
                color={theme.colors.outlineVariant}
              />
              <Text
                variant="bodyMedium"
                style={{
                  color: theme.colors.onSurfaceVariant,
                  textAlign: "center",
                }}
              >
                {isSaved
                  ? strings.listpage.noSavedRoutes
                  : strings.listpage.noRecentRoutes}
              </Text>
            </View>
          ) : (
            data.map((item, index) => (
              <RouteCard
                key={item.id}
                item={item}
                index={index}
                total={data.length}
                theme={theme}
                selectMode={selectMode}
                selected={selectedIds.has(item.id)}
                onLongPress={() => {
                  if (!selectMode) enterSelectMode(item.id);
                  else toggleSelect(item.id);
                }}
                onPress={() => {
                  if (selectMode) {
                    toggleSelect(item.id);
                  } else {
                    router.push({
                      pathname: "/route",
                      params: { start: item.from, end: item.to },
                    });
                  }
                }}
              />
            ))
          )}
        </View>
      </ScrollView>

      {/* ── Delete FAB — only in select mode ── */}
      {selectMode && selectedIds.size > 0 && (
        <View
          style={{
            position: "absolute",
            bottom: 32,
            left: 20,
            right: 20,
          }}
        >
          <Pressable
            onPress={deleteSelected}
            style={{
              backgroundColor: theme.colors.errorContainer,
              borderRadius: 28,
              paddingVertical: 16,
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "row",
              gap: 10,
            }}
          >
            <Icon
              source="trash-can-outline"
              size={22}
              color={theme.colors.onErrorContainer}
            />
            <Text
              style={{
                color: theme.colors.onErrorContainer,
                fontSize: 16,
                fontWeight: "600",
              }}
            >
              {strings.common.delete} {selectedIds.size}{" "}
              {selectedIds.size === 1
                ? strings.common.item
                : strings.common.items}
            </Text>
          </Pressable>
        </View>
      )}
    </SafeAreaView>
  );
}
