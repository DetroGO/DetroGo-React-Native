import { Pressable, Text, StyleSheet } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";
import { useTheme } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";

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
      <Pressable
        onPressIn={() => {
          scale.value = withSpring(0.97);
        }}
        onPressOut={() => {
          scale.value = withSpring(1);
        }}
        onPress={onPress}
        style={[
          styles.bar,
          {
            backgroundColor: theme.colors.elevation.level3,
            borderRadius: 36,
          },
        ]}
      >
        <Text style={[styles.placeholder, { color: theme.colors.onSurface }]}>
          {hint || "Search stations..."}
        </Text>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 20,

    width: "100%",
    gap: 10,
  },
  placeholder: {
    flex: 1,
    fontSize: 16,
  },
});
