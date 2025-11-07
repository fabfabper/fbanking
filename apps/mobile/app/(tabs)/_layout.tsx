import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Tabs, useRouter, usePathname } from "expo-router";
import { Pressable } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { YStack, Button, useAppTheme } from "@ebanking/ui";
import { Home, Wallet, Send, Settings, Menu } from "lucide-react-native";
import { Drawer } from "../components/Drawer";
import { useDarkMode } from "../_layout";

export default function TabsLayout() {
  const { t } = useTranslation();
  const router = useRouter();
  const pathname = usePathname();
  const [drawerVisible, setDrawerVisible] = useState(false);
  const { theme } = useAppTheme();
  const { darkMode } = useDarkMode();

  const handleLogout = async () => {
    await AsyncStorage.removeItem("isAuthenticated");
    router.replace("/");
  };

  const handleNavigate = (screen: string) => {
    router.push(`/(tabs)/${screen}` as any);
  };

  const getCurrentScreen = () => {
    if (pathname.includes("dashboard")) return "dashboard";
    if (pathname.includes("accounts")) return "accounts";
    if (pathname.includes("payment")) return "payment";
    if (pathname.includes("settings")) return "settings";
    return "dashboard";
  };

  return (
    <>
      <Drawer
        visible={drawerVisible}
        onClose={() => setDrawerVisible(false)}
        onNavigate={handleNavigate}
        onLogout={handleLogout}
        currentScreen={getCurrentScreen()}
      />
      <Tabs
        screenOptions={{
          headerShown: true,
          headerStyle: {
            backgroundColor: theme.colors.primary,
          },
          headerTintColor: "#fff",
          tabBarActiveTintColor: theme.colors.primary,
          tabBarInactiveTintColor: darkMode ? "#94A3B8" : "#64748B",
          tabBarStyle: {
            backgroundColor: darkMode ? "#1E293B" : "#FFFFFF",
            borderTopColor: darkMode ? "#334155" : "#E2E8F0",
          },
          headerRight: () => (
            <Pressable
              onPress={() => setDrawerVisible(true)}
              style={{ marginRight: 16 }}
            >
              <Menu size={28} color="#fff" />
            </Pressable>
          ),
        }}
      >
        <Tabs.Screen
          name="dashboard"
          options={{
            title: t("nav.dashboard"),
            tabBarLabel: t("nav.dashboard"),
            tabBarIcon: ({ color, size }) => <Home size={size} color={color} />,
          }}
        />
        <Tabs.Screen
          name="accounts"
          options={{
            title: t("nav.accounts"),
            tabBarLabel: t("nav.accounts"),
            tabBarIcon: ({ color, size }) => (
              <Wallet size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="payment"
          options={{
            title: t("nav.payment"),
            tabBarLabel: t("nav.payment"),
            tabBarIcon: ({ color, size }) => <Send size={size} color={color} />,
          }}
        />
        <Tabs.Screen
          name="settings"
          options={{
            title: t("nav.settings"),
            tabBarLabel: t("nav.settings"),
            tabBarIcon: ({ color, size }) => (
              <Settings size={size} color={color} />
            ),
          }}
        />
      </Tabs>
    </>
  );
}
