import React, { useState } from "react";
import { ScrollView } from "react-native";
import { YStack, XStack, Text, Card, Input, Button, theme } from "@ebanking/ui";

export const PaymentScreen: React.FC = () => {
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");

  const handleSend = () => {
    console.log("Send payment:", { recipient, amount, note });
  };

  const recentRecipients = [
    { id: 1, name: "John Smith", account: "****3456" },
    { id: 2, name: "Sarah Johnson", account: "****7890" },
    { id: 3, name: "Mike Davis", account: "****2345" },
  ];

  return (
    <YStack flex={1} backgroundColor="$backgroundGray" paddingTop="$4">
      <ScrollView showsVerticalScrollIndicator={false}>
        <YStack padding="$6" gap="$6" paddingBottom="$8">
          {/* Payment Form Card */}
          <Card
            style={{
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.1,
              shadowRadius: 8,
              elevation: 3,
            }}
          >
            <YStack gap="$5" padding="$4">
              <Text size="xl" weight="bold" style={{ marginBottom: 4 }}>
                New Payment
              </Text>

              <YStack gap="$2">
                <Text
                  size="md"
                  weight="semibold"
                  style={{ color: theme.colors.textPrimary }}
                >
                  Recipient
                </Text>
                <Input
                  value={recipient}
                  onChangeText={setRecipient}
                  placeholder="Enter recipient name or account"
                  fullWidth
                />
              </YStack>

              <YStack gap="$2">
                <Text
                  size="md"
                  weight="semibold"
                  style={{ color: theme.colors.textPrimary }}
                >
                  Amount
                </Text>
                <Input
                  value={amount}
                  onChangeText={setAmount}
                  placeholder="$0.00"
                  keyboardType="numeric"
                  fullWidth
                />
              </YStack>

              <YStack gap="$2">
                <Text
                  size="md"
                  weight="semibold"
                  style={{ color: theme.colors.textPrimary }}
                >
                  Note (Optional)
                </Text>
                <Input
                  value={note}
                  onChangeText={setNote}
                  placeholder="Add a note"
                  fullWidth
                />
              </YStack>

              <Button
                onPress={handleSend}
                fullWidth
                size="lg"
                style={{ marginTop: 8 }}
              >
                Send Payment
              </Button>
            </YStack>
          </Card>

          {/* Recent Recipients */}
          <YStack gap="$4">
            <Text size="xl" weight="bold" style={{ marginBottom: 4 }}>
              Recent Recipients
            </Text>
            <YStack gap="$3">
              {recentRecipients.map((recipient) => (
                <Card
                  key={recipient.id}
                  hoverable
                  pressable
                  onPress={() => setRecipient(recipient.name)}
                  style={{
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 1 },
                    shadowOpacity: 0.05,
                    shadowRadius: 3,
                    elevation: 1,
                  }}
                >
                  <XStack
                    justifyContent="space-between"
                    alignItems="center"
                    padding="$4"
                    gap="$4"
                  >
                    <YStack gap="$2" flex={1}>
                      <Text
                        size="md"
                        weight="semibold"
                        style={{ lineHeight: 20 }}
                      >
                        {recipient.name}
                      </Text>
                      <Text
                        size="sm"
                        style={{ color: theme.colors.textSecondary }}
                      >
                        Account {recipient.account}
                      </Text>
                    </YStack>
                    <Button variant="outline" size="sm">
                      Pay
                    </Button>
                  </XStack>
                </Card>
              ))}
            </YStack>
          </YStack>
        </YStack>
      </ScrollView>
    </YStack>
  );
};
