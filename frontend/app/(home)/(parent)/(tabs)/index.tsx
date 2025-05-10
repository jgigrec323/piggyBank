import React from "react";
import { View, FlatList, StyleSheet, SafeAreaView } from "react-native";

import children from "@/data/children.json";
import Header from "@/components/header";
import SummaryBanner from "@/components/summary-banner";
import ChildTaskCard from "@/components/childTaskCard";
import TipOfTheDay from "@/components/tip-of-the-day";

export default function ParentHomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        ListHeaderComponent={
          <>
            <Header />
            <SummaryBanner />
          </>
        }
        data={children}
        numColumns={2}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ChildTaskCard
            name={item.name}
            avatar={item.avatar}
            total={item.tasksTotal}
            done={item.tasksDone}
            color={item.themeColor}
          />
        )}
        ListFooterComponent={<TipOfTheDay />}
        contentContainerStyle={styles.grid}
        showsVerticalScrollIndicator={false}
      />
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
});
