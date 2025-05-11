import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { hp, wp } from "@/utils/responsive";
import { useApp } from "@/context/app-context";

type Task = {
  id: string;
  title: string;
  reward: number;
  completed?: boolean;
};

export default function MyTasksScreen() {
  const { moneyInPocket, updatePocket } = useApp();
  const [tasks, setTasks] = useState<Task[]>([
    { id: "1", title: "Brush your teeth", reward: 5 },
    { id: "2", title: "Make your bed", reward: 5 },
    { id: "3", title: "Do your homework", reward: 10 },
  ]);

  const handleCompleteTask = (taskId: string) => {
    const task = tasks.find((t) => t.id === taskId);
    if (!task || task.completed) return;

    Alert.alert("Complete Task", `Mark "${task.title}" as completed?`, [
      { text: "Cancel" },
      {
        text: "Yes",
        onPress: () => {
          updatePocket(task.reward);
          setTasks((prev) =>
            prev.map((t) => (t.id === taskId ? { ...t, completed: true } : t))
          );
          Alert.alert("Well done!", `You earned ${task.reward} coins!`);
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>📝 My Tasks</Text>

      <View style={styles.balanceBox}>
        <Ionicons name="wallet" size={20} color="#fff" />
        <Text style={styles.balanceText}>Coins: {moneyInPocket} 🪙</Text>
      </View>

      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.card, item.completed && styles.completedCard]}
            onPress={() => handleCompleteTask(item.id)}
            disabled={item.completed}
          >
            <Text
              style={[styles.taskTitle, item.completed && styles.completedText]}
            >
              {item.completed ? "✅ " : ""}
              {item.title}
            </Text>
            <Text
              style={[
                styles.rewardText,
                item.completed && styles.completedText,
              ]}
            >
              {item.completed ? "Done" : `+${item.reward} 🪙`}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f7f7f7",
    padding: wp(5),
  },
  header: {
    fontSize: hp(2.8),
    fontWeight: "700",
    marginBottom: hp(2),
    color: "#333",
  },
  balanceBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f57f17",
    padding: hp(1.2),
    borderRadius: 12,
    justifyContent: "center",
    marginBottom: hp(2),
  },
  balanceText: {
    fontSize: hp(2),
    color: "#fff",
    fontWeight: "600",
    marginLeft: wp(2),
  },
  list: {
    gap: hp(1.5),
  },
  card: {
    backgroundColor: "#fff3e0",
    borderRadius: 12,
    padding: hp(2),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderColor: "#fdd835",
    borderWidth: 1,
  },
  completedCard: {
    backgroundColor: "#e0e0e0",
    borderColor: "#ccc",
  },
  taskTitle: {
    fontSize: hp(2),
    fontWeight: "500",
    color: "#333",
  },
  rewardText: {
    fontSize: hp(2),
    fontWeight: "600",
    color: "#2e7d32",
  },
  completedText: {
    color: "#888",
    textDecorationLine: "line-through",
  },
});
