import { Canvas } from '@react-three/fiber'
import { Environment, OrbitControls, Stats } from '@react-three/drei'
import Game from './Game'

export default function App() {

  return (
    <>
      <Canvas shadows>
        <Environment files="./img/rustig_koppie_puresky_1k.hdr" background />
        <Game />
        {/* <OrbitControls /> */}
        <Stats />
      </Canvas>
      <span id="score" />
    </>
  )
}
