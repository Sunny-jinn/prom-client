import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { ManifestOptions, VitePWA } from 'vite-plugin-pwa';
import manifest from './manifest.json';
import svgr from 'vite-plugin-svgr';
import path from "path";

export default defineConfig({
  server : {
    port: 3000,
    proxy: {
      "/api": {
        target: "https://api.prom-art.store/",
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, ""),
        secure: false
      },
    },
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
      includeAssets: ['favicon.ico', 'robots.txt', 'apple-touch-icon.png'],
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
