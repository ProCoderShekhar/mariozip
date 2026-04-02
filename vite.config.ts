import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import 'dotenv/config'

export default defineConfig({
  plugins: [react()],
  server: {
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
        rewrite: (path) => {
          const newPath = path.replace(/^\/roulobets-api/, '');
          const apiKey = process.env.ROULOBETS_API_KEY;
          if (apiKey) {
            return newPath.includes('?') ? `${newPath}&key=${apiKey}` : `${newPath}?key=${apiKey}`;
          }
          return newPath;
        },
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
