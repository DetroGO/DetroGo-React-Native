import {
  StyleSheet,
  View,
  ScrollView,
  Pressable,
  Image,
  SafeAreaView,
} from "react-native";
import { useState } from "react";

import {
  Button,
  Text,
  Icon,
  Card,
  FAB,
  Portal,
  Dialog,
} from "react-native-paper";
import { useAppTheme } from "@/hooks/useAppTheme";
import SearchBar from "@/components/ui/searchbar";

import { router } from "expo-router";
import { push } from "expo-router/build/global-state/routing";

interface Trip {
  start: string;
  end: string;
  stops: number;
  transfers: number;
  price: number;
}

interface Cities {
  logo: string;
  name: string;
  companies: string;
  selected: boolean;
}

const SYSTEMS: Cities[] = [
  {
    logo: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Flogoeps.com%2Fwp-content%2Fuploads%2F2014%2F08%2F50953-delhi-metro-logo-icon-vector-icon-vector-eps.png&f=1&nofb=1&ipt=e8d55169a746a48ca25e75e9301809734e9a0afa6fa32c1e6d26923b4c8479ea",
    name: "Delhi NCR",
    companies: "DMRC | NMRC | GMRL",
    selected: true,
  },
  {
    logo: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Flatestlogo.com%2Fwp-content%2Fuploads%2F2024%2F09%2Fmaha-mumbai-metro-operation-corporation-limited.png&f=1&nofb=1&ipt=5634b32135888c280bc42a0bb75faf15dd62b6ce61463758524b618c255ac065",
    name: "Mumbai",
    companies: "MMRC | MMO",
    selected: false,
  },
  {
    logo: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn-icons-png.flaticon.com%2F512%2F50%2F50639.png&f=1&nofb=1&ipt=6f5db3a9d447d2698cb2160fe6876f28027e8334d1f77aaa398f824ac1c63fe1",
    name: "Bangalore",
    companies: "CMRL",
    selected: false,
  },
  {
    logo: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2F1.bp.blogspot.com%2F-27hT8cQBdQM%2FUQAOzJJps_I%2FAAAAAAAAAP4%2Ftv_eWsw4Wb4%2Fs1600%2FCMRL.png&f=1&nofb=1&ipt=31f5416b49a72a19fdabe19ccbc76fbddee9b8332538b869a47e0a74ad4d7312",
    name: "Chennai",
    companies: "CMRL",
    selected: false,
  },
];

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

const RecentCard = ({ index, item }: { index: number; item: Trip }) => {
  const theme = useAppTheme();
  return (
    <Card
      mode="contained"
      style={{
        backgroundColor: theme.dark
          ? theme.colors.surfaceContainerLow
          : theme.colors.elevation.level2,
        marginBottom: 2.8,
        borderTopLeftRadius: index === 0 ? 24 : 6,
        borderTopRightRadius: index === 0 ? 24 : 6,
        borderBottomLeftRadius: index === DATA.length - 1 ? 24 : 6,
        borderBottomRightRadius: index === DATA.length - 1 ? 24 : 6,
      }}
      onPress={() => {}}
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
            source="source-commit"
            size={30}
            color={theme.colors.onSurfaceVariant}
          />
        </View>
        <View style={{ flex: 1 }}>
          <Text variant="bodyMedium" style={{ color: theme.colors.onSurface }}>
            {item.start}
          </Text>
          <Text
            variant="labelSmall"
            style={{ color: theme.colors.onSurfaceVariant, marginTop: 1 }}
          >
            {item.end}
          </Text>
        </View>
      </Card.Content>
    </Card>
  );
};

const BookmarkCard = ({ item }: { item: Trip }) => {
  const theme = useAppTheme();
  return (
    <Pressable
      onPress={() =>
        router.push({
          pathname: "/route",
          params: { start: item.start, end: item.end },
        })
      }
    >
      <Card
        mode="contained"
        style={{
          width: 220,
          padding: 4,
          backgroundColor: theme.colors.elevation.level1,
          borderRadius: 20,
          marginBottom: 4,
        }}
      >
        <Card.Content style={{ paddingTop: 16, paddingHorizontal: 16 }}>
          <Text
            variant="labelLarge"
            style={{ color: theme.colors.onSurfaceVariant, opacity: 0.7 }}
          >
            {item.start}
          </Text>
          <Text
            variant="titleMedium"
            style={{
              color: theme.colors.secondary,
              marginTop: 4,
              marginBottom: 12,
            }}
            numberOfLines={1}
          >
            {item.end}
          </Text>
          <View style={{ flexDirection: "row", gap: 10 }}>
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 4 }}
            >
              <Icon
                source="subway-variant"
                size={16}
                color={theme.colors.onSurfaceVariant}
              />
              <Text
                variant="labelMedium"
                style={{ color: theme.colors.onSurfaceVariant }}
              >
                {item.stops} stops
              </Text>
            </View>
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 4 }}
            >
              <Icon
                source="transit-transfer"
                size={16}
                color={theme.colors.onSurfaceVariant}
              />
              <Text
                variant="labelMedium"
                style={{ color: theme.colors.onSurfaceVariant }}
              >
                {item.transfers} transfer
              </Text>
            </View>
          </View>
        </Card.Content>
      </Card>
    </Pressable>
  );
};

