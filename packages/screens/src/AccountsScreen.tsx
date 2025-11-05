import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { ScrollView, Dimensions, Platform, Pressable } from "react-native";
import { YStack, XStack, Text, Card, useAppTheme } from "@ebanking/ui";
import { formatCurrency } from "./utils/formatCurrency";

const { width: screenWidth } = Dimensions.get("window");
const isWeb = Platform.OS === "web";
const CARD_WIDTH = isWeb
  ? Math.min(280, screenWidth * 0.25)
  : screenWidth * 0.7;
const CARD_HEIGHT = 150;
const CARD_SPACING = 12;

export const AccountsScreen: React.FC = () => {
  const { t } = useTranslation();
  const { theme } = useAppTheme();
  const [selectedAccountIndex, setSelectedAccountIndex] = useState(0);

  const accounts = [
    {
      id: 1,
      name: t("accounts.checking"),
      number: "****1234",
      balance: 5430.0,
      type: "checking",
    },
    {
      id: 2,
      name: t("accounts.savings"),
      number: "****5678",
      balance: 12850.0,
      type: "savings",
    },
    {
      id: 3,
      name: t("accounts.credit"),
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
        category: t("categories.food"),
      },
      {
        id: 2,
        description: "Salary Deposit",
        amount: 3500.0,
        date: "2025-11-01",
        category: t("categories.income"),
      },
      {
        id: 3,
        description: "Electric Bill",
        amount: -120.0,
        date: "2025-10-30",
        category: t("categories.utilities"),
      },
      {
        id: 4,
        description: "Restaurant",
        amount: -45.0,
        date: "2025-10-28",
        category: t("categories.food"),
      },
      {
        id: 5,
        description: "Gas Station",
        amount: -60.0,
        date: "2025-10-27",
        category: t("categories.transport"),
      },
    ],
    2: [
      {
        id: 6,
        description: "Monthly Transfer",
        amount: 500.0,
        date: "2025-11-01",
        category: t("categories.transfer"),
      },
      {
        id: 7,
        description: "Interest Payment",
        amount: 12.5,
        date: "2025-10-31",
        category: t("categories.interest"),
      },
      {
        id: 8,
        description: "Withdrawal",
        amount: -200.0,
        date: "2025-10-25",
        category: t("categories.transfer"),
      },
    ],
    3: [
      {
        id: 9,
        description: "Online Shopping",
        amount: -230.0,
        date: "2025-11-02",
        category: t("categories.shopping"),
      },
      {
        id: 10,
        description: "Payment Received",
        amount: 500.0,
        date: "2025-11-01",
        category: t("categories.payment"),
      },
      {
        id: 11,
        description: "Subscription",
        amount: -15.99,
        date: "2025-10-28",
        category: t("categories.services"),
      },
      {
        id: 12,
        description: "Hotel Booking",
        amount: -450.0,
        date: "2025-10-20",
        category: t("categories.travel"),
      },
    ],
  };

  const selectedAccount = accounts[selectedAccountIndex];
  const selectedTransactions = transactions[selectedAccount.id] || [];

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
                        {account.type.toUpperCase()}
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
                        {account.number}
                      </Text>
                      <Text
                        size="2xl"
                        weight="bold"
                        style={{ color: textColor, marginTop: 2 }}
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
          {t("accounts.transactions")}
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
                    {formatCurrency(transaction.amount, true)}
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
