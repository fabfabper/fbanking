import { ApiClient } from "../client/ApiClient";
import {
  LoginRequest,
  LoginResponse,
  RefreshTokenRequest,
  RefreshTokenResponse,
  User,
} from "../types";

/**
 * Authentication Service
 * Handles login, logout, registration, and token management
 */
export class AuthService {
  constructor(private client: ApiClient) {}

  /**
   * Login with email and password
   */
  async login(credentials: LoginRequest): Promise<LoginResponse> {
    return this.client.post<LoginResponse, LoginRequest>(
      "/auth/login",
      credentials
    );
  }

  /**
   * Logout - invalidate current session
   */
  async logout(): Promise<void> {
    return this.client.post<void>("/auth/logout");
  }

  /**
   * Refresh authentication token
   */
  async refreshToken(
    request: RefreshTokenRequest
  ): Promise<RefreshTokenResponse> {
    return this.client.post<RefreshTokenResponse, RefreshTokenRequest>(
      "/auth/refresh",
      request
    );
  }

  /**
   * Get current user profile
   */
  async getCurrentUser(): Promise<User> {
    return this.client.get<User>("/auth/me");
  }

  /**
   * Update current user profile
   */
  async updateProfile(
    data: Partial<Omit<User, "id" | "createdAt" | "updatedAt">>
  ): Promise<User> {
    return this.client.patch<User>("/auth/me", data);
  }

  /**
   * Change password
   */
  async changePassword(
    oldPassword: string,
    newPassword: string
  ): Promise<void> {
    return this.client.post<void>("/auth/change-password", {
      oldPassword,
      newPassword,
    });
  }

  /**
   * Request password reset
   */
  async requestPasswordReset(email: string): Promise<void> {
    return this.client.post<void>("/auth/forgot-password", { email });
  }

  /**
   * Reset password with token
   */
  async resetPassword(token: string, newPassword: string): Promise<void> {
    return this.client.post<void>("/auth/reset-password", {
      token,
      newPassword,
    });
  }
}
