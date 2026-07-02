import {
  View,
  Animated,
  Pressable,
  Image,
  SectionList,
  ToastAndroid,
  Platform,
  Linking,
} from "react-native";
import * as Location from "expo-location";

import {
  Text,
  Icon,
  Portal,
  Dialog,
  Button,
  Switch,
  ToggleButton,
  Searchbar,
  IconButton,
} from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native-gesture-handler";
import { LANGUAGE_OPTIONS, useStrings } from "@/constants/strings";
import { usePrefStore } from "@/store/usePrefStore";
import { useAppTheme } from "@/hooks/useAppTheme";
import { useCallback, useMemo, useRef, useState } from "react";
import { M3_COLORS } from "@/constants/m3Colors";
import { router } from "expo-router";
import metroLines from "@/cities/delhi/metrolines.json";
import { ensureNotificationPermission } from "@/utils/detroLiveNotif";
import { LanguageCode, ThemeMode } from "@/types/route";

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

const THEME_OPTIONS: { label: string; value: ThemeMode; icon: string }[] = [
  { label: "System", value: "system", icon: "theme-light-dark" },
  { label: "Light", value: "light", icon: "white-balance-sunny" },
  { label: "Dark", value: "dark", icon: "weather-night" },
  { label: "Amoled (Black)", value: "amoled", icon: "circle-slice-8" },
];

type TransitLines = Record<string, string[]>;
type StationTarget = "home" | "work";

