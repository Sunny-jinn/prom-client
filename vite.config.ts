import react from '@vitejs/plugin-react';
import * as path from 'path';
import { defineConfig } from 'vite';
import { ManifestOptions, VitePWA } from 'vite-plugin-pwa';
import manifest from './manifest.json';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
  server : {
    port: 3000,
  },
  assetsInclude: ['**/*.mp4'],
  plugins: [
    react({
      jsxImportSource: '@emotion/react',
      babel          : {
        plugins: ['@emotion/babel-plugin'],
      },
    }),
    VitePWA({
      manifest     : manifest as Partial<ManifestOptions>,
      includeAssets: ['favicon.svg', 'favicon.ico', 'robots.txt', 'apple-touch-icon.png'],
      // switch to "true" to enable sw on development
      devOptions: {
        enabled: true,
      },
      workbox   : {
        globPatterns: ['**/*.{js,css,html}', '**/*.{svg,png,jpg,gif}'],
      },
    }),
    svgr(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
