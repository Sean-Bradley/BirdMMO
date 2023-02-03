import { useMemo, useRef, useState } from 'react'
import { useGLTF, Html, Hud, OrthographicCamera, Center } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import useKeyboard from './useKeyboard'
import { MathUtils, Vector3 } from 'three'

const GRAVITY = 50

// function Score({ model }) {
//   const ref = useRef()
//   useFrame(() => {
//     let score = Math.floor((model.current.position.x - 2) / 10) + 26
//     score < 0 && (score = 0)
//     //ref.current && (ref.current.innerText = score)
//     document.getElementById('score').innerText = score
//   })

//   // return (
//   //   <Html>
//   //     <div ref={ref} id="score"></div>
//   //   </Html>
//   // )
// }

export default function Bird({ colliders }) {
  const model = useRef()
  const frame = [useRef(), useRef(), useRef()]
  const { nodes, materials } = useGLTF('./models/bird.glb')
  const count = useRef(0)
  const [frameCount, setFrameCount] = useState(0)
  const keyMap = useKeyboard()
  const velocity = useMemo(() => new Vector3(), [])
  const lookAt = useMemo(() => new Vector3(), [])
  const startPosition = useMemo(() => new Vector3(-260, 1, 0), [])
  const [crashed, setCrashed] = useState()

  useFrame((state, delta) => {
    if (!crashed) {
      count.current += delta
      if (count.current > 0.05) {
        // once every 5 ms
        count.current -= 0.05
        setFrameCount((frameCount + 1) % 4)

        frame[0].current.visible = false
        frame[1].current.visible = false
        frame[2].current.visible = false

        switch (frameCount) {
          case 1:
            frame[1].current.visible = true
            break
          case 2:
            frame[2].current.visible = true
            break
          case 3:
            frame[1].current.visible = true
            break
          default:
            frame[0].current.visible = true
        }
      }

      keyMap['Space'] && (velocity.y = 10)

      let damping = Math.exp(-4 * delta) - 1
      if (model.current.position.y > 0.65) {
        velocity.x += delta * 2
        velocity.y -= GRAVITY * delta
        damping *= 0.066 // gradual speed up
      } else {
        model.current.position.y = 0.65
        velocity.x = 0
      }
      velocity.addScaledVector(velocity, damping)
      const deltaPosition = velocity.clone().multiplyScalar(delta)
      model.current.position.add(deltaPosition)

      model.current.rotation.z = (velocity.y / 180) * Math.PI * 2

      state.camera.position.y = MathUtils.lerp(state.camera.position.y, model.current.position.y, 0.1)
      state.camera.position.y < 1 && (state.camera.position.y = 1)
      state.camera.position.x = MathUtils.lerp(state.camera.position.x, model.current.position.x, 0.1)

      //state.camera.position.z = 15 // todo: if mobile portrait mode

      lookAt.lerp(model.current.position, 0.1)
      lookAt.x += 0.1
      state.camera.lookAt(lookAt)

      const nextPipeID = Math.floor((model.current.position.x - 5) / 10 + 26) //only checking closest pipe
      for (let i = 0; i < 2; i++) {
        if (!crashed && nextPipeID > -1) {
          const pipeCollider = colliders['collider' + i + '_' + nextPipeID]
          //pipeCollider.visible = true
          const positions = pipeCollider.geometry.attributes.position.array
          for (let j = 0; j < positions.length; j += 3) {
            const v = new Vector3(positions[j], positions[j + 1], positions[j + 2])
            const globalVertex = v.applyMatrix4(pipeCollider.matrixWorld)
            if (globalVertex.distanceTo(model.current.position) < 0.75) {
              console.log('collision')
              setCrashed(true)
            }
          }
        }
      }

      model.current.position.y > 20 && setCrashed(true)

      let score = Math.floor((model.current.position.x - 2) / 10) + 26
      score < 0 && (score = 0)
      //ref.current && (ref.current.innerText = score)
      document.getElementById('score').innerText = score
    }
    keyMap['KeyR'] && model.current.position.copy(startPosition) && velocity.set(0, 0, 0) && setCrashed(false)
  })

  return (
    <>
      <group ref={model} dispose={null} position={startPosition}>
        <group ref={frame[0]}>
          <mesh geometry={nodes.Cube303.geometry} material={materials['Material.003']} castShadow position={[-0.25, -0.45, 0]} scale={[0.05, 0.05, 0.13]} />
          <mesh geometry={nodes.Cube330.geometry} material={materials['Material.002']} castShadow position={[0.05, 0.45, 0]} scale={[0.05, 0.05, 0.13]} />
          <mesh geometry={nodes.Cube332.geometry} material={materials['Material.001']} castShadow position={[-0.15, 0.35, 0]} scale={[0.05, 0.05, 0.13]} />
          <mesh geometry={nodes.Cube344.geometry} material={materials['Material.004']} castShadow position={[0.25, 0.05, 0]} scale={[0.05, 0.05, 0.13]} />
          <mesh geometry={nodes.Cube358.geometry} material={materials['Material.005']} castShadow position={[0.55, 0.25, 0]} scale={[0.05, 0.05, 0.13]} />
          <mesh geometry={nodes.Cube373.geometry} material={materials['Material.006']} castShadow position={[0.65, -0.35, 0]} scale={[0.05, 0.05, 0.13]} />
          <mesh geometry={nodes.Cube429.geometry} material={materials['Material.007']} castShadow position={[-0.35, -0.35, 0]} scale={[0.05, 0.05, 0.13]} />
        </group>
        <group ref={frame[1]}>
          <mesh geometry={nodes.Cube008.geometry} material={materials['Material.001']} castShadow position={[-0.65, -0.15, 0]} scale={[0.05, 0.05, 0.13]} />
          <mesh geometry={nodes.Cube031.geometry} material={materials['Material.002']} castShadow position={[-0.25, 0.35, 0]} scale={[0.05, 0.05, 0.13]} />
          <mesh geometry={nodes.Cube039.geometry} material={materials['Material.003']} castShadow position={[-0.15, -0.35, 0]} scale={[0.05, 0.05, 0.13]} />
          <mesh geometry={nodes.Cube048.geometry} material={materials['Material.004']} castShadow position={[0.25, 0.05, 0]} scale={[0.05, 0.05, 0.13]} />
          <mesh geometry={nodes.Cube051.geometry} material={materials['Material.005']} castShadow position={[0.15, 0.35, 0]} scale={[0.05, 0.05, 0.13]} />
          <mesh geometry={nodes.Cube077.geometry} material={materials['Material.006']} castShadow position={[0.65, -0.35, 0]} scale={[0.05, 0.05, 0.13]} />
          <mesh geometry={nodes.Cube095.geometry} material={materials['Material.007']} castShadow position={[0.65, 0.05, 0]} scale={[0.05, 0.05, 0.13]} />
        </group>
        <group ref={frame[2]}>
          <mesh geometry={nodes.Cube169.geometry} material={materials['Material.001']} castShadow position={[-0.25, 0.25, 0]} scale={[0.05, 0.05, 0.13]} />
          <mesh geometry={nodes.Cube180.geometry} material={materials['Material.002']} castShadow position={[-0.05, 0.45, 0]} scale={[0.05, 0.05, 0.13]} />
          <mesh geometry={nodes.Cube193.geometry} material={materials['Material.003']} castShadow position={[0.05, -0.45, 0]} scale={[0.05, 0.05, 0.13]} />
          <mesh geometry={nodes.Cube195.geometry} material={materials['Material.004']} castShadow position={[0.25, 0.05, 0]} scale={[0.05, 0.05, 0.13]} />
          <mesh geometry={nodes.Cube207.geometry} material={materials['Material.005']} castShadow position={[0.35, 0.45, 0]} scale={[0.05, 0.05, 0.13]} />
          <mesh geometry={nodes.Cube219.geometry} material={materials['Material.006']} castShadow position={[0.15, -0.25, 0]} scale={[0.05, 0.05, 0.13]} />
          <mesh geometry={nodes.Cube233.geometry} material={materials['Material.007']} castShadow position={[0.05, -0.25, 0]} scale={[0.05, 0.05, 0.13]} />
        </group>
      </group>
      {/* <Hud>
        <OrthographicCamera makeDefault />
        <Score model={model} />
      </Hud> */}
    </>
  )
}

useGLTF.preload('./models/bird.glb')
