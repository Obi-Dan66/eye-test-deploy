import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "dist",
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, "index.html"),
      },
    },
  },
  base: "/eye-test-deploy/",
  server: {
    proxy: {
      "/eye-test-deploy/proxy": {
        target: process.env.VITE_API_CALL_ORIGIN,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/eye-test-deploy\/proxy/, "/proxy"),
      },
    },
    port: 8080,
    host: "0.0.0.0",
  },
});
