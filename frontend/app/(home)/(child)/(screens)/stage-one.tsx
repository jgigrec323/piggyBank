import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import { hp, wp } from "@/utils/responsive";

export default function Stage1Account() {
  const [name, setName] = useState("");
  const [goal, setGoal] = useState("");
  const router = useRouter();

  const handleSubmit = () => {
    if (!name.trim() || !goal.trim()) {
      Alert.alert("Oops!", "Please fill out both fields.");
      return;
    }

    // Save to local storage or async storage if needed later

    Alert.alert("🎉 Welcome!", `Hello ${name}, your goal is set!`);
    router.push("/"); // or next stage
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🏦 Open Your Piggy Bank</Text>
      <Text style={styles.subtitle}>
        Let’s create your very own bank account.
      </Text>

      <TextInput
        placeholder="Your Name"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />

      <TextInput
        placeholder="What are you saving for?"
        value={goal}
        onChangeText={setGoal}
        style={styles.input}
      />

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Create Account</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: wp(6),
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: hp(3),
    fontWeight: "700",
    textAlign: "center",
    marginBottom: hp(2),
  },
  subtitle: {
    fontSize: hp(2),
    textAlign: "center",
    marginBottom: hp(4),
  },
  input: {
    borderWidth: 1.5,
    borderColor: "#ccc",
    borderRadius: 12,
    padding: hp(1.2),
    fontSize: hp(2),
    marginBottom: hp(2),
  },
  button: {
    backgroundColor: "#f57f17",
    paddingVertical: hp(2),
    borderRadius: 14,
    alignItems: "center",
    marginTop: hp(1),
  },
  buttonText: {
    color: "#fff",
    fontSize: hp(2.2),
    fontWeight: "600",
  },
});
