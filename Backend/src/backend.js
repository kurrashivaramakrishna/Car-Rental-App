require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const mysql = require('mysql2/promise');

const app = express();
app.use(cors());
app.use(express.json());

// Setup DB connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'car_rental',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Upload folder
const UPLOAD_DIR = path.join(__dirname, 'uploads');
if (!fs.existsSync(UPLOAD_DIR)) fs.mkdirSync(UPLOAD_DIR);

// multer config - store locally (production: use S3)
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, UPLOAD_DIR),
  filename: (req, file, cb) => {
    const unique = Date.now() + '-' + Math.round(Math.random()*1e9);
    const ext = path.extname(file.originalname);
    cb(null, `${unique}${ext}`);
  }
});
const upload = multer({ storage });

const JWT_SECRET = process.env.JWT_SECRET || 'secret';

// helper: auth middleware
function authMiddleware(req, res, next) {
  const auth = req.headers.authorization;
  if (!auth) return res.status(401).json({ error: 'Not authenticated' });
  const parts = auth.split(' ');
  if (parts.length !== 2 || parts[0] !== 'Bearer') return res.status(401).json({ error: 'Malformed token' });
  try {
    const payload = jwt.verify(parts[1], JWT_SECRET);
    req.user = payload; // contains userId, email
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid token' });
  }
}

/* ---------------- AUTH ---------------- */
app.post('/api/auth/signup', async (req, res) => {
  const { name, email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'email & password required' });
  try {
    const [rows] = await pool.query('SELECT id FROM users WHERE email = ?', [email]);
    if (rows.length) return res.status(400).json({ error: 'Email already exists' });
    const hash = await bcrypt.hash(password, 10);
    const [result] = await pool.query('INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)', [name||'', email, hash]);
    const userId = result.insertId;
    const token = jwt.sign({ userId, email }, JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, user: { id: userId, name, email } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const [rows] = await pool.query('SELECT id, name, email, password_hash FROM users WHERE email = ?', [email]);
    if (!rows.length) return res.status(400).json({ error: 'Invalid credentials' });
    const user = rows[0];
    const ok = await bcrypt.compare(password, user.password_hash);
    if (!ok) return res.status(400).json({ error: 'Invalid credentials' });
    const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, user: { id: user.id, name: user.name, email: user.email } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

/* ---------------- CARS (public & protected) ---------------- */

// GET all cars (public) with images aggregated as array
app.get('/api/cars', async (req, res) => {
  try {
    // fetch cars
    const [cars] = await pool.query('SELECT * FROM cars ORDER BY created_at DESC');
    // fetch images for these cars
    const carIds = cars.map(c => c.id);
    let images = [];
    if (carIds.length) {
      const [imgs] = await pool.query('SELECT car_id, url FROM car_images WHERE car_id IN (?)', [carIds]);
      images = imgs;
    }
    const carsWithImages = cars.map(car => ({
      ...car,
      images: images.filter(i => i.car_id === car.id).map(i => i.url)
    }));
    res.json(carsWithImages);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// GET my cars (protected)
app.get('/api/my-cars', authMiddleware, async (req, res) => {
  try {
    const [cars] = await pool.query('SELECT * FROM cars WHERE owner_id = ? ORDER BY created_at DESC', [req.user.userId]);
    const carIds = cars.map(c => c.id);
    let images = [];
    if (carIds.length) {
      const [imgs] = await pool.query('SELECT car_id, url FROM car_images WHERE car_id IN (?)', [carIds]);
      images = imgs;
    }
    const carsWithImages = cars.map(car => ({
      ...car,
      images: images.filter(i => i.car_id === car.id).map(i => i.url)
    }));
    res.json(carsWithImages);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Create a new car listing (protected) with images
// Accepts fields: model, price_per_day, location, available_from, available_to
// and multipart files 'images'
app.post('/api/cars', authMiddleware, upload.array('images', 6), async (req, res) => {
  try {
    const { model, price_per_day, location, available_from, available_to } = req.body;
    const ownerId = req.user.userId;
    // insert car
    const [result] = await pool.query(
      'INSERT INTO cars (owner_id, model, price_per_day, location, available_from, available_to) VALUES (?, ?, ?, ?, ?, ?)',
      [ownerId, model, price_per_day || 0, location, available_from || null, available_to || null]
    );
    const carId = result.insertId;
    // save images
    const files = req.files || [];
    for (const f of files) {
      // public URL path for frontend (serve from /uploads)
      const url = `/uploads/${path.basename(f.path)}`;
      await pool.query('INSERT INTO car_images (car_id, url) VALUES (?, ?)', [carId, url]);
    }
    res.json({ success: true, carId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Serve static uploads
app.use('/uploads', express.static(UPLOAD_DIR));

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on http://localhost:${port}`));
