import React, { useState, createContext, useContext } from 'react';
import { Stack, useRouter } from 'expo-router';
import { I18nextProvider } from 'react-i18next';
import { i18n } from '@ebanking/i18n';
import { UIProvider } from '@ebanking/ui';

interface DarkModeContextType {
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
}

const DarkModeContext = createContext<DarkModeContextType>({
  darkMode: false,
  setDarkMode: () => {},
});

export const useDarkMode = () => useContext(DarkModeContext);

export default function RootLayout() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <I18nextProvider i18n={i18n}>
      <DarkModeContext.Provider value={{ darkMode, setDarkMode }}>
        <UIProvider darkMode={darkMode}>
          <Stack
            screenOptions={{
              headerShown: false,
            }}
          />
        </UIProvider>
      </DarkModeContext.Provider>
    </I18nextProvider>
  );
}
