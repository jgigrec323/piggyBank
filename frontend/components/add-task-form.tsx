import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { hp, wp } from "@/utils/responsive";
import { useParent } from "@/context/parent-context";

type Props = {
  childId: string | null;
  onClose: () => void;
};

export default function AssignTaskForm({ childId, onClose }: Props) {
  const [title, setTitle] = useState("");
  const { addTask } = useParent();

  const handleSubmit = () => {
    if (!title.trim()) {
      Alert.alert("Enter a task", "Please type something meaningful.");
      return;
    }

    if (childId) {
      addTask(childId, {
        id: Date.now().toString(),
        title,
        completed: false,
      });
    }

    setTitle("");
    onClose();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📝 New Task</Text>

      <TextInput
        style={styles.input}
        placeholder="e.g. Clean your room"
        value={title}
        onChangeText={setTitle}
      />

      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.cancelBtn} onPress={onClose}>
          <Text style={styles.btnText}>Cancel</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.saveBtn} onPress={handleSubmit}>
          <Text style={styles.btnText}>Save Task</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fffaf2",
    paddingTop: hp(8),
    paddingHorizontal: wp(6),
  },
  title: {
    fontSize: hp(2.6),
    fontWeight: "700",
    color: "#333",
    marginBottom: hp(3),
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 12,
    padding: hp(1.6),
    fontSize: hp(2),
    backgroundColor: "#fff",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: hp(4),
  },
  cancelBtn: {
    flex: 0.45,
    backgroundColor: "#ccc",
    paddingVertical: hp(1.6),
    borderRadius: 12,
    alignItems: "center",
  },
  saveBtn: {
    flex: 0.45,
    backgroundColor: "#f57f17",
    paddingVertical: hp(1.6),
    borderRadius: 12,
    alignItems: "center",
  },
  btnText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: hp(2),
  },
});
