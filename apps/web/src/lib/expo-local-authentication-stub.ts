// Stub for expo-local-authentication on web
// This module is not available on web, but we need a stub to prevent import errors

export const hasHardwareAsync = async () => false;
export const isEnrolledAsync = async () => false;
export const supportedAuthenticationTypesAsync = async () => [];
export const authenticateAsync = async () => ({ success: false });

export const AuthenticationType = {
  FINGERPRINT: 1,
  FACIAL_RECOGNITION: 2,
  IRIS: 3,
};

export default {
  hasHardwareAsync,
  isEnrolledAsync,
  supportedAuthenticationTypesAsync,
  authenticateAsync,
  AuthenticationType,
};
