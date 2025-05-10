import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { hp, wp } from "@/utils/responsive";
import { useRouter } from "expo-router";

export default function Stage2AtmScreen() {
  const router = useRouter();

  const [balance, setBalance] = useState(150); // starting fake balance
  const [transactions, setTransactions] = useState([
    { id: "1", label: "Account created", amount: 0 },
    { id: "2", label: "Welcome bonus", amount: 50 },
    { id: "3", label: "Chore reward", amount: 100 },
  ]);

  const addCoins = (amount: number, label: string) => {
    setBalance((prev) => prev + amount);
    setTransactions((prev) => [
      { id: Date.now().toString(), label, amount },
      ...prev,
    ]);
  };

  const withdraw = (amount: number, label: string) => {
    if (balance < amount) return;
    setBalance((prev) => prev - amount);
    setTransactions((prev) => [
      { id: Date.now().toString(), label, amount: -amount },
      ...prev,
    ]);
  };

  return (
    <View style={styles.container}>
      {/* Header Card */}
      <View style={styles.card}>
        <Text style={styles.title}>🎰 My ATM</Text>
        <Text style={styles.name}>👦 Amira</Text>
        <Text style={styles.balance}>Balance: {balance} 🪙</Text>
      </View>

      {/* Transaction History */}
      <Text style={styles.sectionTitle}>Transactions</Text>
      <FlatList
        data={transactions}
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
        style={styles.txList}
      />

      {/* Buttons */}
      <View style={styles.actions}>
        <TouchableOpacity
          style={[styles.btn, { backgroundColor: "#43a047" }]}
          onPress={() => addCoins(20, "Mini Job")}
        >
          <Text style={styles.btnText}>Deposit +20</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.btn, { backgroundColor: "#ef5350" }]}
          onPress={() => withdraw(10, "Snack bought")}
        >
          <Text style={styles.btnText}>Withdraw -10</Text>
        </TouchableOpacity>
      </View>

      {/* Continue Button */}
      <TouchableOpacity
        style={styles.nextBtn}
        onPress={() => router.push("/stage-two")}
      >
        <Text style={styles.nextText}>Level 2</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.nextBtn}
        onPress={() => router.push("/stage-two")}
      >
        <Text style={styles.nextText}>Level 3</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: wp(6),
    backgroundColor: "#f7f7f7",
  },
  card: {
    backgroundColor: "#00897b",
    borderRadius: 16,
    padding: hp(2.5),
    marginBottom: hp(3),
  },
  title: {
    fontSize: hp(2.5),
    color: "#fff",
    fontWeight: "600",
  },
  name: {
    fontSize: hp(2.2),
    color: "#fff",
    marginTop: hp(1),
  },
  balance: {
    fontSize: hp(2.4),
    color: "#fff",
    fontWeight: "700",
    marginTop: hp(1),
  },
  sectionTitle: {
    fontSize: hp(2),
    fontWeight: "600",
    marginBottom: hp(1),
    color: "#333",
  },
  txList: {
    maxHeight: hp(25),
  },
  transaction: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: hp(1),
    borderBottomWidth: 1,
    borderColor: "#ddd",
  },
  txLabel: {
    fontSize: hp(1.8),
    color: "#333",
  },
  txAmount: {
    fontSize: hp(1.8),
    fontWeight: "600",
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: hp(3),
  },
  btn: {
    flex: 0.48,
    borderRadius: 12,
    paddingVertical: hp(1.6),
    alignItems: "center",
  },
  btnText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: hp(2),
  },
  nextBtn: {
    marginTop: hp(4),
    backgroundColor: "#f57f17",
    paddingVertical: hp(2),
    borderRadius: 12,
    alignItems: "center",
  },
  nextText: {
    color: "#fff",
    fontSize: hp(2),
    fontWeight: "600",
  },
});
