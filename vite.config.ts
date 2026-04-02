import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Mock Leaderboard API for Vite Dev Server
const leaderboardDevPlugin = () => ({
  name: 'leaderboard-dev-plugin',
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  configureServer(server: any) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let leaderboardCache: { data: any, timestamp: number } = {
      data: null,
      timestamp: 0
    };
    const CACHE_DURATION = 15 * 60 * 1000; // 15 minutes

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    server.middlewares.use('/api/leaderboard', async (_req: any, res: any) => {
      const now = Date.now();

      if (leaderboardCache.data && (now - leaderboardCache.timestamp) < CACHE_DURATION) {
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(leaderboardCache.data));
        return;
      }

      const API_KEY = process.env.ROULOBETS_API_KEY;
      if (!API_KEY) {
        console.error("Missing ROULOBETS_API_KEY environment variable");
        res.statusCode = 500;
        res.end(JSON.stringify({ error: 'Server configuration error' }));
        return;
      }

      const START_DATE = '2026-04-01';
      const END_DATE = '2026-04-30';

      try {
        const fetch = (await import('node-fetch')).default || globalThis.fetch;
        const response = await fetch(`https://api.roulobets.com/v1/external/affiliates?start_at=${START_DATE}&end_at=${END_DATE}&key=${API_KEY}`, {
          headers: {
            'Accept': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`API Error: ${response.statusText}`);
        }

        const data = await response.json();

        leaderboardCache = {
          data,
          timestamp: now
        };

        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(data));
      } catch (error) {
        console.error("Failed to fetch leaderboard:", error);
        if (leaderboardCache.data) {
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify(leaderboardCache.data));
          return;
        }
        res.statusCode = 500;
        res.end(JSON.stringify({ error: 'Failed to fetch leaderboard data' }));
      }
    });
  }
});

export default defineConfig({
  plugins: [react(), leaderboardDevPlugin()],
  server: {
    allowedHosts: ['mariozip.com'],
    host: true,
    port: Number(process.env.PORT) || 5173,

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
