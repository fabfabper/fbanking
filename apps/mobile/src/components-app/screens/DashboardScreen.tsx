import React from "react";
import { View, Text, ScrollView } from "react-native";
import { useTranslation } from "react-i18next";
import { Card } from "@fbanking/ui";
import { useAuth } from "../contexts/AuthContext";
import SlideOutMenu from "../components/SlideOutMenu";

type Screen = "dashboard" | "accounts" | "payments" | "settings";

interface DashboardScreenProps {
  onNavigate?: (screen: Screen) => void;
}

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

export const DashboardScreen: React.FC<DashboardScreenProps> = ({
  onNavigate,
}) => {
  const { t } = useTranslation();
  const { user } = useAuth();

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
    <ScrollView className="flex-1 bg-slate-50">
      <View className="p-6 pb-4">
        <View className="flex-row justify-between items-start">
          <View>
            <Text className="text-3xl font-bold text-slate-800">
              {t("dashboard.title")}
            </Text>
            {user && (
              <Text className="text-sm text-slate-500 mt-1">{user.email}</Text>
            )}
          </View>
          <SlideOutMenu onNavigate={onNavigate || ((s) => console.log(s))} />
        </View>
      </View>

      <View className="bg-corporate-blue rounded-2xl p-8 mx-6 mb-6 items-center">
        <Text className="text-base text-white/90 mb-2">
          {t("dashboard.totalBalance")}
        </Text>
        <Text className="text-5xl font-bold text-white">
          $
          {totalBalance.toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </Text>
      </View>

      <View className="mb-6">
        <View className="flex-row justify-between items-center px-6 mb-4">
          <Text className="text-xl font-semibold text-slate-800">
            {t("dashboard.accounts")}
          </Text>
        </View>
        <View className="px-6 gap-4">
          {accounts.map((account) => (
            <Card key={account.id}>
              <View className="gap-4">
                <View className="flex-row justify-between items-center">
                  <Text className="text-base font-semibold text-slate-800">
                    {t(`accounts.${account.type}`)}
                  </Text>
                  <Text
                    className="text-sm text-slate-500"
                    style={{ fontFamily: "Courier" }}
                  >
                    {account.accountNumber}
                  </Text>
                </View>
                <Text
                  className={`text-2xl font-bold text-right ${
                    account.balance < 0 ? "text-red-500" : "text-green-500"
                  }`}
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

      <View className="mb-6">
        <View className="flex-row justify-between items-center px-6 mb-4">
          <Text className="text-xl font-semibold text-slate-800">
            {t("dashboard.recentTransactions")}
          </Text>
        </View>
        <Card>
          <View className="gap-4">
            {transactions.map((transaction, index) => (
              <View
                key={transaction.id}
                className={`flex-row justify-between items-center pb-4 ${
                  index !== transactions.length - 1
                    ? "border-b border-slate-200"
                    : ""
                }`}
              >
                <View className="flex-1 gap-1">
                  <Text className="text-base font-medium text-slate-800">
                    {transaction.description}
                  </Text>
                  <Text className="text-sm text-slate-500">
                    {transaction.date}
                  </Text>
                </View>
                <View className="items-end gap-1">
                  <Text
                    className={`text-lg font-semibold ${
                      transaction.amount < 0 ? "text-red-500" : "text-green-500"
                    }`}
                  >
                    {transaction.amount < 0 ? "-" : "+"}$
                    {Math.abs(transaction.amount).toFixed(2)}
                  </Text>
                  <Text
                    className={`text-xs py-1 px-2 rounded font-medium ${
                      transaction.status === "completed"
                        ? "bg-green-100 text-green-800"
                        : transaction.status === "pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-red-100 text-red-800"
                    }`}
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

export default DashboardScreen;
