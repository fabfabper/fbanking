import React from "react";
import { useTranslation } from "react-i18next";
import { ScrollView, Switch, Platform } from "react-native";
import { YStack, XStack, Text, Card, Button, useAppTheme } from "@ebanking/ui";

const isWeb = Platform.OS === "web";

interface SettingsScreenProps {
  darkMode?: boolean;
  onToggleDarkMode?: (value: boolean) => void;
}

export const SettingsScreen: React.FC<SettingsScreenProps> = ({ darkMode = false, onToggleDarkMode }) => {
  const { t, i18n } = useTranslation();
  const { theme } = useAppTheme();
  const currentLanguage = i18n.language;

  const handleLanguageChange = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  return (
    <YStack flex={1} backgroundColor="$backgroundGray" paddingTop="$4">
      <ScrollView showsVerticalScrollIndicator={false}>
        <YStack paddingHorizontal="$6" gap="$6" paddingBottom="$8">
          {/* Language Settings */}
          <Card
            style={{
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 4,
              elevation: 2,
            }}
          >
            <YStack gap="$4" padding="$4">
              <YStack gap="$1">
                <Text size="lg" weight="bold">
                  {t("settings.language.title")}
                </Text>
                <Text size="sm" style={{ color: theme.colors.textSecondary }}>
                  {t("settings.language.description")}
                </Text>
              </YStack>

              <XStack gap="$3" flexWrap="wrap">
                <Button
                  variant={currentLanguage === "en" ? "primary" : "outline"}
                  size="md"
                  onPress={() => handleLanguageChange("en")}
                  style={{ flex: 1, minWidth: 120 }}
                  radius="pill"
                >
                  English
                </Button>
                <Button
                  variant={currentLanguage === "de" ? "primary" : "outline"}
                  size="md"
                  onPress={() => handleLanguageChange("de")}
                  style={{ flex: 1, minWidth: 120 }}
                  radius="pill"
                >
                  Deutsch
                </Button>
              </XStack>
            </YStack>
          </Card>

          {/* Appearance Settings */}
          <Card
            style={{
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 4,
              elevation: 2,
            }}
          >
            <YStack gap="$4" padding="$4">
              <YStack gap="$1">
                <Text size="lg" weight="bold">
                  {t("settings.appearance.title")}
                </Text>
                <Text size="sm" style={{ color: theme.colors.textSecondary }}>
                  {t("settings.appearance.description")}
                </Text>
              </YStack>

              <XStack justifyContent="space-between" alignItems="center" paddingVertical="$2">
                <YStack gap="$1">
                  <Text size="md" weight="semibold">
                    {t("settings.appearance.darkMode")}
                  </Text>
                  <Text size="sm" style={{ color: theme.colors.textSecondary }}>
                    {darkMode ? t("settings.appearance.darkModeEnabled") : t("settings.appearance.lightModeEnabled")}
                  </Text>
                </YStack>
                <Switch
                  value={darkMode}
                  onValueChange={(value) => onToggleDarkMode?.(value)}
                  trackColor={{
                    false: "#E5E7EB",
                    true: theme.colors.primary,
                  }}
                  thumbColor="#FFFFFF"
                />
              </XStack>
            </YStack>
          </Card>

          {/* Security Settings - Placeholder */}
          <Card
            style={{
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 4,
              elevation: 2,
            }}
          >
            <YStack gap="$4" padding="$4">
              <YStack gap="$1">
                <Text size="lg" weight="bold">
                  {t("settings.security.title")}
                </Text>
                <Text size="sm" style={{ color: theme.colors.textSecondary }}>
                  {t("settings.security.description")}
                </Text>
              </YStack>

              <YStack gap="$3">
                <XStack justifyContent="space-between" alignItems="center" paddingVertical="$2">
                  <Text size="md" weight="medium">
                    {t("settings.security.changePassword")}
                  </Text>
                  <Button variant="outline" size="sm" disabled radius="pill">
                    {t("common.edit")}
                  </Button>
                </XStack>

                <XStack
                  justifyContent="space-between"
                  alignItems="center"
                  paddingVertical="$2"
                  borderTopWidth={1}
                  borderTopColor="$border"
                >
                  <Text size="md" weight="medium">
                    {t("settings.security.twoFactor")}
                  </Text>
                  <Switch
                    value={false}
                    disabled
                    trackColor={{
                      false: "#E5E7EB",
                      true: theme.colors.primary,
                    }}
                    thumbColor="#FFFFFF"
                  />
                </XStack>
              </YStack>
            </YStack>
          </Card>

          {/* Notifications Settings - Placeholder */}
          <Card
            style={{
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 4,
              elevation: 2,
            }}
          >
            <YStack gap="$4" padding="$4">
              <YStack gap="$1">
                <Text size="lg" weight="bold">
                  {t("settings.notifications.title")}
                </Text>
                <Text size="sm" style={{ color: theme.colors.textSecondary }}>
                  {t("settings.notifications.description")}
                </Text>
              </YStack>

              <YStack gap="$3">
                <XStack justifyContent="space-between" alignItems="center" paddingVertical="$2">
                  <Text size="md" weight="medium">
                    {t("settings.notifications.email")}
                  </Text>
                  <Switch
                    value={true}
                    disabled
                    trackColor={{
                      false: "#E5E7EB",
                      true: theme.colors.primary,
                    }}
                    thumbColor="#FFFFFF"
                  />
                </XStack>

                <XStack
                  justifyContent="space-between"
                  alignItems="center"
                  paddingVertical="$2"
                  borderTopWidth={1}
                  borderTopColor="$border"
                >
                  <Text size="md" weight="medium">
                    {t("settings.notifications.push")}
                  </Text>
                  <Switch
                    value={false}
                    disabled
                    trackColor={{
                      false: "#E5E7EB",
                      true: theme.colors.primary,
                    }}
                    thumbColor="#FFFFFF"
                  />
                </XStack>
              </YStack>
            </YStack>
          </Card>

          {/* About - Placeholder */}
          <Card
            style={{
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 4,
              elevation: 2,
            }}
          >
            <YStack gap="$4" padding="$4">
              <YStack gap="$1">
                <Text size="lg" weight="bold">
                  {t("settings.about.title")}
                </Text>
              </YStack>

              <YStack gap="$3">
                <XStack justifyContent="space-between" paddingVertical="$2">
                  <Text size="md" style={{ color: theme.colors.textSecondary }}>
                    {t("settings.about.version")}
                  </Text>
                  <Text size="md" weight="medium">
                    1.0.0
                  </Text>
                </XStack>

                <XStack justifyContent="space-between" paddingVertical="$2" borderTopWidth={1} borderTopColor="$border">
                  <Text size="md" style={{ color: theme.colors.textSecondary }}>
                    {t("settings.about.buildNumber")}
                  </Text>
                  <Text size="md" weight="medium">
                    2025.11.04
                  </Text>
                </XStack>
              </YStack>
            </YStack>
          </Card>
        </YStack>
      </ScrollView>
    </YStack>
  );
};
