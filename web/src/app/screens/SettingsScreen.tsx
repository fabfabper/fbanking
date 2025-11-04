import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import Navigation from "../components/Navigation";
import { registerForPushNotifications } from "../services/notificationService";

export default function SettingsScreen() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState(i18n.language);

  // Check if notifications are already enabled
  useEffect(() => {
    const checkNotificationStatus = async () => {
      if ("Notification" in window) {
        setNotificationsEnabled(Notification.permission === "granted");
      }
    };
    checkNotificationStatus();
  }, []);

  const handleNotificationToggle = async () => {
    if (notificationsEnabled) {
      // User wants to disable - inform them they need to do it in browser settings
      alert(
        "To disable notifications, please go to your browser settings:\n\n" +
          "Chrome: Settings → Privacy and Security → Site Settings → Notifications\n" +
          "Firefox: Settings → Privacy & Security → Permissions → Notifications\n" +
          "Safari: Preferences → Websites → Notifications"
      );
      return;
    }

    // User wants to enable notifications
    setIsProcessing(true);
    try {
      const subscription = await registerForPushNotifications();
      if (subscription) {
        setNotificationsEnabled(true);
        alert(
          "✅ Notifications enabled successfully! Check the browser console for your subscription token."
        );
      } else {
        alert(
          "❌ Failed to enable notifications. Please check browser permissions."
        );
      }
    } catch (error) {
      console.error("Error enabling notifications:", error);
      alert("❌ Error enabling notifications. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleLanguageChange = (language: string) => {
    i18n.changeLanguage(language);
    setCurrentLanguage(language);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navigation />

      <div className="max-w-screen-xl mx-auto px-6 py-8">
        <div className="mb-6">
          <button
            onClick={() => navigate("/dashboard")}
            className="text-corporate-blue hover:text-blue-600 flex items-center gap-2 mb-4"
          >
            ← {t("common.back")}
          </button>
          <h1 className="text-3xl font-bold text-slate-800">
            {t("settings.title")}
          </h1>
        </div>

        <div className="bg-white rounded-lg shadow-sm">
          {/* Notifications Section */}
          <div className="p-6 border-b border-slate-200">
            <h2 className="text-xl font-semibold text-slate-800 mb-4">
              {t("settings.notifications")}
            </h2>

            <div className="flex items-center justify-between py-4">
              <div className="flex-1">
                <h3 className="text-base font-medium text-slate-800">
                  {t("settings.pushNotifications")}
                </h3>
                <p className="text-sm text-slate-500 mt-1">
                  {t("settings.pushNotificationsDescription")}
                </p>
              </div>

              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={notificationsEnabled}
                  onChange={handleNotificationToggle}
                  disabled={isProcessing}
                  className="sr-only peer"
                />
                <div
                  className={`
                  w-11 h-6 rounded-full peer 
                  ${
                    isProcessing
                      ? "bg-slate-300 cursor-not-allowed"
                      : "bg-slate-200"
                  }
                  peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300
                  peer-checked:after:translate-x-full 
                  peer-checked:after:border-white 
                  after:content-[''] 
                  after:absolute 
                  after:top-[2px] 
                  after:left-[2px] 
                  after:bg-white 
                  after:border-slate-300 
                  after:border 
                  after:rounded-full 
                  after:h-5 
                  after:w-5 
                  after:transition-all
                  ${
                    notificationsEnabled && !isProcessing
                      ? "peer-checked:bg-corporate-blue"
                      : ""
                  }
                `}
                ></div>
              </label>
            </div>

            {notificationsEnabled && (
              <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-sm text-green-800">
                  <span role="img" aria-label="success">
                    ✅
                  </span>{" "}
                  Push notifications are enabled. Check the browser console for
                  your subscription token.
                </p>
              </div>
            )}

            {!notificationsEnabled && (
              <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-blue-800">
                  <span role="img" aria-label="info">
                    💡
                  </span>{" "}
                  Enable push notifications to receive payment alerts and
                  account updates.
                </p>
              </div>
            )}
          </div>

          {/* Account Section (placeholder) */}
          <div className="p-6 border-b border-slate-200">
            <h2 className="text-xl font-semibold text-slate-800 mb-4">
              {t("settings.account")}
            </h2>
            <p className="text-sm text-slate-500">
              Account settings coming soon...
            </p>
          </div>

          {/* Language Section */}
          <div className="p-6 border-b border-slate-200">
            <h2 className="text-xl font-semibold text-slate-800 mb-4">
              {t("settings.language")}
            </h2>

            <div className="flex items-center justify-between py-4">
              <div className="flex-1">
                <h3 className="text-base font-medium text-slate-800">
                  {t("settings.selectLanguage")}
                </h3>
                <p className="text-sm text-slate-500 mt-1">
                  {t("settings.languageDescription")}
                </p>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => handleLanguageChange("en")}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    currentLanguage === "en"
                      ? "bg-corporate-blue text-white"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  English
                </button>
                <button
                  onClick={() => handleLanguageChange("de")}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    currentLanguage === "de"
                      ? "bg-corporate-blue text-white"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  Deutsch
                </button>
              </div>
            </div>
          </div>

          {/* Privacy Section (placeholder) */}
          <div className="p-6">
            <h2 className="text-xl font-semibold text-slate-800 mb-4">
              {t("settings.privacy")}
            </h2>
            <p className="text-sm text-slate-500">
              Privacy settings coming soon...
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
