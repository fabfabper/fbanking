import React from "react";
import { Tabs, useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { YStack, Button } from "@ebanking/ui";
import { Ionicons } from "@expo/vector-icons";

export default function TabsLayout() {
  const router = useRouter();

  const handleLogout = async () => {
    await AsyncStorage.removeItem("isAuthenticated");
    router.replace("/");
  };

  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: "#2563EB",
        },
        headerTintColor: "#fff",
        tabBarActiveTintColor: "#2563EB",
      }}
    >
      <Tabs.Screen
        name="dashboard"
        options={{
          title: "Dashboard",
          tabBarLabel: "Dashboard",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="accounts"
        options={{
          title: "Accounts",
          tabBarLabel: "Accounts",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="wallet" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="payment"
        options={{
          title: "Payment",
          tabBarLabel: "Payment",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="send" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
