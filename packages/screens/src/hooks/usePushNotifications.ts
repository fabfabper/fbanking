import { useEffect, useState } from "react";
import { Platform, Alert } from "react-native";

export interface UsePushNotificationsReturn {
  expoPushToken: string | null;
  isRegistering: boolean;
  error: string | null;
}

export const usePushNotifications = (): UsePushNotificationsReturn => {
  const [expoPushToken, setExpoPushToken] = useState<string | null>(null);
  const [isRegistering, setIsRegistering] = useState(false);
  const [error, setError] = useState<string | null>(null);

  console.log("[Push Notifications] Hook initialized");

  useEffect(() => {
    console.log("[Push Notifications] useEffect triggered");
    registerForPushNotifications();
  }, []);

  const registerForPushNotifications = async () => {
    console.log("[Push Notifications] registerForPushNotifications called");
    console.log("[Push Notifications] Platform:", Platform.OS);

    if (Platform.OS === "web") {
      console.log("[Push Notifications] Not available on web");
      return;
    }

    setIsRegistering(true);
    setError(null);

    try {
      // Dynamic import for React Native only
      const [Notifications, Device] = await Promise.all([
        import("expo-notifications").catch(() => null),
        import("expo-device").catch(() => null),
      ]);

      if (!Notifications || !Device) {
        setError("Push notification modules not available");
        console.error("[Push Notifications] Modules not available");
        setIsRegistering(false);
        return;
      }

      // Check if running on a physical device
      if (!Device.isDevice) {
        const msg = "Push notifications only work on physical devices";
        setError(msg);
        console.warn("[Push Notifications]", msg);
        setIsRegistering(false);
        return;
      }

      // Get existing permissions
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;

      // Request permissions if not granted
      if (existingStatus !== "granted") {
        console.log("[Push Notifications] Requesting permissions...");
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }

      if (finalStatus !== "granted") {
        const msg = "Push notification permissions denied";
        setError(msg);
        console.warn("[Push Notifications]", msg);
        setIsRegistering(false);
        return;
      }

      // Get the Expo push token
      console.log("[Push Notifications] Getting Expo push token...");
      const tokenData = await Notifications.getExpoPushTokenAsync({
        projectId: "your-project-id", // Replace with your Expo project ID
      });

      const token = tokenData.data;
      setExpoPushToken(token);
      console.log("[Push Notifications] ✅ Token registered:", token);
      console.log("=".repeat(80));
      console.log("EXPO PUSH TOKEN:", token);
      console.log("=".repeat(80));

      // Show alert with token (temporary for debugging)
      Alert.alert(
        "Push Token Registered",
        `Token: ${token.substring(0, 30)}...`,
        [{ text: "OK" }]
      );

      // Configure notification behavior
      Notifications.setNotificationHandler({
        handleNotification: async () => ({
          shouldShowAlert: true,
          shouldPlaySound: true,
          shouldSetBadge: true,
        }),
      });

      console.log("[Push Notifications] ✅ Setup complete");
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : "Failed to register for push notifications";
      setError(errorMessage);
      console.error("[Push Notifications] Error:", err);
    } finally {
      setIsRegistering(false);
    }
  };

  return {
    expoPushToken,
    isRegistering,
    error,
  };
};
