import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

// base: './' 让构建产物可部署到 GitHub Pages 项目子路径或 ECS 根路径
export default defineConfig({
  base: './',
  plugins: [react()],
  server: {
    proxy: {
      '/api': 'http://127.0.0.1:3000',
      '/health': 'http://127.0.0.1:3000',
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/setupTests.ts',
  },
});
