import { Route, Routes, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { useAuth } from "./contexts/AuthContext";
import LoginScreen from "./screens/LoginScreen";
import DashboardScreen from "./screens/DashboardScreen";
import PaymentScreen from "./screens/PaymentScreen";
import AccountsScreen from "./screens/AccountsScreen";
import SettingsScreen from "./screens/SettingsScreen";
import { setupNotificationHandlers } from "./services/notificationService";
import "./app.module.css";

export function App() {
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    // Setup notification handlers (but don't auto-request permission)
    setupNotificationHandlers();
  }, []);

  return (
    <div className="app">
      <Routes>
        <Route
          path="/login"
          element={
            isAuthenticated ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <LoginScreen />
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
          path="/payments"
          element={
            isAuthenticated ? (
              <PaymentScreen />
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
          path="/settings"
          element={
            isAuthenticated ? (
              <SettingsScreen />
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
    </div>
  );
}

export default App;
