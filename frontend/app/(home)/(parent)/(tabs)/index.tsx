import React, { useState } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  SafeAreaView,
  Text,
  TouchableOpacity,
  Modal,
} from "react-native";

import Header from "@/components/header";
import SummaryBanner from "@/components/summary-banner";
import ChildTaskCard from "@/components/childTaskCard";
import TipOfTheDay from "@/components/tip-of-the-day";
import { useParent } from "@/context/parent-context";
import { hp, wp } from "@/utils/responsive";
import AddChildForm from "@/components/add-child-form";

export default function ParentHomeScreen() {
  const { children } = useParent();
  const [modalVisible, setModalVisible] = useState(false);

  const totalTasks = children.reduce(
    (sum, child) => sum + child.tasks.length,
    0
  );
  const completedTasks = children.reduce(
    (sum, child) => sum + child.tasks.filter((t) => t.completed).length,
    0
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        ListHeaderComponent={
          <>
            <Header />
            <SummaryBanner
              totalChildren={children.length}
              totalTasks={totalTasks}
              completedTasks={completedTasks}
            />
          </>
        }
        data={children}
        numColumns={2}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ChildTaskCard
            id={item.id}
            name={item.name}
            avatar={item.avatar}
            total={item.tasks.length}
            done={item.tasks.filter((t) => t.completed).length}
            color={item.themeColor}
          />
        )}
        ListEmptyComponent={
          <View style={styles.emptyBox}>
            <Text style={styles.emptyText}>No children added yet.</Text>
            <TouchableOpacity
              onPress={() => setModalVisible(true)}
              style={styles.addBtn}
            >
              <Text style={styles.addText}>+ Add a Child</Text>
            </TouchableOpacity>
          </View>
        }
        ListFooterComponent={<TipOfTheDay />}
        contentContainerStyle={styles.grid}
        showsVerticalScrollIndicator={false}
      />

      {/* Add Child Modal */}
      <Modal visible={modalVisible} animationType="slide">
        <AddChildForm onClose={() => setModalVisible(false)} />
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f7f7f7",
  },
  grid: {
    paddingBottom: 40,
    paddingHorizontal: 12,
  },
  emptyBox: {
    alignItems: "center",
    marginTop: hp(10),
  },
  emptyText: {
    fontSize: hp(2),
    color: "#666",
    marginBottom: hp(2),
  },
  addBtn: {
    backgroundColor: "#f57f17",
    paddingVertical: hp(1.6),
    paddingHorizontal: wp(10),
    borderRadius: 12,
  },
  addText: {
    color: "#fff",
    fontSize: hp(2),
    fontWeight: "600",
  },
});
