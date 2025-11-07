import { Platform, Alert } from "react-native";
import { QRCodeService } from "../services/QRCodeService";

const isWeb = Platform.OS === "web";

export const useCamera = () => {
  const openCamera = async () => {
    if (isWeb) {
      // Web: Use HTML5 QR Code Scanner
      try {
        // For web, we'll use jsQR library to scan QR codes from camera
        // Create a modal/overlay for the QR scanner
        Alert.alert(
          "QR Scanner",
          "Web QR scanning requires additional setup. For now, using image upload."
        );

        // Fallback: Use file input to upload QR code image
        const input = document.createElement("input");
        input.type = "file";
        input.accept = "image/*";
        input.capture = "environment" as any;
        input.onchange = async (e: any) => {
          const file = e.target?.files?.[0];
          if (file) {
            try {
              // In a real implementation, you would use jsQR or html5-qrcode
              // to scan the image. For now, we'll simulate it.
              console.log(
                "[Camera] Image selected for QR scanning:",
                file.name
              );
              Alert.alert(
                "Debug",
                "Image uploaded. In production, this would scan for QR codes using jsQR library."
              );
            } catch (error) {
              console.error("[Camera] Failed to scan QR from image:", error);
              Alert.alert("Error", "Failed to scan QR code from image");
            }
          }
        };
        input.click();
      } catch (error) {
        console.error("[Camera] Web QR scanning error:", error);
        Alert.alert("Error", "Failed to open QR scanner");
      }
    } else {
      // Mobile: Use expo-camera with built-in barcode scanning (SDK 51+)
      try {
        const Camera = await import("expo-camera");

        // Request camera permissions
        const { status } =
          await Camera.CameraView.requestCameraPermissionsAsync();

        if (status !== "granted") {
          Alert.alert(
            "Permission Denied",
            "Camera permission is required to scan QR codes."
          );
          return null;
        }

        // Note: The actual QR scanner UI needs to be implemented as a modal/screen
        // with CameraView component. For now, we'll show a message.
        console.log("[Camera] Opening QR scanner on mobile...");

        // This is a placeholder - the actual scanning happens in a CameraView component
        // that needs to be rendered. We'll return a callback that can be used.
        Alert.alert("QR Scanner", "Opening QR code scanner...", [
          {
            text: "OK",
            onPress: () => {
              // In a real implementation, this would navigate to a QR scanner screen
              console.log("[Camera] QR Scanner ready");
            },
          },
        ]);

        return { scannerReady: true };
      } catch (error) {
        console.error("[Camera] Mobile QR scanning error:", error);
        Alert.alert("Error", "Failed to open QR scanner");
      }
    }

    return null;
  };

  /**
   * Process a scanned QR code
   * This should be called when a QR code is detected by the scanner
   */
  const handleQRCodeScanned = (data: string) => {
    console.log("[Camera] QR Code scanned:", data);

    // Process the QR code using the service
    const qrCodeData = QRCodeService.processQRCode(data);

    // Validate the QR code
    const isValid = QRCodeService.validateQRCode(qrCodeData);

    if (isValid) {
      console.log("[Camera] Valid QR code processed:", qrCodeData);
      Alert.alert(
        "QR Code Scanned",
        `Type: ${qrCodeData.type}\n\nRaw Data: ${qrCodeData.raw.substring(
          0,
          100
        )}...`,
        [
          {
            text: "OK",
            onPress: () => console.log("[Camera] QR code acknowledged"),
          },
        ]
      );

      return qrCodeData;
    } else {
      console.warn("[Camera] Invalid QR code:", qrCodeData);
      Alert.alert(
        "Invalid QR Code",
        "The scanned QR code could not be processed."
      );
      return null;
    }
  };

  return { openCamera, handleQRCodeScanned };
};
