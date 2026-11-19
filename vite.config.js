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
    // Enable CSS code splitting for better caching
    cssCodeSplit: false,
    // Minify with esbuild (default, fastest)
    minify: 'esbuild',
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
          if (id.includes('node_modules/react') || id.includes('node_modules/react-dom') || id.includes('node_modules/scheduler')) {
            return 'vendor-react';
          }
          // Lucide icons — tree-shaken but still a separate chunk helps caching
          if (id.includes('node_modules/lucide-react')) {
            return 'vendor-lucide';
          }
          // Page-level chunks (lazy loaded)
          if (id.includes('src/pages/ExplorePage')) return 'ExplorePage';
          if (id.includes('src/pages/ShoppingPage')) return 'ShoppingPage';
          if (id.includes('src/pages/DiningPage')) return 'DiningPage';
          if (id.includes('src/pages/EntertainmentPage')) return 'EntertainmentPage';
          if (id.includes('src/pages/VisitPage')) return 'VisitPage';
          // MallExplorer3D — only needed on Explore page, should be lazy
          if (id.includes('src/components/MallExplorer3D')) return 'MallExplorer3D';
        },
      },
    },
  },
});
