import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Routes, Route, Navigate, useNavigate, useLocation } from "react-router-dom";
import { YStack, XStack, Text, Button, useAppTheme } from "@ebanking/ui";
import { IoSettings } from "react-icons/io5";
import {
  LoginScreen,
  DashboardScreen,
  AccountsScreen,
  PaymentScreen,
  SettingsScreen,
} from "@ebanking/screens";

const Navigation: React.FC<{ onLogout: () => void }> = ({ onLogout }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const { theme } = useAppTheme();

  const getNavButtonStyle = (path: string) => ({
    borderColor: theme.colors.textWhite,
    color: location.pathname === path ? theme.colors.primary : theme.colors.textWhite,
    backgroundColor: location.pathname === path ? theme.colors.textWhite : "transparent",
    transition: "all 0.2s ease",
  });

  return (
    <XStack
      backgroundColor={theme.colors.primary}
      padding="$4"
      paddingVertical="$3"
      gap="$3"
      alignItems="center"
    >
      <Text
        size="xl"
        weight="bold"
        style={{ color: theme.colors.textWhite }}
      >
        {t('auth.title')}
      </Text>
      <XStack flex={1} justifyContent="center" gap="$3">
        <Button
          variant="outline"
          size="sm"
          onPress={() => navigate("/dashboard")}
          style={getNavButtonStyle("/dashboard")}
          className="nav-button"
        >
          {t('nav.dashboard')}
        </Button>
        <Button
          variant="outline"
          size="sm"
          onPress={() => navigate("/accounts")}
          style={getNavButtonStyle("/accounts")}
          className="nav-button"
        >
          {t('nav.accounts')}
        </Button>
        <Button
          variant="outline"
          size="sm"
          onPress={() => navigate("/payment")}
          style={getNavButtonStyle("/payment")}
          className="nav-button"
        >
          {t('nav.payment')}
        </Button>
      </XStack>
      <Button
        variant="outline"
        size="sm"
        onPress={() => navigate("/settings")}
        style={{
          ...getNavButtonStyle("/settings"),
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 8,
          minWidth: 40,
        }}
        className="nav-button"
        title={t('nav.settings')}
      >
        <IoSettings 
          size={20} 
          color={location.pathname === "/settings" ? theme.colors.primary : theme.colors.textWhite} 
        />
      </Button>
      <Button
        variant="outline"
        size="sm"
        onPress={onLogout}
        style={{
          borderColor: theme.colors.textWhite,
          color: theme.colors.textWhite,
          backgroundColor: "transparent",
          transition: "all 0.2s ease",
        }}
        className="nav-button"
      >
        {t('common.logout')}
      </Button>
      <style>{`
        .nav-button:hover {
          background-color: ${theme.colors.textWhite} !important;
          color: ${theme.colors.primary} !important;
        }
      `}</style>
    </XStack>
  );
};

interface AppProps {
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
}

const App: React.FC<AppProps> = ({ darkMode, setDarkMode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  const handleLogin = () => {
    setIsAuthenticated(true);
    navigate("/dashboard");
  };

  return (
    <YStack flex={1} height="100vh" backgroundColor="$backgroundGray">
      {isAuthenticated && (
        <Navigation onLogout={() => setIsAuthenticated(false)} />
      )}
      <Routes>
        <Route
          path="/login"
          element={
            isAuthenticated ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <LoginScreen onLogin={handleLogin} />
            )
          }
        />
        <Route
          path="/dashboard"
          element={
            isAuthenticated ? (
              <DashboardScreen />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/accounts"
          element={
            isAuthenticated ? (
              <AccountsScreen />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/payment"
          element={
            isAuthenticated ? (
              <PaymentScreen />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/settings"
          element={
            isAuthenticated ? (
              <SettingsScreen
                darkMode={darkMode}
                onToggleDarkMode={setDarkMode}
              />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/"
          element={
            <Navigate to={isAuthenticated ? "/dashboard" : "/login"} replace />
          }
        />
      </Routes>
    </YStack>
  );
};

export default App;
