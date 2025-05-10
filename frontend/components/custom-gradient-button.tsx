import React from "react";
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  GestureResponderEvent,
  ViewStyle,
  TextStyle,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

interface Props {
  title: string;
  onPress: (event: GestureResponderEvent) => void;
  colors?: string[]; // gradient colors
  style?: ViewStyle;
  textStyle?: TextStyle;
}

const GradientButton = ({
  title,
  onPress,
  colors = ["#f9a825", "#f57f17"],
  style,
  textStyle,
}: Props) => {
  return (
    <TouchableOpacity activeOpacity={0.9} onPress={onPress} style={style}>
      <LinearGradient
        colors={colors}
        style={styles.button}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <Text style={[styles.text, textStyle]}>{title}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default GradientButton;

const styles = StyleSheet.create({
  button: {
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
});
