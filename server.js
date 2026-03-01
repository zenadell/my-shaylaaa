import express from 'express'
import cors from 'cors'
import Database from 'better-sqlite3'
import multer from 'multer'
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
const PORT = 3001

// Middleware
app.use(cors())
app.use(express.json())
app.use('/uploads', express.static(path.join(__dirname, 'public', 'uploads')))

// Serve admin panel
app.use('/admin', express.static(path.join(__dirname, 'admin')))

// ── Database Setup ──────────────────────────────────────────────
const dbPath = path.join(__dirname, 'data', 'admin.db')
fs.mkdirSync(path.dirname(dbPath), { recursive: true })
const db = new Database(dbPath)

// Create config table
db.exec(`
  CREATE TABLE IF NOT EXISTS config (
    key TEXT PRIMARY KEY,
    value TEXT NOT NULL,
    type TEXT NOT NULL DEFAULT 'text'
  )
`)

// Create visits table
db.exec(`
  CREATE TABLE IF NOT EXISTS visits (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
    ua TEXT,
    screen TEXT,
    city TEXT,
    country TEXT,
    ip TEXT,
    lat REAL,
    lon REAL
  )
`)

// Seed defaults — ALL text from the 3D scene
const defaults = [
    // Pictures
    { key: 'picture_1', value: './Textures/bday_cake.png', type: 'image' },
    { key: 'picture_2', value: './Textures/bday_flowers.png', type: 'image' },
    { key: 'picture_3', value: './Textures/bday_balloons.png', type: 'image' },
    { key: 'picture_4', value: './Textures/bday_teddy.png', type: 'image' },
    { key: 'picture_5', value: './Textures/bday_presents.png', type: 'image' },
    { key: 'frame_picture', value: './Textures/bday_cake.png', type: 'image' },

    // Quality words (near items in scene)
    { key: 'quality_1', value: 'BEAUTIFUL', type: 'text' },
    { key: 'quality_2', value: 'SMART', type: 'text' },
    { key: 'quality_3', value: 'FUNNY', type: 'text' },
    { key: 'quality_4', value: 'SWEET', type: 'text' },
    { key: 'quality_5', value: 'KIND', type: 'text' },
    { key: 'quality_6', value: 'CARING', type: 'text' },
    { key: 'quality_7', value: 'CUTE', type: 'text' },
    { key: 'quality_8', value: 'AMAZING', type: 'text' },

    // Main title section
    { key: 'main_title', value: 'HAPPY BIRTHDAY', type: 'text' },
    { key: 'main_title_sub', value: 'MY LOVE', type: 'text' },

    // Diploma section
    { key: 'diploma_text', value: 'To the most amazing person', type: 'text' },
    { key: 'diploma_sub1', value: '(I love you)', type: 'text' },
    { key: 'diploma_sub2', value: 'Forever and ever', type: 'text' },

    // License section
    { key: 'license_text', value: 'Every day with you is a blessing', type: 'text' },
    { key: 'license_sub1', value: '(My favorite person)', type: 'text' },
    { key: 'license_sub2', value: 'You mean the world to me', type: 'text' },

    // Master/wish section
    { key: 'birthday_wish', value: 'Wishing my shaylaaa the best birthday', type: 'text' },
    { key: 'birthday_wish_sub1', value: '(Happy Birthday!)', type: 'text' },
    { key: 'birthday_wish_sub2', value: 'I hope all your wishes come true', type: 'text' },

    // Tab shader section
    { key: 'smile_text', value: 'Your smile...', type: 'text' },
    { key: 'smile_sub', value: 'is hypnotizing', type: 'text' },

    // Particles shader
    { key: 'everything_text', value: 'You are my everything', type: 'text' },

    // Vinyls section
    { key: 'love_text', value: 'I love us...', type: 'text' },
    { key: 'love_sub', value: 'and our memories', type: 'text' },

    // Heart section (near football/robot)
    { key: 'heart_text', value: 'You have my heart...', type: 'text' },
    { key: 'heart_subtext', value: 'now and forever', type: 'text' },

    // Final text
    { key: 'final_text', value: 'Happy Birthday Shaylaaa !', type: 'text' },

    // Floating 3D title
    { key: 'floating_title', value: 'Happy Birthday Shaylaaa', type: 'text' },

    // Robot text
    { key: 'robot_text', value: 'chaka wishes you too', type: 'text' },

    // Love letter (TV interactive)
    { key: 'love_letter', value: 'My Dearest,\n\nI just wanted to say how much you mean to me. Every moment with you is special...\n\nForever yours.', type: 'textarea' },

    // Music
    { key: 'bg_music', value: '', type: 'music' },
]

const insertStmt = db.prepare(`INSERT OR IGNORE INTO config (key, value, type) VALUES (?, ?, ?)`)
for (const d of defaults) {
    insertStmt.run(d.key, d.value, d.type)
}

// ── File Upload Config ──────────────────────────────────────────
const uploadsDir = path.join(__dirname, 'public', 'uploads')
fs.mkdirSync(uploadsDir, { recursive: true })

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, uploadsDir),
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname)
        const name = `${req.body.key || 'file'}_${Date.now()}${ext}`
        cb(null, name)
    }
})
const upload = multer({ storage, limits: { fileSize: 20 * 1024 * 1024 } }) // 20MB max

// ── API Routes ──────────────────────────────────────────────────

// Get all config
app.get('/api/config', (req, res) => {
    const rows = db.prepare('SELECT * FROM config').all()
    const config = {}
    for (const row of rows) {
        config[row.key] = { value: row.value, type: row.type }
    }
    res.json(config)
})

// Update a text config
app.post('/api/config', (req, res) => {
    const { key, value } = req.body
    if (!key || value === undefined) {
        return res.status(400).json({ error: 'key and value required' })
    }
    db.prepare('UPDATE config SET value = ? WHERE key = ?').run(value, key)
    res.json({ success: true, key, value })
})

// Upload a file (image or music)
app.post('/api/upload', upload.single('file'), (req, res) => {
    if (!req.file || !req.body.key) {
        return res.status(400).json({ error: 'file and key required' })
    }
    const relativePath = `/uploads/${req.file.filename}`
    db.prepare('UPDATE config SET value = ? WHERE key = ?').run(relativePath, req.body.key)
    res.json({ success: true, key: req.body.key, path: relativePath })
})

// ── Visitor Tracking ──────────────────────────────────────────

// Log a visit
app.post('/api/visit', (req, res) => {
    const { ua, screen, city, country, ip, lat, lon } = req.body
    const stmt = db.prepare(`
        INSERT INTO visits (ua, screen, city, country, ip, lat, lon)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `)
    stmt.run(ua || '', screen || '', city || 'Unknown', country || 'Unknown', ip || '', lat || 0, lon || 0)
    res.json({ success: true })
})

// Get all visits
app.get('/api/visits', (req, res) => {
    const rows = db.prepare('SELECT * FROM visits ORDER BY timestamp DESC').all()
    res.json(rows)
})

// ── Start Server ────────────────────────────────────────────────
app.listen(PORT, () => {
    console.log(`✅ Admin server running at http://localhost:${PORT}`)
    console.log(`📋 Admin panel: http://localhost:${PORT}/admin`)
    console.log(`🔌 API: http://localhost:${PORT}/api/config`)
})
