import { useEffect, useState } from 'react'

export function MouseFollower () {
  const [enabled, setEnabled] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    console.log('efecto', { enabled })

    const handleMove = (event) => {
      const { clientX, clientY } = event

      setPosition({ x: clientX, y: clientY })
    }
    if (enabled) {
      window.addEventListener('pointermove', handleMove)
    }

    // console.log(position);

    // clean up
    // cuando el componente se desmonta
    // cuando cambian las dependencias, antes de ejecutar el efecto nuevamente
    return () => {
      window.removeEventListener('pointermove', handleMove)
    }
  }, [enabled, position])

  return (
    <>

      <div style={{
        position: 'absolute',
        backgroundColor: 'rgb(0,0,0,0.5)',
        border: '1px solid #fff',
        borderRadius: '50%',
        opacity: '0.8',
        pointerEvents: 'none',
        left: -20,
        top: -20,
        width: 40,
        height: 40,
        transform: `translate(${position.x}px,${position.y}px)`
      }}
      />
      <h1>Mouse Follower</h1>

      <button onClick={() => setEnabled(!enabled)}>{enabled ? 'Desactivar' : 'Activar'} puntero</button>
    </>
  )
}
