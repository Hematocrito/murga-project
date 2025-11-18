import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const modernTarget = 'esnext';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  esbuild: {
    target: modernTarget,
  },
  build: {
    target: modernTarget,
    modulePreload: {
      polyfill: false,
    },
    chunkSizeWarningLimit: 1600,
  },
});
