import { Translations } from "./en";

export const de: Translations = {
  // Common
  common: {
    email: "E-Mail",
    password: "Passwort",
    signIn: "Anmelden",
    logout: "Abmelden",
    loading: "Laden...",
    save: "Speichern",
    cancel: "Abbrechen",
    confirm: "Bestätigen",
    delete: "Löschen",
    edit: "Bearbeiten",
    search: "Suchen",
  },

  // Auth/Login
  auth: {
    title: "E-Banking",
    welcomeBack: "E-Banking",
    signInDescription: "Melden Sie sich bei Ihrem Konto an",
    emailPlaceholder: "Geben Sie Ihre E-Mail ein",
    passwordPlaceholder: "Geben Sie Ihr Passwort ein",
    forgotPassword: "Passwort vergessen?",
    rememberMe: "Angemeldet bleiben",
  },

  // Navigation
  nav: {
    dashboard: "Dashboard",
    accounts: "Konten",
    payment: "Zahlung",
    settings: "Einstellungen",
    login: "Anmelden",
  },

  // Payment
  payment: {
    newPayment: "Neue Zahlung",
    paymentDetails: "Zahlungsdetails",
    searchPrevious: "Frühere Zahlungen suchen",
    searchPreviousPayments: "Frühere Zahlungen suchen",
    searchPlaceholder: "Suche nach Empfänger, Konto oder Notiz...",
    fromAccount: "Von Konto",
    recipient: "Empfänger",
    recipientPlaceholder: "Empfängername oder Konto eingeben",
    amount: "Betrag",
    amountPlaceholder: "0,00 €",
    note: "Notiz",
    noteOptional: "Notiz (Optional)",
    notePlaceholder: "Notiz hinzufügen",
    sendPayment: "Zahlung senden",
    
    // Standing Payment
    standingPayment: "Dauerauftrag",
    recurringPayment: "Wiederkehrende Zahlung einrichten",
    standingPaymentDescription: "Wiederkehrende Zahlung einrichten",
    setupStandingPayment: "Dauerauftrag einrichten",
    setUpStandingPayment: "Dauerauftrag einrichten",
    frequency: "Häufigkeit",
    frequencyWeekly: "Wöchentlich",
    frequencyMonthly: "Monatlich",
    frequencyQuarterly: "Vierteljährlich",
    frequencyYearly: "Jährlich",
    weekly: "Wöchentlich",
    monthly: "Monatlich",
    quarterly: "Vierteljährlich",
    yearly: "Jährlich",
    paymentPeriod: "Zahlungszeitraum",
    startDate: "Startdatum",
    endDate: "Enddatum (Optional)",
    endDateOptional: "Enddatum (Optional)",
    endDateHint: "Enddatum leer lassen für unbefristeten Dauerauftrag",
    endDateHelper: "Enddatum leer lassen für unbefristeten Dauerauftrag",
    executionDay: "Ausführungstag",
    executionDayPlaceholder: {
      weekly: "Wochentag (z.B. Montag)",
      monthly: "Tag des Monats (1-31)",
      quarterly: "Tag des Monats (1-31)",
      yearly: "Tag des Monats (1-31)",
      other: "Tag des Monats (1-31)",
    },
    executionDayHelper: {
      weekly: "Geben Sie den Wochentag für die Zahlungsausführung ein",
      monthly: "Geben Sie den Tag des Monats (1-31) für die Zahlungsausführung ein",
      quarterly: "Geben Sie den Tag des Monats (1-31) für die Zahlungsausführung ein",
      yearly: "Geben Sie den Tag des Monats (1-31) für die Zahlungsausführung ein",
      other: "Geben Sie den Tag des Monats (1-31) für die Zahlungsausführung ein",
    },
    
    // Recent Recipients
    recentRecipients: "Letzte Empfänger",
    pay: "Bezahlen",
    account: "Konto",
  },

  // Dashboard
  dashboard: {
    totalBalance: "Gesamtsaldo",
    today: "Heute",
    fromLastMonth: "vom letzten Monat",
    quickActions: "Schnellzugriff",
    transferMoney: "Geld überweisen",
    payBills: "Rechnungen bezahlen",
    viewAccounts: "Konten anzeigen",
    recentTransactions: "Letzte Transaktionen",
  },

  // Accounts
  accounts: {
    checking: "Girokonto",
    savings: "Sparkonto",
    credit: "Kreditkarte",
    transactions: "Letzte Transaktionen",
  },

  // Categories
  categories: {
    food: "Lebensmittel",
    income: "Einkommen",
    utilities: "Nebenkosten",
    transport: "Transport",
    transfer: "Überweisung",
    interest: "Zinsen",
    shopping: "Einkaufen",
    payment: "Zahlung",
    services: "Dienstleistungen",
    travel: "Reisen",
  },

  // Settings
  settings: {
    title: "Einstellungen",
    subtitle: "Verwalten Sie Ihre Kontoeinstellungen",
    
    // Language
    language: {
      title: "Sprache",
      description: "Wählen Sie Ihre bevorzugte Sprache",
    },
    
    // Appearance
    appearance: {
      title: "Darstellung",
      description: "Passen Sie das Erscheinungsbild der App an",
      darkMode: "Dunkler Modus",
      darkModeEnabled: "Dunkler Modus aktiviert",
      lightModeEnabled: "Heller Modus aktiviert",
    },
    
    // Security
    security: {
      title: "Sicherheit",
      description: "Verwalten Sie Ihre Sicherheitseinstellungen",
      changePassword: "Passwort ändern",
      twoFactor: "Zwei-Faktor-Authentifizierung",
    },
    
    // Notifications
    notifications: {
      title: "Benachrichtigungen",
      description: "Benachrichtigungseinstellungen verwalten",
      email: "E-Mail-Benachrichtigungen",
      push: "Push-Benachrichtigungen",
    },
    
    // About
    about: {
      title: "Über",
      version: "Version",
      buildNumber: "Build-Nummer",
    },
  },
};
