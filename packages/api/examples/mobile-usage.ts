/**
 * Example usage for React Native (Mobile)
 */

import { createApiService, TokenStorage } from "@ebanking/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

// Create API service instance
export const api = createApiService({
  baseURL: "https://api.example.com",
  timeout: 30000,
});

// React Native token storage using AsyncStorage
const mobileTokenStorage: TokenStorage = {
  getToken: async () => await AsyncStorage.getItem("token"),
  setToken: async (token: string) => await AsyncStorage.setItem("token", token),
  removeToken: async () => await AsyncStorage.removeItem("token"),
  getRefreshToken: async () => await AsyncStorage.getItem("refreshToken"),
  setRefreshToken: async (token: string) =>
    await AsyncStorage.setItem("refreshToken", token),
  removeRefreshToken: async () => await AsyncStorage.removeItem("refreshToken"),
};

// Configure API service
api.setTokenStorage(mobileTokenStorage);

api.setOnTokenRefresh((token, refreshToken) => {
  console.log("Token refreshed successfully");
});

api.setOnAuthError(() => {
  console.log("Authentication failed");
  // Navigate to login screen
  // navigation.navigate('Login');
});

// Example React hook for using the API
export function useTransactions(accountId?: string) {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchTransactions() {
      try {
        setLoading(true);
        const data = await api.transactions.getRecentTransactions(accountId);
        setTransactions(data);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    }

    fetchTransactions();
  }, [accountId]);

  const refresh = async () => {
    try {
      setLoading(true);
      const data = await api.transactions.getRecentTransactions(accountId);
      setTransactions(data);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  return { transactions, loading, error, refresh };
}

// Example login function
export async function login(email: string, password: string) {
  try {
    const response = await api.auth.login({ email, password });

    // Tokens are automatically saved by AsyncStorage
    console.log("Logged in successfully", response.user);

    return response;
  } catch (error) {
    console.error("Login failed", error);
    throw error;
  }
}

// Example analytics function
export async function getMonthlyAnalytics(year: number, month: number) {
  try {
    const summary = await api.analytics.getMonthlySummary(year, month);
    const expensesByCategory = await api.analytics.getExpensesByCategory({
      startDate: `${year}-${String(month).padStart(2, "0")}-01`,
      endDate: `${year}-${String(month).padStart(2, "0")}-31`,
    });

    return {
      summary,
      expensesByCategory,
    };
  } catch (error) {
    console.error("Failed to fetch analytics", error);
    throw error;
  }
}
