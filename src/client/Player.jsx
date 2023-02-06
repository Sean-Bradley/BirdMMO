import { useMemo, useRef, useState } from 'react'
import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import useKeyboard from './useKeyboard'
import { MathUtils, Vector3 } from 'three'
import Bird from './Bird'
import Overlay from './Overlay'
import useSocketIO from './useSocketIO'

const GRAVITY = 50

export default function Player({ colliders }) {
  //console.log('creating player')
  const model = useRef()
  const keyMap = useKeyboard()
  const velocity = useMemo(() => new Vector3(), [])
  const lookAt = useMemo(() => new Vector3(), [])
  const startPosition = useMemo(() => new Vector3(-260, 1, 0), [])
  const [crashed, setCrashed] = useState()
  const [started, setStarted] = useState()
  const otherPlayers = useRef({})

  useSocketIO(model, otherPlayers)

  useFrame((state, delta) => {
    if (!crashed) {
      keyMap['Space'] && (velocity.y = 10) && setStarted(true)
    }

    let damping = Math.exp(-4 * delta) - 1
    if (model.current.position.y > 0.65) {
      velocity.x += delta * 2
      velocity.y -= GRAVITY * delta
      damping *= 0.066 // affects speed up
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

    // //state.camera.position.z = 15 // todo: if mobile portrait mode

    lookAt.lerp(model.current.position, 0.1)
    lookAt.x += 0.1
    state.camera.lookAt(lookAt)

    const nextPipeID = Math.floor((model.current.position.x - 5) / 10 + 26) //only checking nearest pipe
    for (let i = 0; i < 2; i++) {
      if (!crashed && nextPipeID > -1) {
        const pipeCollider = colliders['collider' + i + '_' + nextPipeID]
        const positions = pipeCollider.geometry.attributes.position.array
        for (let j = 0; j < positions.length; j += 3) {
          const v = new Vector3(positions[j], positions[j + 1], positions[j + 2])
          const globalVertex = v.applyMatrix4(pipeCollider.matrixWorld)
          if (globalVertex.distanceTo(model.current.position) < 0.75) {
            //console.log('collision')
            setCrashed(true)
          }
        }
      }
    }

    model.current.position.y > 20 && setCrashed(true)

    keyMap['KeyR'] && model.current.position.copy(startPosition) && velocity.set(0, 0, 0) && setCrashed(false)
  })

  return (
    <>
      <group ref={model} dispose={null} position={startPosition}>
        <Bird crashed={crashed} />
      </group>
      <Overlay model={model} crashed={crashed} started={started} keyMap={keyMap}/>     
    </>
  )
}

useGLTF.preload('./models/bird.glb')

