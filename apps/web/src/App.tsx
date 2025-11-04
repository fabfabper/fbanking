import React, { useState } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { YStack, XStack, Text, Button, theme } from "@ebanking/ui";
import {
  LoginScreen,
  DashboardScreen,
  AccountsScreen,
  PaymentScreen,
} from "@ebanking/screens";

const Navigation: React.FC<{ onLogout: () => void }> = ({ onLogout }) => {
  const navigate = useNavigate();

  const navButtonStyle = {
    borderColor: theme.colors.textWhite,
    color: theme.colors.textWhite,
    backgroundColor: "transparent",
    transition: "all 0.2s ease",
  };

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
        flex={1}
      >
        E-Banking
      </Text>
      <Button
        variant="outline"
        size="sm"
        onPress={() => navigate("/dashboard")}
        style={navButtonStyle}
        className="nav-button"
      >
        Dashboard
      </Button>
      <Button
        variant="outline"
        size="sm"
        onPress={() => navigate("/accounts")}
        style={navButtonStyle}
        className="nav-button"
      >
        Accounts
      </Button>
      <Button
        variant="outline"
        size="sm"
        onPress={() => navigate("/payment")}
        style={navButtonStyle}
        className="nav-button"
      >
        Payment
      </Button>
      <Button
        variant="outline"
        size="sm"
        onPress={onLogout}
        style={navButtonStyle}
        className="nav-button"
      >
        Logout
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

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  const handleLogin = () => {
    setIsAuthenticated(true);
    navigate("/dashboard");
  };

  return (
    <YStack flex={1} height="100vh">
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
