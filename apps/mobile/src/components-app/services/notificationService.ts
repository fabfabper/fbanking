import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import { Platform } from "react-native";

/**
 * Register for push notifications and return the Expo push token
 * This will request permissions and log the token for use in Postman
 */
export async function registerForPushNotifications(): Promise<string | null> {
  try {
    // Check if running on a physical device
    if (!Device.isDevice) {
      console.warn(
        "⚠️ Push notifications only work on physical devices, not simulators"
      );
      return null;
    }

    // Request notification permissions
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== "granted") {
      console.warn("⚠️ Push notification permission denied");
      return null;
    }

    // Get the device push token (native token, not Expo token)
    // This works better with Expo Go
    let token: string;

    try {
      // Try to get Expo push token first (works in development builds)
      const expoPushToken = await Notifications.getExpoPushTokenAsync({
        projectId: "fbanking-app", // Simple project identifier
      });
      token = expoPushToken.data;

      // Log the token prominently for easy copying to Postman
      console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
      console.log("📱 EXPO PUSH NOTIFICATION TOKEN (Mobile):");
      console.log(token);
      console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
      console.log(
        "Copy this token to use in Postman for sending push notifications"
      );
      console.log("Use URL: https://exp.host/--/api/v2/push/send");
      console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    } catch (error) {
      // If Expo push token fails (e.g., in Expo Go SDK 53+), get device token
      console.log(
        "ℹ️ Expo Push Token not available (requires development build)"
      );
      console.log("Getting device push token instead...");

      const devicePushToken = await Notifications.getDevicePushTokenAsync();
      token = devicePushToken.data;

      console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
      console.log("📱 DEVICE PUSH NOTIFICATION TOKEN (Mobile):");
      console.log(token);
      console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
      console.log("⚠️  This is a device-specific token (APNs/FCM)");
      console.log(
        "To use this, you need to set up your own push notification server"
      );
      console.log(
        "Or create a development build: npx eas build --profile development"
      );
      console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    }

    // Configure notification handling
    if (Platform.OS === "android") {
      await Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#4A9FE8",
      });
    }

    return token;
  } catch (error) {
    console.error("❌ Error registering for push notifications:", error);
    return null;
  }
}

/**
 * Set up notification handlers for when app is in foreground
 */
export function setupNotificationHandlers() {
  // Handle notifications when app is in foreground
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: true,
      shouldShowBanner: true,
      shouldShowList: true,
    }),
  });

  console.log("✅ Notification handlers configured");
}