const SystemCards = ({ index, item }: { index: number; item: Cities }) => {
  const theme = useAppTheme();
  return (
    <Card
      mode="elevated"
      elevation={0}
      style={{
        marginBottom: 3,
        backgroundColor: item.selected
          ? theme.colors.secondaryContainer
          : theme.colors.elevation.level1,
        borderTopLeftRadius: index === 0 ? 24 : 6,
        borderTopRightRadius: index === 0 ? 24 : 6,
        borderBottomLeftRadius: index === SYSTEMS.length - 1 ? 24 : 6,
        borderBottomRightRadius: index === SYSTEMS.length - 1 ? 24 : 6,
      }}
      onPress={() => {
        item.selected = true;
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
        <View
          style={{
            width: 50,
            height: 50,
            backgroundColor: theme.colors.secondary,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 17,
          }}
        >
          <Image
            source={{
              uri: item.logo,
            }}
            style={{
              width: 30,
              height: 30,
              tintColor: theme.colors.primaryContainer,
            }}
          />
        </View>
        <View style={{ flex: 1 }}>
          <Text variant="bodyMedium" style={{ color: theme.colors.onSurface }}>
            {item.name}
          </Text>
          <Text
            variant="labelSmall"
            style={{
              color: theme.colors.onSurfaceVariant,
              marginTop: 1,
            }}
          >
            {item.companies}
          </Text>
        </View>
        {/*<View
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
      </View>*/}
      </Card.Content>
    </Card>
  );
};

export default function HomeScreen() {
  const theme = useAppTheme();
  const [visible, setVisible] = useState(false);

  const showDialog = () => setVisible(true);

  const hideDialog = () => setVisible(false);

  return (
    <SafeAreaView>
      <ScrollView
        style={{
          backgroundColor: theme.dark
            ? theme.colors.surfaceDim
            : theme.colors.surface,
        }}
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <View
            style={{
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <View>
              {/*<Image
                source={require("../../assets/images/detrologo.png")}
                style={{
                  width: 180,
                  height: 120,
                  marginRight: 8,

                  marginLeft: 0,
                  tintColor: theme.colors.primary,
                }}
              />*/}
              {/*<Text
              variant="titleSmall"
              style={{ color: theme.colors.onBackground }}
            >
              Good Morning,
            </Text>
            <Text
              variant="headlineSmall"
              style={{ color: theme.colors.onBackground }}
            >
              Where to?
            </Text>*/}
            </View>
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              {/*<Button
              icon="crosshairs-gps"
              mode="outlined"
              onPress={() => console.log("Pressed")}
            >
              Delhi
            </Button>*/}
              );
            </View>
          </View>
        </View>

        {/* Search */}
        <View style={styles.searchWrapper}>
          <SearchBar
            onPress={() => router.push("/planner")}
            hint="Search Route"
          />
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
            <View
              style={{ flex: 1, flexDirection: "row", alignItems: "center" }}
            >
              <Icon
                source="bookmark-box-multiple"
                size={24}
                color={theme.colors.onSurfaceVariant}
              />
              <Text style={{ marginLeft: 6 }}>Saved Routes</Text>
            </View>
            <Button
              style={{ width: "auto", marginRight: 12 }}
              onPress={() => router.push("/bookmarks")}
            >
              <Text style={{ fontSize: 12, color: theme.colors.secondary }}>
                View All
              </Text>
            </Button>
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
              marginLeft: 5,
              marginBottom: 10,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <View
              style={{ flex: 1, flexDirection: "row", alignItems: "center" }}
            >
              <Icon
                source="history"
                size={24}
                color={theme.colors.onSurfaceVariant}
              />
              <Text style={{ marginLeft: 5 }}>Recent Trips</Text>
            </View>
            <Button
              style={{ width: "auto", marginRight: 0 }}
              onPress={() => router.push("/bookmarks")}
            >
              <Text style={{ fontSize: 12, color: theme.colors.secondary }}>
                View All
              </Text>
            </Button>
          </View>
          {DATA.map((item, index) => (
            <RecentCard index={index} item={item} theme={theme} />
          ))}
        </View>
      </ScrollView>
      <FAB
        icon="crosshairs-gps"
        style={{
          position: "absolute",
          alignContent: "center",
          justifyContent: "center",
          margin: 16,
          right: 0,

          bottom: 0,
        }}
        label="Delhi"
        variant="secondary"
        onPress={showDialog}
      />
      <Portal>
        <Dialog
          style={{ backgroundColor: theme.colors.surface }}
          visible={visible}
          onDismiss={hideDialog}
        >
          <Dialog.Title style={{ textAlign: "center" }}>
            Select a Metro System
          </Dialog.Title>
          <Dialog.Content>
            {SYSTEMS.map((item, index) => (
              <SystemCards index={index} item={item} />
            ))}
          </Dialog.Content>
          <Dialog.Actions style={{ justifyContent: "center" }}>
            <Button
              style={{ width: "100%" }}
              mode="contained-tonal"
              onPress={hideDialog}
            >
              Done
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  scroll: { paddingBottom: 40 },
  header: { paddingHorizontal: 20, paddingTop: 45, paddingBottom: 8 },
  searchWrapper: { paddingHorizontal: 16, paddingVertical: 12 },
  bookmarkCard: { width: 220, borderRadius: 20, padding: 16 },
  bookmarkMeta: { flexDirection: "row", gap: 10 },
  metaChip: { flexDirection: "row", alignItems: "center", gap: 4 },
  fab: {
    position: "absolute",
    alignContent: "center",
    justifyContent: "center",
    margin: 16,
    right: 0,
    bottom: 0,
  },
});
