import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  root: __dirname,
  publicDir: "public",
  plugins: [react()],
  server: {
    port: 4200,
    host: "localhost",
    fs: {
      allow: [
        path.resolve(__dirname, "../.."), // Allow workspace root
        path.resolve(__dirname, "../../packages"), // Allow packages directory
      ],
    },
  },
  define: {
    "process.env": {},
    "process.env.NODE_ENV": JSON.stringify(
      process.env.NODE_ENV || "development"
    ),
    "process.env.TAMAGUI_TARGET": JSON.stringify("web"),
  },
  resolve: {
    alias: {
      "@ebanking/ui": path.resolve(__dirname, "../../packages/ui/src"),
      "@ebanking/screens": path.resolve(
        __dirname,
        "../../packages/screens/src"
      ),
      "@ebanking/i18n": path.resolve(__dirname, "../../packages/i18n/src"),
      "@ebanking/api": path.resolve(__dirname, "../../packages/api/src"),
      "react-native": "react-native-web",
      "lucide-react-native": "lucide-react",
      "expo-camera": path.resolve(__dirname, "node_modules/expo-camera"),
      "expo-local-authentication": path.resolve(
        __dirname,
        "src/lib/expo-local-authentication-stub.ts"
      ),
      "expo-notifications": path.resolve(
        __dirname,
        "src/lib/expo-notifications-stub.ts"
      ),
      "expo-device": path.resolve(__dirname, "src/lib/expo-device-stub.ts"),
      recharts: path.resolve(__dirname, "node_modules/recharts"),
      "html5-qrcode": path.resolve(__dirname, "node_modules/html5-qrcode"),
    },
  },
  optimizeDeps: {
    exclude: [
      "react-native",
      "expo-local-authentication",
      "expo-notifications",
      "expo-device",
    ],
    esbuildOptions: {
      loader: {
        ".js": "jsx",
      },
    },
  },
  build: {
    outDir: "dist",
    emptyOutDir: true,
  },
});
