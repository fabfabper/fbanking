import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, TouchableOpacity, Switch } from "react-native";
import { useTranslation } from "react-i18next";
import { useAuth } from "../contexts/AuthContext";
import SlideOutMenu from "../components/SlideOutMenu";
import { registerForPushNotifications } from "../services/notificationService";

type Screen = "dashboard" | "accounts" | "payments" | "settings";

interface SettingsScreenProps {
  onNavigate?: (screen: Screen) => void;
}

export const SettingsScreen: React.FC<SettingsScreenProps> = ({
  onNavigate,
}) => {
  const { t, i18n } = useTranslation();
  const { user } = useAuth();
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState(i18n.language);

  // Check if notifications are already enabled (this is a mock for mobile)
  useEffect(() => {
    // In a real app, you'd check the actual notification permission status
    setNotificationsEnabled(false);
  }, []);

  const handleNotificationToggle = async (value: boolean) => {
    if (!value) {
      // User wants to disable - show info
      alert(
        t("settings.disableNotificationsInfo") ||
          "To disable notifications, please go to your device settings"
      );
      return;
    }

    // User wants to enable notifications
    setIsProcessing(true);
    try {
      const token = await registerForPushNotifications();
      if (token) {
        setNotificationsEnabled(true);
        alert(
          t("settings.notificationsEnabledSuccess") ||
            "Notifications enabled successfully!"
        );
      } else {
        alert(
          t("settings.notificationsEnabledError") ||
            "Failed to enable notifications"
        );
      }
    } catch (error) {
      console.error("Error enabling notifications:", error);
      alert(
        t("settings.notificationsEnabledError") ||
          "Error enabling notifications"
      );
    } finally {
      setIsProcessing(false);
    }
  };

  const handleBackToDashboard = () => {
    if (onNavigate) {
      onNavigate("dashboard");
    }
  };

  const handleLanguageChange = (language: string) => {
    i18n.changeLanguage(language);
    setCurrentLanguage(language);
  };

  return (
    <ScrollView className="flex-1 bg-slate-50">
      <View className="p-6 pb-4">
        <View className="flex-row justify-between items-start">
          <View className="flex-1">
            <TouchableOpacity
              onPress={handleBackToDashboard}
              className="flex-row items-center mb-2"
            >
              <Text className="text-corporate-blue text-base mr-2">←</Text>
              <Text className="text-corporate-blue text-base">
                {t("common.back")}
              </Text>
            </TouchableOpacity>
            <Text className="text-3xl font-bold text-slate-800">
              {t("settings.title")}
            </Text>
            {user && (
              <Text className="text-sm text-slate-500 mt-1">{user.email}</Text>
            )}
          </View>
          <SlideOutMenu onNavigate={onNavigate || ((s) => console.log(s))} />
        </View>
      </View>

      <View className="bg-white mx-6 rounded-lg shadow-sm mb-6">
        {/* Notifications Section */}
        <View className="p-6 border-b border-slate-200">
          <Text className="text-xl font-semibold text-slate-800 mb-4">
            {t("settings.notifications")}
          </Text>

          <View className="flex-row justify-between items-center py-3">
            <View className="flex-1 pr-4">
              <Text className="text-base font-medium text-slate-800">
                {t("settings.pushNotifications")}
              </Text>
              <Text className="text-sm text-slate-500 mt-1">
                {t("settings.pushNotificationsDescription")}
              </Text>
            </View>

            <Switch
              value={notificationsEnabled}
              onValueChange={handleNotificationToggle}
              disabled={isProcessing}
              trackColor={{ false: "#cbd5e1", true: "#4A9FE8" }}
              thumbColor={notificationsEnabled ? "#ffffff" : "#f4f3f4"}
            />
          </View>

          {notificationsEnabled && (
            <View className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
              <Text className="text-sm text-green-800">
                Push notifications are enabled. Check the console for your
                token.
              </Text>
            </View>
          )}

          {!notificationsEnabled && (
            <View className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <Text className="text-sm text-blue-800">
                Enable push notifications to receive payment alerts and account
                updates.
              </Text>
            </View>
          )}
        </View>

        {/* Language Section */}
        <View className="p-6 border-b border-slate-200">
          <Text className="text-xl font-semibold text-slate-800 mb-4">
            {t("settings.language")}
          </Text>

          <View className="flex-row gap-3">
            <TouchableOpacity
              onPress={() => handleLanguageChange("en")}
              className={`flex-1 py-3 px-4 rounded-lg items-center ${
                currentLanguage === "en" ? "bg-corporate-blue" : "bg-slate-100"
              }`}
            >
              <Text
                className={`text-base font-medium ${
                  currentLanguage === "en" ? "text-white" : "text-slate-700"
                }`}
              >
                English
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => handleLanguageChange("de")}
              className={`flex-1 py-3 px-4 rounded-lg items-center ${
                currentLanguage === "de" ? "bg-corporate-blue" : "bg-slate-100"
              }`}
            >
              <Text
                className={`text-base font-medium ${
                  currentLanguage === "de" ? "text-white" : "text-slate-700"
                }`}
              >
                Deutsch
              </Text>
            </TouchableOpacity>
          </View>

          <Text className="text-sm text-slate-500 mt-4">
            {t("settings.selectLanguage")}
          </Text>
        </View>

        {/* Account Section (placeholder) */}
        <View className="p-6 border-b border-slate-200">
          <Text className="text-xl font-semibold text-slate-800 mb-4">
            {t("settings.account")}
          </Text>
          <Text className="text-sm text-slate-500">
            Account settings coming soon...
          </Text>
        </View>

        {/* Privacy Section (placeholder) */}
        <View className="p-6">
          <Text className="text-xl font-semibold text-slate-800 mb-4">
            {t("settings.privacy")}
          </Text>
          <Text className="text-sm text-slate-500">
            Privacy settings coming soon...
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default SettingsScreen;
