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
};

// Reset cache on file changes
config.resetCache = true;

module.exports = config;
