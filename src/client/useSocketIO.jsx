import { useEffect, useRef } from 'react'
import { useThree } from '@react-three/fiber'
import { CircleGeometry, Mesh, MeshNormalMaterial } from 'three'
import io from 'socket.io-client'

export default function useSocketIO(model, otherPlayers) {
  const socket = useRef()
  const state = useThree()
  const myId = useRef()

  useEffect(() => {
    console.log('setting socket io')
    socket.current = io()

    const intervalId = setInterval(() => {
      model.current &&
        socket.current.emit('update', {
          t: Date.now(),
          p: model.current.position
        })
    })

    socket.current.on('connect', () => {
      console.log('connect')
    })

    socket.current.on('disconnect', (message) => {
      console.log('disconnect ' + message)
    })

    socket.current.on('id', (id) => {
      console.log('myId = ' + id)
      myId.current = id
    })

    socket.current.on('clients', (clients) => {
      //console.log('clients count = ' + Object.keys(clients).length)
      Object.keys(clients).forEach((p) => {
        //console.log(myId.current === p)
        if (myId.current !== p) {
          //console.log('other client = ' + p)
          if (!otherPlayers.current[p]) {
            otherPlayers.current[p] = new Mesh(new CircleGeometry(), new MeshNormalMaterial())
            otherPlayers.current[p].name = p
            otherPlayers.current[p].position.set(-250, 0, 0)
            state.scene.add(otherPlayers.current[p])
          } else {
            clients[p].p && otherPlayers.current[p].position.set(clients[p].p.x, clients[p].p.y, clients[p].p.z)
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
      socket.current.off('connect')
      socket.current.off('disconnect')
      socket.current.off('id')
      socket.current.off('clients')
      socket.current.off('removeClient')
    }
  }, [])
}
