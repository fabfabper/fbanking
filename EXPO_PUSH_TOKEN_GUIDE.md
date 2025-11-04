# Quick Guide: Getting a Working Expo Push Token

## The Problem

You're seeing a device-specific token (APNs/FCM) instead of an Expo Push Token because Expo Go on SDK 53+ doesn't support push notifications.

## The Solution: Create a Development Build

### Step 1: Install EAS CLI

```bash
npm install -g eas-cli
```

### Step 2: Login to Expo

```bash
npx eas login
```

### Step 3: Configure EAS (already done - eas.json exists)

### Step 4: Build for Your Device

Choose based on your device:

**For iOS:**

```bash
npx eas build --profile development --platform ios
```

**For Android:**

```bash
npx eas build --profile development --platform android
```

This will take 10-20 minutes. You'll get a download link when it's done.

### Step 5: Install the Build on Your Device

- **iOS**: Click the link from EAS and install via TestFlight or direct download
- **Android**: Download and install the APK directly

### Step 6: Run with Development Client

```bash
npx expo start --dev-client
```

### Step 7: Get Your Expo Push Token

Open the app on your device and check the console. You'll now see:

```
📱 EXPO PUSH NOTIFICATION TOKEN (Mobile):
ExponentPushToken[xxxxxxxxxxxxxxxxxxxxxx]
```

This token will work with Postman at: `https://exp.host/--/api/v2/push/send`

## Alternative: Test Locally (For Now)

If you want to test notifications immediately without waiting for a build, you can test local notifications. I can add a "Test Notification" button to your dashboard that triggers a local notification to verify the notification system is working.

Would you like me to add that test button?
