import React, { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Button, Input, Card } from "@fbanking/ui";
import Navigation from "../components/Navigation";

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

export const PaymentScreen: React.FC = () => {
  const { t } = useTranslation();
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [reference, setReference] = useState("");
  const [selectedAccount, setSelectedAccount] = useState("1");
  const [showSuccess, setShowSuccess] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

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

  // Handle clicking outside the dropdown to close it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle selecting a previous payment
  const handleSelectPayment = (payment: PreviousPayment) => {
    setRecipient(payment.recipient);
    setAmount(payment.amount);
    setReference(payment.reference);
    setSelectedAccount(payment.accountId);
    setSearchQuery("");
    setShowDropdown(false);
  };

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

        {/* Previous Payments Search */}
        <div className="mb-6 relative" ref={searchRef}>
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setShowDropdown(e.target.value.length > 0);
              }}
              onFocus={() => searchQuery.length > 0 && setShowDropdown(true)}
              placeholder={t("payments.searchPreviousPayments")}
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-corporate-blue focus:border-transparent"
            />
            <svg
              className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>

          {/* Dropdown with search results */}
          {showDropdown && (
            <div className="absolute z-10 w-full mt-2 bg-white border border-slate-200 rounded-lg shadow-lg max-h-80 overflow-y-auto">
              {filteredPayments.length > 0 ? (
                filteredPayments.map((payment) => (
                  <button
                    key={payment.id}
                    type="button"
                    onClick={() => handleSelectPayment(payment)}
                    className="w-full px-4 py-3 text-left hover:bg-slate-50 border-b border-slate-100 last:border-b-0 transition-colors"
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="font-semibold text-slate-800">
                          {payment.recipient}
                        </div>
                        <div className="text-sm text-slate-500 mt-1">
                          {payment.reference}
                        </div>
                      </div>
                      <div className="text-right ml-4">
                        <div className="font-semibold text-corporate-blue">
                          ${payment.amount}
                        </div>
                        <div className="text-xs text-slate-400 mt-1">
                          {new Date(payment.date).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  </button>
                ))
              ) : (
                <div className="px-4 py-6 text-center text-slate-500">
                  {t("payments.noResultsFound")}
                </div>
              )}
            </div>
          )}
        </div>

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

            {/* Standing Payment Toggle */}
            <div className="flex items-center justify-between py-3 px-4 bg-slate-50 rounded-lg">
              <div className="flex-1">
                <label
                  htmlFor="standingPayment"
                  className="text-base font-medium text-slate-800 cursor-pointer"
                >
                  {t("payments.standingPayment")}
                </label>
                <p className="text-sm text-slate-500 mt-1">
                  {t("payments.standingPaymentDescription")}
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  id="standingPayment"
                  type="checkbox"
                  checked={isStandingPayment}
                  onChange={(e) => setIsStandingPayment(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-corporate-blue"></div>
              </label>
            </div>

            {/* Standing Payment Additional Fields */}
            {isStandingPayment && (
              <div className="flex flex-col gap-5 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h3 className="text-lg font-semibold text-slate-800">
                  {t("payments.standingPaymentDetails")}
                </h3>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    {t("payments.frequency")}
                  </label>
                  <select
                    value={frequency}
                    onChange={(e) => setFrequency(e.target.value)}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-corporate-blue focus:border-transparent"
                    required={isStandingPayment}
                  >
                    <option value="weekly">{t("payments.weekly")}</option>
                    <option value="biweekly">{t("payments.biweekly")}</option>
                    <option value="monthly">{t("payments.monthly")}</option>
                    <option value="quarterly">{t("payments.quarterly")}</option>
                    <option value="yearly">{t("payments.yearly")}</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    {t("payments.startDate")}
                  </label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-corporate-blue focus:border-transparent"
                    required={isStandingPayment}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    {t("payments.endDate")} {t("payments.optional")}
                  </label>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-corporate-blue focus:border-transparent"
                  />
                </div>
              </div>
            )}

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
