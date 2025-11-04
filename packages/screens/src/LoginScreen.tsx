import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { YStack, Text, Button, Input, Card } from "@ebanking/ui";

interface LoginScreenProps {
  onLogin: () => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
  const { t } = useTranslation();
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
      <YStack width="100%" maxWidth={400} gap="$6">
        {/* Header */}
        <YStack alignItems="center">
          <Text size="3xl" weight="bold" color="primary">
            {t("auth.title")}
          </Text>
        </YStack>

        {/* Login Form */}
        <Card>
          <YStack gap="$4">
            <YStack gap="$2">
              <Text size="sm" weight="medium">
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
              <Text size="sm" weight="medium">
                {t("common.password")}
              </Text>
              <Input
                value={password}
                onChangeText={setPassword}
                placeholder={t("auth.passwordPlaceholder")}
                secureTextEntry
                fullWidth
              />
            </YStack>

            <Button onPress={handleLogin} fullWidth size="lg">
              {t("common.signIn")}
            </Button>
          </YStack>
        </Card>
      </YStack>
    </YStack>
  );
};
