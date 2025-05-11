import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Modal,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import ChildSummaryCard from "@/components/child-summary-card";
import ChildDetailPanel from "@/components/child-detail-panel";
import AddChildForm from "@/components/add-child-form";
import { useParent } from "@/context/parent-context";
import { hp, wp } from "@/utils/responsive";
import AssignTaskForm from "@/components/add-task-form";

export default function TasksScreen() {
  const { children } = useParent();
  const [selectedChild, setSelectedChild] = useState<string | null>(
    children.length > 0 ? children[0].id : null
  );
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [showChildModal, setShowChildModal] = useState(false);

  const currentChild = children.find((c) => c.id === selectedChild);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Tasks</Text>

      {/* 🧒 Horizontal child list + Add Child */}
      <View style={styles.childRow}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {children.map((child) => (
            <ChildSummaryCard
              key={child.id}
              name={child.name}
              avatar={child.avatar}
              selected={selectedChild === child.id}
              onPress={() => setSelectedChild(child.id)}
            />
          ))}

          {/* ➕ Add Child */}
          <TouchableOpacity
            style={styles.addChildBtn}
            onPress={() => setShowChildModal(true)}
          >
            <Ionicons name="person-add" size={28} color="#f57f17" />
            <Text style={styles.addLabel}>Add Child</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>

      {/* 👦 Selected Child Details */}
      {currentChild && (
        <View style={styles.detailsContainer}>
          <View style={styles.taskHeaderRow}>
            <Text style={styles.sectionTitle}>{currentChild.name}'s Tasks</Text>

            <TouchableOpacity
              onPress={() => setShowTaskModal(true)}
              style={styles.addTaskBtn}
            >
              <Ionicons name="add-circle" size={24} color="#f57f17" />
              <Text style={styles.addLabel}>Add Task</Text>
            </TouchableOpacity>
          </View>

          <ChildDetailPanel
            child={{
              balance: currentChild.tasks.filter((t) => t.completed).length * 5,
              savings: 0,
            }}
            tasks={currentChild.tasks}
          />
        </View>
      )}

      {/* 🔲 Modals */}
      <Modal visible={showTaskModal} animationType="slide">
        <AssignTaskForm
          childId={selectedChild}
          onClose={() => setShowTaskModal(false)}
        />
      </Modal>

      <Modal visible={showChildModal} animationType="slide">
        <AddChildForm onClose={() => setShowChildModal(false)} />
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f7f7f7",
    paddingTop: hp(4),
    paddingHorizontal: wp(4),
  },
  header: {
    fontSize: hp(2.8),
    fontWeight: "700",
    marginBottom: hp(1.5),
    color: "#333",
  },
  childRow: {
    marginBottom: hp(1),
    flexDirection: "row",
  },
  scrollContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: wp(3),
  },
  addChildBtn: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: hp(2),
    paddingHorizontal: wp(3),
    backgroundColor: "#fff8ec",
    borderWidth: 1,
    borderColor: "#f57f17",
    borderRadius: 12,
  },
  addTaskBtn: {
    alignItems: "center",
  },
  addLabel: {
    fontSize: hp(1.4),
    color: "#f57f17",
    marginTop: 2,
  },
  sectionTitle: {
    fontSize: hp(2.2),
    fontWeight: "600",
    color: "#333",
  },
  taskHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: hp(1.5),
    paddingHorizontal: wp(1),
  },
  detailsContainer: {
    flex: 1,
  },
});
