import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { useTranslation } from "react-i18next";
import { Button, Input, Card } from "@fbanking/ui";

interface Account {
  id: string;
  type: string;
  accountNumber: string;
  balance: number;
}

export const PaymentScreen = () => {
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

  const handleSubmit = () => {
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
    <ScrollView className="flex-1 bg-slate-50">
      <View className="p-6 pb-4">
        <Text className="text-3xl font-bold text-slate-800">
          {t("payments.title")}
        </Text>
      </View>

      {showSuccess && (
        <View className="bg-green-500 p-4 mx-6 mb-4 rounded-lg">
          <Text className="text-white text-center font-medium">
            {t("payments.success")}
          </Text>
        </View>
      )}

      <View className="gap-5 px-6">
        <View className="mb-5">
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingRight: 24, gap: 12 }}
          >
            {accounts.map((account) => (
              <TouchableOpacity
                key={account.id}
                style={{ width: 240 }}
                onPress={() => setSelectedAccount(account.id)}
              >
                <Card
                  style={
                    selectedAccount === account.id
                      ? { backgroundColor: "#4A9FE8" }
                      : undefined
                  }
                >
                  <View className="gap-4">
                    <View className="flex-row justify-between items-center">
                      <Text
                        className={`text-base font-semibold ${
                          selectedAccount === account.id
                            ? "text-white"
                            : "text-slate-800"
                        }`}
                      >
                        {t(`accounts.${account.type}`)}
                      </Text>
                      <Text
                        className={`text-sm ${
                          selectedAccount === account.id
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
                        selectedAccount === account.id
                          ? "text-white"
                          : account.balance < 0
                          ? "text-red-500"
                          : "text-green-500"
                      }`}
                    >
                      ${account.balance.toFixed(2)}
                    </Text>
                  </View>
                </Card>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

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

        <View className="mt-2">
          <Button
            onPress={handleSubmit}
            variant="primary"
            size="large"
            fullWidth
          >
            {t("payments.createPayment")}
          </Button>
        </View>
      </View>
    </ScrollView>
  );
};

export default PaymentScreen;
