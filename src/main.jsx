import { Analytics } from "@vercel/analytics/react"
import React, { Component } from 'react'
import ReactDOM from 'react-dom/client'
import { Canvas } from '@react-three/fiber'
import { Perf } from 'r3f-perf'
import { StrictMode, Suspense } from 'react'

import { ConfigProvider } from './ConfigContext.jsx'
import VisitorTracker from './VisitorTracker.jsx'
import Loader from './Components/Loader.jsx'
import BackgroundMusic from './Components/BackgroundMusic.jsx'
import ScrollIndicator from './Components/ScrollIndicator.jsx'
import App from './App.jsx'
import './index.css'

// Error Boundary to prevent white screen on crash
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError(error) { return { hasError: true }; }
  componentDidCatch(error, errorInfo) { console.error("React Crash:", error, errorInfo); }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#000', color: '#fff', textAlign: 'center', padding: '20px' }}>
          <h1>Something went wrong but we're still here! ❤️</h1>
          <p>Please refresh the page. If the issue persists, the 3D scene may have hit a limit.</p>
          <button onClick={() => window.location.reload()} style={{ padding: '10px 20px', background: '#fff', color: '#000', border: 'none', borderRadius: '5px', cursor: 'pointer', marginTop: '10px' }}>Refresh</button>
        </div>
      );
    }
    return this.props.children;
  }
}

console.log("Happy Birthday Shaylaaa! ❤️")

const isMobile = () => {
  return ((window.innerWidth <= 1000) && (window.innerHeight <= 800));
}

const root = ReactDOM.createRoot(document.querySelector('#root'))

root.render(
  <StrictMode>
    <ErrorBoundary>
      <ConfigProvider>
        <VisitorTracker />
        <Canvas
          camera={{
            fov: isMobile() ? 100 : 45,
            near: 0.1,
            far: 200,
            position: [52, 7, 12],
          }}
        >
          <Suspense fallback={<Loader />}>
            <App />
          </Suspense>
        </Canvas>

        <Analytics />
        <div style={{ display: "none" }}>
          <section aria-hidden="true">
            <h1>Happy Birthday Shaylaaa</h1>
            <h2>To the most amazing girl in the world</h2>
          </section>
        </div>

        <BackgroundMusic />
        <ScrollIndicator />
      </ConfigProvider>
    </ErrorBoundary>
  </StrictMode>
)