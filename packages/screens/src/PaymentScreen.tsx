import React, { useState } from 'react';
import { YStack, Text, Card, Input, Button } from '@ebanking/ui';

export const PaymentScreen: React.FC = () => {
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [note, setNote] = useState('');

  const handleSend = () => {
    console.log('Send payment:', { recipient, amount, note });
  };

  return (
    <YStack flex={1} backgroundColor="$backgroundGray" padding="$6" gap="$6">
      <YStack gap="$2">
        <Text size="2xl" weight="bold">
          Send Payment
        </Text>
        <Text size="md" color="secondary">
          Transfer money to another account
        </Text>
      </YStack>

      <Card>
        <YStack gap="$4">
          <YStack gap="$2">
            <Text size="sm" weight="medium">
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
            <Text size="sm" weight="medium">
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
            <Text size="sm" weight="medium">
              Note (Optional)
            </Text>
            <Input
              value={note}
              onChangeText={setNote}
              placeholder="Add a note"
              fullWidth
            />
          </YStack>

          <Button onPress={handleSend} fullWidth size="lg">
            Send Payment
          </Button>
        </YStack>
      </Card>
    </YStack>
  );
};
