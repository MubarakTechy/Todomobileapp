
import React from "react";
import { View, Text, Pressable, StyleSheet, StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

export default function TaskDetailsScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FAF9FF" />

      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={23} color="#302B43" />
        </Pressable>
        <Text style={styles.headerTitle}>Task Details</Text>
        <View style={{ width: 42 }} />
      </View>

      <View style={styles.content}>
        <View style={styles.iconCircle}>
          <Ionicons name="checkbox-outline" size={36} color="#7556D8" />
        </View>

        <Text style={styles.title}>Your task details</Text>
        <Text style={styles.description}>
          Select a task from your task list to view its details here.
        </Text>

        <Pressable style={styles.button} onPress={() => router.back()}>
          <Text style={styles.buttonText}>Go Back</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FAF9FF" },
  header: {
    flexDirection: "row", alignItems: "center", justifyContent: "space-between",
    paddingHorizontal: 20, paddingVertical: 12,
  },
  backButton: {
    width: 42, height: 42, borderRadius: 14, backgroundColor: "#FFFFFF",
    alignItems: "center", justifyContent: "center",
  },
  headerTitle: { fontSize: 17, fontWeight: "700", color: "#211D35" },
  content: { flex: 1, alignItems: "center", justifyContent: "center", padding: 30 },
  iconCircle: {
    width: 80, height: 80, borderRadius: 26, backgroundColor: "#F0EBFF",
    alignItems: "center", justifyContent: "center", marginBottom: 22,
  },
  title: { fontSize: 22, fontWeight: "800", color: "#211D35" },
  description: {
    color: "#9691A8", fontSize: 14, textAlign: "center",
    lineHeight: 22, marginTop: 10,
  },
  button: {
    backgroundColor: "#7556D8", paddingHorizontal: 30, paddingVertical: 14,
    borderRadius: 14, marginTop: 25,
  },
  buttonText: { color: "#FFFFFF", fontSize: 14, fontWeight: "700" },
});
