
import React from "react";
import {
  View,
  Text,
  Pressable,
  ScrollView,
  StyleSheet,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

export default function SettingsScreen() {
  const settings = [
    { title: "Account", subtitle: "Manage your personal information", icon: "person-outline" as const },
    { title: "Notifications", subtitle: "Manage reminders and alerts", icon: "notifications-outline" as const },
    { title: "Appearance", subtitle: "Customize your app experience", icon: "color-palette-outline" as const },
    { title: "Privacy & Security", subtitle: "Manage your privacy settings", icon: "shield-checkmark-outline" as const },
    { title: "Help & Support", subtitle: "Get help with TaskNest", icon: "help-circle-outline" as const },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FAF9FF" />

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.heading}>Settings</Text>
        <Text style={styles.subheading}>Manage your app preferences</Text>

        <View style={styles.profile}>
          <View style={styles.avatar}>
            <Ionicons name="person" size={30} color="#7556D8" />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.profileName}>Alex Morgan</Text>
            <Text style={styles.profileEmail}>Welcome to TaskNest</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#A7A1B7" />
        </View>

        <Text style={styles.sectionTitle}>PREFERENCES</Text>

        {settings.map((item) => (
          <Pressable key={item.title} style={styles.settingRow}>
            <View style={styles.settingIcon}>
              <Ionicons name={item.icon} size={21} color="#7556D8" />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.settingTitle}>{item.title}</Text>
              <Text style={styles.settingSubtitle}>{item.subtitle}</Text>
            </View>
            <Ionicons name="chevron-forward" size={19} color="#A7A1B7" />
          </Pressable>
        ))}

        <Pressable style={styles.logout} onPress={() => router.replace("/")}>
          <Ionicons name="log-out-outline" size={21} color="#E05A68" />
          <Text style={styles.logoutText}>Log out</Text>
        </Pressable>

        <Text style={styles.version}>TaskNest · Version 1.0.0</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FAF9FF" },
  content: { padding: 22, paddingBottom: 30 },
  heading: { fontSize: 29, fontWeight: "800", color: "#211D35" },
  subheading: { fontSize: 14, color: "#9691A8", marginTop: 6, marginBottom: 24 },
  profile: {
    backgroundColor: "#FFFFFF", borderRadius: 18, padding: 16,
    flexDirection: "row", alignItems: "center", marginBottom: 30,
  },
  avatar: {
    width: 54, height: 54, borderRadius: 18, backgroundColor: "#F0EBFF",
    alignItems: "center", justifyContent: "center", marginRight: 13,
  },
  profileName: { fontSize: 16, fontWeight: "700", color: "#211D35" },
  profileEmail: { fontSize: 12, color: "#9691A8", marginTop: 4 },
  sectionTitle: { fontSize: 11, fontWeight: "700", color: "#9691A8", letterSpacing: 1, marginBottom: 12 },
  settingRow: {
    backgroundColor: "#FFFFFF", borderRadius: 16, padding: 14,
    flexDirection: "row", alignItems: "center", marginBottom: 10,
  },
  settingIcon: {
    width: 42, height: 42, borderRadius: 13, backgroundColor: "#F4F0FF",
    alignItems: "center", justifyContent: "center", marginRight: 12,
  },
  settingTitle: { fontSize: 14, fontWeight: "700", color: "#302B43" },
  settingSubtitle: { fontSize: 11, color: "#9691A8", marginTop: 4 },
  logout: {
    flexDirection: "row", alignItems: "center", justifyContent: "center",
    backgroundColor: "#FFF0F1", padding: 15, borderRadius: 15, marginTop: 20,
  },
  logoutText: { color: "#E05A68", fontSize: 14, fontWeight: "700", marginLeft: 8 },
  version: { textAlign: "center", color: "#AAA5B8", fontSize: 11, marginTop: 25 },
});
