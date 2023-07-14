import { useRef, useState, useEffect } from 'react'
import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'

export default function Bird({ crashed = false, color = 'green' }) {
  const frame = [useRef(), useRef(), useRef()]
  const { nodes, materials } = useGLTF('./models/bird.glb')
  const [frameCount, setFrameCount] = useState(0)

  let primary, secondary, tertiary
  switch (color) {
    case 'green':
      primary = 0x02f8a4
      secondary = 0x00fa4a
      tertiary = 0xa6ece4
      break
    case 'red':
      primary = 0xf80256
      secondary = 0xfa00b0
      tertiary = 0xeca6ae
      break
    case 'blue':
      primary = 0x02b0f8
      secondary = 0x00fae8
      tertiary = 0xa6c8ec
      break
    case 'yellow':
      primary = 0xf8d902
      secondary = 0xfa8100
      tertiary = 0xe5eca6
      break
  }

  useEffect(() => {
    const interval = setInterval(() => {
      if (!crashed) {
        setFrameCount((frameCount + 1) % 4)
      }
    }, 100)
    return () => clearInterval(interval)
  })

  return (
    <>
      <group ref={frame[0]} visible={frameCount === 0 || frameCount === 2}>
        <mesh geometry={nodes.Cube303.geometry} castShadow position={[-0.25, -0.45, 0]} scale={[0.05, 0.05, 0.13]}>
          <meshStandardMaterial color={secondary} />
        </mesh>
        <mesh geometry={nodes.Cube330.geometry} castShadow position={[0.05, 0.45, 0]} scale={[0.05, 0.05, 0.13]}>
          <meshStandardMaterial color={tertiary} />
        </mesh>
        <mesh geometry={nodes.Cube332.geometry} castShadow position={[-0.15, 0.35, 0]} scale={[0.05, 0.05, 0.13]}>
          <meshStandardMaterial color={primary} />
        </mesh>
        <mesh geometry={nodes.Cube344.geometry} material={materials['Material.004']} castShadow position={[0.25, 0.05, 0]} scale={[0.05, 0.05, 0.13]} />
        <mesh geometry={nodes.Cube358.geometry} material={materials['Material.005']} castShadow position={[0.55, 0.25, 0]} scale={[0.05, 0.05, 0.13]} />
        <mesh geometry={nodes.Cube373.geometry} material={materials['Material.006']} castShadow position={[0.65, -0.35, 0]} scale={[0.05, 0.05, 0.13]} />
        <mesh geometry={nodes.Cube429.geometry} material={materials['Material.007']} castShadow position={[-0.35, -0.35, 0]} scale={[0.05, 0.05, 0.13]} />
      </group>
      <group ref={frame[1]} visible={frameCount === 1}>
        <mesh geometry={nodes.Cube008.geometry} castShadow position={[-0.65, -0.15, 0]} scale={[0.05, 0.05, 0.13]}>
          <meshStandardMaterial color={primary} />
        </mesh>
        <mesh geometry={nodes.Cube031.geometry} castShadow position={[-0.25, 0.35, 0]} scale={[0.05, 0.05, 0.13]}>
          <meshStandardMaterial color={tertiary} />
        </mesh>
        <mesh geometry={nodes.Cube039.geometry} castShadow position={[-0.15, -0.35, 0]} scale={[0.05, 0.05, 0.13]}>
          <meshStandardMaterial color={secondary} />
        </mesh>
        <mesh geometry={nodes.Cube048.geometry} material={materials['Material.004']} castShadow position={[0.25, 0.05, 0]} scale={[0.05, 0.05, 0.13]} />
        <mesh geometry={nodes.Cube051.geometry} material={materials['Material.005']} castShadow position={[0.15, 0.35, 0]} scale={[0.05, 0.05, 0.13]} />
        <mesh geometry={nodes.Cube077.geometry} material={materials['Material.006']} castShadow position={[0.65, -0.35, 0]} scale={[0.05, 0.05, 0.13]} />
        <mesh geometry={nodes.Cube095.geometry} material={materials['Material.007']} castShadow position={[0.65, 0.05, 0]} scale={[0.05, 0.05, 0.13]} />
      </group>
      <group ref={frame[2]} visible={frameCount === 3}>
        <mesh geometry={nodes.Cube169.geometry} castShadow position={[-0.25, 0.25, 0]} scale={[0.05, 0.05, 0.13]}>
          <meshStandardMaterial color={primary} />
        </mesh>
        <mesh geometry={nodes.Cube180.geometry} castShadow position={[-0.05, 0.45, 0]} scale={[0.05, 0.05, 0.13]}>
          <meshStandardMaterial color={tertiary} />
        </mesh>
        <mesh geometry={nodes.Cube193.geometry} castShadow position={[0.05, -0.45, 0]} scale={[0.05, 0.05, 0.13]}>
          <meshStandardMaterial color={secondary} />
        </mesh>
        <mesh geometry={nodes.Cube195.geometry} material={materials['Material.004']} castShadow position={[0.25, 0.05, 0]} scale={[0.05, 0.05, 0.13]} />
        <mesh geometry={nodes.Cube207.geometry} material={materials['Material.005']} castShadow position={[0.35, 0.45, 0]} scale={[0.05, 0.05, 0.13]} />
        <mesh geometry={nodes.Cube219.geometry} material={materials['Material.006']} castShadow position={[0.15, -0.25, 0]} scale={[0.05, 0.05, 0.13]} />
        <mesh geometry={nodes.Cube233.geometry} material={materials['Material.007']} castShadow position={[0.05, -0.25, 0]} scale={[0.05, 0.05, 0.13]} />
      </group>
    </>
  )
}

useGLTF.preload('./models/bird.glb')
