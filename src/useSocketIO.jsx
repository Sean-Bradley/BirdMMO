import { useEffect, useRef } from 'react'
import { useThree } from '@react-three/fiber'
import io from 'socket.io-client'
import { CircleGeometry, Mesh, MeshNormalMaterial } from 'three'

let socket

export default function useSocketIO(model) {
  const state = useThree()
  const myId = useRef()
  const otherClients = useRef({})

  useEffect(() => {
    socket = io()

    const intervalId = setInterval(() => {
      model.current &&
        socket.emit('update', {
          t: Date.now(),
          p: model.current.position
        })
    })

    socket.on('connect', () => {
      console.log('connect')
    })

    socket.on('disconnect', (message) => {
      console.log('disconnect ' + message)
    })

    socket.on('id', (id) => {
      console.log('myId = ' + id)
      myId.current = id
    })

    socket.on('clients', (clients) => {
      //console.log('clients count = ' + Object.keys(clients).length)
      Object.keys(clients).forEach((p) => {
        //console.log(myId.current === p)
        if (myId.current !== p) {
          console.log('other client = ' + p)
          if (!otherClients.current[p]) {
            otherClients.current[p] = new Mesh(new CircleGeometry(), new MeshNormalMaterial())
            otherClients.current[p].name = p
            otherClients.current[p].position.set(-250, 0, 0)
            state.scene.add(otherClients.current[p])
          } else {
            //console.log(clients[p].p)
            clients[p].p && otherClients.current[p].position.set(clients[p].p.x, clients[p].p.y, clients[p].p.z)
          }
        }
      })
    })

    socket.on('removeClient', (id) => {
      console.log('removeClient ' + id)
      state.scene.remove(state.scene.getObjectByName(id))
      delete otherClients.current[id]
    })

    return () => {
      console.log('in useSocketIO return')
      clearInterval(intervalId)
      socket.off('connect')
      socket.off('disconnect')
      socket.off('id')
      socket.off('clients')
      socket.off('removeClient')
    }
  }, [])
}
