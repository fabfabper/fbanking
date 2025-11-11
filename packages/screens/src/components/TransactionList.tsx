import React from "react";
import { Pressable } from "react-native";
import { YStack, XStack, Text, Card, useAppTheme } from "@ebanking/ui";
import { formatCurrency } from "../utils/formatCurrency";
import type { Transaction } from "@ebanking/api";

interface TransactionListProps {
  transactions: Transaction[];
  emptyMessage?: string; // Custom empty state message
  onTransactionClick?: (transaction: Transaction) => void;
}

export const TransactionList: React.FC<TransactionListProps> = ({
  transactions,
  emptyMessage = "No recent transactions",
  onTransactionClick,
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
            <Pressable onPress={() => onTransactionClick && onTransactionClick(transaction)}>
              <XStack justifyContent="space-between" alignItems="center" padding="$4" gap="$4">
                <YStack gap="$2" flex={1}>
                  <Text size="md" weight="semibold" style={{ lineHeight: 20 }}>
                    {transaction.description}
                  </Text>
                  <Text size="sm" style={{ color: theme.colors.textSecondary }}>
                    {new Date(transaction.date).toLocaleDateString()}
                  </Text>
                </YStack>
                <Text
                  size="xl"
                  weight="bold"
                  style={{
                    color: transaction.amount > 0 ? theme.colors.success : theme.colors.error,
                    minWidth: 90,
                    textAlign: "right",
                  }}
                >
                  {formatCurrency(Number(transaction.amount), true)}
                </Text>
              </XStack>
            </Pressable>
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
