# Push Notifications Setup

## Overview

Both web and mobile apps now register for push notifications on startup and log the tokens/subscriptions to the console for use in Postman.

## Mobile App (Expo Push Notifications)

### Important Note for Expo Go Users:

⚠️ **Expo Go on SDK 53+ does not support push notifications.** You have two options:

1. **Option A (Recommended for Testing):** Create a development build:

   ```bash
   npx eas build --profile development --platform ios
   # or
   npx eas build --profile development --platform android
   ```

2. **Option B:** The app will fall back to device push tokens (APNs/FCM), which require setting up your own push notification server.

### How to Get the Token:

1. Start the mobile app: `npx nx serve mobile`
2. Open the app in Expo Go on your device
3. Check the console/terminal output for:
   ```
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   📱 EXPO PUSH NOTIFICATION TOKEN (Mobile):
   ExponentPushToken[xxxxxxxxxxxxxxxxxxxxxx]
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   ```
4. Copy the token (format: `ExponentPushToken[...]`)

### Sending Push Notifications via Postman:

**Method:** POST  
**URL:** `https://exp.host/--/api/v2/push/send`

**Headers:**

```
Content-Type: application/json
```

**Body (raw JSON):**

```json
{
  "to": "ExponentPushToken[YOUR_TOKEN_HERE]",
  "title": "Test Notification",
  "body": "This is a test push notification from Postman",
  "data": {
    "customData": "any additional data"
  },
  "sound": "default",
  "priority": "high"
}
```

**Example:**

```json
{
  "to": "ExponentPushToken[xxxxxxxxxxxxxxxxxxxxxx]",
  "title": "Payment Received",
  "body": "You received $500 from John Doe",
  "data": {
    "amount": 500,
    "sender": "John Doe",
    "type": "payment_received"
  }
}
```

## Web App (Web Push Notifications)

### How to Get the Subscription:

1. Start the web app: `npx nx serve web`
2. Open the app in your browser at `http://localhost:4200`
3. Allow notifications when prompted
4. Open the browser console (F12)
5. Look for:
   ```
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   🌐 WEB PUSH NOTIFICATION SUBSCRIPTION (Web):
   {
     "endpoint": "https://...",
     "keys": {
       "p256dh": "...",
       "auth": "..."
     }
   }
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   ```
6. Copy the entire subscription object

### Sending Web Push Notifications:

For web push, you'll need to use the `web-push` library to send notifications. Here's how to set it up:

#### Install web-push CLI:

```bash
npm install -g web-push
```

#### Generate VAPID keys (for production):

```bash
web-push generate-vapid-keys
```

#### Send notification using Node.js:

```javascript
const webpush = require("web-push");

// Use the VAPID keys (for development, using test keys)
const vapidKeys = {
  publicKey:
    "BEl62iUYgUivxIkv69yViEuiBIa-Ib9-SkvMeAtA3LFgDzkrxZJjSgSnfckjBJuBkr3qBUYIHBQFLXYp5Nksh8U",
  privateKey: "UUxI4O8-FbRouAevSmBQ6o18hgE4nSG3qwvJTfKc-ls",
};

webpush.setVapidDetails(
  "mailto:your-email@example.com",
  vapidKeys.publicKey,
  vapidKeys.privateKey
);

const subscription = {
  // Paste the subscription object from console here
};

const payload = JSON.stringify({
  title: "Test Notification",
  body: "This is a test push notification",
  data: { customData: "any additional data" },
});

webpush
  .sendNotification(subscription, payload)
  .then((response) => console.log("Sent:", response))
  .catch((error) => console.error("Error:", error));
```

#### Or use Postman with web-push:

Since web push requires cryptographic signatures, it's easier to use the web-push library or create a backend endpoint that handles the signing.

## Testing Notifications

### Mobile:

1. Ensure you're running the app on a physical device (notifications don't work in simulator)
2. Grant notification permissions when prompted
3. Send a test notification using Postman
4. You should see the notification appear on your device

### Web:

1. Ensure you're using a browser that supports push notifications (Chrome, Firefox, Edge)
2. Grant notification permissions when prompted
3. Keep the browser tab open or in the background
4. Send a test notification using the web-push library
5. You should see the notification appear

## Troubleshooting

### Mobile:

- **No token appears:** Check if you granted permissions
- **Notification not received:** Ensure the app is running and connected to the internet
- **Token invalid:** The token changes when you reinstall the app
- **"Push notifications not supported in Expo Go":** Expo Go SDK 53+ requires a development build for push notifications. Run:
  ```bash
  npx eas build --profile development --platform ios
  # Install the development build on your device, then run:
  npx expo start --dev-client
  ```
- **Device token instead of Expo token:** The app falls back to device tokens when Expo tokens aren't available. These require a custom push notification server to use.

### Web:

- **No subscription logged:** Check browser console for errors
- **Service worker not registered:** Ensure `/sw.js` is accessible
- **Notifications blocked:** Check browser notification settings

## File Structure

```
apps/mobile/
  └── src/components-app/
      └── services/
          └── notificationService.ts    # Mobile notification logic

web/
  ├── public/
  │   └── sw.js                         # Service worker for web push
  └── src/app/
      └── services/
          └── notificationService.ts    # Web notification logic
```

## Additional Resources

- [Expo Push Notifications](https://docs.expo.dev/push-notifications/overview/)
- [Web Push Notifications](https://developer.mozilla.org/en-US/docs/Web/API/Push_API)
- [web-push library](https://github.com/web-push-libs/web-push)
