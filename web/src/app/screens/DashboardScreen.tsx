import React from "react";
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
}

export const DashboardScreen: React.FC = () => {
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
    <>
      <Navigation />
      <div className="max-w-screen-xl mx-auto px-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800">
            {t("dashboard.title")}
          </h1>
        </div>

        <div className="flex flex-col gap-8">
          <div className="bg-corporate-blue rounded-2xl p-8 text-white text-center">
            <div className="flex flex-col items-center">
              <p className="text-base text-white/90 m-0 mb-2">
                {t("dashboard.totalBalance")}
              </p>
              <h2 className="text-5xl font-bold text-white m-0">
                $
                {totalBalance.toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </h2>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-slate-800 m-0">
                {t("dashboard.accounts")}
              </h2>
              <button className="bg-transparent border-none text-corporate-blue text-sm font-medium cursor-pointer px-4 py-2 rounded-lg transition-colors hover:bg-blue-50">
                {t("dashboard.viewAll")}
              </button>
            </div>
            <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-4">
              {accounts.map((account) => (
                <Card key={account.id}>
                  <div className="cursor-pointer transition-all flex flex-col gap-4">
                    <div className="flex justify-between items-center">
                      <span className="text-base font-semibold text-slate-800 m-0">
                        {t(`accounts.${account.type}`)}
                      </span>
                      <span className="text-sm text-slate-600">
                        {account.accountNumber}
                      </span>
                    </div>
                    <div className="flex justify-end">
                      <span
                        className={`text-2xl font-bold ${
                          account.balance < 0
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

          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-slate-800 m-0">
                {t("dashboard.recentTransactions")}
              </h2>
              <button className="bg-transparent border-none text-corporate-blue text-sm font-medium cursor-pointer px-4 py-2 rounded-lg transition-colors hover:bg-blue-50">
                {t("dashboard.viewAll")}
              </button>
            </div>
            <Card>
              <div className="flex flex-col">
                {transactions.map((transaction) => (
                  <div
                    key={transaction.id}
                    className="flex justify-between items-center py-4"
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
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardScreen;
