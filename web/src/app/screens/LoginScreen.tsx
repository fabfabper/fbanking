import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Button, Input, Card } from "@fbanking/ui";
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
    <div className="min-h-screen flex items-center justify-center bg-corporate-blue p-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            {t("auth.welcomeBack")}
          </h1>
          <p className="text-base text-white/90">
            {t("auth.signInDescription")}
          </p>
        </div>

        <Card>
          <div className="flex flex-col gap-5">
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

            {error && (
              <div className="bg-red-100 text-red-800 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            <div className="flex justify-between items-center -my-2">
              <label className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 cursor-pointer"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <span>{t("auth.rememberMe")}</span>
              </label>

              <button className="bg-transparent border-none text-corporate-blue text-sm cursor-pointer p-0 hover:underline">
                {t("auth.forgotPassword")}
              </button>
            </div>

            <Button
              onPress={handleLogin}
              variant="primary"
              size="large"
              fullWidth
              disabled={loading || !email || !password}
            >
              {loading ? t("common.loading") : t("auth.signIn")}
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default LoginScreen;
