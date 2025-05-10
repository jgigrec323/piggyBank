import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { hp, wp } from "@/utils/responsive";
import { useApp } from "@/context/app-context";
import { useRouter } from "expo-router";

const correctTiles = ["🐷", "💰", "🔒", "🪙", "🐖", "🏦", "🧠", "📈", "🎯"];

export default function GamePiggyPuzzle() {
  const [tiles, setTiles] = useState<string[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [message, setMessage] = useState(
    "Tap two tiles to swap and fix the piggy bank!"
  );
  const { updatePocket, completedStages, markStageComplete } = useApp();
  const router = useRouter();

  useEffect(() => {
    if (completedStages.stage10PiggyPuzzle) {
      Alert.alert("Already Completed", "You've already finished this stage.");
      router.replace("/");
      return;
    }

    const shuffled = [...correctTiles].sort(() => Math.random() - 0.5);
    setTiles(shuffled);
  }, []);

  const handlePress = (index: number) => {
    if (selectedIndex === null) {
      setSelectedIndex(index);
      setMessage("Now tap another tile to swap.");
    } else {
      const newTiles = [...tiles];
      [newTiles[selectedIndex], newTiles[index]] = [
        newTiles[index],
        newTiles[selectedIndex],
      ];
      setTiles(newTiles);
      setSelectedIndex(null);

      if (newTiles.join("") === correctTiles.join("")) {
        updatePocket(30);
        markStageComplete("stage10PiggyPuzzle");

        setTimeout(() => {
          Alert.alert(
            "🎉 Puzzle Complete!",
            "🧠 Great job! Just like managing money, every decision you make builds a complete picture.\n\n💡 Saving, planning, and thinking ahead brings everything together — piece by piece.",
            [{ text: "Back to Map", onPress: () => router.replace("/") }]
          );
        }, 300);
      } else {
        setMessage("Nice! Try the next swap.");
      }
    }
  };

  return (
    <View style={styles.container}>
      {/* 🔖 Top Guide */}
      <View style={styles.panel}>
        <Text style={styles.panelTitle}>🧠 Mission</Text>
        <Text style={styles.panelText}>
          Rebuild your broken piggy bank!{"\n"}
          Swap tiles until every piece is in the right place.
        </Text>
        <Text style={styles.tipText}>💬 {message}</Text>
      </View>

      {/* 🎯 Goal Display */}
      <View style={styles.goalBox}>
        <Text style={styles.goalTitle}>🎯 Your Goal</Text>
        <View style={styles.goalGrid}>
          {correctTiles.map((tile, i) => (
            <View key={i} style={styles.goalTile}>
              <Text style={styles.tileText}>{tile}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* 🧩 Puzzle Grid */}
      <View style={styles.grid}>
        {tiles.map((tile, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.tile,
              selectedIndex === index && styles.selectedTile,
            ]}
            onPress={() => handlePress(index)}
          >
            <Text style={styles.tileText}>{tile}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fffaf2",
    paddingTop: hp(3),
    paddingHorizontal: wp(4),
    alignItems: "center",
  },
  panel: {
    backgroundColor: "#fff9e1",
    padding: hp(2),
    borderRadius: 14,
    marginBottom: hp(2),
    width: "100%",
    elevation: 2,
  },
  panelTitle: {
    fontSize: hp(2.2),
    fontWeight: "700",
    color: "#f57f17",
    marginBottom: hp(1),
  },
  panelText: {
    fontSize: hp(1.8),
    color: "#333",
  },
  tipText: {
    marginTop: hp(1),
    fontSize: hp(1.7),
    color: "#555",
    fontStyle: "italic",
  },
  goalBox: {
    alignItems: "center",
    marginBottom: hp(2),
  },
  goalTitle: {
    fontSize: hp(2),
    fontWeight: "600",
    marginBottom: hp(1),
    color: "#333",
  },
  goalGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    width: "80%",
    justifyContent: "center",
    gap: wp(2),
  },
  goalTile: {
    width: "28%",
    aspectRatio: 1,
    backgroundColor: "#f1f1f1",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#ddd",
  },
  grid: {
    width: "100%",
    aspectRatio: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: wp(2),
    justifyContent: "center",
  },
  tile: {
    width: "28%",
    aspectRatio: 1,
    backgroundColor: "#fff",
    borderRadius: 14,
    borderWidth: 2,
    borderColor: "#ccc",
    alignItems: "center",
    justifyContent: "center",
  },
  selectedTile: {
    borderColor: "#4caf50",
    backgroundColor: "#e8f5e9",
  },
  tileText: {
    fontSize: hp(5),
  },
});
