import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type Props = {
  totalChildren: number;
  totalTasks: number;
  completedTasks: number;
};

const SummaryBanner = ({
  totalChildren,
  totalTasks,
  completedTasks,
}: Props) => {
  const coins = completedTasks * 5;

  return (
    <View style={styles.container}>
      <Ionicons name="bar-chart-outline" size={20} color="#f57f17" />
      <View style={styles.textContainer}>
        <Text style={styles.title}>This Week</Text>
        <Text style={styles.text}>
          {totalChildren} Children • {totalTasks} Tasks • {completedTasks}{" "}
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
