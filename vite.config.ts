import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "dist",
    rollupOptions: {
      input: "index.html", // Ensure this points to the correct location
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
  },
});
