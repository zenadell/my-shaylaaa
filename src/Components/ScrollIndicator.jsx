import { useState, useEffect } from 'react'

export default function ScrollIndicator() {
    const [isVisible, setIsVisible] = useState(true)

    useEffect(() => {
        let timer = null;

        const handleActivity = () => {
            // As soon as user scrolls/swipes/wheels anything, hide the indicator
            setIsVisible(false)

            // Note: Since this is R3F ScrollControls, window.scrollY is always 0.
            // Using a simple wheel/touch/keydown trigger is more robust.
        }

        window.addEventListener('wheel', handleActivity, { passive: true })
        window.addEventListener('touchmove', handleActivity, { passive: true })
        window.addEventListener('keydown', handleActivity, { passive: true })

        return () => {
            window.removeEventListener('wheel', handleActivity)
            window.removeEventListener('touchmove', handleActivity)
            window.removeEventListener('keydown', handleActivity)
        }
    }, [])

    return (
        <div style={{
            position: 'fixed',
            bottom: '40px',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            opacity: isVisible ? 1 : 0,
            transition: 'opacity 0.5s ease-in-out',
            pointerEvents: 'none',
            zIndex: 1000,
            color: 'white',
            fontFamily: 'Inter, sans-serif',
            textShadow: '0 2px 10px rgba(0,0,0,0.5)',
            // Simple CSS animation for the bounce effect
            animation: 'bounce 2s infinite'
        }}>
            <style>
                {`
                @keyframes bounce {
                    0%, 20%, 50%, 80%, 100% {
                        transform: translateY(0) translateX(-50%);
                    }
                    40% {
                        transform: translateY(-20px) translateX(-50%);
                    }
                    60% {
                        transform: translateY(-10px) translateX(-50%);
                    }
                }
                `}
            </style>
            <span style={{ fontSize: '1rem', marginBottom: '8px', letterSpacing: '1px' }}>
                Scroll gently
            </span>
            <span style={{ fontSize: '1.5rem' }}>
                ↓
            </span>
        </div>
    )
}
