import { ApiClient, ApiClientConfig, TokenStorage } from "./client/ApiClient";
import { AuthService } from "./services/AuthService";
import { AccountsService } from "./services/AccountsService";
import { TransactionsService } from "./services/TransactionsService";
import { PaymentsService } from "./services/PaymentsService";
import { AnalyticsService } from "./services/AnalyticsService";

// Export types
export * from "./types";
export type { ApiClientConfig, TokenStorage } from "./client/ApiClient";

/**
 * Main API Service
 * Aggregates all service modules and provides a single entry point
 */
export class ApiService {
  private apiClient: ApiClient;

  // Service modules
  public auth: AuthService;
  public accounts: AccountsService;
  public transactions: TransactionsService;
  public payments: PaymentsService;
  public analytics: AnalyticsService;

  constructor(config: ApiClientConfig) {
    this.apiClient = new ApiClient(config);

    // Initialize service modules
    this.auth = new AuthService(this.apiClient);
    this.accounts = new AccountsService(this.apiClient);
    this.transactions = new TransactionsService(this.apiClient);
    this.payments = new PaymentsService(this.apiClient);
    this.analytics = new AnalyticsService(this.apiClient);
  }

  /**
   * Set token storage implementation
   */
  setTokenStorage(storage: TokenStorage) {
    this.apiClient.setTokenStorage(storage);
  }

  /**
   * Set callback for token refresh
   */
  setOnTokenRefresh(callback: (token: string, refreshToken: string) => void) {
    this.apiClient.setOnTokenRefresh(callback);
  }

  /**
   * Set callback for authentication errors
   */
  setOnAuthError(callback: () => void) {
    this.apiClient.setOnAuthError(callback);
  }
}

/**
 * Create and export a singleton API service instance
 * Usage in app:
 *
 * import { createApiService } from '@ebanking/api';
 *
 * const api = createApiService({
 *   baseURL: 'https://api.example.com',
 * });
 */
export function createApiService(config: ApiClientConfig): ApiService {
  return new ApiService(config);
}

// Export individual service classes for advanced usage
export { AuthService } from "./services/AuthService";
export { AccountsService } from "./services/AccountsService";
export { TransactionsService } from "./services/TransactionsService";
export { PaymentsService } from "./services/PaymentsService";
export { AnalyticsService } from "./services/AnalyticsService";
