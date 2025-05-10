import React from "react";
import { Text, TouchableOpacity, StyleSheet, ViewStyle } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

type Props = {
  title: string;
  onPress: () => void;
  style?: ViewStyle;
};

const CustomButton = ({ title, onPress, style }: Props) => {
  return (
    <TouchableOpacity
      style={[styles.button, style]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#FF3C00",
    borderRadius: wp("10%"),
    paddingVertical: hp("1.8%"),
    paddingHorizontal: wp("20%"),
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: wp("4%"),
  },
});
