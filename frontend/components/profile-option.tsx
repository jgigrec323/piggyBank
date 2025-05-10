import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface Props {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  onPress: () => void;
}

const ProfileOption: React.FC<Props> = ({ icon, label, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.option}>
      <Ionicons name={icon} size={20} color="#f57f17" style={styles.icon} />
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
};

export default ProfileOption;

const styles = StyleSheet.create({
  option: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderColor: "#eee",
  },
  icon: {
    marginRight: 14,
  },
  label: {
    fontSize: 15,
    color: "#333",
    fontWeight: "500",
  },
});
