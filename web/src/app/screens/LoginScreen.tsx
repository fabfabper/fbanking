import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { YStack, XStack, Text, Button, Input, Card } from "@fbanking/ui";
import { useAuth } from "../contexts/AuthContext";

export const LoginScreen: React.FC = () => {
  const { t } = useTranslation();
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("fabian");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    setError("");
    setLoading(true);

    try {
      const success = await login(email, password);
      if (success) {
        navigate("/dashboard");
      } else {
        setError("Invalid email or password");
      }
    } catch {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <YStack
      flex={1}
      minHeight="100vh"
      alignItems="center"
      justifyContent="center"
      backgroundColor="$primary"
      padding="$6"
    >
      <YStack width="100%" maxWidth={480} gap="$6">
        {/* Header */}
        <YStack alignItems="center" gap="$2">
          <Text size="3xl" weight="bold" color="white">
            {t("auth.welcomeBack")}
          </Text>
          <Text size="base" color="white" opacity={0.9}>
            {t("auth.signInDescription")}
          </Text>
        </YStack>

        {/* Login Form */}
        <Card>
          <YStack gap="$5">
            {/* Email Input */}
            <YStack gap="$2">
              <Text size="sm" weight="medium">
                {t("common.email")}
              </Text>
              <Input
                value={email}
                onChangeText={setEmail}
                placeholder={t("auth.emailPlaceholder")}
                autoCapitalize="none"
                keyboardType="email-address"
                fullWidth
              />
            </YStack>

            {/* Password Input */}
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

            {/* Error Message */}
            {error && (
              <YStack backgroundColor="#FEE2E2" padding="$3" borderRadius="$2">
                <Text color="error" size="sm">
                  {error}
                </Text>
              </YStack>
            )}

            {/* Remember Me & Forgot Password */}
            <XStack justifyContent="space-between" alignItems="center">
              <XStack
                gap="$2"
                alignItems="center"
                cursor="pointer"
                onPress={() => setRememberMe(!rememberMe)}
              >
                <YStack
                  width={20}
                  height={20}
                  borderWidth={2}
                  borderColor={rememberMe ? "$primary" : "$gray8"}
                  backgroundColor={rememberMe ? "$primary" : "transparent"}
                  borderRadius="$1"
                  alignItems="center"
                  justifyContent="center"
                >
                  {rememberMe && (
                    <Text color="white" size="xs" lineHeight={20}>
                      ✓
                    </Text>
                  )}
                </YStack>
                <Text size="sm" color="secondary">
                  {t("auth.rememberMe")}
                </Text>
              </XStack>

              <Text
                size="sm"
                color="primary"
                cursor="pointer"
                hoverStyle={{ textDecorationLine: "underline" }}
              >
                {t("auth.forgotPassword")}
              </Text>
            </XStack>

            {/* Login Button */}
            <Button
              onPress={handleLogin}
              disabled={loading || !email || !password}
              fullWidth
              size="lg"
            >
              {loading ? t("common.loading") : t("auth.signIn")}
            </Button>
          </YStack>
        </Card>
      </YStack>
    </YStack>
  );
};

export default LoginScreen;
