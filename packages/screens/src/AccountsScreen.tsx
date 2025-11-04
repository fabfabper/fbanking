import React, { useState } from "react";
import { ScrollView, Dimensions, Platform, Pressable } from "react-native";
import { YStack, XStack, Text, Card, theme } from "@ebanking/ui";

const { width: screenWidth } = Dimensions.get("window");
const isWeb = Platform.OS === "web";
const CARD_WIDTH = isWeb
  ? Math.min(320, screenWidth * 0.3)
  : screenWidth * 0.75;
const CARD_HEIGHT = 180;
const CARD_SPACING = 16;

export const AccountsScreen: React.FC = () => {
  const [selectedAccountIndex, setSelectedAccountIndex] = useState(0);

  const accounts = [
    {
      id: 1,
      name: "Checking Account",
      number: "****1234",
      balance: 5430.0,
      type: "checking",
    },
    {
      id: 2,
      name: "Savings Account",
      number: "****5678",
      balance: 12850.0,
      type: "savings",
    },
    {
      id: 3,
      name: "Credit Card",
      number: "****9012",
      balance: -1230.5,
      type: "credit",
    },
  ];

  const transactions = {
    1: [
      {
        id: 1,
        description: "Grocery Store",
        amount: -85.5,
        date: "2025-11-03",
        category: "Food",
      },
      {
        id: 2,
        description: "Salary Deposit",
        amount: 3500.0,
        date: "2025-11-01",
        category: "Income",
      },
      {
        id: 3,
        description: "Electric Bill",
        amount: -120.0,
        date: "2025-10-30",
        category: "Utilities",
      },
      {
        id: 4,
        description: "Restaurant",
        amount: -45.0,
        date: "2025-10-28",
        category: "Food",
      },
      {
        id: 5,
        description: "Gas Station",
        amount: -60.0,
        date: "2025-10-27",
        category: "Transport",
      },
    ],
    2: [
      {
        id: 6,
        description: "Monthly Transfer",
        amount: 500.0,
        date: "2025-11-01",
        category: "Transfer",
      },
      {
        id: 7,
        description: "Interest Payment",
        amount: 12.5,
        date: "2025-10-31",
        category: "Interest",
      },
      {
        id: 8,
        description: "Withdrawal",
        amount: -200.0,
        date: "2025-10-25",
        category: "Transfer",
      },
    ],
    3: [
      {
        id: 9,
        description: "Online Shopping",
        amount: -230.0,
        date: "2025-11-02",
        category: "Shopping",
      },
      {
        id: 10,
        description: "Payment Received",
        amount: 500.0,
        date: "2025-11-01",
        category: "Payment",
      },
      {
        id: 11,
        description: "Subscription",
        amount: -15.99,
        date: "2025-10-28",
        category: "Services",
      },
      {
        id: 12,
        description: "Hotel Booking",
        amount: -450.0,
        date: "2025-10-20",
        category: "Travel",
      },
    ],
  };

  const selectedAccount = accounts[selectedAccountIndex];
  const selectedTransactions = transactions[selectedAccount.id] || [];

  const formatCurrency = (amount: number) => {
    const formatted = Math.abs(amount).toFixed(2);
    return amount >= 0 ? `$${formatted}` : `-$${formatted}`;
  };

  const handleScroll = (event: any) => {
    const scrollX = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollX / (CARD_WIDTH + CARD_SPACING));
    if (
      index !== selectedAccountIndex &&
      index >= 0 &&
      index < accounts.length
    ) {
      setSelectedAccountIndex(index);
    }
  };

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
          onMomentumScrollEnd={isWeb ? undefined : handleScroll}
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
                onPress={() => setSelectedAccountIndex(index)}
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
                    gap="$3"
                    padding="$4"
                    justifyContent="space-between"
                    flex={1}
                  >
                    <YStack gap="$2">
                      <Text
                        size="xs"
                        weight="medium"
                        style={{
                          color: textSecondaryColor,
                          opacity: isSelected ? 0.9 : 1,
                          letterSpacing: 1.2,
                        }}
                      >
                        {account.type.toUpperCase()}
                      </Text>
                      <Text
                        size="xl"
                        weight="bold"
                        style={{ color: textColor }}
                      >
                        {account.name}
                      </Text>
                    </YStack>

                    <YStack gap="$1">
                      <Text
                        size="sm"
                        style={{
                          color: textSecondaryColor,
                          opacity: isSelected ? 0.9 : 1,
                        }}
                      >
                        {account.number}
                      </Text>
                      <Text
                        size="3xl"
                        weight="bold"
                        style={{ color: textColor, marginTop: 4 }}
                      >
                        {formatCurrency(account.balance)}
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
          Recent Transactions
        </Text>

        <ScrollView showsVerticalScrollIndicator={false}>
          <YStack gap="$3" paddingBottom="$6">
            {selectedTransactions.map((transaction) => (
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
                      {transaction.description}
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
                    {transaction.amount >= 0 ? "+" : ""}
                    {formatCurrency(transaction.amount)}
                  </Text>
                </XStack>
              </Card>
            ))}
          </YStack>
        </ScrollView>
      </YStack>
    </YStack>
  );
};
