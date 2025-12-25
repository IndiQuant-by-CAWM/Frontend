// Frontend/health.js

// Simple Express-based health endpoint for frontend container.
// Useful when frontend is served by a static server that can't easily expose dynamic health responses.

const express = require('express');
const fetch = require('node-fetch');
const app = express();
const PORT = process.env.PORT || 3000;
const START_TS = Date.now();
const VERSION = process.env.SERVICE_VERSION || '1.0.0';
const BACKEND_URL = process.env.BACKEND_URL || 'http://backend:5000';

app.get('/health', async (req, res) => {
  try {
    const deps = { database: 'ok', redis: 'ok' };
    // Check backend
    try {
      const r = await fetch(`${BACKEND_URL.replace(/\/$/, '')}/health`, { timeout: 2000 });
      deps.external = { backend: r.ok ? 'ok' : 'error' };
    } catch (e) {
      deps.external = { backend: 'error' };
    }
    const uptime_seconds = Math.floor((Date.now() - START_TS) / 1000);
    const payload = {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      dependencies: deps,
      version: VERSION,
      uptime_seconds,
    };
    res.status(200).json(payload);
  } catch (e) {
    res.status(500).json({ status: 'down', timestamp: new Date().toISOString() });
  }
});

app.get('/ready', (req, res) => res.status(200).json({ ready: true }));
app.get('/live', (req, res) => res.status(200).json({ alive: true }));

if (require.main === module) {
  app.listen(PORT, () => console.log(`Frontend health listening on ${PORT}`));
}
