/**
 * IBAN Validation Utility
 * Validates International Bank Account Numbers according to ISO 13616 standard
 */

// IBAN country code lengths (ISO 13616)
const IBAN_LENGTHS: Record<string, number> = {
  AD: 24, // Andorra
  AE: 23, // United Arab Emirates
  AL: 28, // Albania
  AT: 20, // Austria
  AZ: 28, // Azerbaijan
  BA: 20, // Bosnia and Herzegovina
  BE: 16, // Belgium
  BG: 22, // Bulgaria
  BH: 22, // Bahrain
  BR: 29, // Brazil
  BY: 28, // Belarus
  CH: 21, // Switzerland
  CR: 22, // Costa Rica
  CY: 28, // Cyprus
  CZ: 24, // Czech Republic
  DE: 22, // Germany
  DK: 18, // Denmark
  DO: 28, // Dominican Republic
  EE: 20, // Estonia
  EG: 29, // Egypt
  ES: 24, // Spain
  FI: 18, // Finland
  FO: 18, // Faroe Islands
  FR: 27, // France
  GB: 22, // United Kingdom
  GE: 22, // Georgia
  GI: 23, // Gibraltar
  GL: 18, // Greenland
  GR: 27, // Greece
  GT: 28, // Guatemala
  HR: 21, // Croatia
  HU: 28, // Hungary
  IE: 22, // Ireland
  IL: 23, // Israel
  IS: 26, // Iceland
  IT: 27, // Italy
  JO: 30, // Jordan
  KW: 30, // Kuwait
  KZ: 20, // Kazakhstan
  LB: 28, // Lebanon
  LC: 32, // Saint Lucia
  LI: 21, // Liechtenstein
  LT: 20, // Lithuania
  LU: 20, // Luxembourg
  LV: 21, // Latvia
  MC: 27, // Monaco
  MD: 24, // Moldova
  ME: 22, // Montenegro
  MK: 19, // North Macedonia
  MR: 27, // Mauritania
  MT: 31, // Malta
  MU: 30, // Mauritius
  NL: 18, // Netherlands
  NO: 15, // Norway
  PK: 24, // Pakistan
  PL: 28, // Poland
  PS: 29, // Palestine
  PT: 25, // Portugal
  QA: 29, // Qatar
  RO: 24, // Romania
  RS: 22, // Serbia
  SA: 24, // Saudi Arabia
  SE: 24, // Sweden
  SI: 19, // Slovenia
  SK: 24, // Slovakia
  SM: 27, // San Marino
  TN: 24, // Tunisia
  TR: 26, // Turkey
  UA: 29, // Ukraine
  VA: 22, // Vatican City
  VG: 24, // British Virgin Islands
  XK: 20, // Kosovo
};

/**
 * Removes all whitespace and converts to uppercase
 */
function normalizeIban(iban: string): string {
  return iban.replace(/\s+/g, "").toUpperCase();
}

/**
 * Checks if the IBAN has valid characters (alphanumeric only)
 */
function hasValidCharacters(iban: string): boolean {
  return /^[A-Z0-9]+$/.test(iban);
}

/**
 * Converts letters to numbers for mod-97 calculation
 * A=10, B=11, C=12, ..., Z=35
 */
function replaceLettersWithNumbers(iban: string): string {
  return iban.replace(/[A-Z]/g, (char) => {
    return (char.charCodeAt(0) - 55).toString();
  });
}

/**
 * Calculates mod-97 for large numbers (as strings)
 */
function mod97(numericString: string): number {
  let remainder = 0;
  for (let i = 0; i < numericString.length; i++) {
    remainder = (remainder * 10 + parseInt(numericString[i], 10)) % 97;
  }
  return remainder;
}

/**
 * Validates IBAN checksum using mod-97 algorithm
 */
function validateChecksum(iban: string): boolean {
  // Move first 4 characters to the end
  const rearranged = iban.slice(4) + iban.slice(0, 4);

  // Replace letters with numbers
  const numericIban = replaceLettersWithNumbers(rearranged);

  // Calculate mod-97
  return mod97(numericIban) === 1;
}

/**
 * Formats IBAN with spaces (groups of 4 characters)
 */
export function formatIban(iban: string): string {
  const normalized = normalizeIban(iban);
  return normalized.replace(/(.{4})/g, "$1 ").trim();
}

