import React from "react";
import { useTranslation } from "react-i18next";
import { Modal, Pressable, ScrollView, Animated } from "react-native";
import { YStack, XStack, Text, Button, useAppTheme } from "@ebanking/ui";
import { Home, Wallet, Send, Settings, X, LogOut } from "lucide-react-native";

interface DrawerProps {
  visible: boolean;
  onClose: () => void;
  onNavigate: (screen: string) => void;
  onLogout: () => void;
  currentScreen?: string;
}

export const Drawer: React.FC<DrawerProps> = ({
  visible,
  onClose,
  onNavigate,
  onLogout,
  currentScreen = "dashboard",
}) => {
  const { t } = useTranslation();
  const { theme } = useAppTheme();
  const slideAnim = React.useRef(new Animated.Value(280)).current;

  React.useEffect(() => {
    if (visible) {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: 280,
        duration: 250,
        useNativeDriver: true,
      }).start();
    }
  }, [visible, slideAnim]);

  const menuItems = [
    { key: "dashboard", label: t("nav.dashboard"), icon: Home },
    { key: "accounts", label: t("nav.accounts"), icon: Wallet },
    { key: "payment", label: t("nav.payment"), icon: Send },
    { key: "settings", label: t("nav.settings"), icon: Settings },
  ];

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      {/* Backdrop */}
      <Pressable
        style={{
          flex: 1,
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        }}
        onPress={onClose}
      >
        {/* Drawer */}
        <Animated.View
          style={{
            position: "absolute",
            right: 0,
            top: 0,
            bottom: 0,
            width: 280,
            backgroundColor: theme.colors.cardBg,
            shadowColor: "#000",
            shadowOffset: { width: -2, height: 0 },
            shadowOpacity: 0.25,
            shadowRadius: 8,
            elevation: 5,
            transform: [{ translateX: slideAnim }],
          }}
        >
          <Pressable style={{ flex: 1 }} onPress={(e) => e.stopPropagation()}>
            <YStack flex={1}>
              {/* Header */}
              <XStack
                backgroundColor={theme.colors.primary}
                padding="$4"
                paddingTop="$8"
                justifyContent="space-between"
                alignItems="center"
              >
                <Text
                  size="xl"
                  weight="bold"
                  style={{ color: theme.colors.textWhite }}
                >
                  {t("auth.title")}
                </Text>
                <Pressable onPress={onClose}>
                  <X
                    size={28}
                    color={theme.colors.textWhite}
                  />
                </Pressable>
              </XStack>

              {/* Menu Items */}
              <ScrollView style={{ flex: 1 }}>
                <YStack padding="$4" gap="$2">
                  {menuItems.map((item) => (
                    <Pressable
                      key={item.key}
                      onPress={() => {
                        onNavigate(item.key);
                        onClose();
                      }}
                    >
                      <XStack
                        padding="$4"
                        gap="$3"
                        alignItems="center"
                        style={{
                          backgroundColor:
                            currentScreen === item.key
                              ? theme.colors.backgroundGray
                              : "transparent",
                          borderRadius: 8,
                        }}
                      >
                        <item.icon
                          size={24}
                          color={
                            currentScreen === item.key
                              ? theme.colors.primary
                              : theme.colors.textSecondary
                          }
                        />
                        <Text
                          size="md"
                          weight={
                            currentScreen === item.key ? "bold" : "medium"
                          }
                          style={{
                            color:
                              currentScreen === item.key
                                ? theme.colors.primary
                                : theme.colors.textPrimary,
                          }}
                        >
                          {item.label}
                        </Text>
                      </XStack>
                    </Pressable>
                  ))}
                </YStack>
              </ScrollView>

              {/* Logout Button */}
              <YStack
                padding="$4"
                borderTopWidth={1}
                borderTopColor="$border"
                style={{ backgroundColor: theme.colors.cardBg }}
              >
                <Button
                  variant="outline"
                  size="lg"
                  onPress={() => {
                    onLogout();
                    onClose();
                  }}
                  style={{
                    borderColor: theme.colors.error,
                  }}
                >
                  <XStack gap="$2" alignItems="center">
                    <LogOut
                      size={20}
                      color={theme.colors.error}
                    />
                    <Text
                      size="md"
                      weight="semibold"
                      style={{ color: theme.colors.error }}
                    >
                      {t("common.logout")}
                    </Text>
                  </XStack>
                </Button>
              </YStack>
            </YStack>
          </Pressable>
        </Animated.View>
      </Pressable>
    </Modal>
  );
};
