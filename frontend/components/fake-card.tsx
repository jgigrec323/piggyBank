import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface Props {
  name: string;
  balance: number;
}

const FakeCard: React.FC<Props> = ({ name, balance }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.label}>Piggy Bank Card</Text>
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.balance}>{balance} 🪙</Text>
    </View>
  );
};

export default FakeCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#f57f17",
    borderRadius: 20,
    padding: 20,
    marginBottom: 24,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
  },
  label: {
    color: "#fff9c4",
    fontSize: 13,
    marginBottom: 6,
  },
  name: {
    fontSize: 20,
    fontWeight: "700",
    color: "#fff",
  },
  balance: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    marginTop: 10,
  },
});
