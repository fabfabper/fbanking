import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAuth } from "../contexts/AuthContext";
import { Button } from "@fbanking/ui";

export const Navigation: React.FC = () => {
  const { t } = useTranslation();
  const { logout, user } = useAuth();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-white border-b border-slate-200 py-4 mb-6">
      <div className="max-w-screen-xl mx-auto px-6 flex items-center justify-between">
        <div>
          <h2 className="text-corporate-blue text-2xl font-bold m-0">
            FBanking
          </h2>
        </div>

        <div className="flex gap-6">
          <Link
            to="/dashboard"
            className={`no-underline text-slate-600 text-base font-medium px-4 py-2 rounded-lg transition-all ${
              isActive("/dashboard")
                ? "text-corporate-blue bg-blue-50"
                : "hover:text-corporate-blue hover:bg-slate-100"
            }`}
          >
            {t("navigation.dashboard")}
          </Link>
          <Link
            to="/accounts"
            className={`no-underline text-slate-600 text-base font-medium px-4 py-2 rounded-lg transition-all ${
              isActive("/accounts")
                ? "text-corporate-blue bg-blue-50"
                : "hover:text-corporate-blue hover:bg-slate-100"
            }`}
          >
            {t("navigation.accounts")}
          </Link>
          <Link
            to="/payments"
            className={`no-underline text-slate-600 text-base font-medium px-4 py-2 rounded-lg transition-all ${
              isActive("/payments")
                ? "text-corporate-blue bg-blue-50"
                : "hover:text-corporate-blue hover:bg-slate-100"
            }`}
          >
            {t("navigation.payments")}
          </Link>
        </div>

        <div className="flex items-center gap-4">
          {user && <span className="text-sm text-slate-600">{user.email}</span>}
          <Button onPress={logout} variant="secondary" size="small">
            {t("payments.signOut")}
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
