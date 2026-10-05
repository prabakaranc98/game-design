import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// base './' lets the built dist/ folder open from any path, including a USB stick in class.
// p5 alone is about 1 MB, so the default 500 kB chunk warning would always fire.
export default defineConfig({
  plugins: [react()],
  base: './',
  build: { chunkSizeWarningLimit: 1600 },
});
