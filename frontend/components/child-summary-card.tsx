import { hp } from "@/utils/responsive";
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

interface Props {
  name: string;
  avatar: string;
  selected?: boolean;
  onPress: () => void;
}

const ChildSummaryCard: React.FC<Props> = ({
  name,
  avatar,
  selected,
  onPress,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.card, selected && styles.selectedCard]}
    >
      <Text style={styles.avatar}>{avatar}</Text>
      <Text style={styles.name}>{name}</Text>
    </TouchableOpacity>
  );
};

export default ChildSummaryCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
    width: 80,
    borderWidth: 1,
    borderColor: "#eee",
    maxHeight: hp("30"),
    height: hp("20"),
  },
  selectedCard: {
    backgroundColor: "#fce8d5",
    borderColor: "#f57f17",
  },
  avatar: {
    fontSize: 24,
  },
  name: {
    fontSize: 12,
    marginTop: 6,
    fontWeight: "600",
    color: "#333",
  },
});
