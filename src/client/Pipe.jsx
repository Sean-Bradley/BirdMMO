import { useGLTF } from '@react-three/drei'
import { useEffect, useRef } from 'react'

export default function Pipe({ id, position, colliders }) {
  const colliderRef = [useRef(), useRef()]
  const { nodes, materials } = useGLTF('./models/pipe.glb')
  useEffect(() => {
    //console.log('adding pipe ' + id)
    colliders[colliderRef[0].current.name] = colliderRef[0].current
    colliders[colliderRef[1].current.name] = colliderRef[1].current
  })

  return (
    <group dispose={null} position={position}>
      <mesh geometry={nodes.Cube004.geometry} material={materials['Material.007']} castShadow position={[1.35, -13.13, 0]} scale={[0.05, 9, 0.12]} />
      <mesh geometry={nodes.Cube011.geometry} material={materials['Material.009']} castShadow position={[-0.55, -13.13, 0]} scale={[0.05, 9, 0.12]} />
      <mesh geometry={nodes.Cube012.geometry} material={materials['Material.010']} castShadow position={[-1.15, -13.13, 0]} scale={[0.05, 9, 0.12]} />
      <mesh geometry={nodes.Cube026.geometry} material={materials['Material.011']} castShadow position={[0.75, -13.13, 0]} scale={[0.05, 9, 0.12]} />
      <mesh geometry={nodes.Cube029.geometry} material={materials['Material.012']} castShadow position={[0.95, -13.13, 0]} scale={[0.05, 9, 0.12]} />
      <mesh geometry={nodes.Cube001.geometry} material={materials['Material.007']} castShadow position={[-1.35, 13.13, 0]} rotation={[0, 0, Math.PI]} scale={[0.05, 9, 0.12]} />
      <mesh geometry={nodes.Cube002.geometry} material={materials['Material.009']} castShadow position={[0.55, 13.13, 0]} rotation={[0, 0, Math.PI]} scale={[0.05, 9, 0.12]} />
      <mesh geometry={nodes.Cube003.geometry} material={materials['Material.010']} castShadow position={[1.15, 13.13, 0]} rotation={[0, 0, Math.PI]} scale={[0.05, 9, 0.12]} />
      <mesh geometry={nodes.Cube005.geometry} material={materials['Material.011']} castShadow position={[-0.75, 13.13, 0]} rotation={[0, 0, Math.PI]} scale={[0.05, 9, 0.12]} />
      <mesh geometry={nodes.Cube006.geometry} material={materials['Material.012']} castShadow position={[-0.95, 13.13, 0]} rotation={[0, 0, Math.PI]} scale={[0.05, 9, 0.12]} />
      <mesh ref={colliderRef[0]} name={'collider0_' + id} position-y={-7.05} visible={false}>
        <planeGeometry args={[3, 9, 2, 5]} />
        <meshNormalMaterial wireframe />
      </mesh>
      <mesh ref={colliderRef[1]} name={'collider1_' + id} position-y={7.05} visible={false}>
        <planeGeometry args={[3, 9, 2, 5]} />
        <meshNormalMaterial wireframe />
      </mesh>
    </group>
  )
}

useGLTF.preload('./models/pipe.glb')
