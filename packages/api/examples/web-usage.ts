/**
 * Example usage for Web (React)
 */

import { createApiService, TokenStorage } from "@ebanking/api";
import { useEffect, useState } from "react";

// Create API service instance
export const api = createApiService({
  baseURL: import.meta.env.VITE_API_URL || "https://api.example.com",
  timeout: 30000,
});

// Web token storage using localStorage
const webTokenStorage: TokenStorage = {
  getToken: () => localStorage.getItem("token"),
  setToken: (token: string) => localStorage.setItem("token", token),
  removeToken: () => localStorage.removeItem("token"),
  getRefreshToken: () => localStorage.getItem("refreshToken"),
  setRefreshToken: (token: string) =>
    localStorage.setItem("refreshToken", token),
  removeRefreshToken: () => localStorage.removeItem("refreshToken"),
};

// Configure API service
api.setTokenStorage(webTokenStorage);

api.setOnTokenRefresh((token, refreshToken) => {
  console.log("Token refreshed successfully");
  // Optionally update your app state
});

api.setOnAuthError(() => {
  console.log("Authentication failed");
  // Redirect to login page
  window.location.href = "/login";
});

// Example React hook for using the API
export function useAccounts() {
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchAccounts() {
      try {
        setLoading(true);
        const data = await api.accounts.getAccounts();
        setAccounts(data);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    }

    fetchAccounts();
  }, []);

  return { accounts, loading, error };
}

// Example login function
export async function login(email: string, password: string) {
  try {
    const response = await api.auth.login({ email, password });

    // Tokens are automatically saved by the storage implementation
    console.log("Logged in successfully", response.user);

    return response;
  } catch (error) {
    console.error("Login failed", error);
    throw error;
  }
}

// Example payment function
export async function makePayment(
  fromAccountId: string,
  toAccountId: string,
  amount: number,
  description: string
) {
  try {
    const payment = await api.payments.transferBetweenAccounts(
      fromAccountId,
      toAccountId,
      amount,
      description
    );

    console.log("Payment successful", payment);
    return payment;
  } catch (error) {
    console.error("Payment failed", error);
    throw error;
  }
}
