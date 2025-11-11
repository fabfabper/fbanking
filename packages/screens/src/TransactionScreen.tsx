import React from "react";
import { useTranslation } from "react-i18next";
import { Platform, Share } from "react-native";
import { YStack, XStack, Text, Card, Button, useAppTheme } from "@ebanking/ui";
import type { Transaction } from "@ebanking/api";
import { Copy, Share2, FileDown, X } from "lucide-react-native";

interface TransactionScreenProps {
  transaction: Transaction;
  onClose?: () => void;
}

export const TransactionScreen: React.FC<TransactionScreenProps> = ({ transaction, onClose }) => {
  const { t } = useTranslation();
  const { theme } = useAppTheme();
  const isWeb = Platform.OS === "web";

  if (!transaction) {
    return (
      <YStack flex={1} alignItems="center" justifyContent="center" padding="$8">
        <Text size="xl" style={{ color: theme.colors.error }}>
          {t("transaction.notFound")}
        </Text>
        {onClose && (
          <Button onPress={onClose} style={{ marginTop: 16 }}>
            {t("common.close")}
          </Button>
        )}
      </YStack>
    );
  }

  // Actions
  const handleCopy = () => {
    if (isWeb) {
      navigator.clipboard.writeText(JSON.stringify(transaction, null, 2));
    } else {
      // For mobile, use Clipboard API if available
      // Clipboard.setString(JSON.stringify(transaction, null, 2));
    }
  };

  const handleShare = () => {
    if (!isWeb) {
      Share.share({
        message: JSON.stringify(transaction, null, 2),
      });
    }
  };

  const handleDownloadPDF = () => {
    // Placeholder for PDF download logic
    // Could use jsPDF or similar for web, or react-native-pdf for mobile
    alert("Download PDF not implemented");
  };

  return (
    <YStack flex={1} alignItems="center" justifyContent="center" padding="$4" position="relative">
      {/* Header */}
      <XStack justifyContent="flex-end" alignItems="center" width="100%" maxWidth={400} marginBottom={16}>
        <Button onPress={onClose} variant="ghost" size="sm" radius="pill">
          <X size={20} />
        </Button>
      </XStack>
      {/* Card with fields */}
      <Card style={{ width: "100%", maxWidth: 400, padding: 24, marginBottom: 80 }}>
        <YStack gap="$2">
          <Text size="xl" weight="bold" style={{ marginBottom: 8 }}>
            {t("transaction.details")}
          </Text>
          <YStack gap="$2">
            <XStack justifyContent="space-between" alignItems="center">
              <Text size="md" style={{ color: theme.colors.textSecondary }}>
                {t("transaction.amount")}
              </Text>
              <Text size="md" weight="semibold">
                {transaction.amount}
              </Text>
            </XStack>
            <XStack justifyContent="space-between" alignItems="center">
              <Text size="md" style={{ color: theme.colors.textSecondary }}>
                {t("transaction.date")}
              </Text>
              <Text size="md" weight="semibold">
                {new Date(transaction.date).toLocaleDateString()}
              </Text>
            </XStack>
            <XStack justifyContent="space-between" alignItems="center">
              <Text size="md" style={{ color: theme.colors.textSecondary }}>
                {t("transaction.recipient")}
              </Text>
              <Text size="md" weight="semibold">
                {transaction.recipient}
              </Text>
            </XStack>
            <XStack justifyContent="space-between" alignItems="center">
              <Text size="md" style={{ color: theme.colors.textSecondary }}>
                {t("transaction.description")}
              </Text>
              <Text size="md" weight="semibold">
                {transaction.description}
              </Text>
            </XStack>
            {transaction.category && (
              <XStack justifyContent="space-between" alignItems="center">
                <Text size="md" style={{ color: theme.colors.textSecondary }}>
                  {t("transaction.category")}
                </Text>
                <Text size="md" weight="semibold">
                  {transaction.category}
                </Text>
              </XStack>
            )}
            {transaction.iban && (
              <XStack justifyContent="space-between" alignItems="center">
                <Text size="md" style={{ color: theme.colors.textSecondary }}>
                  IBAN
                </Text>
                <Text size="md" weight="semibold">
                  {transaction.iban}
                </Text>
              </XStack>
            )}
          </YStack>
        </YStack>
      </Card>
      {/* Actions at bottom */}
      <YStack
        gap="$3"
        alignItems="center"
        justifyContent="center"
        style={{ position: "absolute", bottom: 24, left: 0, right: 0, pointerEvents: "auto" }}
      >
        <XStack gap="$2" justifyContent="center">
          <Button onPress={handleDownloadPDF} variant="outline" size="md" radius="pill">
            <FileDown size={16} stroke={theme.colors.primary} />
          </Button>
          <Button onPress={handleCopy} variant="outline" size="md" radius="pill">
            <Copy size={16} stroke={theme.colors.primary} />
          </Button>
          {!isWeb && (
            <Button onPress={handleShare} variant="outline" size="md" radius="pill">
              <Share2 size={16} stroke={theme.colors.primary} />
            </Button>
          )}
        </XStack>
      </YStack>
    </YStack>
  );
};
