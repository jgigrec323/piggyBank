import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Text,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { hp, wp } from "@/utils/responsive";
import LottieView from "lottie-react-native";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

export default function LandingPage() {
  const [soundOn, setSoundOn] = useState(true);
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Map Scroll */}
      <ScrollView
        horizontal
        contentContainerStyle={styles.scrollContent}
        showsHorizontalScrollIndicator={false}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View>
            {/* MAP GIF */}
            <Image
              source={require("../../../../assets/images/map.gif")}
              style={styles.map}
              resizeMode="cover"
            />

            {/* ZONE 1: Village */}
            <TouchableOpacity
              style={[styles.zone, { top: 120, left: 80 }]}
              onPress={() => router.push("/stage-one")}
            >
              <LottieView
                source={require("../../../../data/home.json")}
                autoPlay
                loop
                style={{ width: 50, height: 50 }}
              />
            </TouchableOpacity>

            {/* ZONE 2: Bank */}
            {/* Village zone with Lottie */}
            <TouchableOpacity
              style={[styles.zone, { top: 500, left: 80 }]}
              onPress={() => router.push("/")}
            >
              <LottieView
                source={require("../../../../data/invest.json")}
                autoPlay
                loop
                style={{ width: 50, height: 50 }}
              />
            </TouchableOpacity>

            {/* ZONE 3: Game area */}
            <TouchableOpacity
              style={[styles.zone, { top: 180, left: 450 }]}
              onPress={() => router.push("/")}
            >
              <LottieView
                source={require("../../../../data/controller.json")}
                autoPlay
                loop
                style={{ width: 50, height: 50 }}
              />
            </TouchableOpacity>
          </View>
        </ScrollView>
      </ScrollView>

      {/* 🔊 Sound toggle */}
      <TouchableOpacity
        style={styles.soundBtn}
        onPress={() => setSoundOn(!soundOn)}
      >
        <Ionicons
          name={soundOn ? "volume-high-outline" : "volume-mute-outline"}
          size={24}
          color="#fff"
        />
      </TouchableOpacity>

      {/* 🚀 Start Button */}
      <TouchableOpacity style={styles.startBtn}>
        <Ionicons name="rocket" size={20} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  scrollContent: {
    width: SCREEN_WIDTH * 1.5,
    height: SCREEN_HEIGHT * 1.5,
  },
  map: {
    width: "100%",
    height: "100%",
  },
  zone: {
    position: "absolute",
    backgroundColor: "hsla(137, 60.50%, 52.40%, 0.74)",
    borderRadius: 50,
    padding: 10,
  },
  zoneIcon: {
    fontSize: 28,
  },
  soundBtn: {
    position: "absolute",
    top: hp(4),
    right: wp(6),
    backgroundColor: "rgba(0,0,0,0.4)",
    padding: 10,
    borderRadius: 20,
    zIndex: 10,
  },
  startBtn: {
    position: "absolute",
    bottom: hp(6),
    alignSelf: "center",
    backgroundColor: "#f57f17",
    paddingHorizontal: wp(10),
    paddingVertical: hp(1.8),
    borderRadius: 16,
    elevation: 4,
  },
});
