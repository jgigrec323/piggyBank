import React, { useState, useMemo } from "react";
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
import { useApp } from "@/context/app-context";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

const gameZones = [
  {
    top: 200,
    left: 100,
    icon: require("../../../../data/controller.json"),
    route: "/game-one",
  },
  {
    top: 300,
    left: 200,
    icon: require("../../../../data/controller.json"),
    route: "/game-two",
  },
  {
    top: 400,
    left: 80,
    icon: require("../../../../data/controller.json"),
    route: "/game-three",
  },
  {
    top: 180,
    left: 350,
    icon: require("../../../../data/controller.json"),
    route: "/",
  },
  {
    top: 500,
    left: 250,
    icon: require("../../../../data/controller.json"),
    route: "/game-ten",
  },
];

export default function LandingPage() {
  const [soundOn, setSoundOn] = useState(true);
  const router = useRouter();
  const { hasBankAccount, moneyInPocket } = useApp();

  const shuffledZones = useMemo(
    () => [...gameZones].sort(() => Math.random() - 0.5),
    []
  );

  return (
    <View style={styles.container}>
      {/* 💰 Wallet Box */}
      <View style={styles.coinsBox}>
        <Ionicons name="wallet" size={18} color="#fff" />
        <Text style={styles.coinsText}>{moneyInPocket} coins</Text>
      </View>

      {/* 🗺 Map Scroll */}
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
            {/* 📽️ MAP GIF */}
            <Image
              source={require("../../../../assets/images/map.gif")}
              style={styles.map}
              resizeMode="cover"
            />

            {/* 🏦 Bank Zone */}
            <TouchableOpacity
              style={[styles.zone, { top: 100, left: 60 }]}
              onPress={() =>
                router.push(hasBankAccount ? "/stage-two" : "/stage-one")
              }
            >
              <LottieView
                source={require("../../../../data/home.json")}
                autoPlay
                loop
                style={{ width: 50, height: 50 }}
              />
            </TouchableOpacity>

            {/* 🎮 Game Zones — only if bank exists */}
            {hasBankAccount &&
              shuffledZones.map((zone, index) => (
                <TouchableOpacity
                  key={index}
                  style={[styles.zone, { top: zone.top, left: zone.left }]}
                  onPress={() => router.push(zone.route)}
                >
                  <LottieView
                    source={zone.icon}
                    autoPlay
                    loop
                    style={{ width: 50, height: 50 }}
                  />
                </TouchableOpacity>
              ))}
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

      {/* 🚀 Start Button (optional) */}
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
  coinsBox: {
    position: "absolute",
    top: hp(4),
    left: wp(5),
    backgroundColor: "rgba(0,0,0,0.6)",
    paddingVertical: hp(0.7),
    paddingHorizontal: wp(3),
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    gap: wp(1.5),
    zIndex: 20,
  },
  coinsText: {
    color: "#fff",
    fontSize: hp(1.8),
    fontWeight: "600",
  },
});
