import { useState } from 'react'
import { Html, Hud, OrthographicCamera } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'

export default function Score({ model }) {
  console.log('updating score')
  const [score, setScore] = useState(0)

  useFrame(() => {
    let s = Math.floor((model.current.position.x - 2) / 10) + 26
    s < 0 && (s = 0)
    setScore(s)
  })

  return (
    <Hud>
      <OrthographicCamera makeDefault position={[0, 0, 0]} />
      <Html>
        <div id="score">{score}</div>
      </Html>
    </Hud>
  )
}
