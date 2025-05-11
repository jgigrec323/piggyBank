import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { hp, wp } from "@/utils/responsive";
import { useParent } from "@/context/parent-context";

export default function ChildDetailsScreen() {
  const { id } = useLocalSearchParams(); // from dynamic route
  const router = useRouter();
  const { children } = useParent();

  const child = children.find((c) => c.id === id);

  if (!child) {
    return (
      <View style={styles.centered}>
        <Text style={styles.notFound}>Child not found</Text>
      </View>
    );
  }

  const balance = child.tasks.filter((t) => t.completed).length * 5;

  return (
    <View style={styles.container}>
      {/* 👶 Header */}
      <View style={styles.header}>
        <Text style={styles.avatar}>{child.avatar}</Text>
        <Text style={styles.name}>{child.name}</Text>
      </View>

      {/* 💰 Balances */}
      <View style={styles.balanceBox}>
        <Text style={styles.balanceText}>In Pocket: {balance} 🪙</Text>
        <Text style={styles.balanceText}>Bank: 0 🏦</Text>
      </View>

      {/* ✅ Task Summary */}
      <Text style={styles.sectionTitle}>Tasks</Text>
      <FlatList
        data={child.tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.transaction}>
            <Text style={styles.txLabel}>{item.title}</Text>
            <Text
              style={[
                styles.txAmount,
                { color: item.completed ? "#2e7d32" : "#d32f2f" },
              ]}
            >
              {item.completed ? "+5 🪙" : "Pending"}
            </Text>
          </View>
        )}
      />

      {/* 🔙 Back */}
      <TouchableOpacity
        style={styles.backBtn}
        onPress={() => router.replace("/parent-home")}
      >
        <Text style={styles.backText}>← Back to Dashboard</Text>
      </TouchableOpacity>
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
    marginBottom: hp(0.5),
  },
  sectionTitle: {
    fontSize: hp(2.2),
    fontWeight: "600",
    marginVertical: hp(1.5),
    color: "#222",
  },
  stageItem: {
    paddingVertical: hp(0.8),
  },
  stageText: {
    fontSize: hp(1.8),
    color: "#444",
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
});
