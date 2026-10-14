import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 3000,
    host: '0.0.0.0',
    cors: true,
    headers: {
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'SAMEORIGIN',
      'X-XSS-Protection': '1; mode=block',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
    },
  },
  build: {
    // Production optimizations and security hardening
    sourcemap: false, // Turn off sourcemaps in production to avoid leaking source structure
    minify: 'esbuild',
    target: 'es2020',
  },
  esbuild: {
    // Turn off debugger statements in production bundles
    drop: process.env.NODE_ENV === 'production' ? ['debugger'] : [],
  },
});
