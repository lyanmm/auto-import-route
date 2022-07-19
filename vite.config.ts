import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { createThemeFiles, getDefaultTokens } from 'mdesign-utils';
import * as COLORS from './md-theme.js';
import vitePluginForArco from '@arco-plugins/vite-react';
import { fileURLToPath, URL } from 'url';

createThemeFiles('./tokens.json');
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), vitePluginForArco()],
  css: {
    preprocessorOptions: {
      less: {
        modifyVars: getDefaultTokens(COLORS),
      },
    },
  },
  server: {
    host: '0.0.0.0',
    port: 4862,
    strictPort: true,
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
});
