import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { hp, wp } from "@/utils/responsive";

export default function WelcomeScreen() {
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
          <TouchableOpacity
            style={[styles.button, styles.parentButton]}
            onPress={() => router.push("/(auth)/(parent)/login")}
          >
            <Ionicons name="person" size={20} color="#fff" />
            <Text style={styles.buttonText}>I’m a Parent</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.childButton]}
            onPress={() => router.push("/(auth)/(child)/login")}
          >
            <Ionicons name="happy" size={20} color="#fff" />
            <Text style={styles.buttonText}>I’m a Child</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "space-between",
    paddingHorizontal: wp(6),
    paddingVertical: hp(6),
  },
  centered: {
    marginTop: hp(10),
    alignItems: "center",
  },
  title: {
    color: "#fff",
    fontSize: hp(3.2),
    fontWeight: "700",
    textAlign: "center",
  },
  subtitle: {
    color: "#ddd",
    fontSize: hp(1.8),
    marginTop: hp(1),
    textAlign: "center",
  },
  buttonContainer: {
    gap: hp(2),
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: hp(2),
    borderRadius: 12,
  },
  parentButton: {
    backgroundColor: "#2e86de",
  },
  childButton: {
    backgroundColor: "#45aaf2",
  },
  buttonText: {
    color: "#fff",
    fontSize: hp(2),
    fontWeight: "600",
    marginLeft: wp(2),
  },
});
