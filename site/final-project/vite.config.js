import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react';
import path from 'path';
import Pages from 'vite-plugin-pages';
import Inspect from 'vite-plugin-inspect';
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    Pages({
      dirs: 'src/pages'
    }),
    Inspect(),
  ],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/unitTests.js'
  },
  resolve: {
    alias: [
      {
        find: '@',
        replacement: path.resolve(__dirname, 'src'),
      },
    ]
  }
})

