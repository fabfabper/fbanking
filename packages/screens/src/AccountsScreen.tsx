import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  ScrollView,
  Dimensions,
  Platform,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { YStack, XStack, Text, Card, useAppTheme, Button } from "@ebanking/ui";
import { formatCurrency } from "./utils/formatCurrency";
import type { Account, Transaction, PaginatedResponse } from "@ebanking/api";

const { width: screenWidth } = Dimensions.get("window");
const isWeb = Platform.OS === "web";
const CARD_WIDTH = isWeb
  ? Math.min(280, screenWidth * 0.25)
  : screenWidth * 0.7;
const CARD_HEIGHT = 150;
const CARD_SPACING = 12;

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
        <ScrollView
          horizontal
          pagingEnabled={false}
          showsHorizontalScrollIndicator={false}
          decelerationRate="fast"
          snapToInterval={isWeb ? undefined : CARD_WIDTH + CARD_SPACING}
          snapToAlignment={isWeb ? undefined : "center"}
          contentContainerStyle={{
            paddingHorizontal: isWeb ? 24 : (screenWidth - CARD_WIDTH) / 2,
            paddingVertical: 8,
            paddingBottom: 12,
          }}
        >
          {accounts.map((account, index) => {
            const isSelected = index === selectedAccountIndex;
            const cardBgColor = isSelected
              ? theme.colors.primary
              : theme.colors.cardUnselected;
            const textColor = isSelected
              ? theme.colors.textWhite
              : theme.colors.cardUnselectedText;
            const textSecondaryColor = isSelected
              ? theme.colors.textWhite
              : theme.colors.cardUnselectedSecondary;

            return (
              <Pressable
                key={account.id}
                onPress={() => handleAccountSelect(index)}
              >
                <Card
                  hoverable
                  style={{
                    width: CARD_WIDTH,
                    height: CARD_HEIGHT,
                    marginRight: CARD_SPACING,
                    backgroundColor: cardBgColor,
                    opacity: isSelected ? 1 : 0.75,
                    transform: [{ scale: isSelected ? 1 : 0.96 }],
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 4 },
                    shadowOpacity: isSelected ? 0.15 : 0.08,
                    shadowRadius: 8,
                    elevation: isSelected ? 4 : 2,
                  }}
                >
                  <YStack
                    gap="$2"
                    padding="$3"
                    justifyContent="space-between"
                    flex={1}
                  >
                    <YStack gap="$1">
                      <Text
                        size="xs"
                        weight="medium"
                        style={{
                          color: textSecondaryColor,
                          opacity: isSelected ? 0.9 : 1,
                          letterSpacing: 1.2,
                        }}
                      >
                        {account.accountType.toUpperCase()}
                      </Text>
                      <Text
                        size="lg"
                        weight="bold"
                        style={{ color: textColor }}
                      >
                        {account.name}
                      </Text>
                    </YStack>

                    <YStack gap="$1">
                      <Text
                        size="xs"
                        style={{
                          color: textSecondaryColor,
                          opacity: isSelected ? 0.9 : 1,
                        }}
                      >
                        ****{account.accountNumber.slice(-4)}
                      </Text>
                      <Text
                        size="2xl"
                        weight="bold"
                        style={{ color: textColor, marginTop: 2 }}
                      >
                        {formatCurrency(account.balance)} {account.currency}
                      </Text>
                    </YStack>
                  </YStack>
                </Card>
              </Pressable>
            );
          })}
        </ScrollView>
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
            <YStack paddingBottom="$6">
              <Card
                style={{
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 1 },
                  shadowOpacity: 0.05,
                  shadowRadius: 3,
                  elevation: 1,
                }}
              >
                {transactions.map((transaction, index) => {
                  const isCredit = transaction.type === "credit";
                  const amount = isCredit
                    ? transaction.amount
                    : -transaction.amount;
                  const isLast = index === transactions.length - 1;

                  return (
                    <YStack key={transaction.id}>
                      <XStack
                        justifyContent="space-between"
                        alignItems="center"
                        padding="$4"
                        gap="$4"
                      >
                        <YStack gap="$2" flex={1}>
                          <Text
                            size="md"
                            weight="semibold"
                            style={{ lineHeight: 20 }}
                          >
                            {transaction.description}
                          </Text>
                          <XStack gap="$3" alignItems="center" flexWrap="wrap">
                            <Text
                              size="sm"
                              style={{ color: theme.colors.textSecondary }}
                            >
                              {new Date(transaction.date).toLocaleDateString()}
                            </Text>
                            <YStack
                              style={{
                                backgroundColor: isCredit
                                  ? theme.colors.categoryIncome
                                  : theme.colors.categoryExpense,
                                paddingHorizontal: isWeb ? 16 : 10,
                                paddingVertical: isWeb ? 8 : 4,
                                borderRadius: isWeb ? 8 : 6,
                                minWidth: isWeb ? 100 : undefined,
                                alignItems: "center",
                                justifyContent: "center",
                              }}
                            >
                              <Text
                                size={isWeb ? "md" : "xs"}
                                weight="semibold"
                                style={{
                                  color: "#FFFFFF",
                                  whiteSpace: isWeb ? "nowrap" : undefined,
                                  textAlign: "center",
                                }}
                              >
                                {transaction.category}
                              </Text>
                            </YStack>
                            {transaction.status !== "completed" && (
                              <YStack
                                style={{
                                  backgroundColor:
                                    theme.colors.warning || "#FFA500",
                                  paddingHorizontal: isWeb ? 12 : 8,
                                  paddingVertical: isWeb ? 6 : 3,
                                  borderRadius: isWeb ? 6 : 4,
                                }}
                              >
                                <Text
                                  size="xs"
                                  weight="semibold"
                                  style={{ color: "#FFFFFF" }}
                                >
                                  {transaction.status.toUpperCase()}
                                </Text>
                              </YStack>
                            )}
                          </XStack>
                        </YStack>
                        <Text
                          size="xl"
                          weight="bold"
                          style={{
                            color: isCredit
                              ? theme.colors.success
                              : theme.colors.error,
                            minWidth: 90,
                            textAlign: "right",
                          }}
                        >
                          {formatCurrency(amount, true)} {transaction.currency}
                        </Text>
                      </XStack>
                      {!isLast && (
                        <YStack
                          style={{
                            height: 1,
                            backgroundColor: theme.colors.border,
                            marginHorizontal: 16,
                          }}
                        />
                      )}
                    </YStack>
                  );
                })}
              </Card>
            </YStack>
          </ScrollView>
        )}
      </YStack>
    </YStack>
  );
};
