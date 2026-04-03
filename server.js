import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5173;

app.use(cors());

// Proxy endpoints
app.use('/roulobets-api', createProxyMiddleware({
  target: 'https://api.roulobets.com',
  changeOrigin: true,
  pathRewrite: {
    '^/roulobets-api': '', // remove base path
  },
  secure: false,
}));

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
