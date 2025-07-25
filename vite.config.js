import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    proxy: {
      '/api': {
        target: 'http://192.168.23.23',
        changeOrigin: true,
        secure: false,
      }
    }
  },
  define: {
    'process.env': process.env
  }
})
