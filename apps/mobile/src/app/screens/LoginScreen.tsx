import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useTranslation } from "react-i18next";
import { Button, Input, Card } from "@fbanking/ui";
import { useAuth } from "../contexts/AuthContext";

export const LoginScreen = () => {
  const { t } = useTranslation();
  const { login } = useAuth();
  const [email, setEmail] = useState("fabian");
  const [password, setPassword] = useState("");
  const [rememberMe] = useState(false);

  const handleLogin = async () => {
    await login(email, password);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.title}>{t("auth.welcomeBack")}</Text>
        <Text style={styles.subtitle}>{t("auth.signInDescription")}</Text>
      </View>

      <Card>
        <View style={styles.form}>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#4A9FE8",
  },
  content: {
    flexGrow: 1,
    padding: 24,
    justifyContent: "center",
  },
  header: {
    alignItems: "center",
    marginBottom: 32,
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    color: "white",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "rgba(255, 255, 255, 0.9)",
  },
  form: {
    gap: 20,
  },
});

export default LoginScreen;
