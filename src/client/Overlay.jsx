import { useState } from 'react'
import { Html, Hud, OrthographicCamera } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'

export default function Overlay({ model, crashed, started }) {
  //console.log('updating score')
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
      <Html>
        <div className="prompt" style={{ display: crashed ? 'block' : 'none' }}>
          Press <kbd>R</kbd> to re-start
        </div>
      </Html>
      <Html>
        <div className="prompt" style={{ display: started ? 'none' : 'block' }}>
          Press <kbd>Space</kbd> to Start
        </div>
      </Html>
    </Hud>
  )
}
