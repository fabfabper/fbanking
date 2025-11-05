import React from "react";
import { useTranslation } from "react-i18next";
import { ScrollView, Platform, Dimensions } from "react-native";
import { YStack, XStack, Text, Card, Button, useAppTheme } from "@ebanking/ui";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import { useCamera } from "./hooks/useCamera";
import { formatCurrency } from "./utils/formatCurrency";

const { width: screenWidth } = Dimensions.get("window");
const isWeb = Platform.OS === "web";
const CARD_WIDTH = isWeb ? Math.min(400, screenWidth * 0.4) : screenWidth * 0.7;
const CARD_SPACING = 16;

export const DashboardScreen: React.FC = () => {
  const { t } = useTranslation();
  const { theme } = useAppTheme();
  const { openCamera } = useCamera();

  // Expense categories data for pie chart
  const expenseData = [
    { name: t("categories.food"), value: 450, color: "#3B82F6" },
    { name: t("categories.utilities"), value: 280, color: "#10B981" },
    { name: t("categories.transport"), value: 180, color: "#F59E0B" },
    { name: t("categories.entertainment"), value: 220, color: "#EF4444" },
    { name: t("categories.shopping"), value: 340, color: "#8B5CF6" },
  ];

  // Income vs Expenses comparison data
  const incomeExpensesData = [
    {
      name: t("dashboard.income"),
      amount: 3200,
      color: theme.colors.success,
    },
    {
      name: t("dashboard.expenses"),
      amount: 1470,
      color: theme.colors.error,
    },
  ];

  const transactions = [
    {
      id: 1,
      name: "Grocery Store",
      amount: -45.2,
      date: t("dashboard.today"),
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

  const handleCameraOpen = () => {
    openCamera();
  };

  return (
    <YStack flex={1} backgroundColor="$backgroundGray" paddingTop="$4">
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Balance & Chart Cards Carousel */}
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
            {/* Account Balance Card */}
            <Card
              style={{
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.1,
                shadowRadius: 8,
                elevation: 3,
                width: CARD_WIDTH,
                marginRight: CARD_SPACING,
              }}
            >
              <YStack gap="$3" padding="$4">
                <Text size="sm" style={{ color: theme.colors.textSecondary }}>
                  {t("dashboard.totalBalance")}
                </Text>
                <Text
                  size="3xl"
                  weight="bold"
                  style={{ color: theme.colors.primary }}
                >
                  CHF 9'450.00
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
                    {t("dashboard.fromLastMonth")}
                  </Text>
                </XStack>
              </YStack>
            </Card>

            {/* Expense Categories Pie Chart Card */}
            <Card
              style={{
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.1,
                shadowRadius: 8,
                elevation: 3,
                width: CARD_WIDTH,
                marginRight: CARD_SPACING,
              }}
            >
              <YStack gap="$3" padding="$4">
                <Text size="sm" style={{ color: theme.colors.textSecondary }}>
                  {t("dashboard.expenseCategories")}
                </Text>
                {isWeb ? (
                  <YStack height={180} alignItems="center">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={expenseData}
                          cx="50%"
                          cy="50%"
                          innerRadius={40}
                          outerRadius={65}
                          paddingAngle={2}
                          dataKey="value"
                          label={(entry: any) => entry.name as string}
                          labelLine={false}
                          style={{ fontSize: 11 }}
                        >
                          {expenseData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value: any) => `CHF ${value}`} />
                      </PieChart>
                    </ResponsiveContainer>
                  </YStack>
                ) : (
                  <YStack gap="$3">
                    {expenseData.map((category, index) => (
                      <XStack
                        key={index}
                        gap="$3"
                        alignItems="center"
                        justifyContent="space-between"
                      >
                        <XStack gap="$2" alignItems="center" flex={1}>
                          <Text size="sm">{category.name}</Text>
                        </XStack>
                        <Text
                          size="sm"
                          weight="semibold"
                          style={{ color: theme.colors.primary }}
                        >
                          CHF {category.value}
                        </Text>
                      </XStack>
                    ))}
                  </YStack>
                )}
              </YStack>
            </Card>

            {/* Income vs Expenses Card */}
            <Card
              style={{
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.1,
                shadowRadius: 8,
                elevation: 3,
                width: CARD_WIDTH,
                marginRight: CARD_SPACING,
              }}
            >
              <YStack gap="$3" padding="$4">
                <Text size="sm" style={{ color: theme.colors.textSecondary }}>
                  {t("dashboard.incomeVsExpenses")}
                </Text>
                {isWeb ? (
                  <YStack height={180} alignItems="center">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={incomeExpensesData}>
                        <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                        <XAxis
                          dataKey="name"
                          style={{ fontSize: 12 }}
                          tick={{ fill: theme.colors.textSecondary }}
                        />
                        <YAxis
                          style={{ fontSize: 11 }}
                          tick={{ fill: theme.colors.textSecondary }}
                          tickFormatter={(value) => `${value}`}
                        />
                        <Tooltip
                          formatter={(value: any) => `CHF ${value}`}
                          contentStyle={{
                            backgroundColor: theme.colors.cardBackground,
                            borderColor: theme.colors.border,
                          }}
                        />
                        <Bar dataKey="amount" radius={[8, 8, 0, 0]}>
                          {incomeExpensesData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </YStack>
                ) : (
                  <YStack gap="$3">
                    {incomeExpensesData.map((item, index) => (
                      <YStack key={index} gap="$2">
                        <XStack
                          justifyContent="space-between"
                          alignItems="center"
                        >
                          <Text size="sm">{item.name}</Text>
                          <Text
                            size="md"
                            weight="semibold"
                            style={{ color: item.color }}
                          >
                            {formatCurrency(item.amount)}
                          </Text>
                        </XStack>
                        <YStack
                          style={{
                            height: 8,
                            backgroundColor: theme.colors.border,
                            borderRadius: 4,
                            overflow: "hidden",
                          }}
                        >
                          <YStack
                            style={{
                              height: "100%",
                              width: `${(item.amount / 3200) * 100}%`,
                              backgroundColor: item.color,
                            }}
                          />
                        </YStack>
                      </YStack>
                    ))}
                    <YStack
                      style={{
                        marginTop: 8,
                        paddingTop: 12,
                        borderTopWidth: 1,
                        borderTopColor: theme.colors.border,
                      }}
                    >
                      <XStack
                        justifyContent="space-between"
                        alignItems="center"
                      >
                        <Text size="sm" weight="semibold">
                          {t("dashboard.netBalance")}
                        </Text>
                        <Text
                          size="md"
                          weight="bold"
                          style={{ color: theme.colors.success }}
                        >
                          {formatCurrency(1730, true)}
                        </Text>
                      </XStack>
                    </YStack>
                  </YStack>
                )}
              </YStack>
            </Card>
          </ScrollView>
        </YStack>

        {/* Quick Actions */}
        <YStack gap="$4" paddingHorizontal="$6" paddingTop="$4">
          <Text size="xl" weight="bold" style={{ marginBottom: 4 }}>
            {t("dashboard.quickActions")}
          </Text>
          <XStack gap="$3" flexWrap="wrap">
            <Button
              variant="outline"
              size="md"
              style={{ flex: 1, minWidth: 140 }}
            >
              {t("dashboard.transferMoney")}
            </Button>
            <Button
              variant="outline"
              size="md"
              style={{ flex: 1, minWidth: 140 }}
            >
              {t("dashboard.payBills")}
            </Button>
            <Button
              variant="outline"
              size="md"
              style={{ flex: 1, minWidth: 140 }}
            >
              {t("dashboard.viewAccounts")}
            </Button>
            <Button
              variant="outline"
              size="md"
              onPress={handleCameraOpen}
              style={{
                minWidth: isWeb ? 80 : 64,
                width: isWeb ? 80 : 64,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: 8,
              }}
              title="Scan QR Code"
            >
              QR
            </Button>
          </XStack>
        </YStack>

        {/* Recent Transactions */}
        <YStack
          gap="$4"
          paddingHorizontal="$6"
          paddingTop="$4"
          paddingBottom="$8"
        >
          <Text size="xl" weight="bold" style={{ marginBottom: 4 }}>
            {t("dashboard.recentTransactions")}
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
                    {formatCurrency(transaction.amount, true)}
                  </Text>
                </XStack>
              </Card>
            ))}
          </YStack>
        </YStack>
      </ScrollView>
    </YStack>
  );
};
