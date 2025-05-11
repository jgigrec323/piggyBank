import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Alert,
  TextInput,
} from "react-native";
import { hp, wp } from "@/utils/responsive";
import { useRouter } from "expo-router";
import { useApp } from "@/context/app-context";

export default function Stage2AtmScreen() {
  const router = useRouter();
  const {
    moneyInPocket,
    updatePocket,
    bankUser,
    completedStages,
    markStageComplete,
  } = useApp();

  const [balance, setBalance] = useState(0);
  const [amount, setAmount] = useState("");
  const [transactions, setTransactions] = useState([
    { id: "1", label: "Bank Account Created", amount: 0 },
  ]);

  const handleDeposit = () => {
    const amt = parseInt(amount);
    if (isNaN(amt) || amt <= 0) {
      Alert.alert("Invalid amount", "Please enter a valid deposit amount.");
      return;
    }
    if (moneyInPocket < amt) {
      Alert.alert("Not enough coins", "You don't have enough in your pocket.");
      return;
    }
    setBalance((prev) => prev + amt);
    updatePocket(-amt);
    setTransactions((prev) => [
      { id: Date.now().toString(), label: "Deposit from Pocket", amount: amt },
      ...prev,
    ]);
    setAmount("");
  };

  const handleWithdraw = () => {
    const amt = parseInt(amount);
    if (isNaN(amt) || amt <= 0) {
      Alert.alert("Invalid amount", "Please enter a valid withdraw amount.");
      return;
    }
    if (balance < amt) {
      Alert.alert("Not enough balance", "Your bank balance is too low.");
      return;
    }
    setBalance((prev) => prev - amt);
    updatePocket(amt);
    setTransactions((prev) => [
      {
        id: Date.now().toString(),
        label: "Withdraw to Pocket",
        amount: -amt,
      },
      ...prev,
    ]);
    setAmount("");
  };

  return (
    <View style={styles.container}>
      {/* 🏦 Header */}
      <View style={styles.card}>
        <Text style={styles.name}>👦 {bankUser?.name ?? "Kid"}</Text>
        <Text style={styles.balance}>Bank Balance: {balance} 🪙</Text>
        <Text style={styles.balance}>In Pocket: {moneyInPocket} 🪙</Text>
      </View>

      {/* 📜 Transactions */}
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

      {/* 💳 Actions */}
      <Text style={styles.sectionTitle}>Manage Your Coins</Text>
      <View style={styles.actionBox}>
        <TextInput
          value={amount}
          onChangeText={setAmount}
          keyboardType="numeric"
          placeholder="Enter amount"
          style={styles.input}
        />
        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={[styles.btn, { backgroundColor: "#4caf50" }]}
            onPress={handleDeposit}
          >
            <Text style={styles.btnText}>Deposit</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.btn, { backgroundColor: "#ef5350" }]}
            onPress={handleWithdraw}
          >
            <Text style={styles.btnText}>Withdraw</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* 🗺 Go to Map */}
      <TouchableOpacity
        style={[
          styles.nextBtn,
          { backgroundColor: "#607d8b", marginTop: hp(4) },
        ]}
        onPress={() => router.replace("/")}
      >
        <Text style={styles.nextText}>Go to Map</Text>
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
  name: {
    fontSize: hp(2.2),
    color: "#fff",
    marginTop: hp(1),
  },
  balance: {
    fontSize: hp(2.4),
    color: "#fff",
    fontWeight: "700",
    marginTop: hp(0.5),
  },
  sectionTitle: {
    fontSize: hp(2),
    fontWeight: "600",
    marginTop: hp(3),
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
  actionBox: {
    marginTop: hp(1),
  },
  input: {
    backgroundColor: "#fff",
    padding: hp(1.2),
    borderRadius: 10,
    fontSize: hp(2),
    borderWidth: 1,
    borderColor: "#ccc",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: hp(1.5),
    gap: wp(4),
  },
  btn: {
    flex: 1,
    borderRadius: 12,
    paddingVertical: hp(1.6),
    alignItems: "center",
    paddingHorizontal: wp(4),
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
