import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Routes, Route, Navigate, useNavigate, useLocation } from "react-router-dom";
import { YStack, XStack, Text, Button, useAppTheme } from "@ebanking/ui";
import { Settings } from "lucide-react-native";
import { LoginScreen, DashboardScreen, AccountsScreen, PaymentScreen, SettingsScreen } from "@ebanking/screens";
import api from "./lib/api";

const Navigation: React.FC<{ onLogout: () => void }> = ({ onLogout }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const { theme } = useAppTheme();

  const getNavButtonStyle = (path: string) => ({
    borderColor: theme.colors.textWhite,
    backgroundColor: location.pathname === path ? theme.colors.textWhite : "transparent",
    transition: "all 0.2s ease",
  });

  const getNavButtonTextColor = (path: string) =>
    location.pathname === path ? theme.colors.primary : theme.colors.textWhite;

  return (
    <XStack backgroundColor={theme.colors.primary} padding="$4" paddingVertical="$3" gap="$3" alignItems="center">
      <Text size="xl" weight="bold" style={{ color: theme.colors.textWhite }}>
        {t("auth.title")}
      </Text>
      <XStack flex={1} justifyContent="center" gap="$3">
        <Button
          variant="outline"
          size="sm"
          onPress={() => navigate("/dashboard")}
          style={getNavButtonStyle("/dashboard")}
          className="nav-button"
        >
          <Text style={{ color: getNavButtonTextColor("/dashboard") }}>{t("nav.dashboard")}</Text>
        </Button>
        <Button
          variant="outline"
          size="sm"
          onPress={() => navigate("/accounts")}
          style={getNavButtonStyle("/accounts")}
          className="nav-button"
        >
          <Text style={{ color: getNavButtonTextColor("/accounts") }}>{t("nav.accounts")}</Text>
        </Button>
        <Button
          variant="outline"
          size="sm"
          onPress={() => navigate("/payment")}
          style={getNavButtonStyle("/payment")}
          className="nav-button"
        >
          <Text style={{ color: getNavButtonTextColor("/payment") }}>{t("nav.payment")}</Text>
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
        title={t("nav.settings")}
      >
        <Settings size={20} color={location.pathname === "/settings" ? theme.colors.primary : theme.colors.textWhite} />
      </Button>
      <Button
        variant="outline"
        size="sm"
        onPress={onLogout}
        style={{
          borderColor: theme.colors.textWhite,
          backgroundColor: "transparent",
          transition: "all 0.2s ease",
        }}
        className="nav-button"
      >
        <Text style={{ color: theme.colors.textWhite }}>{t("common.logout")}</Text>
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

const PaymentRouteWrapper: React.FC<{ api: typeof api }> = ({ api }) => {
  const location = useLocation();

  console.log("[Web Payment] Full location object:", location);
  console.log("[Web Payment] location.state type:", typeof location.state);
  console.log("[Web Payment] location.state keys:", location.state ? Object.keys(location.state) : "null/undefined");
  console.log("[Web Payment] Received location state:", location.state);

  const initialData = location.state || undefined;
  console.log("[Web Payment] Initial data:", initialData);

  try {
    return <PaymentScreen api={api} initialData={initialData} />;
  } catch (error) {
    console.error("[Web Payment] Error rendering PaymentScreen:", error);
    return (
      <div style={{ padding: 20, color: "red" }}>
        <h2>Error loading payment screen</h2>
        <p>{error instanceof Error ? error.message : String(error)}</p>
        <pre>{error instanceof Error ? error.stack : ""}</pre>
      </div>
    );
  }
};

const App: React.FC<AppProps> = ({ darkMode, setDarkMode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  const handleLogin = () => {
    setIsAuthenticated(true);
    navigate("/dashboard");
  };

  const handleNavigateToPayment = (paymentData?: any) => {
    console.log("[Web App] Navigating to payment with data:", paymentData);
    navigate("/payment", { state: paymentData });
  };

  const handleNavigateToAccounts = () => {
    console.log("[Web App] Navigating to accounts");
    navigate("/accounts");
  };

  return (
    <YStack flex={1} height="100vh" backgroundColor="$backgroundGray">
      {isAuthenticated && <Navigation onLogout={() => setIsAuthenticated(false)} />}
      <Routes>
        <Route
          path="/login"
          element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <LoginScreen onLogin={handleLogin} />}
        />
        <Route
          path="/dashboard"
          element={
            isAuthenticated ? (
              <DashboardScreen
                api={api}
                onNavigateToPayment={handleNavigateToPayment}
                onNavigateToAccounts={handleNavigateToAccounts}
              />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/accounts"
          element={isAuthenticated ? <AccountsScreen api={api} /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/payment"
          element={isAuthenticated ? <PaymentRouteWrapper api={api} /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/settings"
          element={
            isAuthenticated ? (
              <SettingsScreen darkMode={darkMode} onToggleDarkMode={setDarkMode} />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route path="/" element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} replace />} />
      </Routes>
    </YStack>
  );
};

export default App;
