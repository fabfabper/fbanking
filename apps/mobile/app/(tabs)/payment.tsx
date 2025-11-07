import { PaymentScreen } from "@ebanking/screens";
import { useLocalSearchParams } from "expo-router";
import { View, Text } from "react-native";
import api from "../../lib/api";

export default function Payment() {
  try {
    const params = useLocalSearchParams();

    console.log("[Payment] Raw params:", JSON.stringify(params, null, 2));

    // Convert params to initialData format
    // expo-router serializes all params as strings, so we need to handle that
    const initialData =
      Object.keys(params).length > 0
        ? {
            recipient: params.recipient as string | undefined,
            amount: params.amount as string | undefined,
            note: params.note as string | undefined,
            iban: params.iban as string | undefined,
            street: params.street as string | undefined,
            houseNumber: params.houseNumber as string | undefined,
            city: params.city as string | undefined,
            postalCode: params.postalCode as string | undefined,
            country: params.country as string | undefined,
          }
        : undefined;

    console.log(
      "[Payment] Parsed initialData:",
      JSON.stringify(initialData, null, 2)
    );

    return <PaymentScreen api={api} initialData={initialData} />;
  } catch (error) {
    console.error("[Payment] Error rendering:", error);
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          padding: 20,
        }}
      >
        <Text style={{ color: "red", marginBottom: 10 }}>
          Error loading payment screen
        </Text>
        <Text>{error instanceof Error ? error.message : String(error)}</Text>
      </View>
    );
  }
}
