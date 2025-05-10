import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Dimensions, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { PanGestureHandler } from "react-native-gesture-handler";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedGestureHandler,
  withSpring,
  runOnJS,
} from "react-native-reanimated";
import { hp, wp } from "@/utils/responsive";
import { useRouter } from "expo-router";
import { useApp } from "@/context/app-context";

const { width } = Dimensions.get("window");

const scenarios = [
  {
    id: "1",
    context: "You're going to school.",
    item: { label: "✏️ Pencil", type: "need" },
    explanation: "You need it to write and complete your work.",
  },
  {
    id: "2",
    context: "You're getting ready for a birthday party.",
    item: { label: "🕹️ PS5", type: "want" },
    explanation: "It’s fun, but not something you must bring.",
  },
  {
    id: "3",
    context: "You’re packing your lunch for the day.",
    item: { label: "🍎 Apple", type: "need" },
    explanation: "It helps you stay healthy and energized.",
  },
  {
    id: "4",
    context: "You’re shopping with a small budget.",
    item: { label: "🍬 Candy", type: "want" },
    explanation: "Tasty, but you don’t really need it.",
  },
  {
    id: "5",
    context: "You're about to start school.",
    item: { label: "🎒 School Bag", type: "need" },
    explanation: "You carry books and supplies in it every day.",
  },
  {
    id: "6",
    context: "You're decorating your bed.",
    item: { label: "🧸 Teddy Bear", type: "want" },
    explanation: "It’s cute but not needed to sleep.",
  },
  {
    id: "7",
    context: "You're walking in the sun.",
    item: { label: "🧢 Cap", type: "need" },
    explanation: "It helps protect you from the sun.",
  },
  {
    id: "8",
    context: "You're hungry after school.",
    item: { label: "🍔 Burger", type: "need" },
    explanation: "You need food to keep your energy.",
  },
  {
    id: "9",
    context: "You’re saving money.",
    item: { label: "🧃 Juice Box", type: "want" },
    explanation: "It’s refreshing, but not a must.",
  },
];

export default function GameWantVsNeed() {
  const [index, setIndex] = useState(0);
  const [coinsEarned, setCoinsEarned] = useState(0);
  const [feedback, setFeedback] = useState("");
  const translateX = useSharedValue(0);

  const { updatePocket, completedStages, markStageComplete } = useApp();
  const router = useRouter();

  const current = scenarios[index];

  useEffect(() => {
    if (completedStages.stage3WantVsNeed) {
      Alert.alert("Already Completed", "You've already finished this stage.");
      router.replace("/");
    }
  }, []);

  const handleAnswer = (direction: "left" | "right") => {
    const userAnswer = direction === "left" ? "need" : "want";
    const correct = userAnswer === current.item.type;

    if (correct) {
      setCoinsEarned((prev) => prev + 10);
      updatePocket(10);
      setFeedback(`✅ Great! +10 coins\n${current.explanation}`);
    } else {
      setFeedback(`❌ Not quite.\n${current.explanation}`);
    }

    if (index + 1 < scenarios.length) {
      setTimeout(() => {
        setIndex((prev) => prev + 1);
        translateX.value = withSpring(0);
        setFeedback("");
      }, 1800);
    } else {
      markStageComplete("stage3WantVsNeed");

      setTimeout(() => {
        Alert.alert(
          "🎓 Lesson Complete!",
          `Coins Earned: ${
            coinsEarned + (correct ? 10 : 0)
          }\n\n✅ Needs are things you must have to live and grow, like school supplies and food.\n❌ Wants are fun or nice, but not essential.\n\nSmart kids always choose their needs first!`,
          [{ text: "Back to Map", onPress: () => router.replace("/") }]
        );
      }, 1000);
    }
  };

  const gestureHandler = useAnimatedGestureHandler({
    onActive: (event) => {
      translateX.value = event.translationX;
    },
    onEnd: (event) => {
      if (event.translationX > 100) {
        runOnJS(handleAnswer)("right");
      } else if (event.translationX < -100) {
        runOnJS(handleAnswer)("left");
      } else {
        translateX.value = withSpring(0);
      }
    },
  });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.title}>🎯 Need vs Want</Text>

        <View style={styles.instructions}>
          <View style={styles.instructionItem}>
            <Ionicons name="arrow-back-circle" size={22} color="#4caf50" />
            <Text style={styles.instructionText}>Need 🛒</Text>
          </View>

          <View style={styles.instructionItem}>
            <Ionicons name="arrow-forward-circle" size={22} color="#e91e63" />
            <Text style={styles.instructionText}>Want 🎉</Text>
          </View>
        </View>
      </View>

      {/* Game Area */}
      {current ? (
        <>
          <Text style={styles.context}>{current.context}</Text>
          <PanGestureHandler onGestureEvent={gestureHandler}>
            <Animated.View style={[styles.card, animatedStyle]}>
              <Text style={styles.emoji}>{current.item.label}</Text>
            </Animated.View>
          </PanGestureHandler>
          {feedback !== "" && <Text style={styles.feedback}>{feedback}</Text>}
        </>
      ) : (
        <Text style={styles.done}>All done! 🏁</Text>
      )}

      {/* Score */}
      <View style={styles.scoreRow}>
        <Ionicons name="wallet" size={20} color="#f57f17" />
        <Text style={styles.scoreText}>Coins Earned: {coinsEarned}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fffaf2",
    paddingTop: hp(6),
    paddingHorizontal: wp(6),
    alignItems: "center",
  },
  header: {
    alignItems: "center",
    marginBottom: hp(2),
  },
  title: {
    fontSize: hp(3.2),
    fontWeight: "700",
    color: "#222",
    marginBottom: hp(2),
  },
  instructions: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: hp(1.5),
    paddingHorizontal: wp(6),
  },
  instructionItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: wp(1.5),
  },
  instructionText: {
    fontSize: hp(1.8),
    fontWeight: "500",
    color: "#333",
  },
  context: {
    fontSize: hp(2),
    fontWeight: "600",
    color: "#2e2e2e",
    marginBottom: hp(2),
    textAlign: "center",
  },
  card: {
    width: width * 0.8,
    height: hp(30),
    backgroundColor: "#fff",
    borderRadius: 20,
    elevation: 6,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: hp(2),
  },
  emoji: {
    fontSize: hp(6),
  },
  feedback: {
    fontSize: hp(1.8),
    color: "#333",
    textAlign: "center",
    marginBottom: hp(2),
    paddingHorizontal: wp(4),
  },
  done: {
    fontSize: hp(2.4),
    fontWeight: "600",
    color: "#333",
    marginTop: hp(10),
  },
  scoreRow: {
    flexDirection: "row",
    marginTop: hp(3),
  },
  scoreText: {
    fontSize: hp(2),
    fontWeight: "600",
    color: "#333",
    marginLeft: wp(2),
  },
});
