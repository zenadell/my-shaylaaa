import express from 'express'
import cors from 'cors'
import Database from 'better-sqlite3'
import { createClient } from '@libsql/client'
import multer from 'multer'
import { v2 as cloudinary } from 'cloudinary'
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'
import dotenv from 'dotenv'

dotenv.config()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
const PORT = process.env.PORT || 3001

// Middleware
app.use(cors())
app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')))
app.use('/uploads', express.static(path.join(__dirname, 'public', 'uploads')))

// Serve admin panel
app.use('/admin', express.static(path.join(__dirname, 'admin')))

// Redirect root to admin
app.get('/', (req, res) => {
    res.redirect('/admin')
})

// ── Database Setup ──────────────────────────────────────────────
const isTurso = process.env.TURSO_DATABASE_URL ? true : false
let db;

if (isTurso) {
    console.log("☁️ Using Turso Cloud Database")
    db = createClient({
        url: process.env.TURSO_DATABASE_URL,
        authToken: process.env.TURSO_AUTH_TOKEN,
    })
} else {
    console.log("📂 Using Local SQLite Database")
    const dbPath = path.join(__dirname, 'data', 'admin.db')
    fs.mkdirSync(path.dirname(dbPath), { recursive: true })
    const localDb = new Database(dbPath)
    // Wrapper to match Turso's execute signature for basic queries
    db = {
        execute: async (sql, args = []) => {
            const stmt = localDb.prepare(sql)
            // Determine if it's a mutation or selection
            const isSelect = sql.trim().toUpperCase().startsWith('SELECT')
            if (isSelect) {
                return { rows: stmt.all(...args) }
            } else {
                return stmt.run(...args)
            }
        },
        batch: async (stmts) => {
            const transaction = localDb.transaction((list) => {
                for (const s of list) localDb.prepare(s.sql).run(...s.args || [])
            })
            transaction(stmts)
        }
    }
}

// Initialization helper
const initDb = async () => {
    await db.execute(`
      CREATE TABLE IF NOT EXISTS config (
        key TEXT PRIMARY KEY,
        value TEXT NOT NULL,
        type TEXT NOT NULL DEFAULT 'text'
      )
    `)

    await db.execute(`
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

    // Seed defaults
    for (const d of defaults) {
        await db.execute(`INSERT OR IGNORE INTO config (key, value, type) VALUES (?, ?, ?)`, [d.key, d.value, d.type])
    }
}

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

// ── File Upload Config & Cloudinary ─────────────────────────────
const isCloudinary = (process.env.CLOUDINARY_CLOUD_NAME || process.env.CLOUDINARY_URL) ? true : false

if (isCloudinary) {
    if (process.env.CLOUDINARY_URL) {
        cloudinary.config({ url: process.env.CLOUDINARY_URL })
    } else {
        cloudinary.config({
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET
        })
    }
    console.log("☁️ Cloudinary Storage Connected")
}

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
app.get('/api/config', async (req, res) => {
    try {
        const result = await db.execute('SELECT * FROM config')
        const config = {}
        for (const row of result.rows) {
            config[row.key] = { value: row.value, type: row.type }
        }
        res.json(config)
    } catch (e) {
        res.status(500).json({ error: e.message })
    }
})

// Update a text config
app.post('/api/config', async (req, res) => {
    const { key, value } = req.body
    if (!key || value === undefined) {
        return res.status(400).json({ error: 'key and value required' })
    }
    try {
        await db.execute('UPDATE config SET value = ? WHERE key = ?', [value, key])
        res.json({ success: true, key, value })
    } catch (e) {
        res.status(500).json({ error: e.message })
    }
})

// Upload a file (image or music)
app.post('/api/upload', upload.single('file'), async (req, res) => {
    if (!req.file || !req.body.key) {
        return res.status(400).json({ error: 'file and key required' })
    }

    try {
        let finalPath;
        if (isCloudinary) {
            // Upload to Cloudinary
            const result = await cloudinary.uploader.upload(req.file.path, {
                resource_type: "auto",
                folder: "3d_portfolio"
            })
            finalPath = result.secure_url
            // Delete local temp file
            fs.unlinkSync(req.file.path)
        } else {
            finalPath = `/uploads/${req.file.filename}`
        }

        await db.execute('UPDATE config SET value = ? WHERE key = ?', [finalPath, req.body.key])
        res.json({ success: true, key: req.body.key, path: finalPath })
    } catch (e) {
        console.error('❌ Cloudinary Upload Error Detail:', e)
        res.status(500).json({ error: e.message })
    }
})

// ── Visitor Tracking ──────────────────────────────────────────

// Log a visit
app.post('/api/visit', async (req, res) => {
    const { ua, screen, city, country, ip, lat, lon } = req.body
    try {
        await db.execute(`
            INSERT INTO visits (ua, screen, city, country, ip, lat, lon)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `, [ua || '', screen || '', city || 'Unknown', country || 'Unknown', ip || '', lat || 0, lon || 0])
        res.json({ success: true })
    } catch (e) {
        res.status(500).json({ error: e.message })
    }
})

// Get all visits
app.get('/api/visits', async (req, res) => {
    try {
        const result = await db.execute('SELECT * FROM visits ORDER BY timestamp DESC')
        res.json(result.rows)
    } catch (e) {
        res.status(500).json({ error: e.message })
    }
})

// ── Start Server ────────────────────────────────────────────────
app.listen(PORT, () => {
    console.log(`✅ Admin server running at http://localhost:${PORT}`)
    console.log(`📋 Admin panel: http://localhost:${PORT}/admin`)
    console.log(`🔌 API: http://localhost:${PORT}/api/config`)
})

initDb().catch(console.error)
