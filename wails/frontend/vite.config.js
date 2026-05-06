import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
   server: {
    proxy: {
      '/dify': {
        target: 'https://api.dify.ai',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/dify/, '/v1')
      }
    }
  }
})
