import { useEffect, useRef } from 'react'
import { useThree } from '@react-three/fiber'
import io from 'socket.io-client'

export default function useSocketIO(model, otherBirds) {
  const socket = useRef()
  const state = useThree()
  const myId = useRef()
  const otherPlayers = useRef({})

  useEffect(() => {
    //console.log('setting socket io')
    socket.current = io()

    const intervalId = setInterval(() => {
      model.current &&
        socket.current.emit('update', {
          t: Date.now(),
          p: model.current.position
        })
    })

    // socket.current.on('connect', () => {
    //   console.log('connect')
    // })

    // socket.current.on('disconnect', (message) => {
    //   console.log('disconnect ' + message)
    // })

    socket.current.on('id', (id) => {
      console.log('myId = ' + id)
      myId.current = id
    })

    socket.current.on('clients', (clients) => {
      //console.log('clients count = ' + Object.keys(clients).length)
      let i = 0
      Object.keys(clients).forEach((p) => {
        //console.log(myId.current === p)
        if (myId.current !== p) {
          i++
          //console.log('other client = ' + p)
          if (!otherPlayers.current[p]) {
            otherPlayers.current[p] = otherBirds[i % 3].current
            otherPlayers.current[p].name = p
            state.scene.add(otherPlayers.current[p])
          } else {
            clients[p].p && otherPlayers.current[p].position.set(clients[p].p.x, clients[p].p.y, clients[p].p.z - 0.01 * (i + 1))
          }
        }
      })
    })

    socket.current.on('removeClient', (id) => {
      console.log('removeClient ' + id)
      state.scene.remove(state.scene.getObjectByName(id))
      delete otherPlayers.current[id]
    })

    return () => {
      console.log('in useSocketIO return')
      clearInterval(intervalId)
      //socket.current.off('connect')
      //socket.current.off('disconnect')
      socket.current.off('id')
      socket.current.off('clients')
      socket.current.off('removeClient')
    }
  }, [])
}
