import Pipe from './Pipe'

const positions = [...Array(50)].map((_, i) => ({
  position: [i * 10 - 150, Math.random() * 5 + 3, 0]
}))

export default function Pipes() {
  return (
    <>
      {positions.map(({ position }, i) => (
        <Pipe key={i} position={position} />
      ))}
    </>
  )
}
