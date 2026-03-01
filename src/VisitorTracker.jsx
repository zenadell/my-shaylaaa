import React, { useEffect, useRef } from 'react'

const API_URL = 'http://localhost:3001'

export default function VisitorTracker() {
    const tracked = useRef(false)

    useEffect(() => {
        if (tracked.current) return
        tracked.current = true

        const trackVisit = async () => {
            try {
                // Get basic info
                const ua = navigator.userAgent
                const screen = `${window.innerWidth}x${window.innerHeight}`

                // Get approximate location via ipapi.co (free tier, no key needed for simple uses)
                // Note: In production you might want a more robust service or server-side IP detection
                let geo = { city: 'Unknown', country: 'Unknown', ip: '', latitude: 0, longitude: 0 }
                try {
                    const res = await fetch('https://ipapi.co/json/')
                    if (res.ok) geo = await res.json()
                } catch (e) { console.warn('Geo lookup failed', e) }

                // Post to our server
                await fetch(`${API_URL}/api/visit`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        ua,
                        screen,
                        city: geo.city,
                        country: geo.country_name || geo.country,
                        ip: geo.ip,
                        lat: geo.latitude,
                        lon: geo.longitude
                    })
                })
            } catch (e) {
                console.error('Visitor tracking failed', e)
            }
        }

        trackVisit()
    }, [])

    return null // Invisible component
}
