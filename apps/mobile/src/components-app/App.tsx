import React, { useState, useEffect } from "react";
import { SafeAreaView, StyleSheet, StatusBar, View } from "react-native";
import { UIProvider } from "@ebanking/ui";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import LoginScreen from "./screens/LoginScreen";
import DashboardScreen from "./screens/DashboardScreen";
import AccountsScreen from "./screens/AccountsScreen";
import PaymentScreen from "./screens/PaymentScreen";
import SettingsScreen from "./screens/SettingsScreen";
import TabNavigation from "./components/TabNavigation";
import {
  registerForPushNotifications,
  setupNotificationHandlers,
} from "./services/notificationService";
import "../../global.css";

type Screen = "dashboard" | "accounts" | "payments" | "settings";

const AppContent = () => {
  const { isAuthenticated } = useAuth();
  const [currentScreen, setCurrentScreen] = useState<Screen>("dashboard");

  if (!isAuthenticated) {
    return <LoginScreen />;
  }

  const renderScreen = () => {
    switch (currentScreen) {
      case "dashboard":
        return <DashboardScreen onNavigate={setCurrentScreen} />;
      case "accounts":
        return <AccountsScreen onNavigate={setCurrentScreen} />;
      case "payments":
        return <PaymentScreen onNavigate={setCurrentScreen} />;
      case "settings":
        return <SettingsScreen onNavigate={setCurrentScreen} />;
      default:
        return <DashboardScreen onNavigate={setCurrentScreen} />;
    }
  };

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <View style={styles.container}>
        <SafeAreaView style={styles.content}>{renderScreen()}</SafeAreaView>
        {currentScreen !== "settings" && (
          <TabNavigation
            currentScreen={
              currentScreen as "dashboard" | "accounts" | "payments"
            }
            onNavigate={setCurrentScreen}
          />
        )}
      </View>
    </>
  );
};

export const App = () => {
  useEffect(() => {
    // Register for push notifications on app startup
    const initNotifications = async () => {
      setupNotificationHandlers();
      await registerForPushNotifications();
    };

    initNotifications();
  }, []);

  return (
    <UIProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </UIProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
  content: {
    flex: 1,
  },
});

export default App;
