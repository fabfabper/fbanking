# @ebanking/api

API service layer for the ebanking application. Provides a clean, typed interface for all backend API calls.

## Features

- ✅ **Fully Typed**: Complete TypeScript definitions for all requests and responses
- 🔄 **Auto Token Refresh**: Automatic token refresh on 401 errors
- 🛡️ **Error Handling**: Centralized error handling with typed error responses
- 🔌 **Interceptors**: Request/response interceptors for auth and logging
- 📦 **Modular Services**: Organized service modules (Auth, Accounts, Transactions, etc.)
- 🌐 **Cross-Platform**: Works on both web and React Native

## Installation

```bash
npm install @ebanking/api
```

## Usage

### Basic Setup

```typescript
import { createApiService } from "@ebanking/api";

// Create API service instance
const api = createApiService({
  baseURL: "http://localhost:3000/ebanking", // Development
  // baseURL: "https://api.yourbank.com", // Production
  timeout: 30000,
});
```

### Token Storage (Web)

```typescript
// Web implementation using localStorage
api.setTokenStorage({
  getToken: () => localStorage.getItem("token"),
  setToken: (token) => localStorage.setItem("token", token),
  removeToken: () => localStorage.removeItem("token"),
  getRefreshToken: () => localStorage.getItem("refreshToken"),
  setRefreshToken: (token) => localStorage.setItem("refreshToken", token),
  removeRefreshToken: () => localStorage.removeItem("refreshToken"),
});
```

### Token Storage (React Native)

```typescript
import AsyncStorage from "@react-native-async-storage/async-storage";

// React Native implementation using AsyncStorage
api.setTokenStorage({
  getToken: async () => await AsyncStorage.getItem("token"),
  setToken: async (token) => await AsyncStorage.setItem("token", token),
  removeToken: async () => await AsyncStorage.removeItem("token"),
  getRefreshToken: async () => await AsyncStorage.getItem("refreshToken"),
  setRefreshToken: async (token) =>
    await AsyncStorage.setItem("refreshToken", token),
  removeRefreshToken: async () => await AsyncStorage.removeItem("refreshToken"),
});
```

### Authentication Callbacks

```typescript
// Handle token refresh
api.setOnTokenRefresh((token, refreshToken) => {
  console.log("Token refreshed successfully");
  // Update your app state with new tokens
});

// Handle auth errors (e.g., redirect to login)
api.setOnAuthError(() => {
  console.log("Authentication failed, redirecting to login");
  // Redirect to login screen
});
```

### Using Services

#### Authentication

```typescript
// Login
const { token, refreshToken, user } = await api.auth.login({
  email: "user@example.com",
  password: "password123",
});

// Get current user
const user = await api.auth.getCurrentUser();

// Logout
await api.auth.logout();
```

#### Accounts

```typescript
// Get all accounts
const accounts = await api.accounts.getAccounts();

// Get specific account
const account = await api.accounts.getAccount("account-id");

// Create new account
const newAccount = await api.accounts.createAccount({
  accountType: "savings",
  name: "Emergency Fund",
  currency: "CHF",
});

// Get balance
const { balance, currency } = await api.accounts.getBalance("account-id");
```

#### Transactions

```typescript
// Get transactions with filters
const { data, meta } = await api.transactions.getTransactions({
  accountId: "account-id",
  startDate: "2024-01-01",
  endDate: "2024-12-31",
  category: "Food",
  page: 1,
  limit: 20,
});

// Get recent transactions
const recentTransactions = await api.transactions.getRecentTransactions(
  "account-id"
);

// Search transactions
const results = await api.transactions.searchTransactions("grocery", {
  accountId: "account-id",
});
```

#### Payments

```typescript
// Make internal transfer
const payment = await api.payments.transferBetweenAccounts(
  "from-account-id",
  "to-account-id",
  100.5,
  "Transfer to savings"
);

// Pay bill
const billPayment = await api.payments.payBill(
  "from-account-id",
  {
    name: "Electric Company",
    iban: "CH93 0076 2011 6238 5295 7",
    bic: "POFICHBEXXX",
  },
  250.0,
  "Monthly electric bill",
  "2024-12-15" // Optional scheduled date
);

// Get scheduled payments
const scheduledPayments = await api.payments.getScheduledPayments();

// Cancel payment
await api.payments.cancelPayment("payment-id");
```

#### Analytics

```typescript
// Get expenses by category
const expensesByCategory = await api.analytics.getExpensesByCategory({
  accountId: "account-id",
  startDate: "2024-01-01",
  endDate: "2024-12-31",
});

// Get income vs expenses
const summary = await api.analytics.getIncomeExpensesSummary({
  startDate: "2024-01-01",
  endDate: "2024-12-31",
});

// Get monthly summary
const monthlySummary = await api.analytics.getMonthlySummary(2024, 11);
```

### Error Handling

```typescript
import { ApiError } from "@ebanking/api";

try {
  const accounts = await api.accounts.getAccounts();
} catch (error) {
  const apiError = error as ApiError;
  console.error("API Error:", apiError.message);
  console.error("Status Code:", apiError.statusCode);
  console.error("Error Code:", apiError.code);

  if (apiError.errors) {
    // Field-level validation errors
    Object.entries(apiError.errors).forEach(([field, messages]) => {
      console.error(`${field}: ${messages.join(", ")}`);
    });
  }
}
```

## API Reference

### Services

- **AuthService**: Authentication and user management
- **AccountsService**: Account operations and balance queries
- **TransactionsService**: Transaction history and search
- **PaymentsService**: Payments, transfers, and bill payments
- **AnalyticsService**: Financial analytics and reporting

### Types

All request and response types are exported from the package. See `src/types/index.ts` for complete type definitions.

## Development

```bash
# Install dependencies
npm install

# Type check
npm run type-check
```

## License

MIT
