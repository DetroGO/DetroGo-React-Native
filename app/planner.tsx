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
import { StyleSheet, View, SectionList } from "react-native";
import { useState } from "react";

type TransitLines = Record<string, string[]>;
const lines: TransitLines = metroLines as TransitLines;

// Original sections data
const initialSections = Object.entries(lines).map(([title, data]) => ({
  title,
  data,
}));

export default function ModalScreen() {
  const theme = useTheme();
  const [searchPhrase, setPhrase] = useState("");
  const [searchv, setSearchv] = useState("block");
  const [plannerv, setPlannerv] = useState("none");
  const [finalStation, setFinalStation] = useState("");
  const [startStation, setStartStation] = useState("");
  const [finalsel, setFinalsel] = useState(false);
  const [startsel, setStartsel] = useState(false);
  // State to hold the filtered sections
  const [filteredSections, setFilteredSections] = useState(initialSections);

  const showPlan = (item: string) => {
    setSearchv("none");
    setPlannerv("block");
    console.log(item);
    setFinalStation(item);
  };

  const startStationsel = (item: string) => {
    setStartsel(true);
    setFinalsel(false);
    setStartStation(item);
    return;
  };
  const finalStationsel = (item: string) => {
    setFinalsel(true);
    setStartsel(false);
    setFinalStation(item);
    return;
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
          {" "}
          <Card
            style={{
              backgroundColor: theme.colors.elevation.level1,
              marginBottom: 5,
              borderRadius: 18,
              borderColor: startsel
                ? theme.colors.primary
                : theme.colors.elevation.level1,
              borderWidth: startsel ? 1 : 0,
            }}
            mode="contained"
            onPress={() => startStationsel()}
          >
            <Card.Content
              style={{
                flexDirection: "row",

                gap: 10,
              }}
            >
              <Icon source="home" size={24} />
              <Text variant="titleMedium">
                {startsel ? startStation : "Your Location"}
              </Text>
            </Card.Content>
          </Card>
          <Card
            style={{
              backgroundColor: theme.colors.elevation.level1,
              marginBottom: 15,
              borderRadius: 18,
              borderColor: finalsel
                ? theme.colors.primary
                : theme.colors.elevation.level1,
              borderWidth: finalsel ? 1 : 0,
            }}
            mode="contained"
            onPress={() => finalStationsel()}
          >
            <Card.Content
              style={{
                flexDirection: "row",

                gap: 10,
              }}
            >
              <Icon source="home" size={24} />
              <Text variant="titleMedium">{finalStation}</Text>
            </Card.Content>
          </Card>
          <Button style={{ marginBottom: 10 }} mode="contained">
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
          placeholder="Search Line or Station"
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
              onPress={() => showPlan(item)}
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
