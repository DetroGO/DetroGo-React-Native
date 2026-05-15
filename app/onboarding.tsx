import React, { useRef, useState, useCallback } from "react";
import HomeScreenShimmer from "@/components/homescreenui";
import {
  Animated,
  Dimensions,
  FlatList,
  Pressable,
  StyleSheet,
  View,
} from "react-native";

import { useOnboardingStore } from "@/store/onboarding";
import strings from "@/constants/strings";
import { Text, Card, Icon } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { useAppTheme } from "@/hooks/useAppTheme";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

// ─── Spring hook ─────────────────────────────────────────────────────────────

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

// ─── Slide data ───────────────────────────────────────────────────────────────

const SLIDES = [
  {
    key: "1",
    eyebrow: "Step 1",
    title: "Find your\nroute instantly.",
    highlight: "route instantly.",
    description:
      "Tap the search bar and type any Delhi Metro station — Detro finds the fastest path across all lines in seconds.",
    icon: "magnify",
  },
  {
    key: "2",
    eyebrow: "Step 2",
    title: "Pick your\nstations.",
    highlight: "stations.",
    description:
      "Detro detects your nearest station automatically. Choose a saved favourite or type your destination manually.",
    icon: "map-marker-distance",
  },
  {
    key: "3",
    eyebrow: "Step 3",
    title: "Review, then\npress Go.",
    highlight: "press Go.",
    description:
      "Check your from and to stations, hit Go, and get a full step-by-step route with line changes and fares.",
    icon: "check-decagram",
  },
];

// ─── Dot indicator ────────────────────────────────────────────────────────────

function DotIndicator({
  count,
  activeIndex,
  theme,
}: {
  count: number;
  activeIndex: number;
  theme: ReturnType<typeof useAppTheme>;
}) {
  return (
    <View style={styles.dotsRow}>
      {Array.from({ length: count }).map((_, i) => (
        <View
          key={i}
          style={{
            height: 5,
            width: i === activeIndex ? 24 : 8,
            borderRadius: 3,
            backgroundColor:
              i === activeIndex
                ? theme.colors.primary
                : theme.colors.surfaceVariant,
          }}
        />
      ))}
    </View>
  );
}

// ─── Slide 1: Search bar mock ─────────────────────────────────────────────────

function Slide1UI({ theme }: { theme: ReturnType<typeof useAppTheme> }) {
  return (
    <View style={styles.mockContainer}>
      <Card
        mode="contained"
        style={{
          backgroundColor: theme.colors.surfaceContainerHigh,
          borderRadius: 28,
          marginBottom: 12,
        }}
      >
        <Card.Content
          style={{ flexDirection: "row", alignItems: "center", gap: 12 }}
        >
          <Icon
            source="magnify"
            size={22}
            color={theme.colors.onSurfaceVariant}
          />
          <Text
            variant="bodyLarge"
            style={{ color: theme.colors.onSurfaceVariant }}
          >
            Where to?
          </Text>
        </Card.Content>
      </Card>

      <View style={{ flexDirection: "row", gap: 8, marginBottom: 12 }}>
        <Card
          mode="contained"
          style={{
            backgroundColor: theme.colors.secondaryContainer,
            flex: 1,
            borderTopLeftRadius: 18,
            borderTopRightRadius: 6,
            borderBottomLeftRadius: 18,
            borderBottomRightRadius: 6,
          }}
        >
          <Card.Content
            style={{ flexDirection: "row", gap: 8, alignItems: "center" }}
          >
            <Icon
              source="home"
              size={20}
              color={theme.colors.onSecondaryContainer}
            />
            <Text
              variant="labelLarge"
              style={{ color: theme.colors.onSecondaryContainer }}
            >
              {strings.common.home}
            </Text>
          </Card.Content>
        </Card>
        <Card
          mode="contained"
          style={{
            backgroundColor: theme.colors.secondaryContainer,
            flex: 1,
            borderTopLeftRadius: 6,
            borderTopRightRadius: 18,
            borderBottomLeftRadius: 6,
            borderBottomRightRadius: 18,
          }}
        >
          <Card.Content
            style={{ flexDirection: "row", gap: 8, alignItems: "center" }}
          >
            <Icon
              source="briefcase-variant"
              size={20}
              color={theme.colors.onSecondaryContainer}
            />
            <Text
              variant="labelLarge"
              style={{ color: theme.colors.onSecondaryContainer }}
            >
              {strings.common.work}
            </Text>
          </Card.Content>
        </Card>
      </View>

      <Text
        variant="labelMedium"
        style={{
          color: theme.colors.onSurfaceVariant,
          marginBottom: 8,
          marginLeft: 4,
        }}
      >
        Recent searches
      </Text>

      {["Rajiv Chowk", "Hauz Khas", "Chandni Chowk"].map((station, i, arr) => {
        const isFirst = i === 0;
        const isLast = i === arr.length - 1;
        return (
          <Card
            key={station}
            mode="contained"
            style={{
              backgroundColor: theme.colors.surfaceContainerHigh,
              marginBottom: isLast ? 0 : 2.8,
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
                paddingVertical: 10,
              }}
            >
              <View style={styles.iconBox}>
                <Icon
                  source="history"
                  size={22}
                  color={theme.colors.onSurfaceVariant}
                />
              </View>
              <Text
                variant="bodyMedium"
                style={{ color: theme.colors.onSurface }}
              >
                {station}
              </Text>
            </Card.Content>
          </Card>
        );
      })}
    </View>
  );
}

