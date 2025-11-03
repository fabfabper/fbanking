import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type Screen = "dashboard" | "accounts" | "payments";

interface TabNavigationProps {
  currentScreen: Screen;
  onNavigate: (screen: Screen) => void;
}

export const TabNavigation: React.FC<TabNavigationProps> = ({
  currentScreen,
  onNavigate,
}) => {
  const iconColor = (screen: Screen) =>
    currentScreen === screen ? "#4A9FE8" : "#64748B";

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.tab, currentScreen === "dashboard" && styles.tabActive]}
        onPress={() => onNavigate("dashboard")}
      >
        <Ionicons
          name="grid-outline"
          size={24}
          color={iconColor("dashboard")}
        />
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.tab, currentScreen === "accounts" && styles.tabActive]}
        onPress={() => onNavigate("accounts")}
      >
        <Ionicons name="card-outline" size={24} color={iconColor("accounts")} />
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.tab, currentScreen === "payments" && styles.tabActive]}
        onPress={() => onNavigate("payments")}
      >
        <Ionicons
          name="swap-horizontal-outline"
          size={24}
          color={iconColor("payments")}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "white",
    borderTopWidth: 1,
    borderTopColor: "#E2E8F0",
    paddingBottom: 8,
  },
  tab: {
    flex: 1,
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  tabActive: {
    borderTopWidth: 2,
    borderTopColor: "#4A9FE8",
  },
});

export default TabNavigation;
