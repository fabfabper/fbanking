import React, { useState } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { YStack, XStack, Text, Button } from '@ebanking/ui';
import { LoginScreen, DashboardScreen, AccountsScreen, PaymentScreen } from '@ebanking/screens';

const Navigation: React.FC<{ onLogout: () => void }> = ({ onLogout }) => {
  const navigate = useNavigate();

  return (
    <XStack
      backgroundColor="$cardBg"
      padding="$4"
      borderBottomWidth={1}
      borderBottomColor="$border"
      gap="$3"
      alignItems="center"
    >
      <Text size="lg" weight="bold" color="primary" flex={1}>
        E-Banking
      </Text>
      <Button variant="ghost" onPress={() => navigate('/dashboard')}>
        Dashboard
      </Button>
      <Button variant="ghost" onPress={() => navigate('/accounts')}>
        Accounts
      </Button>
      <Button variant="ghost" onPress={() => navigate('/payment')}>
        Payment
      </Button>
      <Button variant="outline" size="sm" onPress={onLogout}>
        Logout
      </Button>
    </XStack>
  );
};

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  const handleLogin = () => {
    setIsAuthenticated(true);
    navigate('/dashboard');
  };

  return (
    <YStack flex={1} height="100vh">
      {isAuthenticated && <Navigation onLogout={() => setIsAuthenticated(false)} />}
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
            isAuthenticated ? <DashboardScreen /> : <Navigate to="/login" replace />
          }
        />
        <Route
          path="/accounts"
          element={
            isAuthenticated ? <AccountsScreen /> : <Navigate to="/login" replace />
          }
        />
        <Route
          path="/payment"
          element={
            isAuthenticated ? <PaymentScreen /> : <Navigate to="/login" replace />
          }
        />
        <Route
          path="/"
          element={
            <Navigate to={isAuthenticated ? '/dashboard' : '/login'} replace />
          }
        />
      </Routes>
    </YStack>
  );
};

export default App;
