import { useEffect, useRef } from 'react'

export default function useKeyboard() {
  const keyMap = useRef({})

  useEffect(() => {
    const onDocumentKey = (e) => {
      keyMap.current[e.code] = e.type === 'keydown'
    }
    const preventDefault = (e) => {
      if (e.code === 'Space') {
        //stop space causing parent window to scroll when birdmmo viewed in an iframe
        e.preventDefault()
      }
    }
    document.addEventListener('keydown', onDocumentKey)
    document.addEventListener('keyup', onDocumentKey)
    document.addEventListener('keypress', preventDefault)
    return () => {
      document.removeEventListener('keydown', onDocumentKey)
      document.removeEventListener('keyup', onDocumentKey)
      document.removeEventListener('keypress', preventDefault)
    }
  })

  return keyMap.current
}
