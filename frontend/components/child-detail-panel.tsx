import React, { useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import TaskFilterSwitch from "./task-filter-switch";
import TaskItem from "./task-item";

interface Props {
  child: {
    balance: number;
    savings: number;
  };
  tasks: { id: string; title: string; completed: boolean }[];
}

const ChildDetailPanel: React.FC<Props> = ({ child, tasks }) => {
  const [filter, setFilter] = useState<"pending" | "completed">("pending");

  const filtered = tasks.filter((t) =>
    filter === "completed" ? t.completed : !t.completed
  );

  return (
    <View style={styles.wrapper}>
      {/* Stats only */}
      <View style={styles.statsRow}>
        <View style={styles.statBox}>
          <Text style={styles.statLabel}>Balance</Text>
          <Text style={styles.statValue}>{child.balance} 🪙</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statLabel}>Savings</Text>
          <Text style={styles.statValue}>{child.savings} 💰</Text>
        </View>
      </View>

      {/* Filter switch */}
      <TaskFilterSwitch selected={filter} onChange={setFilter} />

      {/* Task list */}
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TaskItem
            title={item.title}
            onEdit={() => {}}
            points={10}
            onDelete={() => console.log("delete")}
          />
        )}
        scrollEnabled={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
};

export default ChildDetailPanel;

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    marginTop: 20,
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  statBox: {
    alignItems: "center",
    flex: 1,
  },
  statLabel: {
    fontSize: 13,
    color: "#888",
  },
  statValue: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginTop: 2,
  },
});
