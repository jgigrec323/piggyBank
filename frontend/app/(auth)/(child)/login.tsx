import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
  Dimensions,
} from "react-native";
import { useRouter } from "expo-router";
import { hp, wp } from "@/utils/responsive";

export default function ChildLoginScreen() {
  const [pin, setPin] = useState("");
  const router = useRouter();

  const handleLogin = () => {
    if (pin === "1234") {
      router.push("/(home)/(child)/(screens)");
    } else {
      Alert.alert("Oops!", "Incorrect PIN. Try again.");
    }
  };

  return (
    <View style={styles.container}>
      {/* 🖼 Full-width top image */}
      <Image
        source={require("../../../assets/images/login-parent.jpg")} // use a colorful, fun image
        style={styles.image}
        resizeMode="cover"
      />

      <View style={styles.card}>
        <Text style={styles.title}>Hey there 👋</Text>
        <Text style={styles.subtitle}>Enter your 4-digit magic code </Text>

        {/* PIN input */}
        <TextInput
          style={styles.input}
          value={pin}
          onChangeText={setPin}
          keyboardType="number-pad"
          maxLength={4}
          placeholder="1234"
          placeholderTextColor="#ccc"
        />

        {/* Login button */}
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Let’s Go 🚀</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fffced",
  },
  image: {
    width: width,
    height: hp(35),
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },
  card: {
    flex: 1,
    paddingHorizontal: wp(8),
    paddingTop: hp(4),
    alignItems: "center",
  },
  title: {
    fontSize: hp(3),
    fontWeight: "700",
    marginBottom: hp(1),
    color: "#333",
  },
  subtitle: {
    fontSize: hp(2),
    color: "#888",
    marginBottom: hp(3),
  },
  input: {
    fontSize: hp(3.2),
    textAlign: "center",
    width: wp(50),
    borderBottomWidth: 2,
    borderColor: "#f57f17",
    paddingVertical: hp(1),
    marginBottom: hp(4),
    color: "#222",
  },
  button: {
    backgroundColor: "#f57f17",
    paddingVertical: hp(1.8),
    paddingHorizontal: wp(20),
    borderRadius: 14,
  },
  buttonText: {
    color: "#fff",
    fontSize: hp(2.2),
    fontWeight: "600",
  },
});
