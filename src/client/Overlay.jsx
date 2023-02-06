import { useState } from 'react'
import { Html, Hud, OrthographicCamera } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'

export default function Overlay({ model, crashed, started, keyMap }) {
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
      <MobileButtons keyMap={keyMap} />
    </Hud>
  )
}

function MobileButtons({ keyMap }) {
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
  if (isMobile) {
    return (
      <Html>
        <button className="button" id="flapButton" onPointerDown={() => (keyMap['Space'] = true)} onPointerUp={() => (keyMap['Space'] = false)}>
          Flap
        </button>
        <button className="button" id="restartButton" onPointerDown={() => (keyMap['KeyR'] = true)} onPointerUp={() => (keyMap['KeyR'] = false)}>
          Re-Start
        </button>
      </Html>
    )
  }
}
