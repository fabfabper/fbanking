import { createApiService, TokenStorage } from "@ebanking/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";

/**
 * API Service for Mobile Application
 *
 * This module creates and configures the API service for the React Native mobile application.
 * It uses AsyncStorage for token storage and handles authentication state.
 */

// Determine the correct base URL based on platform
const getBaseURL = () => {
  // For development, use different URLs based on platform
  if (__DEV__) {
    if (Platform.OS === "android") {
      // Android emulator uses 10.0.2.2 to access host machine's localhost
      const url = "http://192.168.10.67:3000/ebanking";
      console.log("[API] Using Android emulator URL:", url);
      return url;
    } else if (Platform.OS === "ios") {
      // iOS simulator can use localhost
      const url = "http://192.168.10.67:3000/ebanking";
      console.log("[API] Using iOS simulator URL:", url);
      return url;
    } else {
      // Web or other platforms
      const url = "http://192.168.10.67:3000/ebanking";
      console.log("[API] Using default URL:", url);
      return url;
    }
  }

  // For production, use your production API URL
  return "https://api.yourbank.com/ebanking";
};

// Create the API service with the backend URL
export const api = createApiService({
  baseURL: getBaseURL(),
  timeout: 30000,
});

// Configure token storage for mobile using AsyncStorage
const mobileTokenStorage: TokenStorage = {
  getToken: async () => await AsyncStorage.getItem("token"),
  setToken: async (token: string) => await AsyncStorage.setItem("token", token),
  removeToken: async () => await AsyncStorage.removeItem("token"),
  getRefreshToken: async () => await AsyncStorage.getItem("refreshToken"),
  setRefreshToken: async (token: string) =>
    await AsyncStorage.setItem("refreshToken", token),
  removeRefreshToken: async () => await AsyncStorage.removeItem("refreshToken"),
};

// Set the token storage implementation
api.setTokenStorage(mobileTokenStorage);

// Handle token refresh events
api.setOnTokenRefresh((token, refreshToken) => {
  console.log("Token refreshed successfully");
  // Tokens are automatically saved by the token storage
});

// Handle authentication errors
api.setOnAuthError(() => {
  console.log("Authentication failed, clearing tokens");
  AsyncStorage.removeItem("token");
  AsyncStorage.removeItem("refreshToken");
  // Navigation will need to be handled by the app
  // You can use a navigation reference or event emitter here
});

// Export the configured API service
export default api;
