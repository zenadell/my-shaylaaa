const API = '' // Use same origin for production
let config = {}

const PIC_LABELS = {
    picture_1: 'Cake', picture_2: 'Flowers', picture_3: 'Balloons',
    picture_4: 'Teddy Bear', picture_5: 'Presents',
    frame_picture: '🖼️ Shelf Frame',
}

const TEXT_GROUPS = [
    {
        title: '✨ Quality Words',
        desc: 'One-word compliments that appear near objects in the scene',
        keys: [
            { key: 'quality_1', label: 'Quality 1' },
            { key: 'quality_2', label: 'Quality 2' },
            { key: 'quality_3', label: 'Quality 3' },
            { key: 'quality_4', label: 'Quality 4' },
            { key: 'quality_5', label: 'Quality 5' },
            { key: 'quality_6', label: 'Quality 6' },
            { key: 'quality_7', label: 'Quality 7' },
            { key: 'quality_8', label: 'Quality 8' },
        ]
    },
    {
        title: '🎂 Main Title',
        desc: 'The big greeting text in the scene',
        keys: [
            { key: 'main_title', label: 'Title' },
            { key: 'main_title_sub', label: 'Subtitle' },
        ]
    },
    {
        title: '🎓 Diploma Section',
        keys: [
            { key: 'diploma_text', label: 'Main Text' },
            { key: 'diploma_sub1', label: 'Sub 1' },
            { key: 'diploma_sub2', label: 'Sub 2' },
        ]
    },
    {
        title: '🪪 License Section',
        keys: [
            { key: 'license_text', label: 'Main Text' },
            { key: 'license_sub1', label: 'Sub 1' },
            { key: 'license_sub2', label: 'Sub 2' },
        ]
    },
    {
        title: '🥳 Birthday Wish',
        keys: [
            { key: 'birthday_wish', label: 'Main Message' },
            { key: 'birthday_wish_sub1', label: 'Sub 1' },
            { key: 'birthday_wish_sub2', label: 'Sub 2' },
        ]
    },
    {
        title: '😊 Smile Section',
        keys: [
            { key: 'smile_text', label: 'Title' },
            { key: 'smile_sub', label: 'Subtitle' },
        ]
    },
    {
        title: '💖 Special Texts',
        desc: 'Other messages in the world',
        keys: [
            { key: 'everything_text', label: 'Everything' },
            { key: 'love_text', label: 'Love' },
            { key: 'love_sub', label: 'Love Sub' },
            { key: 'heart_text', label: 'Heart' },
            { key: 'heart_subtext', label: 'Heart Sub' },
            { key: 'final_text', label: 'Final' },
            { key: 'floating_title', label: 'Floating Title' },
            { key: 'robot_text', label: 'Robot' },
        ]
    },
    {
        title: '💌 Love Letter (TV)',
        desc: 'Write a long message that she can read on the TV screen in the scene',
        keys: [
            { key: 'love_letter', label: 'Letter Content', type: 'textarea' },
        ]
    }
]

// ── Fetch Config ────────────────────────────────────────────────
async function init() {
    const statusEl = document.getElementById('status')
    try {
        const res = await fetch(API + '/api/config')
        config = await res.json()
        statusEl.textContent = '● Online'
        statusEl.className = 'status ok'

        renderPictures()
        renderTexts()
        renderMusic()
    } catch (e) {
        statusEl.textContent = 'Offline'
        statusEl.className = 'status'
    }
}

// ── Render Pictures ─────────────────────────────────────────────
function renderPictures() {
    const grid = document.getElementById('pictures-grid')
    grid.innerHTML = ''
    Object.keys(PIC_LABELS).forEach(key => {
        const val = config[key]?.value || ''
        const slot = document.createElement('div')
        slot.className = 'pic-slot'
        slot.innerHTML = `
            <img src="${val.startsWith('http') ? val : (val.startsWith('.') ? '..' + val.slice(1) : val)}" alt="${PIC_LABELS[key]}">
            <div class="overlay">
                <span>📤</span>
                <small>Change</small>
            </div>
            <div class="pic-label">${PIC_LABELS[key]}</div>
            <input type="file" id="file-${key}" accept="image/*" onchange="uploadFile('${key}')">
        `
        slot.onclick = () => document.getElementById(`file-${key}`).click()
        grid.appendChild(slot)
    })
}

