// Stub for expo-notifications on web
// This module is not available on web, but we need a stub to prevent import errors

export const getPermissionsAsync = async () => ({ status: "denied" });
export const requestPermissionsAsync = async () => ({ status: "denied" });
export const getExpoPushTokenAsync = async () => ({ data: null });
export const setNotificationHandler = () => {};

export default {
  getPermissionsAsync,
  requestPermissionsAsync,
  getExpoPushTokenAsync,
  setNotificationHandler,
};
