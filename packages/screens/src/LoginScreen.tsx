import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  YStack,
  XStack,
  Text,
  Button,
  Input,
  Card,
  useAppTheme,
} from "@ebanking/ui";

interface LoginScreenProps {
  onLogin: () => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
  const { t } = useTranslation();
  const { theme } = useAppTheme();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    console.log("Login:", { email, password });
    onLogin();
  };

  return (
    <YStack
      flex={1}
      backgroundColor="$backgroundGray"
      alignItems="center"
      justifyContent="center"
      padding="$6"
    >
      <YStack width="100%" maxWidth={440} gap="$8">
        {/* Header */}
        <YStack alignItems="center" gap="$3">
          <YStack
            width={80}
            height={80}
            backgroundColor="$primary"
            borderRadius={40}
            alignItems="center"
            justifyContent="center"
            style={{
              shadowColor: theme.colors.primary,
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.3,
              shadowRadius: 12,
              elevation: 8,
            }}
          >
            <Text size="3xl" style={{ color: theme.colors.textWhite }}>
              💳
            </Text>
          </YStack>
          <YStack alignItems="center" gap="$1">
            <Text
              size="3xl"
              weight="bold"
              style={{ color: theme.colors.primary }}
            >
              {t("auth.title")}
            </Text>
            <Text size="md" style={{ color: theme.colors.textSecondary }}>
              {t("auth.welcomeBack")}
            </Text>
          </YStack>
        </YStack>

        {/* Login Form */}
        <Card
          style={{
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 8 },
            shadowOpacity: 0.12,
            shadowRadius: 16,
            elevation: 5,
          }}
        >
          <YStack gap="$5" padding="$5">
            <YStack gap="$2">
              <Text
                size="sm"
                weight="semibold"
                style={{ color: theme.colors.textPrimary }}
              >
                {t("common.email")}
              </Text>
              <Input
                value={email}
                onChangeText={setEmail}
                placeholder={t("auth.emailPlaceholder")}
                keyboardType="email-address"
                autoCapitalize="none"
                fullWidth
              />
            </YStack>

            <YStack gap="$2">
              <XStack justifyContent="space-between" alignItems="center">
                <Text
                  size="sm"
                  weight="semibold"
                  style={{ color: theme.colors.textPrimary }}
                >
                  {t("common.password")}
                </Text>
                <Text
                  size="sm"
                  style={{ color: theme.colors.primary }}
                  onPress={() => console.log("Forgot password")}
                >
                  {t("auth.forgotPassword")}
                </Text>
              </XStack>
              <Input
                value={password}
                onChangeText={setPassword}
                placeholder={t("auth.passwordPlaceholder")}
                secureTextEntry
                fullWidth
              />
            </YStack>

            <Button
              onPress={handleLogin}
              fullWidth
              size="lg"
              style={{
                marginTop: 8,
                shadowColor: theme.colors.primary,
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.2,
                shadowRadius: 8,
                elevation: 3,
              }}
            >
              {t("common.signIn")}
            </Button>
          </YStack>
        </Card>

        {/* Footer */}
        <YStack alignItems="center" gap="$2">
          <Text
            size="xs"
            style={{ color: theme.colors.textSecondary, opacity: 0.7 }}
          >
            {t("auth.termsAgreement")}
          </Text>
        </YStack>
      </YStack>
    </YStack>
  );
};
