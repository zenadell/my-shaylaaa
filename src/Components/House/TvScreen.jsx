import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { Html } from "@react-three/drei"
import { useConfig, t } from '../../ConfigContext.jsx'

import vertexShader from '../../shaders/tvnoise/vertex.glsl'
import fragmentShader from '../../shaders/tvnoise/fragment.glsl'

const FALLBACK_LETTER = `My Dearest Shaylaaa,

I just wanted to say how much you mean to me. Every moment with you is special, and watching you grow is the greatest gift. You are smart, beautiful, and the kindest person I know.

Happy Birthday, my love! I hope this little 3D world brings a smile to your face, just like you do for me every single day.

Forever yours. ❤️`

export default function TvScreen(props) {
  const { config } = useConfig()
  const content = t(config, 'love_letter', FALLBACK_LETTER)
  const planeRef = useRef()
  const scrollContainerRef = useRef()

  // Constants for layout
  const WIDTH = 0.6
  const HEIGHT = 0.4

  useFrame(({ clock }) => {
    if (planeRef.current?.material?.uniforms) {
      planeRef.current.material.uniforms.uTime.value = clock.getElapsedTime()
      planeRef.current.material.uniforms.uProgress.value = props.progress || 0
    }
  })

  const shaderMaterial = {
    vertexShader,
    fragmentShader,
    uniforms: {
      uTime: { value: 0 },
      uProgress: { value: props.progress || 0 }
    }
  }

  const isClose = props.opacity > 0.75
  const letterOpacity = isClose ? Math.min(1, (props.opacity - 0.75) * 4) : 0

  const handleScrollDown = (e) => {
    e.stopPropagation()
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ top: 100, behavior: 'smooth' })
    }
  }

  return <group position={[0.61, 2.35, -3.49]}>
    <ambientLight intensity={1.5} />

    {/* TV Noise Background */}
    <mesh ref={planeRef}>
      <planeGeometry args={[0.65, 0.45]} />
      <shaderMaterial attach="material" args={[{ ...shaderMaterial }]} />
    </mesh>

    {/* TV Letter as Native HTML Overlay */}
    <Html
      transform
      distanceFactor={0.155}
      position={[0, 0, 0.01]}
      portal={{ current: document.body }} // Use global portal for z-index control
      style={{
        width: '800px',
        height: '550px',
        pointerEvents: isClose ? 'auto' : 'none',
        opacity: letterOpacity,
        transition: 'opacity 0.3s ease'
      }}
    >
      <div
        id="tv-letter-root"
        className="tv-screen-container"
      >
        <div
          className="tv-letter-screen"
          ref={scrollContainerRef}
        >
          <div className="letter-body">
            {content}
          </div>

          {/* Functional scroll indicator / button */}
          {isClose && (
            <div
              className="scroll-indicator"
              onClick={handleScrollDown}
            >
              ↓ scroll down ↓
            </div>
          )}
        </div>
      </div>
    </Html>
  </group>
}