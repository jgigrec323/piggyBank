import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, SafeAreaView } from "react-native";

import ChildSummaryCard from "@/components/child-summary-card";
import ChildDetailPanel from "@/components/child-detail-panel";

// ✅ Mock data
const mockChildren = [
  { id: "1", name: "Amira", avatar: "👧", balance: 120, savings: 50 },
  { id: "2", name: "Tierno", avatar: "👦", balance: 90, savings: 30 },
  { id: "3", name: "Fatou", avatar: "🧒", balance: 60, savings: 20 },
];

const mockTasks = [
  { id: "t1", title: "Brush teeth", completed: true },
  { id: "t2", title: "Read a book", completed: false },
  { id: "t3", title: "Clean your room", completed: false },
];

export default function TasksScreen() {
  const [selectedChild, setSelectedChild] = useState("1");
  const currentChild = mockChildren.find((c) => c.id === selectedChild);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Tasks</Text>

      <View style={styles.summarySection}>
        {/* 🧒 Horizontal child list */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scroll}
        >
          {mockChildren.map((child) => (
            <ChildSummaryCard
              key={child.id}
              name={child.name}
              avatar={child.avatar}
              selected={selectedChild === child.id}
              onPress={() => setSelectedChild(child.id)}
            />
          ))}
        </ScrollView>

        {/* 📋 Detail Panel (sticky after scroll) */}
        {currentChild && (
          <ChildDetailPanel
            child={{
              balance: currentChild.balance,
              savings: currentChild.savings,
            }}
            tasks={mockTasks}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f7f7f7",
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  header: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 16,
    color: "#333",
  },
  summarySection: {
    marginBottom: 12,
  },
  scroll: {
    gap: 12,
    marginBottom: 12,
  },
});
