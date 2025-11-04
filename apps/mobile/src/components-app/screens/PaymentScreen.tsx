import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Switch,
} from "react-native";
import { useTranslation } from "react-i18next";
import { Button, Input, Card } from "@fbanking/ui";
import SlideOutMenu from "../components/SlideOutMenu";

type Screen = "dashboard" | "accounts" | "payments" | "settings";

interface PaymentScreenProps {
  onNavigate?: (screen: Screen) => void;
}

interface Account {
  id: string;
  type: string;
  accountNumber: string;
  balance: number;
}

interface PreviousPayment {
  id: string;
  recipient: string;
  amount: string;
  reference: string;
  accountId: string;
  date: string;
}

export const PaymentScreen: React.FC<PaymentScreenProps> = ({ onNavigate }) => {
  const { t } = useTranslation();
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [reference, setReference] = useState("");
  const [selectedAccount, setSelectedAccount] = useState("1");
  const [showSuccess, setShowSuccess] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  // Standing payment fields
  const [isStandingPayment, setIsStandingPayment] = useState(false);
  const [frequency, setFrequency] = useState("monthly");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // Mock previous payments data
  const previousPayments: PreviousPayment[] = [
    {
      id: "1",
      recipient: "John Smith",
      amount: "150.00",
      reference: "Rent payment",
      accountId: "1",
      date: "2025-10-25",
    },
    {
      id: "2",
      recipient: "Electric Company",
      amount: "85.50",
      reference: "Monthly bill October",
      accountId: "1",
      date: "2025-10-20",
    },
    {
      id: "3",
      recipient: "Jane Doe",
      amount: "200.00",
      reference: "Birthday gift",
      accountId: "2",
      date: "2025-10-15",
    },
    {
      id: "4",
      recipient: "Grocery Store",
      amount: "125.30",
      reference: "Weekly groceries",
      accountId: "1",
      date: "2025-10-10",
    },
    {
      id: "5",
      recipient: "Internet Provider",
      amount: "59.99",
      reference: "Internet service November",
      accountId: "1",
      date: "2025-11-01",
    },
  ];

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

  // Filter previous payments based on search query
  const filteredPayments = previousPayments.filter((payment) => {
    const query = searchQuery.toLowerCase();
    return (
      payment.recipient.toLowerCase().includes(query) ||
      payment.reference.toLowerCase().includes(query) ||
      payment.amount.includes(query)
    );
  });

  // Handle selecting a previous payment
  const handleSelectPayment = (payment: PreviousPayment) => {
    setRecipient(payment.recipient);
    setAmount(payment.amount);
    setReference(payment.reference);
    setSelectedAccount(payment.accountId);
    setSearchQuery("");
    setShowDropdown(false);
  };

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
        <View className="flex-row justify-between items-start">
          <Text className="text-3xl font-bold text-slate-800">
            {t("payments.title")}
          </Text>
          <SlideOutMenu onNavigate={onNavigate || ((s) => console.log(s))} />
        </View>
      </View>

      {showSuccess && (
        <View className="bg-green-500 p-4 mx-6 mb-4 rounded-lg">
          <Text className="text-white text-center font-medium">
            {t("payments.success")}
          </Text>
        </View>
      )}

      <View className="gap-5 px-6">
        {/* Previous Payments Search */}
        <View className="mb-2">
          <View className="relative">
            <TextInput
              value={searchQuery}
              onChangeText={(text) => {
                setSearchQuery(text);
                setShowDropdown(text.length > 0);
              }}
              onFocus={() => searchQuery.length > 0 && setShowDropdown(true)}
              placeholder={t("payments.searchPreviousPayments")}
              className="w-full px-4 py-3 border border-slate-300 rounded-lg bg-white text-slate-800"
              placeholderTextColor="#94a3b8"
            />
            <View className="absolute right-3 top-3 pointer-events-none">
              <Text className="text-slate-400 text-base">⌕</Text>
            </View>
          </View>

          {/* Dropdown with search results */}
          {showDropdown && (
            <View className="mt-2 bg-white border border-slate-200 rounded-lg shadow-lg max-h-80">
              <ScrollView className="max-h-80">
                {filteredPayments.length > 0 ? (
                  filteredPayments.map((payment, index) => (
                    <TouchableOpacity
                      key={payment.id}
                      onPress={() => handleSelectPayment(payment)}
                      className={`px-4 py-3 ${
                        index < filteredPayments.length - 1
                          ? "border-b border-slate-100"
                          : ""
                      }`}
                    >
                      <View className="flex-row justify-between items-start">
                        <View className="flex-1">
                          <Text className="font-semibold text-slate-800">
                            {payment.recipient}
                          </Text>
                          <Text className="text-sm text-slate-500 mt-1">
                            {payment.reference}
                          </Text>
                        </View>
                        <View className="ml-4">
                          <Text className="font-semibold text-[#4A9FE8] text-right">
                            ${payment.amount}
                          </Text>
                          <Text className="text-xs text-slate-400 mt-1 text-right">
                            {new Date(payment.date).toLocaleDateString()}
                          </Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                  ))
                ) : (
                  <View className="px-4 py-6">
                    <Text className="text-center text-slate-500">
                      {t("payments.noResultsFound")}
                    </Text>
                  </View>
                )}
              </ScrollView>
            </View>
          )}
        </View>

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

        {/* Standing Payment Toggle */}
        <View className="flex-row justify-between items-center py-4 px-4 bg-slate-50 rounded-lg">
          <View className="flex-1 pr-4">
            <Text className="text-base font-medium text-slate-800">
              {t("payments.standingPayment")}
            </Text>
            <Text className="text-sm text-slate-500 mt-1">
              {t("payments.standingPaymentDescription")}
            </Text>
          </View>
          <Switch
            value={isStandingPayment}
            onValueChange={setIsStandingPayment}
            trackColor={{ false: "#cbd5e1", true: "#4A9FE8" }}
            thumbColor={isStandingPayment ? "#ffffff" : "#f4f3f4"}
          />
        </View>

        {/* Standing Payment Additional Fields */}
        {isStandingPayment && (
          <View className="gap-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <Text className="text-lg font-semibold text-slate-800">
              {t("payments.standingPaymentDetails")}
            </Text>

            <View>
              <Text className="text-sm font-medium text-slate-700 mb-2">
                {t("payments.frequency")}
              </Text>
              {/* Note: In production, this would be a Picker or modal with frequency options */}
              <View className="border border-slate-300 rounded-lg bg-white">
                <TouchableOpacity
                  className="px-4 py-3"
                  onPress={() => {
                    // TODO: Open frequency picker modal
                    // For now, cycling through options as a demo
                    const frequencies = [
                      "weekly",
                      "biweekly",
                      "monthly",
                      "quarterly",
                      "yearly",
                    ];
                    const currentIndex = frequencies.indexOf(frequency);
                    const nextIndex = (currentIndex + 1) % frequencies.length;
                    setFrequency(frequencies[nextIndex]);
                  }}
                >
                  <Text className="text-base text-slate-800 capitalize">
                    {t(`payments.${frequency}`)}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            <View>
              <Text className="text-sm font-medium text-slate-700 mb-2">
                {t("payments.startDate")}
              </Text>
              <TextInput
                value={startDate}
                onChangeText={setStartDate}
                placeholder="YYYY-MM-DD"
                className="w-full px-4 py-3 border border-slate-300 rounded-lg bg-white text-slate-800"
                placeholderTextColor="#94a3b8"
              />
            </View>

            <View>
              <Text className="text-sm font-medium text-slate-700 mb-2">
                {t("payments.endDate")} ({t("payments.optional")})
              </Text>
              <TextInput
                value={endDate}
                onChangeText={setEndDate}
                placeholder="YYYY-MM-DD"
                className="w-full px-4 py-3 border border-slate-300 rounded-lg bg-white text-slate-800"
                placeholderTextColor="#94a3b8"
              />
            </View>
          </View>
        )}

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
