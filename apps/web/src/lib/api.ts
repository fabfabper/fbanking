import { createApiService, TokenStorage } from "@ebanking/api";

/**
 * API Service for Web Application
 *
 * This module creates and configures the API service for the web application.
 * It uses localStorage for token storage and handles authentication state.
 */

// Create the API service with the backend URL
export const api = createApiService({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000/ebanking",
  timeout: 30000,
});

// Configure token storage for web using localStorage
const webTokenStorage: TokenStorage = {
  getToken: () => localStorage.getItem("token"),
  setToken: (token: string) => localStorage.setItem("token", token),
  removeToken: () => localStorage.removeItem("token"),
  getRefreshToken: () => localStorage.getItem("refreshToken"),
  setRefreshToken: (token: string) =>
    localStorage.setItem("refreshToken", token),
  removeRefreshToken: () => localStorage.removeItem("refreshToken"),
};

// Set the token storage implementation
api.setTokenStorage(webTokenStorage);

// Handle token refresh events
api.setOnTokenRefresh((token, refreshToken) => {
  console.log("Token refreshed successfully");
  // Tokens are automatically saved by the token storage
});

// Handle authentication errors
api.setOnAuthError(() => {
  console.log("Authentication failed, clearing tokens");
  localStorage.removeItem("token");
  localStorage.removeItem("refreshToken");
  // Redirect to login page
  window.location.href = "/login";
});

// Export the configured API service
export default api;
