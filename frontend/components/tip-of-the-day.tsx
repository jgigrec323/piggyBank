import React from "react";
import { View, Text, StyleSheet } from "react-native";

const tips = [
  "💡 Encourage your child to check off tasks themselves.",
  "💡 Reward consistency, not just completion.",
  "💡 Let kids set their own saving goals!",
  "💡 Use coins to teach spending vs saving.",
];

const TipOfTheDay = () => {
  const tip = tips[Math.floor(Math.random() * tips.length)];
  return (
    <View style={styles.container}>
      <Text style={styles.tip}>{tip}</Text>
    </View>
  );
};

export default TipOfTheDay;

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    marginHorizontal: 20,
    padding: 12,
    backgroundColor: "#fff",
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: "#f57f17",
  },
  tip: {
    color: "#444",
    fontSize: 13,
    fontStyle: "italic",
  },
});
