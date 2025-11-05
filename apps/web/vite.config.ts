import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
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
    },
  },
  optimizeDeps: {
    exclude: ["react-native"],
  },
  build: {
    outDir: "dist",
    emptyOutDir: true,
  },
});
