/**
 * Web Push Notification Service
 * Handles registration for web push notifications and retrieves subscription token
 */

/**
 * Convert a base64 string to Uint8Array for VAPID key
 */
function urlBase64ToUint8Array(base64String: string): Uint8Array {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

/**
 * Register for push notifications and return the subscription
 * This will request permissions and log the subscription for use in Postman
 * NOTE: Must be called from a user interaction (button click, etc.)
 */
export async function registerForPushNotifications(): Promise<PushSubscription | null> {
  try {
    // Check if service workers and push notifications are supported
    if (!("serviceWorker" in navigator)) {
      console.warn("⚠️ Service Workers are not supported in this browser");
      return null;
    }

    if (!("PushManager" in window)) {
      console.warn("⚠️ Push notifications are not supported in this browser");
      return null;
    }

    // Check current permission status
    if (Notification.permission === "denied") {
      console.warn(
        "⚠️ Push notifications are blocked. Please enable them in browser settings."
      );
      return null;
    }

    // If permission is already granted, just subscribe
    if (Notification.permission === "granted") {
      return await subscribeToPushNotifications();
    }

    // Permission is 'default' - we'll log instructions but not auto-request
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    console.log("ℹ️  Push notifications require user permission");
    console.log('Click "Enable Notifications" button to grant permission');
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");

    return null;
  } catch (error) {
    console.error("❌ Error checking push notification support:", error);
    return null;
  }
}

/**
 * Request notification permission and subscribe
 * This should be called from a user gesture (button click)
 */
export async function requestNotificationPermission(): Promise<PushSubscription | null> {
  try {
    // Request notification permission (must be from user gesture)
    const permission = await Notification.requestPermission();

    if (permission !== "granted") {
      console.warn("⚠️ Push notification permission denied");
      return null;
    }

    return await subscribeToPushNotifications();
  } catch (error) {
    console.error("❌ Error requesting notification permission:", error);
    return null;
  }
}

/**
 * Subscribe to push notifications after permission is granted
 */
async function subscribeToPushNotifications(): Promise<PushSubscription | null> {
  try {
    // Register service worker
    const registration = await navigator.serviceWorker.register("/sw.js");
    console.log("✅ Service Worker registered");

    // Wait for service worker to be ready
    await navigator.serviceWorker.ready;

    // For development, we'll use a test VAPID public key
    // In production, you should generate your own VAPID keys
    // You can generate them using: npx web-push generate-vapid-keys
    const vapidPublicKey =
      "BEl62iUYgUivxIkv69yViEuiBIa-Ib9-SkvMeAtA3LFgDzkrxZJjSgSnfckjBJuBkr3qBUYIHBQFLXYp5Nksh8U";

    const convertedVapidKey = urlBase64ToUint8Array(vapidPublicKey);

    // Subscribe to push notifications
    const subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: convertedVapidKey,
    });

    // Log the subscription prominently for easy copying to Postman
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    console.log("🌐 WEB PUSH NOTIFICATION SUBSCRIPTION (Web):");
    console.log(JSON.stringify(subscription, null, 2));
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    console.log(
      "Copy this subscription object to use in Postman for sending push notifications"
    );
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");

    return subscription;
  } catch (error) {
    console.error("❌ Error subscribing to push notifications:", error);
    return null;
  }
}

/**
 * Setup notification event listeners
 */
export function setupNotificationHandlers(): void {
  if (!("serviceWorker" in navigator)) {
    return;
  }

  // Listen for messages from service worker
  navigator.serviceWorker.addEventListener("message", (event) => {
    console.log("📬 Notification received:", event.data);
  });

  console.log("✅ Notification handlers configured");
}
