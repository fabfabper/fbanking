// API Request and Response Types

export interface ApiError {
  message: string;
  code?: string;
  statusCode?: number;
  errors?: Record<string, string[]>;
}

export interface PaginationParams {
  page?: number;
  limit?: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Authentication
export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  refreshToken: string;
  user: User;
}

export interface RefreshTokenRequest {
  refreshToken: string;
}

export interface RefreshTokenResponse {
  token: string;
  refreshToken: string;
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  createdAt: string;
  updatedAt: string;
}

// Accounts
export interface Account {
  id: string;
  accountNumber: string;
  accountType: "checking" | "savings" | "credit";
  balance: number;
  currency: string;
  name: string;
  iban?: string;
  bic?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateAccountRequest {
  accountType: "checking" | "savings" | "credit";
  name: string;
  currency?: string;
}

// Transactions
export interface Transaction {
  id: string;
  accountId: string;
  amount: number;
  currency: string;
  type: "debit" | "credit";
  category: string;
  description: string;
  recipient?: string;
  sender?: string;
  date: string;
  status: "pending" | "completed" | "failed";
  createdAt: string;
  updatedAt: string;
}

export interface TransactionFilters extends PaginationParams {
  accountId?: string;
  startDate?: string;
  endDate?: string;
  category?: string;
  type?: "debit" | "credit";
  minAmount?: number;
  maxAmount?: number;
}

// Payments
export interface PaymentRequest {
  fromAccountId: string;
  toAccountId?: string;
  recipient?: {
    name: string;
    iban: string;
    bic?: string;
  };
  amount: number;
  currency: string;
  category: string;
  description: string;
  scheduledDate?: string;
}

export interface Payment {
  id: string;
  fromAccountId: string;
  toAccountId?: string;
  recipient?: {
    name: string;
    iban: string;
    bic?: string;
  };
  amount: number;
  currency: string;
  category: string;
  description: string;
  status: "pending" | "processing" | "completed" | "failed";
  scheduledDate?: string;
  completedDate?: string;
  createdAt: string;
  updatedAt: string;
}

// Analytics
export interface ExpenseByCategory {
  category: string;
  amount: number;
  count: number;
  percentage: number;
}

export interface IncomeExpenseSummary {
  income: number;
  expenses: number;
  netBalance: number;
  period: string;
}

export interface AnalyticsParams {
  accountId?: string;
  startDate?: string;
  endDate?: string;
}
