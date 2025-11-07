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
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
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

      // Try to get projectId from app config
      let projectId: string | undefined;
      try {
        const Constants = await import("expo-constants").catch(() => null);
        projectId = Constants?.default?.expoConfig?.extra?.eas?.projectId;
      } catch {
        projectId = undefined;
      }

      if (!projectId) {
        const msg =
          "Push notifications require an Expo project ID.\n\n" +
          "To enable push notifications:\n" +
          "1. Create an Expo account at expo.dev\n" +
          "2. Run 'npx expo login'\n" +
          "3. Run 'eas init' to create a project\n" +
          "4. The project ID will be added to app.json automatically\n\n" +
          "For now, push notifications will be disabled.";
        setError(msg);
        console.warn("[Push Notifications]", msg);

        Alert.alert(
          "Push Notifications Setup Required",
          "Push notifications require an Expo project ID. Check the console for setup instructions.",
          [{ text: "OK" }]
        );

        setIsRegistering(false);
        return;
      }

      const tokenData = await Notifications.getExpoPushTokenAsync({
        projectId,
      });

      const token = tokenData.data;
      setExpoPushToken(token);
      console.log("[Push Notifications] ✅ Token registered:", token);
      console.log("=".repeat(80));
      console.log("EXPO PUSH TOKEN:", token);
      console.log("=".repeat(80));

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
      const errorMessage = err instanceof Error ? err.message : "Failed to register for push notifications";
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
