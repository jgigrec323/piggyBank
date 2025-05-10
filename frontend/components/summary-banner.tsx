import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import children from "@/data/children.json";

const SummaryBanner = () => {
  const totalTasks = children.reduce((sum, c) => sum + c.tasksTotal, 0);
  const totalDone = children.reduce((sum, c) => sum + c.tasksDone, 0);
  const coins = totalDone * 5;

  return (
    <View style={styles.container}>
      <Ionicons name="bar-chart-outline" size={20} color="#f57f17" />
      <View style={styles.textContainer}>
        <Text style={styles.title}>This Week</Text>
        <Text style={styles.text}>
          {children.length} Children • {totalTasks} Tasks • {totalDone}{" "}
          Completed
        </Text>
        <Text style={styles.text}>Coins Earned: {coins} 🪙</Text>
      </View>
    </View>
  );
};

export default SummaryBanner;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff8ec",
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 20,
    marginBottom: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontWeight: "600",
    fontSize: 16,
    color: "#f57f17",
    marginBottom: 4,
  },
  text: {
    fontSize: 13,
    color: "#333",
  },
});
