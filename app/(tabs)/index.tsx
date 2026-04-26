import { StyleSheet, View, ScrollView, Pressable, Image } from "react-native";
import { Button, useTheme, Text, Icon } from "react-native-paper";
import SearchBar from "@/components/ui/searchbar";
import { router } from "expo-router";

interface Trip {
  start: string;
  end: string;
  stops: number;
  transfers: number;
  price: number;
}

const DATA: Trip[] = [
  {
    start: "Preet Vihar",
    end: "Mandi House",
    stops: 12,
    transfers: 2,
    price: 20,
  },
  {
    start: "Rajiv Chowk",
    end: "Huda City Centre",
    stops: 18,
    transfers: 0,
    price: 30,
  },
  {
    start: "Kashmere Gate",
    end: "Noida Sec 62",
    stops: 22,
    transfers: 1,
    price: 40,
  },
  { start: "New Delhi", end: "IGI Airport", stops: 8, transfers: 0, price: 60 },
  {
    start: "Preet Vihar",
    end: "Mandi House",
    stops: 12,
    transfers: 2,
    price: 20,
  },
  {
    start: "Preet Vihar",
    end: "Mandi House",
    stops: 12,
    transfers: 2,
    price: 20,
  },
];

const BookmarkCard = ({ item, theme }: { item: Trip; theme: any }) => (
  <Pressable
    onPress={() => router.push("/journey")}
    style={({ pressed }) => [
      styles.bookmarkCard,
      {
        backgroundColor: theme.colors.onSecondary,
        opacity: pressed ? 0.85 : 1,
      },
    ]}
  >
    <Text
      variant="labelLarge"
      style={{ color: theme.colors.onSecondaryContainer, opacity: 0.7 }}
    >
      {item.start}
    </Text>
    <Text
      variant="titleMedium"
      style={{
        color: theme.colors.onSecondaryContainer,

        marginTop: 4,
        marginBottom: 12,
      }}
      numberOfLines={1}
    >
      {item.end}
    </Text>
    <View style={styles.bookmarkMeta}>
      <View style={styles.metaChip}>
        <Icon
          source="subway-variant"
          size={20}
          color={theme.colors.onSecondaryContainer}
        />
        <Text variant="labelMedium" style={{ color: theme.colors.onSurface }}>
          {item.stops} stops
        </Text>
      </View>
      <View style={styles.metaChip}>
        <Icon
          source="transit-transfer"
          size={20}
          color={theme.colors.onSecondaryContainer}
        />
        <Text variant="labelMedium" style={{ color: theme.colors.onSurface }}>
          {item.transfers} Transfer
        </Text>
      </View>
    </View>
  </Pressable>
);

export default function HomeScreen() {
  const theme = useTheme();

  return (
    <ScrollView
      style={{ backgroundColor: theme.colors.background }}
      contentContainerStyle={styles.scroll}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <View style={styles.header}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View>
            <Image
              source={{ uri: "https://detrogo.vercel.app/detroname.png" }}
              style={{
                width: 120,
                height: 40,
                marginRight: 8,
                marginLeft: 10,
                tintColor: theme.colors.primary,
              }}
            />
            {/*<Text
              variant="headlineSmall"
              style={{ color: theme.colors.onBackground }}
            >
              Where to?
            </Text>*/}
          </View>
          <View style={{ alignItems: "center", justifyContent: "center" }}>
            <Button
              icon="crosshairs-gps"
              mode="outlined"
              onPress={() => console.log("Pressed")}
            >
              Delhi
            </Button>
          </View>
        </View>
      </View>

      {/* Search */}
      <View style={styles.searchWrapper}>
        <SearchBar hint="Search stations..." />
      </View>

      {/* Bookmarks */}
      <View style={{ marginTop: 16, paddingTop: 15, gap: 10 }}>
        <View
          style={{
            marginLeft: 20,
            marginBottom: 10,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Icon
            source="bookmark-box-multiple"
            size={24}
            color={theme.colors.onSurfaceVariant}
          />
          <Text style={{ marginLeft: 6 }}>Bookmarks</Text>
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 16, gap: 10 }}
        >
          {DATA.map((item, index) => (
            <BookmarkCard key={index} item={item} theme={theme} />
          ))}
        </ScrollView>
      </View>

      {/* Recent Trips */}
      <View style={{ marginTop: 24, paddingHorizontal: 16 }}>
        <View
          style={{
            marginBottom: 20,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Icon
            source="history"
            size={24}
            color={theme.colors.onSurfaceVariant}
          />
          <Text style={{ marginLeft: 6 }}>Recent Trips</Text>
        </View>

        <Text
          variant="labelSmall"
          style={{
            color: theme.colors.onSurfaceVariant,
            paddingHorizontal: 4,
            paddingBottom: 6,
            letterSpacing: 0.5,
          }}
        >
          TODAY
        </Text>

        {DATA.map((item, index) => (
          <View key={index}>
            <Pressable
              android_ripple={{ color: theme.colors.primary + "22" }}
              style={({ pressed }) => ({
                flexDirection: "row",
                alignItems: "center",
                paddingHorizontal: 14,
                paddingVertical: 12,
                gap: 14,
                backgroundColor: pressed
                  ? theme.colors.surfaceVariant
                  : theme.colors.elevation.level1,
                marginBottom: 3,
                borderTopLeftRadius: index === 0 ? 28 : 6,
                borderTopRightRadius: index === 0 ? 28 : 6,
                borderBottomLeftRadius: index === DATA.length - 1 ? 28 : 6,
                borderBottomRightRadius: index === DATA.length - 1 ? 28 : 6,
              })}
            >
              <View
                style={{
                  width: 50,
                  height: 50,
                  backgroundColor: theme.colors.secondaryContainer,
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 17,
                }}
              >
                <Icon
                  source="source-commit"
                  size={30}
                  color={theme.colors.secondary}
                />
              </View>
              <View style={{ flex: 1 }}>
                <Text
                  variant="bodyMedium"
                  style={{ color: theme.colors.onSurface }}
                >
                  {item.start}
                </Text>
                <Text
                  variant="labelSmall"
                  style={{ color: theme.colors.onSurfaceVariant, marginTop: 1 }}
                >
                  → {item.end}
                </Text>
              </View>
              <View
                style={{
                  padding: 8,
                  backgroundColor: theme.colors.secondaryContainer,
                  borderRadius: 18,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Icon
                  source="chevron-right"
                  size={18}
                  color={theme.colors.onSurfaceVariant}
                />
              </View>
            </Pressable>
            {index < DATA.length - 1 && (
              <View
                style={{
                  height: 0.5,
                  backgroundColor: theme.colors.outlineVariant,
                  marginLeft: 72,
                }}
              />
            )}
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: { paddingBottom: 40 },
  header: { paddingHorizontal: 20, paddingTop: 60, paddingBottom: 8 },
  searchWrapper: { paddingHorizontal: 16, paddingVertical: 12 },
  bookmarkCard: { width: 220, borderRadius: 20, padding: 16 },
  bookmarkMeta: { flexDirection: "row", gap: 10 },
  metaChip: { flexDirection: "row", alignItems: "center", gap: 4 },
});
