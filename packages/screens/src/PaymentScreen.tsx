import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  ScrollView,
  Dimensions,
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
import type { Account } from "@ebanking/api";

const { width: screenWidth } = Dimensions.get("window");
const isWeb = Platform.OS === "web";
const CARD_WIDTH = isWeb
  ? Math.min(280, screenWidth * 0.25)
  : screenWidth * 0.7;
const CARD_HEIGHT = 150;
const CARD_SPACING = 12;

interface PaymentScreenProps {
  api: {
    accounts: {
      getAccounts: () => Promise<Account[]>;
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

  // API state
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
        setError(err instanceof Error ? err.message : "Failed to fetch accounts");
      } finally {
        setLoading(false);
      }
    };

    fetchAccounts();
  }, [api]);

  // Previous payments data
  const previousPayments = [
    {
      id: 1,
      recipient: "John Smith",
      account: "****3456",
      amount: "150.00",
      note: "Rent share",
      date: "2025-11-01",
    },
    {
      id: 2,
      recipient: "Sarah Johnson",
      account: "****7890",
      amount: "45.50",
      note: "Dinner split",
      date: "2025-10-28",
    },
    {
      id: 3,
      recipient: "Mike Davis",
      account: "****2345",
      amount: "200.00",
      note: "Loan repayment",
      date: "2025-10-25",
    },
    {
      id: 4,
      recipient: "Electric Company",
      account: "****5555",
      amount: "120.00",
      note: "Monthly bill",
      date: "2025-10-20",
    },
    {
      id: 5,
      recipient: "Internet Provider",
      account: "****6666",
      amount: "75.00",
      note: "Internet service",
      date: "2025-10-15",
    },
  ];

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

  // Filter previous payments based on search query
  const filteredPayments = searchQuery.trim()
    ? previousPayments.filter(
        (payment) =>
          payment.recipient.toLowerCase().includes(searchQuery.toLowerCase()) ||
          payment.account.includes(searchQuery) ||
          payment.note.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const handleSearchChange = (text: string) => {
    setSearchQuery(text);
    setShowSearchResults(text.trim().length > 0);
  };

  const selectPreviousPayment = (payment: (typeof previousPayments)[0]) => {
    setRecipient(payment.recipient);
    setAmount(payment.amount);
    setNote(payment.note);
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
              {showSearchResults && filteredPayments.length > 0 && (
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
                  <ScrollView style={{ maxHeight: 300 }}>
                    {filteredPayments.map((payment) => (
                      <Pressable
                        key={payment.id}
                        onPress={() => selectPreviousPayment(payment)}
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
                                {payment.recipient}
                              </Text>
                              <Text
                                size="sm"
                                style={{ color: theme.colors.textSecondary }}
                              >
                                {payment.account} • {payment.date}
                              </Text>
                              {payment.note && (
                                <Text
                                  size="xs"
                                  style={{
                                    color: theme.colors.textSecondary,
                                    fontStyle: "italic",
                                  }}
                                >
                                  "{payment.note}"
                                </Text>
                              )}
                            </YStack>
                            <Text
                              size="lg"
                              weight="bold"
                              style={{ color: theme.colors.primary }}
                            >
                              {formatCurrency(parseFloat(payment.amount))}
                            </Text>
                          </XStack>
                        </YStack>
                      </Pressable>
                    ))}
                  </ScrollView>
                </YStack>
              )}
            </YStack>
          </YStack>

          {/* Account Cards Carousel */}
          <YStack marginBottom="$4">
            <YStack paddingHorizontal="$6" marginBottom="$2">
              <Text
                size="md"
                weight="semibold"
                style={{ color: theme.colors.textPrimary }}
              >
                {t("payment.fromAccount")}
              </Text>
            </YStack>

            {/* Loading State */}
            {loading && (
              <YStack
                alignItems="center"
                justifyContent="center"
                padding="$8"
              >
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
                      style={{ color: theme.colors.textPrimary, textAlign: "center" }}
                    >
                      {error}
                    </Text>
                    <Button
                      variant="outline"
                      size="sm"
                      onPress={() => {
                        setError(null);
                        setLoading(true);
                        api.accounts.getAccounts()
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
              <ScrollView
                horizontal
                pagingEnabled={false}
                showsHorizontalScrollIndicator={false}
                decelerationRate="fast"
                snapToInterval={isWeb ? undefined : CARD_WIDTH + CARD_SPACING}
                snapToAlignment={isWeb ? undefined : "center"}
                contentContainerStyle={{
                  paddingHorizontal: isWeb ? 24 : (screenWidth - CARD_WIDTH) / 2,
                  paddingVertical: 8,
                  paddingBottom: 12,
                }}
                onMomentumScrollEnd={isWeb ? undefined : handleScroll}
              >
                {accounts.map((account, index) => {
                  const isSelected = index === selectedAccountIndex;
                  const cardBgColor = isSelected
                    ? theme.colors.primary
                    : theme.colors.cardUnselected;
                  const textColor = isSelected
                    ? theme.colors.textWhite
                    : theme.colors.cardUnselectedText;
                  const textSecondaryColor = isSelected
                    ? theme.colors.textWhite
                    : theme.colors.cardUnselectedSecondary;

                  return (
                    <Pressable
                      key={account.id}
                      onPress={() => setSelectedAccountIndex(index)}
                    >
                      <Card
                        hoverable
                        style={{
                          width: CARD_WIDTH,
                          height: CARD_HEIGHT,
                          marginRight: CARD_SPACING,
                          backgroundColor: cardBgColor,
                          opacity: isSelected ? 1 : 0.75,
                          transform: [{ scale: isSelected ? 1 : 0.96 }],
                          shadowColor: "#000",
                          shadowOffset: { width: 0, height: 4 },
                          shadowOpacity: isSelected ? 0.15 : 0.08,
                          shadowRadius: 8,
                          elevation: isSelected ? 4 : 2,
                        }}
                      >
                        <YStack
                          gap="$2"
                          padding="$3"
                          justifyContent="space-between"
                          flex={1}
                        >
                          <YStack gap="$1">
                            <Text
                              size="xs"
                              weight="medium"
                              style={{
                                color: textSecondaryColor,
                                opacity: isSelected ? 0.9 : 1,
                                letterSpacing: 1.2,
                              }}
                            >
                              {account.accountType.toUpperCase()}
                            </Text>
                            <Text
                              size="lg"
                              weight="bold"
                              style={{ color: textColor }}
                            >
                              {account.name}
                            </Text>
                          </YStack>

                          <YStack gap="$1">
                            <Text
                              size="xs"
                              style={{
                                color: textSecondaryColor,
                                opacity: isSelected ? 0.9 : 1,
                              }}
                            >
                              {account.accountNumber.slice(-4).padStart(8, '*')}
                            </Text>
                            <Text
                              size="2xl"
                              weight="bold"
                              style={{ color: textColor, marginTop: 2 }}
                            >
                              {formatCurrency(account.balance)}
                            </Text>
                          </YStack>
                        </YStack>
                      </Card>
                    </Pressable>
                  );
                })}
              </ScrollView>
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
                      style={{ color: theme.colors.textSecondary, textAlign: "center" }}
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
                  <Text
                    size="md"
                    weight="semibold"
                    style={{ color: theme.colors.textPrimary }}
                  >
                    {t("payment.recipient")}
                  </Text>
                  <Input
                    value={recipient}
                    onChangeText={setRecipient}
                    placeholder={t("payment.recipientPlaceholder")}
                    fullWidth
                  />
                </YStack>

                <YStack gap="$2">
                  <Text
                    size="md"
                    weight="semibold"
                    style={{ color: theme.colors.textPrimary }}
                  >
                    {t("payment.amount")}
                  </Text>
                  <Input
                    value={amount}
                    onChangeText={setAmount}
                    placeholder={t("payment.amountPlaceholder")}
                    keyboardType="numeric"
                    fullWidth
                  />
                </YStack>

                <YStack gap="$2">
                  <Text
                    size="md"
                    weight="semibold"
                    style={{ color: theme.colors.textPrimary }}
                  >
                    {t("payment.note")}
                  </Text>
                  <Input
                    value={note}
                    onChangeText={setNote}
                    placeholder={t("payment.notePlaceholder")}
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
