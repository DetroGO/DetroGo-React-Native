import { Link } from "expo-router";
import metroLines from "../constants/metrolines.json";
import {
  useTheme,
  Text,
  Surface,
  Searchbar,
  Card,
  Icon,
  Button,
} from "react-native-paper";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  runOnJS,
} from "react-native-reanimated";
import { StyleSheet, View, SectionList } from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";
import { useRef } from "react";
type TransitLines = Record<string, string[]>;
const lines: TransitLines = metroLines as TransitLines;

// Original sections data
const initialSections = Object.entries(lines).map(([title, data]) => ({
  title,
  data,
}));

export default function ModalScreen() {
  const theme = useTheme();
  const scale = useSharedValue(1);
  const scale2 = useSharedValue(1);
  const workstation = "Knowledge Park";
  const homestation = "Vaishali";
  const animStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));
  const animStyle2 = useAnimatedStyle(() => ({
    transform: [{ scale: scale2.value }],
  }));
  const [searchPhrase, setPhrase] = useState("");
  const [searchv, setSearchv] = useState("block");
  const [plannerv, setPlannerv] = useState("none");
  const [finalStation, setFinalStation] = useState("");
  const [startStation, setStartStation] = useState("");
  const [finalsel, setFinalsel] = useState(false);
  const [startsel, setStartsel] = useState(false);
  const [editingMode, setEditingMode] = useState<"start" | "final" | null>(
    null,
  );
  // State to hold the filtered sections
  const [filteredSections, setFilteredSections] = useState(initialSections);
  const router = useRouter();
  const buttonRef = useRef(null);
  const scale3 = useSharedValue(0);
  const [origin, setOrigin] = useState({ x: 0, y: 0 });

  const animatedCircle = useAnimatedStyle(() => ({
    transform: [{ scale: scale3.value }],
    opacity: scale3.value > 0 ? 1 : 0,
  }));

  const handleGo = () => {
    buttonRef.current?.measure(
      (
        x: number,
        y: number,
        width: number,
        height: number,
        pageX: number,
        pageY: number,
      ) => {
        setOrigin({ x: pageX + width / 2, y: pageY + height / 2 });
        scale3.value = withTiming(40, { duration: 500 }, (finished) => {
          if (finished)
            router.push({
              pathname: "/route",
              params: { fromStation: startStation, toStation: finalStation },
            });
        });
      },
    );
  };

  const handleStationSelect = (item: string) => {
    if (editingMode === "start") {
      setStartStation(item);
      setStartsel(true);
      setFinalsel(false);
      setEditingMode(null);
      setSearchv("none");
      setPlannerv("block");
    } else if (editingMode === "final" || !startsel) {
      setFinalStation(item);
      setFinalsel(true);
      setStartsel(false);
      setEditingMode(null);
      setSearchv("none");
      setPlannerv("block");
    }
  };

  const showPlan = (item: string) => {
    setFinalStation(item);
    setFinalsel(true);
    setSearchv("none");
    setPlannerv("block");
  };

  const startStationsel = (item: string) => {
    setEditingMode("start");
    setPlannerv("none");
    setSearchv("block");
    setPhrase("");
    setFilteredSections(initialSections);
  };
  const finalStationsel = (item: string) => {
    setEditingMode("final");
    setPlannerv("none");
    setSearchv("block");
    setPhrase("");
    setFilteredSections(initialSections);
  };

  const searchData = (text: string) => {
    setPhrase(text); // Update search phrase state

    if (!text) {
      // If search text is empty, show all sections
      setFilteredSections(initialSections);
      return;
    }

    const lowerCaseText = text.toLowerCase();

    // Filter sections
    const filtered = initialSections
      .map((section) => {
        // Filter items within each section
        const filteredItems = section.data.filter((item) =>
          item.toLowerCase().includes(lowerCaseText),
        );
        // Return the section only if it has matching items
        return filteredItems.length > 0
          ? { ...section, data: filteredItems }
          : null;
      })
      .filter((section) => section !== null); // Remove sections that became empty

    setFilteredSections(filtered as typeof initialSections); // Update the state with filtered sections
  };

  return (
    <Surface
      style={{
        flex: 1,
        paddingTop: 0,

        paddingHorizontal: 0,
        backgroundColor: theme.colors.background,
      }}
    >
      <View
        style={{
          backgroundColor: theme.colors.secondaryContainer,
          padding: 0,
          paddingTop: 56,
        }}
      >
        <View style={{ padding: 15, display: plannerv }}>
          <Animated.View style={animStyle}>
            <Card
              style={{
                backgroundColor: theme.colors.elevation.level1,
                marginBottom: 5,
                borderRadius: 18,
                borderColor:
                  editingMode === "start"
                    ? theme.colors.primary
                    : theme.colors.elevation.level1,
                borderWidth: editingMode === "start" ? 1 : 0,
              }}
              mode="contained"
              onPress={() => startStationsel()}
              onPressIn={() => {
                scale.value = withSpring(0.97);
              }}
              onPressOut={() => {
                scale.value = withSpring(1);
              }}
            >
              <Card.Content
                style={{
                  flexDirection: "row",

                  gap: 10,
                }}
              >
                <Icon
                  source={editingMode ? "home" : "crosshairs-gps"}
                  size={24}
                />
                <Text variant="titleMedium">
                  {startsel ? startStation : "Your Location"}
                </Text>
              </Card.Content>
            </Card>
          </Animated.View>
          <Animated.View style={animStyle2}>
            <Card
              style={{
                backgroundColor: theme.colors.elevation.level1,
                marginBottom: 15,
                borderRadius: 18,
                borderColor:
                  editingMode === "final"
                    ? theme.colors.primary
                    : theme.colors.elevation.level1,
                borderWidth: editingMode === "final" ? 1 : 0,
              }}
              mode="contained"
              onPressIn={() => {
                scale2.value = withSpring(0.97);
              }}
              onPressOut={() => {
                scale2.value = withSpring(1);
              }}
              onPress={() => finalStationsel()}
            >
              <Card.Content
                style={{
                  flexDirection: "row",

                  gap: 10,
                }}
              >
                <Icon source="flag" size={24} />
                <Text variant="titleMedium">{finalStation}</Text>
              </Card.Content>
            </Card>
          </Animated.View>
          <Animated.View
            style={[
              {
                position: "absolute",
                width: 20,
                height: 20,
                borderRadius: 10,
                backgroundColor: theme.colors.primary,
                left: origin.x - 10,
                top: origin.y - 10,
                zIndex: 99,
              },
              animatedCircle,
            ]}
          />

          <Button ref={buttonRef} mode="contained" onPress={handleGo}>
            GO
          </Button>
        </View>

        {/* Search Bar */}

        <Searchbar
          style={{
            backgroundColor: theme.colors.secondaryContainer,
            color: theme.colors.onSecondaryContainer,
            fontSize: 25,
            display: searchv,
          }}
          mode="view"
          autoFocus={true}
          showDivider={true}
          // Call searchData when text changes
          onChangeText={searchData}
          placeholder={
            editingMode === "start"
              ? "Select Start Station"
              : editingMode === "final"
                ? "Select Final Station"
                : "Search Line or Station"
          }
          // Set the value of the searchbar to the current searchPhrase
          value={searchPhrase}
        />
      </View>

      <View style={{ flex: 1, padding: 10 }}>
        <SectionList
          // Use filteredSections for rendering
          sections={filteredSections}
          keyExtractor={(item, idx) => item + idx}
          ListHeaderComponent={
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
                onPress={() => handleStationSelect(homestation)}
              >
                <Card.Content
                  style={{
                    flexDirection: "row",

                    gap: 10,
                  }}
                >
                  <Icon source="home" size={24} />
                  <Text variant="titleMedium">Home</Text>
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
                onPress={() => handleStationSelect(workstation)}
              >
                <Card.Content
                  style={{
                    flexDirection: "row",

                    gap: 10,
                  }}
                >
                  <Icon source="briefcase-variant" size={24} />
                  <Text variant="titleMedium">Work</Text>
                </Card.Content>
              </Card>
            </View>
          }
          renderSectionHeader={({ section }) => (
            <View
              style={{
                marginBottom: 5,
              }}
            >
              <Text style={{ margin: 10 }} variant="titleMedium">
                {section.title}
              </Text>
            </View>
          )}
          renderItem={({ item, index, section }) => (
            <Card
              mode="contained"
              style={{
                marginBottom: 3,
                padding: 10,
                backgroundColor: theme.colors.elevation.level1,
                borderTopLeftRadius: index === 0 ? 28 : 6,
                borderTopRightRadius: index === 0 ? 28 : 6,
                borderBottomLeftRadius:
                  index === section.data.length - 1 ? 28 : 6,
                borderBottomRightRadius:
                  index === section.data.length - 1 ? 28 : 6,
              }}
              onPress={() => handleStationSelect(item)}
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
                    {item}
                  </Text>
                </View>
              </Card.Content>
            </Card>
          )}
          initialNumToRender={10}
        />
      </View>
    </Surface>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
});