// ─── Slide 2: Station selector mock ──────────────────────────────────────────

function Slide2UI({ theme }: { theme: ReturnType<typeof useAppTheme> }) {
  return (
    <View
      style={[
        styles.slideUI,
        { backgroundColor: theme.colors.surface, marginBottom: 18 },
      ]}
    >
      <Card
        style={{
          backgroundColor: theme.colors.primaryContainer,
          marginTop: 12,
          paddingLeft: 5,
          borderRadius: 18,
        }}
        mode="contained"
      >
        <Card.Content
          style={{ flexDirection: "row", gap: 15, alignItems: "center" }}
        >
          <Icon
            color={theme.colors.onPrimaryContainer}
            source="crosshairs-gps"
            size={26}
          />
          <View style={{ flex: 1 }}>
            <Text
              variant="labelSmall"
              style={{ color: theme.colors.onPrimaryContainer }}
            >
              Nearest Station
            </Text>
            <Text
              variant="titleMedium"
              style={{ color: theme.colors.onPrimaryContainer }}
            >
              Rajiv Chowk
            </Text>
          </View>
        </Card.Content>
      </Card>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 4,
          marginBottom: 10,
          marginTop: 10,
        }}
      >
        <Card
          style={{
            backgroundColor: theme.colors.primaryContainer,
            flex: 1,
            alignItems: "center",
            borderTopLeftRadius: 18,
            borderTopRightRadius: 6,
            borderBottomLeftRadius: 18,
            borderBottomRightRadius: 6,
          }}
          mode="contained"
        >
          <Card.Content style={{ flexDirection: "row", gap: 10 }}>
            <Icon
              color={theme.colors.onPrimaryContainer}
              source="home"
              size={24}
            />
            <Text
              style={{ color: theme.colors.onPrimaryContainer }}
              variant="titleMedium"
            >
              {strings.common.home}
            </Text>
          </Card.Content>
        </Card>
        <Card
          style={{
            backgroundColor: theme.colors.primaryContainer,
            flex: 1,
            alignItems: "center",
            borderTopLeftRadius: 6,
            borderTopRightRadius: 18,
            borderBottomLeftRadius: 6,
            borderBottomRightRadius: 18,
          }}
          mode="contained"
        >
          <Card.Content style={{ flexDirection: "row", gap: 10 }}>
            <Icon
              color={theme.colors.onPrimaryContainer}
              source="briefcase-variant"
              size={24}
            />
            <Text
              style={{ color: theme.colors.onPrimaryContainer }}
              variant="titleMedium"
            >
              {strings.common.work}
            </Text>
          </Card.Content>
        </Card>
      </View>

      <View style={{ marginBottom: 5 }}>
        <Text style={{ margin: 10 }} variant="titleMedium">
          Red Line
        </Text>
      </View>

      {["Dilshad Garden", "Jhilmil", "Welcome"].map((name, i, arr) => {
        const isFirst = i === 0;
        const isLast = i === arr.length - 1;
        return (
          <Card
            key={name}
            mode="contained"
            style={{
              marginBottom: isLast ? 0 : 3,
              marginTop: isFirst ? 5 : 0,
              padding: 10,
              backgroundColor: theme.colors.surfaceContainerHigh,
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
              <View style={{ flex: 1 }}>
                <Text
                  variant="bodyMedium"
                  style={{ color: theme.colors.onSurface }}
                >
                  {name}
                </Text>
              </View>
            </Card.Content>
          </Card>
        );
      })}
    </View>
  );
}

