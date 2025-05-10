import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";

const CustomTabBar = ({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) => {
  return (
    <View style={styles.tabBar}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];

        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const iconName = getIconName(route.name, isFocused);

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });
          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <TouchableOpacity
            key={route.name}
            onPress={onPress}
            style={styles.tab}
            activeOpacity={0.8}
          >
            <Ionicons
              name={iconName}
              size={22}
              color={isFocused ? "#f57f17" : "#aaa"}
            />
            <Text style={[styles.label, isFocused && styles.labelActive]}>
              {label as string}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default CustomTabBar;

const getIconName = (name: string, focused: boolean) => {
  switch (name) {
    case "index":
      return focused ? "home" : "home";
    case "tasks":
      return focused ? "list" : "list-outline";
    case "profile":
      return focused ? "person" : "person-outline";
    default:
      return "ellipse";
  }
};

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    elevation: 10,
    paddingVertical: 10,
    paddingHorizontal: 24,
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: -2 },
  },
  tab: {
    alignItems: "center",
    flex: 1,
  },
  label: {
    fontSize: 12,
    color: "#aaa",
    marginTop: 4,
  },
  labelActive: {
    color: "#f57f17",
    fontWeight: "600",
  },
});
