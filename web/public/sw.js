// Service Worker for Push Notifications
// This file handles push notification events in the background

self.addEventListener("install", (event) => {
  console.log("Service Worker installing.");
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  console.log("Service Worker activating.");
});

self.addEventListener("push", (event) => {
  console.log("Push notification received:", event);

  const data = event.data ? event.data.json() : {};
  const title = data.title || "FBanking Notification";
  const options = {
    body: data.body || "You have a new notification",
    icon: "/favicon.ico",
    badge: "/favicon.ico",
    data: data.data || {},
  };

  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener("notificationclick", (event) => {
  console.log("Notification clicked:", event);

  event.notification.close();

  // Open the app when notification is clicked
  event.waitUntil(clients.openWindow("/"));
});
