import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { VitePWA } from 'vite-plugin-pwa';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['icon.png'],
      devOptions: {
        enabled: true,
      },
      manifest: {
        name: 'My AppStore App',
        short_name: 'MyAppStore',
        description: 'My AppStore  description',
        theme_color: '#ffffff',
        shortcuts: [
          {
            name: 'Home',
            short_name: 'About',
            description: 'Open the about page',
            url: '/',
            icons: [{ src: '/icon.png', sizes: '192x192' }],
          },
        ],
        icons: [
          {
            src: 'icon.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'icon.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
    }),
  ],
  server: {
    host: true,
    proxy: {
      // 选项写法
      '/api': {
        target: 'https://itunes.apple.com/hk',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, ''),
      },
    },
  },
});
