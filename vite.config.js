import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    modules: {
      scopeBehaviour: 'local',
      localsConvention: 'camelCase',
    },
    preprocessorOptions: {
      scss: {
        additionalData: '@import "./src/styles/_colors.scss";',
      },
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './test_setup.js'
  }
});
