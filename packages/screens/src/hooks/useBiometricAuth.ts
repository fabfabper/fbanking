import { useState, useEffect } from "react";
import { Platform } from "react-native";

// Biometric authentication types
export interface BiometricAuthResult {
  success: boolean;
  error?: string;
  biometricType?: "fingerprint" | "facial" | "iris" | null;
}

export interface UseBiometricAuthReturn {
  isAvailable: boolean;
  biometricType: "fingerprint" | "facial" | "iris" | null;
  authenticate: () => Promise<BiometricAuthResult>;
  isChecking: boolean;
}

export const useBiometricAuth = (): UseBiometricAuthReturn => {
  const [isAvailable, setIsAvailable] = useState(false);
  const [biometricType, setBiometricType] = useState<
    "fingerprint" | "facial" | "iris" | null
  >(null);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    checkBiometricAvailability();
  }, []);

  const checkBiometricAvailability = async () => {
    if (Platform.OS === "web") {
      setIsChecking(false);
      setIsAvailable(false);
      return;
    }

    try {
      // Dynamic import for React Native only - will fail gracefully on web
      const LocalAuthentication = await import(
        "expo-local-authentication"
      ).catch(() => null);

      if (!LocalAuthentication) {
        setIsAvailable(false);
        setIsChecking(false);
        return;
      }

      const compatible = await LocalAuthentication.hasHardwareAsync();
      const enrolled = await LocalAuthentication.isEnrolledAsync();

      if (compatible && enrolled) {
        const types =
          await LocalAuthentication.supportedAuthenticationTypesAsync();

        // Determine biometric type
        let type: "fingerprint" | "facial" | "iris" | null = null;
        if (
          types.includes(
            LocalAuthentication.AuthenticationType.FACIAL_RECOGNITION
          )
        ) {
          type = "facial";
        } else if (
          types.includes(LocalAuthentication.AuthenticationType.FINGERPRINT)
        ) {
          type = "fingerprint";
        } else if (
          types.includes(LocalAuthentication.AuthenticationType.IRIS)
        ) {
          type = "iris";
        }

        setIsAvailable(true);
        setBiometricType(type);
      }
    } catch (error) {
      console.error("Error checking biometric availability:", error);
    } finally {
      setIsChecking(false);
    }
  };

  const authenticate = async (): Promise<BiometricAuthResult> => {
    if (Platform.OS === "web") {
      return {
        success: false,
        error: "Biometric authentication not available on web",
      };
    }

    if (!isAvailable) {
      return {
        success: false,
        error: "Biometric authentication not available",
      };
    }

    try {
      const LocalAuthentication = await import(
        "expo-local-authentication"
      ).catch(() => null);

      if (!LocalAuthentication) {
        return {
          success: false,
          error: "Biometric module not available",
        };
      }

      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: "Authenticate to access your account",
        cancelLabel: "Cancel",
        disableDeviceFallback: false,
        fallbackLabel: "Use passcode",
      });

      return {
        success: result.success,
        error: result.success ? undefined : "Authentication failed",
        biometricType,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Authentication error",
        biometricType,
      };
    }
  };

  return {
    isAvailable,
    biometricType,
    authenticate,
    isChecking,
  };
};
