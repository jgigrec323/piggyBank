import ChildDetailHeader from "@/components/child-detail-header";
import TaskFilterSwitch from "@/components/task-filter-switch";
import TaskItem from "@/components/task-item";
import React, { useState } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  SafeAreaView,
  Text,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { hp } from "@/utils/responsive";

const mockChild = {
  id: "1",
  name: "Amira",
  avatar: "👧",
  balance: 145,
  savings: 80,
};

const mockTasks = [
  { id: "t1", title: "Brush teeth", completed: true },
  { id: "t2", title: "Read a book", completed: false },
  { id: "t3", title: "Clean your room", completed: false },
];

export default function ChildDetailScreen() {
  const [filter, setFilter] = useState<"pending" | "completed">("pending");

  const filteredTasks = mockTasks.filter((t) =>
    filter === "completed" ? t.completed : !t.completed
  );

  const handleAddCoins = () => {
    // TODO: implement coin modal
    console.log("Add coins to balance");
  };

  const handleAddTask = () => {
    // TODO: implement task assignment modal
    console.log("Assign new task");
  };

  const handleEditChild = () => {
    // TODO: open child edit form
    console.log("Edit child info");
  };

  return (
    <SafeAreaView style={styles.container}>
      <ChildDetailHeader
        name={mockChild.name}
        avatar={mockChild.avatar}
        balance={mockChild.balance}
        savings={mockChild.savings}
      />

      {/* 🔧 Parent Control Actions */}
      <View style={styles.actions}>
        <TouchableOpacity style={styles.actionBtn} onPress={handleAddCoins}>
          <Ionicons name="wallet" size={16} color="#fff" />
          <Text style={styles.btnText}>Add Coins</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionBtn} onPress={handleAddTask}>
          <Ionicons name="add-circle-outline" size={16} color="#fff" />
          <Text style={styles.btnText}>Add Task</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionBtn} onPress={handleEditChild}>
          <Ionicons name="create-outline" size={16} color="#fff" />
          <Text style={styles.btnText}>Edit Child</Text>
        </TouchableOpacity>
      </View>

      {/* 🧩 Filter + Task List */}
      <TaskFilterSwitch selected={filter} onChange={setFilter} />

      <FlatList
        data={filteredTasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TaskItem title={item.title} onEdit={() => {}} />
        )}
        contentContainerStyle={styles.taskList}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f7f7f7",
    padding: 20,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: hp(3),
  },
  actionBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f57f17",
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 12,
    gap: 6,
  },
  btnText: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "600",
  },
  taskList: {
    paddingBottom: 40,
  },
});