// ── Render Texts ────────────────────────────────────────────────
function renderTexts() {
    const textsList = document.getElementById('texts-list')
    textsList.innerHTML = ''

    TEXT_GROUPS.forEach(group => {
        const section = document.createElement('div')
        section.className = 'text-group'
        section.innerHTML = `
            <div class="group-header">
                <h3>${group.title}</h3>
                ${group.desc ? `<small>${group.desc}</small>` : ''}
            </div>
        `

        group.keys.forEach(k => {
            const isTextarea = k.type === 'textarea' || config[k.key]?.type === 'textarea'
            const value = config[k.key]?.value || ''

            const row = document.createElement('div')
            row.className = 'text-row'

            const label = document.createElement('label')
            label.textContent = k.label

            const input = isTextarea
                ? document.createElement('textarea')
                : document.createElement('input')

            if (!isTextarea) input.type = 'text'
            input.id = `input-${k.key}`
            input.value = value
            input.placeholder = 'Type something...'

            const btn = document.createElement('button')
            btn.textContent = 'Save'
            btn.onclick = () => saveText(k.key)

            row.appendChild(label)
            row.appendChild(input)
            row.appendChild(btn)
            section.appendChild(row)
        })

        textsList.appendChild(section)
    })
}

// ── Render Music ────────────────────────────────────────────────
function renderMusic() {
    const musicSection = document.getElementById('music-section')
    const val = config['bg_music']?.value

    musicSection.innerHTML = `
        <div class="music-current">
            <div class="icon">🎵</div>
            <div class="info">
                <div class="name">${val ? val.split('/').pop() : 'No music uploaded'}</div>
                <div class="desc">${val ? 'Currently playing' : 'Upload an MP3 to start'}</div>
            </div>
            ${val ? `<audio controls src="${val.startsWith('/') ? API + val : val}"></audio>` : ''}
        </div>
        <button class="upload-btn" onclick="document.getElementById('file-music').click()">
            <span>📁</span> Upload New Music (MP3)
        </button>
        <input type="file" id="file-music" accept="audio/mpeg" onchange="uploadFile('bg_music')">
    `
}

// ── Actions ─────────────────────────────────────────────────────
async function saveText(key) {
    const input = document.getElementById(`input-${key}`)
    const value = input.value
    try {
        await fetch(API + '/api/config', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ key, value })
        })
        config[key].value = value
        showToast(`✅ Saved! Changes reflect in ~2 seconds`)
    } catch (e) {
        showToast('Failed to save', true)
    }
}

async function uploadFile(key) {
    const fileInput = document.getElementById(key === 'bg_music' ? 'file-music' : `file-${key}`)
    const file = fileInput.files[0]
    if (!file) return

    const formData = new FormData()
    formData.append('file', file)
    formData.append('key', key)

    showToast(`⏳ Uploading ${file.name}...`)

    try {
        const res = await fetch(API + '/api/upload', {
            method: 'POST',
            body: formData
        })
        const data = await res.json()
        config[key].value = data.path
        showToast(`✅ Uploaded successfully!`)
        if (key === 'bg_music') renderMusic()
        else renderPictures()
    } catch (e) {
        console.error('Upload error:', e)
        showToast(`Upload failed: ${e.message}`, true)
    }
}

// ── Fetch Visitors ──────────────────────────────────────────────
async function fetchVisitors() {
    try {
        const res = await fetch(API + '/api/visits')
        const data = await res.json()
        const tbody = document.getElementById('visitor-tbody')
        if (!tbody) return

        tbody.innerHTML = data.map(v => {
            const date = new Date(v.timestamp).toLocaleString()
            return `
                <tr>
                    <td class="time">${date}</td>
                    <td class="location">
                        <strong>${v.city || 'Unknown'}, ${v.country || 'Unknown'}</strong><br>
                        <span class="details">${v.lat?.toFixed(2) || '0'}, ${v.lon?.toFixed(2) || '0'}</span>
                    </td>
                    <td class="details">${v.screen || 'Unknown'}<br>${v.ua?.split(' ').slice(-1)[0] || 'Unknown'}</td>
                    <td class="details">${v.ip || 'Unknown'}</td>
                </tr>
            `
        }).join('')
    } catch (e) {
        console.error('Failed to fetch visitors', e)
    }
}

function showToast(msg, isError = false) {
    const toast = document.getElementById('toast')
    toast.textContent = msg
    toast.className = `toast show ${isError ? 'error' : ''}`
    setTimeout(() => toast.className = 'toast', 3000)
}

// Initial load
init()
fetchVisitors()
setInterval(fetchVisitors, 5000)
