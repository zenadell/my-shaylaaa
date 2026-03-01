import { Sky, Float, Text, ScrollControls, useGLTF, Sparkles } from "@react-three/drei"

import Scene from './Components/Scene.jsx'
import Ocean from "./Components/Ocean.jsx"
import CameraScroll from './Components/CameraScroll.jsx'
import { useConfig, t, autoSize } from './ConfigContext.jsx'

import "./App.css";
import ScrollHelper from "./Components/ScrollHelper.jsx";

export default function App() {

  const { nodes } = useGLTF('./Model/House.glb')
  const { config } = useConfig()

  return (
    <>
      <directionalLight position={[1, 2, 3]} intensity={2.5} />

      {/* Magical floating birthday sparkles */}
      <Sparkles count={300} scale={15} size={6} speed={0.4} opacity={0.5} color="#ffd1dc" />
      <Sparkles count={200} scale={15} size={4} speed={0.6} opacity={0.6} color="#ffe5b4" />

      <Ocean />
      <Sky sunPosition={[1, 0.1, 1]} />

      <Float rotationIntensity={0.9}>
        <Text
          font="./fonts/font.ttf"
          position-y={15}
          rotation-y={0.48 * Math.PI}
          curveRadius={-100}
          fontSize={autoSize(t(config, 'floating_title', 'Happy Birthday Shaylaaa'), 5, 18)}
          color="#e6e6e6"
          maxWidth={100}
        >
          {t(config, 'floating_title', 'Happy Birthday Shaylaaa')}
        </Text>
      </Float>

      <Scene nodes={nodes} />


      <ScrollControls pages={25} damping={0.2}>
        <CameraScroll nodes={nodes} />
      </ScrollControls>

      <ScrollHelper />

    </>
  )
}

useGLTF.preload('./Model/House.glb')
