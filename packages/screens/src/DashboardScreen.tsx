import React from "react";
import { ScrollView } from "react-native";
import { YStack, XStack, Text, Card, Button, theme } from "@ebanking/ui";

export const DashboardScreen: React.FC = () => {
  const transactions = [
    {
      id: 1,
      name: "Grocery Store",
      amount: -45.2,
      date: "Today",
      category: "Food",
    },
    {
      id: 2,
      name: "Salary Deposit",
      amount: 3200.0,
      date: "Nov 1",
      category: "Income",
    },
    {
      id: 3,
      name: "Electric Bill",
      amount: -89.5,
      date: "Oct 31",
      category: "Utilities",
    },
    {
      id: 4,
      name: "Restaurant",
      amount: -67.8,
      date: "Oct 30",
      category: "Food",
    },
  ];

  const formatCurrency = (amount: number) => {
    const formatted = Math.abs(amount).toFixed(2);
    return amount >= 0 ? `+$${formatted}` : `-$${formatted}`;
  };

  return (
    <YStack flex={1} backgroundColor="$backgroundGray" paddingTop="$4">
      <ScrollView showsVerticalScrollIndicator={false}>
        <YStack padding="$6" gap="$6" paddingBottom="$8">
          {/* Account Balance Card */}
          <Card
            style={{
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.1,
              shadowRadius: 8,
              elevation: 3,
            }}
          >
            <YStack gap="$3" padding="$4">
              <Text size="sm" style={{ color: theme.colors.textSecondary }}>
                Total Balance
              </Text>
              <Text
                size="3xl"
                weight="bold"
                style={{ color: theme.colors.primary }}
              >
                $12,450.00
              </Text>
              <XStack gap="$2" alignItems="center">
                <Text
                  size="md"
                  weight="semibold"
                  style={{ color: theme.colors.success }}
                >
                  +2.5%
                </Text>
                <Text size="sm" style={{ color: theme.colors.textSecondary }}>
                  from last month
                </Text>
              </XStack>
            </YStack>
          </Card>

          {/* Quick Actions */}
          <YStack gap="$4">
            <Text size="xl" weight="bold" style={{ marginBottom: 4 }}>
              Quick Actions
            </Text>
            <XStack gap="$3" flexWrap="wrap">
              <Button variant="outline" size="md" style={{ flex: 1, minWidth: 140 }}>
                Transfer Money
              </Button>
              <Button variant="outline" size="md" style={{ flex: 1, minWidth: 140 }}>
                Pay Bills
              </Button>
              <Button variant="outline" size="md" style={{ flex: 1, minWidth: 140 }}>
                View Accounts
              </Button>
            </XStack>
          </YStack>

          {/* Recent Transactions */}
          <YStack gap="$4">
            <Text size="xl" weight="bold" style={{ marginBottom: 4 }}>
              Recent Transactions
            </Text>
            <YStack gap="$3">
              {transactions.map((transaction) => (
                <Card
                  key={transaction.id}
                  hoverable
                  style={{
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 1 },
                    shadowOpacity: 0.05,
                    shadowRadius: 3,
                    elevation: 1,
                  }}
                >
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
                        {transaction.name}
                      </Text>
                      <XStack gap="$3" alignItems="center" flexWrap="wrap">
                        <Text
                          size="sm"
                          style={{ color: theme.colors.textSecondary }}
                        >
                          {transaction.date}
                        </Text>
                        <YStack
                          style={{
                            backgroundColor:
                              transaction.amount >= 0
                                ? theme.colors.categoryIncome
                                : theme.colors.categoryExpense,
                            paddingHorizontal: 10,
                            paddingVertical: 4,
                            borderRadius: 6,
                          }}
                        >
                          <Text
                            size="xs"
                            weight="semibold"
                            style={{
                              color:
                                transaction.amount >= 0
                                  ? theme.colors.successDark
                                  : theme.colors.errorDark,
                            }}
                          >
                            {transaction.category}
                          </Text>
                        </YStack>
                      </XStack>
                    </YStack>
                    <Text
                      size="xl"
                      weight="bold"
                      style={{
                        color:
                          transaction.amount >= 0
                            ? theme.colors.success
                            : theme.colors.error,
                        minWidth: 90,
                        textAlign: "right",
                      }}
                    >
                      {formatCurrency(transaction.amount)}
                    </Text>
                  </XStack>
                </Card>
              ))}
            </YStack>
          </YStack>
        </YStack>
      </ScrollView>
    </YStack>
  );
};
