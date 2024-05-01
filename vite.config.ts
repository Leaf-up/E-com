import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  base: './',
  build: {
    assetsDir: './',
  },
  resolve: {
    alias: [
      {
        find: '~',
        replacement: path.resolve(__dirname, './src/'),
      },
    ],
  },
});

