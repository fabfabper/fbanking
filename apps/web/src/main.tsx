import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { I18nextProvider } from "react-i18next";
import { i18n } from "@ebanking/i18n";
import { UIProvider } from "@ebanking/ui";
import App from "./App";
import "./styles.css";

const AppWrapper = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // Update body background color when theme changes
    document.body.style.backgroundColor = darkMode ? "#0F172A" : "#F9FAFB";
  }, [darkMode]);

  return (
    <I18nextProvider i18n={i18n}>
      <UIProvider darkMode={darkMode}>
        <BrowserRouter>
          <App darkMode={darkMode} setDarkMode={setDarkMode} />
        </BrowserRouter>
      </UIProvider>
    </I18nextProvider>
  );
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AppWrapper />
  </React.StrictMode>
);
