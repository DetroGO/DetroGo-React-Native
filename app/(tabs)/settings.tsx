import { View, Animated, Pressable } from "react-native";
import { Text, Icon, Card } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native-gesture-handler";
import { usePrefStore } from "@/store/usePrefStore";
import { useAppTheme } from "@/hooks/useAppTheme";
import { useCallback, useRef } from "react";
import { ThemeMode } from "@/types/route";

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

const THEME_OPTIONS = [
  { label: "System", value: "system", icon: "theme-light-dark" },
  { label: "Light", value: "light", icon: "white-balance-sunny" },
  { label: "Dark", value: "dark", icon: "weather-night" },
  { label: "AMOLED", value: "amoled", icon: "circle-slice-8" }, // or "brightness-1"
];

function ThemeOptionCard({
  option,
  selected,
  onSelect,
  position,
}: {
  option: (typeof THEME_OPTIONS)[0];
  selected: boolean;
  onSelect: () => void;
  position: "first" | "middle" | "last";
}) {
  const theme = useAppTheme();
  const spring = useSpringPress();
  const radius = spring.scale.interpolate({
    inputRange: [0.88, 1],
    outputRange: [14, 28],
  });

  const borderRadius = {
    first: {
      borderTopLeftRadius: 24,
      borderTopRightRadius: 24,
      borderBottomLeftRadius: 6,
      borderBottomRightRadius: 6,
    },
    middle: {
      borderTopLeftRadius: 6,
      borderTopRightRadius: 6,
      borderBottomLeftRadius: 6,
      borderBottomRightRadius: 6,
    },
    last: {
      borderTopLeftRadius: 6,
      borderTopRightRadius: 6,
      borderBottomLeftRadius: 24,
      borderBottomRightRadius: 24,
    },
  }[position];

  return (
    <Animated.View
      style={{ transform: [{ scale: spring.scale }], marginBottom: 2.8 }}
    >
      <Pressable
        onPressIn={spring.onPressIn}
        onPressOut={spring.onPressOut}
        onPress={onSelect}
        android_ripple={{
          color: theme.colors.onSecondaryContainer + "33",
          borderless: false,
        }}
      >
        <Animated.View
          style={{
            backgroundColor: selected
              ? theme.colors.secondaryContainer
              : theme.colors.elevation.level1,
            ...borderRadius,
            paddingHorizontal: 14,
            paddingVertical: 14,
            flexDirection: "row",
            alignItems: "center",
            gap: 14,
          }}
        >
          <View
            style={{
              width: 50,
              height: 50,
              backgroundColor: selected
                ? theme.colors.surfaceContainer + "22"
                : theme.colors.surfaceVariant,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 17,
            }}
          >
            <Icon
              source={option.icon}
              size={26}
              color={
                selected
                  ? theme.colors.onSecondaryContainer
                  : theme.colors.onSurfaceVariant
              }
            />
          </View>
          <Text
            variant="bodyMedium"
            style={{
              flex: 1,
              color: selected
                ? theme.colors.onSecondaryContainer
                : theme.colors.onSurface,
            }}
          >
            {option.label}
          </Text>
          {selected && (
            <Icon
              source="check-circle"
              size={22}
              color={theme.colors.onSecondaryContainer}
            />
          )}
        </Animated.View>
      </Pressable>
    </Animated.View>
  );
}

const ABOUT_ROWS: { label: string; subtitle: string; icon: string }[] = [
  { label: "Version", subtitle: "1.0.0-alpha", icon: "information-outline" },
  { label: "GitHub", subtitle: "View source code", icon: "github" },
  {
    label: "Licenses",
    subtitle: "Open source libraries",
    icon: "file-document-outline",
  },
];

export default function Settings() {
  const { themeMode, setThemeMode } = usePrefStore();
  const theme = useAppTheme();

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
        nestedScrollEnabled
        style={{ padding: 0 }}
      >
        {/* Header */}
        <View
          style={{ paddingHorizontal: 15, paddingTop: 54, paddingBottom: 8 }}
        >
          <Text
            variant="headlineSmall"
            style={{ color: theme.colors.onSurface }}
          >
            Settings
          </Text>
        </View>

        {/* Appearance section */}
        <View style={{ marginHorizontal: 15, marginTop: 24 }}>
          <Text
            variant="labelSmall"
            style={{
              color: theme.colors.onSurfaceVariant,
              marginBottom: 10,
              marginLeft: 4,
            }}
          >
            APPEARANCE
          </Text>
          {THEME_OPTIONS.map((option, i) => (
            <ThemeOptionCard
              key={option.value}
              option={option}
              selected={themeMode === option.value}
              onSelect={() => setThemeMode(option.value)}
              position={
                i === 0
                  ? "first"
                  : i === THEME_OPTIONS.length - 1
                    ? "last"
                    : "middle"
              }
            />
          ))}
        </View>

        {/* About section */}
        <View style={{ marginHorizontal: 15, marginTop: 24 }}>
          <Text
            variant="labelSmall"
            style={{
              color: theme.colors.onSurfaceVariant,
              marginBottom: 10,
              marginLeft: 4,
            }}
          >
            ABOUT
          </Text>
          {ABOUT_ROWS.map((row, i) => (
            <Animated.View
              key={row.label}
              style={{
                backgroundColor: theme.colors.elevation.level1,
                marginBottom: 2.8,
                ...(i === 0
                  ? {
                      borderTopLeftRadius: 24,
                      borderTopRightRadius: 24,
                      borderBottomLeftRadius: 6,
                      borderBottomRightRadius: 6,
                    }
                  : i === ABOUT_ROWS.length - 1
                    ? {
                        borderTopLeftRadius: 6,
                        borderTopRightRadius: 6,
                        borderBottomLeftRadius: 24,
                        borderBottomRightRadius: 24,
                      }
                    : { borderRadius: 6 }),
                paddingHorizontal: 14,
                paddingVertical: 14,
                flexDirection: "row",
                alignItems: "center",
                gap: 14,
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
                  source={row.icon}
                  size={26}
                  color={theme.colors.onSurfaceVariant}
                />
              </View>
              <View style={{ flex: 1 }}>
                <Text
                  variant="bodyMedium"
                  style={{ color: theme.colors.onSurface }}
                >
                  {row.label}
                </Text>
                <Text
                  variant="labelSmall"
                  style={{ color: theme.colors.onSurfaceVariant }}
                >
                  {row.subtitle}
                </Text>
              </View>
              <Icon
                source="chevron-right"
                size={20}
                color={theme.colors.onSurfaceVariant}
              />
            </Animated.View>
          ))}
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}
