import { ApiClient } from "../client/ApiClient";
import { Account, CreateAccountRequest } from "../types";

/**
 * Accounts Service
 * Handles all account-related operations
 */
export class AccountsService {
  constructor(private client: ApiClient) {}

  /**
   * Get all accounts for the current user
   */
  async getAccounts(): Promise<Account[]> {
    return this.client.get<Account[]>("/accounts");
  }

  /**
   * Get a specific account by ID
   */
  async getAccount(accountId: string): Promise<Account> {
    return this.client.get<Account>(`/accounts/${accountId}`);
  }

  /**
   * Create a new account
   */
  async createAccount(data: CreateAccountRequest): Promise<Account> {
    return this.client.post<Account, CreateAccountRequest>("/accounts", data);
  }

  /**
   * Update account details
   */
  async updateAccount(
    accountId: string,
    data: Partial<Pick<Account, "name">>
  ): Promise<Account> {
    return this.client.patch<Account>(`/accounts/${accountId}`, data);
  }

  /**
   * Close an account
   */
  async closeAccount(accountId: string): Promise<void> {
    return this.client.delete<void>(`/accounts/${accountId}`);
  }

  /**
   * Get account balance
   */
  async getBalance(
    accountId: string
  ): Promise<{ balance: number; currency: string }> {
    return this.client.get<{ balance: number; currency: string }>(
      `/accounts/${accountId}/balance`
    );
  }
}
