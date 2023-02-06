import { Canvas } from '@react-three/fiber'
import { Environment, OrbitControls, Stats } from '@react-three/drei'
import Game from './Game'
import { Suspense } from 'react'

export default function App() {
  return (
    <>
      <Suspense fallback={<Loading />}>
        <Canvas shadows>
          <Stats />
          <Environment files="./img/rustig_koppie_puresky_1k.hdr" background />
          <Game />
        </Canvas>
      </Suspense>
    </>
  )
}

function Loading() {
  return <img id="loader" src="./img/BirdMMO_400.png" />
}
