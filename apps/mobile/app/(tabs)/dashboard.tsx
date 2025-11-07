import { DashboardScreen } from "@ebanking/screens";
import { useRouter } from "expo-router";
import api from "../../lib/api";

export default function Dashboard() {
  const router = useRouter();

  const handleNavigateToPayment = (paymentData: any) => {
    console.log(
      "[Dashboard] Navigating to payment with data:",
      JSON.stringify(paymentData, null, 2)
    );

    try {
      // Ensure all values are strings or undefined (expo-router requirement)
      const sanitizedData: Record<string, string> = {};

      if (paymentData.recipient)
        sanitizedData.recipient = String(paymentData.recipient);
      if (paymentData.amount) sanitizedData.amount = String(paymentData.amount);
      if (paymentData.note) sanitizedData.note = String(paymentData.note);
      if (paymentData.iban) sanitizedData.iban = String(paymentData.iban);
      if (paymentData.street) sanitizedData.street = String(paymentData.street);
      if (paymentData.city) sanitizedData.city = String(paymentData.city);
      if (paymentData.postalCode)
        sanitizedData.postalCode = String(paymentData.postalCode);
      if (paymentData.country)
        sanitizedData.country = String(paymentData.country);

      console.log(
        "[Dashboard] Sanitized data:",
        JSON.stringify(sanitizedData, null, 2)
      );

      router.push({
        pathname: "/(tabs)/payment",
        params: sanitizedData,
      });
    } catch (error) {
      console.error("[Dashboard] Navigation error:", error);
    }
  };

  return (
    <DashboardScreen api={api} onNavigateToPayment={handleNavigateToPayment} />
  );
}
