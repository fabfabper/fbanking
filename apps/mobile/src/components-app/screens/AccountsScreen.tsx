import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { useTranslation } from "react-i18next";
import { Card } from "@fbanking/ui";
import SlideOutMenu from "../components/SlideOutMenu";

type Screen = "dashboard" | "accounts" | "payments" | "settings";

interface AccountsScreenProps {
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
  accountId: string;
}

export const AccountsScreen: React.FC<AccountsScreenProps> = ({
  onNavigate,
}) => {
  const { t } = useTranslation();

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

  const allTransactions: Transaction[] = [
    {
      id: "1",
      accountId: "1",
      date: "2025-10-30",
      description: "Grocery Store",
      amount: -125.5,
      status: "completed",
    },
    {
      id: "2",
      accountId: "1",
      date: "2025-10-29",
      description: "Salary Deposit",
      amount: 5000.0,
      status: "completed",
    },
    {
      id: "3",
      accountId: "1",
      date: "2025-10-28",
      description: "Online Purchase",
      amount: -89.99,
      status: "pending",
    },
    {
      id: "4",
      accountId: "2",
      date: "2025-10-27",
      description: "Interest Payment",
      amount: 25.0,
      status: "completed",
    },
    {
      id: "5",
      accountId: "2",
      date: "2025-10-25",
      description: "Transfer to Checking",
      amount: -1000.0,
      status: "completed",
    },
    {
      id: "6",
      accountId: "3",
      date: "2025-10-30",
      description: "Restaurant",
      amount: -85.5,
      status: "completed",
    },
    {
      id: "7",
      accountId: "3",
      date: "2025-10-28",
      description: "Gas Station",
      amount: -60.0,
      status: "completed",
    },
  ];

  const [selectedAccountId, setSelectedAccountId] = useState<string>(
    accounts[0].id
  );

  const selectedAccount = accounts.find((acc) => acc.id === selectedAccountId);
  const accountTransactions = allTransactions.filter(
    (tx) => tx.accountId === selectedAccountId
  );

  return (
    <ScrollView className="flex-1 bg-slate-50">
      <View className="p-6 pb-4">
        <View className="flex-row justify-between items-start">
          <Text className="text-3xl font-bold text-slate-800">
            {t("accounts.title")}
          </Text>
          <SlideOutMenu onNavigate={onNavigate || ((s) => console.log(s))} />
        </View>
      </View>

      {/* Account Selector */}
      <View className="px-6 mb-6">
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingRight: 24, gap: 12 }}
        >
          {accounts.map((account) => (
            <TouchableOpacity
              key={account.id}
              onPress={() => setSelectedAccountId(account.id)}
              style={{ width: 240 }}
            >
              <Card
                style={
                  selectedAccountId === account.id
                    ? { backgroundColor: "#4A9FE8" }
                    : undefined
                }
              >
                <View className="gap-4">
                  <View className="flex-row justify-between items-center">
                    <Text
                      className={`text-base font-semibold ${
                        selectedAccountId === account.id
                          ? "text-white"
                          : "text-slate-800"
                      }`}
                    >
                      {t(`accounts.${account.type}`)}
                    </Text>
                    <Text
                      className={`text-sm ${
                        selectedAccountId === account.id
                          ? "text-white"
                          : "text-slate-500"
                      }`}
                      style={{ fontFamily: "Courier" }}
                    >
                      {account.accountNumber}
                    </Text>
                  </View>
                  <Text
                    className={`text-2xl font-bold text-right ${
                      selectedAccountId === account.id
                        ? "text-white"
                        : account.balance < 0
                        ? "text-red-500"
                        : "text-green-500"
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
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Transaction List */}
      <View className="px-6 mb-6">
        <Text className="text-lg font-semibold text-slate-800 mb-4">
          {t("accounts.accountTransactions")}
        </Text>
        <Card>
          <View className="py-2">
            {accountTransactions.length > 0 ? (
              accountTransactions.map((transaction, index) => (
                <View
                  key={transaction.id}
                  className={`flex-row justify-between items-center py-4 ${
                    index !== accountTransactions.length - 1
                      ? "border-b border-slate-100"
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
                        transaction.amount < 0
                          ? "text-red-500"
                          : "text-green-500"
                      }`}
                    >
                      {transaction.amount < 0 ? "-" : "+"}$
                      {Math.abs(transaction.amount).toFixed(2)}
                    </Text>
                    <Text
                      className={`text-xs px-2 py-1 rounded font-medium uppercase ${
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
              ))
            ) : (
              <View className="p-12 items-center">
                <Text className="text-slate-500 text-base">
                  {t("transactions.noTransactions")}
                </Text>
              </View>
            )}
          </View>
        </Card>
      </View>
    </ScrollView>
  );
};

export default AccountsScreen;
