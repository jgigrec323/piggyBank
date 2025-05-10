import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { hp, wp } from "@/utils/responsive";
import { useApp } from "@/context/app-context";
import { useRouter } from "expo-router";

const INVEST_AMOUNT = 30;

export default function GameSmartInvestor() {
  const [selected, setSelected] = useState<string | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const [reward, setReward] = useState(0);
  const { updatePocket, completedStages, markStageComplete } = useApp();
  const router = useRouter();

  useEffect(() => {
    if (completedStages.stage8SmartInvestor) {
      Alert.alert("Already Completed", "You've already finished this stage.");
      router.replace("/");
    } else {
      Alert.alert(
        "📘 Investment Tip",
        "💡 Investing means putting coins into something now, hoping it grows later.\n\nChoose a vault:\n🏦 Safe = small, sure win\n💼 Medium = could win more, or nothing\n🎰 High = big win or total loss!"
      );
    }
  }, []);

  const handleChoice = (type: string) => {
    if (selected) return;

    let coins = 0;

    if (type === "safe") {
      coins = 5; // always win small
    } else if (type === "medium") {
      coins = Math.random() < 0.7 ? 10 : 0; // 70% chance to win
    } else if (type === "high") {
      coins = Math.random() < 0.4 ? 30 : 0; // 40% chance to win
    }

    setSelected(type);
    setReward(coins);
    setResult(
      coins === 0
        ? "😬 You didn’t earn anything this time."
        : `🎉 Great! You earned ${coins} coins from your investment.`
    );

    updatePocket(coins);
    markStageComplete("stage8SmartInvestor");

    setTimeout(() => {
      Alert.alert(
        "📘 What You Learned",
        `${
          coins === 0
            ? "This time the investment didn’t work out — and that’s okay!"
            : "You made a smart choice and got a return."
        }\n\n🏦 Safe = always slow and steady.\n💼 Medium = a fair chance of success.\n🎰 High = exciting, but you could lose it all.\n\n💡 Smart investors don’t guess — they think, plan, and accept outcomes!`,
        [{ text: "Back to Map", onPress: () => router.replace("/") }]
      );
    }, 1500);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>💡 Smart Investor</Text>
      <Text style={styles.subtitle}>
        You have {INVEST_AMOUNT} coins to invest
      </Text>
      <Text style={styles.instructions}>Pick one vault:</Text>

      <View style={styles.vaultRow}>
        <TouchableOpacity
          style={[styles.vault, selected === "safe" && styles.selectedVault]}
          onPress={() => handleChoice("safe")}
        >
          <Text style={styles.vaultTitle}>🏦 Safe</Text>
          <Text style={styles.vaultDesc}>Always +5 coins</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.vault, selected === "medium" && styles.selectedVault]}
          onPress={() => handleChoice("medium")}
        >
          <Text style={styles.vaultTitle}>💼 Medium</Text>
          <Text style={styles.vaultDesc}>70%: +10 or 0</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.vault, selected === "high" && styles.selectedVault]}
          onPress={() => handleChoice("high")}
        >
          <Text style={styles.vaultTitle}>🎰 High</Text>
          <Text style={styles.vaultDesc}>40%: +30 or 0</Text>
        </TouchableOpacity>
      </View>

      {result && <Text style={styles.result}>{result}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fffaf2",
    paddingTop: hp(6),
    paddingHorizontal: wp(5),
    alignItems: "center",
  },
  title: {
    fontSize: hp(3),
    fontWeight: "700",
    color: "#222",
    marginBottom: hp(1),
  },
  subtitle: {
    fontSize: hp(1.8),
    color: "#444",
    marginBottom: hp(2),
  },
  instructions: {
    fontSize: hp(1.8),
    color: "#555",
    marginBottom: hp(2),
  },
  vaultRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: hp(1),
    gap: wp(2),
  },
  vault: {
    flex: 1,
    backgroundColor: "#fff",
    borderWidth: 2,
    borderColor: "#ccc",
    borderRadius: 14,
    padding: hp(2),
    alignItems: "center",
  },
  selectedVault: {
    borderColor: "#4caf50",
    backgroundColor: "#e8f5e9",
  },
  vaultTitle: {
    fontSize: hp(2),
    fontWeight: "700",
    marginBottom: hp(1),
  },
  vaultDesc: {
    fontSize: hp(1.6),
    color: "#555",
    textAlign: "center",
  },
  result: {
    marginTop: hp(4),
    fontSize: hp(2),
    fontWeight: "600",
    color: "#333",
    textAlign: "center",
    paddingHorizontal: wp(4),
  },
});
