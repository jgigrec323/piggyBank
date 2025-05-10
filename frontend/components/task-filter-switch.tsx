import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";

interface Props {
  selected: "pending" | "completed";
  onChange: (val: "pending" | "completed") => void;
}

const TaskFilterSwitch: React.FC<Props> = ({ selected, onChange }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => onChange("pending")}
        style={[styles.tab, selected === "pending" && styles.activeTab]}
      >
        <Text
          style={[styles.label, selected === "pending" && styles.activeLabel]}
        >
          Pending
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => onChange("completed")}
        style={[styles.tab, selected === "completed" && styles.activeTab]}
      >
        <Text
          style={[styles.label, selected === "completed" && styles.activeLabel]}
        >
          Completed
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default TaskFilterSwitch;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#eee",
    borderRadius: 12,
    marginBottom: 16,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 12,
    alignItems: "center",
  },
  label: {
    color: "#777",
    fontWeight: "600",
  },
  activeTab: {
    backgroundColor: "#f57f17",
  },
  activeLabel: {
    color: "#fff",
  },
});
