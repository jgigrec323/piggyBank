import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface Props {
  name: string;
  avatar: string;
  balance: number;
  savings: number;
}

const ChildDetailHeader: React.FC<Props> = ({
  name,
  avatar,
  balance,
  savings,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.avatar}>{avatar}</Text>
        <View>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.balance}>Balance: {balance} 🪙</Text>
          <Text style={styles.savings}>Savings: {savings} 💰</Text>
        </View>
      </View>
    </View>
  );
};

export default ChildDetailHeader;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 16,
    marginBottom: 20,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  avatar: {
    fontSize: 36,
  },
  name: {
    fontSize: 18,
    fontWeight: "700",
    color: "#333",
  },
  balance: {
    fontSize: 13,
    color: "#444",
  },
  savings: {
    fontSize: 13,
    color: "#666",
  },
});
