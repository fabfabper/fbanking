import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Card } from "@fbanking/ui";
import Navigation from "../components/Navigation";

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

export const AccountsScreen: React.FC = () => {
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
    <>
      <Navigation />
      <div className="max-w-screen-xl mx-auto px-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800">
            {t("accounts.title")}
          </h1>
        </div>

        <div className="flex flex-col gap-8">
          {/* Account Selector */}
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-4">
              {accounts.map((account) => (
                <Card
                  key={account.id}
                  style={{
                    backgroundColor:
                      selectedAccountId === account.id ? "#4A9FE8" : undefined,
                    border: "1px solid #E2E8F0",
                    cursor: "pointer",
                  }}
                  onPress={() => setSelectedAccountId(account.id)}
                >
                  <div className="cursor-pointer transition-all flex flex-col gap-4 hover:opacity-90">
                    <div className="flex justify-between items-center">
                      <span
                        className={`text-base font-semibold m-0 ${
                          selectedAccountId === account.id
                            ? "text-white"
                            : "text-slate-800"
                        }`}
                      >
                        {t(`accounts.${account.type}`)}
                      </span>
                      <span
                        className={`text-sm ${
                          selectedAccountId === account.id
                            ? "text-white"
                            : "text-slate-600"
                        }`}
                      >
                        {account.accountNumber}
                      </span>
                    </div>
                    <div className="flex justify-end">
                      <span
                        className={`text-2xl font-bold ${
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
                      </span>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Transaction List */}
          <div className="flex flex-col gap-4">
            <h2 className="text-xl font-semibold text-slate-800 m-0">
              {t("accounts.accountTransactions")} -{" "}
              {selectedAccount && t(`accounts.${selectedAccount.type}`)}
            </h2>
            <Card>
              <div className="flex flex-col">
                {accountTransactions.length > 0 ? (
                  accountTransactions.map((transaction, index) => (
                    <div
                      key={transaction.id}
                      className={`flex justify-between items-center py-4 ${
                        index !== accountTransactions.length - 1
                          ? "border-b border-slate-100"
                          : ""
                      }`}
                    >
                      <div className="flex flex-col gap-1">
                        <span className="text-base font-medium text-slate-800">
                          {transaction.description}
                        </span>
                        <span className="text-sm text-slate-600">
                          {transaction.date}
                        </span>
                      </div>
                      <div className="flex flex-col items-end gap-1">
                        <span
                          className={`text-lg font-semibold ${
                            transaction.amount < 0
                              ? "text-red-500"
                              : "text-green-500"
                          }`}
                        >
                          {transaction.amount < 0 ? "-" : "+"}$
                          {Math.abs(transaction.amount).toFixed(2)}
                        </span>
                        <span
                          className={`text-xs px-2 py-1 rounded font-medium uppercase ${
                            transaction.status === "pending"
                              ? "bg-amber-100 text-amber-800"
                              : transaction.status === "completed"
                              ? "bg-emerald-100 text-emerald-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {t(`transactions.${transaction.status}`)}
                        </span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-12 text-center text-slate-600 text-base">
                    {t("transactions.noTransactions")}
                  </div>
                )}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default AccountsScreen;
