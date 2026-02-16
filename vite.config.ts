import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api/connect': {
        target: 'https://roobetconnect.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/connect/, ''),
        secure: false,
      },
      '/api': {
        target: 'https://roobet.com',
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
