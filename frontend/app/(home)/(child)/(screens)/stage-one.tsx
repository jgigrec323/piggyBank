import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import { hp, wp } from "@/utils/responsive";
import { useApp } from "@/context/app-context";

export default function Stage1CreateBank() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const { setHasBankAccount } = useApp();

  const handleSubmit = () => {
    if (!name.trim() || !password.trim()) {
      Alert.alert("Oops!", "Please fill in all fields.");
      return;
    }

    Alert.alert("🎉 Success", `Bank account created for ${name}`);
    setHasBankAccount(true); // ✅ Mark bank account as created

    router.push("/stage-two"); // Replace with your map or stage route
  };

  return (
    <View style={styles.container}>
      <Text style={styles.emoji}>🏦</Text>
      <Text style={styles.title}>Create Your Bank Account</Text>

      <TextInput
        placeholder="Full Name"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />

      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        keyboardType="number-pad"
        secureTextEntry
        style={styles.input}
        maxLength={4} // optional 4-digit PIN
      />

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Create Bank Account</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: hp(12),
    paddingHorizontal: wp(6),
    backgroundColor: "#fef9f4",
    alignItems: "center",
  },
  emoji: {
    fontSize: hp(6),
    marginBottom: hp(2),
  },
  title: {
    fontSize: hp(2.8),
    fontWeight: "700",
    marginBottom: hp(4),
    color: "#333",
  },
  input: {
    width: "100%",
    backgroundColor: "#fff",
    padding: hp(1.4),
    fontSize: hp(2),
    borderRadius: 12,
    borderColor: "#ccc",
    borderWidth: 1.2,
    marginBottom: hp(2),
  },
  button: {
    backgroundColor: "#f57f17",
    paddingVertical: hp(2),
    borderRadius: 12,
    width: "100%",
    alignItems: "center",
    marginTop: hp(1),
  },
  buttonText: {
    color: "#fff",
    fontSize: hp(2),
    fontWeight: "600",
  },
});
