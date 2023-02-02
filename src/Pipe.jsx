import { useGLTF } from '@react-three/drei'

export default function Pipe({position}) {
  const { nodes, materials } = useGLTF('./models/pipe.glb')
  return (
    <group dispose={null} position={position}>
      <mesh geometry={nodes.Cube004.geometry} material={materials['Material.007']} position={[1.35, -13.13, 0]} scale={[0.05, 9, 0.12]} />
      <mesh geometry={nodes.Cube011.geometry} material={materials['Material.009']} position={[-0.55, -13.13, 0]} scale={[0.05, 9, 0.12]} />
      <mesh geometry={nodes.Cube012.geometry} material={materials['Material.010']} position={[-1.15, -13.13, 0]} scale={[0.05, 9, 0.12]} />
      <mesh geometry={nodes.Cube026.geometry} material={materials['Material.011']} position={[0.75, -13.13, 0]} scale={[0.05, 9, 0.12]} />
      <mesh geometry={nodes.Cube029.geometry} material={materials['Material.012']} position={[0.95, -13.13, 0]} scale={[0.05, 9, 0.12]} />
      <mesh geometry={nodes.Cube001.geometry} material={materials['Material.007']} position={[-1.35, 13.13, 0]} rotation={[0, 0, Math.PI]} scale={[0.05, 9, 0.12]} />
      <mesh geometry={nodes.Cube002.geometry} material={materials['Material.009']} position={[0.55, 13.13, 0]} rotation={[0, 0, Math.PI]} scale={[0.05, 9, 0.12]} />
      <mesh geometry={nodes.Cube003.geometry} material={materials['Material.010']} position={[1.15, 13.13, 0]} rotation={[0, 0, Math.PI]} scale={[0.05, 9, 0.12]} />
      <mesh geometry={nodes.Cube005.geometry} material={materials['Material.011']} position={[-0.75, 13.13, 0]} rotation={[0, 0, Math.PI]} scale={[0.05, 9, 0.12]} />
      <mesh geometry={nodes.Cube006.geometry} material={materials['Material.012']} position={[-0.95, 13.13, 0]} rotation={[0, 0, Math.PI]} scale={[0.05, 9, 0.12]} />
    </group>
  )
}

useGLTF.preload('./models/pipe.glb')
