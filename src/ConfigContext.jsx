import React, { createContext, useContext, useState, useEffect, useRef, useCallback } from 'react'

const ConfigContext = createContext({})

const API_URL = 'http://localhost:3001'
const POLL_INTERVAL = 2000

const DEFAULTS = {
    picture_1: { value: './Textures/bday_cake.png', type: 'image' },
    picture_2: { value: './Textures/bday_flowers.png', type: 'image' },
    picture_3: { value: './Textures/bday_balloons.png', type: 'image' },
    picture_4: { value: './Textures/bday_teddy.png', type: 'image' },
    picture_5: { value: './Textures/bday_presents.png', type: 'image' },
    frame_picture: { value: './Textures/bday_cake.png', type: 'image' },
    quality_1: { value: 'BEAUTIFUL', type: 'text' },
    quality_2: { value: 'SMART', type: 'text' },
    quality_3: { value: 'FUNNY', type: 'text' },
    quality_4: { value: 'SWEET', type: 'text' },
    quality_5: { value: 'KIND', type: 'text' },
    quality_6: { value: 'CARING', type: 'text' },
    quality_7: { value: 'CUTE', type: 'text' },
    quality_8: { value: 'AMAZING', type: 'text' },
    main_title: { value: 'HAPPY BIRTHDAY', type: 'text' },
    main_title_sub: { value: 'MY LOVE', type: 'text' },
    diploma_text: { value: 'To the most amazing person', type: 'text' },
    diploma_sub1: { value: '(I love you)', type: 'text' },
    diploma_sub2: { value: 'Forever and ever', type: 'text' },
    license_text: { value: 'Every day with you is a blessing', type: 'text' },
    license_sub1: { value: '(My favorite person)', type: 'text' },
    license_sub2: { value: 'You mean the world to me', type: 'text' },
    birthday_wish: { value: 'Wishing my shaylaaa the best birthday', type: 'text' },
    birthday_wish_sub1: { value: '(Happy Birthday!)', type: 'text' },
    birthday_wish_sub2: { value: 'I hope all your wishes come true', type: 'text' },
    smile_text: { value: 'Your smile...', type: 'text' },
    smile_sub: { value: 'is hypnotizing', type: 'text' },
    everything_text: { value: 'You are my everything', type: 'text' },
    love_text: { value: 'I love us...', type: 'text' },
    love_sub: { value: 'and our memories', type: 'text' },
    heart_text: { value: 'You have my heart...', type: 'text' },
    heart_subtext: { value: 'now and forever', type: 'text' },
    final_text: { value: 'Happy Birthday Shaylaaa !', type: 'text' },
    floating_title: { value: 'Happy Birthday Shaylaaa', type: 'text' },
    robot_text: { value: 'chaka wishes you too', type: 'text' },
    love_letter: { value: 'My Dearest,\n\nI just wanted to say how much you mean to me. Every moment with you is special...\n\nForever yours.', type: 'textarea' },
    bg_music: { value: '', type: 'music' },
}

export function ConfigProvider({ children }) {
    const [config, setConfig] = useState(DEFAULTS)
    const [loaded, setLoaded] = useState(false)
    const prevJson = useRef('')

    // Removed 'loaded' from dependency to prevent infinite loop triggers
    const fetchConfig = useCallback(async () => {
        try {
            const res = await fetch(API_URL + '/api/config')
            if (!res.ok) throw new Error('Fetch failed')
            const data = await res.json()
            const json = JSON.stringify(data)
            if (json !== prevJson.current) {
                prevJson.current = json
                setConfig(data)
            }
            setLoaded(true)
        } catch (err) {
            console.warn("Config fetch failed, using defaults.")
            setLoaded(true)
        }
    }, [])

    useEffect(() => {
        fetchConfig()
    }, [fetchConfig])

    useEffect(() => {
        const interval = setInterval(fetchConfig, POLL_INTERVAL)
        return () => clearInterval(interval)
    }, [fetchConfig])

    return (
        <ConfigContext.Provider value={{ config, loaded }}>
            {children}
        </ConfigContext.Provider>
    )
}

export function useConfig() {
    return useContext(ConfigContext)
}

// Get text value from config
export function t(config, key, fallback = '') {
    const val = config[key]?.value
    if (val !== undefined) return val
    return fallback
}

export function autoSize(text, baseFontSize, idealChars = 10) {
    if (!text || text.length <= idealChars) return baseFontSize
    const min = baseFontSize * 0.2
    const scaled = baseFontSize * (idealChars / text.length)
    return Math.max(min, scaled)
}

export function resolveImagePath(val) {
    if (!val) return ''
    if (val.startsWith('/uploads/')) return API_URL + val
    return val
}

export function resolveMusicPath(val) {
    if (!val) return ''
    if (val.startsWith('/uploads/')) return API_URL + val
    return val
}
