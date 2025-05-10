import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

import { useRouter } from "expo-router";
import ProfileOption from "@/components/profile-option";
import FakeCard from "@/components/fake-card";

export default function ProfileScreen() {
  const router = useRouter();

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.header}>Your Profile</Text>

      <FakeCard name="Mr. Parent" balance={250} />

      <ProfileOption
        icon="people-outline"
        label="Manage Children"
        onPress={() => router.push("/")}
      />
      <ProfileOption
        icon="document-text-outline"
        label="Task History"
        onPress={() => {}}
      />
      <ProfileOption
        icon="wallet-outline"
        label="Set Coin Value"
        onPress={() => {}}
      />
      <ProfileOption
        icon="person-outline"
        label="Edit Profile"
        onPress={() => {}}
      />
      <ProfileOption
        icon="log-out-outline"
        label="Logout"
        onPress={() => {
          // logout logic here
        }}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f7f7f7",
    paddingTop: 40,
  },
  content: {
    padding: 20,
  },
  header: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 20,
    color: "#333",
  },
});
