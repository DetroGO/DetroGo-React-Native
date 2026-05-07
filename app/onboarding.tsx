import React, { useRef, useState, useCallback } from "react";
import {
  Animated,
  Dimensions,
  FlatList,
  Pressable,
  StyleSheet,
  View,
  Image,
} from "react-native";
import { Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { useAmoledTheme } from "@/hooks/useAmoled";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

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

// ─── Slide data ──────────────────────────────────────────────────────────────

const SLIDES = [
  {
    key: "1",
    title: "Start with the\nSearch bar.",
    highlight: "Search bar.",
    description:
      "Tap the search bar on the home screen to begin planning your stress-free travel.",
    image: require("@/assets/onboarding/flownobg3.jpeg"),
    icon: "magnify",
  },
  {
    key: "2",
    title: "Choose your\nStations.",
    highlight: "Stations.",
    description:
      "Select your nearest station or type it in manually, then pick your final destination.",
    image: require("@/assets/onboarding/flownobg1.jpeg"),
    icon: "map-marker-distance",
  },
  {
    key: "3",
    title: "Review and\nPress Go.",
    highlight: "Press Go.",
    description:
      "Double-check your route details, tap go, and let us find the fastest path instantly.",
    image: require("@/assets/onboarding/flownobg2.jpeg"),
    icon: "check-decagram",
  },
];
// ─── Dot indicator ───────────────────────────────────────────────────────────

function DotIndicator({
  count,
  activeIndex,
  theme,
}: {
  count: number;
  activeIndex: number;
  theme: ReturnType<typeof useAmoledTheme>;
}) {
  return (
    <View style={styles.dotsRow}>
      {Array.from({ length: count }).map((_, i) => (
        <View
          key={i}
          style={{
            height: 5,
            width: i === activeIndex ? 20 : 8,
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

// ─── Slide Image Component ───────────────────────────────────────────────────

function SlideImage({
  slide,
  theme,
}: {
  slide: (typeof SLIDES)[0];
  theme: ReturnType<typeof useAmoledTheme>;
}) {
  if (slide.image) {
    return (
      <Image source={slide.image} style={styles.image} resizeMode="contain" />
    );
  }

  // Fallback if no image is provided yet
  return (
    <View
      style={[
        styles.imagePlaceholder,
        { backgroundColor: theme.colors.surfaceVariant },
      ]}
    >
      <Text
        variant="labelSmall"
        style={{ color: theme.colors.onSurfaceVariant, textAlign: "center" }}
      >
        {`// Replace with:\nrequire("@/assets/onboarding/screen${slide.key}.png")`}
      </Text>
    </View>
  );
}

// ─── Main screen ─────────────────────────────────────────────────────────────

export default function OnboardingScreen() {
  const theme = useAmoledTheme();
  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  const nextSpring = useSpringPress();
  const nextRadius = nextSpring.scale.interpolate({
    inputRange: [0.88, 1],
    outputRange: [14, 50],
  });

  const skipSpring = useSpringPress();
  const skipRadius = skipSpring.scale.interpolate({
    inputRange: [0.88, 1],
    outputRange: [14, 50],
  });

  const handleNext = useCallback(() => {
    if (activeIndex < SLIDES.length - 1) {
      flatListRef.current?.scrollToIndex({
        index: activeIndex + 1,
        animated: true,
      });
      setActiveIndex((i) => i + 1);
    } else {
      router.replace("/(tabs)");
    }
  }, [activeIndex]);

  const handleSkip = useCallback(() => {
    router.replace("/(tabs)");
  }, []);

  const onViewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: any[] }) => {
      if (viewableItems.length > 0) {
        setActiveIndex(viewableItems[0].index ?? 0);
      }
    },
  ).current;

  const isLast = activeIndex === SLIDES.length - 1;

  return (
    <SafeAreaView
      style={[styles.safe, { backgroundColor: theme.colors.surfaceDim }]}
    >
      <View style={styles.header}>
        <Text
          variant="headlineSmall"
          style={{ color: theme.colors.onSurfaceVariant }}
        >
          Onboarding
        </Text>
      </View>

      {/* Swipeable slides */}
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
            <SlideImage slide={item} theme={theme} />
          </View>
        )}
      />
      {/* Bottom content */}
      <View style={styles.bottomSection}>
        <DotIndicator
          count={SLIDES.length}
          activeIndex={activeIndex}
          theme={theme}
        />

        <Text
          variant="headlineSmall"
          style={[styles.title, { color: theme.colors.onSurface }]}
        >
          {SLIDES[activeIndex].title.replace(SLIDES[activeIndex].highlight, "")}
          <Text variant="headlineSmall" style={{ color: theme.colors.primary }}>
            {SLIDES[activeIndex].highlight}
          </Text>
        </Text>

        <Text
          variant="bodyMedium"
          style={[styles.description, { color: theme.colors.onSurfaceVariant }]}
        >
          {SLIDES[activeIndex].description}
        </Text>

        <View style={styles.btnRow}>
          {/* Skip button — hidden on last slide */}
          {!isLast && (
            <Animated.View style={{ transform: [{ scale: skipSpring.scale }] }}>
              <Pressable
                onPressIn={skipSpring.onPressIn}
                onPressOut={skipSpring.onPressOut}
                onPress={handleSkip}
                android_ripple={{
                  color: theme.colors.onSurfaceVariant + "33",
                  borderless: false,
                }}
              >
                <Animated.View
                  style={[
                    styles.btnSkip,
                    {
                      backgroundColor: theme.colors.surfaceVariant,
                      borderRadius: skipRadius,
                    },
                  ]}
                >
                  <Text
                    variant="labelLarge"
                    style={{ color: theme.colors.onSurfaceVariant }}
                  >
                    Skip
                  </Text>
                </Animated.View>
              </Pressable>
            </Animated.View>
          )}

          {/* Next / Get Started button */}
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
                  {isLast ? "Get Started" : "Next →"}
                </Text>
              </Animated.View>
            </Pressable>
          </Animated.View>
        </View>
      </View>
    </SafeAreaView>
  );
}

// ─── Styles ──────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  safe: {
    flex: 1,
  },
  header: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    flex: 1,
    textAlign: "center",
  },
  slide: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 0,
    paddingHorizontal: 24,
  },
  image: {
    width: "100%",
  },
  imagePlaceholder: {
    width: "100%",
    flex: 1,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  bottomSection: {
    paddingHorizontal: 24,
    paddingBottom: 32,
    paddingTop: 10,
  },
  dotsRow: {
    flexDirection: "row",
    gap: 6,
    marginBottom: 16,
  },
  title: {
    marginBottom: 8,
    lineHeight: 30,
  },
  description: {
    marginBottom: 28,
    lineHeight: 22,
  },
  btnRow: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
  btnSkip: {
    height: 50,
    paddingHorizontal: 22,
    alignItems: "center",
    justifyContent: "center",
  },
  btnNextWrap: {
    flex: 1,
  },
  btnNext: {
    height: 50,
    alignItems: "center",
    justifyContent: "center",
  },
});
