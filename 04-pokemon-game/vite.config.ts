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
      '@pokemon': fileURLToPath(new URL('./src/modules/pokemon', import.meta.url)),
      '@api': fileURLToPath(new URL('./src/modules/api', import.meta.url)),
    },
  },
});
