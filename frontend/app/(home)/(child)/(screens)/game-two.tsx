import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
} from "react-native";
import { hp, wp } from "@/utils/responsive";
import { useApp } from "@/context/app-context";
import { useRouter } from "expo-router";

const fullStock = [
  { name: "🥪 Sandwich", price: 15 },
  { name: "🧃 Juice", price: 10 },
  { name: "🧸 Teddy Bear", price: 25 },
  { name: "📚 Book", price: 20 },
  { name: "🍬 Candy", price: 5 },
  { name: "🎮 Toy", price: 30 },
  { name: "👕 T-Shirt", price: 20 },
  { name: "🧦 Socks", price: 8 },
  { name: "📓 Notebook", price: 12 },
  { name: "🖍️ Crayons", price: 10 },
  { name: "🎧 Headphones", price: 35 },
  { name: "👟 Sneakers", price: 40 },
  { name: "🎒 Backpack", price: 30 },
  { name: "🍎 Apple", price: 6 },
  { name: "🥤 Soda", price: 12 },
];

const MAX_BUDGET = 50;

export default function GameBudgetBoss() {
  const [storeItems, setStoreItems] = useState([]);
  const [cart, setCart] = useState<string[]>([]);
  const { updatePocket, completedStages, markStageComplete } = useApp();
  const router = useRouter();

  useEffect(() => {
    if (completedStages.stage4BudgetBoss) {
      Alert.alert("Already Completed", "You've already finished this stage.");
      router.replace("/");
      return;
    }

    Alert.alert(
      "📘 Budgeting Tip",
      `🦊 Hello! I'm Fox Accountant.\n\nI get 50 coins every week.\nFirst, I list my needs. Then, I check what fun things I can get with the coins left.\n\nLet’s try it together!`,
      [
        {
          text: "Let's Go!",
          onPress: () => {
            const shuffled = [...fullStock].sort(() => 0.5 - Math.random());
            setStoreItems(shuffled.slice(0, 10));
          },
        },
      ]
    );
  }, []);

  const toggleItem = (name: string) => {
    setCart((prev) =>
      prev.includes(name) ? prev.filter((i) => i !== name) : [...prev, name]
    );
  };

  const getTotal = () => {
    return storeItems.reduce(
      (sum, item) => (cart.includes(item.name) ? sum + item.price : sum),
      0
    );
  };

  const handleCheckout = () => {
    const total = getTotal();
    const reward = MAX_BUDGET - total;

    if (total > MAX_BUDGET) {
      Alert.alert("❌ Overspent!", "Your total exceeds your budget.");
      return;
    }

    markStageComplete("stage4BudgetBoss");
    updatePocket(reward);

    Alert.alert(
      "🎓 What You Learned",
      `You spent ${total} coins and saved ${reward}!\n\n🧠 Budgeting means planning how to spend your money before you use it.\n\n✅ Needs come first.\n🎉 Then, if you have coins left, you can get fun things too!\n\nYou're one step closer to being a Budget Boss!`,
      [{ text: "Back to Map", onPress: () => router.replace("/") }]
    );
  };

  const renderItem = ({ item }: { item: any }) => {
    const selected = cart.includes(item.name);
    return (
      <TouchableOpacity
        onPress={() => toggleItem(item.name)}
        style={[styles.itemCard, selected && styles.selectedItem]}
      >
        <Text style={styles.itemEmoji}>{item.name}</Text>
        <Text style={styles.itemPrice}>{item.price} coins</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🛒 Budget Boss</Text>
      <Text style={styles.subtitle}>
        Select smartly and stay under {MAX_BUDGET} coins!
      </Text>

      <View style={styles.budgetBar}>
        <Text
          style={[
            styles.budgetText,
            getTotal() > MAX_BUDGET && { color: "red" },
          ]}
        >
          Total: {getTotal()} / {MAX_BUDGET}
        </Text>
      </View>

      <FlatList
        data={storeItems}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        keyExtractor={(item) => item.name}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
      />

      <TouchableOpacity
        style={[
          styles.checkoutBtn,
          getTotal() > MAX_BUDGET && { backgroundColor: "#ccc" },
        ]}
        disabled={getTotal() > MAX_BUDGET}
        onPress={handleCheckout}
      >
        <Text style={styles.checkoutText}>Checkout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fffaf2",
    paddingTop: hp(5),
    paddingHorizontal: wp(5),
  },
  title: {
    fontSize: hp(3),
    fontWeight: "700",
    color: "#222",
    textAlign: "center",
  },
  subtitle: {
    fontSize: hp(1.8),
    textAlign: "center",
    marginBottom: hp(2),
    color: "#444",
  },
  budgetBar: {
    alignItems: "center",
    marginBottom: hp(2),
  },
  budgetText: {
    fontSize: hp(2),
    fontWeight: "600",
    color: "#333",
  },
  list: {
    gap: hp(2),
  },
  itemCard: {
    backgroundColor: "#fff",
    borderWidth: 2,
    borderColor: "#ddd",
    borderRadius: 14,
    padding: hp(2),
    marginBottom: hp(2),
    width: "48%",
    alignItems: "center",
    justifyContent: "center",
  },
  selectedItem: {
    borderColor: "#4caf50",
    backgroundColor: "#e8f5e9",
  },
  itemEmoji: {
    fontSize: hp(4),
    marginBottom: hp(1),
  },
  itemPrice: {
    fontSize: hp(1.8),
    color: "#555",
  },
  checkoutBtn: {
    backgroundColor: "#4caf50",
    paddingVertical: hp(1.5),
    borderRadius: 10,
    alignItems: "center",
    marginTop: hp(3),
  },
  checkoutText: {
    color: "#fff",
    fontSize: hp(2),
    fontWeight: "600",
  },
});
