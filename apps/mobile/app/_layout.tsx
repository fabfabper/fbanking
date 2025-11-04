import React, { useState } from 'react';
import { Stack, useRouter } from 'expo-router';
import { UIProvider } from '@ebanking/ui';

export default function RootLayout() {
  return (
    <UIProvider>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      />
    </UIProvider>
  );
}
