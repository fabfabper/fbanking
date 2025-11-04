import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  Animated,
  Dimensions,
  TouchableWithoutFeedback,
} from "react-native";
import { useTranslation } from "react-i18next";
import { useAuth } from "../contexts/AuthContext";
import { Ionicons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");
const MENU_WIDTH = width * 0.75; // 75% of screen width

type Screen = "dashboard" | "accounts" | "payments" | "settings";

interface SlideOutMenuProps {
  onNavigate: (screen: Screen) => void;
}

export const SlideOutMenu: React.FC<SlideOutMenuProps> = ({ onNavigate }) => {
  const { t } = useTranslation();
  const { logout, user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const slideAnim = useRef(new Animated.Value(MENU_WIDTH)).current;

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: isOpen ? 0 : MENU_WIDTH,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [isOpen, slideAnim]);

  const openMenu = () => setIsOpen(true);
  const closeMenu = () => setIsOpen(false);

  const handleNavigate = (screen: Screen) => {
    closeMenu();
    setTimeout(() => {
      onNavigate(screen);
    }, 300);
  };

  const handleLogout = () => {
    closeMenu();
    setTimeout(() => {
      logout();
    }, 300);
  };

  return (
    <>
      {/* Hamburger Menu Button */}
      <TouchableOpacity
        onPress={openMenu}
        className="p-2"
        accessibilityLabel="Open menu"
      >
        <Ionicons name="menu-outline" size={28} color="#1e293b" />
      </TouchableOpacity>

      {/* Slide Out Menu Modal */}
      <Modal
        visible={isOpen}
        transparent
        animationType="fade"
        onRequestClose={closeMenu}
      >
        <View className="flex-1 flex-row">
          {/* Overlay */}
          <TouchableWithoutFeedback onPress={closeMenu}>
            <View className="flex-1 bg-black/50" />
          </TouchableWithoutFeedback>

          {/* Menu Content */}
          <Animated.View
            style={{
              transform: [{ translateX: slideAnim }],
              width: MENU_WIDTH,
              position: "absolute",
              right: 0,
              top: 0,
              bottom: 0,
            }}
            className="bg-white"
          >
            <View className="flex-1">
              {/* Header */}
              <View className="bg-corporate-blue p-6 pt-12">
                <Text className="text-2xl font-bold text-white mb-2">
                  FBanking
                </Text>
                {user && (
                  <Text className="text-sm text-white/90">{user.email}</Text>
                )}
              </View>

              {/* Menu Items */}
              <View className="flex-1 py-4">
                <TouchableOpacity
                  onPress={() => handleNavigate("dashboard")}
                  className="px-6 py-4 border-b border-slate-100"
                >
                  <View className="flex-row items-center gap-4">
                    <Ionicons name="grid-outline" size={24} color="#64748B" />
                    <Text className="text-base font-medium text-slate-800">
                      {t("navigation.dashboard")}
                    </Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => handleNavigate("accounts")}
                  className="px-6 py-4 border-b border-slate-100"
                >
                  <View className="flex-row items-center gap-4">
                    <Ionicons name="card-outline" size={24} color="#64748B" />
                    <Text className="text-base font-medium text-slate-800">
                      {t("navigation.accounts")}
                    </Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => handleNavigate("payments")}
                  className="px-6 py-4 border-b border-slate-100"
                >
                  <View className="flex-row items-center gap-4">
                    <Ionicons
                      name="swap-horizontal-outline"
                      size={24}
                      color="#64748B"
                    />
                    <Text className="text-base font-medium text-slate-800">
                      {t("navigation.payments")}
                    </Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => handleNavigate("settings")}
                  className="px-6 py-4 border-b border-slate-100"
                >
                  <View className="flex-row items-center gap-4">
                    <Ionicons
                      name="settings-outline"
                      size={24}
                      color="#64748B"
                    />
                    <Text className="text-base font-medium text-slate-800">
                      {t("navigation.settings")}
                    </Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={handleLogout}
                  className="px-6 py-4 border-b border-slate-100"
                >
                  <View className="flex-row items-center gap-4">
                    <Ionicons
                      name="log-out-outline"
                      size={24}
                      color="#dc2626"
                    />
                    <Text className="text-base font-medium text-red-600">
                      {t("common.signOut")}
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>

              {/* Footer */}
              <View className="p-6 border-t border-slate-200">
                <Text className="text-xs text-slate-400 text-center">
                  FBanking v1.0.0
                </Text>
              </View>
            </View>
          </Animated.View>
        </View>
      </Modal>
    </>
  );
};

export default SlideOutMenu;
