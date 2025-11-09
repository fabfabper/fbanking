import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Platform, ActivityIndicator } from "react-native";
import { YStack, XStack, Text, Button, Input, Card, useAppTheme } from "@ebanking/ui";
import { ScanFace, Fingerprint, Eye, Lock } from "lucide-react-native";
import { useBiometricAuth } from "./hooks/useBiometricAuth";

interface LoginScreenProps {
  onLogin: () => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
  const { t } = useTranslation();
  const { theme } = useAppTheme();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const { isAvailable, biometricType, authenticate, isChecking } = useBiometricAuth();

  const handleLogin = () => {
    console.log("Login:", { email, password });
    onLogin();
  };

  const handleBiometricLogin = async () => {
    setIsAuthenticating(true);
    try {
      const result = await authenticate();
      if (result.success) {
        onLogin();
      } else {
        console.log("Biometric authentication failed:", result.error);

        // Show helpful message for Expo Go users
        if (result.error === "missing_usage_description") {
          console.warn(
            "Face ID requires a custom development build. " +
              "To test Face ID:\n" +
              "1. Create an Apple Developer account ($99/year)\n" +
              "2. Run: eas build --profile development --platform ios\n" +
              "3. Install the development build on your device\n\n" +
              "For now, use username/password login in Expo Go."
          );
        }
      }
    } catch (error) {
      console.error("Biometric authentication error:", error);
    } finally {
      setIsAuthenticating(false);
    }
  };

  const getBiometricIcon = () => {
    const iconProps = { size: 20, color: theme.colors.primary };
    if (biometricType === "facial") return <ScanFace {...iconProps} />;
    if (biometricType === "fingerprint") return <Fingerprint {...iconProps} />;
    if (biometricType === "iris") return <Eye {...iconProps} />;
    return <Lock {...iconProps} />;
  };

  const getBiometricLabel = () => {
    if (biometricType === "facial") return t("auth.useFaceID");
    if (biometricType === "fingerprint") return t("auth.useTouchID");
    if (biometricType === "iris") return t("auth.useIrisScanner");
    return t("auth.useBiometric");
  };

  return (
    <YStack flex={1} backgroundColor="$backgroundGray" alignItems="center" justifyContent="center" padding="$6">
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
            <Text
              size="3xl"
              style={{
                color: theme.colors.textWhite,
                fontFamily: "Inter",
                fontWeight: "bold",
                letterSpacing: 2,
                fontSize: 32,
              }}
            >
              fp.
            </Text>
          </YStack>
          <YStack alignItems="center" gap="$1">
            <Text size="3xl" weight="bold" style={{ color: theme.colors.primary }}>
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
              <Text size="sm" weight="semibold" style={{ color: theme.colors.textPrimary }}>
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
                <Text size="sm" weight="semibold" style={{ color: theme.colors.textPrimary }}>
                  {t("common.password")}
                </Text>
                <Text size="sm" style={{ color: theme.colors.primary }} onPress={() => console.log("Forgot password")}>
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

            {/* Biometric Login Button */}
            {isAvailable && Platform.OS !== "web" && (
              <>
                <YStack alignItems="center" paddingVertical="$2">
                  <Text size="sm" style={{ color: theme.colors.textSecondary }}>
                    {t("common.or")}
                  </Text>
                </YStack>
                <Button
                  variant="outline"
                  onPress={handleBiometricLogin}
                  fullWidth
                  size="lg"
                  disabled={isAuthenticating}
                >
                  {isAuthenticating ? (
                    <XStack gap="$2" alignItems="center">
                      <ActivityIndicator size="small" color={theme.colors.primary} />
                      <Text size="md">{t("auth.authenticating")}</Text>
                    </XStack>
                  ) : (
                    <XStack gap="$2" alignItems="center">
                      {getBiometricIcon()}
                      <Text size="md">{getBiometricLabel()}</Text>
                    </XStack>
                  )}
                </Button>
              </>
            )}
          </YStack>
        </Card>

        {/* Footer */}
        <YStack alignItems="center" gap="$2">
          <Text size="xs" style={{ color: theme.colors.textSecondary, opacity: 0.7 }}>
            {t("auth.termsAgreement")}
          </Text>
        </YStack>
      </YStack>
    </YStack>
  );
};
