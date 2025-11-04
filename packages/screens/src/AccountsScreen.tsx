import React from 'react';
import { YStack, Text, Card } from '@ebanking/ui';

export const AccountsScreen: React.FC = () => {
  const accounts = [
    { id: 1, name: 'Checking Account', number: '****1234', balance: '$5,430.00' },
    { id: 2, name: 'Savings Account', number: '****5678', balance: '$12,850.00' },
    { id: 3, name: 'Credit Card', number: '****9012', balance: '-$1,230.50' },
  ];

  return (
    <YStack flex={1} backgroundColor="$backgroundGray" padding="$6" gap="$6">
      <YStack gap="$2">
        <Text size="2xl" weight="bold">
          Accounts
        </Text>
        <Text size="md" color="secondary">
          Manage your accounts
        </Text>
      </YStack>

      <YStack gap="$4">
        {accounts.map((account) => (
          <Card key={account.id} hoverable>
            <YStack gap="$3">
              <Text size="lg" weight="semibold">
                {account.name}
              </Text>
              <Text size="sm" color="secondary">
                {account.number}
              </Text>
              <Text size="xl" weight="bold" color="primary">
                {account.balance}
              </Text>
            </YStack>
          </Card>
        ))}
      </YStack>
    </YStack>
  );
};
