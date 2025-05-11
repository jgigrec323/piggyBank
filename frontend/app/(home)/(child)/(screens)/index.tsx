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

const ZONES = [
  {
    top: 200,
    left: 100,
    icon: require("../../../../data/controller.json"),
    route: "/game-one",
    type: "game",
  },
  {
    top: 300,
    left: 200,
    icon: require("../../../../data/controller.json"),
    route: "/game-two",
    type: "game",
  },
  {
    top: 400,
    left: 80,
    icon: require("../../../../data/controller.json"),
    route: "/game-three",
    type: "game",
  },
  {
    top: 500,
    left: 250,
    icon: require("../../../../data/controller.json"),
    route: "/game-ten",
    type: "game",
  },
  {
    top: 180,
    left: 350,
    icon: require("../../../../data/task.json"),
    route: "/my-tasks",
    type: "always",
  },
  {
    top: 600,
    left: 100,
    icon: require("../../../../data/vault.json"),
    route: "/shop",
    type: "always",
  },
];

export default function LandingPage() {
  const [soundOn, setSoundOn] = useState(true);
  const router = useRouter();
  const { hasBankAccount, moneyInPocket } = useApp();

  const alwaysZones = ZONES.filter((z) => z.type === "always");
  const gameZones = useMemo(
    () =>
      ZONES.filter((z) => z.type === "game").sort(() => Math.random() - 0.5),
    []
  );

  return (
    <View style={styles.container}>
      {/* 💰 Coins Display */}
      <View style={styles.coinsBox}>
        <Ionicons name="wallet" size={18} color="#fff" />
        <Text style={styles.coinsText}>{moneyInPocket} coins</Text>
      </View>

      {/* 🔊 Sound Toggle */}
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

      {/* 🗺 Map */}
      <ScrollView horizontal contentContainerStyle={styles.scrollContent}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View>
            {/* 🖼 Map Image */}
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

            {/* ✅ Always Available Zones */}
            {alwaysZones.map((zone, index) => (
              <TouchableOpacity
                key={`always-${index}`}
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

            {/* 🎮 Conditional Game Zones */}
            {hasBankAccount &&
              gameZones.map((zone, index) => (
                <TouchableOpacity
                  key={`game-${index}`}
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

      {/* 🧠 Tutorial Tip for Banking */}
      {!hasBankAccount && (
        <View style={styles.tipBox}>
          <Ionicons name="alert-circle-outline" size={18} color="#f57f17" />
          <Text style={styles.tipText}>
            Tip: Open your bank account to unlock games and start your
            adventure!
          </Text>
        </View>
      )}
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
  soundBtn: {
    position: "absolute",
    top: hp(4),
    right: wp(6),
    backgroundColor: "rgba(0,0,0,0.4)",
    padding: 10,
    borderRadius: 20,
    zIndex: 10,
  },
  tipBox: {
    position: "absolute",
    bottom: hp(4),
    left: wp(5),
    right: wp(5),
    backgroundColor: "rgb(255, 255, 255)",
    borderRadius: 12,
    padding: hp(1.5),
    flexDirection: "row",
    alignItems: "center",
    gap: wp(2),
    borderColor: "#f57f17",
    borderWidth: 1,
  },
  tipText: {
    color: "#f57f17",
    fontSize: hp(1.7),
    flex: 1,
    fontWeight: "500",
  },
});
