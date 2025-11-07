import { useState } from "react";
import { Alert } from "react-native";
import { QRCodeService } from "../services/QRCodeService";

interface QRPaymentData {
  recipient?: string;
  amount?: string;
  note?: string;
  iban?: string;
  street?: string;
  houseNumber?: string;
  city?: string;
  postalCode?: string;
  country?: string;
}

interface UseQRCodeScannerProps {
  onDataScanned?: (paymentData: QRPaymentData) => void;
  showAlert?: boolean;
}

export const useQRCodeScanner = ({
  onDataScanned,
  showAlert = false,
}: UseQRCodeScannerProps = {}) => {
  const [qrScannerVisible, setQrScannerVisible] = useState(false);

  const openScanner = () => {
    setQrScannerVisible(true);
  };

  const closeScanner = () => {
    setQrScannerVisible(false);
  };

  const handleQRCodeScanned = (data: string) => {
    console.log("[useQRCodeScanner] QR Code scanned, processing...");

    // Process the QR code with the service
    const qrCodeData = QRCodeService.processQRCode(data);

    // Close the scanner
    closeScanner();

    console.log("[useQRCodeScanner] Processed QR Code Data:", qrCodeData);

    // Extract payment data
    const paymentData: QRPaymentData = {};

    switch (qrCodeData.type) {
      case "payment":
        // Swiss QR-bill or EPC/SEPA payment
        if (qrCodeData.data.format === "Swiss QR-bill") {
          paymentData.iban = qrCodeData.data.iban || "";
          paymentData.recipient = qrCodeData.data.creditorName || "";
          paymentData.street = qrCodeData.data.creditorStreet || "";
          paymentData.houseNumber = qrCodeData.data.creditorHouseNumber || "";
          paymentData.postalCode = qrCodeData.data.creditorPostalCode || "";
          paymentData.city = qrCodeData.data.creditorCity || "";
          paymentData.country = qrCodeData.data.creditorCountry || "";
          paymentData.amount = qrCodeData.data.amount || "";
          paymentData.note =
            qrCodeData.data.additionalInfo || qrCodeData.data.reference || "";
        } else if (qrCodeData.data.format === "EPC/SEPA") {
          paymentData.iban = qrCodeData.data.beneficiaryAccount || "";
          paymentData.recipient = qrCodeData.data.beneficiaryName || "";
          paymentData.amount = qrCodeData.data.amount || "";
          paymentData.note =
            qrCodeData.data.remittance || qrCodeData.data.reference || "";
        } else if (qrCodeData.data.recipient) {
          // JSON payment format
          paymentData.recipient = qrCodeData.data.recipient || "";
          paymentData.iban = qrCodeData.data.iban || "";
          paymentData.amount = qrCodeData.data.amount?.toString() || "";
          paymentData.note =
            qrCodeData.data.reference || qrCodeData.data.message || "";
        }
        break;

      case "account":
        // IBAN only
        paymentData.iban = qrCodeData.data.iban || "";
        break;

      case "url":
        // Check if URL has payment parameters
        if (qrCodeData.data.searchParams) {
          paymentData.recipient = qrCodeData.data.searchParams.recipient || "";
          paymentData.amount = qrCodeData.data.searchParams.amount || "";
          paymentData.iban =
            qrCodeData.data.searchParams.iban ||
            qrCodeData.data.searchParams.account ||
            "";
          paymentData.note =
            qrCodeData.data.searchParams.note ||
            qrCodeData.data.searchParams.reference ||
            "";
        }
        break;

      case "text":
      case "unknown":
        // Try to parse as IBAN if it looks like one
        if (
          qrCodeData.raw &&
          /^[A-Z]{2}[0-9]{2}/.test(qrCodeData.raw.replace(/\s/g, ""))
        ) {
          paymentData.iban = qrCodeData.raw.replace(/\s/g, "");
        }
        break;
    }

    console.log("[useQRCodeScanner] Extracted payment data:", paymentData);

    // Call the callback if provided
    if (onDataScanned) {
      onDataScanned(paymentData);
    }

    // Show alert if requested and no callback provided
    if (showAlert && !onDataScanned) {
      Alert.alert(
        "QR Code Scanned",
        `Type: ${qrCodeData.type}\n\n${JSON.stringify(
          qrCodeData.data,
          null,
          2
        )}`
      );
    }
  };

  return {
    qrScannerVisible,
    openScanner,
    closeScanner,
    handleQRCodeScanned,
  };
};
