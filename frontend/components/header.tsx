import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

const Header = () => {
  const today = new Date().toLocaleDateString("en-US", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  return (
    <View style={styles.container}>
      <Text style={styles.date}>{today}</Text>
      <View style={styles.row}>
        <View>
          <Text style={styles.greeting}>Hey Parent 👋</Text>
          <Text style={styles.subtitle}>
            {`Your children's boards look great today!`}
          </Text>
        </View>
        <Image
          source={require("../assets/images/welcome.png")}
          style={styles.avatar}
        />
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 60,
    marginBottom: 20,
  },
  date: {
    fontSize: 12,
    color: "#f57f17",
    marginBottom: 6,
  },
  greeting: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1c1c1c",
  },
  subtitle: {
    fontSize: 14,
    color: "#777",
    marginTop: 2,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
  },
});
