import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5173;

app.use(cors());

// Leaderboard Cache
let leaderboardCache = {
  data: null,
  timestamp: 0
};
const CACHE_DURATION = 15 * 60 * 1000; // 15 minutes

// Custom API endpoints
app.get('/api/leaderboard', async (req, res) => {
  const now = Date.now();

  if (leaderboardCache.data && (now - leaderboardCache.timestamp) < CACHE_DURATION) {
    return res.json(leaderboardCache.data);
  }

  const API_KEY = process.env.ROULOBETS_API_KEY;
  if (!API_KEY) {
    console.warn("Missing ROULOBETS_API_KEY environment variable. Using sample data.");
    try {
      const fs = await import('fs/promises');
      const sampleData = await fs.readFile(path.join(__dirname, 'api_response_sample.json'), 'utf-8');
      return res.json(JSON.parse(sampleData));
    } catch (err) {
      console.error("Failed to read sample data:", err);
      return res.status(500).json({ error: 'Server configuration error' });
    }
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

    res.json(data);
  } catch (error) {
    console.error("Failed to fetch leaderboard:", error);
    // If cache exists, serve stale data on error
    if (leaderboardCache.data) {
      return res.json(leaderboardCache.data);
    }
    res.status(500).json({ error: 'Failed to fetch leaderboard data' });
  }
});

// Proxy endpoints
app.use('/api/connect', createProxyMiddleware({
  target: 'https://roobetconnect.com',
  changeOrigin: true,
  pathRewrite: {
    '^/api/connect': '', // remove base path
  },
  secure: false,
}));

app.use('/api', createProxyMiddleware({
  target: 'https://roobet.com',
  changeOrigin: true,
  secure: false,
}));

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'dist')));

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.use((req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
