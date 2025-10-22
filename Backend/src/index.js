// src/index.js
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { getSignedGetUrl, getSignedPutUrl } from './s3.js';
import { verifySupabaseToken } from './auth.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:5173', // Vite default
}));
app.use(express.json());

/**
 * Public endpoint: get signed GET URL for a key
 * Query: ?key=avatars/uid.jpg
 */
app.get('/api/s3/url', async (req, res) => {
  const key = req.query.key;
  if (!key) return res.status(400).json({ error: 'missing key param' });
  try {
    const url = await getSignedGetUrl(key);
    res.json({ url });
  } catch (err) {
    console.error('signed get url error', err);
    res.status(500).json({ error: 'could not create signed url' });
  }
});

/**
 * Protected: Get a signed PUT URL for uploading files (returns presigned url)
 * Body: { key: 'avatars/uid.jpg', contentType: 'image/jpeg' }
 */
app.post('/api/s3/upload', verifySupabaseToken, async (req, res) => {
  const { key, contentType } = req.body;
  if (!key) return res.status(400).json({ error: 'missing key in body' });
  try {
    const url = await getSignedPutUrl(key, contentType || 'application/octet-stream');
    res.json({ url });
  } catch (err) {
    console.error('signed put url error', err);
    res.status(500).json({ error: 'could not create signed put url' });
  }
});

app.listen(port, () => {
  console.log(`Backend running on port ${port}`);
});
