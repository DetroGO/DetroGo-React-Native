import { View, Animated, Pressable, Image } from "react-native";
import {
  Text,
  Icon,
  Card,
  Portal,
  Dialog,
  Button,
  Switch,
} from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native-gesture-handler";
import strings from "@/constants/strings";
import { usePrefStore } from "@/store/usePrefStore";
import { useAppTheme } from "@/hooks/useAppTheme";
import { useCallback, useRef, useState } from "react";
import { ThemeMode } from "@/types/route";

import { M3_COLORS } from "@/constants/m3Colors";
import { router } from "expo-router";

// inside Settings(), after themeMode:

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
  { label: "Amoled (Black)", value: "amoled", icon: "circle-slice-8" },
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
  position: "first" | "special" | "middle" | "last";
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
    special: {
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

function AboutOptionCard({
  row,
  position,
  onPress,
}: {
  row: (typeof ABOUT_ROWS)[0];
  position: "first" | "middle" | "last";
  onPress: () => void;
}) {
  const theme = useAppTheme();
  const spring = useSpringPress();

  const borderRadius = {
    first: {
      borderTopLeftRadius: 6,
      borderTopRightRadius: 6,
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
const GENERAL_ROWS = [
  { label: "Language", subtitle: "English", icon: "translate" },
  { label: "Notifications", subtitle: "Off", icon: "bell" },
  { label: "Home Station", subtitle: "Not set", icon: "home" },
  { label: "Work Station", subtitle: "Not set", icon: "briefcase-variant" },
];

const TRAVEL_ROWS = [
  { label: "Accessibility", subtitle: "Off", icon: "wheelchair-accessibility" },
  { label: "Avoid Interchange", subtitle: "Off", icon: "swap-horizontal-bold" },
];

const ACCOUNT_ROWS = [];

const ABOUT_ROWS: { label: string; subtitle: string; icon: string }[] = [
  { label: "Version", subtitle: "ALPHA", icon: "information-outline" },
  { label: "Source Code", subtitle: "Github", icon: "code-tags" },
  {
    label: "License",
    subtitle: "GNU GPL v3.0",
    icon: "file-document-outline",
  },
];

export default function Settings() {
  const theme = useAppTheme();
  const [visible, setVisible] = useState(false);
  const [visibleScheme, setVisibleScheme] = useState(false);
  const [visibleTheme, setVisibleTheme] = useState(false);
  const showDialog = () => setVisible(true);

  const hideDialog = () => setVisible(false);
  const hideDialogScheme = () => setVisibleScheme(false);
  const hideDialogTheme = () => setVisibleTheme(false);
  const spring = useSpringPress();
  const springtheme = useSpringPress();
  const radius = spring.scale.interpolate({
    inputRange: [0.88, 1],
    outputRange: [14, 28],
  });

  const { themeMode, setThemeMode, sourceColor, setSourceColor } =
    usePrefStore();
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
          {/*{THEME_OPTIONS.map((option, i) => (
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
          ))}*/}
          {/* Theme */}
          <Animated.View
            style={{
              transform: [{ scale: springtheme.scale }],
              marginBottom: 2.8,
            }}
          >
            <Pressable
              onPressIn={springtheme.onPressIn}
              onPressOut={springtheme.onPressOut}
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
          {/* Color Scheme */}
          <Animated.View
            style={{ transform: [{ scale: spring.scale }], marginBottom: 2.8 }}
          >
            <Pressable
              onPressIn={themeMode !== "amoled" ? spring.onPressIn : null}
              onPressOut={themeMode !== "amoled" ? spring.onPressOut : null}
              onPress={() => {
                if (themeMode !== "amoled") {
                  setVisibleScheme(true);
                }
              }}
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

          {/* AMOLED */}
          {/*<Animated.View
            style={{
              marginBottom: 2.8,
              borderTopLeftRadius: 6,
              borderTopRightRadius: 6,
              borderBottomLeftRadius: 6,
              borderBottomRightRadius: 6,
            }}
          >
            <Pressable
              android_ripple={{
                color: theme.colors.onSecondaryContainer + "33",
                borderless: false,
              }}
            >
              <Animated.View
                style={{
                  backgroundColor: theme.colors.elevation.level1,

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
                    source="circle-slice-8"
                    size={26}
                    color={theme.colors.onSurfaceVariant}
                  />
                </View>
                <View style={{ flex: 1 }}>
                  <Text
                    variant="bodyMedium"
                    style={{ color: theme.colors.onSurface }}
                  >
                    Black Theme
                  </Text>
                  <Text
                    variant="labelSmall"
                    style={{ color: theme.colors.onSurfaceVariant }}
                  >
                    Uses Black Background
                  </Text>
                </View>
                <Switch
                  value={themeMode === "amoled"}
                  onValueChange={(value) => {
                    setThemeMode(value ? "amoled" : "system");
                  }}
                />
              </Animated.View>
            </Pressable>
          </Animated.View>*/}
        </View>

        {/* General section */}
        <View style={{ marginHorizontal: 15, marginTop: 24 }}>
          <Text
            variant="labelSmall"
            style={{
              color: theme.colors.onSurfaceVariant,
              marginBottom: 10,
              marginLeft: 4,
            }}
          >
            GENERAL
          </Text>
          {GENERAL_ROWS.map((row, i) => (
            <AboutOptionCard
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

        {/* Travel Preferences section */}
        <View style={{ marginHorizontal: 15, marginTop: 24 }}>
          <Text
            variant="labelSmall"
            style={{
              color: theme.colors.onSurfaceVariant,
              marginBottom: 10,
              marginLeft: 4,
            }}
          >
            TRAVEL PREFERENCES
          </Text>
          {TRAVEL_ROWS.map((row, i) => (
            <AboutOptionCard
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

          <Animated.View
            style={{ transform: [{ scale: spring.scale }], marginBottom: 2.8 }}
          >
            <Pressable
              onPress={() => router.push({ pathname: "/onboarding" })}
              onPressIn={spring.onPressIn}
              onPressOut={spring.onPressOut}
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
                <View style={{ flex: 1 }}>
                  <View
                    style={{
                      alignItems: "center",
                      marginTop: 14,
                      marginBottom: 14,
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
                        color: theme.colors.secondary,
                        textAlign: "center",
                        marginTop: 15,
                      }}
                    >
                      Transit Utility app for Metros in India
                    </Text>
                  </View>
                </View>
              </Animated.View>
            </Pressable>
          </Animated.View>

          {ABOUT_ROWS.map((row, i) => (
            <AboutOptionCard
              key={row.label}
              row={row}
              position={
                i === 0
                  ? "first"
                  : i === ABOUT_ROWS.length - 1
                    ? "last"
                    : "middle"
              }
              onPress={() => {
                if (row.label === "Version") {
                  showDialog();
                }
              }}
            />
          ))}
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>

      {/* App About Dialog */}
      <Portal>
        <Dialog
          style={{ backgroundColor: theme.colors.surface, borderRadius: 28 }}
          visible={visible}
          onDismiss={hideDialog}
        >
          {/* App Icon Graphic */}

          {/*<View style={{ alignItems: "center", marginTop: 34 }}>
            <View
              style={{
                width: 72,
                height: 72,
                borderRadius: 20,
                backgroundColor: theme.colors.primary,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Image
                source={require("../../assets/images/detrologowhite.png")}
                style={{
                  width: 70,
                  height: 40,

                  tintColor: theme.colors.primaryContainer,
                }}
              />
            </View>
          </View>*/}

          <Dialog.Title
            style={{
              display: "flex",
              marginBottom: 28,
              marginTop: 40,
              textAlign: "center",
              paddingTop: 0,
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
              Ver 0.1 Test Alpha
            </Text>
            <Text
              variant="bodyMedium"
              style={{
                color: theme.colors.onSurfaceVariant,
                textAlign: "center",
                marginTop: 4,
              }}
            >
              Developed by Ansh Wadhwa
            </Text>
            <Text
              variant="bodySmall"
              style={{
                color: theme.colors.outline,
                textAlign: "center",
                marginTop: 16,
              }}
            >
              A transit navigation utility for the Delhi-NCR metro network.
            </Text>
            <Text
              variant="bodySmall"
              style={{
                color: theme.colors.outline,
                textAlign: "center",
                marginTop: 16,
              }}
            >
              Open Source MIT License
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
              onPress={hideDialog}
            >
              {strings.common?.done || "Close"}
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>

      {/* Color Scheme Dialog */}
      <Portal>
        <Dialog
          style={{ backgroundColor: theme.colors.surface, borderRadius: 28 }}
          visible={visibleScheme}
          onDismiss={hideDialogScheme}
        >
          <Dialog.Title
            style={{
              display: "flex",
              marginBottom: 28,
              marginTop: 40,
              textAlign: "center",
              paddingTop: 0,
              fontSize: 24,
            }}
          >
            Choose Color Scheme
          </Dialog.Title>

          <Dialog.Content>
            <View style={{ marginHorizontal: 15, marginTop: 4 }}>
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
              onPress={hideDialogScheme}
            >
              {strings.common?.done || "Close"}
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>

      <Portal>
        <Dialog
          style={{ backgroundColor: theme.colors.surface, borderRadius: 28 }}
          visible={visibleTheme}
          onDismiss={hideDialogTheme}
        >
          <Dialog.Title
            style={{
              display: "flex",
              marginBottom: 28,
              marginTop: 40,
              textAlign: "center",
              paddingTop: 0,
              fontSize: 24,
            }}
          >
            Choose Color Scheme
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
              onPress={hideDialogTheme}
            >
              {strings.common?.done || "Close"}
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </SafeAreaView>
  );
}
