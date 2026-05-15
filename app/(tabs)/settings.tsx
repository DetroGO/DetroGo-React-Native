import { View, Animated, Pressable, Image } from "react-native";
import { Text, Icon, Portal, Dialog, Button } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native-gesture-handler";
import strings from "@/constants/strings";
import { usePrefStore } from "@/store/usePrefStore";
import { useAppTheme } from "@/hooks/useAppTheme";
import { useCallback, useRef, useState } from "react";
import { M3_COLORS } from "@/constants/m3Colors";
import { router } from "expo-router";

// ─── Spring hook ──────────────────────────────────────────────────────────────

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

// ─── Data ─────────────────────────────────────────────────────────────────────

const THEME_OPTIONS = [
  { label: "System", value: "system", icon: "theme-light-dark" },
  { label: "Light", value: "light", icon: "white-balance-sunny" },
  { label: "Dark", value: "dark", icon: "weather-night" },
  { label: "Amoled (Black)", value: "amoled", icon: "circle-slice-8" },
];

const GENERAL_ROWS = [
  { label: "Language", subtitle: "English", icon: "translate" },
  { label: "Notifications", subtitle: "Off", icon: "bell" },
];

const TRAVEL_ROWS = [
  { label: "Home Station", subtitle: "Not set", icon: "home" },
  { label: "Work Station", subtitle: "Not set", icon: "briefcase-variant" },
];

const ABOUT_ROWS = [
  { label: "Version", subtitle: "ALPHA", icon: "information-outline" },
  { label: "Source Code", subtitle: "Github", icon: "code-tags" },
  { label: "License", subtitle: "GNU GPL v3.0", icon: "file-document-outline" },
];

// ─── ThemeOptionCard ──────────────────────────────────────────────────────────

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

  const borderRadius =
    position === "first"
      ? {
          borderTopLeftRadius: 24,
          borderTopRightRadius: 24,
          borderBottomLeftRadius: 6,
          borderBottomRightRadius: 6,
        }
      : position === "last"
        ? {
            borderTopLeftRadius: 6,
            borderTopRightRadius: 6,
            borderBottomLeftRadius: 24,
            borderBottomRightRadius: 24,
          }
        : { borderRadius: 6 };

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

// ─── SettingsRow ──────────────────────────────────────────────────────────────

