import React from 'react';
import { YStack, XStack, Text, Card, Button } from '@ebanking/ui';

export const DashboardScreen: React.FC = () => {
  return (
    <YStack flex={1} backgroundColor="$backgroundGray" padding="$6" gap="$6">
      {/* Header */}
      <YStack gap="$2">
        <Text size="2xl" weight="bold">
          Dashboard
        </Text>
        <Text size="md" color="secondary">
          Welcome back!
        </Text>
      </YStack>

      {/* Account Balance Card */}
      <Card>
        <YStack gap="$3">
          <Text size="sm" color="secondary">
            Total Balance
          </Text>
          <Text size="3xl" weight="bold" color="primary">
            $12,450.00
          </Text>
          <XStack gap="$2">
            <Text size="sm" color="success">
              +2.5%
            </Text>
            <Text size="sm" color="secondary">
              from last month
            </Text>
          </XStack>
        </YStack>
      </Card>

      {/* Quick Actions */}
      <YStack gap="$3">
        <Text size="lg" weight="semibold">
          Quick Actions
        </Text>
        <XStack gap="$3" flexWrap="wrap">
          <Button variant="outline">Transfer Money</Button>
          <Button variant="outline">Pay Bills</Button>
          <Button variant="outline">View Accounts</Button>
        </XStack>
      </YStack>

      {/* Recent Transactions */}
      <YStack gap="$3">
        <Text size="lg" weight="semibold">
          Recent Transactions
        </Text>
        {[
          { id: 1, name: 'Grocery Store', amount: '-$45.20', date: 'Today' },
          { id: 2, name: 'Salary Deposit', amount: '+$3,200.00', date: 'Nov 1' },
          { id: 3, name: 'Electric Bill', amount: '-$89.50', date: 'Oct 31' },
        ].map((transaction) => (
          <Card key={transaction.id} hoverable>
            <XStack justifyContent="space-between" alignItems="center">
              <YStack gap="$1">
                <Text weight="medium">{transaction.name}</Text>
                <Text size="sm" color="secondary">
                  {transaction.date}
                </Text>
              </YStack>
              <Text
                weight="semibold"
                color={transaction.amount.startsWith('+') ? 'success' : 'primary'}
              >
                {transaction.amount}
              </Text>
            </XStack>
          </Card>
        ))}
      </YStack>
    </YStack>
  );
};
