import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { ApiError } from "../types";

/**
 * Configuration for the API client
 */
export interface ApiClientConfig {
  baseURL: string;
  timeout?: number;
  headers?: Record<string, string>;
}

/**
 * Storage interface for tokens
 * Implement this differently for web (localStorage) and mobile (AsyncStorage)
 */
export interface TokenStorage {
  getToken: () => Promise<string | null> | string | null;
  setToken: (token: string) => Promise<void> | void;
  removeToken: () => Promise<void> | void;
  getRefreshToken: () => Promise<string | null> | string | null;
  setRefreshToken: (token: string) => Promise<void> | void;
  removeRefreshToken: () => Promise<void> | void;
}

/**
 * Base API Client with interceptors for authentication and error handling
 */
export class ApiClient {
  private client: AxiosInstance;
  private tokenStorage?: TokenStorage;
  private onTokenRefresh?: (token: string, refreshToken: string) => void;
  private onAuthError?: () => void;

  constructor(config: ApiClientConfig) {
    this.client = axios.create({
      baseURL: config.baseURL,
      timeout: config.timeout || 30000,
      headers: {
        "Content-Type": "application/json",
        ...config.headers,
      },
    });

    this.setupInterceptors();
  }

  /**
   * Set token storage implementation
   */
  setTokenStorage(storage: TokenStorage) {
    this.tokenStorage = storage;
  }

  /**
   * Set callback for token refresh
   */
  setOnTokenRefresh(callback: (token: string, refreshToken: string) => void) {
    this.onTokenRefresh = callback;
  }

  /**
   * Set callback for authentication errors
   */
  setOnAuthError(callback: () => void) {
    this.onAuthError = callback;
  }

  /**
   * Setup request and response interceptors
   */
  private setupInterceptors() {
    // Request interceptor - Add auth token
    this.client.interceptors.request.use(
      async (config) => {
        if (this.tokenStorage) {
          const token = await this.tokenStorage.getToken();
          if (token) {
            config.headers.Authorization = `Bearer ${token}`;
          }
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Response interceptor - Handle errors
    this.client.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        // Handle 401 Unauthorized - Try to refresh token
        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;

          if (this.tokenStorage) {
            const refreshToken = await this.tokenStorage.getRefreshToken();

            if (refreshToken) {
              try {
                // Attempt to refresh the token
                const response = await this.client.post("/auth/refresh", {
                  refreshToken,
                });

                const { token, refreshToken: newRefreshToken } = response.data;

                // Save new tokens
                await this.tokenStorage.setToken(token);
                await this.tokenStorage.setRefreshToken(newRefreshToken);

                // Notify app of token refresh
                if (this.onTokenRefresh) {
                  this.onTokenRefresh(token, newRefreshToken);
                }

                // Retry original request with new token
                originalRequest.headers.Authorization = `Bearer ${token}`;
                return this.client(originalRequest);
              } catch (refreshError) {
                // Refresh failed - clear tokens and notify app
                await this.tokenStorage.removeToken();
                await this.tokenStorage.removeRefreshToken();

                if (this.onAuthError) {
                  this.onAuthError();
                }

                return Promise.reject(refreshError);
              }
            } else {
              // No refresh token - notify app
              if (this.onAuthError) {
                this.onAuthError();
              }
            }
          }
        }

        // Transform error to ApiError format
        const apiError: ApiError = {
          message:
            error.response?.data?.message ||
            error.message ||
            "An error occurred",
          code: error.response?.data?.code,
          statusCode: error.response?.status,
          errors: error.response?.data?.errors,
        };

        return Promise.reject(apiError);
      }
    );
  }

  /**
   * Generic GET request
   */
  async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await this.client.get(url, config);
    return response.data;
  }

  /**
   * Generic POST request
   */
  async post<T, D = any>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response: AxiosResponse<T> = await this.client.post(
      url,
      data,
      config
    );
    return response.data;
  }

  /**
   * Generic PUT request
   */
  async put<T, D = any>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response: AxiosResponse<T> = await this.client.put(url, data, config);
    return response.data;
  }

  /**
   * Generic PATCH request
   */
  async patch<T, D = any>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response: AxiosResponse<T> = await this.client.patch(
      url,
      data,
      config
    );
    return response.data;
  }

  /**
   * Generic DELETE request
   */
  async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await this.client.delete(url, config);
    return response.data;
  }
}
