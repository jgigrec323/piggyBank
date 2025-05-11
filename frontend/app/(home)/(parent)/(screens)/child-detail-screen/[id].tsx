import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
  Modal,
  TextInput,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { hp, wp } from "@/utils/responsive";
import { useParent } from "@/context/parent-context";
import AssignTaskForm from "@/components/add-task-form";

export default function ChildDetailsScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { children, deleteTask, addMoneyToPocket } = useParent();

  const child = children.find((c) => c.id === id);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [showMoneyModal, setShowMoneyModal] = useState(false);
  const [moneyToAdd, setMoneyToAdd] = useState("");

  if (!child) {
    return (
      <View style={styles.centered}>
        <Text style={styles.notFound}>Child not found</Text>
      </View>
    );
  }

  const balance = child.pocket;

  const handleDeleteTask = (taskId: string) => {
    Alert.alert("Delete Task", "Are you sure you want to delete this task?", [
      { text: "Cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => deleteTask(child.id, taskId),
      },
    ]);
  };

  const handleAddMoney = () => {
    const amount = parseInt(moneyToAdd);
    if (!amount || amount <= 0) {
      Alert.alert("Invalid amount");
      return;
    }
    addMoneyToPocket(child.id, amount, "Manual top-up");
    setMoneyToAdd("");
    setShowMoneyModal(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.avatar}>{child.avatar}</Text>
        <Text style={styles.name}>{child.name}</Text>
      </View>

      <View style={styles.balanceBox}>
        <Text style={styles.balanceText}>In Pocket: {child.pocket} 🪙</Text>
        <Text style={styles.balanceText}>In Bank: {child.bank} 🏦</Text>
      </View>

      <View style={styles.actionsRow}>
        <TouchableOpacity
          style={styles.actionBtn}
          onPress={() => setShowTaskModal(true)}
        >
          <Text style={styles.actionText}>+ Add Task</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.actionBtn}
          onPress={() => setShowMoneyModal(true)}
        >
          <Text style={styles.actionText}>+ Add Money</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.sectionTitle}>Tasks</Text>
      <FlatList
        data={child.tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.transaction}
            onLongPress={() => handleDeleteTask(item.id)}
          >
            <Text style={styles.txLabel}>{item.title}</Text>
            <Text
              style={[
                styles.txAmount,
                { color: item.completed ? "#2e7d32" : "#d32f2f" },
              ]}
            >
              {item.completed ? "+5 🪙" : "Pending"}
            </Text>
          </TouchableOpacity>
        )}
      />

      <Text style={styles.sectionTitle}>Recent Transactions</Text>
      <FlatList
        data={child.transactions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.transaction}>
            <Text style={styles.txLabel}>{item.label}</Text>
            <Text
              style={[
                styles.txAmount,
                { color: item.amount >= 0 ? "#2e7d32" : "#d32f2f" },
              ]}
            >
              {item.amount >= 0 ? "+" : ""}
              {item.amount} 🪙
            </Text>
          </View>
        )}
      />

      {/*  <TouchableOpacity
        style={styles.backBtn}
        onPress={() => router.replace("/(home)/parent/(tabs)")}
      >
        <Text style={styles.backText}>← Back to Dashboard</Text>
      </TouchableOpacity> */}

      <Modal visible={showTaskModal} animationType="slide">
        <AssignTaskForm
          childId={child.id}
          onClose={() => setShowTaskModal(false)}
        />
      </Modal>

      <Modal visible={showMoneyModal} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>Add Coins</Text>
            <TextInput
              value={moneyToAdd}
              onChangeText={setMoneyToAdd}
              keyboardType="numeric"
              style={styles.input}
              placeholder="Enter amount"
            />
            <TouchableOpacity style={styles.submitBtn} onPress={handleAddMoney}>
              <Text style={styles.submitText}>Add</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setShowMoneyModal(false)}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: wp(5),
    backgroundColor: "#fffaf2",
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  notFound: {
    fontSize: hp(2),
    color: "#999",
  },
  header: {
    alignItems: "center",
    marginBottom: hp(2),
  },
  avatar: {
    fontSize: hp(6),
  },
  name: {
    fontSize: hp(2.8),
    fontWeight: "700",
    color: "#333",
  },
  balanceBox: {
    backgroundColor: "#f0f4f8",
    padding: hp(2),
    borderRadius: 12,
    marginBottom: hp(2),
  },
  balanceText: {
    fontSize: hp(2),
    fontWeight: "600",
    color: "#333",
  },
  sectionTitle: {
    fontSize: hp(2.2),
    fontWeight: "600",
    marginVertical: hp(1.5),
    color: "#222",
  },
  transaction: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: hp(1),
    borderBottomWidth: 1,
    borderColor: "#eee",
  },
  txLabel: {
    fontSize: hp(1.8),
    color: "#333",
  },
  txAmount: {
    fontSize: hp(1.8),
    fontWeight: "600",
  },
  backBtn: {
    marginTop: hp(3),
    alignItems: "center",
  },
  backText: {
    fontSize: hp(2),
    color: "#f57f17",
    fontWeight: "600",
  },
  actionsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: hp(1),
  },
  actionBtn: {
    backgroundColor: "#f57f17",
    paddingVertical: hp(1.2),
    paddingHorizontal: wp(5),
    borderRadius: 10,
  },
  actionText: {
    color: "#fff",
    fontWeight: "600",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalBox: {
    backgroundColor: "#fff",
    padding: wp(5),
    width: "80%",
    borderRadius: 14,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: hp(2.2),
    fontWeight: "600",
    marginBottom: hp(1),
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: hp(1),
    width: "100%",
    marginBottom: hp(1.5),
  },
  submitBtn: {
    backgroundColor: "#4caf50",
    paddingVertical: hp(1),
    paddingHorizontal: wp(6),
    borderRadius: 8,
  },
  submitText: {
    color: "#fff",
    fontWeight: "600",
  },
  cancelText: {
    color: "#999",
    marginTop: hp(1),
  },
});
