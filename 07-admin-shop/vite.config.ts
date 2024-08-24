import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueDevTools from 'vite-plugin-vue-devtools';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueDevTools()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@admin': fileURLToPath(new URL('./src/modules/admin', import.meta.url)),
      '@auth': fileURLToPath(new URL('./src/modules/auth', import.meta.url)),
      '@common': fileURLToPath(new URL('./src/modules/common', import.meta.url)),
      '@products': fileURLToPath(new URL('./src/modules/products', import.meta.url)),
      '@shop': fileURLToPath(new URL('./src/modules/shop', import.meta.url)),
      '@api': fileURLToPath(new URL('./src/api', import.meta.url)),
    },
  },
});
