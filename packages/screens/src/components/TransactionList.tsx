import React from "react";
import { Platform } from "react-native";
import { YStack, XStack, Text, Card, useAppTheme } from "@ebanking/ui";
import { formatCurrency } from "../utils/formatCurrency";
import type { Transaction } from "@ebanking/api";

const isWeb = Platform.OS === "web";

interface TransactionListProps {
  transactions: Transaction[];
  showStatus?: boolean; // Whether to show status badges for non-completed transactions
  emptyMessage?: string; // Custom empty state message
}

export const TransactionList: React.FC<TransactionListProps> = ({
  transactions,
  showStatus = false,
  emptyMessage = "No recent transactions",
}) => {
  const { theme } = useAppTheme();

  if (transactions.length === 0) {
    return (
      <Card>
        <YStack padding="$6" alignItems="center" gap="$2">
          <Text size="md" style={{ color: theme.colors.textSecondary }}>
            {emptyMessage}
          </Text>
        </YStack>
      </Card>
    );
  }

  return (
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
                <Text size="md" weight="semibold" style={{ lineHeight: 20 }}>
                  {transaction.description}
                </Text>
                <XStack gap="$3" alignItems="center" flexWrap="wrap">
                  <Text size="sm" style={{ color: theme.colors.textSecondary }}>
                    {new Date(transaction.date).toLocaleDateString()}
                  </Text>
                  {showStatus && transaction.status !== "completed" && (
                    <YStack
                      style={{
                        backgroundColor: theme.colors.warning || "#FFA500",
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
                  color:
                    transaction.amount > 0
                      ? theme.colors.success
                      : theme.colors.error,
                  minWidth: 90,
                  textAlign: "right",
                }}
              >
                {formatCurrency(Number(transaction.amount), true)}
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
  );
};
