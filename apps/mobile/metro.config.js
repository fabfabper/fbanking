const { getDefaultConfig } = require("expo/metro-config");
const path = require("path");

const projectRoot = __dirname;
const workspaceRoot = path.resolve(projectRoot, "../..");

const config = getDefaultConfig(projectRoot);

// Watch the entire workspace
config.watchFolders = [workspaceRoot];

// Add node_modules paths
config.resolver.nodeModulesPaths = [
  path.resolve(projectRoot, "node_modules"),
  path.resolve(workspaceRoot, "node_modules"),
];

// Resolve package aliases
config.resolver.extraNodeModules = {
  "@ebanking/ui": path.resolve(workspaceRoot, "packages/ui/src"),
  "@ebanking/screens": path.resolve(workspaceRoot, "packages/screens/src"),
  "@ebanking/i18n": path.resolve(workspaceRoot, "packages/i18n/src"),
  "@ebanking/api": path.resolve(workspaceRoot, "packages/api/src"),
  // Provide empty modules for web-only dependencies
  "react-dom": path.resolve(__dirname, "node_modules/react-native/index.js"),
  recharts: path.resolve(__dirname, "node_modules/react-native/index.js"),
  // Force expo packages to resolve from mobile app's node_modules
  "expo-camera": path.resolve(projectRoot, "node_modules/expo-camera"),
  "expo-image-picker": path.resolve(
    projectRoot,
    "node_modules/expo-image-picker"
  ),
  // Force lucide-react-native to resolve from mobile app's node_modules
  "lucide-react-native": path.resolve(projectRoot, "node_modules/lucide-react-native"),
  "react-native-svg": path.resolve(projectRoot, "node_modules/react-native-svg"),
  // Force single instance of React to avoid hook errors
  react: path.resolve(projectRoot, "node_modules/react"),
  "react-native": path.resolve(projectRoot, "node_modules/react-native"),
};

// Reset cache on file changes
config.resetCache = true;

module.exports = config;
