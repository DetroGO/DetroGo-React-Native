import React, { useEffect, useRef } from "react";
import { Animated, Easing, StyleSheet, View, ScrollView } from "react-native";
import { useAppTheme } from "@/hooks/useAppTheme";
import SearchBar from "@/components/ui/searchbar";
// ─── Single shimmer bar ───────────────────────────────────────────────────────

function ShimmerBar({
  width,
  height = 14,
  borderRadius = 8,
  progress,
  baseColor,
  highlightColor,
  theme,
  style,
}: {
  width: number | `${number}%`;
  height?: number;
  borderRadius?: number;
  progress: Animated.AnimatedInterpolation<string | number>;
  baseColor: string;
  highlightColor: string;
  theme: ReturnType<typeof useAppTheme>;
  style?: object;
}) {
  const shimmerBg = progress.interpolate({
    inputRange: [0, 0.4, 0.6, 1],
    outputRange: [baseColor, highlightColor, highlightColor, baseColor],
  });

  return (
    <Animated.View
      style={[
        {
          width,
          height,
          borderRadius,
          backgroundColor: theme.colors.elevation.level3,
        },
        style,
      ]}
    />
  );
}

// ─── useShimmer hook ──────────────────────────────────────────────────────────

function useShimmer() {
  const anim = useRef(new Animated.Value(0)).current;

  return anim;
}

// ─── HomeScreen shimmer layout ────────────────────────────────────────────────

export default function HomeScreenShimmer() {
  const theme = useAppTheme();
  const progress = useShimmer();

  const base = theme.colors.elevation.level1;

  const highlight = theme.colors.elevation.level3;

  const S = (
    props: Omit<
      React.ComponentProps<typeof ShimmerBar>,
      "progress" | "baseColor" | "highlightColor"
    >,
  ) => (
    <ShimmerBar
      {...props}
      progress={progress}
      theme={theme}
      baseColor={base}
      highlightColor={highlight}
    />
  );

  return (
    <View
      style={[
        styles.root,
        {
          marginTop: 10,

          backgroundColor: theme.colors.surface,
        },
      ]}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        scrollEnabled={false}
        contentContainerStyle={styles.scroll}
      >
        {/* ── Search bar ── */}
        <SearchBar />

        {/* ── Bookmarks section ── */}
        <View style={styles.section}>
          {/* Section header row */}
          <View style={styles.sectionHeader}>
            <S width={20} height={20} borderRadius={6} />
            <S
              width={110}
              height={14}
              borderRadius={7}
              style={{ marginLeft: 6 }}
            />
            <View style={{ flex: 1 }} />
            <S width={56} height={14} borderRadius={7} />
          </View>

          {/* Horizontal bookmark cards */}
          <ScrollView
            horizontal
            scrollEnabled={false}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalRow}
          >
            {[0, 1, 2].map((i) => (
              <View
                key={i}
                style={[
                  styles.bookmarkCard,
                  { backgroundColor: base, borderRadius: 20 },
                ]}
              >
                <S width="55%" height={12} borderRadius={6} />
                <S
                  width="80%"
                  height={16}
                  borderRadius={8}
                  style={{ marginTop: 8 }}
                />
                <View style={styles.chipRow}>
                  <S width={70} height={12} borderRadius={6} />
                  <S width={80} height={12} borderRadius={6} />
                </View>
              </View>
            ))}
          </ScrollView>
        </View>

        {/* ── Recent trips section ── */}
        <View style={styles.sectionPadded}>
          {/* Section header row */}
          <View style={styles.sectionHeader}>
            <S width={20} height={20} borderRadius={6} />
            <S
              width={90}
              height={14}
              borderRadius={7}
              style={{ marginLeft: 6 }}
            />
            <View style={{ flex: 1 }} />
            <S width={56} height={14} borderRadius={7} />
          </View>

          {/* Trip cards */}
          {[0, 1].map((i, _, arr) => (
            <View
              key={i}
              style={[
                styles.recentCard,
                {
                  backgroundColor: base,
                  marginBottom: 2.8,
                  borderTopLeftRadius: i === 0 ? 24 : 6,
                  borderTopRightRadius: i === 0 ? 24 : 6,
                  borderBottomLeftRadius: i === arr.length - 1 ? 24 : 6,
                  borderBottomRightRadius: i === arr.length - 1 ? 24 : 6,
                },
              ]}
            >
              {/* Icon box */}
              <S width={50} height={50} borderRadius={17} />
              {/* Text lines */}
              <View style={styles.recentText}>
                <S width="55%" height={14} borderRadius={7} />
                <S
                  width="38%"
                  height={11}
                  borderRadius={6}
                  style={{ marginTop: 6 }}
                />
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  root: {
    flex: 1,
    width: "100%",
  },
  scroll: {
    paddingBottom: 40,
  },
  searchWrapper: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 12,
  },
  section: {
    marginTop: 20,
    paddingTop: 15,
    gap: 10,
  },
  sectionPadded: {
    marginTop: 24,
    paddingHorizontal: 16,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 20,
    marginBottom: 10,
    marginRight: 20,
  },
  horizontalRow: {
    paddingHorizontal: 16,
    gap: 10,
  },
  bookmarkCard: {
    width: 220,
    padding: 20,
    paddingTop: 16,
    marginBottom: 4,
    gap: 0,
  },
  chipRow: {
    flexDirection: "row",
    gap: 10,
    marginTop: 14,
  },
  recentCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    paddingHorizontal: 14,
    paddingVertical: 14,
  },
  recentText: {
    flex: 1,
    gap: 0,
  },
});
