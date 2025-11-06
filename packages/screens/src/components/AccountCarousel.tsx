import React from "react";
import { ScrollView, Dimensions, Platform, Pressable } from "react-native";
import { YStack, Text, Card, useAppTheme } from "@ebanking/ui";
import { formatCurrency } from "../utils/formatCurrency";
import type { Account } from "@ebanking/api";
import { useTranslation } from "react-i18next";

const { width: screenWidth } = Dimensions.get("window");
const isWeb = Platform.OS === "web";

export const CARD_WIDTH = isWeb
  ? Math.min(280, screenWidth * 0.25)
  : screenWidth * 0.7;
export const CARD_HEIGHT = 150;
export const CARD_SPACING = 12;

interface AccountCarouselProps {
  accounts: Account[];
  selectedAccountIndex: number;
  onAccountSelect: (index: number) => void;
  onMomentumScrollEnd?: (event: any) => void;
}

export const AccountCarousel: React.FC<AccountCarouselProps> = ({
  accounts,
  selectedAccountIndex,
  onAccountSelect,
  onMomentumScrollEnd,
}) => {
  const { theme } = useAppTheme();
  const { t } = useTranslation();

  return (
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
      onMomentumScrollEnd={isWeb ? undefined : onMomentumScrollEnd}
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
          <Pressable key={account.id} onPress={() => onAccountSelect(index)}>
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
                  <Text size="lg" weight="bold" style={{ color: textColor }}>
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
                    {t("accounts.currentBalance") || "Current Balance"}
                  </Text>
                  <Text
                    size="xl"
                    weight="bold"
                    style={{ color: textColor, letterSpacing: -0.5 }}
                  >
                    {formatCurrency(account.balance)}
                  </Text>
                </YStack>

                <Text
                  size="xs"
                  style={{
                    color: textSecondaryColor,
                    opacity: isSelected ? 0.8 : 0.7,
                    fontFamily: Platform.OS === "ios" ? "Courier" : "monospace",
                  }}
                >
                  {account.accountNumber}
                </Text>
              </YStack>
            </Card>
          </Pressable>
        );
      })}
    </ScrollView>
  );
};
