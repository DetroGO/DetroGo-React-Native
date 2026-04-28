import { StyleSheet } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";
import { useTheme, Card, Text, Icon } from "react-native-paper";

interface Props {
  onPress: () => void;
  hint?: string;
}

export default function SearchBar({ onPress, hint }: Props) {
  const theme = useTheme();
  const scale = useSharedValue(1);
  const animStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <Animated.View style={animStyle}>
      <Card
        mode="elevated"
        style={{ borderRadius: 36, padding: 6 }}
        onPress={onPress}
        onPressIn={() => {
          scale.value = withSpring(0.97);
        }}
        onPressOut={() => {
          scale.value = withSpring(1);
        }}
      >
        <Card.Content style={styles.content}>
          <Text
            variant="bodyLarge"
            style={{ color: theme.colors.onSurfaceVariant, flex: 1 }}
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
    paddingHorizontal: 20,
    paddingVertical: 14,
    gap: 10,
  },
});
