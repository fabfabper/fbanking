import React, { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { ScrollView, Platform, Dimensions, ActivityIndicator, Alert, Animated } from "react-native";
import { YStack, XStack, Text, Card, Button, useAppTheme } from "@ebanking/ui";
import { QrCode } from "lucide-react-native";
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
import { useQRCodeScanner } from "./hooks/useQRCodeScanner";
import { formatCurrency } from "./utils/formatCurrency";
import { TransactionList } from "./components/TransactionList";
import { QRCodeScannerModal } from "./components/QRCodeScannerModal";
import { TransactionScreen } from "./TransactionScreen";
import type { Account, Transaction, ExpenseByCategory, IncomeExpenseSummary } from "@ebanking/api";

const { width: screenWidth } = Dimensions.get("window");
const isWeb = Platform.OS === "web";
const CARD_WIDTH = isWeb ? Math.min(400, screenWidth * 0.4) : screenWidth * 0.7;
const CARD_SPACING = 16;

interface DashboardScreenProps {
  api: {
    accounts: {
      getAccounts: () => Promise<Account[]>;
    };
    transactions: {
      getTransactions: (filters?: any) => Promise<{ data: Transaction[] }>;
    };
    analytics: {
      getExpensesByCategory: (params?: any) => Promise<ExpenseByCategory[]>;
      getIncomeExpensesSummary: (params?: any) => Promise<IncomeExpenseSummary>;
    };
  };
  onNavigateToPayment?: (paymentData?: {
    recipient?: string;
    amount?: string;
    note?: string;
    iban?: string;
    street?: string;
    city?: string;
    postalCode?: string;
    country?: string;
  }) => void;
  onNavigateToAccounts?: () => void;
}

export const DashboardScreen: React.FC<DashboardScreenProps> = ({ api, onNavigateToPayment, onNavigateToAccounts }) => {
  const { t } = useTranslation();
  const { theme } = useAppTheme();
  const { openCamera } = useCamera();

  // QR Code Scanner hook
  const { qrScannerVisible, openScanner, closeScanner, handleQRCodeScanned } = useQRCodeScanner({
    onDataScanned: (paymentData) => {
      console.log("[DashboardScreen] Navigating to payment with data:", paymentData);
      if (onNavigateToPayment) {
        onNavigateToPayment(paymentData);
      }
    },
    showAlert: !onNavigateToPayment,
  });

  // State
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalBalance, setTotalBalance] = useState(0);
  const [expenseData, setExpenseData] = useState<Array<{ name: string; value: number; color: string }>>([]);
  const [incomeExpensesData, setIncomeExpensesData] = useState<Array<{ name: string; amount: number; color: string }>>(
    []
  );
  const [netBalance, setNetBalance] = useState(0);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [sheetVisible, setSheetVisible] = useState(false);
  const sheetAnim = useRef(new Animated.Value(0)).current;

  // Color palette for charts
  const chartColors = ["#3B82F6", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6", "#EC4899", "#14B8A6"];

  // Fetch all dashboard data
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch all data in parallel
        const [accountsResponse, expensesResponse, incomeExpensesResponse, transactionsResponse] = await Promise.all([
          api.accounts.getAccounts(),
          api.analytics.getExpensesByCategory(),
          api.analytics.getIncomeExpensesSummary(),
          api.transactions.getTransactions({ limit: 5 }),
        ]);

        // Calculate total balance from all accounts
        const balance = accountsResponse.reduce((sum, account) => sum + account.balance, 0);
        setTotalBalance(balance);

        // Format expense categories for chart
        const formattedExpenses = expensesResponse.slice(0, 6).map((expense, index) => ({
          name: expense.category,
          value: Math.abs(expense.amount),
          color: chartColors[index % chartColors.length],
        }));
        setExpenseData(formattedExpenses);

        // Format income vs expenses for chart
        const formattedIncomeExpenses = [
          {
            name: t("dashboard.income"),
            amount: incomeExpensesResponse.income,
            color: theme.colors.success,
          },
          {
            name: t("dashboard.expenses"),
            amount: Math.abs(incomeExpensesResponse.expenses),
            color: theme.colors.error,
          },
        ];
        setIncomeExpensesData(formattedIncomeExpenses);
        setNetBalance(incomeExpensesResponse.netBalance);

        // Set recent transactions
        setTransactions(transactionsResponse.data);
      } catch (err) {
        console.error("Failed to fetch dashboard data:", err);
        setError(err instanceof Error ? err.message : "Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const handleCameraOpen = () => {
    openScanner();
  };

  const handleScannerClose = () => {
    closeScanner();
  };

  const handleTransactionClick = (tx: Transaction) => {
    setSelectedTransaction(tx);
    if (isWeb) {
      setDrawerVisible(true);
    } else {
      setSheetVisible(true);
      Animated.timing(sheetAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  };

  const handleClose = () => {
    setDrawerVisible(false);
    setSheetVisible(false);
    setSelectedTransaction(null);
    Animated.timing(sheetAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  // Loading state
  if (loading) {
    return (
      <YStack flex={1} backgroundColor="$backgroundGray" justifyContent="center" alignItems="center" gap="$4">
        <ActivityIndicator size="large" color={theme.colors.primary} />
        <Text size="md" style={{ color: theme.colors.textSecondary }}>
          {t("common.loading")}
        </Text>
      </YStack>
    );
  }

  // Error state
  if (error) {
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
        <Text size="md" style={{ color: theme.colors.textSecondary, textAlign: "center" }}>
          {error}
        </Text>
        <Button onPress={() => window.location.reload()}>
          <Text style={{ color: theme.colors.textWhite }}>{t("common.retry")}</Text>
        </Button>
      </YStack>
    );
  }

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
                <Text size={isWeb ? "3xl" : "2xl"} weight="bold" style={{ color: theme.colors.primary }}>
                  {formatCurrency(totalBalance)}
                </Text>
                {netBalance !== 0 && (
                  <XStack gap="$2" alignItems="center">
                    <Text
                      size="md"
                      weight="semibold"
                      style={{
                        color: netBalance > 0 ? theme.colors.success : theme.colors.error,
                      }}
                    >
                      {formatCurrency(netBalance, true)}
                    </Text>
                    <Text size="sm" style={{ color: theme.colors.textSecondary }}>
                      {t("dashboard.fromLastMonth")}
                    </Text>
                  </XStack>
                )}
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
                {expenseData.length === 0 ? (
                  <YStack height={180} justifyContent="center" alignItems="center">
                    <Text size="sm" style={{ color: theme.colors.textSecondary }}>
                      No expense data available
                    </Text>
                  </YStack>
                ) : isWeb ? (
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
                        <Tooltip formatter={(value: any) => formatCurrency(value as number)} />
                      </PieChart>
                    </ResponsiveContainer>
                  </YStack>
                ) : (
                  <YStack gap="$3">
                    {expenseData.map((category, index) => (
                      <XStack key={index} gap="$3" alignItems="center" justifyContent="space-between">
                        <XStack gap="$2" alignItems="center" flex={1}>
                          <YStack
                            style={{
                              width: 12,
                              height: 12,
                              borderRadius: 6,
                              backgroundColor: category.color,
                            }}
                          />
                          <Text size="sm">{category.name}</Text>
                        </XStack>
                        <Text size="sm" weight="semibold" style={{ color: theme.colors.primary }}>
                          {formatCurrency(category.value)}
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
                        <XAxis dataKey="name" style={{ fontSize: 12 }} tick={{ fill: theme.colors.textSecondary }} />
                        <YAxis
                          style={{ fontSize: 11 }}
                          tick={{ fill: theme.colors.textSecondary }}
                          tickFormatter={(value) => value}
                        />
                        <Tooltip
                          formatter={(value: any) => formatCurrency(value as number)}
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
                        <XStack justifyContent="space-between" alignItems="center">
                          <Text size="sm">{item.name}</Text>
                          <Text size="md" weight="semibold" style={{ color: item.color }}>
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
                      <XStack justifyContent="space-between" alignItems="center">
                        <Text size="sm" weight="semibold">
                          {t("dashboard.netBalance")}
                        </Text>
                        <Text size="md" weight="bold" style={{ color: theme.colors.success }}>
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
              radius="pill"
            >
              <QrCode size={24} color={theme.colors.primary} />
            </Button>
            <Button
              variant="outline"
              size="md"
              onPress={() => onNavigateToPayment?.()}
              style={{ flex: 1, minWidth: 140 }}
              radius="pill"
            >
              {t("dashboard.transferMoney")}
            </Button>
            <Button
              variant="outline"
              size="md"
              onPress={() => onNavigateToPayment?.()}
              style={{ flex: 1, minWidth: 140 }}
              radius="pill"
            >
              {t("dashboard.payBills")}
            </Button>
            <Button
              variant="outline"
              size="md"
              onPress={() => onNavigateToAccounts?.()}
              style={{ flex: 1, minWidth: 140 }}
              radius="pill"
            >
              {t("dashboard.viewAccounts")}
            </Button>
          </XStack>
        </YStack>

        {/* Recent Transactions */}
        <YStack gap="$4" paddingHorizontal="$6" paddingTop="$4" paddingBottom="$8">
          <Text size="xl" weight="bold" style={{ marginBottom: 4 }}>
            {t("dashboard.recentTransactions")}
          </Text>
          <TransactionList
            transactions={transactions}
            emptyMessage="No recent transactions"
            onTransactionClick={handleTransactionClick}
          />
        </YStack>
      </ScrollView>

      {/* QR Code Scanner Modal */}
      <QRCodeScannerModal
        visible={qrScannerVisible}
        onClose={handleScannerClose}
        onQRCodeScanned={handleQRCodeScanned}
      />

      {/* Transaction Detail Drawer (Web) */}
      {isWeb && drawerVisible && selectedTransaction && (
        <div
          style={{
            position: "fixed",
            top: "50%",
            right: 0,
            width: 400,
            maxHeight: "80vh",
            background: theme.colors.cardBg,
            boxShadow: "-2px 0 12px rgba(0,0,0,0.15)",
            zIndex: 9999,
            transition: "transform 0.3s",
            transform: drawerVisible ? "translate(0, -50%)" : "translate(100%, -50%)",
            display: "flex",
            flexDirection: "column",
            borderRadius: "16px 0 0 16px",
            overflowY: "auto",
          }}
        >
          <TransactionScreen transaction={selectedTransaction} onClose={handleClose} />
        </div>
      )}

      {/* Transaction Bottom Sheet (Mobile) */}
      {!isWeb && sheetVisible && selectedTransaction && (
        <Animated.View
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
            height: "50%",
            backgroundColor: theme.colors.cardBg,
            borderTopLeftRadius: 24,
            borderTopRightRadius: 24,
            zIndex: 9999,
            transform: [{ translateY: sheetAnim.interpolate({ inputRange: [0, 1], outputRange: [400, 0] }) }],
            shadowColor: "#000",
            shadowOffset: { width: 0, height: -4 },
            shadowOpacity: 0.15,
            shadowRadius: 12,
            elevation: 8,
          }}
        >
          <TransactionScreen transaction={selectedTransaction} onClose={handleClose} />
        </Animated.View>
      )}
    </YStack>
  );
};
