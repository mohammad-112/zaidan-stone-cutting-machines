import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist', // Output directory
    emptyOutDir: true,
  },
  server: {
    proxy: {
      '/api': 'http://localhost:3000' // Proxy API requests to Express server during dev
    }
  }
});