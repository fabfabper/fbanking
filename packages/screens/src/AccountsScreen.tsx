import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  ScrollView,
  Platform,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { YStack, XStack, Text, Card, useAppTheme, Button } from "@ebanking/ui";
import { formatCurrency } from "./utils/formatCurrency";
import {
  AccountCarousel,
  CARD_WIDTH,
  CARD_SPACING,
} from "./components/AccountCarousel";
import { TransactionList } from "./components/TransactionList";
import type { Account, Transaction, PaginatedResponse } from "@ebanking/api";

const isWeb = Platform.OS === "web";

interface AccountsScreenProps {
  api: {
    accounts: {
      getAccounts: () => Promise<Account[]>;
    };
    transactions: {
      getAccountTransactions: (
        accountId: string,
        filters?: any
      ) => Promise<PaginatedResponse<Transaction>>;
    };
  };
}

export const AccountsScreen: React.FC<AccountsScreenProps> = ({ api }) => {
  const { t } = useTranslation();
  const { theme } = useAppTheme();
  const [selectedAccountIndex, setSelectedAccountIndex] = useState(0);

  // API state for accounts
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [accountsLoading, setAccountsLoading] = useState(true);
  const [accountsError, setAccountsError] = useState<string | null>(null);

  // API state for transactions
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [transactionsLoading, setTransactionsLoading] = useState(false);
  const [transactionsError, setTransactionsError] = useState<string | null>(
    null
  );

  // Filter state
  const [transactionFilter, setTransactionFilter] = useState<
    "all" | "incomes" | "expenses"
  >("all");

  // Fetch accounts from API
  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        setAccountsLoading(true);
        setAccountsError(null);
        const data = await api.accounts.getAccounts();
        setAccounts(data);

        // Fetch transactions for the first account if available
        if (data.length > 0) {
          fetchTransactions(data[0].id);
        }
      } catch (err) {
        console.error("Failed to fetch accounts:", err);
        setAccountsError(
          err instanceof Error ? err.message : "Failed to fetch accounts"
        );
      } finally {
        setAccountsLoading(false);
      }
    };

    fetchAccounts();
  }, []);

  // Fetch transactions for selected account
  const fetchTransactions = async (accountId: string) => {
    try {
      setTransactionsLoading(true);
      setTransactionsError(null);
      const response = await api.transactions.getAccountTransactions(
        accountId,
        {
          limit: 10,
        }
      );
      // Extract the data array from the paginated response
      setTransactions(response.data);
    } catch (err) {
      console.error("Failed to fetch transactions:", err);
      setTransactionsError(
        err instanceof Error ? err.message : "Failed to fetch transactions"
      );
    } finally {
      setTransactionsLoading(false);
    }
  };

  // Handle account selection
  const handleAccountSelect = (index: number) => {
    setSelectedAccountIndex(index);
    if (accounts[index]) {
      fetchTransactions(accounts[index].id);
    }
  };

  // Handle scroll to update selected account on mobile
  const handleScroll = (event: any) => {
    const scrollX = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollX / (CARD_WIDTH + CARD_SPACING));
    if (
      index !== selectedAccountIndex &&
      index >= 0 &&
      index < accounts.length
    ) {
      handleAccountSelect(index);
    }
  };

  // Filter transactions based on selected filter
  const filteredTransactions = transactions.filter((transaction) => {
    if (transactionFilter === "all") return true;
    if (transactionFilter === "incomes") return transaction.type === "credit";
    if (transactionFilter === "expenses") return transaction.type === "debit";
    return true;
  });

  // Loading state
  if (accountsLoading) {
    return (
      <YStack
        flex={1}
        backgroundColor="$backgroundGray"
        justifyContent="center"
        alignItems="center"
        gap="$4"
      >
        <ActivityIndicator size="large" color={theme.colors.primary} />
        <Text size="md" style={{ color: theme.colors.textSecondary }}>
          {t("common.loading")}
        </Text>
      </YStack>
    );
  }

  // Error state
  if (accountsError) {
    return (
      <YStack
        flex={1}
        backgroundColor="$backgroundGray"
        justifyContent="center"
        alignItems="center"
        gap="$4"
        paddingHorizontal="$6"
      >
        <Text size="xl" weight="bold" style={{ color: theme.colors.error }}>
          {t("common.error")}
        </Text>
        <Text
          size="md"
          style={{ color: theme.colors.textSecondary, textAlign: "center" }}
        >
          {accountsError}
        </Text>
        <Button onPress={() => window.location.reload()}>
          <Text style={{ color: theme.colors.textWhite }}>
            {t("common.retry")}
          </Text>
        </Button>
      </YStack>
    );
  }

  // Empty state
  if (accounts.length === 0) {
    return (
      <YStack
        flex={1}
        backgroundColor="$backgroundGray"
        justifyContent="center"
        alignItems="center"
        gap="$4"
        paddingHorizontal="$6"
      >
        <Text size="xl" weight="bold">
          {t("accounts.noAccounts")}
        </Text>
        <Text
          size="md"
          style={{ color: theme.colors.textSecondary, textAlign: "center" }}
        >
          {t("accounts.noAccountsDescription")}
        </Text>
      </YStack>
    );
  }

  const selectedAccount = accounts[selectedAccountIndex];

  return (
    <YStack flex={1} backgroundColor="$backgroundGray" paddingTop="$4">
      {/* Account Cards Carousel */}
      <YStack>
        <AccountCarousel
          accounts={accounts}
          selectedAccountIndex={selectedAccountIndex}
          onAccountSelect={handleAccountSelect}
          onMomentumScrollEnd={handleScroll}
        />
      </YStack>

      {/* Transactions Section */}
      <YStack flex={1} paddingHorizontal="$6" paddingTop="$4" gap="$4">
        <Text size="xl" weight="bold" style={{ marginBottom: 4 }}>
          {t("accounts.transactions")}
        </Text>

        {transactionsLoading ? (
          <YStack flex={1} justifyContent="center" alignItems="center" gap="$4">
            <ActivityIndicator size="large" color={theme.colors.primary} />
            <Text size="sm" style={{ color: theme.colors.textSecondary }}>
              {t("common.loading")}
            </Text>
          </YStack>
        ) : transactionsError ? (
          <YStack flex={1} justifyContent="center" alignItems="center" gap="$4">
            <Text size="md" style={{ color: theme.colors.error }}>
              {transactionsError}
            </Text>
            <Button
              onPress={() =>
                selectedAccount && fetchTransactions(selectedAccount.id)
              }
            >
              <Text style={{ color: theme.colors.textWhite }}>
                {t("common.retry")}
              </Text>
            </Button>
          </YStack>
        ) : transactions.length === 0 ? (
          <YStack flex={1} justifyContent="center" alignItems="center" gap="$2">
            <Text size="md" weight="semibold">
              {t("accounts.noTransactions")}
            </Text>
            <Text
              size="sm"
              style={{ color: theme.colors.textSecondary, textAlign: "center" }}
            >
              {t("accounts.noTransactionsDescription")}
            </Text>
          </YStack>
        ) : (
          <ScrollView showsVerticalScrollIndicator={false}>
            <YStack paddingBottom="$6" gap="$4">
              {/* Filter Tags */}
              <XStack gap="$2" paddingHorizontal="$1" flexWrap="wrap">
                <Pressable
                  onPress={() => setTransactionFilter("all")}
                  style={{
                    backgroundColor:
                      transactionFilter === "all"
                        ? theme.colors.primary
                        : theme.colors.background,
                    paddingHorizontal: isWeb ? 20 : 16,
                    paddingVertical: isWeb ? 10 : 8,
                    borderRadius: 20,
                    borderWidth: 1,
                    borderColor:
                      transactionFilter === "all"
                        ? theme.colors.primary
                        : theme.colors.border,
                  }}
                >
                  <Text
                    size="sm"
                    weight="semibold"
                    color={
                      transactionFilter === "all"
                        ? "#FFFFFF"
                        : theme.colors.textPrimary
                    }
                  >
                    {t("accounts.filterAll") || "All"}
                  </Text>
                </Pressable>
                <Pressable
                  onPress={() => setTransactionFilter("incomes")}
                  style={{
                    backgroundColor:
                      transactionFilter === "incomes"
                        ? theme.colors.success
                        : theme.colors.background,
                    paddingHorizontal: isWeb ? 20 : 16,
                    paddingVertical: isWeb ? 10 : 8,
                    borderRadius: 20,
                    borderWidth: 1,
                    borderColor:
                      transactionFilter === "incomes"
                        ? theme.colors.success
                        : theme.colors.border,
                  }}
                >
                  <Text
                    size="sm"
                    weight="semibold"
                    color={
                      transactionFilter === "incomes"
                        ? "#FFFFFF"
                        : theme.colors.textPrimary
                    }
                  >
                    {t("accounts.filterIncomes") || "Incomes"}
                  </Text>
                </Pressable>
                <Pressable
                  onPress={() => setTransactionFilter("expenses")}
                  style={{
                    backgroundColor:
                      transactionFilter === "expenses"
                        ? theme.colors.error
                        : theme.colors.background,
                    paddingHorizontal: isWeb ? 20 : 16,
                    paddingVertical: isWeb ? 10 : 8,
                    borderRadius: 20,
                    borderWidth: 1,
                    borderColor:
                      transactionFilter === "expenses"
                        ? theme.colors.error
                        : theme.colors.border,
                  }}
                >
                  <Text
                    size="sm"
                    weight="semibold"
                    color={
                      transactionFilter === "expenses"
                        ? "#FFFFFF"
                        : theme.colors.textPrimary
                    }
                  >
                    {t("accounts.filterExpenses") || "Expenses"}
                  </Text>
                </Pressable>
              </XStack>

              <TransactionList
                transactions={filteredTransactions}
                emptyMessage={
                  transactionFilter !== "all"
                    ? t("accounts.noTransactions")
                    : "No transactions found"
                }
              />
            </YStack>
          </ScrollView>
        )}
      </YStack>
    </YStack>
  );
};
