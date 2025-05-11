import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { hp, wp } from "@/utils/responsive";
import { useApp } from "@/context/app-context";
import { useRouter } from "expo-router";

// 🛍️ Shop items
const SHOP_ITEMS = [
  { id: "item1", name: "🚲 Bicycle", price: 50 },
  { id: "item2", name: "🎮 Game Console", price: 100 },
  { id: "item3", name: "📚 Book Set", price: 30 },
  { id: "item4", name: "🧸 Teddy Bear", price: 20 },
  { id: "item5", name: "🎨 Art Kit", price: 25 },
];

// 📈 Investment options
const INVESTMENTS = [
  { id: "inv1", name: "📊 Buy Gold", price: 40 },
  { id: "inv2", name: "💹 Buy Crypto", price: 60 },
  { id: "inv3", name: "💵 Buy USD", price: 30 },
];

export default function ShopScreen() {
  const { moneyInPocket, spendFromPocket, addPurchasedItem, purchasedItems } =
    useApp();
  const router = useRouter();

  const handlePurchase = (
    item: { id: string; name: string; price: number },
    isInvestment = false
  ) => {
    if (!isInvestment && purchasedItems.includes(item.name)) {
      Alert.alert(
        "Already Purchased",
        `${item.name} is already in your items.`
      );
      return;
    }

    if (moneyInPocket < item.price) {
      Alert.alert("Not enough coins", "You need more coins for this item.");
      return;
    }

    Alert.alert("Confirm", `Spend ${item.price} coins for ${item.name}?`, [
      { text: "Cancel" },
      {
        text: "Yes",
        onPress: () => {
          const success = spendFromPocket(item.price);
          if (success) {
            if (!isInvestment) {
              addPurchasedItem(item.name);
              Alert.alert(
                "Purchased!",
                `${item.name} was added to your inventory.`
              );
            } else {
              Alert.alert("Invested!", `You have invested in ${item.name}.`);
            }
          }
        },
      },
    ]);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>🛍️ Shop & Invest</Text>

      {/* 💰 Wallet */}
      <View style={styles.balanceBox}>
        <Ionicons name="wallet" size={20} color="#fff" />
        <Text style={styles.balanceText}>Coins: {moneyInPocket} 🪙</Text>
      </View>

      {/* 🧸 Shop Section */}
      <Text style={styles.sectionTitle}>🧸 Fun Items</Text>
      {SHOP_ITEMS.map((item) => (
        <TouchableOpacity
          key={item.id}
          style={[
            styles.card,
            purchasedItems.includes(item.name) && styles.disabledCard,
          ]}
          onPress={() => handlePurchase(item)}
          disabled={purchasedItems.includes(item.name)}
        >
          <Text style={styles.itemName}>{item.name}</Text>
          <Text style={styles.itemPrice}>
            {purchasedItems.includes(item.name) ? "Owned" : `${item.price} 🪙`}
          </Text>
        </TouchableOpacity>
      ))}

      {/* 📈 Investment Section */}
      <Text style={styles.sectionTitle}>📈 Invest Your Coins</Text>
      {INVESTMENTS.map((item) => (
        <TouchableOpacity
          key={item.id}
          style={styles.card}
          onPress={() => handlePurchase(item, true)}
        >
          <Text style={styles.itemName}>{item.name}</Text>
          <Text style={styles.itemPrice}>{item.price} 🪙</Text>
        </TouchableOpacity>
      ))}

      {/* 🔙 Back */}
      <TouchableOpacity
        style={styles.backBtn}
        onPress={() => router.replace("/")}
      >
        <Text style={styles.backText}>← Back to Map</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fffaf0",
    padding: wp(5),
  },
  header: {
    fontSize: hp(2.8),
    fontWeight: "700",
    marginBottom: hp(2),
    color: "#333",
  },
  balanceBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f57f17",
    padding: hp(1.2),
    borderRadius: 12,
    justifyContent: "center",
    marginBottom: hp(2),
  },
  balanceText: {
    fontSize: hp(2),
    color: "#fff",
    fontWeight: "600",
    marginLeft: wp(2),
  },
  sectionTitle: {
    fontSize: hp(2.2),
    fontWeight: "600",
    marginBottom: hp(1),
    color: "#222",
  },
  card: {
    backgroundColor: "#fff3e0",
    borderRadius: 14,
    padding: hp(2),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: hp(1),
    borderColor: "#fdd835",
    borderWidth: 1,
  },
  disabledCard: {
    backgroundColor: "#e0e0e0",
    borderColor: "#ccc",
  },
  itemName: {
    fontSize: hp(2),
  },
  itemPrice: {
    fontSize: hp(1.8),
    fontWeight: "600",
    color: "#f57f17",
  },
  backBtn: {
    marginTop: hp(3),
    alignItems: "center",
  },
  backText: {
    color: "#f57f17",
    fontSize: hp(2),
    fontWeight: "600",
  },
});
