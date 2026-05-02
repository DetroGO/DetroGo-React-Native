import React from "react";

import { StyleSheet, View } from "react-native";
import { Text, Card, Icon, IconButton } from "react-native-paper";
import { useAppTheme } from "@/hooks/useAppTheme";
import { useLocalSearchParams } from "expo-router";
import WebView from "react-native-webview";
import { router } from "expo-router";

export default function ListPage() {
  const theme = useAppTheme();
  const { type } = useLocalSearchParams();
  return (
    <View
      style={{
        backgroundColor: theme.colors.surface,
        flex: 1,
        paddingTop: 0,
        padding: 0,
      }}
    >
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          marginBottom: 5,
          paddingTop: 50,
          padding: 15,
          backgroundColor: theme.colors.elevation.level4,
          alignItems: "center",
        }}
      >
        <View style={{ flex: 1 }}>
          <IconButton
            icon="arrow-left"
            size={24}
            mode="contained"
            containerColor={theme.colors.secondaryContainer}
            iconColor={theme.colors.secondary}
            style={{ marginRight: 0 }}
            onPress={() => router.back()}
          />
        </View>

        <View
          style={{
            display: "flex",
            flexDirection: "row",

            paddingRight: 0,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Icon
            source={type === "saved" ? "bookmark-multiple" : "history"}
            size={24}
            color={theme.colors.onPrimaryContainer}
          />
          <Text
            style={{ marginLeft: 8, color: theme.colors.onPrimaryContainer }}
            variant="titleLarge"
          >
            {type === "saved" ? "Saved Routes" : "Recent Trips"}
          </Text>
        </View>
        <View
          style={{
            flex: 1,
            alignItems: "flex-end",
            justifyContent: "flex-end",
          }}
        >
          <IconButton
            icon="menu"
            size={24}
            mode="contained"
            containerColor={theme.colors.secondaryContainer}
            iconColor={theme.colors.secondary}
            style={{ marginRight: 0, flex: 1 }}
          />
        </View>
      </View>
      <View style={{ flex: 1, padding: 15, paddingTop: 20 }}>
        <Card
          mode="contained"
          style={{
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
              Rajiv Chowk
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
              Preet Vihar
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
                  5 stops
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
                  1 transfer
                </Text>
              </View>
            </View>
          </Card.Content>
        </Card>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    fontSize: 16,
  },
});
