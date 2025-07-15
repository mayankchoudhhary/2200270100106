const express = require('express');
const { Log } = require('../Logging Middleware/index');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const urlStore = {}; // { shortcode: { url, expiry, createdAt, clicks: [] } }

// Helper to generate shortcode
function generateCode() {
  return Math.random().toString(36).substring(2, 8); // simple 6-char code
}

// POST /shorturls → Create Short URL
app.post('/shorturls', async (req, res) => {
  const { url, validity, shortcode } = req.body;

  if (!url || typeof url !== 'string') {
    await Log('backend', 'error', 'handler', 'Invalid URL');
    return res.status(400).json({ error: 'Invalid URL' });
  }

  let code = shortcode || generateCode();
  if (urlStore[code]) {
    await Log('backend', 'warn', 'handler', `Shortcode already exists: ${code}`);
    return res.status(400).json({ error: 'Shortcode already in use' });
  }

  const minutes = validity && Number.isInteger(validity) ? validity : 30;
  const expiryDate = new Date(Date.now() + minutes * 60000).toISOString();

  urlStore[code] = {
    url,
    expiry: expiryDate,
    createdAt: new Date().toISOString(),
    clicks: []
  };

  await Log('backend', 'info', 'handler', `Short URL created: ${code}`);
  return res.status(201).json({
    shortLink: `http://localhost:3000/${code}`,
    expiry: expiryDate
  });
});

// GET /shorturls/:code → Get stats
app.get('/shorturls/:code', async (req, res) => {
  const code = req.params.code;
  const data = urlStore[code];
  if (!data) {
    await Log('backend', 'warn', 'handler', `Stats not found: ${code}`);
    return res.status(404).json({ error: 'Shortcode not found' });
  }

  await Log('backend', 'info', 'handler', `Stats retrieved for ${code}`);
  return res.json({
    url: data.url,
    createdAt: data.createdAt,
    expiry: data.expiry,
    totalClicks: data.clicks.length,
    clicks: data.clicks
  });
});

// GET /:code → Redirect
app.get('/:code', async (req, res) => {
  const code = req.params.code;
  const data = urlStore[code];
  if (!data) {
    await Log('backend', 'warn', 'handler', `Redirect failed, not found: ${code}`);
    return res.status(404).json({ error: 'Shortcode not found' });
  }

  if (new Date(data.expiry) < new Date()) {
    await Log('backend', 'warn', 'handler', `Redirect failed, expired: ${code}`);
    return res.status(410).json({ error: 'Shortcode expired' });
  }

  data.clicks.push({
    timestamp: new Date().toISOString(),
    referrer: req.get('referer') || 'unknown',
    location: 'unknown'
  });

  await Log('backend', 'info', 'handler', `Redirecting from ${code}`);
  return res.redirect(data.url);
});

// Start server
app.listen(3000, () => {
  console.log('✅ Server running at http://localhost:3000');
});
