import { useLoader } from '@react-three/fiber'
import { TextureLoader, RepeatWrapping } from 'three'

export default function Scenery() {
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
