import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import GradientButton from "@/components/custom-gradient-button";

export default function ParentLoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Top Illustration */}
      <View style={styles.illustrationWrapper}>
        <Image
          source={require("../../../assets/images/login-parent.jpg")}
          style={styles.illustration}
          resizeMode="cover"
        />
      </View>

      {/* Login Card */}
      <View style={styles.loginCard}>
        <Text style={styles.loginTitle}>Login</Text>

        {/* Email Input */}
        <View style={styles.inputWrapper}>
          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            placeholderTextColor="#aaa"
            style={styles.input}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          {email.length > 2 && (
            <Ionicons name="checkmark-circle" size={20} color="#4caf50" />
          )}
        </View>

        {/* Password Input */}
        <View style={styles.inputWrapper}>
          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            placeholderTextColor="#aaa"
            style={styles.input}
            secureTextEntry={!showPassword}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Ionicons
              name={showPassword ? "eye-off" : "eye"}
              size={20}
              color="#999"
            />
          </TouchableOpacity>
        </View>

        {/* Login Button */}
        <GradientButton
          title="Sign In"
          style={{ width: "100%", marginTop: 20 }}
          onPress={() => {
            router.push("/");
          }}
        />

        {/* Redirect to Register */}
        <View style={styles.registerWrapper}>
          <Text style={styles.registerText}>{`Don't have an account?`}</Text>
          <TouchableOpacity onPress={() => router.push("/register")}>
            <Text style={styles.registerLink}> Register</Text>
          </TouchableOpacity>
        </View>

        {/* Bottom Platform Icons */}
        <View style={styles.footerIcons}>
          <Ionicons name="logo-android" size={20} color="#888" />
          <Ionicons name="logo-apple" size={20} color="#888" />
          <Ionicons name="globe-outline" size={20} color="#888" />
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  illustrationWrapper: {
    flex: 1.3,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff4e5",
  },
  illustration: {
    width: "100%",
    height: "100%",
  },
  loginCard: {
    flex: 2,
    backgroundColor: "#fff",
    marginTop: -50,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    padding: 24,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 10,
  },
  loginTitle: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 24,
    color: "#333",
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1.5,
    borderColor: "#ddd",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 16,
    width: "100%",
    backgroundColor: "#f9f9f9",
    justifyContent: "space-between",
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#333",
  },
  registerWrapper: {
    flexDirection: "row",
    marginTop: 16,
  },
  registerText: {
    color: "#777",
    fontSize: 14,
  },
  registerLink: {
    color: "#f57f17",
    fontWeight: "600",
    fontSize: 14,
  },
  footerIcons: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: 30,
    width: "50%",
  },
});
