import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, '.'),
    },
  },
  server: {
    host: '0.0.0.0',
    port: 3000,
    allowedHosts: true,
  },
  build: {
    // Suppress chunk size warning — the large bundle is expected given the
    // number of imported images and Three.js. Consider lazy-loading pages
    // in future iterations for better performance.
    chunkSizeWarningLimit: 1200,
  },
});
