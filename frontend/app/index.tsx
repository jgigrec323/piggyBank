import React from "react";
import { Ionicons } from "@expo/vector-icons";

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { useRouter } from "expo-router";
import GameButton from "@/components/game-button";
import { hp } from "@/utils/responsive";
import { Colors } from "@/constants/Colors";

const WelcomeScreen = () => {
  const router = useRouter();

  return (
    <ImageBackground
      source={require("../assets/images/welcome.png")}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <View style={styles.centered}>
          <Text style={styles.title}>Welcome to Piggy Bank</Text>
          <Text style={styles.subtitle}>Choose your role to get started</Text>
        </View>

        <View style={styles.buttonContainer}>
          <GameButton
            title="I’m a Parent"
            icon={<Ionicons name="person" size={20} color="#fff" />}
            color={Colors.light.buttonParent}
            textColor="#fff"
            onPress={() => {
              router.push("/(auth)/(parent)/login");
            }}
          />

          <GameButton
            title="I’m a Child"
            icon={<Ionicons name="happy" size={20} color="#fff" />}
            color={Colors.light.buttonChild}
            onPress={() => {}}
          />
        </View>
      </View>
    </ImageBackground>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)", // dark overlay for contrast
    justifyContent: "space-between",
    paddingHorizontal: 24,
    paddingVertical: 50,
  },
  centered: {
    marginTop: 100,
    alignItems: "center",
  },
  title: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
  },
  subtitle: {
    color: "#eee",
    fontSize: 16,
    marginTop: 10,
    textAlign: "center",
  },
  buttonContainer: {
    width: "100%",
    gap: hp(1),
  },
  parentButton: {
    backgroundColor: "#2e86de",
    paddingVertical: 16,
    borderRadius: 10,
    marginBottom: 16,
  },
  childButton: {
    backgroundColor: "#45aaf2",
    paddingVertical: 16,
    borderRadius: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    textAlign: "center",
    fontSize: 16,
  },
});