function SettingsRow({
  row,
  position,
  onPress,
}: {
  row: { label: string; subtitle: string; icon: string };
  position: "first" | "middle" | "last";
  onPress: () => void;
}) {
  const theme = useAppTheme();
  const spring = useSpringPress();

  const borderRadius =
    position === "first"
      ? {
          borderTopLeftRadius: 24,
          borderTopRightRadius: 24,
          borderBottomLeftRadius: 6,
          borderBottomRightRadius: 6,
        }
      : position === "last"
        ? {
            borderTopLeftRadius: 6,
            borderTopRightRadius: 6,
            borderBottomLeftRadius: 24,
            borderBottomRightRadius: 24,
          }
        : { borderRadius: 6 };

  return (
    <Animated.View
      style={{ transform: [{ scale: spring.scale }], marginBottom: 2.8 }}
    >
      <Pressable
        onPressIn={spring.onPressIn}
        onPressOut={spring.onPressOut}
        onPress={onPress}
        android_ripple={{
          color: theme.colors.onSecondaryContainer + "33",
          borderless: false,
        }}
      >
        <Animated.View
          style={{
            backgroundColor: theme.colors.elevation.level1,
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
      </Pressable>
    </Animated.View>
  );
}

// ─── SectionLabel ─────────────────────────────────────────────────────────────

function SectionLabel({ label }: { label: string }) {
  const theme = useAppTheme();
  return (
    <Text
      variant="labelSmall"
      style={{
        color: theme.colors.onSurfaceVariant,
        marginBottom: 10,
        marginLeft: 4,
      }}
    >
      {label}
    </Text>
  );
}

// ─── Main screen ──────────────────────────────────────────────────────────────

export default function Settings() {
  const theme = useAppTheme();
  const [visibleAbout, setVisibleAbout] = useState(false);
  const [visibleScheme, setVisibleScheme] = useState(false);
  const [visibleTheme, setVisibleTheme] = useState(false);

  const springTheme = useSpringPress();
  const springScheme = useSpringPress();

  const { themeMode, setThemeMode, sourceColor, setSourceColor } =
    usePrefStore();

  const bgColor = theme.dark
    ? theme.colors.surfaceDim
    : theme.colors.background;

  return (
    // edges={["top"]} prevents SafeAreaView from adding bottom inset (the navbar bar glitch)
    <SafeAreaView
      edges={["top"]}
      style={{ flex: 1, marginTop: -40, backgroundColor: bgColor }}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
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

        {/* ── APPEARANCE ── */}
        <View style={{ marginHorizontal: 15, marginTop: 24 }}>
          <SectionLabel label="APPEARANCE" />

          {/* Theme row */}
          <Animated.View
            style={{
              transform: [{ scale: springTheme.scale }],
              marginBottom: 2.8,
            }}
          >
            <Pressable
              onPressIn={springTheme.onPressIn}
              onPressOut={springTheme.onPressOut}
              onPress={() => setVisibleTheme(true)}
              android_ripple={{
                color: theme.colors.onSecondaryContainer + "33",
                borderless: false,
              }}
            >
              <Animated.View
                style={{
                  backgroundColor: theme.colors.elevation.level1,
                  borderTopLeftRadius: 24,
                  borderTopRightRadius: 24,
                  borderBottomLeftRadius: 6,
                  borderBottomRightRadius: 6,
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
                    source="brightness-auto"
                    size={26}
                    color={theme.colors.onSurfaceVariant}
                  />
                </View>
                <View style={{ flex: 1 }}>
                  <Text
                    variant="bodyMedium"
                    style={{ color: theme.colors.onSurface }}
                  >
                    Theme
                  </Text>
                  <Text
                    variant="labelSmall"
                    style={{ color: theme.colors.onSurfaceVariant }}
                  >
                    {themeMode === "system"
                      ? "System Default"
                      : themeMode === "amoled"
                        ? "Amoled"
                        : themeMode}
                  </Text>
                </View>
                <Icon
                  source="chevron-right"
                  size={20}
                  color={theme.colors.onSurfaceVariant}
                />
              </Animated.View>
            </Pressable>
          </Animated.View>

          {/* Color Scheme row */}
          <Animated.View
            style={{
              transform: [{ scale: springScheme.scale }],
              marginBottom: 2.8,
            }}
          >
            <Pressable
              onPressIn={
                themeMode !== "amoled" ? springScheme.onPressIn : undefined
              }
              onPressOut={
                themeMode !== "amoled" ? springScheme.onPressOut : undefined
              }
              onPress={() => themeMode !== "amoled" && setVisibleScheme(true)}
              android_ripple={{
                color: theme.colors.onSecondaryContainer + "33",
                borderless: false,
              }}
            >
              <Animated.View
                style={{
                  backgroundColor:
                    themeMode === "amoled"
                      ? theme.colors.surfaceContainerLow
                      : theme.colors.elevation.level1,
                  borderTopLeftRadius: 6,
                  borderTopRightRadius: 6,
                  borderBottomLeftRadius: 24,
                  borderBottomRightRadius: 24,
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
                    source="palette"
                    size={26}
                    color={theme.colors.onSurfaceVariant}
                  />
                </View>
                <View style={{ flex: 1 }}>
                  <Text
                    variant="bodyMedium"
                    style={{ color: theme.colors.onSurface }}
                  >
                    Color Scheme
                  </Text>
                  <Text
                    variant="labelSmall"
                    style={{ color: theme.colors.primary }}
                  >
                    {sourceColor === "system"
                      ? themeMode === "amoled"
                        ? "Managed by Amoled Mode"
                        : "Dynamic"
                      : sourceColor}
                  </Text>
                </View>
                <Icon
                  source="chevron-right"
                  size={20}
                  color={theme.colors.onSurfaceVariant}
                />
              </Animated.View>
            </Pressable>
          </Animated.View>
        </View>

        {/* ── GENERAL ── */}
        <View style={{ marginHorizontal: 15, marginTop: 24 }}>
          <SectionLabel label="GENERAL" />
          {GENERAL_ROWS.map((row, i) => (
            <SettingsRow
              key={row.label}
              row={row}
              position={
                i === 0
                  ? "first"
                  : i === GENERAL_ROWS.length - 1
                    ? "last"
                    : "middle"
              }
              onPress={() => {}}
            />
          ))}
        </View>

        {/* ── TRAVEL PREFERENCES ── */}
        <View style={{ marginHorizontal: 15, marginTop: 24 }}>
          <SectionLabel label="TRAVEL PREFERENCES" />
          {TRAVEL_ROWS.map((row, i) => (
            <SettingsRow
              key={row.label}
              row={row}
              position={
                i === 0
                  ? "first"
                  : i === TRAVEL_ROWS.length - 1
                    ? "last"
                    : "middle"
              }
              onPress={() => {}}
            />
          ))}
        </View>

        {/* ── ABOUT ── */}
        <View style={{ marginHorizontal: 15, marginTop: 24 }}>
          <SectionLabel label="ABOUT" />

          {/* App banner card */}
          <Pressable onPress={() => router.push({ pathname: "/onboarding" })}>
            <View
              style={{
                backgroundColor: theme.colors.elevation.level1,
                borderTopLeftRadius: 24,
                borderTopRightRadius: 24,
                borderBottomLeftRadius: 24,
                borderBottomRightRadius: 24,
                paddingVertical: 28,
                alignItems: "center",
                marginBottom: 10,
              }}
            >
              <Image
                source={require("../../assets/images/detrologo.png")}
                style={{
                  width: 140,
                  height: 40,
                  tintColor: theme.colors.secondary,
                }}
              />
              <Text
                style={{
                  color: theme.colors.onSurfaceVariant,
                  textAlign: "center",
                  marginTop: 12,
                }}
                variant="bodySmall"
              >
                Transit utility app for Metros in India
              </Text>
            </View>
          </Pressable>

          {ABOUT_ROWS.map((row, i) => (
            <SettingsRow
              key={row.label}
              row={row}
              position={
                i === 0
                  ? "first"
                  : i === ABOUT_ROWS.length - 1
                    ? "last"
                    : "middle"
              }
              onPress={() => row.label === "Version" && setVisibleAbout(true)}
            />
          ))}
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>

      {/* ── About dialog ── */}
      <Portal>
        <Dialog
          style={{ backgroundColor: theme.colors.surface, borderRadius: 28 }}
          visible={visibleAbout}
          onDismiss={() => setVisibleAbout(false)}
        >
          <Dialog.Title
            style={{
              marginBottom: 4,
              marginTop: 40,
              textAlign: "center",
              fontSize: 24,
            }}
          >
            <Image
              source={require("../../assets/images/detrologo.png")}
              style={{
                width: 140,
                height: 40,
                tintColor: theme.colors.secondary,
              }}
            />
          </Dialog.Title>
          <Dialog.Content>
            <Text
              variant="bodyMedium"
              style={{
                color: theme.colors.onSurfaceVariant,
                textAlign: "center",
              }}
            >
              Version: Preview
            </Text>
            <Text
              variant="bodySmall"
              style={{
                color: theme.colors.outline,
                textAlign: "center",
                marginTop: 16,
              }}
            >
              This is a preview build of DetroGo. Its may contain bugs and
              incomplete features. and is only intended for alpha testers
            </Text>
            <Text
              variant="bodySmall"
              style={{
                color: theme.colors.outline,
                textAlign: "center",
                marginTop: 8,
              }}
            >
              Thank you for testing DetroGo!
            </Text>
            <Text
              variant="bodySmall"
              style={{
                color: theme.colors.outline,
                textAlign: "center",
                marginTop: 8,
              }}
            >
              Open Source · GNU GPL v3.0
            </Text>

            <Text
              variant="bodySmall"
              style={{
                color: theme.colors.secondary,
                textAlign: "center",
                marginTop: 18,
              }}
            >
              Report Bugs & Feedback on
            </Text>
            <Text
              variant="bodySmall"
              style={{
                color: theme.colors.primary,
                textAlign: "center",
                marginTop: 8,
              }}
            >
              Discord | GitHub
            </Text>
          </Dialog.Content>
          <Dialog.Actions
            style={{
              justifyContent: "center",
              paddingBottom: 16,
              paddingHorizontal: 24,
            }}
          >
            <Button
              style={{ width: "100%" }}
              mode="contained-tonal"
              onPress={() => setVisibleAbout(false)}
            >
              {strings.common?.done ?? "Close"}
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>

      {/* ── Color scheme dialog ── */}
      <Portal>
        <Dialog
          style={{ backgroundColor: theme.colors.surface, borderRadius: 28 }}
          visible={visibleScheme}
          onDismiss={() => setVisibleScheme(false)}
        >
          <Dialog.Title
            style={{ marginTop: 40, textAlign: "center", fontSize: 24 }}
          >
            Choose Color Scheme
          </Dialog.Title>
          <Dialog.Content>
            <View
              style={{
                backgroundColor: theme.colors.elevation.level1,
                borderRadius: 24,
                padding: 16,
                flexDirection: "row",
                flexWrap: "wrap",
                alignItems: "center",
                justifyContent: "center",
                gap: 16,
              }}
            >
              {M3_COLORS.map((c) => {
                const selected = sourceColor === c.value;
                const isSystem = c.value === "system";
                return (
                  <Pressable
                    key={c.value}
                    onPress={() => setSourceColor(c.value)}
                    style={{
                      width: 50,
                      height: 50,
                      borderRadius: 22,
                      backgroundColor: isSystem
                        ? theme.colors.surfaceVariant
                        : c.value,
                      alignItems: "center",
                      justifyContent: "center",
                      borderWidth: selected ? 3 : 0,
                      borderColor: theme.colors.primary,
                    }}
                  >
                    {isSystem && (
                      <Icon
                        source="palette-swatch"
                        size={22}
                        color={theme.colors.onSurfaceVariant}
                      />
                    )}
                    {selected && !isSystem && (
                      <Icon source="check" size={20} color="#ffffff" />
                    )}
                  </Pressable>
                );
              })}
            </View>
          </Dialog.Content>
          <Dialog.Actions
            style={{
              justifyContent: "center",
              paddingBottom: 16,
              paddingHorizontal: 24,
            }}
          >
            <Button
              style={{ width: "100%" }}
              mode="contained-tonal"
              onPress={() => setVisibleScheme(false)}
            >
              {strings.common?.done ?? "Close"}
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>

      {/* ── Theme picker dialog ── */}
      <Portal>
        <Dialog
          style={{ backgroundColor: theme.colors.surface, borderRadius: 28 }}
          visible={visibleTheme}
          onDismiss={() => setVisibleTheme(false)}
        >
          <Dialog.Title
            style={{ marginTop: 40, textAlign: "center", fontSize: 24 }}
          >
            Choose Theme
          </Dialog.Title>
          <Dialog.Content>
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
          </Dialog.Content>
          <Dialog.Actions
            style={{
              justifyContent: "center",
              paddingBottom: 16,
              paddingHorizontal: 24,
            }}
          >
            <Button
              style={{ width: "100%" }}
              mode="contained-tonal"
              onPress={() => setVisibleTheme(false)}
            >
              {strings.common?.done ?? "Close"}
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </SafeAreaView>
  );
}
