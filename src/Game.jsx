import { useFrame } from '@react-three/fiber'
import { Html } from '@react-three/drei'
import { useRef, useMemo } from 'react'
import Bird from './Bird'
import Pipes from './Pipes'
import Scenery from './Scenery'
//import { Debug, Physics } from '@react-three/cannon'

function Score() {
  const ref = useRef()
  useFrame((state) => {
    ref.current && (ref.current.innerText = Math.floor(state.camera.position.x / 10) + 26)
  })

  return (
    <Html>
      <div ref={ref} id="score"></div>
    </Html>
  )
}

export default function Game() {
  const ref = useRef()
  const colliders = useMemo(() => {
    return {}
  }, [])

  useFrame((state) => {
    ref.current.position.x = state.camera.position.x
    ref.current.target.position.x = state.camera.position.x
    ref.current.target.updateMatrixWorld()
  })

  return (
    <>
      <Score />
      <Scenery />
      <Bird colliders={colliders} />
      <Pipes colliders={colliders} />
      <directionalLight ref={ref} position={[10, 10, 10]} castShadow shadow-camera-left={-20} shadow-camera-right={40} shadow-camera-top={30} />
    </>
  )
}
