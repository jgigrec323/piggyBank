import React from "react";
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  View,
  ViewStyle,
  TextStyle,
} from "react-native";

interface Props {
  title: string;
  onPress: () => void;
  icon?: React.ReactNode;
  color?: string; // background color
  borderColor?: string; // outline/border color
  textColor?: string; // text color
  style?: ViewStyle; // optional style overrides
  textStyle?: TextStyle;
}

const GameButton = ({
  title,
  onPress,
  icon,
  color = "#29b6f6",
  borderColor,
  textColor = "#fff",
  style,
  textStyle,
}: Props) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.85}
      style={[
        styles.button,
        {
          backgroundColor: color,
          borderColor: borderColor || darken(color, 0.25),
        },
        style,
      ]}
    >
      <View style={styles.content}>
        {icon && <View style={styles.icon}>{icon}</View>}
        <Text style={[styles.text, { color: textColor }, textStyle]}>
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default GameButton;

// Utility: darken color by reducing RGB values
const darken = (hex: string, factor = 0.2): string => {
  const num = parseInt(hex.replace("#", ""), 16);
  const amt = Math.round(255 * factor);
  const R = Math.max(0, (num >> 16) - amt);
  const G = Math.max(0, ((num >> 8) & 0x00ff) - amt);
  const B = Math.max(0, (num & 0x0000ff) - amt);
  return `rgb(${R},${G},${B})`;
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 999,
    borderWidth: 3,
    paddingVertical: 14,
    paddingHorizontal: 30,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
    flexDirection: "row",
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  icon: {
    marginRight: 8,
  },
  text: {
    fontWeight: "700",
    fontSize: 16,
    textShadowColor: "rgba(0,0,0,0.2)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
  },
});
