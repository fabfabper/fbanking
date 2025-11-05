import { ApiClient } from "../client/ApiClient";
import { Transaction, TransactionFilters, PaginatedResponse } from "../types";

/**
 * Transactions Service
 * Handles all transaction-related operations
 */
export class TransactionsService {
  constructor(private client: ApiClient) {}

  /**
   * Get transactions with optional filters and pagination
   */
  async getTransactions(
    filters?: TransactionFilters
  ): Promise<PaginatedResponse<Transaction>> {
    return this.client.get<PaginatedResponse<Transaction>>("/transactions", {
      params: filters,
    });
  }

  /**
   * Get a specific transaction by ID
   */
  async getTransaction(transactionId: string): Promise<Transaction> {
    return this.client.get<Transaction>(`/transactions/${transactionId}`);
  }

  /**
   * Get transactions for a specific account
   */
  async getAccountTransactions(
    accountId: string,
    filters?: Omit<TransactionFilters, "accountId">
  ): Promise<PaginatedResponse<Transaction>> {
    return this.client.get<PaginatedResponse<Transaction>>(
      `/accounts/${accountId}/transactions`,
      {
        params: filters,
      }
    );
  }

  /**
   * Get recent transactions (last 10)
   */
  async getRecentTransactions(accountId?: string): Promise<Transaction[]> {
    const params = accountId ? { accountId, limit: 10 } : { limit: 10 };
    const response = await this.getTransactions(params);
    return response.data;
  }

  /**
   * Search transactions by description or recipient
   */
  async searchTransactions(
    query: string,
    filters?: TransactionFilters
  ): Promise<PaginatedResponse<Transaction>> {
    return this.client.get<PaginatedResponse<Transaction>>(
      "/transactions/search",
      {
        params: { q: query, ...filters },
      }
    );
  }

  /**
   * Export transactions to CSV
   */
  async exportTransactions(filters?: TransactionFilters): Promise<Blob> {
    return this.client.get<Blob>("/transactions/export", {
      params: filters,
      responseType: "blob",
    });
  }
}
