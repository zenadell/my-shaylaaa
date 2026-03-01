import { useEffect, useRef, useState } from 'react'
import { useConfig, resolveMusicPath } from '../ConfigContext.jsx'

export default function BackgroundMusic() {
    const { config, loaded } = useConfig()
    const audioRef = useRef(null)
    const [playing, setPlaying] = useState(false)
    const [userInteracted, setUserInteracted] = useState(false)

    const musicUrl = resolveMusicPath(config.bg_music?.value)

    // Try to autoplay after any user interaction
    useEffect(() => {
        const handleInteraction = () => {
            if (!userInteracted) {
                setUserInteracted(true)
                    // Remove listeners once interacted
                    ;['click', 'scroll', 'wheel', 'touchstart', 'keydown'].forEach(evt =>
                        window.removeEventListener(evt, handleInteraction)
                    )
            }
        }

            // Add listeners for various interaction types
            ;['click', 'scroll', 'wheel', 'touchstart', 'keydown'].forEach(evt =>
                window.addEventListener(evt, handleInteraction, { once: true, passive: true })
            )

        return () => {
            ;['click', 'scroll', 'wheel', 'touchstart', 'keydown'].forEach(evt =>
                window.removeEventListener(evt, handleInteraction)
            )
        }
    }, [userInteracted])

    // Handle visibility change to pause music when tab is inactive
    useEffect(() => {
        const handleVisibilityChange = () => {
            if (!audioRef.current) return

            if (document.hidden) {
                // Pause if tab is hidden
                audioRef.current.pause()
            } else if (playing) {
                // Resume ONLY if it was explicitly playing before fading out
                audioRef.current.play().catch(() => { })
            }
        }

        document.addEventListener('visibilitychange', handleVisibilityChange)
        return () => document.removeEventListener('visibilitychange', handleVisibilityChange)
    }, [playing])

    useEffect(() => {
        if (!audioRef.current || !musicUrl || !userInteracted) return
        audioRef.current.volume = 0.3

        // Only try to auto-play if the user hasn't explicitly paused it
        // and we aren't currently playing
        if (!playing) {
            audioRef.current.play().then(() => {
                setPlaying(true)
            }).catch(() => {
                // Autoplay blocked
            })
        }
    }, [musicUrl, userInteracted, playing])

    if (!loaded || !musicUrl) return null

    return (
        <div style={{
            position: 'fixed',
            bottom: '20px',
            left: '20px',
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            background: 'rgba(0,0,0,0.6)',
            backdropFilter: 'blur(10px)',
            borderRadius: '30px',
            padding: '8px 16px',
            border: '1px solid rgba(255,255,255,0.1)',
        }}>
            <button
                onClick={() => {
                    if (audioRef.current) {
                        if (playing) {
                            audioRef.current.pause()
                        } else {
                            audioRef.current.play()
                        }
                        setPlaying(!playing)
                    }
                }}
                style={{
                    background: 'none',
                    border: 'none',
                    color: 'white',
                    fontSize: '1.2rem',
                    cursor: 'pointer',
                    padding: '4px',
                }}
            >
                {playing ? '⏸' : '▶️'}
            </button>
            <span style={{
                color: 'rgba(255,255,255,0.7)',
                fontSize: '0.75rem',
                fontFamily: 'Inter, sans-serif',
            }}>
                🎵 Music
            </span>
            <audio ref={audioRef} src={musicUrl} loop />
        </div>
    )
}
