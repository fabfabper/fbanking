export const en = {
  qr: {
    title: "Scan QR Code",
    success: "QR Code Scanned Successfully! ✓",
    scanAnother: "Scan Another",
    initializingCamera: "Initializing camera...",
    positionFrame: "Position the QR code within the frame",
    loading: "Loading scanner...",
    requestingPermission: "Requesting camera permission...",
    permissionRequiredTitle: "Camera Permission Required",
    permissionRequiredDescription: "Please grant camera permission to scan QR codes.",
    close: "Close",
    cancel: "Cancel",
    scanAgain: "Scan Again",
  },
  // Common
  common: {
    email: "Email",
    password: "Password",
    signIn: "Sign In",
    logout: "Logout",
    loading: "Loading",
    save: "Save",
    cancel: "Cancel",
    confirm: "Confirm",
    delete: "Delete",
    edit: "Edit",
    search: "Search",
    searching: "Searching...",
    error: "Error",
    retry: "Retry",
    or: "or",
    share: "Share",
    copy: "Copy",
  },

  // Auth/Login
  auth: {
    title: "E-Banking",
    welcomeBack: "Welcome back",
    signInDescription: "Sign in to your account",
    emailPlaceholder: "Enter your email",
    passwordPlaceholder: "Enter your password",
    forgotPassword: "Forgot password?",
    forgotYourPassword: "Forgot your password?",
    resetPassword: "Reset it here",
    rememberMe: "Remember me",
    noAccount: "Don't have an account?",
    signUp: "Sign up",
    termsAgreement: "By signing in, you agree to our Terms & Privacy Policy",
    useFaceID: "Use Face ID",
    useTouchID: "Use Touch ID",
    useIrisScanner: "Use Iris Scanner",
    useBiometric: "Use Biometric",
    authenticating: "Authenticating...",
  },

  // Navigation
  nav: {
    dashboard: "Dashboard",
    accounts: "Accounts",
    payment: "Payment",
    settings: "Settings",
    login: "Login",
  },

  // Payment
  payment: {
    errors: {
      recipientRequired: "Recipient name is required",
      ibanRequired: "IBAN is required",
      ibanInvalid: "Invalid IBAN",
      ibanTooShort: "IBAN is too short",
      ibanTooLong: "IBAN is too long",
      ibanInvalidCharacters: "IBAN contains invalid characters",
      ibanInvalidCountry: "Invalid or unsupported country code",
      ibanInvalidLength: "Invalid IBAN length for this country",
      ibanInvalidChecksum: "Invalid IBAN checksum",
      amountRequired: "Amount is required",
      amountInvalid: "Please enter a valid amount",
    },
    newPayment: "New Payment",
    paymentDetails: "Payment Details",
    searchPrevious: "Search Previous Payments",
    searchPreviousPayments: "Search Previous Payments",
    searchPlaceholder: "Search by recipient, IBAN...",
    noSearchResults: "No results found",
    fromAccount: "From Account",
    recipient: "Recipient",
    recipientPlaceholder: "Enter recipient name",
    amount: "Amount",
    amountPlaceholder: "$0.00",
    note: "Note",
    noteOptional: "Note (Optional)",
    notePlaceholder: "Add a note",
    sendPayment: "Send Payment",

    // Address fields
    streetPlaceholder: "Street and number",
    cityPlaceholder: "City",
    postalCodePlaceholder: "Postal code",
    countryPlaceholder: "Country",

    // Standing Payment
    standingPayment: "Standing Payment",
    recurringPayment: "Set up recurring payment",
    standingPaymentDescription: "Set up recurring payment",
    setupStandingPayment: "Set Up Standing Payment",
    setUpStandingPayment: "Set Up Standing Payment",
    frequency: "Frequency",
    frequencyWeekly: "Weekly",
    frequencyMonthly: "Monthly",
    frequencyQuarterly: "Quarterly",
    frequencyYearly: "Yearly",
    weekly: "Weekly",
    monthly: "Monthly",
    quarterly: "Quarterly",
    yearly: "Yearly",
    paymentPeriod: "Payment Period",
    startDate: "Start Date",
    endDate: "End Date (Optional)",
    endDateOptional: "End Date (Optional)",
    endDateHint: "Leave end date empty for indefinite standing payment",
    endDateHelper: "Leave end date empty for indefinite standing payment",
    executionDay: "Execution Day",
    executionDayPlaceholder: {
      weekly: "Day of week (e.g., Monday)",
      monthly: "Day of month (1-31)",
      quarterly: "Day of month (1-31)",
      yearly: "Day of month (1-31)",
      other: "Day of month (1-31)",
    },
    executionDayHelper: {
      weekly: "Enter the day of the week for payment execution",
      monthly: "Enter the day of the month (1-31) for payment execution",
      quarterly: "Enter the day of the month (1-31) for payment execution",
      yearly: "Enter the day of the month (1-31) for payment execution",
      other: "Enter the day of the month (1-31) for payment execution",
    },

    // Recent Recipients
    recentRecipients: "Recent Recipients",
    pay: "Pay",
    account: "Account",
  },

  // Dashboard
  dashboard: {
    totalBalance: "Total Balance",
    today: "Today",
    fromLastMonth: "from last month",
    expenseCategories: "Expense Categories",
    incomeVsExpenses: "Income vs Expenses",
    income: "Income",
    expenses: "Expenses",
    netBalance: "Net Balance",
    quickActions: "Quick Actions",
    transferMoney: "Transfer Money",
    payBills: "Pay Bills",
    viewAccounts: "View Accounts",
    recentTransactions: "Recent Transactions",
  },

  // Accounts
  accounts: {
    currentBalance: "Current Balance",
    checking: "Checking Account",
    savings: "Savings Account",
    credit: "Credit Card",
    transactions: "Recent Transactions",
    noAccounts: "No Accounts Found",
    noAccountsDescription: "You don't have any accounts set up yet. Please contact your bank to create an account.",
    noTransactions: "No Transactions",
    noTransactionsDescription: "No transactions found for this account.",
    filterAll: "All",
    filterIncomes: "Incomes",
    filterExpenses: "Expenses",
  },

  // Categories
  categories: {
    food: "Food",
    income: "Income",
    utilities: "Utilities",
    transport: "Transport",
    transfer: "Transfer",
    interest: "Interest",
    shopping: "Shopping",
    payment: "Payment",
    services: "Services",
    travel: "Travel",
    entertainment: "Entertainment",
  },

  // Settings
  settings: {
    title: "Settings",
    subtitle: "Manage your account preferences",

    // Language
    language: {
      title: "Language",
      description: "Choose your preferred language",
    },

    // Appearance
    appearance: {
      title: "Appearance",
      description: "Customize how the app looks",
      darkMode: "Dark Mode",
      darkModeEnabled: "Dark mode enabled",
      lightModeEnabled: "Light mode enabled",
    },

    // Security
    security: {
      title: "Security",
      description: "Manage your security settings",
      changePassword: "Change Password",
      twoFactor: "Two-Factor Authentication",
    },

    // Notifications
    notifications: {
      title: "Notifications",
      description: "Manage notification preferences",
      email: "Email Notifications",
      push: "Push Notifications",
    },

    // About
    about: {
      title: "About",
      version: "Version",
      buildNumber: "Build Number",
    },
  },

  // Transaction Screen
  transaction: {
    id: "Transaction ID",
    details: "Transaction Details",
    amount: "Amount",
    date: "Date",
    recipient: "Recipient",
    description: "Description",
    category: "Category",
    notFound: "Transaction not found",
  },
};

export type Translations = typeof en;
