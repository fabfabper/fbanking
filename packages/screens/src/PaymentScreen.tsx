import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  ScrollView,
  Platform,
  Pressable,
  Switch,
  ActivityIndicator,
} from "react-native";
import {
  YStack,
  XStack,
  Text,
  Card,
  Input,
  DateInput,
  Button,
  useAppTheme,
} from "@ebanking/ui";
import { formatCurrency } from "./utils/formatCurrency";
import {
  AccountCarousel,
  CARD_WIDTH,
  CARD_SPACING,
} from "./components/AccountCarousel";
import type { Account, Transaction, Payment } from "@ebanking/api";

const isWeb = Platform.OS === "web";

interface PaymentScreenProps {
  api: {
    accounts: {
      getAccounts: () => Promise<Account[]>;
    };
    transactions: {
      searchTransactions: (
        query: string,
        filters?: any
      ) => Promise<{ data: Transaction[] }>;
    };
    payments: {
      getPayments: () => Promise<Payment[]>;
    };
  };
}

export const PaymentScreen: React.FC<PaymentScreenProps> = ({ api }) => {
  const { t } = useTranslation();
  const { theme } = useAppTheme();
  const [selectedAccountIndex, setSelectedAccountIndex] = useState(0);
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearchResults, setShowSearchResults] = useState(false);

  // Address fields
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("");

  // API state
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Search results state
  const [searchResults, setSearchResults] = useState<(Transaction | Payment)[]>(
    []
  );
  const [searchLoading, setSearchLoading] = useState(false);

  // Standing payment fields
  const [isStandingPayment, setIsStandingPayment] = useState(false);
  const [frequency, setFrequency] = useState("monthly");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [executionDay, setExecutionDay] = useState("");

  // Fetch accounts from API
  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await api.accounts.getAccounts();
        setAccounts(data);
      } catch (err) {
        console.error("Failed to fetch accounts:", err);
        setError(
          err instanceof Error ? err.message : "Failed to fetch accounts"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchAccounts();
  }, [api]);

  // Search transactions and payments when search query changes
  useEffect(() => {
    const searchPayments = async () => {
      if (!searchQuery.trim()) {
        setSearchResults([]);
        setShowSearchResults(false);
        return;
      }

      try {
        setSearchLoading(true);

        // Search using the API endpoint
        const response = await api.transactions.searchTransactions(searchQuery);

        console.log("Search API response:", response);

        // Handle different response formats:
        // 1. Paginated: { data: [...] }
        // 2. Direct array: [...]
        // 3. Single object: {...}
        let results = [];

        if (response?.data && Array.isArray(response.data)) {
          // Paginated response
          results = response.data;
        } else if (Array.isArray(response)) {
          // Direct array
          results = response;
        } else if (response && typeof response === "object") {
          // Single object - wrap in array
          results = [response];
        }

        console.log("Search results:", results);
        console.log("Search results length:", results.length);

        setSearchResults(results);
        setShowSearchResults(true);
      } catch (err) {
        console.error("Failed to search payments:", err);
        setSearchResults([]);
      } finally {
        setSearchLoading(false);
      }
    };

    // Debounce search
    const timeoutId = setTimeout(searchPayments, 300);
    return () => clearTimeout(timeoutId);
  }, [searchQuery, api]);

  const selectedAccount = accounts[selectedAccountIndex];

  const handleScroll = (event: any) => {
    const scrollX = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollX / (CARD_WIDTH + CARD_SPACING));
    if (
      index !== selectedAccountIndex &&
      index >= 0 &&
      index < accounts.length
    ) {
      setSelectedAccountIndex(index);
    }
  };

  const handleSearchChange = (text: string) => {
    setSearchQuery(text);
  };

  const selectPreviousPayment = (item: Transaction | Payment) => {
    console.log("Selected item:", item);

    // Check if it's a Payment (has recipient object with name/iban)
    // or a Transaction (has recipient string and description)
    if (
      "recipient" in item &&
      item.recipient &&
      typeof item.recipient === "object"
    ) {
      // It's a Payment with recipient object
      const payment = item as Payment;
      setRecipient(payment.recipient.name);
      setAmount(payment.amount.toString());
      setNote(payment.description);
    } else {
      // It's a Transaction with recipient string
      const transaction = item as Transaction;
      // Use recipient field if available, otherwise fall back to description
      setRecipient(transaction.recipient || transaction.description);
      setAmount(Math.abs(transaction.amount).toString());
      setNote(transaction.description || transaction.category || "");
    }
    setSearchQuery("");
    setShowSearchResults(false);
  };

  const handleSend = () => {
    if (isStandingPayment) {
      console.log("Set up standing payment:", {
        fromAccount: selectedAccount,
        recipient,
        amount,
        note,
        frequency,
        startDate,
        endDate,
        executionDay,
      });
    } else {
      console.log("Send payment:", {
        fromAccount: selectedAccount,
        recipient,
        amount,
        note,
      });
    }
  };

  return (
    <YStack flex={1} backgroundColor="$backgroundGray" paddingTop="$4">
      <ScrollView showsVerticalScrollIndicator={false}>
        <YStack paddingBottom="$8">
          {/* Search Field */}
          <YStack paddingHorizontal="$6" paddingBottom="$4" zIndex={1000}>
            <YStack gap="$2" position="relative">
              <Text
                size="md"
                weight="semibold"
                style={{ color: theme.colors.textPrimary }}
              >
                {t("payment.searchPrevious")}
              </Text>
              <Input
                value={searchQuery}
                onChangeText={handleSearchChange}
                placeholder={t("payment.searchPlaceholder")}
                fullWidth
                onFocus={() =>
                  setShowSearchResults(searchQuery.trim().length > 0)
                }
              />

              {/* Search Results Dropdown */}
              {showSearchResults && (
                <YStack
                  style={{
                    position: "absolute",
                    top: "100%",
                    left: 0,
                    right: 0,
                    marginTop: 4,
                    backgroundColor: theme.colors.cardBg,
                    borderRadius: 8,
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 4 },
                    shadowOpacity: 0.15,
                    shadowRadius: 12,
                    elevation: 8,
                    maxHeight: 300,
                    zIndex: 1000,
                  }}
                >
                  {(() => {
                    console.log("Rendering search dropdown");
                    console.log("searchLoading:", searchLoading);
                    console.log("searchResults.length:", searchResults.length);
                    console.log("searchResults:", searchResults);
                    return null;
                  })()}
                  {searchLoading ? (
                    <YStack padding="$4" alignItems="center">
                      <ActivityIndicator
                        size="small"
                        color={theme.colors.primary}
                      />
                      <Text
                        size="sm"
                        style={{
                          color: theme.colors.textSecondary,
                          marginTop: 8,
                        }}
                      >
                        {t("common.searching")}
                      </Text>
                    </YStack>
                  ) : searchResults.length === 0 ? (
                    <YStack padding="$4" alignItems="center">
                      <Text
                        size="sm"
                        style={{ color: theme.colors.textSecondary }}
                      >
                        {t("payment.noSearchResults")}
                      </Text>
                    </YStack>
                  ) : (
                    <ScrollView style={{ maxHeight: 300 }}>
                      {searchResults.map((item) => {
                        const isPayment = "recipient" in item && item.recipient;
                        const transaction = item as Transaction;
                        const payment = item as Payment;

                        // Extract display values
                        const displayName = isPayment
                          ? payment.recipient?.name || payment.description
                          : transaction.description;
                        const displayAmount = isPayment
                          ? payment.amount
                          : Math.abs(transaction.amount);
                        const displayDate = isPayment
                          ? new Date(payment.createdAt).toLocaleDateString()
                          : new Date(transaction.date).toLocaleDateString();
                        const displayNote = isPayment
                          ? payment.description
                          : transaction.category || "";
                        const displayAccount = isPayment
                          ? payment.recipient?.iban
                            ? `${payment.recipient.iban.slice(-4)}`
                            : ""
                          : transaction.accountId;

                        return (
                          <Pressable
                            key={item.id}
                            onPress={() => selectPreviousPayment(item)}
                          >
                            <YStack
                              padding="$3"
                              borderBottomWidth={1}
                              borderBottomColor="$border"
                              style={{
                                backgroundColor: theme.colors.cardBg,
                              }}
                              hoverStyle={{
                                backgroundColor: theme.colors.backgroundGray,
                              }}
                            >
                              <XStack
                                justifyContent="space-between"
                                alignItems="center"
                              >
                                <YStack gap="$1" flex={1}>
                                  <Text size="md" weight="semibold">
                                    {displayName}
                                  </Text>
                                  <Text
                                    size="sm"
                                    style={{
                                      color: theme.colors.textSecondary,
                                    }}
                                  >
                                    {displayAccount && `****${displayAccount}`}
                                    {displayAccount && displayDate && " • "}
                                    {displayDate}
                                  </Text>
                                  {displayNote && (
                                    <Text
                                      size="xs"
                                      style={{
                                        color: theme.colors.textSecondary,
                                        fontStyle: "italic",
                                      }}
                                    >
                                      "{displayNote}"
                                    </Text>
                                  )}
                                </YStack>
                                <Text
                                  size="lg"
                                  weight="bold"
                                  style={{ color: theme.colors.primary }}
                                >
                                  {formatCurrency(displayAmount)}
                                </Text>
                              </XStack>
                            </YStack>
                          </Pressable>
                        );
                      })}
                    </ScrollView>
                  )}
                </YStack>
              )}
            </YStack>
          </YStack>

          {/* Account Cards Carousel */}
          <YStack marginBottom="$4">
            {/* Loading State */}
            {loading && (
              <YStack alignItems="center" justifyContent="center" padding="$8">
                <ActivityIndicator size="large" color={theme.colors.primary} />
                <Text
                  size="sm"
                  style={{ color: theme.colors.textSecondary, marginTop: 12 }}
                >
                  {t("common.loading")}...
                </Text>
              </YStack>
            )}

            {/* Error State */}
            {error && !loading && (
              <YStack padding="$6" alignItems="center">
                <Card
                  style={{
                    backgroundColor: theme.colors.errorLight,
                    padding: 16,
                    width: "100%",
                  }}
                >
                  <YStack gap="$3" alignItems="center">
                    <Text
                      size="md"
                      weight="semibold"
                      style={{ color: theme.colors.error }}
                    >
                      {t("common.error")}
                    </Text>
                    <Text
                      size="sm"
                      style={{
                        color: theme.colors.textPrimary,
                        textAlign: "center",
                      }}
                    >
                      {error}
                    </Text>
                    <Button
                      variant="outline"
                      size="sm"
                      onPress={() => {
                        setError(null);
                        setLoading(true);
                        api.accounts
                          .getAccounts()
                          .then(setAccounts)
                          .catch((err) => setError(err.message))
                          .finally(() => setLoading(false));
                      }}
                    >
                      {t("common.retry")}
                    </Button>
                  </YStack>
                </Card>
              </YStack>
            )}

            {/* Account Cards */}
            {!loading && !error && accounts.length > 0 && (
              <AccountCarousel
                accounts={accounts}
                selectedAccountIndex={selectedAccountIndex}
                onAccountSelect={setSelectedAccountIndex}
                onMomentumScrollEnd={handleScroll}
              />
            )}

            {/* Empty State */}
            {!loading && !error && accounts.length === 0 && (
              <YStack padding="$6" alignItems="center">
                <Card style={{ padding: 16, width: "100%" }}>
                  <YStack gap="$2" alignItems="center">
                    <Text
                      size="md"
                      weight="semibold"
                      style={{ color: theme.colors.textPrimary }}
                    >
                      {t("accounts.noAccounts")}
                    </Text>
                    <Text
                      size="sm"
                      style={{
                        color: theme.colors.textSecondary,
                        textAlign: "center",
                      }}
                    >
                      {t("accounts.noAccountsDescription")}
                    </Text>
                  </YStack>
                </Card>
              </YStack>
            )}
          </YStack>

          {/* Payment Form Card */}
          <YStack paddingHorizontal="$6" paddingTop="$2">
            <Card
              style={{
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.1,
                shadowRadius: 8,
                elevation: 3,
              }}
            >
              <YStack gap="$5" padding="$4">
                <Text size="xl" weight="bold" style={{ marginBottom: 4 }}>
                  {t("payment.paymentDetails")}
                </Text>

                <YStack gap="$2">
                  <Input
                    value={recipient}
                    onChangeText={setRecipient}
                    placeholder={t("payment.recipientPlaceholder")}
                    fullWidth
                  />
                </YStack>

                <YStack gap="$2">
                  <Input
                    value={amount}
                    onChangeText={setAmount}
                    placeholder={t("payment.amountPlaceholder")}
                    keyboardType="numeric"
                    fullWidth
                  />
                </YStack>

                <YStack gap="$2">
                  <Input
                    value={note}
                    onChangeText={setNote}
                    placeholder={t("payment.notePlaceholder")}
                    fullWidth
                  />
                </YStack>

                {/* Address Fields */}
                <YStack gap="$2">
                  <Input
                    value={street}
                    onChangeText={setStreet}
                    placeholder={t("payment.streetPlaceholder")}
                    fullWidth
                  />
                </YStack>

                {isWeb ? (
                  <XStack gap="$3">
                    <YStack gap="$2" flex={1}>
                      <Input
                        value={postalCode}
                        onChangeText={setPostalCode}
                        placeholder={t("payment.postalCodePlaceholder")}
                        fullWidth
                      />
                    </YStack>
                    <YStack gap="$2" flex={1}>
                      <Input
                        value={city}
                        onChangeText={setCity}
                        placeholder={t("payment.cityPlaceholder")}
                        fullWidth
                      />
                    </YStack>
                  </XStack>
                ) : (
                  <>
                    <YStack gap="$2">
                      <Input
                        value={postalCode}
                        onChangeText={setPostalCode}
                        placeholder={t("payment.postalCodePlaceholder")}
                        fullWidth
                      />
                    </YStack>
                    <YStack gap="$2">
                      <Input
                        value={city}
                        onChangeText={setCity}
                        placeholder={t("payment.cityPlaceholder")}
                        fullWidth
                      />
                    </YStack>
                  </>
                )}

                <YStack gap="$2">
                  <Input
                    value={country}
                    onChangeText={setCountry}
                    placeholder={t("payment.countryPlaceholder")}
                    fullWidth
                  />
                </YStack>

                {/* Standing Payment Toggle */}
                <XStack
                  justifyContent="space-between"
                  alignItems="center"
                  paddingVertical="$2"
                  borderTopWidth={1}
                  borderTopColor="$border"
                  marginTop="$2"
                >
                  <YStack gap="$1">
                    <Text
                      size="md"
                      weight="semibold"
                      style={{ color: theme.colors.textPrimary }}
                    >
                      {t("payment.standingPayment")}
                    </Text>
                    <Text
                      size="sm"
                      style={{ color: theme.colors.textSecondary }}
                    >
                      {t("payment.recurringPayment")}
                    </Text>
                  </YStack>
                  <Switch
                    value={isStandingPayment}
                    onValueChange={setIsStandingPayment}
                    trackColor={{
                      false: "#E5E7EB",
                      true: theme.colors.primary,
                    }}
                    thumbColor="#FFFFFF"
                  />
                </XStack>

                {/* Standing Payment Fields */}
                {isStandingPayment && (
                  <YStack
                    gap="$4"
                    paddingTop="$3"
                    borderTopWidth={1}
                    borderTopColor="$border"
                    marginTop="$2"
                  >
                    <YStack gap="$2">
                      <Text
                        size="md"
                        weight="semibold"
                        style={{ color: theme.colors.textPrimary }}
                      >
                        {t("payment.frequency")}
                      </Text>
                      <XStack gap="$2" flexWrap="wrap">
                        {["weekly", "monthly", "quarterly", "yearly"].map(
                          (freq) => (
                            <Button
                              key={freq}
                              variant={
                                frequency === freq ? "primary" : "outline"
                              }
                              size="sm"
                              onPress={() => setFrequency(freq)}
                              style={{ flex: 1, minWidth: 100 }}
                            >
                              {t(
                                `payment.frequency${
                                  freq.charAt(0).toUpperCase() + freq.slice(1)
                                }`
                              )}
                            </Button>
                          )
                        )}
                      </XStack>
                    </YStack>

                    {/* Date Fields Side by Side */}
                    <YStack gap="$2">
                      <Text
                        size="md"
                        weight="semibold"
                        style={{ color: theme.colors.textPrimary }}
                      >
                        {t("payment.paymentPeriod")}
                      </Text>
                      <XStack gap="$3">
                        <YStack gap="$2" flex={1}>
                          <Text
                            size="sm"
                            style={{ color: theme.colors.textSecondary }}
                          >
                            {t("payment.startDate")}
                          </Text>
                          <DateInput
                            value={startDate}
                            onChange={setStartDate}
                            placeholder="YYYY-MM-DD"
                          />
                        </YStack>

                        <YStack gap="$2" flex={1}>
                          <Text
                            size="sm"
                            style={{ color: theme.colors.textSecondary }}
                          >
                            {t("payment.endDate")}
                          </Text>
                          <DateInput
                            value={endDate}
                            onChange={setEndDate}
                            placeholder="YYYY-MM-DD"
                          />
                        </YStack>
                      </XStack>
                      <Text
                        size="xs"
                        style={{
                          color: theme.colors.textSecondary,
                          marginTop: 4,
                        }}
                      >
                        {t("payment.endDateHint")}
                      </Text>
                    </YStack>

                    <YStack gap="$2">
                      <Text
                        size="md"
                        weight="semibold"
                        style={{ color: theme.colors.textPrimary }}
                      >
                        {t("payment.executionDay")}
                      </Text>
                      <Input
                        value={executionDay}
                        onChangeText={setExecutionDay}
                        placeholder={t(
                          `payment.executionDayPlaceholder.${frequency}`
                        )}
                        fullWidth
                      />
                      <Text
                        size="xs"
                        style={{
                          color: theme.colors.textSecondary,
                          marginTop: 4,
                        }}
                      >
                        {t(`payment.executionDayHint.${frequency}`)}
                      </Text>
                    </YStack>
                  </YStack>
                )}

                <Button
                  onPress={handleSend}
                  fullWidth
                  size="lg"
                  style={{ marginTop: 8 }}
                >
                  {isStandingPayment
                    ? t("payment.setupStandingPayment")
                    : t("payment.sendPayment")}
                </Button>
              </YStack>
            </Card>
          </YStack>
        </YStack>
      </ScrollView>
    </YStack>
  );
};
