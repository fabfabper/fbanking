import { validateIban, formatIban, getIbanCountry } from "../validateIban";

describe("validateIban", () => {
  describe("Valid IBANs", () => {
    test("should validate Swiss IBAN", () => {
      const result = validateIban("CH93 0076 2011 6238 5295 7");
      expect(result.valid).toBe(true);
      expect(result.error).toBeUndefined();
    });

    test("should validate German IBAN", () => {
      const result = validateIban("DE89370400440532013000");
      expect(result.valid).toBe(true);
      expect(result.error).toBeUndefined();
    });

    test("should validate UK IBAN", () => {
      const result = validateIban("GB82 WEST 1234 5698 7654 32");
      expect(result.valid).toBe(true);
      expect(result.error).toBeUndefined();
    });

    test("should validate French IBAN", () => {
      const result = validateIban("FR1420041010050500013M02606");
      expect(result.valid).toBe(true);
      expect(result.error).toBeUndefined();
    });

    test("should handle IBAN with spaces", () => {
      const result = validateIban("CH93 0076 2011 6238 5295 7");
      expect(result.valid).toBe(true);
    });

    test("should handle IBAN without spaces", () => {
      const result = validateIban("CH9300762011623852957");
      expect(result.valid).toBe(true);
    });
  });

  describe("Invalid IBANs", () => {
    test("should reject IBAN that is too short", () => {
      const result = validateIban("CH93007620");
      expect(result.valid).toBe(false);
      expect(result.error).toContain("too short");
    });

    test("should reject IBAN that is too long", () => {
      const result = validateIban("CH930076201162385295712345678901234567890");
      expect(result.valid).toBe(false);
      expect(result.error).toContain("too long");
    });

    test("should reject IBAN with invalid characters", () => {
      const result = validateIban("CH93-0076-2011-6238-5295-7");
      expect(result.valid).toBe(false);
      expect(result.error).toContain("invalid characters");
    });

    test("should reject IBAN with invalid country code", () => {
      const result = validateIban("XX9300762011623852957");
      expect(result.valid).toBe(false);
      expect(result.error).toContain("Unsupported country code");
    });

    test("should reject IBAN with wrong length for country", () => {
      const result = validateIban("CH930076201162385295"); // Too short for CH
      expect(result.valid).toBe(false);
      expect(result.error).toContain("Invalid length");
    });

    test("should reject IBAN with invalid checksum", () => {
      const result = validateIban("CH9300762011623852958"); // Last digit changed
      expect(result.valid).toBe(false);
      expect(result.error).toContain("checksum");
    });

    test("should reject IBAN with non-numeric check digits", () => {
      const result = validateIban("CHAB007620116238529570");
      expect(result.valid).toBe(false);
      expect(result.error).toContain("Check digits must be numeric");
    });
  });

  describe("Edge cases", () => {
    test("should handle lowercase IBAN", () => {
      const result = validateIban("ch9300762011623852957");
      expect(result.valid).toBe(true);
    });

    test("should handle mixed case IBAN", () => {
      const result = validateIban("Ch9300762011623852957");
      expect(result.valid).toBe(true);
    });

    test("should handle empty string", () => {
      const result = validateIban("");
      expect(result.valid).toBe(false);
      expect(result.error).toContain("too short");
    });
  });
});

describe("formatIban", () => {
  test("should format IBAN with spaces", () => {
    const formatted = formatIban("CH9300762011623852957");
    expect(formatted).toBe("CH93 0076 2011 6238 5295 7");
  });

  test("should handle already formatted IBAN", () => {
    const formatted = formatIban("CH93 0076 2011 6238 5295 7");
    expect(formatted).toBe("CH93 0076 2011 6238 5295 7");
  });

  test("should handle lowercase", () => {
    const formatted = formatIban("ch9300762011623852957");
    expect(formatted).toBe("CH93 0076 2011 6238 5295 7");
  });
});

describe("getIbanCountry", () => {
  test("should return country name for valid country code", () => {
    expect(getIbanCountry("CH9300762011623852957")).toBe("Switzerland");
    expect(getIbanCountry("DE89370400440532013000")).toBe("Germany");
    expect(getIbanCountry("GB82WEST12345698765432")).toBe("United Kingdom");
    expect(getIbanCountry("FR1420041010050500013M02606")).toBe("France");
  });

  test("should return null for invalid country code", () => {
    expect(getIbanCountry("XX9300762011623852957")).toBe(null);
  });

  test("should handle IBAN with spaces", () => {
    expect(getIbanCountry("CH93 0076 2011 6238 5295 7")).toBe("Switzerland");
  });
});
