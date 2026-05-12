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

import { Text } from "react-native-paper";

import { SafeAreaView } from "react-native-safe-area-context";

import { router } from "expo-router";

import { Card, Icon, Searchbar, Button} from "react-native-paper";

import { useAppTheme } from "@/hooks/useAppTheme";

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

    icon: "magnify",
  },

  {
    key: "2",

    title: "Choose your\nStations.",

    highlight: "Stations.",

    description:
      "Select your nearest station or type it in manually, then pick your final destination.",

    icon: "map-marker-distance",
  },

  {
    key: "3",

    title: "Review and\nPress Go.",

    highlight: "Press Go.",

    description:
      "Double-check your route details, tap go, and let us find the fastest path instantly.",

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

  theme: ReturnType<typeof useAppTheme>;
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

// ─── Slide 1: Search bar UI mock ─────────────────────────────────────────────

function Slide1UI({ theme }: { theme: ReturnType<typeof useAppTheme> }) {
  return (
    <View style={[styles.slideUI, { backgroundColor: theme.colors.surface }]}>
      {/* Search bar */}


    </View>
  );
}

// ─── Slide 2: Station selector UI mock ──────────────────────────────────────

function Slide2UI({ theme }: { theme: ReturnType<typeof useAppTheme> }) {
  return (
    <View style={[styles.slideUI, { backgroundColor: theme.colors.surface }]}>
      {/* Nearest station */}

      >

            {/*<Searchbar

              style={{

                backgroundColor: theme.dark

                  ? theme.colors.elevation.level3

                  : theme.colors.elevation.level3,

                color: theme.colors.onSecondaryContainer,

                borderTopLeftRadius: 5,

                borderTopRightRadius: 5,

                borderBottomLeftRadius: 5,

                borderBottomRightRadius: 5,

                fontSize: 25,

              }}

              mode="view"

              icon={"home"}

              aria-disabled={true}

              showDivider={true}

              // Call searchData when text changes

              placeholder={"Search for a station"}

              // Set the value of the searchbar to the current searchPhrase

            />*/}

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

                style={{

                  flexDirection: "row",

                  gap: 15,

                  alignItems: "center",

                }}

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

                <Card.Content

                  style={{

                    flexDirection: "row",

                    gap: 10,

                  }}

                >

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

                <Card.Content

                  style={{

                    flexDirection: "row",

                    gap: 10,

                  }}

                >

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

            <View

              style={{

                marginBottom: 5,

              }}

            >

              <Text style={{ margin: 10 }} variant="titleMedium">

                Red Line

              </Text>

            </View>

            <Card

              mode="contained"

              style={{

                marginBottom: 3,

                marginTop: 5,

                padding: 10,

                backgroundColor: theme.colors.surfaceContainerHigh,

                borderTopLeftRadius: 24,

                borderTopRightRadius: 24,

                borderBottomLeftRadius: 6,

                borderBottomRightRadius: 6,

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

                    Dilshad Garden

                  </Text>

                </View>

              </Card.Content>

            </Card>

            <Card

              mode="contained"

              style={{

                marginBottom: 3,

                padding: 10,

                backgroundColor: theme.colors.surfaceContainerHigh,

                borderTopLeftRadius: 6,

                borderTopRightRadius: 6,

                borderBottomLeftRadius: 6,

                borderBottomRightRadius: 6,

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

                    Jhilmil

                  </Text>

                </View>

              </Card.Content>

            </Card>

            <Card

              mode="contained"

              style={{

                marginBottom: 3,

                padding: 10,

                backgroundColor: theme.colors.surfaceContainerHigh,

                borderTopLeftRadius: 6,

                borderTopRightRadius: 6,

                borderBottomLeftRadius: 6,

                borderBottomRightRadius: 6,

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

                    Welcome

                  </Text>

                </View>

              </Card.Content>

            </Card>

            <Card

              mode="contained"

              style={{

                marginBottom: 3,

                padding: 10,

                backgroundColor: theme.colors.surfaceContainerHigh,

                borderTopLeftRadius: 6,

                borderTopRightRadius: 6,

                borderBottomLeftRadius: 6,

                borderBottomRightRadius: 6,

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

                    Shahdara

                  </Text>

                </View>

              </Card.Content>

      </Card>
      <Card

        mode="contained"

        style={{

          marginBottom: 3,

          padding: 10,

          backgroundColor: theme.colors.surfaceContainerHigh,

          borderTopLeftRadius: 6,

          borderTopRightRadius: 6,

          borderBottomLeftRadius: 6,

          borderBottomRightRadius: 6,

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

              Shaheed Sthal

            </Text>

          </View>

        </Card.Content>

      </Card>
    </View>
  );
}

// ─── Slide 3: Route result UI mock ──────────────────────────────────────────

function Slide3UI({ theme }: { theme: ReturnType<typeof useAppTheme> }) {
  return (

    <View
     style={styles.slideUI}
    >
      <View style={{ padding: 0,marginBottom:20, }}>

          <Card
            style={{
              backgroundColor: theme.colors.elevation.level1,
              marginBottom: 5,
              borderRadius: 18,
              borderColor:

                  theme.colors.elevation.level1,
              borderWidth: 0,
            }}
            mode="contained"

          >
            <Card.Content
              style={{
                flexDirection: "row",

                gap: 10,
              }}
            >
              <Icon
                source={"home"}
                size={24}
              />
              <Text variant="titleMedium">
                Rajiv Chowk
              </Text>
            </Card.Content>
          </Card>


          <Card
            style={{
              backgroundColor: theme.colors.elevation.level1,
              marginBottom: 15,
              borderRadius: 18,
              borderColor: theme.colors.elevation.level1,
              borderWidth: 0,
            }}
            mode="contained"

          >
            <Card.Content
              style={{
                flexDirection: "row",

                gap: 10,
              }}
            >
              <Icon source="flag" size={24} />
              <Text variant="titleMedium">Dilli Haat</Text>
            </Card.Content>
          </Card>



        <Button mode="contained">
          {strings.common.go}
        </Button>
      </View>
    {/*<Searchbar

      style={{

        backgroundColor: theme.dark

          ? theme.colors.elevation.level3

          : theme.colors.elevation.level3,

        color: theme.colors.onSecondaryContainer,

        borderTopLeftRadius: 5,

        borderTopRightRadius: 5,

        borderBottomLeftRadius: 5,

        borderBottomRightRadius: 5,

        fontSize: 25,

      }}

      mode="view"

      icon={"home"}

      aria-disabled={true}

      showDivider={true}

      // Call searchData when text changes

      placeholder={"Search for a station"}

      // Set the value of the searchbar to the current searchPhrase

    />*/}


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

        <Card.Content

          style={{

            flexDirection: "row",

            gap: 10,

          }}

        >

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

        <Card.Content

          style={{

            flexDirection: "row",

            gap: 10,

          }}

        >

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

    <View

      style={{

        marginBottom: 5,

      }}

    >

      <Text style={{ margin: 10 }} variant="titleMedium">

        Red Line

      </Text>

    </View>

    <Card

      mode="contained"

      style={{

        marginBottom: 3,

        marginTop: 5,

        padding: 10,

        backgroundColor: theme.colors.surfaceContainerHigh,

        borderTopLeftRadius: 24,

        borderTopRightRadius: 24,

        borderBottomLeftRadius: 6,

        borderBottomRightRadius: 6,

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

            Dilshad Garden

          </Text>

        </View>

      </Card.Content>

    </Card>

    <Card

      mode="contained"

      style={{

        marginBottom: 3,

        padding: 10,

        backgroundColor: theme.colors.surfaceContainerHigh,

        borderTopLeftRadius: 6,

        borderTopRightRadius: 6,

        borderBottomLeftRadius: 6,

        borderBottomRightRadius: 6,

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

            Jhilmil

          </Text>

        </View>

      </Card.Content>

      </Card>

      <Card

        mode="contained"

        style={{

          marginBottom: 3,

          padding: 10,

          backgroundColor: theme.colors.surfaceContainerHigh,

          borderTopLeftRadius: 6,

          borderTopRightRadius: 6,

          borderBottomLeftRadius: 6,

          borderBottomRightRadius: 6,

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

              Jhilmil

            </Text>

          </View>

        </Card.Content>

      </Card>



  </View>
  );
}

// ─── SlideImage dispatcher ───────────────────────────────────────────────────

function SlideUI({
  slide,

  theme,
}: {
  slide: (typeof SLIDES)[0];

  theme: ReturnType<typeof useAppTheme>;
}) {
  if (slide.key === "1") return <HomeScreenShimmer />;

  if (slide.key === "2") return <Slide2UI theme={theme} />;


  return <Slide3UI theme={theme} />;
}

// ─── Main screen ─────────────────────────────────────────────────────────────

export default function OnboardingScreen() {
  const theme = useAppTheme();
  const setHasSeenTutorial = useOnboardingStore((state) => state.setHasSeenTutorial);
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
      console.log("setting hasSeenTutorial true"); // ← add this
      setHasSeenTutorial(true);
      router.push("/planner");
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
      style={[styles.safe, { backgroundColor: theme.colors.surface }]}
    >
      <View style={styles.header} />

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
            <SlideUI slide={item} theme={theme} />
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

          {/*{!isLast && (
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
          )}*/}

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
    flex: 1,
  },

  slide: {
    flex: 1,

    alignItems: "center",

    justifyContent: "center",

    paddingHorizontal: 24,
  },

  slideUI: {
    width: "100%",

    justifyContent: "center",
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
