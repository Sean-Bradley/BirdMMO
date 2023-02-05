import { useFrame } from '@react-three/fiber'
import { useRef, useMemo } from 'react'
import Player from './Player'
import Pipes from './Pipes'
import Scenery from './Scenery'

export default function Game() {
  //console.log('rendered game jsx')


  const ref = useRef()

  const colliders = {}
  // useMemo(() => {
  //   return {}
  // }, [])

  useFrame((state) => {
    ref.current.position.x = state.camera.position.x
    ref.current.target.position.x = state.camera.position.x
    ref.current.target.updateMatrixWorld()
  })

  return (
    <>
      <Scenery />
      <Player colliders={colliders} />
      <Pipes colliders={colliders} />
      <directionalLight
        ref={ref}
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
