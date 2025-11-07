/**
 * QRCodeService
 *
 * Service for processing QR codes scanned from the camera.
 * Handles QR code validation, parsing, and processing.
 */

export interface QRCodeData {
  raw: string;
  type: "payment" | "account" | "url" | "text" | "unknown";
  data: any;
}

export class QRCodeService {
  /**
   * Process a QR code string and extract meaningful data
   * @param qrCodeContent - Raw QR code string
   * @returns Processed QR code data
   */
  static processQRCode(qrCodeContent: string): QRCodeData {
    console.log("[QRCodeService] Processing QR code:", qrCodeContent);

    // Try to identify the type of QR code
    const qrType = this.identifyQRType(qrCodeContent);
    console.log("[QRCodeService] Identified QR code type:", qrType);

    let parsedData: any;

    switch (qrType) {
      case "payment":
        parsedData = this.parsePaymentQR(qrCodeContent);
        break;
      case "account":
        parsedData = this.parseAccountQR(qrCodeContent);
        break;
      case "url":
        parsedData = this.parseURLQR(qrCodeContent);
        break;
      case "text":
      default:
        parsedData = { content: qrCodeContent };
        break;
    }

    console.log("[QRCodeService] QR Code Type:", qrType);
    console.log("[QRCodeService] Parsed Data:", parsedData);

    return {
      raw: qrCodeContent,
      type: qrType,
      data: parsedData,
    };
  }

  /**
   * Identify the type of QR code based on content patterns
   */
  private static identifyQRType(content: string): QRCodeData["type"] {
    // Check for URL
    if (content.startsWith("http://") || content.startsWith("https://")) {
      return "url";
    }

    // Check for payment QR codes (common formats)
    // Swiss QR-bill format
    if (
      content.startsWith("SPC\n") ||
      (content.includes("CH") && content.includes("QRR"))
    ) {
      return "payment";
    }

    // EPC QR code (European Payment Council)
    if (content.startsWith("BCD\n")) {
      return "payment";
    }

    // Check for IBAN (account numbers)
    if (/^[A-Z]{2}[0-9]{2}[A-Z0-9]+$/.test(content.replace(/\s/g, ""))) {
      return "account";
    }

    // Check for structured payment data (JSON)
    if (
      (content.startsWith("{") && content.includes("amount")) ||
      content.includes("recipient")
    ) {
      try {
        JSON.parse(content);
        return "payment";
      } catch {
        // Not valid JSON
      }
    }

    // Default to text if no pattern matches
    return content.length > 100 ? "text" : "unknown";
  }

  /**
   * Parse payment QR codes
   */
  private static parsePaymentQR(content: string): any {
    // Try to parse as JSON first
    if (content.startsWith("{")) {
      try {
        return JSON.parse(content);
      } catch {
        // Fall through to other formats
      }
    }

    // Swiss QR-bill format
    if (content.startsWith("SPC\n")) {
      return this.parseSwissQR(content);
    }

    // EPC QR code format
    if (content.startsWith("BCD\n")) {
      return this.parseEPCQR(content);
    }

    return { content, note: "Unrecognized payment format" };
  }

  /**
   * Parse Swiss QR-bill format
   */
  private static parseSwissQR(content: string): any {
    const lines = content.split("\n");

    return {
      format: "Swiss QR-bill",
      version: lines[1] || "",
      codingType: lines[2] || "",
      iban: lines[3] || "",
      creditorName: lines[5] || "",
      creditorStreet: lines[6] || "",
      creditorHouseNumber: lines[7] || "",
      creditorPostalCode: lines[8] || "",
      creditorCity: lines[9] || "",
      creditorCountry: lines[10] || "",
      amount: lines[18] || "0",
      currency: lines[19] || "CHF",
      reference: lines[28] || "",
      additionalInfo: lines[29] || "",
    };
  }

  /**
   * Parse EPC QR code format (SEPA)
   */
  private static parseEPCQR(content: string): any {
    const lines = content.split("\n");

    return {
      format: "EPC/SEPA",
      serviceTag: lines[0] || "",
      version: lines[1] || "",
      encoding: lines[2] || "",
      identification: lines[3] || "",
      bic: lines[4] || "",
      beneficiaryName: lines[5] || "",
      beneficiaryAccount: lines[6] || "",
      amount: lines[7] || "0",
      purpose: lines[8] || "",
      reference: lines[9] || "",
      remittance: lines[10] || "",
    };
  }

  /**
   * Parse account QR codes (IBAN)
   */
  private static parseAccountQR(content: string): any {
    const cleanIBAN = content.replace(/\s/g, "");

    return {
      iban: cleanIBAN,
      country: cleanIBAN.substring(0, 2),
      checkDigits: cleanIBAN.substring(2, 4),
      bankCode: cleanIBAN.substring(4, 9),
      accountNumber: cleanIBAN.substring(9),
    };
  }

  /**
   * Parse URL QR codes
   */
  private static parseURLQR(content: string): any {
    try {
      const url = new URL(content);
      return {
        url: content,
        protocol: url.protocol,
        hostname: url.hostname,
        pathname: url.pathname,
        searchParams: Object.fromEntries(url.searchParams.entries()),
      };
    } catch {
      return { url: content, error: "Invalid URL" };
    }
  }

  /**
   * Validate a QR code result
   * @param qrCodeData - Processed QR code data
   * @returns True if valid, false otherwise
   */
  static validateQRCode(qrCodeData: QRCodeData): boolean {
    if (!qrCodeData.raw || qrCodeData.raw.trim().length === 0) {
      console.warn("[QRCodeService] Empty QR code content");
      return false;
    }

    // Add custom validation logic based on QR type
    switch (qrCodeData.type) {
      case "payment":
        return this.validatePaymentQR(qrCodeData.data);
      case "account":
        return this.validateAccountQR(qrCodeData.data);
      case "url":
        return this.validateURLQR(qrCodeData.data);
      default:
        return true; // Accept text/unknown types
    }
  }

  /**
   * Validate payment QR data
   */
  private static validatePaymentQR(data: any): boolean {
    // Check for required payment fields
    if (data.iban || data.beneficiaryAccount) {
      return true;
    }

    if (data.amount && parseFloat(data.amount) > 0) {
      return true;
    }

    return false;
  }

  /**
   * Validate account QR data
   */
  private static validateAccountQR(data: any): boolean {
    // Basic IBAN validation (length check)
    if (data.iban && data.iban.length >= 15 && data.iban.length <= 34) {
      return true;
    }
    return false;
  }

  /**
   * Validate URL QR data
   */
  private static validateURLQR(data: any): boolean {
    return !data.error && data.url && data.hostname;
  }
}
