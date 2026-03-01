import React, { useRef } from 'react'
import { Text, Billboard } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useConfig, t, autoSize } from '../../ConfigContext.jsx'

export default function Robot(props) {
    const group = useRef()
    const floatRef = useRef(0)
    const { config } = useConfig()



    // Gentle floating bob animation
    useFrame((state, delta) => {
        floatRef.current += delta
        if (group.current) {
            group.current.position.y = Math.sin(floatRef.current * 2) * 0.03
        }
    })

    return (
        <group {...props} dispose={null}>

            {/* Floating Text above the Robot */}
            <Billboard position={[0, 0.52, 0]}>
                <Text
                    fontSize={autoSize(t(config, 'robot_text', 'chaka wishes you too'), 0.08, 20)}
                    color="#f4eadb"
                    font="./fonts/Bangers.ttf"
                    anchorX="center"
                    anchorY="bottom"
                    maxWidth={0.8}
                >
                    {t(config, 'robot_text', 'chaka wishes you too')}
                </Text>
            </Billboard>

            {/* The Cute Robot Built from Geometry - rotated 180° to face camera */}
            <group ref={group} position={[0, 0.12, 0]} scale={0.28} rotation={[0, Math.PI, 0]}>

                {/* === BODY === */}
                {/* Main body - lower sphere */}
                <mesh position={[0, 0.35, 0]}>
                    <sphereGeometry args={[0.38, 32, 32]} />
                    <meshStandardMaterial color="#e8e8ec" metalness={0.3} roughness={0.4} />
                </mesh>

                {/* Belly line detail */}
                <mesh position={[0, 0.25, 0.01]}>
                    <torusGeometry args={[0.32, 0.012, 8, 48, Math.PI]} />
                    <meshStandardMaterial color="#c0c0c8" metalness={0.5} roughness={0.3} />
                </mesh>

                {/* Chest plate accent */}
                <mesh position={[0, 0.4, 0.34]}>
                    <boxGeometry args={[0.18, 0.04, 0.02]} />
                    <meshStandardMaterial color="#b0b0b8" metalness={0.6} roughness={0.2} />
                </mesh>

                {/* === NECK === */}
                <mesh position={[0, 0.7, 0]}>
                    <cylinderGeometry args={[0.08, 0.1, 0.08, 16]} />
                    <meshStandardMaterial color="#d0d0d8" metalness={0.4} roughness={0.3} />
                </mesh>

                {/* === HEAD === */}
                {/* Main head sphere */}
                <mesh position={[0, 0.95, 0]}>
                    <sphereGeometry args={[0.32, 32, 32]} />
                    <meshStandardMaterial color="#e8e8ec" metalness={0.3} roughness={0.4} />
                </mesh>

                {/* Head top cap */}
                <mesh position={[0, 1.18, 0]}>
                    <sphereGeometry args={[0.22, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
                    <meshStandardMaterial color="#d8d8e0" metalness={0.4} roughness={0.3} />
                </mesh>

                {/* === VISOR / FACE === */}
                {/* Dark face visor */}
                <mesh position={[0, 0.95, 0.15]} rotation={[0, 0, 0]}>
                    <sphereGeometry args={[0.28, 32, 32,
                        -Math.PI / 2.5, Math.PI / 1.25,
                        Math.PI / 4, Math.PI / 2.5
                    ]} />
                    <meshStandardMaterial
                        color="#1a2a3a"
                        metalness={0.8}
                        roughness={0.1}
                        transparent
                        opacity={0.95}
                    />
                </mesh>

                {/* === EYES === */}
                {/* Left eye - glowing cyan */}
                <mesh position={[-0.1, 0.98, 0.28]}>
                    <sphereGeometry args={[0.045, 16, 16]} />
                    <meshStandardMaterial
                        color="#00e5ff"
                        emissive="#00e5ff"
                        emissiveIntensity={2.5}
                        toneMapped={false}
                    />
                </mesh>

                {/* Right eye - glowing cyan */}
                <mesh position={[0.1, 0.98, 0.28]}>
                    <sphereGeometry args={[0.045, 16, 16]} />
                    <meshStandardMaterial
                        color="#00e5ff"
                        emissive="#00e5ff"
                        emissiveIntensity={2.5}
                        toneMapped={false}
                    />
                </mesh>

                {/* === SMILE === */}
                {/* Cute smile - glowing cyan arc */}
                <mesh position={[0, 0.88, 0.285]} rotation={[0, 0, 0]}>
                    <torusGeometry args={[0.06, 0.012, 8, 16, Math.PI]} />
                    <meshStandardMaterial
                        color="#00e5ff"
                        emissive="#00e5ff"
                        emissiveIntensity={2}
                        toneMapped={false}
                    />
                </mesh>

                {/* === EARS / HEADPHONES === */}
                {/* Left ear */}
                <mesh position={[-0.33, 0.95, 0]} rotation={[0, 0, Math.PI / 2]}>
                    <cylinderGeometry args={[0.08, 0.08, 0.08, 16]} />
                    <meshStandardMaterial color="#d0d0d8" metalness={0.5} roughness={0.3} />
                </mesh>

                {/* Right ear */}
                <mesh position={[0.33, 0.95, 0]} rotation={[0, 0, Math.PI / 2]}>
                    <cylinderGeometry args={[0.08, 0.08, 0.08, 16]} />
                    <meshStandardMaterial color="#d0d0d8" metalness={0.5} roughness={0.3} />
                </mesh>

                {/* === ARMS === */}
                {/* Left arm */}
                <group position={[-0.42, 0.45, 0]} rotation={[0, 0, -0.4]}>
                    {/* Shoulder joint */}
                    <mesh>
                        <sphereGeometry args={[0.06, 16, 16]} />
                        <meshStandardMaterial color="#d8d8e0" metalness={0.4} roughness={0.3} />
                    </mesh>
                    {/* Upper arm */}
                    <mesh position={[0, -0.1, 0]}>
                        <capsuleGeometry args={[0.04, 0.12, 8, 8]} />
                        <meshStandardMaterial color="#e0e0e8" metalness={0.3} roughness={0.4} />
                    </mesh>
                    {/* Hand */}
                    <mesh position={[0, -0.22, 0]}>
                        <sphereGeometry args={[0.05, 16, 16]} />
                        <meshStandardMaterial color="#d8d8e0" metalness={0.4} roughness={0.3} />
                    </mesh>
                </group>

                {/* Right arm */}
                <group position={[0.42, 0.45, 0]} rotation={[0, 0, 0.4]}>
                    {/* Shoulder joint */}
                    <mesh>
                        <sphereGeometry args={[0.06, 16, 16]} />
                        <meshStandardMaterial color="#d8d8e0" metalness={0.4} roughness={0.3} />
                    </mesh>
                    {/* Upper arm */}
                    <mesh position={[0, -0.1, 0]}>
                        <capsuleGeometry args={[0.04, 0.12, 8, 8]} />
                        <meshStandardMaterial color="#e0e0e8" metalness={0.3} roughness={0.4} />
                    </mesh>
                    {/* Hand */}
                    <mesh position={[0, -0.22, 0]}>
                        <sphereGeometry args={[0.05, 16, 16]} />
                        <meshStandardMaterial color="#d8d8e0" metalness={0.4} roughness={0.3} />
                    </mesh>
                </group>

                {/* === SHADOW on floor === */}
                <mesh position={[0, -0.05, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                    <circleGeometry args={[0.25, 32]} />
                    <meshBasicMaterial color="#000000" transparent opacity={0.15} />
                </mesh>

                {/* === POINT LIGHT for glow effect === */}
                <pointLight position={[0, 0.95, 0.3]} color="#00e5ff" intensity={0.5} distance={1.5} />

            </group>
        </group>
    )
}
