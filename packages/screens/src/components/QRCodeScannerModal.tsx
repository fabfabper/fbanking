import React, { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Platform, StyleSheet, Dimensions, View } from "react-native";
import { YStack, XStack, Text, Button } from "@ebanking/ui";

const { width, height } = Dimensions.get("window");
const isWeb = Platform.OS === "web";

// Custom hook to handle camera permissions on mobile
const useMobileCameraPermissions = () => {
  if (isWeb) {
    return [null, null];
  }

  try {
    const { useCameraPermissions } = require("expo-camera");
    return useCameraPermissions();
  } catch (err) {
    console.error("[QRScanner] Failed to load camera permissions:", err);
    return [null, null];
  }
};

interface QRCodeScannerModalProps {
  visible: boolean;
  onClose: () => void;
  onQRCodeScanned: (data: string) => void;
}

export const QRCodeScannerModal: React.FC<QRCodeScannerModalProps> = ({ visible, onClose, onQRCodeScanned }) => {
  const { t } = useTranslation();
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState(false);
  const [CameraView, setCameraView] = useState<any>(null);
  const [isScanning, setIsScanning] = useState(false);
  const scannerRef = useRef<any>(null);
  const qrScannerDivRef = useRef<HTMLDivElement | null>(null);
  const [permissionResponse, requestPermission] = useMobileCameraPermissions();

  // Web: Initialize html5-qrcode scanner
  useEffect(() => {
    if (isWeb && visible && !isScanning) {
      let html5QrCode: any = null;

      const initWebScanner = async () => {
        try {
          // Dynamically import html5-qrcode
          const { Html5Qrcode } = await import("html5-qrcode");

          if (qrScannerDivRef.current) {
            html5QrCode = new Html5Qrcode("qr-reader");
            scannerRef.current = html5QrCode;

            const config = {
              fps: 10,
              qrbox: { width: 250, height: 250 },
              aspectRatio: 1.0,
            };

            await html5QrCode.start(
              { facingMode: "environment" }, // Use rear camera
              config,
              (decodedText: string) => {
                console.log(`[QRScanner] Web QR Code scanned: ${decodedText}`);
                setScanned(true);
                setIsScanning(false);
                html5QrCode?.stop();
                onQRCodeScanned(decodedText);
              },
              (errorMessage: string) => {
                // Ignore scanning errors (they happen continuously while scanning)
              }
            );

            setIsScanning(true);
          }
        } catch (error) {
          console.error("[QRScanner] Failed to initialize web scanner:", error);
          setIsScanning(false);
        }
      };

      initWebScanner();

      return () => {
        // Cleanup scanner on unmount
        if (scannerRef.current && isScanning) {
          scannerRef.current.stop().catch((err: any) => {
            console.log("[QRScanner] Error stopping scanner:", err);
          });
          setIsScanning(false);
        }
      };
    }
  }, [isWeb, visible, onQRCodeScanned, isScanning]);

  // Cleanup scanner when modal closes
  useEffect(() => {
    if (!visible && isWeb && scannerRef.current && isScanning) {
      scannerRef.current.stop().catch((err: any) => {
        console.log("[QRScanner] Error stopping scanner on close:", err);
      });
      setIsScanning(false);
      setScanned(false);
    }
  }, [visible, isWeb, isScanning]);

  // Mobile: Initialize expo-camera
  useEffect(() => {
    if (!isWeb && visible) {
      // Load expo-camera dynamically for mobile (SDK 51+)
      import("expo-camera").then((module) => {
        setCameraView(() => module.CameraView);
      });

      // Request permissions using the hook
      if (requestPermission && (!permissionResponse || !permissionResponse.granted)) {
        requestPermission().then((result: any) => {
          setHasPermission(result?.granted === true);
        });
      } else if (permissionResponse?.granted) {
        setHasPermission(true);
      }
    }
  }, [visible, requestPermission, permissionResponse]);

  const handleBarCodeScanned = ({ type, data }: { type: string; data: string }) => {
    setScanned(true);
    console.log(`[QRScanner] Scanned ${type}: ${data}`);
    onQRCodeScanned(data);
  };

  const handleScanAgain = () => {
    setScanned(false);
    setIsScanning(false);

    if (isWeb && qrScannerDivRef.current) {
      // Re-initialize web scanner
      window.location.reload(); // Simple approach - reload to restart
    }
  };

  const handleClose = async () => {
    // Stop scanner before closing
    if (isWeb && scannerRef.current && isScanning) {
      try {
        await scannerRef.current.stop();
        setIsScanning(false);
      } catch (err) {
        console.log("[QRScanner] Scanner already stopped or not running");
      }
    }
    onClose();
  };

  if (!visible) {
    return null;
  }

  // Web implementation with html5-qrcode
  if (isWeb) {
    return (
      <View style={styles.webContainer}>
        <YStack backgroundColor="$backgroundGray" padding="$6" gap="$4" style={styles.webModal} alignItems="center">
          <XStack justifyContent="space-between" width="100%" alignItems="center">
            <Text size="xl" weight="bold">
              {t("qr.title")}
            </Text>
            <Button variant="ghost" onPress={handleClose} size="sm">
              <Text size="lg">✕</Text>
            </Button>
          </XStack>

          {/* QR Scanner Container */}
          <View
            id="qr-reader"
            ref={qrScannerDivRef as any}
            style={{
              width: "100%",
              maxWidth: 500,
              borderRadius: 12,
              overflow: "hidden",
            }}
          />

          {scanned && (
            <YStack gap="$3" alignItems="center" paddingTop="$4">
              <Text size="lg" weight="bold" style={{ color: "#10B981" }}>
                {t("qr.success")}
              </Text>
              <Button onPress={handleScanAgain}>
                <Text>{t("qr.scanAnother")}</Text>
              </Button>
            </YStack>
          )}

          {!isScanning && !scanned && (
            <YStack gap="$3" alignItems="center" paddingTop="$4">
              <Text size="md" style={{ textAlign: "center" }}>
                {t("qr.initializingCamera")}
              </Text>
            </YStack>
          )}

          {isScanning && !scanned && (
            <Text size="sm" style={{ opacity: 0.7, textAlign: "center" }}>
              {t("qr.positionFrame")}
            </Text>
          )}
        </YStack>
      </View>
    );
  }

  // Mobile implementation with expo-camera (SDK 51+)
  if (!CameraView) {
    return (
      <View style={styles.container}>
        <YStack flex={1} backgroundColor="$backgroundGray" justifyContent="center" alignItems="center" padding="$6">
          <Text size="lg">{t("qr.loading")}</Text>
        </YStack>
      </View>
    );
  }

  if (hasPermission === null) {
    return (
      <View style={styles.container}>
        <YStack flex={1} backgroundColor="$backgroundGray" justifyContent="center" alignItems="center" padding="$6">
          <Text size="lg">{t("qr.requestingPermission")}</Text>
        </YStack>
      </View>
    );
  }

  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <YStack
          flex={1}
          backgroundColor="$backgroundGray"
          justifyContent="center"
          alignItems="center"
          padding="$6"
          gap="$4"
        >
          <Text size="lg" weight="bold">
            {t("qr.permissionRequiredTitle")}
          </Text>
          <Text size="md" style={{ textAlign: "center" }}>
            {t("qr.permissionRequiredDescription")}
          </Text>
          <Button onPress={handleClose}>
            <Text>{t("qr.close")}</Text>
          </Button>
        </YStack>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CameraView
        style={StyleSheet.absoluteFillObject}
        facing="back"
        barcodeScannerSettings={{
          barcodeTypes: ["qr"],
        }}
        onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
      />

      {/* Overlay */}
      <YStack flex={1} justifyContent="space-between" padding="$6">
        {/* Header */}
        <XStack justifyContent="space-between" alignItems="center">
          <Text size="xl" weight="bold" style={styles.whiteText}>
            {t("qr.title")}
          </Text>
        </XStack>

        {/* Scanning frame */}
        <View style={styles.scanFrame}>
          <View style={[styles.corner, styles.topLeft]} />
          <View style={[styles.corner, styles.topRight]} />
          <View style={[styles.corner, styles.bottomLeft]} />
          <View style={[styles.corner, styles.bottomRight]} />
        </View>

        {/* Footer */}
        <YStack gap="$3" alignItems="center">
          {scanned && (
            <>
              <Text size="lg" weight="bold" style={styles.successText}>
                {t("qr.success")}
              </Text>
              <Button onPress={handleScanAgain}>
                <Text>{t("qr.scanAgain")}</Text>
              </Button>
            </>
          )}
          {!scanned && (
            <Text size="md" style={styles.whiteText}>
              {t("qr.positionFrame")}
            </Text>
          )}
          <Button onPress={handleClose}>
            <Text>{t("qr.cancel")}</Text>
          </Button>
        </YStack>
      </YStack>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: "100%",
    height: "100%",
    zIndex: 9999,
  },
  webContainer: {
    position: "fixed" as any,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999,
  },
  webModal: {
    borderRadius: 12,
    maxWidth: 600,
    width: "90%",
    maxHeight: "90%" as any,
  },
  scanFrame: {
    width: 250,
    height: 250,
    alignSelf: "center",
    position: "relative",
  },
  corner: {
    position: "absolute",
    width: 40,
    height: 40,
    borderColor: "#FFFFFF",
    borderWidth: 4,
  },
  topLeft: {
    top: 0,
    left: 0,
    borderBottomWidth: 0,
    borderRightWidth: 0,
  },
  topRight: {
    top: 0,
    right: 0,
    borderBottomWidth: 0,
    borderLeftWidth: 0,
  },
  bottomLeft: {
    bottom: 0,
    left: 0,
    borderTopWidth: 0,
    borderRightWidth: 0,
  },
  bottomRight: {
    bottom: 0,
    right: 0,
    borderTopWidth: 0,
    borderLeftWidth: 0,
  },
  whiteText: {
    color: "#FFFFFF",
  },
  successText: {
    color: "#10B981",
  },
});
