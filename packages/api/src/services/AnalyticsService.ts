import { ApiClient } from "../client/ApiClient";
import {
  ExpenseByCategory,
  IncomeExpenseSummary,
  AnalyticsParams,
} from "../types";

/**
 * Analytics Service
 * Handles financial analytics and reporting
 */
export class AnalyticsService {
  constructor(private client: ApiClient) {}

  /**
   * Get expenses grouped by category
   */
  async getExpensesByCategory(
    params?: AnalyticsParams
  ): Promise<ExpenseByCategory[]> {
    return this.client.get<ExpenseByCategory[]>(
      "/analytics/expenses-by-category",
      {
        params,
      }
    );
  }

  /**
   * Get income vs expenses summary
   */
  async getIncomeExpensesSummary(
    params?: AnalyticsParams
  ): Promise<IncomeExpenseSummary> {
    return this.client.get<IncomeExpenseSummary>("/analytics/income-expenses", {
      params,
    });
  }

  /**
   * Get spending trends over time
   */
  async getSpendingTrends(
    params?: AnalyticsParams
  ): Promise<Array<{ date: string; amount: number }>> {
    return this.client.get<Array<{ date: string; amount: number }>>(
      "/analytics/spending-trends",
      {
        params,
      }
    );
  }

  /**
   * Get monthly summary
   */
  async getMonthlySummary(
    year: number,
    month: number,
    accountId?: string
  ): Promise<{
    income: number;
    expenses: number;
    topCategories: ExpenseByCategory[];
    transactionCount: number;
  }> {
    return this.client.get("/analytics/monthly-summary", {
      params: { year, month, accountId },
    });
  }

  /**
   * Get budget vs actual spending
   */
  async getBudgetComparison(params?: AnalyticsParams): Promise<
    Array<{
      category: string;
      budget: number;
      actual: number;
      percentage: number;
    }>
  > {
    return this.client.get("/analytics/budget-comparison", {
      params,
    });
  }
}
