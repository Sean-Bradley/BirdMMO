import { Canvas, useLoader } from '@react-three/fiber'
import { Environment, Stats } from '@react-three/drei'
import Bird from './Bird'
import Pipes from './Pipes'
import { TextureLoader, RepeatWrapping } from 'three'

function Game() {
  const forest = useLoader(TextureLoader, './img/forest.png')
  forest.wrapS = forest.wrapT = RepeatWrapping
  forest.repeat.set(8, 0.9)

  const city = useLoader(TextureLoader, './img/city.png')
  city.wrapS = city.wrapT = RepeatWrapping
  city.repeat.set(8, 0.9)

  const hills = useLoader(TextureLoader, './img/hills.png')
  hills.wrapS = hills.wrapT = RepeatWrapping
  hills.repeat.set(8, 0.9)

  return (
    <>
      <mesh rotation-x={-Math.PI / 2}>
        <planeGeometry args={[350, 10, 100, 10]}></planeGeometry>
        <meshStandardMaterial color={'#567d46'} />
      </mesh>
      <mesh position={[0, 1.5, -5]}>
        <planeGeometry args={[350, 3]}></planeGeometry>
        <meshStandardMaterial map={forest} transparent />
      </mesh>
      <mesh position={[0, 2.5, -7.5]}>
        <planeGeometry args={[350, 7]}></planeGeometry>
        <meshStandardMaterial map={city} transparent />
      </mesh>
      <mesh position={[0, 3, -10]}>
        <planeGeometry args={[350, 10]}></planeGeometry>
        <meshStandardMaterial map={hills} transparent />
      </mesh>
      <Bird />
      <Pipes />
    </>
  )
}
export default function App() {
  return (
    <Canvas>
      <Environment files="./img/rustig_koppie_puresky_1k.hdr" background />
      <Game />
      <Stats />
    </Canvas>
  )
}
