import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useTranslation } from "react-i18next";
import { Card, Button } from "@fbanking/ui";
import { useAuth } from "../contexts/AuthContext";

interface Account {
  id: string;
  type: string;
  accountNumber: string;
  balance: number;
}

interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  status: "pending" | "completed" | "failed";
}

export const DashboardScreen = () => {
  const { t } = useTranslation();
  const { logout, user } = useAuth();

  // Mock data
  const accounts: Account[] = [
    {
      id: "1",
      type: "checkingAccount",
      accountNumber: "****1234",
      balance: 5234.5,
    },
    {
      id: "2",
      type: "savingsAccount",
      accountNumber: "****5678",
      balance: 12450.0,
    },
    {
      id: "3",
      type: "creditCard",
      accountNumber: "****9012",
      balance: -850.25,
    },
  ];

  const transactions: Transaction[] = [
    {
      id: "1",
      date: "2025-10-30",
      description: "Grocery Store",
      amount: -125.5,
      status: "completed",
    },
    {
      id: "2",
      date: "2025-10-29",
      description: "Salary Deposit",
      amount: 5000.0,
      status: "completed",
    },
    {
      id: "3",
      date: "2025-10-28",
      description: "Online Purchase",
      amount: -89.99,
      status: "pending",
    },
  ];

  const totalBalance = accounts.reduce((sum, acc) => sum + acc.balance, 0);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View>
            <Text style={styles.title}>{t("dashboard.title")}</Text>
            {user && <Text style={styles.userEmail}>{user.email}</Text>}
          </View>
          <Button onPress={logout} variant="secondary" size="small">
            {t("auth.signOut")}
          </Button>
        </View>
      </View>

      <View style={styles.balanceCard}>
        <Text style={styles.balanceLabel}>{t("dashboard.totalBalance")}</Text>
        <Text style={styles.balanceAmount}>
          $
          {totalBalance.toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </Text>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>{t("dashboard.accounts")}</Text>
        </View>
        <View style={styles.accountsGrid}>
          {accounts.map((account) => (
            <Card key={account.id}>
              <View style={styles.accountCard}>
                <View style={styles.accountHeader}>
                  <Text style={styles.accountType}>
                    {t(`accounts.${account.type}`)}
                  </Text>
                  <Text style={styles.accountNumber}>
                    {account.accountNumber}
                  </Text>
                </View>
                <Text
                  style={[
                    styles.accountBalance,
                    account.balance < 0 ? styles.negative : styles.positive,
                  ]}
                >
                  $
                  {Math.abs(account.balance).toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </Text>
              </View>
            </Card>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>
            {t("dashboard.recentTransactions")}
          </Text>
        </View>
        <Card>
          <View style={styles.transactionsList}>
            {transactions.map((transaction, index) => (
              <View
                key={transaction.id}
                style={[
                  styles.transactionItem,
                  index !== transactions.length - 1 && styles.transactionBorder,
                ]}
              >
                <View style={styles.transactionInfo}>
                  <Text style={styles.transactionDescription}>
                    {transaction.description}
                  </Text>
                  <Text style={styles.transactionDate}>{transaction.date}</Text>
                </View>
                <View style={styles.transactionAmountWrapper}>
                  <Text
                    style={[
                      styles.transactionAmount,
                      transaction.amount < 0
                        ? styles.negative
                        : styles.positive,
                    ]}
                  >
                    {transaction.amount < 0 ? "-" : "+"}$
                    {Math.abs(transaction.amount).toFixed(2)}
                  </Text>
                  <Text
                    style={[
                      styles.transactionStatus,
                      styles[
                        `status${
                          transaction.status.charAt(0).toUpperCase() +
                          transaction.status.slice(1)
                        }` as keyof typeof styles
                      ],
                    ]}
                  >
                    {t(`transactions.${transaction.status}`)}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </Card>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
  header: {
    padding: 24,
    paddingBottom: 16,
  },
  headerContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    color: "#1E293B",
  },
  userEmail: {
    fontSize: 14,
    color: "#64748B",
    marginTop: 4,
  },
  balanceCard: {
    backgroundColor: "#4A9FE8",
    borderRadius: 16,
    padding: 32,
    marginHorizontal: 24,
    marginBottom: 24,
    alignItems: "center",
  },
  balanceLabel: {
    fontSize: 16,
    color: "rgba(255, 255, 255, 0.9)",
    marginBottom: 8,
  },
  balanceAmount: {
    fontSize: 48,
    fontWeight: "700",
    color: "white",
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#1E293B",
  },
  accountsGrid: {
    paddingHorizontal: 24,
    gap: 16,
  },
  accountCard: {
    gap: 16,
  },
  accountHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  accountType: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1E293B",
  },
  accountNumber: {
    fontSize: 14,
    color: "#64748B",
    fontFamily: "Courier",
  },
  accountBalance: {
    fontSize: 24,
    fontWeight: "700",
    textAlign: "right",
  },
  positive: {
    color: "#10B981",
  },
  negative: {
    color: "#EF4444",
  },
  transactionsList: {
    gap: 16,
  },
  transactionItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 16,
  },
  transactionBorder: {
    borderBottomWidth: 1,
    borderBottomColor: "#E2E8F0",
  },
  transactionInfo: {
    flex: 1,
    gap: 4,
  },
  transactionDescription: {
    fontSize: 16,
    fontWeight: "500",
    color: "#1E293B",
  },
  transactionDate: {
    fontSize: 14,
    color: "#64748B",
  },
  transactionAmountWrapper: {
    alignItems: "flex-end",
    gap: 4,
  },
  transactionAmount: {
    fontSize: 18,
    fontWeight: "600",
  },
  transactionStatus: {
    fontSize: 12,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
    fontWeight: "500",
    overflow: "hidden",
  },
  statusCompleted: {
    backgroundColor: "#D1FAE5",
    color: "#065F46",
  },
  statusPending: {
    backgroundColor: "#FEF3C7",
    color: "#92400E",
  },
  statusFailed: {
    backgroundColor: "#FEE2E2",
    color: "#991B1B",
  },
});

export default DashboardScreen;
