import React, { useState } from "react";
import { View, Text, ScrollView } from "react-native";
import { useTranslation } from "react-i18next";
import { Button, Input, Card } from "@fbanking/ui";
import { useAuth } from "../contexts/AuthContext";

export const LoginScreen = () => {
  const { t } = useTranslation();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    await login(email, password);
  };

  return (
    <ScrollView
      className="flex-1 bg-corporate-blue"
      contentContainerStyle={{
        flexGrow: 1,
        padding: 24,
        justifyContent: "center",
      }}
    >
      <View className="items-center mb-8">
        <Text className="text-3xl font-bold text-white mb-2">
          {t("auth.welcomeBack")}
        </Text>
        <Text className="text-base text-white/90">
          {t("auth.signInDescription")}
        </Text>
      </View>

      <Card>
        <View className="gap-5">
          <Input
            label={t("common.email")}
            type="email"
            value={email}
            onChangeText={setEmail}
            placeholder={t("auth.emailPlaceholder")}
            required
          />

          <Input
            label={t("common.password")}
            type="password"
            value={password}
            onChangeText={setPassword}
            placeholder={t("auth.passwordPlaceholder")}
            required
          />

          <Button
            onPress={handleLogin}
            variant="primary"
            size="large"
            fullWidth
          >
            {t("auth.signIn")}
          </Button>
        </View>
      </Card>
    </ScrollView>
  );
};

export default LoginScreen;
