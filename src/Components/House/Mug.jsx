import React, { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { useTexture } from '@react-three/drei'
import * as THREE from 'three'
import { useConfig, resolveImagePath } from '../../ConfigContext.jsx'

// ── 3D Heart ────────────────────────────────────────────────────
function createHeartShape(s = 1) {
  const shape = new THREE.Shape()
  shape.moveTo(0, 0.3 * s)
  shape.bezierCurveTo(0, 0.35 * s, -0.05 * s, 0.5 * s, -0.25 * s, 0.5 * s)
  shape.bezierCurveTo(-0.55 * s, 0.5 * s, -0.55 * s, 0.175 * s, -0.55 * s, 0.175 * s)
  shape.bezierCurveTo(-0.55 * s, 0, -0.35 * s, -0.2 * s, 0, -0.45 * s)
  shape.bezierCurveTo(0.35 * s, -0.2 * s, 0.55 * s, 0, 0.55 * s, 0.175 * s)
  shape.bezierCurveTo(0.55 * s, 0.175 * s, 0.55 * s, 0.5 * s, 0.25 * s, 0.5 * s)
  shape.bezierCurveTo(0.05 * s, 0.5 * s, 0, 0.35 * s, 0, 0.3 * s)
  return shape
}

function FloatingHeart({ position, color = '#ff6b8a', scale = 0.15, speed = 0.8, delay = 0 }) {
  const ref = useRef()
  const t = useRef(delay)
  const geometry = useMemo(() => {
    const shape = createHeartShape(1)
    return new THREE.ExtrudeGeometry(shape, {
      depth: 0.3,
      bevelEnabled: true,
      bevelThickness: 0.08,
      bevelSize: 0.06,
      bevelSegments: 6,
    })
  }, [])

  useFrame((_, delta) => {
    if (!ref.current) return
    t.current += delta * speed
    ref.current.position.y = position[1] + Math.sin(t.current) * 0.04
    ref.current.rotation.y = Math.sin(t.current * 0.4) * 0.4
  })

  return (
    <mesh ref={ref} geometry={geometry} position={position} scale={scale}>
      <meshStandardMaterial
        color={color}
        metalness={0.5}
        roughness={0.15}
        emissive={color}
        emissiveIntensity={0.12}
      />
    </mesh>
  )
}

// ── Picture Frame (editable via admin) ──────────────────────────
function PictureFrame({ position, rotation = [0, 0, 0], scale = 0.18 }) {
  const { config } = useConfig()
  const picUrl = resolveImagePath(config.frame_picture?.value) || './Textures/bday_cake.png'
  const texture = useTexture(picUrl)

  return (
    <group position={position} rotation={rotation} scale={scale}>
      {/* Frame border — rose gold */}
      <mesh>
        <boxGeometry args={[1.2, 1.5, 0.1]} />
        <meshStandardMaterial color="#b76e79" metalness={0.7} roughness={0.15} />
      </mesh>
      {/* Inner picture */}
      <mesh key={picUrl} position={[0, 0, 0.055]}>
        <planeGeometry args={[0.95, 1.25]} />
        <meshBasicMaterial map={texture} />
      </mesh>
      {/* Glass overlay */}
      <mesh position={[0, 0, 0.06]}>
        <planeGeometry args={[0.95, 1.25]} />
        <meshStandardMaterial
          color="#ffffff"
          transparent
          opacity={0.06}
          metalness={0.95}
          roughness={0.02}
        />
      </mesh>
    </group>
  )
}

// ── Birthday Cake ───────────────────────────────────────────────
function BirthdayCake({ position, scale = 0.08 }) {
  const candleFlame1 = useRef()
  const candleFlame2 = useRef()
  const candleFlame3 = useRef()
  const t = useRef(0)

  useFrame((_, delta) => {
    t.current += delta * 4
    const flames = [candleFlame1, candleFlame2, candleFlame3]
    flames.forEach((f, i) => {
      if (!f.current) return
      f.current.scale.y = 1 + Math.sin(t.current + i * 2) * 0.25
      f.current.scale.x = 1 + Math.cos(t.current * 1.3 + i) * 0.15
    })
  })

  return (
    <group position={position} scale={scale}>
      {/* Bottom tier */}
      <mesh position={[0, 0.5, 0]}>
        <cylinderGeometry args={[1.2, 1.3, 1, 16]} />
        <meshStandardMaterial color="#ffb6c1" roughness={0.5} metalness={0.05} />
      </mesh>
      {/* Bottom frosting rim */}
      <mesh position={[0, 1.02, 0]}>
        <torusGeometry args={[1.2, 0.08, 8, 24]} />
        <meshStandardMaterial color="#fff0f5" roughness={0.3} />
      </mesh>

      {/* Middle tier */}
      <mesh position={[0, 1.5, 0]}>
        <cylinderGeometry args={[0.9, 1, 0.8, 16]} />
        <meshStandardMaterial color="#ffc0cb" roughness={0.5} metalness={0.05} />
      </mesh>
      {/* Middle frosting rim */}
      <mesh position={[0, 1.92, 0]}>
        <torusGeometry args={[0.9, 0.07, 8, 24]} />
        <meshStandardMaterial color="#fff5ee" roughness={0.3} />
      </mesh>

      {/* Top tier */}
      <mesh position={[0, 2.3, 0]}>
        <cylinderGeometry args={[0.6, 0.7, 0.6, 16]} />
        <meshStandardMaterial color="#ffb6c1" roughness={0.5} metalness={0.05} />
      </mesh>
      {/* Top frosting */}
      <mesh position={[0, 2.62, 0]}>
        <cylinderGeometry args={[0.6, 0.6, 0.04, 16]} />
        <meshStandardMaterial color="#fff0f5" roughness={0.3} />
      </mesh>

      {/* Candle 1 (center) */}
      <group position={[0, 2.65, 0]}>
        <mesh>
          <cylinderGeometry args={[0.06, 0.06, 0.5, 6]} />
          <meshStandardMaterial color="#ff69b4" />
        </mesh>
        <mesh ref={candleFlame1} position={[0, 0.35, 0]}>
          <sphereGeometry args={[0.07, 6, 6]} />
          <meshStandardMaterial color="#ffaa00" emissive="#ff6600" emissiveIntensity={3} transparent opacity={0.9} />
        </mesh>
      </group>

      {/* Candle 2 (left) */}
      <group position={[-0.25, 2.65, 0.15]}>
        <mesh>
          <cylinderGeometry args={[0.06, 0.06, 0.4, 6]} />
          <meshStandardMaterial color="#dda0dd" />
        </mesh>
        <mesh ref={candleFlame2} position={[0, 0.3, 0]}>
          <sphereGeometry args={[0.06, 6, 6]} />
          <meshStandardMaterial color="#ffcc00" emissive="#ff8800" emissiveIntensity={3} transparent opacity={0.9} />
        </mesh>
      </group>

      {/* Candle 3 (right) */}
      <group position={[0.25, 2.65, -0.1]}>
        <mesh>
          <cylinderGeometry args={[0.06, 0.06, 0.45, 6]} />
          <meshStandardMaterial color="#ff69b4" />
        </mesh>
        <mesh ref={candleFlame3} position={[0, 0.32, 0]}>
          <sphereGeometry args={[0.06, 6, 6]} />
          <meshStandardMaterial color="#ffaa00" emissive="#ff6600" emissiveIntensity={3} transparent opacity={0.9} />
        </mesh>
      </group>

      {/* Warm glow from candles */}
      <pointLight position={[0, 3.2, 0]} color="#ffaa44" intensity={0.5} distance={2} />

      {/* Small decorative hearts on the side of bottom tier */}
      {[0, Math.PI / 2, Math.PI, 3 * Math.PI / 2].map((angle, i) => (
        <mesh key={i} position={[Math.cos(angle) * 1.25, 0.5, Math.sin(angle) * 1.25]}
          rotation={[0, -angle + Math.PI / 2, 0]} scale={0.12}>
          <sphereGeometry args={[1, 6, 6]} />
          <meshStandardMaterial color="#ff1493" metalness={0.5} roughness={0.3}
            emissive="#ff1493" emissiveIntensity={0.2} />
        </mesh>
      ))}
    </group>
  )
}

// ── Diamond / Crystal Gem ───────────────────────────────────────
function Diamond({ position, color = '#e0aaff', scale = 0.1, speed = 0.7, delay = 0 }) {
  const ref = useRef()
  const t = useRef(delay)
  const geometry = useMemo(() => new THREE.OctahedronGeometry(1, 1), [])

  useFrame((_, delta) => {
    if (!ref.current) return
    t.current += delta * speed
    ref.current.rotation.y += delta * 0.5
    ref.current.rotation.x = Math.sin(t.current * 0.3) * 0.1
    ref.current.position.y = position[1] + Math.sin(t.current) * 0.03
  })

  return (
    <mesh ref={ref} geometry={geometry} position={position} scale={scale}>
      <meshStandardMaterial
        color={color}
        metalness={0.95}
        roughness={0.02}
        emissive={color}
        emissiveIntensity={0.25}
        transparent
        opacity={0.8}
      />
    </mesh>
  )
}

export default function HeartDecorations() {
  return (
    <>
      {/* Picture frame on the shelf — editable via admin */}
      <PictureFrame
        position={[2.415, 2.68, 0.999]}
        rotation={[0, Math.PI, 0]}
        scale={0.18}
      />

      {/* Floating heart on upper shelf */}
      <FloatingHeart
        position={[2.998, 3.35, 3.564]}
        color="#ff6b8a"
        scale={0.15}
        speed={0.8}
        delay={1}
      />

      {/* Birthday cake on the counter */}
      <BirthdayCake
        position={[1.597, 2.72, 2.841]}
        scale={0.08}
      />

      {/* Sparkling diamond on the top shelf */}
      <Diamond
        position={[3.602, 3.8, 3.560]}
        color="#e0aaff"
        scale={0.1}
        speed={0.7}
        delay={3}
      />
    </>
  )
}