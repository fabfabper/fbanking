#!/usr/bin/env node

/**
 * Quick script to send web push notifications
 * Usage: node send-web-push.js
 *
 * 1. Copy the subscription JSON from your browser console
 * 2. Paste it into the 'subscription' variable below
 * 3. Run: node send-web-push.js
 */

const webpush = require("web-push");

// VAPID keys (these are test keys - for production, generate your own)
const vapidKeys = {
  publicKey:
    "BEl62iUYgUivxIkv69yViEuiBIa-Ib9-SkvMeAtA3LFgDzkrxZJjSgSnfckjBJuBkr3qBUYIHBQFLXYp5Nksh8U",
  privateKey: "UUxI4O8-FbRouAevSmBQ6o18hgE4nSG3qwvJTfKc-ls",
};

webpush.setVapidDetails(
  "mailto:test@example.com",
  vapidKeys.publicKey,
  vapidKeys.privateKey
);

// 📋 PASTE YOUR SUBSCRIPTION OBJECT FROM BROWSER CONSOLE HERE 👇
const subscription = {
  endpoint:
    "https://web.push.apple.com/QACBbc4HJGU91lAhhbr3aYyBi3LehqKOZyi_xlYEbeMXHoOQLE9At7XLHxZxqNf8jrXNrqw4sJlHjqRaXXF2wG511VSUC8E0JYW8koZdlq1USnrFhUANiCuT_mpI_9milyAIIqrA8fPwdBnARWgnhoKRApSvdrSnTdV10qsKyxg",
  keys: {
    p256dh:
      "BICYw3qDFG4fzPB7J1gU_vVbF3hM0s8fgLfBkV-r0jfGt2z8MK9hKWnzOijHhPHqLoPQeUTYfJl-ckdaoq0NXSs",
    auth: "3k2z9dNc5rCSKmRtnKZvyg",
  },
};

// The notification payload
const payload = JSON.stringify({
  title: "Payment Received! 💰",
  body: "You received $500 from John Doe",
  icon: "/favicon.ico",
  data: {
    amount: 500,
    sender: "John Doe",
    type: "payment_received",
  },
});

// Send the notification
console.log("Sending push notification...");
console.log("Payload:", payload);

webpush
  .sendNotification(subscription, payload)
  .then((response) => {
    console.log("✅ Notification sent successfully!");
    console.log("Status:", response.statusCode);
  })
  .catch((error) => {
    console.error("❌ Error sending notification:", error);
    if (error.statusCode) {
      console.error("Status Code:", error.statusCode);
      console.error("Headers:", error.headers);
      console.error("Body:", error.body);
    }
  });
