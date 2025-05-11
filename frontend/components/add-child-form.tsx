import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";
import { useParent } from "@/context/parent-context";
import { hp, wp } from "@/utils/responsive";

export default function AddChildForm({ onClose }: { onClose: () => void }) {
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("👦");
  const [themeColor, setThemeColor] = useState("#ffcc80");

  const { addChild } = useParent();

  const handleSubmit = () => {
    if (!name.trim()) {
      Alert.alert("Name is required");
      return;
    }

    addChild({ name, avatar, themeColor });
    Alert.alert("Child Added!");
    onClose();
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>👶 Add a New Child</Text>

      <TextInput
        placeholder="Child's Name"
        style={styles.input}
        value={name}
        onChangeText={setName}
      />

      <TextInput
        placeholder="Emoji Avatar (e.g. 👧)"
        style={styles.input}
        value={avatar}
        onChangeText={setAvatar}
        maxLength={2}
      />

      <TextInput
        placeholder="Theme Color (hex)"
        style={styles.input}
        value={themeColor}
        onChangeText={setThemeColor}
      />

      <TouchableOpacity style={styles.btn} onPress={handleSubmit}>
        <Text style={styles.btnText}>Add Child</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.cancelBtn} onPress={onClose}>
        <Text style={styles.cancelText}>Cancel</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: wp(6),
    backgroundColor: "#fff",
    flexGrow: 1,
    justifyContent: "center",
  },
  title: {
    fontSize: hp(2.4),
    fontWeight: "700",
    marginBottom: hp(3),
    textAlign: "center",
  },
  input: {
    backgroundColor: "#f0f0f0",
    padding: hp(1.6),
    borderRadius: 12,
    fontSize: hp(2),
    marginBottom: hp(2),
  },
  btn: {
    backgroundColor: "#4caf50",
    paddingVertical: hp(1.6),
    borderRadius: 12,
    alignItems: "center",
    marginBottom: hp(1),
  },
  btnText: {
    color: "#fff",
    fontSize: hp(2),
    fontWeight: "600",
  },
  cancelBtn: {
    alignItems: "center",
    marginTop: hp(1),
  },
  cancelText: {
    fontSize: hp(1.8),
    color: "#f57f17",
  },
});
