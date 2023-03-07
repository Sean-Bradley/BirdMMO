import { Canvas } from '@react-three/fiber'
import { Environment, Stats, PerformanceMonitor } from '@react-three/drei'
import Game from './Game'
import { Suspense, useState } from 'react'

export default function App() {
  const [dpr, setDpr] = useState(0.5)
  return (
    <>
      <Suspense fallback={<Loading />}>
        <Canvas shadows dpr={dpr}>
          <PerformanceMonitor onIncline={() => setDpr(1)} onDecline={() => setDpr(0.25)}>
            <Stats />
            <Environment files="./img/rustig_koppie_puresky_1k.hdr" background />
            <Game />
          </PerformanceMonitor>
        </Canvas>
      </Suspense>
    </>
  )
}

function Loading() {
  return <img id="loader" src="./img/BirdMMO_400.png" />
}