/**
 * Validates an IBAN
 * @param iban - The IBAN to validate
 * @returns Object with validation result and error message
 */
export function validateIban(iban: string): {
  valid: boolean;
  errorCode?: string;
} {
  // Normalize the IBAN
  const normalized = normalizeIban(iban);

  // Check minimum length
  if (normalized.length < 15) {
    return { valid: false, errorCode: "ibanTooShort" };
  }

  // Check maximum length
  if (normalized.length > 34) {
    return { valid: false, errorCode: "ibanTooLong" };
  }

  // Check if it contains only valid characters
  if (!hasValidCharacters(normalized)) {
    return { valid: false, errorCode: "ibanInvalidCharacters" };
  }

  // Extract country code (first 2 characters)
  const countryCode = normalized.slice(0, 2);

  // Check if country code is alphabetic
  if (!/^[A-Z]{2}$/.test(countryCode)) {
    return { valid: false, errorCode: "ibanInvalidCountry" };
  }

  // Check if country code is supported
  if (!IBAN_LENGTHS[countryCode]) {
    return { valid: false, errorCode: "ibanInvalidCountry" };
  }

  // Check if length matches country-specific length
  const expectedLength = IBAN_LENGTHS[countryCode];
  if (normalized.length !== expectedLength) {
    return { valid: false, errorCode: "ibanInvalidLength" };
  }

  // Validate check digits (positions 3-4)
  const checkDigits = normalized.slice(2, 4);
  if (!/^\d{2}$/.test(checkDigits)) {
    return { valid: false, errorCode: "ibanInvalid" };
  }

  // Validate checksum using mod-97 algorithm
  if (!validateChecksum(normalized)) {
    return { valid: false, errorCode: "ibanInvalidChecksum" };
  }

  return { valid: true };
}

/**
 * Returns the country name for a given IBAN country code
 */
export function getIbanCountry(iban: string): string | null {
  const normalized = normalizeIban(iban);
  const countryCode = normalized.slice(0, 2);

  const countries: Record<string, string> = {
    AD: "Andorra",
    AE: "United Arab Emirates",
    AL: "Albania",
    AT: "Austria",
    AZ: "Azerbaijan",
    BA: "Bosnia and Herzegovina",
    BE: "Belgium",
    BG: "Bulgaria",
    BH: "Bahrain",
    BR: "Brazil",
    BY: "Belarus",
    CH: "Switzerland",
    CR: "Costa Rica",
    CY: "Cyprus",
    CZ: "Czech Republic",
    DE: "Germany",
    DK: "Denmark",
    DO: "Dominican Republic",
    EE: "Estonia",
    EG: "Egypt",
    ES: "Spain",
    FI: "Finland",
    FO: "Faroe Islands",
    FR: "France",
    GB: "United Kingdom",
    GE: "Georgia",
    GI: "Gibraltar",
    GL: "Greenland",
    GR: "Greece",
    GT: "Guatemala",
    HR: "Croatia",
    HU: "Hungary",
    IE: "Ireland",
    IL: "Israel",
    IS: "Iceland",
    IT: "Italy",
    JO: "Jordan",
    KW: "Kuwait",
    KZ: "Kazakhstan",
    LB: "Lebanon",
    LC: "Saint Lucia",
    LI: "Liechtenstein",
    LT: "Lithuania",
    LU: "Luxembourg",
    LV: "Latvia",
    MC: "Monaco",
    MD: "Moldova",
    ME: "Montenegro",
    MK: "North Macedonia",
    MR: "Mauritania",
    MT: "Malta",
    MU: "Mauritius",
    NL: "Netherlands",
    NO: "Norway",
    PK: "Pakistan",
    PL: "Poland",
    PS: "Palestine",
    PT: "Portugal",
    QA: "Qatar",
    RO: "Romania",
    RS: "Serbia",
    SA: "Saudi Arabia",
    SE: "Sweden",
    SI: "Slovenia",
    SK: "Slovakia",
    SM: "San Marino",
    TN: "Tunisia",
    TR: "Turkey",
    UA: "Ukraine",
    VA: "Vatican City",
    VG: "British Virgin Islands",
    XK: "Kosovo",
  };

  return countries[countryCode] || null;
}
