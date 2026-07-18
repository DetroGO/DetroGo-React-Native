import { Image, StyleSheet } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";
import { Card, Text } from "react-native-paper";
import { useAppTheme } from "@/hooks/useAppTheme";

interface Props {
  onPress: () => void;
  hint?: string;
}

export default function SearchBar({ onPress, hint }: Props) {
  const theme = useAppTheme();
  const scale = useSharedValue(1);
  const animStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <Animated.View style={animStyle}>
      <Card
        mode="contained"
        style={{
          borderRadius: 40,
          backgroundColor: theme.colors.elevation.level3,
        }}
        onPress={onPress}
        onPressIn={() => {
          scale.value = withSpring(0.97);
        }}
        onPressOut={() => {
          scale.value = withSpring(1);
        }}
      >
        <Card.Content style={styles.content}>
          <Image
            source={require("@/assets/images/detrologowhite.png")}
            style={{
              width: 50,
              height: 45,
              resizeMode: "center",
              tintColor: theme.colors.secondary,
            }}
          />
          <Text
            maxFontSizeMultiplier={1.2}
            numberOfLines={1}
            variant="bodyLarge"
            style={{ color: theme.colors.onSecondaryContainer, flex: 1 }}
          >
            {hint || "Search stations..."}
          </Text>
        </Card.Content>
      </Card>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  content: {
    flexDirection: "row",

    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
    paddingVertical: 18,
    marginVertical: -4, // neutralizes Card.Content's built-in 8px vertical padding
    gap: 2,
  },
});
