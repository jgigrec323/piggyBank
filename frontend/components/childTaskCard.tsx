import { useRouter } from "expo-router";
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Animated, { ZoomIn } from "react-native-reanimated";

interface Props {
  name: string;
  avatar: string;
  total: number;
  done: number;
  color: string;
}

const ChildTaskCard: React.FC<Props> = ({
  name,
  avatar,
  total,
  done,
  color,
}) => {
  const progress = Math.round((done / total) * 100);
  const router = useRouter();
  return (
    <Animated.View
      entering={ZoomIn.duration(400).springify().damping(15)}
      style={[styles.card, { backgroundColor: color }]}
    >
      <TouchableOpacity
        onPress={() => {
          router.push("/(home)/(parent)/(screens)/child-detail-screen");
        }}
        activeOpacity={0.85}
      >
        {/* Emoji and options */}
        <View style={styles.row}>
          <Text style={styles.emoji}>{avatar}</Text>
          <Text style={styles.options}>⋮</Text>
        </View>

        {/* Name & Task */}
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.taskCount}>{total} Tasks</Text>

        {/* Progress section */}
        <View style={styles.progressContainer}>
          <View style={styles.progressBarTrack}>
            <View
              style={[
                styles.progressBarFill,
                {
                  width: `${progress}%`,
                  backgroundColor: "#fff",
                },
              ]}
            />
          </View>
          <Text style={styles.progressText}>Progress {progress}%</Text>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default ChildTaskCard;

const styles = StyleSheet.create({
  card: {
    flex: 1,
    margin: 8,
    borderRadius: 20,
    padding: 16,
    minWidth: "42%",
    maxWidth: "47%",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  emoji: {
    fontSize: 20,
  },
  options: {
    fontSize: 18,
    color: "#ffffff88",
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
    marginTop: 14,
  },
  taskCount: {
    fontSize: 13,
    color: "#fff",
    marginTop: 2,
  },
  progressContainer: {
    marginTop: 12,
  },
  progressBarTrack: {
    height: 6,
    borderRadius: 3,
    backgroundColor: "#ffffff55",
    width: "100%",
  },
  progressBarFill: {
    height: 6,
    borderRadius: 3,
  },
  progressText: {
    fontSize: 12,
    color: "#fff",
    marginTop: 6,
  },
});
