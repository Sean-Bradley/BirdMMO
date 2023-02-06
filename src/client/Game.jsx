import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import Player from './Player'
import Pipes from './Pipes'
import Scenery from './Scenery'

export default function Game() {
  const lightRef = useRef()
  const colliders = {}
  // useMemo(() => {
  //   return {}
  // }, [])

  useFrame((state) => {
    lightRef.current.position.x = state.camera.position.x
    lightRef.current.target.position.x = state.camera.position.x
    lightRef.current.target.updateMatrixWorld()
  })

  return (
    <>
      <Scenery />
      <Pipes colliders={colliders} />
      <Player colliders={colliders} />
      <directionalLight
        ref={lightRef}
        position={[10, 10, 10]}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-left={-20}
        shadow-camera-right={40}
        shadow-camera-top={30}
      />
    </>
  )
}
