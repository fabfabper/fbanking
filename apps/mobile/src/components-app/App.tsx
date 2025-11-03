import React, { useState } from "react";
import { SafeAreaView, StyleSheet, StatusBar, View } from "react-native";
import { I18nextProvider } from "react-i18next";
import { i18n } from "@fbanking/i18n";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import LoginScreen from "./screens/LoginScreen";
import DashboardScreen from "./screens/DashboardScreen";
import AccountsScreen from "./screens/AccountsScreen";
import PaymentScreen from "./screens/PaymentScreen";
import TabNavigation from "./components/TabNavigation";
import "../../global.css";

type Screen = "dashboard" | "accounts" | "payments";

const AppContent = () => {
  const { isAuthenticated } = useAuth();
  const [currentScreen, setCurrentScreen] = useState<Screen>("dashboard");

  if (!isAuthenticated) {
    return <LoginScreen />;
  }

  const renderScreen = () => {
    switch (currentScreen) {
      case "dashboard":
        return <DashboardScreen />;
      case "accounts":
        return <AccountsScreen />;
      case "payments":
        return <PaymentScreen />;
      default:
        return <DashboardScreen />;
    }
  };

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <View style={styles.container}>
        <SafeAreaView style={styles.content}>{renderScreen()}</SafeAreaView>
        <TabNavigation
          currentScreen={currentScreen}
          onNavigate={setCurrentScreen}
        />
      </View>
    </>
  );
};

export const App = () => {
  return (
    <I18nextProvider i18n={i18n}>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </I18nextProvider>
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
