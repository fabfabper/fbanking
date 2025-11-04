/**
 * Format a number as CHF currency with Swiss thousand separator (')
 * @param amount - The amount to format
 * @param showSign - Whether to show + sign for positive amounts
 * @returns Formatted currency string (e.g., "CHF 12'450.00" or "-CHF 1'234.50")
 */
export const formatCurrency = (
  amount: number,
  showSign: boolean = false
): string => {
  const absAmount = Math.abs(amount);
  const formatted = absAmount.toFixed(2);

  // Split into integer and decimal parts
  const [integerPart, decimalPart] = formatted.split(".");

  // Add thousand separator (') for Swiss formatting
  const withSeparator = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, "'");

  // Combine with decimal part
  const formattedAmount = `${withSeparator}.${decimalPart}`;

  // Add currency symbol and sign
  if (amount < 0) {
    return `-CHF ${formattedAmount}`;
  } else if (showSign && amount > 0) {
    return `+CHF ${formattedAmount}`;
  } else {
    return `CHF ${formattedAmount}`;
  }
};
