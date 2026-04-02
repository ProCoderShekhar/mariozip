import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: ['mariozip.com'],
    host: true,
    port: Number(process.env.PORT) || 5173,

    // ✅ ADD THIS
    allowedHosts: [
      'mariozip.com'
    ],

    proxy: {
      '/roulobets-api': {
        target: 'https://api.roulobets.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/roulobets-api/, ''),
        secure: false,
      },
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
