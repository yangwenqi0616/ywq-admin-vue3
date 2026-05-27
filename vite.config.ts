import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import { loadEnv } from 'vite';
// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [vue(), vueJsx()],
  define: {
    process: {}
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  base: loadEnv(mode, process.cwd()).VITE_APP_BASE_URL, // 选用history路由时不可使用./等相对路径,否则刷新会造成白页
  server: {
    open: true,
    proxy: {
      '/api': {
        target: 'http://172.20.96.32:8999/sp/',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
}));
