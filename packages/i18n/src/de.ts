import { Translations } from "./en";

export const de: Translations = {
  qr: {
    title: "QR-Code scannen",
    success: "QR-Code erfolgreich gescannt! ✓",
    scanAnother: "Weitere scannen",
    initializingCamera: "Kamera wird initialisiert...",
    positionFrame: "Positioniere den QR-Code im Rahmen",
    loading: "Scanner wird geladen...",
    requestingPermission: "Kameraberechtigung wird angefordert...",
    permissionRequiredTitle: "Kameraberechtigung erforderlich",
    permissionRequiredDescription: "Bitte erlaube den Kamerazugriff, um QR-Codes zu scannen.",
    close: "Schließen",
    cancel: "Abbrechen",
    scanAgain: "Erneut scannen",
  },
  // Common
  common: {
    email: "E-Mail",
    password: "Passwort",
    signIn: "Anmelden",
    logout: "Abmelden",
    loading: "Laden",
    save: "Speichern",
    cancel: "Abbrechen",
    confirm: "Bestätigen",
    delete: "Löschen",
    edit: "Bearbeiten",
    search: "Suchen",
    searching: "Suchen...",
    error: "Fehler",
    retry: "Wiederholen",
    or: "oder",
  },

  // Auth/Login
  auth: {
    title: "E-Banking",
    welcomeBack: "Willkommen zurück",
    signInDescription: "Melden Sie sich bei Ihrem Konto an",
    emailPlaceholder: "Geben Sie Ihre E-Mail ein",
    passwordPlaceholder: "Geben Sie Ihr Passwort ein",
    forgotPassword: "Passwort vergessen?",
    forgotYourPassword: "Passwort vergessen?",
    resetPassword: "Hier zurücksetzen",
    rememberMe: "Angemeldet bleiben",
    noAccount: "Noch kein Konto?",
    signUp: "Registrieren",
    termsAgreement: "Mit der Anmeldung stimmen Sie unseren AGB & Datenschutzrichtlinien zu",
    useFaceID: "Face ID verwenden",
    useTouchID: "Touch ID verwenden",
    useIrisScanner: "Iris-Scanner verwenden",
    useBiometric: "Biometrisch anmelden",
    authenticating: "Authentifizierung...",
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
    errors: {
      recipientRequired: "Empfängername ist erforderlich",
      ibanRequired: "IBAN ist erforderlich",
      ibanInvalid: "Ungültige IBAN",
      ibanTooShort: "IBAN ist zu kurz",
      ibanTooLong: "IBAN ist zu lang",
      ibanInvalidCharacters: "IBAN enthält ungültige Zeichen",
      ibanInvalidCountry: "Ungültiger oder nicht unterstützter Ländercode",
      ibanInvalidLength: "Ungültige IBAN-Länge für dieses Land",
      ibanInvalidChecksum: "Ungültige IBAN-Prüfsumme",
      amountRequired: "Betrag ist erforderlich",
      amountInvalid: "Bitte geben Sie einen gültigen Betrag ein",
    },
    newPayment: "Neue Zahlung",
    paymentDetails: "Zahlungsdetails",
    searchPrevious: "Frühere Zahlungen suchen",
    searchPreviousPayments: "Frühere Zahlungen suchen",
    searchPlaceholder: "Suche nach Empfänger, Konto oder Notiz...",
    noSearchResults: "Keine Ergebnisse gefunden",
    fromAccount: "Von Konto",
    recipient: "Empfänger",
    recipientPlaceholder: "Empfängername oder Konto",
    amount: "Betrag",
    amountPlaceholder: "CHF 0.00",
    note: "Notiz",
    noteOptional: "Notiz (Optional)",
    notePlaceholder: "Notiz",
    sendPayment: "Zahlung senden",

    // Address fields
    streetPlaceholder: "Strasse und Hausnummer",
    cityPlaceholder: "Stadt",
    postalCodePlaceholder: "Postleitzahl",
    countryPlaceholder: "Land",

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
    expenseCategories: "Ausgabenkategorien",
    incomeVsExpenses: "Einnahmen vs Ausgaben",
    income: "Einnahmen",
    expenses: "Ausgaben",
    netBalance: "Nettosaldo",
    quickActions: "Schnellzugriff",
    transferMoney: "Geld überweisen",
    payBills: "Rechnungen bezahlen",
    viewAccounts: "Konten anzeigen",
    recentTransactions: "Letzte Transaktionen",
  },

  // Accounts
  accounts: {
    currentBalance: "Aktueller Kontostand",
    checking: "Girokonto",
    savings: "Sparkonto",
    credit: "Kreditkarte",
    transactions: "Letzte Transaktionen",
    noAccounts: "Keine Konten gefunden",
    noAccountsDescription:
      "Sie haben noch keine Konten eingerichtet. Bitte kontaktieren Sie Ihre Bank, um ein Konto zu erstellen.",
    noTransactions: "Keine Transaktionen",
    noTransactionsDescription: "Keine Transaktionen für dieses Konto gefunden.",
    filterAll: "Alle",
    filterIncomes: "Einnahmen",
    filterExpenses: "Ausgaben",
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
    entertainment: "Unterhaltung",
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