const initialStationSections = Object.entries(metroLines as TransitLines).map(
  ([title, data]) => ({
    title,
    data,
  }),
);

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
  trailing,
}: {
  row: { label: string; subtitle: string; icon: string };
  position: "first" | "middle" | "last";
  onPress: () => void;
  trailing?: React.ReactNode;
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
              style={{ color: theme.colors.onSurface, marginBottom: 2 }}
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
          {trailing ?? (
            <Icon
              source="chevron-right"
              size={20}
              color={theme.colors.onSurfaceVariant}
            />
          )}
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

function OptionRow({
  label,
  selected,
  onPress,
  index,
  section,
}: {
  label: string;
  selected: boolean;
  onPress: () => void;
  index: number;
  section: { data: string[] };
}) {
  const theme = useAppTheme();

  return (
    <Pressable onPress={onPress}>
      <View
        style={{
          backgroundColor: selected
            ? theme.colors.secondaryContainer
            : theme.colors.elevation.level1,

          paddingHorizontal: 18,
          paddingVertical: 18,
          borderTopLeftRadius: index === 0 ? 22 : 6,
          borderTopRightRadius: index === 0 ? 22 : 6,
          borderBottomLeftRadius: index === section.data.length - 1 ? 22 : 6,
          borderBottomRightRadius: index === section.data.length - 1 ? 22 : 6,
          marginBottom: 3,
          flexDirection: "row",
          alignItems: "center",
          gap: 12,
        }}
      >
        <Text
          variant="bodyMedium"
          style={{
            flex: 1,
            color: selected
              ? theme.colors.onSecondaryContainer
              : theme.colors.onSurface,
          }}
        >
          {label}
        </Text>
        {selected && (
          <Icon
            source="check-circle"
            size={20}
            color={theme.colors.onSecondaryContainer}
          />
        )}
      </View>
    </Pressable>
  );
}

function StationPickerDialog({
  visible,
  title,
  selectedStation,
  searchPhrase,
  onSearchChange,
  onDismiss,
  onSelect,
}: {
  visible: boolean;
  title: string;
  selectedStation: string | null;
  searchPhrase: string;
  onSearchChange: (value: string) => void;
  onDismiss: () => void;
  onSelect: (station: string) => void;
}) {
  const theme = useAppTheme();
  const strings = useStrings();
  const sections = useMemo(() => {
    const query = searchPhrase.trim().toLowerCase();
    if (!query) return initialStationSections;

    return initialStationSections
      .map((section) => ({
        ...section,
        data: section.data.filter((station) =>
          station.toLowerCase().includes(query),
        ),
      }))
      .filter((section) => section.data.length > 0);
  }, [searchPhrase]);

  return (
    <Portal>
      <Dialog
        style={{ backgroundColor: theme.colors.surface, borderRadius: 28 }}
        visible={visible}
        onDismiss={onDismiss}
      >
        <Dialog.Title
          style={{ marginTop: 28, textAlign: "center", fontSize: 22 }}
        >
          {title}
        </Dialog.Title>
        <Dialog.Content>
          <Searchbar
            value={searchPhrase}
            onChangeText={onSearchChange}
            mode="bar"
            placeholder="Search station"
            style={{
              marginBottom: 12,
              backgroundColor: theme.colors.elevation.level1,
            }}
          />
          <SectionList
            sections={sections}
            keyExtractor={(item, index) => `${item}-${index}`}
            style={{ maxHeight: 360 }}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
            renderSectionHeader={({ section }) => (
              <Text
                variant="labelSmall"
                style={{
                  color: theme.colors.onSurfaceVariant,
                  marginTop: 10,
                  marginBottom: 6,
                }}
              >
                {section.title}
              </Text>
            )}
            renderItem={({ item, index, section }) => (
              <OptionRow
                index={index}
                section={section}
                label={item}
                selected={selectedStation === item}
                onPress={() => onSelect(item)}
              />
            )}
          />
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
            onPress={onDismiss}
          >
            {strings.common.done}
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
}

// ─── Main screen ──────────────────────────────────────────────────────────────

export default function Settings() {
  const theme = useAppTheme();
  const strings = useStrings();
  const [visibleAbout, setVisibleAbout] = useState(false);
  const [visibleScheme, setVisibleScheme] = useState(false);
  const [visibleTheme, setVisibleTheme] = useState(false);
  const [visibleLanguage, setVisibleLanguage] = useState(false);
  const [stationTarget, setStationTarget] = useState<StationTarget | null>(
    null,
  );
  const [stationSearch, setStationSearch] = useState("");

  const springTheme = useSpringPress();
  const springScheme = useSpringPress();

  const ABOUT_ROWS = [
    {
      label: strings.settings.reportBug,
      subtitle: strings.settings.githubIssues,
      icon: "bug",
      onPress: () =>
        Linking.openURL(
          "https://github.com/DetroGO/DetroGo-React-Native/issues",
        ),
    },
    {
      label: strings.settings.sourceCode,
      subtitle: strings.settings.github,
      icon: "code-tags",
      onPress: () =>
        Linking.openURL("https://github.com/DetroGO/DetroGo-React-Native"),
    },
    {
      label: strings.settings.license,
      subtitle: strings.settings.licenseDesc,
      icon: "file-document-outline",
      onPress: () =>
        Linking.openURL(
          "https://raw.githubusercontent.com/DetroGO/DetroGo-React-Native/refs/heads/main/LICENSE",
        ),
    },
  ];

  const {
    themeMode,
    setThemeMode,
    sourceColor,
    setSourceColor,
    language,
    setLanguage,
    notificationsEnabled,
    setNotificationsEnabled,
    locationEnabled,
    setLocationEnabled,
    homeStation,
    setHomeStation,
    workStation,
    setWorkStation,
  } = usePrefStore();

  const languageLabel =
    LANGUAGE_OPTIONS.find((option) => option.value === language)?.label ??
    "English";
  const generalRows: {
    id: "language" | "notifications" | "location";
    label: string;
    subtitle: string;
    icon: string;
  }[] = [
    {
      id: "language",
      label: strings.settings.language,
      subtitle: languageLabel,
      icon: "translate",
    },
    {
      id: "notifications",
      label: strings.settings.notifications + " (Beta)",
      subtitle: "Used for Live Updates/Notifications",
      icon: notificationsEnabled ? "bell-ring" : "bell-outline",
    },
    {
      id: "location",
      label: strings.settings.location + " (GPS)",
      subtitle: "Used for GPS on Map and Live Updates",
      icon: locationEnabled ? "crosshairs-gps" : "crosshairs",
    },
  ];
  const travelRows: {
    id: StationTarget;
    label: string;
    subtitle: string;
    icon: string;
  }[] = [
    {
      id: "home",
      label: strings.settings.homeStation,
      subtitle: homeStation ?? strings.settings.notSet,
      icon: "home",
    },
    {
      id: "work",
      label: strings.settings.workStation,
      subtitle: workStation ?? strings.settings.notSet,
      icon: "briefcase-variant",
    },
  ];

  const openStationPicker = (target: StationTarget) => {
    setStationSearch("");
    setStationTarget(target);
  };

  const selectStation = (station: string) => {
    if (stationTarget === "home") {
      setHomeStation(station);
    } else if (stationTarget === "work") {
      setWorkStation(station);
    }

    setStationTarget(null);
    setStationSearch("");
  };
  const openAppSettings = async () => {
    try {
      await Linking.openSettings();
    } catch {
      ToastAndroid.show(
        "Open app settings and enable Location permission manually.",
        ToastAndroid.LONG,
      );
    }
  };

  const toggleNotifications = async () => {
    if (notificationsEnabled) {
      setNotificationsEnabled(false);
      return;
    }

    const allowed = await ensureNotificationPermission();
    setNotificationsEnabled(allowed);

    if (!allowed && Platform.OS === "android") {
      ToastAndroid.show(strings.settings.permissionDenied, ToastAndroid.SHORT);
    }
  };
  const toggleLocation = async () => {
    if (locationEnabled) {
      setLocationEnabled(false);
      return;
    }

    const current = await Location.getForegroundPermissionsAsync();

    if (current.granted) {
      setLocationEnabled(true);
      return;
    }

    const requested = await Location.requestForegroundPermissionsAsync();

    if (requested.granted) {
      setLocationEnabled(true);
      return;
    }

    setLocationEnabled(false);

    if (!requested.canAskAgain) {
      ToastAndroid.show(
        "Enable Location permission from app settings.",
        ToastAndroid.LONG,
      );
      await openAppSettings();
    } else {
      ToastAndroid.show("Location permission denied", ToastAndroid.SHORT);
    }
  };

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
            {strings.settings.settings}
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
                    {strings.settings.theme}
                  </Text>
                  <Text
                    variant="labelSmall"
                    style={{ color: theme.colors.onSurfaceVariant }}
                  >
                    {themeMode === "system"
                      ? strings.common.systemDefault
                      : themeMode === "amoled"
                        ? strings.common.amoled
                        : themeMode.charAt(0).toUpperCase() +
                          themeMode.slice(1)}
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
                    {strings.settings.colorScheme}
                  </Text>
                  <Text
                    variant="labelSmall"
                    style={{ color: theme.colors.primary }}
                  >
                    {sourceColor === "system"
                      ? themeMode === "amoled"
                        ? strings.common.colorsAmoled
                        : strings.common.dynamicColors
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
          <SectionLabel label={strings.settings.general} />
          {generalRows.map((row, i) => (
            <SettingsRow
              key={row.id}
              row={row}
              position={
                i === 0
                  ? "first"
                  : i === generalRows.length - 1
                    ? "last"
                    : "middle"
              }
              onPress={() => {
                if (row.id === "language") setVisibleLanguage(true);
                if (row.id === "notifications") toggleNotifications();
                if (row.id === "location") toggleLocation();
              }}
              trailing={
                row.id === "notifications" ? (
                  <Switch
                    value={notificationsEnabled}
                    onValueChange={toggleNotifications}
                  />
                ) : row.id === "location" ? (
                  <Switch
                    value={locationEnabled}
                    onValueChange={toggleLocation}
                  />
                ) : undefined
              }
            />
          ))}
        </View>

        {/* ── TRAVEL PREFERENCES ── */}
        <View style={{ marginHorizontal: 15, marginTop: 24 }}>
          <SectionLabel label={strings.settings.travelPreferences} />
          {travelRows.map((row, i) => (
            <SettingsRow
              key={row.id}
              row={row}
              position={
                i === 0
                  ? "first"
                  : i === travelRows.length - 1
                    ? "last"
                    : "middle"
              }
              onPress={() => openStationPicker(row.id)}
            />
          ))}
        </View>

        {/* ── ABOUT ── */}
        <View style={{ marginHorizontal: 15, marginTop: 24 }}>
          <SectionLabel label={strings.settings.about} />

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
              onPress={() => row.onPress()}
            />
          ))}
          {/* App banner card */}
          <View
            style={{
              backgroundColor: theme.colors.secondaryContainer,
              borderRadius: 24,
              paddingVertical: 28,
              paddingHorizontal: 20,
              alignItems: "center",
              marginTop: 18,

              gap: 16,
            }}
          >
            <Pressable
              onPress={() => setVisibleAbout(true)}
              style={{ alignItems: "center" }}
            >
              <Image
                source={require("../../assets/images/detrologo.png")}
                style={{
                  width: 140,
                  height: 40,
                  tintColor: theme.colors.onSecondaryContainer,
                }}
              />
              <Text
                style={{
                  color: theme.colors.primary,
                  textAlign: "center",
                  marginTop: 8,
                }}
                variant="bodySmall"
              >
                v0.1.0-alpha
              </Text>
              <Text
                style={{
                  color: theme.colors.onSecondaryContainer,
                  textAlign: "center",
                  width: 300,
                  marginTop: 12,
                }}
                variant="bodySmall"
              >
                This is an alpha build of DetroGo. Things may break and features
                will change across future releases. If you encounter bugs or
                have feature requests, reach out via Discord or drop an issue on
                GitHub. Your feedback directly shapes what gets built next.
              </Text>
              <Text
                variant="bodySmall"
                style={{
                  color: theme.colors.onSecondaryContainer,
                  textAlign: "center",
                  marginTop: 10,
                }}
              >
                Thank you for testing DetroGo!
              </Text>
            </Pressable>

            <View
              style={{
                flexDirection: "column",
                gap: 8,
                width: "100%",
                marginTop: 6,
              }}
            >
              {[
                {
                  icon: "web",
                  label: "Website",
                  url: "https://detrogo.vercel.app",
                },
                {
                  icon: "forum",
                  label: "Join Discord",
                  url: "https://discord.gg/kzhhKVMWA5",
                },
              ].map((item) => (
                <Button
                  key={item.label}
                  mode="elevated"
                  icon={item.icon}
                  onPress={() => Linking.openURL(item.url)}
                  style={{ flex: 1 }}
                  labelStyle={{ color: theme.colors.onSecondaryContainer }}
                  compact
                >
                  {item.label}
                </Button>
              ))}
            </View>
          </View>
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>

      {/* ── About dialog ── */}

      {/* ── Language dialog ── */}
      <Portal>
        <Dialog
          style={{ backgroundColor: theme.colors.surface, borderRadius: 28 }}
          visible={visibleLanguage}
          onDismiss={() => setVisibleLanguage(false)}
        >
          <Dialog.Title
            style={{ marginTop: 40, textAlign: "center", fontSize: 24 }}
          >
            {strings.settings.chooseLanguage}
          </Dialog.Title>
          <Dialog.Content>
            {LANGUAGE_OPTIONS.map((option, index) => (
              <OptionRow
                index={index}
                section={{
                  data: LANGUAGE_OPTIONS.map((option) => option.label),
                }}
                key={option.value}
                label={option.label}
                selected={language === option.value}
                onPress={() => {
                  setLanguage(option.value as LanguageCode);
                  setVisibleLanguage(false);
                }}
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
              onPress={() => setVisibleLanguage(false)}
            >
              {strings.common.done}
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>

      <StationPickerDialog
        visible={stationTarget !== null}
        title={
          stationTarget === "home"
            ? strings.settings.chooseHomeStation
            : strings.settings.chooseWorkStation
        }
        selectedStation={stationTarget === "home" ? homeStation : workStation}
        searchPhrase={stationSearch}
        onSearchChange={setStationSearch}
        onDismiss={() => {
          setStationTarget(null);
          setStationSearch("");
        }}
        onSelect={selectStation}
      />

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
