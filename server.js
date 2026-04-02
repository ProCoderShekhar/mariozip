import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Serve static files from the React build
app.use(express.static(path.join(__dirname, 'dist')));

// Catch-all route to serve index.html for React Router
app.use((req, res, next) => {
  if (req.path.startsWith('/api')) {
    return next();
  }
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// API Proxy Route
app.get('/api/leaderboard', async (req, res) => {
  const API_URL = 'https://api.roulobets.com/v1/external/affiliates';
  const START_DATE = '2026-04-01';
  const END_DATE = '2026-04-30';
  const API_KEY = process.env.VITE_API_KEY || process.env.API_KEY;

  if (!API_KEY) {
    return res.status(500).json({ error: 'API Key is not configured on the server.' });
  }

  try {
    const response = await fetch(`${API_URL}?start_at=${START_DATE}&end_at=${END_DATE}&key=${API_KEY}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      const text = await response.text();
      console.error(`External API Error: ${response.status} ${response.statusText}`, text);
      return res.status(response.status).json({ error: `External API Error: ${response.statusText}` });
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Failed to fetch affiliate stats:", error);
    res.status(500).json({ error: 'Failed to fetch affiliate stats' });
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
