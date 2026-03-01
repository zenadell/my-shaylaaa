import React, { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

// ── Rose Flower ─────────────────────────────────────────────────
function Rose({ position, color = '#ff4757', scale = 0.12, speed = 0.4, delay = 0 }) {
    const ref = useRef()
    const t = useRef(delay)

    useFrame((_, delta) => {
        if (!ref.current) return
        t.current += delta * speed
        ref.current.rotation.y += delta * 0.2
        ref.current.position.y = position[1] + Math.sin(t.current) * 0.02
    })

    return (
        <group ref={ref} position={position} scale={scale}>
            {/* Petals — concentric ring of curved shapes */}
            {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => {
                const angle = (i * Math.PI * 2) / 8
                const layerScale = i < 4 ? 1 : 0.7
                const yOff = i < 4 ? 0 : 0.15
                return (
                    <mesh
                        key={i}
                        position={[Math.cos(angle) * 0.3 * layerScale, yOff, Math.sin(angle) * 0.3 * layerScale]}
                        rotation={[Math.PI / 4, angle, 0]}
                        scale={layerScale}
                    >
                        <sphereGeometry args={[0.35, 8, 6, 0, Math.PI]} />
                        <meshStandardMaterial
                            color={i < 4 ? color : '#ff8a9e'}
                            metalness={0.15}
                            roughness={0.45}
                            side={THREE.DoubleSide}
                        />
                    </mesh>
                )
            })}
            {/* Center bud */}
            <mesh position={[0, 0.25, 0]}>
                <sphereGeometry args={[0.18, 8, 8]} />
                <meshStandardMaterial color="#ffcc44" metalness={0.3} roughness={0.4}
                    emissive="#ffcc00" emissiveIntensity={0.15} />
            </mesh>
            {/* Stem */}
            <mesh position={[0, -0.6, 0]}>
                <cylinderGeometry args={[0.04, 0.05, 1.0, 6]} />
                <meshStandardMaterial color="#228B22" roughness={0.6} />
            </mesh>
            {/* Leaf */}
            <mesh position={[0.15, -0.5, 0]} rotation={[0, 0, -Math.PI / 6]}>
                <sphereGeometry args={[0.15, 6, 4, 0, Math.PI]} />
                <meshStandardMaterial color="#2d8f2d" roughness={0.5} side={THREE.DoubleSide} />
            </mesh>
        </group>
    )
}

// ── Sparkling Star ──────────────────────────────────────────────
function Star({ position, color = '#ffd700', scale = 0.08, speed = 0.6, delay = 0 }) {
    const ref = useRef()
    const t = useRef(delay)

    const geometry = useMemo(() => {
        const shape = new THREE.Shape()
        const outerR = 1, innerR = 0.45
        for (let i = 0; i < 10; i++) {
            const r = i % 2 === 0 ? outerR : innerR
            const angle = (i * Math.PI) / 5 - Math.PI / 2
            const x = Math.cos(angle) * r
            const y = Math.sin(angle) * r
            if (i === 0) shape.moveTo(x, y)
            else shape.lineTo(x, y)
        }
        shape.closePath()
        return new THREE.ExtrudeGeometry(shape, {
            depth: 0.25,
            bevelEnabled: true,
            bevelThickness: 0.06,
            bevelSize: 0.06,
            bevelSegments: 3,
        })
    }, [])

    useFrame((_, delta) => {
        if (!ref.current) return
        t.current += delta * speed
        ref.current.rotation.y += delta * 0.4
        ref.current.position.y = position[1] + Math.sin(t.current) * 0.025
    })

    return (
        <mesh ref={ref} geometry={geometry} position={position} scale={scale}>
            <meshStandardMaterial
                color={color}
                metalness={0.7}
                roughness={0.15}
                emissive={color}
                emissiveIntensity={0.3}
            />
        </mesh>
    )
}

// ── Gift Box ────────────────────────────────────────────────────
function GiftBox({ position, scale = 0.08, speed = 0.3, delay = 0 }) {
    const ref = useRef()
    const t = useRef(delay)

    useFrame((_, delta) => {
        if (!ref.current) return
        t.current += delta * speed
        ref.current.position.y = position[1] + Math.sin(t.current) * 0.015
        ref.current.rotation.y = Math.sin(t.current * 0.3) * 0.15
    })

    return (
        <group ref={ref} position={position} scale={scale}>
            {/* Box body */}
            <mesh>
                <boxGeometry args={[1.2, 1, 1.2]} />
                <meshStandardMaterial color="#ff69b4" roughness={0.4} metalness={0.1} />
            </mesh>
            {/* Lid */}
            <mesh position={[0, 0.6, 0]}>
                <boxGeometry args={[1.35, 0.2, 1.35]} />
                <meshStandardMaterial color="#ff85c0" roughness={0.4} metalness={0.1} />
            </mesh>
            {/* Ribbon vertical */}
            <mesh position={[0, 0.05, 0]}>
                <boxGeometry args={[0.15, 1.05, 1.25]} />
                <meshStandardMaterial color="#ffd700" metalness={0.6} roughness={0.2} />
            </mesh>
            {/* Ribbon horizontal */}
            <mesh position={[0, 0.05, 0]}>
                <boxGeometry args={[1.25, 1.05, 0.15]} />
                <meshStandardMaterial color="#ffd700" metalness={0.6} roughness={0.2} />
            </mesh>
            {/* Bow - two small spheres on top */}
            <mesh position={[-0.15, 0.85, 0]}>
                <sphereGeometry args={[0.18, 8, 8]} />
                <meshStandardMaterial color="#ffd700" metalness={0.5} roughness={0.25} />
            </mesh>
            <mesh position={[0.15, 0.85, 0]}>
                <sphereGeometry args={[0.18, 8, 8]} />
                <meshStandardMaterial color="#ffd700" metalness={0.5} roughness={0.25} />
            </mesh>
        </group>
    )
}

export default function RomanticDecorations() {
    return (
        <>
            {/* Rose on the wall shelf area */}
            <Rose position={[-3.725, 2.65, 2.372]} color="#ff4757" scale={0.12} speed={0.4} delay={0} />

            {/* Golden star near corner */}
            <Star position={[-3.567, 2.65, 0.261]} color="#ffd700" scale={0.08} speed={0.5} delay={2} />

            {/* Gift box on the other shelf */}
            <GiftBox position={[-2.566, 2.6, 3.509]} scale={0.1} speed={0.3} delay={1} />
        </>
    )
}