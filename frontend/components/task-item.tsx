import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface Props {
  title: string;
  points?: number;
  childName?: string;
  onEdit: () => void;
  onDelete?: () => void;
}

const TaskItem: React.FC<Props> = ({
  title,
  points = 5,
  childName,
  onEdit,
  onDelete,
}) => {
  return (
    <View style={styles.container}>
      {/* Task Info */}
      <View style={styles.info}>
        <Text style={styles.title}>{title}</Text>
        {childName && (
          <Text style={styles.subtitle}>
            Assigned to: <Text style={styles.bold}>{childName}</Text>
          </Text>
        )}
        <Text style={styles.points}>+{points} 🪙</Text>
      </View>

      {/* Actions */}
      <View style={styles.actions}>
        <TouchableOpacity onPress={onEdit} style={styles.iconBtn}>
          <Ionicons name="create-outline" size={18} color="#999" />
        </TouchableOpacity>
        {onDelete && (
          <TouchableOpacity onPress={onDelete} style={styles.iconBtn}>
            <Ionicons name="trash-outline" size={18} color="#f44336" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default TaskItem;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  info: {
    flex: 1,
  },
  title: {
    fontSize: 15,
    fontWeight: "600",
    color: "#333",
  },
  subtitle: {
    fontSize: 12,
    color: "#666",
    marginTop: 4,
  },
  bold: {
    fontWeight: "600",
  },
  points: {
    fontSize: 13,
    color: "#f57f17",
    marginTop: 6,
  },
  actions: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 12,
  },
  iconBtn: {
    marginLeft: 10,
  },
});