// ─── Slide 3: Route result UI mock ───────────────────────────────────────────

function Slide3UI({
  theme,
  onGo,
}: {
  theme: ReturnType<typeof useAppTheme>;
  onGo: () => void;
}) {
  const goSpring = useSpringPress();
  const goRadius = goSpring.scale.interpolate({
    inputRange: [0.88, 1],
    outputRange: [14, 50],
  });

  return (
    <View style={styles.slideUI}>
      <View style={{ marginBottom: 20 }}>
        <Card
          style={{
            backgroundColor: theme.colors.elevation.level1,
            marginBottom: 5,
            borderRadius: 18,
          }}
          mode="contained"
        >
          <Card.Content style={{ flexDirection: "row", gap: 10 }}>
            <Icon source="home" size={24} color={theme.colors.onSurface} />
            <Text variant="titleMedium">Rajiv Chowk</Text>
          </Card.Content>
        </Card>

        <Card
          style={{
            backgroundColor: theme.colors.elevation.level1,
            marginBottom: 15,
            borderRadius: 18,
          }}
          mode="contained"
        >
          <Card.Content style={{ flexDirection: "row", gap: 10 }}>
            <Icon source="flag" size={24} color={theme.colors.onSurface} />
            <Text variant="titleMedium">Dilli Haat INA</Text>
          </Card.Content>
        </Card>

        {/* ── Spring Go button ── */}
        <Animated.View style={{ transform: [{ scale: goSpring.scale }] }}>
          <Pressable
            onPressIn={goSpring.onPressIn}
            onPressOut={goSpring.onPressOut}
            onPress={onGo}
            android_ripple={{
              color: theme.colors.onPrimary + "33",
              borderless: false,
            }}
          >
            <Animated.View
              style={{
                height: 52,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: theme.colors.primary,
                borderRadius: goRadius,
                flexDirection: "row",
                gap: 8,
              }}
            >
              <Text
                variant="labelLarge"
                style={{ color: theme.colors.onPrimary }}
              >
                {strings.common.go}
              </Text>
            </Animated.View>
          </Pressable>
        </Animated.View>
      </View>

      <View style={{ marginBottom: 5 }}>
        <Text style={{ margin: 10 }} variant="titleMedium">
          Yellow Line
        </Text>
      </View>

      {["Rajiv Chowk", "Patel Chowk", "Central Secretariat"].map(
        (name, i, arr) => {
          const isFirst = i === 0;
          const isLast = i === arr.length - 1;
          return (
            <Card
              key={name}
              mode="contained"
              style={{
                marginBottom: isLast ? 0 : 3,
                marginTop: isFirst ? 5 : 0,
                padding: 10,
                backgroundColor: theme.colors.surfaceContainerHigh,
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
                <View style={{ flex: 1 }}>
                  <Text
                    variant="bodyMedium"
                    style={{ color: theme.colors.onSurface }}
                  >
                    {name}
                  </Text>
                </View>
              </Card.Content>
            </Card>
          );
        },
      )}
    </View>
  );
}

// ─── Slide UI dispatcher ──────────────────────────────────────────────────────

function SlideUI({
  slide,
  theme,
  onGo,
}: {
  slide: (typeof SLIDES)[0];
  theme: ReturnType<typeof useAppTheme>;
  onGo: () => void;
}) {
  if (slide.key === "1") return <HomeScreenShimmer />;
  if (slide.key === "2") return <Slide2UI theme={theme} />;
  return <Slide3UI theme={theme} onGo={onGo} />;
}

// ─── Main screen ──────────────────────────────────────────────────────────────

export default function OnboardingScreen() {
  const theme = useAppTheme();
  const setHasSeenTutorial = useOnboardingStore(
    (state) => state.setHasSeenTutorial,
  );
  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  const nextSpring = useSpringPress();
  const nextRadius = nextSpring.scale.interpolate({
    inputRange: [0.88, 1],
    outputRange: [14, 50],
  });

  const finishOnboarding = useCallback(() => {
    setHasSeenTutorial(true);
    router.push("/planner");
  }, [setHasSeenTutorial]);

  const handleNext = useCallback(() => {
    if (activeIndex < SLIDES.length - 1) {
      flatListRef.current?.scrollToIndex({
        index: activeIndex + 1,
        animated: true,
      });
      setActiveIndex((i) => i + 1);
    } else {
      finishOnboarding();
    }
  }, [activeIndex, finishOnboarding]);

  const onViewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: any[] }) => {
      if (viewableItems.length > 0) {
        setActiveIndex(viewableItems[0].index ?? 0);
      }
    },
  ).current;

  const isLast = activeIndex === SLIDES.length - 1;
  const slide = SLIDES[activeIndex];

  return (
    <SafeAreaView
      style={[styles.safe, { backgroundColor: theme.colors.surface }]}
    >
      {/* ── Top section ── */}
      <View style={styles.topSection}>
        <DotIndicator
          count={SLIDES.length}
          activeIndex={activeIndex}
          theme={theme}
        />

        {/* Eyebrow + Skip row */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 10,
          }}
        >
          <View
            style={{
              backgroundColor: theme.colors.primaryContainer,
              paddingHorizontal: 12,
              paddingVertical: 4,
              borderRadius: 50,
            }}
          >
            <Text
              variant="labelMedium"
              style={{ color: theme.colors.onPrimaryContainer }}
            >
              {slide.eyebrow}
            </Text>
          </View>

          <Pressable
            onPress={finishOnboarding}
            android_ripple={{
              color: theme.colors.onSurfaceVariant + "22",
              borderless: true,
            }}
            style={{ paddingHorizontal: 8, paddingVertical: 4 }}
          >
            <Text
              variant="labelMedium"
              style={{ color: theme.colors.onSurfaceVariant }}
            >
              Skip
            </Text>
          </Pressable>
        </View>

        {/* Title */}
        <Text
          variant="headlineMedium"
          style={[styles.title, { color: theme.colors.onSurface }]}
        >
          {slide.title.replace(slide.highlight, "")}
          <Text
            variant="headlineMedium"
            style={{ color: theme.colors.primary }}
          >
            {slide.highlight}
          </Text>
        </Text>

        {/* Description */}
        <Text
          variant="bodyMedium"
          style={[styles.description, { color: theme.colors.onSurfaceVariant }]}
        >
          {slide.description}
        </Text>
      </View>

      {/* ── Swipeable slide UI mocks ── */}
      <FlatList
        ref={flatListRef}
        data={SLIDES}
        keyExtractor={(item) => item.key}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        bounces={false}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={{ viewAreaCoveragePercentThreshold: 50 }}
        renderItem={({ item }) => (
          <View style={[styles.slide, { width: SCREEN_WIDTH }]}>
            <SlideUI slide={item} theme={theme} onGo={finishOnboarding} />
          </View>
        )}
        style={{ flexGrow: 0 }}
      />

      {/* ── Bottom Next button (hidden on last slide) ── */}
      {!isLast && (
        <View style={styles.bottomSection}>
          <Animated.View
            style={[
              styles.btnNextWrap,
              { transform: [{ scale: nextSpring.scale }] },
            ]}
          >
            <Pressable
              onPressIn={nextSpring.onPressIn}
              onPressOut={nextSpring.onPressOut}
              onPress={handleNext}
              android_ripple={{
                color: theme.colors.onPrimary + "33",
                borderless: false,
              }}
            >
              <Animated.View
                style={[
                  styles.btnNext,
                  {
                    backgroundColor: theme.colors.primary,
                    borderRadius: nextRadius,
                  },
                ]}
              >
                <Text
                  variant="labelLarge"
                  style={{ color: theme.colors.onPrimary }}
                >
                  Next →
                </Text>
              </Animated.View>
            </Pressable>
          </Animated.View>
        </View>
      )}
    </SafeAreaView>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  safe: {
    flex: 1,
  },
  topSection: {
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 16,
  },
  dotsRow: {
    flexDirection: "row",
    gap: 6,
    marginBottom: 18,
  },
  title: {
    marginBottom: 8,
    lineHeight: 34,
  },
  description: {
    lineHeight: 22,
  },
  slide: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  mockContainer: {
    width: "100%",
  },
  iconBox: {
    width: 46,
    height: 46,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 15,
  },
  bottomSection: {
    paddingHorizontal: 24,
    paddingBottom: 32,
    paddingTop: 0,
  },
  btnNextWrap: {
    flex: 1,
  },
  slideUI: {
    width: "100%",
    justifyContent: "center",
  },
  btnNext: {
    height: 52,
    alignItems: "center",
    justifyContent: "center",
  },
});
