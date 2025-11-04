import React from "react";
import { TamaguiProvider } from "@tamagui/core";
import config from "./tamagui.config";

export interface UIProviderProps {
  children: React.ReactNode;
}

export const UIProvider: React.FC<UIProviderProps> = ({ children }) => {
  return (
    <TamaguiProvider config={config} defaultTheme="light">
      {children}
    </TamaguiProvider>
  );
};
