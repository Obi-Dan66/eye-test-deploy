import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/eye-test-deploy/",
  server: {
    proxy: {
      "/eye-test-deploy/proxy": {
        target: "http://localhost:3001",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/eye-test-deploy\/proxy/, "/proxy"),
      },
    },
  },
});
