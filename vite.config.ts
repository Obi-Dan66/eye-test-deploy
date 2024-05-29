import { defineConfig, loadEnv, UserConfigExport, ConfigEnv } from 'vite';
import react from '@vitejs/plugin-react';

// Define the function with explicit types for parameters
export default ({ mode }: ConfigEnv): UserConfigExport => {
  const env = loadEnv(mode, process.cwd(), '');

  return defineConfig({
    plugins: [react()],
    base: env.BASE_URL || '/',
  });
};