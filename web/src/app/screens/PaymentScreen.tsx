import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, Input, Card } from "@fbanking/ui";
import Navigation from "../components/Navigation";

interface Account {
  id: string;
  type: string;
  accountNumber: string;
  balance: number;
}

export const PaymentScreen: React.FC = () => {
  const { t } = useTranslation();
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [reference, setReference] = useState("");
  const [selectedAccount, setSelectedAccount] = useState("1");
  const [showSuccess, setShowSuccess] = useState(false);

  // Mock accounts data
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
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // TODO: Implement actual payment logic
    console.log("Creating payment:", {
      recipient,
      amount,
      reference,
      fromAccount: selectedAccount,
    });

    // Show success message
    setShowSuccess(true);

    // Reset form after 2 seconds
    setTimeout(() => {
      setRecipient("");
      setAmount("");
      setReference("");
      setSelectedAccount("");
      setShowSuccess(false);
    }, 2000);
  };

  return (
    <>
      <Navigation />
      <div className="max-w-screen-xl mx-auto px-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800 mb-2">
            {t("payments.title")}
          </h1>
        </div>

        {showSuccess && (
          <div className="bg-green-500 text-white p-4 rounded-lg mb-6 text-center font-medium">
            {t("payments.success")}
          </div>
        )}

        <div className="mb-8">
          <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-4 mb-2">
            {accounts.map((account) => (
              <Card
                key={account.id}
                style={{
                  backgroundColor:
                    selectedAccount === account.id ? "#4A9FE8" : undefined,
                  border: "1px solid #E2E8F0",
                  cursor: "pointer",
                }}
                onPress={() => setSelectedAccount(account.id)}
              >
                <div className="cursor-pointer transition-all flex flex-col gap-4 hover:opacity-90">
                  <div className="flex justify-between items-center">
                    <span
                      className={`text-base font-semibold m-0 ${
                        selectedAccount === account.id
                          ? "text-white"
                          : "text-slate-800"
                      }`}
                    >
                      {t(`accounts.${account.type}`)}
                    </span>
                    <span
                      className={`text-sm font-mono ${
                        selectedAccount === account.id
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
                        selectedAccount === account.id
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

        <Card>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-5 max-w-2xl mx-auto"
          >
            <Input
              label={t("payments.recipient")}
              type="text"
              value={recipient}
              onChangeText={setRecipient}
              placeholder={t("payments.recipientPlaceholder")}
              required
            />

            <Input
              label={t("payments.amount")}
              type="number"
              value={amount}
              onChangeText={setAmount}
              placeholder={t("payments.amountPlaceholder")}
              required
            />

            <Input
              label={t("payments.reference")}
              type="text"
              value={reference}
              onChangeText={setReference}
              placeholder={t("payments.referencePlaceholder")}
            />

            <div className="mt-2">
              <Button type="submit" variant="primary" size="large" fullWidth>
                {t("payments.createPayment")}
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </>
  );
};

export default PaymentScreen;
