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
    // Target modern browsers — reduces polyfill overhead
    target: 'es2020',
    // Suppress chunk size warning for large 3D vendor chunk
    chunkSizeWarningLimit: 600,
    // Single CSS bundle — prevents FOUC from multiple CSS loads
    cssCodeSplit: false,
    // Minify with esbuild (default, fastest)
    minify: 'esbuild',
    // Disable automatic modulepreload injection for lazy chunks
    // Vite injects modulepreload for ALL chunks by default — this causes lazy chunks
    // (MallExplorer3D/Three.js) to be fetched eagerly, defeating code splitting.
    modulePreload: { polyfill: false },
    rollupOptions: {
      output: {
        // Manual chunks: split heavy vendors from app code
        manualChunks: (id) => {
          // Three.js — large 3D library, only needed on Explore page
          if (id.includes('node_modules/three')) {
            return 'vendor-three';
          }
          // Motion/Framer Motion animation library
          if (id.includes('node_modules/motion') || id.includes('node_modules/framer-motion')) {
            return 'vendor-motion';
          }
          // React core runtime
          if (
            id.includes('node_modules/react') ||
            id.includes('node_modules/react-dom') ||
            id.includes('node_modules/scheduler')
          ) {
            return 'vendor-react';
          }
          // Lucide icons — tree-shaken but still a separate chunk helps caching
          if (id.includes('node_modules/lucide-react')) {
            return 'vendor-lucide';
          }
          // MallExplorer3D — only needed on Explore page, lazy loaded
          if (id.includes('src/components/MallExplorer3D')) return 'MallExplorer3D';
        },
      },
    },
  },
});
