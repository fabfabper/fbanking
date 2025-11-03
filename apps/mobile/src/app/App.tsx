import React from "react";
import { SafeAreaView, StyleSheet, StatusBar } from "react-native";
import { I18nextProvider } from "react-i18next";
import { i18n } from "@fbanking/i18n";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import LoginScreen from "./screens/LoginScreen";
import DashboardScreen from "./screens/DashboardScreen";

const AppContent = () => {
  const { isAuthenticated } = useAuth();

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.container}>
        {isAuthenticated ? <DashboardScreen /> : <LoginScreen />}
      </SafeAreaView>
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
});

export default App;
