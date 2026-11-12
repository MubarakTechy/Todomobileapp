
import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router, usePathname } from "expo-router";

const tabs = [
  { label: "Home", route: "/", icon: "home-outline", active: "home" },
  { label: "Tasks", route: "/tasks", icon: "checkbox-outline", active: "checkbox" },
  { label: "Calendar", route: "/calendar", icon: "calendar-outline", active: "calendar" },
  { label: "Settings", route: "/settings", icon: "settings-outline", active: "settings" },
] as const;

export default function AppTabs() {
  const pathname = usePathname();

  return (
    <View style={styles.bar}>
      {tabs.map((tab) => {
        const selected = pathname === tab.route || (tab.route === "/" && pathname === "/index");

        return (
          <Pressable
            key={tab.label}
            onPress={() => router.navigate(tab.route as any)}
            style={styles.item}
          >
            <View style={[styles.iconBox, selected && styles.selectedBox]}>
              <Ionicons
                name={selected ? tab.active : tab.icon}
                size={23}
                color={selected ? "#7556D8" : "#A7A1B7"}
              />
            </View>
            <Text style={[styles.label, selected && styles.selectedLabel]}>
              {tab.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    height: 72,
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#F0EDFA",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    paddingBottom: 5,
    elevation: 12,
  },
  item: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 3,
  },
  iconBox: {
    width: 43,
    height: 34,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  selectedBox: {
    backgroundColor: "#F0EBFF",
  },
  label: {
    fontSize: 10,
    color: "#A7A1B7",
    fontWeight: "500",
  },
  selectedLabel: {
    color: "#7556D8",
    fontWeight: "700",
  },
});
