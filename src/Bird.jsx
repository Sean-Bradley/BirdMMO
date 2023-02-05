import { useRef, useState } from 'react'
import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'

export default function Bird({ crashed }) {
  const frame = [useRef(), useRef(), useRef()]
  const { nodes, materials } = useGLTF('./models/bird.glb')
  const interval = useRef(0)
  const [frameCount, setFrameCount] = useState(0)

  useFrame((_, delta) => {
    if (!crashed) {
      interval.current += delta
      if (interval.current > 0.1) {
        interval.current -= 0.1
        setFrameCount((frameCount + 1) % 4)
      }
    }
  })

  return (
    <>
      <group ref={frame[0]} visible={frameCount === 0 || frameCount === 2}>
        <mesh geometry={nodes.Cube303.geometry} material={materials['Material.003']} castShadow position={[-0.25, -0.45, 0]} scale={[0.05, 0.05, 0.13]} />
        <mesh geometry={nodes.Cube330.geometry} material={materials['Material.002']} castShadow position={[0.05, 0.45, 0]} scale={[0.05, 0.05, 0.13]} />
        <mesh geometry={nodes.Cube332.geometry} material={materials['Material.001']} castShadow position={[-0.15, 0.35, 0]} scale={[0.05, 0.05, 0.13]} />
        <mesh geometry={nodes.Cube344.geometry} material={materials['Material.004']} castShadow position={[0.25, 0.05, 0]} scale={[0.05, 0.05, 0.13]} />
        <mesh geometry={nodes.Cube358.geometry} material={materials['Material.005']} castShadow position={[0.55, 0.25, 0]} scale={[0.05, 0.05, 0.13]} />
        <mesh geometry={nodes.Cube373.geometry} material={materials['Material.006']} castShadow position={[0.65, -0.35, 0]} scale={[0.05, 0.05, 0.13]} />
        <mesh geometry={nodes.Cube429.geometry} material={materials['Material.007']} castShadow position={[-0.35, -0.35, 0]} scale={[0.05, 0.05, 0.13]} />
      </group>
      <group ref={frame[1]} visible={frameCount === 1}>
        <mesh geometry={nodes.Cube008.geometry} material={materials['Material.001']} castShadow position={[-0.65, -0.15, 0]} scale={[0.05, 0.05, 0.13]} />
        <mesh geometry={nodes.Cube031.geometry} material={materials['Material.002']} castShadow position={[-0.25, 0.35, 0]} scale={[0.05, 0.05, 0.13]} />
        <mesh geometry={nodes.Cube039.geometry} material={materials['Material.003']} castShadow position={[-0.15, -0.35, 0]} scale={[0.05, 0.05, 0.13]} />
        <mesh geometry={nodes.Cube048.geometry} material={materials['Material.004']} castShadow position={[0.25, 0.05, 0]} scale={[0.05, 0.05, 0.13]} />
        <mesh geometry={nodes.Cube051.geometry} material={materials['Material.005']} castShadow position={[0.15, 0.35, 0]} scale={[0.05, 0.05, 0.13]} />
        <mesh geometry={nodes.Cube077.geometry} material={materials['Material.006']} castShadow position={[0.65, -0.35, 0]} scale={[0.05, 0.05, 0.13]} />
        <mesh geometry={nodes.Cube095.geometry} material={materials['Material.007']} castShadow position={[0.65, 0.05, 0]} scale={[0.05, 0.05, 0.13]} />
      </group>
      <group ref={frame[2]} visible={frameCount === 3}>
        <mesh geometry={nodes.Cube169.geometry} material={materials['Material.001']} castShadow position={[-0.25, 0.25, 0]} scale={[0.05, 0.05, 0.13]} />
        <mesh geometry={nodes.Cube180.geometry} material={materials['Material.002']} castShadow position={[-0.05, 0.45, 0]} scale={[0.05, 0.05, 0.13]} />
        <mesh geometry={nodes.Cube193.geometry} material={materials['Material.003']} castShadow position={[0.05, -0.45, 0]} scale={[0.05, 0.05, 0.13]} />
        <mesh geometry={nodes.Cube195.geometry} material={materials['Material.004']} castShadow position={[0.25, 0.05, 0]} scale={[0.05, 0.05, 0.13]} />
        <mesh geometry={nodes.Cube207.geometry} material={materials['Material.005']} castShadow position={[0.35, 0.45, 0]} scale={[0.05, 0.05, 0.13]} />
        <mesh geometry={nodes.Cube219.geometry} material={materials['Material.006']} castShadow position={[0.15, -0.25, 0]} scale={[0.05, 0.05, 0.13]} />
        <mesh geometry={nodes.Cube233.geometry} material={materials['Material.007']} castShadow position={[0.05, -0.25, 0]} scale={[0.05, 0.05, 0.13]} />
      </group>
    </>
  )
}

useGLTF.preload('./models/bird.glb')
