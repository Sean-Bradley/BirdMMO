import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import { Environment, OrbitControls, Stats, Html } from '@react-three/drei'
import Bird from './Bird'
import Pipes from './Pipes'
import { TextureLoader, RepeatWrapping, Object3D } from 'three'
import { useRef, useMemo } from 'react'

function Score() {
  const ref = useRef()
  useFrame((state) => {
    ref.current.innerText = Math.floor(state.camera.position.x / 10) + 26
  })

  return (
    <Html position-y={160}>
      <div ref={ref} id="score"></div>
    </Html>
  )
}

function Scenery() {
  const forest = useLoader(TextureLoader, './img/forest.png')
  forest.wrapS = RepeatWrapping
  forest.repeat.set(10, 1)

  const city = useLoader(TextureLoader, './img/city.png')
  city.wrapS = RepeatWrapping
  city.repeat.set(10, 1)

  const hills = useLoader(TextureLoader, './img/hills.png')
  hills.wrapS = RepeatWrapping
  hills.repeat.set(8, 1)

  return (
    <>
      <mesh rotation-x={-Math.PI / 2} receiveShadow>
        <planeGeometry args={[600, 10]}></planeGeometry>
        <meshStandardMaterial color={'#567d46'} />
      </mesh>
      <mesh position={[0, 1.5, -5]} receiveShadow>
        <planeGeometry args={[600, 4]}></planeGeometry>
        <meshStandardMaterial map={forest} transparent />
      </mesh>
      <mesh position={[0, 2.5, -7.5]} receiveShadow>
        <planeGeometry args={[600, 8]}></planeGeometry>
        <meshStandardMaterial map={city} transparent />
      </mesh>
      <mesh position={[0, 3, -10]} receiveShadow>
        <planeGeometry args={[600, 12]}></planeGeometry>
        <meshStandardMaterial map={hills} transparent />
      </mesh>
    </>
  )
}

function Game() {
  const ref = useRef()
  useFrame((state) => {
    // ref.current.shadow.camera.left = state.camera.position.x - 30
    // ref.current.shadow.camera.right = state.camera.position.x + 30
    //
    ref.current.position.x = state.camera.position.x
    ref.current.target.position.x = state.camera.position.x
    ref.current.target.updateMatrixWorld()
  })

  return (
    <>
      <Score />
      <Scenery />
      <Bird />
      <Pipes />
      <directionalLight ref={ref} position={[10, 10, 10]} castShadow shadow-camera-left={-20} shadow-camera-right={40} shadow-camera-top={30}/>
    </>
  )
}
export default function App() {
  return (
    <>
      <Canvas shadows>
        <Environment files="./img/rustig_koppie_puresky_1k.hdr" background />
        <Game />
        <OrbitControls />
        <Stats />
      </Canvas>
    </>
  )
}
