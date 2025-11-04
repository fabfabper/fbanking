import React from "react";
import { SettingsScreen } from "@ebanking/screens";
import { useDarkMode } from "../_layout";

export default function Settings() {
  const { darkMode, setDarkMode } = useDarkMode();

  return <SettingsScreen darkMode={darkMode} onToggleDarkMode={setDarkMode} />;
}
